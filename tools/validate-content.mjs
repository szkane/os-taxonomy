#!/usr/bin/env node
/* ==========================================================================
   validate-content.mjs — machine-checks ALL authored game content.
   Run automatically at the end of `npm run build:site`. Exits non-zero on
   errors so wrong child-facing content can never ship silently.
   ========================================================================== */
import { loadData, buildCourses } from './lib/derive.mjs';
import { LAB_CASES } from './lib/lab-cases.mjs';
import { readFile } from 'node:fs/promises';

const errors = [];
const warn = [];
const err = (slug, msg) => errors.push(`[${slug}] ${msg}`);
const configuration = (slug, msg) => warn.push(`[${slug}] ${msg}`);

function checkDoctor(course, mode) {
  const patients = mode.config.patients || [];
  if (!patients.length) return err(course.slug, 'doctor mode has no patients');
  patients.forEach((pSlot, pi) => {
    const variants = pSlot.variants || [pSlot.tokens ? [pSlot.tokens] : []];
    variants.forEach((variantTokens, vi) => {
      checkPatientVariant(course, pi, vi, variants.length, { tokens: variantTokens, brief: pSlot.brief });
    });
  });
}

function checkPatientVariant(course, pi, vi, variantCount, p) {
    const label = variantCount > 1 ? `patient ${pi + 1} variant ${vi + 1}` : `patient ${pi + 1}`;
    const tokens = p.tokens || [];
    if (tokens.length < 3) err(course.slug, `${label}: too few tokens`);
    const injured = tokens.filter((t) => t.injured);
    if (!injured.length) err(course.slug, `${label}: no injured tokens`);
    // Simulate the healed sentence.
    const healed = tokens.map((t) => (t.injured ? t.fixText : t.text)).join(' ');
    // 1. Healed sentence must start with a capital.
    if (!/^[A-Z0-9"'“]/.test(healed)) {
      err(course.slug, `${label}: healed sentence does not start with a capital → "${healed}"`);
    }
    // 2. Healed sentence must end with terminal punctuation.
    if (!/[.?!]$/.test(healed)) {
      err(course.slug, `${label}: healed sentence does not end with . ? or ! → "${healed}"`);
    }
    // 3. Original sentence must be BROKEN somewhere the child can see:
    //    every injured fixText must differ from the displayed token.
    injured.forEach((t) => {
      if (!t.fixText || t.fixText === t.text) {
        err(course.slug, `${label}: injured token "${t.text}" has no real fix`);
      }
      if (!t.why || t.why.length < 12) {
        err(course.slug, `${label}: injured token "${t.text}" needs a teaching why`);
      }
    });
    // 4. The displayed (broken) sentence must actually contain the listed error:
    //    if the healed sentence equals the displayed one, nothing to fix.
    const displayed = tokens.map((t) => t.text).join(' ');
    if (displayed === healed) err(course.slug, `${label}: displayed sentence equals the healed one`);
    // 6. Any word capitalized in healed but lowercase in displayed must be injured.
    const dispWords = displayed.split(/\s+/);
    const healedWords = healed.split(/\s+/);
    // Align by stripping punctuation for comparison of case.
    if (dispWords.length === healedWords.length && dispWords.length === tokens.length) {
      healedWords.forEach((w, i) => {
        const stripped = (x) => x.replace(/[.?!,'"]/g, '');
        const wasInjured = tokens[i] && tokens[i].injured;
        if (!wasInjured && stripped(w) !== stripped(dispWords[i])) {
          // case or letters differ → fixText silently altered a non-injured word
          err(course.slug, `${label}: token ${i} ("${dispWords[i]}") changes without being injured → "${w}"`);
        }
      });
    }
    // 7. Brief must not promise a count that is wrong.
    const countMatch = p.brief && p.brief.match(/\b([Oo]ne|[Tt]wo|[Tt]hree|[Ff]our)\b/);
    if (countMatch) {
      const map = { one: 1, two: 2, three: 3, four: 4 };
      const said = map[countMatch[1].toLowerCase()];
      if (said && said !== injured.length) {
        err(course.slug, `${label}: brief says "${countMatch[1]}" but there are ${injured.length} injuries`);
      }
    }
}

function checkArcade(course, mode) {
  (mode.config.items || []).forEach((q, i) => {
    const correct = (q.choices || []).filter((c) => c.correct);
    if (correct.length !== 1) err(course.slug, `arcade item ${i}: needs exactly 1 correct choice (has ${correct.length})`);
    if (!q.choices || q.choices.length < 2) err(course.slug, `arcade item ${i}: needs ≥2 choices`);
    if (!q.why) configuration(course.slug, `arcade item ${i}: no why-feedback`);
    // The bubble shows the WORD — an emoji never replaces it.
    (q.choices || []).forEach((c, j) => {
      if (!c.text || !c.text.trim()) err(course.slug, `arcade item ${i} choice ${j}: emoji-only choices are forbidden (word must be visible)`);
    });
    if (course.band === 'early' && q.prompt && q.prompt.length > 110) {
      err(course.slug, `arcade item ${i}: early-band prompt too long (${q.prompt.length} chars) → "${q.prompt.slice(0, 50)}…"`);
    }
  });
}

function checkMission(course, mode) {
  (mode.config.bank || []).forEach((q, i) => {
    childLabelCheck(course, q.concept, `mission item ${i} concept`);
    [q.prompt, ...(q.choices || []).map((c) => c.text)].forEach((t) => {
      if (t && CITATION_RE.test(t)) err(course.slug, `mission item ${i} shows a research citation → "${String(t).slice(0, 50)}"`);
    });
    if (course.band === 'early' && q.prompt && q.prompt.length > 110) {
      err(course.slug, `mission item ${i}: early-band prompt too long (${q.prompt.length})`);
    }
    const correct = (q.choices || []).filter((c) => c.correct);
    if (correct.length !== 1) err(course.slug, `mission item ${i} (${q.concept}): needs exactly 1 correct choice`);
    const texts = (q.choices || []).map((c) => c.text.trim().toLowerCase());
    if (new Set(texts).size !== texts.length) err(course.slug, `mission item ${i} (${q.concept}): duplicate choices`);
    (q.choices || []).forEach((c) => { if (!c.why) err(course.slug, `mission item ${i}: choice missing why-feedback`); });
  });
}

function checkSorter(course, mode) {
  const binIds = new Set((mode.config.bins || []).map((b) => b.id));
  const labels = new Set();
  (mode.config.items || []).forEach((it, i) => {
    if (!binIds.has(it.bin)) err(course.slug, `sorter item ${i} ("${it.label}") points at unknown bin "${it.bin}"`);
    if (!it.why) configuration(course.slug, `sorter item "${it.label}": no why`);
    if (labels.has(it.label)) err(course.slug, `sorter: duplicate item label "${it.label}"`);
    labels.add(it.label);
  });
}

function checkSequence(course, mode) {
  const cards = mode.config.cards || [];
  if (cards.length < 3) err(course.slug, `sequence: only ${cards.length} cards`);
  const labels = new Set(cards.map((c) => c.label));
  if (labels.size !== cards.length) err(course.slug, 'sequence: duplicate card labels');
  cards.forEach((c, i) => {
    if (!c.label) err(course.slug, `sequence card ${i}: no label`);
    if (!c.why) configuration(course.slug, `sequence card "${c.label}": no why`);
    if (mode.config.mode === 'cycle' && i === 0 && !c.clue) configuration(course.slug, 'cycle: first card lacks a clue');
  });
}

/* Effective dial spans for a lab mode (scene defaults + band overrides). */
function effectiveSpans(scene, config) {
  const eff = {};
  scene.dials.forEach((d) => {
    const ov = (config.dialOverrides || {})[d.id] || {};
    eff[d.id] = { min: ov.min != null ? ov.min : d.min, max: ov.max != null ? ov.max : d.max };
  });
  return eff;
}

/* Brute-force: can ANY dial combination inside the spans satisfy the case?
   Mirrors the engine's checkCase rule DSL. Returns true/false/'unknown'
   (unknown = search space too large — skipped, not failed). */
function ruleReachable(c, eff) {
  const ids = Object.keys(eff);
  const targets = c.targets || {};
  const tol = c.tolerance != null ? c.tolerance : 0;
  const vals = {};
  let budget = 250000;
  const num = (x) => vals[x] | 0;
  const checkRule = () => {
    for (const k of Object.keys(targets)) {
      if (Math.abs(num(k) - (targets[k] | 0)) > tol) return false;
    }
    const rule = c.rule;
    if (!rule) return Object.keys(targets).length > 0;
    switch (rule.op) {
      case 'sum': { let t = 0; ids.forEach((k) => { t += num(k); }); return t === rule.value; }
      case 'product': { let p = 1; ids.forEach((k) => { p *= num(k); }); return p === rule.value; }
      case 'allEqual': {
        const f = num(ids[0]);
        if (!ids.every((k) => num(k) === f) || !f) return false;
        if (rule.minSum) { let t = 0; ids.forEach((k) => { t += num(k); }); if (t < rule.minSum) return false; }
        return true;
      }
      case 'whole': return num('parts') >= 1 && num('shaded') === num('parts');
      case 'lt': return num(rule.dial) < rule.value;
      case 'atLeast': return num(rule.dial) >= rule.value;
      case 'between': return num(rule.dial) > rule.lo && num(rule.dial) < rule.hi;
      case 'digits': {
        const n = num('n');
        if (rule.hundreds != null && Math.floor(n / 100) !== rule.hundreds) return false;
        if (rule.tens != null && Math.floor((n % 100) / 10) !== rule.tens) return false;
        if (rule.ones != null && n % 10 !== rule.ones) return false;
        return true;
      }
      case 'diff': {
        if (Math.abs(num(rule.a) - num(rule.b)) !== rule.value) return false;
        if (rule.minFirst != null && num(rule.a) < rule.minFirst) return false;
        return true;
      }
      case 'affine': return rule.cStart * num('start') + rule.cStep * num('step') === rule.value;
      default: return true;
    }
  };
  function dfs(k) {
    if (budget <= 0) return 'unknown';
    if (k === ids.length) return checkRule();
    const id = ids[k];
    // A targeted dial only needs its exact target value(s) tried.
    let lo = eff[id].min, hi = eff[id].max;
    if (targets[id] != null) { lo = hi = targets[id] | 0; }
    for (let v = lo; v <= hi; v++) {
      vals[id] = v;
      const r = dfs(k + 1);
      if (r === true || r === 'unknown') return r;
      budget--;
    }
    return false;
  }
  return dfs(0);
}

function checkLab(course, mode) {
  const scene = PYP_SCENES[mode.config.scene];
  if (!scene) return err(course.slug, `concept-lab: unknown scene "${mode.config.scene}"`);
  const dialIds = new Set(scene.dials.map((d) => d.id));
  const eff = effectiveSpans(scene, mode.config);
  (mode.config.cases || []).forEach((c, i) => {
    const refs = [...Object.keys(c.targets || {})];
    const rule = c.rule || {};
    ['dial', 'a', 'b'].forEach((k) => { if (rule[k]) refs.push(rule[k]); });
    if (rule.also && rule.also.dial) refs.push(rule.also.dial);
    refs.forEach((id) => {
      if (!dialIds.has(id)) err(course.slug, `lab case ${i}: references unknown dial "${id}"`);
    });
    if (!c.targets && !c.rule) err(course.slug, `lab case ${i}: neither targets nor rule`);
    if (!c.why) err(course.slug, `lab case ${i}: missing why (shown on success)`);
    // Reachability: a target outside the band-effective dial span can never
    // be committed — an unwinnable case (the "ends in 0 with step ≤ 6" bug).
    Object.keys(c.targets || {}).forEach((id) => {
      const e = eff[id];
      const v = c.targets[id] | 0;
      if (e && (v < e.min || v > e.max)) {
        err(course.slug, `lab case ${i + 1}: target ${id}=${v} is outside the dial span ${e.min}…${e.max} — the case can never be solved`);
      }
    });
    const reach = ruleReachable(c, eff);
    if (reach === false) {
      err(course.slug, `lab case ${i + 1}: no dial combination inside the spans satisfies it — the case can never be solved`);
    }
    // Visibility: on numberline-style scenes the first committed hop must be
    // drawn inside the configured range (arcs outside are clipped).
    if (/^numberline/.test(mode.config.scene) && c.targets && c.targets.start != null && c.targets.step != null) {
      const rng = mode.config.range || { lo: -2, hi: 20 };
      const t0 = c.targets.start | 0;
      const t1 = t0 + (c.targets.step | 0);
      if (t0 < rng.lo || t0 > rng.hi || t1 < rng.lo || t1 > rng.hi) {
        err(course.slug, `lab case ${i + 1}: hop ${t0}→${t1} leaves the visible range ${rng.lo}…${rng.hi}`);
      } else {
        const t3 = t0 + 3 * (c.targets.step | 0);
        if (t3 < rng.lo || t3 > rng.hi) {
          configuration(course.slug, `lab case ${i + 1}: later hops (…${t3}) run past the visible range — fine for single-hop prompts, check the wording`);
        }
      }
    }
    if (caseSatisfiedByInitials(c, scene, course.domain, mode.config.scene, course.band)) {
      err(course.slug, `lab case ${i + 1} is pre-solved by the ${course.band} initial dials — change the case or the initial`);
    }
  });
}

function checkMemory(course, mode) {
  (mode.config.pairs || []).forEach((p, i) => {
    if (!p.a || !p.b || !p.a.label || !p.b.label) err(course.slug, `memory pair ${i}: incomplete`);
    if (p.a.label.toLowerCase() === p.b.label.toLowerCase()) err(course.slug, `memory pair ${i}: identical sides`);
  });
}

function checkWordBuilder(course, mode) {
  (mode.config.words || []).forEach((w, i) => {
    if (!/^[a-z]+$/.test(w.word)) err(course.slug, `word-builder word ${i}: "${w.word}" must be lowercase a-z`);
    if (w.word.length < 3 || w.word.length > 12) err(course.slug, `word-builder word ${i}: "${w.word}" length out of range`);
  });
}

function checkDecision(course, mode) {
  (mode.config.scenes || []).forEach((sc, i) => {
    const meterIds = new Set((mode.config.meters || []).map((m) => m.id));
    (sc.choices || []).forEach((ch, j) => {
      (ch.meters || []).forEach(([id]) => {
        if (!meterIds.has(id)) err(course.slug, `decision scene ${i} choice ${j}: unknown meter "${id}"`);
      });
      if (!ch.reflect) err(course.slug, `decision scene ${i} choice ${j}: missing reflect text`);
    });
    if (!sc.choices || sc.choices.length < 2) err(course.slug, `decision scene ${i}: needs ≥2 choices`);
  });
}

/* Scene dial registry — loaded from the REAL scenes.js so dial min/max can
   never drift from the engine (the old manual mirror could). */
globalThis.window = globalThis;
await import('file://' + new URL('../src/assets/js/scenes.js', import.meta.url).pathname);
const PYP_SCENES = globalThis.PYP.scenes;

/* True when the case is ALREADY satisfied by the scene's initial dials —
   a pre-solved case commits as correct before the child does anything. */
function caseSatisfiedByInitials(c, scene, domain, sceneId, band) {
  var vals = {};
  var bandInitials = (LAB_CASES[domain + '|' + sceneId] || {})[band];
  scene.dials.forEach(function (d) {
    var v2 = d.initial;
    if (bandInitials && bandInitials.initials && bandInitials.initials[d.id] != null) v2 = bandInitials.initials[d.id];
    vals[d.id] = v2;
  });
  var targets = c.targets || {};
  var tol = c.tolerance != null ? c.tolerance : 0;
  var keys = Object.keys(targets);
  for (var i = 0; i < keys.length; i++) {
    if (Math.abs((vals[keys[i]] | 0) - (targets[keys[i]] | 0)) > tol) return false;
  }
  var rule = c.rule;
  if (!rule) return keys.length > 0;
  var ids = scene.dials.map(function (d) { return d.id; });
  var num = function (x) { return vals[x] | 0; };
  switch (rule.op) {
    case 'sum': { var t = 0; ids.forEach(function (k) { t += num(k); }); return t === rule.value; }
    case 'product': { var pr = 1; ids.forEach(function (k) { pr *= num(k); }); return pr === rule.value; }
    case 'allEqual': {
      var f = num(ids[0]);
      var eq = ids.every(function (k) { return num(k) === f; });
      if (!eq || !f) return false;
      if (rule.minSum) { var tt = 0; ids.forEach(function (k) { tt += num(k); }); if (tt < rule.minSum) return false; }
      return true;
    }
    case 'whole': return num('parts') >= 1 && num('shaded') === num('parts');
    case 'lt': return num(rule.dial) < rule.value;
    case 'atLeast': return num(rule.dial) >= rule.value;
    case 'between': return num(rule.dial) > rule.lo && num(rule.dial) < rule.hi;
    case 'digits': {
      var n = num('n');
      if (rule.hundreds != null && Math.floor(n / 100) !== rule.hundreds) return false;
      if (rule.tens != null && Math.floor((n % 100) / 10) !== rule.tens) return false;
      if (rule.ones != null && n % 10 !== rule.ones) return false;
      return true;
    }
    case 'diff': {
      if (Math.abs(num(rule.a) - num(rule.b)) !== rule.value) return false;
      if (rule.minFirst != null && num(rule.a) < rule.minFirst) return false;
      return true;
    }
    case 'affine': return rule.cStart * num('start') + rule.cStep * num('step') === rule.value;
    default: return false;
  }
}

/* Teacher-jargon words that must never appear on a child-facing label
   (word-card fronts, mission concept names) in ANY band — if the term is
   genuinely teachable it ships via the gloss table with a plain hook. */
/* Policy: words children are formally TAUGHT (apostrophe, pronoun, verb,
   fraction…) may appear — ideally with a plain hook via the gloss table.
   This list is teacher META-language that is never a child's word. */
const JARGON = ['concurrent', 'asynchronous', 'synchronisation', 'abstraction', 'paradigm',
  'iterative', 'recursive', 'recursion', 'decomposing', 'algorithmic', 'boolean', 'binary',
  'semaphore', 'protocol', 'topology', 'hierarchical', 'instantiation', 'encapsulation',
  'polymorphism', 'inheritance vocabulary', 'orthographic', 'morphological', 'etymolog',
  'phonemic', 'phonological', 'subitising', 'cardinality', 'associative', 'commutative',
  'distributive', 'adverbial', 'determiner', 'possessive in nouns',
  'tectonic', 'sedimentary', 'metamorphic', 'photosynthesis',
  'respiration', 'homeostasis', 'thermoregulation', 'permeable', 'impermeable', 'conductive',
  'translucent', 'opaque', 'refraction', 'dispersion',
  // teacher meta-language (glossed across the site — all bands)
  'vocabulary:', 'grammar terms', 'present perfect', 'expressing time', 'leaving out words',
  'monitoring comprehension', 'measurable attributes', 'delayed gratification',
  'synthesising across', 'generalising with repeated', 'connecting representations',
  'inference vs explicit', 'structural terminology', 'domain vocabulary'];
/* Curriculum words taught at upper primary may appear from age 9, but not on
   early/mid screens unless glossed. */
const JARGON_EARLY_MID = ['punctuating', 'expanded noun phrase', 'subordinate clause',
  'comparatives', 'verb tense', 'progressive', 'firsthand and secondhand', 'parenthesis',
  'skimming', 'improper fractions', 'metamorphosis', 'literal vs figurative', 'form and tone',
  'in-depth character', 'interpreting visual', 'evaluating a speaker', 'gathering, recording',
  'reflex and revolution', 'unlike denominators', 'independent and dependent events',
  'real-world', 'delayed', 'criteria'];

function childLabelCheck(course, label, where) {
  if (!label) return;
  const low = label.toLowerCase();
  const lists = course.band === 'early' || course.band === 'mid' ? [JARGON, JARGON_EARLY_MID] : [JARGON];
  for (const list of lists) {
    for (const j of list) {
      if (low.includes(j)) {
        err(course.slug, `${where} shows teacher jargon "${j}" to a child (age ${course.age}) → "${label}" — add a CHILD_GLOSS entry`);
        return;
      }
    }
  }
}

const CITATION_RE = /(research\s*(\(|$|\s+(grades?|PMC|\d))|et\s+al\.?)/i;

function checkFlashcards(course, mode) {
  const deck = mode.config.deck || [];
  if (deck.length < 3) err(course.slug, `word gallery needs ≥3 cards (has ${deck.length}) — borrow same-domain topics or drop the mode`);
  deck.forEach((card, i) => {
    if (!card.front) err(course.slug, `word card ${i}: empty front`);
    childLabelCheck(course, card.front, `word card ${i} front`);
    if (card.back && /(research\s*\(|et\s+al\.|grades?\s*\d|PMC\s*\d)/i.test(card.back)) {
      err(course.slug, `word card ${i} back shows a research citation to a child → "${card.back.slice(0, 50)}"`);
    }
    if (course.band === 'early' && card.back && card.back.length > 110) {
      configuration(course.slug, `word card ${i}: early back is ${card.back.length} chars`);
    }
  });
}

function checkStorybook(course, mode) {
  const books = (mode.config && mode.config.books) || [];
  if (!books.length) return err(course.slug, 'storybook mode with no books');
  const bandWords = { early: 10, mid: 14, upper: 18 };
  books.forEach((book, bi) => {
    if (!book.title) err(course.slug, `book ${bi}: no title`);
    const pages = book.pages || [];
    if (pages.length < 4 || pages.length > 9) err(course.slug, `book ${bi} "${book.title}": ${pages.length} pages (need 4–9)`);
    let modelSeen = false, childStops = 0;
    pages.forEach((p, pi) => {
      // Picture-book pacing rule: each SENTENCE stays short (a page may hold two).
      const sentences = (p.text || '').split(/(?<=[.!?…])\s+/).filter(Boolean);
      sentences.forEach((sen) => {
        const words = sen.trim().split(/\s+/).filter(Boolean).length;
        if (words > bandWords[course.band]) {
          err(course.slug, `book ${bi} page ${pi + 1}: a ${words}-word sentence (band ${course.band} cap ${bandWords[course.band]}) → "${sen.slice(0, 45)}…"`);
        }
      });
      if (!p.items || !p.items.length) err(course.slug, `book ${bi} page ${pi + 1}: no illustration items`);
      (p.items || []).forEach((it, ii) => {
        if (!it.art || typeof it.art !== 'string') err(course.slug, `book ${bi} page ${pi + 1} item ${ii}: missing art key`);
        if (/[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}\u{2B00}-\u{2BFF}]/u.test(JSON.stringify(it))) {
          err(course.slug, `book ${bi} page ${pi + 1} item ${ii}: emoji in items — actors must be canvas-drawn`);
        }
        if (!it.x || !it.y || !it.s) err(course.slug, `book ${bi} page ${pi + 1} item ${ii}: needs x/y/s`);
        if (it.s < 24 || it.s > 220) err(course.slug, `book ${bi} page ${pi + 1} item ${ii}: size ${it.s} out of range 24–220`);
      });
      const stop = p.stop;
      if (!stop) return;
      if (stop.kind === 'model') modelSeen = true;
      if (stop.kind === 'child') {
        childStops += 1;
        if (!modelSeen) err(course.slug, `book ${bi}: child stop on page ${pi + 1} appears BEFORE the model stop`);
        const correct = (stop.choices || []).filter((c) => c.correct);
        if (correct.length !== 1) err(course.slug, `book ${bi} page ${pi + 1} stop: needs exactly 1 correct choice`);
        (stop.choices || []).forEach((c) => { if (!c.why) err(course.slug, `book ${bi} page ${pi + 1}: choice missing why`); });
      }
      if (stop.kind === 'model' && (!stop.mentor || stop.mentor.length < 15)) {
        err(course.slug, `book ${bi} page ${pi + 1}: model stop needs a real think-aloud`);
      }
    });
    if (!modelSeen) err(course.slug, `book ${bi} "${book.title}": no model stop`);
    if (childStops < 1) err(course.slug, `book ${bi} "${book.title}": no child stop`);
    if (!book.strategies || !book.strategies.length) err(course.slug, `book ${bi}: no strategies recap`);
  });
}

const CHECKERS = {
  storybook: checkStorybook,
  flashcards: checkFlashcards,
  doctor: checkDoctor,
  arcade: checkArcade,
  mission: checkMission,
  sorter: checkSorter,
  sequence: checkSequence,
  'concept-lab': checkLab,
  memory: checkMemory,
  'word-builder': checkWordBuilder,
  decision: checkDecision,
};

/* Band-distinctness (spiral curriculum contract): for each subject|domain ×
   engine, the child-visible content of every band must be unique — a
   fingerprint appearing in two bands means a band is playing another band's
   content. Derived modes (flashcards/mission) differ naturally because decks
   are built from each age's own topics. ENGINES_SCOPE grows per batch. */
const BAND_DISTINCT_ENGINES = new Set(['sorter', 'sequence', 'decision', 'memory', 'arcade', 'concept-lab', 'spatial3d', 'solar3d', 'volcano3d']);
/* Domains whose band sets land in a later batch — shrink to empty; the rule
   is then global and no exception remains. */
const BAND_DISTINCT_PENDING = new Set();

function modeFingerprint(mode) {
  const c = mode.config || {};
  const pick = (o, keys) => keys.map((k) => (o && o[k] != null ? String(o[k]) : '')).join('|');
  switch (mode.engine) {
    case 'sorter':
      return pick(c, ['explorePrompt']) + '##' + (c.bins || []).map((b) => b.label).join(',') + '##' + (c.items || []).map((i) => `${i.label}>${i.bin}:${i.why}`).join('¶');
    case 'sequence':
      return pick(c, ['explorePrompt', 'celebrate']) + '##' + (c.cards || []).map((i) => `${i.label}:${i.why}`).join('¶');
    case 'decision':
      return (c.meters || []).map((m) => m.label).join(',') + '##' + (c.scenes || []).map((s) => `${s.text}#` + (s.choices || []).map((ch) => `${ch.label}:${ch.reflect}`).join('¶')).join('##');
    case 'memory':
      return (c.pairs || []).map((p) => `${p.a.label}=${p.b.label}:${p.why || ''}`).join('¶');
    case 'doctor':
      return (c.patients || []).map((p) => (p.variants || []).map((v) => v.map((t) => t.text).join(' ')).join('|')).join('##');
    case 'concept-lab':
      return pick(c, ['scene', 'explorePrompt']) + '##' + (c.cases || []).map((x) => `${x.prompt}#${x.why}`).join('¶');
    case 'arcade':
      return (c.items || []).map((i) => `${i.prompt}#${(i.choices || []).map((ch) => ch.text).join('|')}`).join('¶');
    case 'worksheet':
      return pick(c, ['prompt']) + '##' + (c.words || []).join(',');
    case 'word-builder':
      return (c.words || []).map((w) => w.word).join(',');
    case 'storybook':
      return (c.books || []).map((b) => b.title).join(',');
    case 'flashcards':
      return (c.deck || []).map((d) => `${d.front}=${d.back.slice(0, 40)}`).join('¶');
    case 'mission':
      return (c.bank || []).map((b) => `${b.concept}#${b.prompt.slice(0, 40)}`).join('¶');
    case 'spatial3d':
    case 'solar3d':
      return (c.cases || []).map((x) => `${x.prompt}#${x.why || ''}`).join('¶');
    case 'volcano3d':
      return (c.cases || []).map((x) => `${x.prompt}#${x.why || ''}`).join('¶');
    default:
      return null;
  }
}

function checkBandDistinctness(courses) {
  const groups = new Map();
  for (const course of courses) {
    for (const mode of course.modes) {
      if (!BAND_DISTINCT_ENGINES.has(mode.engine)) continue;
      const fp = modeFingerprint(mode);
      if (!fp) continue;
      const key = `${course.subject}|${course.domain}|${mode.engine}`;
      if (!groups.has(key)) groups.set(key, new Map());
      const byBand = groups.get(key);
      if (!byBand.has(course.band)) byBand.set(course.band, new Map());
      const fps = byBand.get(course.band);
      fps.set(fp, (fps.get(fp) || 0) + 1);
    }
  }
  for (const [key, byBand] of groups.entries()) {
    if (byBand.size < 2) continue;
    const domainKey = key.slice(0, key.lastIndexOf('|'));
    if (BAND_DISTINCT_PENDING.has(domainKey)) continue;
    const seen = new Map();
    for (const [band, fps] of byBand.entries()) {
      for (const fp of fps.keys()) {
        if (seen.has(fp)) {
          err('band-distinct', `${key}: ${seen.get(fp)} and ${band} bands share identical content — spiral rule violated`);
        } else {
          seen.set(fp, band);
        }
      }
    }
  }
}

async function main() {
  // tools/validate-content.mjs → ../data = <repo>/data
  const data = await loadData(new URL('../data/', import.meta.url).pathname);
  // Duplicate top-level LAB_CASES keys: the later block silently overwrites
  // the earlier one — this exact bug shipped once (sound ×2).
  const labSrc = await readFile(new URL('./lib/lab-cases.mjs', import.meta.url), 'utf8');
  const seenLabKeys = new Set();
  for (const m of labSrc.matchAll(/^  '([^']+)': \{/gm)) {
    if (seenLabKeys.has(m[1])) err('lab-cases.mjs', `duplicate LAB_CASES key '${m[1]}' — the later block silently overwrites the earlier one`);
    seenLabKeys.add(m[1]);
  }
  const courses = buildCourses(data);
  for (const course of courses) {
    for (const mode of course.modes) {
      const checker = CHECKERS[mode.engine];
      if (checker) checker(course, mode);
      else configuration(course.slug, `no content checker for engine "${mode.engine}"`);
    }
  }
  // A course a child cannot PLAY (only cards/quiz) fails the playability bar.
  for (const course of courses) {
    const playable = course.modes.filter((m) => m.engine !== 'flashcards' && m.engine !== 'mission');
    if (!playable.length) {
      err(course.slug, 'no playable mode (labs/sorters/quests/etc.) — cards+quiz alone are not a course');
    }
  }
  checkBandDistinctness(courses);

  if (warn.length) {
    console.log(`content warnings (${warn.length}):`);
    warn.slice(0, 20).forEach((w) => console.log('  ⚠ ' + w));
  }
  if (errors.length) {
    console.error(`\nCONTENT ERRORS (${errors.length}):`);
    errors.forEach((e) => console.error('  ✗ ' + e));
    process.exit(1);
  }
  console.log(`Content check: ${courses.length} courses, all authored modes valid ✓`);
}

main().catch((e) => { console.error(e); process.exit(1); });

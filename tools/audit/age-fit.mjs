/* ==========================================================================
   age-fit.mjs — full-course age-appropriateness audit
   Builds the real course payloads (buildCourses), then answers per domain:
     1. What does each band (early 4-6 / mid 7-8 / upper 9-10) actually get?
        (lab scene + effective dial ranges + case prompts, every other engine's
        resolved content, band fallbacks)
     2. What does the taxonomy say that band should learn (topic names)?
     3. Automated mismatch flags (banding gaps, outgrown representations,
        same-content-all-bands, fallback leaks).
   Output: .audit/age-fit-report.md (human review) + .audit/age-fit.json (raw).
   ==========================================================================
   This is a READ-ONLY audit tool: it never edits content, only reports.
   ========================================================================== */
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const { DOMAINS, bandOf } = await import('../lib/mapping.mjs');
const { buildCourses, loadData } = await import('../lib/derive.mjs');

/* Load the scene registry (browser IIFE) with a window shim. */
globalThis.window = globalThis;
await import('file://' + path.join(ROOT, 'src/assets/js/scenes.js'));
const SCENES = globalThis.PYP.scenes;

const data = await loadData(path.join(ROOT, 'data'));
const courses = buildCourses(data);

/* Topic names per subject|domain|age, straight from the taxonomy. */
const topicsByKey = new Map();
for (const t of data.topics) {
  const k = `${t.subject}|${t.domain}|${t.ageRangeStart}`;
  if (!topicsByKey.has(k)) topicsByKey.set(k, []);
  topicsByKey.get(k).push(t.name);
}

/* ---------------- effective lab config ---------------- */
function effectiveDials(courseMode) {
  const scene = SCENES[courseMode.config.scene];
  if (!scene || !scene.dials) return [];
  return scene.dials.map((d) => {
    const ov = (courseMode.config.dialOverrides || {})[d.id] || {};
    const init = courseMode.config.initials && courseMode.config.initials[d.id] != null
      ? courseMode.config.initials[d.id]
      : d.initial;
    return {
      id: d.id,
      min: ov.min != null ? ov.min : d.min,
      max: ov.max != null ? ov.max : d.max,
      initial: init,
    };
  });
}
function caseNumbers(mode) {
  const out = [];
  for (const c of mode.config.cases || []) {
    const t = c.targets || {};
    for (const v of Object.values(t)) out.push(v);
    if (c.rule && typeof c.rule.value === 'number') out.push(c.rule.value);
  }
  return out.filter((n) => typeof n === 'number' && isFinite(n));
}
function modeFingerprint(mode) {
  const c = mode.config;
  switch (mode.engine) {
    case 'concept-lab': {
      const dials = effectiveDials(mode).map((d) => `${d.id}:${d.min}..${d.max}@${d.initial}`).join(',');
      const cases = (c.cases || []).map((x) => x.prompt).join(' ¶ ');
      return `lab ${c.scene} [${dials}] :: ${cases}`;
    }
    case 'arcade':
      return `arcade ${(c.items || []).slice(0, 2).map((i) => i.prompt).join(' / ')} (${(c.items || []).length})`;
    case 'sorter':
      return `sorter ${(c.items || []).slice(0, 3).map((i) => i.text || i.label).join(' / ')} (${(c.items || []).length})`;
    case 'sequence':
      return `sequence ${(c.cards || []).slice(0, 3).map((i) => i.label || i.text).join(' / ')} (${(c.cards || []).length})`;
    case 'memory':
      return `memory ${(c.pairs || []).slice(0, 3).map((p) => p[0]).join(' / ')} (${(c.pairs || []).length})`;
    case 'doctor':
      return `doctor ${(c.sentences || []).slice(0, 1).map((s) => s.broken || s.hurt).join('')} (${(c.sentences || []).length})`;
    case 'decision':
      return `decision ${(c.scenes || []).slice(0, 2).map((s) => (s.text || '').slice(0, 60)).join(' / ')} (${(c.scenes || []).length} scenes)`;
    case 'worksheet':
      return `worksheet ${(c.words || []).slice(0, 4).join(',')} (${(c.words || []).length})`;
    case 'word-builder':
      return `word-builder ${(c.words || []).slice(0, 4).join(',')} (${(c.words || []).length})`;
    case 'memorys':
    case 'flashcards':
      return `${mode.engine} ${(c.deck || []).length} cards`;
    case 'mission':
      return `mission ${c.bank.length} cases`;
    case 'storybook':
      return `storybook ${(c.books || []).map((b) => b.title).join(' / ')}`;
    case 'spatial3d':
      return `spatial3d ${(c.cases || []).length} cases`;
    case 'solar3d':
      return `solar3d ${(c.cases || c.stops || []).length}`;
    case 'volcano3d':
      return 'volcano3d';
    default:
      return `${mode.engine}?`;
  }
}

/* Numbers a band's own topic names talk about (e.g. "to 120", "1,000,000"). */
function topicCeiling(names) {
  let max = 0;
  const found = [];
  for (const n of names) {
    for (const m of String(n).matchAll(/(\d[\d,]*(?:\.\d+)?)/g)) {
      const v = Number(m[1].replace(/,/g, ''));
      if (isFinite(v)) { found.push(v); if (v > max && v < 1e12) max = v; }
    }
  }
  return { max, found: [...new Set(found)].sort((a, b) => a - b).slice(-8) };
}

/* ---------------- group courses by domain ---------------- */
const byDomain = new Map();
for (const c of courses) {
  const k = `${c.subject}|${c.domain}`;
  if (!byDomain.has(k)) byDomain.set(k, []);
  byDomain.get(k).push(c);
}

const BANDS = ['early', 'mid', 'upper'];
const report = [];
const raw = { domains: [] };

for (const [key, list] of byDomain.entries()) {
  const map = DOMAINS[key];
  const dom = { key, bands: {}, flags: [] };
  const domLines = [`## ${key}`];

  for (const band of BANDS) {
    const bandCourses = list.filter((c) => c.band === band);
    if (!bandCourses.length) continue;
    const ages = bandCourses.map((c) => c.age).sort((a, b) => a - b);
    const topicNames = [...new Set(ages.flatMap((a) => topicsByKey.get(`${key}|${a}`) || []))];
    const ceil = topicCeiling(topicNames);

    /* representative course = oldest in band */
    const rep = bandCourses[bandCourses.length - 1];
    const labModes = rep.modes.filter((m) => m.engine === 'concept-lab');
    const staticModes = rep.modes.filter((m) => !['concept-lab', 'flashcards', 'mission'].includes(m.engine));

    const bandInfo = {
      ages,
      topicCount: topicNames.length,
      topics: topicNames,
      topicCeiling: ceil,
      labs: labModes.map((m) => ({
        label: m.label,
        scene: m.config.scene,
        dials: effectiveDials(m),
        explorePrompt: m.config.explorePrompt,
        cases: (m.config.cases || []).map((c) => ({ prompt: c.prompt, targets: c.targets || null, rule: c.rule || null })),
      })),
      otherModes: staticModes.map((m) => ({ engine: m.engine, fp: modeFingerprint(m) })),
      missionCount: (rep.modes.find((m) => m.engine === 'mission') || { config: { bank: [] } }).config.bank.length,
      flashcardCount: (rep.modes.find((m) => m.engine === 'flashcards') || { config: { deck: [] } }).config.deck.length,
    };
    dom.bands[band] = bandInfo;

    domLines.push(`### band ${band} (ages ${ages.join(',')}) — ${topicNames.length} topics, ceiling num ${ceil.max} (seen: ${ceil.found.join(', ') || 'none'})`);
    for (const lb of bandInfo.labs) {
      domLines.push(`- LAB ${lb.label} → scene=${lb.scene} dials=${lb.dials.map((d) => `${d.id}:${d.min}..${d.max}@${d.initial}`).join(' ') || '(none)'}`);
      for (const c of lb.cases) domLines.push(`    · ${c.prompt}`);
    }
    for (const om of bandInfo.otherModes) domLines.push(`- ${om.fp}`);
    domLines.push(`- mission ${bandInfo.missionCount} · flashcards ${bandInfo.flashcardCount}`);

    /* ---- automated flags ---- */
    // F1: lab identical across bands (same scene, same dial span, same case prompts)
    // F2: numeric ceiling beyond every dial max (representation likely outgrown)
    for (const lb of bandInfo.labs) {
      const nums = [];
      for (const c of lb.cases) {
        for (const v of Object.values(c.targets || {})) nums.push(v);
        if (c.rule && typeof c.rule.value === 'number') nums.push(c.rule.value);
      }
      const dialMax = Math.max(0, ...lb.dials.map((d) => d.max), ...lb.dials.map((d) => Math.abs(d.min)));
      const caseMax = Math.max(0, ...nums.map(Math.abs));
      if (ceil.max >= 20 && dialMax > 0 && ceil.max > dialMax * 2 && caseMax * 2 < ceil.max) {
        dom.flags.push(`F2[${band}] scene ${lb.scene}: band topics reach ${ceil.max} but dials cap at ${dialMax} and cases at ${caseMax} — representation may be outgrown`);
      }
    }
  }

  /* F1 cross-band lab identity (only when the domain actually has labs) */
  const labFPs = {};
  for (const band of BANDS) {
    if (!dom.bands[band]) continue;
    const fps = dom.bands[band].labs.map((l) => `${l.scene}|${l.dials.map((d) => `${d.min}..${d.max}`).join(',')}|${l.cases.map((c) => c.prompt).join('¶')}`).join(' ;; ');
    if (fps) labFPs[band] = fps;
  }
  const present = Object.keys(labFPs);
  if (present.length >= 2) {
    const uniq = new Set(present.map((b) => labFPs[b]));
    if (uniq.size === 1) dom.flags.push('F1 lab identical across all bands (no band tiering)');
    else {
      const pairs = present.length === 3
        ? [['early', 'mid'], ['early', 'upper'], ['mid', 'upper']]
        : [[present[0], present[1]]];
      for (const [a, b] of pairs) if (labFPs[a] === labFPs[b]) dom.flags.push(`F1 lab identical between ${a} and ${b}`);
    }
  }

  /* F3: static engine content identical across bands (same domain map objects) */
  if (map) {
    const staticKeys = ['sorter', 'sequence', 'memory', 'decision', 'spatial3d', 'solar3d', 'volcano3d'];
    for (const sk of staticKeys) {
      if (!map[sk]) continue;
      dom.flags.push(`F3 static ${sk} shown to all bands of this domain (content: ${modeFingerprint({ engine: sk, config: map[sk] })})`);
    }
    if (map.arcade && map.arcade.kind === 'bank') {
      dom.flags.push(`F3 static arcade bank for all bands (${(map.arcade.items || []).length} items)`);
    }
    /* F4: doctor band fallback */
    if (map.doctor) {
      const have = Object.keys(map.doctor).filter((k) => BANDS.includes(k));
      for (const band of BANDS) {
        if (!dom.bands[band]) continue;
        const resolved = map.doctor[band] ? band : (map.doctor.mid ? 'mid' : 'early');
        if (resolved !== band) dom.flags.push(`F4 doctor: ${band} band falls back to ${resolved} content`);
      }
      if (have.length < 3) dom.flags.push(`F4 doctor authored bands: ${have.join(',') || 'none'}`);
    }
    /* F5: worksheet / wordBuilder without band words */
    for (const wk of ['worksheet', 'wordBuilder']) {
      if (map[wk] && !map[wk].wordsByBand) {
        dom.flags.push(`F5 ${wk} same words for all bands: ${(map[wk].words || []).slice(0, 8).join(', ')}`);
      }
    }
    /* F6: storybook band coverage */
    if (map.storybook) {
      const have = Object.keys(map.storybook.books).filter((k) => BANDS.includes(k));
      for (const band of BANDS) {
        if (!dom.bands[band]) continue;
        const resolved = map.storybook.books[band] ? band : (map.storybook.books.mid ? 'mid' : 'early');
        if (resolved !== band) dom.flags.push(`F6 storybook: ${band} band falls back to ${resolved} books`);
      }
      if (have.length < 3) dom.flags.push(`F6 storybook authored bands: ${have.join(',') || 'none'}`);
    }
    /* F8: scene2 band filter vs lab bands */
    if (map.scene2 && map.scene2.bands) {
      for (const band of BANDS) {
        if (!dom.bands[band]) continue;
        const hasScene2 = bandCoursesHasScene2(map, band);
        if (!hasScene2) dom.flags.push(`F8 scene2 hidden for ${band} (bands: ${map.scene2.bands.join(',')})`);
      }
    }
  }

  if (dom.flags.length) {
    domLines.push('**Flags:**');
    for (const f of dom.flags) domLines.push(`- ${f}`);
  }
  raw.domains.push(dom);
  report.push(domLines.join('\n'));
}

function bandCoursesHasScene2(map, band) {
  return (map.scene2.bands || []).includes(band);
}

const flagCounts = {};
for (const d of raw.domains) for (const f of d.flags) {
  const k = f.slice(0, 2);
  flagCounts[k] = (flagCounts[k] || 0) + 1;
}

const header = [
  `# Age-fit audit — ${courses.length} courses, ${raw.domains.length} domains`,
  `Generated ${new Date().toISOString()}`,
  '',
  `Flag counts: ${JSON.stringify(flagCounts)}`,
  '',
  'Flag key:',
  '- F1 lab cases/dials identical between bands (no tiering)',
  '- F2 band topics reach numbers the scene cannot represent (outgrown representation)',
  '- F3 static engine content shown to all bands unchanged',
  '- F4 doctor band fallback (band sees another band\u2019s sentences)',
  '- F5 worksheet/word-builder words not band-split',
  '- F6 storybook band fallback',
  '- F8 scene2 hidden for a band (by design via bands filter — listed for review)',
  '',
].join('\n');

await mkdir(path.join(ROOT, '.audit'), { recursive: true });
await writeFile(path.join(ROOT, '.audit/age-fit-report.md'), header + report.join('\n\n') + '\n', 'utf8');
await writeFile(path.join(ROOT, '.audit/age-fit.json'), JSON.stringify(raw, null, 1), 'utf8');
console.log(header);
console.log(`Wrote .audit/age-fit-report.md (${report.length} domains)`);
for (const d of raw.domains) {
  if (d.flags.length) console.log(`\n### ${d.key}`);
  for (const f of d.flags) console.log(`  - ${f}`);
}

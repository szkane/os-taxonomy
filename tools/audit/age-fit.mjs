/* ==========================================================================
   age-fit.mjs — full-course age-appropriateness & spiral progression audit
   Builds the real course payloads (buildCourses) for primary school (Ages 5–10,
   Kindergarten to Grade 5), then answers per domain:
     1. What does each band (early 5-6 / mid 7-8 / upper 9-10) and each age
        actually get? (lab scene + effective dial ranges + case prompts, 3D
        worlds, every other engine's resolved content)
     2. What does the taxonomy say that band/age should learn (topic names)?
     3. Automated mismatch flags:
        - F1: lab cases/dials identical between bands
        - F2: numeric ceiling beyond the band's lab representations
        - F3: static engine content identical across bands
        - F4: doctor content identical across bands
        - F5: worksheet / word-builder words identical across bands
        - F6: storybook books identical across bands
        - F8: domain has a secondary lab in some bands but missing in another
        - F9: two ages within the same domain share identical mode content
   Output: .audit/age-fit-report.md (human review) + .audit/age-fit.json (raw).
   ==========================================================================
   This is a READ-ONLY audit tool: it never edits content, only reports.
   ========================================================================== */
import { writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const { DOMAINS } = await import('../lib/mapping.mjs');
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

function effectiveSceneMax(sceneId, dials) {
  const scene = SCENES[sceneId];
  if (sceneId === 'placevalue') {
    const h = (dials.find((d) => d.id === 'h') || { max: 9 }).max;
    const t = (dials.find((d) => d.id === 't') || { max: 9 }).max;
    const o = (dials.find((d) => d.id === 'o') || { max: 9 }).max;
    return h * 100 + t * 10 + o;
  }
  if (scene && scene.maxRepresented) return scene.maxRepresented;
  return Math.max(0, ...dials.map((d) => d.max), ...dials.map((d) => Math.abs(d.min)));
}

function modeFingerprint(mode) {
  const c = mode.config || {};
  switch (mode.engine) {
    case 'concept-lab': {
      const dials = effectiveDials(mode).map((d) => `${d.id}:${d.min}..${d.max}@${d.initial}`).join(',');
      const cases = (c.cases || []).map((x) => x.prompt).join(' ¶ ');
      return `lab ${c.scene} [${dials}] :: ${cases}`;
    }
    case 'arcade':
      return `arcade ${(c.items || []).slice(0, 3).map((i) => i.prompt).join(' / ')} (${(c.items || []).length})`;
    case 'sorter':
      return `sorter ${c.explorePrompt || ''} :: ${(c.items || []).map((i) => i.text || i.label).join(' / ')} (${(c.items || []).length})`;
    case 'sequence':
      return `sequence ${c.explorePrompt || ''} :: ${(c.cards || []).map((i) => `${i.label || i.text}:${i.why || ''}`).join(' / ')}`;
    case 'memory':
      return `memory ${(c.pairs || []).map((p) => (p.a ? `${p.a.label}=${p.b.label}` : p[0])).join(' / ')} (${(c.pairs || []).length})`;
    case 'doctor':
      return `doctor ${(c.patients || []).map((p) => (p.variants || []).map((v) => v.map((t) => t.text).join(' ')).join('|')).join(' / ')}`;
    case 'decision':
      return `decision ${(c.scenes || []).map((s) => (s.text || '').slice(0, 60)).join(' / ')} (${(c.scenes || []).length} scenes)`;
    case 'worksheet':
      return `worksheet ${c.prompt || ''} :: ${(c.words || []).join(',')} (${(c.words || []).length})`;
    case 'word-builder':
      return `word-builder ${c.prompt || ''} :: ${(c.words || []).map((w) => w.word || w).join(',')} (${(c.words || []).length})`;
    case 'flashcards':
      return `flashcards ${(c.deck || []).map((d) => d.front).join(' / ')} (${(c.deck || []).length} cards)`;
    case 'mission':
      return `mission ${(c.bank || []).map((q) => `${q.concept}:${q.prompt.slice(0, 36)}`).join(' / ')} (${(c.bank || []).length} cases)`;
    case 'storybook':
      return `storybook ${(c.books || []).map((b) => b.title).join(' / ')}`;
    case 'spatial3d':
    case 'solar3d':
    case 'volcano3d':
    case 'geometry3d':
    case 'optics3d':
    case 'diorama3d':
      return `${mode.engine} ${(c.cases || []).map((x) => x.prompt).join(' / ')} (${(c.cases || []).length} cases)`;
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
      labs: labModes.map((m) => {
        const dials = effectiveDials(m);
        return {
          label: m.label,
          scene: m.config.scene,
          dials,
          maxRep: effectiveSceneMax(m.config.scene, dials),
          explorePrompt: m.config.explorePrompt,
          cases: (m.config.cases || []).map((c) => ({ prompt: c.prompt, targets: c.targets || null, rule: c.rule || null })),
        };
      }),
      otherModes: staticModes.map((m) => ({ engine: m.engine, label: m.label, fp: modeFingerprint(m) })),
      missionCount: (rep.modes.find((m) => m.engine === 'mission') || { config: { bank: [] } }).config.bank.length,
      flashcardCount: (rep.modes.find((m) => m.engine === 'flashcards') || { config: { deck: [] } }).config.deck.length,
    };
    dom.bands[band] = bandInfo;

    domLines.push(`### band ${band} (ages ${ages.join(',')}) — ${topicNames.length} topics, ceiling num ${ceil.max} (seen: ${ceil.found.join(', ') || 'none'})`);
    for (const lb of bandInfo.labs) {
      domLines.push(`- LAB ${lb.label} → scene=${lb.scene} (maxRep=${lb.maxRep}) dials=${lb.dials.map((d) => `${d.id}:${d.min}..${d.max}@${d.initial}`).join(' ') || '(none)'}`);
      for (const c of lb.cases) domLines.push(`    · ${c.prompt}`);
    }
    for (const om of bandInfo.otherModes) domLines.push(`- ${om.fp}`);
    domLines.push(`- mission ${bandInfo.missionCount} · flashcards ${bandInfo.flashcardCount}`);

    /* ---- automated flags ---- */
    // F2: numeric ceiling beyond every lab in the band (for Mathematics number representations)
    if (key.startsWith('Mathematics|') && bandInfo.labs.length && ceil.max >= 20) {
      let maxDialAcrossLabs = 0;
      let maxCaseAcrossLabs = 0;
      for (const lb of bandInfo.labs) {
        const nums = [];
        for (const c of lb.cases) {
          for (const v of Object.values(c.targets || {})) nums.push(v);
          if (c.rule && typeof c.rule.value === 'number') nums.push(c.rule.value);
        }
        maxDialAcrossLabs = Math.max(maxDialAcrossLabs, lb.maxRep);
        maxCaseAcrossLabs = Math.max(maxCaseAcrossLabs, ...nums.map(Math.abs));
      }
      if (maxDialAcrossLabs > 0 && ceil.max > maxDialAcrossLabs * 2 && maxCaseAcrossLabs * 2 < ceil.max) {
        dom.flags.push(`F2[${band}] band topics reach ${ceil.max} but labs cap at ${maxDialAcrossLabs} and cases at ${maxCaseAcrossLabs} — representation may be outgrown`);
      }
    }
  }

  /* F1 cross-band lab identity */
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

  /* F3, F4, F5, F6: check resolved modes across bands */
  const presentBands = BANDS.filter((b) => dom.bands[b]);
  if (presentBands.length >= 2) {
    const enginesInDomain = new Set(presentBands.flatMap((b) => dom.bands[b].otherModes.map((m) => m.engine)));
    for (const eng of enginesInDomain) {
      const fpByBand = new Map();
      for (const b of presentBands) {
        const m = dom.bands[b].otherModes.find((x) => x.engine === eng);
        if (m) fpByBand.set(b, m.fp);
      }
      if (fpByBand.size >= 2) {
        const seen = new Map();
        for (const [b, fp] of fpByBand.entries()) {
          if (seen.has(fp)) {
            const flagCode = eng === 'doctor' ? 'F4'
              : (eng === 'worksheet' || eng === 'word-builder') ? 'F5'
              : eng === 'storybook' ? 'F6'
              : 'F3';
            dom.flags.push(`${flagCode} ${eng} identical between ${seen.get(fp)} and ${b}`);
          } else {
            seen.set(fp, b);
          }
        }
      }
    }
  }

  /* F8: secondary lab hidden for a band when other bands have 2 labs */
  if (map && map.scene2) {
    for (const b of presentBands) {
      if (dom.bands[b].labs.length < 2) {
        dom.flags.push(`F8 scene2 missing for ${b}`);
      }
    }
  }

  /* F9: per-age distinctness within this domain */
  const ageEngineFPs = new Map();
  for (const c of list) {
    for (const m of c.modes) {
      const k = `${m.engine}|${m.label}`;
      if (!ageEngineFPs.has(k)) ageEngineFPs.set(k, new Map());
      ageEngineFPs.get(k).set(c.age, modeFingerprint(m));
    }
  }
  for (const [ek, byAge] of ageEngineFPs.entries()) {
    const seen = new Map();
    for (const [age, fp] of byAge.entries()) {
      if (seen.has(fp)) {
        dom.flags.push(`F9 ${ek} identical between age ${seen.get(fp)} and age ${age}`);
      } else {
        seen.set(fp, age);
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
  '- F9 two ages within the same domain share identical mode content',
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

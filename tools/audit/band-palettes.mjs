/* ==========================================================================
   band-palettes.mjs — authoring palette for the band-distinct content pass
   Dumps per subject|domain × band: that band's topic names, glosses, and
   evidence lines. Written to .audit/band-palettes.md as the reference every
   batch authors against (content must come from the band's own topics).
   Usage: node tools/audit/band-palettes.mjs
   ========================================================================== */
import { writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadData } from '../lib/derive.mjs';
import { CHILD_GLOSS, CHILD_GLOSS_PATTERNS, bandOf } from '../lib/mapping.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');

function glossOf(name) {
  const stripped = String(name).replace(/\s*\(age[^)]*\)\s*/i, '').trim();
  if (CHILD_GLOSS[String(name).replace(/’/g, "'")]) return CHILD_GLOSS[String(name).replace(/’/g, "'")].label;
  for (const key of Object.keys(CHILD_GLOSS)) {
    if (key.replace(/\s*\(age[^)]*\)\s*/i, '').toLowerCase() === stripped.toLowerCase()) return CHILD_GLOSS[key].label;
  }
  for (const pat of CHILD_GLOSS_PATTERNS) {
    const m = stripped.match(pat.re);
    if (m) return pat.label(m);
  }
  return null;
}

const data = await loadData(path.join(ROOT, 'data'));
const byDomainBand = new Map();
for (const t of data.topics) {
  if ((t.ageRangeStart || 0) < 4 || (t.ageRangeStart || 0) > 10) continue;
  const key = `${t.subject}|${t.domain}`;
  const band = bandOf(t.ageRangeStart);
  if (!byDomainBand.has(key)) byDomainBand.set(key, new Map());
  const m = byDomainBand.get(key);
  if (!m.has(band)) m.set(band, []);
  m.get(band).push(t);
}

const lines = ['# Band authoring palettes', '', 'Every band set in `tools/lib/band-modes.mjs` must draw its content from', "the band's own topics below. `✓ gloss` = child-facing label already exists;", '`✗` = add a CHILD_GLOSS entry (or use your own child wording in the set).', ''];
for (const key of [...byDomainBand.keys()].sort()) {
  lines.push(`## ${key}`);
  for (const band of ['early', 'mid', 'upper']) {
    const list = byDomainBand.get(key).get(band) || [];
    if (!list.length) continue;
    lines.push(`### ${band} (${list.length} topics)`);
    for (const t of list) {
      const g = glossOf(t.name);
      const ev = (t.evidence || [])[0] || '';
      lines.push(`- ${t.name}${g ? ` — ✓ gloss: “${g}”` : ' — ✗ no gloss'}${ev ? `\n  - evidence: ${String(ev).slice(0, 130)}` : ''}`);
    }
  }
  lines.push('');
}
await writeFile(path.join(ROOT, '.audit/band-palettes.md'), lines.join('\n'), 'utf8');
console.log(`wrote .audit/band-palettes.md — ${byDomainBand.size} domains`);

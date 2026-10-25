#!/usr/bin/env node
/* ==========================================================================
   build-site.mjs — regenerate the static site in src/
   Generated: index.html, courses/*.html, data/courses.js
   NOT touched (hand-maintained sources): assets/, fonts, vendor bundles.
   Usage: npm run build:site
   ========================================================================== */
import { mkdir, rm, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadData, buildCourses } from './lib/derive.mjs';
import { coursePage, hubPage } from './lib/pages.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'src');
const DATA = path.join(ROOT, 'data');

async function main() {
  const t0 = Date.now();
  if (!existsSync(SRC)) await mkdir(SRC, { recursive: true });

  console.log('Reading taxonomy data…');
  const data = await loadData(DATA);
  console.log(`  clusters=${data.clusters.length} topics=${data.topics.length} research=${data.researchByTopic.size}`);

  console.log('Deriving courses…');
  const courses = buildCourses(data);
  console.log(`  ${courses.length} courses built`);

  // Clean generated areas only (assets/ and fonts are hand-maintained).
  const coursesDir = path.join(SRC, 'courses');
  await rm(coursesDir, { recursive: true, force: true });
  await rm(path.join(SRC, 'data'), { recursive: true, force: true });
  await mkdir(coursesDir, { recursive: true });
  await mkdir(path.join(SRC, 'data'), { recursive: true });

  console.log('Writing course pages…');
  let bytes = 0;
  for (const course of courses) {
    const html = coursePage(course);
    bytes += Buffer.byteLength(html);
    await writeFile(path.join(coursesDir, `${course.slug}.html`), html, 'utf8');
  }
  console.log(`  ${courses.length} pages, ${(bytes / 1024).toFixed(0)} KB total`);

  console.log('Writing hub…');
  await writeFile(path.join(SRC, 'index.html'), hubPage(courses), 'utf8');

  console.log('Writing course index (data/courses.js)…');
  const index = courses.map((c) => ({
    slug: c.slug,
    title: c.title,
    subject: c.subject,
    domain: c.domain,
    age: c.age,
    grade: c.grade,
    gradeLabel: c.gradeLabel,
    theme: c.theme,
    emoji: c.emoji,
    draft: c.draft,
    question: c.question,
    centralIdea: c.centralIdea,
    topicCount: c.stats.topicCount,
    modes: c.modes.map((m) => `${m.icon} ${m.label}`),
  }));
  await writeFile(path.join(SRC, 'data', 'courses.js'), `window.PYP_COURSES = ${JSON.stringify(index, null, 0)};\n`, 'utf8');

  // Sanity checks.
  const noModes = courses.filter((c) => c.modes.length < 2);
  if (noModes.length) {
    console.warn(`⚠ ${noModes.length} courses have fewer than 2 modes:`, noModes.map((c) => c.slug).join(', '));
  }
  const unmapped = courses.filter((c) => c.modes.length === 2);
  console.log(`  courses with only universal modes (flashcards+mission): ${unmapped.length}`);

  const sec = ((Date.now() - t0) / 1000).toFixed(1);
  console.log(`Done in ${sec}s → src/ (${courses.length} courses + hub)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

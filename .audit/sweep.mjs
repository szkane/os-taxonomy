/* Sweep all course pages for console/page errors and capture band spot-check
   screenshots. Usage: node .audit/sweep.mjs [--shots] */
import { chromium } from 'playwright';
import { readdir } from 'node:fs/promises';
import { mkdir } from 'node:fs/promises';

const BASE = 'http://127.0.0.1:4173';
const SHOTS = process.argv.includes('--shots');
const courses = (await readdir('src/courses')).filter((f) => f.endsWith('.html'));
console.log(`sweeping ${courses.length} course pages…`);

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1024, height: 820 } });
let errors = 0;
const t0 = Date.now();
for (let i = 0; i < courses.length; i++) {
  const f = courses[i];
  const errs = [];
  const onErr = (e) => errs.push(String(e).slice(0, 220));
  page.on('pageerror', onErr);
  page.on('console', (m) => { if (m.type() === 'error') onErr(m.text()); });
  try {
    await page.goto(`${BASE}/courses/${f}`, { waitUntil: 'load', timeout: 15000 });
    await page.waitForTimeout(120);
  } catch (e) {
    errs.push('NAV ' + String(e).slice(0, 160));
  }
  page.off('pageerror', onErr);
  page.removeAllListeners('console');
  if (errs.length) {
    errors += errs.length;
    console.log(`✗ ${f}: ${errs[0]}`);
  }
  if (i % 60 === 0) console.log(`  …${i}/${courses.length}`);
}
console.log(`sweep done in ${((Date.now() - t0) / 1000).toFixed(0)}s — ${errors} errors`);

if (SHOTS) {
  await mkdir('.audit/shots', { recursive: true });
  const shots = [
    '4-addition-and-subtraction', '8-addition-and-subtraction', '10-addition-and-subtraction',
    '5-counting-and-cardinality', '8-counting-and-cardinality',
    '6-number-representation-and-place-value', '8-number-representation-and-place-value', '10-number-representation-and-place-value',
    '8-fractions', '10-data-and-statistics', '10-mathematical-thinking', '10-algebra',
    '4-reading-comprehension', '8-reading-comprehension', '10-reading-comprehension',
    '6-multiplication-and-division', '10-multiplication-and-division',
  ];
  for (const s of shots) {
    try {
      await page.goto(`${BASE}/courses/${s}.html`, { waitUntil: 'load', timeout: 15000 });
      // Enter the lesson (skip the cover) and open the first lab mode.
      const start = page.locator('.ml-cover button:has-text("find out")').first();
      await start.click({ timeout: 4000 }).catch(() => {});
      await page.waitForTimeout(900);
      const lab = page.locator('.ml-mode-tab').first();
      await lab.click({ timeout: 4000 }).catch(() => {});
      await page.waitForTimeout(1200);
      await page.screenshot({ path: `.audit/shots/${s}.png`, fullPage: false });
      console.log(`shot ${s}`);
    } catch (e) {
      console.log(`shot ${s} FAILED: ${String(e).slice(0, 100)}`);
    }
  }
}
await browser.close();
process.exit(errors ? 1 : 0);

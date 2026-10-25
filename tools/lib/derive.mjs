/* ==========================================================================
   derive.mjs — cluster → course derivation
   Reads the taxonomy JSON, maps each cluster (subject × domain × age) to a
   course object: PYP framing, gameplay modes (from mapping.mjs), a mission
   bank built from topic evidence + sibling distractors, a flashcard deck,
   arcade generators, and a research digest for the grown-ups section.
   ========================================================================== */
import { SUBJECTS, DOMAINS, SHARED_VOCAB, CHILD_GLOSS, CHILD_GLOSS_PATTERNS, bandOf } from './mapping.mjs';
import { LAB_CASES } from './lab-cases.mjs';
import { BAND_MODES } from './band-modes.mjs';
import { resolveAgeExploreModes, specializeModeForAge } from './age-curriculum.mjs';

/* Band-specific engine configs (band-modes.mjs). Missing band → undefined;
   callers fall back to the domain's shared mapping config. */
function bandModeFor(subject, domain, engine, band) {
  const entry = BAND_MODES[`${subject}|${domain}|${engine}`];
  return entry ? entry[band] : undefined;
}

const FCard_EMOJI = ['💡', '⭐', '🌱', '🎯', '🧩', '🔧', '🌈', '🔍', '🎨', '🚀', '🐾', '🎵'];

function normKey(s) {
  return String(s).replace(/’/g, "'").trim();
}
export function slugify(s) {
  return normKey(s).toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function gradeOf(age) {
  return { 4: 'Pre-K', 5: 'K', 6: 'G1', 7: 'G2', 8: 'G3', 9: 'G4', 10: 'G5' }[age] || `G${Math.min(age - 5, 9)}`;
}
function gradeLabel(grade) {
  if (grade === 'Pre-K') return 'Pre-K';
  return grade === 'K' ? 'Kindergarten' : `Grade ${grade.slice(1)}`;
}

function trimSentence(text, max = 190) {
  if (!text) return '';
  const t = String(text).trim();
  if (t.length <= max) return t;
  const cut = t.slice(0, max);
  const m = cut.match(/^(.+[.!?])\s/);
  return (m ? m[1] : cut.replace(/\s+\S*$/, '')) + ' …';
}

/* Word-card backs: a COMPLETE thought beats the cap. Prefer the whole text,
   then the last sentence end within the cap, then the complete first sentence
   (even if it runs past the cap), and only for pathological mega-sentences cut
   at a clause boundary — never a bare mid-phrase " …". */
function trimCardBack(text, max) {
  if (!text) return '';
  const t = String(text).trim();
  if (t.length <= max) return t;
  const within = t.slice(0, max);
  const sentenceEnd = within.match(/^(.+[.!?])(\s|$)/);
  if (sentenceEnd) return sentenceEnd[1];
  if (max > 110) {
    // For mid/upper bands, allow a complete single sentence slightly above max.
    if (!/[.!?]/.test(t) && t.length <= max * 1.6) return t;
    const firstEnd = t.match(/^([^.!?]*[.!?])(\s|$)/);
    if (firstEnd && firstEnd[1].length <= max * 1.6) return firstEnd[1];
  }
  const clauseCut = within.match(/^(.+[—;,:])\s/);
  if (clauseCut) return clauseCut[1] + ' …';
  return within.slice(0, Math.max(20, max - 2)).replace(/\s+\S*$/, '') + ' …';
}

function baseName(name) {
  return normKey(name).replace(/\s*\(age[^)]*\)\s*/i, '').trim().toLowerCase();
}

/* Some taxonomy topics carry research CITATIONS in evidence[0] ("… research",
   "research (PMC 2020)", "grades 3-5") — teacher provenance, never a child
   task. Legitimate tasks starting with "Research the role…" stay allowed. */
const CITATION_RE = /(research\s*(\(|$|\s+(grades?|PMC|\d))|et\s+al\.?|grades?\s*\d|PMC\s*\d)/i;
function isCitation(text) {
  return typeof text === 'string' && CITATION_RE.test(text);
}

/* Descriptions are child-facing prose — the loose CITATION_RE false-positives on
   "wet all year" (et al) and sentence-final "research". Only provenance-shaped
   signals count: "research (…)", "et al.", "grades 3-5", "PMC 2020". */
const DESC_CITATION_RE = /(research\s*\(|et\s+al\.|grades?\s*\d|PMC\s*\d)/i;
function cleanDescription(text) {
  if (!text || !DESC_CITATION_RE.test(text)) return text || '';
  const kept = String(text)
    .split(/(?<=[.!?])\s+/)
    .filter((sen) => !DESC_CITATION_RE.test(sen))
    .join(' ')
    .trim();
  return kept.length >= 20 ? kept : '';
}

/* Band-specific lab cases: LAB_CASES['<domain>|<scene>'][band] overrides the
   shared scene cases when authored. Missing bands fall back to the shared set. */
function bandSpecFor(domain, sceneId, band) {
  const entry = LAB_CASES[`${domain}|${sceneId}`];
  const spec = entry ? entry[band] : undefined;
  if (Array.isArray(spec)) {
    return { cases: spec, initials: entry.initials, explorePrompt: entry.explorePrompt };
  }
  if (spec) return spec;
  // Entry-level initials/explorePrompt are EARLY-band conveniences — other
  // bands fall through to the scene's own initial state.
  if (band === 'early' && entry && (entry.initials || entry.explorePrompt)) {
    return { initials: entry.initials, explorePrompt: entry.explorePrompt };
  }
  return null;
}

/* Child-facing surfaces never show the "(age 7+)" curation suffix. */
function stripAge(name) {
  return normKey(name).replace(/\s*\(age[^)]*\)\s*/i, '').trim();
}

/* Child-facing label for a (teacher-worded) topic name: exact table →
   age-suffix-insensitive table → regular-name patterns. Null if un-glossed. */
function glossFor(name) {
  const stripped = stripAge(name);
  if (CHILD_GLOSS[normKey(name)]) return CHILD_GLOSS[normKey(name)];
  for (const key of Object.keys(CHILD_GLOSS)) {
    if (stripAge(key).toLowerCase() === stripped.toLowerCase()) return CHILD_GLOSS[key];
  }
  for (const pat of CHILD_GLOSS_PATTERNS) {
    if (pat.re.test(stripped)) return { label: pat.label(stripped.match(pat.re)) };
  }
  return null;
}

function tokenize(s) {
  return new Set(String(s).toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter((w) => w.length > 3));
}
function jaccard(a, b) {
  const A = tokenize(a), B = tokenize(b);
  let inter = 0;
  A.forEach((w) => { if (B.has(w)) inter += 1; });
  const uni = A.size + B.size - inter;
  return uni ? inter / uni : 1;
}

/* ---------------- arcade generators ---------------- */

function nearMisses(n, spread = [1, -1, 10, -10, 2]) {
  const out = new Set();
  const opts = [...spread].sort(() => Math.random() - 0.5);
  for (const d of opts) {
    const v = n + d;
    if (v >= 0 && v !== n && out.size < 2) out.add(v);
  }
  while (out.size < 2) out.add(Math.max(0, n + out.size + 1));
  return [...out];
}

function arcadeBank(kind, band) {
  const items = [];
  const push = (prompt, correct, wrongs, why) => items.push({
    prompt,
    choices: [{ text: String(correct), correct: true }, ...wrongs.map((w) => ({ text: String(w) }))],
    why,
  });

  if (kind === 'addsub') {
    // Band ceilings follow the taxonomy: early within 20, mid within 1000
    // (2-digit mental), upper 3-digit mental fluency.
    const RA = band === 'early' ? 10 : band === 'mid' ? 100 : 1000;
    for (let i = 0; i < 14; i++) {
      if (i % 2 === 0) {
        const a = 1 + Math.floor(Math.random() * RA), b = 1 + Math.floor(Math.random() * RA);
        push(`${a} + ${b} = ?`, a + b, nearMisses(a + b, RA > 100 ? [1, -1, 10, -10, 100, -100] : RA > 20 ? [1, -1, 10, -10] : [1, -1, 2]), `${a} + ${b} — count on from ${a}!`);
      } else {
        let a = 2 + Math.floor(Math.random() * RA), b = 1 + Math.floor(Math.random() * a);
        if (a - b < 0) [a, b] = [b, a];
        push(`${a} − ${b} = ?`, a - b, nearMisses(a - b, RA > 100 ? [1, -1, 10, -10] : [1, -1, 2]), `Take ${b} away from ${a}.`);
      }
    }
  } else if (kind === 'multdiv') {
    // Early: array-age facts (2/5/10 up to ×5). Mid: age-8 ceiling is all
    // tables to 12×12. Upper: full fluency incl. 11s and 12s.
    const tables = band === 'early' ? [2, 5, 10] : band === 'mid' ? [2, 3, 4, 5, 6, 8, 10, 12] : [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    const bMax = band === 'early' ? 5 : 12;
    for (let i = 0; i < 14; i++) {
      const t = tables[Math.floor(Math.random() * tables.length)];
      const b = 1 + Math.floor(Math.random() * bMax);
      if (i % 3 === 2) {
        push(`${t * b} ÷ ${t} = ?`, b, nearMisses(b), `${t} × ${b} = ${t * b}, so ${t * b} ÷ ${t} = ${b}.`);
      } else {
        push(`${t} × ${b} = ?`, t * b, nearMisses(t * b, t * b > 60 ? [1, -1, 10, -10, t, -t] : [1, -1, 2, t]), `${t} groups of ${b}.`);
      }
    }
  } else if (kind === 'counting') {
    const fruits = ['🍎', '🐥', '⭐', '🍪', '🎈'];
    if (band === 'early') {
      for (let i = 0; i < 10; i++) {
        const n = 3 + Math.floor(Math.random() * 10);
        const f = fruits[i % fruits.length];
        push(`Count: ${f.repeat(n)} — how many?`, n, nearMisses(n, [1, -1, 2]), `Point and count: 1, 2, 3… ${n}!`);
      }
    } else {
      // Mid counting topics are skip counting (4s, 6s, 8s, 50s, 100s), not
      // object counting — swap the item type, not just the range.
      const steps = [4, 6, 8, 25, 50, 100];
      for (let i = 0; i < 10; i++) {
        const st = steps[i % steps.length];
        const start = st * (1 + Math.floor(Math.random() * 3));
        const seq = [start, start + st, start + 2 * st, start + 3 * st];
        push(`${seq.join(', ')}, … what comes next?`, start + 4 * st, nearMisses(start + 4 * st, [st, -st, 1]), `Counting in ${st}s — every jump adds ${st}!`);
      }
    }
  } else if (kind === 'fractions') {
    // Spiral: early halves/quarters → mid compare & equivalence → upper of-amounts & decimals link.
    const frBanks = {
      early: [
        ['What is half of 8?', '4', '16', 'Half of 8 is 4.'],
        ['What is half of 10?', '5', '20', 'Half of 10 is 5.'],
        ['How many quarters make a whole?', '4', '2', 'Four quarters fill one whole.'],
        ['Which shows one whole?', '4/4', '3/4', 'When top equals bottom, the whole is taken.'],
        ['Which is bigger: 1/2 or 1/4?', '1/2', '1/4', 'Fewer slices = bigger slices!'],
        ['Cut into 2 equal parts. Each part is a…', 'half', 'quarter', 'Two equal parts make halves.'],
      ],
      mid: [
        ['Which is bigger: 1/2 or 1/3?', '1/2', '1/3', 'Bigger bottom number = smaller slices!'],
        ['Which is smaller: 1/4 or 1/8?', '1/8', '1/4', 'More slices means each slice is smaller.'],
        ['Which is bigger: 2/4 or 1/2?', 'They are equal!', '2/4', '2/4 and 1/2 are the same amount — equivalent fractions!'],
        ['3/8 + 2/8 = ?', '5/8', '5/16', 'Same denominator: add the tops, keep the bottom.'],
        ['How many tenths make one whole?', '10', '5', 'Ten tenths fill one whole — decimals live here!'],
        ['Which is equivalent to 1/2?', '4/8', '4/6', 'Multiply top AND bottom by the same number: 1/2 = 4/8.'],
      ],
      upper: [
        ['What is 1/2 of 12?', '6', '24', 'Half of 12 is 6 — “of” means multiply.'],
        ['What is 3/4 of 20?', '15', '5', '20 ÷ 4 = 5 per quarter; 3 quarters = 15.'],
        ['Which is bigger: 2/3 or 3/5?', '2/3', '3/5', 'Common denominator: 10/15 beats 9/15.'],
        ['0.5 as a fraction is…', '1/2', '1/5', 'Five tenths = one half. Decimals are fractions in disguise!'],
        ['Which decimal equals 3/10?', '0.3', '3.0', 'Three tenths = 0.3. Tenths live right after the point.'],
        ['Simplify 6/8.', '3/4', '2/3', 'Divide top and bottom by 2: 6/8 = 3/4.'],
      ],
    };
    frBanks[band].forEach(([q, c, w, why]) => items.push({ prompt: q, choices: [{ text: c, correct: true }, { text: w }], why }));
    for (let i = 0; i < 12; i++) {
      const base = band === 'early' ? 10 + Math.floor(Math.random() * 89) : band === 'mid' ? 100 + Math.floor(Math.random() * 899) : 1000 + Math.floor(Math.random() * 8999);
      if (i % 3 === 0) push(`What is 10 more than ${base}?`, base + 10, nearMisses(base + 10, base > 999 ? [1, -1, 10, -10, 100] : [1, -1, 100]), `10 more adds one ten: ${base + 10}.`);
      else if (i % 3 === 1) push(`Which digit is in the tens place in ${base}?`, Math.floor((base % 100) / 10), nearMisses(Math.floor((base % 100) / 10), [1, -1, 5]), `Tens are the second digit from the right.`);
      else {
        const fd = Number(String(base)[0]) * Math.pow(10, String(base).length - 1);
        push(`What is the value of the first digit of ${base}?`, fd, nearMisses(fd, [1, -1, fd / 10, fd * 10].filter((v) => v > 0)), 'The digit\u2019s place decides its value.');
      }
    }
    if (band === 'upper') {
      const ups = [
        ['What is 10 × 60?', '600', '60', '× 10 shifts the digit one place left: 600.'],
        ['Which is worth more: 5 thousands or 50 tens?', '5 thousands', '50 tens', '5,000 beats 500 — place beats count!'],
        ['Round 4,850 to the nearest thousand.', '5,000', '4,000', '850 is past halfway — round up.'],
        ['What is 100 more than 3,700?', '3,800', '3,710', 'The hundreds digit moves: 3,700 → 3,800.'],
        ['What is 10 ÷ 10 … and 10,000 ÷ 10?', '1 and 1,000', '1 and 100', '÷ 10 shifts digits one place right each time.'],
      ];
      ups.forEach(([q, c, w, why]) => items.push({ prompt: q, choices: [{ text: String(c), correct: true }, { text: String(w) }], why }));
    }
  } else if (kind === 'geometry') {
    // Band-tiered fact banks: naming → properties/3-D → angle sums,
    // coordinates, circle parts.
    const geometryBanks = {
      early: [
        ['How many sides does a triangle have?', '3', '4', 'Tri means three!'],
        ['How many sides does a square have?', '4', '3', 'Four equal sides.'],
        ['How many sides does a pentagon have?', '5', '6', 'Pent = five, like the Pentagon building.'],
        ['How many sides does a hexagon have?', '6', '5', 'Hex = six — honeycomb cells are hexagons.'],
        ['How many sides does an octagon have?', '8', '6', 'Oct = eight, like an octopus.'],
        ['How many corners does a square have?', '4', '2', 'Sides and corners always match.'],
        ['Which shape has 3 corners?', 'Triangle', 'Square', 'Triangle: 3 sides, 3 corners.'],
        ['Which shape is round with no corners?', 'Circle', 'Triangle', 'A circle is one curved line.'],
      ],
      mid: [
        ['How many right angles does a rectangle have?', '4', '2', 'Every corner is square — four right angles.'],
        ['How many lines of symmetry does a square have?', '4', '2', 'Fold it four ways: across, down and both diagonals.'],
        ['Parallel lines are lines that…', 'never meet', 'always cross', 'Train-track lines stay the same distance apart.'],
        ['How many faces does a cube have?', '6', '4', 'Front, back, top, bottom, left, right — six.'],
        ['A right angle is a quarter turn — how many degrees?', '90°', '45°', 'A full turn is 360°, so a quarter is 90°.'],
        ['A quadrilateral is a shape with how many sides?', '4', '5', 'Quad means four, like four wheels.'],
        ['Which shape has all sides equal AND all angles right?', 'Square', 'Rectangle', 'A rectangle has equal angles; a square adds equal sides.'],
        ['How many edges does a triangular prism have?', '9', '6', 'Three edges on each triangle plus three joining them.'],
      ],
      upper: [
        ['Angles on a straight line add up to…', '180°', '360°', 'Half a full turn: 180°.'],
        ['Angles in ANY triangle add up to…', '180°', '360°', 'Tear the three corners off and line them up — a straight line!'],
        ['Angles in any quadrilateral add up to…', '360°', '180°', 'Two triangles hiding inside: 2 × 180°.'],
        ['In the point (3, 2), the 3 tells you to go…', '3 across, then 2 up', '3 up, then 2 across', 'Across first, then up — x before y!'],
        ['The distance all the way around a circle is its…', 'circumference', 'diameter', 'Circumference walks the whole rim.'],
        ['A quarter turn measures how many degrees?', '90°', '45°', '360° ÷ 4 = 90°.'],
        ['Half a turn measures how many degrees?', '180°', '90°', '360° ÷ 2 = 180°.'],
        ['The radius of a circle reaches from the centre to…', 'the edge', 'across the whole circle', 'Radius is centre-to-edge; diameter goes all the way across.'],
      ],
    };
    geometryBanks[band].forEach(([q, c, w, why]) => items.push({ prompt: q, choices: [{ text: c, correct: true }, { text: w }], why }));
  } else if (kind === 'measurement') {
    // Spiral: early tools & units → mid conversions & perimeter → upper metric/imperial & volume.
    const meBanks = {
      early: [
        ['Which tool measures length?', 'Ruler', 'Clock', 'A ruler is marked in equal units.'],
        ['Which unit suits a pencil?', 'cm', 'kg', 'Pencils are short — centimeters fit.'],
        ['Which is longer: 1 meter or 1 cm?', '1 meter', '1 cm', 'A meter is 100 centimeters!'],
        ['What starts every measurement on a ruler?', 'Zero', 'Ten', 'Line up at zero or the measure is off.'],
        ['Which unit suits your height?', 'meters', 'grams', 'Height is length — meters.'],
        ['Which is shorter: 5 cm or 9 cm?', '5 cm', '9 cm', 'Bigger number, longer object.'],
      ],
      mid: [
        ['4 cm is how many mm?', '40 mm', '4 mm', '10 mm per cm: 4 cm = 40 mm.'],
        ['Perimeter means…', 'The distance all the way around', 'The space inside', 'Walk the edges — that is the perimeter.'],
        ['1 kg is how many grams?', '1,000 g', '100 g', 'Kilo means a thousand.'],
        ['Which unit measures how much a jug HOLDS?', 'Litres', 'Metres', 'Capacity in litres and millilitres.'],
        ['Half a metre is…', '50 cm', '20 cm', '100 cm ÷ 2 = 50 cm.'],
        ['Which is heavier: 800 g or 2 kg?', '2 kg', '800 g', '2 kg = 2,000 g — beats 800.'],
      ],
      upper: [
        ['5 miles is about…', '8 km', '3 km', 'A mile is about 1.6 km: 5 × 1.6 = 8.'],
        ['Volume of a 2×3×4 box in cubes…', '24', '9', 'Length × width × height = 24 cubic units.'],
        ['Which is the best buy: 500 g for £2 or 1 kg for £3?', '1 kg for £3', '500 g for £2', 'Two 500 g packs cost £4 — the kilo saves £1.'],
        ['Convert 2.5 litres to millilitres.', '2,500 ml', '250 ml', '× 1,000 for litres to millilitres.'],
        ['A cube with 2 cm edges has volume…', '8 cm³', '6 cm³', '2 × 2 × 2 = 8 cubic centimetres.'],
        ['Which is closest to your height?', '1.4 metres', '14 metres', 'Metres for people; kilometres for roads.'],
      ],
    };
    meBanks[band].forEach(([q, c, w, why]) => items.push({ prompt: q, choices: [{ text: c, correct: true }, { text: w }], why }));
    // Spiral: early pictogram basics → mid scaled bars & mode → upper mean & line graphs.
    const daBanks = {
      early: [
        ['Votes: apples 8, bananas 3. Which won?', 'Apples', 'Bananas', '8 is more than 3.'],
        ['In a bar chart, a missing bar means…', 'Zero', 'Ten', 'No bar = no votes.'],
        ['The tallest bar shows the…', 'Winner', 'Loser', 'Height matches the number.'],
        ['You ask 10 friends their favorite color. This is called…', 'Collecting data', 'Guessing', 'Collected answers are data.'],
        ['Votes: dogs 5, cats 5. The result is…', 'A tie', 'Dogs win', 'Equal numbers tie.'],
        ['Each picture on a pictogram stands for…', 'One vote', 'One colour', 'Pictograms use one symbol per count — at first!'],
      ],
      mid: [
        ['A bar reaches 30 when each square is 10. How many squares?', '3', '30', 'Scaled bars: 30 ÷ 10 = 3 squares.'],
        ['Scores: 4, 7, 7, 9. The mode (most common) is…', '7', '9', 'Mode = the one that appears MOST.'],
        ['Which axis shows the categories on a bar chart?', 'The horizontal one', 'The vertical one', 'Categories sit along the bottom; numbers climb the side.'],
        ['A tally of |||| shows what number?', '5', '4', 'Four strokes plus the cross-bar = 5.'],
        ['Which display suits “favourite sport” out of 6 choices?', 'Bar chart', 'Line graph', 'Bars compare categories; lines track change over time.'],
        ['Two-group survey: which chart compares girls vs boys best?', 'Side-by-side bars', 'One bar', 'Paired bars make the comparison instant.'],
      ],
      upper: [
        ['Heights: 4, 6, 8. The mean is…', '6', '8', 'Mean = total ÷ count: 18 ÷ 3 = 6.'],
        ['A line graph is best for showing…', 'Change over time', 'Categories', 'Lines trace trends — temperature, growth, sales.'],
        ['The mean of 3, 5 and 10 is…', '6', '9', '3 + 5 + 10 = 18; 18 ÷ 3 = 6.'],
        ['A pie chart shows…', 'Shares of a whole', 'Change over time', 'Pie slices are fractions of the total.'],
        ['Why can a mean be misleading?', 'One huge value drags it up', 'It is always wrong', 'Outliers pull the mean — medians resist them.'],
        ['Two line graphs cross. That point shows…', 'They were equal there', 'A mistake', 'Crossing = the moment values matched.'],
      ],
    };
    daBanks[band].forEach(([q, c, w, why]) => items.push({ prompt: q, choices: [{ text: c, correct: true }, { text: w }], why }));
    for (let i = 0; i < 10; i++) {
      const pool = band === 'early' ? [1, 2, 5, 10] : band === 'mid' ? [3, 4, 6, 8, 25] : [6, 7, 9, 12, 15, 25];
      const start = 1 + Math.floor(Math.random() * 9);
      const step = pool[Math.floor(Math.random() * pool.length)];
      const seq = [start, start + step, start + 2 * step, start + 3 * step];
      push(`${seq.join(', ')}, … what comes next?`, start + 4 * step, nearMisses(start + 4 * step, [step, -step, 1]), `Add ${step} each jump.`);
    }
  } else if (kind === 'ratio') {
    const facts = [
      ['Recipe: 1 cup rice needs 2 cups water. 3 cups rice need…?', '6 cups', '3 cups', 'Keep the 1-to-2 ratio: 3 × 2 = 6.'],
      ['Double of 3 cakes is…?', '6', '5', 'Double means times two.'],
      ['Share 6 sweets 1-to-1 between 2 kids: each gets…?', '3', '2', 'Fair shares are equal.'],
      ['If 2 pencils cost 4 coins, 4 pencils cost…?', '8 coins', '6 coins', 'Twice the pencils, twice the coins.'],
    ];
    facts.forEach(([q, c, w, why]) => items.push({ prompt: q, choices: [{ text: c, correct: true }, { text: w }], why }));
  } else if (kind === 'thinking') {
    // Spiral: early parity & jumps → mid rules & primes → upper operations & reasoning.
    const thBanks = {
      early: [
        ['Which does not belong: 2, 4, 6, 7?', '7', '6', 'All the others are even.'],
        ['2, 4, 6, 8 are all ___ numbers.', 'even', 'odd', 'Even numbers end in 0, 2, 4, 6, 8.'],
        ['3, 6, 9, 12 — counting in…?', 'threes', 'twos', 'Each jump adds 3.'],
        ['What do 2, 5 and 8 have in common?', 'They are jumps of 3', 'Nothing', '2 + 3 = 5, 5 + 3 = 8 — a hidden pattern!'],
        ['10, 20, 30 — the rule is…?', 'add 10', 'add 5', 'Each number grows by 10.'],
        ['Odd + odd makes…', 'an even number', 'an odd number', 'Two odds pair up to make an even!'],
      ],
      mid: [
        ['Which is a square number?', '16', '18', '4 × 4 = 16 — square numbers grow 1, 4, 9, 16…'],
        ['The rule “×2 then +1” on 3 gives…', '7', '6', '3 × 2 = 6, then +1 = 7.'],
        ['Which does not belong: 12, 15, 16, 18?', '16', '12', 'The others are multiples of 3.'],
        ['A number with exactly 2 factors is…', 'prime', 'square', 'Primes: 2, 3, 5, 7, 11 — only 1 and themselves.'],
        ['If all roses fade, and this is a rose, then…', 'it will fade', 'it stays bright', 'Following the rule is what reasoning means.'],
        ['1, 1, 2, 3, 5, 8 — each number is…', 'the sum of the two before it', 'doubled', 'The Fibonacci pattern: 3 + 5 = 8!'],
      ],
      upper: [
        ['What is 2 + 3 × 4?', '14', '20', 'Order of operations: multiply first, then add.'],
        ['(2 + 3) × 4 = ?', '20', '14', 'Brackets first! Same numbers, different answer.'],
        ['Which is the best estimate for 49 × 21?', 'about 1,000', 'about 500', '50 × 20 = 1,000 — round then multiply.'],
        ['Consecutive numbers always differ by…', '1', '2', 'Consecutive means one after another.'],
        ['Which is true for ANY number n?', '2n is always even', '2n is sometimes odd', 'Doubling ANY number lands on an even.'],
        ['A “counterexample” is…', 'one case that breaks the rule', 'a rule that works', 'One exception disproves an “always” claim.'],
      ],
    };
    thBanks[band].forEach(([q, c, w, why]) => items.push({ prompt: q, choices: [{ text: c, correct: true }, { text: w }], why }));
    const facts = [
      ['___ going home.', "They're", 'Their', 'They’re = they are. Their shows ownership.'],
      ['The dog wagged ___ tail.', 'its', "it's", 'It’s means “it is” — the possessive is its.'],
      ['Which sentence is right?', 'We saw Paris.', 'we saw paris.', 'Capitals for the sentence start and place names.'],
      ['Which ends a question?', '?', '.', 'Questions take a question mark.'],
      ['“Quickly” describes HOW — it is an…', 'adverb', 'noun', 'Adverbs tell how, when or where.'],
      ['Pick the past tense: Today I walk. Yesterday I ___.', 'walked', 'walk', 'Yesterday needs the past: walked.'],
    ];
    facts.forEach(([q, c, w, why]) => items.push({ prompt: q, choices: [{ text: c, correct: true }, { text: w }], why }));
  } else if (kind === 'spelling') {
    const pairs = [['friend', 'freind'], ['because', 'becuase'], ['said', 'saied'], ['beautiful', 'beutiful'], ['separate', 'seperate'], ['definitely', 'definately'], ['school', 'skool'], ['people', 'pepole']];
    pairs.forEach(([good, bad]) => items.push({ prompt: 'Which spelling is right?', choices: [{ text: good, correct: true }, { text: bad }], why: `${good} — remember it as a pattern, not a guess.` }));
  }
  return items;
}

/* ---------------- course builder ---------------- */

export function buildCourses(data) {
  const { clusters, topics, researchByTopic } = data;
  const topicsByCluster = new Map();
  for (const t of topics) {
    const key = `${t.subject}|${t.domain}|${t.ageRangeStart}`;
    if (!topicsByCluster.has(key)) topicsByCluster.set(key, []);
    topicsByCluster.get(key).push(t);
  }

  const courses = [];
  const usedSlugs = new Set();
  const topicsById = new Map();
  for (const t of topics) topicsById.set(t.id, t);

  // Coverage: every primary-school (Ages 5–10 / K–G5) combo with topics becomes a course.
  // Combos that also exist in clusters.json keep their curated summary; the
  // rest are marked draft (auto-derived framing, labeled on page + hub).
  const comboList = [];
  for (const [key, tlist] of topicsByCluster.entries()) {
    const age = Number(key.split('|')[2]);
    if (age >= 5 && age <= 10) comboList.push({ key, topics: tlist, cluster: null });
  }
  for (const cluster of clusters) {
    const key = `${cluster.subject}|${cluster.domain}|${cluster.ageRangeStart}`;
    const existing = comboList.find((c) => c.key === key);
    if (existing) existing.cluster = cluster;
  }
  comboList.sort((a, b) => a.key.localeCompare(b.key));

  for (const entry of comboList) {
    const [subjectRaw, domainRaw, ageRaw] = entry.key.split('|');
    const subject = subjectRaw;
    const domain = domainRaw;
    const age = Number(ageRaw);
    const cluster = entry.cluster;
    const key = `${normKey(subject)}|${normKey(domain)}`;
    const map = DOMAINS[key];
    if (!map) {
      console.warn(`No mapping for ${key} — course will use universal modes only.`);
    }
    const sub = SUBJECTS[subject] || { theme: 'How the world works', concepts: ['Form', 'Function'], profile: ['Inquirers'], atl: ['Thinking skills'], emoji: '📘' };

    const band = bandOf(age);
    const grade = gradeOf(age);
    const rawTopics = entry.topics
      .slice()
      .sort((a, b) => (b.centrality || 0) - (a.centrality || 0));

    // Dedupe near-identical names ("X" vs "X (age 8+)").
    const seen = new Set();
    const topics = [];
    for (const t of rawTopics) {
      const b = baseName(t.name);
      if (seen.has(b)) continue;
      seen.add(b);
      topics.push(t);
    }

    const slugBase = `${age}-${slugify(domain)}`;
    let slug = slugBase;
    if (usedSlugs.has(slug)) slug = `${age}-${slugify(domain)}-${slugify(subject)}`;
    usedSlugs.add(slug);

    const research = topics.map((t) => researchByTopic.get(t.id)).filter(Boolean);
    const misconceptions = [];
    for (const r of research) {
      const eps = (r.assess && r.assess.errorPatterns) || [];
      for (const ep of eps) {
        if (ep.kind === 'misconception' && ep.pattern) {
          misconceptions.push({ topic: (topicsById.get(r.topicId) || {}).name || 'a related idea', pattern: ep.pattern, nextMove: ep.nextMove || '' });
          break;
        }
      }
    }
    const activities = research.flatMap((r) => ((r.learn && r.learn.activities) || []).map((a) => a.title)).filter(Boolean).slice(0, 4);
    const poeTask = research.map((r) => r.assess && r.assess.poeTask).find(Boolean) || '';

    // ---- modes ----
    const modes = [];
    const exploreModes = resolveAgeExploreModes({
      subject,
      domain,
      age,
      band,
      topics,
      map,
      bandSpecFor,
      bandModeFor,
      glossFor,
    });
    modes.push(...exploreModes);

    const ctxAge = { subject, domain, age, band, topics, researchByTopic, glossFor };

    if (map && map.spatial3d) {
      const spatialBand = bandModeFor(subject, domain, 'spatial3d', band);
      modes.push(specializeModeForAge({
        engine: 'spatial3d',
        phase: 'explore',
        label: '3D Earth & Sun',
        icon: '🌍',
        config: { cases: (spatialBand && spatialBand.cases) || map.spatial3d.cases },
      }, ctxAge));
    }
    if (map && map.sorter) {
      const sorterConfig = bandModeFor(subject, domain, 'sorter', band) || map.sorter;
      modes.push(specializeModeForAge({ engine: 'sorter', phase: 'understand', label: 'Sort it out', icon: '🧺', config: sorterConfig }, ctxAge));
    }
    if (map && (map.sequence || map.sequenceByBand)) {
      const seqConfig = bandModeFor(subject, domain, 'sequence', band)
        || (map.sequenceByBand && map.sequenceByBand[band])
        || map.sequence;
      if (seqConfig) {
        modes.push(specializeModeForAge({
          engine: 'sequence',
          phase: 'understand',
          label: seqConfig.mode === 'cycle' ? 'Build the cycle' : 'Build the timeline',
          icon: '🧩',
          config: seqConfig,
        }, ctxAge));
      }
    }
    if (map && map.storybook) {
      const bandBooks = map.storybook.books[band] || map.storybook.books.mid || map.storybook.books.early;
      if (bandBooks && bandBooks.length) {
        modes.push(specializeModeForAge({ engine: 'storybook', phase: 'explore', label: 'Story time', icon: '📖', config: { books: bandBooks } }, ctxAge));
      }
    }
    if (map && map.decision) {
      const decisionConfig = bandModeFor(subject, domain, 'decision', band) || map.decision;
      if (!decisionConfig.upperOnly || band === 'upper') {
        modes.push(specializeModeForAge({ engine: 'decision', phase: 'understand', label: 'Choice quest', icon: '🧭', config: decisionConfig }, ctxAge));
      }
    }
    if (map && map.doctor) {
      const doc = map.doctor[band] || map.doctor.mid || map.doctor.early;
      if (doc) modes.push(specializeModeForAge({ engine: 'doctor', phase: 'understand', label: 'Sentence clinic', icon: '🩺', config: doc }, ctxAge));
    }
    if (map && map.worksheet) {
      const words = map.worksheet.wordsByBand ? map.worksheet.wordsByBand[band] || map.worksheet.wordsByBand.mid : map.worksheet.words;
      if (words) {
        modes.push(specializeModeForAge({
          engine: 'worksheet',
          phase: 'practice',
          label: 'Print & practice',
          icon: '🖨️',
          config: { ...map.worksheet, words, defaultCount: 8 },
        }, ctxAge));
      }
    }
    if (map && map.memory) {
      const memoryConfig = bandModeFor(subject, domain, 'memory', band) || map.memory;
      modes.push(specializeModeForAge({ engine: 'memory', phase: 'practice', label: 'Match the pairs', icon: '🃏', config: memoryConfig }, ctxAge));
    }
    if (map && map.wordBuilder) {
      const words = map.wordBuilder.wordsByBand
        ? (map.wordBuilder.wordsByBand[band] || map.wordBuilder.wordsByBand.mid)
        : map.wordBuilder.words;
      if (words) {
        modes.push(specializeModeForAge({ engine: 'word-builder', phase: 'practice', label: 'Build the word', icon: '🔤', config: { ...map.wordBuilder, words } }, ctxAge));
      }
    }
    if (map && map.solar3d) {
      const solarBand = bandModeFor(subject, domain, 'solar3d', band);
      modes.push(specializeModeForAge({
        engine: 'solar3d',
        phase: 'explore',
        label: '3D solar tour',
        icon: '🪐',
        config: solarBand ? Object.assign({}, map.solar3d, solarBand) : map.solar3d,
      }, ctxAge));
    }
    if (map && map.volcano3d) {
      const volcanoBand = bandModeFor(subject, domain, 'volcano3d', band);
      modes.push(specializeModeForAge({
        engine: 'volcano3d',
        phase: 'explore',
        label: '3D volcano lab',
        icon: '🌋',
        config: volcanoBand ? Object.assign({}, map.volcano3d, volcanoBand) : map.volcano3d,
      }, ctxAge));
    }
    if (map && map.arcade) {
      const arcadeBand = bandModeFor(subject, domain, 'arcade', band);
      const items = arcadeBand ? arcadeBand.items : map.arcade.kind === 'bank' ? map.arcade.items : arcadeBank(map.arcade.kind, band);
      if (items && items.length) {
        modes.push(specializeModeForAge({
          engine: 'arcade',
          phase: 'practice',
          label: 'Speed sprint',
          icon: '⚡',
          config: { items, seconds: band === 'early' ? 60 : 45, emoji: map.emoji },
        }, ctxAge));
      }
    }

    // Universal modes: flashcards + mission — derived strictly from THIS exact age's topics & research (zero cross-age borrowing).
    const deck = buildAgeFlashcardDeck(topics, researchByTopic, age, band);
    if (deck.length >= 3) {
      modes.push({
        engine: 'flashcards',
        phase: 'cards',
        label: 'Wonder cards',
        icon: '🗂️',
        config: {
          explorePrompt: band === 'early'
            ? 'We will meet every wonder card one by one. Tap the card to flip it!'
            : 'Walk the wonder deck: tap a card to flip and discover, then press Next card.',
          deck,
        },
      });
    }
    const missionBank = buildMissionBank(topics, researchByTopic, age, band);
    if (missionBank.length >= 2) {
      modes.push({
        engine: 'mission',
        phase: 'consolidate',
        label: 'Show what you know',
        icon: '🎯',
        config: { bank: missionBank.slice(0, band === 'early' ? 4 : 5) },
      });
    }

    const draft = !cluster;
    const maxEnd = topics.length ? Math.max(...topics.map((t) => t.ageRangeEnd || age + 2)) : age + 2;
    const summary = draft
      ? `An inquiry into ${domain.toLowerCase()} for ages ${age}–${maxEnd}: ${topics.length} learning goals, including ${topics.slice(0, 3).map((t) => t.name).join(', ')}. This combination has no curated parent summary in the taxonomy yet, so the framing is auto-derived.`
      : cluster.summary;

    // Learning flow (user-set): play first, cards later —
    // lab/3D (explore) → interactive understand games → word cards →
    // practice drills → the independent check.
    const PHASE_ORDER = { explore: 0, understand: 1, cards: 2, practice: 3, consolidate: 4 };
    modes.sort((a, b) => PHASE_ORDER[a.phase] - PHASE_ORDER[b.phase]);
    if (band === 'early' && modes.length > 5) {
      const keepPriority = ['explore', 'understand', 'cards', 'consolidate', 'explore'];
      const kept = new Map();
      for (const ph of keepPriority) {
        if (kept.size >= 5) break;
        const m = modes.find((x) => x.phase === ph && !Array.from(kept.values()).includes(x));
        if (m) kept.set(ph + kept.size, m);
      }
      const rest = modes.filter((m) => !Array.from(kept.values()).includes(m));
      const room = 5 - kept.size;
      modes.length = 0;
      modes.push(...kept.values(), ...rest.slice(0, Math.max(room, 0)));
      modes.sort((a, b) => PHASE_ORDER[a.phase] - PHASE_ORDER[b.phase]);
    }

    const linesOfInquiry = [
      `What exactly is ${domain.toLowerCase()}?`,
      topics.length > 1 ? `How do “${trimSentence(topics[0].name, 40)}” and “${trimSentence((topics[1] || topics[0]).name, 40)}” connect?` : `Where do we see ${domain.toLowerCase()} around us?`,
      `How can we use ${domain.toLowerCase()} in our own lives?`,
    ];

    const course = {
      slug,
      title: domain,
      shortTitle: domain.length > 26 ? domain.split(/[\s&]+/)[0] : domain,
      subject,
      domain,
      age,
      grade,
      gradeLabel: gradeLabel(grade),
      band,
      ageLabel: topics.length ? `Ages ${age}–${maxEnd}` : `Age ${age}`,
      draft,
      homeReading: (map && map.homeReading) ? (map.homeReading[band] || null) : null,
      summary,
      theme: sub.theme,
      centralIdea: (map && map.centralIdea) || `An inquiry into ${domain.toLowerCase()} and how it shapes the world around us.`,
      linesOfInquiry,
      keyConcepts: sub.concepts,
      learnerProfile: sub.profile,
      atl: sub.atl,
      emoji: (map && map.emoji) || sub.emoji,
      coverArt: (map && map.coverArt) || [sub.emoji, '✨'],
      artPalette: (map && map.artPalette) || ['#FFE156', '#4ECDC4', '#FF6584', '#B388FF'],
      dark: !!(map && map.dark),
      question: (map && map.question) || `What can we discover about ${domain.toLowerCase()}?`,
      kicker: `${domain} · ${subject} · Age ${age}${draft ? ' · Draft course' : ''}`,
      vocab: { ...SHARED_VOCAB, ...((map && map.vocab) || {}) },
      topics: topics.map((t) => ({
        name: t.name,
        desc: trimSentence(t.description, 170),
        evidence: (t.evidence || []).slice(0, 3),
        type: t.type,
      })),
      misconceptions: misconceptions.slice(0, 6),
      activities,
      poeTask: trimSentence(poeTask, 300),
      modes,
      stats: {
        topicCount: topics.length,
        researchCount: research.length,
      },
    };
    courses.push(course);
  }

  courses.sort((a, b) => a.subject.localeCompare(b.subject) || a.age - b.age || a.domain.localeCompare(b.domain));
  return courses;
}

/* Build Wonder Cards strictly from THIS exact age's topics & research (zero cross-age borrowing).
   When a course has < 3 topics, expand using its own evidence[] statements and research activities. */
function buildAgeFlashcardDeck(topics, researchByTopic, age, band) {
  const deckCap = band === 'early' ? 8 : band === 'mid' ? 10 : 12;
  const descCap = band === 'early' ? 100 : band === 'mid' ? 200 : 280;
  const deck = [];

  for (let i = 0; i < topics.length && deck.length < deckCap; i++) {
    const t = topics[i];
    const g = glossFor(t.name);
    const label = (g && g.label) || stripAge(t.name);
    const safeEvs = (t.evidence || []).filter((e) => e && !isCitation(e));
    const safeEvidence = safeEvs[0] || '';
    const desc = cleanDescription(t.description);
    const plainBack = safeEvidence || desc || '';
    const backSource = desc && desc.length <= descCap ? desc
      : safeEvidence && safeEvidence.length <= 160 ? safeEvidence
      : desc || plainBack;
    deck.push({
      front: label,
      back: (g && g.back) || (band === 'early' ? trimCardBack(plainBack, 100) : trimCardBack(backSource, descCap)),
      tryIt: safeEvs[1] ? trimCardBack(safeEvs[1], 110) : (band === 'upper' && safeEvidence ? trimCardBack(safeEvidence, 120) : ''),
      emoji: FCard_EMOJI[deck.length % FCard_EMOJI.length],
    });
  }

  // If this exact age has fewer than 4 topics, expand strictly from this age's own evidence[] & research activities
  if (deck.length < 4) {
    for (let i = 0; i < topics.length && deck.length < 4; i++) {
      const t = topics[i];
      const g = glossFor(t.name);
      const baseLabel = (g && g.label) || stripAge(t.name);
      const safeEvs = (t.evidence || []).filter((e) => e && !isCitation(e));
      for (let k = 1; k < safeEvs.length && deck.length < 4; k++) {
        deck.push({
          front: `${baseLabel} · Clue ${k}`,
          back: trimCardBack(safeEvs[k], descCap),
          tryIt: safeEvs[0] ? trimCardBack(safeEvs[0], 100) : '',
          emoji: FCard_EMOJI[deck.length % FCard_EMOJI.length],
        });
      }
      const r = researchByTopic.get(t.id);
      const acts = (r && r.learn && r.learn.activities) || [];
      for (let aIdx = 0; aIdx < acts.length && deck.length < 4; aIdx++) {
        const act = acts[aIdx];
        const actSummary = cleanDescription(act.summary || act.title || '');
        if (!actSummary || isCitation(actSummary)) continue;
        deck.push({
          front: `${baseLabel} · Try ${aIdx + 1}`,
          back: trimCardBack(actSummary, descCap),
          tryIt: act.title ? trimCardBack(act.title, 95) : '',
          emoji: FCard_EMOJI[deck.length % FCard_EMOJI.length],
        });
      }
    }
  }

  // Fallback if still < 3 cards (e.g. a 1-topic cluster with only 1 evidence item): add an inquiry reflection card for that topic
  while (deck.length < 3 && topics.length > 0) {
    const t = topics[0];
    const g = glossFor(t.name);
    const baseLabel = (g && g.label) || stripAge(t.name);
    const n = deck.length;
    deck.push({
      front: `${baseLabel} · Step ${n}`,
      back: trimCardBack(cleanDescription(t.description) || `Explore how ${baseLabel.toLowerCase()} works in real life at Age ${age}.`, descCap),
      tryIt: `Spot an example of ${baseLabel.toLowerCase()} today!`,
      emoji: FCard_EMOJI[deck.length % FCard_EMOJI.length],
    });
  }

  return deck;
}

/* Mission bank: IB POE / Inquiry diagnostic check built strictly from THIS exact age's
   topics and teaching-research.json errorPatterns (zero cross-age borrowing, zero self-matching prompt). */
function buildMissionBank(topics, researchByTopic, age, band) {
  const trimFor = (text) => (band === 'early' ? trimSentence(text, 102) : trimSentence(text, 175));
  const bank = [];
  const usable = topics.filter((t) => (t.evidence && t.evidence.some((e) => !isCitation(e))) || t.description);
  if (!usable.length) return bank;

  const inquiryPrompts = (label, variant, isEarly) => {
    if (isEarly) {
      const templates = [
        `How can we show “${label}” in action?`,
        `Which clue proves you know “${label}”?`,
        `What is true when we explore “${label}”?`,
        `Which step matches “${label}”?`,
      ];
      const p = templates[variant % templates.length];
      return p.length <= 105 ? p : trimSentence(`Which choice shows “${label}”?`, 102);
    }
    const templates = [
      `Predict and explain: which evidence best shows “${label}” in action at Age ${age}?`,
      `Investigation check: which observation proves how “${label}” works?`,
      `Think like an inquirer: which step demonstrates “${label}” accurately?`,
      `Spot the pattern: which statement is true when testing “${label}”?`,
    ];
    return trimSentence(templates[variant % templates.length], 175);
  };

  for (let tIdx = 0; tIdx < usable.length; tIdx++) {
    const t = usable[tIdx];
    const gloss = glossFor(t.name);
    const conceptLabel = (gloss && gloss.label) || stripAge(t.name);
    const safeEvs = (t.evidence || []).filter((e) => e && !isCitation(e));
    if (!safeEvs.length && t.description && !isCitation(t.description)) {
      safeEvs.push(cleanDescription(t.description));
    }
    const r = researchByTopic.get(t.id);
    const eps = ((r && r.assess && r.assess.errorPatterns) || []).filter(
      (ep) => (ep.distractor || ep.pattern) && !isCitation(ep.distractor || '') && !isCitation(ep.pattern || '')
    );

    // Determine how many questions to generate for this topic so small clusters still get >= 3 questions
    const qCountForTopic = usable.length === 1 ? Math.min(4, Math.max(3, safeEvs.length))
      : usable.length === 2 ? Math.min(2, Math.max(2, safeEvs.length))
      : 1;

    for (let qIdx = 0; qIdx < qCountForTopic; qIdx++) {
      const correctRaw = safeEvs[qIdx % safeEvs.length] || `I can explore and explain ${conceptLabel.toLowerCase()}.`;
      const correctText = trimFor(correctRaw);
      const promptText = inquiryPrompts(conceptLabel, tIdx + qIdx, band === 'early');

      // Build 2 age-matched distractors (same-age siblings + misconception patterns + contrast moves)
      const distractorChoices = [];
      const usedTexts = new Set([correctText.trim().toLowerCase(), promptText.trim().toLowerCase()]);

      // 1. Same-age sibling topic evidence
      const sameAgeSiblings = usable.filter((s) => s.id !== t.id);
      for (const sib of sameAgeSiblings) {
        if (distractorChoices.length >= 2) break;
        const sibEvs = (sib.evidence || []).filter((e) => e && !isCitation(e));
        const cand = trimFor(sibEvs[qIdx % Math.max(1, sibEvs.length)] || '');
        if (cand && !usedTexts.has(cand.trim().toLowerCase())) {
          usedTexts.add(cand.trim().toLowerCase());
          const sibGloss = glossFor(sib.name);
          const sibLabel = (sibGloss && sibGloss.label) || stripAge(sib.name);
          distractorChoices.push({
            text: cand,
            why: `That evidence belongs to “${sibLabel}”. Look for the clue that specifically shows “${conceptLabel}”.`,
          });
        }
      }

      // 2. Researched misconception distractors for this topic
      for (const ep of eps) {
        if (distractorChoices.length >= 2) break;
        const rawDist = ep.distractor
          ? `Thinking that ${String(ep.distractor).replace(/\.$/, '')}.`
          : ep.pattern;
        if (!rawDist || isCitation(rawDist)) continue;
        const cand = trimFor(rawDist);
        if (cand && !usedTexts.has(cand.trim().toLowerCase())) {
          usedTexts.add(cand.trim().toLowerCase());
          const move = (ep.nextMove || `Test the idea step by step to see how ${conceptLabel} works.`).replace(/^(Independent moves — )/, '');
          distractorChoices.push({
            text: cand,
            why: `Watch out for that common trap! ${trimSentence(move, 140)}`,
          });
        }
      }

      // 3. Fallback inquiry misconception contrasts (strictly about this topic, zero cross-age borrowing)
      const fallbackPool = [
        {
          text: trimFor(`Guessing about ${conceptLabel.toLowerCase()} without checking the evidence or testing first.`),
          why: `Inquirers don’t just guess — test and observe the evidence for “${conceptLabel}” first!`,
        },
        {
          text: trimFor(`Looking at only one part of ${conceptLabel.toLowerCase()} and skipping the rest of the pattern.`),
          why: `Check the whole pattern! Understanding “${conceptLabel}” means connecting all the clues.`,
        },
        {
          text: trimFor(`Changing every part at once instead of checking ${conceptLabel.toLowerCase()} step by step.`),
          why: `Take it step by step so you can see exactly how “${conceptLabel}” works.`,
        },
      ];
      for (const fb of fallbackPool) {
        if (distractorChoices.length >= 2) break;
        if (!usedTexts.has(fb.text.trim().toLowerCase())) {
          usedTexts.add(fb.text.trim().toLowerCase());
          distractorChoices.push(fb);
        }
      }

      if (distractorChoices.length >= 2) {
        bank.push({
          concept: conceptLabel,
          prompt: promptText,
          choices: [
            {
              text: correctText,
              correct: true,
              why: `Yes! That is strong Age ${age} evidence for “${conceptLabel}”.`,
            },
            ...distractorChoices.slice(0, 2),
          ],
        });
      }
    }
  }

  return bank;
}

/* Load + prepare the raw data files. */
export async function loadData(dataDir) {
  const fs = await import('node:fs/promises');
  const path = await import('node:path');
  const read = async (f) => JSON.parse(await fs.readFile(path.join(dataDir, f), 'utf8'));
  const [clustersFile, topicsFile, researchFile] = await Promise.all([
    read('clusters.json'),
    read('topics.json'),
    read('teaching-research.json'),
  ]);
  const researchByTopic = new Map();
  for (const rec of researchFile.records) researchByTopic.set(rec.topicId, rec);
  return {
    clusters: clustersFile.clusters,
    topics: topicsFile.topics,
    researchByTopic,
  };
}

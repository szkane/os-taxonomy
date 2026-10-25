/* ==========================================================================
   mapping.mjs — hand-authored domain content (source of truth)
   Maps each (subject, domain) in the taxonomy to gameplays, scene cases,
   question, PYP framing and vocabulary. Editing content happens HERE, then
   `npm run build:site` regenerates src/.
   Case/dial semantics are defined by scenes.js; arcade banks are fully
   resolved at build time. Everything child-facing is English, sentence case.
   ========================================================================== */

import { STORYBOOKS } from './storybooks.mjs';

export const SUBJECTS = {
  'Computing': {
    theme: 'How we organize ourselves',
    concepts: ['Function', 'Causation', 'Responsibility'],
    profile: ['Thinkers', 'Principled'],
    atl: ['Thinking skills', 'Self-management skills'],
    emoji: '💻',
  },
  'Geography': {
    theme: 'Where we are in place and time',
    concepts: ['Form', 'Connection', 'Responsibility'],
    profile: ['Inquirers', 'Open-minded'],
    atl: ['Research skills', 'Thinking skills'],
    emoji: '🗺️',
  },
  'Life Skills': {
    theme: 'Who we are',
    concepts: ['Responsibility', 'Function', 'Perspective'],
    profile: ['Principled', 'Balanced'],
    atl: ['Self-management skills', 'Thinking skills'],
    emoji: '🧭',
  },
  'Learning to Learn': {
    theme: 'Who we are',
    concepts: ['Function', 'Reflection', 'Responsibility'],
    profile: ['Reflective', 'Inquirers'],
    atl: ['Self-management skills', 'Thinking skills'],
    emoji: '🌱',
  },
  'Mathematics': {
    theme: 'How the world works',
    concepts: ['Form', 'Function', 'Connection'],
    profile: ['Knowledgeable', 'Thinkers'],
    atl: ['Thinking skills', 'Self-management skills'],
    emoji: '🔢',
  },
  'Science': {
    theme: 'How the world works',
    concepts: ['Causation', 'Function', 'Change'],
    profile: ['Inquirers', 'Thinkers'],
    atl: ['Thinking skills', 'Research skills'],
    emoji: '🔬',
  },
  'English': {
    theme: 'How we express ourselves',
    concepts: ['Function', 'Connection', 'Perspective'],
    profile: ['Communicators', 'Risk-takers'],
    atl: ['Communication skills', 'Thinking skills'],
    emoji: '📚',
  },
  'History': {
    theme: 'Where we are in place and time',
    concepts: ['Change', 'Perspective', 'Form'],
    profile: ['Open-minded', 'Knowledgeable'],
    atl: ['Research skills', 'Thinking skills'],
    emoji: '🏛️',
  },
  'Personal & Social Development': {
    theme: 'Who we are',
    concepts: ['Responsibility', 'Connection', 'Perspective'],
    profile: ['Caring', 'Principled', 'Balanced'],
    atl: ['Self-management skills', 'Social skills'],
    emoji: '💛',
  },
};

/* Shared vocabulary used across many courses (merged with domain lexicons). */
export const SHARED_VOCAB = {
  share: 'Split into parts so everyone gets some.',
  equal: 'Exactly the same in size or amount.',
  pattern: 'A design or rule that repeats — like 2, 4, 6, 8.',
  data: 'Information you collect, like counts or measurements.',
  predict: 'Say what you think will happen before you try it.',
  fair: 'Treating everyone or everything the same way.',
  compare: 'Look at two or more things to see how they are alike or different.',
  sequence: 'The order things happen in: first, next, last.',
  evidence: 'Something you can point to that shows an idea is true.',
  investigate: 'Look closely and try things to find answers.',
};

const M = {};

/* =============================== MATHEMATICS =============================== */

M['Mathematics|Addition & Subtraction'] = {
  emoji: '🍎',
  coverArt: ['🍎', '🍏➕'],
  artPalette: ['#FFE156', '#86EFAC', '#4ECDC4', '#FF6584'],
  question: 'How do numbers come together and split apart?',
  centralIdea: 'Putting numbers together and taking them apart helps us solve everyday problems.',
  scene: {
    id: 'counters',
    bands: ['early'],
    explorePrompt: 'Move the dials to change each group of apples. Watch the sum grow.',
    sceneByBand: {
      mid: {
        id: 'numberline',
        label: 'Hundreds on the line',
        explorePrompt: 'A number line to 1,000 — make hundreds your hops!',
        range: { lo: 0, hi: 1000 },
      },
      upper: {
        id: 'numberline',
        label: 'The big-number line',
        explorePrompt: 'A number line to 10,000 — thousands are your stairs!',
        range: { lo: 0, hi: 10000 },
      },
    },
    cases: [
      {
        prompt: 'Make the apples show 5 + 4.',
        targets: { a: 5, b: 4 },
        nudge: 'Count the red apples first — do you see 5?',
        support: 'Set red apples to 5 and green apples to 4.',
        why: '5 red apples and 4 green apples make 9 apples in all. 5 + 4 = 9.',
      },
      {
        prompt: 'Make two groups that add to 10.',
        rule: { op: 'sum', value: 10 },
        nudge: 'Any two groups work if the total is exactly 10.',
        support: 'Try 6 and 4, or 7 and 3 — count the total to check.',
        why: 'Number pairs that make 10 (like 6 + 4) help you add fast for the rest of your life!',
      },
      {
        prompt: 'Show a doubles fact — both groups the same.',
        rule: { op: 'allEqual', minSum: 2 },
        nudge: 'Doubles means both groups match, like 3 and 3.',
        support: 'Set both dials to the same number.',
        why: 'Same and same: that is a double! 3 + 3 = 6 is much quicker to remember than counting.',
      },
    ],
  },
  scene2: {
    id: 'numberline',
    bands: ['early'],
    label: 'Count on a line',
    explorePrompt: 'Hop the frog forward or back — the jump dial goes negative too!',
    cases: [
      {
        prompt: 'Show 6 + 3 by hopping on from 6.',
        targets: { start: 6, step: 3 },
        nudge: 'Start at 6, hop 3 forward.',
        support: 'Start 6, jump 3.',
        why: 'Start at 6, three hops → 9. Counting on is a fast way to add!',
      },
      {
        prompt: 'Show 10 − 4: start at 10 and hop BACK 4.',
        targets: { start: 10, step: -4 },
        nudge: 'Hopping back means a negative jump — drag the dial below zero!',
        support: 'Start 10, jump −4.',
        why: '10, back 4 hops → 6. Subtraction is hopping backwards along the line.',
      },
    ],
  },
  arcade: { kind: 'addsub' },
  vocab: {
    sum: 'The answer when you add numbers together.',
    double: 'Adding a number to itself, like 4 + 4.',
    'take away': 'Subtract — remove some and see what is left.',
  },
};

M['Mathematics|Multiplication & Division'] = {
  emoji: '🥚',
  coverArt: ['🥚', '🧺✖️'],
  artPalette: ['#FFE156', '#B388FF', '#4ECDC4', '#FFB347'],
  question: 'How does counting in equal groups make big numbers easy?',
  centralIdea: 'Equal groups can be counted quickly with multiplication and shared fairly with division.',
  scene: {
    id: 'array',
    explorePrompt: 'Move the dials to build rows. Arrays show why multiplying works.',
    cases: [
      {
        prompt: 'Build 3 rows with 4 in each row.',
        targets: { rows: 3, cols: 4 },
        nudge: 'Rows go across. Count how many rows you see.',
        support: 'Set rows to 3 and “in each row” to 4.',
        why: '3 rows of 4 is 12 eggs. That is why 3 × 4 = 12.',
      },
      {
        prompt: 'Make an array that shows 20.',
        rule: { op: 'product', value: 20 },
        nudge: 'Which two numbers multiply to 20? Try 4 and 5.',
        support: 'Try rows 4 and 5 in each row — or 2 and 10.',
        why: '4 × 5 = 20 (and 2 × 10 = 20 too). Numbers can share the same product!',
      },
      {
        prompt: 'Build a square array — the same number of rows and columns.',
        rule: { op: 'allEqual', minSum: 4 },
        nudge: 'A square array looks like a square, like 3 rows of 3.',
        support: 'Set both dials to the same number (2, 3, 4…).',
        why: 'Same × same makes a square: 3 × 3 = 9. These are square numbers.',
      },
    ],
  },
  scene2: {
    id: 'numberline',
    label: 'Skip counting',
    explorePrompt: 'Set the start and the jump (backwards hops go negative!).',
    cases: [
      {
        prompt: 'Make the frog count in fives from 5: 5, 10, 15…',
        targets: { start: 5, step: 5 },
        nudge: 'Five, ten, fifteen — what jump repeats?',
        support: 'Start 5, jump 5.',
        why: '5, 10, 15 — skip counting in fives. It is the 5-times table in frog hops!',
      },
      {
        prompt: 'Hop in twos starting from 2.',
        targets: { start: 2, step: 2 },
        nudge: 'Even numbers only — what jump does that?',
        support: 'Start 2, jump 2.',
        why: '2, 4, 6, 8 — hopping in twos is the 2-times table.',
      },
      {
        prompt: 'Land on exactly 24 in 3 equal hops.',
        rule: { op: 'affine', cStart: 1, cStep: 3, value: 24 },
        nudge: 'start + 3 × jump = 24.',
        support: 'Try start 0 jump 8, or start 6 jump 6.',
        why: '0+8+8+8 = 24 (or 6+6+6+6). Equal hops IS multiplication: 3 × 8.',
      },
    ],
  },
  arcade: { kind: 'multdiv' },
  vocab: {
    array: 'Objects lined up in neat rows and columns.',
    product: 'The answer when you multiply.',
    share: 'Split into equal groups — that is division.',
  },
};

M['Mathematics|Fractions'] = {
  emoji: '🍕',
  coverArt: ['🍕', '✂️'],
  artPalette: ['#FFB347', '#FF6584', '#FFE156', '#4ECDC4'],
  question: 'How can we share things fairly?',
  centralIdea: 'Fractions cut a whole into equal parts, so everyone gets a fair share.',
  scene: {
    id: 'fractions',
    explorePrompt: 'Cut the pizza into parts, then take some slices. The readout shows the fraction.',
    cases: [
      {
        prompt: 'Cut the pizza into halves and take one part.',
        targets: { parts: 2, shaded: 1 },
        nudge: 'Halves means only 2 parts — no more!',
        support: 'Equal parts to 2, parts taken to 1.',
        why: '2 equal parts with 1 taken is 1/2 — one half. Equal parts is what makes it a fraction.',
      },
      {
        prompt: 'Show 3/4 of the pizza taken.',
        targets: { parts: 4, shaded: 3 },
        nudge: 'The bottom number (4) tells the cuts, the top (3) tells the slices.',
        support: 'Equal parts 4, parts taken 3.',
        why: '4 equal parts, 3 taken: 3/4. The parts must be equal, or it is not a fair fraction.',
      },
      {
        prompt: 'Take slices that make the whole pizza — two different ways.',
        rule: { op: 'whole' },
        nudge: 'A whole means every slice is taken.',
        support: 'Set “parts taken” equal to “equal parts”.',
        why: '2/2, 3/3, 4/4 — they all fill the whole pizza. Different names, same amount!',
      },
    ],
  },
  arcade: { kind: 'fractions' },
  vocab: {
    fraction: 'A part of a whole, written like 1/2.',
    half: 'One of two equal parts.',
    quarter: 'One of four equal parts.',
    'equal parts': 'Pieces that are exactly the same size.',
  },
};

M['Mathematics|Number Representation & Place Value'] = {
  emoji: '🧱',
  coverArt: ['🧱', '💯'],
  artPalette: ['#38B6FF', '#FFE156', '#B388FF', '#86EFAC'],
  question: 'What does each digit in a number really mean?',
  centralIdea: 'A digit’s place — ones, tens, hundreds — gives it its power.',
  scene: {
    id: 'placevalue',
    explorePrompt: 'Each column has its own dial — add flats, rods and ones and watch the number build.',
    sceneByBand: {
      mid: {
        id: 'placevalue2',
        label: 'Blocks to 9,999',
        explorePrompt: 'Thousands, hundreds, tens and ones — one dial per column!',
      },
      upper: {
        id: 'pvchart',
        label: 'Digit chart',
        explorePrompt: 'Seven places, one digit each — build numbers all the way to a million!',
      },
    },
    cases: [
      {
        prompt: 'Build 143: one flat, four rods, three ones.',
        targets: { h: 1, t: 4, o: 3 },
        nudge: 'Set each column: 1 hundred, 4 tens, 3 ones.',
        support: 'Hundreds 1, Tens 4, Ones 3.',
        why: '143 is 1 hundred + 4 tens + 3 ones. The “1” is worth much more than the “3”!',
      },
      {
        prompt: 'Show 10 more than 120.',
        targets: { h: 1, t: 3, o: 0 },
        nudge: '10 more adds one more tens rod.',
        support: '120 → 130: hundreds stay 1, tens go 2 → 3.',
        why: '10 more than 120 is 130. Only the tens place changed — that is place value power.',
      },
      {
        prompt: 'Make a number with 5 hundreds and NO ones.',
        targets: { h: 5, o: 0 },
        nudge: 'The ones column must sit at zero.',
        support: 'Hundreds 5, Ones 0 — any tens you like!',
        why: '500, 510, 540… all have 5 hundreds and 0 ones. Many numbers share the same digits!',
      },
    ],
  },
  arcade: { kind: 'placevalue' },
  vocab: {
    digit: 'One of the ten number symbols: 0 1 2 3 4 5 6 7 8 9.',
    place: 'Where a digit sits in a number — ones, tens, hundreds.',
    hundreds: 'Blocks worth 100 each.',
  },
};

M['Mathematics|Counting & Cardinality'] = {
  emoji: '🍪',
  coverArt: ['🍪', '🫙'],
  artPalette: ['#FFB347', '#FFE156', '#4ECDC4', '#FF6584'],
  question: 'How many? Let’s count and find out!',
  centralIdea: 'Counting one by one tells you exactly how many — and the last number you say is the answer.',
  scene: {
    id: 'counting',
    bands: ['early'],
    explorePrompt: 'Fill the jar with cookies and count along as it fills.',
    sceneByBand: {
      mid: {
        id: 'numberlineXL',
        label: 'Skip-count highway',
        explorePrompt: 'Skip-count along a line to 1,000 — 50s and 100s are your hops!',
        range: { lo: 0, hi: 1000 },
      },
    },
    cases: [
      {
        prompt: 'Put exactly 8 cookies in the jar.',
        targets: { n: 8 },
        nudge: 'Count each cookie as the jar fills.',
        support: 'Move the dial slowly and count: 1, 2, 3…',
        why: '8 cookies! The last number you say when counting tells how many — that is the magic of counting.',
      },
      {
        prompt: 'Put one MORE than 9 cookies.',
        targets: { n: 10 },
        nudge: 'One more than 9… count on from 9.',
        support: '9 cookies… then add 1.',
        why: 'One more than 9 is 10. Counting on from a number is faster than starting again.',
      },
      {
        prompt: 'Fill the jar completely full — 20 cookies.',
        targets: { n: 20 },
        nudge: 'Keep going past 10… all the way to 20.',
        support: 'Count in steps: 10, then 11, 12… 20.',
        why: '20 cookies! Big counts get easier when you count in groups of 5 or 10.',
      },
    ],
  },
  scene2: {
    id: 'numberline',
    bands: ['early', 'mid'],
    label: 'Hop and count',
    explorePrompt: 'Make the frog hop and count the landings.',
    cases: [
      {
        prompt: 'Hop all the way to 12 — one hop at a time.',
        targets: { start: 11, step: 1 },
        nudge: 'Big jumps skip numbers; one-at-a-time lands on every number.',
        support: 'Start 11 with jump 1 lands on 12.',
        why: 'Hops of 1 touch every number: 9, 10, 11, 12 — that is careful counting!',
      },
      {
        prompt: 'Hop in big jumps of 5: land on 5, 10, 15.',
        targets: { start: 5, step: 5 },
        nudge: 'Big jumps skip numbers.',
        support: 'Start 5, jump 5.',
        why: 'Skipping numbers in equal hops is skip counting — a fast count.',
      },
    ],
  },
  arcade: { kind: 'counting' },
  vocab: {
    count: 'Say numbers in order, one for each thing.',
    'how many': 'The total number of things.',
    more: 'A bigger amount.',
    fewer: 'A smaller amount.',
  },
};

M['Mathematics|Geometry'] = {
  emoji: '⬡',
  coverArt: ['⬡', '🔺🟦'],
  artPalette: ['#4ECDC4', '#B388FF', '#FFE156', '#FF6584'],
  question: 'What makes a shape a shape?',
  centralIdea: 'Shapes are defined by their sides and corners — count them and you can name any shape.',
  scene: {
    id: 'shape',
    explorePrompt: 'Turn the dial to grow the shape. Watch sides and corners appear together.',
    cases: [
      {
        prompt: 'Build a hexagon.',
        targets: { sides: 6 },
        nudge: 'A hex-agon has SIX sides. Like hex = 6!',
        support: 'Set sides to 6.',
        why: '6 sides, 6 corners: a hexagon. Honeybees build with hexagons because they fit together perfectly.',
      },
      {
        prompt: 'Make a shape with exactly 3 corners.',
        targets: { sides: 3 },
        nudge: 'Each side brings one corner with it.',
        support: 'Count the red corner dots as you move the dial.',
        why: '3 sides and 3 corners — a triangle! Sides and corners always match.',
      },
      {
        prompt: 'Make the shape with the MOST sides this lab allows.',
        targets: { sides: 10 },
        nudge: 'Push the dial as far as it goes.',
        support: 'All the way to 10!',
        why: '10 sides: a decagon. The more sides you add, the more it looks like a circle.',
      },
    ],
  },
  arcade: { kind: 'geometry' },
  vocab: {
    side: 'A straight edge of a shape.',
    corner: 'The point where two sides meet.',
    hexagon: 'A shape with 6 sides.',
    triangle: 'A shape with 3 sides.',
  },
};

M['Mathematics|Measurement'] = {
  emoji: '📏',
  coverArt: ['📏', '✏️'],
  artPalette: ['#38B6FF', '#FFE156', '#86EFAC', '#FFB347'],
  question: 'How long is it — and how do we know?',
  centralIdea: 'Measuring with equal units, lined up from zero, tells you an object’s length.',
  scene: {
    id: 'measure',
    explorePrompt: 'Stretch the pencil and read the ruler. Line up at zero!',
    cases: [
      {
        prompt: 'Make the pencil exactly 12 cm long.',
        targets: { cm: 12 },
        nudge: 'Read where the pencil tip lands on the ruler.',
        support: 'Move the dial until the red number says 12.',
        why: '12 cm! Each centimeter is an equal unit, and the ruler starts at zero — that is what makes the measure fair.',
      },
      {
        prompt: 'Make the pencil longer than 20 cm but shorter than 30 cm.',
        rule: { op: 'between', dial: 'cm', lo: 21, hi: 29 },
        nudge: 'Somewhere in between — you choose!',
        support: 'Try 25 cm.',
        why: 'Anything from 21 to 29 cm works. When you cannot measure exactly, you can still give a good range.',
      },
      {
        prompt: 'Make it exactly as long as the ruler.',
        targets: { cm: 30 },
        nudge: 'The ruler goes all the way to 30.',
        support: 'Push the dial to the maximum.',
        why: '30 cm — the whole ruler! The pencil and the ruler match unit for unit.',
      },
    ],
  },
  scene2: {
    id: 'balance',
    label: 'Weigh it',
    explorePrompt: 'Put apples on each pan and watch the balance tip.',
    cases: [
      {
        prompt: 'Balance the scales: same weight on both pans.',
        targets: { left: 4, right: 4 },
        nudge: 'Balanced means perfectly level.',
        support: 'Match the two dials.',
        why: '4 apples vs 4 apples — level pan! Equal weights balance.',
      },
      {
        prompt: 'Make the LEFT pan heavier — any amount you like.',
        rule: { op: 'gt', dial: 'left', value: 2, also: { dial: 'right', atMost: 2 } },
        nudge: 'Left must weigh MORE than right.',
        support: 'Try left 5, right 2.',
        why: 'More on the left tips it down. The heavy side always sinks!',
      },
    ],
  },
  arcade: { kind: 'measurement' },
  vocab: {
    centimeter: 'A small unit of length — about as wide as your finger. Written “cm”.',
    length: 'How long something is from end to end.',
    ruler: 'A tool with equal units for measuring length.',
  },
};

M['Mathematics|Data & Statistics'] = {
  emoji: '📊',
  coverArt: ['📊', '🍎🍌'],
  artPalette: ['#4ECDC4', '#FFE156', '#FF6584', '#B388FF'],
  question: 'What can a chart tell us at one glance?',
  centralIdea: 'Collecting votes into a chart makes it easy to compare and answer questions.',
  scene: {
    id: 'databar',
    explorePrompt: 'Pick a fruit, then set its votes. The bars grow to match.',
    cases: [
      {
        prompt: 'Recreate the class vote: apples 8, bananas 3, grapes 5, strawberries 1.',
        targets: { apples: 8, bananas: 3, grapes: 5, strawberries: 1 },
        nudge: 'One dial per fruit — match every bar.',
        support: 'Set each fruit’s votes to its number.',
        why: 'Every bar matches the votes. A chart is only as honest as the counting behind it!',
      },
      {
        prompt: 'Make grapes the fruit with zero votes.',
        targets: { grapes: 0 },
        nudge: 'Zero votes means no bar at all.',
        support: 'Slide the grapes dial all the way down.',
        why: 'Zero votes draws nothing. In a chart, a missing bar means “none” — and that is information too!',
      },
      {
        prompt: 'Make bananas beat strawberries by exactly 2 votes.',
        rule: { op: 'diff', a: 'bananas', b: 'strawberries', value: 2, minFirst: 3 },
        nudge: 'Set both dials — the gap must be exactly 2.',
        support: 'Try bananas 7 and strawberries 5.',
        why: 'Any pair 2 apart works — 7 and 5, or 4 and 2. The difference is what matters when you compare.',
      },
    ],
  },
  arcade: { kind: 'data' },
  vocab: {
    chart: 'A drawing that shows numbers as bars or pictures.',
    votes: 'Choices people made.',
    winner: 'The one with the most.',
  },
};

M['Mathematics|Algebra'] = {
  emoji: '🔺',
  coverArt: ['🔺', '🔮'],
  artPalette: ['#B388FF', '#4ECDC4', '#FFE156', '#FF6584'],
  question: 'What is the secret rule of this number machine?',
  centralIdea: 'Patterns follow rules; finding the rule lets you predict what comes next.',
  scene: {
    id: 'pattern',
    explorePrompt: 'Set the start and the jump. The machine lays out the pattern.',
    cases: [
      {
        prompt: 'Make the machine count in twos from 2: 2, 4, 6, 8…',
        targets: { start: 2, step: 2 },
        nudge: 'The jump size is how much it adds each time.',
        support: 'Start 2, jump 2.',
        why: 'Start at 2, add 2 each jump: 2, 4, 6, 8. The rule “add 2” predicts every next bead.',
      },
      {
        prompt: 'Make it jump in fives starting from 5.',
        targets: { start: 5, step: 5 },
        nudge: 'Five, ten, fifteen… what does each jump add?',
        support: 'Start 5, jump 5.',
        why: '5, 10, 15, 20 — counting in fives. This pattern is hiding inside your clock and your hands!',
      },
      {
        prompt: 'Make an odd-number pattern: 1, 3, 5, 7…',
        targets: { start: 1, step: 2 },
        nudge: 'Odd numbers are 1, 3, 5, 7… what jumps between them?',
        support: 'Start 1 and jump 2.',
        why: 'Start 1, add 2: every number lands on an odd number. Same rule as the twos — different start!',
      },
    ],
  },
  arcade: { kind: 'pattern' },
  vocab: {
    rule: 'The instruction a pattern follows every time.',
    jump: 'How far the pattern moves each step.',
  },
};

M['Mathematics|Ratio & Proportion'] = {
  emoji: '🥤',
  coverArt: ['🥤', '🍋'],
  artPalette: ['#FFE156', '#4ECDC4', '#FFB347', '#FF6584'],
  question: 'If one gets more, how much more do the rest need?',
  centralIdea: 'Proportion keeps things in balance: double one side, and the other must double too.',
  scene: {
    id: 'fractions',
    explorePrompt: 'Cut the drink mix into parts and take some. Ratios hide inside fractions.',
    cases: [
      {
        prompt: 'Share the drink fairly between 2 cups — take one part.',
        targets: { parts: 2, shaded: 1 },
        nudge: 'Fair between two means 2 equal parts.',
        support: 'Parts 2, taken 1.',
        why: '1 out of 2 equal parts: 1/2. A ratio of 1 to 1 — perfectly fair.',
      },
      {
        prompt: 'Show a recipe that takes 3 of every 4 parts.',
        targets: { parts: 4, shaded: 3 },
        nudge: '4 equal parts, 3 of them used.',
        support: 'Parts 4, taken 3.',
        why: '3 parts out of 4 — a ratio of 3 to 4. Double everything (6 of 8) and the taste stays the same!',
      },
      {
        prompt: 'Make the strongest mix: take ALL the parts.',
        rule: { op: 'whole' },
        nudge: 'All parts taken.',
        support: 'Parts taken = equal parts.',
        why: 'All of it! When the ratio uses the whole (like 4 of 4), nothing is left out.',
      },
    ],
  },
  arcade: { kind: 'ratio' },
  vocab: {
    ratio: 'How much of one thing compared to another, like 1 to 2.',
    proportion: 'Keeping the same ratio when amounts grow.',
    double: 'Twice as much.',
  },
};

M['Mathematics|Mathematical Thinking'] = {
  emoji: '🧠',
  coverArt: ['🧠', '🧩'],
  artPalette: ['#B388FF', '#FFE156', '#4ECDC4', '#86EFAC'],
  question: 'What do you notice — and what do you wonder?',
  centralIdea: 'Noticing patterns, comparing and explaining turns numbers into thinking.',
  scene: {
    id: 'pattern',
    explorePrompt: 'Play with the number machine. What stays the same? What changes?',
    cases: [
      {
        prompt: 'Make a pattern where every number ends in 0.',
        targets: { start: 10, step: 10 },
        nudge: 'What jump size always lands on a zero ending?',
        support: 'Try starting at 10 with jumps of 10.',
        why: 'Tens always end in 0! Seeing why beats memorizing — 10 is 1 ten, so adding tens keeps the ones empty.',
      },
      {
        prompt: 'Make two dials agree: same start as jump size.',
        rule: { op: 'allEqual' },
        nudge: 'Set both dials to the same number.',
        support: 'Try start 3, jump 3.',
        why: 'Start 3, jump 3: 3, 6, 9 — that is the three-times pattern. Rules connect ideas!',
      },
      {
        prompt: 'Make the machine land on 20 exactly two jumps in.',
        rule: { op: 'affine', cStart: 1, cStep: 2, value: 20 },
        nudge: 'start + 2 × jump = 20.',
        support: 'Try start 10, jump 5. Or start 0, jump 10.',
        why: 'Several rules work — 10+5+5, 0+10+10, 4+8+8. In math, many roads can lead to the same place.',
      },
    ],
  },
  arcade: { kind: 'thinking' },
  vocab: {
    notice: 'See something interesting and point it out.',
    wonder: 'Ask a question about what you see.',
  },
};

/* ================================= SCIENCE ================================= */

M['Science|Waves, Light & Sound'] = {
  emoji: '🥁',
  coverArt: ['🥁', '🔊✨'],
  artPalette: ['#0d1220', '#8bc8fa', '#fdae1c', '#4ECDC4'],
  dark: true,
  explainSide: 'right',
  question: 'How do sounds and shadows tell us what light and sound can do?',
  centralIdea: 'Sound comes from vibrations and light travels from sources — their strength and direction change what we hear and see.',
  scene: {
    id: 'sound',
    explorePrompt: 'Hit the drum softly or hard, and loosen or tighten the skin. Listen with your eyes!',
    cases: [
      {
        prompt: 'Make the drum LOUD but LOW.',
        targets: { force: 5, tight: 1 },
        nudge: 'Loud is about how hard you hit. Low is about the loose skin.',
        support: 'Force to 5, tightness to 1.',
        why: 'A big, strong vibration (hard hit) is loud; a loose, slow skin vibrates slowly, which sounds low. Loud and pitch are separate!',
      },
      {
        prompt: 'Make it quiet but squeaky high.',
        targets: { force: 1, tight: 5 },
        nudge: 'Tiny taps, very tight skin.',
        support: 'Force to 1, tightness to 5.',
        why: 'Small vibrations are quiet; fast (tight) vibrations sound high. You just controlled two different things!',
      },
      {
        prompt: 'Hit as hard as you can but keep the note the same as before.',
        targets: { force: 5, tight: 3 },
        nudge: 'Keep the skin at medium tightness — only the hitting changes.',
        support: 'Force 5, tightness 3.',
        why: 'Harder hit = louder, same tightness = same note. Changing one thing at a time is how scientists find fair answers.',
      },
    ],
  },
  scene2: {
    id: 'light',
    label: 'Light lab',
    explorePrompt: 'Move the torch closer or farther and change the object size. Watch the shadow.',
    cases: [
      {
        prompt: 'Make the LONGEST, darkest shadow you can.',
        targets: { dist: 1, size: 4 },
        nudge: 'Close torch + big object.',
        support: 'Torch distance 1, object size 4.',
        why: 'Close light and a big object block the most light, throwing a long dark shadow.',
      },
      {
        prompt: 'Make the shadow almost disappear.',
        targets: { dist: 5, size: 1 },
        nudge: 'Far torch, tiny object.',
        support: 'Torch distance 5, object size 1.',
        why: 'A distant torch spreads its light wide, so a small object barely blocks any — the shadow shrinks.',
      },
    ],
  },
  decision: {
    meters: [
      { id: 'energy', label: 'Energy', emoji: '⚡', start: 70 },
      { id: 'ears', label: 'Safe ears', emoji: '👂', start: 70 },
      { id: 'mood', label: 'Mood', emoji: '😊', start: 70 },
    ],
    scenes: [
      {
        text: 'Concert scene: the front-row speaker is blasting. Your ears ring a little. 🎤',
        choices: [
          { label: 'Step back a few rows and enjoy from there', meters: [['ears', 20], ['mood', 5]], reflect: 'Great Thinker move! Loud sound over a long time can hurt your ears — distance protects them.', profile: 'Thinker' },
          { label: 'Stay right at the speaker — it sounds coolest', meters: [['ears', -25], ['energy', 10]], reflect: 'The boom feels exciting, but ringing ears are a warning. Next time, give your ears some space.' },
          { label: 'Cover your ears the whole time', meters: [['ears', 10], ['mood', -10]], reflect: 'Your ears are safe, but there is a middle way: earplugs or a step back let you enjoy AND stay safe.' },
        ],
      },
      {
        text: 'Sun scene: bright sunshine at the beach and you forgot your hat. ☀️',
        choices: [
          { label: 'Play in the shade of the umbrella', meters: [['energy', 5], ['mood', 10]], reflect: 'Balanced choice! Shade blocks harsh light but you still enjoy the beach.', profile: 'Balanced' },
          { label: 'Run and play in full sun for hours', meters: [['energy', -20], ['ears', -5]], reflect: 'Sun feels great, but skin needs protection — shade, hat or sunscreen are kind choices.' },
          { label: 'Go home immediately', meters: [['energy', -5], ['mood', -15]], reflect: 'Safe, but a bit of shade or a hat would have let you stay and play.' },
        ],
      },
    ],
  },
  vocab: {
    vibration: 'A quick back-and-forth movement — the maker of all sound.',
    volume: 'How loud or quiet a sound is.',
    pitch: 'How high or low a sound is.',
    shadow: 'A dark area made when something blocks light.',
    source: 'Where light or sound comes from.',
  },
};

M['Science|Forces & Motion'] = {
  emoji: '🏎️',
  coverArt: ['🏎️', '🛞💨'],
  artPalette: ['#38B6FF', '#FFE156', '#86EFAC', '#FF6584'],
  question: 'What makes things speed up, slow down, and stop?',
  centralIdea: 'Pushes and pulls start motion; ramps, surfaces and friction decide how far things go.',
  scene: {
    id: 'forces',
    explorePrompt: 'Raise the ramp, change the surface, and let the car roll.',
    cases: [
      {
        prompt: 'Make the car roll the FARTHEST it can.',
        targets: { height: 5, surface: 4 },
        nudge: 'A steep ramp gives speed; a smooth track keeps it.',
        support: 'Height 5, surface all the way to smooth.',
        why: 'A high ramp stores more push (gravity pulls the car down harder), and a smooth surface wastes less speed on friction.',
      },
      {
        prompt: 'Make the car stop almost right away.',
        targets: { height: 1, surface: 0 },
        nudge: 'Low ramp + bumpy carpet.',
        support: 'Height 1, surface all the way to bumpy.',
        why: 'Little starting push plus lots of friction (the bumpy grip) stops the car fast. Friction is the force that fights motion.',
      },
      {
        prompt: 'Start the car from a FLAT ramp.',
        targets: { height: 0 },
        nudge: 'Flat means no slope at all.',
        support: 'Height dial to zero.',
        why: 'No slope means no push from gravity — the car waits for a push from you. Forces need a push or a pull to start!',
      },
    ],
  },
  vocab: {
    force: 'A push or a pull.',
    friction: 'The rubbing force that slows things down.',
    gravity: 'The pull that brings things down toward the ground.',
    motion: 'Movement from one place to another.',
  },
};

M['Science|Energy'] = {
  emoji: '🔋',
  coverArt: ['🔋', '💡⚡'],
  artPalette: ['#FFE156', '#FFB347', '#4ECDC4', '#FF6584'],
  question: 'Where does the light in a bulb come from?',
  centralIdea: 'Energy flows through a complete circuit; more sources or fewer users change how bright it shines.',
  scene: {
    id: 'circuit',
    explorePrompt: 'Add batteries and bulbs. The circuit only works as a complete loop.',
    cases: [
      {
        prompt: 'Make the bulb as BRIGHT as possible.',
        targets: { bat: 4, bulbs: 1 },
        nudge: 'All the power to a single bulb.',
        support: 'Batteries 4, bulbs 1.',
        why: 'Four batteries pushing through one bulb = maximum energy for that bulb — brightest light!',
      },
      {
        prompt: 'Make two bulbs glow evenly with just enough power.',
        targets: { bat: 2, bulbs: 2 },
        nudge: 'Equal share: 2 batteries, 2 bulbs.',
        support: 'Set both dials to 2.',
        why: 'Two batteries share their energy between two bulbs — both glow, none is super bright. Sharing energy!',
      },
      {
        prompt: 'Make the bulbs dim — one battery, three bulbs.',
        targets: { bat: 1, bulbs: 3 },
        nudge: 'One battery, three hungry bulbs.',
        support: 'Batteries 1, bulbs 3.',
        why: 'One battery divided three ways: every bulb gets a weak share, so all glow dimly.',
      },
    ],
  },
  decision: {
    meters: [
      { id: 'safety', label: 'Safety', emoji: '🛡️', start: 60 },
      { id: 'energy', label: 'Energy', emoji: '⚡', start: 70 },
      { id: 'mood', label: 'Mood', emoji: '😊', start: 70 },
    ],
    scenes: [
      {
        text: 'You see a phone charger with a frayed, cracked cable near the sink. 🔌',
        choices: [
          { label: 'Tell a grown-up and keep water away', meters: [['safety', 25], ['mood', 5]], reflect: 'Principled choice! Damaged wires plus water are dangerous — telling a grown-up is exactly right.', profile: 'Principled' },
          { label: 'Pull it out with wet hands quickly', meters: [['safety', -30]], reflect: 'Electricity travels through wet skin. Never touch plugs or wires with wet hands.' },
          { label: 'Just leave it there and say nothing', meters: [['safety', -10], ['mood', -5]], reflect: 'Leaving danger behind for someone else to find is risky. A word to a grown-up takes seconds.' },
        ],
      },
      {
        text: 'The sun is out and the room is bright. The big light is still ON. 💡',
        choices: [
          { label: 'Switch it off and use sunshine', meters: [['energy', 15], ['safety', 5]], reflect: 'Caring for the planet! Sunshine is free energy — switching off saves it for when we truly need it.', profile: 'Caring' },
          { label: 'Leave every light on “just in case”', meters: [['energy', -15]], reflect: 'Lights on with nobody using them waste energy that power plants must make.' },
        ],
      },
    ],
  },
  vocab: {
    circuit: 'A complete loop that electricity flows around.',
    energy: 'The power to make things happen — move, glow, heat.',
    battery: 'A store of electrical energy.',
  },
};

M['Science|Matter & Materials'] = {
  emoji: '🧊',
  coverArt: ['🧊', '💧🔥'],
  artPalette: ['#4ECDC4', '#38B6FF', '#FFE156', '#FF6584'],
  question: 'How does the same stuff become solid, liquid, and gas?',
  centralIdea: 'Heating and cooling change materials between solid, liquid and gas — the stuff stays the same.',
  scene: {
    id: 'states',
    explorePrompt: 'Slide the temperature and watch water change its state.',
    cases: [
      {
        prompt: 'Freeze the water solid.',
        rule: { op: 'lt', dial: 'temp', value: 0 },
        nudge: 'Water freezes at 0°C — go colder.',
        support: 'Move the dial below zero.',
        why: 'Below 0°C water locks into solid ice. Cold removes energy, so particles hold still in a fixed shape.',
      },
      {
        prompt: 'Bring it to the exact melting point of ice.',
        targets: { temp: 0 },
        nudge: 'Ice melts at a famous temperature…',
        support: 'Set the dial exactly to 0.',
        why: '0°C is where ice melts into water. At the melting point both solid and liquid exist together!',
      },
      {
        prompt: 'Boil it away into steam.',
        rule: { op: 'atLeast', dial: 'temp', value: 100 },
        nudge: 'Water boils at 100°C.',
        support: 'Push the dial to 100 or higher.',
        why: 'At 100°C water boils into gas. Heat adds energy until particles fly free — steam!',
      },
    ],
  },
  sorter: {
    explorePrompt: 'Tap a material to feel its property, then sort it.',
    bins: [
      { id: 'stiff', label: 'Stiff & strong', emoji: '🪨' },
      { id: 'bendy', label: 'Bendy', emoji: '🧘' },
      { id: 'soaky', label: 'Soaks up water', emoji: '🧽' },
      { id: 'waterproof', label: 'Keeps water out', emoji: '☂️' },
    ],
    items: [
      { label: 'Rock', emoji: '🪨', bin: 'stiff', why: 'Rock is rigid — it keeps its shape and holds heavy things.' },
      { label: 'Metal spoon', emoji: '🥄', bin: 'stiff', why: 'Metal is strong and stiff, perfect for scooping.' },
      { label: 'Rubber band', emoji: '🎗️', bin: 'bendy', why: 'Rubber stretches and springs back — very bendy!' },
      { label: 'Garden hose', emoji: '💧', bin: 'bendy', why: 'A hose bends around corners but still guides water.' },
      { label: 'Sponge', emoji: '🧽', bin: 'soaky', why: 'Full of tiny holes that drink up water.' },
      { label: 'Paper towel', emoji: '🧻', bin: 'soaky', why: 'Thin fibers pull water in — great for spills.' },
      { label: 'Raincoat', emoji: '🧥', bin: 'waterproof', why: 'Coated fabric keeps rain out — waterproof!' },
      { label: 'Glass bottle', emoji: '🍾', bin: 'waterproof', why: 'Glass holds water safely without soaking any up.' },
    ],
    celebrate: 'You matched each material to its property!',
  },
  vocab: {
    solid: 'Keeps its own shape, like ice or rock.',
    liquid: 'Flows and takes the shape of its container, like water.',
    gas: 'Spreads out to fill the space, like steam.',
    property: 'A way to describe material — stiff, bendy, waterproof.',
    melt: 'Turn from solid to liquid when heated.',
  },
};

M["Science|Earth's Systems"] = {
  emoji: '🌍',
  coverArt: ['🌍', '⛰️💧'],
  artPalette: ['#4ECDC4', '#38B6FF', '#86EFAC', '#FFE156'],
  question: 'Where do land, water and air meet and mix?',
  centralIdea: 'Earth works as a team of systems — land, water, air and life — always exchanging and changing.',
  sorter: {
    explorePrompt: 'Tap each part of Earth to learn where it lives.',
    bins: [
      { id: 'land', label: 'Land (geosphere)', emoji: '⛰️' },
      { id: 'water', label: 'Water (hydrosphere)', emoji: '💧' },
      { id: 'air', label: 'Air (atmosphere)', emoji: '🌬️' },
    ],
    items: [
      { label: 'Mountain', emoji: '⛰️', bin: 'land', why: 'Mountains are the tallest part of the solid land.' },
      { label: 'River', emoji: '🏞️', bin: 'water', why: 'Rivers are moving fresh water crossing the land.' },
      { label: 'Cloud', emoji: '☁️', bin: 'air', why: 'Clouds are tiny water drops floating in the air.' },
      { label: 'Sand dune', emoji: '🏜️', bin: 'land', why: 'Dunes are hills of sand, shaped by wind on land.' },
      { label: 'Ocean', emoji: '🌊', bin: 'water', why: 'Oceans hold most of Earth’s water.' },
      { label: 'Wind', emoji: '🍃', bin: 'air', why: 'Wind is moving air pushing across the whole planet.' },
      { label: 'Glacier', emoji: '🧊', bin: 'water', why: 'A glacier is frozen water — ice from the hydrosphere sitting on land!' },
      { label: 'Soil', emoji: '🟤', bin: 'land', why: 'Soil is crumbled rock mixed with old life — land that grows food.' },
    ],
    celebrate: 'You mapped Earth’s parts to its systems!',
  },
  vocab: {
    geosphere: 'All the solid rock and soil of Earth.',
    hydrosphere: 'All of Earth’s water — oceans, rivers, ice.',
    atmosphere: 'The blanket of air around Earth.',
    system: 'Parts that work together as one whole.',
  },
};

M['Science|Weather & Climate'] = {
  emoji: '🌦️',
  coverArt: ['🌦️', '🌈'],
  artPalette: ['#38B6FF', '#FFE156', '#FF6584', '#4ECDC4'],
  question: 'Where does rain come from — and where does it go?',
  centralIdea: 'Water travels in a never-ending cycle: up as vapor, into clouds, down as rain, and around again.',
  sequence: {
    mode: 'cycle',
    explorePrompt: 'Tap each part of the water cycle to hear its job.',
    cards: [
      { label: 'The sun warms the water', emoji: '☀️', why: 'The sun heats oceans and lakes.', clue: 'Every cycle needs its engine — what starts the trip?' },
      { label: 'Water evaporates into vapor', emoji: '💨', why: 'Warm water rises up as invisible vapor.', clue: 'What happens to a puddle on a sunny day?' },
      { label: 'Vapor turns into clouds', emoji: '☁️', why: 'High up, cold air turns vapor into tiny drops — a cloud.', clue: 'What do we see floating in the sky?' },
      { label: 'Rain or snow falls', emoji: '🌧️', why: 'Heavy drops fall as rain, snow or hail.', clue: 'What comes down from a full cloud?' },
      { label: 'Water collects and flows back', emoji: '🌊', why: 'Falling water gathers in rivers, lakes and oceans — ready to start again.', clue: 'Where does rainwater gather?' },
    ],
    celebrate: 'The water cycle is complete — and it never stops!',
  },
  sorter: {
    explorePrompt: 'Tap the clothing to hear when you wear it, then match the weather.',
    bins: [
      { id: 'sunny', label: 'Sunny day', emoji: '☀️' },
      { id: 'rainy', label: 'Rainy day', emoji: '🌧️' },
      { id: 'snowy', label: 'Snowy day', emoji: '❄️' },
    ],
    items: [
      { label: 'Sun hat', emoji: '👒', bin: 'sunny', why: 'A brim keeps strong sunshine off your face.' },
      { label: 'Sunglasses', emoji: '🕶️', bin: 'sunny', why: 'They dim harsh sunlight to protect your eyes.' },
      { label: 'Umbrella', emoji: '☂️', bin: 'rainy', why: 'It makes a dry bubble in the rain.' },
      { label: 'Wellington boots', emoji: '🥾', bin: 'rainy', why: 'Boots keep puddles from soaking your feet.' },
      { label: 'Mittens', emoji: '🧤', bin: 'snowy', why: 'Padded mittens trap warm air for cold fingers.' },
      { label: 'Woolly scarf', emoji: '🧣', bin: 'snowy', why: 'A scarf wraps your neck in a warm air blanket.' },
    ],
    celebrate: 'Dressed for any forecast!',
  },
  vocab: {
    evaporate: 'Turn from liquid into vapor and rise.',
    vapor: 'Water as an invisible gas.',
    cycle: 'A circle of events that repeats forever.',
    climate: 'The weather a place has, year after year.',
  },
};

M['Science|Ecosystems & Habitats'] = {
  emoji: '🏞️',
  coverArt: ['🏞️', '🦊🌊'],
  artPalette: ['#86EFAC', '#4ECDC4', '#FFB347', '#B388FF'],
  question: 'Why does each creature live exactly where it lives?',
  centralIdea: 'Every living thing is suited to its habitat — food, water and shelter decide who thrives where.',
  sorter: {
    explorePrompt: 'Tap an animal to hear how it suits its home, then sort it.',
    bins: [
      { id: 'ocean', label: 'Ocean', emoji: '🌊' },
      { id: 'desert', label: 'Desert', emoji: '🏜️' },
      { id: 'forest', label: 'Forest', emoji: '🌲' },
      { id: 'polar', label: 'Polar ice', emoji: '🧊' },
    ],
    items: [
      { label: 'Shark', emoji: '🦈', bin: 'ocean', why: 'Fins and gills make the shark a perfect swimmer.' },
      { label: 'Camel', emoji: '🐪', bin: 'desert', why: 'Stores fat in humps and marches miles without water.' },
      { label: 'Owl', emoji: '🦉', bin: 'forest', why: 'Silent wings and night eyes hunt between the trees.' },
      { label: 'Penguin', emoji: '🐧', bin: 'polar', why: 'A waterproof coat and fat layer beat the deep freeze.' },
      { label: 'Crab', emoji: '🦀', bin: 'ocean', why: 'Claws and a shell crack food on the seashore.' },
      { label: 'Scorpion', emoji: '🦂', bin: 'desert', why: 'Hides by day, hunts by night — built for heat.' },
      { label: 'Squirrel', emoji: '🐿️', bin: 'forest', why: 'Climbing claws and cheek stores for acorn season.' },
      { label: 'Polar bear', emoji: '🐻‍❄️', bin: 'polar', why: 'Hollow fur floats it across icy seas.' },
    ],
    celebrate: 'Every animal in its right home!',
  },
  vocab: {
    habitat: 'The natural home of a plant or animal.',
    adapt: 'Slowly change to suit where you live.',
    ecosystem: 'A community of living things and their home, working together.',
  },
};

M['Science|Animals of the World'] = {
  emoji: '🦁',
  coverArt: ['🦁', '🐬🦅'],
  artPalette: ['#FFB347', '#4ECDC4', '#86EFAC', '#B388FF'],
  question: 'What makes a mammal a mammal and a fish a fish?',
  centralIdea: 'Scientists group animals by shared features — skin, blood, babies and breathing.',
  sorter: {
    explorePrompt: 'Tap each animal to hear its group’s secret, then sort it.',
    bins: [
      { id: 'mammal', label: 'Mammals', emoji: '🐻' },
      { id: 'bird', label: 'Birds', emoji: '🐦' },
      { id: 'fish', label: 'Fish', emoji: '🐟' },
      { id: 'reptile', label: 'Reptiles', emoji: '🦎' },
    ],
    items: [
      { label: 'Dolphin', emoji: '🐬', bin: 'mammal', why: 'Breathes air and feeds milk — a mammal in the sea!' },
      { label: 'Eagle', emoji: '🦅', bin: 'bird', why: 'Feathers, beak and eggs — a flying bird.' },
      { label: 'Goldfish', emoji: '🐠', bin: 'fish', why: 'Gills underwater and fins to steer — a fish.' },
      { label: 'Crocodile', emoji: '🐊', bin: 'reptile', why: 'Scaly skin and sun-basking — a reptile.' },
      { label: 'Cow', emoji: '🐄', bin: 'mammal', why: 'Fur, milk for calves and warm blood.' },
      { label: 'Penguin', emoji: '🐧', bin: 'bird', why: 'A bird that swims — feathers still give it away.' },
      { label: 'Shark', emoji: '🦈', bin: 'fish', why: 'Gills and fins, but no bones — still a fish!' },
      { label: 'Snake', emoji: '🐍', bin: 'reptile', why: 'Scales and cold blood — a legless reptile.' },
    ],
    celebrate: 'You sorted like a real zoologist!',
  },
  vocab: {
    mammal: 'Warm-blooded, feeds milk to babies, usually has fur.',
    feature: 'A body part or trait you can point to.',
    classify: 'Sort into groups by features.',
  },
};

M['Science|Ocean Life'] = {
  emoji: '🌊',
  coverArt: ['🐠', '🐙🌊'],
  artPalette: ['#38B6FF', '#4ECDC4', '#B388FF', '#FFE156'],
  question: 'What is hiding in the ocean’s different worlds?',
  centralIdea: 'The ocean has layers of homes — sunlit shallows, open water and the dark deep — each with its own life.',
  sorter: {
    explorePrompt: 'Tap a sea creature to hear where it lives, then sort it.',
    bins: [
      { id: 'shallow', label: 'Sunny shallows', emoji: '🏝️' },
      { id: 'open', label: 'Open blue water', emoji: '🌊' },
      { id: 'deep', label: 'Dark deep sea', emoji: '🕳️' },
    ],
    items: [
      { label: 'Starfish', emoji: '⭐', bin: 'shallow', why: 'Clings to rocks in the warm, sunny shallows.' },
      { label: 'Crab', emoji: '🦀', bin: 'shallow', why: 'Scuttles over rock pools where light reaches.' },
      { label: 'Tuna', emoji: '🐟', bin: 'open', why: 'A speed swimmer crossing miles of open blue.' },
      { label: 'Sea turtle', emoji: '🐢', bin: 'open', why: 'Glides through open water between feeding grounds.' },
      { label: 'Anglerfish', emoji: '🎣', bin: 'deep', why: 'Carries its own lantern light in the pitch dark.' },
      { label: 'Giant squid', emoji: '🦑', bin: 'deep', why: 'Huge eyes catch every fleck of light far below.' },
      { label: 'Seahorse', emoji: '🐴', bin: 'shallow', why: 'Hooks its tail in seagrass near the shore.' },
      { label: 'Jellyfish', emoji: '🪼', bin: 'open', why: 'Drifts with the currents far from the floor.' },
    ],
    celebrate: 'You explored all three ocean worlds!',
  },
  vocab: {
    shallows: 'The warm, sunlit water near the shore.',
    current: 'A river of moving water inside the ocean.',
    trench: 'The deepest valleys of the ocean floor.',
  },
};

M['Science|Organisms & Life Processes'] = {
  emoji: '🦋',
  coverArt: ['🦋', '🌱'],
  artPalette: ['#86EFAC', '#FFE156', '#B388FF', '#4ECDC4'],
  question: 'How does a living thing change through its life?',
  centralIdea: 'Living things grow and change in stages — each stage prepares the next.',
  sequence: {
    mode: 'cycle',
    explorePrompt: 'Tap each stage to hear what happens, then build the butterfly’s life.',
    cards: [
      { label: 'Egg on a leaf', emoji: '🥚', why: 'A tiny egg glued under a leaf.', clue: 'Where does every butterfly begin?' },
      { label: 'Caterpillar hatches and eats', emoji: '🐛', why: 'It munches leaves and grows fast.', clue: 'Who is famously hungry?' },
      { label: 'Chrysalis forms', emoji: '🛖', why: 'The caterpillar builds a hard case and changes inside.', clue: 'The resting-and-changing stage.' },
      { label: 'Butterfly emerges', emoji: '🦋', why: 'Wings unfold — ready to fly and lay new eggs.', clue: 'The flying adult stage.' },
    ],
    celebrate: 'A perfect life cycle — and around it goes again!',
  },
  sorter: {
    explorePrompt: 'Tap a card. Is it alive, or never alive?',
    bins: [
      { id: 'living', label: 'Living (or was)', emoji: '🌱' },
      { id: 'never', label: 'Never alive', emoji: '🤖' },
    ],
    items: [
      { label: 'Oak tree', emoji: '🌳', bin: 'living', why: 'Grows, feeds on light, makes seeds — alive.' },
      { label: 'Robot', emoji: '🤖', bin: 'never', why: 'Moves, but cannot grow or feed itself. Never alive.' },
      { label: 'Mushroom', emoji: '🍄', bin: 'living', why: 'A fungus — it grows and spreads spores.' },
      { label: 'River', emoji: '🏞️', bin: 'never', why: 'Moves and makes sound, but does not grow or reproduce.' },
      { label: 'Butterfly', emoji: '🦋', bin: 'living', why: 'Moves, feeds, grows and lays eggs.' },
      { label: 'Stone', emoji: '🪨', bin: 'never', why: 'Hard and old, but no food, growth or babies.' },
      { label: 'Wooden chair', emoji: '🪑', bin: 'living', why: 'Tricky! The tree was alive; the chair itself no longer grows.' },
      { label: 'Campfire', emoji: '🔥', bin: 'never', why: 'It eats fuel and seems alive, but it is a chemical reaction.' },
    ],
    celebrate: 'Life-or-not-life: sorted like a biologist!',
  },
  vocab: {
    'life cycle': 'The stages of a living thing’s life, from egg to adult.',
    reproduce: 'Make new living things of the same kind.',
    grow: 'Get bigger and change through life.',
  },
};

M['Science|The Human Body'] = {
  emoji: '🫀',
  coverArt: ['🫀', '🦴🧠'],
  artPalette: ['#FF6584', '#B388FF', '#FFE156', '#4ECDC4'],
  question: 'Who does which job inside your body?',
  centralIdea: 'Body parts work as teams — each system has a job that keeps you alive and moving.',
  sorter: {
    explorePrompt: 'Tap a body part to hear its job, then file it in the right team.',
    bins: [
      { id: 'move', label: 'Move you', emoji: '🏃' },
      { id: 'transport', label: 'Pump & breathe', emoji: '🫁' },
      { id: 'control', label: 'Think & feel', emoji: '🧠' },
      { id: 'frame', label: 'Hold you up', emoji: '🦴' },
    ],
    items: [
      { label: 'Biceps muscle', emoji: '💪', bin: 'move', why: 'Muscles pull on bones to make you move.' },
      { label: 'Heart', emoji: '🫀', bin: 'transport', why: 'Pumps blood — the delivery van inside you.' },
      { label: 'Brain', emoji: '🧠', bin: 'control', why: 'Runs the show: thinking, memory, and every command.' },
      { label: 'Skull', emoji: '🦴', bin: 'frame', why: 'A bony helmet protecting your brain.' },
      { label: 'Lungs', emoji: '🫁', bin: 'transport', why: 'Bring oxygen in and push carbon dioxide out.' },
      { label: 'Nerves', emoji: '⚡', bin: 'control', why: 'Zippy wires sending messages at top speed.' },
      { label: 'Femur', emoji: '🦵', bin: 'frame', why: 'Your longest bone — the strong strut of your leg.' },
      { label: 'Stomach', emoji: '🍽️', bin: 'transport', why: 'Churns food into fuel your blood can carry.' },
    ],
    celebrate: 'Every part filed under its team!',
  },
  vocab: {
    organ: 'A body part with a special job, like the heart.',
    muscle: 'Parts that tighten to pull bones and move you.',
    oxygen: 'The gas your body needs from every breath.',
  },
};

M['Science|Dinosaurs & Paleontology'] = {
  emoji: '🦕',
  coverArt: ['🦕', '🦴⛏️'],
  artPalette: ['#86EFAC', '#FFB347', '#FFE156', '#B388FF'],
  question: 'How does a dinosaur become a stone clue?',
  centralIdea: 'Fossils form step by step over millions of years — a story written in rock.',
  sequence: {
    mode: 'linear',
    explorePrompt: 'Tap each step to hear how a fossil forms.',
    cards: [
      { label: 'Dinosaur dies near a river', emoji: '🦕', why: 'Its body settles in soft mud by the water.', clue: 'Every story starts somewhere sad…' },
      { label: 'Mud covers the bones', emoji: '🏔️', why: 'Layers of mud protect the bones from air and scavengers.', clue: 'What hides and protects the bones?' },
      { label: 'Minerals seep into the bones', emoji: '💧', why: 'Water drips minerals in, turning bone hard as rock.', clue: 'Something sneaky replaces bone, bit by bit.' },
      { label: 'Rock slowly forms', emoji: '🪨', why: 'Millions of years press the layers into stone.', clue: 'Time does the heavy lifting.' },
      { label: 'Erosion reveals the fossil', emoji: '⛏️', why: 'Wind and rain wear the rock back — the fossil peeks out!', clue: 'What uncovers it at last?' },
    ],
    celebrate: 'You traced a fossil’s 100-million-year journey!',
  },
  vocab: {
    fossil: 'The stone-preserved remains or trace of an old living thing.',
    paleontologist: 'A scientist who studies fossils.',
    erode: 'Wear away slowly by wind and water.',
    mineral: 'Natural material in rocks and water.',
  },
};

M["Science|Space Systems & Earth's History"] = {
  emoji: '🪐',
  coverArt: ['🌍', '☀️🌙'],
  artPalette: ['#0a1428', '#38B6FF', '#FFE156', '#B388FF'],
  dark: true,
  explainSide: 'right',
  question: 'Why is it day here and night there — at the very same moment?',
  centralIdea: 'Earth spins once a day; the side facing the Sun has day while the far side has night.',
  spatial3d: {
    cases: [
      { city: 'Cairo', lat: 30, lon: 30, prompt: 'Spin the Earth so Cairo is in NIGHT, then predict and commit.', why: 'You turned Cairo away from the Sun —' },
      { city: 'Mexico City', lat: 19, lon: -99, prompt: 'Now put Mexico City in DAYLIGHT. Predict first!', why: 'Facing the Sun means morning light —' },
      { city: 'Sydney', lat: -34, lon: 151, prompt: 'Send Sydney into night without moving Cairo. Ready?', why: 'Earth’s spin gives every place its turn —' },
    ],
  },
  vocab: {
    rotate: 'Spin around like a top — Earth does this once a day.',
    orbit: 'The curved path one space object takes around another.',
    axis: 'The invisible line Earth spins around.',
  },
};

M['Science|Space Exploration'] = {
  emoji: '🚀',
  coverArt: ['🚀', '👩‍🚀🌕'],
  artPalette: ['#0a1428', '#B388FF', '#38B6FF', '#FFE156'],
  dark: true,
  question: 'What does it take to leave Earth and explore space?',
  centralIdea: 'Rockets, robots and brave crews help us explore beyond Earth — slowly, carefully, and together.',
  solar3d: {
    planets: [
      { name: 'Mercury', color: '#b7a99a', size: 0.9, orbit: 6, speed: 0.9, fact: 'Mercury is the smallest planet and the closest to the Sun.' },
      { name: 'Venus', color: '#e8c46b', size: 1.5, orbit: 9.5, speed: 0.65, fact: 'Venus is the hottest planet, wrapped in thick clouds.' },
      { name: 'Earth', color: '#3f9edb', size: 1.6, orbit: 13, speed: 0.5, tilt: 23, fact: 'Earth is the blue planet — the only one with oceans and life.' },
      { name: 'Mars', color: '#d1603d', size: 1.2, orbit: 16.5, speed: 0.4, tilt: 25, fact: 'Mars is the red planet, covered in rusty dust.' },
      { name: 'Jupiter', color: '#d9a066', size: 3.4, orbit: 21.5, speed: 0.25, fact: 'Jupiter is the biggest planet — a giant gas ball with a big red storm.' },
      { name: 'Saturn', color: '#e3c992', size: 2.9, orbit: 27, speed: 0.18, tilt: 27, fact: 'Saturn wears beautiful rings of ice and rock.', ring: true },
    ],
    cases: [
      { prompt: 'Case 1: Tap the planet we ALL live on, then commit.', answer: 'Earth', why: 'Earth — the blue one with oceans, air and life.', nudge: 'Read each fact as you tap. We live on the blue one!' },
      { prompt: 'Case 2: Find the BIGGEST planet and commit.', answer: 'Jupiter', why: 'Jupiter is the giant of the solar system.', nudge: 'Size matters here — which ball is biggest?' },
      { prompt: 'Case 3: Which planet wears bright rings?', answer: 'Saturn', why: 'Saturn’s rings are made of ice and rock.', nudge: 'Look for the one with a ring around it.' },
    ],
  },
  vocab: {
    rocket: 'A vehicle that burns fuel to push into space.',
    gravity: 'The force pulling things together — it keeps us on Earth.',
    astronaut: 'A person trained to travel into space.',
    telescope: 'A tool that makes faraway things look closer.',
  },
};

M['Science|Scientific Inquiry'] = {
  emoji: '🔎',
  coverArt: ['🔎', '⚗️📋'],
  artPalette: ['#4ECDC4', '#FFE156', '#B388FF', '#FF6584'],
  question: 'What makes a test fair — and an answer true?',
  centralIdea: 'Scientists change one thing at a time, measure carefully, and let evidence — not guesses — decide.',
  decision: {
    meters: [
      { id: 'evidence', label: 'Evidence', emoji: '🔍', start: 50 },
      { id: 'fairness', label: 'Fair test', emoji: '⚖️', start: 50 },
      { id: 'mood', label: 'Team spirit', emoji: '😊', start: 70 },
    ],
    scenes: [
      {
        text: 'Plant lab: Sam waters plant A with juice, plant B with water, and says “juice is best!” 🌱',
        choices: [
          { label: 'Give both plants water, change ONE thing at a time', meters: [['fairness', 25], ['evidence', 20]], reflect: 'Exactly! Change one variable (say, the light) and keep the rest the same — that is a fair test.', profile: 'Thinker' },
          { label: 'Keep the juice test — it already worked', meters: [['fairness', -20]], reflect: 'Two things changed at once (drink and maybe sunlight). The result cannot tell you which one mattered.' },
          { label: 'Test 10 plants with different drinks', meters: [['evidence', 10], ['fairness', 5]], reflect: 'More plants is great — but each still needs the same soil, pot and light to compare fairly.' },
        ],
      },
      {
        text: 'Ramp lab: your car rolled 40 cm, your friend’s rolled 32 cm on a bumpier track. 🚗',
        choices: [
          { label: 'Say the tracks were different and re-test on the same one', meters: [['fairness', 20], ['evidence', 15]], reflect: 'Communicator! Naming the difference and re-testing is real science — evidence beats arguing.', profile: 'Communicator' },
          { label: 'Declare your car the fastest forever', meters: [['evidence', -15], ['mood', 5]], reflect: 'One roll on different tracks proves little. Same track, several rolls, then compare.' },
          { label: 'Measure each roll three times and average', meters: [['evidence', 25]], reflect: 'Inquirer! Repeating measurements checks that a result was not just luck.', profile: 'Inquirer' },
        ],
      },
    ],
  },
  vocab: {
    'fair test': 'A test where only one thing changes at a time.',
    variable: 'The one thing you choose to change.',
    conclusion: 'What the evidence is telling you.',
  },
};

M['Science|Volcanoes & Earthquakes'] = {
  emoji: '🌋',
  coverArt: ['🌋', '🫨'],
  artPalette: ['#FF6584', '#FFB347', '#B388FF', '#4ECDC4'],
  question: 'What makes the ground rumble and mountains explode?',
  centralIdea: 'Earth’s moving plates build mountains, open volcanoes and shake the ground.',
  decision: {
    meters: [
      { id: 'safety', label: 'Safety', emoji: '🛡️', start: 55 },
      { id: 'energy', label: 'Trust', emoji: '🤝', start: 55 },
      { id: 'mood', label: 'Calm', emoji: '😊', start: 60 },
    ],
    scenes: [
      {
        text: 'Rumble scene: the ground starts shaking while you are indoors. 🫨',
        choices: [
          { label: 'Drop, cover under a strong table, hold on', meters: [['safety', 30], ['mood', 10]], reflect: 'Textbook move! Drop–Cover–Hold protects you from falling things until the shaking stops.', profile: 'Thinker' },
          { label: 'Run outside as fast as you can mid-shake', meters: [['safety', -20], ['mood', -5]], reflect: 'Most injuries come from falling debris on doorways and stairs — inside cover is safer until it stops.' },
          { label: 'Stand by the big window to watch', meters: [['safety', -30]], reflect: 'Glass is the first thing to fall. Far from windows, under cover, holding on.' },
        ],
      },
      {
        text: 'Hike scene: on a trail you notice a posted volcano warning sign and some smoke far away. ⚠️',
        choices: [
          { label: 'Turn back with your group and tell a ranger', meters: [['safety', 25], ['energy', 10]], reflect: 'Warning signs are the mountain talking. Turning back together is brave AND wise.', profile: 'Principled' },
          { label: 'Sneak closer for a better photo', meters: [['safety', -30], ['mood', -5]], reflect: 'Volcanic gas and sudden eruptions give no second chance. The photo is not worth it.' },
          { label: 'Ignore it — signs are usually old', meters: [['safety', -20]], reflect: 'Assuming signs are stale is a gamble with nature. Rangers update them for a reason.' },
        ],
      },
    ],
  },
  volcano3d: {
    cases: [
      { prompt: 'Case 1: Raise the pressure slowly. Predict — will it erupt? Commit your answer.', predict: 'erupt', why: 'Pressure wins —', nudge: 'Watch the smoke and the glow: what is the mountain telling you?' },
      { prompt: 'Case 2: Now keep the mountain CALM. What pressure lets it rest?', predict: 'calm', why: 'Low pressure —', nudge: 'Big numbers shake the ground. What keeps it quiet?' },
      { prompt: 'Case 3: Find the exact pressure where eruption begins.', predict: 'erupt', why: 'At pressure 4 —', nudge: 'Try each level and watch for the first lava bombs.' },
    ],
  },
  vocab: {
    magma: 'Melted rock under the ground.',
    lava: 'Magma once it escapes the surface.',
    plate: 'One of the giant slabs that make Earth’s shell.',
    eruption: 'When a volcano bursts open.',
  },
};

/* ================================= ENGLISH ================================= */

M['English|Grammar & Punctuation'] = {
  emoji: '✏️',
  coverArt: ['✏️', '❗'],
  artPalette: ['#FF6584', '#FFE156', '#4ECDC4', '#B388FF'],
  question: 'What makes a sentence shine?',
  centralIdea: 'Capitals, punctuation and word choice help a sentence say exactly what you mean.',
  doctor: {
    early: {
      patients: [
        { brief: 'Find the words that are hurt and tap them!', variants: [
          [{ text: 'we', injured: true, fixText: 'We', why: 'A sentence always starts with a capital letter — We.' }, { text: 'play' }, { text: 'outside' }, { text: 'today', injured: true, fixText: 'today.', why: 'A telling sentence ends with a full stop.' }],
          [{ text: 'the', injured: true, fixText: 'The', why: 'A sentence always starts with a capital letter — The.' }, { text: 'cat' }, { text: 'is' }, { text: 'black' }, { text: 'today', injured: true, fixText: 'today.', why: 'A telling sentence ends with a full stop.' }],
        ] },
        { brief: 'This sentence forgot two things. Can you find both?', variants: [
          [{ text: 'the', injured: true, fixText: 'The', why: 'The first word of a sentence gets a capital — The.' }, { text: 'dog' }, { text: 'ran' }, { text: 'fast', injured: true, fixText: 'fast.', why: 'Every sentence needs a full stop at the end.' }],
          [{ text: 'my', injured: true, fixText: 'My', why: 'The first word of a sentence gets a capital — My.' }, { text: 'dog' }, { text: 'is' }, { text: 'big', injured: true, fixText: 'big.', why: 'Every sentence needs a full stop at the end.' }],
        ] },
        { brief: 'Names and endings need help. Tap the hurt words.', variants: [
          [{ text: 'my', injured: true, fixText: 'My', why: 'The first word of a sentence gets a capital — My.' }, { text: 'friend' }, { text: 'sam', injured: true, fixText: 'Sam', why: 'People’s names always get a capital — even in the middle.' }, { text: 'is' }, { text: 'kind', injured: true, fixText: 'kind.', why: 'The sentence needs a full stop at the end.' }],
          [{ text: 'this', injured: true, fixText: 'This', why: 'The first word of a sentence gets a capital — This.' }, { text: 'present' }, { text: 'is' }, { text: 'for' }, { text: 'ben', injured: true, fixText: 'Ben.', why: 'Names get a capital AND the sentence needs its full stop.' }],
        ] },
      ],
    },
    mid: {
      patients: [
        { brief: 'This sentence forgot its question mark and capital.', variants: [
          [{ text: 'where', injured: true, fixText: 'Where', why: 'Every sentence starts with a capital.' }, { text: 'is' }, { text: 'my' }, { text: 'book', injured: true, fixText: 'book?', why: 'A question needs a question mark, not a full stop.' }],
          [{ text: 'can', injured: true, fixText: 'Can', why: 'Every sentence starts with a capital.' }, { text: 'you' }, { text: 'help' }, { text: 'me', injured: true, fixText: 'me?', why: 'A question needs a question mark, not a full stop.' }],
        ] },
        { brief: 'Three injuries here — can you spot all of them?', variants: [
          [{ text: 'we', injured: true, fixText: 'We', why: 'Capitals start sentences.' }, { text: 'saw' }, { text: 'paris', injured: true, fixText: 'Paris', why: 'Place names get capitals — even mid-sentence.' }, { text: 'in' }, { text: 'july', injured: true, fixText: 'July.', why: 'Month names get capitals too — and the sentence needs its full stop.' }],
          [{ text: 'they', injured: true, fixText: 'They', why: 'Capitals start sentences.' }, { text: 'visited' }, { text: 'london', injured: true, fixText: 'London', why: 'Place names get capitals — even mid-sentence.' }, { text: 'in' }, { text: 'may', injured: true, fixText: 'May.', why: 'Month names get capitals too — and the sentence needs its full stop.' }],
        ] },
        { brief: 'A list needs commas to breathe.', variants: [
          [{ text: 'I' }, { text: 'bought' }, { text: 'apples' }, { text: 'pears', injured: true, fixText: 'pears,', why: 'In a list, commas separate the items.' }, { text: 'and' }, { text: 'plums.' }],
          [{ text: 'She' }, { text: 'packed' }, { text: 'bread' }, { text: 'milk', injured: true, fixText: 'milk,', why: 'In a list, commas separate the items.' }, { text: 'and' }, { text: 'eggs.' }],
        ] },
      ],
    },
    upper: {
      patients: [
        { brief: 'Yesterday’s news: fix the word injuries.', variants: [
          [{ text: 'Yesterday' }, { text: 'we' }, { text: 'walk', injured: true, fixText: 'walked', why: '“Yesterday” signals past tense — walk becomes walked.' }, { text: 'to' }, { text: 'the' }, { text: 'park' }, { text: 'quick', injured: true, fixText: 'quickly.', why: 'It describes HOW we walked, so it takes the -ly adverb form — and the sentence needs its full stop.' }],
          [{ text: 'Last' }, { text: 'night' }, { text: 'he' }, { text: 'run', injured: true, fixText: 'ran', why: '“Last night” signals past tense — run becomes ran.' }, { text: 'to' }, { text: 'the' }, { text: 'store' }, { text: 'fast', injured: true, fixText: 'fast.', why: 'The sentence needs its full stop at the end.' }],
        ] },
        { brief: 'Ownership words and capitals are hurting. Find them.', variants: [
          [{ text: 'The' }, { text: 'dog' }, { text: 'wagged' }, { text: 'it’s', injured: true, fixText: 'its', why: '“it’s” means “it is”. The possessive is “its” with no apostrophe.' }, { text: 'tail.' }],
          [{ text: 'the', injured: true, fixText: 'The', why: 'Every sentence starts with a capital.' }, { text: 'dogs' }, { text: 'lost' }, { text: 'there', injured: true, fixText: 'their', why: '“there” names a place; the possessive of “they” is “their”.' }, { text: 'bones' }, { text: 'in' }, { text: 'the' }, { text: 'yard.' }],
        ] },
        { brief: 'A comma and an ending are missing — find where.', variants: [
          [{ text: 'After' }, { text: 'school', injured: true, fixText: 'school,', why: 'An intro phrase like “After school” takes a comma before the main clause.' }, { text: 'we' }, { text: 'raced' }, { text: 'home', injured: true, fixText: 'home.', why: 'The sentence needs its full stop at the end.' }],
          [{ text: 'Before' }, { text: 'dinner', injured: true, fixText: 'dinner,', why: 'An intro phrase like “Before dinner” takes a comma before the main clause.' }, { text: 'they' }, { text: 'wash', injured: true, fixText: 'washed', why: 'The story is in the past — wash becomes washed.' }, { text: 'their' }, { text: 'hands', injured: true, fixText: 'hands.', why: 'The sentence needs its full stop at the end.' }],
        ] },
      ],
    },
  },
  vocab: {
    capital: 'The big letter form, like A — used at sentence starts and names.',
    'full stop': 'The dot (.) that ends a telling sentence.',
    'question mark': 'The (?) that ends an asking sentence.',
    comma: 'The small pause mark (,) in lists and sentences.',
  },
};

M['English|Handwriting & Transcription'] = {
  emoji: '🔤',
  coverArt: ['✍️', '📓'],
  artPalette: ['#FFE156', '#4ECDC4', '#FF6584', '#B388FF'],
  question: 'Can your letters sit neatly on the line?',
  centralIdea: 'Careful letter shapes, sizes and spacing make writing easy to read.',
  worksheet: {
    kind: 'handwriting',
    prompt: 'Build your practice sheet, then print it and trace.',
    intro: 'Each word gets a model, two traces, and one blank cell to try alone.',
    wordsByBand: {
      early: ['cat', 'dog', 'sun', 'hat', 'run', 'big', 'red', 'fox'],
      mid: ['because', 'friend', 'said', 'again', 'school', 'water', 'every', 'great'],
      upper: ['sentence', 'paragraph', 'description', 'connect', 'organize', 'interest', 'probably', 'separate'],
    },
  },
  vocab: {
    trace: 'Copy the letter by following its shape.',
    space: 'The gap between words that keeps them apart.',
  },
};

M['English|Phonics & Word Reading'] = {
  emoji: '🔊',
  coverArt: ['🗣️', '🅰️'],
  artPalette: ['#4ECDC4', '#FFE156', '#FF6584', '#38B6FF'],
  question: 'What sounds hide inside these words?',
  wordBuilder: {
    prompt: 'Say the sounds, then tap the letters in order!',
    wordsByBand: {
      early: [
        { word: 'cat', emoji: '🐱', hint: 'c-a-t — three sounds, one word.' },
        { word: 'ship', emoji: '🚢', hint: 'sh-i-p — “sh” is one sound, two letters.' },
        { word: 'frog', emoji: '🐸', hint: 'f-r-o-g — blend them smoothly.' },
        { word: 'rain', emoji: '🌧️', hint: 'r-ai-n — “ai” makes the long a.' },
      ],
      mid: [
        { word: 'chair', emoji: '🪑', hint: 'ch-air — two sound teams.' },
        { word: 'queen', emoji: '👑', hint: 'qu-ee-n — “ee” says its name.' },
        { word: 'cloud', emoji: '☁️', hint: 'cl-ou-d — “ou” as in ouch!' },
      ],
      upper: [
        { word: 'night', emoji: '🌙', hint: 'n-igh-t — “igh” makes the long i.' },
        { word: 'bridge', emoji: '🌉', hint: 'br-i-dge — “dge” after a short vowel.' },
        { word: 'phone', emoji: '📞', hint: 'ph-one — “ph” sounds like f!' },
      ],
    },
  },
  centralIdea: 'Letters are sound codes — blending them unlocks new words.',
  arcade: {
    kind: 'bank',
    items: [
      { prompt: 'Which word starts with the “sh” sound?', choices: [{ text: 'ship', emoji: '🚢', correct: true }, { text: 'cat', emoji: '🐱' }, { text: 'sun', emoji: '☀️' }], why: 'Sh-ip! “Sh” makes one sound: shhh.' },
      { prompt: 'Which word ends with the “ck” sound?', choices: [{ text: 'duck', emoji: '🦆', correct: true }, { text: 'dog', emoji: '🐶' }, { text: 'moon', emoji: '🌙' }], why: 'Du-ck! Two letters, one /k/ sound at the end.' },
      { prompt: 'Which word has the long “ee” sound?', choices: [{ text: 'tree', emoji: '🌳', correct: true }, { text: 'bell', emoji: '🔔' }, { text: 'stop', emoji: '✋' }], why: 'Tr-ee — “ee” says its name: eee!' },
      { prompt: 'Which word starts with “ch”?', choices: [{ text: 'chair', emoji: '🪑', correct: true }, { text: 'ship', emoji: '🚢' }, { text: 'ball', emoji: '⚽' }], why: 'Ch-air! “Ch” makes the choo-choo sound.' },
      { prompt: 'Which word rhymes with “cake”?', choices: [{ text: 'lake', emoji: '🏞️', correct: true }, { text: 'sock', emoji: '🧦' }, { text: 'cup', emoji: '🥤' }], why: 'Cake–lake! Same ending sound makes a rhyme.' },
      { prompt: 'Which word starts with the “th” sound?', choices: [{ text: 'thumb', emoji: '👍', correct: true }, { text: 'sun', emoji: '☀️' }, { text: 'hat', emoji: '🎩' }], why: 'Th-umb! Stick your tongue out slightly: thhh.' },
      { prompt: 'Blend it: c-a-t. What word?', choices: [{ text: 'cat', emoji: '🐱', correct: true }, { text: 'cot', emoji: '🛏️' }, { text: 'cap', emoji: '🧢' }], why: 'C…a…t — cat! Blending sounds makes words.' },
      { prompt: 'Which word has TWO syllables?', choices: [{ text: 'rabbit', emoji: '🐰', correct: true }, { text: 'fish', emoji: '🐟' }, { text: 'dog', emoji: '🐶' }], why: 'Rab-bit — clap it out: two claps, two syllables!' },
    ],
  },
  vocab: {
    blend: 'Push sounds together to read a word: c-a-t → cat.',
    syllable: 'A beat chunk in a word — “rab-bit” has two.',
    rhyme: 'Words with the same ending sound.',
  },
};

M['English|Reading Comprehension'] = {
  emoji: '📖',
  coverArt: ['📖', '🐷🐺'],
  artPalette: ['#FF6584', '#FFE156', '#4ECDC4', '#86EFAC'],
  question: 'Can you hold a whole story in your hand?',
  centralIdea: 'Retelling a story by its parts — setting, characters, problem, events, solution — proves you understood it.',
  sequence: {
    mode: 'linear',
    explorePrompt: 'Tap each story part to hear what it does, then order “The Three Little Pigs”.',
    cards: [
      { label: 'Three pigs leave home to build houses', emoji: '🐷', why: 'The beginning sets up who and where.', clue: 'Every story starts by introducing who.' },
      { label: 'The wolf huffs and blows two houses down', emoji: '🐺', why: 'The problem grows bigger and bigger.', clue: 'Trouble arrives — what makes it worse?' },
      { label: 'The pigs hide in the brick house', emoji: '🏠', why: 'The plan that might save the day.', clue: 'What do the characters try next?' },
      { label: 'The wolf slides down the chimney into the pot', emoji: '🍲', why: 'The big moment — the problem is solved.', clue: 'How does the trouble finally end?' },
      { label: 'The pigs build safely and live happily', emoji: '🎉', why: 'The ending shows what everyone learned.', clue: 'How does life look after the problem?' },
    ],
    celebrate: 'You retold the whole story — setting to solution!',
  },
  /* Band tiering: young bands retell a tale; upper readers sequence how a
     text itself is built (their comprehension topics). */
  sequenceByBand: {
    mid: {
      mode: 'linear',
      explorePrompt: 'Tap each part of the story mountain, then climb it in order.',
      cards: [
        { label: 'We meet the characters and their world', emoji: '🌍', why: 'The opening introduces who and where.', clue: 'Who is this story about?' },
        { label: 'A problem appears', emoji: '⚡', why: 'Stories need trouble to get moving.', clue: 'What goes wrong?' },
        { label: 'Trouble grows to the big moment', emoji: '🏔️', why: 'The top of the mountain — everything is at stake.', clue: 'When is it worst of all?' },
        { label: 'The clever fix', emoji: '🔧', why: 'The characters act to solve the problem.', clue: 'How do they fight back?' },
        { label: 'The lesson lands', emoji: '💡', why: 'The ending shows what changed.', clue: 'What did they learn?' },
      ],
      celebrate: 'You climbed the whole story mountain — problem to lesson!',
    },
    upper: {
      mode: 'linear',
      explorePrompt: 'News writers build articles in a special order. Build one yourself.',
      cards: [
        { label: 'Headline — the hook that tells the news', emoji: '📰', why: 'A few big words that make you want to read on.', clue: 'What do you read first?' },
        { label: 'Lead — who, what, where, when', emoji: '⚡', why: 'The first sentence carries the key facts.', clue: 'Where do the important facts live?' },
        { label: 'Facts and quotes from witnesses', emoji: '💬', why: 'Evidence and real voices make it believable.', clue: 'What proves the story is true?' },
        { label: 'Expert view — why it matters', emoji: '🧑‍🔬', why: 'The article zooms out to explain the meaning.', clue: 'Who explains the big picture?' },
        { label: 'What happens next', emoji: '⏭️', why: 'Good articles point forward.', clue: 'How does it end without ending?' },
      ],
      celebrate: 'You built an article like a real journalist — headline to what-next!',
    },
  },
  vocab: {
    setting: 'Where and when a story happens.',
    character: 'Who the story is about.',
    solution: 'How the problem gets fixed.',
    retell: 'Say the story again in your own words.',
  },
};

M['English|Speaking & Listening'] = {
  emoji: '🗣️',
  coverArt: ['💬', '👂'],
  artPalette: ['#4ECDC4', '#FFE156', '#B388FF', '#FF6584'],
  question: 'How do good conversations grow?',
  centralIdea: 'Great talkers take turns, listen with their eyes and ears, and build on others’ ideas.',
  sequence: {
    mode: 'linear',
    explorePrompt: 'Tap each step of a kind conversation.',
    cards: [
      { label: 'Greet and look at your partner', emoji: '👋', why: 'A hello and eye contact say “I am ready to listen.”', clue: 'How does a conversation open?' },
      { label: 'Listen without interrupting', emoji: '👂', why: 'Quiet lips and busy ears let the idea land.', clue: 'What do you do while the other talks?' },
      { label: 'Ask a question about their idea', emoji: '❓', why: 'Questions show you really heard them.', clue: 'What keeps the talk growing?' },
      { label: 'Build on it: “Yes, and…”', emoji: '➕', why: 'Adding your idea to theirs makes a bigger idea.', clue: 'How do two ideas become one?' },
      { label: 'Thank them and take turns', emoji: '🔁', why: 'Switching roles keeps the talk fair.', clue: 'How does the conversation stay balanced?' },
    ],
    celebrate: 'That is a conversation worth copying!',
  },
  vocab: {
    interrupt: 'Start talking before the other person finishes.',
    'take turns': 'Share the talking time fairly.',
  },
};

M['English|Spelling & Word Study'] = {
  emoji: '🔤',
  coverArt: ['🔤', '🩹'],
  artPalette: ['#FFE156', '#FF6584', '#4ECDC4', '#B388FF'],
  question: 'Which letters are hiding where they should not be?',
  centralIdea: 'Spelling patterns — not luck — help you fix and remember words.',
  doctor: {
    early: {
      patients: [
        { brief: 'One word is misspelled. Find it and heal it!', variants: [
          [{ text: 'The' }, { text: 'cat' }, { text: 'sat' }, { text: 'on' }, { text: 'the' }, { text: 'mta.', injured: true, fixText: 'mat.', why: 'The letters jumped the line! m-t-a → m-a-t: mat.' }],
          [{ text: 'The' }, { text: 'frogg', injured: true, fixText: 'frog.', why: 'One “g” is enough: frog. The extra g needs a bandage.' }, { text: 'can' }, { text: 'hop.' }],
        ] },
        { brief: 'Find the spelling injury.', variants: [
          [{ text: 'I' }, { text: 'lked', injured: true, fixText: 'liked', why: 'A missing letter! “I lked” needs its i: liked.' }, { text: 'the' }, { text: 'cake.' }],
          [{ text: 'She' }, { text: 'huggd', injured: true, fixText: 'hugged', why: 'Double g, then ed: hugged. The d ran away!' }, { text: 'her' }, { text: 'cat.' }],
        ] },
      ],
    },
    mid: {
      patients: [
        { brief: 'Two words are hurt. Diagnose them.', variants: [
          [{ text: 'My' }, { text: 'freind', injured: true, fixText: 'friend', why: 'Remember the ending: fri-END. Friend.' }, { text: 'helpd', injured: true, fixText: 'helped', why: 'Past tense needs the “e”: helped.' }, { text: 'me' }, { text: 'yesterday.' }],
          [{ text: 'We' }, { text: 'walkt', injured: true, fixText: 'walked', why: 'Past tense adds -ed, not just t: walked.' }, { text: 'to' }, { text: 'the' }, { text: 'shoping', injured: true, fixText: 'shopping', why: 'Double the p before -ing: shopping.' }, { text: 'centre.' }],
        ] },
        { brief: 'Heal the hurt spellings.', variants: [
          [{ text: 'I' }, { text: 'lafed', injured: true, fixText: 'laughed', why: 'The /f/ sound is spelled “gh” here: laughed.' }, { text: 'at' }, { text: 'the' }, { text: 'beutiful', injured: true, fixText: 'beautiful', why: 'Be-a-u-tiful — the “eau” hides in the middle.' }, { text: 'flowers.' }],
          [{ text: 'The' }, { text: 'flowers' }, { text: 'ar', injured: true, fixText: 'are', why: '“ar” needs its e: are.' }, { text: 'very' }, { text: 'pretty.' }],
        ] },
      ],
    },
    upper: {
      patients: [
        { brief: 'Proofread like an editor.', variants: [
          [{ text: 'The' }, { text: 'secratary', injured: true, fixText: 'secretary', why: 'Sec-re-tary — keep the “e” before “tary”.' }, { text: 'will' }, { text: 'seperate', injured: true, fixText: 'separate', why: 'There is “a rat” in sep-A-rate!' }, { text: 'the' }, { text: 'letters.' }],
          [{ text: 'He' }, { text: 'recieved', injured: true, fixText: 'received', why: '“i before e” breaks after c: rece-ived.' }, { text: 'a' }, { text: 'medal' }, { text: 'yesterday.' }],
        ] },
        { brief: 'Tricky endings ahead.', variants: [
          [{ text: 'She' }, { text: 'definately', injured: true, fixText: 'definitely', why: 'From “definite” + ly: definitely — keep the “ite”.' }, { text: 'acepted', injured: true, fixText: 'accepted', why: 'Double “c” in accepted — ac-CEPT-ed.' }, { text: 'the' }, { text: 'offer.' }],
          [{ text: 'An' }, { text: 'arguement', injured: true, fixText: 'argument', why: 'The “e” drops out: argument.' }, { text: 'needs' }, { text: 'two' }, { text: 'sides.' }],
        ] },
      ],
    },
  },
  wordBuilder: {
    prompt: 'Say the word, then tap the letters in order!',
    wordsByBand: {
      early: [
        { word: 'cat', emoji: '🐱', hint: 'C-A-T — a small pet that says meow.' },
        { word: 'sun', emoji: '☀️', hint: 'S-U-N — it lights the day.' },
        { word: 'fish', emoji: '🐟', hint: 'F-I-S-H — it swims and has fins.' },
        { word: 'cake', emoji: '🎂', hint: 'C-A-K-E — sweet and baked!' },
      ],
      mid: [
        { word: 'friend', emoji: '🧑‍🤝‍🧑', hint: 'Remember the ending: fri-END.' },
        { word: 'because', emoji: '🤔', hint: 'be-CAUSE — it answers “why”.' },
        { word: 'laughed', emoji: '😂', hint: 'The /f/ sound hides in “gh”.' },
        { word: 'beautiful', emoji: '🌸', hint: 'be-AU-tiful — “eau” in the middle.' },
      ],
      upper: [
        { word: 'separate', emoji: '✂️', hint: 'There is “a rat” in sep-A-rate.' },
        { word: 'definitely', emoji: '✅', hint: 'definite + ly.' },
        { word: 'accepted', emoji: '🤝', hint: 'Double “c”: ac-CEPT-ed.' },
        { word: 'secretary', emoji: '💼', hint: 'sec-RE-tary.' },
      ],
    },
  },
  vocab: {
    spell: 'Write a word with the right letters in order.',
    pattern: 'A letter team that repeats across words, like “-ight”.',
  },
};

M['English|Vocabulary'] = {
  emoji: '🗂️',
  coverArt: ['🗂️', '💡'],
  artPalette: ['#B388FF', '#FFE156', '#4ECDC4', '#FF6584'],
  question: 'Which word says exactly what you mean?',
  centralIdea: 'A rich word collection lets you say precisely what you see, feel and think.',
  memory: {
    explorePrompt: 'Flip two cards. Match each word to what it means!',
    celebrate: 'Every word found its meaning — your word collection is growing!',
    pairs: [
      { a: { label: 'happy', emoji: '😊' }, b: { label: 'very glad', emoji: '🙌' }, why: 'Happy and glad — the same feeling family (synonyms).' },
      { a: { label: 'huge', emoji: '🦕' }, b: { label: 'very big', emoji: '🗻' }, why: 'Huge means very big!' },
      { a: { label: 'tiny', emoji: '🐜' }, b: { label: 'very small', emoji: '🤏' }, why: 'Tiny means very small — the opposite of huge.' },
      { a: { label: 'ancient', emoji: '🏺' }, b: { label: 'very old', emoji: '📜' }, why: 'Ancient means from long, long ago.' },
      { a: { label: 'eager', emoji: '⚡' }, b: { label: 'can’t wait to do it', emoji: '🎯' }, why: 'Eager — excited and ready to go!' },
      { a: { label: 'shimmer', emoji: '✨' }, b: { label: 'soft wobbly light', emoji: '🌟' }, why: 'Shimmer — shining with a gentle, wavering light.' },
    ],
  },
  vocab: {
    synonym: 'A word with almost the same meaning as another.',
    antonym: 'A word with the opposite meaning.',
    precise: 'Exactly right — not roughly right.',
  },
};

M['English|Writing Composition'] = {
  emoji: '📝',
  coverArt: ['📝', '🏗️'],
  artPalette: ['#FFE156', '#FF6584', '#4ECDC4', '#B388FF'],
  question: 'How do you build a story readers can’t put down?',
  centralIdea: 'Stories are built in parts — a beginning that hooks, a middle that troubles, an ending that lands.',
  sequence: {
    mode: 'linear',
    explorePrompt: 'Tap each story-building block to hear its job.',
    cards: [
      { label: 'Hook: a character wants something', emoji: '🪝', why: 'Open with who, where, and a wish.', clue: 'What makes a reader keep going?' },
      { label: 'A problem blocks the wish', emoji: '🚧', why: 'No problem, no story — trouble is the engine.', clue: 'What stops the character?' },
      { label: 'Attempts make things worse', emoji: '😅', why: 'Try, fail, try again — the middle builds tension.', clue: 'The character tries… and?' },
      { label: 'The big moment of change', emoji: '💡', why: 'The character finds the key idea or tool.', clue: 'What turns the story around?' },
      { label: 'Ending: the wish changes or comes true', emoji: '🌅', why: 'Land the feeling — and what changed inside.', clue: 'How does it all settle?' },
    ],
    celebrate: 'Story architecture complete — now write yours!',
  },
  vocab: {
    hook: 'The first line that grabs the reader.',
    tension: 'The worried “what happens next?” feeling.',
    draft: 'A first try at writing, made to be improved.',
  },
};

/* ==================== PERSONAL & SOCIAL DEVELOPMENT ==================== */

M['Personal & Social Development|Emotional Literacy'] = {
  emoji: '😊',
  coverArt: ['😊', '😤😢'],
  artPalette: ['#FFE156', '#FF6584', '#4ECDC4', '#B388FF'],
  question: 'Can you name what a feeling is trying to say?',
  centralIdea: 'Naming feelings — in ourselves and others — is the first step to handling them well.',
  decision: {
    meters: [
      { id: 'mood', label: 'Mood', emoji: '😊', start: 55 },
      { id: 'energy', label: 'Energy', emoji: '⚡', start: 60 },
      { id: 'calm', label: 'Calm', emoji: '🧘', start: 45 },
    ],
    scenes: [
      {
        text: 'Your tower fell down just before you finished it. Your face feels hot and your fists squeeze. 😤',
        choices: [
          { label: 'Name it: “I am frustrated” — then take 3 slow breaths', meters: [['calm', 25], ['mood', 10]], reflect: 'Naming a feeling shrinks it. “I am frustrated” puts YOU in charge of the feeling, not the other way.', profile: 'Self-Aware' },
          { label: 'Knock over someone else’s tower', meters: [['mood', -10], ['calm', -20]], reflect: 'The anger wanted out — but passing it on makes two unhappy people. A breath costs nothing.' },
          { label: 'Say “I don’t care” and storm off', meters: [['calm', -5], ['mood', -15]], reflect: 'You DO care — that is why it stung. It is okay to step away AND to admit the feeling.' },
        ],
      },
      {
        text: 'Your friend got the prize you practiced for all month. Your chest feels tight. 🏆',
        choices: [
          { label: 'Notice it: “This is jealousy” — and congratulate them', meters: [['mood', 15], ['calm', 15]], reflect: 'Jealousy is a normal signal, not a fault. Naming it and choosing kindness is real strength.', profile: 'Caring' },
          { label: 'Say their prize was lucky, not earned', meters: [['mood', -10], ['calm', -10]], reflect: 'That stung THEM — and did not make your feeling smaller. Kindness and honesty can share a sentence.' },
          { label: 'Ask them to teach you their trick', meters: [['mood', 20], ['energy', 10]], reflect: 'Brilliant turn! Jealousy became curiosity — and now their skill is partly yours too.', profile: 'Inquirer' },
        ],
      },
      {
        text: 'A big storm is coming and you feel wobbly inside, but you cannot say why. 🌩️',
        choices: [
          { label: 'Draw the wobbly feeling and show a grown-up', meters: [['calm', 20], ['mood', 10]], reflect: 'Feelings can hide from words but not from pictures. Sharing a worry halves it.', profile: 'Communicator' },
          { label: 'Hide under the bed until it passes', meters: [['calm', -10]], reflect: 'Hiding keeps the worry warm. A grown-up can weather-proof it with you.' },
          { label: 'Yell at your little brother', meters: [['mood', -15], ['calm', -20]], reflect: 'The wobble was never about your brother. Naming the real feeling helps it settle.' },
        ],
      },
    ],
  },
  sorter: {
    explorePrompt: 'Tap a feeling to hear what it is like, then sort it.',
    bins: [
      { id: 'sunny', label: 'Feels good & sunny', emoji: '🌤️' },
      { id: 'stormy', label: 'Feels big & stormy', emoji: '⛈️' },
    ],
    items: [
      { label: 'Proud', emoji: '😎', bin: 'sunny', why: 'Proud is the glow of a job well done.' },
      { label: 'Excited', emoji: '🤩', bin: 'sunny', why: 'Excited is bouncy energy pointing forward.' },
      { label: 'Calm', emoji: '🧘', bin: 'sunny', why: 'Calm is a slow, steady sea inside.' },
      { label: 'Frustrated', emoji: '😤', bin: 'stormy', why: 'Frustrated says “I want this to work!” — it has news for you.' },
      { label: 'Worried', emoji: '😟', bin: 'stormy', why: 'Worried is your mind trying to protect you — it just turns the volume up too high.' },
      { label: 'Lonely', emoji: '🙁', bin: 'stormy', why: 'Lonely says “I need my people.” Listening to it helps.' },
    ],
    celebrate: 'Every feeling has a name — and a message!',
  },
  vocab: {
    frustrated: 'Stuck and annoyed when something will not work.',
    emotion: 'A feeling with a name, like proud or worried.',
  },
};

M['Personal & Social Development|Empathy & Social Awareness'] = {
  emoji: '🤝',
  coverArt: ['🫶', '👀💭'],
  artPalette: ['#FF6584', '#FFE156', '#4ECDC4', '#86EFAC'],
  question: 'What is it like to be in someone else’s shoes?',
  centralIdea: 'Empathy means noticing others’ feelings and letting them shape what you do next.',
  decision: {
    meters: [
      { id: 'mood', label: 'Friendship', emoji: '💛', start: 55 },
      { id: 'energy', label: 'Courage', emoji: '🦁', start: 50 },
      { id: 'calm', label: 'Calm', emoji: '🧘', start: 60 },
    ],
    scenes: [
      {
        text: 'A new student eats lunch alone. The class is noisy around them. 🥪',
        choices: [
          { label: 'Sit with them and ask one friendly question', meters: [['mood', 25], ['energy', 10]], reflect: 'One question can open a door. You noticed the silence nobody else did — that is empathy in action.', profile: 'Caring' },
          { label: 'Feel bad but wait for someone else first', meters: [['mood', 0], ['energy', -10]], reflect: 'Noticing is step one! The second step is small: “Can I sit here?” works every time.' },
          { label: 'Keep playing — someone else will help', meters: [['mood', -10]], reflect: 'Everyone thinks someone else will go. Kindness needs a volunteer — why not you?' },
        ],
      },
      {
        text: 'Your joke made the whole table laugh — except one friend, who went quiet. 😅',
        choices: [
          { label: 'Check quietly: “Was that joke about you? Sorry.”', meters: [['mood', 20], ['calm', 10]], reflect: 'Reading the room AND repairing it — that is a Communicator and a Caring friend at once.', profile: 'Communicator' },
          { label: 'Tell them to lighten up', meters: [['mood', -15], ['calm', -10]], reflect: 'Their quiet was information, not rudeness. Jokes land differently on every heart.' },
          { label: 'Never joke at the table again', meters: [['mood', -5], ['calm', -5]], reflect: 'Careful is kind, but total silence is heavy. Read, repair, and keep the laughter shared.' },
        ],
      },
    ],
  },
  vocab: {
    empathy: 'Feeling with someone — imagining their inside weather.',
    include: 'Make room for someone in the group.',
  },
};

M['Personal & Social Development|Friendship & Cooperation'] = {
  emoji: '👫',
  coverArt: ['🧩', '🤝'],
  artPalette: ['#4ECDC4', '#FFE156', '#FF6584', '#86EFAC'],
  question: 'How do two people build one thing together?',
  centralIdea: 'Friendships and teamwork grow from sharing, turn-taking and fixing small breaks.',
  decision: {
    meters: [
      { id: 'mood', label: 'Friendship', emoji: '💛', start: 60 },
      { id: 'energy', label: 'Team power', emoji: '⚡', start: 55 },
      { id: 'calm', label: 'Fairness', emoji: '⚖️', start: 50 },
    ],
    scenes: [
      {
        text: 'Build scene: you and your partner each want the tower built YOUR way. 🏗️',
        choices: [
          { label: 'Mix both plans — one base, one top', meters: [['energy', 20], ['calm', 15]], reflect: 'Cooperation upgrade! Two ideas stitched together beat either alone.', profile: 'Balanced' },
          { label: 'Grab the blocks first — fastest wins', meters: [['calm', -20], ['mood', -10]], reflect: 'Speed won the blocks but lost the team. Tomorrow they may not want to build with you.' },
          { label: 'Quit and play alone', meters: [['mood', -15], ['energy', -10]], reflect: 'Alone is peaceful sometimes — but the tower wanted two engineers.' },
        ],
      },
      {
        text: 'Your friend forgot their snack — again. You have two cookies. 🍪',
        choices: [
          { label: 'Split one — half each, keep half for you', meters: [['mood', 20], ['calm', 15]], reflect: 'Sharing does not mean giving everything away — a fair split keeps BOTH friends strong.', profile: 'Principled' },
          { label: 'Give both cookies every single time', meters: [['mood', 10], ['energy', -20]], reflect: 'Kind, but watch your own fuel tank. Generosity needs balance to last.' },
          { label: 'Hide your cookies this time', meters: [['mood', -15], ['calm', -10]], reflect: 'Hunger makes feelings loud. A “no, but let us split” is honest AND kind.' },
        ],
      },
    ],
  },
  sorter: {
    explorePrompt: 'Tap a card. Would it build a friendship up or wear it down?',
    bins: [
      { id: 'build', label: 'Builds friendship', emoji: '🧱' },
      { id: 'wear', label: 'Wears it down', emoji: '🧨' },
    ],
    items: [
      { label: 'Take turns', emoji: '🔁', bin: 'build', why: 'Turn-taking shares the fun and the power.' },
      { label: 'Say sorry when wrong', emoji: '💛', bin: 'build', why: 'A real sorry repairs the small breaks before they grow.' },
      { label: 'Keep secrets safely', emoji: '🤫', bin: 'build', why: 'Trusted secrets are friendship glue.' },
      { label: 'Tease about mistakes', emoji: '🙈', bin: 'wear', why: 'Teasing turns a mistake into a wound.' },
      { label: 'Only play it YOUR way', emoji: '👑', bin: 'wear', why: 'King-of-the-hill play leaves no room for friends.' },
      { label: 'Break promises often', emoji: '💔', bin: 'wear', why: 'Trust is built in kept promises and lost in broken ones.' },
    ],
    celebrate: 'You know what friendship is made of!',
  },
  vocab: {
    cooperate: 'Work together toward one goal.',
    compromise: 'Meet in the middle so both sides win something.',
  },
};

M['Personal & Social Development|Responsible Decision-Making'] = {
  emoji: '🧭',
  coverArt: ['🧭', '⚖️'],
  artPalette: ['#B388FF', '#FFE156', '#4ECDC4', '#FF6584'],
  question: 'When two choices both feel right — how do you decide?',
  centralIdea: 'Good decisions pause, weigh the consequences, and choose what helps people stay safe and well.',
  decision: {
    meters: [
      { id: 'mood', label: 'Well-being', emoji: '🍎', start: 60 },
      { id: 'energy', label: 'Trust', emoji: '🤝', start: 55 },
      { id: 'calm', label: 'Calm', emoji: '🧘', start: 55 },
    ],
    scenes: [
      {
        text: 'You find a shiny watch on the playground. Nobody is around. ⌚',
        choices: [
          { label: 'Take it to a teacher so its owner can find it', meters: [['energy', 25], ['calm', 15]], reflect: 'Principled! Doing right even when nobody watches is the definition of integrity.', profile: 'Principled' },
          { label: 'Keep it — finders keepers', meters: [['energy', -25], ['mood', -10]], reflect: 'Imagine YOUR watch lost. Someone is sad right now — you can fix that in one walk.' },
          { label: 'Leave it where it is', meters: [['energy', -5]], reflect: 'Not stealing, but also not helping. Handing it in takes one minute of courage.' },
        ],
      },
      {
        text: 'Your friends dare you to jump the fence at the park “or you’re scared”. 🚧',
        choices: [
          { label: 'Say “I’m not doing that” and offer a braver game', meters: [['energy', 20], ['mood', 10]], reflect: 'Risk-taker energy, used wisely! Real courage walks AWAY from show-off danger.', profile: 'Risk-taker' },
          { label: 'Jump it so nobody calls you scared', meters: [['mood', -20], ['calm', -15]], reflect: 'Fear kept you safe — that is its job. Friends who respect you will respect a no.' },
          { label: 'Walk away silently without a word', meters: [['mood', -5], ['calm', 5]], reflect: 'Safe — but saying why (“that fence is sharp”) might pull a friend back too.' },
        ],
      },
    ],
  },
  vocab: {
    consequence: 'What happens because of a choice.',
    integrity: 'Doing right even when nobody is watching.',
  },
};

M['Personal & Social Development|Self-Regulation & Resilience'] = {
  emoji: '🧘',
  coverArt: ['🧘', '🌱💪'],
  artPalette: ['#4ECDC4', '#86EFAC', '#FFE156', '#B388FF'],
  question: 'How do you steer yourself back to calm?',
  centralIdea: 'Big feelings pass — breathing, plans and practice help you steer through them.',
  decision: {
    meters: [
      { id: 'calm', label: 'Calm', emoji: '🧘', start: 35 },
      { id: 'mood', label: 'Confidence', emoji: '🌱', start: 45 },
      { id: 'energy', label: 'Energy', emoji: '⚡', start: 55 },
    ],
    scenes: [
      {
        text: 'Test morning: your heart races and your brain feels foggy. 📝',
        choices: [
          { label: 'Four-count breathing, then start with question 1', meters: [['calm', 30], ['mood', 15]], reflect: 'Box breathing tells your body “we are safe”. A slow start beats a fast panic.', profile: 'Thinker' },
          { label: 'Rush every answer to escape the feeling', meters: [['mood', -10], ['calm', -20]], reflect: 'Speed felt like safety, but foggy brains need a slow first breath more than a fast pencil.' },
          { label: 'Put your head down and give up', meters: [['mood', -20], ['energy', -15]], reflect: 'Overwhelm is real. One tiny step (just question 1) usually restarts the engine.' },
        ],
      },
      {
        text: 'You keep missing the goal in football. Your team looks annoyed. ⚽',
        choices: [
          { label: 'Ask a teammate for one tip and try again', meters: [['mood', 25], ['energy', 10]], reflect: 'Resilience! Missing is information, not identity. One tip plus one retry is how skills grow.', profile: 'Risk-taker' },
          { label: 'Say you are useless and quit the team', meters: [['mood', -25], ['energy', -20]], reflect: 'Your score is not your worth. Every striker you admire has missed a hundred goals.' },
          { label: 'Blame the windy day out loud', meters: [['mood', -5], ['calm', -10]], reflect: 'Wind happens! But blaming hands your power away — trying one more time keeps it yours.' },
        ],
      },
    ],
  },
  vocab: {
    resilient: 'Bouncing back after something hard.',
    'self-regulation': 'Noticing your feelings and steering them yourself.',
  },
};

/* ================================= HISTORY ================================= */

M['History|Ancient Egypt'] = {
  emoji: '🐫',
  coverArt: ['🏜️', '🐫🏺'],
  artPalette: ['#FFB347', '#FFE156', '#B388FF', '#4ECDC4'],
  question: 'What was life like on the Nile five thousand years ago?',
  centralIdea: 'Ancient Egyptians built a brilliant civilization along the Nile — its clues still amaze us today.',
  sequence: {
    mode: 'linear',
    explorePrompt: 'Tap each moment in Egypt’s long story.',
    cards: [
      { label: 'Villages farm beside the Nile', emoji: '🌾', why: 'Yearly floods left rich black soil for farming.', clue: 'Every civilization starts with food.' },
      { label: 'Pharaohs unite the two lands', emoji: '👑', why: 'One ruler governed Upper and Lower Egypt.', clue: 'Who wore the double crown?' },
      { label: 'The Great Pyramid rises at Giza', emoji: '🔺', why: 'Thousands of workers raised it stone by stone — still standing today!', clue: 'The most famous building of the ancient world.' },
      { label: 'Hieroglyphs record everything', emoji: '𓂀', why: 'Scribes wrote laws, prayers and shopping lists in picture-words.', clue: 'Their writing looks like tiny pictures.' },
      { label: 'Tomb of Tutankhamun found — 1922', emoji: '🏺', why: 'Howard Carter opened a tomb packed with treasure — 3,000 years later!', clue: 'The discovery that amazed the modern world.' },
    ],
    celebrate: 'Five thousand years, in order!',
  },
  sorter: {
    explorePrompt: 'Tap a card: was it part of ancient Egypt, or is it from today?',
    bins: [
      { id: 'ancient', label: 'Ancient Egypt', emoji: '𓂀' },
      { id: 'today', label: 'Today', emoji: '🏙️' },
    ],
    items: [
      { label: 'Papyrus boats', emoji: '⛵', bin: 'ancient', why: 'Egyptians sailed the Nile in bundled reed boats.' },
      { label: 'Smartphones', emoji: '📱', bin: 'today', why: 'Electric inventions belong to our century.' },
      { label: 'Pyramids at Giza', emoji: '🔺', bin: 'ancient', why: 'Built about 4,500 years ago — and still standing.' },
      { label: 'Trains', emoji: '🚂', bin: 'today', why: 'Steam and steel rails came long after the pharaohs.' },
      { label: 'Hieroglyphic writing', emoji: '𓅓', bin: 'ancient', why: 'Picture-words carved on tombs and temples.' },
      { label: 'Printed books', emoji: '📚', bin: 'today', why: 'Printing presses arrived thousands of years later.' },
      { label: 'Mummified cats', emoji: '🐈', bin: 'ancient', why: 'Cats were sacred — some were mummified too!' },
      { label: 'Video calls', emoji: '💻', bin: 'today', why: 'A camera on the Nile and one in Cairo’s museum — very modern.' },
    ],
    celebrate: 'Then and now, perfectly sorted!',
  },
  vocab: {
    pharaoh: 'The ruler of ancient Egypt, seen as a living god.',
    papyrus: 'A paper-like sheet made from river reeds.',
    hieroglyph: 'A picture used as a letter or word in Egyptian writing.',
    tomb: 'A stone room built to hold the dead and their treasures.',
  },
};

M['Mathematics|Probability'] = {
  emoji: '🎡',
  coverArt: ['🎡', '🎯🎲'],
  artPalette: ['#FF6584', '#4ECDC4', '#FFE156', '#B388FF'],
  question: 'Which color is the spinner most likely to land on?',
  centralIdea: 'Chance can be compared: the bigger the slice, the more likely the landing.',
  scene: {
    id: 'spinner',
    explorePrompt: 'Give red and blue different slices, then spin and watch.',
    cases: [
      {
        prompt: 'Make blue twice as likely as red: blue 4 slices, red 2.',
        targets: { red: 2, blue: 4 },
        nudge: 'Twice as likely means twice the slices.',
        support: 'Set red to 2 and blue to 4.',
        why: '4 blue slices out of 6 vs 2 red: blue wins twice as often. Bigger slice = more likely.',
      },
      {
        prompt: 'Make red and blue equally likely.',
        targets: { red: 3, blue: 3 },
        nudge: 'Equal chance = equal slices.',
        support: 'Match the two dials.',
        why: '3 slices each out of 6 — a fair 50/50 spinner. Equal shares = equal chance.',
      },
      {
        prompt: 'Make it impossible for blue to win.',
        targets: { blue: 0 },
        nudge: 'Impossible means zero slices.',
        support: 'Slide blue all the way down.',
        why: 'Zero slices = impossible. Now every spin lands red — that is certain!',
      },
    ],
  },
  vocab: {
    likely: 'Has a good chance of happening.',
    impossible: 'Cannot happen at all — zero chance.',
    'certain': 'Will definitely happen.',
    'fair': 'Everyone has the same chance.',
  },
};

M['History|Modern History'] = {
  emoji: '📷',
  coverArt: ['📷', '🚀🌐'],
  artPalette: ['#38B6FF', '#FFE156', '#FF6584', '#86EFAC'],
  question: 'How did the last hundred years change everyday life?',
  centralIdea: 'Inventions of the last century — flight, space, the internet — rewired how people live and connect.',
  sequence: {
    mode: 'linear',
    explorePrompt: 'Tap each milestone of the last hundred years.',
    cards: [
      { label: 'First powered flight — 1903', emoji: '✈️', why: 'The Wright brothers fly for 12 seconds — the start of aviation.', clue: 'A 12-second hop that changed travel.' },
      { label: 'Moon landing — 1969', emoji: '🌕', why: 'Apollo 11 lands people on the Moon and brings them home.', clue: 'One small step…' },
      { label: 'World Wide Web — 1991', emoji: '🌐', why: 'The web connects documents — and then everyone.', clue: 'The invention you are using now.' },
      { label: 'Smartphones everywhere — 2007', emoji: '📱', why: 'A phone, camera, map and computer in every pocket.', clue: 'The computer that became a companion.' },
    ],
    celebrate: 'A century of inventions, in order!',
  },
  vocab: {
    milestone: 'A big marker moment in history.',
    invention: 'A new thing someone creates.',
  },
};

/* ================= DRAFT-COURSE DOMAINS (primary combos without a curated
   cluster in the taxonomy; framing is auto-derived and labeled as draft) ================= */

M['Science|Insects & Minibeasts'] = {
  emoji: '🐝',
  coverArt: ['🐝', '🐞🦋'],
  artPalette: ['#FFE156', '#86EFAC', '#FFB347', '#4ECDC4'],
  question: 'Who is buzzing, crawling and hiding in the garden?',
  centralIdea: 'Minibeasts are tiny engineers whose bodies and jobs help gardens grow.',
  sorter: {
    explorePrompt: 'Tap a minibeast to hear its superpower, then sort it.',
    bins: [
      { id: 'flier', label: 'Flies & hovers', emoji: '🦋' },
      { id: 'crawler', label: 'Crawls & wriggles', emoji: '🐛' },
      { id: 'hopper', label: 'Jumps & hops', emoji: '🦗' },
    ],
    items: [
      { label: 'Bee', emoji: '🐝', bin: 'flier', why: 'Two wings buzzing 200 times a second — a flying engineer.' },
      { label: 'Butterfly', emoji: '🦋', bin: 'flier', why: 'Wide gliding wings carry it flower to flower.' },
      { label: 'Dragonfly', emoji: '🪰', bin: 'flier', why: 'Four wings let it hover and zip backwards!' },
      { label: 'Worm', emoji: '🪱', bin: 'crawler', why: 'No legs at all — muscles squeeze it through the soil.' },
      { label: 'Snail', emoji: '🐌', bin: 'crawler', why: 'One slimy foot glides along a trail.' },
      { label: 'Centipede', emoji: '🐛', bin: 'crawler', why: 'Lots of legs ripple like waves under it.' },
      { label: 'Grasshopper', emoji: '🦗', bin: 'hopper', why: 'Back legs like springs launch it 20 times its length.' },
      { label: 'Flea', emoji: '🪲', bin: 'hopper', why: 'The best jumper on Earth for its size!' },
    ],
    celebrate: 'You classified the garden crew!',
  },
  vocab: {
    minibeast: 'A tiny animal you can hold gently — insect, worm or snail.',
    habitat: 'The natural home of a living thing.',
  },
};

M['Science|Polar Regions'] = {
  emoji: '🐧',
  coverArt: ['🐧', '🐻‍❄️❄️'],
  artPalette: ['#38B6FF', '#B388FF', '#4ECDC4', '#86EFAC'],
  question: 'How do animals live where the world freezes?',
  centralIdea: 'Polar survivors wear insulation, gather food cleverly, and time their lives to the ice.',
  sorter: {
    explorePrompt: 'Tap an animal to hear its ice trick, then sort it.',
    bins: [
      { id: 'arctic', label: 'Arctic (North)', emoji: '🧊' },
      { id: 'antarctic', label: 'Antarctic (South)', emoji: '🐧' },
    ],
    items: [
      { label: 'Polar bear', emoji: '🐻‍❄️', bin: 'arctic', why: 'Only the North Pole has polar bears — they hunt on sea ice.' },
      { label: 'Arctic fox', emoji: '🦊', bin: 'arctic', why: 'Its coat turns white in winter — Arctic camouflage.' },
      { label: 'Penguin', emoji: '🐧', bin: 'antarctic', why: 'Wild penguins live almost only in the Southern Hemisphere.' },
      { label: 'Weddell seal', emoji: '🦭', bin: 'antarctic', why: 'Chews breathing holes in the Antarctic ice.' },
      { label: 'Snowy owl', emoji: '🦉', bin: 'arctic', why: 'Hunts lemmings across the Arctic tundra.' },
      { label: 'Albatross', emoji: '🕊️', bin: 'antarctic', why: 'Glides around the Southern Ocean for years.' },
    ],
    celebrate: 'Poles sorted — never mix a polar bear with a penguin!',
  },
  vocab: {
    insulation: 'A layer that keeps heat in, like blubber or thick fur.',
    blubber: 'The thick fat under sea animals’ skin that works like a duvet.',
    camouflage: 'Colors that help an animal hide.',
  },
};

M['Science|Rainforests'] = {
  emoji: '🌴',
  coverArt: ['🌴', '🦜🐒'],
  artPalette: ['#86EFAC', '#FFB347', '#4ECDC4', '#B388FF'],
  question: 'Why is the rainforest a tower full of life?',
  centralIdea: 'Rainforest life stacks into layers, and each layer is a different neighborhood.',
  sorter: {
    explorePrompt: 'Tap an animal to hear which floor it lives on.',
    bins: [
      { id: 'floor', label: 'Forest floor (dark)', emoji: '🪵' },
      { id: 'under', label: 'Understory (shady)', emoji: '🌿' },
      { id: 'canopy', label: 'Canopy (sunny roof)', emoji: '🌳' },
    ],
    items: [
      { label: 'Jaguar', emoji: '🐆', bin: 'floor', why: 'Prowls the dark floor, hunting by stealth.' },
      { label: 'Leafcutter ant', emoji: '🐜', bin: 'floor', why: 'Carries leaf bits along the ground highways.' },
      { label: 'Tree frog', emoji: '🐸', bin: 'under', why: 'Clings to young trees in the dim middle floor.' },
      { label: 'Jaguarundi', emoji: '🐈', bin: 'under', why: 'Slips through bushes halfway up.' },
      { label: 'Toucan', emoji: '🦜', bin: 'canopy', why: 'Hops along the sunny roof, grabbing fruit.' },
      { label: 'Sloth', emoji: '🦥', bin: 'canopy', why: 'Hangs upside-down in the treetop crowns.' },
      { label: 'Howler monkey', emoji: '🐒', bin: 'canopy', why: 'Swings branch to branch and howls at dawn.' },
    ],
    celebrate: 'Every animal home on the right floor!',
  },
  vocab: {
    canopy: 'The leafy roof of the rainforest.',
    understory: 'The dim middle floor under the canopy.',
    humid: 'Air full of water vapor — sticky and warm.',
  },
};

M['Science|Design & Technology'] = {
  emoji: '🔧',
  coverArt: ['🔧', '🏗️💡'],
  artPalette: ['#FFB347', '#4ECDC4', '#B388FF', '#FFE156'],
  question: 'How do inventors turn an idea into a working thing?',
  centralIdea: 'Designing means planning, making, testing — and improving after every test.',
  sequence: {
    mode: 'linear',
    explorePrompt: 'Tap each step of the design cycle.',
    cards: [
      { label: 'Find a problem or wish', emoji: '🔎', why: 'Designers start with a need.', clue: 'Every invention begins here.' },
      { label: 'Plan and sketch', emoji: '✏️', why: 'Draw ideas and pick materials before building.', clue: 'Paper comes before glue.' },
      { label: 'Make a prototype', emoji: '🛠️', why: 'Build a first try — it does not need to be perfect.', clue: 'The first version.' },
      { label: 'Test it', emoji: '🧪', why: 'Try it out and watch what breaks.', clue: 'Time to be honest!' },
      { label: 'Improve and share', emoji: '🌟', why: 'Fix what failed, then show it off.', clue: 'The cycle that never ends.' },
    ],
    celebrate: 'The design cycle complete — inventors do this loop forever!',
  },
  vocab: {
    prototype: 'A first working try at a design.',
    test: 'Try something to see if it works.',
    improve: 'Make it better from what you learned.',
  },
};

M['History|Ancient Greece & Rome'] = {
  emoji: '🏛️',
  coverArt: ['🏛️', '🏺⚔️'],
  artPalette: ['#B388FF', '#FFE156', '#4ECDC4', '#FF6584'],
  question: 'What did the Greeks and Romans leave behind that we still use?',
  centralIdea: 'Ancient Greece and Rome built ideas — democracy, roads, theatres, Olympics — that shape our world today.',
  sequence: {
    mode: 'linear',
    explorePrompt: 'Tap each moment in the Greek and Roman story.',
    cards: [
      { label: 'Greek city-states flourish', emoji: '🏺', why: 'Athens and Sparta build art, philosophy and new ideas.', clue: 'Where democracy was born.' },
      { label: 'The first Olympic games', emoji: '🏃', why: 'Greek athletes race at Olympia — every four years.', clue: 'Still played today!' },
      { label: 'Rome grows into an empire', emoji: '🦅', why: 'Rome conquers the Mediterranean and builds roads.', clue: 'All roads lead there.' },
      { label: 'Roman baths and theatres', emoji: '🛁', why: 'Romans build public baths, theatres and aqueducts.', clue: 'Engineering for everyday life.' },
      { label: 'Their ideas reach us today', emoji: '🏛️', why: 'Parliaments, stadiums and cement carry their story on.', clue: 'Look at your city — the clues are there.' },
    ],
    celebrate: 'Two thousand years of ideas, in order!',
  },
  sorter: {
    explorePrompt: 'Tap a card: Greek or Roman innovation — or is it from today?',
    bins: [
      { id: 'ancient', label: 'Ancient Greece & Rome', emoji: '🏛️' },
      { id: 'today', label: 'Today', emoji: '🏙️' },
    ],
    items: [
      { label: 'Democracy votes', emoji: '🗳️', bin: 'ancient', why: 'Athens invented citizen voting — a Greek idea we still use.' },
      { label: 'Concrete buildings', emoji: '🏗️', bin: 'ancient', why: 'Romans pioneered concrete — the Pantheon still stands.' },
      { label: 'Olympic games', emoji: '🏃', bin: 'ancient', why: 'Started at Olympia in ancient Greece.' },
      { label: 'Electric trains', emoji: '🚄', bin: 'today', why: 'Electricity came millennia later.' },
      { label: 'Aquareducts → water pipes', emoji: '🚰', bin: 'ancient', why: 'Roman aqueducts carried water for miles — the ancestor of your tap.' },
      { label: 'The internet', emoji: '🌐', bin: 'today', why: 'A modern network the ancients never imagined.' },
    ],
    celebrate: 'Ancient ideas and modern ones — sorted!',
  },
  vocab: {
    democracy: 'Rule by the people, through voting.',
    empire: 'Many lands ruled by one power.',
    aqueduct: 'A Roman channel carrying fresh water.',
  },
};

M['History|Medieval Times'] = {
  emoji: '🏰',
  coverArt: ['🏰', '🐉🛡️'],
  artPalette: ['#B388FF', '#FF6584', '#FFE156', '#4ECDC4'],
  question: 'What was life like inside a castle kingdom?',
  centralIdea: 'Medieval society worked as a pyramid of roles — rulers, defenders, farmers and craftspeople.',
  sorter: {
    explorePrompt: 'Tap a person to hear their medieval job.',
    bins: [
      { id: 'rule', label: 'Rules & defends', emoji: '👑' },
      { id: 'work', label: 'Feeds & makes', emoji: '🌾' },
      { id: 'pray', label: 'Reads & teaches', emoji: '📖' },
    ],
    items: [
      { label: 'King or Queen', emoji: '👑', bin: 'rule', why: 'Owned the land and made the laws.' },
      { label: 'Knight', emoji: '🛡️', bin: 'rule', why: 'Fought in armor and swore loyalty to the lord.' },
      { label: 'Farmer (serf)', emoji: '🌾', bin: 'work', why: 'Grew everyone’s food in exchange for a place to live.' },
      { label: 'Blacksmith', emoji: '🔨', bin: 'work', why: 'Forged horseshoes, tools and swords.' },
      { label: 'Monk', emoji: '📖', bin: 'pray', why: 'Copied books by hand — the libraries of the age.' },
      { label: 'Castle builder', emoji: '🏰', bin: 'work', why: 'Master mason raising stone walls tower by tower.' },
    ],
    celebrate: 'The whole medieval village, filed by role!',
  },
  vocab: {
    knight: 'An armored warrior sworn to a lord.',
    kingdom: 'Land ruled by a king or queen.',
    guild: 'A club of craftspeople who set the rules of a trade.',
  },
};

M['History|Family & Community History'] = {
  emoji: '🧓',
  coverArt: ['🧓', '👨‍👩‍👧📜'],
  artPalette: ['#FFE156', '#FF6584', '#4ECDC4', '#B388FF'],
  question: 'What was the world like when your grandparents were kids?',
  centralIdea: 'Families and neighborhoods change over time — memories and objects are clues to the past.',
  sequence: {
    mode: 'linear',
    explorePrompt: 'Tap each generation to travel back in time.',
    cards: [
      { label: 'You — today', emoji: '🧒', why: 'Tablets, video calls and electric scooters.', clue: 'The newest generation.' },
      { label: 'Your parents — 1990s', emoji: '👩', why: 'First home computers, cassettes → CDs.', clue: 'Dial-up internet days.' },
      { label: 'Grandparents — 1960s', emoji: '👵', why: 'Black-and-white TV, rotary phones.', clue: 'One family phone for everyone.' },
      { label: 'Great-grandparents — 1930s', emoji: '👴', why: 'Radio shows, letters, hand-me-downs.', clue: 'Before TV existed at home.' },
    ],
    celebrate: 'Four generations — the world keeps changing!',
  },
  vocab: {
    generation: 'One step in a family timeline.',
    artifact: 'An object made by people that tells us about the past.',
  },
};

M['Computing|Algorithms & Programming'] = {
  emoji: '🤖',
  coverArt: ['🤖', '⬆️➡️⬇️'],
  artPalette: ['#4ECDC4', '#FFE156', '#FF6584', '#B388FF'],
  question: 'Can you make a machine follow your exact instructions?',
  centralIdea: 'Computers do EXACTLY what you say — algorithms must be in the right order with nothing missing.',
  sequence: {
    mode: 'linear',
    explorePrompt: 'Tap each step to build a jam-sandwich algorithm.',
    cards: [
      { label: 'Take two slices of bread', emoji: '🍞', why: 'The algorithm needs its starting materials.', clue: 'Everything starts with ingredients.' },
      { label: 'Spread jam on one slice', emoji: '🫙', why: 'One exact instruction — the robot does not guess.', clue: 'Do this before joining the slices.' },
      { label: 'Put the slices together', emoji: '🥪', why: 'Order matters! Jam first, then join.', clue: 'What happens if this comes first?' },
      { label: 'Cut and serve', emoji: '🔪', why: 'The final step completes the algorithm.', clue: 'The finish line.' },
    ],
    celebrate: 'A working sandwich algorithm — debug the order, don’t guess!',
  },
  vocab: {
    algorithm: 'A precise list of steps in order.',
    bug: 'A mistake in a program that makes it do the wrong thing.',
    'debug': 'Find the bug and fix it.',
    'exact': 'Exactly right — a computer cannot guess what you meant.',
  },
};

M['Computing|Privacy & Security'] = {
  emoji: '🔐',
  coverArt: ['🔐', '🕵️💻'],
  artPalette: ['#38B6FF', '#B388FF', '#86EFAC', '#FF6584'],
  question: 'What is safe to share — and with whom?',
  centralIdea: 'Personal information is valuable: we protect it by choosing carefully what we share.',
  decision: {
    meters: [
      { id: 'safety', label: 'Safety', emoji: '🛡️', start: 55 },
      { id: 'trust', label: 'Trust', emoji: '🤝', start: 55 },
      { id: 'mood', label: 'Fun', emoji: '😊', start: 60 },
    ],
    scenes: [
      {
        text: 'A game asks for your real name, school and photo to “make your profile cool”. 🎮',
        choices: [
          { label: 'Use a nickname only — no school, no photo', meters: [['safety', 25], ['mood', 5]], reflect: 'Principled player! A nickname keeps the fun while protecting your real identity.', profile: 'Principled' },
          { label: 'Fill it all in — the game looks better', meters: [['safety', -30]], reflect: 'Strangers could learn exactly where you are every school day.' },
          { label: 'Quit the game entirely forever', meters: [['mood', -15], ['safety', 10]], reflect: 'Safe but sad — there is a middle path: share nothing personal and play on.' },
        ],
      },
      {
        text: 'Your friend texts you their password “so you can help me level up”. 🔑',
        choices: [
          { label: 'Say no kindly and keep both passwords private', meters: [['safety', 25], ['trust', 10]], reflect: 'Even best friends keep passwords private — that is what keeps BOTH accounts safe.', profile: 'Caring' },
          { label: 'Take it and log in as them', meters: [['safety', -25], ['trust', -15]], reflect: 'Using someone’s account can look like pretending to be them — even with permission.' },
        ],
      },
    ],
  },
  vocab: {
    'personal information': 'Facts about YOU — name, address, school, photos.',
    password: 'A secret word that protects your account.',
  },
};

M['Life Skills|Money & Finance'] = {
  emoji: '🪙',
  coverArt: ['🪙', '🧾💰'],
  artPalette: ['#FFE156', '#86EFAC', '#FFB347', '#4ECDC4'],
  question: 'Save it, spend it, or share it — what makes a coin count?',
  centralIdea: 'Money is limited, so every choice is a trade-off: needs first, then wants.',
  decision: {
    meters: [
      { id: 'savings', label: 'Savings', emoji: '🏦', start: 40 },
      { id: 'needs', label: 'Needs met', emoji: '🍎', start: 55 },
      { id: 'mood', label: 'Happiness', emoji: '😊', start: 55 },
    ],
    scenes: [
      {
        text: 'You have 10 coins. Your pencil case broke, and the toy shop has a new blind box. 🧸',
        choices: [
          { label: 'Replace the pencil case (6), save 4', meters: [['needs', 25], ['savings', 10]], reflect: 'Needs first, savings second — and the blind box can wait for next week’s coins.', profile: 'Principled' },
          { label: 'Buy two blind boxes (8)', meters: [['needs', -20], ['mood', 15], ['savings', -15]], reflect: 'The boxes spark joy — but a broken pencil case makes school harder all week.' },
          { label: 'Save all 10 and use a plastic bag', meters: [['savings', 25], ['mood', -10]], reflect: 'Super saving! Though a working pencil case is a fair need — balance is allowed.' },
        ],
      },
      {
        text: 'Fundraising week: your class collects for the animal shelter. 🐶',
        choices: [
          { label: 'Give 2 of your 10 coins', meters: [['mood', 20], ['savings', -5]], reflect: 'Sharing is part of money wisdom — giving does not need to be everything.', profile: 'Caring' },
          { label: 'Keep everything — it’s your money', meters: [['mood', -10], ['needs', 0]], reflect: 'Your coins, your choice — but communities run on many small gifts.' },
        ],
      },
    ],
  },
  vocab: {
    'trade-off': 'Choosing one thing means giving up another.',
    'need': 'Something you must have to live and learn.',
    'want': 'Something nice to have — but you can wait.',
  },
};

M['Life Skills|Entrepreneurship'] = {
  emoji: '🏪',
  coverArt: ['🏪', '💡🧾'],
  artPalette: ['#FFB347', '#4ECDC4', '#FFE156', '#86EFAC'],
  question: 'What does it take to run your own little stall?',
  centralIdea: 'Entrepreneurs spot what people need, make a plan, and learn from every customer.',
  decision: {
    meters: [
      { id: 'customers', label: 'Customers', emoji: '🧑‍🤝‍🧑', start: 40 },
      { id: 'stock', label: 'Stock', emoji: '📦', start: 55 },
      { id: 'mood', label: 'Team spirit', emoji: '😊', start: 60 },
    ],
    scenes: [
      {
        text: 'Stall day: lemonade (30¢ a cup) or bookmarks (20¢)? It is 35°C and the sports fair is next door. ☀️',
        choices: [
          { label: 'Lemonade — thirsty athletes incoming!', meters: [['customers', 25], ['stock', 5]], reflect: 'You read your customers: a hot sports fair buys cold drinks. Entrepreneurship = noticing.', profile: 'Thinker' },
          { label: 'Bookmarks — they never melt', meters: [['customers', -15], ['mood', 10]], reflect: 'A fair thought, but nobody is sweaty for a bookmark today. Location and weather matter!' },
        ],
      },
      {
        text: 'You sold out in one hour! Reinvest or pocket everything? 💰',
        choices: [
          { label: 'Buy more lemons and cups for tomorrow', meters: [['stock', 25], ['customers', 10]], reflect: 'Reinvesting keeps the stall alive — that is how small businesses grow.', profile: 'Balanced' },
          { label: 'Pocket it all — the stall is done', meters: [['stock', -20], ['mood', 5]], reflect: 'Profit in hand feels great, but tomorrow’s customers will find an empty table.' },
        ],
      },
    ],
  },
  vocab: {
    customer: 'A person who buys what you offer.',
    reinvest: 'Use your profit to make more product.',
    'profit': 'What is left after paying your costs.',
  },
};

M['Life Skills|Food & Cooking'] = {
  emoji: '🍳',
  coverArt: ['🍳', '🥗🥣'],
  artPalette: ['#FF6584', '#FFE156', '#86EFAC', '#FFB347'],
  question: 'How does a recipe turn ingredients into a meal?',
  centralIdea: 'Cooking follows an algorithm too: read the steps, prepare in order, taste and adjust.',
  sequence: {
    mode: 'linear',
    explorePrompt: 'Tap each step of a simple fruit salad recipe.',
    cards: [
      { label: 'Wash hands and fruit', emoji: '🧼', why: 'Clean hands and fruit keep germs out of the bowl.', clue: 'Every cook starts here.' },
      { label: 'Gather tools and bowl', emoji: '🥣', why: 'Everything in place before you start.', clue: 'Chefs call this mise en place.' },
      { label: 'Peel and chop (with help)', emoji: '🔪', why: 'Sharp tools need a grown-up partner.', clue: 'Slow fingers, safe kitchen.' },
      { label: 'Mix and add squeeze of lemon', emoji: '🍋', why: 'Lemon stops fruit going brown and adds zing.', clue: 'The flavor step.' },
      { label: 'Taste and share', emoji: '😋', why: 'Tasting is testing — adjust, then serve!', clue: 'The best step of all.' },
    ],
    celebrate: 'Recipe algorithm complete — kitchen ready!',
  },
  vocab: {
    recipe: 'The algorithm of cooking — steps in order.',
    ingredient: 'One food item in a recipe.',
    hygiene: 'Keeping clean so food stays safe.',
  },
};

M['Geography|Maps & Spatial Skills'] = {
  emoji: '🗺️',
  coverArt: ['🗺️', '🧭📍'],
  artPalette: ['#FFE156', '#4ECDC4', '#FFB347', '#B388FF'],
  question: 'How does a flat map describe a whole world?',
  centralIdea: 'Maps use symbols, a compass and scale to shrink the world onto paper.',
  sorter: {
    explorePrompt: 'Tap a map feature to hear what it means, then sort it.',
    bins: [
      { id: 'symbol', label: 'Map symbols', emoji: '📍' },
      { id: 'tool', label: 'Map tools', emoji: '🧭' },
    ],
    items: [
      { label: 'Compass rose', emoji: '🧭', bin: 'tool', why: 'Shows north, south, east and west on the map.' },
      { label: 'Key / legend', emoji: '🔑', bin: 'tool', why: 'Explains what every symbol means.' },
      { label: 'Scale bar', emoji: '📏', bin: 'tool', why: 'Tells you real distances from map distances.' },
      { label: 'Blue wavy line', emoji: '🌊', bin: 'symbol', why: 'On most maps, blue waves mean a river or sea.' },
      { label: 'Triangle mark', emoji: '⛰️', bin: 'symbol', why: 'A peak or mountain top.' },
      { label: 'Dotted red line', emoji: '🛣️', bin: 'symbol', why: 'Often a road or route between places.' },
    ],
    celebrate: 'You speak the language of maps!',
  },
  vocab: {
    symbol: 'A small picture standing for something real.',
    compass: 'A tool whose needle points north.',
    scale: 'How map distance matches real distance.',
  },
};

M['Geography|Places & Environments'] = {
  emoji: '🌍',
  coverArt: ['🌍', '🏙️🌲'],
  artPalette: ['#4ECDC4', '#86EFAC', '#FFE156', '#B388FF'],
  question: 'What makes a place a city, a farm, or a wild park?',
  centralIdea: 'Places are shaped by nature and by people — and people are responsible for them.',
  sorter: {
    explorePrompt: 'Tap a feature: did nature make it, or did people build it?',
    bins: [
      { id: 'natural', label: 'Made by nature', emoji: '🌿' },
      { id: 'built', label: 'Built by people', emoji: '🏗️' },
    ],
    items: [
      { label: 'River', emoji: '🏞️', bin: 'natural', why: 'Flowing water carves rivers over centuries.' },
      { label: 'Bridge', emoji: '🌉', bin: 'built', why: 'Engineers design and build bridges to cross the river.' },
      { label: 'Mountain', emoji: '⛰️', bin: 'natural', why: 'Earth’s plates pushed it up over millions of years.' },
      { label: 'Skyscraper', emoji: '🏢', bin: 'built', why: 'People planned, dug and stacked every floor.' },
      { label: 'Forest', emoji: '🌲', bin: 'natural', why: 'Seeds, rain and time grow forests.' },
      { label: 'Farm field', emoji: '🚜', bin: 'built', why: 'People cleared, plowed and planted it — shaped by humans.' },
    ],
    celebrate: 'Nature and people — the two makers of place!',
  },
  vocab: {
    environment: 'Everything around a place — land, water, air and life.',
    landmark: 'A famous feature of a place.',
  },
};

M['History|Historical Thinking'] = {
  emoji: '🕵️',
  coverArt: ['🕵️', '📜🔍'],
  artPalette: ['#B388FF', '#FFE156', '#FF6584', '#4ECDC4'],
  question: 'How do we know what happened long ago?',
  centralIdea: 'Historians ask questions of sources — comparing clues, asking whose story is missing.',
  
  sequence: {
    mode: 'linear',
    explorePrompt: 'Tap each step — how do history detectives work?',
    cards: [
      { label: 'Find a clue from the past', emoji: '🔍', why: 'A photo, a coin, a letter, a building — clues are everywhere.', clue: 'Every case starts with…' },
      { label: 'Ask: who made this?', emoji: '🧑', why: 'Every clue has a maker — knowing who helps you trust it.', clue: 'Sources have authors.' },
      { label: 'Compare with another clue', emoji: '⚖️', why: 'Two clues that agree are stronger; two that disagree are interesting!', clue: 'One clue is never enough.' },
      { label: 'Imagine their time', emoji: '⏳', why: 'People long ago thought differently — don’t judge with today’s eyes only.', clue: 'Step into their shoes.' },
      { label: 'Tell the story with evidence', emoji: '📖', why: 'Good history says “the clues show…”, not “I think maybe”.', clue: 'Share what you found.' },
    ],
    celebrate: 'You think like a history detective!',
  },
  vocab: {
    source: 'Something made in the past that gives us clues.',
    clue: 'A detail that helps answer a history question.',
    'long ago': 'Before anyone alive today was born.',
  },
};

M['Computing|Artificial Intelligence'] = {
  emoji: '🧠',
  coverArt: ['🤖', '🧠✨'],
  artPalette: ['#B388FF', '#38B6FF', '#FFE156', '#4ECDC4'],
  question: 'Can a computer learn — and how is that like you?',
  centralIdea: 'AI learns patterns from examples people give it — it is smart in some ways and limited in others.',
  
  decision: {
    meters: [
      { id: 'smart', label: 'Smart choices', emoji: '🧠', start: 50 },
      { id: 'safe', label: 'Safe & kind', emoji: '🛡️', start: 55 },
      { id: 'mood', label: 'Fun', emoji: '😊', start: 60 },
    ],
    scenes: [
      {
        text: 'A drawing app offers “AI finish my picture”. 🎨',
        choices: [
          { label: 'Try it, then draw the next part MYSELF', meters: [['smart', 20], ['mood', 10]], reflect: 'Best of both: AI helps, your hands keep practicing the skill.', profile: 'Balanced' },
          { label: 'Let AI draw everything from now on', meters: [['smart', -15]], reflect: 'Then whose art is it? Skills grow by drawing, not by watching.' },
          { label: 'Never touch the AI button', meters: [['mood', -5]], reflect: 'Trying new tools is good — just keep making your own art too.' },
        ],
      },
      {
        text: 'The video app keeps showing dinosaur videos because you watched one. 🦖',
        choices: [
          { label: 'Search something new — show the app other interests', meters: [['smart', 25], ['mood', 5]], reflect: 'You are the boss of the feed! Apps learn from what you choose.', profile: 'Thinker' },
          { label: 'Watch dino videos forever', meters: [['mood', 5], ['smart', -10]], reflect: 'Fun for a while — but the app narrows your world to one thing.' },
        ],
      },
      {
        text: 'A robot quiz says “You will be a pilot!” Is it magic? 🤖',
        choices: [
          { label: 'No — it guessed from my answers', meters: [['smart', 25]], reflect: 'Right! AI spots patterns in answers — it predicts, it does not know you.', profile: 'Knowledgeable' },
          { label: 'Yes, it knows my future', meters: [['smart', -15]], reflect: 'AI is pattern-guessing, not fortune-telling. You write your future.' },
        ],
      },
    ],
  },
  vocab: {
    AI: 'Computer programs that learn patterns from examples.',
    data: 'The examples a program learns from.',
    pattern: 'Something that repeats and can be learned.',
  },
};

M['Computing|Digital Systems'] = {
  emoji: '🖲️',
  coverArt: ['🖲️', '⌨️🖱️'],
  artPalette: ['#4ECDC4', '#38B6FF', '#FFE156', '#FF6584'],
  question: 'What is inside the machines that follow our instructions?',
  centralIdea: 'Digital systems take inputs, follow programs, and give outputs.',
  
  sorter: {
    explorePrompt: 'Tap a part to hear its job, then sort it.',
    bins: [
      { id: 'in', label: 'Puts IN (input)', emoji: '⌨️' },
      { id: 'out', label: 'Shows OUT (output)', emoji: '🖥️' },
    ],
    items: [
      { label: 'Keyboard', emoji: '⌨️', bin: 'in', why: 'Keys put your letters IN — keyboard is an input.' },
      { label: 'Mouse', emoji: '🖱️', bin: 'in', why: 'Clicks go IN — mouse is an input.' },
      { label: 'Camera', emoji: '📷', bin: 'in', why: 'The camera takes pictures IN.' },
      { label: 'Microphone', emoji: '🎤', bin: 'in', why: 'Your voice goes IN through the microphone.' },
      { label: 'Screen', emoji: '🖥️', bin: 'out', why: 'The screen shows things OUT to you.' },
      { label: 'Speaker', emoji: '🔊', bin: 'out', why: 'The speaker sends sound OUT.' },
      { label: 'Printer', emoji: '🖨️', bin: 'out', why: 'The printer puts your work OUT on paper.' },
      { label: 'Touch screen', emoji: '📱', bin: 'in', why: 'Tricky! A touch screen does both — but your taps are the IN part.' },
    ],
    celebrate: 'Input in, output out — you know how computers work!',
  },
  vocab: {
    input: 'What you put IN — tap, key, click, voice.',
    output: 'What comes OUT — screen, sound, movement.',
    program: 'The instructions a digital system follows.',
  },
};

M['Computing|Data Representation'] = {
  emoji: '🔍',
  coverArt: ['🔍', '01💻'],
  artPalette: ['#38B6FF', '#B388FF', '#86EFAC', '#FFE156'],
  question: 'How can pictures, words and sounds become 1s and 0s?',
  centralIdea: 'Computers store everything as patterns of two symbols — on and off.',
  
  memory: {
    explorePrompt: 'Flip two cards. Match each symbol to what it means!',
    celebrate: 'You read the secret symbol language!',
    pairs: [
      { a: { label: '☀️', emoji: '☀️' }, b: { label: 'sunny day', emoji: '🌞' }, why: 'The sun symbol MEANS sunny — symbols carry meaning.' },
      { a: { label: '❤️', emoji: '❤️' }, b: { label: 'love', emoji: '🤗' }, why: 'One small heart stands for a big feeling.' },
      { a: { label: '🚦 red light', emoji: '🚦' }, b: { label: 'STOP', emoji: '✋' }, why: 'Colors can be instructions — red means stop.' },
      { a: { label: '||||  (tally)', emoji: '🧮' }, b: { label: 'the number 4', emoji: '4️⃣' }, why: 'Tally marks are a counting code — four sticks, four things.' },
      { a: { label: '🎵', emoji: '🎵' }, b: { label: 'music', emoji: '🎻' }, why: 'Symbols work for sounds and ideas too.' },
      { a: { label: '≠', emoji: '⚠️' }, b: { label: 'not equal', emoji: '🙅' }, why: 'Even math has symbol words — this one says “not equal”.' },
    ],
  },
  vocab: {
    'data': 'Information stored by a computer.',
    binary: 'A code with only two symbols: 0 and 1.',
  },
};

M['Computing|Designing Digital Solutions'] = {
  emoji: '🧩',
  coverArt: ['🧩', '💻🌟'],
  artPalette: ['#4ECDC4', '#B388FF', '#FFE156', '#FF6584'],
  question: 'How do you design something digital that truly helps people?',
  centralIdea: 'Good digital design starts with the user’s need, tests early, and improves.',
  
  sequence: {
    mode: 'linear',
    explorePrompt: 'Tap each step of making an app.',
    cards: [
      { label: 'Find the problem', emoji: '🔎', why: 'Who needs help, and with what?', clue: 'Every invention starts here.' },
      { label: 'Sketch the screens', emoji: '✏️', why: 'Draw what each screen will look like.', clue: 'Paper before pixels.' },
      { label: 'Build version 1', emoji: '🛠️', why: 'Make a first working try.', clue: 'It does not need to be perfect.' },
      { label: 'Test with a friend', emoji: '🧪', why: 'Watch a real person use it.', clue: 'Time to be honest!' },
      { label: 'Improve and share', emoji: '🌟', why: 'Fix what confused your friend, then release it.', clue: 'The loop that never ends.' },
    ],
    celebrate: 'The design loop — inventors run it forever!',
  },
  vocab: {
    'user': 'The person who uses what you design.',
    'test': 'Watch real people try your design.',
  },
};

M['Computing|Digital Tools & Collaboration'] = {
  emoji: '🤝',
  coverArt: ['🤝', '💬🖥️'],
  artPalette: ['#86EFAC', '#38B6FF', '#FFE156', '#FF6584'],
  question: 'How do we create together when we are not in the same room?',
  centralIdea: 'Shared digital tools let teams build on each other’s ideas — with kindness and clear roles.',
  
  decision: {
    meters: [
      { id: 'team', label: 'Teamwork', emoji: '🤝', start: 50 },
      { id: 'work', label: 'Good work', emoji: '📘', start: 50 },
      { id: 'mood', label: 'Feelings', emoji: '😊', start: 60 },
    ],
    scenes: [
      {
        text: 'Shared story doc: your friend just wrote a great dragon part. 🐉',
        choices: [
          { label: 'Add a comment: “Love the dragon!”', meters: [['team', 20], ['mood', 10]], reflect: 'Kind, specific comments make shared docs feel good AND improve the work.', profile: 'Caring' },
          { label: 'Delete it — you have a better idea', meters: [['team', -20], ['work', -5]], reflect: 'Deleting a friend’s work without asking hurts both the story and the team.' },
          { label: 'Fix their spelling quietly', meters: [['work', 10], ['team', 5]], reflect: 'Helpful! Small fixes are welcome — big changes need a chat first.' },
        ],
      },
      {
        text: 'Group poster: you did the title, Mia did the art, Sam found the facts. 📋',
        choices: [
          { label: 'Put all three names on it', meters: [['team', 25], ['work', 10]], reflect: 'Credit is teamwork glue — everyone who built it gets a name.', profile: 'Principled' },
          { label: 'Only your name — it was your idea', meters: [['team', -25]], reflect: 'Ideas spark teams. Solo credit on team work breaks the team.' },
        ],
      },
    ],
  },
  vocab: {
    collaborate: 'Work together on one shared thing.',
    share: 'Give access — with the right people only.',
  },
};

M['Learning to Learn|Learning to Learn'] = {
  emoji: '🌱',
  coverArt: ['🌱', '🧠💪'],
  artPalette: ['#86EFAC', '#FFE156', '#4ECDC4', '#B388FF'],
  question: 'How does your brain get stronger when you practice?',
  centralIdea: 'Learning is a skill: attention, practice, mistakes and reflection grow your mind.',
  decision: {
    meters: [
      { id: 'brain', label: 'Brain power', emoji: '🧠', start: 45 },
      { id: 'skills', label: 'Skills', emoji: '🛠️', start: 45 },
      { id: 'mood', label: 'Mood', emoji: '😊', start: 60 },
    ],
    scenes: [
      {
        text: 'You got 6 out of 10 on the spelling test. 📝',
        choices: [
          { label: 'Find the 4 tricky words and practice just those', meters: [['brain', 25], ['skills', 20]], reflect: 'Targeted practice — your brain grows most where it almost knows.', profile: 'Thinker' },
          { label: 'Say “I’m bad at spelling” and move on', meters: [['brain', -20], ['mood', -10]], reflect: 'That story blocks practice. Brains grow with effort, not labels.' },
          { label: 'Practice all 10 words again the same way', meters: [['skills', 5], ['brain', 5]], reflect: 'Effort — yes! But aiming at the 6 you know wastes growing time.' },
        ],
      },
      {
        text: 'Piano practice: the hard bar keeps going wrong. 🎹',
        choices: [
          { label: 'Slow just that bar down, then speed up', meters: [['skills', 25], ['brain', 15]], reflect: 'Slow-first practice builds the right pattern — then speed comes free.', profile: 'Risk-taker' },
          { label: 'Play the whole song from the top each time', meters: [['skills', -5], ['mood', 5]], reflect: 'Full runs feel good but rehearse the easy parts. Fix the hard bar!' },
          { label: 'Skip to an easier song', meters: [['brain', -10]], reflect: 'Comfortable — but growth lives just past the hard bit.' },
        ],
      },
      {
        text: 'You learned to juggle 3 balls this month! 🤹',
        choices: [
          { label: 'Think: what steps got me here? Write them down', meters: [['brain', 25], ['mood', 10]], reflect: 'Reflection saves the recipe — you can reuse it for the next skill.', profile: 'Reflective' },
          { label: 'Forget how — just enjoy it', meters: [['mood', 10]], reflect: 'Enjoy it, yes! But noting HOW you learned makes the next skill faster.' },
        ],
      },
    ],
  },
  vocab: {
    practice: 'Doing it again and again to grow the skill.',
    reflect: 'Think back on what worked and what to try next.',
  },
};

M['English|English Thinking'] = {
  emoji: '💭',
  coverArt: ['📖', '🔍💡'],
  artPalette: ['#FFE156', '#FF6584', '#4ECDC4', '#B388FF'],
  question: 'What do good readers do inside their heads?',
  centralIdea: 'Good readers THINK while they read: they predict, question, picture, connect and check — on real stories, at the moment meaning goes fuzzy.',
  storybook: { books: STORYBOOKS },
  decision: {
    upperOnly: true,
    meters: [
      { id: 'edit', label: 'Editor skills', emoji: '📝', start: 50 },
      { id: 'care', label: 'Kindness', emoji: '💛', start: 60 },
      { id: 'mood', label: 'Mood', emoji: '😊', start: 60 },
    ],
    scenes: [
      {
        text: 'You are the class book editor. A friend\u2019s story says: "The dragon was big. It flew. It was scary." 😐',
        choices: [
          { label: 'Ask: which STRONG words could show big, flew, scary?', meters: [['edit', 25]], reflect: 'Word-choice coaching! "Huge wings blotted out the sun" — strong verbs and pictures beat flat words.', profile: 'Communicator' },
          { label: 'Fix it yourself with better words', meters: [['edit', 10], ['care', -10]], reflect: 'Better words, yes — but editors coach writers, they do not rewrite them.' },
          { label: 'Print it — it is fine', meters: [['edit', -15]], reflect: '"Fine" is the enemy of good writing. One question can lift the whole page.' },
        ],
      },
      {
        text: 'A review claims: "This book says turtles are the fastest animals." You read the book — it never says that. 🐢',
        choices: [
          { label: 'Flag it: claims must match the text', meters: [['edit', 25]], reflect: 'Editor-in-chief move! Readers check claims against the exact words — that is evidence discipline.', profile: 'Principled' },
          { label: 'Let it pass — close enough', meters: [['edit', -20]], reflect: '"Close enough" spreads false claims. The text is the referee.' },
          { label: 'Delete the whole review', meters: [['care', -15]], reflect: 'No need to delete — one honest correction fixes it kindly.' },
        ],
      },
    ],
  },
  homeReading: {
    early: [
      'The Very Hungry Caterpillar (Eric Carle) — practise Predict: what will he eat next?',
      'We’re Going on a Bear Hunt (Rosen & Oxenbury) — practise Picture: make the movie in your mind',
      'Brown Bear, Brown Bear (Bill Martin Jr.) — practise Predict and Check',
    ],
    mid: [
      'The Gruffalo (Donaldson & Scheffler) — spot the author’s word choices',
      'Where the Wild Things Are (Sendak) — infer feelings from the pictures',
      'Fantastic Mr Fox (Roald Dahl) — flag fuzzy words and read around them',
    ],
    upper: [
      'Charlotte’s Web (E.B. White) — discuss what the text says vs what you infer',
      'Matilda (Roald Dahl) — review chapters like an editor',
      'The Iron Man (Ted Hughes) — track word choice across a whole book',
    ],
  },
  memory: {
    explorePrompt: 'Flip two cards. Match each reader move to what it looks like!',
    celebrate: 'You know the secret moves good readers use!',
    pairs: [
      { a: { label: 'Predict', emoji: '🔮' }, b: { label: 'Guess what happens next', emoji: '➡️' }, why: 'Predict: guess ahead — then read on to check.' },
      { a: { label: 'Question', emoji: '❓' }, b: { label: 'Ask who? why? how?', emoji: '🗣️' }, why: 'Question: ask the text questions as you go.' },
      { a: { label: 'Picture', emoji: '🖼️' }, b: { label: 'Make a movie in your mind', emoji: '🎬' }, why: 'Picture: turn the words into a mind-movie.' },
      { a: { label: 'Connect', emoji: '🔗' }, b: { label: 'Link it to your life', emoji: '🏠' }, why: 'Connect: tie the story to things you know.' },
      { a: { label: 'Infer', emoji: '🕵️' }, b: { label: 'Read between the lines', emoji: '📖' }, why: 'Infer: use clues for what the words do not say.' },
      { a: { label: 'Check', emoji: '✅' }, b: { label: 'Stop — did I get it?', emoji: '🛑' }, why: 'Check: notice fuzzy meaning and fix it.' },
    ],
  },
  vocab: {
    predict: 'Say what you think comes next — then check.',
    imagine: 'Build the picture in your mind.',
    'read between the lines': 'Figure out what the words do not say straight out.',
  },
};


M['Personal & Social Development|Self-Awareness'] = {
  emoji: '🪞',
  coverArt: ['🪞', '💛✨'],
  artPalette: ['#FFE156', '#4ECDC4', '#FF6584', '#B388FF'],
  question: 'What are you like — and what makes you, you?',
  centralIdea: 'Knowing your strengths, feelings and values helps you choose well.',
  decision: {
    meters: [
      { id: 'confidence', label: 'Confidence', emoji: '💪', start: 50 },
      { id: 'calm', label: 'Calm', emoji: '🧘', start: 55 },
      { id: 'mood', label: 'Self-knowledge', emoji: '🪞', start: 45 },
    ],
    scenes: [
      {
        text: 'Show-and-tell choice: share your dinosaur facts or stay silent? 🦕',
        choices: [
          { label: 'Share what you know — it’s your strength', meters: [['confidence', 20], ['mood', 15]], reflect: 'You used self-awareness: naming what you are good at and offering it.', profile: 'Communicator' },
          { label: 'Stay quiet — others know more', meters: [['confidence', -10], ['calm', 5]], reflect: 'Stepping back is okay sometimes — but your facts were real. Strengths grow by being used.' },
        ],
      },
    ],
  },
  vocab: {
    strength: 'Something you do well.',
    'self-awareness': 'Knowing your own feelings, strengths and values.',
  },
};

/* Child-facing glosses: taxonomy topic names are written for teachers; the
   stage shows children. Glossed names pair plain-language hooks with the
   teachable term where it matters (marble: technical words get meaning on
   demand, never a wall of jargon). Applied to word-card fronts/backs and
   mission concept names at derivation. */
export const CHILD_GLOSS = {
  'Concurrent events in code': { label: 'Two things at once', back: 'Make two characters move at the same time — like two dancers starting on the same beat.' },
  'Binary on and off': { label: 'On and off: 1s and 0s', back: 'Computers speak in just two signals — on (1) and off (0). Five switches can count all the way to 31!' },
  'Apostrophes for possession': { label: "Whose is it? the cat's tail", back: "An apostrophe + s shows who owns it: the cat's tail — the tail belongs to the cat." },
  'Apostrophes: Contraction and Possession': { label: "Apostrophes: don't and Sam's", back: "The same mark does two jobs: don't (letters gone) and Sam's bag (Sam owns it)." },
  'Apostrophes for possession (age 7+)': { label: "Whose is it? the dogs' kennel", back: "One dog owns it: the dog's kennel. Many dogs own it: the dogs' kennel." },
  'Fronted Adverbials and Commas': { label: 'Start with When? Where? How?', back: 'Later that day, the children ran home — the opening words take a comma.' },
  'Grammar Terms: Pronouns and Determiners': { label: 'Word jobs: she, her, quickly', back: 'Some words point (her present), some replace names (she), some tell how (quickly).' },
  'Plural vs Possessive in Nouns': { label: "dogs, dog's or dogs'?", back: "More than one dog: dogs. One dog owns it: dog's. Many dogs own it: dogs'." },
  'Apostrophes for shared ownership': { label: "Sam and Ali's house", back: "One house they share: Sam and Ali's house. Their own bikes: Sam's and Ali's bikes." },
  'Commutative Multiplication': { label: 'Turn the array around!', back: '3 rows of 5 is the same as 5 rows of 3 — turn the array and see!' },
  'Decomposing a shape into more equal shares': { label: 'More slices, smaller slices', back: 'Cut the same pizza into more pieces and every piece gets smaller — a quarter is smaller than a half.' },
  'Subitising to 5': { label: 'See how many in a flash', back: 'Look for one second and say how many — no counting, just knowing.' },
  'Area and the distributive property': { label: 'Split a rectangle, add the areas', back: 'A 3×(4+2) rectangle is just 3×4 plus 3×2 — split it and check!' },
  'Transparent, Translucent & Opaque': { label: 'See-through, dim or blocked?', back: 'A clear window is transparent. Frosted glass is translucent. A wooden door is opaque.' },
  'Inheritance Vocabulary': { label: 'Passed down or picked up?', back: 'Eye colour is inherited — passed down. A scar is acquired — picked up along the way.' },
  'Tectonic Plates': { label: "Earth's giant jigsaw pieces", back: "Earth's hard outer shell is cracked into huge plates that slowly drift." },
  'Pronouns for clarity': { label: 'Stand-in words: he, she, it', back: 'Use he, she, it and they so you do not repeat the name again and again.' },
  'Linking paragraphs with adverbials': { label: 'Link ideas: Later, Meanwhile, Next', back: 'Opening words like Later, and Meanwhile guide the reader through your story.' },
  /* --- teacher meta-language → child hooks (batch: English grammar/reading) --- */
  'Vocabulary: making decisions and keeping safe': { label: 'Choosing safely' },
  'Vocabulary: self': { label: 'Words about me' },
  'Vocabulary: understanding others': { label: 'Words about other people' },
  'Vocabulary: working with others': { label: 'Words for teamwork' },
  'Vocabulary: ethics and citizenship': { label: 'Fair and good choices' },
  'Vocabulary: resilience and self': { label: 'Bouncing back' },
  'Vocabulary: social awareness': { label: 'Noticing others' },
  'Vocabulary: ancient egypt': { label: 'Egypt words: pharaoh, pyramid' },
  'Vocabulary: historical thinking': { label: 'History words: old, older, oldest' },
  'Grammar words: letter, word, sentence': { label: 'Word jobs: letter, word, sentence' },
  'Grammar Terms: Nouns, Verbs and Tense': { label: 'Word jobs: naming, doing, when' },
  'Grammar Terms: Clauses and Conjunctions': { label: 'Joining words: and, but, because' },
  'Grammar Terms: Modal Verbs and Clauses': { label: 'Might, must, could — choosing power' },
  'Grammar Terms: Voice and Punctuation': { label: 'Who is speaking? Punctuation shows' },
  'The Present Perfect Tense': { label: 'I have done it already' },
  'Irregular past tense verbs': { label: 'Tricky past words: go → went' },
  'Punctuating Direct Speech': { label: 'Speech marks: “Stop!” she said' },
  'Expressing Time, Place and Cause': { label: 'When? Where? Why? words' },
  'Leaving out words readers know': { label: 'Skip words readers can guess' },
  'Decoding unfamiliar words': { label: 'Crack new words' },
  'Inference vs Explicit Meaning': { label: 'Clues vs said-out-loud' },
  'Inferring Characters’ Feelings and Motives': { label: 'Guess feelings from clues' },
  'Organising Writing into Paragraphs': { label: 'Group ideas into paragraphs' },
  'Rehearsing and Varying Sentences': { label: 'Try sentences out loud' },
  'Forms of Poetry and Performance': { label: 'Poems you can perform' },
  'Engaging Listeners and Valuing Viewpoints': { label: 'Be a great listener' },
  'Borrowing from books you’ve read': { label: 'Borrow ideas from books' },
  'Identifying a text’s intended audience': { label: 'Who is this written for?' },
  'Expanded noun phrases': { label: 'Describe the noun: red, shiny apple' },
  'Subordinate clauses': { label: 'Extra part: when the bell rang…' },
  'Past, Present and Progressive Tense': { label: 'Happened, happening, keeps happening' },
  'Monitoring Comprehension': { label: 'Check you understand as you read' },
  'Alternative Spellings for Known Sounds': { label: 'Same sound, different spellings' },
  'Alternative Spellings for Sounds': { label: 'Same sound, different spellings' },
  'Adding, deleting and swapping sounds': { label: 'Play with sounds: add, swap, drop' },
  'Reading and spelling consonant blends': { label: 'Blend sounds: st, bl, tr' },
  'Characters’ Viewpoints and Responses': { label: 'How characters see it' },
  'Expressive and Sensory Language': { label: 'Words that show feelings and senses' },
  'Story Sequence and Central Message': { label: 'Story order and its big idea' },
  'Book Features and Author’s Reasons': { label: 'Book parts and author choices' },
  'Main Topic of Informational Texts': { label: 'Find the main idea' },
  'Reading High-Frequency Words by Sight': { label: 'Words you know by sight' },
  'Retelling Stories with Structure': { label: 'Retell: first, then, last' },
  'Saying Sentences Before Writing Them': { label: 'Say it, then write it' },
  'Simple Stories with Beginning and Ending': { label: 'Stories with a start and a finish' },
  'Characters, settings, and events': { label: 'Who, where, what happens' },
  'Comparing Characters Across Stories': { label: 'Compare characters' },
  'Expressing & Justifying Opinions': { label: 'I think… because…' },
  'Comparatives & Superlatives': { label: 'Bigger, biggest!' },
  'Doing, thinking and saying verbs': { label: 'Doing, thinking, saying words' },
  'Literal vs Figurative Language': { label: 'Real words or picture words' },
  'In-Depth Character and Setting Analysis': { label: 'Look closer at characters & places' },
  'Choosing Form and Tone for Your Audience': { label: 'Match your writing to your reader' },
  'Interpreting visual information in texts': { label: 'Read the pictures too' },
  'Preparing for and Explaining in Discussions': { label: 'Explain your ideas clearly' },
  'Simple Past, Present and Future': { label: 'Was, is, will be' },
  'Spellings from Greek, French and Latin': { label: 'Word families from old languages' },
  'Structural terminology': { label: 'Story parts: opening, build-up, ending' },
  'Domain Vocabulary Across Subject Areas': { label: 'Subject words: science words, maths words' },
  'Themes Across Cultures and Traditions': { label: 'Same big ideas, different places' },
  'Character Traits and Motivation': { label: 'Why characters do things' },
  'Brackets and dashes for parenthesis': { label: 'Brackets add a whisper' },
  'Firsthand and Secondhand Accounts': { label: 'Saw it myself vs heard about it' },
  'Greek and Latin Roots for Word Meaning': { label: 'Word roots: tele, bio' },
  'How Language Choices Affect the Reader': { label: 'Word choices move readers' },
  'Identifying Reasons Behind a Speaker’s Points': { label: 'Why did they say that?' },
  'Language that builds relationships': { label: 'Words that make friends' },
  'Narrator’s Point of View': { label: 'Who is telling the story?' },
  'Progressive and Continuous Tenses': { label: 'Keeps going: is running' },
  'Advanced Spelling Conventions': { label: 'Tricky spelling rules' },
  'Building on Others in Discussions': { label: 'Add to friends’ ideas' },
  'Choosing Tenses for Precise Meaning': { label: 'Pick the exact tense' },
  'Commas After Introductory Elements': { label: 'Comma after the opener' },
  'Consistent verb tense': { label: 'Keep tenses the same' },
  'Punctuating Clauses': { label: 'Commas between ideas' },
  'Punctuating Titles of Works': { label: 'Book titles: capitals or quotes' },
  'Reflecting on Your Language Use': { label: 'How did my words work?' },
  'Skimming, scanning and checking': { label: 'Skim, scan, check' },
  'Summarising Non-Fiction Main Ideas': { label: 'Say the main idea in one line' },
  'Summarising Spoken and Media Presentations': { label: 'Sum up what you heard' },
  'Synthesising across multiple texts': { label: 'Put two texts together' },
  'Multimedia Presentations': { label: 'Shows with sound & pictures' },
  'Multimedia elements in texts': { label: 'Pictures, sound and video in texts' },
  'How Authors Treat Similar Themes': { label: 'Two authors, one big idea' },
  'Comparing Characters, Settings and Events': { label: 'Compare stories side by side' },
  'Comparing Structure in Informational Texts': { label: 'How info books are built' },
  'Layout and Formatting in Informational Writing': { label: 'Headings that guide readers' },
  'Drawing Conclusions from Discussion': { label: 'What did we decide?' },
  'Evaluating a Speaker’s Argument': { label: 'Is this argument strong?' },
  'Trying figurative language in writing': { label: 'Try comparing words' },
  'Comparing Characters Across Stories ': { label: 'Compare characters' },

  /* --- maths / science / computing / humanities meta-language --- */
  'Measurable Attributes of Objects': { label: 'How long? How heavy?' },
  'Representing Addition and Subtraction': { label: 'Show adding with drawings' },
  'Real-World to Maths Connections': { label: 'Maths all around us' },
  'Real-World Mathematical Modelling': { label: 'Maths for real problems' },
  'Real-world fraction multiplication': { label: 'Fractions of real things' },
  'Using objects to model real problems': { label: 'Show it with objects' },
  'Measuring mass and weight': { label: 'Weighing things' },
  'Telling Time: Hours and Half Hours': { label: 'Telling time: o’clock & half past' },
  'Multiplication as repeated addition': { label: 'Adding again and again = ×' },
  'Fraction Notation': { label: 'Writing fractions: 1/2' },
  'Inverse: addition undoes subtraction': { label: 'Adding undoes subtracting' },
  'Guided Multi-Step Problem Solving': { label: 'Step-by-step problems' },
  'Explaining Mathematical Reasoning': { label: 'Explain your thinking' },
  'Justifying mathematical reasoning': { label: 'Prove your answer' },
  'Position, direction, and movement': { label: 'Where? Which way?' },
  'Describing growing number patterns': { label: 'Growing patterns' },
  'Connecting Representations': { label: 'Match the picture to the number' },
  'Fraction-Decimal Equivalents': { label: 'Fraction twins in decimals' },
  'Decimal & Percent Notation': { label: 'Decimals & percents' },
  'Written Multiplication & Division': { label: 'Written × and ÷' },
  'Modelling with multiplication and fractions': { label: '× with fractions' },
  'Choosing displays for a purpose': { label: 'Pick the best chart' },
  'Choosing representations strategically': { label: 'Pick the best picture' },
  'Constructing mathematical arguments': { label: 'Convince a skeptic' },
  'Estimation to check answers to calculations': { label: 'Estimate to check' },
  'Multi-step problems: choosing operations': { label: 'Many-step problems' },
  'Plotting points in the first quadrant': { label: 'Find the point (x, y)' },
  'Translating and reflecting shapes': { label: 'Slide & flip shapes' },
  'Validating and describing categorical data': { label: 'Check your data' },
  'Planning a statistical investigation': { label: 'Plan a data question' },
  'Carrying out a statistical investigation': { label: 'Be a data detective' },
  'Straight, reflex and revolution angles': { label: 'Straight, reflex & full-turn angles' },
  'Independent and dependent events': { label: 'Does one pick change the next?' },
  'Mixed numbers and improper fractions': { label: 'Mixed numbers like 1½' },
  'Percentage and decimal equivalents': { label: 'Percents & decimals match' },
  'Statistical Analysis Vocabulary': { label: 'Data words: chart, data, compare' },
  'Gathering, recording, classifying and presenting data': { label: 'Collect & show what you found' },
  'Drawing conclusions from evidence': { label: 'What does the evidence say?' },
  'Insect life cycles: complete metamorphosis': { label: 'The big butterfly change' },
  'Indigenous Ecological Knowledge': { label: 'First Nations plant & animal wisdom' },
  'Permission to investigate on Country': { label: 'Ask before studying Country' },
  'Camouflage, warning colours, and mimicry': { label: 'Animal tricks: hide & warn' },
  'Insect communication and behaviour': { label: 'How insects talk' },
  'Threats to insects and conservation': { label: 'Helping insects survive' },
  'Insects in ecosystems': { label: 'Insects’ big jobs' },
  'Communities Protecting Resources': { label: 'Towns protect nature' },
  'Rainforest Futures & Trade-Offs': { label: 'Rainforest: use or save?' },
  'Sun-Driven Weather Systems': { label: 'The Sun makes weather' },
  'Matter Cycling in Ecosystems': { label: 'Nature recycles everything' },
  'Structural Adaptations': { label: 'Body tools: beaks & fur' },
  'Circulation & Breathing Together': { label: 'Heart & lungs team up' },
  'Building an energy-converting device': { label: 'Build an energy machine' },
  'Patterns & Codes for Information': { label: 'Secret codes & patterns' },
  'Reading and drawing circuit diagrams': { label: 'Circuit drawings' },
  'Drawing circuits with proper symbols': { label: 'Circuit symbols' },
  'Why circuit components behave differently': { label: 'Why parts act differently' },
  'Rock layers and Earth’s history': { label: 'Rock layers = Earth’s diary' },
  'Fossils Reveal Ancient Environments': { label: 'Fossils show old worlds' },
  'Judging designs against criteria': { label: 'Test designs fairly' },
  'Checking solutions against criteria': { label: 'Does it pass the test?' },
  'Comparing findings with other groups': { label: 'Compare with other teams' },
  'Classifying Rainforest Organisms': { label: 'Sort rainforest life' },
  'Observing with simple equipment': { label: 'Look with tools' },
  'Shape and material change movement': { label: 'How shape changes motion' },
  'Traits: inherited and environmental': { label: 'Born with it or learned?' },
  'Joining materials with adhesives': { label: 'Glue & tape: which holds?' },
  'Animal Classification Vocabulary': { label: 'Animal group words' },
  'Changes & Separation Vocabulary': { label: 'Words for mixing & changing' },
  'Organ Systems Vocabulary': { label: 'Body team words' },
  'Writing Process Vocabulary': { label: 'Writing words: plan, draft, check' },
  'Data and Information for Computers': { label: 'How computers remember things' },
  'Smart Versus Not-Smart Devices': { label: 'Smart vs not-smart things' },
  'Voice Assistants and How They Work': { label: 'How a speaker hears you' },
  'Decisions and repeats in algorithms': { label: 'If… then… repeat!' },
  'Recommendation Systems and Filter Bubbles': { label: 'Why the app shows those videos' },
  'Deepfakes and AI-Generated Content': { label: 'Fake pictures: real or AI?' },
  'Bias in AI Systems': { label: 'When AI is unfair' },
  'Decisions and input in programs': { label: 'Programs that choose' },
  'Storyboarding a digital solution': { label: 'Draw your app plan' },
  'A different password per account': { label: 'One password for each account' },
  'Community impact of digital solutions': { label: 'Does your app help the town?' },
  'My digital footprint': { label: 'Your footprint online' },
  'Collaborating in shared documents': { label: 'Write together in one doc' },
  'Natural, managed and built features': { label: 'Wild, cared-for, built' },
  'First Nations and local Country': { label: 'Whose Country are we on?' },
  'Local, regional and state scales': { label: 'Near, farther, far away' },
  'First Nations Countries of Australia': { label: 'Many Countries, one Australia' },
  'Ancient Greece and Rome on the Map': { label: 'Find Greece & Rome' },
  'Egypt, the Nile, and the Desert': { label: 'Egypt: river and desert' },
  'Different perspectives and accounts': { label: 'Two sides of the story' },
  'Roman Army and Conquest of Britain': { label: 'Rome invades Britain' },
  'Egyptian Tomb Paintings and Artefacts': { label: 'Tomb wall pictures' },
  'Checking Sources Against Each Other': { label: 'Do two sources agree?' },
  'Understanding People in Their Own Time': { label: 'Life was different then' },
  'Evidence for Greek and Roman Life': { label: 'Clues from Greece & Rome' },
  'Fall of the Western Roman Empire': { label: 'Rome falls' },
  'Greek Philosophers and Medicine': { label: 'Greek thinkers & doctors' },
  'Magna Carta and Limiting Royal Power': { label: 'A king must follow rules too' },
  'Roman Law, Latin, and Christianity': { label: 'Roman laws & words' },
  'Modern Archaeology and Egyptian Ethics': { label: 'Digging up Egypt today' },
  'Patience and Delayed Gratification': { label: 'Waiting for better' },
  'Triggers and Causes of Feelings': { label: 'What set off the feeling?' },
  'Basic digital citizenship': { label: 'Being good online' },
  'Choosing the Right Coping Strategy': { label: 'Pick your calm-down tool' },
  'Community Rights and Responsibilities': { label: 'Rights & jobs in our community' },
  'Culture and Experience Shape Emotions': { label: 'Feelings across cultures' },
  'Self-Reflection in Relationships': { label: 'How am I as a friend?' },
  'Stereotypes and Individual Differences': { label: 'Don’t put people in boxes' },
  'The world contains many cultures, traditions': { label: 'Many cultures, one world' },
  'Cutting food with bridge and claw grips': { label: 'Safe knife holds: bridge & claw' },
  'Real-World Robots': { label: 'Robots around us' },
  'Reading for Meaning': { label: 'Reading is about the meaning', back: 'Reading is not just saying the words — it is getting the story they tell.' },
  'Author’s word choices': { label: 'Why did the author pick that word?', back: 'Authors choose every word on purpose — the choice changes how you feel.' },
  'Knowing What You Don’t Know': { label: 'Catch the words you half-know', back: 'Notice words you only half-know — flag them, then find out.' },
  'Reviewing Own Writing': { label: 'Read your writing like a reader', back: 'After writing, read it again as if you were the reader — does it work?' },
  'Monitoring Comprehension': { label: 'Check you understand as you read', back: 'Good readers notice when meaning goes fuzzy — and stop to fix it.' },
  'Inference vs Explicit Meaning': { label: 'Clues vs said-out-loud', back: 'Some ideas are said straight out; others hide in clues. Know which is which!' },
  'Reflecting on Your Language Use': { label: 'How did my words work?', back: 'Think about your own talking and writing — when did it work best?' },
  'Generalising with repeated reasoning': { label: 'Spot the rule, use it again' },
};


/* Regular name families get pattern glosses instead of one-by-one entries. */
export const CHILD_GLOSS_PATTERNS = [
  { re: /^Fluent adding and subtracting within ([\d,]+)$/, label: (m) => 'Quick add & subtract up to ' + m[1] },
  { re: /^Reading and writing numbers to ([\d,]+)$/, label: (m) => 'Read & write numbers to ' + m[1] },
  { re: /^Reading and writing numbers$/, label: () => 'Read & write big numbers' },
  { re: /^Adding and subtracting$/, label: () => 'Adding & subtracting' },
  { re: /^Addition and subtraction strategies$/, label: () => 'Adding & subtracting tricks' },
  { re: /^Addition and subtraction word problems$/, label: () => 'Story problems: add & take away' },
  { re: /^Mental addition and subtraction$/, label: () => 'Adding in your head' },
  { re: /^Mental multiplication and division$/, label: () => '× and ÷ in your head' },
  { re: /^Understanding fractions$/, label: () => 'What fractions mean' },
  { re: /^Multiplying and dividing$/, label: () => 'Multiplying & dividing' },
  { re: /^Counting forwards and backwards$/, label: () => 'Count up and down' },
  { re: /^Missing number problems$/, label: () => 'Find the missing number' },
  { re: /^Finding a missing number in addition$/, label: () => 'Find the missing number' },
  { re: /^Arrays for multiplication$/, label: () => 'Arrays: rows × columns' },
  { re: /^Splitting shapes into equal parts$/, label: () => 'Split shapes into equal parts' },
  { re: /^Fractions on a number line$/, label: () => 'Fractions on a number line' },
  { re: /^Converting measurement units$/, label: () => 'Change units: cm → m' },
  { re: /^Telling time to the minute$/, label: () => 'Telling time to the minute' },
  { re: /^Classifying shapes by (line )?properties$/, label: () => 'Sort shapes by their rules' },
  { re: /^Dividing fractions|Dividing unit fractions and whole numbers$/, label: () => 'Sharing fractions' },
  { re: /^Multiplying fractions$/, label: () => 'Fractions of fractions' },
  { re: /^Area of (rectangles|Triangles & Parallelograms) by? ?(multiplication)?$/, label: (m) => m[1].includes('rect') ? 'Area of rectangles' : 'Area of triangles & slanted squares' },
  { re: /^Division with remainders$/, label: () => 'Division with leftovers' },
  { re: /^Area and perimeter of rectangles$/, label: () => 'Around (perimeter) & inside (area)' },
  { re: /^Decimals for Tenths & Hundredths$/, label: () => 'Tenths & hundredths' },
  { re: /^Converting tenths to hundredths$/, label: () => 'Tenths into hundredths' },
  { re: /^Decimal equivalents of tenths and hundredths$/, label: () => 'Tenths & hundredths as decimals' },
  { re: /^Adding fractions \(different denominators\)$|^Adding Fractions \(Unlike Denominators\)$/, label: () => 'Adding unlike fractions' },
  { re: /^The two digits of a two-digit number$/, label: () => 'Tens and ones' },
  { re: /^The three digits of a three-digit number$/, label: () => 'Hundreds, tens and ones' },
  { re: /^Comparing groups: more or fewer$/, label: () => 'More or fewer?' },
  { re: /^Addition as combining/, label: () => 'Putting groups together' },
  { re: /^Subtraction as taking away/, label: () => 'Taking away' },
  { re: /^Two written numerals/, label: () => 'Writing numbers 1 to 10' },
  { re: /^Representing numbers with objects$/, label: () => 'Show numbers with things' },
  { re: /^Equivalent fractions on a number line$/, label: () => 'Same amount, different names' },
  { re: /^Fluent multiplication and division facts$/, label: () => 'Quick × and ÷ facts' },
  { re: /^Two-step addition and subtraction problems$/, label: () => 'Two-step story problems' },
  { re: /^Area of rectangles by multiplication$/, label: () => 'Area = rows × columns' },
];
export const DOMAINS = M;

/* Grade-band helper used by the generator. */
export function bandOf(age) {
  if (age <= 6) return 'early';
  if (age <= 8) return 'mid';
  return 'upper';
}

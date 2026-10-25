# Age-fit verdicts — cross-check of current course content vs taxonomy topics per band

Method: `tools/audit/age-fit.mjs` builds the real 317 course payloads, extracts each
band's effective lab dials/cases plus every other engine's resolved content, then
compares against the taxonomy topic names for that domain and band (ages 4–6 early,
7–8 mid, 9–10 upper). Full data: `age-fit-report.md` / `age-fit.json`.
Ground truth for judgments: per-age topic lists from `data/topics.json`.

## A. MISMATCHES — fix in this pass (the "6+4 at age 10" class)

| # | Domain | Band | Now serves | Band topics demand | Fix |
|---|--------|------|-----------|--------------------|-----|
| A1 | Number Representation & Place Value | mid (7-8) | blocks scene caps at 999; case builds 143 | "Place Value to 1000", "Numbers to 10,000", "1000 More or Less" | extend blocks scene to 9,999 (Dienes thousand-cubes); mid dial 0..9,999; cases build 1,570 etc. |
| A2 | Number Representation & Place Value | upper (9-10) | case builds 342 | "Numbers to Ten Million", "Reading/writing to 10,000,000", "Place Value × 10 and ÷ 10" | NEW `pvchart` scene (7-column place-value digit chart, upper band via sceneByBand); digit-shift cases |
| A3 | Addition & Subtraction | mid (7-8) | counters ≤10 + numberline 0..14, cases "5+4", "6+3" (age-5 difficulty) | "within 1000", "mentally adding tens/hundreds to 3-digit numbers", two-step | counters retired at mid; numberline range 0..1,000 with hundreds hops |
| A4 | Addition & Subtraction | upper (9-10) | numberline 0..120 (below mid's new ceiling) | "Fluent addition and subtraction", "mental strategies", "Checking Answers by Rounding" | numberline 0..10,000: exact-pair, halving, round-then-adjust cases |
| A5 | Addition & Subtraction | early (4-6) | numberline 0..14; no crossing-ten case | age 6: "within 20", "crossing ten", "within 100" | scene2 numberline range 0..30, cases incl. crossing ten |
| A6 | Counting & Cardinality | mid (7-8) | jar ≤20 "count in fives", numberline "hop in twos" (age-5 content) | "Counting Within 1,000", "Skip Counting (4s, 8s, 50s, 100s)", "Counting in 6s" | jar retired at mid; primary `numberlineXL` 0..1,000 (50s/100s); scene2 numberline 0..100 (4s/6s/8s) |
| A7 | Mathematical Thinking | mid+upper | UNSOLVABLE cases: "ends in 0" needs step 10 (dial max 6); "land on 30 at 3rd bead" needs start 18 (dial max 12) | pattern generalising, proving rules | band dial overrides (upper start ≤120, step ≤25) + rewritten cases; NEW validator solvability check so this class cannot return |
| A8 | Multiplication & Division | upper | numberline cases "7×3 in 3 hops", "18 two ways" (age-6 skip counting) | mental multiplication, 12×12 fluency, factors | 3-hop multiplicative cases (25s→100 quarters, 12s dozens, 24s→96 doubling), range 0..150 |
| A9 | Multiplication & Division | arcade | early "10 × 8 = ?"; mid tables stop at 5 | age 4-6 arrays/repeated addition; age 8 "all tables to 12×12" | generator: early operands ≤5; mid tables {2,3,4,5,6,8,10,12} × ≤12 |
| A10 | Addition & Subtraction | arcade | mid sums ≤40; upper sums ≤200 | mid within 1000; upper 3-digit mental | generator: mid R=100, upper R=1000 (near-misses ±1/10/100) |
| A11 | Counting & Cardinality | arcade | mid counts 3..18 objects | skip counting 4/6/8/50/100 | generator: mid = skip-sequence items ("8, 16, 24, 32, …next?") |
| A12 | Fractions | mid | cases "cut into halves" (age 5) | equivalent fractions, tenths, same-denominator sums | mid cases: 7/10 tenths, 3/8+2/8=5/8 sum, 6/8≡3/4 equivalent |
| A13 | Data & Statistics | upper | bar comparisons only | age 10: "Calculating the Mean" | add levelling case: make all four bars equal (the mean shared out) |
| A14 | Measurement | mid+upper | mid cases ≤30cm pencil only; upper case "nearest half" with integer dial | converting units (mm/cm), calculating with measurements | mid: mm↔cm reframe + double/half; upper reword case 1 |
| A15 | Reading Comprehension | all | only interactive mode = Three Pigs sequence for every band | upper: inference, author's purpose, text structure | NEW `sequenceByBand`: mid = story mountain, upper = how a news article is built |
| A16 | Geometry | arcade | static "triangle has 3 sides" for ages 5 and 10 | age 7-8 symmetry/right angles/quadrilaterals; age 9-10 angle sums, coordinates, circle parts | generator: band-tiered fact banks |
| A17 | lab-cases.mjs | — | duplicate key `'Waves, Light & Sound|sound'` (line ~362 dead block overwritten by ~486) | — | delete dead block; NEW validator duplicate-key check |

## B. Latent engine bugs found during audit (fix alongside)

- `concept-lab.js` mutates the shared scene dial objects (`d.min = ov.min …`): two lab
  modes using the same scene id with different overrides on one page corrupt each other.
  Fix: clone dial defs per instance (also unlocks `numberline` + `numberlineXL` per page).
- `numberline` cases can exceed the visible range (MultDiv mid "land on 24" on a 0..20
  line): reachability+visibility check added to the validator.
- `placevalue` painter draws at most 6 hundreds flats (990 shows 6) — fixed in the
  thousands rework.
- MultDiv mid numberline needs explicit range {0,30} + dial overrides.

## C. ACCEPTED WITH REASON (band-elastic content — no change)

- **PSD / Learning to Learn / Life Skills decision quests**: feelings, money and
  growth-mindset scenarios are age-elastic; reading level machine-checked (jargon
  stoplists); missions/flashcards for these domains are age-derived per course.
- **History / Geography sorters & sequences**: the same narrative content (Egypt
  timeline, map features) is the domain's actual content at every age; depth comes from
  the age-derived missions/word cards.
- **Science sorters** (habitat/feature vocabulary): category-word consolidation, one
  mode among age-derived missions/cards. Science LABS (states/circuit/forces/sound/
  light) are already band-tiered by LAB_CASES (verified in report).
- **Writing Composition sequence** (story arc) and **Speaking & Listening sequence**
  (conversation steps): band-elastic structures.
- **Phonics arcade bank** (early+mid only): sound-review legitimacy at age 7.
- **3D modes** (solar/volcano/spatial): single coherent worlds with band-tiered
  questions in missions.
- **English Thinking memory** (strategy pairs) + storybook engine: already band-tiered
  book sets.

## D. DOCUMENTED GAPS (representation does not exist yet — listed in PEDAGOGY-AUDIT)

- Fractions upper: unlike-denominator addition / decimals / percent beyond a 12-part
  pizza; "fractions on a number line" topic (ages 7-9, three domains) has no dedicated
  scene.
- Measurement: clock/elapsed-time, capacity pouring, area/perimeter models.
- Geometry upper: coordinates grid, angle measurer, nets.
- Place value upper: 10,000,000 ceiling reached via digit chart (pvchart) but no
  blocks-scale model beyond 9,999 (by design — blocks don't scale, charts do).

## E. Interaction fixes from the review round (same pass)

- **Place-value lab controls**: the single 0–9,999 Number slider was replaced by one
  dial per column — `placevalue` (Hundreds/Tens/Ones) for early, `placevalue2` (adds
  Thousands) for mid via sceneByBand; upper already uses the `pvchart` digit steppers.
  Cases retargeted to column values (build 1,570 = Th 1, H 5, T 7, O 0).
- **Blank strip under the canvas**: the Konva stage now sizes itself AND the scene box
  to the scaled canvas (`fitStage`), killing both the stretch gap and a silent 640px
  overflow on narrower boxes.
- **Readout restored**: the vendored Konva clears its container, so the readout element
  (and the lottie burst) had been destroyed at startup on every Konva-path lab since the
  Konva migration — labs never showed their live readout. Both are now appended after
  stage creation, and `syncDialChips` fills the readout with `scene.readout` (hidden
  behind the predict prompt during unsolved cases, per the lab honesty contract).
- Verified live: age 5 → "25 = 2 tens + 5 ones"; age 7/8 → "1,205 = 1 thousand +
  2 hundreds + 5 ones" with four column dials; age 10 → digit chart "3,152".
  317-page sweep 0 errors after the changes.

## F. Spiral content pass (2026-10-25, owner /goal)

The §C "band-elastic acceptance" of static modes was reversed after the owner challenged
why 43 openers were byte-identical across bands. All interactive modes now carry
band-authored content in `tools/lib/band-modes.mjs` (~120 sets), and
`validate-content.mjs` fails the build when any interactive mode's child-visible content
fingerprint appears in two bands (engines: sorter, sequence, decision, memory, arcade,
concept-lab, spatial3d, solar3d, volcano3d; flashcards/mission differ naturally via
per-age derivation). Verified: opener classifier 43 identical → 0 across all 64
multi-band domains; 317-page sweep 0 errors; gameplay types intentionally repeat (spiral)
with content scaled per band.

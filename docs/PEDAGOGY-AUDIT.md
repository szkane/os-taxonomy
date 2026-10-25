# PEDAGOGY-AUDIT — representation coverage vs mainstream EN-language + IB teaching

The site's claim: every interactive course teaches with the representations English-speaking curricula (England NC, Australian AC v9, US NGSS/CCSS, Ontario) and IB PYP practices actually use — not one generic quiz per topic. This matrix is the systematic check; it is maintained alongside `tools/lib/mapping.mjs` and re-reviewed whenever a domain's modes change.

Legend: ✅ covered by a shipped mode · ➕ added after this audit · ⭕ deliberately out of scope for a browser activity (needs physical materials)

## Mathematics (CPA: concrete → pictorial → abstract)

| Domain | Canonical methods in EN curricula | Site coverage |
| --- | --- | --- |
| Addition & Subtraction | counters/ten-frames, number-line counting on/back, part-whole, difference-as-distance | ✅ counters lab · ➕ number-line lab (forward **and backward** hops) · ✅ generated fact sprint |
| Multiplication & Division | **equal groups**, **arrays**, **skip counting**, doubling, repeated addition on a line | ✅ array lab · ➕ skip-counting frog lab (start+jump=3×8 style cases) · ✅ fact sprint |
| Fractions | area model (pizza/cake), **fraction bars/strips**, number-line fractions, set model | ✅ pizza area model · ✅ arcade compare/half items · ⭕ folding paper strips · number-line fractions planned |
| Number Representation & Place Value | base-10 blocks, expanded form, number lines, place-value charts | ✅ blocks lab with expanded-form readout · ✅ place-value sprint |
| Counting & Cardinality | one-to-one objects, **number line**, hundred chart, skip counting intro | ✅ jar lab (last-number rule) · ➕ hop-and-count lab (1s and 5s) · ✅ counting sprint |
| Geometry | attribute sorting, shape construction, symmetry, tangrams | ✅ polygon lab (sides↔corners) · ✅ shape-fact sprint · ✅ shape sorter (categories) · ⭕ tangrams/symmetry folding |
| Measurement | **length with rulers (zero alignment)**, **balance scales for mass**, capacity pouring, time | ✅ ruler lab · ➕ balance-scale lab · ✅ unit-choice sprint · ⭕ capacity pouring / clock reading (candidates for next pass) |
| Data & Statistics | pictograms, **bar charts**, tallies, "how many more" difference questions | ✅ bar-chart builder with winner/difference cases · ✅ data sprint |
| Algebra | **repeating & growing patterns**, function machines, missing numbers | ✅ bead-pattern machine (start+jump rule) · ✅ pattern sprint |
| Ratio & Proportion | **equal-share fractions**, double number lines, recipe scaling | ✅ fraction-share framing · ✅ recipe-sprint items |
| Mathematical Thinking | odd-one-out, pattern rules, "many roads" reasoning | ✅ pattern lab with multi-solution case (affine rule) · ✅ thinking sprint |
| Probability | **spinners with unequal slices**, likelihood words, fair/unfair | ➕ spinner lab (slice ratio → % chance; impossible/certain cases) |

## Science (inquiry cycle: predict → do → explain)

| Domain | Canonical practices | Site coverage |
| --- | --- | --- |
| Waves, Light & Sound | fair-test vibration demos, pitch/volume separation, shadow measurement | ✅ drum lab (force vs tension) · ✅ torch/shadow lab · ✅ safety dilemmas |
| Forces & Motion | ramp fair tests, friction surfaces, measuring distance | ✅ ramp lab (height × surface) |
| Energy | circuit building, brightness vs power sharing, energy-saving choices | ✅ circuit lab · ✅ electrical-safety decisions |
| Matter & Materials | heating/cooling change, property sorting | ✅ states-of-water lab (0°C/100°C) · ✅ material property sorter |
| Earth's Systems | sphere interactions (land/water/air) | ✅ geosphere/hydrosphere/atmosphere sorter |
| Weather & Climate | **water cycle**, dressing for weather | ✅ water-cycle builder (cycle mode) · ✅ clothing sorter |
| Ecosystems / Animals / Ocean / Minibeasts / Polar / Rainforests | habitat matching, **classification by features**, layer models | ✅ 6 sorters (habitats, classes, ocean layers, minibeast movement, Arctic/Antarctic, rainforest layers) |
| Organisms & Life Processes | **life cycles** (circular), living/not-living criteria | ✅ butterfly cycle · ✅ living-vs-never sorter |
| Human Body | organ systems as "teams" | ✅ body-job sorter |
| Dinosaurs | **fossilization sequence** | ✅ 5-step fossil timeline |
| Space Systems | **Earth rotation → day/night** (3D), Sun elevation | ✅ spatial3d Earth lab (spin → predict → commit) |
| Space Exploration | solar system scale/order, mission history | ➕ solar3d tour (tap planets, select-and-commit cases) |
| Scientific Inquiry | **fair testing: one variable**, repeat measures | ✅ fair-test dilemma quests |
| Volcanoes & Earthquakes | pressure→eruption models, hazard safety | ➕ volcano3d pressure lab · ✅ safety decisions |
| Design & Technology | **design cycle: plan→make→test→improve** | ➕ design-cycle timeline |

## English (phonics → comprehension; IB "How we express ourselves")

| Domain | Canonical methods | Site coverage |
| --- | --- | --- |
| Phonics & Word Reading | **blending**, digraph spotting, syllable clapping | ✅ sound-pop sprint · ➕ word-builder (blend construction) |
| Grammar & Punctuation | **error diagnosis & correction**, capital/period/question/comma/tense/possession | ✅ sentence clinic with verified injuries (no answer reveal, hint after misses) |
| Spelling & Word Study | **spelling-pattern fixing**, constructing words | ✅ spelling clinic · ➕ word-builder bands |
| Vocabulary | **word–meaning linking**, synonym/precision work | ➕ memory pairs (word ↔ meaning) |
| Reading Comprehension | **story-structure retell** (setting/characters/problem/events/solution) | ✅ Three-Little-Pigs retell timeline |
| Writing Composition | story arc: hook→problem→attempts→turn→ending | ✅ story-building timeline |
| Speaking & Listening | conversation turns | ✅ conversation sequence |

## People, places and self (IB Who we are / Where we are in place and time / How we organize ourselves)

| Domain | Canonical practices | Site coverage |
| --- | --- | --- |
| Ancient Egypt / Greece & Rome / Medieval | **chronology**, then/now comparison, social roles | ✅ timelines ×3 · ✅ then-now and roles sorters |
| Family & Community History | **generational timelines** | ➕ four-generation timeline |
| Modern History | invention milestones | ➕ century timeline |
| Maps & Spatial Skills | **symbols, key, compass, scale** | ✅ map-language sorter |
| Places & Environments | natural vs built features | ✅ natural/built sorter |
| Money & Finance | **needs vs wants, saving, sharing** | ✅ money-tr Trade-off dilemma quest |
| Entrepreneurship | customers, reinvestment | ✅ stall dilemma quest |
| Food & Cooking | recipe as procedure | ➕ recipe sequence |
| Emotional Literacy / Empathy / Friendship / Responsibility / Self-Regulation / Self-Awareness | **naming feelings, perspective-taking, consequence reflection** (Learner Profile language) | ✅ 7 dilemma quests with meters + sorters |
| Learning to Learn | reflection, practice | ✅ universal modes (mission/flashcards) |
| Computing (6 domains) | **algorithms as ordered steps**, input/output, online safety, AI patterns | ➕ algorithm sequence (jam sandwich), privacy dilemmas, vocab decks for AI/systems/data/design/collaboration |

## Gaps knowingly left (next-pass candidates)

1. Clock reading / time elapsed (Measurement) — needs a drag-the-hands manipulator.
2. Capacity/volume pouring labs (Measurement); area/perimeter and volume models (Measurement ages 8–10).
3. Fractions on a number line (Fractions/Mathematical Thinking ages 7–9) and decimals/percent beyond the 12-part pizza (Fractions ages 8–10 — tenths cases cover part of this).
4. Ten-frames for early addition (Addition & Subtraction age 4–5).
5. Symmetry mirrors, tangrams, angle measurer, coordinate grid and nets (Geometry).
6. Unlike-denominator fraction operations on a manipulable model (Fractions age 10).
7. Tangible events like paper folding (fractions) stay physical-classroom work — the adult panel's "Try at home" POE task covers them.

## Age-fit audit (2026-10-24)

A full cross-check of all 317 courses against each band's own taxonomy topics ran via
`tools/audit/age-fit.mjs` (standing tool — rebuilds the real course payloads and compares
effective lab dials/cases with the band's topics). Findings and outcomes are logged in
`.audit/Age-fit-verdicts.md`. Headline fixes: AddSub mid/upper lines (to 1,000 / 10,000),
Counting mid skip-count highway (50s/100s) + small-hop line (4/6/8s), place-value blocks
rebuilt as per-column dials (hundreds/tens/ones + thousands for mid) with a digit-chart
scene for upper (to 9,999,999), band-tiered Fractions/Data/Measurement/Math-Thinking cases,
band-parameterized arcade generators (addsub/multdiv/counting/geometry/pattern/placevalue),
Reading Comprehension tiered sequences (story mountain / news-article structure), and two
shipped-forever bugs found by the new solvability checker (unreachable Algebra upper case;
Energy circuit case targeting a dial value of 4 on a 1–3 dial). Static modes were RE-REVIEWED the same day and the "band-elastic acceptance" was
REVERSED (owner challenged it correctly): all 43 identical openers were replaced with
hand-authored per-band sets in `tools/lib/band-modes.mjs` (~120 sets: science sorters,
history/geography sorters+sequences, decision quests, sequences, 3D band stops, memory
pairs, phonics arcade), enforced by a build-failing cross-band fingerprint rule covering
every interactive engine. Gameplay TYPES repeat across bands (spiral); CONTENT now scales
per band.

**Band-specific cases (Plan B, complete)**: every one of the 21 lab units (16 domains × their scenes) now carries age-tiered case sets in `tools/lib/lab-cases.mjs` — early (concrete language, small targets), mid (the original authored set), upper (precise vocabulary, bigger ranges, inverse/proportion/reasoning tasks). The derivation selects by the course's band; the build checker validates each band's cases against the scene's initial dials (pre-solved = build error) and prompt-length caps. 33 new sets were authored; the mid sets were the pre-existing ones.

Every shipped lab satisfies the two non-negotiables from the skills: the representation preserves the relationship being taught (marble interaction-design), and challenge cases test a *fresh* application rather than repeating the explore screen (predict → commit → reveal). Since the honesty audit, labs also: start in an explicit Explore tab, hide the commit button during free play, hide the readout while an unsolved case is open (so the child predicts from the scene, not from the readout), and are machine-checked against pre-solved cases (initial dial values satisfying a case fail the build).

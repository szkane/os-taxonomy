# COURSE-MAPPING — how every course got its gameplay

The taxonomy spans **66 unique (subject, domain) pairs across 304 primary-school courses (Ages 5–10 / Kindergarten to Grade 5)**. Every single course opens with an **Explore-First visual simulation** (`concept-lab` Canvas/Konva 2D lab and/or a Three.js 3D world), followed by domain-matched interactive **Understand** and **Practice** modes, **Inquiry Wonder Cards** (`flashcards`), and an independent **POE Inquiry Mission** (`mission`). Authoring lives in `tools/lib/mapping.mjs`, `tools/lib/lab-cases.mjs`, `tools/lib/band-modes.mjs`, and `tools/lib/age-curriculum.mjs`.

## 1. Domain → gameplay map (all 66 domains)

| Domain | Explore opener(s) (2D Lab + 3D World) | Understand / Practice modes |
| --- | --- | --- |
| **Mathematics (12 domains)** | | |
| Addition & Subtraction | Age 5: `counters` + `tenframe` · Age 6: `tenframe` + `numberline` (to 100) · Ages 7–8: `numberline` (to 1,000) + `placevalue` · Ages 9–10: `numberline` (to 10,000) + `placevalue2` | `arcade` (band-calibrated mental fluency) |
| Multiplication & Division | `array` + `numberline` (skip-counting hops; scaled to 1,000 in mid) | `arcade` |
| Fractions | `fractions` (pizza area model) + `fractionline` (bar ↔ 0–1 line ↔ decimal ↔ %) | `arcade` |
| Number Representation & Place Value | Early: `placevalue` (H/T/O) · Mid: `placevalue2` (Th/H/T/O) · Upper: `pvchart` (7-digit chart to 9,999,999) + `numberlineXL` | `arcade` |
| Counting & Cardinality | Age 5: `counting` + `numberline` (to 20) · Age 6: `placevalue` (to 100) + `numberlineXL` (to 100) · Mid: `numberlineXL` (to 1,000) + `numberline` | `arcade` |
| Geometry | Early/Mid: `shape` · Upper: `coordgrid` (`(x, y)` coordinates & `0°–360°` angles) + **`geometry3d`** (Three.js 3D polyhedra inspector) | `sorter` + `arcade` |
| Measurement | Early: `measure` + `balance` · Mid: `clock` (analog + 24h elapsed time) + `capacity` (ml/L jugs + `cm³`) · Upper: `capacity` + `measure` (metric conversions) | `arcade` |
| Data & Statistics | `databar` (editable 4-bar chart) | `arcade` |
| Algebra | `pattern` (function-rule bead machine) | `arcade` |
| Ratio & Proportion | `fractions` (ratio & proportional share framing) | `arcade` |
| Mathematical Thinking | `pattern` (multi-solution affine reasoning) | `arcade` |
| Probability | `spinner` (unequal sectors → % likelihood) | `arcade` |
| **Science (19 domains)** | | |
| Waves, Light & Sound | `sound` (force vs tension) + `light` (shadow length) + **`optics3d`** (Three.js 3D light, shadow & material optics studio) | `decision` |
| Forces & Motion | `forces` (ramp height × surface friction) | — |
| Energy | `circuit` (batteries × bulbs) | `decision` |
| Matter & Materials | `states` (−20 °C to 120 °C particle simulator) | `sorter` |
| Earth's Systems | `watercycle` + **`diorama3d`** (`earth` crust→core 3D cutaway) | `sorter` |
| Weather & Climate | `watercycle` (evaporation, cooling, rain & runoff) | `sequence` + `sorter` |
| Ecosystems & Habitats | `ecosystem` (sunlight → producers → consumers) + **`diorama3d`** (`biome`) | `sorter` |
| Animals of the World | `ecosystem` + **`diorama3d`** (`biome`) | `sorter` |
| Insects & Minibeasts | `ecosystem` (pollinator garden lab) | `sorter` |
| Ocean Life | `ecosystem` + **`diorama3d`** (`ocean` sunlit→midnight zones) | `sorter` |
| Polar Regions | `states` (sea-ice freezing/melting lab) + **`diorama3d`** (`biome`) | `sorter` |
| Rainforests | `ecosystem` (canopy biodiversity lab) + **`diorama3d`** (`biome`) | `sorter` |
| Organisms & Life Processes | `ecosystem` (energy & life processes lab) | `sequence` + `sorter` |
| The Human Body | `humanbody` (heart rate, lung depth & oxygen flow) | `sorter` |
| Dinosaurs & Paleontology | `timemachine` (deep-time fossil finder) + **`diorama3d`** (`fossil` strata) | `sequence` |
| Space Systems & Earth's History | **`spatial3d`** (Three.js cel-shaded Earth/Sun/Moon day & night) | — |
| Space Exploration | **`solar3d`** (Three.js 3D Solar System orbital tour) | — |
| Scientific Inquiry | `fairtest` (two-pot controlled variable bench) | `decision` |
| Volcanoes & Earthquakes | **`volcano3d`** (Three.js 3D magma pressure & tectonic plates) | `decision` |
| Design & Technology | `forces` (prototype test ramp) | `sequence` |
| **English (9 domains)** | | |
| English Thinking | `storybook` (Stage-Lit Paper Theatre retellings with owl think-alouds) + `wordwave` | `decision` |
| Grammar & Punctuation | `wordwave` (sentence cadence & endings) | `doctor` |
| Handwriting & Transcription | `wordwave` (word spacing & chunks) | `worksheet` |
| Phonics & Word Reading | `wordwave` (syllable & sound wave studio) | `word-builder` + `arcade` |
| Reading Comprehension | `wordwave` | `sequence` |
| Speaking & Listening | `wordwave` | `sequence` |
| Spelling & Word Study | `wordwave` (morpheme chunker) | `word-builder` + `doctor` |
| Vocabulary | `wordwave` (root + affix lab) | `memory` |
| Writing Composition | `wordwave` | `sequence` |
| **Computing (6 domains)** | | |
| Algorithms & Programming | `codeturtle` (grid robot turtle with step & repeat loops) | `sequence` |
| Data Representation | `binarylab` (4-bit `8-4-2-1` binary switches & decoder) | `memory` |
| Artificial Intelligence | `binarylab` (feature encoder) | `decision` |
| Digital Systems | `circuit` (hardware power & I/O lab) | `sorter` |
| Creating Digital Solutions | `codeturtle` (prototype path tester) | `sequence` |
| Digital Tools & Collaboration | `binarylab` (signal packet lab) | `decision` |
| **Geography (2 domains) & History (6 domains)** | | |
| Maps & Spatial Skills | `coordgrid` (map grid coordinates & compass bearings) + **`diorama3d`** (`landform`) | `sorter` |
| Places & Environments | `watercycle` (climate & landscape lab) + **`diorama3d`** (`landform`) | `sorter` |
| Ancient Egypt | `timemachine` + **`diorama3d`** (`civilization`) | `sequence` + `sorter` |
| Ancient Greece & Rome | `timemachine` + **`diorama3d`** (`civilization`) | `sequence` + `sorter` |
| Medieval Times | `timemachine` + **`diorama3d`** (`civilization`) | `sequence` + `sorter` |
| Family & Community History | `timemachine` (generations time dial) | `sequence` |
| Modern History | `timemachine` + **`diorama3d`** (`civilization`) | `sequence` |
| Historical Thinking | `timemachine` (primary source & artifact dial) | `sequence` |
| **Life Skills (3 domains), PSD (6 domains) & Learning to Learn (1 domain)** | | |
| Money & Finance | `marketlab` (earn, save & spend budget scale) | `decision` |
| Entrepreneurship | `marketlab` (venture revenue & reinvestment lab) | `decision` |
| Food & Cooking | `balance` (kitchen portion & nutrition scale) | `sequence` |
| Emotional Literacy | `mindgarden` (breathing pacemaker & calm studio) | `decision` + `sorter` |
| Empathy & Social Awareness | `mindgarden` | `decision` |
| Friendship & Cooperation | `balance` (fairness & sharing scale) | `decision` + `sorter` |
| Responsible Decision-Making | `mindgarden` | `decision` |
| Self-Regulation & Resilience | `mindgarden` | `decision` |
| Self-Awareness | `mindgarden` | `decision` |
| Learning to Learn | `mindgarden` (brain growth & deliberate practice lab) | `decision` |

## 2. Per-age spiral isolation (Ages 5–10 / K–G5)

1. **Primary school scope**: Only Ages `5, 6, 7, 8, 9, 10` (`K` to `G5`) are generated (**304 courses**). Pre-K (`Age 4`) and middle school (`Ages 11–13`) are excluded.
2. **Strict same-age topic isolation**: Each course pulls topics, evidence statements, misconceptions, Wonder Cards, and POE Mission items exclusively from `t.ageRangeStart === course.age`. Zero cross-age borrowing occurs anywhere in `tools/lib/derive.mjs`.
3. **Six-age interactive differentiation**: `tools/lib/age-curriculum.mjs` specializes every explore lab, 3D world, sorter, sequence, decision quest, sentence clinic, memory grid, word-builder, worksheet, storybook, and arcade sprint by exact age (`5..10`), verified at build time by `tools/validate-content.mjs` and `tools/audit/age-fit.mjs`.

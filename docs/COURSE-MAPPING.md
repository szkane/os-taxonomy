# COURSE-MAPPING — how every course got its gameplay

The taxonomy has 41 unique (subject, domain) pairs across 176 clusters. Each pair maps to one **primary** gameplay matched to the domain's cognitive demand, plus up to two **universal** modes derived from data for every course. Authoring lives in `tools/lib/mapping.mjs`; this document explains the decisions.

## 1. Domain → gameplay map

| Domain | Primary mode(s) | Rationale |
| --- | --- | --- |
| **Mathematics** | | |
| Addition & Subtraction | concept-lab `counters` + arcade | Continuous composition of two groups; arrays of apples make the sum visible |
| Multiplication & Division | concept-lab `array` + arcade | Rows × columns is the canonical multiplication representation |
| Fractions | concept-lab `fractions` + arcade | Pizza partitioner shows equal-parts requirement; arcade drills comparison |
| Number Representation & Place Value | concept-lab `placevalue` + arcade | Base-10 blocks expose digit worth |
| Counting & Cardinality | concept-lab `counting` + arcade | Filling a jar counts one-by-one; last-number rule |
| Geometry | concept-lab `shape` + arcade | Sides/corners grow together; naming facts |
| Measurement | concept-lab `measure` + arcade | Ruler alignment from zero |
| Data & Statistics | concept-lab `databar` + arcade | Four editable bars; winner/difference questions |
| Algebra | concept-lab `pattern` + arcade | Start+jump bead machine = rule finding |
| Ratio & Proportion | concept-lab `fractions` (ratio framing) + arcade | Ratios as fair shares of a whole |
| Mathematical Thinking | concept-lab `pattern` + arcade | Odd-one-out / pattern-rule banks |
| **Science** | | |
| Waves, Light & Sound | concept-lab `sound` (all ages) + `light` (8+) + decision | Drum force vs skin tightness isolates volume from pitch (a documented misconception); torch distance → shadow length |
| Forces & Motion | concept-lab `forces` | Ramp height vs surface roughness = gravity vs friction |
| Energy | concept-lab `circuit` + decision | Batteries/bulbs power-sharing; electrical safety dilemmas |
| Matter & Materials | concept-lab `states` + sorter | Temperature dial crosses 0°C/100°C; material property bins |
| Earth's Systems | sorter | Land/water/air systems sorting (incl. tricky glacier case) |
| Weather & Climate | sequence (water cycle) + sorter | Cycle ordering is the core model; weather clothing bins |
| Ecosystems & Habitats | sorter | Habitat bins with adaptation clues |
| Animals of the World | sorter | Mammal/bird/fish/reptile classification |
| Ocean Life | sorter | Shallows/open/deep ocean layers |
| Organisms & Life Processes | sequence (butterfly, cycle) + sorter | Life-cycle stages; living vs never-alive |
| The Human Body | sorter | Organ system "teams" |
| Dinosaurs & Paleontology | sequence (fossilization, linear) | 100-million-year process, step by step |
| Space Systems & Earth's History | **spatial3d** + mission | Spin-the-Earth day/night construction task (genuinely 3D: rotation, terminator, viewpoint) |
| Space Exploration | solar3d (3D solar tour) + mission | Tap planets on cel-shaded orbits, read facts, answer by selecting and committing |
| Scientific Inquiry | decision | Fair-test dilemmas (change one variable) |
| Volcanoes & Earthquakes | volcano3d (3D pressure lab) + decision (safety) + universal | Raise magma pressure, watch glow/tremble/eruption; safety dilemmas |
| **English** | | |
| Grammar & Punctuation | doctor (band-specific patients) | Spot-and-heal capitals/periods/commas/tense — injuries look normal; the diagnosis is the task |
| Handwriting & Transcription | worksheet (print) | A4 trace cells; screen cannot replace pencil practice |
| Phonics & Word Reading | arcade (phonics bank) | Digraph/blending pops |
| Reading Comprehension | sequence (story retell) | 5-part structure ordering (Three Little Pigs) |
| Speaking & Listening | sequence (conversation) | Turn-taking structure |
| Spelling & Word Study | word-builder + doctor | Constructing the word from scrambled letters; healing misspellings |
| Vocabulary | memory (word ↔ meaning pairs) + flashcards | Pair-matching builds word–meaning links without quiz pressure |
| Writing Composition | sequence (story structure) | Hook→problem→attempts→turn→ending |
| **Personal & Social Development** | | |
| Emotional Literacy | decision + sorter | Feelings scenarios with mood meters; comfortable/uncomfortable sort |
| Empathy & Social Awareness | decision | Perspective-taking dilemmas |
| Friendship & Cooperation | decision + sorter | Trade-off choices; builds/wears-down sort |
| Responsible Decision-Making | decision | Integrity/safety dilemmas |
| Self-Regulation & Resilience | decision | Calm-down strategy choices |
| **History** | | |
| Ancient Egypt | sequence (timeline) + sorter (then/now) | Chronology is the core skill; then/now classification |

Distribution after generation: every course has ≥2 modes; most have 3–4, several have 5. The engine fleet spans 14 mechanics (concept-lab, mission, flashcards, sorter, sequence, arcade, decision, doctor, worksheet, spatial3d Earth, solar3d, volcano3d, memory, word-builder). Arcade sprints are restricted to genuine fluency domains (math facts, phonics) so no single mechanic dominates. The mission check (independent assessment) is present on 169/176 courses — the exceptions are single-topic clusters whose primary mode carries its own committed assessment instead (3D commits, lab commits).

## 2. PYP metadata derivation (honest "suggested framing")

The taxonomy contains no IB metadata, so the site derives it and **labels it "suggested"** on every page:

- **Transdisciplinary theme** by subject: Science & Mathematics → *How the world works*; English → *How we express ourselves*; History → *Where we are in place and time*; PSD → *Who we are*.
- **Central idea**: hand-authored per domain (see `mapping.mjs`), phrased as an enduring understanding.
- **Lines of inquiry**: template-derived from the domain and the two most central topics.
- **Key concepts / Learner profile / ATL**: subject-level defaults (e.g. Science → Causation/Function/Change; Inquirers, Thinkers; Thinking + Research skills). Decision-mode courses reinforce profile attributes in their feedback ("Caring move!", "Principled choice!").

Schools should align these with their programme of inquiry — the page states this explicitly under the UOI card.

## 3. Assessment model (marble interaction-design)

- **concept-lab**: predict → commit → reveal. The child sets dials to match a described scenario and commits; wrong commits describe the missing relationship (after two misses, the support hint appears — scaffold fading). Rules are a serializable DSL (`sum`, `product`, `allEqual`, `whole`, `lt`, `atLeast`, `between`, `digits`, `diff`, `affine`).
- **mission**: fresh discrimination items; first-try results are tracked separately from assisted retries; the end screen reports *session evidence*, never a grade.
- **spatial3d**: construction assessment — the child rotates Earth to place a city in day/night; truth is computed live from the scene's sun vector.
- **sorter / sequence / doctor**: check actions with targeted misconception-based feedback ("That belongs to…").
- **decision**: formative only — every choice moves meters and explains the trade-off.

## 4. Vocabulary popover lexicons

Each domain contributes 2–8 age-appropriate definitions (merged with a shared lexicon of 9 general terms). The runtime marks known terms with dashed underlines in *non-interactive* text only; buttons never carry triggers (enforced by only enriching the instruction slot and cover question).

## 4b. Child-first presentation (age-differentiated)

- The course page shows the child ONLY the stage; UOI framing, learning goals and research notes live behind the "👩‍🏫 Grown-ups" toggle (hidden by default, stripped from print).
- `data-band` on the stage changes densities: early (5–6) gets larger type, bigger tabs, ≤8 flashcards, ≤4 mission questions, 3-column memory grid and throttled auto read-aloud; upper gets full decks and longer prompts.
- TTS auto-speak is early-band only, throttled centrally in core.js; mid/upper bands use the 🔊 button next to the instruction; a 🔇 toggle mutes everything (persisted).

## 5. Language calibration

- All child-facing copy is English, sentence case (Baloo 2 house style on the stage).
- Early band (5–6): instructions auto-speak via TTS; prompts ≤10 words where possible; emoji-supported nouns.
- Mid band (7–8): 8–14 word prompts, concrete cause-effect ("Big vibrations are loud; tight skins are high").
- Upper band (9–10): multi-step cases and precise vocabulary introduced in context.
- Case prompts are authored once in accessible language that stays within band limits; the early band additionally gets auto-read-aloud.

## 6. Coverage of the taxonomy (measured, not assumed)

Measured against `data/topics.json` (1,838 topics) and `data/clusters.json` (176 clusters):

| Population | Count | Status on the site |
| --- | --- | --- |
| Curated course clusters (subject × domain × age with a parent summary) | 176 | **100% shipped** — every cluster is a course page |
| Topics inside those clusters | 1,099 (60%) | All appear as course learning goals, flashcards and mission material |
| Topics outside clusters — ages 11–13 (beyond PYP G5) | 308 | Not shipped: middle-school extension (Science/Math/History) |
| Topics outside clusters — ages 4–10, primary-age | 431 | Not shipped, see below |

The 431 primary-age unclustered topics include four entire subjects with no clusters at all (Computing 51, Life Skills 43, Geography 22, Learning to Learn 18) and popular domains such as Polar Regions, Rainforests, Insects, Ancient Greece & Rome, Medieval Times, Money & Finance and AI. They live in (subject, domain, age) combos that the taxonomy authors did not curate with a parent summary, so the site cannot yet offer them the same course experience. Expanding the site to those combos would mean auto-deriving course framing without the curated summary — a deliberate product decision recorded here rather than silently degrading quality.

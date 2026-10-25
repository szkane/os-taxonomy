# AGENT.md — PYP Marble Courses site

Guide for AI agents and collaborators. Goal: turn all primary-school courses in this repo's `data/` directory (**304 primary-school courses across 66 domains, Ages 5–10 / Kindergarten to Grade 5**) into **independent web pages**, aggregated into one complete website, output to `src/`, auto-deployable to GitHub Pages or Cloudflare Pages on push.

## 0. Language convention

**All project outputs are written in English**: documentation, child-facing site copy, code comments, commit messages, and this file. Source data is English; the site audience is international IB PYP.

## 1. Architecture in one sentence

> **Site framework / navigation / unit metadata = IB PYP (Neobrutalism style); each course page's interactive "stage" = Marble-style playful learning experience.**

- Page skeleton, nav, UOI unit card, filters/aggregation: from the `ib-pyp-html5-generator` skill (Neobrutalism: 3.5px black borders, 4px hard shadows, candy colors, ≥44px touch targets).
- The interactive stage inside each course: from the `marble-builder` skill (Baloo 2 font, big question cover, one title + one instruction at a time, dashed-underline vocabulary cards, explore→challenge flow, visual-first feedback).
- The two systems are **physically separated**: `.pyp-chrome` (page shell) and `.marble-learning` (stage) each own their design tokens and never override each other. See `docs/DESIGN-FUSION.md`.

## 2. Directory structure

```
data/                    # This repo's raw course data (do not modify)
  topics.json            #   1,838 learning topics (evidence = "I can…", assessmentPrompt)
  clusters.json          #   176 course clusters (subject × domain × ageRangeStart + parent summary)
  dependencies.json      #   3,878 prerequisite edges
  teaching-research.json #   1,049 research records (activities / misconceptions / distractor / poeTask)
  manifest.json          #   Dataset manifest and licensing
tools/                   # Site generator (Node ESM, not part of the deployable output)
  build-site.mjs         #   Entry: node tools/build-site.mjs  (cleans and rebuilds src/)
  validate-content.mjs   #   Machine validator run automatically at the end of npm run build:site
  audit/age-fit.mjs      #   Standing audit verifying band & per-age progression across all 66 domains
  lib/mapping.mjs        #   66 domain → gameplay/scene/question mapping + CHILD_GLOSS vocabulary
  lib/lab-cases.mjs      #   Band-specific lab cases (early / mid / upper)
  lib/band-modes.mjs     #   Band-tiered game content across sorter, sequence, decision, memory, doctor, 3D
  lib/age-curriculum.mjs #   Per-age (5..10) simulation resolver, 3D worlds, and per-age mode specialization
  lib/derive.mjs         #   Cluster → course derivation (strictly same-age topics, zero cross-age leakage)
  lib/pages.mjs          #   HTML templates (hub + course page)
src/                     # Generated output = deployable static site (committed to the repo)
  index.html             #   Aggregation hub (subject/grade filters K–G5, course cards)
  courses/*.html         #   304 primary-school courses (Ages 5–10), one standalone HTML each
  assets/css/            #   pyp.css (shell) + stage.css (stage)
  assets/js/             #   core.js + scenes.js (32 Canvas/Konva scenes) + cover-art.js + story-actors.js
  assets/js/engines/     #   18 interactive engines (12 2D + 6 Three.js 3D engines)
  assets/vendor/         #   Local vendored bundles: three.min.js, konva.min.js, rough.min.js, lottie.min.js
  assets/fonts/          #   Baloo 2 variable (SIL OFL, OFL.txt included)
  data/courses.js        #   Full course index for the hub (loaded via <script>, works on file://)
docs/                    # Product / architecture / mapping / deployment docs for this site
.github/workflows/       # GitHub Pages auto-deploy (publishes src/)
```

**Key convention**: `src/index.html`, `src/courses/*.html`, and `src/data/courses.js` are **generated artifacts** — to change content, edit `tools/lib/*.mjs` or `src/assets/**`, then run `npm run build:site`. Never hand-edit `src/courses/*.html`.

## 3. Common commands

```bash
npm run build:site             # Rebuild src/ (304 course pages + hub) and run tools/validate-content.mjs
node tools/audit/age-fit.mjs   # Audit band & per-age curriculum fit across all 304 courses / 66 domains
npm run serve:site             # Local static server on http://localhost:4173
npm test && npm run validate   # Original taxonomy data test suite & schema validation
```

## 4. Primary school scope & zero cross-grade leakage (binding)

1. **Primary school only (Ages 5–10 / Kindergarten to Grade 5)**:
   - The site targets primary school students strictly: Age 5 (`K`), Age 6 (`G1`), Age 7 (`G2`), Age 8 (`G3`), Age 9 (`G4`), and Age 10 (`G5`) — **304 courses across 66 domains**.
   - Pre-K (`age === 4`) and middle-school (`age >= 11`) topics are excluded at derivation (`tools/lib/derive.mjs`) and rejected by `tools/validate-content.mjs`.
   - Grade filter chips on the hub (`src/index.html`) are ordered pedagogically: `K (age 5)`, `G1 (age 6)`, `G2 (age 7)`, `G3 (age 8)`, `G4 (age 9)`, `G5 (age 10)`.
2. **Zero cross-age borrowing**:
   - Every course (`subject × domain × age`) derives its topics, Wonder Cards (`flashcards`), POE Mission (`mission`), and per-age mode specializations **strictly from `t.ageRangeStart === age`**.
   - Lower-grade content never leaks into higher-grade courses, and higher-grade content never leaks down into lower-grade courses.
   - When an age cluster has fewer than 4 topics, `buildAgeFlashcardDeck` and `buildMissionBank` in `tools/lib/derive.mjs` expand cards and inquiry questions strictly from **that exact age's own `evidence[]` statements and `teaching-research.json` activities/errorPatterns** — never by borrowing adjacent-age topics.
3. **Six-level per-age spiral differentiation (Ages 5, 6, 7, 8, 9, 10)**:
   - While UI density and reading-length caps are governed by developmental bands (`early` 5–6, `mid` 7–8, `upper` 9–10), **interactive content is differentiated at every single age (`5, 6, 7, 8, 9, 10`)** via `resolveAgeExploreModes` and `specializeModeForAge` in `tools/lib/age-curriculum.mjs`.
   - Both `tools/validate-content.mjs` (`checkAgeAndBandDistinctness`) and `tools/audit/age-fit.mjs` (`F9`) fingerprint all 18 engines across every `(subject, domain, engine)` group and fail if any two ages (`5..10`) or bands (`early, mid, upper`) share identical content.

## 4b. IB PYP Explore-First pedagogy & engine interaction architecture (binding)

1. **Universal Explore-First simulation opener**:
   - Every single course (`304/304`) opens with a visual **Explore-First simulation** (`phase: 'explore'`) — a Konva/Canvas 2D `concept-lab` simulation and/or a Three.js 3D world (`spatial3d`, `solar3d`, `volcano3d`, `geometry3d`, `optics3d`, `diorama3d`).
   - `tools/validate-content.mjs` enforces `course.modes[0].phase === 'explore'` across all 304 courses.
2. **Two-step `🔭 Explore → Challenge` flow inside every game engine**:
   - Exploration always precedes testing, not only at the course level but **inside every individual game engine**:
     - **`concept-lab` & all 6 Three.js 3D engines (`spatial3d`, `solar3d`, `volcano3d`, `geometry3d`, `optics3d`, `diorama3d`)**: open on the `[🔭 Explore]` tab (`activeCase = -1`) with commit hidden so children can freely manipulate dials, orbit 3D models, and inspect live readouts before selecting `Case 1..N`.
     - **`sorter`**: opens with `[🔭 Explore items] [🧺 Sort challenge]` tabs. In Explore mode, tapping any item card opens an **Inquiry Spotlight card** explaining why it belongs to its category and speaking it aloud; switching to Challenge mode hides the answers for sorting (and placed bin chips can be tapped to return to the tray before checking).
     - **`sequence`**: opens with `[🔭 Explore stages] [🧩 Build order]` tabs. In Explore mode, children step through the ordered stages (`◀ Previous` / `Next ▶`) with a Stage Explorer spotlight card explaining each step's causal connection; in Challenge mode, cards are shuffled for ordering (and placed slot cards can be tapped to un-place).
     - **`doctor`**: opens with a `[🔭 Explore rules]` tab (`patient = -1`) where children can tap sample injured words to see how bandages heal capitalization, punctuation, or word-choice errors before diagnosing `Patient 1..N`.
     - **`decision`**: opens with `[🔭 Explore meters] [🧭 Choice quest]` tabs. In Explore mode, children test sample choices in a **Meter Sandbox** to see how actions raise or lower well-being meters before starting the multi-scene quest.
     - **`memory`**: opens with `[🔭 Meet the pairs] [🃏 Match game]` tabs so children can inspect and listen to connected pairs face-up before playing the flip-and-match memory game.
     - **`word-builder`**: opens with a `[🔭 Explore words]` tab (`idx = -1`) displaying all target words as interactive tiles (tapping speaks the word and shows its phonics/morpheme hint) before building `Word 1..N` from scrambled letters.
3. **Inquiry Wonder Cards (`flashcards.js`)**:
   - Framed as **Inquiry Wonder Cards** rather than rote definition flashcards:
     - Front: `🤔 Wonder card X of Y — what do you notice about…` + concept title + `🔍 Tap to flip & discover`.
     - Back: `💡 Discovery` explanation + `🔬 Try noticing:` real-world observation prompt + `🔊 Listen`.
4. **Predict-Observe-Explain (POE) Inquiry Mission & IB Learner Profile Reflection (`mission.js`)**:
   - Every mission question uses an inquiry/POE prompt (`q.prompt`) paired with a visible `🎯 Inquiry focus: <concept>` badge (`.mission-concept-badge`).
   - Literal self-matching (`q.prompt === correctChoice.text`) is forbidden and fails the build in `tools/validate-content.mjs`.
   - Distractors are constructed from same-age sibling evidence and `teaching-research.json` `errorPatterns` misconception traps, with targeted `why` coaching on every choice.
   - Upon completing a mission, the finish card renders an interactive **IB Learner Profile Reflection** box (`.mission-reflect-box`) where children tap how they learned today (`🔍 Inquirer`, `🧠 Thinker`, `🌱 Reflective`, `💬 Communicator`).

## 4c. Complete catalog of 18 game engines & 32 Canvas 2D scenes

### 18 Interactive Game Engines (`src/assets/js/engines/`)

| Engine | File | Phase | Used for |
| --- | --- | --- | --- |
| `concept-lab` | `engines/concept-lab.js` + `scenes.js` | `explore` | Universal 2D dial-the-world simulation on a Konva stage with eased dials, `air()` ambient particle layers, and Lottie solve bursts (32 scenes across all 66 domains) |
| `spatial3d` | `engines/spatial3d.js` | `explore` | Three.js cel-shaded Earth, Sun & Moon rotation and day/night terminator lab |
| `solar3d` | `engines/solar3d.js` | `explore` | Three.js interactive 3D Solar System orbital tour & planet inspector |
| `volcano3d` | `engines/volcano3d.js` | `explore` | Three.js 3D volcano cross-section & tectonic magma-pressure simulator |
| `geometry3d` | `engines/geometry3d.js` | `explore` | Three.js 3D solid geometry & polyhedra inspector (Cube, Triangular prism, Square pyramid, Cylinder, Cone, Sphere) with face/edge/vertex highlighting |
| `optics3d` | `engines/optics3d.js` | `explore` | Three.js 3D light, shadow & material optics studio (beam angle, opaque/translucent/transparent/mirror materials, live shadow projection) |
| `diorama3d` | `engines/diorama3d.js` | `explore` | Three.js 3D interactive layered world diorama supporting 6 themes: `earth` (crust→core), `ocean` (sunlit→midnight zones), `biome` (polar→tropical), `fossil` (rock strata), `landform` (peaks→coast), and `civilization` (ancient→digital eras) |
| `storybook` | `engines/storybook.js` + `story-actors.js` | `explore` | Stage-Lit Paper Theatre interactive reading books (Rough.js + 58 canvas-drawn Konva actors, mentor owl model stops + child comprehension stops) |
| `sorter` | `engines/sorter.js` | `understand` | Two-step category sorting (`🔭 Explore items` spotlight → `🧺 Sort challenge` bins) |
| `sequence` | `engines/sequence.js` | `understand` | Two-step ordering & cycles (`🔭 Explore stages` walkthrough → `🧩 Build order` timeline/cycle) |
| `decision` | `engines/decision.js` | `understand` | Two-step scenario dilemmas (`🔭 Explore meters` sandbox → `🧭 Choice quest` with live meters & Learner Profile badges) |
| `doctor` | `engines/doctor.js` | `understand` | Two-step sentence clinic (`🔭 Explore rules` demo → `Patient 1..N` diagnostic healing) |
| `flashcards` | `engines/flashcards.js` | `cards` | Inquiry Wonder Cards (`🤔 Wonder` → `💡 Discovery` + `🔬 Try noticing` + TTS read-aloud) |
| `arcade` | `engines/arcade.js` | `practice` | Band-calibrated fluency sprint (visible words + decorative emojis, early-band tap-to-speak) |
| `memory` | `engines/memory.js` | `practice` | Two-step pair matching (`🔭 Meet the pairs` face-up explorer → `🃏 Match game` grid) |
| `word-builder` | `engines/word-builder.js` | `practice` | Two-step word construction (`🔭 Explore words` phonics/morpheme tiles → `Word 1..N` letter builder) |
| `worksheet` | `engines/worksheet.js` | `practice` | Ruled English handwriting & vertical math print studio (`#print-sheet` A4 `@media print`) |
| `mission` | `engines/mission.js` | `consolidate` | POE / inquiry diagnostic check with `🎯 Inquiry focus` badge, misconception distractors, and **IB Learner Profile Reflection** |

### 32 Canvas 2D Simulation Scenes (`src/assets/js/scenes.js`)

- **Mathematics (18 scenes)**: `counters`, `tenframe` (make-10 bridge with animated dot jump), `numberline`, `numberlineXL` (to 1,000 / 10,000), `array`, `fractions` (pizza area model), `fractionline` (fraction bar ↔ 0–1 number line ↔ decimal ↔ percentage), `placevalue` (H/T/O blocks), `placevalue2` (Th/H/T/O blocks), `pvchart` (7-digit place-value chart to 9,999,999), `counting`, `shape`, `coordgrid` (2D `(x, y)` coordinate plane & `0°–360°` angle protractor), `measure` (30 cm ruler), `balance`, `clock` (synchronized analog + 24h digital clock with elapsed-time sector), `capacity` (dual 1,000 ml jugs + 3D `cm³` volume cube builder), `databar`, `pattern`, `spinner`.
- **Science (6 scenes)**: `sound`, `light`, `forces`, `circuit`, `states`, `humanbody` (beating heart, expanding lungs & oxygen particles), `watercycle` (sun evaporation, cloud condensation, rain & runoff), `ecosystem` (sunlight → producers → herbivores food-web balance), `fairtest` (two-pot controlled experiment comparing water vs light).
- **Computing (2 scenes)**: `codeturtle` (grid robot turtle executing step & repeat-loop algorithms), `binarylab` (4-bit `8-4-2-1` binary lightbulb switches with decimal & symbol decoder).
- **English (1 scene)**: `wordwave` (animated speech-wave & syllable/morpheme clapping studio).
- **History & Geography (1 scene)**: `timemachine` (5-era historical dial across Homes, Transport & Communication clues).
- **Life Skills, PSD & Learning to Learn (2 scenes)**: `marketlab` (earn, save & spend budget scale with piggy bank), `mindgarden` (breathing pacemaker ring & neural growth garden).

## 5. Course page structure (top to bottom)

1. `.nav-bar`: ← PYP Map hub link · subject/age tag · TTS accent dropdown · 🔊/🔇 read-aloud toggle · "👩‍🏫 Grown-ups" toggle.
2. **Marble stage** (`.marble-learning`): big-question cover + painted Paper-Theatre artwork + "Let's find out" → lesson (mode row with learning-journey chip `🔭💡🗂️⚡🎯` → single instruction bar → full-height play area).
3. Collapsible `.adult-panel` (`hidden` until "👩‍🏫 Grown-ups" is toggled; stripped on print): UOI framing card, "What you'll learn" topic evidence list, and "For grown-ups" research misconceptions & home POE activity.
4. Footer: data attribution (Marble Skill Taxonomy, ODbL / CC BY-SA) + Baloo 2 OFL + three.js MIT.

## 5b. Child-first page, lab honesty & readability contracts (binding)

1. **Child zone vs adult zone**: The course page shows ONLY the slim nav and the Marble stage by default; adult notes stay inside `adult-panel[hidden]`.
2. **Age bands change UI density (`data-band="early|mid|upper"`)**:
   - `early` (Ages 5–6 / K–G1): larger instruction type, ≤8 Wonder Cards with backs ≤110 chars, prompts ≤110 chars, 3-column memory grid, throttled auto read-aloud.
   - `mid` (Ages 7–8 / G2–G3): intermediate density and 8–14 word storybook sentence cap.
   - `upper` (Ages 9–10 / G4–G5): full decks, multi-step cases, 18-word storybook sentence cap.
3. **Lab honesty contract**:
   - Every lab and 3D engine starts in `🔭 Explore` (`activeCase = -1`) with the Commit button hidden.
   - During an unsolved case (`activeCase >= 0`), the live readout is replaced with `"🔍 Predict with the dials, then commit!"` so children reason from the visual representation.
   - No case may be pre-solved by the scene's initial dial values (machine-checked in `tools/validate-content.mjs`).
4. **Scene readability & 3D realism contract**:
   - Every 2D scene paints its own complete sky + ground background and maintains ≥3:1 contrast on all labels regardless of light/dark stage theme.
   - Every light-surface component (`.lab-dial`, `.lab-readout`, `.sorter-item`, `.explore-spotlight`, `.mission-concept-badge`, `.mission-reflect-box`, `.memory-pair-card`) forces dark ink (`color: var(--ml-ink)`) under `[data-ml-theme="dark"]` in `src/assets/css/stage.css`.

## 6. Verification & quality gates (run before every delivery)

1. `npm run build:site` — regenerates all 304 courses (`src/courses/*.html`), `src/index.html`, and `src/data/courses.js`, then runs `tools/validate-content.mjs`. Must exit `0` with **0 errors and 0 warnings**.
2. `node tools/audit/age-fit.mjs` — audits all 304 courses across all 66 domains for band tiering (`F1`), math representation ceilings (`F2`), cross-band mode distinctness (`F3–F6`), secondary lab coverage (`F8`), and per-age spiral distinctness (`F9`). Must report `Flag counts: {}`.
3. `npm test && npm run validate` — runs the 14 taxonomy unit tests and schema/DAG/checksum validator. Must pass 100%.

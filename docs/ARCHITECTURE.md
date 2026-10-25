# ARCHITECTURE — PYP Marble Courses

## Overview

A fully static, dependency-free website generated from the Marble taxonomy data for **primary school students (Ages 5–10 / Kindergarten to Grade 5 — 304 courses across 66 domains)**. No build step is required at deploy time — `src/` is the deployable artifact and is committed to the repository.

```
data/*.json  ──▶  tools/build-site.mjs  ──▶  src/ (304 courses + hub)
  (source)         (generator, Node ESM)        │
                        │                       └─▶ tools/validate-content.mjs
                        ├─ lib/mapping.mjs          (automated build gate)
                        ├─ lib/lab-cases.mjs
                        ├─ lib/band-modes.mjs
                        ├─ lib/age-curriculum.mjs
                        ├─ lib/derive.mjs
                        └─ lib/pages.mjs
```

## Data pipeline

| Input | Used for |
| --- | --- |
| `data/clusters.json` | Curated course cluster summaries (`subject × domain × ageRangeStart`) |
| `data/topics.json` | Learning goals per course (`ageRangeStart` 5..10): name, description, evidence ("I can…" statements), centrality |
| `data/teaching-research.json` | Misconceptions (`assess.errorPatterns`), POE tasks, activity titles |
| `data/dependencies.json` | Prerequisite DAG edges |

Derivation rules (`tools/lib/derive.mjs` + `tools/lib/age-curriculum.mjs`):

- **Primary School Filter**: Only `age >= 5 && age <= 10` (`K, G1, G2, G3, G4, G5`) are built (**304 courses**).
- **Zero Cross-Age Leakage**: Every course derives its topics, Wonder Cards (`buildAgeFlashcardDeck`), POE Mission (`buildMissionBank`), and per-age mode specializations (`resolveAgeExploreModes`, `specializeModeForAge`) strictly from `t.ageRangeStart === course.age`.
- **Universal Explore-First Opener**: Every course's `modes[0]` has `phase: 'explore'` (`concept-lab`, a Three.js 3D world, or `storybook`).
- **Payload**: Each course page embeds its full JSON payload inline (`<script id="course-data" type="application/json">`), so pages work offline and from `file://`.

## Runtime architecture (`src/assets/`)

```
js/core.js             TTS_MANAGER (accent dropdown, localStorage, follow-along word highlight)
                       SoundFX (Web Audio synthesizer, unlocked on first gesture, silent on load)
                       vocab (dashed-underline popover: one at a time, Esc/outside/close)
                       PYP.stage (cover → lesson → mode tabs → engine mount → replay)
js/scenes.js           32 Canvas/Konva 2D simulation scenes (eased dials + air() ambient layer)
js/cover-art.js        Rough.js + canvas subject prop kits for Stage-Lit Paper Theatre covers
js/story-actors.js     58 canvas-drawn character/prop painters for storybook.js
js/engines/*.js        18 engines registered on window.PYP.engines:
                         2DExplore:  concept-lab, storybook
                         3DExplore:  spatial3d, solar3d, volcano3d, geometry3d, optics3d, diorama3d
                         Understand: sorter, sequence, decision, doctor
                         Cards:      flashcards (Inquiry Wonder Cards)
                         Practice:   arcade, memory, word-builder, worksheet
                         Consolidate: mission (POE inquiry check + IB Learner Profile reflection)
vendor/*.min.js        Locally vendored three.min.js, konva.min.js, rough.min.js, lottie.min.js
```

## File responsibilities in `src/`

| Path | Generated? | Purpose |
| --- | --- | --- |
| `index.html` | ✅ generated | Hub: 304 primary-school cards, subject & K–G5 grade chips, search |
| `courses/*.html` | ✅ generated | 304 standalone course pages (Ages 5–10) |
| `data/courses.js` | ✅ generated | Course index for the hub (`window.PYP_COURSES`) |
| `assets/css/pyp.css` | hand-maintained | IB-PYP shell (Neobrutalism) |
| `assets/css/stage.css` | hand-maintained | Marble stage + 18 engines (scoped under `.marble-learning`) |
| `assets/js/**` | hand-maintained | Core runtime, 32 2D scenes, 18 engines, cover/story art |
| `assets/vendor/**` | vendored | Local Three.js, Konva, Rough.js, Lottie-web (zero CDN requests) |
| `assets/fonts/` | vendored | Baloo 2 variable font + OFL license |

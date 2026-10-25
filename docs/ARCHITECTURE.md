# ARCHITECTURE — PYP Marble Courses

## Overview

A fully static, dependency-free website generated from the taxonomy data. No build step is required at deploy time — `src/` is the deployable artifact and is committed to the repository.

```
data/*.json  ──▶  tools/build-site.mjs  ──▶  src/
  (source)         (generator, Node ESM)      (committed static site)
                       │
                       ├─ lib/mapping.mjs    hand-authored domain content (source of truth for gameplay)
                       ├─ lib/derive.mjs     data extraction + course derivation + quiz/deck generation
                       └─ lib/pages.mjs      HTML templates (course page, hub)
```

## Data pipeline

| Input | Used for |
| --- | --- |
| `data/clusters.json` | The 176 "courses" (subject × domain × ageRangeStart + parent summary) |
| `data/topics.json` | Learning goals per course: name, description, evidence ("I can…" statements), centrality |
| `data/teaching-research.json` | Misconceptions (`assess.errorPatterns`), POE tasks, activity titles for the grown-ups section |
| `data/dependencies.json` | Available for prerequisite-aware ordering (not yet used by the site; reserved) |

Derivation rules (`lib/derive.mjs`):

- **Slug**: `{age}-{domain-slug}` (subject appended only on collision), e.g. `8-fractions.html`.
- **Grade**: age 5→K, 6→G1 … 10→G5.
- **Mission bank**: for each topic, a question "Which one belongs to X?" whose correct choice is the topic's evidence and whose distractors are the two *most semantically distinct* sibling topics' evidence (Jaccard-based selection). Small clusters borrow sibling topics from adjacent-age clusters of the same domain. First attempts are recorded separately from assisted retries in the engine.
- **Flashcard deck**: course topics (front = name, back = trimmed description + one "Try it" evidence line).
- **Arcade**: generated per band (early ≤6, mid 7–8, upper 9–10) for math domains; static researched banks for phonics/spelling/vocabulary/grammar/space.
- **Payload**: each course page embeds its full JSON payload inline (`<script id="course-data" type="application/json">`), so pages work from `file://` (no fetch/CORS) and never block on network.

## Runtime architecture

```
core.js        TTS_MANAGER (accent dropdown, localStorage, EN-fallback)
               SoundFX (Web Audio, unlocked on first gesture, silent on load)
               vocab (dashed-underline popover: one at a time, Esc/outside/close)
               PYP.stage (cover → lesson → mode tabs → engine mount → replay)
scenes.js      14 canvas scene renderers for concept-lab (flat color + ink outline)
engines/*.js   14 engines (concept-lab, mission, flashcards, sorter, sequence,
               arcade, decision, doctor, worksheet, spatial3d, solar3d, volcano3d,
               memory, word-builder), registered on PYP.engines; each implements
               constructor(root, config, ctx) + destroy(); ctx = {instruct, sfx, tts, course}
vendor/three.min.js  three.js r186 + OrbitControls bundled locally by esbuild (no CDN);
                     referenced only by pages whose course maps to spatial3d
```

Engine contract:

- Engines render **inside** `.ml-playarea` and never touch the shell.
- All feedback goes through `ctx.instruct(text)` which **replaces** the single instruction slot (marble rule: no appended feedback cards).
- Challenges initialize with zero pre-selection; case tabs reset unsolved cases; submitting incomplete work shows a warm nudge, never a penalty.
- `destroy()` must cancel timers/listeners (mode switches and replay call it).

## File responsibilities in `src/`

| Path | Generated? | Purpose |
| --- | --- | --- |
| `index.html` | ✅ generated | Hub: 176 cards, subject/grade chips, search |
| `courses/*.html` | ✅ generated | One standalone page per course |
| `data/courses.js` | ✅ generated | Course index for the hub (`window.PYP_COURSES`) |
| `assets/css/pyp.css` | hand-maintained | IB-PYP shell (Neobrutalism) |
| `assets/css/stage.css` | hand-maintained | Marble stage + engines (scoped under `.marble-learning`) |
| `assets/js/core.js`, `scenes.js`, `engines/*.js` | hand-maintained | Runtime (core owns TTS policy, vocab popover, stage controller; course pages are child-first with an adult panel behind a toggle) |
| `assets/vendor/three.min.js` | bundled once | Local three.js (MIT notice in `LICENSE-three.txt`) |
| `assets/fonts/` | vendored | Baloo 2 variable font + OFL license |

## Constraints honored

- All asset references are **relative** (`../assets/...`), so GitHub Pages subpath serving works unmodified.
- No network requests at runtime except none — fonts, scripts, data are all local; TTS uses the browser's speechSynthesis.
- No child data collection; the only localStorage key is `ib_pyp_voice_name`.
- `npm run build:site` is idempotent and regenerates only `index.html`, `courses/`, `data/`.

# IB-ALIGNMENT — the inquiry cycle across every course page

How the site maps IB PYP's inquiry approach onto a child-facing structure across all **304 primary-school courses (Ages 5–10 / K–G5)**.

## 1. The cycle, in child terms

PYP's inquiry cycle (tuning in → finding out → sorting out → going further → reflecting/acting) is expressed as **five visible phases** on every course page:

| Phase | Child-facing meaning | Engines | Tab examples |
| --- | --- | --- | --- |
| 🔭 **Explore** | Play freely with a visual simulation or 3D world; notice how it responds before any challenge | `concept-lab` (32 2D scenes), `spatial3d`, `solar3d`, `volcano3d`, `geometry3d`, `optics3d`, `diorama3d`, `storybook` | "Explore the lab", "3D solid inspector", "3D earth layers" |
| 💡 **Understand** | Make sense of it — explore items/stages/rules first, then sort, order, decide, or heal | `sorter`, `sequence`, `decision`, `doctor` | "Sort it out", "Build the timeline", "Choice quest", "Sentence clinic" |
| 🗂️ **Wonder Cards** | Spark curiosity with `🤔 Wonder` → `💡 Discovery` + `🔬 Try noticing` (reads aloud on flip) | `flashcards` | "Word cards" |
| ⚡ **Practice** | Make it stick — explore pairs/words first, then build fluency and construction | `arcade`, `memory`, `word-builder`, `worksheet` | "Speed sprint", "Match the pairs", "Build the word", "Print & practice" |
| 🎯 **Consolidate & Reflect** | Show what you know via Predict-Observe-Explain (POE) inquiry checks + **IB Learner Profile Reflection** | `mission` | "Show what you know" |

## 2. Two-level Explore-First architecture

Exploration prioritizes discovery over direct instruction at **two levels**:

1. **Course-level Explore opener (100% of 304 courses)**:
   - Every course (`304/304`) opens with a `phase: 'explore'` simulation mode (`concept-lab`, a Three.js 3D world, or an interactive `storybook`).
   - Static cards or quizzes never open a course (`validate-content.mjs` fails the build if `course.modes[0].phase !== 'explore'`).
2. **Engine-level `🔭 Explore → Challenge` tabs**:
   - Every interactive engine starts in an explicit discovery mode before asking the child to solve or check:
     - **`concept-lab` & all 6 Three.js 3D engines**: open on `[🔭 Explore]` (`activeCase = -1`) with Commit hidden.
     - **`sorter`**: `[🔭 Explore items]` (tap any card to open an Inquiry Spotlight explaining why it belongs to its group) → `[🧺 Sort challenge]`.
     - **`sequence`**: `[🔭 Explore stages]` (step through the ordered stages with causal explanations) → `[🧩 Build order]`.
     - **`doctor`**: `[🔭 Explore rules]` (interactive demo showing how bandages heal errors) → `[Patient 1..N]`.
     - **`decision`**: `[🔭 Explore meters]` (sandbox to test how choices move well-being meters) → `[🧭 Choice quest]`.
     - **`memory`**: `[🔭 Meet the pairs]` (inspect connected pairs face-up with audio) → `[🃏 Match game]`.
     - **`word-builder`**: `[🔭 Explore words]` (tap words to hear them and see phonics/morpheme chunks) → `[Word 1..N]`.

## 3. Inquiry Wonder Cards & POE Mission with Learner Profile Reflection

- **Inquiry Wonder Cards (`flashcards.js`)**:
  - Cards open with a curiosity prompt (`🤔 Wonder card X of Y — what do you notice about…`) and flip to reveal `💡 Discovery` plus an actionable `🔬 Try noticing` observation prompt.
- **POE / Inquiry Mission (`mission.js`)**:
  - Every mission question asks an age-calibrated inquiry question (`q.prompt`) paired with a `🎯 Inquiry focus` concept badge, never a literal self-matching string (`q.prompt !== correctChoice.text`).
  - Distractors come from same-age sibling concepts and researched misconception traps (`errorPatterns`), with constructive `why` explanations on every choice.
  - On completion, children reflect on their learning using interactive **IB Learner Profile** chips (`🔍 Inquirer`, `🧠 Thinker`, `🌱 Reflective`, `💬 Communicator`).

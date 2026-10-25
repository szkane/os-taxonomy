# IB-ALIGNMENT — the inquiry cycle across every course page

How the site maps IB PYP's inquiry approach onto a child-facing structure, what was optimized in this pass, and what remains.

## 1. The cycle, in child terms

PYP's inquiry cycle (tuning in → finding out → sorting out → going further → reflecting/acting) is expressed as **four phases children can see**:

| Phase | Child-facing meaning | Engines | Tab examples |
| --- | --- | --- | --- |
| 🔭 **Explore** | Play freely, notice how the world responds | concept-lab (Explore tab), 3D scenes | "Explore the lab", "3D solar tour" |
| 💡 **Understand** | Make sense of it — sort, order, decide, diagnose | sorter, sequence, decision, doctor | "Sort it out", "Build the timeline", "Choice quest", "Sentence clinic" |
| 🗂️ **Words** | Meet the words of this course (reads aloud on flip) | word gallery | "Word cards" |
| ⚡ **Practice** | Make it stick — fluency and construction | arcade, memory, word-builder, worksheet | "Speed sprint", "Match the pairs", "Build the word", "Print & practice" |
| 🎯 **Consolidate** | Show what you know, on your own | mission (renamed from "Mission check") | "Show what you know" |

Mechanics that enforce the cycle on every course page:

- **Mode tabs are ordered by phase** — lab/3D first, interactive understand games next, THEN word cards, then practice drills, and always the independent check last. A course must never open on static cards when it has a playable mode (measured: cards-first pages dropped from 216/317 to 46/317, and all 46 are cards-only or cards+mission minimal courses).
- **The learning-journey chip** (top of the stage) shows the phases this course offers; each dot fills in as the child plays it, each visited tab gains a ✓. Completing every phase triggers a celebration. No scores, no locks — pure visible progress.
- **Early band (4–6)** gets at most 4 modes (one per phase) and no second lab — four clear choices instead of a wall of tabs.
- Labs themselves follow predict → commit → reveal (see AGENT.md §5b2 lab honesty contract); the journey phase order preserves the explore-before-challenge sequence even inside a mode.

## 2. What this pass fixed (generalized across all 317 pages)

1. **Word answers were invisible in the arcade.** Every emoji choice rendered as a picture only (the word was screen-reader text) — for phonics questions like "which rhymes with cake?", a 4-year-old saw three pictures and no words. Now the **word is always visible**; the emoji decorates above it, never replaces it. In the early band, tapping a bubble also **speaks the word** (sound↔symbol connection).
2. **Mismatched/abstract emojis** in banks fixed (yarn🧶 for "mat" → hat🎩; mousetrap🪤 → bell🔔).
3. **Early-band language calibration is now machine-checked**: arcade prompts ≤110 chars, mission prompts ≤110 (previously evidence statements up to 170 chars reached 5-year-olds; they are now trimmed at sentence boundaries — measured ~60 chars after).
4. New content rules: emoji-only choices are a build error; duplicate sorter/sequence labels are build errors.
5. **Child-language audit (second pass)**: taxonomy names are teacher-worded, so every child-facing label now goes through the CHILD_GLOSS translation layer — 221 exact glosses + 39 pattern families + "(age N+)" suffix stripping (e.g. "Concurrent events in code" → "Two things at once"; "The Present Perfect Tense" → "I have done it already"; "Vocabulary: self" → "Words about me"). A band-split jargon stoplist makes teacher meta-language a build error everywhere, and upper-primary curriculum words an error on early/mid screens. Curriculum words children are actually taught (apostrophe, pronoun, fraction) stay, ideally with a plain hook.
6. **The instruction bar moved to the top of the stage** (under the mode row): the question leads, the play area follows — across desktop, iPad and narrow.

## 3. Per-domain interaction notes (what fits which age)

| Domain family | Explore | Understand | Practice | Consolidate |
| --- | --- | --- | --- | --- |
| Math concepts (fractions, place value, …) | dial-the-world lab | (cases live in the lab) | sprint / spinner drills | mission |
| Math early (counting, add/sub 4–6) | one lab only | — | shorter sprint (60s) | 4-question mission, trimmed prompts |
| Science systems (sound, light, circuits, states) | lab + ambient animation | material/property sorters | — | mission + lab commits |
| Science space | **3D first** (Earth day/night, solar tour, volcano pressure) | safety decisions | — | in-scene commit cases |
| English word-level | word gallery | sentence clinic | word-builder / memory / sprint | mission |
| English story-level | gallery | retell / story-structure timelines | — | mission |
| PSD / decision courses | meters quest (read & choose) | feelings sorters | — | mission |
| History / Geography | gallery | timelines + then/now sorters | — | mission |

## 4. Known remaining improvement candidates

1. **Fractions on a number line** (pairs with the pizza area model) — planned scene.
2. **Clock/time manipulative** for Measurement.
3. **Understand-phase gap in some math courses** (fractions, algebra have no sorter/sequence mode — their journey honestly shows 3 phases; a "explain to the alien" style mode could fill it).
4. **Reflecting prompts**: after the mission, a one-tap "how did it go?" emoji reflection would deepen the IB cycle's reflecting step.
5. Worksheet print currently covers handwriting + vertical math only.

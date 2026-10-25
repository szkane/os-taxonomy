# AGENT.md — PYP Marble Courses site

Guide for AI agents and collaborators. Goal: turn all courses in this repo's `data/` directory (176 course clusters) into **independent web pages**, aggregated into one complete website, output to `src/`, auto-deployable to GitHub Pages or Cloudflare Pages on push.

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
  clusters.json          #   176 course clusters (subject × domain × ageRangeStart + parent summary) ← defines a "course"
  dependencies.json      #   3,878 prerequisite edges
  teaching-research.json #   1,049 research records (activities / misconceptions / distractor / poeTask)
  manifest.json          #   Dataset manifest and licensing
tools/                   # Site generator (Node ESM, not part of the deployable output)
  build-site.mjs         #   Entry: node tools/build-site.mjs  (cleans and rebuilds src/)
  lib/mapping.mjs        #   41 domain → gameplay/scene/question mapping + hand-authored content library (source of truth)
  lib/derive.mjs         #   Cluster → course derivation (PYP metadata, quiz bank, flashcard deck, payload)
  lib/pages.mjs          #   HTML templates (hub + course page)
src/                     # Generated output = deployable static site (committed to the repo)
  index.html             #   Aggregation hub (subject/grade filters, course cards)
  courses/*.html         #   176 courses, one standalone HTML each
  assets/css/            #   pyp.css (shell) + stage.css (stage)
  assets/js/             #   core.js (TTS/SFX/vocab/stage controller) + engines/*.js (9 gameplay engines) + scenes.js
  assets/fonts/          #   Baloo 2 variable (SIL OFL, OFL.txt included)
  data/courses.js        #   Full course index for the hub (loaded via <script>, works on file://)
docs/                    # Product / architecture / mapping / deployment docs for this site
.github/workflows/       # GitHub Pages auto-deploy (publishes src/)
```

**Key convention**: `src/` is a **generated artifact** — to change content, edit `tools/lib/mapping.mjs` or the templates, then run `npm run build:site`. Never hand-edit `src/courses/*.html`.

## 3. Common commands

```bash
npm run build:site       # Rebuild the whole src/ (~176 course pages + hub)
npm run serve:site       # Local static server on http://localhost:4173
npm run validate         # Original taxonomy data validation (unrelated to the site; do not confuse)
```

## 4. Gameplay mapping decisions (full detail in docs/COURSE-MAPPING.md; method matrix in docs/PEDAGOGY-AUDIT.md)

**Coverage**: the site ships every primary-age (4–10) subject×domain×age combo in the taxonomy — 317 courses. The 176 with curated cluster summaries are standard; the 141 without are marked **Draft** (auto-derived framing, orange badge on the hub and in the adult panel).

**Pedagogy rule**: each domain must cover the canonical representations used in English-speaking curricula and IB PYP (e.g. multiplication = equal groups AND arrays AND skip counting; measurement = ruler AND balance; probability = spinners). The matrix in docs/PEDAGOGY-AUDIT.md is checked whenever mapping content changes; new representations ship as a second concept-lab scene (`scene2`), not as prose.

**Storybook rule (English Thinking, generalizable)**: reading-strategy courses open with 📖 Story time — public-domain tales retold in our own words (The Three Little Pigs, Goldilocks, Red Riding Hood, Aesop, Stone Soup…) with staged canvas illustrations, ONE sentence per page (per-sentence band caps machine-checked: early ≤10 words, mid ≤14, upper ≤18). The book stops where meaning matters: the owl models the reader move ONCE (think-aloud), children make the move at later stops (choices with why-feedback). ≥1 model stop before any child stop (build error otherwise). Random book on entry + 🎲 swap + strategies recap at the end. **Actors are canvas-drawn, never emoji**: a 58-function actor library (story-actors.js, flat cel + ink outlines) renders every character/prop as draggable Konva shapes with entrance tweens and idle bob; scenery is hand-inked Rough.js (locally vendored with Konva, MIT). The engine degrades to a plain legacy painter when the vendor libs are unavailable; the content checker rejects emoji inside book items and requires art keys with x/y/s. Page illustrations follow the **“Stage-Lit Paper Theatre”** philosophy (docs/DESIGN-PHILOSOPHY-storybook.md): layered hills with inked contours, one warm light source alternating corners per page, seeded ground motifs (grass / ripples / pebbles), actors sorted back-to-front with contact shadows (ripple rings when floating on water), light shafts instead of sun/clouds underwater, vignette, cream paper frame. Famous copyrighted picture books are NEVER copied (text or images); they appear only as read-at-home title recommendations in the grown-ups panel.

**Lab content rule (Plan B, complete)**: all lab units carry band-tiered cases in `tools/lib/lab-cases.mjs` (`LAB_CASES['<domain>|<scene>'].early/mid/upper`), selected by the course's band at derivation. Band entries are either a case array or `{ initials, dialOverrides, explorePrompt, cases }`; entry-level initials/explorePrompt apply to the early band only. Mid-band sets may live in mapping.mjs. New band sets must pass the checker: no pre-solved cases against the BAND's initial dials, early prompts ≤110 chars, valid rules. **Representations must match the band's topics**: when a band's topics outgrow a scene's range, the scene is swapped per band via `sceneByBand` — never by writing below-age cases into an outgrown representation. Reference swaps (audited 2026-10): Addition & Subtraction early → apple boxes (within 10) + line to 30; mid → line to 1,000 with hundreds hops; upper → line to 10,000 (exact pairs, halving, round-then-adjust). Counting early → cookie jar; mid → `numberlineXL` (50s/100s to 1,000) + small line (4s/6s/8s to 100). Place value early → blocks with one dial per column (hundreds/tens/ones); mid → `placevalue2` (adds a thousands dial); upper → `pvchart` (7 digit steppers to 9,999,999). Fractions/data/measurement/math-thinking carry band-tiered cases on their shared scenes.

**Age-fit audit (standing tool)**: `node tools/audit/age-fit.mjs` builds the real 317 courses, then reports per band what each lab actually serves (effective dial spans after overrides, case prompts) beside that band's taxonomy topics, with automated flags (identical-across-bands labs, topic ceilings a scene cannot represent, static-content-across-bands, doctor/storybook fallbacks). Run it whenever lab or arcade content changes; verdict log lives in `.audit/Age-fit-verdicts.md`.

**Lab case solvability (machine-enforced)**: every case target must lie inside the band-effective dial span, rule cases must have at least one solution inside the spans (brute-forced), numberline first hops must be visible inside the configured range, and `LAB_CASES` must not contain duplicate keys (the later block silently wins). The validator loads the REAL scene registry from `src/assets/js/scenes.js` — the old manual mirror is gone.

**Lab interaction rules**: one dial per independent quantity — a place-value column is its own control (never one giant number slider), digit charts get one stepper per digit (7-dial scenes use the two-column `.lab-dials--many` layout). The Konva stage clears its container, so the readout/burst overlays are appended AFTER stage creation; the readout shows `scene.readout` live in Explore and swaps to "🔍 Predict with the dials, then commit!" during an unsolved case. `fitStage` sizes the stage AND the scene box to the scaled canvas — no blank strip, no clipped overflow. Dials are range sliders; two lab modes may share one scene id because `concept-lab` clones dial defs per instance (never mutate the shared registry).

**Lab rendering rule**: concept-lab runs on a **Konva stage** (locally vendored) — the 17 scene painters from scenes.js are reused verbatim inside a `Konva.Shape.sceneFunc`, so painter edits need no engine changes. **Dial changes are eased**: displayed values lerp toward dial targets every frame (no snapping). Every scene has an always-on `air()` ambience for its ENTRY state (e.g. states lab shows ripples at 40°C, snow below 0 — not only steam). Solving a case fires a **lottie burst** (lottie-web vendored; static ✅ fallback). Don't reintroduce plain-canvas dial snapping or scene-conditional-only ambience.

**Inquiry-cycle rule (docs/IB-ALIGNMENT.md)**: every mode carries a `phase` (explore / understand / cards / practice / consolidate); tabs are ordered **lab/3D → interactive understand games → word cards → practice drills → the independent check** — any playable mode beats static cards as the opener (cards-first is acceptable only for cards-only word courses); the stage shows a learning-journey chip (🔭💡🗂️⚡🎯) that fills as phases are visited (celebration on completing all). Word cards read the word aloud on flip by default (🔇 respects mute). Early band: ≤4 modes, no second lab, arcade/mission prompts ≤110 chars (machine-checked). In the arcade the **word is always visible** — an emoji decorates, never replaces; early-band taps speak the word.

Each course is matched by domain to one "primary" gameplay plus one or two "universal" gameplays; all modes are switchable on the course stage:

| Engine | File | Used for |
| --- | --- | --- |
| concept-lab (dial-the-world exploration) | engines/concept-lab.js + scenes.js | Continuous-variable causality: fractions, multiplication arrays, sound amplitude, light & shadows, circuits, states of matter… (14 hand-drawn canvas scenes) |
| mission (independent check) | engines/mission.js | All courses. Builds discrimination questions from topics.evidence + neighboring-topic evidence (distractors = evidence of sibling concepts in the same course; wrong-answer feedback uses research errorPatterns.distractor) |
| flashcards (deck) | engines/flashcards.js | All courses. Deck = this course's topics (front = topic name / back = age-appropriate description) with TTS read-aloud |
| sorter (category bins) | engines/sorter.js | Habitats, materials, organ systems, emotions, then-vs-now, ~14 domains |
| sequence (ordering) | engines/sequence.js | Water cycle, life cycles, Ancient Egypt timeline, story structure, ~10 domains |
| arcade (speed sprint) | engines/arcade.js | Math fact fluency, phonics popping, spelling |
| decision (scenario dilemmas) | engines/decision.js | All 5 PSD domains + safety/responsibility science topics (energy/health/mood meters) |
| doctor (sentence clinic) | engines/doctor.js | Grammar & Punctuation, Spelling |
| worksheet (print) | engines/worksheet.js | Handwriting & Transcription, vertical calculations (A4 @media print) |
| spatial3d (3D space) | engines/spatial3d.js | Space courses (locally bundled three.js, cel-shaded; lazy <script> per mapped page) |

Domains without a hand-drawn scene fall back to `flashcards + mission` (both derive fully from data, covering 100% of courses).

## 5. Course page structure (top to bottom)

1. `.nav-bar`: ← PYP Map hub link · grade/theme tag · TTS accent dropdown.
2. `.hero-card`: course title + subject/domain/age badges + 🔊 read-aloud.
3. `.uoi-card`: transdisciplinary theme (one of six), central idea, 3 lines of inquiry (derived from course topics), key concepts, Learner Profile, ATL skills — all labeled "Suggested framing" (the data contains no PYP metadata; mapping rules in docs/COURSE-MAPPING.md §2).
4. **Marble stage** (`.marble-learning`): big-question cover + crafted scene + "Let's find out" → lesson (small title + single instruction + gameplay) → mode tabs → replay returns to the cover and clears response evidence.
5. "What you'll learn": the course's topic list ("I can …" evidence statements).
6. Collapsible "For grown-ups" companion: learning goal, common misconceptions (from research), printable activity suggestions.
7. Footer: data attribution (Marble Skill Taxonomy, ODbL / CC BY-SA) + Baloo 2 OFL + three.js MIT.

## 5b. Child-first page contract (learned from user review — binding)

The page a child lands on must be playable by a child alone. Consequences, enforced by the templates and engines:

1. **Child zone vs adult zone.** The course page shows ONLY: slim nav (back link, subject tag, age tag, TTS accent dropdown, 🔊/🔇 read-aloud toggle, "👩‍🏫 Grown-ups" button) and the marble stage. UOI framing, "What you'll learn" and research notes live in an `adult-panel` that is `hidden` until the toggle is pressed. Print output also strips it.
2. **Age bands change the UI, not just the words** (`data-band` on the stage):
   - early (5–6): larger instruction type, bigger mode tabs, ≤8 flashcards with emoji-first short backs, ≤4 mission questions, 3-column memory grid, bigger cover emoji, auto read-aloud (throttled).
   - mid (7–8): default densities.
   - upper (9–10): full decks and longer prompts.
3. **TTS policy (central, in core.js).** Auto-speak only for the early band, throttled (≥2.2s between utterances, no repeats within 8s). Mid/upper hear nothing automatically — the 🔊 button beside the instruction reads it on demand. A 🔇 toggle in the mode bar mutes everything (persisted, `ib_pyp_tts_muted`). Sound effects are not TTS and stay.
4. **Stage vertical order: mode row → instruction → play area** (all in flow, owner-set 2026-10-25) — the tabs are the stage's navigation. The mode row is a WHITE band (`--ml-surface`) closed by a 3px rule (dark theme: navy `#101c33`); the instruction sits NAKED on the paper directly above the play area — no background, no rule, type one step smaller than the old band (base clamp(19,1.9vw,25), early clamp(22,2.4vw,29)) — so the stage stays the loudest element. Nothing can overlap regardless of text length. There is no in-stage title header: the child already knows the course from the hub; mode tabs + journey chip + mute + replay (the icon pair grouped in `.ml-mode-tools` so toolbar wraps never orphan one) form the stage's only chrome.
4c. **TTS follow-along (owner-requested 2026-10-25)**: when the instruction is spoken (early-band auto-speak or the 🔊 button), `PYP.speakFollowAlong` wraps its words in `.ml-read-word` spans (text nodes only — vocab spans and their dashed underlines survive), then utterance `onboundary` charIndexes drive a karaoke read: current word = yellow chip with dark ink (`.is-now`), finished words dim to 0.45 (`.is-done`), full unwrap on end/error/replace. Voices that never fire boundary events (some Android/remote voices) simply show no highlight — no other behavior changes. Headless testing note: `window.speechSynthesis` is getter-only — stub it with `Object.defineProperty`, or assignment silently no-ops.
4d. **Band-distinct interactive content (spiral curriculum, owner-set 2026-10-25)**: gameplay TYPES may repeat across bands, but the CONTENT of every interactive mode must differ per band and draw from that band's own taxonomy topics. Authored band sets live in `tools/lib/band-modes.mjs` (`BAND_MODES['<subject>|<domain>|<engine>'] = { early, mid, upper }`, same shapes as mapping configs); `derive.mjs` resolves BAND_MODES first for sorter/sequence/decision/memory/arcade/solar3d/volcano3d/spatial3d, falling back to shared mapping configs. `validate-content.mjs` fingerprints all child-visible strings per band (sorter, sequence, decision, memory, arcade, concept-lab, spatial3d, solar3d, volcano3d) and FAILS THE BUILD when a fingerprint appears in two bands — `BAND_DISTINCT_PENDING` is now empty and must stay empty. Arcade generators (addsub/multdiv/counting/geometry/pattern/placevalue/fractions/data/measurement/thinking) are band-parameterized inside `arcadeBank`. 3D worlds are shared with band-tiered stops (solar3d: identify → orbit/tilt facts → ordinal/scale; volcano3d: predict → pressure mechanics → monitoring; spatial3d: day/night cities → harder geography). Authoring palette per band: `node tools/audit/band-palettes.mjs` → `.audit/band-palettes.md`.
4b. **Child-facing labels are in child language, and citations never reach children.** Taxonomy `evidence[0]` is sometimes a research citation ("comprehension monitoring research", "Simple View of Reading (Gough & Tunmer)") — citation-pattern text is filtered from every child surface (mission prompts/choices, card backs) and is a build error. Every course must open on a PLAYABLE mode: labs/3D/quests/sorters/timelines — cards+quiz alone are not a course (build error). The word gallery ships only with ≥3 cards and may borrow same-domain topics at or below the course age. Domains whose data is a single meta-topic (English Thinking, Historical Thinking, Learning to Learn, AI, Data Representation, Digital Systems, Digital Solutions, Digital Tools) carry hand-authored playable modes (reader-strategy quest, history-detective timeline, brain-growth quest, AI-choice quest, symbol memory, input/output sorter, design loop, doc-etiquette quest) rather than a naked card. Taxonomy topic names are written for teachers; the stage shows children. `CHILD_GLOSS` (exact names) + `CHILD_GLOSS_PATTERNS` (regular families like "Fluent adding… within N") + global "(age N+)" suffix stripping translate names on word-card fronts/backs and mission concepts. The content checker enforces it: teacher meta-language (`Vocabulary:`, `Grammar Terms:`, `Synthesising…`, …) is a build error in every band; upper-primary curriculum words are additionally banned on early/mid screens.
5. **No answer leaks.** Diagnostic games (doctor) must not visually mark the broken words; spotting the error IS the task. Support = a gentle pulse on remaining targets after two misses.
6. **Gameplay variety.** One mechanic must not dominate: bubble-sprint (arcade) only for genuine fluency domains (math facts, phonics). Word-level domains use word-builder/memory; space uses a 3D solar tour; volcanoes use a 3D pressure lab. Deck/quiz modes are the universal floor, never the showcase.
7. **English handwriting print uses ruled guide lines** (top line, dashed midline, solid baseline) — the Tian Zi Ge crosshair grid is for Chinese character practice and must not appear on English pages.
8. **Hub remembers the visitor.** Subject/grade/search filters persist in localStorage and are restored when returning from a course.

## 5b2. Lab honesty contract (learned from user review — binding)

A child pressed Commit in a counting lab while it still showed the explore state, was graded wrong against an answer they never saw, and stopped playing. Rules that prevent every variant of this:

1. **The lab starts in an explicit Explore tab** (🔭 Explore, `activeCase = −1`). Case tabs are never pre-selected; the commit button is *hidden* while exploring — there is nothing to check in free play.
2. **The readout is hidden while an unsolved case is open** ("🔍 Predict, then commit!") — otherwise the child copies the readout into the dials instead of reasoning. It returns on solve as reinforcement.
3. **No case may be satisfied by the scene's initial dial values.** `tools/validate-content.mjs` simulates every case against the scene's initial dials (rule registry `PYP_SCENES`) and fails the build on a pre-solved case.
4. **Feedback that replaces the question must restore the question.** In the arcade, the instruction bar IS the question — a wrong tap shows the why-feedback, then the question returns after ~1.6s.
5. **Every completion has a visible end state** with a replay CTA (mission, memory, gallery, decision, arcade finish panels; sorter offers "Shuffle & play again" on success).
6. **The play area stretches; engines fill it.** `.ml-playarea` uses grid stretch (no `align-content: start`) and every engine wrap distributes its content over the full height (flex/grid `flex: 1`, `safe center` for quiz-like content, `space-between` for sequence) — a compressed game board above a large empty region is a layout bug. Measure with the dead-space check: `playarea.bottom − content.bottom` must equal only the container's own padding (~24px).
7. **Child-view walkthrough loop**: before shipping content changes, run the Playwright walkthrough (enter → first action → expected response per engine, then a 317-page error sweep) and loop until 0 fails — behaving as the child, not as the author.

## 5c. Scene readability & 3D realism contract (learned from user review — binding)

These rules exist because two classes of defect shipped once and must never ship again (invisible text on the dark theme; an invisible shadow demo).

**Canvas scenes (concept-lab):**
1. A scene paints its own complete background (sky + ground) and never relies on the stage theme — a scene must look identical on light and dark stages.
2. On-canvas text uses `INK` or white *with a contrasting local fill*; verify contrast against the actual fill the text sits on (≥3:1 for large text).
3. Shadow demos project onto a **light surface** (bright wall / sunlit ground) — dark-on-dark shadows are unreadable and forbidden.
4. Chrome components that paint a light surface (`.lab-dial`, `.lab-readout`, `.sorter-item`, …) must force `color: var(--ml-ink)` under `data-ml-theme="dark"` — the grouped rule in stage.css is the single place to extend.
5. The instruction bar keeps `pointer-events: none` on its non-interactive text region but its interactive children (vocab triggers, the 🔊 read-aloud button, ≤40px, quiet style) re-enable pointer events explicitly. The vocab popover is appended to `document.body` with `position: fixed` and **unscoped** `.ml-vocab-pop` styles — never scope popover styles under the stage container.
6. Worksheet printing renders a dedicated `#print-sheet` outside the app shell — screen preview and printed output are built from the same data and can never drift.

**3D scenes (three.js):**
- Tone mapping ACESFilmic + tuned exposure; `sRGB` output space (r152+ default).
- Atmosphere/glow = slightly larger `BackSide` sphere with a Fresnel fragment shader and `AdditiveBlending` (standard globe recipe).
- Soft shadows = `PCFSoftShadowMap`, directional light with tight frustum (±34), `mapSize 1024`, `radius 3`, `bias −0.0004`; only meaningful casters set `castShadow`.
- Smoke/glow = billboard `THREE.Sprite` with a radial-gradient canvas texture, normal or additive blending — never bare spheres.
- Emissive elements (lava, corona) get a matching flickering `PointLight`/sprite so light and geometry agree.

## 6. Hard rules (intersection checklist of both skills)

**From marble-builder:**
- [ ] Cover = big question + **painted Paper-Theatre artwork** (Rough.js hand-inked backdrop tinted by the course palette + three canvas-drawn subject props via `cover-art.js` kits — no emoji; legacy emoji cluster only as no-lib fallback) + a single "Let's find out" primary action; underlying controls `inert`/untabbable while the cover is open; the cover earns no response evidence.
- [ ] During the lesson, one small title + one instruction at a time; **feedback replaces the instruction slot**, never appends cards.
- [ ] Every technical term gets a dashed underline + on-tap/hover/keyboard meaning; **never put vocabulary triggers inside buttons or their labels**; only one definition open at a time.
- [ ] Replay = back to the cover with responses and support evidence cleared.
- [ ] Independent work (mission) is separated from supported practice; no universal pass threshold — evidence is described per session.
- [ ] Baloo 2 across the stage (OFL license retained); titles 500 / instructions 550 / button labels 500, sentence case.

**From ib-pyp-html5-generator:**
- [ ] Neobrutalism shell: 3.5px `#111` borders, 4px hard shadows, candy colors, 14px radius.
- [ ] Explore-first: free discovery before challenge, easy way back; zero pre-selection in challenges (`null` initial state, `❓ Tap to choose`); switching unsolved cases resets the child's choices.
- [ ] One case at a time with visible case tabs; switching resets unsolved cases.
- [ ] Gentle guard checks: submitting incomplete choices never penalizes — warm upward nudge.
- [ ] Zero sound on page load; SFX only after user gesture; Web Audio synthesis (SoundFX).
- [ ] TTS: accent dropdown + localStorage memory (`ib_pyp_voice_name`) + browser-default fallback when no EN voices; speech must never fail silently.
- [ ] Grade-level language calibration (ages 5–6: short sentences + emoji on nouns; 7–8: 8–14 words; 9+: 12–18 words); no adult jargon ("sunglasses", not "frosted wax").
- [ ] iPad landscape first: 1024×768 / 1180×820 with minimal scrolling; touch targets ≥44px; `100dvh`; print pages `@page A4`.

**Universal:**
- [ ] All links relative (works under GitHub Pages subpaths); no CDN, remote fonts, or remote scripts.
- [ ] No child data collection; no accounts, no tracking.
- [ ] `npm run build:site` must be idempotent (cleans its output area first).

## 7. Deployment

See `docs/DEPLOYMENT.md`. Summary: GitHub side uses Actions to publish `src/` as a Pages artifact (deploy on push); Cloudflare Pages uses an empty build command with output directory `src/` (`wrangler.toml` included in the repo).

## 8. Data and licensing

Course data comes from this repo's Marble Skill Taxonomy (ODbL-1.0 AND CC-BY-SA-4.0 — see manifest.json / PROVENANCE.md); the site footer and docs must retain attribution and equivalent-license notices. Baloo 2 is SIL OFL (assets/fonts/OFL.txt). three.js is MIT. Research records carry AI-generated provenance; the grown-ups section states honestly that research digests are assistive summaries.

## 9. How agents should work here

- Concept checkpoint: the project owner pre-authorized gameplay-matching decisions in the goal ("you decide"), so concept decisions are recorded here and in docs/ with full traceability instead of blocking on human confirmation.
- To change content: edit `tools/lib/mapping.mjs` → `npm run build:site` → spot-check in a browser (desktop 1280, narrow 390, iPad landscape 1180×820) → verify against the §6 checklist.
- Before every delivery, run a completion audit: map the goal's five requirements to concrete file evidence.

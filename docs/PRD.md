# PRD — PYP Marble Courses

## Background

This repository (os-taxonomy / Marble Skill Taxonomy) holds a structured primary-school curriculum graph: 1,838 learning topics, 176 course clusters (= one "course"), 3,878 prerequisite edges, and 1,049 teaching-research records with misconception diagnostics. Today the data only serves agent skills (marble-builder); there is no browsable product for children, parents, or teachers.

## Goal

Turn **all 176 courses** into independent web pages aggregated into one complete static website, output to `src/`, auto-deployable to GitHub Pages or Cloudflare Pages on push.

## Users and scenarios

| User | Scenario | Needs |
| --- | --- | --- |
| Children aged 6–11 (PYP G1–G5) | Classroom iPad / home tablet | Play a course's interactive stage; understand instructions unaided; replay on their own |
| Parents | Learning together | Understand what a course teaches (parent summary), common pitfalls, printable activities |
| Teachers | Planning / workstation rotation | Find courses by subject + grade; know each course's PYP theme and ATL skills |

## Scope

1. **Aggregation hub** (`src/index.html`): cards for all 176 courses with subject/grade filters, themes, central ideas, gameplay counts.
2. **Course pages** (`src/courses/*.html`, 176 files): PYP shell (nav, UOI unit card, topic list, grown-ups companion) + Marble stage (question cover → gameplay).
3. **Gameplay engines** (9 engines + 14 hand-drawn 2D scenes + 1 3D scene), mapped by domain; each course gets 1–3 gameplays.
4. **Deployment config**: GitHub Actions (Pages) + Cloudflare Pages (wrangler.toml).
5. **Documentation**: PRD / architecture / mapping / design fusion / deployment.

## Non-goals

- No accounts, backend, or cloud progress sync; learning evidence stays in-session (localStorage holds only the TTS voice preference).
- No modification of `data/`; no per-course hand-written unique code (content derives from data + the domain mapping library).
- No runtime LLM calls (marble-builder's connected mode is not authorized here; default is local deterministic interaction).

## Success criteria

- [ ] All 176 courses have an independent URL page reachable from the hub; any course page renders standalone on file:// except for shared assets.
- [ ] Every course has at least 2 gameplays; the mapping table covers all 41 domains.
- [ ] Spot checks at desktop 1280 / iPad landscape 1180×820 / narrow 390 show no layout breakage and no console errors.
- [ ] After push, GitHub Actions can publish `src/` to Pages (workflow YAML valid, artifact path correct).
- [ ] Every item on the hard-rules checklist in AGENT.md §6 passes.

## Risks and mitigations

| Risk | Mitigation |
| --- | --- |
| Generated pages feel same-y, degrading into reskinned quizzes | Gameplay maps to domain semantics; concept-lab scenes hand-drawn per domain; distractors come from researched misconceptions |
| 23MB of teaching research would slow pages | Build-time extraction of concise fields (misconceptions / activity titles / POE tasks) inlined into each course payload (~10–30KB per course) |
| The two skills' CSS systems conflict | Physical separation: shell and stage own their token scopes — see DESIGN-FUSION.md |
| Auto-derived PYP metadata could overstate fidelity | Pages label it "Suggested framing"; every mapping rule is published in COURSE-MAPPING.md |

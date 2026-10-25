# Band-distinct interactive content — design

Date: 2026-10-25 · Owner decision set: full hand-authoring · rule covers all interactive
modes · batch delivery · 3D = shared world + band-tiered stops.

## Intent and why

43 of 64 multi-band domains served byte-identical opener content to ages 4–10 (22 sorters,
12 decision quests, 6 sequences, 3 three.js worlds). The taxonomy's per-age topics (1,838)
flow into word cards and missions but never into the hand-authored interactive layer, so a
10-year-old opened courses with age-5 content. Reference curricula spiral: the domain
revisits with progressively deeper content. Gameplay TYPES may repeat across bands (the 16
engines are the house variety); the CONTENT inside must spiral with the band.

## Goals / non-goals / anti-goals

- Goal: every interactive mode's content differs across bands and draws from the band's own
  taxonomy topics; machine-enforced.
- Non-goal: new engines per band; replacing the 16 shared-scene math/science lab scenes
  (their cases are already band-tiered); touching derived word cards/missions (already
  per-age — verified).
- Anti-goal: content that is a cosmetic reskin (same questions, new numbers) — each band set
  must engage that band's topics and reasoning.

## Approach (chosen)

Hand-authored band sets in `tools/lib/band-modes.mjs`:
`BAND_MODES['<subject>|<domain>|<engine>'] = { early, mid, upper }` — full engine configs in
the exact shapes mapping.mjs uses today. `derive.mjs` resolves BAND_MODES first, falling back
to the shared mapping config (transition). Alternatives rejected: build-time derivation from
topics (quality/jargon risk, teacher-worded names at 0–38% gloss coverage); upper-only
authoring (leaves mid/early identical).

## Enforcement

`validate-content.mjs` post-pass: group resolved courses by subject|domain × engine,
fingerprint all child-visible strings per band, fail the build when a fingerprint appears in
two different bands. Scoped per batch while authoring; global after batch 4. The audit tool
(`tools/audit/age-fit.mjs`) keeps representation-level checks; its soft F3 flag is superseded.

## Batches

1. Science sorters ×11 domains (33 sets) — early: families/basic groups; mid: habitats &
   adaptations; upper: conservation, ecosystem roles, invasive species.
2. History & Geography ×9 domains (~25 sets) — chronological tiers per band.
3. Decision quests ×13 domains (~35 sets) — early: concrete choices; mid: strategies, fair
   tests; upper: consequences, systems, ethics.
4. Sequences, 3D stops, memory (~30 sets).

Each batch: build + 317-page sweep + band screenshots + opener-classifier re-run.

## Left to the builder

- Exact factual content per set (author against `.audit/band-palettes.md`).
- CHILD_GLOSS additions wherever a topic name surfaces child-facing without a gloss.
- Per-batch validator scoping mechanics.

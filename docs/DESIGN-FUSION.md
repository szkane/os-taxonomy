# DESIGN-FUSION — how the two CSS systems coexist

The two skills bring conflicting house styles: `ib-pyp-html5-generator` uses Neobrutalism (system font, 3.5px black borders, hard offset shadows, candy colors), while `marble-builder` uses the Marble child-UI baseline (Baloo 2, soft tactile controls with 2px outline + 4px lower edge, warm paper background, cel-shaded scenes). The resolution mandated by the project owner: **the page framework is IB-PYP; the stage content is Marble.**

## The boundary

```
<body>                          pyp.css governs everything here
  └─ .pyp-chrome
      ├─ .nav-bar / .hero-card / .uoi-card / .learn-card / .grownups / footer
      └─ .marble-learning       stage.css governs everything inside this box
          ├─ .ml-stage / .ml-cover / .ml-header / .ml-explanation
          └─ .ml-playarea  ← engines mount here
```

Rules that keep them from fighting:

1. **Token isolation.** Neobrutalism tokens live on `:root` (`--border: 3.5px solid #111`, `--shadow: 4px 4px 0`, candy palette). Marble tokens live on `.marble-learning` (`--ml-*`). The stage never reads `:root` tokens and the shell never styles `.ml-*` classes.
2. **Font split.** The shell uses `system-ui` (dense, adult-facing metadata); the stage uses **Baloo 2** exclusively (child-facing), loaded from a local variable font with its OFL license retained. No remote fonts anywhere.
3. **Radius/depth split.** Shell components: 14px radius, hard `4px 4px 0` shadows. Stage controls: 22px pill radius, `0 4px 0` lower-edge depth, press = `translate 0 3px` (the CSS `translate` property is reserved for press/lift; placement uses `transform` — per marble component-styling).
4. **The stage is framed as an object in the page.** `.marble-learning` sits between the UOI card and the topic list with its own 3.5px border and hard shadow, so it reads as a "world panel" inside the PYP worksheet — the deliberate fusion signature.
5. **Shared rules across both zones** (from both skills): ≥44px touch targets, `touch-action: manipulation`, purple/yellow focus-visible outlines, no sound on load, no tracking, `100dvh`-aware layouts, iPad-landscape-first breakpoints (1180×820, 1024×768), reduced-motion support.

## Cover → lesson state machine (marble rules)

- Cover: large central question (Baloo 2 550, up to ~58px), crafted emoji-cluster artwork over outlined SVG blobs, one red "Let's find out" primary button. No other text, no lesson controls.
- Lesson: small title top-left (21px/500), **one** instruction slot (clamp 23–32px/550, aria-live) that feedback **replaces**; mode tabs (icon+label) top-right; replay bottom-right returns to a fresh cover.
- The playarea's top padding (182px desktop / 196px narrow) guarantees the absolute instruction slot never collides with in-flow content (case tabs, dials, meters) — verified at 1280×900, 1180×820 and 390×844.

## Dark scenes

Space and sound courses set `data-ml-theme="dark"` (deep navy paper, warm copy wash, adjusted control fills). Scene canvases paint their own sky gradients to match; the light accent (`#8bc8fa`) is shared.

## Print (worksheet engine)

`@media print` strips the shell (`.pyp-chrome`), stage chrome (header/instruction/tabs/modes), and keeps only the A4 paper (`@page { size: A4 portrait; margin: 8mm 10mm }`, `print-color-adjust: exact`, `break-inside: avoid` on grids).

## What we deliberately did NOT merge

- No Neobrutalism borders/shadows inside the stage (they would fight the tactile lower-edge depth).
- No Baloo 2 in the shell (metadata density matters; the two fonts never mix within one component).
- No shell-level emojis inside stage instructions beyond scene-appropriate art (emoji live in the shell tags and cover art).

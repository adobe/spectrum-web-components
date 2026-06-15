<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../../README.md) / [Project planning](../../README.md) / [Components](../README.md) / Opacity Checkerboard / Opacity Checkerboard migration plan

<!-- Document title (editable) -->

# Opacity Checkerboard migration plan

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [TL;DR](#tldr)
    - [Most blocking open questions](#most-blocking-open-questions)
- [1st-gen API surface](#1st-gen-api-surface)
    - [Properties / attributes](#properties--attributes)
    - [Methods](#methods)
    - [Events](#events)
    - [Slots](#slots)
    - [CSS custom properties](#css-custom-properties)
    - [Shadow DOM output (rendered HTML)](#shadow-dom-output-rendered-html)
- [Dependencies](#dependencies)
- [Migration sequencing and prerequisites](#migration-sequencing-and-prerequisites)
    - [Dependency-aware recommendation](#dependency-aware-recommendation)
    - [Related components and ordering notes](#related-components-and-ordering-notes)
    - [User confirmation needed](#user-confirmation-needed)
- [Changes overview](#changes-overview)
    - [Must ship — breaking or a11y-required](#must-ship--breaking-or-a11y-required)
    - [Additive — ships when ready, zero breakage for consumers already on 2nd-gen](#additive--ships-when-ready-zero-breakage-for-consumers-already-on-2nd-gen)
- [2nd-gen API decisions](#2nd-gen-api-decisions)
    - [Public API](#public-api)
    - [Behavioral semantics](#behavioral-semantics)
    - [Accessibility semantics notes (2nd-gen)](#accessibility-semantics-notes-2nd-gen)
- [Architecture: core vs SWC split](#architecture-core-vs-swc-split)
- [Migration checklist](#migration-checklist)
    - [Preparation (this ticket)](#preparation-this-ticket)
    - [Setup](#setup)
    - [API](#api)
    - [Styling](#styling)
    - [Accessibility](#accessibility)
    - [Testing](#testing)
    - [Documentation](#documentation)
    - [Review](#review)
- [Blockers and open questions](#blockers-and-open-questions)
    - [Design](#design)
    - [Architecture and behavior](#architecture-and-behavior)
    - [Scope and prerequisites](#scope-and-prerequisites)
- [References](#references)

</details>

<!-- Document content (editable) -->

> Planning output. Must be reviewed before implementation begins.
>
> This plan should provide recommendations, not just observations. Call out inconsistencies, propose better API or naming paths where appropriate, and make unresolved tradeoffs explicit for reviewers.

---

## TL;DR

Opacity Checkerboard is **not a component migration**. It is a **reclassification** of a 1st-gen CSS-only tool (`1st-gen/tools/opacity-checkerboard/`, no custom element) into a 2nd-gen shared CSS utility, per [Tools vs packages](../../../../CONTRIBUTOR-DOCS/01_contributor-guides/12_tools-vs-packages.md#abstraction-targets-2nd-gen). There is no web component, no base class, no ARIA/events/slots, and no `core/`/`swc/` component split to plan.

Must-ship work is small and almost entirely structural:

- **Ship a 2nd-gen shared CSS utility** for the checkerboard pattern at `2nd-gen/packages/swc/stylesheets/_lit-styles/` — an importable `css` style fragment. The pattern itself already works in 2nd-gen: gen-2 tokens (`--swc-opacity-checkerboard-square-*`) exist in `tokens.css`, and `color-loupe` already renders the pattern by **inlining** the rule into its own component CSS (it does not import any shared artifact). The shared fragment de-duplicates that rule for shadow-DOM consumers.
- **Deprecate the 1st-gen `@spectrum-web-components/opacity-checkerboard` package** with a notice and a pointer to the 2nd-gen replacement (timeline-gated).
- **Drop the `--mod-*` surface** (`--mod-opacity-checkerboard-{dark,light,size,position}`) — consistent with all 2nd-gen migrations, which do not expose `--mod-*`.
- **Contributor docs stay internal-only for now**, outside the Components section, since the utility is Lit-consumption-only and not a public standalone API.

The utility is exported **only** as a Lit `CSSResult` (`opacityCheckerboardStyles`) for import into a component's `styles` array. No global `.css` artifact is emitted, so there is no light-DOM or document-level usage path.

Why a shared `css` fragment and not a global class: **a global stylesheet class cannot pierce shadow DOM.** Every real 1st-gen consumer (color-handle, color-loupe, color-slider, swatch, thumbnail) uses the pattern *inside* its own shadow root, and `color-loupe` already set the precedent of inlining. A fragment importable into a component's `styles` array reaches those consumers; a global class would not.

### Most blocking open questions

None block implementation. The deliverable form (importable `css` fragment under `swc/stylesheets/_lit-styles/`) and class name (`.swc-OpacityCheckerboard`) are decided. One non-blocking open item remains — whether the a11y workstream needs to sign off — tracked in [Scope and prerequisites](#scope-and-prerequisites).

---

## 1st-gen API surface

**Source:** [`1st-gen/tools/opacity-checkerboard/src/opacity-checkerboard.css`](../../../../1st-gen/tools/opacity-checkerboard/src/opacity-checkerboard.css)
**Version:** `@spectrum-web-components/opacity-checkerboard@1.12.1`
**Custom element tag:** N/A — this is a CSS-only tool, not a custom element. There is no `sp-opacity-checkerboard`.

The 1st-gen "API" is a single CSS class plus a deprecated `--mod-*` override surface. It is consumed by adding the exported stylesheet to a component's `styles` array and applying the `.opacity-checkerboard` class to an element.

### Properties / attributes

N/A — no custom element, no reactive properties or attributes. The only public surface is the CSS class `.opacity-checkerboard` and the `--mod-*` custom properties listed under [CSS custom properties](#css-custom-properties).

### Methods

N/A — no custom element, no methods.

### Events

N/A — no custom element, no events.

### Slots

N/A — no custom element, no slots. Consumers place their own content over an element carrying the `.opacity-checkerboard` background.

### CSS custom properties

The 1st-gen utility reads Spectrum design tokens and allows per-instance overrides via a deprecated `--mod-*` surface:

| Custom property | Role | 2nd-gen disposition |
| --- | --- | --- |
| `--mod-opacity-checkerboard-light` | Override the light square color | **Dropped.** No `--mod-*` exposed in 2nd-gen. |
| `--mod-opacity-checkerboard-dark` | Override the dark square color | **Dropped.** |
| `--mod-opacity-checkerboard-size` | Override the square size | **Dropped.** |
| `--mod-opacity-checkerboard-position` | Override the background position | **Dropped.** |

Underlying tokens consumed (1st-gen): `--spectrum-opacity-checkerboard-square-light`, `--spectrum-opacity-checkerboard-square-dark`, `--spectrum-opacity-checkerboard-square-size`. The full `--mod-*` modifier surface will not be carried forward to 2nd-gen.

### Shadow DOM output (rendered HTML)

N/A — no shadow DOM. The 1st-gen tool ships CSS only. Applied form in consumers:

```html
<!-- consumer applies the class to an element inside its own shadow root -->
<div class="opacity-checkerboard"></div>
```

The 1st-gen CSS itself:

```css
.opacity-checkerboard {
  background: repeating-conic-gradient(
      var(--mod-opacity-checkerboard-light, var(--spectrum-opacity-checkerboard-square-light)) 0 25%,
      var(--mod-opacity-checkerboard-dark, var(--spectrum-opacity-checkerboard-square-dark)) 0 50%
    ) 0 0 / calc(var(--mod-opacity-checkerboard-size, var(--spectrum-opacity-checkerboard-square-size)) * 2)
    calc(var(--mod-opacity-checkerboard-size, var(--spectrum-opacity-checkerboard-square-size)) * 2);
}

@supports (background: repeating-conic-gradient(from 0deg, red 0deg, red 0deg 1deg, red 2deg)) {
  .opacity-checkerboard {
    /* same gradient, honoring --mod-...-position (left top default) */
  }
}

@media (forced-colors: active) {
  .opacity-checkerboard {
    forced-color-adjust: none;
  }
}
```

---

## Dependencies

| Package | Version | Role |
| --- | --- | --- |
| `@spectrum-web-components/base` | `1.12.1` | Declared 1st-gen dependency. Used only to wrap CSS as a Lit `css` result via the build pipeline; no runtime component dependency. |

**1st-gen consumers of this package** (who imports `@spectrum-web-components/opacity-checkerboard`): `color-handle`, `color-loupe`, `color-slider`, `swatch`, `thumbnail`. All apply the pattern **inside their own shadow roots**. This is why the deliverable is an importable `css` fragment, not a global class: a global utility class would not reach any of these consumers.

---

## Migration sequencing and prerequisites

### Dependency-aware recommendation

**Proceed independently; no component blocks this and this blocks no component.** This reclassification has no `core/` base class and is not on any component's critical path. The 2nd-gen consumers that need the pattern today (e.g. `color-loupe`) have already shipped it by inlining, so they are not waiting on the shared fragment.

Once the shared fragment exists, `color-loupe` (and future color components) should be refactored to consume it instead of inlining a private copy — but that refactor is **additive cleanup** (A1), not a prerequisite, and is tracked separately.

### Related components and ordering notes

- **color-loupe** (2nd-gen, already migrated) — inlines `.swc-ColorLoupe-checkerboard` with `light-dark()` + `token()`. Precedent for the rule the fragment will own.
- **color-handle, color-slider, swatch, thumbnail** (1st-gen consumers) — will import the shared fragment when each is migrated.
- `thumbnail` carries its own size token (`--swc-thumbnail-opacity-checkerboard-square-size`), so the fragment must not hard-bake a single size.

### User confirmation needed

**Resolved in session:** the deliverable is a shared `css` style fragment under `swc/stylesheets/_lit-styles/`. The follow-up refactor of `color-loupe` off its inline copy (A1) remains a separate, optional ticket and does not gate this work.

---

## Changes overview

> **Priority framing:**
>
> - **Must ship** items define the in-scope work required for this migration.
> - **Additive** items are typically deferred or out of scope unless explicitly pulled in.
> - **Accessibility is non-negotiable.**
> - **Breaking changes** are assessed on merit.

### Must ship — breaking or a11y-required

#### API and naming

| #   | What changes | 1st-gen behavior | 2nd-gen behavior | Consumer migration path |
| --- | ------------ | ---------------- | ---------------- | ----------------------- |
| **B1** | Drop the `--mod-*` override surface (source: 2nd-gen CSS policy — no `--mod-*` exposed). | `--mod-opacity-checkerboard-{light,dark,size,position}` override the pattern per instance. | No `--mod-*`. Pattern is driven by `--swc-*` tokens; size handled by token, not per-instance mod. | Consumers stop setting `--mod-*`; use token-driven size or component-scoped `--swc-*` where a knob is genuinely needed. |
| **B2** | Reclassify package → shared CSS utility; deprecate `@spectrum-web-components/opacity-checkerboard` (source: [Tools vs packages](../../../../CONTRIBUTOR-DOCS/01_contributor-guides/12_tools-vs-packages.md#migration-and-deprecation-for-reclassified-items)). | Standalone npm package exporting CSS-as-JS artifacts. | No standalone 2nd-gen package. Pattern shipped as an importable `css` fragment in `swc/stylesheets/_lit-styles/`. | Consumers import the 2nd-gen fragment into their `styles` array instead of the 1st-gen package. |

#### Styling and visuals

| #   | What changes | 1st-gen behavior | 2nd-gen behavior | Consumer migration path |
| --- | ------------ | ---------------- | ---------------- | ----------------------- |
| **B3** | Tokens move to `--swc-*` namespace with explicit light/dark dark-square variants. | Single `--spectrum-opacity-checkerboard-square-dark`; theme handled upstream. | `--swc-opacity-checkerboard-square-dark-light` / `-dark-dark` resolved via `light-dark()`; `-light`, `-size-small`, `-size-medium` per `tokens.css`. | Visual result equivalent; consumers rely on tokens, not raw values. |

#### Accessibility and behavior

| #   | What changes | 1st-gen behavior | 2nd-gen behavior | Consumer migration path |
| --- | ------------ | ---------------- | ---------------- | ----------------------- |
| **B4** | None functional. Carry forward `forced-color-adjust: none` under `forced-colors: active` so the pattern stays visible in high-contrast. | `forced-color-adjust: none`. | Same — required for the pattern to remain meaningful. | No action. The pattern is decorative; consuming elements remain responsible for `aria-hidden` and conveying opacity textually (see [a11y notes](#accessibility-semantics-notes-2nd-gen)). |

### Additive — ships when ready, zero breakage for consumers already on 2nd-gen

| #   | What is added | Notes |
| --- | ------------- | ----- |
| **A1** | Refactor `color-loupe` (and future color components) to import the shared fragment instead of inlining `.swc-ColorLoupe-checkerboard`. | Pure cleanup; track as a follow-up ticket. |
| **A2** | Internal Storybook page demonstrating the fragment imported into a Lit host's `styles`. | Internal-only, outside Components. Not a light-DOM demo — the fragment is exported only for Lit consumption. |

---

## 2nd-gen API decisions

Confirmed items are marked; open items are tracked in [Blockers and open questions](#blockers-and-open-questions).

- **Confirmed**: directly supported by source material
- **Inferred**: recommended based on multiple signals
- **Open question**: unresolved

### Public API

#### Properties / attributes (2nd-gen)

N/A — no custom element. **Confirmed** by [Tools vs packages](../../../../CONTRIBUTOR-DOCS/01_contributor-guides/12_tools-vs-packages.md#abstraction-targets-2nd-gen): Opacity-Checkerboard → "CSS utility class (utility class only; no custom element)."

The public surface is a CSS class name (inside the shared fragment) + the `--swc-*` tokens it reads. Class name: `.swc-OpacityCheckerboard` (with a `--sizeS` modifier).

#### Visual matrix (2nd-gen)

N/A — there are no variants in the Spectrum 2 sense (no fill/outline/static-color). The only dimensions are square **color** (light + dark, the dark square being theme-aware via `light-dark()`) and square **size** (`small` / `medium` tokens). **Confirmed** from `tokens.css` and the spectrum-css `spectrum-two` source.

#### Slots (2nd-gen)

N/A — no custom element, no slots.

#### CSS custom properties (2nd-gen)

No `--mod-*` properties will be exposed. The fragment consumes existing `--swc-opacity-checkerboard-square-*` tokens already present in `tokens.css`:

- `--swc-opacity-checkerboard-square-light`
- `--swc-opacity-checkerboard-square-dark-light` / `--swc-opacity-checkerboard-square-dark-dark` (via `light-dark()`)
- `--swc-opacity-checkerboard-square-size-small` / `--swc-opacity-checkerboard-square-size-medium`

**Confirmed** — these tokens exist today. No new tokens expected for the baseline migration.

### Behavioral semantics

The pattern is a pure CSS `background` (a `repeating-conic-gradient`). No JS behavior. The `@supports` guard from 1st-gen is no longer needed if the 2nd-gen browser support matrix already requires `repeating-conic-gradient` — default = drop it, matching `color-loupe`, which ships only the single modern declaration.

### Accessibility semantics notes (2nd-gen)

The checkerboard is **decorative**. Responsibility stays with the *consuming* element, not the utility:

- Consuming element should be `aria-hidden="true"` (or otherwise not exposed) since the pattern carries no semantic meaning.
- Opacity value must be conveyed textually by the consumer (e.g. live region / label), not inferred from the visual pattern.
- `forced-color-adjust: none` under `forced-colors: active` is retained so the pattern remains visible in high-contrast mode (B4).

> No `accessibility-migration-analysis.md` exists for this unit. Given the utility is decorative and has no interactive surface, the README guidance above is likely sufficient — but confirm whether the separate a11y workstream needs to sign off.

---

## Architecture: core vs SWC split

> The 1st-gen tool is a **reference only** — 2nd-gen is built independently.

**Not a core/SWC component split.** This is a rendering-layer-dependent, non-web-component UI artifact, so it lands in `swc/`, **not** `core/`, per [Tools vs packages](../../../../CONTRIBUTOR-DOCS/01_contributor-guides/12_tools-vs-packages.md#2nd-gen-layout). The standard `[Component].base.ts` / `[Component].ts` split does not apply.

| Layer | Path | Contains |
| --- | --- | --- |
| **Core** | N/A | No UI-less logic. The artifact depends on Spectrum styles/tokens, so nothing belongs in `core/`. |
| **SWC** | `2nd-gen/packages/swc/stylesheets/_lit-styles/` | The checkerboard CSS as an importable `css` style fragment, consumed by adding it to a component's `styles` array (reaches shadow-DOM consumers). |

Decided form:

- Ship an importable `css` style fragment under `swc/stylesheets/_lit-styles/` (new `_lit-styles/` directory). Shadow-DOM consumers (every known consumer) include it in their `styles` array, mirroring how `color-loupe` works today but de-duplicating the rule.
- No global utility class — a global class cannot pierce shadow DOM and would not serve a single existing consumer.
- Exported only as a Lit `CSSResult` (`opacityCheckerboardStyles`); no global `.css` artifact is emitted, so there is no light-DOM/document-level usage path.

---

## Migration checklist

### Preparation (this ticket)

- [x] 1st-gen API surface documented
- [x] Dependencies identified
- [x] Breaking changes documented
- [x] 2nd-gen API decisions drafted
- [ ] Plan reviewed by at least one other engineer

### Setup

- [x] Deliverable form decided — **shared `css` fragment in `swc/stylesheets/_lit-styles/`**
- [x] Create `2nd-gen/packages/swc/stylesheets/_lit-styles/` with `opacity-checkerboard.css` (the `css` fragment) and `index.ts` (typed `opacityCheckerboardStyles` barrel)
- [x] Wire exports in the `swc` `package.json` (`./stylesheets/shared` + `./stylesheets/_lit-styles/*`) and add the `@adobe/spectrum-wc/stylesheets` dev alias in `vite.config.ts`
- [x] Adjust build: un-exclude `stylesheets/_lit-styles/**` from `litCss`, exclude it from `processStylesheets`, add it as a lib entry (so it is lit-transformed into an importable `css` result, not emitted as a global stylesheet)
- [x] Check out `spectrum-css` at `spectrum-two` branch as sibling directory
- [ ] ~~Create `core/components/opacity-checkerboard/`~~ — N/A (no core split)
- [ ] ~~Create `swc/components/opacity-checkerboard/`~~ — N/A (no custom element)

### API

N/A — no public component API (no properties, methods, events, slots). The only "API" decisions are the class name (`.swc-OpacityCheckerboard`) and the consumed token set (confirmed).

### Styling

> Follow the [CSS style guide](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/).

- [ ] Author the 2nd-gen checkerboard rule using `--swc-*` tokens and `light-dark()` for the theme-aware dark square, matching the `color-loupe` implementation
- [ ] Drop the `@supports (repeating-conic-gradient ...)` fallback (default, matching `color-loupe`) unless the 2nd-gen browser support matrix requires it
- [ ] Keep `@media (forced-colors: active) { forced-color-adjust: none; }` (sort to bottom of file per style guide)
- [ ] Do not bake a single square size — keep `-size-small` / `-size-medium` token-driven (thumbnail needs its own size)
- [ ] Pass stylelint (property order, `no-descending-specificity`, token validation)

### Accessibility

- [ ] Document that the utility is decorative and consuming elements must be `aria-hidden` and convey opacity textually
- [ ] Confirm whether the separate a11y workstream needs to produce/sign off an analysis

### Testing

- [ ] VRT: render the pattern at `small` and `medium` sizes, light + dark theme, and under `forced-colors`
- [ ] No unit/Playwright a11y spec needed (no interactive element); if a Storybook host is added, give it `aria-hidden`
- [ ] ~~Port `1st-gen test/` coverage~~ — N/A (1st-gen tool has no test suite)

### Documentation

> Internal-only for now. The utility is consumed by SWC components via Lit `styles`, not by application authors directly, so it does not belong in the public Components docs. Any Storybook entry goes under an internal/Tools section (e.g. an `.internal.mdx`-style page excluded from production docs builds), not under Components.

- [ ] Internal Storybook page (outside Components) demonstrating the fragment imported into a small Lit host's `styles` array, with `.swc-OpacityCheckerboard` applied to a decorative element in its shadow root — no light-DOM/global-stylesheet usage, since the fragment is exported only for Lit consumption
- [ ] Document the deprecation + replacement in the 1st-gen `opacity-checkerboard` README and `package.json` deprecation field
- [ ] Keep contributor docs internal for now; no public-facing Components docs entry

#### Breaking changes

- [ ] Changeset / migration note for B1 (`--mod-*` removed) and B2 (package deprecated/reclassified)

### Review

- [ ] `yarn lint:2nd-gen` passes (ESLint, Stylelint, Prettier)
- [ ] Status table in workstream doc updated
- [ ] PR created
- [ ] Peer engineer sign-off

---

## Blockers and open questions

### Design

None — deliverable form (importable `css` fragment) and class name (`.swc-OpacityCheckerboard`) are decided.

### Architecture and behavior

None.

### Scope and prerequisites

| #   | Item | Blocking? | Status | Owner |
| --- | ---- | --------- | ------ | ----- |
| **Q1** | Does the separate accessibility workstream need to produce/sign off an `accessibility-migration-analysis.md`, given the utility is decorative? | No | Open | Accessibility reviewer |

---

## References

- [Tools vs packages: where code lives](../../../../CONTRIBUTOR-DOCS/01_contributor-guides/12_tools-vs-packages.md) — **authoritative** for the reclassification target (CSS utility, no custom element)
- [Washing machine workflow](../../02_workstreams/02_2nd-gen-component-migration/02_step-by-step/01_washing-machine-workflow.md)
- [2nd-gen migration status table](../../02_workstreams/02_2nd-gen-component-migration/01_status.md)
- Accessibility migration analysis — **TODO / not present** for this unit (see Scope and prerequisites)
- [Rendering and styling migration analysis](./rendering-and-styling-migration-analysis.md)
- [CSS style guide — Component Custom Property Exposure](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/02_custom-properties.md#component-custom-property-exposure)
- [1st-gen source (CSS)](../../../../1st-gen/tools/opacity-checkerboard/src/opacity-checkerboard.css)
- [1st-gen underlying pattern CSS](../../../../1st-gen/tools/opacity-checkerboard/src/spectrum-opacity-checkerboard.css)
- [1st-gen README](../../../../1st-gen/tools/opacity-checkerboard/README.md)
- 2nd-gen `color-loupe` inline precedent: `2nd-gen/packages/swc/components/color-loupe/color-loupe.css` (`.swc-ColorLoupe-checkerboard`)
- 2nd-gen tokens: `2nd-gen/packages/swc/stylesheets/tokens.css` (`--swc-opacity-checkerboard-square-*`)
- Spectrum CSS `spectrum-two` source: `spectrum-css/components/opacitycheckerboard/index.css`
- [React — ColorSlider](https://react-spectrum.adobe.com/ColorSlider) (not a standalone component; checkerboard is internal styling only)

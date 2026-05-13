<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../../README.md) / [Project planning](../../README.md) / [Components](../README.md) / Color Loupe / Color loupe migration checklist

<!-- Document title (editable) -->

# Color loupe migration checklist

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [Overview](#overview)
- [Phase 1: Planning and analysis (SWC-1783)](#phase-1-planning-and-analysis-swc-1783)
- [Phase 2: File structure setup (SWC-1784)](#phase-2-file-structure-setup-swc-1784)
- [Phase 3: API and TypeScript migration (SWC-1785)](#phase-3-api-and-typescript-migration-swc-1785)
    - [Properties](#properties)
    - [Render](#render)
    - [TypeScript](#typescript)
    - [Mod overrides](#mod-overrides)
- [Phase 4: Accessibility implementation (SWC-1786)](#phase-4-accessibility-implementation-swc-1786)
    - [ARIA](#aria)
    - [Focus and keyboard](#focus-and-keyboard)
    - [Non-text contrast (WCAG 1.4.11)](#non-text-contrast-wcag-1411)
    - [Forced colors / high contrast mode](#forced-colors--high-contrast-mode)
    - [Documentation notes](#documentation-notes)
- [Phase 5: S2 visual fidelity and CSS (SWC-1787)](#phase-5-s2-visual-fidelity-and-css-swc-1787)
    - [Token migration](#token-migration)
    - [Visual review](#visual-review)
- [Phase 6: Code style conformance (SWC-1788)](#phase-6-code-style-conformance-swc-1788)
- [Phase 7: Test suites (SWC-1789)](#phase-7-test-suites-swc-1789)
    - [Unit tests](#unit-tests)
    - [Accessibility tests (axe)](#accessibility-tests-axe)
    - [Integration / E2E tests](#integration--e2e-tests)
    - [Browser compatibility](#browser-compatibility)
- [Phase 8: Storybook documentation (SWC-1790)](#phase-8-storybook-documentation-swc-1790)
- [Phase 9: Consumer migration guide (SWC-1791)](#phase-9-consumer-migration-guide-swc-1791)
- [Phase 10: Review and finalize (SWC-1792)](#phase-10-review-and-finalize-swc-1792)
- [Known issues and decisions](#known-issues-and-decisions)
- [References](#references)

</details>

<!-- Document content (editable) -->

## Overview

This checklist tracks the full 2nd-gen migration of the **`<sp-color-loupe>`** component. It is derived from the acceptance criteria in [SWC-1783](https://jira.corp.adobe.com/browse/SWC-1783) and the component analysis documented in:

- [Rendering and styling migration analysis](./rendering-and-styling-migration-analysis.md)
- [Accessibility migration analysis](./accessibility-migration-analysis.md)

**API summary:**
- Properties: `open` (boolean, reflects to attribute), `color` (string)
- Slots: None
- Events: None dispatched
- Breaking changes: None anticipated — the `open` / `color` API is unchanged between S1 and S2

**Key bugs to fix in 2nd-gen:**
- SVG path data ends with `ZZ` (double close command); fix to single `Z`
- `<mask>` references `#path` (non-existent); fix to `#loupe-path`
- Opacity checkerboard must be inlined (no longer imported from `@spectrum-web-components/opacity-checkerboard`)
- Drop-shadow tokens must migrate from S1 (`--spectrum-drop-shadow-*`) to S2 (`--spectrum-drop-shadow-elevated-*`)

---



## Phase 1: Planning and analysis (SWC-1783)

> Goal: Document the 1st-gen API surface, identify all dependencies and breaking changes, and produce a migration plan before any implementation begins.

- [ ] 1st-gen API surface documented — properties, methods, events, slots, CSS custom properties
  - `open` — `boolean`, default `false`, reflects to attribute
  - `color` — `string`, default `'rgba(255, 0, 0, 0.5)'`, does not reflect
  - No public methods beyond inherited defaults
  - No events dispatched
  - No slots
  - CSS custom properties: see [rendering and styling analysis](./rendering-and-styling-migration-analysis.md)
- [ ] All dependencies identified
  - 1st-gen imports `@spectrum-web-components/opacity-checkerboard` — must be inlined in 2nd-gen
  - `SpectrumElement` base class (no mixins)
  - Spectrum CSS tokens (S1 → S2 mapping required for drop-shadow and colorloupe tokens)
- [ ] Breaking changes identified and documented
  - No breaking API changes anticipated (`open`, `color` are preserved)
  - Opacity checkerboard import removed — inlined via `--swc-opacity-checkerboard-*` tokens
- [ ] SVG bugs identified for fix in 2nd-gen
  - Double-Z path bug (`61.575ZZ` → `61.575Z`)
  - Mask ID mismatch (`#path` → `#loupe-path`)
- [ ] Accessibility analysis reviewed and incorporated into plan (see [SWC-1782](https://jira.corp.adobe.com/browse/SWC-1782) and [accessibility migration analysis](./accessibility-migration-analysis.md))
- [ ] Factor assessment: `SKIP_FACTOR` confirmed — component has no extractable state logic; total logic under 40 lines
- [ ] Plan linked as comment on parent epic [SWC-1781](https://jira.corp.adobe.com/browse/SWC-1781)
- [ ] Any blockers or open questions flagged

---

## Phase 2: File structure setup (SWC-1784)

> Goal: Create the 2nd-gen scaffold following the washing machine workflow conventions.

- [ ] Directory created at `2nd-gen/packages/swc/components/color-loupe/`
- [ ] Core directory created at `2nd-gen/packages/core/components/color-loupe/`
- [ ] Required files scaffolded:
  - `ColorLoupe.ts` (swc package — element registration)
  - `ColorLoupe.base.ts` (core package — base class logic)
  - `color-loupe.css` (swc package — S2 styles)
  - `index.ts` (swc package — barrel export)
  - `package.json` (swc package)
  - `tsconfig.json` (swc package)

> **Note**: `ColorLoupe.types.ts` is intentionally omitted — the component has no enums or unions to declare, and bare default values belong with the property in the base class. See [PR #6147 discussion r3119292750](https://github.com/adobe/spectrum-web-components/pull/6147#discussion_r3119292750).
- [ ] `stories/` directory created with placeholder `color-loupe.stories.ts`
- [ ] Component registered with `customElements.define('swc-color-loupe', ColorLoupe)`
- [ ] Entry added to the 2nd-gen package manifest / workspace

---

## Phase 3: API and TypeScript migration (SWC-1785)

> Goal: Port the 1st-gen TypeScript class to the 2nd-gen architecture.

### Properties

- [ ] `open` property migrated — `@property({ type: Boolean, reflect: true })`
- [ ] `color` property migrated — `@property({ type: String })`, default `'rgba(255, 0, 0, 0.5)'`
- [ ] `--spectrum-picked-color` CSS variable set via inline style on the SVG element, driven by `this.color`

### Render

- [ ] SVG loupe markup ported to `render()` method
- [ ] SVG path bug fixed: `61.575ZZ` → `61.575Z`
- [ ] Mask ID bug fixed: `<use xlink:href="#path">` inside `<mask>` → `<use xlink:href="#loupe-path">`
- [ ] Opacity checkerboard markup inlined using `--swc-opacity-checkerboard-*` tokens (no package import)
- [ ] `aria-hidden="true"` retained on the SVG element (decorative graphic)
- [ ] `is-open` CSS class applied when `open` is `true`

### TypeScript

- [ ] No separate `ColorLoupe.types.ts` — component has no enums or unions
- [ ] No public methods to migrate
- [ ] No events to define

### Mod overrides

- [ ] All `--mod-colorloupe-*` CSS custom properties passed through in stylesheet:
  - `--mod-colorloupe-offset`
  - `--mod-colorloupe-drop-shadow-x`
  - `--mod-colorloupe-drop-shadow-y`
  - `--mod-colorloupe-drop-shadow-blur`
  - `--mod-colorloupe-drop-shadow-color`
  - `--mod-colorloupe-animation-distance`
  - `--mod-colorloupe-inner-border-color`
  - `--mod-colorloupe-inner-border-width`
  - `--mod-colorloupe-outer-border-color`
  - `--mod-colorloupe-outer-border-width`

---

## Phase 4: Accessibility implementation (SWC-1786)

> Goal: Implement WCAG 2.2 Level AA accessibility requirements per the [accessibility migration analysis](./accessibility-migration-analysis.md).

### ARIA

- [ ] SVG element retains `aria-hidden="true"` — the loupe is decorative; accessible color information is carried by surrounding controls
- [ ] No ARIA role needed on the host element — component is not focusable and not a standalone widget

### Focus and keyboard

- [ ] Component is **not focusable** — confirm `tabindex` is absent and host element is skipped by keyboard navigation
- [ ] Closed state (`open: false`) does not trap focus or create phantom focus targets

### Non-text contrast (WCAG 1.4.11)

- [ ] Loupe chrome contrast measured on key themes (light, dark, high contrast)
- [ ] Where 3:1 contrast against adjacent UI is not achievable due to variable color backgrounds, gap is documented referencing [SWC-1193](https://jira.corp.adobe.com/browse/SWC-1193) as the product/a11y decision record
- [ ] Any known failures listed as explicit known issues — not silent

### Forced colors / high contrast mode

- [ ] `@media (forced-colors: active)` styles verified to maintain loupe shape visibility
- [ ] `forced-color-adjust` applied where needed to avoid invisible borders in Windows High Contrast mode

### Documentation notes

- [ ] Component documentation states the loupe is a visual aid, not a standalone accessible color control
- [ ] Authors are pointed to color field / picker docs for labels, keyboard navigation, and value communication

---

## Phase 5: S2 visual fidelity and CSS (SWC-1787)

> Goal: Achieve full Spectrum 2 visual fidelity by migrating all CSS tokens.

### Token migration

- [ ] S1 drop-shadow tokens replaced with S2 equivalents:
  - `--spectrum-drop-shadow-x` → `--spectrum-drop-shadow-elevated-x`
  - `--spectrum-color-loupe-drop-shadow-y` → `--spectrum-drop-shadow-elevated-y`
  - `--spectrum-color-loupe-drop-shadow-blur` → `--spectrum-drop-shadow-elevated-blur`
  - `--spectrum-color-loupe-drop-shadow-color` → `--spectrum-drop-shadow-elevated-color`
- [ ] All `--spectrum-colorloupe-*` intermediary tokens consumed via `token('color-loupe-*')` helper
- [ ] All `--spectrum-color-handle-*` tokens consumed correctly for handle size and border width
- [ ] Opacity checkerboard tokens migrated to `--swc-opacity-checkerboard-square-dark` / `--swc-opacity-checkerboard-square-light`

### Visual review

- [ ] Loupe shape, size, and border rendering matches S2 Figma spec at all standard viewports
- [ ] Open/closed animation transition is smooth and matches S2 motion spec
- [ ] Transparency checkerboard renders correctly behind semi-transparent colors
- [ ] Inner and outer border styling matches S2 spec
- [ ] VRT (visual regression test) baselines captured and approved

---

## Phase 6: Code style conformance (SWC-1788)

> Goal: Ensure the implementation follows all project style guides and linting rules.

- [ ] CSS passes stylelint with no errors (see `stylelint.config.js`)
- [ ] No duplicate CSS properties (cascade order respected)
- [ ] High-contrast and other media queries sorted to bottom of CSS file
- [ ] Copyright header reflects current year in all files
- [ ] Comments in CSS use sentence case
- [ ] TypeScript passes ESLint with no errors
- [ ] No `xlink:href` deprecated SVG attributes — use `href` if supported, or document why `xlink:href` is retained
- [ ] Imports are ordered consistently per project conventions
- [ ] No unused imports or dead code

---

## Phase 7: Test suites (SWC-1789)

> Goal: Achieve complete test coverage following 2nd-gen patterns.

### Unit tests

- [ ] `open` property: toggling `open` adds/removes `is-open` class on SVG
- [ ] `color` property: changing `color` updates `--spectrum-picked-color` inline style on SVG
- [ ] Default property values verified (`open: false`, `color: 'rgba(255, 0, 0, 0.5)'`)
- [ ] SVG `aria-hidden="true"` attribute is present in rendered DOM
- [ ] Component is not in the tab order (no `tabindex` on host or internals)
- [ ] Mask ID fix verified: `<use>` inside `<mask>` references `#loupe-path`, not `#path`
- [ ] Path data has single `Z` close command (no `ZZ` bug)

### Accessibility tests (axe)

- [ ] axe runs on composite stories (loupe + color field / sliders), not the loupe in isolation
- [ ] No axe violations on composite Storybook stories
- [ ] Contrast checks run on representative backgrounds; gaps documented per SWC-1193

### Integration / E2E tests

- [ ] Snapshot / VRT tests use realistic page layouts (labeled controls, focus order, value text on surrounding elements)
- [ ] `open` toggling produces expected visual diff captured by VRT

### Browser compatibility

- [ ] Tests pass in Chrome, Firefox, Safari
- [ ] SVG mask rendering verified in all supported browsers

---

## Phase 8: Storybook documentation (SWC-1790)

> Goal: Create complete, accurate, and accessible Storybook stories following the 2nd-gen stories format.

- [ ] `color-loupe.stories.ts` created in `2nd-gen/packages/swc/components/color-loupe/stories/`
- [ ] Stories follow the format defined in `.ai/rules/stories-format.md`
- [ ] Meta object includes: `title`, `component`, `args`, `argTypes`, `render`, `parameters.docs.subtitle`, `tags: ['migrated']`
- [ ] JSDoc description above meta object explains the component's purpose
- [ ] **Playground** story — `['autodocs', 'dev']` tags, most common use case args
- [ ] **Overview** story — `['overview']` tag
- [ ] **Anatomy** story — `['anatomy']` tag, shows loupe with opacity checkerboard and with solid color
- [ ] **Options** stories — `['options']` tag:
  - [ ] Open / closed states shown as options (since `open` is a visual toggle)
  - [ ] Representative color values demonstrating transparency handling
- [ ] **States** story — `['states']` tag: open, closed, with transparent color
- [ ] **Accessibility** story — `['a11y']` tag — loupe shown in context with a color field or labeled picker, not in isolation
- [ ] All stories demonstrate accessible usage (no placeholder-only content)
- [ ] `flexLayout: true` used for multi-item comparison stories
- [ ] Figma design link added to `parameters.design`

---

## Phase 9: Consumer migration guide (SWC-1791)

> Goal: Produce a guide for teams upgrading from `<sp-color-loupe>` (1st-gen) to `<swc-color-loupe>` (2nd-gen).

- [ ] Guide created at the agreed CONTRIBUTOR-DOCS or docs-site location
- [ ] Element tag rename documented: `<sp-color-loupe>` → `<swc-color-loupe>`
- [ ] Import path changes documented
- [ ] Confirm `open` and `color` properties are unchanged — no migration action required for consumers using these
- [ ] Opacity checkerboard: consumers who imported `@spectrum-web-components/opacity-checkerboard` alongside the loupe are notified the dependency is now internal
- [ ] CSS custom property changes documented:
  - Drop-shadow token renames (S1 → S2) listed for consumers using mod overrides
- [ ] Note that the component is not focusable and should always be paired with a fully labeled color control
- [ ] Guide reviewed by at least one other engineer before shipping

---

## Phase 10: Review and finalize (SWC-1792)

> Goal: Final quality gate before the migration is considered complete.

- [ ] All prior phases complete and their Jira tickets closed
- [ ] All automated tests pass (unit, a11y, VRT, integration)
- [ ] VRT baselines approved
- [ ] Code reviewed by at least one other engineer
- [ ] Accessibility review complete — known gaps documented with references to SWC-1193
- [ ] Storybook docs reviewed for accuracy and accessible content
- [ ] Consumer migration guide reviewed and approved
- [ ] No open blocking issues or unresolved questions
- [ ] Changeset written and included in PR
- [ ] PR linked to parent epic [SWC-1781](https://jira.corp.adobe.com/browse/SWC-1781)
- [ ] Release notes / CHANGELOG updated as needed

---

## Known issues and decisions

| Issue | Status | Reference |
|-------|--------|-----------|
| Non-text contrast (WCAG 1.4.11) on loupe chrome — may not be achievable at 3:1 for all color states due to variable overlaid content | Documented risk; accepted per product/a11y decision | [SWC-1193](https://jira.corp.adobe.com/browse/SWC-1193) |
| SVG mask ID mismatch (`#path` instead of `#loupe-path`) in 1st-gen | Fix in 2nd-gen render method | [Rendering analysis](./rendering-and-styling-migration-analysis.md) |
| Double-Z SVG path close command (`ZZ` in 1st-gen) | Fix in 2nd-gen render method | [Rendering analysis](./rendering-and-styling-migration-analysis.md) |
| Opacity checkerboard imported from external package in 1st-gen | Inline in 2nd-gen using `--swc-opacity-checkerboard-*` tokens | [Rendering analysis](./rendering-and-styling-migration-analysis.md) |

---

## References

- [SWC-1781 — Migration of the color-loupe (epic)](https://jira.corp.adobe.com/browse/SWC-1781)
- [SWC-1783 — Analyze component and create migration plan](https://jira.corp.adobe.com/browse/SWC-1783)
- [Rendering and styling migration analysis](./rendering-and-styling-migration-analysis.md)
- [Accessibility migration analysis](./accessibility-migration-analysis.md)
- [SWC-1193 — Non-text contrast / realistic constraints for color loupe](https://jira.corp.adobe.com/browse/SWC-1193)
- [Washing machine workflow guide](../../../01_contributor-guides/README.md)
- [WCAG 2.2 SC 1.4.11 — Non-text contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast)

<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../../README.md) / [Project planning](../../README.md) / [Components](../README.md) / Illustrated Message / `sp-illustrated-message` Migration Plan

<!-- Document title (editable) -->

# `sp-illustrated-message` Migration Plan

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [Table of contents](#table-of-contents)
- [1st-gen API surface](#1st-gen-api-surface)
    - [Properties / attributes](#properties--attributes)
    - [Methods](#methods)
    - [Events](#events)
    - [Slots](#slots)
    - [CSS custom properties](#css-custom-properties)
    - [Shadow DOM output (rendered HTML)](#shadow-dom-output-rendered-html)
- [Dependencies](#dependencies)
- [Changes overview](#changes-overview)
    - [Must ship — breaking or a11y-required](#must-ship--breaking-or-a11y-required)
    - [Additive — ships when ready, zero breakage for consumers already on 2nd-gen](#additive--ships-when-ready-zero-breakage-for-consumers-already-on-2nd-gen)
- [2nd-gen API decisions](#2nd-gen-api-decisions)
    - [Properties / attributes (2nd-gen)](#properties--attributes-2nd-gen)
    - [Slots (2nd-gen)](#slots-2nd-gen)
    - [CSS custom properties (2nd-gen)](#css-custom-properties-2nd-gen)
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
- [References](#references)

</details>

<!-- Document content (editable) -->

> **SWC-1834** · Planning output. Must be reviewed before implementation begins.

---

## Table of contents

- [1st-gen API surface](#1st-gen-api-surface)
- [Dependencies](#dependencies)
- [Changes overview](#changes-overview)
- [2nd-gen API decisions](#2nd-gen-api-decisions)
- [Architecture: core vs SWC split](#architecture-core-vs-swc-split)
- [Migration checklist](#migration-checklist)
- [Blockers and open questions](#blockers-and-open-questions)
- [References](#references)

---

## 1st-gen API surface

**Source:** [`1st-gen/packages/illustrated-message/src/IllustratedMessage.ts`](../../../../1st-gen/packages/illustrated-message/src/IllustratedMessage.ts)
**Version:** `@spectrum-web-components/illustrated-message@1.11.2`
**Custom element tag:** `sp-illustrated-message`

### Properties / attributes

| Property | Type | Default | Attribute | Notes |
|---|---|---|---|---|
| `heading` | `string` | `''` | `heading` | Fallback text if heading slot is empty |
| `description` | `string` | `''` | `description` | Fallback text if description slot is empty |

### Methods

None (component is purely presentational).

### Events

None dispatched.

### Slots

| Slot | Content | Notes |
|---|---|---|
| *(default)* | SVG illustration | No content type restriction; CSS enforces `width: 100%` on `svg[viewBox]` via `::slotted` |
| `heading` | Heading text / markup | Rendered inside a hard-coded `<h2>` shadow element |
| `description` | Body text | Rendered inside a `<div>` with `spectrum-Body spectrum-Body--sizeS` classes |

### CSS custom properties

The 1st-gen component imports `spectrum-illustratedmessage.css` (Spectrum 1 tokens) and `illustratedmessage-overrides.css`. The overrides file uses `--mod-*` and `--spectrum-*` chains internally but these were never documented or intended as public consumer API.

### Shadow DOM output (rendered HTML)

```html
<div id="illustration"><slot></slot></div>
<h2 id="heading" class="spectrum-Heading spectrum-Heading--sizeL spectrum-Heading--light">
  <slot name="heading">${heading}</slot>
</h2>
<div id="description" class="spectrum-Body spectrum-Body--sizeS">
  <slot name="description">${description}</slot>
</div>
```

---

## Dependencies

| Package | Version | Role |
|---|---|---|
| `@spectrum-web-components/base` | `1.11.2` | `SpectrumElement`, `html`, `property` decorator — 1st-gen internal package only |
| `@spectrum-web-components/styles` | `1.11.2` | `bodyStyles`, `headingStyles` (applied via `static get styles()`). Note: 2nd-gen has typography classes but whether they will be importable in the same way is TBD — tracked in SWC-1545. |

No mixins, no shared utilities, no other SWC components composed inside. No dependency on `@spectrum-web-components/core` (2nd-gen).

---

## Changes overview

> **Priority framing:**
> - **Accessibility is non-negotiable** — all a11y requirements ship as part of this migration.
> - **Breaking changes** are assessed on merit — some must ship now to avoid a second, more disruptive migration event later (e.g. heading slot restriction per reviewer feedback).
> - **Additive changes** can be deferred and will not cause consumer breakage when they do ship.

### Must ship — breaking or a11y-required

| # | What changes | 1st-gen behavior | 2nd-gen behavior | Consumer migration path |
|---|---|---|---|---|
| **B1** | Heading slot content type | Accepts any node inside `<h2>` | Accepts `<span>` only; shadow DOM owns the heading tag | Consumers slotting plain text or `<span>` are unaffected. Consumers who slotted `<h2>`–`<h6>` (incorrect but possible) must switch to `<span>`. Ships now — deferring would cause font property inheritance side-effects and a second migration event. |
| **B2** | CSS token migration (S1 → S2) | Uses `--spectrum-*` base tokens with `--mod-*` override chains (e.g. `var(--mod-illustrated-message-title-color, var(--spectrum-illustrated-message-title-color))`). Forced-colors override applied on `:host`. | `--mod-*` and `--spectrum-*` chains removed; collapsed into `--swc-*` (exposed) or `--_swc-*` (private) properties per [Component Custom Property Exposure](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/02_custom-properties.md#component-custom-property-exposure). Forced colors moved to internal `.swc-IllustratedMessage` selector. | Since no `--mod-*` properties were ever documented as public API, there is no consumer breakage. Any new `--swc-*` properties introduced are additive capability. |
| **B3** | `heading` and `description` attributes removed | `heading` and `description` were available as plain-text attribute fallbacks when slots were empty. | Both attributes and properties are removed. All content must be provided via slots: `<span slot="heading">` and `<span slot="description">`. This is idiomatic web component API and avoids a dual-path content model. Consumers must switch to slots. |
| **A11y** | Heading level control | Always `<h2>`, no way for consumers to change level | `heading-level` attribute (`2`–`6`, default `2`); shadow DOM renders the correct `<hN>` tag | Consumers using the default are unaffected. Consumers needing a different level add `heading-level`. Required for WCAG 1.3.1 and 2.4.6 compliance. |
| **A11y** | Illustration accessibility | No handling for decorative vs informative SVGs | Decorative SVGs: `aria-hidden="true"`; informative: `role="img"` + `aria-label` / `<title>` | Slot contract; documented guidance rather than enforced by the component. |

### Additive — ships when ready, zero breakage for consumers already on 2nd-gen

| # | What is added | Notes |
|---|---|---|
| **A1** | `size` attribute (`s` \| `m` \| `l`, default `m`) | Net-new t-shirt sizing. `m` is the base style, no extra ruleset needed. Implemented via `:host([size="..."])` attribute selectors, not modifier classes. |
| **A2** | `orientation` string attribute (`'vertical'` \| `'horizontal'`, default `'vertical'`) | Net-new layout variant. Consumers not using it are unaffected. |
| **A3** | `actions` slot | Net-new. Leave untyped — a focus group navigation controller will be needed in a future follow-up. |

---

## 2nd-gen API decisions

These are derived from the a11y analysis and rendering roadmap. Confirmed items are marked; open items are tracked in [Blockers and open questions](#blockers-and-open-questions).

### Properties / attributes (2nd-gen)

| Property | Type | Default | Attribute | Notes |
|---|---|---|---|---|
| `headingLevel` | `2 \| 3 \| 4 \| 5 \| 6` | `2` | `heading-level` | **New.** Values outside `2`–`6` silently clamped using `Math.max(2, Math.min(6, level))` — same pattern as `AccordionItem.getHeadingLevel()`. |
| `size` | `'s' \| 'm' \| 'l'` | `'m'` | `size` | **New.**  `m` is the implicit base style `s` and `l` override via `:host([size="s"])` / `:host([size="l"])` attribute selectors per [selector conventions](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/02_custom-properties.md#selector-conventions). |
| `orientation` | `'vertical' \| 'horizontal'` | `'vertical'` | `orientation` | **New.** Drives layout variant; `horizontal` places the illustration beside the content. |

### Slots (2nd-gen)

| Slot | Content | Notes |
|---|---|---|
| *(default)* | Decorative or informative SVG | Decorative SVGs should have `aria-hidden="true"`; informative need `role="img"` + `aria-label` |
| `heading` | Single `<span>` | Restriction is semantic contract; dev-mode warning for non-`span` root nodes |
| `description` | Phrasing content | Links must be real `<a>` or link components with visible names |
| `actions` | **New.** Button group (untyped) | Leave untyped. Focus group navigation controller to be implemented in a future follow-up. |

### CSS custom properties (2nd-gen)

No `--mod-*` properties will be exposed. New `--swc-*` component-level properties may be introduced where needed (especially for size variants) — these are additive and not breaking. See [Component Custom Property Exposure](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/02_custom-properties.md#component-custom-property-exposure) for what to expose and how.

---

## Architecture: core vs SWC split

> The 1st-gen component is a **reference only** — 2nd-gen is built independently. Neither generation imports from the other.

Follow the [Badge migration reference](../../02_workstreams/02_2nd-gen-component-migration/02_step-by-step/01_washing-machine-workflow.md#reference-badge-migration) as the concrete pattern for the core/SWC split.

| Layer | Path | Contains |
|---|---|---|
| **Core** | `2nd-gen/packages/core/components/illustrated-message/` | Abstract base class, types, behavior, validation. No rendering. |
| **SWC** | `2nd-gen/packages/swc/components/illustrated-message/` | Extends core base. Rendering, styles, element registration, stories, tests. |

---

## Migration checklist

### Preparation (this ticket)

- [x] 1st-gen API surface documented
- [x] Dependencies identified
- [x] Breaking changes documented
- [x] 2nd-gen API decisions drafted
- [ ] Plan reviewed by at least one other engineer

### Setup

- [ ] Create `2nd-gen/packages/core/components/illustrated-message/`
- [ ] Create `2nd-gen/packages/swc/components/illustrated-message/`
- [ ] Wire exports in both `package.json` files
- [ ] Check out `spectrum-css` at `spectrum-two` branch as sibling directory

### API

- [ ] `IllustratedMessage.types.ts`: `ILLUSTRATED_MESSAGE_VALID_SIZES`, `ILLUSTRATED_MESSAGE_VALID_HEADING_LEVELS`, derived types
- [ ] `IllustratedMessage.base.ts`: abstract base class built from 1st-gen as reference; `headingLevel`, `size`, `orientation`, `heading`, `description` properties; `getHeadingLevel()` clamping helper; `window.__swc?.DEBUG` warnings for invalid `heading-level` and heading-slot content type; new S2 properties go directly in base with correct names (no old-name forwarding)
- [ ] `IllustratedMessage.ts` (SWC): extends base, static `VALID_SIZES`, S2 rendering

### Styling

> Follow the [CSS style guide](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/) as the source of truth for all styling work. Key references: [migration steps](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/04_spectrum-swc-migration.md), [custom properties](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/02_custom-properties.md), [anti-patterns](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/05_anti-patterns.md).

- [ ] Add `.swc-IllustratedMessage` wrapper element in `render()`; move `classMap` onto wrapper, off `:host`
- [ ] Copy S2 source from `spectrum-css` `spectrum-two` branch `index.css` (not `/dist`) into `illustrated-message.css` as baseline
- [ ] Update class and custom property prefixes from `.spectrum-` to `.swc-`; remove all `--mod-*` and `--spectrum-*` chains per [Component Custom Property Exposure](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/02_custom-properties.md#component-custom-property-exposure)
- [ ] Remove extra override CSS files (`illustratedmessage-overrides.css`) once combined
- [ ] Verify i18n size modifiers (`:lang(ja)`, `:lang(ko)`, `:lang(zh)`)
- [ ] Check all styling decisions against the [CSS style guide](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/) before opening PR
- [ ] Pass stylelint (property order, `no-descending-specificity`, token validation)

### Accessibility

- [ ] Shadow heading renders correct tag (`h2`–`h6`) driven by `heading-level`
- [ ] `heading-level="1"` (and values < 2 or > 6) clamp to valid range — never renders `<h1>`
- [ ] Dev-mode `__swc.warn()` for invalid `heading-level` values
- [ ] Dev-mode `__swc.warn()` if heading slot root is not a `span`
- [ ] Heading slot restricted to `<span>` only; shadow DOM owns the heading tag
- [ ] Decorative illustration guidance documented (`aria-hidden="true"` on SVG); informative illustration guidance documented (`role="img"` + `aria-label`)
- [ ] Actions slot button labels documented

### Testing

- [ ] `test/illustrated-message.test.ts`: heading tag matches `heading-level`; default is `h2`; `heading-level="1"` does not produce `<h1>`; `size` and `orientation` attribute reflection
- [ ] `test/illustrated-message.a11y.spec.ts`: Playwright `toMatchAriaSnapshot` with default story; `heading-level` variants `2`–`5`; no `h1` stories
- [ ] Storybook stories include: default, size `s` / `l`, orientation horizontal, custom `heading-level`, with actions
- [ ] VRT story (`illustrated-message.test-vrt.ts` equivalent)

### Documentation

- [ ] JSDoc on all public props, slots, and CSS custom properties
- [ ] Storybook argTypes driven by `ILLUSTRATED_MESSAGE_VALID_SIZES` and `ILLUSTRATED_MESSAGE_VALID_HEADING_LEVELS` static arrays
- [ ] Migration notes: `heading-level` replaces hard-coded `h2`; heading slot now `span`-only; new `size`, `orientation`, `actions` slot
- [ ] Storybook examples vary `heading-level` by context (not always `2`)
- [ ] Decorative vs meaningful illustration guidance in Storybook

### Review

- [ ] `yarn lint:2nd-gen` passes (ESLint, Stylelint, Prettier)
- [ ] Status table in workstream doc updated
- [ ] PR created with description referencing SWC-1834
- [ ] Peer engineer sign-off

---

## Blockers and open questions

| # | Item | Status | Owner |
|---|---|---|---|
| **Q1** | **`heading` attribute + `heading` slot precedence:** Slot takes precedence via `<slot name="heading">${this.heading}</slot>` — attribute is the fallback, slot content overrides it when present. | **Resolved** |
| **Q2** | **`heading-level` clamping vs type-error:** Silently clamp using `Math.max(2, Math.min(6, level))` — consistent with `AccordionItem.getHeadingLevel()` precedent in the codebase. | **Resolved** |
| **Q3** | **Actions slot type:** Leave untyped — consumer slots any button group content. A focus group navigation controller will need to be implemented in a future follow-up. | **Resolved** |
| **Q4** | **Typography styles dependency (SWC-1545):** 2nd-gen has typography classes but whether they will be importable in the same way as S1's `bodyStyles`/`headingStyles` is TBD. Tracked in SWC-1545. | Open | SWC-1545 |

---

## References

- [Washing machine workflow](../../02_workstreams/02_2nd-gen-component-migration/02_step-by-step/01_washing-machine-workflow.md)
- [Accessibility migration analysis](./accessibility-migration-analysis.md)
- [Rendering and styling migration analysis](./rendering-and-styling-migration-analysis.md)
- [CSS style guide — Component Custom Property Exposure](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/02_custom-properties.md#component-custom-property-exposure)
- [CSS style guide — Selector conventions](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/02_custom-properties.md#selector-conventions)
- [1st-gen source](../../../../1st-gen/packages/illustrated-message/src/IllustratedMessage.ts)
- [1st-gen tests](../../../../1st-gen/packages/illustrated-message/test/illustrated-message.test.ts)
- [Badge migration reference](../../02_workstreams/02_2nd-gen-component-migration/02_step-by-step/01_washing-machine-workflow.md#reference-badge-migration)
- [spectrum-css migration PR #3246](https://github.com/adobe/spectrum-css/pull/3246)
- SWC-1834 (this ticket), SWC-1466 (accordion heading level — analogous precedent), SWC-1545 (typography classes)

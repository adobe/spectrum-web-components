<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../../README.md) / [Project planning](../../README.md) / [Components](../README.md) / Infield Button / Infield Button migration plan

<!-- Document title (editable) -->

# Infield Button migration plan

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

> **Epic SWC-2105** · Planning output. Must be reviewed before implementation begins.
>
> This plan is **provisionally complete**. The materially blocking design and CSS inputs are resolved; remaining open items are architecture/scope decisions for team review (see **Most blocking open questions** below).
> The API, breaking-change table, sequencing, accessibility decisions, and visual matrix are based on confirmed source material (1st-gen source, both analysis docs, ButtonBase 2nd-gen, number-field analysis, Figma S2 spec). The `spectrum-css` `spectrum-two` CSS baseline for Phase 5 has been confirmed (Q2 resolved).

---

## TL;DR

`swc-infield-button` is a compact, always-icon-only field-chrome button. It extends 2nd-gen `ButtonBase` with one visual variant (`quiet`) and four sizes. There is no React Spectrum counterpart; Figma and `spectrum-css` (`spectrum-two` branch) are the design sources.

- **6 confirmed breaking changes:** (B1) remove `block`, (B2) remove `inline`, (B3) rename `label` → `accessible-label`, (B4) remove link API (`href`, `target`, `download`, `rel`, `referrerpolicy`), (B5) remove `--mod-infield-button-*` CSS custom properties, and (B6) icon content moves from the default slot to the named `icon` slot.
- **The `block`/`inline` removal is the largest consumer-facing breaking change.** 1st-gen consumers who composed stacked stepper buttons using `block="start"/"end"` must rework their layouts. S2 uses a consistent corner radius and delegates layout responsibility to the parent field host.
- **Sequencing dependency:** `swc-infield-button` must complete before `swc-number-field` migration, since the number-field S2 HTML explicitly uses `swc-infield-button` for its stepper controls.
- **Scope decision (component existence) surfaced for team review:** The ticket notes ask whether this component is needed and whether it intersects with Clear/Close button. Recommendation is to **keep `swc-infield-button` as a standalone component** (see Q4 in Architecture and behavior).
- **Design and CSS inputs resolved:** the Figma S2 spec (node `126176-34080`) has been reviewed (Q1) and the `spectrum-css` `spectrum-two` CSS baseline has been confirmed (Q2). Remaining open items are architecture/scope decisions (Q3, Q4, Q5).

### Most blocking open questions

- **Q4** in [Architecture and behavior](#architecture-and-behavior): Team confirmation that `swc-infield-button` should remain a standalone component (not merged into `swc-clear-button` or `swc-close-button`).
- **Q5** in [Architecture and behavior](#architecture-and-behavior): Confirm whether `swc-infield-button` or `swc-clear-button` owns the "clear field" affordance in 2nd-gen composed fields (textfield clear, search clear). This affects the consumer migration guide scope and number-field composition model.

---

## 1st-gen API surface

**Source:** [`1st-gen/packages/infield-button/src/InfieldButton.ts`](../../../../1st-gen/packages/infield-button/src/InfieldButton.ts)
**Version:** `@spectrum-web-components/infield-button@1.12.1`
**Custom element tag:** `sp-infield-button`

### Properties / attributes

| Property | Type | Default | Attribute | Notes |
| -------- | ---- | ------- | --------- | ----- |
| `block` | `'start' \| 'end' \| undefined` | undefined | `block` | Vertical stack position (stacked stepper). Adjusts corner radius and border so buttons share a combined border. **Removed in 2nd-gen (B1).** |
| `inline` | `'start' \| 'end' \| undefined` | undefined | `inline` | Horizontal group position (inline start/end of a field). Adjusts corner radius and edge borders. **Removed in 2nd-gen (B2).** |
| `quiet` | `boolean` | `false` | `quiet` | Quiet visual variant (transparent background, no visible border at rest). Reflects to attribute. |
| `size` | `'s' \| 'm' \| 'l' \| 'xl'` | none (no default size) | `size` | From `SizedMixin({ noDefaultSize: true })`; host must provide size or inherit from parent field. |
| `disabled` | `boolean` | `false` | `disabled` | Inherited from `ButtonBase`. |
| `label` | `string \| undefined` | undefined | `label` | Accessible label; maps to `aria-label` on inner `<button>`. **Renamed to `accessible-label` in 2nd-gen (B3).** |
| `active` | `boolean` | `false` | `active` | Inherited from `ButtonBase`. Renders pressed/active visual state. |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | `type` | Button type. Inherited from `ButtonBase`. |
| `tabIndex` | `number` | `0` | — | Inherited from `ButtonBase`. |
| `href` | `string \| undefined` | undefined | `href` | Link href. Inherited via `LikeAnchor` mixin in 1st-gen `ButtonBase`. **Removed in 2nd-gen (B4).** |
| `target` | `string \| undefined` | undefined | `target` | Link target. **Removed in 2nd-gen (B4).** |
| `download` | `string \| undefined` | undefined | `download` | Link download. **Removed in 2nd-gen (B4).** |
| `rel` | `string \| undefined` | undefined | `rel` | Link rel. **Removed in 2nd-gen (B4).** |
| `referrerpolicy` | `string \| undefined` | undefined | `referrerpolicy` | Referrer policy for link. **Removed in 2nd-gen (B4).** |

> **Note on `pending`:** 1st-gen `ButtonBase` (via `PendingMixin`) may expose `pending` and `pending-label` on the public site's API listing for `sp-infield-button`. Do **not** carry `pending` forward on `swc-infield-button`. When the parent field is pending, the parent host disables slotted in-field buttons and owns busy UI and announcements. See [Accessibility semantics notes (2nd-gen)](#accessibility-semantics-notes-2nd-gen).

### Methods

| Method | Signature | Notes |
| ------ | --------- | ----- |
| (none public) | — | No public methods beyond inherited DOM/element APIs. |

### Events

| Event | Type | Notes |
| ----- | ---- | ----- |
| `click` | `MouseEvent` | Standard DOM click. Suppressed when `disabled` by the `handleClick` capture-phase listener in `ButtonBase`. |

### Slots

| Slot | Content | Notes |
| ---- | ------- | ----- |
| (default) | Icon or content | In 1st-gen, icons are placed in the default slot (no named `icon` slot). Wrapped by `<div class="fill">` in shadow DOM. |

### CSS custom properties

The full 1st-gen `--mod-infield-button-*` modifier surface (17 properties) is documented in the [rendering and styling migration analysis](./rendering-and-styling-migration-analysis.md). Key highlights:

- Background color, border, icon color, height, width, fill padding, and border-radius modifiers
- Seven stacked-layout modifiers (border radius resets, inner padding) that are removed in S2 along with `block`/`inline`

This full modifier surface will not be carried forward to 2nd-gen.

### Shadow DOM output (rendered HTML)

```html
<!-- 1st-gen shadow DOM -->
<button class="spectrum-InfieldButton">
  <div class="fill">
    <slot></slot>
  </div>
</button>
```

---

## Dependencies

| Package | Version | Role |
| ------- | ------- | ---- |
| `@spectrum-web-components/base` | workspace | `CSSResultArray`, `html`, `SizedMixin`, `TemplateResult`, `property` decorator |
| `@spectrum-web-components/button` | workspace | `ButtonBase` (1st-gen) — extended as `SizedMixin(ButtonBase, { noDefaultSize: true, validSizes: ['s', 'm', 'l', 'xl'] })` |

**2nd-gen dependency:**

| Package | Role |
| ------- | ---- |
| `@spectrum-web-components/core/components/button` | Provides 2nd-gen `ButtonBase`, `BUTTON_VALID_SIZES`, `ObserveSlotPresence`, `ObserveSlotText` |
| `@spectrum-web-components/core/element` | Provides `SpectrumElement` |
| `@spectrum-web-components/core/mixins` | Provides `SizedMixin` |
| `spectrum-css` (`spectrum-two` branch) `components/infieldbutton/index.css` | S2 CSS baseline (**confirmed — Q2 resolved; see [Styling](#styling)**) |

---

## Migration sequencing and prerequisites

### Dependency-aware recommendation

**`swc-infield-button` should migrate before `swc-number-field`.** The number-field S2 rendering analysis explicitly uses `swc-infield-button` elements for its inline stepper controls. Migrating number-field first would require a stub or workaround.

**`swc-infield-button` can proceed independently of `swc-clear-button`, `swc-close-button`, and `swc-picker-button`** — it does not depend on any of them, and none of them depend on it. All four share `ButtonBase` but are otherwise unrelated.

**`ButtonBase` (2nd-gen) is already migrated and available.** No prerequisite block exists on the core layer; `swc-infield-button` can begin implementation immediately after this plan is reviewed.

### Related components and ordering notes

| Component | Relationship | Ordering note |
| --------- | ------------ | ------------- |
| `swc-button` / `ButtonBase` | Shared base | Complete ✓ — `swc-infield-button` extends 2nd-gen `ButtonBase` |
| `swc-number-field` | Consumer | `swc-infield-button` **must ship first** |
| `swc-clear-button` | Sibling ButtonBase subclass | Independent; no ordering constraint. Scope intersection question (Q5) should be resolved before number-field migration to avoid a second breaking change |
| `swc-close-button` | Sibling ButtonBase subclass | Independent |
| `swc-picker-button` | Sibling ButtonBase subclass | Independent |

### User confirmation needed

The ordering recommendation (infield-button before number-field) is derived from the number-field rendering analysis. If the team has a different migration order in mind, the plan and the number-field analysis should be updated. See Q3 in Scope and prerequisites.

---

## Changes overview

> **Priority framing:**
>
> - **Must ship** items define the in-scope work required for this migration.
> - **Additive** items are deferred or out of scope for this migration.
> - **Accessibility is non-negotiable** — all a11y requirements ship as part of this migration.
> - **Breaking changes** are assessed on merit.

### Must ship — breaking or a11y-required

#### API and naming

| # | What changes | 1st-gen behavior | 2nd-gen behavior | Consumer migration path |
| --- | ------------ | ---------------- | ---------------- | ----------------------- |
| **B1** | Remove `block` attribute | `block="start"/"end"` adjusted corner radius and border for stacked stepper pairs | Removed. S2 uses consistent corner radius; parent field host owns stacked layout via DOM order and CSS | Remove `block` attribute from all `sp-infield-button` usages. Restructure parent field layout to manage corner radius and borders on the containing field element. |
| **B2** | Remove `inline` attribute | `inline="start"/"end"` adjusted corner radius and edge attachment for horizontal inline groups | Removed. Same reason as B1. The parent field host owns inline-group layout (it renders the `.swc-InfieldButton-inline` wrapper). | Remove `inline` attribute. Ensure the parent field host wraps the in-field buttons in the `.swc-InfieldButton-inline` container (or equivalent CSS context). |
| **B3** | Rename `label` → `accessible-label` | `label` attribute maps to `aria-label` on inner `<button>` | `accessible-label` attribute maps to `aria-label` on inner `<button>`, via `ButtonBase`'s `accessibleLabel` property | Replace `label="…"` with `accessible-label="…"` on each `sp-infield-button`. **Required for icon-only; dev warning fires if omitted.** |
| **B4** | Remove link API (`href`, `target`, `download`, `rel`, `referrerpolicy`) | Inherited from 1st-gen `ButtonBase` via `LikeAnchor` mixin | Not implemented. `swc-infield-button` is always `type="button"`. 2nd-gen `ButtonBase` does not expose link attributes. | Remove any `href`-based usage of `sp-infield-button`. Use `<a>` or `swc-button` with an `href` when navigation is needed in a field context (uncommon). |
| **B5** | Remove `--mod-infield-button-*` CSS custom properties | 17 modifier properties supported | None of the `--mod-infield-button-*` properties are carried forward. `--swc-infield-button-*` properties may be introduced selectively (see A1). | Consumers overriding infield-button styling via `--mod-infield-button-*` must switch to `--swc-infield-button-*` equivalents when available, or use CSS custom property targeting directly. |
| **B6** | Icons move from default slot → `icon` slot | `<sp-infield-button label="…"><sp-icon-add></sp-icon-add></sp-infield-button>` (icon in default slot) | Icon must be in the named `icon` slot to trigger `ButtonBase`'s `hasIcon` detection and the `accessible-label` dev warning | Add `slot="icon"` to slotted icon elements: `<swc-infield-button accessible-label="…"><sp-icon-add slot="icon"></sp-icon-add></swc-infield-button>` |

> **Note on B1/B2:** These are the largest consumer-facing breaking changes. 1st-gen consumers who composed `sp-number-field` stepper buttons with `block="start"/"end"` or composed inline groups with `inline="start"/"end"` must restructure their parent field layouts. The migration guide (deferred to Phase 7) must include a worked example showing the equivalent 2nd-gen composition pattern using the parent field's CSS and DOM structure.

#### Styling and visuals

| # | What changes | 1st-gen behavior | 2nd-gen behavior | Consumer migration path |
| --- | ------------ | ---------------- | ---------------- | ----------------------- |
| **S1** | CSS custom properties (see B5 in API table above) | `--mod-infield-button-*` | `--swc-infield-button-*` (limited set; see A1) | Same as B5 in API table |
| **S2** | Stacked-border tokens removed | `--mod-infield-button-stacked-*` tokens handled inner border radius resets for stacked pairs | Removed entirely; S2 uses a consistent corner radius on each button | No consumer action needed if `block`/`inline` are removed per B1/B2 |
| **S3** | Focus state ownership shifts to parent | 1st-gen: each `sp-infield-button` manages its own `:focus-visible` ring | 2nd-gen: the inner `<button>` suppresses its own outline (`outline: none`, matching S2 source); the parent field shows the focus ring in composed contexts while the inner `<button>` stays keyboard-reachable | Verify with field-level stories that focus visibility is preserved and meets WCAG 2.4.7 |

#### Accessibility and behavior

| # | What changes | 1st-gen behavior | 2nd-gen behavior | Consumer migration path |
| --- | ------------ | ---------------- | ---------------- | ----------------------- |
| **A11Y-1** | `role="presentation"` removed from inner `<button>` | Some S2 CSS samples and the rendering diff show `role="presentation"` on the inner `<button>` | 2nd-gen keeps native `button` role on the focus target via `ButtonBase` + `delegatesFocus`. `role="presentation"` is explicitly disallowed on the activatable element. | No consumer action; internal implementation concern. |
| **A11Y-2** | `accessible-label` required for icon-only | `label` was used but enforcement was loose | `ButtonBase` fires a dev-mode warning when `hasIcon && !hasLabel && !accessibleLabel`. Consumers must set `accessible-label`. | Add `accessible-label` to every `swc-infield-button`. |
| **A11Y-3** | `pending` removed from this component | `pending` may be listed in 1st-gen API surface from `PendingMixin` inheritance | `swc-infield-button` does not expose `pending`. When the parent field is pending, the parent host disables slotted in-field buttons. | Do not use `pending` on `swc-infield-button`. Move busy/pending state to the parent field host. |

### Additive — ships when ready, zero breakage for consumers already on 2nd-gen

| # | What is added | Notes |
| --- | ------------- | ----- |
| **A1** | `--swc-infield-button-*` CSS custom properties | A small, reviewed set of `--swc-infield-button-*` properties may be exposed for field-level overrides (e.g. height, icon size). Scope to be confirmed from Figma + number-field integration needs. |
| **A2** | Consumer migration guide | Full upgrade guide from `sp-infield-button` to `swc-infield-button`. Deferred to Phase 7. Must include worked examples for B1/B2 layout migration. |
| **A3** | Form-associated `submit`/`reset` | Deferred to the same `ElementInternals` story as `swc-button` (SWC-48, SWC-2034). Not a primary use case for in-field adornments. |
| **A4** | Intersection study with `swc-clear-button` | If Q5 resolves that `swc-infield-button` and `swc-clear-button` share substantial visual logic, a shared `_lit-styles/` fragment may be worth extracting. Deferred until both components are in Phase 2+. |

---

## 2nd-gen API decisions

These are derived from the 1st-gen implementation, both analysis docs, the 2nd-gen `ButtonBase`, and the number-field rendering analysis. Confirmed items are based on multiple sources; provisional items require Figma or spectrum-two CSS confirmation.

Use lightweight confidence labels: **Confirmed**, **Inferred**, **Open question**.

### Public API

#### Properties / attributes (2nd-gen)

| Property | Type | Default | Attribute | Confidence | Notes |
| -------- | ---- | ------- | --------- | ---------- | ----- |
| `quiet` | `boolean` | `false` | `quiet` | **Confirmed** | Visual variant only; no role or name change. From 1st-gen; preserved in S2 spec. |
| `size` | `'s' \| 'm' \| 'l' \| 'xl'` | none | `size` | **Confirmed** | `noDefaultSize: true` preserved; parent field host must provide size. |
| `disabled` | `boolean` | `false` | `disabled` | **Confirmed** | From `ButtonBase`. Both self-disabled and parent-driven `disabled` must work. |
| `accessibleLabel` | `string \| undefined` | undefined | `accessible-label` | **Confirmed** | From 2nd-gen `ButtonBase`. Required for icon-only. Dev warning fires when `hasIcon && !hasLabel && !accessibleLabel`. |
| `active` | `boolean` | `false` | `active` | **Inferred** | From `ButtonBase`. Preserves pressed visual state. |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | `type` | **Confirmed** | From `ButtonBase`. Always `"button"` for in-field adornments in practice; `submit`/`reset` deferred (A3). |

**Removed from 2nd-gen (breaking):** `block`, `inline`, `href`, `target`, `download`, `rel`, `referrerpolicy`, `pending`, `label` (renamed).

#### Visual matrix (2nd-gen)

> **Confirmed** — reviewed against the Figma `S2 / Web (Desktop scale)` In-field button spec (node `126176-34080`, Published) and the rendering and styling migration analysis.

| Mode | Supported | Source |
| ---- | --------- | ------ |
| Default (filled background, subtle border) | Yes | Figma S2 spec, rendering analysis |
| Quiet (transparent background, no visible border at rest) | Yes | Figma S2 spec, 1st-gen, rendering analysis |
| Disabled (default variant) | Yes | Figma S2 spec, ButtonBase, a11y analysis |
| Disabled (quiet variant) | Yes | Rendering analysis CSS selectors |
| Hover | Yes | Rendering analysis (CSS selectors) |
| Active / pressed | Yes | Rendering analysis |
| Focus-visible (parent field owns the ring; inner `<button>` sets `outline: none`) | Yes | a11y analysis + S2 CSS (`:focus-visible { outline: none }`); focus chrome shown at the parent field in composed contexts |
| Sizes: S, M, L, XL | Yes | Figma S2 spec, 1st-gen `validSizes`, rendering analysis |

**Icon affordances (consumer-supplied via the `icon` slot, not component variants).** Figma documents four icon shapes for in-field buttons; these are the icons consumers slot in, not properties on the component:

| Affordance | Typical use | Notes |
| ---------- | ----------- | ----- |
| Disclosure | Picker / combobox trigger | Default Figma reference icon; uses `field-edge-to-disclosure-icon-*` padding |
| Clear | Text field / search clear | Overlaps `swc-clear-button` scope — see Q5 |
| Dash (−) | Number-field stepper decrement | Used in the inline stepper pair composed by the field host |
| Add (+) | Number-field stepper increment | Used in the inline stepper pair composed by the field host |

Additional presentation modes **not supported in 2nd-gen:**
- Stacked position variant (`block="start"/"end"`) — removed; consistent corner radius in S2
- Inline position variant (`inline="start"/"end"`) — removed; the parent field host owns inline-group layout (it renders the `.swc-InfieldButton-inline` wrapper around the slotted buttons), not `swc-infield-button` itself
- Static color (`static-color="white"/"black"`) — **not present** in Figma S2 spec; confirmed absent (not in 1st-gen; no field-chrome use case for static color)

#### Slots (2nd-gen)

| Slot | Content | Notes |
| ---- | ------- | ----- |
| `icon` | Icon element | **Confirmed.** Named `icon` slot (from `ButtonBase`). `ObserveSlotPresence` in `ButtonBase` monitors `[slot="icon"]` for icon presence. Icon must be decorative (`aria-hidden="true"` on the icon element when `accessible-label` provides the name). **Breaking change from 1st-gen default slot (B6).** |
| (default) | Optional visible label text | **Inferred.** Unlikely to contain content in typical use — `swc-infield-button` is always icon-only in practice. Present because `ButtonBase` exposes it; `ObserveSlotText` monitors it for `hasLabel`. |

#### CSS custom properties (2nd-gen)

No `--mod-*` properties will be exposed. New `--swc-infield-button-*` component-level properties may be introduced where needed — these are additive (A1) and not breaking. See [Component Custom Property Exposure](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/02_custom-properties.md#component-custom-property-exposure) for what to expose and how.

Each exposed `--swc-infield-button-*` property must be documented with a `@cssprop` JSDoc tag on the primary SWC component class.

Initial expectation: a small reviewed set, likely `--swc-infield-button-height` and `--swc-infield-button-icon-size`. The `spectrum-two` CSS baseline has been reviewed (Q2 resolved); final scope is confirmed during Phase 5 implementation.

### Behavioral semantics

**Icon-only with required `accessible-label`:**
`swc-infield-button` is always icon-only. The accessible name comes from `accessible-label` → `aria-label` on the inner `<button>`. The `ButtonBase` dev warning fires in debug mode when `hasIcon && !hasLabel && !accessibleLabel`. Do not rely on `title` alone.

**`disabled` from self and parent:**
Both paths must yield a non-interactive, correctly named button in the accessibility tree. Parent field hosts must explicitly set `disabled` on `swc-infield-button` children (not rely on CSS-only dimming) when the field is disabled or when a specific affordance is inactive (e.g., decrement at minimum value).

**`pending` is not on this component:**
When a parent field is pending, the parent host disables in-field buttons, shows field-level busy UI, and updates the input/field accessible name. `swc-infield-button` has no `pending` or `pending-label` property.

**Focus delegation and keyboard:**
`delegatesFocus: true` is set in `ButtonBase.shadowRootOptions`. The inner `<button>` receives focus; `Enter` / `Space` activate. The component does not implement `FocusgroupNavigationController`. The parent field host owns navigation among input, stepper pairs, and other field siblings.

**No link API:**
`swc-infield-button` has no `href` or related anchor attributes. It is always `type="button"` in practice.

**`noDefaultSize: true`:**
The component does not pick a default size. The parent field host must set `size` (either by attribute or inherited context). This behavior is preserved from 1st-gen. 2nd-gen `ButtonBase` already applies `SizedMixin` with `validSizes: BUTTON_VALID_SIZES` (= `['s', 'm', 'l', 'xl']`), so `InfieldButton.base.ts` only needs to re-apply `SizedMixin(..., { noDefaultSize: true })`; the `validSizes` set already matches and does not need to be overridden (see Q6). Note that M is the Figma **reference** size, not a component default.

### Accessibility semantics notes (2nd-gen)

Full details are in the [accessibility migration analysis](./accessibility-migration-analysis.md). Key decisions for implementation:

| Topic | Decision |
| ----- | -------- |
| Role | `button` on inner `<button>` via `ButtonBase` + `delegatesFocus`. Host must not add `role="button"`. |
| Name | `accessible-label` → `aria-label` on inner `<button>`. Required for icon-only; dev warning enforces. |
| `block`/`inline` removed | Confirmed. Parent field owns layout and border-radius composition. |
| `href` | Not supported. |
| `pending` | Not on `swc-infield-button`. Parent field host owns busy state and disables slotted in-field buttons while pending. |
| Focus group navigation | Not on `swc-infield-button`. Parent field host owns `FocusgroupNavigationController` and Tab/arrow navigation among siblings. |
| `role="presentation"` | Explicitly **not** used on the activatable `<button>`. This is a CSS-sample pattern that strips button semantics; 2nd-gen must not carry it forward. |
| WCAG | WCAG 2.2 AA. Keyboard 2.1.1, Focus Visible 2.4.7, Non-text Contrast 1.4.11, Target Size 2.5.8, Name/Role/Value 4.1.2. |

---

## Architecture: core vs SWC split

> The 1st-gen component is a **reference only** — 2nd-gen is built independently. Neither generation imports from the other.

Follow the [Badge migration reference](../../02_workstreams/02_2nd-gen-component-migration/02_step-by-step/01_washing-machine-workflow.md#reference-badge-migration) as the concrete pattern for the core/SWC split.

| Layer | Path | Contains |
| ----- | ---- | -------- |
| **Core** | `2nd-gen/packages/core/components/infield-button/` | `InfieldButton.base.ts`, `InfieldButton.types.ts`. Semantic rules: `quiet` property, `size` validation, `accessible-label` wiring, `disabled` forwarding. No rendering. |
| **SWC** | `2nd-gen/packages/swc/components/infield-button/` | `InfieldButton.ts`, `infield-button.css`, element registration (`swc-infield-button`), stories, tests. |

Planned rendering shape:

- Core owns: `quiet` property declaration, size validation (`['s', 'm', 'l', 'xl']` with `noDefaultSize: true`), `accessible-label` wiring inherited from `ButtonBase`, `disabled` forwarding
- SWC renders the inner `<button>` with size and quiet modifier classes applied via `classMap` (matching the S2 selectors), the slotted icon styled with `slot[name="icon"]::slotted(*)`:

```ts
html`
  <button
    class=${classMap({
      'swc-InfieldButton': true,
      [`swc-InfieldButton--size${size?.toUpperCase()}`]: !!size,
      'swc-InfieldButton--quiet': this.quiet,
    })}
  >
    <div class="swc-InfieldButton-fill">
      <slot name="icon"></slot>
    </div>
  </button>
`;
```

  The inner SVG/icon is consumer-supplied through the `icon` slot, so its color and padding are applied with `slot[name="icon"]::slotted(*)` (as `swc-button` does), not by putting a `.swc-InfieldButton-icon` class on the slotted node.
- SWC extends core `InfieldButton.base.ts` which extends 2nd-gen `ButtonBase`

**No `_lit-styles/` shared fragment needed at this time.** The infield-button fill/icon layout is specific enough that no fragment currently qualifies. If a fragment emerges during A4 (intersection with clear-button), it should be extracted in a coordinated migration. Flag during Phase 5 if shared structural CSS appears.

**No global element stylesheet counterpart.** `swc-infield-button` has no native HTML element equivalent; `stylesheets/global/global-infield-button.css` is not needed.

---

## Migration checklist

### Preparation (this ticket)

- [x] 1st-gen API surface documented
- [x] Dependencies identified
- [x] Breaking changes documented
- [x] 2nd-gen API decisions drafted
- [x] Figma S2 spec reviewed and visual matrix confirmed (Q1 resolved)
- [ ] Plan reviewed by at least one other engineer
- [x] spectrum-css `spectrum-two` branch CSS baseline confirmed via GitHub API (Q2 resolved)

### Setup

- [ ] Create `2nd-gen/packages/core/components/infield-button/`
- [ ] Create `2nd-gen/packages/swc/components/infield-button/`
- [ ] Wire exports in both `package.json` files
- [ ] For Phase 5, check out `spectrum-css` at the `spectrum-two` branch as a sibling directory for local copy-from-source (baseline already confirmed via GitHub API — Q2 resolved)

### API

#### Naming and public surface

- [ ] `InfieldButton.types.ts`: define `InfieldButtonSize` (alias or reuse from `BUTTON_VALID_SIZES`), `InfieldButtonQuiet` boolean
- [ ] `InfieldButton.base.ts`: extend 2nd-gen `ButtonBase` with `SizedMixin(ButtonBase, { noDefaultSize: true })`; `validSizes` does not need overriding because `BUTTON_VALID_SIZES` already equals `['s', 'm', 'l', 'xl']` (see Q6); add `quiet: boolean` property (reflect: true)
- [ ] `InfieldButton.ts`: extend `InfieldButton.base.ts`; register as `swc-infield-button`; render inner `<button>` (with size and `quiet` modifier classes via `classMap`) containing a `.swc-InfieldButton-fill` div that wraps the `icon` slot
- [ ] Confirm no `block`, `inline`, `href`, `target`, `download`, `rel`, `referrerpolicy`, or `pending` on the public API
- [ ] Confirm `accessible-label` dev warning is active (inherited from `ButtonBase`)

#### Alignment checks

- [x] Quiet variant appearance confirmed against Figma S2 spec (Q1 resolved)
- [x] No static-color variant confirmed against Figma S2 spec (Q1 resolved)
- [x] Size token mapping confirmed from spectrum-two CSS (Q2 resolved): `--spectrum-component-height-75/100/200/300`, corner radius `--spectrum-corner-radius-small-size-*`, edge-to-fill `--spectrum-in-field-button-edge-to-fill-*`

### Styling

> Follow the [CSS style guide](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/) as the source of truth for all styling work. Key references: [migration steps](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/04_spectrum-swc-migration.md), [custom properties](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/02_custom-properties.md), [anti-patterns](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/05_anti-patterns.md).
>
> **S2 CSS baseline confirmed** (Q2 resolved): `spectrum-css` `spectrum-two` branch `components/infieldbutton/index.css` — stacked `--top`/`--bottom` classes absent, S2 token structure present, no `:lang()` selectors present.

- [ ] Copy S2 source from `spectrum-css` `spectrum-two` branch `components/infieldbutton/index.css` (not `/dist`) into `infield-button.css` as the functionally-equivalent baseline
- [ ] Apply `.swc-InfieldButton` (with size/quiet modifier classes via `classMap`) to the inner `<button>`; keep styling off `:host`
- [ ] Update class and custom property prefixes from `.spectrum-InfieldButton` to `.swc-InfieldButton`; **remove all `--mod-infield-button-*` and `--spectrum-infield-button-*` fallback chains**, collapsing each into a single intentional `--swc-infield-button-*` property with a `token(...)` default per the [custom properties style guide](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/02_custom-properties.md)
- [ ] Style the slotted icon with `slot[name="icon"]::slotted(*)` (color + size-specific padding), as `swc-button` does; do **not** put a `.swc-InfieldButton-icon` class on the consumer-slotted node (the S2 `.spectrum-InfieldButton-icon` rule targets an inline SVG in the CSS-only template, which does not apply to the slotted web-component case)
- [ ] `.swc-InfieldButton-fill` (inner `<div>`) owns `background-color`, `border-radius`, and the centering flex
- [ ] Do **not** carry forward `.spectrum-InfieldButton--top` / `--bottom` stacked classes; S2 uses a consistent corner radius on the button itself
- [ ] The `.swc-InfieldButton-inline` wrapper is **not** rendered by this component; it belongs to the parent field host (number-field/textfield) that composes stepper/clear groups

#### Visual model and regressions

- [ ] Map size tokens to `var(--swc-infield-button-*, token("..."))`. M is the Figma reference size, not a component default (`noDefaultSize: true`):
  - Size M (reference): height/width `token("component-height-100")`, border-radius `token("corner-radius-small-size-medium")`, padding `token("in-field-button-edge-to-fill-medium")`
  - Size S: `:host([size="s"])` → `token("component-height-75")`, `token("corner-radius-small-size-small")`, `token("in-field-button-edge-to-fill-small")`, `token("in-field-button-side-edge-to-fill-small")`
  - Size L: `:host([size="l"])` → `token("component-height-200")`, `token("corner-radius-small-size-large")`, `token("in-field-button-edge-to-fill-large")`
  - Size XL: `:host([size="xl"])` → `token("component-height-300")`, `token("corner-radius-small-size-extra-large")`, `token("in-field-button-edge-to-fill-extra-large")`
- [ ] Map visual states to `token()`:
  - Default: background `token("gray-100")`, icon `token("neutral-content-color-default")`
  - Hover: background `token("gray-200")`, icon `token("neutral-content-color-hover")`
  - Active/down: background `token("gray-200")`, icon `token("neutral-content-color-down")`; `transform: perspective(...) translateZ(...)` on the `<button>` using the S2 downstate tokens
  - Disabled: background `token("disabled-background-color")`, icon `token("disabled-content-color")`
  - Quiet: `transparent` background for default, hover, active, and disabled (not the gray disabled color)
- [ ] Focus model: the inner `<button>` sets `outline: none` (matches S2 source). In **composed** field contexts the parent field (number-field, textfield, picker) owns the focus-visible ring while the inner `<button>` stays keyboard-reachable via `delegatesFocus`; verify with a field-level story. In **isolated** standalone usage there is no visible focus indicator by default; if one is required it must be added deliberately and meet WCAG 2.4.7. Do not add a competing `:focus-visible` outline that would double-ring inside a field
- [ ] Forced colors (Windows High Contrast): default variant on `.swc-InfieldButton` → background `ButtonText`, icon `ButtonFace`, `forced-color-adjust: none` on the `<button>`; disabled → background `GrayText`; hover/active/focus-visible → background `Highlight`. Quiet variant → background `Canvas`, icon `ButtonText`; disabled → `Canvas` / `GrayText`; hover/active/focus-visible → `Canvas` / `Highlight`. Sort the `@media (forced-colors: active)` block to the bottom of the file per style guide
- [ ] Verify no `:lang(ja)`, `:lang(ko)`, `:lang(zh)` size modifiers needed (not present in S2 baseline)
- [ ] Add a `@cssprop` JSDoc tag to the primary SWC component class for every exposed `--swc-infield-button-*` property (initial expectation: `--swc-infield-button-height`, `--swc-infield-button-icon-size`)
- [ ] Pass stylelint (property order, `no-descending-specificity`, token validation)

### Accessibility

#### Naming and semantics

- [ ] `accessible-label` is required for icon-only; confirm dev warning inherits from `ButtonBase`
- [ ] `role="button"` on inner `<button>` only; no second `role="button"` on host
- [ ] `role="presentation"` is **not** set on the inner `<button>` (guard against accidental S2 CSS sample copy)
- [ ] Icon element in `icon` slot is `aria-hidden="true"` (decorative when `accessible-label` provides name)
- [ ] No `href`, no link semantics

#### State verification

- [ ] `disabled` on host → native `disabled` on inner `<button>` (tab skip, no activation)
- [ ] Parent-driven `disabled` (field host sets `disabled` on `swc-infield-button`) → same result
- [ ] `accessible-label` dynamically updated → `aria-label` on inner `<button>` updates
- [ ] No `pending` or `aria-disabled` busy state on `swc-infield-button` itself
- [ ] Inner `<button>` is keyboard-focusable via `delegatesFocus` and activates on `Enter`/`Space`; the inner `<button>` sets `outline: none` and relies on the parent field for the visible focus ring in composed contexts (see the focus model bullet under [Styling](#styling))

### Testing

- [ ] Port applicable coverage from [`1st-gen/packages/infield-button/test/infield-button.test.ts`](../../../../1st-gen/packages/infield-button/test/infield-button.test.ts):
  - Default rendering accessible (axe)
  - Stacked rendering accessible — **NOTE:** stacked with `block` attribute is removed; replace with parent-composed stepper fixture
- [ ] Add Playwright `infield-button.a11y.spec.ts` with `toMatchAriaSnapshot`

#### Behavior

- [ ] Unit: `accessible-label` → `aria-label` on inner `<button>` wired correctly
- [ ] Unit: `disabled` on host forwards to inner `<button>` (`disabled` attribute)
- [ ] Unit: parent host sets `disabled` → inner `<button>` becomes disabled
- [ ] Unit: `quiet` reflects to host attribute
- [ ] Unit: `size` s/m/l/xl size class applied correctly; no default size when unset
- [ ] Unit: dev warning fires when `hasIcon && !hasLabel && !accessibleLabel` in DEBUG mode
- [ ] Unit: no `block`, `inline`, `href`, `pending` on public API
- [ ] Unit: `handleClick` capture listener suppresses click when `disabled` (inherited from `ButtonBase`)
- [ ] Unit: slotted icon in `icon` slot detected via `ObserveSlotPresence`
- [ ] Playwright: `Enter` / `Space` on focused in-field button fires `click`
- [ ] Playwright: `Enter` / `Space` suppressed when `disabled` (self-disabled and parent-disabled fixtures)
- [ ] Playwright ARIA snapshot: `button` role + name on focus target; `disabled` state in snapshot
- [ ] aXe: icon-only with `accessible-label`; disabled on host; parent-disabled fixture

#### Visual regression

- [ ] VRT coverage for: sizes (s, m, l, xl) × states (default, hover, active, disabled) × quiet/default variant
- [ ] VRT: quiet variant: default, hover, active, disabled
- [ ] VRT: icon affordance coverage (disclosure, clear, dash, add) per the Figma spec
- [ ] VRT: composed-field focus (parent field shows the ring; inner `<button>` has `outline: none`)
- [ ] VRT: WHCM (`@media (forced-colors: active)`) — icon and background colors track `ButtonText`/`Canvas`/`Highlight` per variant

### Documentation

#### General

- [ ] JSDoc on `InfieldButton.base.ts` and `InfieldButton.ts`: class, all public props, slots, and CSS custom properties
- [ ] Storybook stories for: Playground, Overview, Sizes, States (default, disabled, quiet), Icon affordances (disclosure, clear, dash, add), Accessibility
- [ ] No `block`, `inline`, or stacked layout examples in Storybook

#### Breaking changes

- [ ] Phase 7 consumer migration guide (A2) documents: `label` → `accessible-label`, `block`/`inline` removal with worked layout migration example, link API removal, slot rename (default → `icon`), CSS custom property rename
- [ ] Migration guide references number-field composed stepper pattern as the primary use case

### Review

- [ ] `yarn lint:2nd-gen` passes (ESLint, Stylelint, Prettier)
- [ ] Status table in `CONTRIBUTOR-DOCS/03_project-planning/02_workstreams/02_2nd-gen-component-migration/01_status.md` updated
- [ ] PR created with description referencing Epic SWC-2105
- [ ] Peer engineer sign-off

---

## Blockers and open questions

### Design

| # | Item | Blocking? | Status | Owner |
| --- | ---- | --------- | ------ | ----- |
| **Q1** | **Figma spec reviewed.** The `S2 / Web (Desktop scale)` In-field button spec (node [`126176-34080`](https://www.figma.com/design/Mngz9H7WZLbrCvGQf3GnsY/S2---Web--Desktop-scale-?node-id=126176-34080)) was reviewed. Confirmed: 4 sizes (S, M, L, XL), quiet variant, standard interaction states (default, hover, active, disabled), no static-color variant, no stacked position variants, and four consumer-supplied icon affordances (disclosure, clear, dash, add). Visual matrix updated. | Resolved | **Resolved** | — |

### Architecture and behavior

| # | Item | Blocking? | Status | Owner |
| --- | ---- | --------- | ------ | ----- |
| **Q3** | **Migration ordering: infield-button before number-field.** Recommended based on the number-field rendering analysis explicitly composing `swc-infield-button`. If the team has a different sequencing preference, both this plan and the number-field analysis need updating. | Yes — affects planning | Open (recommendation made) | Architecture reviewer. Next action: confirm or override the sequencing recommendation. |
| **Q4** | **Component existence: should `swc-infield-button` remain a standalone component?** The ticket explicitly asks whether this component is needed and whether it intersects with Clear or Close button. **Recommendation: keep as a standalone component.** Rationale: (1) The CSS tokens are specialized (`--spectrum-in-field-button-*`) and designed for field-chrome integration. (2) The quiet variant has unique transparent-background field-integration behavior. (3) Neither `swc-clear-button` nor `swc-close-button` has a migration analysis yet — merging before either is analyzed would be premature. (4) The number-field migration explicitly depends on `swc-infield-button`. (5) There is no React Spectrum counterpart to reconcile with. **Counter-argument:** If the team decides `swc-clear-button` and quiet `swc-infield-button` are functionally equivalent for the clear-field use case, they should be consolidated before either migrates to avoid a second breaking change. This is Q5 below. | Yes — decision affects scope | Open (recommendation made) | Architecture reviewer. Next action: team confirms keep vs consolidate before implementation begins. |
| **Q5** | **Scope intersection with `swc-clear-button`: who owns "clear field" affordances?** In 1st-gen, `sp-infield-button` is used for generic field actions (stepper +/−, disclosure). `sp-clear-button` is a separate component. In 2nd-gen, if `swc-infield-button` (quiet variant) and `swc-clear-button` have the same visual appearance, there is an argument for a single component. **Recommendation: keep separate, but resolve the composition contract before `swc-number-field` migration.** Confirm: does `swc-textfield` / `swc-search` use `swc-infield-button` or `swc-clear-button` for their clear actions? The answer affects the scope boundary and the consumer migration guide for both components. The Figma In-field button spec ([`126176-34080`](https://www.figma.com/design/Mngz9H7WZLbrCvGQf3GnsY/S2---Web--Desktop-scale-?node-id=126176-34080)) documents a **clear** icon affordance as one of the in-field button icon types, which is direct evidence for the overlap. Next action: review that frame and the textfield/search rendering analyses to confirm which button type each field uses for clear. | Partial — blocks consumer guide scope | Open | Architecture + design. |

### Scope and prerequisites

| # | Item | Blocking? | Status | Owner |
| --- | ---- | --------- | ------ | ----- |
| **Q2** | **spectrum-css `spectrum-two` branch CSS baseline confirmed.** `components/infieldbutton/index.css` read directly from GitHub API (`spectrum-two` branch, SHA `a1e54ec`). Confirmed: `.spectrum-InfieldButton--top` / `--bottom` stacked classes **absent**. S2 token structure present (`--spectrum-component-height-*`, `--spectrum-in-field-button-*`, `--spectrum-corner-radius-small-size-*`). No `:lang(ja/ko/zh)` selectors. Forced-colors block present for both default and quiet variants. Styling checklist updated accordingly. | No | **Resolved** | — |
| **Q6** | **`noDefaultSize: true` inheritance from 1st-gen.** Confirmed in 1st-gen source. Verified that 2nd-gen `BUTTON_VALID_SIZES` in `Button.types.ts` is `['s', 'm', 'l', 'xl']`, which already matches the infield-button size set, so `validSizes` does **not** need overriding. `InfieldButton.base.ts` only needs to re-apply `SizedMixin(ButtonBase, { noDefaultSize: true })`; no `INFIELD_BUTTON_VALID_SIZES` constant is required. | No — low risk | **Resolved** | — |

---

## References

- [Washing machine workflow](../../02_workstreams/02_2nd-gen-component-migration/02_step-by-step/01_washing-machine-workflow.md)
- [2nd-gen migration status table](../../02_workstreams/02_2nd-gen-component-migration/01_status.md)
- [Accessibility migration analysis](./accessibility-migration-analysis.md)
- [Rendering and styling migration analysis](./rendering-and-styling-migration-analysis.md)
- [CSS style guide — Component Custom Property Exposure](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/02_custom-properties.md#component-custom-property-exposure)
- [CSS style guide — Selector conventions](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/02_custom-properties.md#selector-conventions)
- [1st-gen source — `InfieldButton.ts`](../../../../1st-gen/packages/infield-button/src/InfieldButton.ts)
- [1st-gen tests](../../../../1st-gen/packages/infield-button/test/infield-button.test.ts)
- [1st-gen README](../../../../1st-gen/packages/infield-button/README.md)
- [2nd-gen `ButtonBase`](../../../../2nd-gen/packages/core/components/button/Button.base.ts)
- [Button migration plan](../button/migration-plan.md)
- [Button accessibility migration analysis](../button/accessibility-migration-analysis.md)
- [Number-field rendering and styling migration analysis](../number-field/rendering-and-styling-migration-analysis.md)
- [Spectrum CSS — `spectrum-two` branch `infieldbutton` component](https://github.com/adobe/spectrum-css/tree/spectrum-two/components/infieldbutton) — `components/infieldbutton/index.css` is the confirmed S2 CSS baseline (Q2 resolved)
- [S2 / Web (Desktop scale) — In-field button (Figma)](https://www.figma.com/design/Mngz9H7WZLbrCvGQf3GnsY/S2---Web--Desktop-scale-?node-id=126176-34080) — component design spec (primary visual source)
- [S2 Token specs — In-field button (Figma)](https://www.figma.com/design/eoZHKJH9WZLbrCvGQf3GnsY/S2-Token-specs?node-id=814-8689) — token values reference
- [WAI-ARIA APG: Button pattern](https://www.w3.org/WAI/ARIA/apg/patterns/button/)
- [Focus management (contributor guide)](../../../01_contributor-guides/14_focus-management.md)
- [Badge migration reference](../../02_workstreams/02_2nd-gen-component-migration/02_step-by-step/01_washing-machine-workflow.md#reference-badge-migration)
- Epic: SWC-2105 — Infield Button epic
- Migration plan ticket: SWC-2107

<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../../README.md) / [Project planning](../../README.md) / [Components](../README.md) / Action Button / Action button migration plan

<!-- Document title (editable) -->

# Action button migration plan

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
    - [Prerequisites](#prerequisites)
    - [Dependencies this migration creates](#dependencies-this-migration-creates)
    - [`spectrum-css` setup](#spectrum-css-setup)
    - [Recommended order](#recommended-order)
- [Changes overview](#changes-overview)
    - [Must ship — breaking or a11y-required](#must-ship--breaking-or-a11y-required)
    - [Additive — ships when ready, zero breakage for consumers already on 2nd-gen](#additive--ships-when-ready-zero-breakage-for-consumers-already-on-2nd-gen)
- [2nd-gen API decisions](#2nd-gen-api-decisions)
    - [Public API](#public-api)
    - [Visual matrix](#visual-matrix)
    - [Pending state (new in 2nd-gen)](#pending-state-new-in-2nd-gen)
    - [Accessibility semantics notes (2nd-gen)](#accessibility-semantics-notes-2nd-gen)
    - [Deferred semantics note (2nd-gen)](#deferred-semantics-note-2nd-gen)
- [Architecture: core vs SWC split](#architecture-core-vs-swc-split)
    - [Shared semantics reuse](#shared-semantics-reuse)
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
    - [Resolved decisions](#resolved-decisions)
    - [Deferred follow-up tickets](#deferred-follow-up-tickets)
- [Breaking changes to verify](#breaking-changes-to-verify)
- [References](#references)

</details>

<!-- Document content (editable) -->

> **SWC-2039** · Planning output. Must be reviewed before implementation begins.

---

## TL;DR

- `swc-action-button` extends `ButtonBase` from `2nd-gen/packages/core/components/button/` — no separate `ActionButton.base.ts` in core is needed since no 2nd-gen component inherits from `swc-action-button`
- `selected`, `toggles`, and `aria-pressed` are removed from `swc-action-button`; toolbar-style toggles move to `swc-toggle-button` / `swc-toggle-button-group`
- `emphasized` is removed because it only applies to the selected state, which is removed
- `hold-affordance` / `longpress` are deferred until a later date; Storybook and migration copy must say so explicitly
- `href` / link API is removed entirely; navigation uses native `<a>` elements
- `pending` ships with the initial release; `ButtonBase` provides the logic and the visual implementation can be copied from `swc-button`
- `accessible-label` replaces `label` (inherited from `ButtonBase`)
- `size` includes `xs` (not available on `swc-button`), requiring `ACTION_BUTTON_VALID_SIZES` in `ActionButton.types.ts`
- `quiet` and `static-color` are retained as the primary visual differentiators for this component
- `value` is **deferred**; removed from the initial release — `swc-action-group` does not support the same selection semantics as 1st-gen, form-association use cases are inconsistent with `swc-button`, and `value` via form association has known issues; tracked in SWC-2042

### Most blocking open questions

- **Q2** — Consumer migration copy for `swc-action-button` references `swc-toggle-button` / `swc-toggle-button-group`, which are not yet available in 2nd-gen. Either hold the migration-guide note or add an explicit "coming soon" caveat before documenting the toggle migration path.
- **Q1** (provisional, not blocking implementation) — The Figma PNG from `S2 / Web (Desktop scale)` has not been provided. The visual matrix in this plan is inferred from analysis docs. Confirm before Phase 5 (styling).

---

## 1st-gen API surface

**Source:** [`1st-gen/packages/action-button/src/ActionButton.ts`](../../../../1st-gen/packages/action-button/src/ActionButton.ts)
**Version:** `@spectrum-web-components/action-button@1.12.1`
**Custom element tag:** `sp-action-button`
**Extends:** `SizedMixin(ButtonBase, { validSizes: ['xs', 's', 'm', 'l', 'xl'], noDefaultSize: true })`

### Properties / attributes

| Property | Type | Default | Attribute | Notes |
|---|---|---|---|---|
| `emphasized` | `boolean` | `false` | `emphasized` | Adds visual emphasis to the selected state only. |
| `holdAffordance` | `boolean` | `false` | `hold-affordance` | Shows a corner triangle indicator; wires 300 ms pointer timer and keyboard path for `longpress`. |
| `quiet` | `boolean` | `false` | `quiet` | Applies quiet styling (no background/border at rest). |
| `role` | `string` | `'button'` | `role` | Overrides the ARIA role. Used by 1st-gen `sp-action-group` to reassign `radio` / `checkbox` on children. |
| `selected` | `boolean` | `false` | `selected` | Whether the button is selected. Managed by `toggles` or set externally. |
| `toggles` | `boolean` | `false` | `toggles` | When true, automatically manages `selected` on click and exposes `aria-pressed`. |
| `staticColor` | `'white' \| 'black' \| undefined` | `undefined` | `static-color` | Static color variant for use over images or colored backgrounds. |
| `value` | `string` | `''` (falls back to `textContent`) | `value` | Used for identification in action groups. |
| `size` | `'xs' \| 's' \| 'm' \| 'l' \| 'xl'` | `'m'` (no attribute) | `size` | T-shirt sizes; no default attribute from `noDefaultSize: true`. |
| `disabled` | `boolean` | `false` | `disabled` | Inherited from `Focusable`; removes focusability. |
| `autofocus` | `boolean` | `false` | `autofocus` | Inherited from `Focusable`. |
| `tabIndex` | `number` | managed | `tabindex` | Inherited from `Focusable`. |
| `label` | `string \| undefined` | `undefined` | `label` | Inherited from `LikeAnchor`; mirrored to host `aria-label`. Accessible name for icon-only usage. |
| `href` | `string \| undefined` | `undefined` | `href` | Deprecated link mode (dev warning in 1st-gen). |
| `target` | link target union | `undefined` | `target` | Deprecated with `href`. |
| `download` | `string \| undefined` | `undefined` | `download` | Deprecated with `href`. |
| `referrerpolicy` | `string \| undefined` | `undefined` | `referrerpolicy` | Deprecated with `href`. |
| `rel` | `string \| undefined` | `undefined` | `rel` | Deprecated with `href`. |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | `type` | Inherited from `ButtonBase`. |
| `name` | `string` | `undefined` | `name` | Inherited from `ButtonBase`; form field name. |
| `active` | `boolean` | `false` | `active` | Reflected pressed-state flag used during keyboard hold interaction. |

### Methods

| Method | Signature | Notes |
|---|---|---|
| `click()` | `(): void` | Delegates to `Focusable.click()`; no special pending guard in 1st-gen (1st-gen has no pending state). |

### Events

| Event | Detail | Notes |
|---|---|---|
| `change` | `Event` (cancelable) | Fired when `selected` changes via `toggles`. Calling `preventDefault()` reverts `selected`. |
| `longpress` | `CustomEvent<{ source: 'pointer' \| 'keyboard' }>` | Fired after 300 ms pointer hold or `Space` / `Alt+ArrowDown` key hold when `hold-affordance` is set. |

### Slots

| Slot | Content | Notes |
|---|---|---|
| default | Visible text label | Required for accessible name unless `label` / `accessible-label` is set. |
| `icon` | Leading icon element | Optional; component detects icon presence via slot content inspection. |

### CSS custom properties

The 1st-gen implementation uses `--spectrum-actionbutton-*` and `--mod-actionbutton-*` token chains via imported `action-button.css`, `spectrum-action-button.css`, and `action-button-overrides.css`. The modifier surface covers sizing and spacing, typography, and a full color/state/variant matrix. This full modifier surface will **not** be carried forward to 2nd-gen. A small reviewed set of `--swc-action-button-*` properties will be exposed instead.

### Shadow DOM output (rendered HTML)

```html
<!-- Hold affordance icon (when hold-affordance=true) — deferred in 2nd-gen -->
<sp-icon-corner-triangle300
  class="hold-affordance spectrum-UIIcon-CornerTriangle{size}"
></sp-icon-corner-triangle300>

<!-- Icon slot -->
<slot name="icon"></slot>

<!-- Label -->
<span id="label">
  <slot></slot>
</span>
```

The host element itself carries `role="button"` and is the primary focus target. There is no inner native `<button>`.

---

## Dependencies

| Package | Version | Role |
|---|---|---|
| `@spectrum-web-components/base` | `1.x` | `LitElement` base utilities, decorators, `SizedMixin` |
| `@spectrum-web-components/shared` | `1.x` | `Focusable`, `LikeAnchor`, `ObserveSlotText` behaviors (1st-gen) |
| `@spectrum-web-components/button` (1st-gen) | `1.x` | `ButtonBase` (1st-gen base class) |
| `@spectrum-web-components/icon` / consumer icons | `1.x` | Optional slotted icon content |
| `@spectrum-web-components/icons-ui` | `1.x` | `sp-icon-corner-triangle300` for hold affordance (deferred) |
| **2nd-gen core `ButtonBase`** | local | Shared pending, accessible-name, disabled, and slot-detection logic — replaces 1st-gen `ButtonBase` lineage |

---

## Migration sequencing and prerequisites

### Prerequisites

`ButtonBase` in `2nd-gen/packages/core/components/button/` is the shared base `swc-action-button` extends. It is already available and provides `disabled`, `pending`, accessible-name resolution, and `delegatesFocus` behavior. No prerequisite migration needs to complete before `swc-action-button` work can begin.

### Dependencies this migration creates

- **`swc-action-group`** will depend on `swc-action-button`. The action-group migration should begin after `swc-action-button` is stable.
- **`swc-toggle-button` / `swc-toggle-button-group`** are separate migrations. Consumer migration guidance for `swc-action-button` (documenting the `toggles` removal) references these components. The guidance note should include an explicit "coming soon" caveat until those components are available (Q2).

### `spectrum-css` setup

Phase 5 (styling) requires `spectrum-css` checked out at the `spectrum-two` branch as a sibling directory of this repo. Confirm this is in place before Phase 5 begins.

### Recommended order

1. `swc-action-button` — can start now; `ButtonBase` is available
2. `swc-toggle-button` / `swc-toggle-button-group` — can proceed in parallel or after; does not block `swc-action-button`
3. `swc-action-group` — should wait for `swc-action-button` to stabilize

---

## Changes overview

> **Priority framing:**
> - **Accessibility is non-negotiable** — all a11y requirements ship as part of this migration.
> - **Breaking changes** are assessed on merit — some must ship now to avoid a second migration event later.
> - **Additive changes** can be deferred and will not cause consumer breakage when they do ship.

### Must ship — breaking or a11y-required

#### API and naming

| # | What changes | 1st-gen behavior | 2nd-gen behavior | Consumer migration path |
|---|---|---|---|---|
| **B1** | Remove `href` / link API | `href` and related attributes cause `sp-action-button` to proxy a hidden anchor. A dev warning was added in 1st-gen. | `swc-action-button` is button-only. Navigation uses native `<a>` elements. | Replace `<sp-action-button href="...">` with a native `<a>` element styled with the generated `global-action-button.css` stylesheet. See Phase 5 styling task for global elements setup. |
| **B2** | Remove `toggles`, `selected`, and `aria-pressed` | 1st-gen `sp-action-button` supports toggle semantics (`toggles`, `selected`, `change` event, `aria-pressed`). | 2nd-gen `swc-action-button` is a commit control only. Toggle / selection UX moves to `swc-toggle-button` / `swc-toggle-button-group`. | Replace toolbar toggle usage with `swc-toggle-button` or `swc-toggle-button-group`. |
| **B3** | Remove `emphasized` | `emphasized` added visual emphasis to the selected state. | With `selected` removed from `swc-action-button`, `emphasized` has no target and is also removed. | No equivalent needed; emphasize via `swc-toggle-button` if a selected-emphasized style is required. |
| **B4** | Defer `hold-affordance` / `longpress` | 1st-gen wires a 300 ms pointer timer and `Space` / `Alt+ArrowDown` keyboard path. | `swc-action-button` defers hold affordance until a later date. The consumer options are: (1) continue using 1st-gen `sp-action-button`; (2) extend `swc-button` for custom hold; (3) use separate `swc-action-button` instances in `swc-action-group`. | Migrate to action-group layout (separate button + menu) where possible. |
| **B5** | Move semantics to an internal native `<button>` | 1st-gen host carries `role="button"` and is the primary tab stop; no inner native button. | 2nd-gen renders an inner `<button type="button">` as the semantic control; host carries no button role. Focus delegates to the inner control. | Any shadow DOM poking, role assertions, or tabindex assumptions on the host must be updated. |
| **B6** | Remove `role` as a public API | 1st-gen `sp-action-group` reassigned `role="radio"` or `role="checkbox"` to child `sp-action-button` elements. 2nd-gen a11y analysis forbids this. | `swc-action-button` is always `role="button"`. Exclusive-choice ("radio") UX belongs on `swc-segmented-control` / `swc-segmented-control-button`. | Migrate exclusive-choice patterns to `swc-segmented-control`. |
| **B7** | Replace `label` with `accessible-label` / `accessibleLabel` | `label` from `LikeAnchor` was mirrored to host `aria-label`. | `accessibleLabel` (attribute `accessible-label`) from `ButtonBase` is forwarded as `aria-label` on the internal `<button>`. | Replace `label="..."` with `accessible-label="..."`. |
| **B8** | Remove `--mod-*` customization surface | Consumers can override many sizes, colors, and spacings through legacy modifier chains. | 2nd-gen exposes only a small reviewed `--swc-action-button-*` set. | Migrate to the supported `--swc-action-button-*` properties or wrapper-level CSS. |

#### Accessibility and behavior

| # | What changes | 1st-gen behavior | 2nd-gen behavior | Consumer migration path |
|---|---|---|---|---|
| **B9** | Icon-only warning for missing accessible name | No dedicated dev-mode warning; authors could silently ship inaccessible icon-only buttons. | Dev-mode warning (`__swc.warn()`) when an icon is slotted, no visible label exists, and `accessible-label` is absent — same warning pattern as `swc-button`. | Always provide `accessible-label` for icon-only usage. |
| **B10** | Focus delegation to inner `<button>` | Host is the primary tab stop. | `delegatesFocus: true`; inner `<button>` receives focus. Host `tabIndex` is still meaningful as the activation delegate. | `shadowRoot.activeElement` assertions must change to the inner `<button>`. |
| **B11** | `pending` / `pending-label` support | Not in 1st-gen. | Ships with the initial release. `ButtonBase` provides the logic; visual implementation (animated SVG spinner, 1-second delay, width locking) is copied from `swc-button`. `aria-disabled="true"` on the inner `<button>` while pending; accessible name updated with busy suffix. | No migration required; purely additive to consumers. |

### Additive — ships when ready, zero breakage for consumers already on 2nd-gen

| # | What is added | Notes |
|---|---|---|
| **A1** | Explicit `--swc-action-button-*` custom properties | Only expose properties justified by the CSS custom-property guide; do not recreate the old modifier matrix. |
| **A2** | Playwright accessibility snapshots | Strengthen regression coverage without changing the public API. |
| **A3** | Future cross-root ARIA mapping | Deferred until the cross-root semantics approach is settled. |
| **A4** | `hold-affordance` / `longpress` (future) | When eventually implemented, use `longpress-enabled` / `longpress-help-text` per [Action button accessibility migration analysis](./accessibility-migration-analysis.md). |
| **A5** | `staticColor="auto"` from React Spectrum S2 | Not part of initial scope. |
| **A6** | Badge slot — corner badge lockup | Matches React Spectrum S2 support for `swc-badge` slotted inside an action button. Icon+Badge and Avatar+Badge produce a distinct corner-overlay lockup vs. inline content. Badge content (e.g. a count) may contribute to the button's accessible name; requires a11y review before shipping. Tracked in SWC-2042 follow-up. |
| **A7** | Avatar slot — avatar lockup | Matches React Spectrum S2 support for `swc-avatar` slotted inside an action button. Avatar is mutually exclusive with the `icon` slot; it replaces the icon. Avatar+Badge is a specific compound lockup. The avatar's accessible name and its relationship to the button's accessible name must be reviewed before shipping. Tracked in SWC-2042 follow-up. |

---

## 2nd-gen API decisions

These decisions are derived from the 1st-gen implementation, the current deprecations, the [Spectrum 2 Action button Figma spec](https://www.figma.com/design/Mngz9H7WZLbrCvGQf3GnsY/S2---Web--Desktop-scale-?node-id=702-2877), the [accessibility migration analysis](./accessibility-migration-analysis.md), and the [rendering and styling migration analysis](./rendering-and-styling-migration-analysis.md). Confirmed items are marked; deferred follow-up work is tracked in [Blockers and open questions](#blockers-and-open-questions).

**Scope note:** this plan is for `swc-action-button` only. `swc-toggle-button`, `swc-toggle-button-group`, `swc-segmented-control`, and `swc-action-group` are separate migration efforts that must not block this plan.

### Public API

#### Properties / attributes (2nd-gen)

| Property | Type | Default | Attribute | Notes |
|---|---|---|---|---|
| `size` | `'xs' \| 's' \| 'm' \| 'l' \| 'xl'` | `'m'` | `size` | **Confirmed.** Includes `xs` — differs from `swc-button` which starts at `s`. Requires `ACTION_BUTTON_VALID_SIZES` in `ActionButton.types.ts`. No default attribute (`noDefaultSize: true`): `getAttribute('size')` returns `null` until a consumer sets it explicitly; the JS property defaults to `'m'` but is not reflected to the DOM automatically. |
| `quiet` | `boolean` | `false` | `quiet` | **Confirmed.** Retained as a primary visual differentiator (no background/border at rest). Unlike Button's deprecated `quiet`, this is a first-class visual treatment for action-button. |
| `staticColor` | `'white' \| 'black' \| undefined` | `undefined` | `static-color` | **Confirmed.** Static color for use over images or colored backgrounds. Supported with both default and `quiet` treatments. |
| `value` | deferred | n/a | deferred | **Deferred (SWC-2042).** `swc-action-group` does not support the same selection semantics as 1st-gen, so the primary consumer use case does not exist yet. Form-association use cases are inconsistent with `swc-button` not having `value`, and `value` via form association has known issues. Removed from initial release; tracked in SWC-2042. |
| `disabled` | `boolean` | `false` | `disabled` | **Confirmed.** Inherited from `ButtonBase`. Maps to native `disabled` on the internal `<button>`. |
| `pending` | `boolean` | `false` | `pending` | **Confirmed (B11).** Ships with the initial release. `ButtonBase` provides the logic; visual implementation is copied from `swc-button`. Button remains focusable; activation is suppressed. |
| `accessibleLabel` | `string \| undefined` | `undefined` | `accessible-label` | **Confirmed.** Replaces 1st-gen `label`. Forwarded as `aria-label` on the internal `<button>`. Required for icon-only usage. Inherited from `ButtonBase`. |
| `pendingLabel` | `string \| undefined` | `undefined` | `pending-label` | **Confirmed (B11).** Ships with the initial release alongside `pending`. Custom accessible label during pending state. When omitted, derived from resolved name + `", busy"` suffix. Inherited from `ButtonBase`. |
| `label` | removed | n/a | removed | **Planned removal.** Replaced by `accessible-label` / `accessibleLabel`. |
| `toggles` | removed | n/a | removed | **Confirmed removal.** Toggle UX moves to `swc-toggle-button` / `swc-toggle-button-group`. |
| `selected` | removed | n/a | removed | **Confirmed removal.** Selection state belongs on `swc-toggle-button` / `swc-toggle-button-group`. |
| `emphasized` | removed | n/a | removed | **Confirmed removal.** Only applied to the selected state, which is removed. |
| `holdAffordance` | deferred | n/a | deferred | **Deferred (A4).** See [Hold affordance and alternatives to synthesized longpress](./accessibility-migration-analysis.md#hold-affordance-and-alternatives-to-synthesized-longpress) in the a11y analysis. |
| `role` | removed | n/a | removed | **Confirmed removal.** `swc-action-button` is always `role="button"`. No consumer-controlled role override. |
| `href`, `target`, `download`, `referrerpolicy`, `rel` | removed | n/a | removed | **Confirmed removal.** Navigation uses native anchors. |
| `type` | removed | n/a | removed | **Confirmed removal.** `swc-action-button` is not form-associated; the internal `<button type="button">` is hardcoded. `submit` / `reset` are not applicable to an action button. |
| `active` | internal | n/a | internal | **Confirmed internal.** Retained as an internal property inherited from `ButtonBase`. With hold-affordance deferred, no consumer-triggered mechanism sets this in initial scope. CSS `:active` on the inner `<button>` handles pressed-state styling without requiring a JS property. |
| `name` | removed | n/a | removed | **Confirmed removal** alongside `type`. `swc-action-button` is not form-associated; `name` has no applicable semantics. |

**Passthrough host attributes:** `aria-haspopup` and `aria-expanded` set on the host element are forwarded to the internal `<button>` and stripped from the host — **Implemented in Phase 3 (intentional drift from original plan).** Rather than using `@property`, `ActionButton` overrides the static `observedAttributes` getter to add both attribute names to the super list, and stores their values in `@state()` private fields (`_ariaHasPopup`, `_ariaExpanded`). This avoids a type conflict: `@property` on hyphenated ARIA attributes would collide with `ARIAMixin`'s `ariaHasPopup` / `ariaExpanded` getters on `HTMLElement`, causing editor warnings. `attributeChangedCallback` reads incoming values into private state, strips the attribute from the host, and the render template forwards the values to the inner `<button>` via `ifDefined`. A `_ariaForwardingInProgress` guard prevents the re-entrant `removeAttribute` callback from clearing the state. See resolved decisions table.

#### Slots (2nd-gen)

| Slot | Content | Notes |
|---|---|---|
| default | Visible text label | **Confirmed.** Required for accessible name unless `accessible-label` is set. |
| `icon` | Leading icon element | **Confirmed.** Keep the existing named slot. Presence is detected for `hasIcon` / icon-only layout. |
| `badge` | `swc-badge` element | **Additive (A6).** Corner-overlay lockup; distinct visual treatment from inline content. Icon+Badge and Avatar+Badge are each a distinct compound lockup (matching React Spectrum S2). Badge text may need to contribute to the button's accessible name. Requires a11y review (@nikkimk) before shipping. |
| `avatar` | `swc-avatar` element | **Additive (A7).** Avatar lockup; mutually exclusive with the `icon` slot — avatar replaces the icon. Avatar+Badge is a specific compound lockup. Accessible name composition between avatar and button requires a11y review (@nikkimk) before shipping. |

#### CSS custom properties (2nd-gen)

No `--mod-*` or `--spectrum-actionbutton-*` properties will be exposed. A small reviewed set of `--swc-action-button-*` properties will be introduced as needed. See [Component Custom Property Exposure](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/02_custom-properties.md#component-custom-property-exposure) for guidance.

Initial candidates (to be confirmed during Phase 5):

- `--swc-action-button-min-block-size`
- `--swc-action-button-border-radius`
- `--swc-action-button-edge-to-visual-only`
- `--swc-action-button-focus-indicator-color`

### Visual matrix

> **Provisional** — this matrix is inferred from the [accessibility migration analysis](./accessibility-migration-analysis.md) and [rendering and styling analysis](./rendering-and-styling-migration-analysis.md). A Figma PNG from `S2 / Web (Desktop scale)` has not been provided (Q1); confirm before Phase 5 (styling).

Based on the [Spectrum 2 Action button Figma spec](https://www.figma.com/design/Mngz9H7WZLbrCvGQf3GnsY/S2---Web--Desktop-scale-?node-id=702-2877), the supported visual combinations in 2nd-gen are:

| Visual treatment | Default | Quiet | Static white | Static black |
|---|---|---|---|---|
| Default | Yes | Yes | Yes | Yes |
| Quiet + static color | — | — | Yes | Yes |

Sizes: `xs`, `s`, `m`, `l`, `xl`

Content compositions from Figma:

- Label only
- Icon + label
- Icon only (requires `accessible-label`)
- Pending (new; spinner replaces content)
- Disabled

States: default, hover, focus-visible, active (pressed), disabled, pending

**Removed from the visual matrix:**

- Selected state (no `selected` attribute in 2nd-gen)
- Emphasized (only applies to selected state)

### Pending state (new in 2nd-gen)

Pending is a new feature for `swc-action-button` (not present in 1st-gen) that matches the Figma S2 spec and aligns fully with the `swc-button` implementation in `ButtonBase`:

- `pending` attribute keeps the button focusable while activation is suppressed
- `aria-disabled="true"` is set on the internal `<button>` (native `disabled` is not used, preserving focusability)
- The accessible name is updated to include a busy suffix (e.g., `"Format, busy"`) derived by `getPendingAccessibleName()` in `ButtonBase`
- An animated inline SVG spinner appears after a 1-second delay (matching `swc-button`)
- Button width is locked before the spinner appears to prevent layout shift (same `--_swc-action-button-pending-inline-size` pattern as `swc-button`)
- Windows High Contrast mode shows disabled styling while pending (same requirement as `swc-button`)
- Reduced-motion support for the spinner animation
- When `pending` and `disabled` are both set simultaneously, `disabled` takes precedence: the button is not focusable and not activatable. `ButtonBase.update()` is the appropriate hook for a dev-mode `__swc.warn()` when both are set at the same time.

### Accessibility semantics notes (2nd-gen)

- The internal native `<button>` is the semantic control and primary tab stop
- The host must not duplicate `role="button"` semantics when an internal button exists
- `delegatesFocus: true` ensures `Tab` focus lands on the internal `<button>`
- No `aria-pressed` or toggle semantics on `swc-action-button`; those live on `swc-toggle-button` / `swc-toggle-button-group`
- No `role="radio"` or `role="checkbox"` on `swc-action-button`; mutually exclusive patterns use `swc-segmented-control`
- Menu / overlay triggers: consumers set `aria-haspopup` and `aria-expanded` on the host; those must be forwarded to the internal `<button>`
- `aria-describedby` for `longpress` instructions is out of scope until hold affordance is implemented

### Deferred semantics note (2nd-gen)

Cross-root `aria-labelledby` / `aria-describedby` and form-associated `submit` / `reset` behavior are deferred, matching `swc-button`. Hold affordance is deferred until a dedicated engineering effort schedules it after the initial 2nd-gen release. See [Action button accessibility migration analysis](./accessibility-migration-analysis.md) for `longpress-enabled` / `longpress-help-text` spec when hold eventually ships.

---

## Architecture: core vs SWC split

> The 1st-gen component is a **reference only** — 2nd-gen is built independently. Neither generation imports from the other.

Follow the [Badge migration reference](../../02_workstreams/02_2nd-gen-component-migration/02_step-by-step/01_washing-machine-workflow.md#reference-badge-migration) as the concrete pattern for the core/SWC split.

| Layer | Path | Contains |
|---|---|---|
| **Core** | `2nd-gen/packages/core/components/button/` | Shared `ButtonBase`, `Button.types.ts`, and reusable semantic rules. `swc-action-button` extends `ButtonBase` directly; a separate `ActionButton.base.ts` in core is not needed because no other 2nd-gen component inherits from `swc-action-button`. |
| **Core (action-button types)** | `2nd-gen/packages/core/components/action-button/` | `ActionButton.types.ts` defining `ACTION_BUTTON_VALID_SIZES` (includes `xs`) and `ActionButtonSize`. |
| **SWC** | `2nd-gen/packages/swc/components/action-button/` | `ActionButton.ts`, `action-button.css`, element registration, stories, tests, and the specific S2 rendering/styling for `swc-action-button`. |

Planned rendering shape:

- Core owns only type definitions for sizes; `ButtonBase` owns all shared semantics
- SWC renders a real internal `<button type="button">` with `.swc-ActionButton`
- Internal DOM: `<button>` containing optional icon slot wrapper, label slot wrapper, and pending SVG spinner
- No anchor render path (link API is removed)
- The component stylesheet uses `--swc-action-button-*` tokens and S2 Spectrum CSS token sources
- Global element styles are also emitted from adding `action-button` to the `vite-global-elements-css` config

### Shared semantics reuse

`swc-action-button` reuses from `ButtonBase`:

- `disabled` / `pending` / `pendingActive` behavior
- Accessible-name resolution (`getResolvedAccessibleName`, `getPendingAccessibleName`)
- Host-to-internal-button attribute forwarding (`getForwardedButtonAttributes`)
- Click suppression while pending (`handleClick`)
- `ObserveSlotText` / `ObserveSlotPresence` for `hasLabel` / `hasIcon`
- `delegatesFocus: true` shadow root option

What `swc-action-button` adds on top of `ButtonBase`:

- `quiet`, `staticColor` visual API
- `ACTION_BUTTON_VALID_SIZES` size scale (adds `xs`)
- Pending indicator sizing / visual pattern (shared mechanism, adapted for action-button dimensions)
- Action-button-specific `aria-haspopup` / `aria-expanded` forwarding for menu triggers

---

## Migration checklist

### Preparation (this ticket)

- [x] 1st-gen API surface documented
- [x] React Spectrum S2 API documented
- [x] Dependencies identified
- [x] Breaking changes documented
- [x] 2nd-gen API decisions drafted
- [ ] Plan reviewed by at least one other engineer

### Setup

- [x] Create `2nd-gen/packages/core/components/action-button/ActionButton.types.ts`
- [x] Create `2nd-gen/packages/core/components/action-button/index.ts`
- [x] Create `2nd-gen/packages/swc/components/action-button/` directory
- [x] Create `2nd-gen/packages/swc/components/action-button/ActionButton.ts`
- [x] Create `2nd-gen/packages/swc/components/action-button/action-button.css`
- [x] Create `2nd-gen/packages/swc/components/action-button/swc-action-button.ts` (element registration)
- [x] Create `2nd-gen/packages/swc/components/action-button/index.ts`
- [x] Wire exports in both `package.json` files
- [ ] Check out `spectrum-css` at `spectrum-two` branch as sibling directory for CSS token reference

### API

#### Naming and public surface

- [x] `ActionButton.types.ts` (core): define `ACTION_BUTTON_VALID_SIZES = ['xs', 's', 'm', 'l', 'xl']` and `ActionButtonSize` type
- [x] `ActionButton.ts` (SWC): extend `ButtonBase` with `quiet`, `staticColor`, and size override
- [x] Suppress default `size` attribute reflection — implemented via `_size` backing field and `update()` override rather than a `SizedMixin` `noDefaultSize` option; same observable behavior (`getAttribute('size')` returns `null` until explicitly set)
- [x] Remove `toggles`, `selected`, `emphasized` from the 2nd-gen public surface
- [x] Remove `role` as a consumer property; internal `<button>` provides semantics
- [x] Remove deprecated link API (`href`, `target`, `download`, `referrerpolicy`, `rel`)
- [x] Replace `label` with `accessible-label` / `accessibleLabel` (inherited from `ButtonBase`)

- [x] Add `@deprecated` JSDoc to 1st-gen `toggles`, `selected`, `emphasized`, `holdAffordance`, and `href` properties
- [x] Add dev-mode runtime warnings (`window.__swc.warn()`) to 1st-gen for deprecated properties (`emphasized`, `holdAffordance`, `selected`, `toggles`)
- [x] Document migration from `label` to `accessible-label`

#### Semantics and forms

- [x] Internal `<button type="button">` is the semantic control and focus target; host carries no button role
- [x] Forward host `accessible-label` as `aria-label` on the internal `<button>` (from `ButtonBase`)
- [x] Forward `aria-haspopup` and `aria-expanded` from host to the internal `<button>` when present (for menu-trigger usage)
- [x] When `pending`: set `aria-disabled="true"` on the inner `<button>` while keeping it focusable (inherited from `ButtonBase.getForwardedButtonAttributes()`)
- [x] When `disabled`: set `disabled` attribute on the inner `<button>` (inherited from `ButtonBase`)
- [x] Emit `__swc.warn()` when icon-only and `accessible-label` is absent (inherited from `ButtonBase.update()`)
- [x] Document cross-root ARIA as deferred

### Styling

> Follow the [CSS style guide](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/) as the source of truth for all styling work.

- [x] Add `.swc-ActionButton` to the internal semantic `<button>` in `render()`; keep styling off `:host`
- [x] Copy S2 source from `spectrum-css` `spectrum-two` branch `index.css` (not `/dist`) into `action-button.css` as baseline
- [x] Update class and custom property prefixes from `.spectrum-ActionButton` to `.swc-ActionButton`; remove all `--mod-*` and `--spectrum-actionbutton-*` fallback chains
- [x] Implement `quiet` styling via `:host([quiet])` with CSS custom property overrides
- [x] Implement `static-color` styling for `white` and `black` variants including `quiet` combinations
- [x] Implement five sizes (`xs`, `s`, `m`, `l`, `xl`) with correct Spectrum 2 tokens for each
- [x] Implement icon-only layout detection via `swc-ActionButton--iconOnly` derived class (same pattern as `swc-button`)
- [x] Implement pending visual: animated inline SVG spinner, 1-second delay, width locking via `--_swc-button-pending-inline-size` (ButtonBase writes this property name; render template updated from `<span>` to conditional SVG matching `swc-button`)
- [x] Implement disabled state colors (native `disabled` on inner `<button>`)
- [x] Implement focus-visible ring using `outline` / `outline-offset` (not `box-shadow`) on the inner `<button>`
- [x] Implement forced-colors (Windows High Contrast) media query at the bottom of the file
- [x] Implement reduced-motion treatment for pending spinner animation
- [x] Expose a small reviewed set of `--swc-action-button-*` custom properties; documented with `@cssprop` JSDoc tags on `ActionButton`
- [x] Add `@global-exclude` fences around JS-only blocks (pending spinner keyframes and pending state rules) so the generated global stylesheet stays static-only
- [ ] Register `{ component: 'action-button' }` in the `vite-global-elements-css` plugin config (see `2nd-gen/packages/tools/vite-global-elements-css/README.md`) to auto-generate `stylesheets/global/global-action-button.css` from the component CSS
- [ ] Add `swc-action-button` examples to the global elements docs page (alongside `swc-button`), showing native `<a>` and `<button>` usage with the generated stylesheet
- [ ] Verify RTL support (icon / label ordering)
- [x] Pass `yarn lint:css` (property order, `no-descending-specificity`, token validation)

### Accessibility

#### Naming and semantics

- [x] Align implementation with [Action button accessibility migration analysis](./accessibility-migration-analysis.md)
- [x] Icon-only usage requires `accessible-label`; emit `__swc.warn()` when absent (inherited from `ButtonBase.update()`)
- [x] Pending state: `aria-disabled="true"` on inner `<button>`, focusable, busy-suffix accessible name (inherited from `ButtonBase`)
- [x] Pending state: animated icon only, never `swc-progress-circle` for inline pending (Phase 5 replaced the placeholder `<span>` with a conditional inline SVG spinner matching `swc-button`; no `swc-progress-circle` in the template)
- [x] Pending state: no `aria-live="assertive"`; consumers use `role="status"` externally if needed (no live regions added to component)
- [x] Menu trigger: forward `aria-haspopup` / `aria-expanded` from host to the internal `<button>`
- [x] No `aria-pressed`, `role="radio"`, or `role="checkbox"` on `swc-action-button`
- [x] Host ARIA passthrough attributes stripped after forwarding: `attributeChangedCallback` override removes `aria-haspopup` / `aria-expanded` from the host after Lit reads them, preventing duplicate ARIA exposure on both host and inner `<button>`

#### State verification

- [ ] Verify disabled state removes focusability
- [ ] Verify pending state keeps button in tab order (`aria-disabled="true"`, not `disabled`)
- [ ] Verify Windows High Contrast uses disabled/unavailable colors while pending
- [ ] Confirm host vs internal button semantics in ARIA snapshots (no duplicate `role="button"`)
- [ ] Confirm `accessible-label` is forwarded to the inner `<button>` `aria-label`
- [ ] Confirm `aria-haspopup` / `aria-expanded` forwarding works in menu-trigger scenarios

### Testing

#### Unit / Storybook play functions (TDD red/green)

- [x] Default render: label-only, icon-only (with `accessible-label`), icon + label
- [x] `quiet` variant: default and quiet combinations
- [x] `static-color="white"` and `static-color="black"`
- [x] All five sizes: `xs`, `s`, `m`, `l`, `xl`
- [x] Disabled state: not focusable, activation suppressed
- [x] Pending state: focusable, `aria-disabled="true"`, click suppressed, name includes "busy"
- [x] Pending + `pending-label` override: custom busy label used instead of derived name

- [x] Dev-mode warning: icon-only without `accessible-label`
- [x] Dev-mode warning: `pending` + `disabled` simultaneously
- [x] Menu trigger: `aria-haspopup` and `aria-expanded` forwarded to inner `<button>` and stripped from host
- [x] Confirm no `aria-pressed` attribute is ever set on `swc-action-button`
- [x] Confirm host carries no `role="button"` attribute (semantics on inner `<button>`)
- [x] Confirm click is suppressed while `pending`
- [ ] Confirm `click` event fires from the inner `<button>` and bubbles to the host (covered by PendingBehaviorTest post-clear step)

#### Playwright ARIA snapshots

- [x] Default state: `role="button"`, accessible name from visible label
- [x] Icon-only: `role="button"`, accessible name from `accessible-label`
- [x] Disabled: `role="button"`, `disabled` attribute present on inner `<button>`
- [x] Pending: `role="button"`, `aria-disabled="true"` on inner `<button>`, accessible name includes "busy"
- [ ] Menu trigger: `aria-haspopup` and `aria-expanded` present on inner `<button>` (covered by AriaPassthroughTest unit test; no dedicated a11y story)
- [x] Confirm absence of `aria-pressed` on `swc-action-button` in all stories

#### Playwright keyboard

- [ ] `Tab` reaches the component; focus lands on the inner `<button>`
- [ ] `Enter` and `Space` activate the button
- [ ] Pending state: `Tab` still reaches the button; `Enter` / `Space` do not fire click
- [ ] No focus trap

#### Visual regression

- [ ] VRT coverage for all size × quiet × static-color combinations
- [ ] VRT coverage for disabled, pending (after 1-second delay)
- [ ] Focus-visible ring visible on all sizes and variants
- [ ] Pending spinner visible in Windows High Contrast mode (disabled styling)

#### Manual AT testing

**Keyboard:**

- [ ] `Tab` to the component → Expect: focus ring visible on the inner `<button>`
- [ ] `Tab` to icon-only button → Expect: screen reader announces the `accessible-label` + ", button"
- [ ] `Tab` to pending button → Expect: button is in tab order; focus ring visible
- [ ] `Enter` / `Space` on pending button → Expect: no activation; button remains focused
- [ ] `Tab` to disabled button → Expect: button is skipped entirely

**Screen reader (VoiceOver on macOS / NVDA on Windows):**

- [ ] Read default button → Expect: "[label], button"
- [ ] Read icon-only button → Expect: "[accessible-label], button"
- [ ] Read pending button → Expect: "[label], busy, button" (or platform-equivalent unavailable state)
- [ ] Read disabled button → Expect: "dimmed button" or equivalent unavailable state
- [ ] Confirm host `swc-action-button` element is NOT announced as a separate button
- [ ] Confirm menu trigger with `aria-haspopup` is announced as "button, has popup"

**Windows High Contrast:**

- [ ] Navigate to pending button after 1-second delay → Expect: button renders with disabled/unavailable colors

**Reduced-motion:**

- [ ] Enable `prefers-reduced-motion: reduce` → Pending spinner visible but animation respects preference

### Documentation

#### General

- [x] JSDoc on all public props, slots, and CSS custom properties
- [x] Storybook stories: label-only, icon-only, icon + label, quiet, static colors (white / black), all sizes, disabled, pending
- [x] Document that `toggles` / `selected` are not part of the 2nd-gen API; link to `swc-toggle-button` / `swc-toggle-button-group`
- [x] Document that `hold-affordance` is deferred; list consumer options (1st-gen `sp-action-button`, extend `swc-button`, action-group layout)
- [x] Document that action-group layout (separate `swc-action-button` instances) is much more accessible than relying on longpress-only for secondary actions
- [x] Document pending-state accessibility behavior: `aria-disabled`, busy-label pattern, WHCM disabled styling
- [x] Document accessible name requirements for icon-only usage
- [x] Document that focus and semantics land on the internal native `<button>`, not the host
- [x] Document `aria-haspopup` / `aria-expanded` forwarding for menu-trigger usage
- [x] Document `accessible-label` replaces 1st-gen `label`
- [x] Document that cross-root ARIA and form-associated `submit` / `reset` are deferred

#### Breaking changes

- [x] Document removal of `href` and link mode
- [x] Document removal of `toggles`, `selected`, `aria-pressed` with migration path to `swc-toggle-button`
- [x] Document removal of `emphasized`
- [x] Document deferral of `hold-affordance` / `longpress` with consumer options
- [x] Document `label` → `accessible-label` rename

### Review

- [ ] `yarn lint:2nd-gen` passes (ESLint, Stylelint, Prettier)
- [x] Status table in [workstream doc](../../02_workstreams/02_2nd-gen-component-migration/01_status.md) updated
- [x] PR created with description referencing Epic SWC-2039 (see #6339)
- [ ] Peer engineer sign-off

---

## Blockers and open questions

### Design

| # | Item | Blocking? | Status | Owner |
|---|---|---|---|---|
| Q1 | Figma PNG from `S2 / Web (Desktop scale)` not provided. Visual matrix is inferred from analysis docs; may be incomplete. | No — proceed provisionally; confirm before Phase 5 (styling) | Open | @cdransfeldt |

### Architecture and behavior

| # | Item | Blocking? | Status | Owner |
|---|---|---|---|---|
| Q2 | Consumer migration copy references `swc-toggle-button` / `swc-toggle-button-group`, which are not yet available in 2nd-gen. Documentation must either hold this note or add a "coming soon" caveat. | Yes — for consumer migration docs | Resolved — migration guide and `action-button.mdx` both use explicit "coming soon" caveats | Migration planning |

### Scope and prerequisites

| # | Item | Blocking? | Status | Owner |
|---|---|---|---|---|
| Q3 | `swc-action-group` depends on `swc-action-button`. Confirm migration ordering so action-group does not begin before `swc-action-button` is stable. | No | Open | Migration planning |

### Resolved decisions

| # | Decision | Resolution |
|---|---|---|
| Phase 3 | `aria-haspopup` / `aria-expanded` host-attribute retention | Resolved in Phase 3 (PR feedback). Implementation intentionally drifted from the original plan to avoid editor warnings: `@property` was not used because it collides with `ARIAMixin`'s `ariaHasPopup` / `ariaExpanded` getters on `HTMLElement`. Instead, `ActionButton` overrides `static observedAttributes` to add both attribute names and stores their values in `@state()` private fields (`_ariaHasPopup`, `_ariaExpanded`). `attributeChangedCallback` reads each value into private state, strips the attribute from the host, and the render template forwards the values via `ifDefined`. Guard flag `_ariaForwardingInProgress` prevents re-entrant clearing on the `removeAttribute` callback. |
| Phase 5 | WHCM quiet vs. default border parity | In Windows High Contrast Mode, both `default` and `quiet` action buttons render with a visible border because the browser's forced-colors mechanism replaces `transparent` borders with a system color. This makes them visually identical in WHCM. The decision was to leave this as-is rather than add a `forced-colors: active` override to suppress the quiet border. Rationale: (1) avoids adding WHCM-specific CSS that the project otherwise tries to minimize; (2) visible borders in WHCM improve interactive affordance for high-contrast users; (3) the quiet/default hierarchy is a normal-mode visual design choice — in forced-colors mode, accessibility takes priority over visual differentiation. If a containing component (accordion actions, breadcrumbs, tag group, etc.) needs to suppress the quiet button border in WHCM, that override belongs at the containing component level. |

### Deferred follow-up tickets

| Ticket | Deferred item | Why deferred | Plan section |
|---|---|---|---|
| TBD (under SWC-2039) | `hold-affordance` / `longpress` implementation | Architectural complexity, WCAG pointer gesture requirements, and AT testing depth; out of initial scope per a11y analysis and roadmap docs. | [B4](#must-ship--breaking-or-a11y-required), [A5](#additive--ships-when-ready-zero-breakage-for-consumers-already-on-2nd-gen) |
| TBD (under SWC-2039) | `longpress-enabled` / `longpress-help-text` accessibility wiring | Depends on hold implementation. | [A4](#additive--ships-when-ready-zero-breakage-for-consumers-already-on-2nd-gen) |
| TBD (under SWC-2039) | `staticColor="auto"` from React Spectrum S2 | Not in approved baseline scope; requires design decision on automatic contrast selection. | [A5](#additive--ships-when-ready-zero-breakage-for-consumers-already-on-2nd-gen) |
| SWC-2042 | `value` / group-identification attribute | Deferred from initial release. `swc-action-group` does not yet support the selection semantics that make `value` meaningful; form-association use case is inconsistent with `swc-button` not having `value` and has known association issues. Implement alongside `swc-action-group` migration. | [2nd-gen API decisions](#2nd-gen-api-decisions) |
| TBD | Badge slot and corner-overlay lockup (A6) | Icon+Badge and Avatar+Badge produce a distinct visual lockup. Badge text accessible name composition requires a11y review (@nikkimk) before shipping. | [A6](#additive--ships-when-ready-zero-breakage-for-consumers-already-on-2nd-gen) |
| TBD | Avatar slot and accessible name composition (A7) | Avatar accessible name and its relationship to the button's composite accessible name requires a11y review (@nikkimk) before shipping. | [A7](#additive--ships-when-ready-zero-breakage-for-consumers-already-on-2nd-gen) |
| TBD (under SWC-2039) | Cross-root ARIA mapping | Shared with `swc-button` dependency on `ElementInternals` / tooling path. | [Deferred semantics note](#deferred-semantics-note-2nd-gen) |
| ~~Phase 4~~ | ~~`aria-haspopup` / `aria-expanded` host-attribute retention~~ | Resolved in Phase 3. See resolved decisions table. | [2nd-gen API decisions — passthrough host attributes](#properties--attributes) |
| Phase 5 | Pending width-lock CSS property name | `ButtonBase.update()` sets `--_swc-button-pending-inline-size` on the inner `<button>` when the pending delay fires. Phase 5 action-button CSS must reference this same property name for the width-lock to activate, not `--_swc-action-button-pending-inline-size`. If a component-scoped name is preferred, `ActionButton` must override the pending timer logic to write under the action-button name instead. | [Pending state](#pending-state-new-in-2nd-gen) |
| Phase 5 | Shared pending stylesheet (`button-pending.css`) | Consider extracting pending-state styles into a standalone `button-pending.css` alongside the existing `button-base.css` shareable stylesheet. `swc-action-button` and `swc-button` both implement the pending visual; shared styles (spinner keyframes, width-lock, reduced-motion, WHCM) should not be duplicated. Evaluate during Phase 5 when both stylesheets are being authored. | [Pending state](#pending-state-new-in-2nd-gen) |

---

## Breaking changes to verify

Manual verification steps for each breaking change. Run against the component's Storybook stories unless otherwise noted.

| Break | Story / URL | Steps | Expected result |
|---|---|---|---|
| **B1** — `href` removed | Default story | Set `href="/test"` on `<swc-action-button>`; click | No navigation occurs; dev-mode console warning emitted |
| **B2** — `toggles` / `selected` removed | Default story | Set `toggles` and `selected` attributes; click | No toggle behavior; dev-mode warning pointing to `swc-toggle-button` |
| **B3** — `emphasized` removed | Default story | Set `emphasized` attribute | No visual change; dev-mode warning emitted |
| **B4** — `hold-affordance` deferred | Default story | Set `hold-affordance` attribute | No corner triangle visible; no `longpress` event fires; Storybook copy documents deferral |
| **B5** — Internal `<button>` | Any story | Tab to button; inspect `shadowRoot.activeElement` in DevTools | Returns the inner `<button>`, not `undefined` or the host |
| **B6** — `role` removed | Any story | Inspect accessibility tree | Host has no `role` attribute; inner `<button>` carries button semantics |
| **B7** — `label` → `accessible-label` | Icon-only story | Set `label="Old label"` | Dev-mode deprecation warning; set `accessible-label="New label"` and verify it is announced by a screen reader |
| **B8** — `--mod-*` removed | Any story | Apply `--mod-actionbutton-height: 100px` via DevTools | No visual change; `--swc-action-button-min-block-size` works instead |
| **B9** — Icon-only warning | Default story | Render icon-only button without `accessible-label` | `__swc.warn()` fires in dev mode; no warning when `accessible-label` is present |
| **B10** — `delegatesFocus` | Any story | Tab to button; read `document.activeElement` and `shadowRoot.activeElement` | `document.activeElement` is the host; `shadowRoot.activeElement` is the inner `<button>` |
| **B11** — `pending` ships | Pending story | Set `pending` attribute; wait 1 second | Spinner appears; button is focusable; activation is suppressed; accessible name includes busy suffix |

---

## References

- [Washing machine workflow](../../02_workstreams/02_2nd-gen-component-migration/02_step-by-step/01_washing-machine-workflow.md)
- [Action button accessibility migration analysis](./accessibility-migration-analysis.md)
- [Action button rendering and styling migration analysis](./rendering-and-styling-migration-analysis.md)
- [Button migration plan](../button/migration-plan.md)
- [Button accessibility migration analysis](../button/accessibility-migration-analysis.md)
- [1st-gen source](../../../../1st-gen/packages/action-button/src/ActionButton.ts)
- [1st-gen tests](../../../../1st-gen/packages/action-button/test/action-button.test.ts)
- [1st-gen README](../../../../1st-gen/packages/action-button/README.md)
- [2nd-gen ButtonBase](../../../../2nd-gen/packages/core/components/button/Button.base.ts)
- [2nd-gen Button types](../../../../2nd-gen/packages/core/components/button/Button.types.ts)
- [2nd-gen Button implementation](../../../../2nd-gen/packages/swc/components/button/Button.ts)
- [Spectrum 2 Action button (Figma)](https://www.figma.com/design/Mngz9H7WZLbrCvGQf3GnsY/S2---Web--Desktop-scale-?node-id=702-2877)
- [React Spectrum: ActionButton](https://react-spectrum.adobe.com/ActionButton)
- [React Spectrum: ToggleButton](https://react-spectrum.adobe.com/ToggleButton)
- [React Spectrum: ToggleButtonGroup](https://react-spectrum.adobe.com/ToggleButtonGroup)
- [React Spectrum: MenuTrigger](https://react-spectrum.adobe.com/react-spectrum/MenuTrigger.html)
- [React Aria: Menu — long press](https://react-aria.adobe.com/Menu#long-press)
- [WAI-ARIA APG: Button pattern](https://www.w3.org/WAI/ARIA/apg/patterns/button/)
- [WAI-ARIA APG: Toolbar pattern](https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/)
- [CSS style guide — Component Custom Property Exposure](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/02_custom-properties.md#component-custom-property-exposure)
- [Figma: Loading animation discovery](https://www.figma.com/design/42VzvpW262EAUbYsadO4e8/Loading-animation-discovery)
- [Progress circle accessibility migration analysis](../progress-circle/accessibility-migration-analysis.md)
- [Tooltip accessibility migration analysis](../tooltip/accessibility-migration-analysis.md)
- [PR #6276 — action-button a11y migration doc review](https://github.com/adobe/spectrum-web-components/pull/6276#pullrequestreview-4284644939)

<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../../README.md) / [Project planning](../../README.md) / [Components](../README.md) / Popover / Popover migration plan

<!-- Document title (editable) -->

# Popover migration plan

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
    - [User confirmation needed](#user-confirmation-needed)
    - [Relationship to other component migrations](#relationship-to-other-component-migrations)
- [Changes overview](#changes-overview)
    - [Must ship — breaking or a11y-required](#must-ship--breaking-or-a11y-required)
    - [Additive — ships when ready, zero breakage for consumers already on 2nd-gen](#additive--ships-when-ready-zero-breakage-for-consumers-already-on-2nd-gen)
- [2nd-gen API decisions](#2nd-gen-api-decisions)
    - [Public API](#public-api)
    - [Events (2nd-gen)](#events-2nd-gen)
    - [Behavioral semantics](#behavioral-semantics)
    - [Differences from 1st-gen popovers](#differences-from-1st-gen-popovers)
    - [Event lifecycle](#event-lifecycle)
    - [Accessibility semantics notes (2nd-gen)](#accessibility-semantics-notes-2nd-gen)
- [Architecture: core vs SWC split](#architecture-core-vs-swc-split)
    - [Host element type](#host-element-type)
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

> **Epic SWC-1993** · Planning output. Must be reviewed before implementation begins.
>
> This plan should provide recommendations, not just observations. Call out inconsistencies, propose better API or naming paths where appropriate, and make unresolved tradeoffs explicit for reviewers.
>
> **Companion document:** [`migration-research-notes.md`](./migration-research-notes.md) captures the reasoning behind the architectural decisions summarized here. Read it for the *why*; this plan is the *what*.

---

## TL;DR

The 1st-gen `<sp-popover>` is a 75-line, styles-only component. Open/close, positioning, focus trap, dismissal, and ARIA were all delegated to `<sp-overlay>` or to the consumer. In 2nd-gen, `<swc-popover>` becomes an **opinionated, self-contained, modal component** that brings native top-layer behavior, anchored positioning, focus management, and trigger-side ARIA wiring out of the box.

- **Behavior shift (B1–B2) — major UX change:** an internal `<dialog>` rendered in the shadow root opens via `showModal()`. Browser provides `role="dialog"`, focus trap, background inert, native top-layer rendering, and Escape handling. Page behind is **blocking and non-scrollable**. See [Differences from 1st-gen popovers](#differences-from-1st-gen-popovers) for the full UX comparison consumers must be aware of.
- **API additions (B3, B6, B7):** new properties — `offset`, `cross-offset`, `container-padding`, `should-flip`, `for`, `trigger-element` (setter); new ARIA wiring — durable `aria-controls` / `ariaControlsElements` and toggled `aria-expanded` on the trigger, managed automatically.
- **New event contract (B4):** `swc-open`, `swc-after-open`, `swc-close`, `swc-after-close`. Dispatched from native `<dialog>` lifecycle events (`cancel`, `close`, `transitionend`); a synchronous `swc-open` dispatch follows `showModal()` since `<dialog>` has no native open event. See [Events (2nd-gen)](#events-2nd-gen) for the full contract and the [event lifecycle table](#event-lifecycle).
- **API removals (B5, B7):** `[dialog]` host attribute removed (consumers wanting dialog padding compose `<swc-dialog>` and adopt `.swc-Popover` chrome). 1st-gen's `placement="undefined"` default changes — new default is `'bottom'` (React Spectrum-aligned).
- **Four deliverables in one PR:**
  1. **`PlacementController`** in `2nd-gen/packages/core/controllers/placement-controller/` — Floating UI wrapper, decoupled from Gen1 Overlay; the only true controller (positioning has genuine lifecycle: `autoUpdate`, cleanup, recompute).
  2. **`resolveTrigger()` helper** in `2nd-gen/packages/core/utils/` — small pure function (~25 lines) that resolves `for=` / `trigger-element` and discovers the AT-facing inner button across shadow boundaries. Tooltip adopts in a follow-up refactor.
  3. **`<swc-popover>` component** — explicit dialog lifecycle, event dispatch, and inline ARIA wiring; no shared mixin. ~80–100 lines of component code.
  4. **`global-popover.css`** in `2nd-gen/packages/swc/stylesheets/global/` — auto-emitted by the existing `vite-global-elements-css` plugin from `popover.css`; ships the customer-facing reusable `.swc-Popover` class for authors who want the chrome without the component.
- **No `PopoverMixin`.** An earlier architecture proposed bundling the dialog lifecycle into a shared mixin. The simpler choice — explicit per-component lifecycle code (~30 lines per consumer) plus a shared `resolveTrigger()` helper for the cross-root resolution — keeps each component readable, avoids mixin-chain depth concerns, and matches the Tooltip migration plan's precedent. See [Relationship to other component migrations](#relationship-to-other-component-migrations) for how downstream components (Menu, Picker, etc.) reuse the primitives.
- **Non-modal mode deferred to additive (A1).** Non-modal popovers (`popover="auto"` lifecycle, light-dismiss, no focus trap) are needed for combobox and submenus — neither is in scope here. Non-modal lands additively when the first consumer needs it. v1 ships modal-only.
- **Click-outside-to-close wired by default — always.** Clicks on the inert backdrop dismiss the popover. `<swc-popover>` is anchored UI for menu / picker / action-menu / contextual-help patterns; light-dismiss is part of that pattern, not an opt-in. Consumers needing strict-modal behavior (focus trap + page block + dismiss-only-on-explicit-action) use `<swc-dialog>` instead — a separate component with a separate purpose. Detected via `pointerdown` on the internal `<dialog>` with `event.target === dialog`, same pattern WebAwesome's `<wa-dialog>` uses.
- **No blocking open questions.** Remaining items are implementation-detail and follow-up: `<dialog>.showModal()` benchmarking on representative consumer DOMs (Q3), an amendment to the existing accessibility analysis to reflect modal-mode host semantics (Q4), and background scroll lock on iOS Safari (Q7).

### Most blocking open questions

None currently. The Must-ship scope is fully resolved. Q1–Q6 in [Blockers and open questions](#blockers-and-open-questions) are scoped, sequenced, or deferred items with named owners — they do not block the start of implementation but each must be tracked through the relevant migration phase.

---

## 1st-gen API surface

**Source:** [`1st-gen/packages/popover/src/Popover.ts`](../../../../1st-gen/packages/popover/src/Popover.ts)
**Version:** `@spectrum-web-components/popover@1.12.0`
**Custom element tag:** `sp-popover`

### Properties / attributes

| Property | Type | Default | Attribute | Notes |
| -------- | ---- | ------- | --------- | ----- |
| `open` | `boolean` | `false` | `open` (reflect) | Reflects open state. Has no side effects — open/close is driven externally (typically by `<sp-overlay>`). |
| `placement` | `Placement \| undefined` | `undefined` | `placement` (reflect) | Imported from `@spectrum-web-components/overlay/src/overlay-types.js`. 12 physical values; logical values (`start`, `end`, sub-variants) missing in 1st-gen. The host has no CSS class applied when `placement` is `undefined`. |
| `tip` | `boolean` | `false` | `tip` (reflect) | When set, renders an internal SVG tip element with `id="tip"` that is positioned by the consuming Overlay's `PlacementController` arrow middleware. |

### Methods

None. `sp-popover` is purely declarative.

### Events

None. Open/close events are dispatched by the surrounding `<sp-overlay>`, not by `<sp-popover>` itself.

### Slots

| Slot | Content | Notes |
| ---- | ------- | ----- |
| default | Popover content | Free-form; consumers slot menus, dialog content, custom markup. |

### CSS custom properties

Surface in 1st-gen uses Spectrum CSS `--mod-popover-*` modifiers (e.g. `--mod-popover-inline-size`, `--mod-popover-dialog-min-width`, `--mod-popover-dialog-padding`) plus Spectrum tokens. This full modifier surface will not be carried forward to 2nd-gen. See the [rendering and styling analysis](./rendering-and-styling-migration-analysis.md) for the modifier inventory.

### Shadow DOM output (rendered HTML)

```html
<!-- Without tip -->
<sp-popover open placement="bottom">
  <slot></slot>
</sp-popover>

<!-- With tip -->
<sp-popover open placement="bottom" tip>
  <slot></slot>
  <div id="tip" aria-hidden="true">
    <svg class="tip block" viewBox="0 -0.5 16 9">
      <path class="triangle" d="M-1,-1 8,8 17,-1"></path>
    </svg>
    <svg class="tip inline" viewBox="0 -0.5 9 16">
      <path class="triangle" d="M-1,-1 8,8 -1,17"></path>
    </svg>
  </div>
</sp-popover>
```

The `:host([dialog])` selector in `popover.css` applies dialog padding when the consumer sets the `dialog` attribute. This attribute is undocumented in the README but used by call sites like Coachmark and Contextual Help.

---

## Dependencies

| Package | Version | Role |
| ------- | ------- | ---- |
| `@spectrum-web-components/base` | 1.12.0 | Lit base class, `html` template tag, decorators |
| `@spectrum-web-components/overlay` | 1.12.0 | Type import only (`Placement` from `overlay-types.js`). **Dropped in 2nd-gen.** The `Placement` type moves to `2nd-gen/packages/core/controllers/placement-controller/`. |

1st-gen consumers (action-bar, action-menu, card, coachmark, combobox, contextual-help, menu, picker, slider, tooltip) import `@spectrum-web-components/popover` and use `<sp-popover>` to host their dropdown / menu / listbox / help surfaces — but they orchestrate behavior through `<sp-overlay>`. In 2nd-gen, each first-party component brings popover behavior in itself by reusing `PlacementController`, `resolveTrigger()` (when applicable), and the shared `.swc-Popover` chrome — never by light-DOM wrapping `<swc-popover>`. See [Relationship to other component migrations](#relationship-to-other-component-migrations).

---

## Migration sequencing and prerequisites

### Dependency-aware recommendation

This migration ships **four artifacts in one PR**: `PlacementController`, the `resolveTrigger()` helper, the `<swc-popover>` component, and the auto-generated `global-popover.css`. Splitting them is possible but creates orphan deliverables — neither the controller nor the helper has an independent consumer until popover exists, and popover cannot ship without them.

This PR is a prerequisite for every subsequent migration that needs anchored modal popover behavior. See [Relationship to other component migrations](#relationship-to-other-component-migrations) for the consolidated downstream view.

### User confirmation needed

The architectural decisions captured in the [research notes](./migration-research-notes.md#session-decisions-resolved) were resolved with the user during planning. The most consequential confirmations needed before implementation:

- D2 (modal by default via `<dialog>.showModal()`) is a meaningful semantic change from the [existing accessibility analysis](./accessibility-migration-analysis.md), which assumed a role-free host. Q4 in [Blockers](#architecture-and-behavior) tracks the analysis amendment.
- D5 (no first-party light-DOM composition) shifts the 1st-gen → 2nd-gen consumer migration story: 1st-gen consumers that compose `<sp-overlay>` + `<sp-popover>` cannot do a one-for-one swap to `<swc-popover>` — their migration is to bring popover behavior in directly. This must be reflected in the [Consumer migration guide ticket SWC-2003](https://jira.corp.adobe.com/browse/SWC-2003).
- Q6 (backdrop-click-to-close policy) resolved as option (b): light-dismiss is wired by default. Downstream consumers (Picker, Menu, etc.) inherit this behavior without wiring anything themselves. No strict-modal opt-out — that pattern belongs to `<swc-dialog>`, a separate component for modal dialogs, not to `<swc-popover>` (which is anchored UI).

### Relationship to other component migrations

This migration delivers primitives that subsequent 2nd-gen migrations consume. Each downstream component **writes its own dialog lifecycle inline** (~30 lines: `showModal()` / `close()` / `cancel` + `transitionend` event dispatch) and reuses these primitives where applicable. No shared mixin is delivered or required.

| Downstream component | Uses `PlacementController`? | Uses `resolveTrigger()`? | Uses `.swc-Popover` chrome? | Notes |
| -------------------- | --------------------------- | ------------------------ | ---------------------------- | ----- |
| `<swc-tooltip>` (existing) | Yes — its additive phase, blocked on this PR | Refactor follow-up — Tooltip ships with inline resolution; can adopt the shared helper later | Own stylesheet; not Popover chrome | This PR unblocks Tooltip's additive phase. Tooltip never adopts modal `<dialog>` semantics. |
| `<swc-menu>` dropdown (next migration) | Yes | No — internal trigger (same-root ARIA wiring is inline, ~5 lines) | Yes — class on its internal dropdown surface | First migration after this one. Modal by default. |
| `<swc-menu-item>` submenu | Yes | No — internal trigger | Yes | Depends on non-modal additive (A1) landing before submenu support can ship. |
| `<swc-picker>` | Yes | No — internal trigger | Yes | Modal by default. |
| `<swc-action-menu>` | Yes | No — internal trigger | Yes | Modal by default. |
| `<swc-contextual-help>` | Yes | No — internal trigger | Yes | Modal by default. |
| `<swc-coachmark>` | Yes | TBD — depends on coachmark migration's authoring decision | Yes | Inheritance vs composition decision deferred to coachmark migration (Q5). |
| `<swc-combobox>` | Yes — direct use, not modal | No — internal trigger | Yes — class on its listbox surface only | Does NOT adopt the modal `<dialog>` pattern (D7); input must remain focusable while listbox is open. Independent of the non-modal additive. |
| `<swc-dialog>` (independent migration) | No | No | Optional — adopt the class on the dialog surface for Spectrum popover chrome | Provides the migration path for 1st-gen's `[dialog]` attribute. |
| 1st-gen Overlay package | n/a | n/a | n/a | Separate workstream per the [Overlay strategy RFC](#references). Does not block this migration. |

**Recommended sequence after this PR ships:**

1. Tooltip additive phase — integrate `PlacementController`; later refactor to `resolveTrigger()`
2. `<swc-menu>` (user-confirmed next migration)
3. `<swc-picker>`, `<swc-action-menu>`, `<swc-contextual-help>` — any order
4. `<swc-combobox>` — can run in parallel with the above
5. `<swc-coachmark>` — after the inheritance decision is made
6. Submenu support in `<swc-menu>` — gated on the non-modal additive (A1) landing first

---

## Changes overview

> **Priority framing:**
>
> - **Must ship** items define the in-scope work required for this migration.
> - **Additive** items are deferred or out of scope for this migration; they will not cause consumer breakage when they do ship.
> - **Accessibility is non-negotiable** — all a11y requirements ship as part of this migration.
> - **Breaking changes** are assessed on merit — some must ship now to avoid a second, more disruptive migration later.

### Must ship — breaking or a11y-required

#### API and naming

| #   | What changes | 1st-gen behavior | 2nd-gen behavior | Consumer migration path |
| --- | ------------ | ---------------- | ---------------- | ----------------------- |
| B1  | Host gains modal-dialog behavior — **major UX shift** | `HTMLElement`; no behavior; open/close driven externally by `<sp-overlay>`. Non-modal by default: page behind remained interactive, scrollable, and Tab-able. Click outside closed the popover via 1st-gen `OverlayStack` light-dismiss. | An internal `<dialog>` element is rendered in the shadow root and opens via `showModal()` on `open = true`. Browser provides `role="dialog"`, focus trap, background inert, native Escape handling, and top-layer rendering. The page behind is **blocking** (cannot be clicked, focused, or scrolled). A native `::backdrop` pseudo-element renders behind the dialog. Click on the backdrop dismisses the popover (light-dismiss, wired by the component). The component owns its own open/close. See [Differences from 1st-gen popovers](#differences-from-1st-gen-popovers) for the full comparison. | Consumers stop pairing `<sp-popover>` with `<sp-overlay>`. They either (a) use `<swc-popover>` with `open` property control, (b) use a first-party 2nd-gen component that has popover built-in (Picker, Action Menu, etc.), or (c) adopt the `.swc-Popover` class for pure styling without behavior. Existing UX assumption that the page stays scrollable behind the popover must be updated; click-outside-to-dismiss is preserved. |
| B2  | Default placement value | `undefined` (no placement attribute, no CSS class applied) | `'bottom'` (matches React Spectrum's `Popover` default and Spectrum 2 guidelines) | Consumers relying on an unplaced popover (no class applied) must update: omitting the attribute is no longer enough; the host always has a placement class. Existing call sites that set a placement are unaffected. |
| B3  | Trigger resolution: `for` and `trigger-element` | Implicit — the surrounding `<sp-overlay>` resolved the trigger from its `triggerElement` setter or DOM ancestor chain | Explicit on the popover: `for="<id>"` attribute references the trigger by ID in the same tree root; `trigger-element` setter takes a direct element reference for cross-root cases. Mirrors the tooltip migration plan's authoring pattern. | New API. Consumers move from "I wrap the popover in `<sp-overlay>` and let overlay find the trigger" to "I set `for=` on `<swc-popover>` or assign `trigger-element` programmatically." See [Behavioral semantics](#behavioral-semantics). |
| B4  | Event renames and timing | None; events came from `<sp-overlay>` | Fires `swc-open`, `swc-after-open`, `swc-close`, `swc-after-close`. `swc-open` / `swc-close` fire from `<dialog>` `cancel` / `close` event listeners; `swc-after-open` / `swc-after-close` fire after `transitionend` on the dialog. Dispatched from listeners, never from setters, to keep timing consistent regardless of cause. | Consumers wire 2nd-gen event listeners. 1st-gen `sp-opened` / `sp-closed` listeners on the overlay don't apply (they were on the overlay, not the popover). New listeners on `<swc-popover>` directly. |
| B5  | `[dialog]` host attribute removed | `:host([dialog])` applied dialog-padding styling | Removed (D4). | Consumers who wanted dialog padding inside popover chrome use `<swc-dialog>` and adopt the `.swc-Popover` class on the dialog surface for the chrome. The two concerns are now separate. |
| B6  | `tip` attribute kept, rendering moves to internal element | `<sp-popover tip>` renders an SVG tip directly inside the host's shadow root with `id="tip"` | `<swc-popover tip>` renders the tip inside the internal `<dialog class="swc-Popover">` semantic container with class `swc-Popover-tip`. Class-based positioning replaces the JS-driven `style.translate` writeback. | No consumer API change beyond the rendering location — `tip` boolean attribute behaves the same. Note: arrow-middleware integration (precise tip positioning per trigger geometry) is additive (A4); the initial release CSS-centers the tip on the placement edge. |
| B7  | `actual-placement` attribute exposed | `actual-placement` was an Overlay-internal attribute set by `PlacementController` on the same element | The host's `placement` attribute continues to reflect the input. A separate `actual-placement` attribute reflects the computed placement after `flip` middleware reorients. CSS that styles the tip direction reads `actual-placement`, not `placement`. | If a consumer's CSS targeted `[placement="top"]` to style the tip, they should target `[actual-placement="top"]` for behavior after flip. Same convention 1st-gen used internally; promoted to documented surface. |

#### Styling and visuals

| #   | What changes | 1st-gen behavior | 2nd-gen behavior | Consumer migration path |
| --- | ------------ | ---------------- | ---------------- | ----------------------- |
| S1  | Adopt S2 design tokens | S1 Spectrum tokens | S2 tokens from `spectrum-css` `spectrum-two` branch (`components/popover/index.css` and `components/popover/themes/spectrum-two.css`) | Visual update; no API change |
| S2  | Move styling from `:host` to `.swc-Popover` internal element | All rules on `:host` and `:host([dialog])` | Structural / surface rules on `.swc-Popover` (the internal `<dialog>`) with `.swc-Popover--<placement>` modifiers and `.swc-Popover-tip` for the tip element. **Padding lives on an inner `.swc-Popover-content` wrapper**, not on `.swc-Popover` itself, because the `<dialog>` element's hit-test region for backdrop-click detection includes its padding box — padding on the dialog would cause clicks "near the edge" of the popover to dismiss it. Host has only the structural rules needed for popover top-layer semantics. | No consumer action. Enables the auto-generated `global-popover.css` class distribution. |
| S3  | Auto-generated `global-popover.css` for reusable styles | `popover.css` was shadow-DOM-only | The `vite-global-elements-css` plugin emits `global-popover.css` wrapped in `@layer swc-global-elements`. Customers import it and apply `.swc-Popover` to their own markup. | New customer-facing API surface. Replaces 1st-gen's implicit "import `@spectrum-web-components/popover` and use the styles via the component" with an explicit class option. |
| S4  | Forced-colors / high-contrast support | Present in 1st-gen via Spectrum CSS | Preserved; `forced-colors` media query sorts to the bottom of `popover.css` per the project styling rules | No consumer action |
| S5  | Tip orientation moves from JS `style.translate` writeback to CSS modifier classes | 1st-gen Overlay's `PlacementController` writes `translate` on the tip element and the popover host | The internal element has `.swc-Popover--<actual-placement>` class set reactively by the component. Tip orientation is purely CSS. | No consumer action |
| S6  | RTL tip placement fix (SWC-917) | Tip placement in RTL had a known bug | Logical placement classes (`start`, `end`, sub-variants) are first-class and correct in RTL | No consumer action |

#### Accessibility and behavior

| #   | What changes | 1st-gen behavior | 2nd-gen behavior | Consumer migration path |
| --- | ------------ | ---------------- | ---------------- | ----------------------- |
| A1  | Native modal dialog semantics | Consumer (`<sp-overlay type="modal">`) or call site manually wired focus and inert | Modal mode (default): host is `<dialog>`, opens via `showModal()`. Browser provides `role="dialog"`, focus trap, background inert, and Escape-to-close natively. | No consumer action. Pickers, menus, action-menus, contextual-help are now modal-by-default — verify pattern-specific focus placement on open (each consumer component's migration owns this). |
| A2  | Native top-layer rendering | 1st-gen `OverlayStack` managed stacking via portaling and z-index | Browser top layer in both modes (`<dialog>.showModal()` modal; `popover="auto"` non-modal). | No consumer action. Browser handles the stacking. |
| A3  | Trigger-side `aria-expanded` automatic | Consumer wired manually | The popover writes `aria-expanded="true"` / `"false"` on the trigger element on `open` change. For 2nd-gen component triggers, the attribute is set on the inner `<button>` (same inner-button resolution the tooltip plan uses). | No consumer action when using `for=` / `trigger-element`. Consumers wiring `aria-expanded` manually on their trigger should remove the manual wiring. |
| A4  | Trigger-side `aria-controls` / `aria-controlsElements` automatic and durable | Consumer wired manually | The popover writes `aria-controls="<popover-id>"` (same-root) or `ariaControlsElements = [popoverHost]` (cross-root) on the trigger / inner button **as soon as `for=` / `trigger-element` resolves**, not on `open` change. The relationship is durable — `aria-controls` represents a persistent control relationship per the ARIA spec; visibility is communicated by `aria-expanded`. Cleared only when the popover is disconnected, `for=` is removed, or `trigger-element` is set to null. | No consumer action when using `for=` / `trigger-element`. |
| A5  | Trigger resolution and inner-button discovery | Implicit via `<sp-overlay>` traversal | `for="<id>"` resolves via `getRootNode().getElementById()` (same-root only); `trigger-element` setter accepts a JS reference (cross-root). For 2nd-gen component triggers with an open shadow root, the `resolveTrigger()` helper reaches into `host.shadowRoot.querySelector('button')` to find the AT-facing inner button. Closed-shadow triggers fall back to wiring on the host. | New API. See [Behavioral semantics — Trigger resolution](#behavioral-semantics). |
| A6  | Escape dismisses without moving focus | Required wiring by overlay / consumer | Modal mode: native `<dialog>` cancel handles Escape and restores focus to the trigger automatically. Non-modal mode: native `popover="auto"` Esc handles dismiss. | No consumer action |
| A7  | No default `aria-haspopup` on the trigger | Consumer wired pattern-specific `aria-haspopup` | The popover host does not write `aria-haspopup` — that attribute is pattern-specific (`aria-haspopup="listbox"` for Picker, `aria-haspopup="menu"` for Action Menu, etc.). First-party components set it themselves on their inner trigger button. Customer-facing `<swc-popover>` does not set it; external authors wire `aria-haspopup` to match their pattern. | Customers wire `aria-haspopup` manually on their trigger; same as 1st-gen. |
| A8  | High-contrast border preserved | Present in 1st-gen | Preserved in 2nd-gen forced-colors handling | No consumer action |

### Additive — ships when ready, zero breakage for consumers already on 2nd-gen

| #   | What is added | Notes |
| --- | ------------- | ----- |
| A1  | **Non-modal mode** (`non-modal` attribute on `<swc-popover>`, plus the `popover="auto"` lifecycle branch in any consumer adopting non-modal) | The originally-scoped opt-out from modal behavior. When set, the host uses `popover="auto"` instead of `<dialog>.showModal()` — no focus trap, no background inert, light-dismiss. Required for: combobox (input must remain focusable while the listbox popup is open) and submenus rendered by `<swc-menu-item>` (parent menu items must not be inerted). **Lands additively when the first consumer needs it — likely the combobox migration.** Implementation: extend `<swc-popover>`'s lifecycle code with a second branch (driven by the `non-modal` property), plus `popovertarget` interop documentation for the non-modal path; the v1 modal-only design leaves room for this without refactoring the existing modal path. |
| A2  | `VirtualTrigger` support exposed on `<swc-popover>` | `PlacementController` accepts a virtual trigger (an object with `getBoundingClientRect()` and optional `contextElement`) for point-in-page, canvas-hit-test, and selection-range anchoring. The interface ships in v1 inside the controller but no `<swc-popover>` API consumes it directly until a consumer (e.g. coachmark or a future tooltip-on-text-selection pattern) needs it. |
| A3  | `arrow` middleware integration for fancier tip placement | Initial release CSS-centers the tip on the placement edge — sufficient for `start` / `center` / `end` alignments on each side. Per-pixel tip-to-trigger alignment (Floating UI's `arrow` middleware) is additive. Required only if Figma confirms designs that need it. Defer until a real call site requests it. |
| A4  | CSS anchor positioning fallback | If `PlacementController` can detect CSS anchor positioning support and skip Floating UI when available, position recalc cost drops dramatically. Browser support is uneven as of this writing. Revisit as an additive optimization once Firefox stable lands support. No API surface impact. |
| A5  | `actual-placement` exposed as a host property in addition to attribute | The attribute is mandatory (B7); a reflected property is nice-to-have for programmatic reads. Additive. |
| A6  | Inner-button resolution override | Today's resolution uses `querySelector('button')`. Some 2nd-gen components may wrap a different element (`<a>`, `<input>` for combobox-adjacent patterns). A future override hook on the trigger element (e.g., a registered "focal element" property) would let those components opt in. Out of scope for v1; revisit when a consumer needs it. |
| A7  | `swc-popover` directive (Lit directive) for programmatic insertion | Mirrors the deferred tooltip directive. Creates `<swc-popover>` adjacent to a target, sets `trigger-element`, and manages lifecycle cleanup. Defer until consumer demand exists. |
| A8  | Coachmark `extends Popover` decision | 1st-gen `Coachmark extends Popover`. 2nd-gen coachmark may extend `<swc-popover>` (inheritance) or implement its own lifecycle alongside `PlacementController` (composition). Decision belongs to the coachmark migration; tracked as Q5. |

---

## 2nd-gen API decisions

These are derived from the 1st-gen implementation, the [rendering and styling migration analysis](./rendering-and-styling-migration-analysis.md), the [accessibility migration analysis](./accessibility-migration-analysis.md), the [Overlay strategy RFC](#references), the Figma `S2 / Web (Desktop scale)` Popover frame, and React Spectrum's `Popover`. Confirmed items are marked; open items are tracked in [Blockers and open questions](#blockers-and-open-questions).

- **Confirmed**: directly supported by source material
- **Inferred**: recommended based on multiple signals, not one authoritative source
- **Open question**: unresolved; see blockers

### Public API

#### Properties / attributes (2nd-gen)

| Property | Type | Default | Attribute | Notes |
| -------- | ---- | ------- | --------- | ----- |
| `open` | `boolean` | `false` | `open` (reflect) | **Confirmed.** Reflected. Setter calls `showModal()` / `close()` on the internal `<dialog>` element. State sync from the native lifecycle uses a private backing field to avoid setter-listener loops (same guard the tooltip plan documents). |
| `placement` | `Placement` | `'bottom'` | `placement` (reflect) | **Confirmed.** All 18 values supported on the customer-facing component (12 physical: `top` / `top-start` / `top-end` / `right` / `right-start` / `right-end` / `bottom` / `bottom-start` / `bottom-end` / `left` / `left-start` / `left-end`; 6 logical: `start` / `start-top` / `start-bottom` / `end` / `end-top` / `end-bottom`). React Spectrum default is `bottom`. Each downstream first-party component narrows this set per the proxy pattern (see [research notes — Placement-property proxy pattern](./migration-research-notes.md#placement-property-proxy-pattern)). |
| `actual-placement` | `Placement \| null` | `null` | `actual-placement` (reflect) | **Confirmed.** Reflected automatically by `PlacementController` via the `onPlacementChange` callback. CSS modifier classes (`.swc-Popover--<actual-placement>`) drive tip orientation. Read-only from the consumer's perspective. |
| `tip` | `boolean` | `false` | `tip` (reflect) | **Confirmed.** Renders the SVG tip element with `class="swc-Popover-tip"`. Initial release CSS-centers it on the placement edge; `arrow` middleware integration is additive (A3). |
| `offset` | `number` | `0` | `offset` | **Confirmed.** Main-axis offset in pixels from the trigger. Passed to `PlacementController`. (React Spectrum default for `Popover` is 8; we default to 0 to make the controller-host contract neutral. Each downstream first-party component sets the pattern-specific default in its own migration.) |
| `cross-offset` | `number` | `0` | `cross-offset` | **Confirmed.** Cross-axis offset in pixels. Passed to `PlacementController`. |
| `container-padding` | `number` | `8` | `container-padding` | **Confirmed.** Distance from viewport edge for `flip` and `shift` middleware. Matches 1st-gen's `REQUIRED_DISTANCE_TO_EDGE`. |
| `should-flip` | `boolean` | `true` | `should-flip` (reflect) | **Confirmed.** When `false`, disables `flip` middleware — the popover stays in the requested placement even when constrained. React Spectrum default is `true`. |
| `tip-padding` | `number` | `8` | `tip-padding` | **Inferred / additive-ready.** Maps to `PlacementController.arrowPadding` when the `arrow` middleware ships (A3). Has no effect in the initial release, where the tip is CSS-centered. Including it in v1 future-proofs the API. |
| `for` | `string` | `undefined` | `for` | **Confirmed.** ID of the trigger element in the same document tree root (`getRootNode().getElementById(this.for)`). Drives `aria-expanded` / `aria-controls` wiring and `PlacementController` anchor. |
| `trigger-element` | `HTMLElement \| VirtualTrigger \| null` | `null` | — (setter only) | **Confirmed.** Direct element reference. Overrides `for` when both set. Use for cross-shadow-root triggers or programmatic wiring. `VirtualTrigger` shape is accepted by `PlacementController` v1 but is exposed on `<swc-popover>` as additive (A2). |

#### Visual matrix (2nd-gen)

Based on Figma `S2 / Web (Desktop scale)` Popover frame and `spectrum-css` `spectrum-two` `components/popover/index.css`:

| Visual variant | Tip | No tip | Forced-colors |
| -------------- | --- | ------ | ------------- |
| Default surface | Yes | Yes | Yes (border becomes `CanvasText`) |
| Dialog padding via `<swc-dialog>` adoption | Yes | Yes | Yes |

Orientation options confirmed in Figma:

| Orientation | Notes |
| ----------- | ----- |
| Top | Confirmed; tip points down |
| Right | Confirmed; tip points left |
| Bottom (default) | Confirmed; tip points up |
| Left | Confirmed; tip points right |
| Sub-variants (`-start` / `-end`) | Confirmed; alignment along the edge |
| Logical sub-variants (`start` / `end` / `*-top` / `*-bottom`) | RTL correctness; first-class in 2nd-gen |

#### Slots (2nd-gen)

| Slot | Content | Notes |
| ---- | ------- | ----- |
| default | Popover content | **Confirmed.** Free-form. No named slots — consumers slot whatever pattern they're building (menu, listbox, custom dialog body, plain text). |

### Events (2nd-gen)

Four new events form the lifecycle contract. All bubble (`bubbles: true`) and cross shadow boundaries (`composed: true`) for parity with the tooltip plan. Events are informational in v1 — `preventDefault()` does not cancel the underlying `<dialog>` lifecycle. (Cancellable open/close is an additive item if a real consumer requests it.)

| Event | Dispatched when | Detail |
| ----- | --------------- | ------ |
| `swc-open` | Synchronously after `internalDialog.showModal()` resolves on `open = true`. Native `<dialog>` does not fire an open event, so the popover dispatches it from the lifecycle path. | none |
| `swc-after-open` | On `transitionend` of the internal dialog after the open transition completes. If the host has no transitions (`prefers-reduced-motion`, test environments, 0-duration override), dispatched from the same tick as `swc-open`. | none |
| `swc-close` | On `<dialog>` `cancel` (Escape pressed), `close` (programmatic close), OR after a backdrop-click dismiss — de-duplicated so only one fires per close cycle. | `{ source: 'escape' \| 'backdrop' \| 'programmatic' }` — lets consumers distinguish how the dismissal was triggered. Inspired by WebAwesome's `wa-hide` event detail. |
| `swc-after-close` | On `transitionend` after the close transition completes. Same 0-duration guard as `swc-after-open`. | none |

**Cancellable events are out of scope** for `<swc-popover>`. Allowing `event.preventDefault()` on dismissal events would mean a consumer could keep the popover open against user intent — which conflicts with the popover's role as anchored UI that should always be easily dismissed. Cancellable close belongs to `<swc-dialog>` (where preventing close on unsaved-changes confirmation makes sense), not to `<swc-popover>`.

**Why `swc-open` is special:** `<dialog>` has no native open event (only `close` and `cancel`). The popover must dispatch `swc-open` itself, synchronously, from the `open` setter after `showModal()` returns. Every other event is observed from a native listener — `swc-open` is the only one tied to the setter path.

#### CSS custom properties (2nd-gen)

No `--mod-*` properties will be exposed. New `--swc-*` component-level properties may be introduced where needed — these are additive and not breaking. See [Component Custom Property Exposure](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/02_custom-properties.md#component-custom-property-exposure).

Each exposed `--swc-*` property must be documented with a `@cssprop` JSDoc tag on the primary SWC component class.

Initial expectation for Popover: a small reviewed set covering the values consumers most commonly override — minimum / maximum size, padding when used as a dialog surface, and the tip dimensions. Specific names to be confirmed during the styling phase.

### Behavioral semantics

#### Modal-dialog lifecycle (v1)

`<swc-popover>` v1 is modal-only. The component's own lifecycle code (no shared mixin) opens the internal `<dialog>` via `showModal()`:

1. The host renders an internal `<dialog class="swc-Popover">` element in its shadow root. The host's reactive properties (`open`, `placement`, etc.) forward to the internal dialog as needed. The component's CSS targets the `.swc-Popover` class on this internal element.
2. On `open = true`: `internalDialog.showModal()` is called. Browser provides `role="dialog"`, focus trap, background inert via the top layer, and Escape-to-close. `swc-open` is dispatched synchronously from the setter (no native open event).
3. On `open = false`: `internalDialog.close()` is called. Browser fires the `close` event; the component dispatches `swc-close` and then (after `transitionend`) `swc-after-close`.
4. Initial focus: `<dialog>` auto-focuses the first focusable descendant. First-party components override this for pattern-specific focus targets (Picker focuses the selected menu item; Contextual Help focuses the heading via `autofocus`). The popover host does not prescribe.
5. `cancel` event (Escape pressed before `close()`) is intercepted, allowed to proceed, and triggers the same close path as `close()`. Listener de-duplicates against the immediately-following `close` event so `swc-close` only fires once.
6. Click on the backdrop dismisses the popover. A `pointerdown` listener on the internal `<dialog>` detects a click landed on the dialog element itself (not on a descendant) — this is how the browser exposes backdrop-target clicks. On backdrop hit, the component calls `close()`, which then routes through the same `close` event path. Same pattern WebAwesome's `<wa-dialog>` uses. Note: the dialog's CSS padding must be on an inner content wrapper (`.swc-Popover-content`), not on `.swc-Popover` itself, because the dialog's hit-test region includes its padding box — otherwise clicks "near the edge" of the popover would close it.

Non-modal mode (`popover="auto"` lifecycle, light-dismiss, no focus trap) is **additive (A1)** and ships when the first consumer needs it. The v1 component is structured so that adding the second lifecycle branch doesn't require refactoring the modal path — the lifecycle code lives in a single dispatching method that can switch on a future `non-modal` property.

### Differences from 1st-gen popovers

The shift from "styles-only host + `<sp-overlay>` orchestration" to "self-contained modal-dialog host" produces several user-visible behavior differences that consumers must be aware of. Each of these is a deliberate consequence of the modal-by-default decision (D2), not a regression to fix.

| Behavior | 1st-gen `<sp-popover>` (typical via `<sp-overlay>`) | 2nd-gen `<swc-popover>` v1 (modal) |
| -------- | --------------------------------------------------- | ----------------------------------- |
| **Page behind interactivity** | Remained interactive — users could click elements outside the popover | **Blocked.** Native `<dialog>` top-layer behavior inerts the rest of the page. Buttons, links, and form fields behind the popover are not clickable, focusable, or hit-testable. |
| **Page background scroll** | Allowed — users could scroll the page while a popover was open | **Blocked.** `<dialog>.showModal()` prevents scroll on the page behind. (On iOS Safari, additional CSS work may be needed to fully prevent scroll-chaining — Q3 benchmark scope.) |
| **Focus trap** | Manually wired by `<sp-overlay>` via the `focus-trap` package | **Automatic.** `<dialog>.showModal()` traps focus natively; Tab cycles inside the dialog only. |
| **Tab away to other page content** | Permitted | **Not permitted while open.** Tabbing out is blocked by the dialog focus trap. The user must close the popover first. |
| **Click outside the popover** | Closed the popover (light-dismiss via 1st-gen `OverlayStack`) | **Closes the popover.** Native `<dialog>.showModal()` doesn't implement this by itself, so the component wires it: a `pointerdown` listener on the internal `<dialog>` checks `event.target === dialog` and dismisses on backdrop hit. Same pattern WebAwesome's `<wa-dialog>` uses. UX matches 1st-gen. No opt-out — strict-modal behavior belongs to `<swc-dialog>`, not `<swc-popover>`. |
| **Backdrop visual** | None — the rest of the page was visible at full opacity | **Native `::backdrop` pseudo-element renders behind the dialog.** Browsers default to a translucent overlay. Spectrum 2 chrome may or may not customize this — Q1 (Figma) confirms. |
| **Escape to close** | Required wiring by `<sp-overlay>` and consumers; behavior varied | **Native and uniform.** `<dialog>` `cancel` event fires on Escape, browser closes the dialog and restores focus to the trigger automatically. |
| **Stacking when opening multiple** | `OverlayStack` managed; opening a new modal often dismissed prior overlays | **Browser top-layer stacks.** Opening a new modal popover stacks on top of an existing one; no auto-close of the prior popover. The user must close them in LIFO order. |
| **Initial focus inside the popover** | Configured via `<sp-overlay receivesFocus>` | **Native `<dialog>` autofocus rules.** First focusable descendant gets focus unless an element has `autofocus`. First-party components override per pattern (Picker focuses the selected menu item, Contextual Help focuses the heading). |
| **Restoring focus on close** | Wired by overlay or consumer | **Automatic.** `<dialog>.close()` returns focus to the element focused before `showModal()` was called (typically the trigger). |
| **Default placement** | `undefined` — no class applied unless the consumer set one | `'bottom'` (B2). The host always has a placement class. |
| **`role="dialog"` on the surface** | Not set on `<sp-popover>`; consumers added `role="presentation"` to strip semantics | **Set automatically.** The internal `<dialog>` carries `role="dialog"`. Consumers do not need to add or remove the role. |

**Most significant practical consequence:** the page behind is now blocked and non-scrollable. Click-outside-to-dismiss is preserved (Q6 resolved as option b), so consumer dismissal patterns don't change from 1st-gen — only the page-behind behavior does. This affects every first-party migration that follows: Picker, Menu, Action Menu, Contextual Help, Coachmark.

This list belongs in the [Consumer migration guide (SWC-2003)](https://jira.corp.adobe.com/browse/SWC-2003) and in the Behaviors story prominently. A "what changed" callout in the migration guide should explicitly enumerate these so consumers can plan testing and authoring updates.

#### Trigger resolution

Trigger resolution has two paths, mirroring the [Tooltip migration plan](../tooltip/migration-plan.md):

1. **`for="<id>"`** — declarative. The component calls `this.getRootNode().getElementById(this.for)`. Strictly same-root. The element bearing the ID must live in the same tree as the popover.
2. **`trigger-element` setter** — imperative. The component accepts a direct element reference (or `VirtualTrigger`). Bypasses ID resolution entirely. Used for cross-shadow-root cases, programmatic insertion, and `VirtualTrigger` anchoring.

After the trigger is resolved, `resolveTrigger()` performs **inner-button discovery**: if the resolved element has an open shadow root, the helper runs `host.shadowRoot.querySelector('button')` to find the AT-facing inner button. If found, ARIA attributes are wired on the inner button. If not (closed shadow root, native element, or no inner button), ARIA is wired on the trigger host directly.

See the [research notes](./migration-research-notes.md#cross-shadow-root-trigger-resolution) for the four-scenario summary table and the ID-resolution-is-always-same-root rule.

#### Trigger-side ARIA wiring

The component manages two ARIA surfaces on the resolved trigger (or its inner button), each with different durability semantics:

- **`aria-controls` / `ariaControlsElements`: durable.** Set as soon as `for=` / `trigger-element` resolves to a trigger — *not* on `open` change. Per the ARIA spec, `aria-controls` represents a persistent control relationship: the trigger controls the popover whether or not it is currently visible. State (open or closed) is communicated by `aria-expanded`. Cleared only when the popover is disconnected from the DOM, `for=` is removed, or `trigger-element` is set to `null`. The component chooses `aria-controls` ID string (same-root) or `ariaControlsElements = [popoverHost]` IDL property (cross-root) automatically based on whether the inner button and the popover host share a root. Same Baseline Apr-2025 ARIA-IDL surface validated by the tooltip migration plan; no Safari-specific durability concern remains on modern Safari (16.4+).
- **`aria-expanded`: state-toggled.** Set to `"true"` on `open = true` and `"false"` on `open = false`. Also durable — once a trigger is resolved, `aria-expanded` is always present (never absent), even when closed.

This differs from the tooltip migration plan's `ariaDescribedByElements` wiring, which IS open-only because `aria-describedby` describes a tooltip's content only while the tooltip is visible. `aria-controls` represents a different relationship and stays in place across open/close cycles.

The component does NOT write `aria-haspopup` — that attribute is pattern-specific and belongs to the consumer or first-party component.

### Event lifecycle

| Native event | Condition | SWC event dispatched |
| ------------ | --------- | -------------------- |
| `<dialog>` `cancel` (Escape pressed) | dialog is open | `swc-close` (after allowing the default close to proceed) |
| `<dialog>` `close` | dialog has just closed | `swc-close` (de-duplicated against `cancel`) |
| `transitionend` on the dialog (after open) | open transition complete | `swc-after-open` |
| `transitionend` on the dialog (after close) | close transition complete | `swc-after-close` |
| Programmatic `open = true` → `showModal()` succeeds | dialog has just opened | `swc-open` |

`swc-open` does not have a native counterpart for modal dialogs (the dialog spec dispatches no "open" event). The component dispatches it synchronously after `showModal()` resolves, from the same path the property setter takes — this is one of the few cases where event dispatch is tied to the setter rather than a native listener, and it is necessary because the spec doesn't expose an open event.

`swc-close` consolidates the `cancel` (Escape) and `close` paths. To prevent double-dispatch the component flags the dispatch from `cancel` and ignores the immediately-following `close` event.

The component guards against `transitionend` never firing (when `prefers-reduced-motion: reduce` removes transitions, or stories with `transition-duration: 0s`): if `getComputedStyle(internalDialog).transitionDuration === '0s'`, the after-event fires from the same tick as the open or close path.

The `open` setter and the native lifecycle listeners use a private backing field (`this._open`) to avoid setter-listener loops, identical to the tooltip plan's guard.

#### `popovertarget` interop

Not applicable in v1. Native `popovertarget` only opens elements with `popover="auto" | "manual"`; it does not trigger `<dialog>.showModal()`. The modal-only v1 therefore does not respond to `popovertarget`-based invocation. When non-modal mode lands as A1, `popovertarget` interop ships with it. The migration guide should note that consumers wanting declarative-on-the-trigger invocation in v1 use a regular click handler that sets `popover.open = true` — `popovertarget` is reserved for the additive non-modal path. See the [research notes](./migration-research-notes.md#trigger-to-popover-wiring-for-vs-native-popovertarget) for the full design rationale.

#### `actual-placement` and tip orientation

`PlacementController` computes the actual placement after `flip` middleware reorients and writes it back via `onPlacementChange`. The component reflects the value as the `actual-placement` attribute on the host. The component's CSS reads it via `:host([actual-placement="top"]) .swc-Popover-tip` etc. — the tip orientation follows the computed placement, not the requested one.

### Accessibility semantics notes (2nd-gen)

- **Modal-dialog semantics by default:** the internal `<dialog>` element provides `role="dialog"` automatically. Consumers do not need to set `role` on the host. If a consumer wants `role="alertdialog"` semantics on a popover surface, that belongs in a separate `<swc-alert-dialog>` component, not as a popover variant.
- **The original [accessibility-migration-analysis.md](./accessibility-migration-analysis.md) needs an amendment (Q4):** that analysis was written assuming a role-free host. Modal-dialog semantics contradict that assumption. The amendment must note that the rendered surface is a `<dialog>` carrying `role="dialog"`, with focus trap and Escape provided natively. The "no default ARIA on host" guidance survives in the additive non-modal mode (A1) when it lands.
- **No interactive content directly inside `<swc-popover>` that doesn't belong to a child pattern:** the dialog focus trap means whatever interactive elements are inside the popover are the user's only navigation surface until close. Consumers must ensure something focusable exists (or use `autofocus`).
- **The host element does NOT define an accessible name.** Consumers provide the name via `aria-labelledby` referencing labelled content inside the popover (e.g., a heading), or `aria-label` on the host directly. Without one, AT will announce a nameless dialog — fix in the consumer's authoring.
- **`<dialog>.showModal()` on iOS Safari** is the known performance concern from the [Overlay strategy RFC](#references). Q3 in [Blockers](#scope-and-prerequisites) tracks the benchmark step that must complete before downstream Picker / Action Menu migrations adopt the same lifecycle pattern in product code.
- **Inner-button ARIA wiring** is validated in the tooltip plan's POC. Same Baseline Apr-2025 ARIA-IDL surface (Chrome 135+, Firefox 136+, Safari 16.4+), same NVDA and VoiceOver validation. See the [tooltip migration plan — ARIA relationship wiring](../tooltip/migration-plan.md#aria-relationship-wiring).

---

## Architecture: core vs SWC split

> The 1st-gen component is a **reference only** — 2nd-gen is built independently. Neither generation imports from the other.

Follow the [Badge migration reference](../../02_workstreams/02_2nd-gen-component-migration/02_step-by-step/01_washing-machine-workflow.md#reference-badge-migration) as the concrete pattern for the core / SWC split.

| Layer | Path | Contains |
| ----- | ---- | -------- |
| **Core** | `2nd-gen/packages/core/components/popover/` | `Popover.base.ts` (abstract; declares `open`, `placement`, `tip`, `offset`, `cross-offset`, `container-padding`, `should-flip`, `tip-padding`, `for`, `triggerElement` properties with full Placement type union; runtime validation of `placement` per the proxy pattern; no rendering); `Popover.types.ts` (`Placement` union, `ALL_PLACEMENTS` array, `POPOVER_VALID_PLACEMENTS` array, exported constants); `index.ts`. |
| **Core (controller)** | `2nd-gen/packages/core/controllers/placement-controller/` | `PlacementController.ts` (Floating UI wrapper, decoupled from Gen1 Overlay); `types.ts` (`Placement`, `PlacementOptions`, `VirtualTrigger`, `PlacementHostConfig`); `index.ts`; tests. **New artifact delivered by this migration.** |
| **Core (utils)** | `2nd-gen/packages/core/utils/` | `resolve-trigger.ts` (pure helper, ~25 lines): resolves `for=` via `getRootNode().getElementById()`, falls back to `trigger-element` override, performs inner-button discovery (`shadowRoot.querySelector('button')`) for SWC-component triggers. Returns `{ trigger, interactiveElement }`. **New artifact delivered by this migration.** Tooltip refactors to use it in a follow-up. |
| **SWC** | `2nd-gen/packages/swc/components/popover/` | `Popover.ts` (concrete subclass; the component's own dialog lifecycle, event dispatch, and inline ARIA wiring all live here — no shared mixin); `swc-popover.ts` (element registration); `popover.css` (authored with `.swc-Popover` BEM-ish class selectors, `@global-exclude` regions for shadow-only rules); `stories/`; `test/`; `migration-guide.mdx`; `index.ts`. |
| **SWC (auto-generated)** | `2nd-gen/packages/swc/stylesheets/global/global-popover.css` | Emitted by the existing `vite-global-elements-css` plugin from `popover.css`. Wrapped in `@layer swc-global-elements`. The customer-facing `.swc-Popover` class distribution. |

Planned rendering shape:

- Core declares the property surface and the abstract API contract. The concrete SWC class implements the dialog lifecycle inline (`showModal()` / `close()` / `cancel` / `transitionend` listeners + `swc-*` event dispatch + setter-listener loop guard).
- SWC renders an internal `<dialog class="swc-Popover">` wrapping `<div class="swc-Popover-content"><slot></slot></div>` and, when `tip` is set, a `<span class="swc-Popover-tip"></span>` element. Placement-modifier classes (`.swc-Popover--<actual-placement>`) are applied reactively. The inner `.swc-Popover-content` wrapper is required so that the dialog's padding does not interfere with backdrop-click detection (clicks on a dialog's padding region resolve to the dialog element itself, which would incorrectly dismiss).
- SWC's `popover.css` is authored on the internal element so `vite-global-elements-css` can emit the class distribution. `@global-exclude` regions wrap modal-specific host rules and any animations driven by JS lifecycle.

### Host element type

`<swc-popover>` itself cannot extend `HTMLDialogElement` (autonomous custom elements cannot extend specific HTML interfaces, and customized built-in element `<dialog is="swc-popover">` syntax is not fully supported across browsers — notably Safari). The architecture therefore is:

- **Render a `<dialog>` inside the shadow root.** The host `<swc-popover>` holds the API and the placement / ARIA wiring; the internal `<dialog>` does the heavy `showModal()` lifting. The component forwards `open` to `internalDialog.showModal()` / `internalDialog.close()`.
- CSS targets the internal `.swc-Popover` element (which is the `<dialog>`). `popover.css` is authored on that selector. The `vite-global-elements-css` plugin emits `global-popover.css` accordingly.
- The internal `<dialog>` is the focus-trapped surface; the host element is a thin wrapper that holds the public API.
- For the additive non-modal mode (A1), the component will need to choose between (a) keeping the same internal `<dialog>` element and setting `popover="auto"` on it (works — `<dialog>` accepts the `popover` attribute and uses the popover lifecycle instead of dialog lifecycle), or (b) rendering a different element (e.g., `<div popover="auto">`) when the `non-modal` attribute is set. Decision belongs to the additive's design phase.

---

## Migration checklist

### Preparation (this ticket)

- [x] 1st-gen API surface documented
- [x] Dependencies identified
- [x] Breaking changes documented
- [x] 2nd-gen API decisions drafted
- [ ] Plan reviewed by at least one other engineer
- [ ] Figma `S2 / Web (Desktop scale)` Popover frame captured as PNG and added to this folder
- [ ] Accessibility migration analysis amended for D2 (modal-mode host semantics) — see Q4

### Setup

- [ ] Create `2nd-gen/packages/core/components/popover/`
- [ ] Create `2nd-gen/packages/core/controllers/placement-controller/`
- [ ] Create `2nd-gen/packages/core/utils/resolve-trigger.ts` and wire from `utils/index.ts`
- [ ] Create `2nd-gen/packages/swc/components/popover/`
- [ ] Wire exports in all `package.json` files (core controllers / mixins entry; swc component entry; swc stylesheets entry for the auto-emitted global CSS)
- [ ] Confirm `spectrum-css` is checked out at `spectrum-two` branch as a sibling directory (path `../../../../../spectrum-css/`)
- [ ] Confirm `@floating-ui/dom` is available in `2nd-gen/packages/core/`'s dependencies (carry over from 1st-gen)

### API

#### `PlacementController`

- [ ] `PlacementController.types.ts`: define `Placement` union (12 physical + 6 logical), `ALL_PLACEMENTS` array, `PlacementOptions` interface, `VirtualTrigger` interface, `PlacementHostConfig` interface
- [ ] `PlacementController.ts`: implement constructor `(host, config)`; methods `start()`, `stop()`, `recompute()`; properties `actualPlacement`, `isConstrained`; ReactiveController lifecycle (`hostConnected`, `hostUpdated`, `hostDisconnected`)
- [ ] Floating UI middleware composition: `offset`, `flip` (gated on `shouldFlip`), `shift`, `size`, `arrow` (gated on `tipElement` resolver returning non-null)
- [ ] `autoUpdate` wiring split: ancestor-resize-channel calls `onPlacementChange`; scroll/element-resize channel calls `recompute`
- [ ] WebKit visual-viewport compensation (carry over from 1st-gen)
- [ ] DPR rounding of computed `(x, y)` (carry over from 1st-gen)
- [ ] Rapid-open guard (calling `start()` twice tears down the prior session first)
- [ ] No `<sp-update-overlays>` document event listener — 2nd-gen does not have a global update bus; the host calls `recompute()` when it needs to

#### `resolveTrigger()` helper

- [ ] `resolve-trigger.ts`: pure function `resolveTrigger(host, { for, triggerElement })` returns `{ trigger, interactiveElement }`. Resolves `for=` via `host.getRootNode().getElementById()`; falls back to the `trigger-element` override; performs inner-button discovery via `trigger.shadowRoot?.querySelector('button')` for open-shadow trigger hosts; returns `trigger` itself as `interactiveElement` for closed-shadow or native triggers.
- [ ] Unit-test all four resolution scenarios from the [research notes](./migration-research-notes.md#cross-shadow-root-trigger-resolution) summary table.

#### Popover component

- [ ] `Popover.types.ts`: re-export `Placement` from the placement-controller types; define `POPOVER_VALID_PLACEMENTS` (full 18)
- [ ] `Popover.base.ts`: declares all properties (`open`, `placement`, `actualPlacement`, `tip`, `offset`, `cross-offset`, `container-padding`, `should-flip`, `tip-padding`, `for`, `triggerElement`) on `SpectrumElement`; runtime validation of `placement` against `POPOVER_VALID_PLACEMENTS` (warns in dev mode, falls through to controller)
- [ ] `Popover.ts` (SWC): renders the internal `<dialog class="swc-Popover">` element wrapping `<div class="swc-Popover-content"><slot></slot></div>`; conditional `<span class="swc-Popover-tip">` when `tip` is set; reactive class binding for `.swc-Popover--<actual-placement>` modifiers; element registration
- [ ] Lifecycle (modal-only v1) inline on the component: on `open = true` → `internalDialog.showModal()` + dispatch `swc-open`. On `open = false` → `internalDialog.close()`. Native `cancel` / `close` / `transitionend` listeners drive `swc-close` / `swc-after-open` / `swc-after-close`. Code structured so the A1 non-modal lifecycle branch can be added later without refactoring.
- [ ] Setter-listener loop guard via private `_open` backing field
- [ ] Event dispatch consolidation: `cancel` and `close` listeners de-duplicate so `swc-close` fires once per close cycle; 0-duration transition guard for `swc-after-*`
- [ ] In `updated()`: call `resolveTrigger()` whenever `for` or `triggerElement` changes (Lit reactivity), update the durable `aria-controls` / `ariaControlsElements` wiring on the resolved interactive element, and set initial `aria-expanded="false"`. Clean up on disconnect / trigger removal.
- [ ] On `open` change: toggle `aria-expanded` value on the resolved interactive element
- [ ] `PlacementController` instantiated lazily — only when `for=` or `trigger-element` resolves to a non-null trigger
- [ ] `actual-placement` attribute updated via the controller's `onPlacementChange` callback
- [ ] Backdrop-click-to-close (Q6 resolved as option b): `pointerdown` listener on the internal `<dialog>` checks `event.target === dialog` and calls `internalDialog.close()`. `swc-close` event detail reports `source: 'backdrop'` (vs `'escape'` from `cancel`, `'programmatic'` from the `open` setter). Inspired by WebAwesome `<wa-dialog>`'s light-dismiss pattern.

#### Alignment checks

- [ ] Figma `S2 / Web (Desktop scale)` Popover frame confirms the full placement matrix
- [ ] React Spectrum `Popover` props mapped: `placement`, `offset`, `crossOffset`, `containerPadding`, `shouldFlip` → our equivalents (kebab-case) ✓; `isNonModal` → `non-modal` ✓; `arrowSize` / `arrowBoundaryOffset` → covered by `tip-padding` (additive)
- [ ] Tip rendering verified against Figma — does it match the 1st-gen SVG dimensions, or does Spectrum 2 use a different tip geometry?

### Styling

> Follow the [CSS style guide](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/) as the source of truth for all styling work. Key references: [migration steps](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/04_spectrum-swc-migration.md), [custom properties](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/02_custom-properties.md), [anti-patterns](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/05_anti-patterns.md).

- [ ] Render shape: `<dialog class="swc-Popover"><div class="swc-Popover-content"><slot></slot></div>...</dialog>`. Padding lives on `.swc-Popover-content`, not on `.swc-Popover`; keep styling off `:host` except for structural rules required by the host's element type
- [ ] Copy S2 source from `spectrum-css/components/popover/index.css` (`spectrum-two` branch, not `/dist`) into `popover.css` as baseline
- [ ] Map Spectrum CSS selectors to SWC equivalents following the CSS selector guidance in `CONTRIBUTOR-DOCS`
- [ ] Add all six logical placement classes consolidated with their non-logical equivalents (`start`, `start-top`, `start-bottom`, `end`, `end-top`, `end-bottom`)
- [ ] Add `.swc-Popover-tip` element styles; orient based on `[actual-placement]` modifier classes
- [ ] Wrap modal-host-specific rules and any JS-lifecycle-driven animations in `/* @global-exclude */ … /* @global-exclude-end */` markers
- [ ] Verify the auto-generated `global-popover.css` produces the expected `.swc-Popover` class distribution
- [ ] Forced-colors media query: sort to the bottom of `popover.css`; verify visible chrome (border becomes `CanvasText`)
- [ ] Add `@cssprop` JSDoc tag to `Popover.base.ts` for every exposed `--swc-*` property
- [ ] Pass stylelint (property order, `no-descending-specificity`, token validation)

#### Visual model and regressions

- [ ] Verify chrome (border, drop shadow, radius, background) matches Figma at all placements
- [ ] Verify tip geometry across all 18 placement values and RTL logical variants
- [ ] Verify forced-colors / high-contrast mode
- [ ] Confirm visual parity with 1st-gen `<sp-popover>` minimum-size and dialog-padding behaviors via the `.swc-Popover` class on a customer's `<dialog>` (the equivalent of 1st-gen `:host([dialog])`)

### Accessibility

> Cross-reference [`accessibility-migration-analysis.md`](./accessibility-migration-analysis.md). That document needs amendment for D2 — tracked as Q4.

#### Naming and semantics

- [ ] Modal mode: `<dialog>` provides `role="dialog"` natively; verify no JS sets `role` on the host
- [ ] Non-modal mode: no `role` is set on the host; consumer-supplied content owns its own semantics
- [ ] `aria-haspopup` is NOT set by the host; documented in the migration guide that consumers (and first-party components) wire pattern-specific `aria-haspopup` themselves
- [ ] Stable `id` per `<swc-popover>` instance: `if (!this.id) this.id = \`swc-popover-${++PopoverIdCounter}\``  — needed for `aria-controls` ID-string wiring

#### Trigger-side ARIA wiring

- [ ] When `for=` / `trigger-element` resolves: durably set `aria-controls="<popover-id>"` (same-root) OR `ariaControlsElements = [popoverHost]` (cross-root) on the resolved interactive element (inner button for SWC components with open shadow root; host element otherwise). Stays set across open/close cycles per the ARIA spec.
- [ ] When `for=` / `trigger-element` is cleared, the popover is disconnected, or the trigger reference changes: remove the prior `aria-controls` / `ariaControlsElements` wiring.
- [ ] When `for=` / `trigger-element` resolves: durably set `aria-expanded="false"` initially.
- [ ] On `open = true`: set `aria-expanded="true"` on the resolved interactive element.
- [ ] On `open = false`: set `aria-expanded="false"` (not removed).
- [ ] No wiring when neither `for` nor `trigger-element` is set; no errors thrown.

#### State verification

- [ ] `[open]` reflects on host when popover is visible
- [ ] Closed popover is hidden from AT (native `<dialog>` / `popover` attribute handles this)
- [ ] `Escape` closes popover; focus returns to trigger (modal mode native; non-modal mode native)
- [ ] No interactive element regression in modal mode — focus trap is active and Tab cycles within the dialog
- [ ] High-contrast border present in forced-colors mode
- [ ] iOS Safari `<dialog>.showModal()` smoke test on a representative DOM (Q3)

### Testing

- [ ] `PlacementController` agnostic test suite (`placement-controller.test.ts`): anchor placement + flip + shift + size + arrow on synthetic trigger/target pairs; autoUpdate wiring; rapid-open guard; WebKit compensation in a mocked WebKit context
- [ ] `resolveTrigger()` agnostic test suite (`resolve-trigger.test.ts`): all four resolution scenarios from the research notes summary table — same-root by ID, customer's shadow containing both, cross-root 2nd-gen with inner-button discovery, cross-root via trigger-element setter, closed-shadow fallback
- [ ] `Popover.test.ts`: component-level behavior — renders correctly, attribute reflection, slot content
- [ ] Add Playwright `popover.a11y.spec.ts` with `toMatchAriaSnapshot` for the open and closed states; verify `<dialog>` role is announced in modal mode

#### Behavior

- [ ] Modal mode opens via `showModal()` on `open = true`
- [ ] Modal mode closes via `close()` on `open = false`
- [ ] Modal mode: Escape closes; `cancel` event observed; `swc-close` dispatched with `detail.source === 'escape'`
- [ ] Modal mode: click on the backdrop closes the popover; `swc-close` dispatched with `detail.source === 'backdrop'`
- [ ] Modal mode: clicks on the popover's padding ring (inside `.swc-Popover-content`) do NOT close — verify the inner-content wrapper architecture works correctly
- [ ] Modal mode: clicks on slotted content do NOT close
- [ ] Programmatic close (`open = false`): `swc-close` dispatched with `detail.source === 'programmatic'`
- [ ] Non-modal mode (additive A1) opens via `showPopover()` on `open = true`
- [ ] Non-modal mode (additive A1) closes via `hidePopover()` on `open = false`
- [ ] Non-modal mode (additive A1): light-dismiss closes; `beforetoggle` observed and `swc-close` dispatched
- [ ] `swc-open`, `swc-after-open`, `swc-close`, `swc-after-close` dispatch in the expected order
- [ ] `for=` resolves trigger and durably wires `aria-controls` (same-root) or `ariaControlsElements` (cross-root) from the moment the relationship resolves — not on open change
- [ ] `aria-expanded` toggles on `open` change; remains present and falses when closed (not removed)
- [ ] Removing `for=` or setting `trigger-element = null` clears both `aria-controls` / `ariaControlsElements` and `aria-expanded`
- [ ] `for=` pointing to a non-existent ID: no error, no wiring
- [ ] `trigger-element` setter overrides `for=`
- [ ] `trigger-element` accepts an element from a different shadow root and wires `ariaControlsElements` correctly
- [ ] Inner-button discovery works for an open-shadow SWC component trigger; falls back to host for closed-shadow / native elements
- [ ] Modal-by-default UX (B1, see [Differences from 1st-gen popovers](#differences-from-1st-gen-popovers)) verified manually on a representative consumer-like setup: page-behind is inert, scroll is blocked, Escape closes, focus returns to trigger, click on backdrop closes
- [ ] `popovertarget` on a trigger in non-modal mode (additive A1) opens the popover (browser-handled); the component observes the toggle and updates `open`
- [ ] `popovertarget` in modal mode is a no-op (browser does not respond)
- [ ] `placement` validation: invalid value logs a dev-mode warning; `PlacementController` flips to a sensible value via middleware
- [ ] `actual-placement` reflects the computed placement after `flip` reorients
- [ ] `should-flip="false"` disables flip middleware — popover stays in requested placement when constrained

#### Visual regression

- [ ] VRT for all 12 physical placements (top/right/bottom/left × start/center/end)
- [ ] VRT for at least 2 logical placements (`start`, `end`) verifying RTL behavior
- [ ] VRT for `tip` present and absent
- [ ] VRT for open and closed states with transition
- [ ] VRT for forced-colors / high-contrast mode
- [ ] VRT for `.swc-Popover` class applied to a customer `<div>` (validates the class distribution renders identically to the component)

### Documentation

#### General

- [ ] JSDoc on all public properties, slots, and exposed `--swc-*` CSS custom properties
- [ ] Stories: Playground, Overview, Anatomy (default slot, tip), Options (placement, modal vs non-modal, offset/cross-offset), States (open), Behaviors (trigger-element, popovertarget interop, `for` cross-root example), Accessibility (modal vs non-modal semantics, trigger-side ARIA wiring)
- [ ] Story for the `.swc-Popover` class on a customer `<div>` and on a `<dialog>` — demonstrates the styles-without-component distribution

#### Breaking changes

- [ ] Consumer migration guide ([SWC-2003](https://jira.corp.adobe.com/browse/SWC-2003)): explain that 1st-gen `<sp-overlay>` + `<sp-popover>` composition does NOT translate to `<swc-overlay>` + `<swc-popover>` in 2nd-gen — the recommended migration is to either (a) adopt the first-party 2nd-gen component (Picker, Action Menu, etc.) that has popover built-in, or (b) use `<swc-popover>` directly with `for=` / `open` if a custom anchored popover is needed
- [ ] Consumer migration guide: **prominently call out the user-visible behavior differences** from [Differences from 1st-gen popovers](#differences-from-1st-gen-popovers) — page-behind is inert, page scroll is blocked, backdrop pseudo-element renders, stacking semantics changed, initial focus and focus restoration are now native. Click-outside-to-close UX is preserved from 1st-gen. Each is a deliberate consequence of modal-by-default, not a regression.
- [ ] Consumer migration guide: document the `[dialog]` attribute removal and the `<swc-dialog>` + `.swc-Popover` class composition path
- [ ] Consumer migration guide: document the new event contract (`swc-open` / `swc-after-open` / `swc-close` / `swc-after-close`) and timing differences vs `<sp-overlay>`'s `sp-opened` / `sp-closed`
- [ ] Consumer migration guide: document the durable-vs-state ARIA wiring split — `aria-controls` is permanent on the trigger once `for=` resolves; `aria-expanded` toggles on open/close
- [ ] Consumer migration guide: note that non-modal popover mode (light-dismiss, no focus trap) is deferred and will ship additively (A1)
- [ ] Behaviors story: demonstrate the modal-dialog blocking behavior with a representative trigger, and call out the differences from 1st-gen for testers

#### Accessibility

- [ ] Storybook Accessibility story: document `role="dialog"` in modal mode (native, via `<dialog>`); focus trap and Escape behavior (native); trigger-side ARIA wiring (`aria-expanded`, `aria-controls` / `ariaControlsElements`) including the inner-button resolution for SWC component triggers
- [ ] Document accessible-name expectations: consumers must supply `aria-labelledby` or `aria-label` to give the dialog a name; nameless dialogs are an authoring bug
- [ ] Document `aria-haspopup` as the consumer's responsibility — the popover does not assume the pattern
- [ ] Document the closed-shadow-root fallback (ARIA goes on the trigger host)

### Review

- [ ] `yarn lint:2nd-gen` passes (ESLint, Stylelint, Prettier)
- [ ] `yarn test` passes (component, helper, and controller suites)
- [ ] Status table in workstream doc updated for Popover (all 7 phases)
- [ ] PR created with description referencing Epic SWC-1993
- [ ] Architecture-review sign-off on the inline dialog-lifecycle pattern and the `resolveTrigger()` helper contract (since `<swc-menu>` migration will reuse the same primitives immediately after)
- [ ] Peer engineer sign-off
- [ ] Follow-on tickets for the additive scope (A1–A8) created and linked to Epic SWC-1993. See [Relationship to other component migrations](#relationship-to-other-component-migrations) for the downstream-migration ticket map.

---

## Blockers and open questions

During drafting, this section tracks active blockers and open questions. None are blocking to start implementation; they are scoped follow-ups.

### Design

| #   | Item | Blocking? | Status | Owner |
| --- | ---- | --------- | ------ | ----- |
| Q1  | **Figma `S2 / Web (Desktop scale)` Popover frame** must be captured as PNG and committed to this folder before the styling phase begins. Confirms full placement matrix, tip dimensions, and minimum-size rules. | No | Pending | Ruben Carvalho |
| Q2  | **Tip geometry validation.** Confirm whether Spectrum 2 changes tip dimensions or geometry vs 1st-gen's 16×9 / 9×16 SVG. If yes, S2 source dictates; if no, carry forward. | No | Pending | CSS reviewer |

### Architecture and behavior

| #   | Item | Blocking? | Status | Owner |
| --- | ---- | --------- | ------ | ----- |
| Q3  | **iOS Safari `<dialog>.showModal()` benchmark** on representative 2nd-gen consumer DOMs before downstream Picker / Action Menu / Contextual Help migrations adopt the same lifecycle pattern in product code. Per the Overlay strategy RFC. Smoke test in the Popover migration is sufficient; full benchmark is in the consumer migration. | No (for Popover); blocking for downstream | Pending | Performance reviewer |
| Q4  | **Amend [`accessibility-migration-analysis.md`](./accessibility-migration-analysis.md)** to reflect modal-mode host semantics (`<dialog>` provides `role="dialog"`). The original analysis assumed a role-free host. | No (this migration); confirmed-direction decision | To do | Accessibility reviewer |
| Q5  | **Coachmark inheritance vs composition.** 1st-gen `Coachmark extends Popover`. Decide during the coachmark migration whether 2nd-gen `<swc-coachmark>` extends `<swc-popover>` or implements its own dialog lifecycle alongside `PlacementController`. Defer; tracked here as a known follow-up. | No | Deferred | Coachmark migration owner |
| Q6  | **Backdrop-click-to-close policy.** Native `<dialog>.showModal()` does NOT dismiss when the backdrop is clicked — only Escape or explicit close does. 1st-gen popovers dismissed on click outside via `OverlayStack` light-dismiss. Two options were considered: (a) strict modal — only Escape and explicit close dismiss; (b) wire a backdrop click listener that closes on click outside. **Resolved — option (b), no opt-out.** `<swc-popover>` v1 wires backdrop-click-to-close by default via a `pointerdown` listener on the internal `<dialog>` checking `event.target === dialog`. Matches 1st-gen consumer UX expectations for Picker / Menu / Action Menu / Contextual Help; matches React Aria and WebAwesome `<wa-dialog>` precedents. The popover's CSS padding must live on an inner `.swc-Popover-content` wrapper rather than on the dialog itself, since the dialog's hit-test region includes its padding box. No strict-modal opt-out: that pattern belongs to `<swc-dialog>`, not `<swc-popover>`. | No | **Resolved** | Architecture reviewer |
| Q7  | **Background scroll lock on iOS Safari.** Native `<dialog>.showModal()` inerts the page but does not always prevent scroll-chaining on iOS Safari. React Aria's `usePreventScroll()` wires explicit body scroll lock with iOS-specific workarounds. Decide whether `<swc-popover>` wires this defensively or relies on the browser. Coordinate with Q3 benchmark. | No (for Popover); blocking for downstream Picker on touch | To resolve before downstream migration | iOS Safari subject-matter expert |

### Scope and prerequisites

| #   | Item | Blocking? | Status | Owner |
| --- | ---- | --------- | ------ | ----- |
| Q8  | **Consumer migration guide content for the `<sp-overlay>` + `<sp-popover>` → 2nd-gen translation.** Existing ticket [SWC-2003](https://jira.corp.adobe.com/browse/SWC-2003). Content depends on this plan and on subsequent first-party component migrations (Picker, Action Menu, etc.). The guide must prominently call out the [UX differences from 1st-gen popovers](#differences-from-1st-gen-popovers) (blocking page, no background scroll). Light-dismiss (click-outside-to-close) is preserved from 1st-gen. Updated incrementally per first-party migration. | No (for Popover) | In progress | Documentation owner |
| Q9  | **`<swc-dialog>` migration** is independent but adopting `.swc-Popover` chrome on the dialog surface (as the migration path for 1st-gen's `[dialog]` attribute) requires that `<swc-dialog>` exists with stylesheet adoption support. Coordinate with the dialog migration's schedule. | No (architectural decoupling is intentional) | Pending coordination | Dialog migration owner |

---

## References

- [Washing machine workflow](../../02_workstreams/02_2nd-gen-component-migration/02_step-by-step/01_washing-machine-workflow.md)
- [2nd-gen migration status table](../../02_workstreams/02_2nd-gen-component-migration/01_status.md)
- [Accessibility migration analysis](./accessibility-migration-analysis.md) — needs amendment per Q4
- [Rendering and styling migration analysis](./rendering-and-styling-migration-analysis.md)
- [Popover migration research notes](./migration-research-notes.md) — companion document; captures the reasoning behind the architectural decisions in this plan
- [Tooltip migration plan](../tooltip/migration-plan.md) — architectural reference for native top-layer + `swc-*` event lifecycle + inner-button ARIA wiring patterns
- [CSS style guide — Component Custom Property Exposure](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/02_custom-properties.md#component-custom-property-exposure)
- [CSS style guide — Selector conventions](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/02_custom-properties.md#selector-conventions)
- [1st-gen source](../../../../1st-gen/packages/popover/src/Popover.ts)
- [1st-gen styles](../../../../1st-gen/packages/popover/src/popover.css)
- [1st-gen README](../../../../1st-gen/packages/popover/README.md)
- [1st-gen `PlacementController`](../../../../1st-gen/packages/overlay/src/PlacementController.ts) — extraction target
- [React Spectrum S2 Popover](https://react-spectrum.adobe.com/Popover) — product alignment
- [WebAwesome `<wa-dialog>` source](https://github.com/shoelace-style/webawesome/blob/main/packages/webawesome/src/components/dialog/dialog.ts) — inspiration for the backdrop-click-to-close pattern (`pointerdown` + `event.target === dialog`) and the `source` field on the close event detail. (WebAwesome's `light-dismiss` opt-in attribute and `pulse` feedback animation belong to its general-purpose dialog component, not adopted here — `<swc-popover>` is anchored UI that always dismisses on backdrop click.)
- [Spectrum CSS — `components/popover/index.css` on `spectrum-two` branch](../../../../../spectrum-css/components/popover/index.css)
- [Badge migration reference](../../02_workstreams/02_2nd-gen-component-migration/02_step-by-step/01_washing-machine-workflow.md#reference-badge-migration)
- [`ariaDescribedByElements` cross-root POC (CodePen)](https://codepen.io/spectrum-css/pen/pvNEVda?editors=0010) — the same Baseline Apr-2025 ARIA-IDL surface used here for `aria-controlsElements`; AT-validated with NVDA and VoiceOver
- Overlay strategy RFC — Propose Next Gen Approach to Overlay (internal, SWC-1674)
- Epic: SWC-1993 — Popover migration umbrella
- SWC-917: Popover tip placement in RTL — fix verified in 2nd-gen
- SWC-933 / SWC-932: Picker arrow navigation in list when popover is the overlay — not popover-side bugs; tracked for picker migration
- SWC-1227: docs migration for Popover, Picker, Combobox, Coachmark
- SWC-1994: A11y recommendations for 2nd-gen migration
- SWC-1999, SWC-2001: Popover-related program tickets referenced in the rendering and styling analysis
- SWC-2002: Storybook accessibility story for popover
- SWC-2003: Consumer migration guide

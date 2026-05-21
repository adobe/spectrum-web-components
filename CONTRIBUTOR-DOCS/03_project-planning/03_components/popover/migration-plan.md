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
- [Changes overview](#changes-overview)
    - [Must ship — breaking or a11y-required](#must-ship--breaking-or-a11y-required)
    - [Additive — ships when ready, zero breakage for consumers already on 2nd-gen](#additive--ships-when-ready-zero-breakage-for-consumers-already-on-2nd-gen)
- [2nd-gen API decisions](#2nd-gen-api-decisions)
    - [Public API](#public-api)
    - [Events (2nd-gen)](#events-2nd-gen)
    - [Default lifecycle — `dialog.showPopover()`](#default-lifecycle--dialogshowpopover)
    - [Opt-in lifecycle — `dialog.showModal()`](#opt-in-lifecycle--dialogshowmodal)
    - [Stacking](#stacking)
    - [Differences from 1st-gen popovers](#differences-from-1st-gen-popovers)
    - [Trigger resolution](#trigger-resolution)
    - [Trigger-side ARIA wiring](#trigger-side-aria-wiring)
    - [Event lifecycle](#event-lifecycle)
    - [Invocation pattern](#invocation-pattern)
    - [Computed placement and tip orientation](#computed-placement-and-tip-orientation)
    - [Accessibility semantics notes (2nd-gen)](#accessibility-semantics-notes-2nd-gen)
- [Architecture: core vs SWC split](#architecture-core-vs-swc-split)
    - [Host element type and internal rendering](#host-element-type-and-internal-rendering)
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

---

## TL;DR

The 1st-gen `<sp-popover>` is a 75-line, styles-only component. Open/close, positioning, focus trap, dismissal, and ARIA were all delegated to `<sp-overlay>` or to the consumer. In 2nd-gen, `<swc-popover>` becomes an **opinionated, self-contained component** that renders an internal `<dialog popover="auto">` in both modes and switches between non-modal popover behavior and modal dialog behavior via different open methods. Native top-layer, light-dismiss (in default mode), anchored positioning, and trigger-side ARIA wiring all come out of the box.

- **Two supported behavior modes — single internal DOM, different open methods:**
  - The component always renders an internal `<dialog popover="auto">`. The `modal` attribute determines which open method runs when `open` becomes true.
  - **Default mode (no `modal` attribute) — `dialog.showPopover()`:** uses the popover-API lifecycle. Browser provides native top-layer rendering, light-dismiss (click outside, Escape), and auto-stack participation (opening one auto popover dismisses other open auto popovers). Page behind stays interactive and scrollable. Matches 1st-gen consumer UX for menus, pickers, action-menus, contextual-help, and customer-facing popover surfaces.
  - **Opt-in via `modal` attribute — `dialog.showModal()`:** uses the modal dialog lifecycle. Browser provides `role="dialog"`, focus trap, background inert, native Escape via the `cancel` event. The `popover` attribute is ignored in modal mode (only the open method matters). Page behind is blocking and non-scrollable.
  - **API additions (B-series):** new properties — `modal`, `offset`, `cross-offset`, `container-padding`, `should-flip`, `for`, `trigger-element` (setter); new ARIA wiring on the trigger — durable `aria-controls` / `ariaControlsElements` and `aria-expanded` in both modes, plus `aria-haspopup="dialog"` when `modal` is set; new event contract — `swc-open`, `swc-after-open`, `swc-close`, `swc-after-close` with a `source` detail.
- **API removals (B-series):** `[dialog]` host attribute removed. **No direct migration path in v1** — no public `.swc-Popover` class is distributed in this migration, so consumers using `[dialog]` for dialog-padding chrome must either wait for `<swc-dialog>` to ship as a separate migration, or duplicate the visual styling in their own CSS. 1st-gen's `placement="undefined"` default changes — new default is `'bottom'` (React Spectrum-aligned).
- **Stacking is browser-managed for the default (auto) mode.** `popover="auto"` provides sibling-dismissal between auto popovers and light-dismiss for free. We do **not** use the `anchor` HTML attribute (browser support is too uneven for v1) nor `popovertarget` (kept off the API per the "just `for=`/`id`" rule). Native auto-popover-stack handles "one popover at a time" UX; nested-popover scenarios that need a parent to stay open while a child opens are out of scope for v1 (e.g., submenus belong to the `<swc-menu>` migration's call).
- **New `dismissibleStack` utility for cross-mechanism Escape coordination.** A small module in `core/utils/`. Components register themselves on open and check `isTopDismissible(this)` before processing any custom Escape handling. Generic across all 2nd-gen dismissible top-layer UI — popover, dialog, tooltip, picker, menu, action-menu, coachmark, etc. Each component adopts it in its own migration.
- **Tooltip stays unchanged for this migration.** It keeps the lifecycle from its own migration plan. Tooltip can adopt the `dismissibleStack` and `resolveTrigger()` in a follow-up refactor; behavior is unchanged either way. The separate question of whether Tooltip eventually switches to `popover="manual"` (to avoid auto-stack pollution when hovering background buttons while a picker is open) belongs to a conversation with React Spectrum / Design teams; not in scope here.
- **Four deliverables in one PR:**
  1. **`PlacementController`** in `2nd-gen/packages/core/controllers/placement-controller/` — Floating UI wrapper, decoupled from Gen1 Overlay; the only true controller (positioning has genuine lifecycle: `autoUpdate`, cleanup, recompute).
  2. **`resolveTrigger()` helper** in `2nd-gen/packages/core/utils/` — small pure function (~25 lines) that resolves `for=` / `trigger-element` and discovers the AT-facing inner button across shadow boundaries. Tooltip can adopt in a follow-up refactor.
  3. **`dismissibleStack` module** in `2nd-gen/packages/core/utils/` — ~20 lines, generic LIFO stack for Escape coordination across all dismissible 2nd-gen top-layer UI. First consumer is `<swc-popover>` in this PR; tooltip + future components adopt subsequently.
  4. **`<swc-popover>` component** — explicit dual-mode lifecycle (auto + modal) on a single internal `<dialog popover="auto">` element, event dispatch, and inline ARIA wiring; no shared mixin. ~100–140 lines of component code.
- **No public `global-popover.css` distribution.** Popover styles live with the component (`popover.css`); cross-component sharing for first-party consumers (Menu, Picker, etc.) happens internally via a mechanism left unspecified in this plan (constructed stylesheets, shared CSS imports, or per-component duplication — to be decided during implementation). Customer-facing `.swc-Popover` class distribution can be added additively later if consumer demand emerges.
- **No `PopoverMixin`.** Explicit per-component lifecycle (~30 lines per consumer) plus a shared `resolveTrigger()` helper for the cross-root resolution. Keeps each component readable; avoids mixin-chain depth concerns; matches the Tooltip migration plan's precedent.
- **Light-dismiss is automatic in default mode** — the browser handles it via `popover="auto"`. Modal mode wires backdrop-click-to-close manually via a `pointerdown` listener on the internal `<dialog>` (since `<dialog>.showModal()` doesn't implement backdrop click-to-close natively).
- **Pending alignment with React Spectrum and Design** on details of the modal opt-in: specific UX requirements, whether modal popover should look visually distinct from auto popover, and whether some downstream consumers (e.g. coachmark) actually need the modal mode at all.

### Most blocking open questions

None blocking implementation. Items needing follow-up alignment / verification:

- `<dialog>.showModal()` benchmarking on iOS Safari for the modal opt-in path (Q3)
- Accessibility analysis amendment for both modes (Q4)
- React Spectrum / Design conversations on the modal opt-in's specific requirements (Q5)
- Coachmark inheritance vs composition (Q6)

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

1st-gen consumers (action-bar, action-menu, card, coachmark, combobox, contextual-help, menu, picker, slider, tooltip) import `@spectrum-web-components/popover` and use `<sp-popover>` to host their dropdown / menu / listbox / help surfaces — but they orchestrate behavior through `<sp-overlay>`. In 2nd-gen, that overlay + popover composition is replaced by self-contained components or by `<swc-popover>` with `for=` / `open`.

---

## Migration sequencing and prerequisites

### Dependency-aware recommendation

This migration ships **four artifacts in one PR**: `PlacementController`, the `resolveTrigger()` helper, the `dismissibleStack` module, and the `<swc-popover>` component. Splitting them is possible but creates orphan deliverables — the controller, helper, and stack have no independent consumer until popover exists, and popover cannot ship without them. The `dismissibleStack` is the deliverable with the broadest cross-component value beyond popover; it's intentionally small and generic so that subsequent component migrations (tooltip, dialog, picker, menu, etc.) can adopt it without modification. No public `global-popover.css` is shipped — that's reserved as a possible additive if external authors request the `.swc-Popover` class distribution.

This migration also ships shared primitives — `PlacementController`, `resolveTrigger()`, and `dismissibleStack` — that other 2nd-gen migrations may adopt.

### User confirmation needed

The architectural decisions were resolved with the user during planning. The most consequential confirmations needed before implementation:

- Default mode (`popover="auto"`) preserves 1st-gen UX semantics. Modal mode (`modal` attribute opt-in) introduces `<dialog>`-based blocking semantics that the [existing accessibility analysis](./accessibility-migration-analysis.md) needs to be amended for. Q4 in [Blockers](#architecture-and-behavior) tracks the analysis amendment.
- D5 (no first-party light-DOM composition) shifts the 1st-gen → 2nd-gen consumer migration story: 1st-gen consumers that compose `<sp-overlay>` + `<sp-popover>` cannot do a one-for-one swap to `<swc-popover>` — their migration is to bring popover behavior in directly. This must be reflected in the [Consumer migration guide ticket SWC-2003](https://jira.corp.adobe.com/browse/SWC-2003).
- Backdrop-click-to-close policy resolved during planning as option (b): light-dismiss is wired by default in modal mode. No strict-modal opt-out — that pattern belongs to `<swc-dialog>`, a separate component for modal dialogs, not to `<swc-popover>` (which is anchored UI).

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
| B1  | Component renders an internal `<dialog>` with native top-layer behavior (default) — moderate UX shift | `<sp-popover>` was a plain `HTMLElement`; no behavior; open/close driven externally by `<sp-overlay>`. Click outside closed the popover via 1st-gen `OverlayStack` light-dismiss. | The `<swc-popover>` host element stays in the light DOM where the consumer authors it. Inside its shadow root, the component renders an internal `<dialog popover="auto">` and opens that dialog via `dialog.showPopover()` (popover-API lifecycle: the **internal dialog** enters the top layer, the host element doesn't move). Browser handles Escape and click-outside dismissal natively. Page behind remains interactive and scrollable. UX largely matches 1st-gen consumer expectations. See [Differences from 1st-gen popovers](#differences-from-1st-gen-popovers). | Consumers stop pairing `<sp-popover>` with `<sp-overlay>`. They either (a) use `<swc-popover>` with `open` property control (and `for=` for trigger reference), or (b) use a first-party 2nd-gen component with popover built-in (Picker, Action Menu, etc.). No public `.swc-Popover` class distribution in v1. |
| B2  | New `modal` attribute — opt-in to blocking modal behavior | n/a | When set, the same internal `<dialog>` opens via `dialog.showModal()` instead. The `popover` attribute is ignored in this path (only the open method matters). Browser provides `role="dialog"`, focus trap, background inert, native Escape via `cancel`. Page behind is blocking and non-scrollable. Backdrop-click-to-close is wired by the component via the `pointerdown` + `event.target === dialog` pattern. | New attribute; opt-in. Most consumers won't set it. Use for popover-shaped surfaces that genuinely need modal semantics (rare). |
| B3  | Default placement value | `undefined` (no placement attribute, no CSS class applied) | `'bottom'` (matches React Spectrum's `Popover` default and Spectrum 2 guidelines) | Consumers relying on an unplaced popover (no class applied) must update: omitting the attribute is no longer enough; the host always has a placement class. Existing call sites that set a placement are unaffected. |
| B4  | Trigger resolution: `for` and `trigger-element` | Implicit — the surrounding `<sp-overlay>` resolved the trigger from its `triggerElement` setter or DOM ancestor chain | Explicit on the popover: `for="<id>"` attribute references the trigger by ID in the same tree root; `trigger-element` setter takes a direct element reference for cross-root cases or async triggers. Mirrors the tooltip migration plan's authoring pattern. | New API. Consumers move from "I wrap the popover in `<sp-overlay>` and let overlay find the trigger" to "I set `for=` on `<swc-popover>` or assign `trigger-element` programmatically." See [Trigger resolution](#trigger-resolution). |
| B5  | Event contract — `swc-*` lifecycle | None; events came from `<sp-overlay>` | Fires `swc-open`, `swc-after-open`, `swc-close`, `swc-after-close` regardless of mode. Auto mode wires events to `beforetoggle` / `toggle`; modal mode wires to `cancel` / `close` plus a synchronous `swc-open` dispatch from the setter. Both modes use `transitionend` for the after-events. `swc-close.detail.source` carries `'escape'`, `'outside'`, or `'programmatic'`. See [Events (2nd-gen)](#events-2nd-gen). | Consumers wire 2nd-gen event listeners. 1st-gen `sp-opened` / `sp-closed` listeners on the overlay don't apply. New listeners on `<swc-popover>` directly. |
| B6  | `[dialog]` host attribute removed | `:host([dialog])` applied dialog-padding styling | Removed (D4). | **No direct v1 migration path.** No public `.swc-Popover` class is shipped in this migration. Consumers using `[dialog]` either wait for `<swc-dialog>` (separate migration) and adopt whatever public surface that ships, or duplicate the visual styling in their own CSS. |
| B7  | `tip` attribute kept, rendering moves to internal element | `<sp-popover tip>` renders an SVG tip directly inside the host's shadow root with `id="tip"` | `<swc-popover tip>` renders the tip inside the internal `.swc-Popover` semantic container with class `swc-Popover-tip`. Class-based positioning replaces the JS-driven `style.translate` writeback. | No consumer API change beyond the rendering location — `tip` boolean attribute behaves the same. Note: arrow-middleware integration (precise tip positioning per trigger geometry) is additive (A4); the initial release CSS-centers the tip on the placement edge. |
| B8  | Computed placement exposed as readonly property | `actual-placement` was an Overlay-internal attribute set on the popover element | The host's `placement` attribute reflects the input (consumer request). The computed placement after `flip` middleware reorients is exposed as a readonly `actualPlacement` property on the host — **no attribute reflection**. Internal styling (tip orientation, etc.) is driven by `.swc-Popover--<placement>` modifier classes on the internal element, which the component sets reactively. Consumers reading the computed placement programmatically use the property; CSS that wants to react to placement targets the internal modifier class (shadow-DOM scoped). | No consumer migration needed. Existing CSS that targeted 1st-gen `actual-placement` (if any) was already operating on Overlay-internal markup; that markup is gone. |

#### Styling and visuals

| #   | What changes | 1st-gen behavior | 2nd-gen behavior | Consumer migration path |
| --- | ------------ | ---------------- | ---------------- | ----------------------- |
| S1  | Adopt S2 design tokens | S1 Spectrum tokens | S2 tokens from `spectrum-css` `spectrum-two` branch (`components/popover/index.css` and `components/popover/themes/spectrum-two.css`) | Visual update; no API change |
| S2  | Move styling from `:host` to `.swc-Popover` internal element | All rules on `:host` and `:host([dialog])` | Structural / surface rules on `.swc-Popover` (the internal `<dialog popover="auto">` element in both modes) with `.swc-Popover--<placement>` modifiers and `.swc-Popover-tip` for the tip element. The internal element wraps `.swc-Popover-content` which holds the padding; the wrapper is required in modal mode (where the `<dialog>` element's hit-test region for backdrop-click detection includes its padding box) and harmless in default mode (where light-dismiss is browser-handled and padding doesn't matter for click routing). Keep the inner wrapper in both modes for render consistency. Host has only the structural rules needed for popover top-layer semantics. | No consumer action. |
| S3  | Internal style sharing for first-party consumers | n/a | Popover styles live in `popover.css`. First-party components that need the same chrome (Menu, Picker, etc.) share styles internally via a mechanism left unspecified in this plan — constructed stylesheets, shared CSS imports, or per-component duplication. The mechanism is decided during implementation. **No public `global-popover.css` distribution in v1.** External authors who want the `.swc-Popover` class outside the component wait for an additive customer-facing distribution if/when consumer demand emerges. | No customer-facing API change. |
| S4  | Forced-colors / high-contrast support | Present in 1st-gen via Spectrum CSS | Preserved; `forced-colors` media query sorts to the bottom of `popover.css` per the project styling rules | No consumer action |
| S5  | Tip orientation moves from JS `style.translate` writeback to CSS modifier classes | 1st-gen Overlay's `PlacementController` writes `translate` on the tip element and the popover host | The internal element has `.swc-Popover--<placement>` (where `<placement>` is the computed placement value, e.g. `top`, `bottom-start`) class set reactively by the component. Tip orientation is purely CSS. | No consumer action |
| S6  | RTL tip placement fix (SWC-917) | Tip placement in RTL had a known bug | Logical placement classes (`start`, `end`, sub-variants) are first-class and correct in RTL | No consumer action |
| S7  | Scroll behavior — CSS-only | n/a (1st-gen overlay handled scroll-lock via custom JS) | **Modal mode:** `overflow: hidden` is applied to `html` while the modal popover is open, preventing page scroll behind the dialog. The popover surface (internal `<dialog>`) also uses `overscroll-behavior: contain` to prevent scroll chaining out of any internal scroll regions. Safari's known `overscroll-behavior` bug is counter-acted via CSS-only adjustments. **Default (auto) mode:** no scroll lock — users can scroll the page freely while the popover is open. Consistent with `popover="auto"` UX. **No JS-level scroll lock; no iOS-specific JavaScript workarounds.** | No consumer action; styling is internal. |

#### Accessibility and behavior

| #   | What changes | 1st-gen behavior | 2nd-gen behavior | Consumer migration path |
| --- | ------------ | ---------------- | ---------------- | ----------------------- |
| A1  | Native top-layer rendering | 1st-gen `OverlayStack` managed stacking via portaling and z-index | Browser top layer in both modes — `popover="auto"` in default mode; `<dialog>.showModal()` in modal mode. | No consumer action. Browser handles top-layer placement. |
| A2  | Native dismissal — light-dismiss in auto mode; native `<dialog>` Escape + wired backdrop-click in modal mode | Required wiring by overlay / consumer | **Auto mode (default):** browser provides Escape + click-outside dismiss automatically (`popover="auto"` light-dismiss). **Modal mode:** native `<dialog>` cancel handles Escape; backdrop-click-to-close is wired by the component via `pointerdown` on the internal `<dialog>`. Both modes restore focus to the previously-focused element on close. | No consumer action |
| A3  | Trigger-side `aria-expanded` automatic | Consumer wired manually | The popover writes `aria-expanded="true"` / `"false"` on the trigger element on `open` change. For 2nd-gen component triggers, the attribute is set on the inner `<button>` (same inner-button resolution the tooltip plan uses). | No consumer action when using `for=` / `trigger-element`. Consumers wiring `aria-expanded` manually on their trigger should remove the manual wiring. |
| A4  | Trigger-side `aria-controls` / `aria-controlsElements` automatic and durable | Consumer wired manually | The popover writes `aria-controls="<popover-id>"` (same-root) or `ariaControlsElements = [popoverHost]` (cross-root) on the trigger / inner button **as soon as `for=` / `trigger-element` resolves**, not on `open` change. The relationship is durable — `aria-controls` represents a persistent control relationship per the ARIA spec; visibility is communicated by `aria-expanded`. Cleared only when the popover is disconnected, `for=` is removed, or `trigger-element` is set to null. | No consumer action when using `for=` / `trigger-element`. |
| A5  | Trigger resolution and inner-button discovery | Implicit via `<sp-overlay>` traversal | `for="<id>"` resolves via `getRootNode().getElementById()` (same-root only); `trigger-element` setter accepts a JS reference (cross-root). For 2nd-gen component triggers with an open shadow root, the `resolveTrigger()` helper reaches into `host.shadowRoot.querySelector('button')` to find the AT-facing inner button. Closed-shadow triggers fall back to wiring on the host. | New API. See [Trigger resolution](#trigger-resolution). |
| A6  | Modal-mode dialog semantics (opt-in) | Consumer (`<sp-overlay type="modal">`) or call site manually wired focus and inert | When the consumer sets `modal`: internal element is `<dialog>`, opens via `showModal()`. Browser provides `role="dialog"`, focus trap, background inert, native Escape. The accessibility analysis amendment (Q4) covers this branch. | Opt-in. Consumers who want true modal popover semantics set the `modal` attribute. |
| A7  | Modal-mode `aria-haspopup="dialog"` on the trigger | Consumer wired pattern-specific `aria-haspopup` manually | When `modal` is set, the popover writes `aria-haspopup="dialog"` on the resolved trigger (or inner button) alongside `aria-controls` and `aria-expanded`. Cleared when `modal` is removed or the trigger relationship is torn down. **Auto mode (default):** the component does not set `aria-haspopup` — consumers set a pattern-specific value (`menu`, `listbox`, etc.) if their slotted content warrants it. | Modal mode: no consumer action when using `for=` / `trigger-element`. Auto mode: wire `aria-haspopup` manually when the pattern is known. |
| A8  | High-contrast border preserved | Present in 1st-gen | Preserved in 2nd-gen forced-colors handling | No consumer action |
| A9  | `dismissibleStack` registration for cross-mechanism Escape coordination | n/a | The component registers itself with the shared `dismissibleStack` on open and unregisters on close. Browser-managed Escape for `popover="auto"` and `<dialog>` already orders correctly within the same mechanism; the stack is needed when multiple mechanisms are open simultaneously (e.g., a modal `<swc-popover>` open while a tooltip is also visible — Escape should hit only the topmost). The stack is a shared 2nd-gen utility (deliverable #3 in this migration) consumed by every dismissible top-layer component. | No consumer action |

### Additive — ships when ready, zero breakage for consumers already on 2nd-gen

| #   | What is added | Notes |
| --- | ------------- | ----- |
| A1  | `VirtualTrigger` support exposed on `<swc-popover>` | `PlacementController` accepts a virtual trigger (an object with `getBoundingClientRect()` and optional `contextElement`) for point-in-page, canvas-hit-test, and selection-range anchoring. The interface ships in v1 inside the controller but no `<swc-popover>` API consumes it directly until a consumer (e.g. coachmark or a future tooltip-on-text-selection pattern) needs it. |
| A2  | `arrow` middleware integration for fancier tip placement | Initial release CSS-centers the tip on the placement edge — sufficient for `start` / `center` / `end` alignments on each side. Per-pixel tip-to-trigger alignment (Floating UI's `arrow` middleware) is additive. Required only if Figma confirms designs that need it. Defer until a real call site requests it. |
| A3  | CSS anchor positioning fallback | If `PlacementController` can detect CSS anchor positioning support and skip Floating UI when available, position recalc cost drops dramatically. Browser support is uneven as of this writing. Revisit as an additive optimization once Firefox stable lands support. No API surface impact. |
| A4  | Reflect `actualPlacement` as a host attribute | `actualPlacement` is a readonly property in v1 (B8). |
| A5  | Inner-button resolution override | Today's resolution uses `querySelector('button')`. Some 2nd-gen components may wrap a different element (`<a>`, `<input>` for combobox-adjacent patterns). A future override hook on the trigger element (e.g., a registered "focal element" property) would let those components opt in. Out of scope for v1; revisit when a consumer needs it. |
| A6  | `swc-popover` directive (Lit directive) for programmatic insertion | Mirrors the deferred tooltip directive. Creates `<swc-popover>` adjacent to a target, sets `trigger-element`, and manages lifecycle cleanup. Defer until consumer demand exists. |
| A7  | Coachmark `extends Popover` decision | 1st-gen `Coachmark extends Popover`. 2nd-gen coachmark may extend `<swc-popover>` (inheritance) or implement its own lifecycle alongside `PlacementController` (composition). Decision belongs to the coachmark migration; tracked as Q6. |

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
| `open` | `boolean` | `false` | `open` (reflect) | **Confirmed.** Reflected. In auto mode (default), setter calls `showPopover()` / `hidePopover()`. In modal mode, setter calls `showModal()` / `close()` on the internal `<dialog>` element. State sync from the native lifecycle uses a private backing field to avoid setter-listener loops (same guard the tooltip plan documents). |
| `modal` | `boolean` | `false` | `modal` (reflect) | **Confirmed.** When set, the component opts into `<dialog>.showModal()` behavior: focus trap, background inert, native `role="dialog"`, wired backdrop-click-to-close. When not set (default), the component uses `popover="auto"` for non-blocking light-dismiss behavior. See [Default lifecycle](#default-lifecycle--dialogshowpopover) and [Opt-in lifecycle](#opt-in-lifecycle--dialogshowmodal) for the two paths. |
| `placement` | `Placement` | `'bottom'` | `placement` (reflect) | **Confirmed.** "The placement of the element with respect to its anchor element." All 22 React Spectrum values supported on the customer-facing component, space-separated: `bottom`, `bottom left`, `bottom right`, `bottom start`, `bottom end`, `top`, `top left`, `top right`, `top start`, `top end`, `left`, `left top`, `left bottom`, `start`, `start top`, `start bottom`, `right`, `right top`, `right bottom`, `end`, `end top`, `end bottom`. Physical-alignment variants (`top left`, `top right`, `bottom left`, `bottom right`) are distinct from logical-alignment variants (`top start`, `top end`, etc.) — physical stays fixed regardless of direction; logical reverses in RTL. The component translates the space-separated value to Floating UI's hyphenated form internally for `PlacementController` and derives a hyphenated CSS modifier class (e.g., `bottom left` → `.swc-Popover--bottom-left`). Each downstream first-party component narrows this set per the proxy pattern — `<swc-popover>` accepts the full 22-value union; downstream components like Picker, Action Menu, etc. each re-declare `placement` with a narrower TypeScript union and runtime validation matching the placements actually supported by their pattern (e.g., a picker dropdown may only accept `bottom-*` and `top-*` variants). |
| `actualPlacement` | `Placement \| null` | `null` | — (property only) | **Confirmed.** Readonly. Updated automatically by `PlacementController` via the `onPlacementChange` callback. **Not reflected as an attribute** — internal styling uses `.swc-Popover--<placement>` modifier classes on the internal element (shadow-DOM scoped). Consumers read the property programmatically (e.g., from `swc-after-open` handlers) when they need the computed value. |
| `tip` | `boolean` | `false` | `tip` (reflect) | **Confirmed.** Renders the SVG tip element with `class="swc-Popover-tip"`. Initial release CSS-centers it on the placement edge; `arrow` middleware integration is additive (A2). |
| `offset` | `number` | `0` | `offset` | **Confirmed.** Main-axis offset in pixels from the trigger. Passed to `PlacementController`. (React Spectrum default for `Popover` is 8; we default to 0 to make the controller-host contract neutral. Each downstream first-party component sets the pattern-specific default in its own migration.) |
| `cross-offset` | `number` | `0` | `cross-offset` | **Confirmed.** Cross-axis offset in pixels. Passed to `PlacementController`. |
| `container-padding` | `number` | `8` | `container-padding` | **Confirmed.** Distance from viewport edge for `flip` and `shift` middleware. Matches 1st-gen's `REQUIRED_DISTANCE_TO_EDGE`. |
| `should-flip` | `boolean` | `true` | `should-flip` (reflect) | **Confirmed.** When `false`, disables `flip` middleware — the popover stays in the requested placement even when constrained. React Spectrum default is `true`. |
| `tip-padding` | `number` | `8` | `tip-padding` | **Inferred / additive-ready.** Maps to `PlacementController.arrowPadding` when the `arrow` middleware ships (A2). Has no effect in the initial release, where the tip is CSS-centered. Including it in v1 future-proofs the API. |
| `for` | `string` | `undefined` | `for` | **Confirmed.** ID of the trigger element in the same document tree root (`getRootNode().getElementById(this.for)`). Drives `aria-expanded` / `aria-controls` wiring on the trigger and the `PlacementController` anchor element. The browser's auto-popover-stack relationship is not declared via this attribute — see [Stacking](#stacking). |
| `trigger-element` | `HTMLElement \| VirtualTrigger \| null` | `null` | — (setter only) | **Confirmed.** Direct element reference. Overrides `for` when both set. Use for cross-shadow-root triggers or programmatic wiring. `VirtualTrigger` shape is accepted by `PlacementController` v1 but is exposed on `<swc-popover>` as additive (A1). |

#### Visual matrix (2nd-gen)

Based on Figma `S2 / Web (Desktop scale)` Popover frame and `spectrum-css` `spectrum-two` `components/popover/index.css`:

| Visual variant | Tip | No tip | Forced-colors |
| -------------- | --- | ------ | ------------- |
| Default surface | Yes | Yes | Yes (border becomes `CanvasText`) |
| Dialog padding via `<swc-dialog>` adoption | Yes | Yes | Yes |

Placement options follow React Spectrum's API (22 total values, space-separated):

| Group | Values | Notes |
| ----- | ------ | ----- |
| Bottom side | `bottom`, `bottom left`, `bottom right`, `bottom start`, `bottom end` | Tip points up. `left`/`right` are physical alignment (RTL-fixed); `start`/`end` are logical (RTL-aware). `bottom` is the default. |
| Top side | `top`, `top left`, `top right`, `top start`, `top end` | Tip points down. Same physical-vs-logical split. |
| Left side | `left`, `left top`, `left bottom` | Physical (RTL-fixed); tip points right. No `left start`/`left end` — sub-alignment is always physical for the physical `left` side. |
| Right side | `right`, `right top`, `right bottom` | Physical (RTL-fixed); tip points left. Same as `left`. |
| Start side (logical) | `start`, `start top`, `start bottom` | RTL-aware: `start` = `left` in LTR, `right` in RTL. Tip points outward. |
| End side (logical) | `end`, `end top`, `end bottom` | RTL-aware: `end` = `right` in LTR, `left` in RTL. Tip points outward. |

#### Slots (2nd-gen)

| Slot | Content | Notes |
| ---- | ------- | ----- |
| default | Popover content | **Confirmed.** Free-form. No named slots — consumers slot whatever pattern they're building (menu, listbox, custom dialog body, plain text). |

### Events (2nd-gen)

Four events form the lifecycle contract regardless of mode. All bubble (`bubbles: true`) and cross shadow boundaries (`composed: true`). Events are informational — `preventDefault()` does not cancel the underlying lifecycle. (Cancellable open/close is out of scope for `<swc-popover>`; that pattern belongs to `<swc-dialog>`.)

| Event | Dispatched when (auto mode) | Dispatched when (modal mode) | Detail |
| ----- | --------------------------- | ---------------------------- | ------ |
| `swc-open` | On `beforetoggle` event with `newState === 'open'` | Synchronously after `showModal()` resolves on `open = true` (native `<dialog>` has no open event) | none |
| `swc-after-open` | On `transitionend` after open transition completes | Same | none |
| `swc-close` | On `beforetoggle` with `newState === 'closed'` — covers Escape, click-outside (light-dismiss), and programmatic close | On `<dialog>` `cancel` (Escape) or `close` (programmatic / wired backdrop-click) — de-duplicated so one event per close cycle | `{ source: 'escape' \| 'outside' \| 'programmatic' }` — `'outside'` covers both auto-mode light-dismiss click-outside and modal-mode wired backdrop-click. |
| `swc-after-close` | On `transitionend` after close transition completes | Same | none |

**Mode-specific asymmetries:**

- **`swc-open` in modal mode** is dispatched from the property setter (after `showModal()` returns) because `<dialog>` has no native open event. In auto mode it's dispatched from the `beforetoggle` listener like the other three.
- **`swc-close.detail.source` in auto mode** is read from the `beforetoggle` event itself if the browser exposes a meaningful cause; otherwise inferred from context (programmatic close vs. light-dismiss). In modal mode, `'escape'` comes from `cancel`, `'outside'` from the wired backdrop-click handler, `'programmatic'` from the setter path.

The 0-duration transition guard (when `prefers-reduced-motion: reduce` or test environments disable transitions) applies to both modes: if `transitionDuration === '0s'`, after-events fire from the same tick as the open/close.

The `open` setter and the native lifecycle listeners use a private backing field (`this._open`) to avoid setter-listener loops, identical to the tooltip plan's guard.

#### CSS custom properties (2nd-gen)

No `--mod-*` properties will be exposed. New `--swc-*` component-level properties may be introduced where needed — these are additive and not breaking. See [Component Custom Property Exposure](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/02_custom-properties.md#component-custom-property-exposure).

Each exposed `--swc-*` property must be documented with a `@cssprop` JSDoc tag on the primary SWC component class.

Initial expectation for Popover: a small reviewed set covering the values consumers most commonly override — minimum / maximum size, padding when used as a dialog surface, and the tip dimensions. Specific names to be confirmed during the styling phase.

**Behavioral semantics.** `<swc-popover>` supports two lifecycle branches. The default is `popover="auto"`; the `modal` attribute opts in to `<dialog>.showModal()`. Both ship in v1.

### Default lifecycle — `dialog.showPopover()`

When `modal` is not set, the component opens the internal `<dialog popover="auto">` via `showPopover()`, which uses the popover-API lifecycle:

1. The `<swc-popover>` host element renders, in its shadow root, an internal `<dialog class="swc-Popover" popover="auto">` that wraps a `.swc-Popover-content` element around the slot. The host element itself stays in the light DOM; only the internal `<dialog>` enters the top layer when opened. The same internal `<dialog>` is used in both modes — only the open method differs.
2. On `open = true`: the component calls `internalDialog.showPopover()`. Browser places the dialog in the top layer (via the popover-API path), assigns it to the auto-popover-stack, and arms light-dismiss (Escape, click outside).
3. On `open = false`: the component calls `internalDialog.hidePopover()`. Browser fires `beforetoggle` then `toggle`.
4. The `beforetoggle` listener fires `swc-open` (on open) or `swc-close` (on close). The `transitionend` listener handles `swc-after-open` / `swc-after-close`.
5. Light-dismiss (Escape, click outside) is browser-handled. The component does not attach its own keydown or click-outside listener in this mode.
6. Initial focus: `popover="auto"` does not move focus by default. First-party components handle pattern-specific focus targets themselves (e.g., Picker focuses the selected menu item after open). The popover host does not prescribe.
7. The browser's auto-popover-stack handles sibling-dismissal between auto popovers (see [Stacking](#stacking)).
8. The component registers with `dismissibleStack` on open and unregisters on close, even though it doesn't attach its own Escape handler. This tells other dismissibles (e.g., a modal dialog opened above) that the popover is currently the top — they defer to it when checking `isTopDismissible(this)`.

**Note on `<dialog>` state in this mode:** when opened via `showPopover()`, the dialog's `.open` IDL property remains `false` (dialog-mode openness is separate from popover-mode openness). The component tracks state via its own `_open` backing field or by querying `dialog.matches(':popover-open')`. CSS targeting popover-open state uses `:popover-open`; CSS targeting dialog-open state (`<dialog>[open]`) does NOT apply in this path.

### Opt-in lifecycle — `dialog.showModal()`

When `modal` is set, the same internal `<dialog>` opens via `showModal()` instead of `showPopover()`. The `popover` attribute on the dialog is irrelevant in this path; the browser uses dialog-modal semantics determined by the open method:

1. Same render as default mode: the `<swc-popover>` host renders an internal `<dialog class="swc-Popover" popover="auto">` in its shadow root. The `popover` attribute remains on the dialog but is ignored by `showModal()` — only the open method matters in modal mode.
2. On `open = true`: the component calls `internalDialog.showModal()`. Browser provides `role="dialog"`, focus trap, background inert, top-layer rendering, and Escape (via `cancel` event). `swc-open` dispatches synchronously from the setter (no native open event for `<dialog>` modal-mode).
3. On `open = false`: the component calls `internalDialog.close()`. Browser fires `close`. The component dispatches `swc-close` and `swc-after-close` (after `transitionend`).
4. `cancel` event (Escape) is intercepted, allowed to proceed, and routed through the same close path. The listener de-duplicates against the immediately-following `close` event so `swc-close` fires once.
5. Backdrop-click dismissal is wired by the component: a `pointerdown` listener on `<dialog>` detects clicks on the dialog itself (vs. descendants) and calls `close()`. The `.swc-Popover-content` inner wrapper is required here so that clicks on the popover's padding region land on the wrapper (not on the dialog), preventing accidental dismissal. `showModal()` does not light-dismiss natively, so we wire this.
6. Initial focus: `<dialog>` auto-focuses the first focusable descendant or any `autofocus` element. First-party components in modal mode override for pattern-specific focus.
7. Stacking: modal `<dialog>`s use their own top-layer stack, independent of the popover auto-stack. Cross-mechanism Escape ordering is handled via `dismissibleStack`.
8. The component registers with `dismissibleStack` on open and unregisters on close — same registration code as default mode.
9. Scroll lock: while modal-open, CSS rules apply `overflow: hidden` to `html` (preventing page scroll) and `overscroll-behavior: contain` on the popover surface (preventing scroll chaining out of internal scroll regions). Safari's known `overscroll-behavior` quirk is handled via CSS-only adjustments. No iOS-specific JavaScript workarounds. Default mode does NOT lock scroll.

**Note on `<dialog>` state in this mode:** when opened via `showModal()`, the dialog's `.open` IDL property is `true` and `:modal` pseudo-class applies. The `:popover-open` pseudo-class does NOT apply.

The component's lifecycle code branches on `this.modal` at exactly two points: (a) which open method to call (`showPopover()` vs `showModal()`), and (b) which native event listeners drive `swc-*` dispatch (`beforetoggle`/`toggle` for default; `cancel`/`close` for modal). The render shape, the `dismissibleStack` registration, the ARIA wiring, and the `PlacementController` integration are unified across branches.

### Stacking

Stacking is browser-managed within each mode. We do not declare popover parent-child relationships via the `anchor` attribute (browser support is too uneven for v1) or via `popovertarget` (kept off the API per the "just `for=`/`id`" rule).

**Auto mode (default) — browser-managed auto-popover-stack:**

- The internal `<dialog popover="auto">` participates in the browser's auto-popover-stack (via the `popover="auto"` attribute; the open method `showPopover()` is what activates this lifecycle).
- Opening one auto popover dismisses any other open auto popover. "One popover at a time" UX, conventional and matches 1st-gen's typical behavior between sibling popovers.
- No nesting awareness in v1: a child popover opening will dismiss its parent. Nested-popover patterns (submenu inside menu, tooltip on menu item) need component-specific handling (e.g., `popover="manual"` for the child) — decided by each consuming migration.

**Modal mode (`modal` attribute) — `<dialog>` top-layer stack:**

- `<dialog>.showModal()` uses its own top-layer stack, independent of auto popovers.
- Multiple modal popovers stack LIFO; the user closes them in reverse order.
- Modal mode does not participate in the auto-popover stack — opening or closing a modal popover does not affect open auto popovers (though Escape ordering across the two needs the dismissible stack, see below).

**Cross-mechanism Escape ordering — `dismissibleStack` module:**

When multiple dismissibles are open simultaneously (e.g., an auto popover open AND a modal popover open AND a tooltip visible), Escape needs to dismiss only the topmost one. Native `popover="auto"` and `<dialog>` each order Escape correctly within their own mechanism, but they don't coordinate across mechanisms. The `dismissibleStack` module (deliverable #3) handles that:

```ts
// On open:
registerDismissible(this);

// On close (or disconnectedCallback if forcibly removed):
unregisterDismissible(this);

// In any custom Escape handler the component wires:
if (event.key === 'Escape' && isTopDismissible(this)) {
  // process Escape; stop propagation
}
```

For `<swc-popover>` specifically, both modes register / unregister on open / close. Custom Escape handling (beyond the browser's built-in) is rare for popover — but registering with the stack means OTHER dismissibles can correctly defer to popover when popover is the topmost dismissible. This is the cross-mechanism benefit.

**Known regression vs 1st-gen `OverlayStack`:**

- In auto mode, the auto-popover-stack dismisses siblings even when they're conceptually parent-child. The clearest example: hovering a background button that has a tooltip (also `popover="auto"`) will close an open picker / menu / action-menu. Tooltip's choice of `popover="auto"` vs `popover="manual"` (its own migration plan's call) determines whether this regression bites. Coordination item with React Spectrum / Design teams.
- No native nesting support in v1; nested-popover use cases (submenu, contextual help inside a menu, etc.) are handled by the consuming migration, typically via `popover="manual"` + manual dismissal coordination through the dismissible stack.

### Differences from 1st-gen popovers

The shift from "styles-only host + `<sp-overlay>` orchestration" to "self-contained popover host" preserves most of the 1st-gen UX in the default (auto) mode. Modal mode is an explicit opt-in for the few cases that want true blocking semantics.

**Default mode (`popover="auto"`) — what changes:**

| Behavior | 1st-gen `<sp-popover>` (typical via `<sp-overlay>`) | 2nd-gen `<swc-popover>` default |
| -------- | --------------------------------------------------- | -------------------------------- |
| **Page behind interactivity** | Remained interactive | **Still interactive.** Auto popovers don't inert anything. |
| **Page background scroll** | Allowed | **Still allowed.** Auto popovers don't lock scroll. |
| **Click outside the popover** | Closed the popover (1st-gen `OverlayStack` light-dismiss) | **Closes the popover** (native popover-auto light-dismiss). UX preserved. |
| **Escape to close** | Required wiring | **Native** (popover-auto). |
| **Focus trap** | Not applied (1st-gen popovers were non-modal) | **Not applied.** Focus is consumer/pattern-managed. |
| **Stacking sibling popovers** | `OverlayStack` typically dismissed the prior popover | **Browser dismisses prior auto popover.** Same UX. |
| **Stacking nested popovers** | `OverlayStack` kept parent open | **No native nesting support in v1.** A child popover (`popover="auto"`) opening dismisses its parent. Nested-popover patterns (submenu, etc.) handled per-component-migration via `popover="manual"`. Regression vs 1st-gen; documented in [Stacking](#stacking). |
| **Default placement** | `undefined` — no class applied | `'bottom'` (B3). The host always has a placement class. |
| **`role="dialog"` on the surface** | Not set; consumers added `role="presentation"` to strip semantics | **Not set.** `popover="auto"` has no inherent role; consumers slot whatever pattern they're building. |

For the default mode, the only consumer-visible API change is "use `for=` on the popover instead of authoring it inside `<sp-overlay>`." The dismissal UX is preserved, the page behavior is preserved, and sibling-popover dismissal is preserved (browser-managed instead of `OverlayStack`-managed). The one real regression is nested-popover support — see [Stacking](#stacking).

**Modal mode (`modal` attribute) — additional changes vs 1st-gen:**

| Behavior | 1st-gen | 2nd-gen `<swc-popover modal>` |
| -------- | ------- | ------------------------------ |
| **Page behind interactivity** | Remained interactive | **Blocked.** Native `<dialog>` inerts the rest of the page. |
| **Page background scroll** | Allowed | **Blocked.** `<dialog>.showModal()` prevents scroll behind (with iOS caveats — Q7). |
| **Focus trap** | Not applied | **Automatic.** `<dialog>` traps focus inside. |
| **Tab away to other page content** | Permitted | **Blocked while open.** |
| **Click outside the popover** | Closed (1st-gen light-dismiss) | **Closes** via wired backdrop-click listener (component-implemented; see [Opt-in lifecycle — `dialog.showModal()`](#opt-in-lifecycle--dialogshowmodal)). |
| **Backdrop visual** | None | **Native `::backdrop`** pseudo-element renders behind the dialog. Spectrum 2 chrome TBD per Figma. |
| **Stacking with other popovers** | `OverlayStack` managed | **Separate top-layer stack** from auto popovers. Multiple modal popovers stack LIFO. |
| **Initial focus** | Configured via `<sp-overlay receivesFocus>` | **Native `<dialog>` autofocus rules.** First focusable descendant or `autofocus` element. |
| **`role="dialog"` on the surface** | Not set | **Set automatically** by the native `<dialog>` element. |

**Most significant practical consequences:**

- For the default mode: very little practical change for consumers — `for=` replaces `<sp-overlay>` wrapping, but UX (page behind, dismissal, stacking) is preserved.
- For the modal mode: the page-behind and focus-trap changes are intentional and what the consumer opts into when setting `modal`.

This list belongs in the [Consumer migration guide (SWC-2003)](https://jira.corp.adobe.com/browse/SWC-2003) and in the Behaviors stories. Document the two modes as separate UX patterns; default-mode migration should be near-zero-friction while modal-mode adoption is a deliberate choice.

### Trigger resolution

Trigger resolution has two paths, mirroring the [Tooltip migration plan](../tooltip/migration-plan.md):

1. **`for="<id>"`** — declarative. The component calls `this.getRootNode().getElementById(this.for)`. Strictly same-root. The element bearing the ID must live in the same tree as the popover.
2. **`trigger-element` setter** — imperative. The component accepts a direct element reference (or `VirtualTrigger`). Bypasses ID resolution entirely. Used for cross-shadow-root cases, programmatic insertion, and `VirtualTrigger` anchoring.

After the trigger is resolved, `resolveTrigger()` performs **inner-button discovery**: if the resolved element has an open shadow root, the helper runs `host.shadowRoot.querySelector('button')` to find the AT-facing inner button. If found, ARIA attributes are wired on the inner button. If not (closed shadow root, native element, or no inner button), ARIA is wired on the trigger host directly.

Four scenarios cover the resolution shape: (1) same-root by ID — popover and trigger in the same tree; (2) customer's shadow root containing both — same-root pattern in the customer's render; (3) cross-root — trigger is a 2nd-gen component with an open shadow root, inner-button discovery applies; (4) cross-root via the `trigger-element` setter — programmatic insertion or closed-shadow fallback. ID resolution is always strictly same-root; cross-root cases always go through the `trigger-element` setter.

### Trigger-side ARIA wiring

On the resolved trigger (or its inner button), the component wires:

| Attribute | Modes | When set | Cleared when |
| --------- | ----- | -------- | ------------ |
| `aria-controls` / `ariaControlsElements` | Both | On trigger resolve (durable) | Disconnect, `for` removed, or `trigger-element` cleared |
| `aria-expanded` | Both | `"false"` on resolve; toggles on `open` | Same as above |
| `aria-haspopup="dialog"` | Modal only (`modal` attribute set) | On trigger resolve while `modal` is true | `modal` removed, or trigger relationship torn down |

**`aria-controls` / `ariaControlsElements`** — set as soon as `for=` / `trigger-element` resolves, not on `open` change. Same-root uses `aria-controls="<popover-id>"`; cross-root uses `ariaControlsElements = [popoverHost]`. Same Baseline Apr-2025 ARIA-IDL surface validated by the tooltip migration plan.

**`aria-expanded`** — always present once a trigger is resolved (`"false"` when closed, `"true"` when open). Visibility state; the control relationship stays via `aria-controls`.

**`aria-haspopup="dialog"`** — only when `modal` is set, matching the native `role="dialog"` surface opened via `showModal()`. Auto mode does not set `aria-haspopup`; other components who know their pattern (e.g. menu, listbox) set it themselves (this may change in case we end up deciding menus and pickers need to be blocking too, then this needs to be configurable!). 
This differs from the tooltip plan's `ariaDescribedByElements` wiring, which is open-only. Popover trigger relationships are durable across open/close cycles.

### Event lifecycle

**Default (auto) mode — native popover-API events:**

| Native event | Condition | SWC event dispatched |
| ------------ | --------- | -------------------- |
| `beforetoggle` | `newState === 'open'` | `swc-open` |
| `beforetoggle` | `newState === 'closed'` | `swc-close` (with `detail.source` inferred from cause: `'escape'`, `'outside'`, or `'programmatic'`) |
| `transitionend` after open | open transition complete | `swc-after-open` |
| `transitionend` after close | close transition complete | `swc-after-close` |

In auto mode, every event is observed from a native listener; the setter doesn't need to dispatch anything itself. The `open` setter and listeners use a private backing field to avoid setter-listener loops.

**Modal mode — `<dialog>` events:**

| Native event | Condition | SWC event dispatched |
| ------------ | --------- | -------------------- |
| Programmatic `open = true` → `showModal()` returns | dialog has just opened | `swc-open` (dispatched synchronously from setter; `<dialog>` has no native open event) |
| `<dialog>` `cancel` (Escape pressed) | dialog is open | `swc-close` (`detail.source: 'escape'`) — default close behavior is allowed to proceed |
| `<dialog>` `close` | dialog has just closed | `swc-close` (de-duplicated against `cancel` to avoid double-dispatch; source inferred from cause) |
| `pointerdown` on dialog with `event.target === dialog` | backdrop clicked | triggers `close()`, which routes through the `close` event with `detail.source: 'outside'` |
| `transitionend` after open | open transition complete | `swc-after-open` |
| `transitionend` after close | close transition complete | `swc-after-close` |

In modal mode, `swc-open` is dispatched from the setter (no native open event for `<dialog>`); all others come from native listeners.

**Cross-mode invariants:**

- `swc-close.detail.source` always carries `'escape'`, `'outside'`, or `'programmatic'`.
- The 0-duration transition guard (`getComputedStyle(internalElement).transitionDuration === '0s'`) applies in both modes; after-events fire from the same tick as the open/close path when transitions are disabled.

### Invocation pattern

Consumers open and close the popover via the `open` property (programmatically or via Lit binding) or by listening for trigger events themselves. The component's API does not include or recommend `popovertarget` on the trigger — the "just `for=`/`id`" rule keeps the consumer-facing surface minimal. If a consumer attaches `popovertarget` themselves on their trigger button in auto mode, the browser's native invocation still works and our `beforetoggle` listener picks up the state change; we don't actively support or document that path, but we don't break it either. In modal mode, `popovertarget` is silently ignored by the browser (`<dialog>.showModal()` doesn't respond to it) so there's nothing to break.

### Computed placement and tip orientation

`PlacementController` computes the actual placement after `flip` middleware reorients and writes it back via `onPlacementChange`. The component does two things with that value:

1. **Internal styling** — sets a `.swc-Popover--<computed>` modifier class on the internal element. Component CSS targets that class (e.g., `.swc-Popover--top .swc-Popover-tip { ... }`) to flip the tip direction. The styling stays inside the shadow DOM; no public attribute on the host is involved.
2. **Programmatic read** — updates the readonly `actualPlacement` property on the host. Consumers querying the property (e.g., from a `swc-after-open` event handler) get the computed placement. **Not reflected as an attribute** — there's no `actual-placement` attribute on the host.

This keeps the host's public attribute surface minimal: only the `placement` attribute (the consumer's request) is on the host. The computed placement is observable via the property when needed.

### Accessibility semantics notes (2nd-gen)

- **Modal mode only — native dialog semantics:** When the consumer sets `modal`, the internal `<dialog>` opened via `showModal()` provides `role="dialog"` automatically. Default (auto) mode has no inherent role — consumer slot content owns semantics. If a consumer wants `role="alertdialog"` semantics on a popover surface, that belongs in a separate `<swc-alert-dialog>` component, not as a popover variant.
- **The original [accessibility-migration-analysis.md](./accessibility-migration-analysis.md) needs an amendment (Q4):** that analysis was written assuming a role-free host. The default (auto) mode is consistent with that assumption — `popover="auto"` has no inherent role, consumer-managed semantics. Modal mode adds the `<dialog>` `role="dialog"` semantics, focus trap, and inert behavior; the amendment must document this branch separately.
- **Modal-mode focus trap:** In modal mode, whatever interactive elements are inside the popover are the user's only navigation surface until close. Consumers must ensure something focusable exists (or use `autofocus`). Auto mode does not trap focus.
- **Accessible name (modal mode):** When `modal` is set, consumers should provide a name via `aria-labelledby` referencing labelled content inside the popover (e.g., a heading), or `aria-label` on the host. Without one, AT will announce a nameless dialog — an authoring bug in modal mode.
- **`<dialog>.showModal()` on iOS Safari** is the known performance concern from the [Overlay strategy RFC](#references). Q3 in [Blockers](#architecture-and-behavior) tracks the benchmark step that must complete before downstream Picker / Action Menu migrations adopt the same lifecycle pattern in product code.
- **Inner-button ARIA wiring** is validated in the tooltip plan's POC. Same Baseline Apr-2025 ARIA-IDL surface (Chrome 135+, Firefox 136+, Safari 16.4+), same NVDA and VoiceOver validation. See the [tooltip migration plan — ARIA relationship wiring](../tooltip/migration-plan.md#aria-relationship-wiring).

---

## Architecture: core vs SWC split

> The 1st-gen component is a **reference only** — 2nd-gen is built independently. Neither generation imports from the other.

Follow the [Badge migration reference](../../02_workstreams/02_2nd-gen-component-migration/02_step-by-step/01_washing-machine-workflow.md#reference-badge-migration) as the concrete pattern for the core / SWC split.

| Layer | Path | Contains |
| ----- | ---- | -------- |
| **Core** | `2nd-gen/packages/core/components/popover/` | `Popover.base.ts` (abstract; declares `open`, `placement`, `tip`, `offset`, `cross-offset`, `container-padding`, `should-flip`, `tip-padding`, `for`, `triggerElement` properties with full Placement type union; runtime validation of `placement` per the proxy pattern; no rendering); `Popover.types.ts` (`Placement` union, `ALL_PLACEMENTS` array, `POPOVER_VALID_PLACEMENTS` array, exported constants); `index.ts`. |
| **Core (controller)** | `2nd-gen/packages/core/controllers/placement-controller/` | `PlacementController.ts` (Floating UI wrapper, decoupled from Gen1 Overlay); `types.ts` (`Placement`, `PlacementOptions`, `VirtualTrigger`, `PlacementHostConfig`); `index.ts`; tests. **New artifact delivered by this migration.** |
| **Core (utils)** | `2nd-gen/packages/core/utils/` | `resolve-trigger.ts` (pure helper, ~25 lines): resolves `for=` via `getRootNode().getElementById()`, falls back to `trigger-element` override, performs inner-button discovery (`shadowRoot.querySelector('button')`) for SWC-component triggers. Returns `{ trigger, interactiveElement }`. **New artifact delivered by this migration.** Tooltip refactors to use it in a follow-up. `dismissible-stack.ts` (module-level state + 3 exported functions, ~20 lines): `registerDismissible(key)` / `unregisterDismissible(key)` / `isTopDismissible(key)`. LIFO stack of currently-open dismissibles for cross-mechanism Escape coordination. **New artifact delivered by this migration.** Adopted by every subsequent dismissible top-layer component (tooltip, dialog, picker, menu, action-menu, contextual-help, coachmark, combobox). |
| **SWC** | `2nd-gen/packages/swc/components/popover/` | `Popover.ts` (concrete subclass; the component's own dialog lifecycle, event dispatch, and inline ARIA wiring all live here — no shared mixin); `swc-popover.ts` (element registration); `popover.css` (authored with `.swc-Popover` BEM-ish class selectors, `@global-exclude` regions for shadow-only rules); `stories/`; `test/`; `migration-guide.mdx`; `index.ts`. |

Planned rendering shape:

- Core declares the property surface and the abstract API contract. The concrete SWC class implements both lifecycles inline (default-mode `showPopover()` / `hidePopover()` + `beforetoggle`/`toggle` listeners; modal-mode `showModal()` / `close()` + `cancel`/`close` listeners; `transitionend` listeners + `swc-*` event dispatch + setter-listener loop guard, both modes).
- SWC renders a single internal `<dialog class="swc-Popover" popover="auto">` wrapping `<div class="swc-Popover-content"><slot></slot></div>` and, when `tip` is set, a `<span class="swc-Popover-tip"></span>` element. Placement-modifier classes (`.swc-Popover--<placement>` (where `<placement>` is the computed placement value, e.g. `top`, `bottom-start`)) are applied reactively. The inner `.swc-Popover-content` wrapper is required for modal mode so that the dialog's padding does not interfere with backdrop-click detection (clicks on a dialog's padding region resolve to the dialog element itself, which would incorrectly dismiss). The wrapper is harmless in default mode.
- SWC's `popover.css` is authored on the internal element and consumed by the component as a constructed stylesheet. No `global-popover.css` is emitted in v1; the `vite-global-elements-css` plugin is not invoked for popover. Internal style sharing across first-party consumers (Q10) is deferred to the second-consumer migration.

### Host element type and internal rendering

`<swc-popover>` itself is a `SpectrumElement` (Lit custom element). It cannot extend `HTMLDialogElement` directly — autonomous custom elements can't extend specific HTML interfaces, and `<dialog is="swc-popover">` (customized built-in element) isn't fully supported across browsers, notably Safari. The internal element is therefore always rendered inside the shadow root.

**The component renders a single internal element type in both modes:**

```html
<dialog class="swc-Popover ..." popover="auto">
  <div class="swc-Popover-content"><slot></slot></div>
  <!-- optional <span class="swc-Popover-tip"></span> -->
</dialog>
```

The `popover="auto"` attribute is always set; it's used by `showPopover()` in default mode and ignored by `showModal()` in modal mode. This lets us keep a single render shape regardless of the `modal` attribute. The only behavior difference per mode is **which open method runs** (and which corresponding native events fire):

| | Default mode | Modal mode (`modal` attribute set) |
|---|---|---|
| Open method | `dialog.showPopover()` | `dialog.showModal()` |
| Close method | `dialog.hidePopover()` | `dialog.close()` |
| Native open events | `beforetoggle` (`newState === 'open'`) | none — `<dialog>` modal-mode has no open event |
| Native close events | `beforetoggle` (`newState === 'closed'`), `toggle` | `cancel`, `close` |
| State pseudo-class | `:popover-open` on the dialog | `:modal` and `[open]` on the dialog |
| `dialog.open` property | `false` (dialog-mode openness is separate) | `true` |

The `.swc-Popover-content` wrapper is required in modal mode (the `<dialog>` hit-test region for backdrop-click detection includes its padding box; clicks on the padding would otherwise dismiss the popover when we wire backdrop-click-to-close). It's harmless in default mode — light-dismiss is browser-handled there and doesn't depend on hit-test geometry — so we keep the same render in both modes.

CSS targets the internal `.swc-Popover` element regardless of mode. `popover.css` is authored on that class; the component imports it as a constructed stylesheet. No public global CSS file is emitted in this migration — that's reserved as a possible additive if external authors need the `.swc-Popover` class outside the component.

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
- [ ] Create `2nd-gen/packages/core/utils/dismissible-stack.ts` and wire from `utils/index.ts`
- [ ] Create `2nd-gen/packages/swc/components/popover/`
- [ ] Wire exports in all `package.json` files (core controllers / utils entry; swc component entry). No `swc/stylesheets/global` entry — no public global CSS is shipped in this migration.
- [ ] Confirm `spectrum-css` is checked out at `spectrum-two` branch as a sibling directory (path `../../../../../spectrum-css/`)
- [ ] Confirm `@floating-ui/dom` is available in `2nd-gen/packages/core/`'s dependencies (carry over from 1st-gen)

### API

#### `PlacementController`

- [ ] `PlacementController.types.ts`: define `Placement` union covering all 22 React Spectrum values (5 bottom variants, 5 top variants, 3 left, 3 right, 3 start, 3 end — space-separated string-literal type); `ALL_PLACEMENTS` array of the same; `PlacementOptions` interface (accepts the public space-separated form and internally translates to Floating UI's hyphenated form); `VirtualTrigger` interface; `PlacementHostConfig` interface
- [ ] `PlacementController.ts`: implement constructor `(host, config)`; methods `start()`, `stop()`, `recompute()`; properties `actualPlacement`, `isConstrained`; ReactiveController lifecycle (`hostConnected`, `hostUpdated`, `hostDisconnected`)
- [ ] Floating UI middleware composition: `offset`, `flip` (gated on `shouldFlip`), `shift`, `size`, `arrow` (gated on `tipElement` resolver returning non-null)
- [ ] `autoUpdate` wiring split: ancestor-resize-channel calls `onPlacementChange`; scroll/element-resize channel calls `recompute`
- [ ] WebKit visual-viewport compensation (carry over from 1st-gen)
- [ ] DPR rounding of computed `(x, y)` (carry over from 1st-gen)
- [ ] Rapid-open guard (calling `start()` twice tears down the prior session first)
- [ ] No `<sp-update-overlays>` document event listener — 2nd-gen does not have a global update bus; the host calls `recompute()` when it needs to

#### `resolveTrigger()` helper

- [ ] `resolve-trigger.ts`: pure function `resolveTrigger(host, { for, triggerElement })` returns `{ trigger, interactiveElement }`. Resolves `for=` via `host.getRootNode().getElementById()`; falls back to the `trigger-element` override; performs inner-button discovery via `trigger.shadowRoot?.querySelector('button')` for open-shadow trigger hosts; returns `trigger` itself as `interactiveElement` for closed-shadow or native triggers.
- [ ] Unit-test all four resolution scenarios: (1) same-root by ID; (2) customer's shadow root containing both; (3) cross-root with inner-button discovery (open shadow on the trigger host); (4) cross-root via `trigger-element` setter, plus closed-shadow fallback to the host.

#### `dismissibleStack` module

- [ ] `dismissible-stack.ts`: exports three functions over a module-level `const dismissibleStack: object[] = []` — `registerDismissible(key)` pushes the key onto the stack, `unregisterDismissible(key)` removes the most-recent entry matching the key, `isTopDismissible(key)` returns whether the key is the topmost entry.
- [ ] No persistence beyond module-level state — the stack is in-memory only and resets on page reload. That's correct for the dismissible coordination use case.
- [ ] Unit-test register / unregister ordering, `isTopDismissible` correctness, idempotent unregister, and behavior with multiple keys of different types.
- [ ] Document the API and the consumer pattern in JSDoc on each exported function; include the "register on open, unregister on close (and `disconnectedCallback`), check `isTopDismissible` before processing custom Escape" usage convention.

#### Popover component

- [ ] `Popover.types.ts`: re-export `Placement` from the placement-controller types; define `POPOVER_VALID_PLACEMENTS` (all 22 React Spectrum values)
- [ ] `Popover.base.ts`: declares all properties (`open`, `modal`, `placement`, `actualPlacement`, `tip`, `offset`, `cross-offset`, `container-padding`, `should-flip`, `tip-padding`, `for`, `triggerElement`) on `SpectrumElement`; runtime validation of `placement` against `POPOVER_VALID_PLACEMENTS` (warns in dev mode, falls through to controller)
- [ ] `Popover.ts` (SWC): single render shape in both modes — `<dialog class="swc-Popover" popover="auto">` wrapping `<div class="swc-Popover-content"><slot></slot></div>`; conditional `<span class="swc-Popover-tip">` when `tip` is set; reactive class binding for `.swc-Popover--<placement>` (where `<placement>` is the computed placement value, e.g. `top`, `bottom-start`) modifiers; element registration. No `anchor` or `popovertarget` attribute is set on the internal element. Only the open method differs per mode.
- [ ] **Default-mode lifecycle** inline on the component: on `open = true` → `internalDialog.showPopover()`. On `open = false` → `internalDialog.hidePopover()`. Native `beforetoggle` listener dispatches `swc-open` / `swc-close` with the appropriate `source` detail; `transitionend` drives `swc-after-open` / `swc-after-close`. State queried via `dialog.matches(':popover-open')` or the component's own `_open` backing field; `dialog.open` IDL property is `false` in this mode.
- [ ] **Modal-mode lifecycle** inline on the component: on `open = true` → `internalDialog.showModal()` + dispatch `swc-open` synchronously (no native open event for `<dialog>` modal-mode). On `open = false` → `internalDialog.close()`. Native `cancel` / `close` / `transitionend` listeners drive `swc-close` / `swc-after-open` / `swc-after-close`. Listener de-duplicates `cancel` vs `close` so `swc-close` fires once per close cycle. State queried via `dialog.open === true` or `:modal` pseudo-class.
- [ ] **Modal-mode backdrop-click-to-close** wired via `pointerdown` listener on the internal `<dialog>` checking `event.target === dialog`. Routes through `close()`; `swc-close.detail.source === 'outside'`.
- [ ] Setter-listener loop guard via private `_open` backing field — applies in both modes
- [ ] 0-duration transition guard for `swc-after-*` — applies in both modes
- [ ] In `updated()`: call `resolveTrigger()` whenever `for`, `triggerElement`, or `modal` changes (Lit reactivity), update the durable `aria-controls` / `ariaControlsElements` wiring on the resolved interactive element, set `aria-haspopup="dialog"` when `modal` is true, and set initial `aria-expanded="false"`. Clean up on disconnect / trigger removal.
- [ ] On `open` change: toggle `aria-expanded` value on the resolved interactive element — applies in both modes
- [ ] Register with `dismissibleStack` on open (`registerDismissible(this)`); unregister on close and in `disconnectedCallback` (`unregisterDismissible(this)`). Applies in both modes.
- [ ] `PlacementController` instantiated lazily — only when `for=` or `trigger-element` resolves to a non-null trigger — applies in both modes
- [ ] Trigger-disconnect graceful degradation: `PlacementController.autoUpdate` checks `trigger.isConnected` per tick and bails out (notifying host) when disconnected. At close time, if cached trigger is disconnected, log a dev warning. Re-resolve via `for=` on close to handle the React-rerender pattern (cached node stale; same ID now points to a fresh node).
- [ ] `actualPlacement` readonly property updated via the controller's `onPlacementChange` callback; the corresponding `.swc-Popover--<placement>` modifier class is set on the internal element. No `actual-placement` host attribute is reflected.
- [ ] Backdrop-click-to-close (resolved during planning as option b): `pointerdown` listener on the internal `<dialog>` checks `event.target === dialog` and calls `internalDialog.close()`. `swc-close` event detail reports `source: 'outside'` (vs `'escape'` from `cancel`, `'programmatic'` from the `open` setter).

#### Alignment checks

- [ ] Figma `S2 / Web (Desktop scale)` Popover frame confirms the full placement matrix
- [ ] React Spectrum `Popover` props mapped: `placement`, `offset`, `crossOffset`, `containerPadding`, `shouldFlip` → our equivalents (kebab-case) ✓; `isNonModal` → inverted: our default is non-modal (auto), `modal` attribute opts in; `arrowSize` / `arrowBoundaryOffset` → covered by `tip-padding` (additive)
- [ ] Tip rendering verified against Figma — does it match the 1st-gen SVG dimensions, or does Spectrum 2 use a different tip geometry?

### Styling

> Follow the [CSS style guide](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/) as the source of truth for all styling work. Key references: [migration steps](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/04_spectrum-swc-migration.md), [custom properties](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/02_custom-properties.md), [anti-patterns](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/05_anti-patterns.md).

- [ ] Render shape: `<dialog class="swc-Popover"><div class="swc-Popover-content"><slot></slot></div>...</dialog>`. Padding lives on `.swc-Popover-content`, not on `.swc-Popover`; keep styling off `:host` except for structural rules required by the host's element type
- [ ] Copy S2 source from `spectrum-css/components/popover/index.css` (`spectrum-two` branch, not `/dist`) into `popover.css` as baseline
- [ ] Map Spectrum CSS selectors to SWC equivalents following the CSS selector guidance in `CONTRIBUTOR-DOCS`
- [ ] Add CSS modifier classes for all 22 React Spectrum placement values, derived from the space-separated property value by replacing spaces with hyphens (`bottom left` → `.swc-Popover--bottom-left`, `start top` → `.swc-Popover--start-top`, etc.). Six side groups: bottom (5 variants), top (5 variants), left (3 variants — physical only), right (3 variants — physical only), start (3 variants — logical), end (3 variants — logical).
- [ ] Add `.swc-Popover-tip` element styles; orient based on `.swc-Popover--<placement>` modifier classes on the internal element (NOT on host attributes)
- [ ] Wrap modal-host-specific rules and any JS-lifecycle-driven animations in `/* @global-exclude */ … /* @global-exclude-end */` markers
- [ ] Forced-colors media query: sort to the bottom of `popover.css`; verify visible chrome (border becomes `CanvasText`)
- [ ] Add `@cssprop` JSDoc tag to `Popover.base.ts` for every exposed `--swc-*` property
- [ ] Pass stylelint (property order, `no-descending-specificity`, token validation)

#### Visual model and regressions

- [ ] Verify chrome (border, drop shadow, radius, background) matches Figma at all placements
- [ ] Verify tip geometry across all 22 placement values (5 bottom, 5 top, 3 left, 3 right, 3 start, 3 end) and RTL logical variants (`start`, `end`, and their sub-alignments)
- [ ] Verify forced-colors / high-contrast mode
- [ ] Document that v1 has no public migration path for 1st-gen's `[dialog]` attribute. Visual parity with 1st-gen's dialog-padding behavior is not shipped as a customer-facing surface — consumers needing that visual treatment wait for `<swc-dialog>` to ship as a separate migration.

### Accessibility

> Cross-reference [`accessibility-migration-analysis.md`](./accessibility-migration-analysis.md). That document needs amendment for D2 — tracked as Q4.

#### Naming and semantics

- [ ] Modal mode: `<dialog>` provides `role="dialog"` natively; verify no JS sets `role` on the host
- [ ] Auto mode (default): no `role` is set on the internal element; consumer-supplied content owns its own semantics
- [ ] `aria-haspopup="dialog"` is set on the resolved interactive element when `modal` is set; removed when `modal` is cleared or the trigger relationship is torn down. Auto mode: component does not set `aria-haspopup`.
- [ ] Stable `id` per `<swc-popover>` instance: `if (!this.id) this.id = \`swc-popover-${++PopoverIdCounter}\``  — needed for `aria-controls` ID-string wiring

#### Trigger-side ARIA wiring

- [ ] When `for=` / `trigger-element` resolves: durably set `aria-controls="<popover-id>"` (same-root) OR `ariaControlsElements = [popoverHost]` (cross-root) on the resolved interactive element (inner button for SWC components with open shadow root; host element otherwise). Stays set across open/close cycles per the ARIA spec.
- [ ] When `for=` / `trigger-element` is cleared, the popover is disconnected, or the trigger reference changes: remove the prior `aria-controls` / `ariaControlsElements` wiring.
- [ ] When `modal` is set and `for=` / `trigger-element` resolves: durably set `aria-haspopup="dialog"` on the resolved interactive element. Remove when `modal` is cleared or the trigger relationship is torn down.
- [ ] When `for=` / `trigger-element` resolves: durably set `aria-expanded="false"` initially.
- [ ] On `open = true`: set `aria-expanded="true"` on the resolved interactive element.
- [ ] On `open = false`: set `aria-expanded="false"` (not removed).
- [ ] No wiring when neither `for` nor `trigger-element` is set; no errors thrown.

#### State verification

- [ ] `[open]` reflects on host when popover is visible
- [ ] Closed popover is hidden from AT (browser handles via `popover` attribute or `<dialog>` natively)
- [ ] Auto mode: `Escape` and click-outside close the popover natively
- [ ] Modal mode: `Escape` closes via `cancel`; backdrop-click closes via the wired listener; focus is trapped while open
- [ ] High-contrast border present in forced-colors mode
- [ ] iOS Safari modal-mode `<dialog>.showModal()` smoke test on a representative DOM (Q3)

### Testing

- [ ] `PlacementController` agnostic test suite (`placement-controller.test.ts`): anchor placement + flip + shift + size + arrow on synthetic trigger/target pairs; autoUpdate wiring; rapid-open guard; WebKit compensation in a mocked WebKit context
- [ ] `resolveTrigger()` agnostic test suite (`resolve-trigger.test.ts`): all four resolution scenarios — same-root by ID, customer's shadow containing both, cross-root 2nd-gen with inner-button discovery, cross-root via trigger-element setter, closed-shadow fallback
- [ ] `Popover.test.ts`: component-level behavior — renders correctly, attribute reflection, slot content, both modes
- [ ] Add Playwright `popover.a11y.spec.ts` with `toMatchAriaSnapshot` for both modes (auto: no host role; modal: `role="dialog"` announced)

#### Behavior — auto mode (default)

- [ ] Opens via `showPopover()` on `open = true`
- [ ] Closes via `hidePopover()` on `open = false`
- [ ] Native `Escape` closes; `beforetoggle` observed; `swc-close` dispatched with `detail.source === 'escape'`
- [ ] Native click-outside closes; `beforetoggle` observed; `swc-close` dispatched with `detail.source === 'outside'`
- [ ] Clicks on slotted content do NOT close
- [ ] Programmatic close (`open = false`): `swc-close` dispatched with `detail.source === 'programmatic'`
- [ ] No `anchor` or `popovertarget` attribute is set on the internal popover element (per the "just `for=`/`id`" API rule)
- [ ] Sibling-popover dismissal works via the browser's auto-popover-stack: opening Popover B dismisses Popover A
- [ ] `dismissibleStack` registration on open and unregistration on close; verify the stack reports the popover as top while open

#### Behavior — modal mode (`modal` attribute)

- [ ] Opens via `showModal()` on `open = true`; `swc-open` dispatched synchronously
- [ ] Closes via `close()` on `open = false`
- [ ] `Escape` closes; `cancel` event observed; `swc-close` dispatched with `detail.source === 'escape'`
- [ ] Click on the backdrop closes the popover; `swc-close` dispatched with `detail.source === 'outside'`
- [ ] Clicks on the popover's padding ring (inside `.swc-Popover-content`) do NOT close — verify the inner-content wrapper architecture works correctly
- [ ] Clicks on slotted content do NOT close
- [ ] Programmatic close: `swc-close` dispatched with `detail.source === 'programmatic'`
- [ ] Focus is trapped inside the dialog while open; Tab cycles inside
- [ ] Page behind is inert (not clickable, not focusable, not scrollable)
- [ ] On close: focus returns to the element that was focused at open time (native `<dialog>` behavior)
- [ ] Trigger has `aria-haspopup="dialog"`, `aria-controls`, and toggling `aria-expanded` while `modal` is set

#### Behavior — cross-mode invariants

- [ ] `swc-open`, `swc-after-open`, `swc-close`, `swc-after-close` dispatch in the expected order in both modes
- [ ] `for=` resolves trigger and durably wires `aria-controls` (same-root) or `ariaControlsElements` (cross-root) from the moment the relationship resolves — not on open change. Works in both modes.
- [ ] `aria-expanded` toggles on `open` change; remains present and false when closed (not removed). Both modes.
- [ ] Removing `for=` or setting `trigger-element = null` clears `aria-controls` / `ariaControlsElements`, `aria-expanded`, and `aria-haspopup` (if set). Both modes.
- [ ] Removing `modal` clears `aria-haspopup="dialog"` from the trigger; `aria-controls` and `aria-expanded` remain. Both modes.
- [ ] `for=` pointing to a non-existent ID: no error, no wiring. Both modes.
- [ ] `trigger-element` setter overrides `for=`. Both modes.
- [ ] `trigger-element` accepts an element from a different shadow root and wires `ariaControlsElements` correctly. Both modes.
- [ ] Inner-button discovery works for an open-shadow SWC component trigger; falls back to host for closed-shadow / native elements. Both modes.
- [ ] `placement` validation: invalid value logs a dev-mode warning; `PlacementController` flips to a sensible value via middleware. Both modes.
- [ ] `actualPlacement` property reflects the computed placement after `flip` reorients; the corresponding `.swc-Popover--<placement>` class is set on the internal element. No `actual-placement` host attribute exists. Both modes.
- [ ] `should-flip="false"` disables flip middleware — popover stays in requested placement when constrained. Both modes.
- [ ] Trigger-disconnect graceful degradation: `PlacementController` bails out on `!trigger.isConnected`; at close time component re-resolves via `for=` to handle React-rerender pattern; dev-mode warning when trigger is gone for good
- [ ] UX verification (manual): auto mode preserves 1st-gen behavior (page interactive, scrollable, click-outside closes); modal mode is blocking and non-scrollable

#### Visual regression

- [ ] VRT covering at least one variant per side (bottom, top, left, right, start, end) plus representative sub-alignment variants (e.g., `bottom start`, `top end`, `left top`). Full 22-value matrix is not required for VRT but tip orientation and edge-positioning must be visually correct for each side group.
- [ ] VRT for at least 2 logical placements (`start`, `end`) verifying RTL behavior
- [ ] VRT for `tip` present and absent
- [ ] VRT for open and closed states with transition
- [ ] VRT for forced-colors / high-contrast mode

### Documentation

#### General

- [ ] JSDoc on all public properties, slots, and exposed `--swc-*` CSS custom properties
- [ ] Stories: Playground, Overview, Anatomy (default slot, tip), Options (placement, auto vs modal mode, offset/cross-offset), States (open), Behaviors (auto-mode light-dismiss, modal-mode focus trap, trigger-element, `for` cross-root example), Accessibility (auto vs modal semantics, trigger-side ARIA wiring)

#### Breaking changes

- [ ] Consumer migration guide ([SWC-2003](https://jira.corp.adobe.com/browse/SWC-2003)): explain that 1st-gen `<sp-overlay>` + `<sp-popover>` composition does NOT translate to `<swc-overlay>` + `<swc-popover>` in 2nd-gen — the recommended migration is to either (a) adopt the first-party 2nd-gen component (Picker, Action Menu, etc.) that has popover built-in, or (b) use `<swc-popover>` directly with `for=` / `open` if a custom anchored popover is needed
- [ ] Consumer migration guide: **distinguish the two modes**. Default mode (`popover="auto"`) preserves 1st-gen UX — light-dismiss, page-behind interactive, scrollable; the only change is the `for=` authoring pattern replacing `<sp-overlay>` wrapping. Modal mode (`modal` attribute opt-in) introduces blocking page-behind, focus trap, and the `<dialog>` semantics from the [differences table](#differences-from-1st-gen-popovers) — opt-in for the rare cases that need it.
- [ ] Consumer migration guide: document the `[dialog]` attribute removal and that there is **no v1 migration path** for dialog-padding chrome — consumers wait for `<swc-dialog>` or duplicate the visual styling themselves
- [ ] Consumer migration guide: document the new event contract (`swc-open` / `swc-after-open` / `swc-close` / `swc-after-close`) and timing differences vs `<sp-overlay>`'s `sp-opened` / `sp-closed`
- [ ] Consumer migration guide: document trigger ARIA — `aria-controls` and `aria-expanded` in both modes; `aria-haspopup="dialog"` when `modal` is set; auto-mode `aria-haspopup` remains consumer-owned when the pattern is known
- [ ] Consumer migration guide: note that `<swc-popover>` is non-modal by default (auto mode); the `modal` attribute opts in to `<dialog>.showModal()`-based blocking behavior for the rare cases that need it
- [ ] Behaviors story: demonstrate the modal-dialog blocking behavior with a representative trigger, and call out the differences from 1st-gen for testers

#### Accessibility

- [ ] Storybook Accessibility story: document `role="dialog"` in modal mode (native, via `<dialog>`); focus trap and Escape behavior (native); trigger-side ARIA wiring (`aria-expanded`, `aria-controls` / `ariaControlsElements`, and `aria-haspopup="dialog"` when `modal`) including inner-button resolution for SWC component triggers
- [ ] Document accessible-name expectations: consumers must supply `aria-labelledby` or `aria-label` to give the dialog a name; nameless dialogs are an authoring bug in modal mode
- [ ] Document auto-mode `aria-haspopup`: not set by the component — consumers wire a pattern-specific value when appropriate
- [ ] Document the closed-shadow-root fallback (ARIA goes on the trigger host)

### Review

- [ ] `yarn lint:2nd-gen` passes (ESLint, Stylelint, Prettier)
- [ ] `yarn test` passes (component, helper, and controller suites)
- [ ] Status table in workstream doc updated for Popover (all 7 phases)
- [ ] PR created with description referencing Epic SWC-1993
- [ ] Architecture-review sign-off on the inline dialog-lifecycle pattern and the `resolveTrigger()` helper contract (since `<swc-menu>` migration will reuse the same primitives immediately after)
- [ ] Peer engineer sign-off
- [ ] Follow-on tickets for the additive scope (A1–A8) created and linked to Epic SWC-1993.

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
| Q3  | **iOS Safari `<dialog>.showModal()` benchmark** for the modal opt-in path on representative 2nd-gen consumer DOMs. Only relevant when modal mode is used; default mode doesn't use `showModal()`. Per the Overlay strategy RFC. Smoke test in this migration is sufficient; full benchmark by the first first-party migration that adopts modal mode. | No (for Popover) | Pending | Performance reviewer |
| Q4  | **Amend [`accessibility-migration-analysis.md`](./accessibility-migration-analysis.md)** to reflect both modes: default `popover="auto"` (no host role; consumer-managed semantics) and `modal` (`<dialog>` provides `role="dialog"`, focus trap, inert). The original analysis assumed a role-free host — accurate for default mode, needs an amendment for modal mode. | No (this migration); confirmed-direction decision | To do | Accessibility reviewer |
| Q5  | **React Spectrum / Design alignment on the modal opt-in.** Specific UX requirements for modal popovers, whether modal popover should look visually distinct from auto popover, whether some downstream consumers (e.g. coachmark) actually need modal mode at all. Tooltip's `popover="auto"` vs `popover="manual"` question is also part of this conversation (impacts auto-stack pollution when hovering background buttons while a picker is open). | No | Pending — multi-team conversation in progress | Ruben Carvalho |
| Q6  | **Coachmark inheritance vs composition.** 1st-gen `Coachmark extends Popover`. Decide during the coachmark migration whether 2nd-gen `<swc-coachmark>` extends `<swc-popover>` or implements its own internal lifecycle alongside `PlacementController`. Likely composition given the "no light-DOM composition + each component builds its own" rule. | No | Deferred | Coachmark migration owner |
| Q7  | **Modal-mode scroll lock — CSS-only.** Resolved: `<swc-popover modal>` prevents page scroll via `overflow: hidden` applied to `html` while the dialog is open, and the popover surface uses `overscroll-behavior: contain` to prevent scroll chaining out of internal scroll regions. Safari's known `overscroll-behavior` bug is counter-acted via CSS-only adjustments for the modal case. **No JS-level scroll lock and no iOS-specific JavaScript workarounds in v1** — if a validated concern surfaces during implementation or in a downstream consumer's testing, revisit at that point. Default (auto) mode does NOT lock page scroll; users can scroll the page freely while a non-modal popover is open (consistent with `popover="auto"` semantics — if the popover itself doesn't have an internal scroll region, page scroll continuing is fine). | No | **Resolved** (CSS-only direction; specific selectors confirmed during styling phase) | CSS reviewer |

### Scope and prerequisites

| #   | Item | Blocking? | Status | Owner |
| --- | ---- | --------- | ------ | ----- |
| Q8  | **Consumer migration guide content for the `<sp-overlay>` + `<sp-popover>` → 2nd-gen translation.** Existing ticket [SWC-2003](https://jira.corp.adobe.com/browse/SWC-2003). Content depends on this plan and on subsequent first-party component migrations (Picker, Action Menu, etc.). The guide must distinguish the two modes: default-mode migration is near-zero-friction (UX preserved); modal-mode adoption is a deliberate choice with the blocking-page consequences documented in the [differences table](#differences-from-1st-gen-popovers). Updated incrementally per first-party migration. | No (for Popover) | In progress | Documentation owner |
| Q9  | **`<swc-dialog>` migration** is independent. The 1st-gen `[dialog]` attribute is removed without a direct migration path in v1 (no public `.swc-Popover` class); consumers wanting dialog padding chrome wait for `<swc-dialog>` to ship and then adopt its styles directly. Coordinate timing. | No (architectural decoupling is intentional) | Pending coordination | Dialog migration owner |
| Q10 | **Internal style-sharing mechanism for first-party consumers.** First-party components (Menu, Picker, Action Menu, etc.) that need the `.swc-Popover` chrome share styles internally. The mechanism is unspecified in this plan: candidates are constructed stylesheets imported from a shared internal path, shared CSS imports via package internals, or per-component duplication. Decide during implementation; defer to whoever ships the second consumer (likely `<swc-menu>`). | No (Popover ships standalone in v1) | To resolve at second-consumer migration | Architecture reviewer |

---

## References

- [Washing machine workflow](../../02_workstreams/02_2nd-gen-component-migration/02_step-by-step/01_washing-machine-workflow.md)
- [2nd-gen migration status table](../../02_workstreams/02_2nd-gen-component-migration/01_status.md)
- [Accessibility migration analysis](./accessibility-migration-analysis.md) — needs amendment per Q4
- [Rendering and styling migration analysis](./rendering-and-styling-migration-analysis.md)
- [Tooltip migration plan](../tooltip/migration-plan.md) — architectural reference for native top-layer + `swc-*` event lifecycle + inner-button ARIA wiring patterns
- [CSS style guide — Component Custom Property Exposure](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/02_custom-properties.md#component-custom-property-exposure)
- [CSS style guide — Selector conventions](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/02_custom-properties.md#selector-conventions)
- [1st-gen source](../../../../1st-gen/packages/popover/src/Popover.ts)
- [1st-gen styles](../../../../1st-gen/packages/popover/src/popover.css)
- [1st-gen README](../../../../1st-gen/packages/popover/README.md)
- [1st-gen `PlacementController`](../../../../1st-gen/packages/overlay/src/PlacementController.ts) — extraction target
- [React Spectrum S2 Popover](https://react-spectrum.adobe.com/Popover) — product alignment
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

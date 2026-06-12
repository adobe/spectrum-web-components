<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../../README.md) / [Project planning](../../README.md) / [Components](../README.md) / Tooltip / Tooltip migration plan

<!-- Document title (editable) -->

# Tooltip migration plan

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [TL;DR](#tldr)
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
- [Changes overview](#changes-overview)
    - [Must ship — breaking or a11y-required](#must-ship--breaking-or-a11y-required)
    - [Additive — ships when ready, zero breakage for consumers already on 2nd-gen](#additive--ships-when-ready-zero-breakage-for-consumers-already-on-2nd-gen)
- [2nd-gen API decisions](#2nd-gen-api-decisions)
    - [Public API](#public-api)
    - [Behavioral semantics](#behavioral-semantics)
    - [Accessibility semantics notes (2nd-gen)](#accessibility-semantics-notes-2nd-gen)
    - [ARIA relationship wiring](#aria-relationship-wiring)
- [Architecture: core vs SWC split](#architecture-core-vs-swc-split)
- [Controller integration assumptions](#controller-integration-assumptions)
    - [Event dispatch ownership](#event-dispatch-ownership)
    - [`HoverController` hand-off](#hovercontroller-hand-off)
    - [`PlacementController` hand-off](#placementcontroller-hand-off)
    - [Auto-stack behavior](#auto-stack-behavior)
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
    - [Deferred implementation tickets](#deferred-implementation-tickets)
- [Addendum: HoverController interface requirements](#addendum-hovercontroller-interface-requirements)
    - [Scope](#scope)
    - [Warm-up / cooldown state machine](#warm-up--cooldown-state-machine)
    - [Warm state storage](#warm-state-storage)
    - [Warm state scoping across component types](#warm-state-scoping-across-component-types)
- [Decision log](#decision-log)
    - [D1: `actual-placement` attribute — split consumer intent from resolved physical side](#d1-actual-placement-attribute--split-consumer-intent-from-resolved-physical-side)
    - [D2: VRT play functions — `getComputedStyle(opacity)` poll instead of `swc-after-open`](#d2-vrt-play-functions--getcomputedstyleopacity-poll-instead-of-swc-after-open)
- [References](#references)

</details>

<!-- Document content (editable) -->

> **Epic SWC-2017** · Planning output. Must be reviewed before implementation begins.
>
> This plan should provide recommendations, not just observations. Call out inconsistencies, propose better API or naming paths where appropriate, and make unresolved tradeoffs explicit for reviewers.

---

## TL;DR

Tooltip is a visually simple component with high behavioral complexity in its automatic trigger-wiring mode. The S2 migration carries six confirmed breaking changes and one critical a11y fix. The core tooltip (variants, CSS, `role="tooltip"`, native `popover="auto"` open/close) can ship now; trigger integration is additive pending two extracted controllers.

- **Breaking (B1–B3):** Icon slot removed, `positive` variant removed, `variant="info"` renamed to `variant="informative"`. All three confirmed by design, Figma, S2 CSS, and accessibility analysis.
- **Additive/type change (B4):** Logical placement values (`start`, `end`) were missing in 1st-gen; now shipping. Physical values unchanged. Not runtime-breaking; the only consumer impact is a TypeScript type-union widening — exhaustive `switch` or `satisfies` checks against `Placement` will need updating.
- **Breaking (B5):** Event renames: `sp-opened`/`sp-closed` removed; 2nd-gen fires `swc-open`, `swc-after-open`, `swc-close`, `swc-after-close`. Event timing also differs due to native popover lifecycle; must document in consumer migration guide.
- **A11y critical (SWC-1558):** `role="tooltip"` is absent in 1st-gen; must ship in 2nd-gen.
- **Infrastructure change:** `sp-overlay` dependency dropped. 2nd-gen uses native popover API + Floating UI per the [Overlay Strategy RFC](https://www.dropbox.com/scl/fi/eae4rywxitn4zfmuw4o59/RFC-Overlay-strategy-for-1st-gen-and-2nd-gen.paper?rlkey=ljezd8mt8joy2zc3lv88usrh6&dl=0). The `self-managed` attribute is removed (B6); automatic trigger wiring is on by default; the `manual` attribute opts out. Internal mechanics change significantly.
- **HoverController and PlacementController integrated:** Both controllers are wired in `Tooltip.base.ts`. Hover/focus event wiring, warm-up/cooldown, `disabled` guard, WCAG 1.4.13 pointer bridge, `manual` suppression, and pixel positioning are all active. `delay`, `disabled`, `manual`, `offset`, `cross-offset`, `container-padding`, and `should-flip` are all live API. The Floating UI inline-style workaround in stories has been removed.
- **Authoring pattern change:** `<swc-tooltip>` is authored as a sibling of the trigger — not inside it as in 1st-gen. With `popover="auto"` moving the tooltip to the top layer at render time, physical DOM nesting is no longer needed. Trigger resolution uses the `for` attribute to reference the trigger by ID in the same document tree root; `trigger-element` provides an element reference override for cross-shadow-root and programmatic cases where ID resolution does not apply. Add `manual` to opt out of automatic wiring entirely. The 1st-gen ancestor-walking (`resolveSelfManagedTriggerElement`) is not ported.
- **No open questions.** Q1 (`tip-padding`) and Q2 (`popover="auto"` stack isolation) are both resolved. See [Blockers and open questions](#blockers-and-open-questions).

---

## 1st-gen API surface

**Source:** [`1st-gen/packages/tooltip/src/Tooltip.ts`](../../../../1st-gen/packages/tooltip/src/Tooltip.ts)
**Version:** `@spectrum-web-components/tooltip@1.12.0`
**Custom element tag:** `sp-tooltip`

### Properties / attributes

| Property | Type | Default | Attribute | Notes |
| -------- | ---- | ------- | --------- | ----- |
| `delayed` | `boolean` | `false` | `delayed` | Warm-up/cooldown delay; 1000ms warmup before open, 1000ms cooldown before the next warmup window |
| `disabled` | `boolean` | `false` | `disabled` | Prevents self-managed tooltip from responding to user input |
| `selfManaged` | `boolean` | `false` | `self-managed` | Auto-binds to the nearest focusable ancestor via composed-tree traversal |
| `offset` | `number` | `0` | `offset` | Positioning offset in pixels; passed through to `sp-overlay` |
| `open` | `boolean` | `false` | `open` (reflect) | Reflects the current open state |
| `placement` | `Placement` | `undefined` | `placement` (reflect) | Physical + sub-variant values; valid set: `top`, `top-start`, `top-end`, `right`, `right-start`, `right-end`, `bottom`, `bottom-start`, `bottom-end`, `left`, `left-start`, `left-end`. Logical start/end values missing. |
| `tipPadding` | `number` | `undefined` | `tip-padding` | Padding for tip element position; passed through to `sp-overlay` |
| `triggerElement` | `HTMLElement \| null` | `null` | — (setter only) | Explicit trigger override; bypasses auto-traversal for self-managed usage |
| `variant` | `string` | `''` | `variant` | Accepts `'info'`, `'positive'`, `'negative'`; empty string = neutral |

### Methods

| Method | Signature | Notes |
| ------ | --------- | ----- |
| `triggerElement` (setter) | `set triggerElement(el: HTMLElement \| null)` | Overrides auto-resolved trigger; passes through to `overlayElement.triggerElement` |

### Events

| Event | Dispatched when | Notes |
| ----- | --------------- | ----- |
| `sp-opened` | Tooltip opens | Re-dispatched from internal `TooltipOpenable`; typed with `OverlayOpenCloseDetail` |
| `sp-closed` | Tooltip closes | Re-dispatched from `TooltipOpenable` |
| `transitionrun` | CSS transition starts | Forwarded from `sp-tooltip-openable` |
| `transitionend` | CSS transition ends | Forwarded |
| `transitioncancel` | CSS transition cancelled | Forwarded |

### Slots

| Slot | Content | Notes |
| ---- | ------- | ----- |
| default | Tooltip text label | Primary content |
| `icon` | Icon element | Renders at the start of the label for `info`/`positive`/`negative` variants; **removed in S2** |

### CSS custom properties

This full modifier surface will not be carried forward to 2nd-gen.

The `--mod-*` surface from Spectrum CSS includes spacing, sizing, color, and tip geometry tokens. No `--mod-*` passthrough is planned for 2nd-gen. See the [rendering and styling analysis](./rendering-and-styling-migration-analysis.md) for the full modifier list.

### Shadow DOM output (rendered HTML)

Non-self-managed:

```html
<sp-tooltip-openable id="tooltip" placement="[placement]">
  <slot name="icon"></slot>
  <span id="label"><slot></slot></span>
  <span id="tip" aria-hidden="true"></span>
</sp-tooltip-openable>
```

Self-managed:

```html
<sp-overlay open delayed disabled offset="[n]" placement="[p]" type="hint" triggerInteraction="hover">
  <sp-tooltip-openable id="tooltip" placement="[placement]">
    <slot name="icon"></slot>
    <span id="label"><slot></slot></span>
    <span id="tip" aria-hidden="true"></span>
  </sp-tooltip-openable>
</sp-overlay>
```

`TooltipOpenable` (`sp-tooltip-openable`) is an internal plain `HTMLElement` subclass that bridges the 1st-gen overlay boundary by re-dispatching `sp-opened`/`sp-closed` events and exposing `tipElement` for positioning. It is an implementation detail, not a public API, and does not carry forward to 2nd-gen.

---

## Dependencies

| Package | Version | Role |
| ------- | ------- | ---- |
| `@spectrum-web-components/base` | 1.12.0 | Lit base class, `html` template tag |
| `@spectrum-web-components/overlay` | 1.12.0 | **Dropped in 2nd-gen.** Was used for `sp-overlay` (self-managed), `HoverController`, and `OverlayTriggerOptions`. All three replaced by native popover API + extracted controllers. |
| `@spectrum-web-components/reactive-controllers` | 1.12.0 | `DependencyManagerController` **dropped** — its sole purpose was guarding `sp-overlay`'s dynamic import. Static imports and browser-native APIs need no equivalent. |
| `@spectrum-web-components/shared` | 1.12.0 | `focusableSelector` used for trigger traversal. **Dropped in 2nd-gen** — trigger resolution uses the `for` attribute (ID lookup) rather than DOM traversal; no import needed. |

---

## Migration sequencing and prerequisites

### Dependency-aware recommendation

Core tooltip (variants, CSS, `role="tooltip"`, event renames) can proceed without prerequisites. Automatic trigger integration is additive and blocked on two controller extractions from the Overlay RFC:

- **`PlacementController`** — Floating UI wrapper for viewport-aware positioning. **Extracted and integrated.** Pixel positioning, flip behavior, and positioning attributes are now active.
- **`HoverController`** — warm-up/cooldown, focus parity, WCAG 1.4.13 pointer bridge. **Extracted and integrated.** Hover/focus wiring is active.

Both controllers are integrated. No outstanding controller prerequisites remain.

### Related components and ordering notes

| Component | Relationship | Notes |
| --------- | ------------ | ----- |
| `PlacementController` | **Integrated.** | Extracted and wired in `Tooltip.base.ts`. Pixel positioning, flip behavior, `offset`, `cross-offset`, `container-padding`, and `should-flip` are active. |
| `HoverController` | **Integrated.** | Extracted and wired in `Tooltip.base.ts`. Hover/focus event wiring, warm-up/cooldown timing, and WCAG 1.4.13 pointer bridge are active. |
| `sp-overlay` | Not a prerequisite | 2nd-gen Tooltip and controllers replaces `sp-overlay` with native popover API + Floating UI directly. |

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

| # | What changes | 1st-gen behavior | 2nd-gen behavior | Consumer migration path |
| --- | ------------ | ---------------- | ---------------- | ----------------------- |
| B1 | `slot="icon"` removed | Accepts an icon element in `slot="icon"`; rendered at label start for variant tooltips | Slot removed; no icon rendering in S2 Tooltip | Remove all `slot="icon"` usage; no replacement |
| B2 | `variant="positive"` removed | Accepts `positive`; renders green background | Accepts `neutral`, `informative`, `negative` only | Replace `positive` with `informative`, `neutral`, or `negative` as content warrants |
| B3 | `variant="info"` → `variant="informative"` | Accepts `info` string | `informative` — confirmed; aligns with 2nd-gen badge and Figma label | Update variant string; no CSS change needed |
| B4 | Add logical placement values (type-only change) | Physical sub-variants only; `start`/`end` logical inline values missing from WC | `start` and `end` logical inline values ship; RTL placement works correctly. Sub-variants (`start-top`, `start-bottom`, `end-top`, `end-bottom`) are in S2 CSS but are not exposed in the public type — the supported set is `top`, `bottom`, `left`, `right`, `start`, `end`. | No runtime change needed; update `TooltipPlacement` imports or exhaustive switch/satisfies checks if present |
| B5 | Event renames | Fires `sp-opened` and `sp-closed` (re-dispatched from internal `TooltipOpenable`) | Fires `swc-open`, `swc-after-open`, `swc-close`, `swc-after-close`. Timing also changes: native popover `beforetoggle`/`transitionend` fires at different points than the overlay-based sequence | Remove `sp-opened`/`sp-closed` listeners; add `swc-open`/`swc-after-open`/`swc-close`/`swc-after-close` listeners as needed; document timing difference in consumer migration guide |
| B6 | `self-managed` attribute removed; automatic wiring is the default | `self-managed` required to opt into automatic trigger/hover integration; tooltip nested inside the trigger | Automatic wiring is on by default; no attribute needed. `manual` attribute opts out for programmatic control. | Remove `self-managed` from all existing usage. Move the tooltip element out of the trigger; add an `id` to the trigger and a `for="[id]"` attribute to the tooltip. The tooltip can be placed anywhere in the same document tree root. Add `manual` only when programmatic open/close control is needed. |

#### Styling and visuals

| # | What changes | 1st-gen behavior | 2nd-gen behavior | Consumer migration path |
| --- | ------------ | ---------------- | ---------------- | ----------------------- |
| S1 | Adopt S2 design tokens | S1 Spectrum tokens | S2 tokens from `spectrum-css` `spectrum-two` branch | Visual update; no API change |
| S2 | Remove `.spectrum-Tooltip-typeIcon` and all icon rendering styles | Type icon wrapper and icon logic present for variant tooltips | Removed; no icon in any variant | No consumer action |
| S3 | Add forced-colors high-contrast border | Not specified | `1px solid transparent` in base styles; `forced-colors` mode auto-fills `transparent` with `CanvasText` | No consumer action |
| S4 | CJK line-height support | Present in S1 CSS | Present in S2 CSS with S2 CJK token | No consumer action |

#### Accessibility and behavior

| # | What changes | 1st-gen behavior | 2nd-gen behavior | Consumer migration path |
| --- | ------------ | ---------------- | ---------------- | ----------------------- |
| A1 | Add `role="tooltip"` to host element | Missing (SWC-1558) | `role="tooltip"` on the host element | No consumer action; fixes AT behavior |
| A2 | Native popover open/close | Uses `sp-overlay type="hint"` + `HoverController` + `triggerInteraction="hover"` | Host gets `popover="auto"`; `beforetoggle`/`toggle`/`transitionend` event listeners handle state sync and the four `swc-*` lifecycle events. Participates in the auto popover stack — opening closes other open `auto` popovers. See [Auto-stack behavior](#auto-stack-behavior). | No consumer action; automatic trigger wiring ships inactive in the initial release |
| A3 | `Escape` dismissal | Handled by `OverlayStack` in 1st-gen | `popover="auto"` provides built-in Esc-to-close and light-dismiss (primary mechanism). A `document` `keydown` listener is also wired in Core's `connectedCallback` as a belt-and-suspenders measure for test environments where the native popover dismiss may not fire; it sets `this.open = false` on Escape. | No consumer action |
| A4 | ARIA relationship wiring | No automatic ARIA association in 1st-gen | On `open = true`: SWC resolves trigger via `for` / `trigger-element`, applies inner-button resolution (shadow `<button>` for SWC components; host for native elements), and sets `Element.ariaDescribedByElements = [tooltipHost]`. Removed on `open = false`. Active in both automatic and manual modes. See [ARIA relationship wiring](#aria-relationship-wiring) for the full two-path resolution and browser support. | Set `for` on `<swc-tooltip>` pointing to the trigger's `id`; or set `trigger-element` programmatically. No other action required. |

### Additive — ships when ready, zero breakage for consumers already on 2nd-gen

| # | What is added | Notes |
| --- | ------------- | ----- |
| ~~A1~~ | ~~Automatic trigger integration (hover/focus + positioning)~~ | **Shipped.** `HoverController` and `PlacementController` are integrated; hover/focus event wiring and pixel positioning are both active. |
| ~~A2~~ | ~~Warm-up / cooldown (`delay`)~~ | **Shipped.** `delay` is now an active attribute read by `HoverController`. Default 1500ms; `delay="0"` opens immediately. |
| ~~A3~~ | ~~`disabled` for automatic mode~~ | **Shipped.** `disabled` prevents hover/focus response via `HoverController`'s guard. |
| ~~A4~~ | ~~WCAG 1.4.13 pointer bridge~~ | **Shipped.** Pointer can move from trigger into the tooltip bubble without closing; managed by `HoverController`. |
| A5 | `no-tip` property | Shown in Figma (Orientation section, "No tip") but not supported by React Spectrum. Deferred. Create a follow-on ticket when React adds support. |
| A6 | `tooltip-directive` for 2nd-gen | Lit directive for programmatic tooltip insertion. The 2nd-gen directive will be simpler than 1st-gen: no `sp-overlay` wrapper needed; it creates `<swc-tooltip>`, inserts it as a sibling of the target, sets `trigger-element` (element reference, bypassing ID management), and handles lifecycle cleanup. Both controllers are now active; this can proceed when prioritized. |
| ~~A7~~ | ~~`container-padding`~~ | **Shipped.** Default `12`. Passed to `PlacementController` `containerPadding` option. |
| ~~A8~~ | ~~`cross-offset`~~ | **Shipped.** Default `0`. Passed to `PlacementController` `crossOffset` option. |
| ~~A9~~ | ~~`should-flip`~~ | **Shipped.** Default `true`. Passed to `PlacementController` `shouldFlip` option. |
| A10 | `--swc-*` CSS custom properties | No `--swc-*` custom properties initially. A small reviewed set may be added if consumer override needs emerge. |
| ~~A11~~ | ~~`labeling` attribute — `aria-labelledby` wiring~~ | **Shipped.** Implemented in the initial release alongside the base ARIA wiring. `syncAriaRelationship()` branches on `this.labeling`: when set, uses `ariaLabelledByElements` instead of `ariaDescribedByElements` on the trigger's inner interactive element. Stale references in the opposite property are cleaned up on each sync. Re-syncs when `labeling` changes while the tooltip is open. |
| A12 | Inner interactive element selector expansion | Initial implementation uses `querySelector('button')` as the convention for resolving the inner interactive element within a trigger's shadow root. Expand to support additional interactive elements (`<a>`, `<input>`, `<select>`, components using a different inner element) when confirmed by consumer needs. `button` covers the large majority of 2nd-gen button-like component cases; any expansion should be gated on confirmed need. |
| A13 | Directional entry animation on placement flip | **Known limitation.** CSS `@starting-style` evaluates at `showPopover()` time, before `PlacementController` has run and resolved the actual side. On a first open that triggers a flip (e.g., requested `top` but viewport forces `bottom`), the `@starting-style` uses the pre-flip `placement` attribute and slides from the wrong direction. Fix options range from opacity-only `@starting-style` (simplest; drops directional slide entirely) to triggering a separate `transform` animation from `onPlacementChange` after the flip resolves (preserves directional animation; requires reflow or Web Animations API). Not addressed in the current release. |

Full behavioral requirements for this feature are in the [HoverController interface requirements](#addendum-hovercontroller-interface-requirements) addendum.

---

## 2nd-gen API decisions

Derived from the 1st-gen implementation, the rendering analysis, the accessibility analysis, the Figma `S2 / Web (Desktop scale)` tooltip frame, and the team RFC for native popover + Floating UI. Confirmed items are marked; open items are tracked in [Blockers and open questions](#blockers-and-open-questions).

- **Confirmed**: directly supported by source material
- **Inferred**: recommended based on multiple signals, not one authoritative source
- **Open question**: unresolved; see blockers

### Public API

#### Properties / attributes (2nd-gen)

| Property | Type | Default | Attribute | Notes |
| -------- | ---- | ------- | --------- | ----- |
| `variant` | `'neutral' \| 'informative' \| 'negative'` | `'neutral'` | `variant` (reflect) | **Confirmed.** Positive removed. `informative` confirmed; CSS class stays `.spectrum-Tooltip--info` internally. **Behavioral change from 1st-gen:** default was `''` (empty string), which caused the setter to call `removeAttribute('variant')` — so the neutral state had no `variant` attribute on the host. In 2nd-gen, `variant="neutral"` is reflected. Consumers with `:not([variant])` selectors or `getAttribute('variant') === null` checks for neutral detection will need updating. |
| `placement` | `TooltipPlacement` | `'top'` | `placement` (reflect) | **Confirmed.** React Spectrum default is `top`. S2 CSS adds `start`/`end` and sub-variants. **Behavioral change from 1st-gen:** 1st-gen defaulted to `undefined` (no placement attribute or CSS class). Consumers that relied on an unplaced tooltip will now receive `placement="top"` and the corresponding CSS class. This attribute always holds the consumer's declared value; `PlacementController` never mutates it. See `actual-placement` for the resolved physical side. |
| — | — | — | `actual-placement` (internal) | Internal CSS-only state attribute. Not a Lit `@property`; not in the public API, TypeDoc, or CEM. Written by `Tooltip.base.ts` via direct `setAttribute` — once synchronously before `showPopover()` (initial declared side) and again by `onPlacementChange` after `computePlacement()` resolves (resolved physical side). Always a physical cardinal side: `'top' \| 'bottom' \| 'left' \| 'right'`. Cleared by `clearPositioningState()` after the exit transition completes (called from `dispatchAfterEvent(false)`) — it is not cleared at `hidePopover()` time to avoid a CSS selector change while the tooltip is still visible and fading. All CSS selectors for tip direction, margin spacing, and `@starting-style` animation target this attribute. |
| `open` | `boolean` | `false` | `open` (reflect) | **Confirmed.** |
| `for` | `string` | `undefined` | `for` | **Confirmed.** ID of the trigger element in the same document tree root. The tooltip calls `getRootNode().getElementById(this.for)` to resolve the trigger, then wires the ARIA relationship on `open` change (see [ARIA relationship wiring](#aria-relationship-wiring)). Active in both automatic and manual modes — see the trigger-mode interaction table in [Behavioral semantics](#behavioral-semantics). HoverController hover/focus auto-wiring is additive. |
| `trigger-element` | `HTMLElement \| null` | `null` | — (setter only) | **Confirmed.** Explicit trigger element reference; overrides `for` when set. Drives the same ARIA wiring on `open` change as `for`, via direct element reference rather than ID lookup. Use for cross-shadow-root triggers where `getRootNode().getElementById()` is scoped to the wrong tree root, or for the directive (programmatic insertion). `HoverController` and `PlacementController` receive the resolved value and do not perform their own trigger resolution. |
| `delay` | `number` | `1500` | `delay` | **Confirmed. Active.** Duration in ms of the warm-up before the tooltip shows on hover; keyboard focus always opens immediately regardless of this value. The cooldown duration after pointer leave is 300ms (fixed, independent of `delay`). Set to `0` to show immediately on hover. Warm-up/cooldown is the default behavior — no attribute needed to enable it. **Behavioral change from 1st-gen:** 1st-gen had `delayed: boolean` (default `false`, opt-in); 2nd-gen is opt-out. |
| `disabled` | `boolean` | `false` | `disabled` | **Confirmed. Active.** Prevents the tooltip from responding to hover and focus events. No-op when `manual` is set. |
| `manual` | `boolean` | `false` | `manual` | **Confirmed. Active.** Suppresses `HoverController` and `PlacementController` wiring. `for` and `trigger-element` are still resolved; ARIA wiring still fires on `open` change. Consumer manages open/close via the `open` property or the popover API directly. |
| `offset` | `number` | `4` | `offset` | **Confirmed. Active.** Gap in pixels along the placement axis between the trigger and the tooltip bubble. Passed to `PlacementController` offset middleware. Also drives `--_swc-tooltip-animation-distance` so the enter animation travel distance matches the gap. |
| `cross-offset` | `number` | `0` | `cross-offset` | **Confirmed. Active.** Slide in pixels along the trigger edge perpendicular to the placement direction. Passed to `PlacementController` crossOffset option. |
| `container-padding` | `number` | `12` | `container-padding` | **Confirmed. Active.** Minimum inset from the viewport edge for collision detection, in pixels. Passed to `PlacementController` containerPadding option. |
| `should-flip` | `boolean` | `true` | `should-flip` | **Confirmed. Active.** Whether the tooltip may reposition to the opposite side when the requested placement does not fit. Passed to `PlacementController` shouldFlip option. |
| `labeling` | `boolean` | `false` | `labeling` | **Confirmed.** When set, `syncAriaRelationship()` wires `ariaLabelledByElements` on the trigger's inner interactive element instead of `ariaDescribedByElements`. For icon-only triggers where the tooltip text is the sole accessible name and adding an accessible label to the trigger host is not possible. Re-syncs when changed while the tooltip is open. |

#### Visual matrix (2nd-gen)

Based on Figma `S2 / Web (Desktop scale)`:

| Variant | Figma label | Background token | Text |
| ------- | ----------- | ---------------- | ---- |
| `neutral` | Neutral | `--spectrum-neutral-background-color-default` | Light |
| `informative` | Informative | `--spectrum-informative-background-color-default` | Light |
| `negative` | Negative | `--spectrum-negative-background-color-default` | Light |

Orientation options confirmed in Figma:

| Orientation | Notes |
| ----------- | ----- |
| Bottom | Confirmed |
| Top (default) | Confirmed; React Spectrum default |
| Left | Confirmed |
| Right | Confirmed |
| No tip | Confirmed in Figma; **additive/deferred** |

S2 CSS adds logical placement sub-variants (`start`, `end`) not directly shown as Figma properties but required for RTL correctness.

#### Slots (2nd-gen)

| Slot | Content | Notes |
| ---- | ------- | ----- |
| default | Text label | **Confirmed.** Plain text only; no interactive content. |
| `icon` | — | **Removed.** Breaking change B1. S2 removes all icon rendering from Tooltip. |

#### CSS custom properties (2nd-gen)

No `--mod-*` properties will be exposed. New `--swc-*` component-level properties may be introduced where needed — these are additive and not breaking. See [Component Custom Property Exposure](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/02_custom-properties.md#component-custom-property-exposure) for what to expose and how.

Each exposed `--swc-*` property must be documented with a `@cssprop` JSDoc tag on the primary SWC component class.

Initial expectation for Tooltip is zero or a very small reviewed set.

### Behavioral semantics

**Automatic trigger-wiring mode:**

The `TooltipOpenable` intermediate element is an implementation detail of the 1st-gen overlay bridge and does not carry forward. Both `HoverController` and `PlacementController` are now active.

1. The tooltip uses `popover="auto"`. Built-in Esc-to-close and light-dismiss are included. Note: participates in the auto stack — opening a tooltip will close other open `auto` popovers (menus, pickers).
2. `HoverController` manages open/close timing (warm-up/cooldown using the `delay` value; default 1500ms), keyboard-focus parity (opens immediately), and the WCAG 1.4.13 pointer bridge. Wired in `Tooltip.base.ts`; target is set from `resolveTrigger()` whenever `for` or `triggerElement` changes. ARIA relationship wiring is handled by the SWC layer on `open` change, not by `HoverController`.
3. `PlacementController` handles viewport-aware pixel positioning using `offset`, `flip`, and `shift` middleware; `placement`, `offset`, `cross-offset`, `container-padding`, and `should-flip` attributes map to controller options. When the controller resolves the physical placement (including any flip), `onPlacementChange` calls `this.setAttribute('actual-placement', resolvedSide)` directly. `placement` is never mutated; it always holds the consumer's declared value. All CSS selectors for tip direction, margin spacing, and `@starting-style` animation use `[actual-placement]`. See [Decision log: D1](#decision-log) for the reasoning behind this split.
4. `Escape` closes the tooltip without moving focus via the built-in `popover="auto"` dismiss behavior.
5. New 2nd-gen event shape: `swc-open`, `swc-after-open`, `swc-close`, `swc-after-close` (B5). Events fire from listeners wired from the initial release.
6. When `manual` is set, `HoverController` wiring (hover/focus events, timing, pointer bridge) is skipped; the consumer owns open/close. ARIA relationship wiring is unaffected — it fires on `open` change whenever `for` or `trigger-element` is set.

**Trigger resolution:**

The 1st-gen `resolveSelfManagedTriggerElement()` ancestor-walking is **not ported**. With `popover="auto"`, the tooltip renders in the browser top layer regardless of its authored DOM position. The authoring pattern changes: `<swc-tooltip>` is authored as a sibling of the trigger rather than nested inside it.

Default resolution: the `for` attribute. The tooltip calls `getRootNode().getElementById(this.for)` to resolve the trigger. This is explicit in markup, not positionally inferred — the relationship is declared and visible to tooling and DevTools. If `for` is not set or the referenced ID does not exist, automatic wiring is a no-op.

The `trigger-element` setter is the explicit element reference override for cases where the trigger cannot be referenced by ID — cross-shadow-root scenarios (where `getElementById` is scoped to the wrong tree root) or programmatic insertion via the directive. When set, it takes precedence over `for`. Core declares the `triggerElement` property and its type; SWC resolves and populates it via `for` or the explicit setter. `HoverController` and `PlacementController` receive the resolved value from SWC and do not perform their own resolution. ARIA wiring is performed directly by SWC on `open` change.

With tooltip and trigger authored as siblings in the same document tree, their nodes share a root — but the accessible interactive element on a 2nd-gen button-like trigger is an inner shadow `<button>`, not the host. SWC wires the ARIA relationship to the inner element using `Element.ariaDescribedByElements` on `open` change — not a string `aria-describedby` on the host. See [ARIA relationship wiring](#aria-relationship-wiring) for the full two-path resolution.

**Trigger-mode interaction:**

| `for`/`trigger-element` set? | `manual` set? | ARIA wiring | Hover/focus |
| ---- | ---- | ---- | ---- |
| Yes | No | Fires on `open` change | `HoverController` (active) |
| Yes | Yes | Fires on `open` change | Consumer-managed |
| No | No | None; warn in debug mode | N/A |
| No | Yes | None | Consumer-managed |

**Authoring modes:**

Modes 1 and 2 use automatic hover/focus trigger wiring (`HoverController`) and pixel positioning (`PlacementController`); both are active. ARIA relationship wiring via `for` is active in all modes. Mode 3 demonstrates consumer-owned open/close.

```html
<!-- ── Mode 1: Automatic — native trigger ──────────────────────────────────
     Add id to the trigger; reference it with for on the tooltip.
     SWC resolves via for; sets ariaDescribedByElements directly on the
     native <button> on open change.                                          -->

<button id="save-btn">Save</button>
<swc-tooltip for="save-btn" placement="top">Changes will be saved</swc-tooltip>


<!-- ── Mode 1: Automatic — SWC component trigger ──────────────────────────
     Authoring is identical from the consumer's perspective. SWC internally
     resolves swc-action-button's inner shadow <button> via
     querySelector('button') and sets ariaDescribedByElements on it.          -->

<swc-action-button id="save-btn">Save</swc-action-button>
<swc-tooltip for="save-btn" placement="top">Saves all pending changes</swc-tooltip>


<!-- ── Mode 1: Automatic — icon-only trigger, preferred ───────────────────
     Add accessible-label to the trigger host and an id to reference it.
     2nd-gen components propagate accessible-label to the inner button's
     accessible name computation. Works before controllers land.              -->

<swc-action-button id="save-btn" accessible-label="Save changes">
  <!-- icon content -->
</swc-action-button>
<swc-tooltip for="save-btn" placement="top">Save changes</swc-tooltip>


<!-- ── Mode 1: Automatic — icon-only trigger, labeling attribute
     When the trigger host cannot have an accessible name added: the labeling
     attribute switches the SWC layer to set ariaLabelledByElements on the
     inner button instead of ariaDescribedByElements.                         -->

<swc-action-button id="icon-btn">
  <!-- icon content -->
</swc-action-button>
<swc-tooltip for="icon-btn" labeling placement="top">Save changes</swc-tooltip>


<!-- ── Mode 2: Explicit trigger-element ───────────────────────────────────
     For cross-shadow-root triggers or programmatic wiring where for (ID
     lookup) cannot reach the trigger due to shadow root scoping.             -->

<swc-tooltip id="save-tip" placement="top">Changes will be saved</swc-tooltip>
<script>
  document.querySelector('#save-tip').triggerElement = someShadowRoot.querySelector('#save-btn');
</script>


<!-- ── Mode 3: Manual — consumer owns open/close ──────────────────────────
     No controller wiring. Set for to keep ARIA wiring active on open change.
     Available from the initial release.                                      -->

<button id="manual-btn">Save</button>
<swc-tooltip for="manual-btn" manual placement="top" id="manual-tip">Changes will be saved</swc-tooltip>
<script>
  const btn = document.querySelector('#manual-btn');
  const tip = document.querySelector('#manual-tip');
  btn.addEventListener('mouseenter', () => { tip.open = true; });
  btn.addEventListener('mouseleave', () => { tip.open = false; });
</script>
```

**Current behavioral semantics:**

- Host element has `popover="auto"`; consumer controls visibility via the `open` property (which calls `showPopover()`/`hidePopover()` internally), directly via the popover API, or by hovering/focusing the trigger.
- Renders with correct variant, placement CSS class, and `role="tooltip"`.
- Component listens to native `beforetoggle`/`toggle`/`transitionend` events to sync `open` property and dispatch `swc-open`/`swc-after-open`/`swc-close`/`swc-after-close`. Events fire from these listeners regardless of what caused the state change (programmatic, hover, focus, Escape, or light-dismiss).
- Built-in Esc-to-close and light-dismiss via `popover="auto"`. Note: participates in the auto popover stack — opening this tooltip closes other open `auto` popovers (menus, pickers).
- `HoverController` wires `pointerenter`/`pointerleave`/`focusin`/`focusout` on the resolved trigger; manages warm-up/cooldown timing, keyboard-focus priority, and the WCAG 1.4.13 pointer bridge. The controller target is updated whenever `for` or `trigger-element` changes (via `updated()`). Suppressed when `manual` or `disabled` is set.
- On `open = true`, SWC resolves the trigger via `for` (ID lookup in the same root) or `trigger-element` (explicit reference) and sets `Element.ariaDescribedByElements = [tooltipHost]` on the trigger's interactive surface. Removed on `open = false`. See [ARIA relationship wiring](#aria-relationship-wiring).
- `PlacementController` handles pixel positioning. On open, it receives the resolved trigger and the tooltip host, computes `{ x, y }` via Floating UI, and applies `top: 0; left: 0; translate: Xpx Ypx` to the host. When `flip` repositions to a different side, `onPlacementChange` calls `this.setAttribute('actual-placement', resolvedSide)` directly. `placement` is never mutated — it always holds the consumer's declared value. All `[actual-placement]` CSS selectors pick up the resolved value for tip direction, margin spacing, and `@starting-style` animation.
- The tip element (`<span class="swc-Tooltip-tip">`) is CSS-centered on the edge determined by the `actual-placement` attribute. Because `actual-placement` is always a resolved physical side, the tip direction and enter animation are always correct.
- `offset`, `cross-offset`, `container-padding`, and `should-flip` are all active API that feed directly into `PlacementController` options.

### Accessibility semantics notes (2nd-gen)

- `role="tooltip"` is set on the host element itself in Core's `connectedCallback` (SWC-1558). The host is the tooltip surface; it is the element passed to `ariaDescribedByElements` (or `ariaLabelledByElements` when `labeling` is set) on the trigger's inner interactive element.
- Tooltip text is never in the Tab order; focus always stays on the trigger.
- Closed tooltips must be removed from the accessibility tree (the native `popover` attribute handles visibility but verify AT behavior across browsers).
- `Escape` must close without trapping or moving focus.
- Variant colors are not the sole conveyance of meaning; tooltip text itself carries the message per WCAG 1.4.1.
- High-contrast mode: explicit `1px solid transparent` border in base styles; forced-colors mode automatically fills `transparent` with `CanvasText`.
- No `aria-live` for routine tooltip toggles; `ariaDescribedByElements` wiring provides the accessible relationship without live-region announcements.
- Tooltips must respond to both hover and keyboard focus. React Spectrum's `trigger="focus"` (focus-only mode) is not applicable here: WCAG 1.4.13 requires the tooltip to be available via pointer hover, so restricting to focus-only would fail mouse users. Both trigger methods are always active in automatic mode.
- Toggletip mode (touch/longpress disclosure pattern, SWC-2022) is not applicable for the 2nd-gen Tooltip. Consumers needing toggletip behavior should use `swc-popover` or a popover-derived component instead.

### ARIA relationship wiring

The SWC layer uses `Element.ariaDescribedByElements` to wire the ARIA relationship between the trigger and tooltip on `open` change. This API was chosen specifically because 2nd-gen button-like components render a semantic `<button>` inside their shadow DOM — the inner button is the AT-facing interactive element, not the host. A string `aria-describedby` attribute on the trigger host cannot reference an element across a shadow boundary; `ariaDescribedByElements` uses element references that bypass cross-root ID scoping. String-ID `aria-describedby` on the host must not be used as a fallback.

The SWC layer resolves the interactive surface from the trigger via two paths:

- **SWC components** (open shadow root): `trigger.shadowRoot.querySelector('button')` — the inner `<button>` is the AT-facing surface; the tooltip host is passed as the reference: `innerButton.ariaDescribedByElements = [tooltipHost]`
- **Native elements** (`<button>`, `<a>`, `<input>`, etc.) and any element without an open shadow root: the trigger host element is used directly

Both paths apply whether the trigger was resolved via `for` or an explicit `trigger-element`. The association is removed on close.

**Browser support:** Confirmed across all target browsers — Chrome/Edge 135+ (validated 140+), Firefox 136+ (validated 146+), Safari 16.4+ (validated 16.5+). Baseline: Newly Available April 2025. Validated with NVDA and VoiceOver. See [POC CodePen](https://codepen.io/spectrum-css/pen/pvNEVda?editors=0010).

#### Icon-only triggers

`ariaDescribedByElements` is the correct default when the trigger already has an accessible name — the tooltip supplements it. For icon-only buttons where the tooltip text is the sole accessible name, `ariaDescribedByElements` alone leaves the inner button without a name, which is a WCAG 4.1.2 failure.

Two resolution paths, in order of preference:

1. **Add an accessible name to the trigger host.** On native elements, use `aria-label`. On 2nd-gen SWC components, use the `accessible-label` attribute — it propagates to the inner button's accessible name computation. This works before controllers land and does not require the `labeling` attribute on the tooltip.
2. **Set `labeling` on the tooltip** when the trigger host cannot be modified. The SWC layer sets `ariaLabelledByElements = [tooltipHost]` on the inner button instead of `ariaDescribedByElements`. Active from the initial release.

`role="tooltip"` is retained when `labeling` is set. Suppressing it conditionally adds complexity for marginal semantic gain. Document both paths in the Accessibility story.

---

## Architecture: core vs SWC split

> The 1st-gen component is a **reference only** — 2nd-gen is built independently. Neither generation imports from the other.

Follow the [Badge migration reference](../../02_workstreams/02_2nd-gen-component-migration/02_step-by-step/01_washing-machine-workflow.md#reference-badge-migration) as the concrete pattern for the core/SWC split.

| Layer | Path | Contains |
| ----- | ---- | -------- |
| **Core** | `2nd-gen/packages/core/components/tooltip/` | `Tooltip.base.ts`, `Tooltip.types.ts`: property declarations (including `triggerElement`), type validation, state management, accessible-name rules. Sets `role="tooltip"` and `popover="auto"` in `connectedCallback`. Wires `beforetoggle`/`toggle`/`transitionend` event listeners for state sync and `swc-open`/`swc-after-open`/`swc-close`/`swc-after-close` dispatch. Wires a `keydown` listener on `document` for Escape testability (belt-and-suspenders; native `popover="auto"` dismiss is the primary mechanism). Resolves trigger via `for` (ID lookup) or `triggerElement` (explicit reference). Maintains `ariaDescribedByElements` (or `ariaLabelledByElements` when `labeling` is set) on the trigger's inner interactive element on `open` and `labeling` changes. Instantiates and manages `HoverController` (hover/focus wiring, warm-up/cooldown, pointer bridge, `disabled`/`manual` guards) and `PlacementController` (pixel positioning, flip, `offset`/`cross-offset`/`container-padding`/`should-flip` options). No rendering. |
| **SWC** | `2nd-gen/packages/swc/components/tooltip/` | `Tooltip.ts`, `tooltip.css`: rendering only (tip element, default slot). Overrides `tipElement` getter to return `.swc-Tooltip-tip` from the shadow DOM for `PlacementController`'s `arrow` middleware. Element registration (`swc-tooltip`). Stories, tests, consumer migration guide. |

Planned rendering shape (initial release):

- Core sets `role="tooltip"` and `popover="auto"` on the host element in `connectedCallback`. The host element IS the tooltip surface and the popover; no inner role-bearing container needed.
- SWC renders: tip element (`<span class="swc-Tooltip-tip">`); label span with default slot.
- Core wires the ARIA relationship on `open` change: resolves trigger via `for`/`trigger-element`, applies inner-button resolution (see [ARIA relationship wiring](#aria-relationship-wiring)), and sets `Element.ariaDescribedByElements = [tooltipHost]` on the resolved interactive surface. Removed on `open = false`. Active in both automatic and manual modes when `for` or `trigger-element` is set.

**Resolved:** Ancestor-walking (`resolveSelfManagedTriggerElement()`) is not ported. 2nd-gen trigger resolution uses the `for` attribute (`getRootNode().getElementById(this.for)`) as the primary declarative mechanism, or the explicit `trigger-element` property for cross-shadow-root and programmatic cases — both implemented in Core. `HoverController` and `PlacementController` receive the resolved value from Core and do not perform resolution themselves.

---

## Controller integration assumptions

This section records the design contract between the initial release and the two additive-phase controllers, so the integration can proceed without refactoring initial release internals.

### Event dispatch ownership

`swc-open`, `swc-after-open`, `swc-close`, and `swc-after-close` fire from the native `beforetoggle`/`transitionend` event listeners in the Core base class (`Tooltip.base.ts`) — not from property setters or controllers. This means:

- Events fire regardless of what caused the state change: consumer code, `HoverController` calling `showPopover()`, Escape, or light-dismiss.
- `HoverController` can drive open/close without risking double-dispatch or missed events.
- This is a hard constraint for the implementation: deviating from it (e.g., dispatching from a property setter as well) will cause double-dispatch in the additive phase.

**Mapping — popover events → `swc-*` events:**

| Popover event | Condition | SWC event dispatched |
| ------------- | --------- | -------------------- |
| `beforetoggle` | `newState === 'open'` | `swc-open` |
| `toggle` | `newState === 'open'` | *(internal state sync only — no external event)* |
| `transitionend` on host | after open transition completes | `swc-after-open` |
| `beforetoggle` | `newState === 'closed'` | `swc-close` |
| `toggle` | `newState === 'closed'` | *(internal state sync only — no external event)* |
| `transitionend` on host | after close transition completes | `swc-after-close` |

`swc-after-open` and `swc-after-close` require a `transitionend` listener on the host. If no CSS transition is present (e.g., during testing or when `prefers-reduced-motion: reduce` removes it), the listener will never fire — guard this by also dispatching `swc-after-open`/`swc-after-close` from the `toggle` handler if no `transitionend` follows within a short frame, or by checking `getComputedStyle(this).transitionDuration === '0s'` before deciding whether to wait.

**`open` property ↔ popover API cycle prevention:**

`open` is a plain Lit `@property`. `showPopover()`/`hidePopover()` are called from `updated()`, not from a custom setter. The cycle is prevented by comparing `this.open` against the live `:popover-open` CSS state (`isPopoverOpen`) before calling the API:

```ts
// In updated():
if (changedProperties.has('open')) {
  if (this.open !== this.isPopoverOpen) {
    if (this.open) {
      this.showPopover();
    } else {
      this.hidePopover();
    }
  }
}
```

The `toggle` listener assigns through the normal property setter (`this.open = isOpen`), guarded by a `if (isOpen !== this.open)` check to skip no-op assignments. After the browser fires `toggle`, `isPopoverOpen` already matches the new state, so the `updated()` guard blocks the redundant API call — no backing-field bypass needed.

```ts
// In the toggle listener:
if (isOpen !== this.open) {
  this.open = isOpen; // triggers updated(); isPopoverOpen guard prevents re-calling showPopover/hidePopover
}
```

### `HoverController` hand-off

**Implemented.** `TooltipBase` now `implements HoverControllerHost` and instantiates `HoverController` with `warmStateKey: 'swc-tooltip'`. The controller target is set via `updated()` whenever `for` or `triggerElement` changes. See `Tooltip.base.ts` and the [addendum](#addendum-hovercontroller-interface-requirements) for the interface contract that was used.

### `PlacementController` hand-off

**Implemented.** `Tooltip.base.ts` instantiates `PlacementController`, calls `start(trigger, this, options)` when the tooltip opens (in `updated()` when `open` becomes `true`), and calls `stop()` when it closes. `start()` is also called on options changes (`placement`, `offset`, `crossOffset`, `containerPadding`, `shouldFlip`, `for`, `triggerElement`) while open.

`onPlacementChange` calls `this.setAttribute('actual-placement', resolvedSide)` directly — bypassing Lit's property system because `actual-placement` is internal CSS-only state, not a consumer-facing API. `placement` is never mutated — the consumer's declared value is always preserved. All CSS selectors for tip direction, margin spacing, and `@starting-style` entrance animation use `[actual-placement]`.

`PlacementController.start()` fires `onPlacementChange` synchronously (direction-resolved, before the async `autoUpdate` loop starts), and `Tooltip.base.ts` calls `startPlacement()` before `showPopover()` in `updated()`. This ensures `actual-placement` is set before `showPopover()` and before `@starting-style` is evaluated, so the entrance animation always travels from the correct direction — even on a flip. This resolves the known limitation that was tracked as A13.

No arrow middleware is used — the tip is CSS-centered on the computed side. `PlacementController` only layers pixel positioning on top of the existing `popover="auto"` mechanism.

### Auto-stack behavior

`popover="auto"` participates in the browser's auto popover stack from the initial release. Opening a tooltip **dismisses any other open `auto` popover** — menus, pickers, selects, and other tooltips.

**This is a UX regression from 1st-gen.** In 1st-gen, `sp-overlay type="hint"` was intentionally isolated: opening a tooltip left menus and pickers open, and a tooltip was only closed by Escape or by another `hint`-type overlay opening on the same trigger. `popover="auto"` has no equivalent isolation tier.

The impact is most acute in the additive phase, when `HoverController` will call `showPopover()` on hover — hovering a trigger next to an open picker will close the picker. The initial release is unaffected (no hover wiring).

**Resolved (Path A):** The auto-stack behavior is accepted. This is a known difference from 1st-gen and must be documented in the consumer migration guide and the Behaviors story.

---

## Migration checklist

### Preparation (this ticket)

- [x] 1st-gen API surface documented
- [x] Dependencies identified
- [x] Breaking changes documented
- [x] 2nd-gen API decisions drafted
- [x] Plan reviewed by at least one other engineer

### Setup

- [x] Create `2nd-gen/packages/core/components/tooltip/`
- [x] Create `2nd-gen/packages/swc/components/tooltip/`
- [x] Wire exports in both `package.json` files
- [x] Confirm `spectrum-css` is checked out at `spectrum-two` branch as sibling directory (confirmed present at `../../../../../spectrum-css/`)

### API

#### Naming and public surface

- [x] `Tooltip.types.ts`: define `TooltipVariant` (`'neutral' | 'informative' | 'negative'`); define `TooltipPlacement` (all physical + logical values)
- [x] `Tooltip.base.ts`: define all properties with decorators (including `for` and `triggerElement` declarations); assign `role="tooltip"`; no rendering. No DOM traversal logic.
- [x] `Tooltip.base.ts` (Core): `popover="auto"` and `role="tooltip"` set via `connectedCallback`; `beforetoggle`/`toggle`/`transitionend` and `document` `keydown` listeners wired; trigger resolution via `for`/`triggerElement`; ARIA relationship wiring (`ariaDescribedByElements` / `ariaLabelledByElements`) on `open` and `labeling` changes; `HoverController` and `PlacementController` instantiated and managed in `updated()` and `connectedCallback`/`disconnectedCallback`.
- [x] `Tooltip.ts` (SWC): rendering only — `render()` returns tip element and default slot; `tipElement` getter override returns `.swc-Tooltip-tip` for arrow middleware; CSS via `tooltip.css`.

#### 1st-gen deprecation notices

- [x] `@deprecated` JSDoc on `selfManaged` property; runtime warn in existing `connectedCallback` code path when `selfManaged` is true
- [x] `@deprecated` JSDoc on `tipPadding` property (no existing setter; JSDoc only)
- [x] Runtime deprecation warns in existing `variant` setter for `'info'` (renamed) and `'positive'` (removed)

#### Alignment checks

- [x] Core vs SWC split confirmed: Core declares `triggerElement` property; SWC resolves trigger via `for` attribute (ID lookup) or explicit `trigger-element` — no ancestor-walking

### Styling

> Follow the [CSS style guide](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/) as the source of truth for all styling work. Key references: [migration steps](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/04_spectrum-swc-migration.md), [custom properties](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/02_custom-properties.md), [anti-patterns](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/05_anti-patterns.md).

- [x] Add `.swc-Tooltip` to the internal semantic container in `render()`; keep styling off `:host`
- [x] Copy S2 source from `spectrum-css/components/tooltip/index.css` (`spectrum-two` branch, not `/dist`) into `tooltip.css` as baseline
- [x] Map Spectrum CSS selectors to SWC equivalents following CSS selector guidance in CONTRIBUTOR_DOCS
- [x] Remove `.spectrum-Tooltip-typeIcon` styles (no icon in S2)
- [x] Add all six logical placement classes, consolidated with their non-logical equivalents: `start`, `end`,
- [x] Verify CJK language modifiers (`:lang(ja)`, `:lang(ko)`, `:lang(zh)`)
- [x] Verify visibility in WHCM — `1px solid transparent` border in base; `CanvasText` fill on tip in forced-colors
- [x] Add `@cssprop` JSDoc tag for `--swc-tooltip-background-color` on the SWC `Tooltip` class — the only exposed `--swc-*` property; set by variant rules for informative and negative, overridable by consumers
- [x] Pass stylelint (property order, `no-descending-specificity`, token validation)
- [x] Tip-element CSS, margin spacing, and `@starting-style` animation all use `[actual-placement]` attribute selectors (physical cardinal sides only: `top`, `bottom`, `left`, `right`). RTL is handled by `PlacementController` resolving logical `start`/`end` to physical sides before writing `actual-placement`; no `:dir(rtl)` CSS rules are needed in `tooltip.css`. Logical `start`/`end` CSS selectors and all `:dir(rtl)` overrides were removed when `actual-placement` was introduced (see [Decision log: D1](#decision-log)).

#### Visual model and regressions

- [X] Confirm neutral, informative, negative backgrounds match Figma **(requires Storybook visual review)**
- [X] Verify tip geometry across all placement values, including RTL for logical placements (`start`, `end`) **(logic fixed; requires Storybook visual review)**
- [X] Verify open/close animation **(requires Storybook visual review).** Final open state has no CSS transform (PlacementController owns geometry via `translate`). `@starting-style` shifts the bubble toward the trigger by `--_swc-tooltip-animation-distance` (driven by `offset`, not a static token) so the animation travels from the trigger outward to the resting position.

### Accessibility

#### Naming and semantics

- [x] `role="tooltip"` set on the host element via `connectedCallback` in Core base class (SWC-1558)
- [skip] Stable, unique `id` per instance — deliberate skip; consumer provides `id` on the trigger element via the `for` attribute relationship; the tooltip's own `id` is the consumer's responsibility; internal ARIA wiring uses `ariaDescribedByElements` (element references) and does not require a string id
- [x] `Element.ariaDescribedByElements` set on the trigger's inner interactive element (via `querySelector('button')`, or host element fallback) when tooltip opens; removed on close (see [ARIA relationship wiring](#aria-relationship-wiring))
- [x] Document `Element.ariaDescribedByElements` inner-button approach and browser support in Accessibility story (see [Accessibility semantics notes](#accessibility-semantics-notes-2nd-gen)) **(Phase 7 — documentation)**

#### State verification

- [x] `[open]` reflects on host when tooltip is visible
- [x] `[disabled]` prevents automatic mode from responding to hover/focus events
- [x] Closed tooltip is hidden from AT (`popover` attribute or explicit `aria-hidden`/`inert`)
- [x] `Escape` closes tooltip; focus stays on trigger; no focus trap — handled by native `popover="auto"`
- [x] Pointer can move from trigger to tooltip bubble without tooltip closing (WCAG 1.4.13) — `HoverController` pointer bridge
- [x] High-contrast border present in forced-colors mode
- [x] Variant colors paired with readable text (not relying on color alone)

### Testing

- [x] Port `1st-gen/packages/tooltip/test/tooltip.test.ts` coverage that still applies
- [x] Do not port `1st-gen/packages/tooltip/test/tooltip-directive.test.ts` — directive is deferred; tests will be written fresh against the 2nd-gen directive when it ships
- [x] Add Playwright `tooltip.a11y.spec.ts` with `toMatchAriaSnapshot`

#### Behavior

- [x] Renders with correct variant, placement, open/closed state (`OverviewTest`, `PropertyMutationTest`, `OpenCloseTest`)
- [x] `swc-open`, `swc-after-open`, `swc-close`, `swc-after-close` events dispatched correctly when `open` changes (`LifecycleEventsTest`)
- [x] `Escape` closes tooltip when open; focus remains on trigger (`EscapeClosesTest`)
- [x] ARIA wiring: `for="[id]"` resolves trigger and sets `ariaDescribedByElements = [tooltipHost]` on the trigger's inner `<button>` (open shadow root) when `open = true`; removed when `open = false` (`AriaWiringSwcTriggerTest`)
- [x] ARIA wiring: when trigger has no open shadow root (native element), `ariaDescribedByElements` is set on the trigger host element (`AriaWiringNativeTest`)
- [x] ARIA wiring: `trigger-element` setter overrides `for` and drives the same wiring (`AriaWiringTriggerElementOverrideTest`)
- [x] ARIA wiring: no wiring when neither `for` nor `trigger-element` is set; no error thrown (`AriaWiringNoTriggerTest`)
- [x] ARIA wiring: fires in manual mode when `for` is set and consumer sets `open = true` (`AriaWiringManualModeTest`)
- [x] Automatic mode: opens on trigger hover; closes on pointer leave (`HoverOpensTest`)
- [x] Automatic mode: opens on trigger `focusin`; closes on `focusout` (`FocusOpensTest`)
- [x] Automatic mode: pointer can move to tooltip bubble without closing (WCAG 1.4.13) — `HoverController` pointer bridge; covered by hover-controller test suite
- [x] Automatic mode: `for` attribute resolves to the element with the matching `id` in the same document tree root — covered implicitly by `HoverOpensTest` (uses `for="tt-hover-trigger"`) and `AriaWiringNativeTest`/`AriaWiringSwcTriggerTest`
- [x] `for` pointing to a non-existent `id` results in no trigger wiring (no-op); warns in debug mode (`ForIdNotFoundWarningTest`)
- [x] Automatic mode: `trigger-element` takes precedence over `for` when both are set — ARIA path tested by `AriaWiringTriggerElementOverrideTest`; hover routing tested by `TriggerElementOverridesForHoverTest`
- [x] Automatic mode: `trigger-element` wires HoverController when `for` is absent — `TriggerElementHoverTest` (hover opens, ARIA wires to native trigger, closes on pointer leave)
- [x] Automatic mode: `trigger-element` wires correctly for cross-shadow-root trigger relationships — implementation complete (`triggerElement` bypasses `getElementById` scoping); not explicitly tested with a cross-root fixture
- [x] Automatic mode: `delay="0"` shows immediately on hover (`HoverOpensTest`); full 1500ms warm-up/cooldown timing covered by hover-controller test suite
- [x] Automatic mode: `for` resolves correctly when trigger and tooltip share a shadow root (`ShadowRootScopeTest` — creates trigger + tooltip inside `attachShadow({ mode: 'open' })`; verifies `getRootNode().getElementById` scopes to the shadow root and ARIA wiring reaches the native trigger)
- [x] `manual` attribute: controller wiring is skipped; consumer-driven `open` changes still work; ARIA wiring still fires (`ManualPreventsHoverTest`, `AriaWiringManualModeTest`)
- [x] `labeling` attribute: `ariaLabelledByElements` is set on the inner interactive element instead of `ariaDescribedByElements`; stale references in the opposite property are cleaned up; re-syncs when `labeling` changes while open (`AriaWiringLabelingTest`)
- [x] `ariaDescribedByElements` wiring: verify AT can traverse the association in DevTools Accessibility panel and with NVDA/VoiceOver — **manual verification required; cannot be automated**
- [x] `ariaDescribedByElements` wiring fallback: when trigger has no shadow root (native `<button>`, `<a>`, `<input>`), association is established on the host element directly (`AriaWiringNativeTest`)
- [x] `disabled` attribute prevents automatic mode response to user input (`DisabledPreventsHoverTest`)

#### Visual regression

- [x] VRT for all 3 variants (neutral, informative, negative) × all cardinal placements (top, bottom, left, right) (`VariantsTest` + `PlacementsTest` open steps)
- [x] VRT for at least one logical placement (start, end) verifying RTL behavior (`LogicalPlacementRTLTest`, `PlacementsTest` opens `start`/`end`)
- [x] VRT for open and closed states with transition (`Open` story play, plus closed state from all stories without play)
- [x] VRT for forced-colors / high-contrast mode (`ForcedColorsOpenTest`)
- [x] VRT for CJK line-height at `:lang(ja)` or `:lang(ko)` (`CJKLineHeightTest`)

### Documentation

#### General

- [x] JSDoc on all public properties, slots, and any exposed CSS custom properties
- [x] Stories: Playground, Overview, Anatomy (default slot), Options (variants, placements), States (open, disabled, manual), Accessibility, Behaviors (Events, TriggerElement, Labeling). Hover/focus/delay/disabled/pointer-bridge items documented in `Behaviors → Hover and focus` prose section of `tooltip.mdx` (no dedicated canvas story). `TriggerElement` story demonstrates programmatic wiring via the property.

#### Breaking changes

- [x] Consumer migration guide: remove all `slot="icon"` usage (B1)
- [x] Consumer migration guide: replace `variant="positive"` with `variant="informative"`, `variant="neutral"`, or `variant="negative"` as content warrants (B2)
- [x] Consumer migration guide: update `variant="info"` → `variant="informative"` (B3)
- [x] Consumer migration guide: remove `sp-opened`/`sp-closed` listeners; add `swc-open`/`swc-after-open`/`swc-close`/`swc-after-close` listeners as needed (B5)
- [x] Consumer migration guide: note event timing change — native popover lifecycle fires at different points than the 1st-gen overlay sequence (B5)
- [x] Consumer migration guide: remove `self-managed` attribute from all existing tooltip usage; automatic trigger wiring is on by default with no attribute required; add `manual` only when programmatic open/close control is needed (B6)
- [x] Consumer migration guide: authoring pattern change — move `<sp-tooltip>` out of the trigger component (1st-gen pattern); add `id` to the trigger element and `for="[id]"` to the tooltip; the tooltip may be placed anywhere in the same document tree root (additive phase)
- [x] Consumer migration guide: for cross-shadow-root triggers or programmatic wiring where ID resolution cannot reach the trigger, set the `trigger-element` property to a direct element reference (additive phase)
- [x] Consumer migration guide: document that `popover="auto"` auto-stack behavior differs from 1st-gen `type="hint"` isolation — opening a tooltip closes other open auto popovers (menus, pickers); this is accepted behavior, not a bug
- [x] Behaviors story: note the auto-stack behavior and that it is expected (Q2 resolved, Path A)

#### Accessibility documentation

- [x] Storybook Accessibility story: document ARIA features (`role="tooltip"`, `ariaDescribedByElements` / `ariaLabelledByElements` lifecycle, inner-button resolution), keyboard behavior (`Escape` closes without moving focus; `Tab` blur dismisses), and screen reader expectations (trigger announced first, tooltip text second)
- [x] No interactive content (links, buttons, focusable elements) may appear inside `role="tooltip"`; direct consumers to `swc-popover`, contextual help, or dialog for those patterns
- [x] `aria-describedby` semantics: tooltip text supplements the trigger's accessible name — do not use tooltip to duplicate what `aria-label`/`aria-labelledby` already conveys; document opt-out semantics (SWC-1465)
- [x] Tooltip must be placed on a focusable trigger; non-interactive elements (static text, decorative icons) require contextual help instead
- [x] Variant colors are supplementary: pair each variant with readable text; meaning must not rely on color alone (WCAG 1.4.1)
- [x] Touch guidance: tooltip is hover/focus only; direct consumers to `swc-popover` or contextual help for explicit disclosure on touch devices
- [x] No auto-dismiss timer: tooltip must remain visible until the user dismisses it or the triggering state becomes invalid (WCAG 1.4.13)
- [x] Icon-only trigger pattern: document in Accessibility story that (1) adding an accessible name directly to the trigger host (`aria-label` on native elements; `accessible-label` attribute on 2nd-gen SWC components) is preferred; (2) the `labeling` attribute switches the SWC layer to wire `aria-labelledby` for cases where the trigger host cannot be modified; (3) semantic difference between labeling and describing explained
- [x] Verify 200% zoom: tooltip does not obscure critical UI

### Review

- [x] `yarn lint:2nd-gen` passes (ESLint, Stylelint, Prettier) — no errors in tooltip files; pre-existing `jsdoc/valid-types` warnings on `@fires` tags are project-wide and not tooltip-specific
- [x] Status table in workstream doc updated (Tooltip row shows ✓ in all columns)
- [x] PR created with description referencing Epic SWC-2017
- [x] Follow-on ticket created: PlacementController integration (link from this PR)
- [x] Follow-on ticket created: HoverController integration (link from this PR)
- [x] Follow-on ticket created: `tooltip-directive` 2nd-gen — SWC-2279
- [x] Follow-on ticket created: `no-tip` attribute, gated on React Spectrum signal — SWC-2278
- [x] Peer engineer sign-off

---

## Blockers and open questions

| # | Item | Blocking? | Status | Owner |
| --- | ---- | --------- | ------ | ----- |
| Q1 | **`tip-padding` semantics.** In 1st-gen, `tipPadding` was passed to `sp-overlay` for tip position calculation. **Resolved.** The 1st-gen `tip-padding` attribute is not exposed. The `arrow` middleware IS used (via `Tooltip.ts` overriding `tipElement` to return the shadow-DOM `.swc-Tooltip-tip` element), which keeps the tip aligned with the trigger center when the bubble shifts from `crossOffset` or viewport `shift` middleware. The `tipPadding` option on `PlacementOptions` uses the controller's default of 8px; no consumer-facing attribute is exposed unless override needs emerge. | N/A | Resolved | Team |
| Q2 | **`popover="auto"` stack isolation regression.** In 1st-gen, `type="hint"` overlays were isolated — opening a tooltip did not dismiss open menus or pickers. `popover="auto"` has no isolation tier; any auto popover opening dismisses all others. **Resolved: Path A accepted.** The behavior is documented as a known difference from 1st-gen. No workaround; document in consumer migration guide and Behaviors story. | N/A | Resolved | Team |

### Deferred implementation tickets

Create these tickets before this migration PR closes. Link each to Epic SWC-2017.

| Ticket | Summary | Why deferred | Plan sections |
| ------ | ------- | ------------ | ------------- |
| ~~SWC-2210~~ | ~~**Integrate PlacementController into Tooltip.**~~ | **Shipped.** `PlacementController` wired in `Tooltip.base.ts`; `start()`/`stop()` called on `open` changes; `onPlacementChange` calls `setAttribute('actual-placement', resolvedSide)` directly; `placement` is never mutated and always holds the consumer's declared value. All `[actual-placement]` CSS selectors handle tip direction, margin spacing, and `@starting-style` animation. `offset`, `cross-offset`, `container-padding`, and `should-flip` feed directly into controller options. | ~~Additive A1 (positioning), A7, A8, A9~~ |
| ~~SWC-2210~~ | ~~**Integrate HoverController into Tooltip.**~~ | **Shipped.** `TooltipBase` implements `HoverControllerHost`; `HoverController` wired with `warmStateKey: 'swc-tooltip'`; target set from `resolveTrigger()` in `updated()`. Hover/focus wiring, warm-up/cooldown, `disabled` guard, and WCAG 1.4.13 pointer bridge are all active. | ~~Additive A1 (hover/focus), A2, A3, A4~~ |
| SWC-2279 | **2nd-gen tooltip-directive.** Lit directive for programmatic tooltip insertion. Creates `<swc-tooltip>` as a sibling of the target and handles lifecycle cleanup. Simpler than 1st-gen: no `sp-overlay` wrapper needed; automatic trigger wiring activates because `manual` is not set. | Both controllers are now active; this can proceed. | Additive A6 |
| SWC-2278 | **`no-tip` attribute.** Remove the directional tip arrow. Figma-confirmed. Can proceed independently of controller integration; no controller dependency. Create when React Spectrum adds support as a confirming signal. | No cross-framework confirmation yet; Figma-only signal is not sufficient to ship. | Additive A5 |

---

## Addendum: HoverController interface requirements

> **Implemented.** `HoverController` has been extracted to `@spectrum-web-components/core/controllers/hover-controller` and integrated into `Tooltip.base.ts`. This section is retained as a historical record of the interface contract that drove the controller's design.

This section captures what Tooltip requires from `HoverController`. It is a separate body of work — not part of the core Tooltip migration — but is recorded here so the controller's design is informed by a concrete consumer.

### Scope

**Responsible for:**

- Receiving the resolved trigger element from SWC (`for` lookup or `trigger-element` setter) — no internal trigger discovery
- Attaching `pointerenter`/`pointerleave` and `focusin`/`focusout` listeners to the resolved trigger
- Driving open/close by calling `showPopover()`/`hidePopover()` on the host — never toggling `open` directly
- Warm-up/cooldown timing using `this.host.delay` (pointer events only; see state machine below)
- `disabled` guard: skip hover/focus wiring when the host has `disabled` set
- WCAG 1.4.13 pointer bridge: keep the tooltip open when the pointer moves from the trigger into the bubble
- Skipping all wiring when `manual` is set on the host

**Not responsible for:**

- ARIA relationship wiring (`ariaDescribedByElements` / `ariaLabelledByElements`) — handled by the SWC layer on `open` change
- `swc-*` event dispatch — handled by the existing `toggle`/`transitionend` listeners on the host
- Trigger resolution — receives the resolved element from SWC

### Warm-up / cooldown state machine

Warm-up/cooldown applies to **pointer events only**. `focusin` (when `trigger.matches(':focus-visible')`) shows the tooltip immediately; `focusout` hides it immediately. Neither focus event touches timer state.

| Event | Action |
| ----- | ------ |
| `pointerenter` | Cancel any cooldown timer. If `delay === 0` or `isWarm`: `showPopover()`. Otherwise start `delay`ms warmup timer; on fire: `isWarm = true`, `showPopover()`. |
| `pointerleave` | Cancel any warmup timer. `hidePopover()` if open. If `delay > 0`: start `delay`ms cooldown timer; on fire: `isWarm = false`. |
| `focusin` (`:focus-visible`) | `showPopover()` immediately. No timer state changes. |
| `focusout` | `hidePopover()` immediately. No timer state changes. |
| Escape / light-dismiss | `toggle` listener sets `this.open = false`. Cooldown starts on `pointerleave`, not close — no interference. |

The `:focus-visible` guard on `focusin` prevents a double-show when a pointer click both focuses and triggers `pointerenter`.

### Warm state storage

`HoverController` is a `ReactiveController` — one instance per component instance. Warm state cannot live on the instance. It must live on `document`, accessed via a `Symbol.for()` key so it is shared across all instances regardless of how many bundles have loaded the controller.

```ts
const key = Symbol.for(`swc-hover-state:${warmStateKey}`);

type WarmState = { isWarm: boolean; cooldownTimer: ReturnType<typeof setTimeout> | null };

function getWarmState(doc: Document, key: symbol): WarmState {
  const d = doc as Document & { [key: symbol]: WarmState | undefined };
  if (!d[key]) d[key] = { isWarm: false, cooldownTimer: null };
  return d[key]!;
}
```

Keying on `Document` (not `Window`) gives each iframe its own independent state.

### Warm state scoping across component types

If `HoverController` is used by more than one component type, each type must have its own independent warm state. A user hovering over a menu trigger should not warm up tooltip state.

The controller is initialized with a stable string identifier provided by the host component type. The identifier is used to namespace the `Symbol.for()` key:

```ts
// In Tooltip (static, per component type — not per instance):
static readonly warmStateKey = 'swc-tooltip';

// In HoverController constructor options:
const key = Symbol.for(`swc-hover-state:${options.warmStateKey}`);
```

All `swc-tooltip` instances share one `Symbol.for('swc-hover-state:swc-tooltip')` state object on `document`. A future component using `HoverController` with a different `warmStateKey` gets its own independent state.

---

## Decision log

Decisions made after the initial plan was approved and implementation had begun. Each entry records what changed, why, and how it affects the plan.

### D1: `actual-placement` attribute — split consumer intent from resolved physical side

**Phase:** Review (Phase 8)  
**Trigger:** PR reviewer feedback.

**Original design:** `PlacementController.onPlacementChange` mutated `this.placement` to hold the resolved physical side. A `_placementFromController` flag guarded the setter to prevent overwriting `_requestedPlacement` (the consumer's declared value). All CSS selectors used `[placement]`.

**Problem:** The `placement` attribute changing under the consumer is surprising. A consumer who sets `placement="start"` and later reads the attribute back gets `"right"` (or `"left"` in LTR). This breaks the principle that a reflected attribute holds what the consumer declared.

**Decision:** Keep `placement` as the consumer's declared intent; it is never mutated by the controller. Add a new DOM attribute `actual-placement` managed entirely via direct `setAttribute`/`removeAttribute` — not a Lit `@property`, not in the public API or CEM. `Tooltip.base.ts` sets it synchronously before `showPopover()` (initial declared side) and `onPlacementChange` overwrites it once `computePlacement()` resolves (resolved physical side). The value is always a physical cardinal side: `top | bottom | left | right`. All CSS selectors for tip direction, margin spacing, and `@starting-style` animation were moved to `[actual-placement]`. Logical `start`/`end` CSS rules and all `:dir(rtl)` overrides were removed — RTL resolution is handled entirely by `PlacementController.start()` calling `toFloatingPlacement()` before writing `actual-placement`.

**Cleared after exit transition:** `actual-placement` is removed by `clearPositioningState()` (called from `dispatchAfterEvent(false)`) after the exit transition completes. It is not cleared at `hidePopover()` time — clearing there would cause a CSS selector change while the tooltip is still visible and fading out, potentially flipping the tip direction or margin during the animation. The attribute is set fresh on the next open.

**Animation timing:** `PlacementController.start()` now fires `onPlacementChange` synchronously (direction-resolved) before the async `autoUpdate` loop begins. `Tooltip.base.ts` calls `startPlacement()` before `showPopover()` in `updated()`. This guarantees `actual-placement` is set before `showPopover()` — and therefore before `@starting-style` is evaluated by the browser — resolving the A13 known limitation from the original plan.

**Files changed:** `Tooltip.types.ts`, `Tooltip.base.ts`, `tooltip.css`, `placement-controller.ts`, `tooltip.test.ts`.

---

### D2: VRT play functions — `getComputedStyle(opacity)` poll instead of `swc-after-open`

**Phase:** Review (Phase 8)  
**Trigger:** Chromatic VRT snapshots not showing the tooltip in its open state.

**Root cause:** `swc-after-open` fires from a `transitionend` listener on the tooltip host. For `popover="auto"` top-layer elements in Chromatic's headless browser, `transitionend` is unreliable — it does not fire consistently. Three approaches were tried and failed: `userEvent.tab()`, `tooltip.open = true + waitFor(':popover-open')`, and `swc-after-open` event listener.

**Decision:** Poll `getComputedStyle(tooltip).opacity === '1'` inside Vitest's `waitFor`. The `:host(:popover-open) { opacity: 1 }` rule in the shadow DOM CSS makes computed opacity a reliable indicator that the tooltip is fully visible and the entrance transition has completed. The poll also checks `tooltip.matches(':popover-open')` to confirm the popover is in the top layer.

**Files changed:** `tooltip.stories.ts` (all 7 play functions), `.ai/rules/stories-format.md` (play function guidance section), `memory/feedback_play_functions_vrt_vitest.md`.

---

## References

- [Washing machine workflow](../../02_workstreams/02_2nd-gen-component-migration/02_step-by-step/01_washing-machine-workflow.md)
- [2nd-gen migration status table](../../02_workstreams/02_2nd-gen-component-migration/01_status.md)
- [Accessibility migration analysis](./accessibility-migration-analysis.md)
- [Rendering and styling migration analysis](./rendering-and-styling-migration-analysis.md)
- [CSS style guide — Component Custom Property Exposure](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/02_custom-properties.md#component-custom-property-exposure)
- [CSS style guide — Selector conventions](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/02_custom-properties.md#selector-conventions)
- [1st-gen source](../../../../1st-gen/packages/tooltip/src/Tooltip.ts)
- [1st-gen tooltip-directive](../../../../1st-gen/packages/tooltip/src/tooltip-directive.ts)
- [1st-gen tests](../../../../1st-gen/packages/tooltip/test/tooltip.test.ts)
- [1st-gen README](../../../../1st-gen/packages/tooltip/README.md)
- [React Spectrum S2 Tooltip](https://react-spectrum.adobe.com/Tooltip)
- [`ariaDescribedByElements` cross-root POC (CodePen)](https://codepen.io/spectrum-css/pen/pvNEVda?editors=0010) — validates inner shadow `<button>` wiring across Chrome/Edge 135+, Firefox 136+, Safari 16.4+; AT-validated with NVDA and VoiceOver
- [Spectrum CSS — `tooltip/index.css` on `spectrum-two` branch](../../../../../spectrum-css/components/tooltip/index.css)
- [Badge migration reference](../../02_workstreams/02_2nd-gen-component-migration/02_step-by-step/01_washing-machine-workflow.md#reference-badge-migration)
- Epic: SWC-2017 — Tooltip migration
- SWC-1558: Tooltip missing `role="tooltip"` (must-ship a11y fix)
- SWC-1465: Tooltip `aria-describedby` authoring guidance
- SWC-2022: Tooltip a11y implementation — toggletip / touch model
- SWC-321: Clicking self-managed tooltip on action-button triggers underlying button
- SWC-324: Shared tooltip across buttons — ghost position persists on trigger swap
- SWC-890: Tooltip in ActionMenu logs overlay warning
- SWC-994: Tooltip max-width overrides `--mod` variable

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
- [Architecture: core vs SWC split](#architecture-core-vs-swc-split)
- [Controller integration assumptions](#controller-integration-assumptions)
    - [Event dispatch ownership](#event-dispatch-ownership)
    - [`HoverController` hand-off](#hovercontroller-hand-off)
    - [`PlacementController` hand-off](#placementcontroller-hand-off)
    - [Positioning before `PlacementController`](#positioning-before-placementcontroller)
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
- [References](#references)

</details>

<!-- Document content (editable) -->

> **Epic SWC-2017** · Planning output. Must be reviewed before implementation begins.
>
> This plan should provide recommendations, not just observations. Call out inconsistencies, propose better API or naming paths where appropriate, and make unresolved tradeoffs explicit for reviewers.

---

## TL;DR

Tooltip is a visually simple component with high behavioral complexity in its self-managed mode. The S2 migration carries five confirmed breaking changes and one critical a11y fix. The core tooltip (variants, CSS, `role="tooltip"`, native `popover="auto"` open/close) can ship now; self-managed trigger integration is additive pending two extracted controllers.

- **Breaking (B1–B3):** Icon slot removed, `positive` variant removed, `variant="info"` renamed to `variant="informative"`. All three confirmed by design, Figma, S2 CSS, and accessibility analysis.
- **Breaking (B4):** Logical placement values (`start`, `end`, `start-top`, etc.) were missing in 1st-gen; now shipping. Physical values unchanged.
- **Breaking (B5):** Event renames: `sp-opened`/`sp-closed` → `swc-opened`/`swc-closed` (plus `swc-open`, `swc-after-open`, `swc-close`, `swc-after-close`). Event timing also differs due to native popover lifecycle; must document in consumer migration guide.
- **A11y critical (SWC-1558):** `role="tooltip"` is absent in 1st-gen; must ship in 2nd-gen.
- **Infrastructure change:** `sp-overlay` dependency dropped. 2nd-gen uses native popover API + Floating UI per the [Overlay Strategy RFC](https://www.dropbox.com/scl/fi/eae4rywxitn4zfmuw4o59/RFC-Overlay-strategy-for-1st-gen-and-2nd-gen.paper?rlkey=ljezd8mt8joy2zc3lv88usrh6&dl=0). External `self-managed` API shape is unchanged; internal mechanics change significantly.
- **Self-managed trigger integration is additive:** Deferred pending extraction of `PlacementController` (viewport-aware positioning) and `HoverController` (warm-up/cooldown timing, focus parity, `aria-describedby`). Initial 2nd-gen tooltip uses `popover="auto"` for native open/close behavior (Escape, light-dismiss, state sync via `toggle` listener) but has no self-managed trigger wiring or screen positioning. `self-managed`, `delayed`, and `disabled` attributes are present in the API shape but inactive until the additive phase. Before scheduling the additive implementation ticket, confirm that both controllers have been extracted and are consumable per the Overlay RFC.
- **One open question (Q1):** `tip-padding` semantics — non-blocking implementation detail; see [Blockers and open questions](#blockers-and-open-questions).

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
| `@spectrum-web-components/shared` | 1.12.0 | `focusableSelector` used for trigger traversal. **Dropped in 2nd-gen** — replaced by a programmatic `tabIndex >= 0` check; no import needed. |

---

## Migration sequencing and prerequisites

### Dependency-aware recommendation

Core tooltip (variants, CSS, `role="tooltip"`, event renames) can proceed without prerequisites. Self-managed mode is additive and blocked on two controller extractions from the Overlay RFC:

- **`PlacementController`** — Floating UI wrapper for viewport-aware positioning (`offset`, `flip`, `shift` middleware). Must be extracted before self-managed positioning ships.
- **`HoverController`** — warm-up/cooldown, focus parity, `aria-describedby` lifecycle. Must be extracted before self-managed open/close behavior ships.

Neither controller is available yet. The self-managed additive phase should not begin until both are ready. Track their extraction status before scheduling the additive implementation ticket.

### Related components and ordering notes

| Component | Relationship | Notes |
| --------- | ------------ | ----- |
| `PlacementController` | Prerequisite for self-managed additive phase | Viewport-aware positioning (`offset`, `flip`, `shift`). Tip element centering is CSS-only; no arrow middleware needed. To be extracted per Overlay RFC. Not a prerequisite for the core tooltip migration. |
| `HoverController` | Prerequisite for self-managed additive phase | Timing and `aria-describedby` lifecycle. To be extracted from `@spectrum-web-components/overlay`. Not a prerequisite for the core tooltip migration. |
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
| B4 | Add logical placement values | Physical sub-variants only; `start`/`start-top`/`start-bottom`/`end`/`end-top`/`end-bottom` are missing from WC despite being in S2 CSS | All six logical placement values ship; RTL placement works correctly | New values available; existing physical values still work — non-breaking addition |
| B5 | Event renames | Fires `sp-opened` and `sp-closed` (re-dispatched from internal `TooltipOpenable`) | Fires `swc-open`, `swc-opened`, `swc-after-open`, `swc-close`, `swc-closed`, `swc-after-close` per 2nd-gen event shape. Timing also changes: native popover `beforetoggle`/`toggle` fires at different points than the overlay-based sequence | Update event listeners; document timing difference in consumer migration guide |

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
| A2 | Native popover open/close | Uses `sp-overlay type="hint"` + `HoverController` + `triggerInteraction="hover"` | Host gets `popover="auto"`; `beforetoggle`/`toggle` event listeners handle state sync and `swc-open`/`swc-opened`/`swc-after-open`/`swc-close`/`swc-closed`/`swc-after-close` dispatch. Participates in the auto popover stack — opening closes other open `auto` popovers. | No consumer action; `self-managed` attribute ships inactive |
| A3 | `Escape` dismissal | Handled by `OverlayStack` in 1st-gen | `popover="auto"` provides built-in Esc-to-close and light-dismiss in the initial release. No explicit `keydown` listener needed. | No consumer action |

### Additive — ships when ready, zero breakage for consumers already on 2nd-gen

| # | What is added | Notes |
| --- | ------------- | ----- |
| A1 | Self-managed trigger integration | `popover="auto"` is already on the host from the initial release. Additive work: activate `resolveSelfManagedTriggerElement()` trigger DOM walk; wire `HoverController` (hover/focus events, timing, `aria-describedby`); wire `PlacementController` (pixel positioning). Blocked on both controller extractions. |
| A2 | Warm-up / cooldown (`delayed`) | 1500ms warmup / 1500ms cooldown provided by `HoverController` (aligned with React Spectrum; 1st-gen was 1000ms). `delayed` attribute ships in the API but inactive until the additive phase. Blocked on `HoverController` extraction. |
| A3 | `disabled` for self-managed | Prevents hover/focus response. Ships with self-managed additive phase. |
| A4 | `aria-describedby` wiring | `HoverController` manages adding/removing `aria-describedby` on the trigger and handles cross-root cases. Blocked on `HoverController` extraction. |
| A5 | WCAG 1.4.13 pointer bridge | Pointer can move from trigger to tooltip bubble without closing. Managed by `HoverController`. Blocked on `HoverController` extraction. |
| A6 | `no-tip` property | Shown in Figma (Orientation section, "No tip") but not supported by React Spectrum. Deferred. Create a follow-on ticket when React adds support. |
| A7 | `tooltip-directive` for 2nd-gen | Lit directive for programmatic tooltip insertion. Cannot be meaningfully implemented until the self-managed additive phase is complete. The 2nd-gen directive will be simpler than 1st-gen: no `sp-overlay` wrapper needed; it creates `<swc-tooltip self-managed>`, inserts it as a sibling of the target, and handles lifecycle cleanup. Create a follow-on ticket before this migration closes. |
| A8 | `container-padding` | Space between tooltip and viewport edge (Floating UI `shift`/`flip` middleware `padding`). React default: 12. Distinct from `tip-padding`. Blocked on `PlacementController` API. |
| A9 | `cross-offset` | Offset along the cross axis (perpendicular to `offset`). React default: 0. Blocked on `PlacementController` API. |
| A10 | `should-flip` | Whether to reposition to the opposite side when space runs out. Floating UI `flip` middleware. React default: `true`. Default should also be `true` in `PlacementController`; expose as a consumer attribute if override need is confirmed. |
| A11 | `--swc-*` CSS custom properties | No `--swc-*` custom properties initially. A small reviewed set may be added if consumer override needs emerge. |

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
| `variant` | `'neutral' \| 'informative' \| 'negative'` | `'neutral'` | `variant` (reflect) | **Confirmed.** Positive removed. `informative` confirmed; CSS class stays `.spectrum-Tooltip--info` internally. |
| `placement` | `TooltipPlacement` | `'top'` | `placement` (reflect) | **Confirmed.** React Spectrum default is `top`. S2 CSS adds `start`/`end` and sub-variants. |
| `open` | `boolean` | `false` | `open` (reflect) | **Confirmed.** |
| `delayed` | `boolean` | `false` | `delayed` | **Additive/deferred.** Warm-up/cooldown behavior provided by `HoverController`. Default delay is 1500ms (aligns with React Spectrum; 1st-gen used 1000ms — minor behavioral change). Attribute ships in the API shape but has no effect until the additive phase. |
| `disabled` | `boolean` | `false` | `disabled` | **Additive/deferred.** Self-managed mode only. Ships inactive until the additive phase. |
| `self-managed` | `boolean` | `false` | `self-managed` | **Additive/deferred.** Activates trigger integration (`PlacementController` + `HoverController`). `popover="auto"` is always present from the initial release; `self-managed` only wires hover/focus events and positioning. Attribute ships in the API shape but has no effect until the additive phase. |
| `offset` | `number` | `0` | `offset` | **Additive/deferred.** Passed to `PlacementController` offset middleware. Ships in API shape; effective in the additive phase. |
| `tip-padding` | `number` | `undefined` | `tip-padding` | **Additive/deferred (Q1).** 1st-gen mapped this to `sp-overlay` for tip position calculation. The arrow middleware analog no longer applies since the tip is CSS-centered. Verify whether this maps to `shift`/`flip` middleware padding (viewport clearance) or can be dropped. |
| `trigger-element` | `HTMLElement \| null` | `null` | — (setter only) | **Additive/deferred.** Explicit trigger override for non-ancestor relationships (replaces the 1st-gen pattern of wrapping `<sp-tooltip>` in `<sp-overlay>`). Ships inactive until the additive phase. |

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

S2 CSS adds logical placement sub-variants (`start`, `start-top`, `start-bottom`, `end`, `end-top`, `end-bottom`) not directly shown as Figma properties but required for RTL correctness.

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

**Self-managed mode (additive/deferred):**

The `TooltipOpenable` intermediate element is an implementation detail of the 1st-gen overlay bridge and does not carry forward. Self-managed mode in 2nd-gen is deferred pending `PlacementController` and `HoverController` extraction. When the additive phase begins:

1. The tooltip uses `popover="auto"` (already present from the initial release). Built-in Esc-to-close and light-dismiss are included. Note: participates in the auto stack — opening a tooltip will close other open `auto` popovers (menus, pickers).
2. `PlacementController` handles viewport-aware positioning using `offset`, `flip`, and `shift` middleware; `placement` and `offset` attributes map to controller options. The tip element remains CSS-centered on its edge regardless of computed position (see [Controller integration assumptions](#controller-integration-assumptions)).
3. `HoverController` manages open/close timing (1500ms warm-up/cooldown when `delayed`), `focus-visible` parity, `aria-describedby` lifecycle, and the WCAG 1.4.13 pointer bridge.
4. `Escape` closes the tooltip without moving focus via the built-in `popover="auto"` dismiss behavior.
5. New 2nd-gen event shape: `swc-open`, `swc-opened`, `swc-after-open`, `swc-close`, `swc-closed`, `swc-after-close` (B5). Events fire from the `toggle` listener already wired in the initial release.

**Trigger resolution (self-managed, additive/deferred):**

The `resolveSelfManagedTriggerElement()` traversal logic from 1st-gen must be ported to 2nd-gen SWC (not Core). It walks up the composed DOM tree crossing shadow boundaries using a programmatic `tabIndex >= 0` check per node (preferred over importing `focusableSelector`). It lives in SWC because all three consumers of the resolved trigger — `HoverController`, `PlacementController`, and `aria-describedby` wiring — are SWC-layer concerns, and SWC already owns `id` assignment on the host (the other half of the `aria-describedby` equation). Core declares the `triggerElement` property and its type; SWC resolves and populates it. The `triggerElement` setter provides an explicit override for non-ancestor trigger relationships; this also replaces the 1st-gen pattern of externally wrapping `<sp-tooltip>` in `<sp-overlay>`.

**Initial release (must-ship) behavioral semantics:**

In the initial release, the tooltip uses native popover for open/close but has no self-managed trigger wiring or screen positioning:

- Host element has `popover="auto"` from day one; consumer controls visibility via the `open` property (which calls `showPopover()`/`hidePopover()` internally) or directly via the popover API
- Renders with correct variant, placement CSS class, and `role="tooltip"`
- Component listens to native `beforetoggle`/`toggle` events to sync `open` property and dispatch `swc-open`/`swc-opened`/`swc-after-open`/`swc-close`/`swc-closed`/`swc-after-close`. Events fire from these listeners regardless of what caused the state change (programmatic, Escape, or light-dismiss).
- Built-in Esc-to-close and light-dismiss via `popover="auto"`. Note: participates in the auto popover stack — opening this tooltip closes other open `auto` popovers (menus, pickers).
- `placement` applies the CSS class (tip direction) only; no screen positioning is active without `PlacementController`. Stories fake positioning with inline styles; this limitation should be noted in the story.
- The tip element (`<span class="swc-Tooltip-tip">`) is always CSS-centered on the edge determined by the `placement` class. Its position is not dynamically adjusted relative to the trigger; this is a deliberate simplification and does not require `PlacementController`.
- `self-managed`, `delayed`, `disabled`, `offset`, `tip-padding`, and `trigger-element` are present in the API but have no effect until the additive phase

### Accessibility semantics notes (2nd-gen)

- `role="tooltip"` is set on the host element itself in Core's `connectedCallback` (SWC-1558). The host is the tooltip surface; `aria-describedby` on the trigger references the host's `id` directly.
- Tooltip text is never in the Tab order; focus always stays on the trigger.
- Closed tooltips must be removed from the accessibility tree (the native `popover` attribute handles visibility but verify AT behavior across browsers).
- `Escape` must close without trapping or moving focus.
- Variant colors are not the sole conveyance of meaning; tooltip text itself carries the message per WCAG 1.4.1.
- High-contrast mode: explicit `1px solid transparent` border in base styles; forced-colors mode automatically fills `transparent` with `CanvasText`.
- No `aria-live` for routine tooltip toggles; use `aria-describedby` wiring instead.
- Tooltips must respond to both hover and keyboard focus. React Spectrum's `trigger="focus"` (focus-only mode) is not applicable here: WCAG 1.4.13 requires the tooltip to be available via pointer hover, so restricting to focus-only would fail mouse users. Both trigger methods are always active in self-managed mode.
- Toggletip mode (touch/longpress disclosure pattern, SWC-2022) is not applicable for the 2nd-gen Tooltip. Consumers needing toggletip behavior should use `swc-popover` or a popover-derived component instead.
- Cross-root `aria-describedby`: the 1st-gen `HoverController.prepareDescription` handled shadow-root splits. 2nd-gen must document the approach for when trigger and tooltip live in different shadow trees.

---

## Architecture: core vs SWC split

> The 1st-gen component is a **reference only** — 2nd-gen is built independently. Neither generation imports from the other.

Follow the [Badge migration reference](../../02_workstreams/02_2nd-gen-component-migration/02_step-by-step/01_washing-machine-workflow.md#reference-badge-migration) as the concrete pattern for the core/SWC split.

| Layer | Path | Contains |
| ----- | ---- | -------- |
| **Core** | `2nd-gen/packages/core/components/tooltip/` | `Tooltip.base.ts`, `Tooltip.types.ts`: property definitions (including `triggerElement` declaration), type validation, state management, accessible-name rules. Sets `role="tooltip"` on the host element via `connectedCallback` — no rendering required. No Floating UI. No DOM traversal. |
| **SWC** | `2nd-gen/packages/swc/components/tooltip/` | `Tooltip.ts`, `tooltip.css`: rendering, stable `id` assignment on host, `popover="auto"` on host, `beforetoggle`/`toggle` listeners for state sync and `swc-open`/`swc-opened`/`swc-after-open`/`swc-close`/`swc-closed`/`swc-after-close` dispatch, element registration, stories, tests. **Additive phase only:** `resolveSelfManagedTriggerElement()` DOM traversal, `PlacementController` + `HoverController` integration, `aria-describedby` wiring. |

Planned rendering shape (initial release):

- Core sets `role="tooltip"` on the host element (`this.setAttribute('role', 'tooltip')` in `connectedCallback`). The host element IS the tooltip surface; no inner role-bearing container needed.
- SWC assigns a stable `id` on the host (needed for `aria-describedby` resolution). SWC renders: tip element (`<span class="swc-Tooltip-tip">`); label span with default slot; event dispatch.
- In the initial release, SWC sets `popover="auto"` on the host, making the host element both the `role="tooltip"` element and the popover surface. In the additive phase, `PlacementController` and `HoverController` layer on top without structural changes to the host.

**Resolved:** `resolveSelfManagedTriggerElement()` lives in SWC. Core declares the `triggerElement` property and its type; SWC resolves and populates it. All consumers of the resolved trigger (`HoverController`, `PlacementController`, `aria-describedby` wiring) are SWC-layer, and SWC already owns `id` assignment on the host. No DOM traversal belongs in Core.

---

## Controller integration assumptions

This section records the design contract between the initial release and the two additive-phase controllers, so the integration can proceed without refactoring initial release internals.

### Event dispatch ownership

`swc-open`, `swc-opened`, `swc-after-open`, `swc-close`, `swc-closed`, and `swc-after-close` fire from the native `beforetoggle`/`toggle` event listeners in the SWC layer — not from property setters or controllers. This means:

- Events fire regardless of what caused the state change: consumer code, `HoverController` calling `showPopover()`, Escape, or light-dismiss.
- `HoverController` can drive open/close without risking double-dispatch or missed events.
- This is a hard constraint for the implementation: deviating from it (e.g., dispatching from a property setter as well) will cause double-dispatch in the additive phase.

### `HoverController` hand-off

When `HoverController` is integrated in the additive phase, its responsibilities are bounded to:

- Attaching hover and focus-visible event listeners to the resolved trigger element
- Driving open/close by calling `showPopover()`/`hidePopover()` on the host (not by toggling `open` directly)
- Managing warm-up/cooldown timing when `delayed` is set
- Adding and removing `aria-describedby` on the trigger
- Providing the WCAG 1.4.13 pointer bridge (keeping the popover open when the pointer moves from trigger into the tooltip bubble)

`HoverController` does not dispatch any `swc-*` events. The existing `toggle` listener handles all event dispatch.

### `PlacementController` hand-off

When `PlacementController` is integrated in the additive phase, it:

- Computes `{ x, y }` coordinates using Floating UI after `showPopover()` fires (i.e., on `toggle` with `newState === 'open'`)
- Applies computed position to the host (already a `popover="auto"` element) via `position: fixed; left: ${x}px; top: ${y}px` or equivalent
- Maps `placement`, `offset`, and (if confirmed via Q1) `tip-padding` attributes to Floating UI middleware options (`offset`, `flip`, `shift`)

The tip element is always CSS-centered on the placement edge and does not require any input from the controller (see [initial release behavioral semantics](#behavioral-semantics)). No arrow middleware is needed.

`PlacementController` does not change the popover mechanism; the host is already `popover="auto"`. It only layers pixel positioning on top.

### Positioning before `PlacementController`

In the initial release, `placement` applies only the CSS class (tip direction). The host has no pixel positioning from the component. Stories must supply inline styles or a CSS override to position the tooltip visibly near a trigger for demo purposes. This is intentional and should be noted in the relevant story's JSDoc.

### Auto-stack behavior

`popover="auto"` participates in the browser's auto popover stack from the initial release. Opening a tooltip dismisses any other open `auto` popover (menus, pickers, selects). The consumer migration guide and the Behaviors story should note this.

---

## Migration checklist

### Preparation (this ticket)

- [x] 1st-gen API surface documented
- [x] Dependencies identified
- [x] Breaking changes documented
- [x] 2nd-gen API decisions drafted
- [ ] Plan reviewed by at least one other engineer

### Setup

- [ ] Create `2nd-gen/packages/core/components/tooltip/`
- [ ] Create `2nd-gen/packages/swc/components/tooltip/`
- [ ] Wire exports in both `package.json` files
- [ ] Confirm `spectrum-css` is checked out at `spectrum-two` branch as sibling directory (already confirmed available at path `../../../../../spectrum-css/`)

### API

#### Naming and public surface

- [ ] `Tooltip.types.ts`: define `TooltipVariant` (`'neutral' | 'informative' | 'negative'`); define `TooltipPlacement` (all physical + logical values)
- [ ] `Tooltip.base.ts`: define all properties with decorators (including `triggerElement` declaration); assign `role="tooltip"`; no rendering. No DOM traversal logic.
- [ ] `Tooltip.ts` (SWC): rendering, `popover="auto"` on host, `beforetoggle`/`toggle` listeners for state sync and `swc-open`/`swc-opened`/`swc-after-open`/`swc-close`/`swc-closed`/`swc-after-close` dispatch. (`PlacementController`/`HoverController` integration and `aria-describedby` wiring are additive phase.)

#### Alignment checks

- [x] Core vs SWC split confirmed: Core declares `triggerElement` property; `resolveSelfManagedTriggerElement()` lives in SWC

### Styling

> Follow the [CSS style guide](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/) as the source of truth for all styling work. Key references: [migration steps](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/04_spectrum-swc-migration.md), [custom properties](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/02_custom-properties.md), [anti-patterns](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/05_anti-patterns.md).

- [ ] Add `.swc-Tooltip` to the internal semantic container in `render()`; keep styling off `:host`
- [ ] Copy S2 source from `spectrum-css/components/tooltip/index.css` (`spectrum-two` branch, not `/dist`) into `tooltip.css` as baseline
- [ ] Map Spectrum CSS selectors to SWC equivalents following CSS selector guidance in CONTRIBUTOR_DOCS
- [ ] Remove `.spectrum-Tooltip-typeIcon` styles (no icon in S2)
- [ ] Add all six logical placement classes, consolidated with their non-logical equivalents: `start`, `start-top`, `start-bottom`, `end`, `end-top`, `end-bottom`
- [ ] Verify CJK language modifiers (`:lang(ja)`, `:lang(ko)`, `:lang(zh)`)
- [ ] Verify visibility in WHCM
- [ ] Add `@cssprop` JSDoc tag for any exposed `--swc-*` property
- [ ] Pass stylelint (property order, `no-descending-specificity`, token validation)

#### Visual model and regressions

- [ ] Confirm neutral, informative, negative backgrounds match Figma
- [ ] Verify tip geometry across all placement values and RTL logical variants
- [ ] Verify open/close animation (`translateY`/`translateX` per placement direction; S2 animation tokens)

### Accessibility

#### Naming and semantics

- [ ] `role="tooltip"` set on the host element via `connectedCallback` in Core base class (SWC-1558)
- [ ] Stable, unique `id` per instance for `aria-describedby` resolution
- [ ] `aria-describedby` set on trigger when tooltip opens; removed when tooltip closes **(additive phase — HoverController)**
- [ ] Document cross-root `aria-describedby` approach in stories **(additive phase)**

#### State verification

- [ ] `[open]` reflects on host when tooltip is visible
- [ ] `[disabled]` prevents self-managed from responding to hover/focus events **(additive phase)**
- [ ] Closed tooltip is hidden from AT (`popover` attribute or explicit `aria-hidden`/`inert`)
- [ ] `Escape` closes tooltip; focus stays on trigger; no focus trap
- [ ] Pointer can move from trigger to tooltip bubble without tooltip closing (WCAG 1.4.13) **(additive phase — HoverController)**
- [ ] High-contrast border present in forced-colors mode
- [ ] Variant colors paired with readable text (not relying on color alone)

### Testing

- [ ] Port `1st-gen/packages/tooltip/test/tooltip.test.ts` coverage that still applies
- [ ] Do not port `1st-gen/packages/tooltip/test/tooltip-directive.test.ts` — directive is deferred; tests will be written fresh against the 2nd-gen directive when it ships
- [ ] Add Playwright `tooltip.a11y.spec.ts` with `toMatchAriaSnapshot`

#### Behavior

- [ ] Renders with correct variant, placement, open/closed state
- [ ] `swc-open`, `swc-opened`, `swc-after-open`, `swc-close`, `swc-closed`, `swc-after-close` events dispatched correctly when `open` changes
- [ ] `Escape` closes tooltip when open; focus remains on trigger
- [ ] Self-managed: opens on trigger hover; closes on pointer leave **(additive phase)**
- [ ] Self-managed: opens on trigger focus-visible; closes on blur **(additive phase)**
- [ ] Self-managed: pointer can move to tooltip bubble without closing (WCAG 1.4.13) **(additive phase)**
- [ ] Self-managed: `triggerElement` setter override works for non-ancestor trigger relationships **(additive phase)**
- [ ] Self-managed: `delayed` warm-up/cooldown timing (1500ms warmup, 1500ms cooldown; aligns with React Spectrum) **(additive phase)**
- [ ] Self-managed through shadow boundary (port `self manages through a shadow boundary` test) **(additive phase)**
- [ ] `disabled` attribute prevents self-managed response to user input **(additive phase)**

#### Visual regression

- [ ] VRT for all 3 variants (neutral, informative, negative) × all cardinal placements (top, bottom, left, right)
- [ ] VRT for at least one logical placement (start, end) verifying RTL behavior
- [ ] VRT for open and closed states with transition
- [ ] VRT for forced-colors / high-contrast mode
- [ ] VRT for CJK line-height at `:lang(ja)` or `:lang(ko)`

### Documentation

#### General

- [ ] JSDoc on all public properties, slots, and any exposed CSS custom properties
- [ ] Stories: Playground, Overview, Anatomy (default slot), Options (variants, placements), States (open), Accessibility. Behaviors story (self-managed, delayed, `triggerElement`) is additive phase.

#### Breaking changes

- [ ] Consumer migration guide: remove all `slot="icon"` usage (B1)
- [ ] Consumer migration guide: replace `variant="positive"` with `variant="informative"`, `variant="neutral"`, or `variant="negative"` as content warrants (B2)
- [ ] Consumer migration guide: update `variant="info"` → `variant="informative"` (B3)
- [ ] Consumer migration guide: update event listeners from `sp-opened`/`sp-closed` to `swc-opened`/`swc-closed`; document that `swc-open`/`swc-after-open`/`swc-close`/`swc-after-close` are new (B5)
- [ ] Consumer migration guide: note event timing change — native popover lifecycle fires at different points than the 1st-gen overlay sequence (B5)
- [ ] Consumer migration guide: note that consumers using `<sp-tooltip>` inside `<sp-overlay>` should migrate to the `trigger-element` property (additive phase)

#### Accessibility

- [ ] Storybook Accessibility story: document ARIA features (`role="tooltip"`, `aria-describedby` lifecycle), keyboard behavior (`Escape` closes without moving focus; `Tab` blur dismisses), and screen reader expectations (trigger announced first, tooltip text second)
- [ ] No interactive content (links, buttons, focusable elements) may appear inside `role="tooltip"`; direct consumers to `swc-popover`, contextual help, or dialog for those patterns
- [ ] `aria-describedby` semantics: tooltip text supplements the trigger's accessible name — do not use tooltip to duplicate what `aria-label`/`aria-labelledby` already conveys; document opt-out semantics (SWC-1465)
- [ ] Tooltip must be placed on a focusable trigger; non-interactive elements (static text, decorative icons) require contextual help instead
- [ ] Variant colors are supplementary: pair each variant with readable text; meaning must not rely on color alone (WCAG 1.4.1)
- [ ] Touch guidance: tooltip is hover/focus only; direct consumers to `swc-popover` or contextual help for explicit disclosure on touch devices
- [ ] No auto-dismiss timer: tooltip must remain visible until the user dismisses it or the triggering state becomes invalid (WCAG 1.4.13)
- [ ] Icon-only trigger edge case: tooltip text may serve as accessible name via `aria-labelledby` in narrow cases, but prefer a visible label; call out the difference between labeling (accessible name) and describing (supplementary hint)
- [ ] Verify 200% zoom: tooltip does not obscure critical UI

### Review

- [ ] `yarn lint:2nd-gen` passes (ESLint, Stylelint, Prettier)
- [ ] Status table in workstream doc updated
- [ ] PR created with description referencing Epic SWC-2017
- [ ] Follow-on ticket created: PlacementController integration (link from this PR)
- [ ] Follow-on ticket created: HoverController integration (link from this PR)
- [ ] Follow-on ticket created: `tooltip-directive` 2nd-gen (link from this PR)
- [ ] Follow-on ticket created: `no-tip` attribute, gated on React Spectrum signal (link from this PR)
- [ ] Peer engineer sign-off

---

## Blockers and open questions

| # | Item | Blocking? | Status | Owner |
| --- | ---- | --------- | ------ | ----- |
| Q1 | **`tip-padding` semantics.** In 1st-gen, `tipPadding` was passed to `sp-overlay` for tip position calculation. The arrow middleware analog no longer applies since the tip is CSS-centered. Determine whether `tip-padding` maps to `shift`/`flip` middleware padding (minimum space between tooltip container and viewport edge) or whether it can be dropped without consumer impact. | No — implementation detail | Open; resolve as part of PlacementController integration ticket | Ticket owner |

### Deferred implementation tickets

Create these tickets before this migration PR closes. Link each to Epic SWC-2017.

| Ticket | Summary | Why deferred | Plan sections |
| ------ | ------- | ------------ | ------------- |
| TBD | **Integrate PlacementController into Tooltip.** Wire viewport-aware pixel positioning: activate `resolveSelfManagedTriggerElement()`, apply `placement`, `offset`, `container-padding`, `cross-offset`, `should-flip` as Floating UI middleware options. Resolve Q1 (`tip-padding` → `shift`/`flip` padding or drop). | Blocked on `PlacementController` extraction per Overlay RFC. | Additive A1 (positioning), A8, A9, A10; Q1 |
| TBD | **Integrate HoverController into Tooltip.** Wire trigger hover and focus-visible events, warm-up/cooldown timing (`delayed`), `disabled` guard, `aria-describedby` lifecycle, and WCAG 1.4.13 pointer bridge. | Blocked on `HoverController` extraction per Overlay RFC. `HoverController` and `PlacementController` can be integrated in separate tickets; full self-managed mode requires both. | Additive A1 (trigger/focus/aria), A2, A3, A4, A5 |
| TBD | **2nd-gen tooltip-directive.** Lit directive for programmatic tooltip insertion. Creates `<swc-tooltip self-managed>` as a sibling of the target and handles lifecycle cleanup. Simpler than 1st-gen: no `sp-overlay` wrapper needed. | Requires full self-managed mode (both controllers). | Additive A7 |
| TBD | **`no-tip` attribute.** Remove the directional tip arrow. Figma-confirmed. Can proceed independently of controller integration; no controller dependency. Create when React Spectrum adds support as a confirming signal. | No cross-framework confirmation yet; Figma-only signal is not sufficient to ship. | Additive A6 |

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

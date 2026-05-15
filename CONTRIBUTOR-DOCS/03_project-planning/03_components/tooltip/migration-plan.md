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

Tooltip is a visually simple component with high behavioral complexity in its automatic trigger-wiring mode. The S2 migration carries six confirmed breaking changes and one critical a11y fix. The core tooltip (variants, CSS, `role="tooltip"`, native `popover="auto"` open/close) can ship now; trigger integration is additive pending two extracted controllers.

- **Breaking (B1–B3):** Icon slot removed, `positive` variant removed, `variant="info"` renamed to `variant="informative"`. All three confirmed by design, Figma, S2 CSS, and accessibility analysis.
- **Additive/type change (B4):** Logical placement values (`start`, `end`, `start-top`, etc.) were missing in 1st-gen; now shipping. Physical values unchanged. Not runtime-breaking; the only consumer impact is a TypeScript type-union widening — exhaustive `switch` or `satisfies` checks against `Placement` will need updating.
- **Breaking (B5):** Event renames: `sp-opened`/`sp-closed` removed; 2nd-gen fires `swc-open`, `swc-after-open`, `swc-close`, `swc-after-close`. Event timing also differs due to native popover lifecycle; must document in consumer migration guide.
- **A11y critical (SWC-1558):** `role="tooltip"` is absent in 1st-gen; must ship in 2nd-gen.
- **Infrastructure change:** `sp-overlay` dependency dropped. 2nd-gen uses native popover API + Floating UI per the [Overlay Strategy RFC](https://www.dropbox.com/scl/fi/eae4rywxitn4zfmuw4o59/RFC-Overlay-strategy-for-1st-gen-and-2nd-gen.paper?rlkey=ljezd8mt8joy2zc3lv88usrh6&dl=0). The `self-managed` attribute is removed (B6); automatic trigger wiring is on by default; the `manual` attribute opts out. Internal mechanics change significantly.
- **Automatic trigger integration is additive:** Deferred pending extraction of `PlacementController` (viewport-aware positioning) and `HoverController` (warm-up/cooldown timing, focus parity). Initial 2nd-gen tooltip ships `for` and `trigger-element` as active API — ARIA relationship wiring fires on `open` change from day one (see A4). Hover/focus event wiring and screen positioning require the controllers. `delayed`, `disabled`, and `manual` are in the API shape but inactive until the additive phase. Before scheduling the additive implementation ticket, confirm that both controllers have been extracted and are consumable per the Overlay RFC.
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

- **`PlacementController`** — Floating UI wrapper for viewport-aware positioning (`offset`, `flip`, `shift` middleware). Must be extracted before automatic trigger positioning ships.
- **`HoverController`** — warm-up/cooldown, focus parity, WCAG 1.4.13 pointer bridge. Must be extracted before automatic trigger open/close behavior ships.

Neither controller is available yet. The automatic trigger integration additive phase should not begin until both are ready. Track their extraction status before scheduling the additive implementation ticket.

### Related components and ordering notes

| Component | Relationship | Notes |
| --------- | ------------ | ----- |
| `PlacementController` | Prerequisite for automatic trigger integration additive phase | Viewport-aware positioning (`offset`, `flip`, `shift`). Tip element centering is CSS-only; no arrow middleware needed. To be extracted per Overlay RFC. Not a prerequisite for the core tooltip migration. |
| `HoverController` | Prerequisite for automatic trigger integration additive phase | Hover/focus event wiring, warm-up/cooldown timing, and WCAG 1.4.13 pointer bridge. To be extracted from `@spectrum-web-components/overlay`. Not a prerequisite for the core tooltip migration. |
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
| B4 | Add logical placement values (type-only change) | Physical sub-variants only; `start`/`start-top`/`start-bottom`/`end`/`end-top`/`end-bottom` are missing from WC despite being in S2 CSS | All six logical placement values ship; RTL placement works correctly | No runtime change needed; update `TooltipPlacement` imports or exhaustive switch/satisfies checks if present |
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
| A3 | `Escape` dismissal | Handled by `OverlayStack` in 1st-gen | `popover="auto"` provides built-in Esc-to-close and light-dismiss. No explicit `keydown` listener needed. | No consumer action |
| A4 | ARIA relationship wiring | No automatic ARIA association in 1st-gen | On `open = true`: SWC resolves trigger via `for` / `trigger-element`, applies inner-button resolution (shadow `<button>` for SWC components; host for native elements), and sets `Element.ariaDescribedByElements = [tooltipHost]`. Removed on `open = false`. Active in both automatic and manual modes. See [ARIA relationship wiring](#aria-relationship-wiring) for the full two-path resolution and browser support. | Set `for` on `<swc-tooltip>` pointing to the trigger's `id`; or set `trigger-element` programmatically. No other action required. |

### Additive — ships when ready, zero breakage for consumers already on 2nd-gen

| # | What is added | Notes |
| --- | ------------- | ----- |
| A1 | Automatic trigger integration (hover/focus) | `popover="auto"` and ARIA wiring are already active from the initial release. Additive work: wire `HoverController` (hover/focus events, warm-up/cooldown timing); wire `PlacementController` (pixel positioning). Skipped when `manual` is set. Blocked on both controller extractions. |
| A2 | Warm-up / cooldown (`delayed`) | 1500ms warmup / 1500ms cooldown provided by `HoverController` (aligned with React Spectrum; 1st-gen was 1000ms). `delayed` attribute ships in the API but inactive until the additive phase. Blocked on `HoverController` extraction. |
| A3 | `disabled` for automatic mode | Prevents hover/focus response in automatic mode. Ships with automatic trigger integration additive phase. |
| A4 | WCAG 1.4.13 pointer bridge | Pointer can move from trigger to tooltip bubble without closing. Managed by `HoverController`. Blocked on `HoverController` extraction. |
| A5 | `no-tip` property | Shown in Figma (Orientation section, "No tip") but not supported by React Spectrum. Deferred. Create a follow-on ticket when React adds support. |
| A6 | `tooltip-directive` for 2nd-gen | Lit directive for programmatic tooltip insertion. Cannot be meaningfully implemented until the automatic trigger integration additive phase is complete. The 2nd-gen directive will be simpler than 1st-gen: no `sp-overlay` wrapper needed; it creates `<swc-tooltip>`, inserts it as a sibling of the target, sets `trigger-element` (element reference, bypassing ID management), and handles lifecycle cleanup. Create a follow-on ticket before this migration closes. |
| A7 | `container-padding` | Space between tooltip and viewport edge (Floating UI `shift`/`flip` middleware `padding`). React default: 12. Blocked on `PlacementController` API. |
| A8 | `cross-offset` | Offset along the cross axis (perpendicular to `offset`). React default: 0. Blocked on `PlacementController` API. |
| A9 | `should-flip` | Whether to reposition to the opposite side when space runs out. Floating UI `flip` middleware. React default: `true`. Default should also be `true` in `PlacementController`; expose as a consumer attribute if override need is confirmed. |
| A10 | `--swc-*` CSS custom properties | No `--swc-*` custom properties initially. A small reviewed set may be added if consumer override needs emerge. |
| A11 | `labeling` attribute — `aria-labelledby` wiring | The base ARIA wiring (A4 in must-ship) always uses `ariaDescribedByElements`. When `labeling` is set, the SWC layer uses `ariaLabelledByElements` instead — for icon-only triggers where the tooltip text is the sole accessible name and adding `accessible-label` directly to the trigger is not possible. `role="tooltip"` is retained. Works in automatic and manual modes. |
| A12 | Inner interactive element selector expansion | Initial implementation uses `querySelector('button')` as the convention for resolving the inner interactive element within a trigger's shadow root. Expand to support additional interactive elements (`<a>`, `<input>`, `<select>`, components using a different inner element) when confirmed by consumer needs. `button` covers the large majority of 2nd-gen button-like component cases; any expansion should be gated on confirmed need. |

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
| `placement` | `TooltipPlacement` | `'top'` | `placement` (reflect) | **Confirmed.** React Spectrum default is `top`. S2 CSS adds `start`/`end` and sub-variants. **Behavioral change from 1st-gen:** 1st-gen defaulted to `undefined` (no placement attribute or CSS class). Consumers that relied on an unplaced tooltip will now receive `placement="top"` and the corresponding CSS class. |
| `open` | `boolean` | `false` | `open` (reflect) | **Confirmed.** |
| `for` | `string` | `undefined` | `for` | **Confirmed.** ID of the trigger element in the same document tree root. The tooltip calls `getRootNode().getElementById(this.for)` to resolve the trigger, then wires the ARIA relationship on `open` change (see [ARIA relationship wiring](#aria-relationship-wiring)). Active in both automatic and manual modes — see the trigger-mode interaction table in [Behavioral semantics](#behavioral-semantics). HoverController hover/focus auto-wiring is additive. |
| `trigger-element` | `HTMLElement \| null` | `null` | — (setter only) | **Confirmed.** Explicit trigger element reference; overrides `for` when set. Drives the same ARIA wiring on `open` change as `for`, via direct element reference rather than ID lookup. Use for cross-shadow-root triggers where `getRootNode().getElementById()` is scoped to the wrong tree root, or for the directive (programmatic insertion). `HoverController` and `PlacementController` receive the resolved value and do not perform their own trigger resolution. |
| `delayed` | `boolean` | `false` | `delayed` | **Additive/deferred.** Warm-up/cooldown behavior provided by `HoverController`. Default delay is 1500ms (aligns with React Spectrum; 1st-gen used 1000ms — minor behavioral change). Ships in the API shape but has no effect until the additive phase. |
| `disabled` | `boolean` | `false` | `disabled` | **Additive/deferred.** Automatic mode only; no-op when `manual` is set. Ships inactive until the additive phase. |
| `manual` | `boolean` | `false` | `manual` | **Additive/deferred.** Suppresses `HoverController` and `PlacementController` wiring only. `for` and `trigger-element` are still resolved; ARIA wiring still fires on `open` change. Consumer manages open/close via the `open` property or the popover API directly. Ships in the API shape; effective in the additive phase. |
| `offset` | `number` | `0` | `offset` | **Additive/deferred.** Passed to `PlacementController` offset middleware. Ships in API shape; effective in the additive phase. Note: React Spectrum defaults to `7`; the `PlacementController` default should align with React — confirm in the controller design before shipping. |
| `labeling` | `boolean` | `false` | `labeling` | **Additive/deferred.** Changes ARIA wiring from `ariaDescribedByElements` to `ariaLabelledByElements` (see additive A11). For icon-only triggers where the tooltip text is the sole accessible name. Works in automatic and manual modes. Ships inactive until the additive phase. |

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

**Automatic trigger-wiring mode (additive/deferred):**

The `TooltipOpenable` intermediate element is an implementation detail of the 1st-gen overlay bridge and does not carry forward. Automatic trigger-wiring mode in 2nd-gen is deferred pending `PlacementController` and `HoverController` extraction. When the additive phase begins:

1. The tooltip uses `popover="auto"` (already present from the initial release). Built-in Esc-to-close and light-dismiss are included. Note: participates in the auto stack — opening a tooltip will close other open `auto` popovers (menus, pickers).
2. `PlacementController` handles viewport-aware positioning using `offset`, `flip`, and `shift` middleware; `placement` and `offset` attributes map to controller options. The tip element remains CSS-centered on its edge regardless of computed position (see [Controller integration assumptions](#controller-integration-assumptions)).
3. `HoverController` manages open/close timing (1500ms warm-up/cooldown when `delayed`), `focus-visible` parity, and the WCAG 1.4.13 pointer bridge. ARIA relationship wiring is handled by the SWC layer on `open` change, not by `HoverController`.
4. `Escape` closes the tooltip without moving focus via the built-in `popover="auto"` dismiss behavior.
5. New 2nd-gen event shape: `swc-open`, `swc-after-open`, `swc-close`, `swc-after-close` (B5). Events fire from listeners already wired in the initial release.
6. When `manual` is set, controller wiring (hover/focus events, timing, pointer bridge) is skipped; the consumer owns open/close. ARIA relationship wiring is unaffected — it fires on `open` change whenever `for` or `trigger-element` is set.

**Trigger resolution (automatic mode, additive/deferred):**

The 1st-gen `resolveSelfManagedTriggerElement()` ancestor-walking is **not ported**. With `popover="auto"`, the tooltip renders in the browser top layer regardless of its authored DOM position. The authoring pattern changes: `<swc-tooltip>` is authored as a sibling of the trigger rather than nested inside it.

Default resolution: the `for` attribute. The tooltip calls `getRootNode().getElementById(this.for)` to resolve the trigger. This is explicit in markup, not positionally inferred — the relationship is declared and visible to tooling and DevTools. If `for` is not set or the referenced ID does not exist, automatic wiring is a no-op.

The `trigger-element` setter is the explicit element reference override for cases where the trigger cannot be referenced by ID — cross-shadow-root scenarios (where `getElementById` is scoped to the wrong tree root) or programmatic insertion via the directive. When set, it takes precedence over `for`. Core declares the `triggerElement` property and its type; SWC resolves and populates it via `for` or the explicit setter. `HoverController` and `PlacementController` receive the resolved value from SWC and do not perform their own resolution. ARIA wiring is performed directly by SWC on `open` change.

With tooltip and trigger authored as siblings in the same document tree, their nodes share a root — but the accessible interactive element on a 2nd-gen button-like trigger is an inner shadow `<button>`, not the host. SWC wires the ARIA relationship to the inner element using `Element.ariaDescribedByElements` on `open` change — not a string `aria-describedby` on the host. See [ARIA relationship wiring](#aria-relationship-wiring) for the full two-path resolution.

**Trigger-mode interaction:**

| `for`/`trigger-element` set? | `manual` set? | ARIA wiring | Hover/focus |
| ---- | ---- | ---- | ---- |
| Yes | No | Fires on `open` change (initial release) | `HoverController` (additive phase) |
| Yes | Yes | Fires on `open` change (initial release) | Consumer-managed |
| No | No | None; warn in debug mode | N/A |
| No | Yes | None | Consumer-managed |

**Authoring modes:**

Modes 1 and 2 use automatic hover/focus trigger wiring and require `HoverController` and `PlacementController` (additive phase). ARIA relationship wiring via `for` is active from the initial release in all modes. Mode 3 demonstrates consumer-owned open/close.

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


<!-- ── Mode 1: Automatic — icon-only trigger, labeling attribute (additive)
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

**Initial release (must-ship) behavioral semantics:**

In the initial release, the tooltip uses native popover for open/close but has no automatic hover/focus trigger wiring or screen positioning:

- Host element has `popover="auto"` from day one; consumer controls visibility via the `open` property (which calls `showPopover()`/`hidePopover()` internally) or directly via the popover API
- Renders with correct variant, placement CSS class, and `role="tooltip"`
- Component listens to native `beforetoggle`/`toggle`/`transitionend` events to sync `open` property and dispatch `swc-open`/`swc-after-open`/`swc-close`/`swc-after-close`. Events fire from these listeners regardless of what caused the state change (programmatic, Escape, or light-dismiss).
- Built-in Esc-to-close and light-dismiss via `popover="auto"`. Note: participates in the auto popover stack — opening this tooltip closes other open `auto` popovers (menus, pickers).
- On `open = true`, SWC resolves the trigger via `for` (ID lookup in the same root) or `trigger-element` (explicit reference) and sets `Element.ariaDescribedByElements = [tooltipHost]` on the trigger's interactive surface. Removed on `open = false`. See [ARIA relationship wiring](#aria-relationship-wiring).
- `placement` applies the CSS class (tip direction) only; no screen positioning is active without `PlacementController`. Stories fake positioning with inline styles; this limitation should be noted in the story.
- The tip element (`<span class="swc-Tooltip-tip">`) is always CSS-centered on the edge determined by the `placement` class. Its position is not dynamically adjusted relative to the trigger; this is a deliberate simplification and does not require `PlacementController`.
- `delayed`, `disabled`, and `offset` are present in the API but have no effect until the additive phase. `for` and `trigger-element` (setter) are active from the initial release and drive ARIA relationship wiring on `open` change. `manual` suppresses controller wiring but is effectively inert until the additive phase adds controllers.

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

#### ARIA relationship wiring

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
2. **Set `labeling` on the tooltip** when the trigger host cannot be modified. The SWC layer then sets `ariaLabelledByElements = [tooltipHost]` on the inner button instead of `ariaDescribedByElements` (additive phase, A11).

`role="tooltip"` is retained when `labeling` is set. Suppressing it conditionally adds complexity for marginal semantic gain. Document both paths in the Accessibility story.

---

## Architecture: core vs SWC split

> The 1st-gen component is a **reference only** — 2nd-gen is built independently. Neither generation imports from the other.

Follow the [Badge migration reference](../../02_workstreams/02_2nd-gen-component-migration/02_step-by-step/01_washing-machine-workflow.md#reference-badge-migration) as the concrete pattern for the core/SWC split.

| Layer | Path | Contains |
| ----- | ---- | -------- |
| **Core** | `2nd-gen/packages/core/components/tooltip/` | `Tooltip.base.ts`, `Tooltip.types.ts`: property definitions (including `triggerElement` declaration), type validation, state management, accessible-name rules. Sets `role="tooltip"` on the host element via `connectedCallback` — no rendering required. No Floating UI. No DOM traversal. |
| **SWC** | `2nd-gen/packages/swc/components/tooltip/` | `Tooltip.ts`, `tooltip.css`: rendering, stable `id` assignment on host, `popover="auto"` on host, `beforetoggle`/`toggle`/`transitionend` listeners for state sync and `swc-open`/`swc-after-open`/`swc-close`/`swc-after-close` dispatch, trigger resolution via `for` attribute (`getRootNode().getElementById(this.for)`) or explicit `trigger-element`, `Element.ariaDescribedByElements` wiring on the trigger's inner interactive element on `open` change (see [ARIA relationship wiring](#aria-relationship-wiring)), element registration, stories, tests. **Additive phase only:** `PlacementController` + `HoverController` integration; hover and focus-visible event wiring; warm-up/cooldown timing. |

Planned rendering shape (initial release):

- Core sets `role="tooltip"` on the host element (`this.setAttribute('role', 'tooltip')` in `connectedCallback`). The host element IS the tooltip surface; no inner role-bearing container needed.
- SWC assigns a stable `id` on the host (needed for consumer manual wiring and debugging; element references, not string IDs, are used for ARIA wiring) via an instance counter in `connectedCallback` if `this.id` is not already set: `if (!this.id) this.id = \`swc-tooltip-${++TooltipIdCounter}\``.
- SWC renders: tip element (`<span class="swc-Tooltip-tip">`); label span with default slot; event dispatch.
- In the initial release, SWC sets `popover="auto"` on the host, making the host element both the `role="tooltip"` element and the popover surface. In the additive phase, `PlacementController` and `HoverController` layer on top without structural changes to the host.
- SWC wires the ARIA relationship on `open` change: resolves trigger via `for`/`trigger-element`, applies inner-button resolution (see [ARIA relationship wiring](#aria-relationship-wiring)), and sets `Element.ariaDescribedByElements = [tooltipHost]` on the resolved interactive surface. Removed on `open = false`. Active in both automatic and manual modes when `for` or `trigger-element` is set.

**Resolved:** Ancestor-walking (`resolveSelfManagedTriggerElement()`) is not ported. 2nd-gen trigger resolution uses the `for` attribute (`getRootNode().getElementById(this.for)`) as the primary declarative mechanism, or the explicit `trigger-element` property for cross-shadow-root and programmatic cases — both implemented in SWC. Core declares the `triggerElement` property and its type. `HoverController` and `PlacementController` receive the resolved value from SWC and do not perform resolution themselves. SWC also uses the resolved value to drive ARIA relationship wiring directly on `open` change.

---

## Controller integration assumptions

This section records the design contract between the initial release and the two additive-phase controllers, so the integration can proceed without refactoring initial release internals.

### Event dispatch ownership

`swc-open`, `swc-after-open`, `swc-close`, and `swc-after-close` fire from the native `beforetoggle`/`transitionend` event listeners in the SWC layer — not from property setters or controllers. This means:

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

The `open` property setter calls `showPopover()`/`hidePopover()`. The `toggle` listener syncs the `open` property. To prevent a setter → showPopover → toggle → setter loop: the setter must check the current popover state before calling the API, and the `toggle` listener must update the property without re-triggering the setter (e.g., write to the private backing field directly, not through the setter). Example guard in the `open` setter:

```ts
set open(value: boolean) {
  if (value === this._open) return; // already in this state
  this._open = value;
  value ? this.showPopover() : this.hidePopover();
}
```

And in the `toggle` listener:

```ts
this._open = event.newState === 'open'; // bypass setter; do not call showPopover/hidePopover again
```

### `HoverController` hand-off

When `HoverController` is integrated in the additive phase, its responsibilities are bounded to:

- Receiving the resolved trigger element from SWC (`for` attribute lookup or explicit `trigger-element`) — the controller does not perform its own trigger discovery
- Attaching hover and focus-visible event listeners to that element
- Driving open/close by calling `showPopover()`/`hidePopover()` on the host (not by toggling `open` directly)
- Managing warm-up/cooldown timing when `delayed` is set
- Providing the WCAG 1.4.13 pointer bridge (keeping the popover open when the pointer moves from trigger into the tooltip bubble)

ARIA relationship wiring (`ariaDescribedByElements`/`ariaLabelledByElements` on the trigger's interactive surface) is handled by the SWC layer on `open` change — not by `HoverController`. See [ARIA relationship wiring](#aria-relationship-wiring).

`HoverController` does not dispatch any `swc-*` events. The existing `toggle` listener handles all event dispatch.

### `PlacementController` hand-off

When `PlacementController` is integrated in the additive phase, it:

- Computes `{ x, y }` coordinates using Floating UI after `showPopover()` fires (i.e., on `toggle` with `newState === 'open'`)
- Applies computed position to the host (already a `popover="auto"` element) via `position: fixed; left: ${x}px; top: ${y}px` or equivalent
- Maps `placement`, `offset`, `container-padding`, `cross-offset`, and `should-flip` attributes to Floating UI middleware options (`offset`, `flip`, `shift`)

The tip element is always CSS-centered on the placement edge and does not require any input from the controller (see [initial release behavioral semantics](#behavioral-semantics)). No arrow middleware is needed.

`PlacementController` does not change the popover mechanism; the host is already `popover="auto"`. It only layers pixel positioning on top.

### Positioning before `PlacementController`

In the initial release, `placement` applies only the CSS class (tip direction). The host has no pixel positioning from the component. Stories must supply inline styles or a CSS override to position the tooltip visibly near a trigger for demo purposes. This is intentional and should be noted in the relevant story's JSDoc.

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
- [ ] Plan reviewed by at least one other engineer

### Setup

- [ ] Create `2nd-gen/packages/core/components/tooltip/`
- [ ] Create `2nd-gen/packages/swc/components/tooltip/`
- [ ] Wire exports in both `package.json` files
- [ ] Confirm `spectrum-css` is checked out at `spectrum-two` branch as sibling directory (already confirmed available at path `../../../../../spectrum-css/`)

### API

#### Naming and public surface

- [ ] `Tooltip.types.ts`: define `TooltipVariant` (`'neutral' | 'informative' | 'negative'`); define `TooltipPlacement` (all physical + logical values)
- [ ] `Tooltip.base.ts`: define all properties with decorators (including `for` and `triggerElement` declarations); assign `role="tooltip"`; no rendering. No DOM traversal logic.
- [ ] `Tooltip.ts` (SWC): rendering, `popover="auto"` on host, `beforetoggle`/`toggle`/`transitionend` listeners for state sync and `swc-open`/`swc-after-open`/`swc-close`/`swc-after-close` dispatch, trigger resolution via `for`/`trigger-element`, `Element.ariaDescribedByElements` wiring on `open` change. (`PlacementController`/`HoverController` integration is additive phase.)

#### Alignment checks

- [x] Core vs SWC split confirmed: Core declares `triggerElement` property; SWC resolves trigger via `for` attribute (ID lookup) or explicit `trigger-element` — no ancestor-walking

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
- [ ] Stable, unique `id` per instance; required for consumer manual wiring and debugging (element references, not string IDs, are used for ARIA wiring)
- [ ] `Element.ariaDescribedByElements` set on the trigger's inner interactive element (via `querySelector('button')`, or host element fallback) when tooltip opens; removed on close (see [ARIA relationship wiring](#aria-relationship-wiring))
- [ ] Document `Element.ariaDescribedByElements` inner-button approach and browser support in Accessibility story (see [Accessibility semantics notes](#accessibility-semantics-notes-2nd-gen))

#### State verification

- [ ] `[open]` reflects on host when tooltip is visible
- [ ] `[disabled]` prevents automatic mode from responding to hover/focus events **(additive phase)**
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
- [ ] `swc-open`, `swc-after-open`, `swc-close`, `swc-after-close` events dispatched correctly when `open` changes
- [ ] `Escape` closes tooltip when open; focus remains on trigger
- [ ] ARIA wiring: `for="[id]"` resolves trigger and sets `ariaDescribedByElements = [tooltipHost]` on the trigger's inner `<button>` (open shadow root) when `open = true`; removed when `open = false`
- [ ] ARIA wiring: when trigger has no open shadow root (native element), `ariaDescribedByElements` is set on the trigger host element
- [ ] ARIA wiring: `trigger-element` setter overrides `for` and drives the same wiring
- [ ] ARIA wiring: no wiring when neither `for` nor `trigger-element` is set; no error thrown
- [ ] ARIA wiring: fires in manual mode when `for` is set and consumer sets `open = true`
- [ ] Automatic mode: opens on trigger hover; closes on pointer leave **(additive phase)**
- [ ] Automatic mode: opens on trigger focus-visible; closes on blur **(additive phase)**
- [ ] Automatic mode: pointer can move to tooltip bubble without closing (WCAG 1.4.13) **(additive phase)**
- [ ] Automatic mode: `for` attribute resolves to the element with the matching `id` in the same document tree root **(additive phase)**
- [ ] Automatic mode: `for` pointing to a non-existent `id` results in no trigger wiring (no-op; warn in debug mode) **(additive phase)**
- [ ] Automatic mode: `trigger-element` takes precedence over `for` when both are set **(additive phase)**
- [ ] Automatic mode: `trigger-element` wires correctly for cross-shadow-root trigger relationships **(additive phase)**
- [ ] Automatic mode: `delayed` warm-up/cooldown timing (1500ms warmup, 1500ms cooldown; aligns with React Spectrum) **(additive phase)**
- [ ] Automatic mode: `for` resolves correctly when trigger and tooltip share a shadow root (ID lookup scoped to that root) — rewrite fresh; do not port the 1st-gen `self manages through a shadow boundary` test, which validates ancestor-walking and does not apply **(additive phase)**
- [ ] `manual` attribute: controller wiring is skipped when added; consumer-driven `open` changes dispatch all `swc-*` events and ARIA wiring still fires when `for` is set **(additive phase — verify controller suppression)**
- [ ] `labeling` attribute: `ariaLabelledByElements` is set on the inner interactive element instead of `ariaDescribedByElements`; verify correct AT announcement for icon-only button pattern **(additive phase)**
- [ ] `ariaDescribedByElements` wiring: verify AT can traverse the association in DevTools Accessibility panel and with NVDA/VoiceOver
- [ ] `ariaDescribedByElements` wiring fallback: when trigger has no shadow root (native `<button>`, `<a>`, `<input>`), association is established on the host element directly
- [ ] `disabled` attribute prevents automatic mode response to user input **(additive phase)**

#### Visual regression

- [ ] VRT for all 3 variants (neutral, informative, negative) × all cardinal placements (top, bottom, left, right)
- [ ] VRT for at least one logical placement (start, end) verifying RTL behavior
- [ ] VRT for open and closed states with transition
- [ ] VRT for forced-colors / high-contrast mode
- [ ] VRT for CJK line-height at `:lang(ja)` or `:lang(ko)`

### Documentation

#### General

- [ ] JSDoc on all public properties, slots, and any exposed CSS custom properties
- [ ] Stories: Playground, Overview, Anatomy (default slot), Options (variants, placements), States (open), Accessibility. Behaviors story (automatic trigger-wiring, delayed, `trigger-element`) is additive phase.

#### Breaking changes

- [ ] Consumer migration guide: remove all `slot="icon"` usage (B1)
- [ ] Consumer migration guide: replace `variant="positive"` with `variant="informative"`, `variant="neutral"`, or `variant="negative"` as content warrants (B2)
- [ ] Consumer migration guide: update `variant="info"` → `variant="informative"` (B3)
- [ ] Consumer migration guide: remove `sp-opened`/`sp-closed` listeners; add `swc-open`/`swc-after-open`/`swc-close`/`swc-after-close` listeners as needed (B5)
- [ ] Consumer migration guide: note event timing change — native popover lifecycle fires at different points than the 1st-gen overlay sequence (B5)
- [ ] Consumer migration guide: remove `self-managed` attribute from all existing tooltip usage; automatic trigger wiring is on by default with no attribute required; add `manual` only when programmatic open/close control is needed (B6)
- [ ] Consumer migration guide: authoring pattern change — move `<sp-tooltip>` out of the trigger component (1st-gen pattern); add `id` to the trigger element and `for="[id]"` to the tooltip; the tooltip may be placed anywhere in the same document tree root (additive phase)
- [ ] Consumer migration guide: for cross-shadow-root triggers or programmatic wiring where ID resolution cannot reach the trigger, set the `trigger-element` property to a direct element reference (additive phase)
- [ ] Consumer migration guide: document that `popover="auto"` auto-stack behavior differs from 1st-gen `type="hint"` isolation — opening a tooltip closes other open auto popovers (menus, pickers); this is accepted behavior, not a bug
- [ ] Behaviors story: note the auto-stack behavior and that it is expected (Q2 resolved, Path A)

#### Accessibility

- [ ] Storybook Accessibility story: document ARIA features (`role="tooltip"`, `ariaDescribedByElements` / `ariaLabelledByElements` lifecycle, inner-button resolution), keyboard behavior (`Escape` closes without moving focus; `Tab` blur dismisses), and screen reader expectations (trigger announced first, tooltip text second)
- [ ] No interactive content (links, buttons, focusable elements) may appear inside `role="tooltip"`; direct consumers to `swc-popover`, contextual help, or dialog for those patterns
- [ ] `aria-describedby` semantics: tooltip text supplements the trigger's accessible name — do not use tooltip to duplicate what `aria-label`/`aria-labelledby` already conveys; document opt-out semantics (SWC-1465)
- [ ] Tooltip must be placed on a focusable trigger; non-interactive elements (static text, decorative icons) require contextual help instead
- [ ] Variant colors are supplementary: pair each variant with readable text; meaning must not rely on color alone (WCAG 1.4.1)
- [ ] Touch guidance: tooltip is hover/focus only; direct consumers to `swc-popover` or contextual help for explicit disclosure on touch devices
- [ ] No auto-dismiss timer: tooltip must remain visible until the user dismisses it or the triggering state becomes invalid (WCAG 1.4.13)
- [ ] Icon-only trigger pattern: document in Accessibility story that (1) adding an accessible name directly to the trigger host (`aria-label` on native elements; `accessible-label` attribute on 2nd-gen SWC components) is preferred and works from the initial release; (2) the `labeling` attribute switches the SWC layer to wire `aria-labelledby` for cases where the trigger host cannot be modified (additive phase); (3) explain the semantic difference between labeling (accessible name) and describing (supplementary hint)
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
| Q1 | **`tip-padding` semantics.** In 1st-gen, `tipPadding` was passed to `sp-overlay` for tip position calculation. **Resolved: dropped from Tooltip.** The tip is CSS-centered; no arrow middleware applies. For components with dynamic tips (Popover, CoachMark), `arrowPadding` is a PlacementController-level concern and will be addressed in that controller's design. | N/A | Resolved | Team |
| Q2 | **`popover="auto"` stack isolation regression.** In 1st-gen, `type="hint"` overlays were isolated — opening a tooltip did not dismiss open menus or pickers. `popover="auto"` has no isolation tier; any auto popover opening dismisses all others. **Resolved: Path A accepted.** The behavior is documented as a known difference from 1st-gen. No workaround; document in consumer migration guide and Behaviors story. | N/A | Resolved | Team |

### Deferred implementation tickets

Create these tickets before this migration PR closes. Link each to Epic SWC-2017.

| Ticket | Summary | Why deferred | Plan sections |
| ------ | ------- | ------------ | ------------- |
| TBD | **Integrate PlacementController into Tooltip.** Pass resolved trigger element to controller (from SWC's `for`/`trigger-element` resolution — no internal resolution in the controller); wire viewport-aware pixel positioning: apply `placement`, `offset`, `container-padding`, `cross-offset`, `should-flip` as Floating UI middleware options. No `arrowPadding` needed — tooltip tip is CSS-centered. | Blocked on `PlacementController` extraction per Overlay RFC. | Additive A1 (positioning), A7, A8, A9 |
| TBD | **Integrate HoverController into Tooltip.** Pass resolved trigger element to controller; wire hover and focus-visible events, warm-up/cooldown timing (`delayed`), `disabled` guard, and WCAG 1.4.13 pointer bridge. Controller receives trigger element from SWC — no internal trigger resolution. Hover and focus-visible wiring skipped when `manual` is set. ARIA relationship wiring is handled by the SWC layer separately (see [ARIA relationship wiring](#aria-relationship-wiring)). | Blocked on `HoverController` extraction per Overlay RFC. `HoverController` and `PlacementController` can be integrated in separate tickets; full automatic trigger integration requires both. | Additive A1 (hover/focus), A2, A3, A4 |
| TBD | **2nd-gen tooltip-directive.** Lit directive for programmatic tooltip insertion. Creates `<swc-tooltip>` as a sibling of the target and handles lifecycle cleanup. Simpler than 1st-gen: no `sp-overlay` wrapper needed; automatic trigger wiring activates because `manual` is not set. | Requires full automatic trigger integration (both controllers). | Additive A6 |
| TBD | **`no-tip` attribute.** Remove the directional tip arrow. Figma-confirmed. Can proceed independently of controller integration; no controller dependency. Create when React Spectrum adds support as a confirming signal. | No cross-framework confirmation yet; Figma-only signal is not sufficient to ship. | Additive A5 |

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

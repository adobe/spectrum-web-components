<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../../README.md) / [Project planning](../../README.md) / [Components](../README.md) / Toast / Toast migration plan

<!-- Document title (editable) -->

# Toast migration plan

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
- [Open gen1 issues](#open-gen1-issues)
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
- [Decision log](#decision-log)
- [References](#references)

</details>

<!-- Document content (editable) -->

## TL;DR

- Toast is a small, self-contained component: one host, one message slot, one optional action, a close button, an auto-dismiss timer.
- Toast ships alongside a first-party container/queue in this migration. The container's shape and API are still being worked out; see Q6 in the [Decision log](#decision-log).
- 1st-gen defines 5 variant values (`negative`, `positive`, `info`, `error`, `warning`); `error` and `warning` are already deprecated aliases of `negative` in 1st-gen and do not carry forward. 2nd-gen has 4 variants: `neutral`, `info`, `positive`, `negative`.
- Points of disagreement, see [Design](#design) for more detail:
    - **Timeout minimum** (6000ms vs. 5000ms)
    - **Action+timeout** (soft warning vs. hard block)
    - **Action API shape** (light-DOM `action` slot vs. `actionLabel`/`onAction` props)
    - **Timer pause scope** (per-toast vs. region-wide)

### Most blocking open questions

- **Q1** in [Design](#design): timeout minimum. 6000ms (1st-gen/a11y doc) vs. 5000ms (RSP S2).
- **Q2** in [Design](#design): action + auto-dismiss. Warn-only vs. hard-disable timeout when an action is present.
- **Q3** in [Design](#design): action API shape. `action` slot (light DOM) vs. `action-label`/`swc-action` props.
- **Q7** in [Design](#design): timer pause scope. Per-toast (a11y doc's current recommendation) vs. region-wide (RSP S2 reality).
- **Q9** in [Design](#design): message content slot. Default slot (current plan, may lack an ID-bearing wrapper) vs. a named slot (guarantees one).

---

## 1st-gen API surface

**Source:** [`1st-gen/packages/toast/src/Toast.ts`](../../../../1st-gen/packages/toast/src/Toast.ts)
**Version:** `@spectrum-web-components/toast@1.12.2`
**Custom element tag:** `sp-toast`

### Properties / attributes

| Property | Type | Default | Attribute | Notes |
| -------- | ---- | ------- | --------- | ----- |
| `open` | `boolean` | `false` | `open` (reflect) | Visibility |
| `timeout` | `number \| null` | `null` | `timeout` | Auto-dismiss delay in ms. Setter floors any value `> 0` to `6000`; `null`/`0`/negative disables auto-dismiss |
| `variant` | `ToastVariants` | `''` | `variant` | `'negative' \| 'positive' \| 'info' \| 'error' \| 'warning' \| ''`. `error`/`warning` deprecated, alias `negative`. Invalid values strip the attribute |
| `iconLabel` | `string \| undefined` | `undefined` | `icon-label` | Overrides the variant icon's `label`; falls back to variant default |

### Methods

| Method | Signature | Notes |
| ------ | --------- | ----- |
| `close` | `close(): void` | Sets `open = false` directly, no event |

### Events

| Event | Dispatched when | Notes |
| ----- | --------------- | ----- |
| `close` | Close button clicked or timeout elapses | `composed`, `bubbles`, `cancelable`. If not cancelled, `close()` runs internally |

### Slots

| Slot | Content | Notes |
| ---- | ------- | ----- |
| default | Toast message text | |
| `action` | Optional action button (light DOM) | Max one, per design |

### CSS custom properties

No dedicated rendering-and-styling analysis doc exists for Toast (out of scope this cycle); this is pulled directly from `1st-gen/packages/toast/src/toast.css.js`.

1st-gen exposes roughly two dozen `--mod-toast-*` passthrough properties over spectrum-css tokens:

- **Sizing:** `max-inline-size`, `block-size`, `border-width`, `corner-radius`
- **Typography:** `font-size`, `font-weight`, `line-height` (plus a separate CJK `line-height` variant)
- **Color:** `background-color-default`, per-variant background colors (`negative`, `informative`, `positive`), `text-and-icon-color`, `divider-color`
- **Spacing:** ~9 tokens positioning the icon, text, action button, divider, and close button relative to each other and the toast edges

This full modifier surface will not be carried forward to 2nd-gen.

### Shadow DOM output (rendered HTML)

```html
<sp-toast variant="info" open>
  <sp-icon-info label="Information" class="type"></sp-icon-info>
  <div class="body" role="alert">
    <div class="content"><slot></slot></div>
    <slot name="action"></slot>
  </div>
  <div class="buttons">
    <sp-close-button label="Close" static-color="white"></sp-close-button>
  </div>
</sp-toast>
```

---

## Dependencies

| Package | Version | Role |
| ------- | ------- | ---- |
| `@spectrum-web-components/base` | 1.12.2 | Lit base class |
| `@spectrum-web-components/button` | 1.12.2 | `sp-close-button` |
| `@spectrum-web-components/icon` | 1.12.2 | Declared in `package.json` but not directly imported anywhere in the toast package; likely a transitive requirement of `icons-workflow` |
| `@spectrum-web-components/icons-workflow` | 1.12.2 | `sp-icon-info`, `sp-icon-alert`, `sp-icon-checkmark-circle` |
| `@spectrum-web-components/shared` | 1.12.2 | `FocusVisiblePolyfillMixin` |
| `SlotPresenceController` | already built | Gates whether the `action` slot has content, for the timeout-plus-action dev warning (Q2) and whether the action button participates in the Tab order. See [`2nd-gen/packages/core/controllers/slot-presence-controller/`](../../../../2nd-gen/packages/core/controllers/slot-presence-controller/slot-presence-controller.mdx). |
| `SlotAttributePropagationController` | already built | Propagates the host's `size`/`variant` onto the slotted `action` button, so it styles as expected without the consumer setting those attributes twice. See [`2nd-gen/packages/core/controllers/slot-attribute-propagation-controller/`](../../../../2nd-gen/packages/core/controllers/slot-attribute-propagation-controller/slot-attribute-propagation-controller.mdx). |
| `swc-popover`'s `modal` mode (native `<dialog>.showModal()`, `2nd-gen/packages/core/components/popover/Popover.base.ts`) | already built | Precedent for the expanded view's focus containment: opting into native `<dialog>.showModal()` gives a native focus trap, native background inert, and a native `::backdrop` scrim, in place of a hand-rolled focus-trap implementation. Already paired below with `PageScrollLockController` and `dismissibleStack` for the same kind of blocking surface. |
| `PageScrollLockController` | already built | Reference-counted page-scroll lock for the expanded view, matching RSP S2's `useModalOverlay` ("prevent scroll... since we take over the whole screen"). Already used by `swc-popover`'s `modal` mode for the same kind of stacked blocking surface. See [`2nd-gen/packages/core/controllers/page-scroll-lock-controller/`](../../../../2nd-gen/packages/core/controllers/page-scroll-lock-controller/page-scroll-lock-controller.mdx). |
| `registerDismissible()` / `unregisterDismissible()` / `isTopDismissible()` (`dismissibleStack`, `2nd-gen/packages/core/utils/dismissible-stack.ts`) | already built | Coordinates `Escape`-to-collapse in the expanded view with other open top-layer surfaces (a popover or tooltip open at the same time), so only the topmost one closes. Already shared by `swc-popover`'s `modal` mode and `swc-tooltip`. |
| `getActiveElement()` / `deepContains()` (`2nd-gen/packages/core/utils/`) | already built | Shadow-DOM-aware focus tracking, needed to know which toast currently has focus and what was focused before the user entered the region (focus-management-on-close). Already used by `swc-popover`. |
| `focusableSelector` (`2nd-gen/packages/core/utils/focusable-selectors.ts`) | already built | Spec-based focusable-element selector, needed to enumerate the expanded list's focusable elements for the focus trap. Already used by `prompt-field`. |
| `uniqueId()` (`2nd-gen/packages/swc/utils/id.ts`) | already built | Generates the content-element ID the host's `aria-labelledby` references. |
| `warnIf()` / `validateEnum()` (`2nd-gen/packages/core/utils/dev-validation.ts`) | already built | The established dev-mode warning framework; use for variant validation and the timeout-plus-action dev warning (Q2) rather than a hand-rolled `console.warn`. |

None of the shared core resources above are sequenced dependencies; all are already built and available now.

---

## Open gen1 issues

| Jira | Type | Status (snapshot) | Summary | Notes |
| ---- | ---- | ----------------- | ------- | ----- |
| SWC-610 | Bug | To Do | Toast timeout minimum differs from design docs | See Q1 |

Already-fixed gen1 bugs whose behavior must not regress in 2nd-gen (not listed as rows since they're Done/Closed, not open work; evidence is cross-referenced where it's already used elsewhere in this plan):

- SWC-281, SWC-280 (Done): screen-reader announcement on toast add, and icon alt-text override. Both already required by [accessibility-migration-analysis.md](./accessibility-migration-analysis.md).
- SWC-475 (Done), duplicate of SWC-213 ([GH #4587](https://github.com/adobe/spectrum-web-components/issues/4587)): long unbroken words overflow the toast bounds. Fix carried into the [Styling](#styling) checklist.
- SWC-603 (Closed, Won't fix), [GH #4931](https://github.com/adobe/spectrum-web-components/issues/4931): `error`/`warning`/`success` marked `// deprecated` in code but never formally documented. Confirms those variants were already stale in 1st-gen.

## Migration sequencing and prerequisites

### Dependency-aware recommendation

No prerequisites. Toast has no dependents in-tree and depends only on `swc-close-button`, which already exists in 2nd-gen (`2nd-gen/packages/swc/components/close-button/`). Toast's pause-preserving countdown can't live inline in `Toast.base.ts`: once a toast can be demoted to a non-rendered peek layer in the queue, per-instance state doesn't survive that. It needs its own queue-level construct, separate from `Toast.base.ts`, regardless of whether any other component ever needs a similar controller. See Q5 in [Architecture and behavior](#architecture-and-behavior).

### Related components and ordering notes

| Component | Relationship | Notes |
| --------- | ------------ | ----- |
| `swc-close-button` | Dependency, already migrated | `accessible-label` confirmed as the real 2nd-gen attribute (verified in `button` family source) |
| Toast container / queue | In scope, ships alongside `swc-toast` | Shape and API still being finalized across this plan; see Q6 |

### User confirmation needed

Whether the queue's countdown construct belongs in a shared, cross-component location (`2nd-gen/packages/core/controllers/`), in case another component needs similar queue behavior later, or stays toast-specific under `2nd-gen/packages/core/components/toast/` until a second consumer actually appears. Also unresolved: what owns the container's visual rendering (region wrapper, list, peek-stack layering, expanded view), since the Queue construct as currently scoped is state-only. See Q5 in [Architecture and behavior](#architecture-and-behavior).

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
| B1 | `variant` set shrinks | `negative`, `positive`, `info`, `error`, `warning`, `''` | `neutral`, `info`, `positive`, `negative` | Replace `error`/`warning` with `negative` |
| B2 | `close()` behavior | Direct `open = false`, no signal | Keep as-is (no evidence to change) | None |

#### Styling and visuals

| # | What changes | 1st-gen behavior | 2nd-gen behavior | Consumer migration path |
| --- | ------------ | ---------------- | ---------------- | ----------------------- |
| S1 | Adopt S2 tokens | S1 tokens | S2 tokens from `spectrum-css` `spectrum-two` | Visual update only |
| S2 | Peek-stack depth styling | None (no queue exists) | Stacked-card depth behind the front toast: positional offset and opacity falloff, `opacity: 0` beyond the third position, matching RSP S2 | None (new functionality) |
| S3 | Expand/collapse layout | None (no queue exists) | Full-screen expanded-view layout with a dismissible scrim and a collapsed/expanded transition; front-toast expand control laid out via `gridTemplateAreas` alongside the action button | None (new functionality) |

#### Accessibility and behavior

| # | What changes | 1st-gen behavior | 2nd-gen behavior | Consumer migration path |
| --- | ------------ | ---------------- | ---------------- | ----------------------- |
| A1 | Host role | `role="alert"` on inner `.body` div only | `role="alertdialog"` + `aria-modal="false"` on host; inner `role="alert"` `aria-atomic="true"` | None |
| A2 | Host naming | None | `aria-labelledby` referencing a content-element ID, falling back to `aria-label` from default-slot text | None |
| A3 | `aria-hidden` when closed | Not set (CSS only) | `aria-hidden="true"` on host when `open` is false | None |
| A4 | Timer pause | `focusin`/`focusout` only; restarts full timeout | Pause on `pointerenter` + `focusin`; preserve remaining time; resume only when both clear. Per-toast vs. region-wide scope is Q7 | None |
| A5 | Timeout minimum | 6000ms | ❓ Pending Q1: 6000ms or 5000ms | None |
| A6 | Action + auto-dismiss | Unguarded | ❓ Pending Q2: dev warning vs. hard-disable | Depends on Q2 resolution |
| A7 | Close button label | `label="Close"` | `accessible-label="Close"` on `swc-close-button` | None |

#### Container and queue

| # | What changes | 1st-gen behavior | 2nd-gen behavior | Consumer migration path |
| --- | ------------ | ---------------- | ---------------- | ----------------------- |
| C1 | First-party toast container/queue | None (new functionality) | Ships alongside `swc-toast` in this migration; shape and API still being finalized, see Q6 in the [Decision log](#decision-log) | TBD |

### Additive — ships when ready, zero breakage for consumers already on 2nd-gen

| # | What is added | Notes |
| --- | ------------- | ----- |
| A1 | `--swc-*` custom properties | None in the initial set; add a property only once a concrete override need surfaces, see [CSS custom properties (2nd-gen)](#css-custom-properties-2nd-gen) |

---

## 2nd-gen API decisions

Derived from the 1st-gen implementation, the accessibility migration analysis, the Figma `S2 / Web` Toast frame, and React Spectrum S2 (`@react-spectrum/s2/src/Toast.tsx`, `react-aria/src/toast/useToast.ts`). Confirmed items are marked; open items are tracked in [Blockers and open questions](#blockers-and-open-questions).

- **Confirmed**: directly supported by source material
- **Inferred**: recommended based on multiple signals, but not explicitly specified in one authoritative source
- **Open question**: unresolved and needs review or more input

### Public API

#### Properties / attributes (2nd-gen)

| Property | Type | Default | Attribute | Notes |
| -------- | ---- | ------- | --------- | ----- |
| `open` | `boolean` | `false` | `open` (reflect) | **Confirmed.** |
| `variant` | `'neutral' \| 'info' \| 'positive' \| 'negative'` | `'neutral'` | `variant` (reflect) | **Confirmed.** Figma and RSP S2 both show 4 variants; 1st-gen's `error`/`warning` are deprecated aliases of `negative`, not carried forward |
| `timeout` | `number \| null` | `null` | `timeout` | **Open question.** Floor value is Q1 |
| `icon-label` | `string \| undefined` | `undefined` | `icon-label` | **Confirmed.** Carried forward as-is |
| `action-label` / keep `action` slot | — | — | — | **Open question**, Q3 |

#### Visual matrix (2nd-gen)

| Variant | Figma label | Icon | Default icon label |
| ------- | ----------- | ---- | ------------------- |
| `neutral` (default) | Neutral | None | — |
| `info` | Informative | `InfoCircle` | "Information" |
| `positive` | Positive | `CheckmarkCircle` | "Success" |
| `negative` | Negative | `AlertTriangle` | "Error" |

Icons confirmed against Figma. Source from the public `@adobe/spectrum-wc-icons` workflow-icon package (`Icon_InfoCircle()`, `Icon_CheckmarkCircle()`, `Icon_AlertTriangle()`, or the `<swc-icon-*>` elements), not the internal lean icon set in `2nd-gen/packages/swc/components/icon/elements/`. Forward Toast's resolved icon label (default or `icon-label` override) straight into the icon's own `accessible-label`; empty renders it decorative, matching the a11y doc's `icon-label=""` suppression behavior for free.

Action button (when present): secondary, outline, `static-color="white"`. Confirmed by Figma playground and RSP S2 (`variant="secondary" fillStyle="outline" staticColor="white"`).

#### Slots (2nd-gen)

| Slot | Content | Notes |
| ---- | ------- | ----- |
| default | Toast message text | **Open question**, Q9: staying the default slot means content can be a bare text node with no element to hold the `aria-labelledby` target ID (falls back to `aria-label`, see [Accessibility semantics notes](#accessibility-semantics-notes-2nd-gen)); a named slot would let the component guarantee a light-DOM wrapper instead. |
| `action` | Optional action button | **Open question**, Q3: may become `action-label`/`swc-action` props instead. If the slot is kept, presence is gated by `SlotPresenceController` and `size`/`variant` are propagated onto the slotted button by `SlotAttributePropagationController`, both already built; see [Dependencies](#dependencies). |

#### CSS custom properties (2nd-gen)

No `--mod-*` properties will be exposed. New `--swc-*` component-level properties may be introduced where needed — these are additive and not breaking. See [Component Custom Property Exposure](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/02_custom-properties.md#component-custom-property-exposure) for what to expose and how.

No properties are exposed in the initial set. Add a `--swc-toast-*` property only once implementation surfaces a concrete override need, per the [decision tree](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/02_custom-properties.md#decision-tree-for-exposure) above. Height in particular is composed from padding, font-size, and line-height rather than exposed as its own property, matching Design's direction away from explicit height controls.

**Excluded:**

- Background color, text color, icon color, per the style guide's exclusions. Toast's text/icon color is fixed white against a saturated variant background (the same contrast-intent exclusion as static-color components), and background color is set per semantic variant, not consumer-overridable per the badge/status-light precedent for semantic (non-decorative) variant colors.
- `max-inline-size`. A single constant value regardless of variant, same as `swc-tooltip`/`swc-popover` (also not exposed). The host is directly stylable from outside (`swc-toast { max-inline-size: 400px; }`), no custom property needed.

### Behavioral semantics

- Auto-dismiss timer pauses on `pointerenter` + `focusin`, preserving remaining time; resumes only once both `pointerleave` and `focusout` have fired. This describes per-toast pause; whether this should instead be region-wide (matching RSP S2, which pauses every visible toast together) is Q7.
- Matches the event set of other visibility-toggling components: `swc-open` before the enter transition plays, `swc-after-open` once it completes, `swc-close` (cancelable) before the exit transition plays, `swc-after-close` once it completes.
- Text wrapping is automatic, not an option. Content wraps naturally within whatever `max-inline-size` the host is given (directly stylable from outside; no `--swc-*` custom property, see [CSS custom properties (2nd-gen)](#css-custom-properties-2nd-gen)); no `width` property exists on `sp-toast` in 1st-gen or on `Toast` in RSP S2. Long unbroken words specifically need `overflow-wrap`/`word-break` (SWC-475, see [Styling](#styling)) on top of normal wrapping.
- No `placement` property. Confirmed absent from 1st-gen `sp-toast`'s own API: the 1st-gen story's `placement` values (bottom/left/right/top) belong to `overlay-trigger`, an unrelated demo wrapper, not `sp-toast` itself. RSP's `placement` (`top`/`bottom`/`top end`/`bottom end`) lives on `ToastContainer`, never on individual `Toast`. Placement is a future container-level concern; see Q6.
- Every queued toast stays tracked in the queue, with no cap; only a few are ever rendered as full content. RSP S2's own `ToastQueue` is explicitly constructed with `maxVisibleToasts: Infinity` (the primitive's own default is 1, a single visible toast; S2 overrides it), and only the front two peek positions plus the front toast itself render as anything visible.
- New toasts join the front of the queue, not the back (RSP S2: `queue.unshift(toast)` in `useToastState.ts`), so adding a toast while one is already showing immediately promotes the new one to front and demotes the old one behind it. This is intentional, not a bug: a [reported issue](https://github.com/adobe/react-spectrum/issues/7917) treats it as confusing UX, but there is no FIFO "wait your turn" queuing in the source.
- Peek stack: collapsed with two or more toasts queued, only the front toast renders as a real, interactive alertdialog; the two behind it render as decorative `role="presentation"` layers with no content. Anything further back stays in the DOM at `opacity: 0` rather than being removed (RSP S2: `opacity: index >= 3 ? 0 : 1`), to support a smooth transition if it's later promoted forward; see Q8. Confirmed against RSP S2's `Toast.tsx` (only the front toast gets the full alertdialog treatment while collapsed; every other toast renders `role="presentation"` instead).
- An expand control appears on the front toast once two or more toasts are queued, laid out on its own row below the message with the action button (RSP S2: `gridTemplateAreas: ['content content content', 'expand . action']`). Activating it moves focus to that toast's own host (since the control itself disappears once expanded) and opens every toast into a full list, where each becomes its own real alertdialog.
- The expanded view also collapses automatically once the queue empties, without a focus redirect: a separate code path from the explicit collapse triggers described in [Accessibility semantics notes](#accessibility-semantics-notes-2nd-gen) (RSP S2: a queue-subscription effect calls the overlay state's `close()` directly).
- The queue exposes a `clear()` operation that empties every queued toast at once, surfaced via a Clear all control in the expanded view (RSP S2: `queue.clear()`). This is a queue-level method, not an instance method on `swc-toast` itself; 1st-gen's `close()` (single toast) has no equivalent for the whole queue.
- Toast's own enter/exit animation gates `swc-after-open`/`swc-after-close` on the host's CSS transition completion via the existing `runAfterTransition` core utility (`2nd-gen/packages/core/utils/transition.ts`), the same mechanism `swc-popover` and `swc-tooltip` already share for their identical event pairs. No new infrastructure needed here.
- Repositioning a toast between peek, front, and expanded-list position is a separate, harder problem: no existing 2nd-gen component does this kind of cross-position repositioning (checked Accordion, the closest analog; it has none). RSP S2 wraps queue-level state changes (add/remove/expand/collapse) in the View Transitions API for a smooth cross-position morph, falling back to no animation at all where unsupported. Whether `swc-toast` does the same or accepts an instant swap between positions is Q8.

### Accessibility semantics notes (2nd-gen)

See [Toast accessibility migration analysis](./accessibility-migration-analysis.md) for the full spec.

- `role="alertdialog"` + `aria-modal="false"` on host; opening never moves focus.
- `tabindex="0"` on host always, per the a11y doc; opening a toast does not move focus there. It makes the host a normal tab stop, matching RSP.
- Host naming uses `aria-labelledby` referencing a content-element ID, generated with the shared `uniqueId()` utility (see [Dependencies](#dependencies)), falling back to `aria-label` from slot text when no explicit ID is available. RSP S2 splits this further into a separate `aria-labelledby` (title) and `aria-describedby` (description) element; `swc-toast`'s single content ID is a deliberate simplification, since it has one default slot for message text rather than separate title/description slots.
- The expanded view takes over the screen: a dismissible scrim, <kbd>Escape</kbd>, and a dedicated Collapse control all collapse it, and focus is contained within it while open. `swc-popover`'s `modal` property is the 2nd-gen precedent for exactly this: opting into native `<dialog>.showModal()` gives a native focus trap, native background inert, and a native `::backdrop` scrim with no hand-rolled focus-trap implementation needed (RSP S2 does the equivalent with `FocusScope`/`useModalOverlay`, a React-only mechanism with no 2nd-gen counterpart). `Escape` handling should go through the shared `dismissibleStack` (`registerDismissible()`/`isTopDismissible()`) so it coordinates correctly with a popover or tooltip also open at the same time, and the screen-takeover itself should use `PageScrollLockController` for the scroll lock; `swc-popover`'s modal mode already wires up both, all already built, see [Dependencies](#dependencies). Collapsing moves focus to the container region, not to whatever was focused before expanding (RSP S2: `collapse()` calls `regionRef.current?.focus()`).
- When a focused toast closes (close button, action button, or auto-dismiss) and other toasts remain, focus moves to the nearest still-open toast: the newer one in front of it if there is one, otherwise the older one behind it. If the user is in pointer modality, focus instead leaves the region entirely, back to whatever was focused before the user entered it, specifically so the remaining toasts' timers don't appear stuck (region-wide pause is tied to focus staying within the region; see Q7). RSP S2's `useToastRegion.ts` branches this way explicitly. Tracking which toast currently has focus, and what was focused before the user entered the region, should use the shared `getActiveElement()`/`deepContains()` utilities (shadow-DOM-aware); the expanded list's focus trap should enumerate candidates with the shared `focusableSelector`. All already built; see [Dependencies](#dependencies).
- When the last toast closes and the queue empties, focus always returns to whatever was focused before the user entered the region, regardless of modality (RSP S2: tracked as the region's `focusWithin` `relatedTarget` when focus first entered it).
- The container region is discoverable via landmark navigation (<kbd>F6</kbd>/<kbd>Shift</kbd> + <kbd>F6</kbd> in JAWS and NVDA) purely as a consequence of carrying `role="region"` and an `aria-label`. No additional code is needed for this; RSP S2 has none either.
- Navigating the expanded list uses <kbd>Tab</kbd> only; arrow keys are not used. `FocusgroupNavigationController` (the shared roving-tabindex/arrow-key controller used by `tabs`, `action-group`, and others) does not apply here for exactly that reason, it's built for arrow-key composite widgets, not this Tab-only model, so it's deliberately not a dependency.

---

## Architecture: core vs SWC split

> The 1st-gen component is a **reference only** — 2nd-gen is built independently. Neither generation imports from the other.

Follow the [Badge migration reference](../../02_workstreams/02_2nd-gen-component-migration/02_step-by-step/01_washing-machine-workflow.md#reference-badge-migration) as the concrete pattern for the core/SWC split.

| Layer | Path | Contains |
| ----- | ---- | -------- |
| **Core** | `2nd-gen/packages/core/components/toast/` | `Toast.base.ts`, `Toast.types.ts`: property declarations, variant validation, `aria-labelledby`/`aria-label` derivation. Also gates `swc-after-open`/`swc-after-close` on the host's own CSS transition completion via the shared `runAfterTransition` utility, matching `swc-popover`/`swc-tooltip`. No rendering, no timer ownership; see the queue layer below. |
| **Queue** | `2nd-gen/packages/core/components/toast/` (exact file TBD, see Q5) | Owns each queued toast's countdown: timeout flooring, pause rules (`pointerenter`/`focusin`/`pointerleave`/`focusout`, scope pending Q7), and remaining-time tracking, keyed to the toast's own record in the queue, not to whichever element currently renders it. Persists unchanged whether that toast is the front toast, a decorative peek layer, or in the expanded list. Whether it also coordinates a smooth repositioning animation between those positions is Q8. |
| **SWC** | `2nd-gen/packages/swc/components/toast/` | `Toast.ts`, `toast.css`: renders host role/state attributes, variant icon, inner `role="alert"` wrapper, default + `action` slots, `swc-close-button`. Wires `SlotPresenceController` and `SlotAttributePropagationController` for the `action` slot. Whatever renders the queue's expanded view should follow `swc-popover`'s `modal` mode (native `<dialog>.showModal()`) for focus containment, wiring `PageScrollLockController`, `dismissibleStack`, and `getActiveElement()`/`deepContains()`/`focusableSelector` for scroll lock, `Escape` coordination, and focus management the same way `swc-popover` does; exactly which piece owns that rendering is still open, see Q5. Element registration, stories, tests. |

Planned rendering shape:

- The queue owns timer state; `Toast.base.ts` (core) owns ARIA attribute wiring and variant validation
- SWC renders: variant icon, inner live-region wrapper, slotted content, close button

---

## Migration checklist

### Preparation (this ticket)

- [x] 1st-gen API surface documented
- [x] Dependencies identified
- [x] Breaking changes documented
- [x] 2nd-gen API decisions drafted
- [x] Plan reviewed by at least one other engineer

### Setup

- [ ] Create `2nd-gen/packages/core/components/toast/`
- [ ] Create `2nd-gen/packages/swc/components/toast/`
- [ ] Wire exports in both `package.json` files
- [ ] Check out `spectrum-css` at `spectrum-two` branch as sibling directory

### API

#### Naming and public surface

- [ ] `Toast.types.ts`: define `ToastVariant` as `'neutral' | 'info' | 'positive' | 'negative'`
- [ ] `Toast.base.ts`: variant validation via `validateEnum()`, `icon-label` fallback
- [ ] Wire `SlotPresenceController` to gate on whether the `action` slot has content
- [ ] Wire `SlotAttributePropagationController` to propagate `size`/`variant` onto the slotted `action` button
- [ ] Gate `swc-open`/`swc-after-open`/`swc-close`/`swc-after-close` on the host's own CSS transition completion via the shared `runAfterTransition`
- [ ] Queue construct (core, exact location pending Q5): timeout floor (resolve Q1 first), pause/resume rules, remaining-time tracking, keyed to each toast's queue record

#### Container and queue

- [ ] Queue construct: `clear()` method, empties every queued toast at once
- [ ] Queue construct: new toasts join the front, not the back; no cap on how many stay tracked
- [ ] Peek-stack rendering: only the front toast is a real `alertdialog`; the two behind it render as `role="presentation"` layers; anything further back stays in the DOM at `opacity: 0`
- [ ] Expand control on the front toast, shown once two or more toasts are queued, laid out below the message alongside the action button
- [ ] Expanded-list rendering: every toast becomes its own real `alertdialog`
- [ ] Expanded-view scrim, dismissible on click
- [ ] Expanded view's focus containment follows `swc-popover`'s `modal` mode (native `<dialog>.showModal()`): native focus trap, native background inert, native `::backdrop` scrim, instead of a hand-rolled focus-trap implementation
- [ ] `Escape`-to-collapse wired through the shared `dismissibleStack` (`registerDismissible()`/`isTopDismissible()`)
- [ ] Scroll lock for the expanded view via `PageScrollLockController`
- [ ] Focus management via `getActiveElement()`/`deepContains()`/`focusableSelector` (which toast has focus, what was focused before entering the region, enumerating the expanded list's focusable elements)
- [ ] Container region: `role="region"` + `aria-label`
- [ ] Expanded list navigates with <kbd>Tab</kbd> only; no arrow-key handling (`FocusgroupNavigationController` deliberately not used)

#### Alignment checks

- [ ] Confirm action API shape with Design (Q3)
- [ ] Confirm message slot shape with Design (Q9)

### Styling

> Follow the [CSS style guide](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/) as the source of truth for all styling work. Key references: [migration steps](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/04_spectrum-swc-migration.md), [custom properties](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/02_custom-properties.md), [anti-patterns](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/05_anti-patterns.md).

- [ ] Add `.swc-Toast` to the internal semantic element in `render()`; keep styling off `:host`
- [ ] Copy S2 source from `spectrum-css` `spectrum-two` branch `index.css` (not `/dist`) into `toast.css` as baseline
- [ ] Update class and custom property prefixes from `.spectrum-Toast`/`--spectrum-toast-*` to `.swc-Toast`/`--swc-toast-*`; remove all `--mod-*` chains per [Component Custom Property Exposure](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/02_custom-properties.md#component-custom-property-exposure)

#### Visual model and regressions

- [ ] Verify i18n size modifiers (`:lang(ja)`, `:lang(ko)`, `:lang(zh)`) if present in S2 source
- [ ] Add `@cssprop` JSDoc tag for every exposed `--swc-*` property
- [ ] Pass stylelint (property order, `no-descending-specificity`, token validation)
- [ ] Set `overflow-wrap: break-word` and `word-break: break-word` on the message content wrapper (SWC-475: long unbroken words overflow the toast bounds in 1st-gen; RSP S2 already does this)

#### Container and queue visuals

- [ ] Author peek-stack depth CSS: positional offset and opacity falloff behind the front toast (`opacity: 0` beyond the third position), matching RSP S2
- [ ] Author the expand control's row layout on the front toast (`gridTemplateAreas` alongside the action button)
- [ ] Author the expanded-view full-screen layout: scrim, list layout, and the collapsed/expanded transition
- [ ] Toast's own open/close transition CSS carries over from 1st-gen (opacity/transform), updated to S2 tokens; gates `swc-open`/`swc-after-open`/`swc-close`/`swc-after-close` via the shared `runAfterTransition`
- [ ] Cross-position repositioning animation (peek/front/expanded) depends on Q8; do not implement until that's resolved

### Accessibility

Checklist items sourced from [accessibility-migration-analysis.md](./accessibility-migration-analysis.md); resolve Q1, Q2, Q7, Q9 before treating this section as final.

#### Naming and semantics

- [ ] Host: `role="alertdialog"`, `aria-modal="false"`, `aria-labelledby` from slot text (or `aria-label` fallback)
- [ ] Inner wrapper: `role="alert"`, `aria-atomic="true"`
- [ ] `aria-hidden="true"` on host when `open` is false

#### State verification

- [ ] Timer pauses on `pointerenter` + `focusin`, preserves remaining time, resumes only when both clear; scope (per-toast vs. region-wide) resolved per Q7
- [ ] Dev warning via `warnIf()` (or hard block, pending Q2) when `timeout` and `action` slot both set, gated on slot presence via `SlotPresenceController`
- [ ] `tabindex="0"` on host always; opening a toast does not move focus there
- [ ] Focus management on toast-close: nearest remaining toast for keyboard users, out of the region entirely for pointer users
- [ ] When the last toast closes and the queue empties, focus returns to whatever was focused before the user entered the region, regardless of modality
- [ ] Collapsing the expanded view sends focus to the container region
- [ ] Container region reachable via landmark navigation (<kbd>F6</kbd>/<kbd>Shift</kbd> + <kbd>F6</kbd>), no additional code required

### Testing

- [ ] Port `1st-gen/packages/toast/test/toast.test.ts` coverage that still applies
- [ ] Add Playwright `toast.a11y.spec.ts` with `toMatchAriaSnapshot`

#### Behavior

- [ ] Countdown pause/resume unit tests (pointer, focus, both simultaneously)
- [ ] Timeout floor enforcement test
- [ ] Timer persists correctly when a toast is demoted to a peek layer and later promoted back to front (queue-owned state, not instance-owned; see [Architecture](#architecture-core-vs-swc-split))
- [ ] `clear()` empties the whole queue in one action
- [ ] Peek-stack rendering: only the front toast is a real `alertdialog`; the rest render `role="presentation"`
- [ ] Expand/collapse interaction: scrim click, <kbd>Escape</kbd>, and the Collapse control each collapse the expanded view
- [ ] Focus management: modality branching on toast-close, collapse-to-region, and last-toast-close returning focus to whatever was focused before entering the region
- [ ] New toasts join the front of the queue, not the back

#### Visual regression

- [ ] Add VRT coverage for all variants, with/without action button, closed state
- [ ] Add VRT coverage for text wrapping: short single-line message, long message wrapping to multiple lines within the host's `max-inline-size`
- [ ] Add VRT coverage for the peek stack and the expanded view
- [ ] Add focus-visible regression coverage for the close and action buttons

### Documentation

#### General

- [ ] JSDoc on all public props, slots, and CSS custom properties
- [ ] Storybook stories for each variant, with/without action, with/without icon-label override
- [ ] Storybook story demonstrating text wrapping with a long message
- [ ] Storybook story demonstrating the container: multiple queued toasts, the peek stack, expand/collapse, and clear-all

#### Breaking changes

- [ ] Consumer migration guide includes the WCAG 2.2.1 timing formula verbatim (see a11y doc)
- [ ] Document the `error`/`warning` → `negative` variant consolidation in the consumer migration guide

### Review

- [ ] `yarn lint:2nd-gen` passes (ESLint, Stylelint, Prettier)
- [ ] Status table in workstream doc updated
- [ ] PR created with description referencing Epic SWC-2257
- [ ] Peer engineer sign-off

---

## Blockers and open questions

### Design

| # | Item | Blocking? | Status | Owner |
| --- | ---- | --------- | ------ | ----- |
| Q1 | Timeout minimum: 6000ms (1st-gen, current a11y doc, SWC-610 unresolved) or 5000ms (spectrum.adobe.com spec, RSP S2 `Toast.tsx`)? | Yes | Open ❓ | Accessibility reviewer |
| Q2 | Action + auto-dismiss: dev warning only (a11y doc) or hard-disable timeout whenever an action is present (RSP S2: `timeout` forced to `undefined` if `actionLabel` set)? | Yes | Open ❓ | Design + accessibility reviewer |
| Q3 | Action API shape: keep light-DOM `action` slot (1st-gen) or switch to `action-label`/`swc-action` event props (RSP S2 `actionLabel`/`onAction`/`shouldCloseOnAction`)? Leaning toward keeping the slot: matches 1st-gen with no consumer migration needed, though this is a deviation from RSP's props-based model. | Yes | Open ❓ | Design + implementation |
| Q7 | Timer pause scope: pause only the toast under the pointer or focus (a11y doc's current recommendation, per-toast) or pause every visible toast in the region together (RSP S2's actual `useToastRegion.ts`: `useHover`/`useFocusWithin` at the region level call `pauseAll()`/`resumeAll()` on the whole queue)? | Yes | Open ❓ | Accessibility reviewer |
| Q9 | Message content: stay the default slot (current plan), or become a named slot? Default-slot content can be a bare text node with no element to hold the `aria-labelledby` target ID, silently falling back to `aria-label`; a named slot would let the component guarantee a light-DOM wrapper instead. | Yes | Open ❓ | Design + accessibility reviewer |

### Architecture and behavior

| # | Item | Blocking? | Status | Owner |
| --- | ---- | --------- | ------ | ----- |
| Q5 | The pause-preserving countdown can't stay inline in `Toast.base.ts` (see [Architecture](#architecture-core-vs-swc-split)); it needs its own queue-level construct regardless. Should that construct be a shared, cross-component controller in `2nd-gen/packages/core/controllers/` now, or stay toast-specific under `2nd-gen/packages/core/components/toast/` until a second consumer actually needs it? Either way, it should follow this codebase's established `ReactiveController` pattern (used by `PageScrollLockController`, `SlotPresenceController`, and others) rather than a plain framework-agnostic singleton service. Separately, the Architecture table's "Queue" row only owns state (timers, pause rules); nothing currently owns the container's visual rendering (the `role="region"` wrapper, the list, peek-stack depth/opacity layering, the expanded full-screen view). Whether that rendering belongs to the same Queue construct, to a distinct container custom element with its own core/SWC split, or somewhere else entirely is unresolved and should be settled alongside the sharing-scope question above. | No | Open | Architecture reviewer |
| Q8 | Repositioning a toast between peek, front, and expanded-list position (not its own open/close, which reuses `runAfterTransition`, see [Architecture](#architecture-core-vs-swc-split)): should this use the View Transitions API for a smooth cross-position morph (matching RSP S2's queue-level `wrapUpdate` wrapping), with no animation as the fallback where unsupported, or accept an instant swap between positions (no existing 2nd-gen precedent either way)? | No | Open | Architecture reviewer |

### Scope and prerequisites

None currently.

---

## Decision log

Resolved decisions from planning, kept here as a historical record so [Blockers and open questions](#blockers-and-open-questions) stays focused on what's still unresolved. Entries retain their original `Q`/`B`/`C` identifier so inline references elsewhere in the plan still resolve here.

| Ref | Decision | Rationale / context |
| --- | -------- | -------------------- |
| Q4 | `tabindex="0"` on host always, not conditional on container presence. Opening a toast does not move focus there. | The accessibility migration analysis previously recommended conditional `tabindex` and focus-on-open; both were corrected after checking the real RSP S2 source, which sets `tabIndex: 0` unconditionally but never autofocuses a toast on open. `tabindex="0"` makes the host a normal tab stop, matching RSP. |
| Q6 | `swc-toast` ships alongside a first-party container/queue in this migration, rather than standalone with the container deferred. | Settled via team sync. Only "whether to build it in this cycle" is resolved; the container's shape and API (peek stack, expand/collapse, focus management, `clear()`, and related accessibility behavior) remain open and are being worked out incrementally across this plan. If built, `placement` (RSP precedent: `top`/`bottom`/`top end`/`bottom end`) belongs on the container, not on `swc-toast` itself. |

---

## References

- [Washing machine workflow](../../02_workstreams/02_2nd-gen-component-migration/02_step-by-step/01_washing-machine-workflow.md)
- [2nd-gen migration status table](../../02_workstreams/02_2nd-gen-component-migration/01_status.md)
- [Accessibility migration analysis](./accessibility-migration-analysis.md)
- [CSS style guide — Component Custom Property Exposure](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/02_custom-properties.md#component-custom-property-exposure)
- [1st-gen source](../../../../1st-gen/packages/toast/src/Toast.ts)
- [1st-gen tests](../../../../1st-gen/packages/toast/test/toast.test.ts)
- [1st-gen README](../../../../1st-gen/packages/toast/README.md)
- [React Spectrum S2 Toast source](https://github.com/adobe/react-spectrum/blob/main/packages/@react-spectrum/s2/src/Toast.tsx) — `variant`, `actionLabel`/`onAction`/`shouldCloseOnAction`, 5s timeout floor, hard-block on actionable auto-dismiss
- [React Aria `useToast`](https://github.com/adobe/react-spectrum/blob/main/packages/react-aria/src/toast/useToast.ts) — `role="alertdialog"`, always-on `tabIndex: 0`, inner `role="alert"`
- [React Stately `useToastState`](https://github.com/adobe/react-spectrum/blob/main/packages/react-stately/src/toast/useToastState.ts) — queue's `unshift()` newest-to-front ordering, `maxVisibleToasts`, `clear()`
- [React Aria `useToastRegion`](https://github.com/adobe/react-spectrum/blob/main/packages/react-aria/src/toast/useToastRegion.ts) — region-wide `pauseAll()`/`resumeAll()`, focus management on toast removal, `role="region"` landmark
- [React Spectrum: Toast (docs)](https://react-spectrum.adobe.com/react-spectrum/Toast.html)
- [Figma: S2 / Web — Toast](https://www.figma.com/design/xHBWBBIe2eo5vwoCeNrC4Q/S2---Web?node-id=9908-3216&m=dev)
- [Spectrum CSS — `spectrum-two` branch, Toast component](https://github.com/adobe/spectrum-css/tree/spectrum-two/components/toast)
- [Badge migration reference](../../02_workstreams/02_2nd-gen-component-migration/02_step-by-step/01_washing-machine-workflow.md#reference-badge-migration)

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
    - [Additive — ships when ready, zero breakage for consumers already on gen2](#additive--ships-when-ready-zero-breakage-for-consumers-already-on-gen2)
- [gen2 API decisions](#gen2-api-decisions)
    - [Public API](#public-api)
    - [Behavioral semantics](#behavioral-semantics)
    - [Accessibility semantics notes (gen2)](#accessibility-semantics-notes-gen2)
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
- Toast ships alongside a first-party container/queue in this migration (Q6); proposed name `swc-toast-container` (Q13, open for feedback). Resolving Q5 (queue construct location/ownership) and Q8 (repositioning animation) is a near-term prerequisite, not a deferred tail-end item: most of the [API](#api) checklist's container-and-queue work, and nearly all of [Accessibility](#accessibility), depend on that architecture existing. Only a narrow single-toast skeleton is independent of it. See [Migration sequencing and prerequisites](#migration-sequencing-and-prerequisites).
- 1st-gen defines 5 variant values (`negative`, `positive`, `info`, `error`, `warning`); `error` and `warning` are already deprecated aliases of `negative` in 1st-gen and do not carry forward. gen2 has 4 variants: `neutral`, `info`, `positive`, `negative`.
- Q1, Q2, Q3, Q7, Q10, Q12, and Q14 are resolved; see the [Decision log](#decision-log). Q5, Q8, Q9, Q11, Q13, and Q15 remain open; Q5, Q8, Q11, Q13, and Q15 have a documented leaning, see below.

### Most blocking open questions

- **Q5** in [Architecture and behavior](#architecture-and-behavior): queue-level countdown ownership and location. The queue construct must be decided before the dependent container, timeout, and accessibility work can proceed; the current recommendation is to keep it specific to `swc-toast-container` until a second consumer requires extraction.
- **Q8** in [Architecture and behavior](#architecture-and-behavior): whether repositioning between peek, front, and expanded-list positions uses View Transitions or an instant swap. The choice affects the container's rendering and transition implementation.
- **Q9** in [Design](#design): message content slot. Default slot (current plan, may lack an ID-bearing wrapper) vs. a named slot (guarantees one).
- **Q11** in [Architecture and behavior](#architecture-and-behavior): whether delayed population of the shadow-DOM live region is reliable for slotted content and a persistent host. If not, use a separate live region as a light-DOM sibling; this must be verified before implementation commits to the current rendering approach.
- **Q13** in [Architecture and behavior](#architecture-and-behavior): container naming and API shape. Proposed `swc-toast-container` with a decoupled queue export for showing toasts, open for feedback.
- **Q15** in [Design](#design): standalone auto-dismiss. Leaning toward `swc-toast` having no timer of its own at all, `timeout` only takes effect once paired with `swc-toast-container`, since a standalone toast was never a fully accessible configuration to begin with. Still open for confirmation.

---

## 1st-gen API surface

**Source:** [`1st-gen/packages/toast/src/Toast.ts`](../../../../1st-gen/packages/toast/src/Toast.ts)
**Version:** `@spectrum-web-components/toast@1.12.3`
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

No dedicated rendering-and-styling analysis doc exists for Toast (out of scope this cycle); this is pulled directly from `1st-gen/packages/toast/src/toast.css`.

1st-gen exposes roughly two dozen `--mod-toast-*` passthrough properties over spectrum-css tokens:

- **Sizing:** `max-inline-size`, `block-size`, `border-width`, `corner-radius`
- **Typography:** `font-size`, `font-weight`, `line-height` (plus a separate CJK `line-height` variant)
- **Color:** `background-color-default`, per-variant background colors (`negative`, `informative`, `positive`), `text-and-icon-color`, `divider-color`
- **Spacing:** ~9 tokens positioning the icon, text, action button, divider, and close button relative to each other and the toast edges

This full modifier surface will not be carried forward to gen2.

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
| `@spectrum-web-components/base` | 1.12.3 | Lit base class |
| `@spectrum-web-components/button` | 1.12.3 | `sp-close-button` |
| `@spectrum-web-components/icon` | 1.12.3 | Declared in `package.json` but not directly imported anywhere in the toast package; likely a transitive requirement of `icons-workflow` |
| `@spectrum-web-components/icons-workflow` | 1.12.3 | `sp-icon-info`, `sp-icon-alert`, `sp-icon-checkmark-circle` |
| `@spectrum-web-components/shared` | 1.12.3 | `FocusVisiblePolyfillMixin` |
| `SlotPresenceController` | already built | Gates whether the `action` slot has content, for the timeout-plus-action dev warning (Q2) and whether the action button participates in the Tab order. See [`gen2/packages/core/controllers/slot-presence-controller/`](../../../../gen2/packages/core/controllers/slot-presence-controller/slot-presence-controller.mdx). |
| `SlotAttributePropagationController` | already built | Propagates the host's `size`/`variant` onto the slotted `action` button, so it styles as expected without the consumer setting those attributes twice. See [`gen2/packages/core/controllers/slot-attribute-propagation-controller/`](../../../../gen2/packages/core/controllers/slot-attribute-propagation-controller/slot-attribute-propagation-controller.mdx). |
| `swc-popover`'s `modal` mode (native `<dialog>.showModal()`, `gen2/packages/core/components/popover/Popover.base.ts`) | already built | Precedent for the expanded view's focus containment: opting into native `<dialog>.showModal()` gives a native focus trap, native background inert, and a native `::backdrop` scrim, in place of a hand-rolled focus-trap implementation. Already paired below with `PageScrollLockController` and `dismissibleStack` for the same kind of blocking surface. |
| `PageScrollLockController` | already built | Reference-counted page-scroll lock for the expanded view, matching RSP S2's `useModalOverlay` ("prevent scroll... since we take over the whole screen"). Already used by `swc-popover`'s `modal` mode for the same kind of stacked blocking surface. See [`gen2/packages/core/controllers/page-scroll-lock-controller/`](../../../../gen2/packages/core/controllers/page-scroll-lock-controller/page-scroll-lock-controller.mdx). |
| `registerDismissible()` / `unregisterDismissible()` / `isTopDismissible()` (`dismissibleStack`, `gen2/packages/core/utils/dismissible-stack.ts`) | already built | Coordinates `Escape`-to-collapse in the expanded view with other open top-layer surfaces (a popover or tooltip open at the same time), so only the topmost one closes. Already shared by `swc-popover`'s `modal` mode and `swc-tooltip`. |
| `getActiveElement()` / `deepContains()` (`gen2/packages/core/utils/`) | already built | Shadow-DOM-aware focus tracking, needed to know which toast currently has focus and what was focused before the user entered the region (focus-management-on-close). Already used by `swc-popover`. |
| `focusableSelector` (`gen2/packages/core/utils/focusable-selectors.ts`) | already built | Spec-based focusable-element selector, needed to enumerate the expanded list's focusable elements for the focus trap. Already used by `prompt-field`. |
| `uniqueId()` (`gen2/packages/swc/utils/id.ts`) | already built | Generates the content-element ID the host's `aria-labelledby` references. |
| `warnIf()` / `validateEnum()` (`gen2/packages/core/utils/dev-validation.ts`) | already built | The established dev-mode warning framework; use for variant validation, the timeout-plus-action dev warning (Q2), and warning if more than one `swc-toast-container` connects at once (Q13), rather than a hand-rolled `console.warn`. |

None of the shared core resources above are sequenced dependencies; all are already built and available now.

---

## Open gen1 issues

| Jira | Type | Status (snapshot) | Summary | Notes |
| ---- | ---- | ----------------- | ------- | ----- |
| SWC-610 | Bug | To Do | Toast timeout minimum differs from design docs | See Q1 |

Already-fixed gen1 bugs whose behavior must not regress in gen2 (not listed as rows since they're Done/Closed, not open work; evidence is cross-referenced where it's already used elsewhere in this plan):

- SWC-281, SWC-280 (Done): screen-reader announcement on toast add, and icon alt-text override. Both already required by [accessibility-migration-analysis.md](./accessibility-migration-analysis.md).
- SWC-475 (Done), duplicate of SWC-213 ([GH #4587](https://github.com/adobe/spectrum-web-components/issues/4587)): long unbroken words overflow the toast bounds. Fix carried into the [Styling](#styling) checklist.
- SWC-603 (Closed, Won't fix), [GH #4931](https://github.com/adobe/spectrum-web-components/issues/4931): `error`/`warning`/`success` marked `// deprecated` in code but never formally documented. Confirms those variants were already stale in 1st-gen.

## Migration sequencing and prerequisites

### Dependency-aware recommendation

No external prerequisites. Toast has no dependents in-tree and depends only on `swc-close-button`, which already exists in gen2 (`gen2/packages/swc/components/close-button/`). The countdown can't live inline in `Toast.base.ts`. Resolved Q12: it runs only while a toast is the front toast in the collapsed stack, it does not run while that toast is a peek layer, and promotion back to front starts a fresh timeout rather than restoring a saved remainder. The container is what knows which toast is front and whether the view is expanded (no auto-dismiss while expanded), so the countdown belongs to the queue construct, not the toast instance. Pause still preserves remaining time, but only while that same toast stays the collapsed front toast. The construct still needs its own queue-level home, separate from `Toast.base.ts`, regardless of whether any other component ever needs a similar controller (this construct is `swc-toast-container`'s core layer, not a separate component; see [User confirmation needed](#user-confirmation-needed) below). See Q5 in [Architecture and behavior](#architecture-and-behavior).

Internally, though, resolving Q5 and Q8 is the near-term prerequisite for most of the remaining work. A narrow single-toast skeleton (variant/icon-label validation, `action`-slot wiring via `SlotPresenceController`/`SlotAttributePropagationController`, the close button, lifecycle events via `runAfterTransition`, and the A1-A3/A7/`tabindex` accessibility items) is independent and can proceed now. Everything else, timeout/pause behavior (Q1/Q2/Q7/Q12), the API checklist's container-and-queue bullets, and nearly all of the Accessibility checklist (focus management across toasts, focus-on-queue-empty, collapse-to-region, landmark navigation), depends on the container/queue construct actually existing, so it waits on Q5/Q8.

### Related components and ordering notes

| Component | Relationship | Notes |
| --------- | ------------ | ----- |
| `swc-close-button` | Dependency, already migrated | `accessible-label` confirmed as the real gen2 attribute (verified in `button` family source) |
| Toast container / queue | In scope, ships alongside `swc-toast` | Shape and API still being finalized across this plan; see Q6. Resolving Q5/Q8 is sequenced ahead of most remaining implementation work, not after it; see note below. |

### User confirmation needed

Whether the queue's countdown construct belongs in a shared, cross-component location (`gen2/packages/core/controllers/`), in case another component needs similar queue behavior later, or stays specific to `swc-toast-container`'s own core layer (`gen2/packages/core/components/toast-container/`) until a second consumer actually appears. Rendering ownership is now settled by Q13: `swc-toast-container`'s SWC layer owns the region wrapper, list, peek-stack layering, and expanded view. See Q5 in [Architecture and behavior](#architecture-and-behavior).

**Container/queue ticket (placeholder):** a follow-up ticket tracks resolving Q5, Q8, and Q13, and then building the container/queue construct, its styling (peek-stack depth, expand/collapse layout), and the multi-toast portions of Accessibility that depend on it. It is sequenced ahead of the remaining API and Accessibility work, not after it: only the narrow single-toast skeleton described above proceeds independently in the meantime. This does not reopen Q6; the container still ships as part of this migration, the ticket just tracks the order the work happens in.

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

| # | What changes | 1st-gen behavior | gen2 behavior | Consumer migration path |
| --- | ------------ | ---------------- | ---------------- | ----------------------- |
| B1 | `variant` set shrinks | `negative`, `positive`, `info`, `error`, `warning`, `''` | `neutral`, `info`, `positive`, `negative` | Replace `error`/`warning` with `negative` |
| B2 | `close()` behavior | Direct `open = false`, no signal | Keep as-is (no evidence to change); the separate `swc-close`/`swc-after-close` events, already `composed`/`bubbles` per the visibility-toggle pattern (see [Architecture](#architecture-core-vs-swc-split)), are what `swc-toast-container` listens to for queue eviction when a real element exists, not `close()` itself. A decorative peek layer (Q14) has no such element and no running timer (Q12), so a timeout cannot evict it while it is demoted. Removing it in that state (`clear()`, or an explicit close of that queued toast) updates queue state directly. Timeout dismissal happens only after promotion to front, once the fresh timeout elapses and the real element closes through `swc-after-close`. See [Architecture](#architecture-core-vs-swc-split) | None |

#### Styling and visuals

| # | What changes | 1st-gen behavior | gen2 behavior | Consumer migration path |
| --- | ------------ | ---------------- | ---------------- | ----------------------- |
| S1 | Adopt S2 tokens | S1 tokens | S2 tokens from `spectrum-css` `spectrum-two` | Visual update only |
| S2 | Peek-stack depth styling | None (no queue exists) | Stacked-card depth behind the front toast: positional offset and opacity falloff, `opacity: 0` beyond the third position, matching RSP S2 | None (new functionality) |
| S3 | Expand/collapse layout | None (no queue exists) | Full-screen expanded-view layout with a dismissible scrim and a collapsed/expanded transition; front-toast expand control laid out via `gridTemplateAreas` alongside the action button | None (new functionality) |

#### Accessibility and behavior

| # | What changes | 1st-gen behavior | gen2 behavior | Consumer migration path |
| --- | ------------ | ---------------- | ---------------- | ----------------------- |
| A1 | Host role | `role="alert"` on inner `.body` div only | `role="alertdialog"` + `aria-modal="false"` on host; inner `role="alert"` `aria-atomic="true"` | None |
| A2 | Host naming | None | `aria-labelledby` referencing a content-element ID, falling back to `aria-label` from default-slot text | None |
| A3 | `aria-hidden` when closed | Not set (CSS only) | `aria-hidden="true"` on host when `open` is false | None |
| A4 | Timer pause | `focusin`/`focusout` only; restarts full timeout | Pause on `pointerenter` + `focusin` while the toast is the collapsed front toast; preserve remaining time only while it stays front; resume only when both clear. Region-wide pause (Q7) pauses that one running timer when pointer or focus is anywhere in the collapsed region. No auto-dismiss in the expanded view (Q12). Mouseout must not resume a timer for any toast that is not the collapsed front toast | None |
| A5 | Timeout minimum | 6000ms | 6000ms (Q1) | None |
| A6 | Action + auto-dismiss | Unguarded | Hard-disabled: if the action slot has content at open time, the timeout has no effect, paired with a `warnIf()` dev warning (Q2) | None |
| A7 | Close button label | `label="Close"` | `accessible-label="Close"` on `swc-close-button` | None |

#### Container and queue

| # | What changes | 1st-gen behavior | gen2 behavior | Consumer migration path |
| --- | ------------ | ---------------- | ---------------- | ----------------------- |
| C1 | First-party toast container/queue | None (new functionality) | Ships alongside `swc-toast` in this migration; shape and API still being finalized, see Q6 in the [Decision log](#decision-log), and Q5/Q8/Q13 in [Blockers and open questions](#blockers-and-open-questions) | TBD |

### Additive — ships when ready, zero breakage for consumers already on gen2

| # | What is added | Notes |
| --- | ------------- | ----- |
| P1 | `--swc-*` custom properties | None in the initial set; add a property only once a concrete override need surfaces, see [CSS custom properties (gen2)](#css-custom-properties-gen2) |

---

## gen2 API decisions

Derived from the 1st-gen implementation, the accessibility migration analysis, the Figma `S2 / Web` Toast frame, and React Spectrum S2 (`@react-spectrum/s2/src/Toast.tsx`, `react-aria/src/toast/useToast.ts`). Confirmed items are marked; open items are tracked in [Blockers and open questions](#blockers-and-open-questions).

- **Confirmed**: directly supported by source material
- **Inferred**: recommended based on multiple signals, but not explicitly specified in one authoritative source
- **Open question**: unresolved and needs review or more input

### Public API

#### Properties / attributes (gen2)

| Property | Type | Default | Attribute | Notes |
| -------- | ---- | ------- | --------- | ----- |
| `open` | `boolean` | `false` | `open` (reflect) | **Confirmed.** |
| `variant` | `'neutral' \| 'info' \| 'positive' \| 'negative'` | `'neutral'` | `variant` (reflect) | **Confirmed.** Figma and RSP S2 both show 4 variants; 1st-gen's `error`/`warning` are deprecated aliases of `negative`, not carried forward |
| `timeout` | `number \| null` | `null` | `timeout` | **Confirmed.** Floors to 6000ms; `null`/`0`/negative disables auto-dismiss, matching 1st-gen (Q1). Has no effect when the action slot has content at open time (Q2). With the container, it runs only while that toast is the collapsed front toast, and it does not run in the expanded view (Q12). Whether it has any effect at all without `swc-toast-container` present is Q15, still open |
| `icon-label` | `string \| undefined` | `undefined` | `icon-label` | **Confirmed.** Carried forward as-is |
| `action` slot (kept) | — | — | — | **Confirmed.** Keeps the light-DOM `action` slot from 1st-gen rather than switching to props (Q3) |

#### Visual matrix (gen2)

| Variant | Figma label | Icon | Default icon label |
| ------- | ----------- | ---- | ------------------- |
| `neutral` (default) | Neutral | None | — |
| `info` | Informative | `InfoCircle` | "Information" |
| `positive` | Positive | `CheckmarkCircle` | "Success" |
| `negative` | Negative | `AlertTriangle` | "Error" |

Icons confirmed against Figma. Source from the public `@adobe/spectrum-wc-icons` workflow-icon package (`Icon_InfoCircle()`, `Icon_CheckmarkCircle()`, `Icon_AlertTriangle()`, or the `<swc-icon-*>` elements), not the internal lean icon set in `gen2/packages/swc/components/icon/elements/`. Forward Toast's resolved icon label (default or `icon-label` override) straight into the icon's own `accessible-label`; empty renders it decorative, matching the a11y doc's `icon-label=""` suppression behavior for free.

Action button (when present): a `<swc-button slot="action">`, not `<swc-action-button>`, styled as secondary, outline, `static-color="white"`. Confirmed by Figma playground and RSP S2 (`variant="secondary" fillStyle="outline" staticColor="white"`).

#### Slots (gen2)

| Slot | Content | Notes |
| ---- | ------- | ----- |
| default | Toast message text | **Open question**, Q9: staying the default slot means content can be a bare text node with no element to hold the `aria-labelledby` target ID (falls back to `aria-label`, see [Accessibility semantics notes](#accessibility-semantics-notes-gen2)); a named slot would let the component guarantee a light-DOM wrapper instead. |
| `action` | Optional `<swc-button slot="action">` | **Confirmed** (Q3): kept as a light-DOM slot rather than `action-label`/`swc-action` props. The expected element is `swc-button` (not `swc-action-button`). Presence is gated by `SlotPresenceController` and `size`/`variant` are propagated onto the slotted button by `SlotAttributePropagationController`, both already built; see [Dependencies](#dependencies). |

#### CSS custom properties (gen2)

No `--mod-*` properties will be exposed. New `--swc-*` component-level properties may be introduced where needed — these are additive and not breaking. See [Component Custom Property Exposure](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/02_custom-properties.md#component-custom-property-exposure) for what to expose and how.

No properties are exposed in the initial set. Add a `--swc-toast-*` property only once implementation surfaces a concrete override need, per the [decision tree](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/02_custom-properties.md#decision-tree-for-exposure) above. Height in particular is composed from padding, font-size, and line-height rather than exposed as its own property, matching Design's direction away from explicit height controls.

**Excluded:**

- Background color, text color, icon color, per the style guide's exclusions. Toast's text/icon color is fixed white against a saturated variant background (the same contrast-intent exclusion as static-color components), and background color is set per semantic variant, not consumer-overridable per the badge/status-light precedent for semantic (non-decorative) variant colors.
- `max-inline-size`. A single constant value regardless of variant, same as `swc-tooltip`/`swc-popover` (also not exposed). The host is directly stylable from outside (`swc-toast { max-inline-size: 400px; }`), no custom property needed.

#### Container API (gen2)

**Proposed, open for feedback (Q13):** a new custom element, `swc-toast-container`, that the consumer places once per app view. It owns the region/list/peek-stack/expanded-view rendering (see [Architecture](#architecture-core-vs-swc-split)), but showing a toast goes through a separate, decoupled export rather than a method called on that element instance, matching how React Spectrum S2's own `ToastQueue` is decoupled from its `ToastContainer` element. Throughout this plan, "the queue" refers to `swc-toast-container`'s core layer (its countdown state and the decoupled export), not a separate construct alongside the container; "decoupled" here means the export doesn't need a DOM reference to the element, not that it lives somewhere else architecturally.

| Piece | Shape | Notes |
| ----- | ----- | ----- |
| `<swc-toast-container>` | Custom element, placed once per app view | Renders the container region; exposes no public method for adding toasts itself |
| `placement` | `'top' \| 'top-end' \| 'bottom' \| 'bottom-end'` | Default `bottom`, matching RSP S2 and how toasts have appeared in this codebase previously. The `-end` values are logical (RTL-aware), not literal left/right |
| Queue export | For example a module export with `add()`/`close()`/`clear()`, or per-variant convenience methods (`.info()`, `.positive()`, etc.) | Decoupled from the container element; exact shape still open as part of Q13, including how a `<swc-button slot="action">` and an `onClose` callback are supplied (see below) |

**Only one container per app view:** because the queue export is decoupled from the container element, nothing else stops a consumer from placing two `<swc-toast-container>` instances, which would double-render every toast. The container's `connectedCallback()` should warn via `warnIf()` (see [Dependencies](#dependencies)) if a second instance connects while one is already present.

The container's `role="region"` wrapper carries a dynamic `aria-label` reflecting the current notification count (for example, `"2 notifications."`), per [accessibility-migration-analysis.md](./accessibility-migration-analysis.md#assistive-technology-live-regions).

**How content flows from the queue export to a rendered toast:** calling the queue export (`add()`, or a per-variant convenience method) constructs a `<swc-toast>` element, sets its `variant`/`icon-label`/etc., and sets the call's message argument as its slotted content, then hands it to `swc-toast-container` to render; see [Slots (gen2)](#slots-gen2) for the slot itself (Q9). `swc-toast` stays usable standalone for most of its API: the queue export is a convenience for the common case, not the only way to use the component, and a consumer can still hand-author `<swc-toast open>` directly in markup with no container involved. Auto-dismiss is the exception: whether `timeout` has any effect at all outside the container is Q15, still open, leaning toward no.

**Still open as part of Q13:** how a `<swc-button>` action button is supplied through the imperative queue export, since `action` is a light-DOM slot (Q3), not a prop. The rendered element is expected to be `<swc-button slot="action">`, not `<swc-action-button>`. One option is accepting a real `swc-button` element/node in the call's options for the container to slot in; the other is treating actionable toasts as the hand-authored-markup case above, and leaving the queue export to cover the plain-message case only. Also open: whether the queue export accepts an `onClose` callback per call, matching RSP S2's `addToast()`, which fires whenever that specific toast closes, for any reason.

### Behavioral semantics

- Auto-dismiss pause applies only to the collapsed front toast, the only toast with a running timer (Q12). `pointerenter` or `focusin` anywhere in the region pauses that timer and preserves its remaining time; it resumes only once both `pointerleave` and `focusout` have fired, and only if that same toast is still the collapsed front toast. Demotion discards any saved remainder; the next time that toast becomes front, its timeout starts fresh. This is the region-wide pause from Q7, applied to the one timer that is actually running, in the same spirit as RSP S2's `pauseAll()`/`resumeAll()`. It does not pause or resume peek layers, and it does not run in the expanded view, where no toast auto-dismisses. Do not carry forward RSP's bug of resuming every visible toast in the stack on mouseout.
- Matches the event set of other visibility-toggling components: `swc-open` before the enter transition plays, `swc-after-open` once it completes, `swc-close` (cancelable) before the exit transition plays, `swc-after-close` once it completes.
- Text wrapping is automatic, not an option. Content wraps naturally within whatever `max-inline-size` the host is given (directly stylable from outside; no `--swc-*` custom property, see [CSS custom properties (gen2)](#css-custom-properties-gen2)); no `width` property exists on `sp-toast` in 1st-gen or on `Toast` in RSP S2. Long unbroken words specifically need `overflow-wrap`/`word-break` (SWC-475, see [Styling](#styling)) on top of normal wrapping.
- No `placement` property. Confirmed absent from 1st-gen `sp-toast`'s own API: the 1st-gen story's `placement` values (bottom/left/right/top) belong to `overlay-trigger`, an unrelated demo wrapper, not `sp-toast` itself. RSP's `placement` (`top`/`bottom`/`top end`/`bottom end`) lives on `ToastContainer`, never on individual `Toast`. Placement is a container-level concern (see Q6); proposed as a `swc-toast-container` attribute, see [Container API](#container-api-gen2).
- Every queued toast stays tracked in the queue, with no cap; only a few are ever rendered as full content. RSP S2's own `ToastQueue` is explicitly constructed with `maxVisibleToasts: Infinity` (the primitive's own default is 1, a single visible toast; S2 overrides it), and only the front two peek positions plus the front toast itself render as anything visible.
- **Resolved (Q12):** a toast's countdown only runs while it's the front, visible toast in the collapsed stack; peek layers behind it do not count down. When the front toast auto-dismisses, the next toast is promoted to front and its own timeout starts fresh: a full duration, not a continuation of time already elapsed. Any remainder saved while it was previously front is discarded on demotion. A toast therefore never expires without first having been shown as the front toast, which removes the earlier "expire before being viewed" trade-off outright. This applies even to the last toast in the queue (nothing waiting behind it): it still auto-dismisses on its own timeout, matching RSP. The only exception is the expanded view: no toast auto-dismisses at all there, on any browser or device; auto-dismiss is otherwise a collapsed-stack-only behavior. Manual testing found RSP's own real timer/visibility behavior varies by browser and device, so this model is `swc-toast`'s own design decision, not a direct port of RSP's implementation.
- A decorative peek layer (Q14) has no running timer, so timeout never elapses while a toast is demoted, and there is no `swc-after-close` to wait on. Removing a toast that is currently a peek layer (`clear()`, or an explicit close of that queued toast) updates queue state directly. Timeout eviction happens only after that toast is promoted to front, the fresh timeout elapses, and the real element closes through `swc-after-close`. See [Architecture](#architecture-core-vs-swc-split).
- New toasts join the front of the queue, not the back (RSP S2: `queue.unshift(toast)` in `useToastState.ts`), so adding a toast while one is already showing immediately promotes the new one to front and demotes the old one behind it. Demotion stops the old toast's countdown immediately; it does not keep elapsing as a peek layer (Q12). This is intentional, not a bug: a [reported issue](https://github.com/adobe/react-spectrum/issues/7917) treats it as confusing UX, but there is no FIFO "wait your turn" queuing in the source.
- Peek stack: collapsed with two or more toasts queued, only the front toast renders as a real, interactive alertdialog; the two behind it are wholly separate, empty decorative layers with no focusable descendants (Q14), not the real toast's markup dimmed or covered. Anything further back stays in the DOM at `opacity: 0` rather than being removed (RSP S2: `opacity: index >= 3 ? 0 : 1`), to support a smooth transition if it's later promoted forward; see Q8.
- An expand control appears on the front toast once two or more toasts are queued, laid out on its own row below the message with the action button (RSP S2: `gridTemplateAreas: ['content content content', 'expand . action']`). Activating it moves focus to that toast's own host (since the control itself disappears once expanded) and opens every toast into a full list, where each becomes its own real alertdialog. Clicking anywhere on the collapsed stack, not just the expand control itself, also expands it, guarded so clicking an actual button (close, action, expand) does not also trigger it (RSP S2: the toast list's own click handler checks the click target isn't a button before expanding).
- The expanded view also collapses automatically once the queue empties, without a focus redirect: a separate code path from the explicit collapse triggers described in [Accessibility semantics notes](#accessibility-semantics-notes-gen2) (RSP S2: a queue-subscription effect calls the overlay state's `close()` directly).
- The queue exposes a `clear()` operation that empties every queued toast at once, surfaced via a Clear all control in the expanded view (RSP S2: `queue.clear()`). This is a queue-level method, not an instance method on `swc-toast` itself; 1st-gen's `close()` (single toast) has no equivalent for the whole queue.
- Toast's own enter/exit animation gates `swc-after-open`/`swc-after-close` on the host's CSS transition completion via the existing `runAfterTransition` core utility (`gen2/packages/core/utils/transition.ts`), the same mechanism `swc-popover` and `swc-tooltip` already share for their identical event pairs. No new infrastructure needed here.
- Repositioning a toast between peek, front, and expanded-list position is a separate, harder problem: no existing gen2 component does this kind of cross-position repositioning (checked Accordion, the closest analog; it has none). RSP S2 wraps queue-level state changes (add/remove/expand/collapse) in the View Transitions API for a smooth cross-position morph, falling back to no animation at all where unsupported. Whether `swc-toast` does the same or accepts an instant swap between positions is Q8. Trade-offs: a View Transitions morph matches RSP S2's actual behavior and reads as more polished. It does not require keeping a demoted toast's real interactive markup mounted: RSP achieves the morph by giving the real toast and its empty decorative-div replacement (Q14) the same `viewTransitionName`, so the browser animates between two different elements rather than one persistent node. That morph is visual only. Countdown state does not travel with it: demotion stops and discards that toast's countdown, and promotion to the collapsed front starts a fresh timeout (Q12). A toast in the expanded list is not counting down at all. Its real cost is browser support: it has no effect in browsers without the View Transitions API unless a deliberate fallback is authored. An instant swap is simpler to implement, with no browser-support gap, at the cost of a less polished transition. Whichever approach is chosen, `prefers-reduced-motion` must be respected: RSP S2 falls back to a simple cross-fade instead of animating the positional move when it's set, achieved by suffixing the shared `viewTransitionName` with the toast's index so the browser treats it as a different element rather than the same one moving, matching this codebase's existing reduced-motion precedent (see `progress-circle`).

### Accessibility semantics notes (gen2)

See [Toast accessibility migration analysis](./accessibility-migration-analysis.md) for the full spec.

- `role="alertdialog"` + `aria-modal="false"` on host; opening never moves focus.
- `tabindex="0"` on host always, per the a11y doc; opening a toast does not move focus there. It makes the host a normal tab stop, matching RSP.
- Host naming uses `aria-labelledby` referencing a content-element ID, generated with the shared `uniqueId()` utility (see [Dependencies](#dependencies)), falling back to `aria-label` from slot text when no explicit ID is available. RSP S2 splits this further into a separate `aria-labelledby` (title) and `aria-describedby` (description) element; `swc-toast`'s single content ID is a deliberate simplification, since it has one default slot for message text rather than separate title/description slots.
- The expanded view takes over the screen: a dismissible scrim, <kbd>Escape</kbd>, and a dedicated Collapse control all collapse it, and focus is contained within it while open. `swc-popover`'s `modal` property is the gen2 precedent for exactly this: opting into native `<dialog>.showModal()` gives a native focus trap, native background inert, and a native `::backdrop` scrim with no hand-rolled focus-trap implementation needed (RSP S2 does the equivalent with `FocusScope`/`useModalOverlay`, a React-only mechanism with no gen2 counterpart). `Escape` handling should go through the shared `dismissibleStack` (`registerDismissible()`/`isTopDismissible()`) so it coordinates correctly with a popover or tooltip also open at the same time, and the screen-takeover itself should use `PageScrollLockController` for the scroll lock; `swc-popover`'s modal mode already wires up both, all already built, see [Dependencies](#dependencies). Collapsing moves focus to the container region, not to whatever was focused before expanding (RSP S2: `collapse()` calls `regionRef.current?.focus()`). The region carries `tabindex="-1"` so it's programmatically focusable for this without joining the normal Tab sequence.
- When a focused toast closes (close button, action button, or auto-dismiss) and other toasts remain, focus moves to the nearest still-open toast: the newer one in front of it if there is one, otherwise the older one behind it. If the user is in pointer modality, focus instead leaves the region entirely, back to whatever was focused before the user entered it, specifically so the new front toast's timer is not left paused (region-wide pause keeps the collapsed front toast's timer paused while focus stays in the region; see Q7). This does not apply in the expanded view, where no toast auto-dismisses (Q12). RSP S2's `useToastRegion.ts` branches this way explicitly. Tracking which toast currently has focus, and what was focused before the user entered the region, should use the shared `getActiveElement()`/`deepContains()` utilities (shadow-DOM-aware); the expanded list's focus trap should enumerate candidates with the shared `focusableSelector`. All already built; see [Dependencies](#dependencies).
- When the last toast closes and the queue empties, focus always returns to whatever was focused before the user entered the region, regardless of modality (RSP S2: tracked as the region's `focusWithin` `relatedTarget` when focus first entered it).
- The container region is discoverable via landmark navigation (<kbd>F6</kbd>/<kbd>Shift</kbd> + <kbd>F6</kbd> in JAWS and NVDA) purely as a consequence of carrying `role="region"` and an `aria-label`. No additional code is needed for this; RSP S2 has none either.
- Navigating the expanded list uses <kbd>Tab</kbd> only; arrow keys are not used. `FocusgroupNavigationController` (the shared roving-tabindex/arrow-key controller used by `tabs`, `action-group`, and others) does not apply here for exactly that reason, it's built for arrow-key composite widgets, not this Tab-only model, so it's deliberately not a dependency.

---

## Architecture: core vs SWC split

> The 1st-gen component is a **reference only** — gen2 is built independently. Neither generation imports from the other.

Follow the [Badge migration reference](../../02_workstreams/02_gen2-component-migration/02_step-by-step/01_washing-machine-workflow.md#reference-badge-migration) as the concrete pattern for the core/SWC split.

| Layer | Path | Contains |
| ----- | ---- | -------- |
| **Core (`swc-toast`)** | `gen2/packages/core/components/toast/` | `Toast.base.ts`, `Toast.types.ts`: property declarations, variant validation, `aria-labelledby`/`aria-label` derivation. Also gates `swc-after-open`/`swc-after-close` on the host's own CSS transition completion via the shared `runAfterTransition` utility, matching `swc-popover`/`swc-tooltip`; these events are `composed`/`bubbles` (matching `Popover.base.ts`/`Tooltip.base.ts`), which is what lets `swc-toast-container` listen for them from outside the toast's shadow tree. No rendering, no timer ownership. |
| **SWC (`swc-toast`)** | `gen2/packages/swc/components/toast/` | `Toast.ts`, `toast.css`: renders host role/state attributes, variant icon, inner `role="alert"` wrapper, default + `action` slots, `swc-close-button`. Wires `SlotPresenceController` and `SlotAttributePropagationController` for the `action` slot. Element registration, stories, tests. |
| **Core (`swc-toast-container`, proposed, Q13)** | `gen2/packages/core/components/toast-container/` (proposed; may nest under `toast/` instead) | Owns the queue's countdown: timeout flooring, and pause/resume for the collapsed front toast only (`pointerenter`/`focusin`/`pointerleave`/`focusout`, region-wide per Q7). Remaining time is tracked only while that toast stays the collapsed front toast; demotion discards it, and promotion starts a fresh timeout. The container owns this state because it knows which toast is front and whether the view is expanded, following this codebase's established `ReactiveController` pattern (see Q5). Resolved (Q12): the countdown only runs for the front, visible toast in the collapsed stack; a peek layer does not count down. When the front toast dismisses, the next toast's timeout starts fresh (full duration, not a saved remainder). No toast auto-dismisses in the expanded view, on any browser or device. Mouseout must not resume a timer for any toast that is not the collapsed front toast. Whether the front-toast transition also coordinates a smooth repositioning animation between positions is Q8. Also owns `placement` (default `bottom`) and the decoupled queue export consumers call to add, close, and clear toasts. Eviction branches on whether a real `<swc-toast>` element currently represents the toast (collapsed front toast, or any toast in the expanded list) or it is a decorative peek layer (Q14, no real element exists): a real element is told to close normally and evicts via its own `swc-after-close`; a peek layer has nothing to animate and no running timer, so timeout does not evict it. Removing a peek-layer toast (`clear()`, or an explicit close of that queued toast) updates queue state directly. Its timeout can dismiss it only after promotion to front, once that fresh timeout elapses and the real element closes. |
| **SWC (`swc-toast-container`, proposed, Q13)** | `gen2/packages/swc/components/toast-container/` (proposed) | Renders the `role="region"` wrapper (with a dynamic `aria-label` reflecting notification count), the list, peek-stack layering, and the expanded view. Follows `swc-popover`'s `modal` mode (native `<dialog>.showModal()`) for the expanded view's focus containment, wiring `PageScrollLockController`, `dismissibleStack`, and `getActiveElement()`/`deepContains()`/`focusableSelector` for scroll lock, `Escape` coordination, and focus management the same way `swc-popover` does. Warns via `warnIf()` in `connectedCallback()` if a second instance connects while one is already present. |

Planned rendering shape:

- Core (`swc-toast`) owns ARIA attribute wiring and variant validation; SWC (`swc-toast`) renders variant icon, inner live-region wrapper, slotted content, close button
- Core (`swc-toast-container`, proposed, Q13) owns collapsed-front countdown state (Q12), `placement`, and the decoupled queue export; SWC (`swc-toast-container`) owns the region/list/peek-stack/expanded-view rendering

---

## Migration checklist

### Preparation (this ticket)

- [x] 1st-gen API surface documented
- [x] Dependencies identified
- [x] Breaking changes documented
- [x] gen2 API decisions drafted
- [x] Plan reviewed by at least one other engineer

### Setup

- [x] Create `gen2/packages/core/components/toast/`
- [x] Create `gen2/packages/swc/components/toast/`
- [x] Wire exports in both `package.json` files
- [x] Check out `spectrum-css` at `spectrum-two` branch as sibling directory

### API

#### Naming and public surface

- [ ] `Toast.types.ts`: define `ToastVariant` as `'neutral' | 'info' | 'positive' | 'negative'`
- [ ] `Toast.base.ts`: variant validation via `validateEnum()`, `icon-label` fallback
- [ ] Wire `SlotPresenceController` to gate on whether the `action` slot has content
- [ ] Wire `SlotAttributePropagationController` to propagate `size`/`variant` onto the slotted `action` button
- [ ] Gate `swc-open`/`swc-after-open`/`swc-close`/`swc-after-close` on the host's own CSS transition completion via the shared `runAfterTransition`

#### Container and queue

> Blocked on resolving Q5 (queue construct location) and Q8 (repositioning animation) first. Q13 (container naming/API) has a documented leaning but is still open for feedback. This work, and most of [Accessibility](#accessibility), is sequenced ahead of the rest of the implementation, not deferred behind it; only the single-toast bullets above are independent of it.

- [ ] Define `swc-toast-container` custom element (proposed name, Q13) with its own core/SWC split, per [Architecture](#architecture-core-vs-swc-split)
- [ ] `placement` attribute on `swc-toast-container`: `top`/`top-end`/`bottom`/`bottom-end`, default `bottom`
- [ ] Decoupled queue export for adding, closing, and clearing toasts (exact shape pending Q13, including how an action button and an `onClose` callback are supplied)
- [ ] Dev warning (`warnIf()`) if a second `swc-toast-container` connects while one is already present
- [ ] `swc-toast-container` listens for each toast's `swc-after-close` (already `composed`/`bubbles`) to evict it from the queue once that toast's own exit animation completes
- [ ] A decorative peek layer (Q14) does not run a timer and is not evicted by timeout while demoted. Removing it in that state (`clear()`, or an explicit close) updates queue state directly; timeout dismissal waits until it is promoted to front and the real element closes through `swc-after-close` (Q12)
- [ ] Queue construct (core, exact location pending Q5): timeout floor (6000ms, Q1); countdown runs only for the collapsed front toast and starts fresh on promotion (Q12); no auto-dismiss in the expanded view; pause/resume preserves remaining time only while that toast stays front (Q7)
- [ ] Queue construct: `clear()` method, empties every queued toast at once
- [ ] Queue construct: new toasts join the front, not the back; no cap on how many stay tracked
- [ ] Peek-stack rendering: only the front toast is a real `alertdialog`; the rest render as empty, non-interactive `role="presentation"` layers (Q14); anything further back stays in the DOM at `opacity: 0`
- [ ] Expand control on the front toast, shown once two or more toasts are queued, laid out below the message alongside the action button
- [ ] Expanded-list rendering: every toast becomes its own real `alertdialog`
- [ ] Expanded-view scrim, dismissible on click
- [ ] Expanded view's focus containment follows `swc-popover`'s `modal` mode (native `<dialog>.showModal()`): native focus trap, native background inert, native `::backdrop` scrim, instead of a hand-rolled focus-trap implementation
- [ ] `Escape`-to-collapse wired through the shared `dismissibleStack` (`registerDismissible()`/`isTopDismissible()`)
- [ ] Scroll lock for the expanded view via `PageScrollLockController`
- [ ] Focus management via `getActiveElement()`/`deepContains()`/`focusableSelector` (which toast has focus, what was focused before entering the region, enumerating the expanded list's focusable elements)
- [ ] Container region: `role="region"` + `aria-label` + `tabindex="-1"` (programmatically focusable for the collapse-to-region behavior, not part of the normal Tab sequence)
- [ ] Clicking anywhere on the collapsed stack expands it, guarded so clicking an actual button (close, action, expand) does not also trigger expansion
- [ ] Expanded list navigates with <kbd>Tab</kbd> only; no arrow-key handling (`FocusgroupNavigationController` deliberately not used)

#### Alignment checks

- [ ] Confirm message slot shape with Design (Q9)
- [ ] Confirm container naming and API shape with Architecture + Design (Q13)

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

- [ ] Stacking direction flips with `placement`: newest toast closest to whichever edge the container is anchored to (top or bottom), matching RSP S2's `flexDirection: column`/`column-reverse` split
- [ ] Author peek-stack depth CSS: positional offset and opacity falloff behind the front toast (`opacity: 0` beyond the third position), matching RSP S2
- [ ] Author the expand control's row layout on the front toast (`gridTemplateAreas` alongside the action button)
- [ ] Author the expanded-view full-screen layout: scrim, list layout, and the collapsed/expanded transition
- [ ] Toast's own open/close transition CSS carries over from 1st-gen (opacity/transform), updated to S2 tokens; gates `swc-open`/`swc-after-open`/`swc-close`/`swc-after-close` via the shared `runAfterTransition`
- [ ] Cross-position repositioning animation (peek/front/expanded) depends on Q8; do not implement until that's resolved. Either way, peek layers stay contentless per Q14, and `prefers-reduced-motion` must fall back to a cross-fade instead of animating position, matching RSP S2 and this codebase's `progress-circle` precedent

### Accessibility

Checklist items sourced from [accessibility-migration-analysis.md](./accessibility-migration-analysis.md); resolve Q9 before treating this section as final. Most of this section also depends on the container/queue construct existing (Q5/Q8): only naming/semantics and the single-toast items in State verification (`tabindex`) are independent. Focus management across toasts, focus-on-queue-empty, collapse-to-region, and landmark navigation all require the container.

#### Naming and semantics

- [ ] Host: `role="alertdialog"`, `aria-modal="false"`, `aria-labelledby` from slot text (or `aria-label` fallback)
- [ ] Inner wrapper: `role="alert"`, `aria-atomic="true"`
- [ ] Inner wrapper's message content is set only after the node already exists, empty, in the accessibility tree; do not populate it in the same step that creates or reveals the node (Q10; still needs verification against slotted content and a toggled `open` lifecycle, see Q11)
- [ ] `aria-hidden="true"` on host when `open` is false

#### State verification

- [ ] Collapsed front toast pauses on `pointerenter` + `focusin` anywhere in the region, preserves remaining time only while it stays front, and resumes only when both clear (Q7). Peek layers do not count down, and the expanded view does not auto-dismiss (Q12). Mouseout does not resume any other toast's timer
- [ ] Auto-dismiss runs only for the collapsed front toast, including when it is the last toast in the queue; no toast auto-dismisses in the expanded view (Q12)
- [ ] `timeout` hard-disabled when the action slot has content, checked once at open time (not live-reactive to later slot changes), gated on slot presence via `SlotPresenceController`; paired with a `warnIf()` dev warning, matching the "mutually exclusive / no-effect combination" pattern used elsewhere (e.g. Badge's `outline` + non-semantic `variant`) (Q2)
- [ ] `tabindex="0"` on host always; opening a toast does not move focus there
- [ ] Focus management on toast-close: nearest remaining toast for keyboard users, out of the region entirely for pointer users
- [ ] When the last toast closes and the queue empties, focus returns to whatever was focused before the user entered the region, regardless of modality
- [ ] Collapsing the expanded view sends focus to the container region
- [ ] Container region reachable via landmark navigation (<kbd>F6</kbd>/<kbd>Shift</kbd> + <kbd>F6</kbd>), no additional code required

### Testing

- [ ] Port `1st-gen/packages/toast/test/toast.test.ts` coverage that still applies
- [ ] Add Playwright `toast.a11y.spec.ts` with `toMatchAriaSnapshot`

#### Behavior

- [ ] Countdown pause/resume unit tests for the collapsed front toast (pointer, focus, both simultaneously); demotion discards any saved remainder; mouseout does not resume a non-front toast
- [ ] Timeout floor enforcement test
- [ ] Demotion stops the countdown; promotion back to the collapsed front starts a fresh full timeout, not a saved remainder (Q12; see [Architecture](#architecture-core-vs-swc-split))
- [ ] No toast auto-dismisses while the expanded view is open, including toasts that were counting before expand (Q12)
- [ ] The last toast in the queue still auto-dismisses once it is the collapsed front toast (Q12)
- [ ] `clear()` empties the whole queue in one action
- [ ] Peek-stack rendering: only the front toast is a real `alertdialog`; the rest render `role="presentation"` as wholly separate, empty elements (Q14)
- [ ] Peek layers have zero focusable descendants: Tab never lands on a demoted toast's close or action button while collapsed (Q14)
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
- [ ] Consumer migration guide states that auto-dismiss runs only for the collapsed front toast, and that no toast auto-dismisses in the expanded view (Q12)
- [ ] Document the `error`/`warning` → `negative` variant consolidation in the consumer migration guide

### Review

- [ ] `yarn lint:gen2` passes (ESLint, Stylelint, Prettier)
- [ ] Status table in workstream doc updated
- [ ] PR created with description referencing Epic SWC-2257
- [ ] Peer engineer sign-off

---

## Blockers and open questions

### Design

| # | Item | Blocking? | Status | Owner |
| --- | ---- | --------- | ------ | ----- |
| Q9 | Message content: stay the default slot (current plan), or become a named slot? Default-slot content can be a bare text node with no element to hold the `aria-labelledby` target ID, silently falling back to `aria-label`; a named slot would let the component guarantee a light-DOM wrapper instead. | Yes | Open ❓ | Design + accessibility reviewer |
| Q15 | Standalone auto-dismiss: should `swc-toast` retain its own timer for hand-authored use with no `swc-toast-container` present, or does `timeout` have no effect at all until paired with the container? Leaning toward the latter: [accessibility-migration-analysis.md](./accessibility-migration-analysis.md#assistive-technology-live-regions) already states a standalone toast "cannot fully replicate" the container's behavior (region-wide pause, focus routing across toasts, peek-stack management), so a fully standalone toast was never meant to be a completely accessible configuration once more than one toast exists; building a working auto-dismiss timer for that unsupported path may not be worth it. This is already consistent with the Architecture table: `swc-toast`'s core layer has "no timer ownership" today, and `timeout` was never part of the independent single-toast API bucket in the first place. If confirmed, the "hand-author `swc-toast` with no container involved" language in [Container API](#container-api-gen2) needs a caveat that auto-dismiss specifically doesn't work in that mode. | Yes | Open ❓ (leaning documented) | Design + accessibility reviewer |

Q1, Q2, Q3, Q7, and Q12 were previously listed here; all five are now resolved, see the [Decision log](#decision-log).

### Architecture and behavior

| # | Item | Blocking? | Status | Owner |
| --- | ---- | --------- | ------ | ----- |
| Q5 | The countdown can't stay inline in `Toast.base.ts` (see [Architecture](#architecture-core-vs-swc-split)). It runs only for the collapsed front toast, stops on demotion, and starts fresh on promotion (Q12), and the container is what knows which toast is front and whether the view is expanded. It still needs its own queue-level construct regardless. Rendering ownership is now settled by Q13 (`swc-toast-container`'s core layer owns the countdown state, its SWC layer owns the region/list/peek-stack/expanded-view rendering). Before the dependent container, timeout, and accessibility work can proceed, the plan needs an explicit decision about whether that construct is a shared, cross-component controller in `gen2/packages/core/controllers/` now, or stays specific to `swc-toast-container`'s own core layer (`gen2/packages/core/components/toast-container/`) until a second consumer actually needs it. Either way, it should follow this codebase's established `ReactiveController` pattern (used by `PageScrollLockController`, `SlotPresenceController`, and others) rather than a plain framework-agnostic singleton service. Leaning toward staying specific to `swc-toast-container` for now and extracting a shared controller later if a second consumer actually needs similar behavior, mirroring how shared behavior between `progress-bar` and `meter` unfolded elsewhere in this codebase: the first component migrated with its own inline implementation, and a shared controller was only extracted once the second one's migration actually needed it. | Yes | Open (leaning documented) | Architecture reviewer |
| Q8 | Repositioning a toast between peek, front, and expanded-list position (not its own open/close, which reuses `runAfterTransition`, see [Architecture](#architecture-core-vs-swc-split)): should this use the View Transitions API for a smooth cross-position morph (matching RSP S2's queue-level `wrapUpdate` wrapping), with no animation as the fallback where unsupported, or accept an instant swap between positions (no existing gen2 precedent either way)? Trade-offs documented in [Behavioral semantics](#behavioral-semantics). Countdown state does not follow the visual position change: demotion discards the countdown, promotion to the collapsed front starts a fresh timeout, and the expanded list does not count down (Q12). This must be resolved before the container's rendering and transition implementation proceeds. | Yes | Open | Architecture reviewer |
| Q11 | Q10's ordering requirement (the live region's content must be set at least one frame after the node exists, empty, in the accessibility tree) has only been verified against a single toast whose alert node owns its text directly in the shadow tree, freshly created per toast. Still needs verification against: message content delivered through the default slot (light DOM, per Q9) and projected into the alert wrapper; and a persistent host whose `aria-hidden` and content toggle with `open`, rather than the node being created fresh each time. If delayed population is not reliable across browsers, use a separate live region as a light-DOM sibling instead. | Yes | Open | Accessibility reviewer |
| Q13 | Container naming and API shape. Proposed tag name `swc-toast-container`, open for feedback. Proposed shape: the element renders the region/list/peek-stack/expanded-view (see [Architecture](#architecture-core-vs-swc-split)), but adding a toast goes through a separate, decoupled queue export (methods like `add()`/`close()`/`clear()`, or per-variant convenience methods), not a method on the element itself, matching RSP S2's `ToastQueue`/`ToastContainer` split; see [Container API](#container-api-gen2). Also covers `placement` (proposed default `bottom`), the one-container-per-view dev warning, and how the export supplies an action button and an `onClose` callback (see [Container API](#container-api-gen2)). | Yes | Open ❓ (leaning documented) | Architecture reviewer + Design |

### Scope and prerequisites

None currently.

---

## Decision log

Resolved decisions from planning, kept here as a historical record so [Blockers and open questions](#blockers-and-open-questions) stays focused on what's still unresolved. Entries retain their original `Q`/`B`/`C` identifier so inline references elsewhere in the plan still resolve here.

| Ref | Decision | Rationale / context |
| --- | -------- | -------------------- |
| Q1 | Timeout floors to 6000ms, matching 1st-gen and the current accessibility migration analysis, not RSP S2's 5000ms. | Team decision going into the API phase. |
| Q2 | `timeout` is hard-disabled (not just a dev warning) whenever the action slot has content, matching RSP S2's `timeout` forced to `undefined` when `actionLabel` is set. Checked once, at open time, not continuously reactive to later slot changes. | Team decision going into the API phase. The action slot is light DOM, so its presence can change after a toast is already open (unlike RSP's `actionLabel`, a prop fixed at creation); evaluating once at open avoids designing a live pause/resume/restart state machine for that edge case. Paired with a `warnIf()` dev warning, matching the codebase's existing "mutually exclusive / no-effect combination" pattern (e.g. Badge's `outline` + non-semantic `variant`, Progress-circle's `indeterminate` + `value`) rather than staying silent. |
| Q3 | Keep the light-DOM `action` slot from 1st-gen, rather than switching to `action-label`/`swc-action` props. | Team decision going into the API phase. Matches 1st-gen with no consumer migration needed; `SlotPresenceController` and `SlotAttributePropagationController` (both already built) cover presence-gating and `size`/`variant` propagation. |
| Q4 | `tabindex="0"` on host always, not conditional on container presence. Opening a toast does not move focus there. | The accessibility migration analysis previously recommended conditional `tabindex` and focus-on-open; both were corrected after checking the real RSP S2 source, which sets `tabIndex: 0` unconditionally but never autofocuses a toast on open. `tabindex="0"` makes the host a normal tab stop, matching RSP. |
| Q6 | `swc-toast` ships alongside a first-party container/queue in this migration, rather than standalone with the container deferred. | Settled via team sync. Only "whether to build it in this cycle" is resolved; the container's shape and API (peek stack, expand/collapse, focus management, `clear()`, and related accessibility behavior) remain open and are being worked out incrementally across this plan. If built, `placement` (RSP precedent: `top`/`bottom`/`top end`/`bottom end`) belongs on the container, not on `swc-toast` itself. |
| Q7 | Timer pause is region-wide for the collapsed stack: pointer or focus anywhere in the region pauses the front toast's running timer, and that timer resumes only when both have cleared, and only while that toast stays front. Peek layers are not counting, and the expanded view does not auto-dismiss (Q12). This keeps the region-wide idea of RSP S2's `pauseAll()`/`resumeAll()` for the one timer that is actually running, rather than the accessibility migration analysis's earlier per-toast recommendation, and does not carry forward RSP's bug of resuming every visible toast on mouseout. | Team decision going into the API phase. Restated after Q12 so "every visible toast" is not read as several concurrent countdowns. Region-wide pause still matters because hovering or focusing the collapsed stack, not only the front toast's own controls, pauses that front toast. |
| Q10 | The inner `role="alert"` live region will only announce reliably in Safari and Edge with VoiceOver when its message content is set after the node has already existed, empty, in the accessibility tree for at least one frame. Setting the content in the same step that creates or reveals the node is unreliable and can be silently skipped. | Manual cross-browser VoiceOver testing. This is a construction-order constraint, not a general shadow DOM limitation: shadow DOM live regions otherwise announce correctly in both browsers. |
| Q12 | Countdown timing: a toast's timer only runs while it's the front, visible toast in the collapsed stack; peek layers behind it don't count down. When the front toast auto-dismisses, the next toast is promoted to front and its timeout starts fresh (full duration, not a saved remainder). Any remainder saved by pause is discarded on demotion. This applies even to the last toast in the queue: it still auto-dismisses on its own timeout, matching RSP. The only exception is the expanded view: no toast auto-dismisses there at all, on any browser or device. | Team decision, superseding the earlier RSP-`Timer`-based leaning. Manual RSP testing found real timer/visibility behavior varies by browser and device, so this model is `swc-toast`'s own design rather than a port of RSP's implementation; it also removes the earlier "toast can expire before being viewed" trade-off outright. RSP's mouseout behavior, which resumes every visible toast in the stack, is not part of this model; see Q7. |
| Q14 | Peek-stack layers (decorative toasts behind the front one, while collapsed) never contain real interactive content. They render as a wholly separate, empty element, no close button, no action button, nothing focusable, not the real toast's markup hidden or dimmed behind `role="presentation"`. | Matches RSP S2's `Toast.tsx` exactly: `SpectrumToast` substitutes a plain, empty `<div role="presentation">` for any non-main toast while collapsed. This also settles the tabindex concern raised during review: `role="presentation"` alone doesn't reliably remove descendants from the tab order across every AT/browser combination, but an element with zero focusable descendants doesn't need that guarantee at all. It stays compatible with either outcome of Q8: RSP's animated morph works by matching `viewTransitionName` across the real toast and the empty decorative div, not by keeping the same interactive markup mounted across the position change. |

---

## References

- [Washing machine workflow](../../02_workstreams/02_gen2-component-migration/02_step-by-step/01_washing-machine-workflow.md)
- [gen2 migration status table](../../02_workstreams/02_gen2-component-migration/01_status.md)
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
- [Badge migration reference](../../02_workstreams/02_gen2-component-migration/02_step-by-step/01_washing-machine-workflow.md#reference-badge-migration)

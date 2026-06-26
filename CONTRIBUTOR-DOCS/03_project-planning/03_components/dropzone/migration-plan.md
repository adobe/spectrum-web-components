<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../../README.md) / [Project planning](../../README.md) / [Components](../README.md) / Dropzone / Dropzone migration plan

<!-- Document title (editable) -->

# Dropzone migration plan

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
    - [`_lit-styles/` fragment check](#lit-styles-fragment-check)
    - [Global element stylesheet check](#global-element-stylesheet-check)
    - [User confirmation needed](#user-confirmation-needed)
- [Changes overview](#changes-overview)
    - [Must ship — breaking or a11y-required](#must-ship--breaking-or-a11y-required)
    - [Additive — ships when ready, zero breakage for consumers already on 2nd-gen](#additive--ships-when-ready-zero-breakage-for-consumers-already-on-2nd-gen)
- [2nd-gen API decisions](#2nd-gen-api-decisions)
    - [Public API](#public-api)
    - [Behavioral semantics](#behavioral-semantics)
    - [Accessibility semantics notes (2nd-gen)](#accessibility-semantics-notes-2nd-gen)
- [Architecture: core vs SWC split](#architecture-core-vs-swc-split)
- [Non-a11y bugs table](#non-a11y-bugs-table)
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

> **Epic SWC-2145** · Planning output. Must be reviewed before implementation begins.
>
> **Figma received.** Q1–Q6 resolved. Remaining blocker: Q8 (`swc-illustrated-message` styling strategy, blocks styling phase).

---

## TL;DR

- `swc-dropzone` is a small component: a single default slot, four reactive properties (three carried forward plus the new `size`), four custom events, and a 100 ms debounced drag-leave guard. The DOM surface is thin; the complexity is in a11y requirements, styling state machine, event semantics, and the SVG stroke border.
- **Figma confirms three sizes** (Small, Medium, Large), which are not present in 1st-gen. Size is Must-ship (B16) and defaults to `'m'` so existing consumers are not broken.
- **Three property renames** (B1–B3) are the primary API-level breaking changes. The HTML attributes (`dragged`, `filled`, `drop-effect`) stay the same; only the JavaScript property names change to drop the `is` prefix and match the attribute names. Consumers using the Lit template syntax (`?dragged=…`) are unaffected; consumers who reference `element.isDragged` or `element.isFilled` directly in JavaScript will need to update.
- **`isFilled` is currently not reflected** — setting `element.isFilled = true` in JS does not update the `filled` attribute, so the drag-over highlight and replace-state styles do not apply. This is a silent bug that must be fixed in 2nd-gen (B4).
- **`dropEffect` has no `@property` decorator** in 1st-gen, making it non-reactive to attribute changes (B5). Properly declaring it with `@property` in 2nd-gen is a behavior fix, not a consumer-breaking change.
- **Figma confirms SVG stroke border** with rounded dashes (B8). The spectrum-css `index.css` uses CSS-only borders; this discrepancy must be aligned with the CSS team before the styling phase, but the Figma intent is clear.
- **Figma confirms illustration accent color in the dragged state** (was open in Q3; now confirmed). The slotted illustration should receive accent-color treatment when `dragged` is true.
- **Figma shows no error state.** Error state is deferred to additive A1.
- **Figma confirms Hover and drag share the same visual state** — there is no separate pointer-hover vs. drag-hover treatment. `:focus-visible` on the browse control uses the same accent border. Q2 is resolved.
- **Two new shadow DOM nodes** are required for a11y compliance: a `role="status"` element for AT drag-state announcements and a fixed `role="group"` on the host (B9–B10). Neither breaks consumer markup.
- **`swc-illustrated-message` is already fully migrated.** The CSS passthrough pattern (`--mod-illustrated-message-*` variables) used in 1st-gen does not carry forward to 2nd-gen; the styling relationship between `swc-dropzone` and `swc-illustrated-message` must be re-evaluated (Q8).
- **One active non-a11y bug to address:** SWC-2069 (`sp-dropzone-drop` does not fire on Windows Chrome). The 2nd-gen implementation and tests must include a regression guard.

### Most blocking open questions

- **Q4 in [Design](#design):** SVG stroke border — Figma confirms rounded dashes require SVG; spectrum-css `index.css` uses CSS borders. The CSS team must align before the styling phase. Shadow DOM render shape depends on this decision.
- **Q8 in [Architecture and behavior](#architecture-and-behavior):** How `swc-dropzone` styles the slotted `swc-illustrated-message` in S2. Must be resolved before styling phase.

---

## 1st-gen API surface

**Source:** [`1st-gen/packages/dropzone/src/Dropzone.ts`](../../../../1st-gen/packages/dropzone/src/Dropzone.ts)
**Version:** `@spectrum-web-components/dropzone@1.12.1`
**Custom element tag:** `sp-dropzone`

### Properties / attributes

| Property | Type | Default | Attribute | Reflected | Notes |
| -------- | ---- | ------- | --------- | --------- | ----- |
| `dropEffect` | `'copy' \| 'move' \| 'link' \| 'none'` | `'copy'` | `drop-effect` | No | No `@property` decorator; uses a manual getter/setter. Attribute changes at runtime are not reactive. |
| `isDragged` | `boolean` | `false` | `dragged` | Yes | `@property({ type: Boolean, reflect: true, attribute: 'dragged' })`. JS property name (`isDragged`) does not match attribute name (`dragged`) — naming inconsistency. |
| `isFilled` | `boolean` | `false` | `filled` | **No** | `@property({ type: Boolean, attribute: 'filled' })`. Not reflected. **Bug:** `element.isFilled = true` updates the JS property but does not set the `filled` attribute, so CSS state styles never apply via JavaScript. |

**Exported types:**

| Type | Definition | Notes |
| ---- | ---------- | ----- |
| `DropzoneEventDetail` | `DragEvent` | Type alias; exported from `src/index.ts`. |
| `DropEffects` | `'copy' \| 'move' \| 'link' \| 'none'` | Union type for `dropEffect`. |

### Methods

| Method | Visibility | Signature | Notes |
| ------ | ---------- | --------- | ----- |
| `onDragOver` | `public` | `(event: DragEvent): void` | Always calls `event.preventDefault()`. Dispatches `sp-dropzone-should-accept`; if not cancelled and `dataTransfer` is present, sets `isDragged = true` and dispatches `sp-dropzone-dragover`. |
| `onDragLeave` | `public` | `(event: DragEvent): void` | Ignores internal child transitions via `relatedTarget` check. Debounces via 100 ms `setTimeout`; dispatches `sp-dropzone-dragleave` and resets `isDragged`. |
| `onDrop` | `public` | `(event: DragEvent): void` | Guards: only fires if `isDragged` is already true. Calls `event.preventDefault()`, resets `isDragged`, dispatches `sp-dropzone-drop`. |
| `clearDebouncedDragLeave` | `protected` | `(): void` | Cancels the pending drag-leave timeout. Called by `onDragOver` and `onDrop` to suppress spurious leave events. |

> **Recommendation:** `onDragOver`, `onDragLeave`, and `onDrop` are currently `public` but are event handler implementation details, not a stable public API. In 2nd-gen, they should be `protected` and not documented as part of the public surface. This is a technically breaking change for any consumer subclassing the component, but there is no evidence of that usage pattern. See **Q9**.

### Events

| Event | Cancelable | Bubbles | Composed | Detail type | Notes |
| ----- | ---------- | ------- | -------- | ----------- | ----- |
| `sp-dropzone-should-accept` | **Yes** | Yes | Yes | `DragEvent` | Pre-accept gate; cancel to reject the drag. Sets `dataTransfer.dropEffect = 'none'` when cancelled. |
| `sp-dropzone-dragover` | No | Yes | Yes | `DragEvent` | Fires after acceptance is confirmed and `isDragged` is set. |
| `sp-dropzone-dragleave` | No | Yes | Yes | `DragEvent` | Fires after the 100 ms debounce. |
| `sp-dropzone-drop` | No | Yes | Yes | `DragEvent` | Fires when a drop is accepted. |

> **Note on event naming:** The `sp-` prefix is tied to the 1st-gen element name. In 2nd-gen, all events rename to `swc-dropzone-*` (Q5 resolved; consistent with all other migrated components).

### Slots

| Slot | Content | Notes |
| ---- | ------- | ----- |
| default | Drop zone content: illustrated message, browse button or link, instructive copy | The component renders no built-in content. All visible elements — including the **required** browse control — must be provided by the consumer via this slot. |

### CSS custom properties

The full `--mod-*` modifier surface from 1st-gen will not be carried forward to 2nd-gen. The list below is for reference; none of these properties will be exposed as `--swc-*` unless there is a specific consumer need identified during the styling phase.

**Modifier surface (1st-gen, reference only):**

`--mod-drop-zone-background-color`, `--mod-drop-zone-background-color-opacity`, `--mod-drop-zone-background-color-opacity-filled`, `--mod-drop-zone-body-font-size`, `--mod-drop-zone-body-to-action`, `--mod-drop-zone-border-color`, `--mod-drop-zone-border-color-hover`, `--mod-drop-zone-border-dash-gap`, `--mod-drop-zone-border-dash-length`, `--mod-drop-zone-border-style`, `--mod-drop-zone-border-style-dragged`, `--mod-drop-zone-border-width`, `--mod-drop-zone-content-background-color`, `--mod-drop-zone-content-bottom-to-text`, `--mod-drop-zone-content-font-family`, `--mod-drop-zone-content-font-size`, `--mod-drop-zone-content-font-weight`, `--mod-drop-zone-content-height`, `--mod-drop-zone-content-max-width`, `--mod-drop-zone-content-maximum-width`, `--mod-drop-zone-content-top-to-text`, `--mod-drop-zone-corner-radius`, `--mod-drop-zone-edge-to-text`, `--mod-drop-zone-illustration-color-hover`, `--mod-drop-zone-inline-size`, `--mod-drop-zone-padding`, `--mod-drop-zone-title-line-height`

**Passthrough to slotted `sp-illustrated-message` (1st-gen, reference only):**

`--mod-illustrated-message-description-font-size`, `--mod-illustrated-message-description-position`, `--mod-illustrated-message-description-to-action`, `--mod-illustrated-message-description-z-index`, `--mod-illustrated-message-display`, `--mod-illustrated-message-illustration-color`, `--mod-illustrated-message-vertical-maximum-width`

> These passthrough properties will not work the same way with `swc-illustrated-message`. See **Q8**.

### Shadow DOM output (rendered HTML)

**1st-gen:**

```html
<!-- sp-dropzone shadow root -->
<slot></slot>
```

**Target 2nd-gen (provisional — see Q4 for SVG stroke decision):**

```html
<!-- swc-dropzone shadow root -->
<div class="swc-Dropzone">
  <div role="status" aria-live="polite" class="swc-Dropzone-status"></div>
  <slot></slot>
</div>
```

If SVG stroke is confirmed (Q4), the render shape becomes:

```html
<!-- swc-dropzone shadow root -->
<div class="swc-Dropzone">
  <svg class="swc-Dropzone-stroke" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" aria-hidden="true">
    <rect class="swc-Dropzone-strokePath" x="1" y="1" rx="10px" ry="10px" fill="none" width="100%" height="100%"
      stroke-linecap="round" stroke-linejoin="round" vector-effect="non-scaling-stroke" />
  </svg>
  <div role="status" aria-live="polite" class="swc-Dropzone-status"></div>
  <slot></slot>
</div>
```

---

## Dependencies

| Package | Version | Role |
| ------- | ------- | ---- |
| `@spectrum-web-components/base` (2nd-gen: `@spectrum-web-components/core`) | workspace | `SpectrumElement` base class, `@property`, `@state` decorators, `html` template tag |
| `@spectrum-web-components/illustrated-message` | peer / slot content | `sp-illustrated-message` is the recommended default slot content in 1st-gen. The 2nd-gen `swc-illustrated-message` is already migrated and will fill this role, but `swc-dropzone` does not import it; it is consumer-provided via the slot. |

---

## Migration sequencing and prerequisites

### Dependency-aware recommendation

**Proceed independently.** No other 2nd-gen component depends on `swc-dropzone`. `swc-illustrated-message` is fully migrated and ready to use as slot content. No shared base class or CSS fragment extraction is required before this migration begins.

### Related components and ordering notes

| Component | Status | Relationship |
| --------- | ------ | ------------ |
| `illustrated-message` | Fully migrated | Recommended slot content; `swc-dropzone` does not import it directly. CSS passthrough relationship needs redesign (Q8). |
| `button` | Partially migrated (analysis only) | Recommended browse control in the slot. `swc-dropzone` does not import it directly. |
| `link` | Fully migrated | Alternative browse control. Not imported by `swc-dropzone`. |

### `_lit-styles/` fragment check

The dropzone's CSS structure (border, padding, background, state transitions) is unique to this component. No existing `_lit-styles/` fragment matches its pattern. No extraction is needed or recommended for this migration.

### Global element stylesheet check

`swc-dropzone` is a block-level widget, not a native HTML element. No `stylesheets/global/global-dropzone.css` is needed.

### User confirmation needed

No sequencing, shared-base, or inheritance decisions require explicit user confirmation before this migration begins.

---

## Changes overview

> **Priority framing:**
>
> - **Must ship** items define the in-scope work required for this migration.
> - **Additive** items are deferred and will not cause consumer breakage when they do ship.
> - **Accessibility is non-negotiable** — all a11y requirements ship as part of this migration.

### Must ship — breaking or a11y-required

#### API and naming

| # | What changes | 1st-gen behavior | 2nd-gen behavior | Consumer migration path |
| - | ------------ | ---------------- | ---------------- | ----------------------- |
| **B1** | Element tag: `sp-dropzone` → `swc-dropzone` | `<sp-dropzone>` | `<swc-dropzone>` | Update all HTML and JS references. |
| **B2** | JS property rename: `isDragged` → `dragged` | `element.isDragged` | `element.dragged` | Update JS references; HTML attribute `dragged` is unchanged. Lit template `?dragged=…` bindings are unaffected. |
| **B3** | JS property rename: `isFilled` → `filled` | `element.isFilled` | `element.filled` | Update JS references; HTML attribute `filled` is unchanged. Lit template `?filled=…` bindings are unaffected. |
| **B4** | Fix `filled` reflection | Setting `element.isFilled = true` did not update the attribute; styles never applied via JS | Setting `element.filled = true` now reflects to `[filled]` attribute; styles apply correctly | No consumer migration needed. This is a silent bug fix. |
| **B5** | `dropEffect` becomes a proper `@property` | Manual getter/setter; attribute changes at runtime not reactive | `@property({ type: String, attribute: 'drop-effect', reflect: true })`; fully reactive | No migration needed for consumers using the attribute. JS consumers using `element.dropEffect = 'move'` are unaffected. |
| **B6** | Public methods `onDragOver`, `onDragLeave`, `onDrop` visibility | `public` | `protected` | Consumers who subclass `Dropzone` and override these methods must update visibility. **Inferred** as low-risk (see Q9). |
| **B7** | Event prefix | `sp-dropzone-should-accept`, `sp-dropzone-dragover`, `sp-dropzone-dragleave`, `sp-dropzone-drop` | **Confirmed.** Rename to `swc-dropzone-should-accept`, `swc-dropzone-dragover`, `swc-dropzone-dragleave`, `swc-dropzone-drop`. Consistent with all other migrated 2nd-gen components. | Update all `addEventListener` calls. |

#### Styling and visuals

| # | What changes | 1st-gen behavior | 2nd-gen behavior | Consumer migration path |
| - | ------------ | ---------------- | ---------------- | ----------------------- |
| **B8** | SVG stroke border — **Figma confirmed; spectrum-css alignment pending (Q4)** | CSS `border-style: dashed` (pure CSS border; no SVG) | Inline SVG `<rect>` stroke for rounded corner dashes as shown in Figma. Spectrum-css currently uses CSS; team must align before styling phase. | No consumer migration if the visual result is functionally equivalent; SVG border adds a shadow DOM element. |
| **B9** | CJK font size tokens | Applied via `--mod-illustrated-message-*` passthrough | Applied via direct token usage inside `swc-dropzone` (passthrough redesign per Q8) | No consumer migration needed; visual behavior preserved. |
| **B10** | `:focus-visible` styling scoped to browse control | 1st-gen applied focus styles to host only when consumer added `tabindex`. | 2nd-gen has no `tabindex` on host. `:focus-visible` applies to the browse control in the slot; browse control accent ring matches the Figma Hover state border style. | See a11y changes below. |
| **B16** | `size` attribute — **new, not in 1st-gen** | No size variants; fixed visual scale. | `size: 's' \| 'm' \| 'l'`; default `'m'`. Controls illustrated icon scale and container dimensions per Figma. Use `SizedMixin` from `@spectrum-web-components/core/mixins` with `validSizes: ['s', 'm', 'l']` applied in `DropzoneBase`; the mixin provides the `size` `@property`, validation, and attribute reflection. | No breaking change for existing consumers (defaults to `'m'`). |

#### Accessibility and behavior

| # | What changes | 1st-gen behavior | 2nd-gen behavior | Consumer migration path |
| - | ------------ | ---------------- | ---------------- | ----------------------- |
| **B11** | `role="group"` on host | No default role; consumers were told to add `role` and `aria-label` manually. | **Confirmed.** `role="group"` is fixed on the host; not author-overridable. Accessible name required via `aria-label` or `aria-labelledby`. | Consumers who already added `role` must remove it. All consumers must add `aria-label` or `aria-labelledby`. |
| **B12** | Dev warning for missing accessible name | No warning. | Warning in debug builds when neither `aria-label` nor `aria-labelledby` is present. | Add a label; no code change needed after labeling. |
| **B13** | Shadow DOM `role="status"` for drag announcements | No AT announcements for drag state changes. | Visually-hidden `role="status"` (`aria-live="polite"`) in shadow DOM. Text updates: "File ready to drop" (dragged), "File accepted" (drop), "Drop to replace existing file" (filled+dragged). | No consumer migration needed. |
| **B14** | SWC-2069 regression guard (drop event on Windows Chrome) | `sp-dropzone-drop` does not fire in some Windows Chrome configurations. | Fix and add a regression test. | No consumer migration needed. |
| **B15** | Documentation anti-patterns removed | Examples use `javascript:;` hrefs and inline `onclick` handlers. | Examples use `<sp-button>` or `<sp-link>` triggering hidden `<input type="file">` via an event listener. | Update custom implementations based on documentation. |

### Additive — ships when ready, zero breakage for consumers already on 2nd-gen

| # | What is added | Notes |
| - | ------------- | ----- |
| **A1** | Error state | **Figma shows no error state.** Deferred. Create a follow-up Jira ticket when design spec is available. |
| **A2** | ~~Hover state visually distinct from keyboard focus~~ | **Resolved by Figma.** The "Hover" state in Figma is the same as the drag-over state; no separate pointer-hover treatment exists. The same accent border applies to `:focus-visible` on the browse control. No additive work needed; this is fully in scope as part of B10. |
| **A3** | ~~Illustration accent color passthrough when dragged~~ | **Resolved by Figma.** The icon/illustration switches to the accent/gradient treatment in the "Hover" (dragged) state. This is confirmed Must-ship and is absorbed into the styling phase; see the B8/size matrix in the visual matrix section. No separate additive ticket needed. |
| **A4** | Customizable replace-state overlay content | The filled+dragged state shows "Drop file to replace." A named slot (e.g. `replace`) could allow consumer-provided replace-state content. Deferred; the default announcement covers a11y requirements without a slot. |

---

## 2nd-gen API decisions

These are derived from the 1st-gen source, the accessibility migration analysis, the spectrum-css `spectrum-two` branch, and the rendering-and-styling migration analysis. Confirmed items are marked; open items are tracked in [Blockers and open questions](#blockers-and-open-questions).

Use lightweight confidence labels:

- **Confirmed:** directly supported by source material
- **Inferred:** recommended based on multiple signals, but not explicitly specified in one authoritative source
- **Open question:** unresolved

### Public API

#### Properties / attributes (2nd-gen)

| Property | Type | Default | Attribute | Reflected | Confidence | Notes |
| -------- | ---- | ------- | --------- | --------- | ---------- | ----- |
| `dropEffect` | `DropEffects` | `'copy'` | `drop-effect` | Yes | Confirmed | Proper `@property` declaration. Values validated: `'copy' \| 'move' \| 'link' \| 'none'`. |
| `dragged` | `boolean` | `false` | `dragged` | Yes | Confirmed | Renamed from `isDragged`. Attribute unchanged. |
| `filled` | `boolean` | `false` | `filled` | **Yes** | Confirmed | Renamed from `isFilled`. Attribute unchanged. Reflection is a bug fix. |
| `size` | `'s' \| 'm' \| 'l'` | `'m'` | `size` | Yes | Confirmed | **New in 2nd-gen.** Figma shows Small, Medium, Large sizes. Maps to `'s'`, `'m'`, `'l'` per SWC conventions. Not present in 1st-gen; additive, not breaking. |

#### Visual matrix (2nd-gen)

Figma state labels and their component attribute equivalents:

| Figma state | Attribute(s) | Notes |
| ----------- | ------------ | ----- |
| Default | (none) | Dashed SVG stroke border (see Q4); illustrated message and browse control visible in slot. |
| Hover (drag-hover) | `[dragged]` | **Confirmed.** Solid accent-color border; light blue background tint; illustration color changes to accent (see illustration note below). Figma's "Hover" label = file dragged over the zone, not pointer hover. |
| Replace | `[filled][dragged]` | **Confirmed.** Accent "Drop file to replace" pill overlaid on the background image (consumer-provided filled content). Status announcement fires. |
| Filled (programming layer only) | `[filled]` | **Inferred.** Not shown as a standalone state in Figma. `filled = true` means content has been uploaded; the component's illustrated message should be hidden and the consumer-provided content (e.g. the background image) should be shown. No separate Figma visual exists for filled-without-drag. |
| Focus-visible | `:focus-visible` on browse control | **Confirmed.** Figma shows a single "Hover" state for both drag and interaction feedback. Pointer hover and drag share the same visual. Keyboard focus (`:focus-visible`) on the browse control applies the same accent border ring. There is no separate hover-only treatment on the host. |
| Error | Deferred (A1) | **Confirmed not in Figma.** No error state is shown in the Figma properties or states. Deferred to A1. |

**Size matrix (Figma-confirmed):**

| Size | Attribute | Illustration scale |
| ---- | --------- | ------------------ |
| Small | `[size="s"]` | Smaller illustrated icon and container |
| Medium (default) | `[size="m"]` or no attribute | Standard illustrated icon and container |
| Large | `[size="l"]` | Larger illustrated icon and container |

**Illustration accent color when dragged (Figma-confirmed):** The illustration icon changes to an accent/gradient treatment in the Hover (dragged) state. This is confirmed by both the Figma states matrix and the small icon comparison panel in the `S2 / Web (Desktop scale)` reference. The neutral icon (default) vs. accent icon (dragged) are both visible side-by-side in the Figma. The CSS must set `--mod-illustrated-message-illustration-color` (or equivalent in 2nd-gen) to the accent token when `[dragged]` is present.

#### Slots (2nd-gen)

| Slot | Content | Notes |
| ---- | ------- | ----- |
| default | `swc-illustrated-message` with the browse control placed in its `button-group` slot. This is the canonical pattern and aligns with the React Spectrum `DropZone` + `FileTrigger` model. When `filled`, the consumer replaces this content with the uploaded state. | **Confirmed.** `swc-dropzone` renders no built-in content. A browse control is required in every usage for WCAG 2.1.1 compliance. Note: `swc-illustrated-message`'s `button-group` slot is additive (A3 in that component's migration plan) and not yet implemented; examples must use a temporary pattern (browse control alongside `swc-illustrated-message` in the dropzone slot) until it ships. |

#### CSS custom properties (2nd-gen)

No `--mod-*` properties will be exposed. New `--swc-*` component-level properties may be introduced where needed — these are additive and not breaking. See [Component Custom Property Exposure](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/02_custom-properties.md#component-custom-property-exposure) for what to expose and how.

Each exposed `--swc-*` property must be documented with a `@cssprop` JSDoc tag on the primary SWC component class.

**Initial expectation for Dropzone:** a small reviewed set, likely:
- `--swc-dropzone-width` — component inline size (if not fully consumer-controlled)

The exact set depends on styling-phase review. No `--swc-*` properties are confirmed at this stage.

### Behavioral semantics

#### Drag-and-drop event flow

The event flow in 2nd-gen should preserve 1st-gen semantics with one correction:

1. `dragover` native event fires on the host.
2. `event.preventDefault()` is always called unconditionally (required for Chrome/Windows drop support; confirmed by the 1st-gen `always prevents default on dragover` test).
3. `swc-dropzone-should-accept` (or renamed equivalent) is dispatched. If cancelled, `dataTransfer.dropEffect = 'none'`; `dragged` stays false; dragover flow stops.
4. If not cancelled and `dataTransfer` is present, `dragged = true` and `swc-dropzone-dragover` (or renamed equivalent) fires.
5. `dragleave` native event fires. If `relatedTarget` is an internal child, the event is ignored (prevents flicker during child traversal). Otherwise, a 100 ms debounced timeout runs; on expiry, `dragged = false` and `swc-dropzone-dragleave` fires.
6. `drop` native event fires. `event.preventDefault()`. If `dragged` is true: clear timeout, `dragged = false`, dispatch `swc-dropzone-drop`.
7. The shadow DOM `role="status"` element is updated at steps 4 and 6 (and for the filled+dragged state).

**SWC-2069 note:** The drop event reliability issue on Windows Chrome is a platform bug the implementation must work around. The existing `event.preventDefault()` on `dragover` is the fix; a regression test must confirm the event fires correctly.

#### `dropEffect` validation

The 1st-gen validates `dropEffect` values silently (ignores invalid values). The 2nd-gen should preserve this behavior: invalid values are ignored, the previous valid value is retained. No thrown error.

#### Debounce and cleanup

The 100 ms drag-leave debounce must be cancelled in `disconnectedCallback` to prevent memory leaks and stale state updates. **Confirmed** — this is already implemented in 1st-gen and must be preserved.

### Accessibility semantics notes (2nd-gen)

Sourced from [accessibility-migration-analysis.md](./accessibility-migration-analysis.md). Full requirements are there; summary below.

| Topic | 2nd-gen behavior |
| ----- | ---------------- |
| Host role | `role="group"` — **confirmed** per a11y analysis |
| Accessible name | Required via `aria-label` or `aria-labelledby`; dev warning in debug builds if missing |
| Status region | Visually-hidden `role="status"` (`aria-live="polite"`) in shadow DOM |
| Status text: dragged | "File ready to drop" |
| Status text: drop | "File accepted" |
| Status text: filled+dragged | "Drop to replace existing file" |
| `aria-dropeffect` / `aria-grabbed` | Must not appear; deprecated in ARIA 1.1 |
| Host `tabindex` | None; the browse control in the slot owns the Tab stop |
| Browse control requirement | Must always be present in slot; required for WCAG 2.1.1 and 2.5.7 compliance |

---

## Architecture: core vs SWC split

> The 1st-gen component is a **reference only** — 2nd-gen is built independently. Neither generation imports from the other.

Follow the [Badge migration reference](../../02_workstreams/02_2nd-gen-component-migration/02_step-by-step/01_washing-machine-workflow.md#reference-badge-migration) as the concrete pattern for the core/SWC split.

| Layer | Path | Contains |
| ----- | ---- | -------- |
| **Core** | `2nd-gen/packages/core/components/dropzone/` | `Dropzone.base.ts`, `Dropzone.types.ts`. Base class: drag event binding, debounce logic, `dropEffect` validation, `dragged` / `filled` state, dev warning for missing accessible name, status region text management. No rendering. |
| **SWC** | `2nd-gen/packages/swc/components/dropzone/` | `Dropzone.ts`, `dropzone.css`, `swc-dropzone.ts` (element registration), stories, and tests. Extends `Dropzone.base.ts`. Renders the shadow DOM: status `<div>`, optional SVG stroke, and `<slot>`. |

**Planned rendering shape:**

- Core owns: drag event orchestration, `dropEffect` validation, `dragged` / `filled` state management, debounce logic, status text updates, accessible-name dev warning.
- SWC renders:
  - `<div class="swc-Dropzone">` host wrapper
  - `<div role="status" aria-live="polite" class="swc-Dropzone-status">` — visually hidden; updated by base class via `statusText` reactive property
  - SVG stroke `<rect>` (if confirmed by Q4)
  - `<slot></slot>`

**Types file (`Dropzone.types.ts`):**

```ts
export type DropEffects = 'copy' | 'move' | 'link' | 'none';
export type DropzoneSize = 's' | 'm' | 'l';
export type DropzoneEventDetail = DragEvent; // retained for consumers who imported this type
```

---

## Non-a11y bugs table

| Ticket | Summary | Status | Resolution path in 2nd-gen |
| ------ | ------- | ------ | -------------------------- |
| [SWC-2069](https://jira.corp.adobe.com/browse/SWC-2069) | `sp-dropzone-drop` event does not fire on Windows Chrome | To Do / Unresolved | The unconditional `event.preventDefault()` on `dragover` is the fix; add a regression test that confirms `swc-dropzone-drop` fires after a `dragover` + `drop` sequence even without `dataTransfer`. |

---

## Migration checklist

### Preparation (this ticket)

- [x] 1st-gen API surface documented
- [x] Dependencies identified
- [x] Breaking changes documented
- [x] 2nd-gen API decisions drafted
- [x] Figma PNG received and visual decisions finalized (Q1–Q4) — Q1–Q6 resolved; see TL;DR
- [x] Epic number added to plan header — SWC-2145
- [ ] Plan reviewed by at least one other engineer

### Setup

- [x] Create `2nd-gen/packages/core/components/dropzone/`
- [x] Create `2nd-gen/packages/swc/components/dropzone/`
- [x] Wire exports in `core/package.json` — SWC `package.json` exports pending (see note below)
- [ ] Wire exports in `swc/package.json` — not yet updated
- [ ] Confirm `spectrum-css` is checked out at `spectrum-two` branch as sibling directory (`/spectrum-css/components/dropzone/index.css`)

### API

#### Naming and public surface

- [x] `Dropzone.types.ts`: define `DropEffect` type and `DROP_EFFECTS` const, four event name constants
  — **Diverges from plan:** implemented as `DropEffect` (singular) rather than `DropEffects`.
  `DropzoneSize` and `DropzoneEventDetail` alias not yet added (needed for Phase 5 `size` property).
- [x] `Dropzone.base.ts`: declare `dragged` and `filled` with `@property({ type: Boolean, reflect: true })`
  — **Diverges from plan:** `dropEffect` does not reflect as `drop-effect` attribute (intentional; controls
  browser chrome, not component state). Plan specifies `reflect: true`; implementation differs.
- [x] `Dropzone.base.ts`: implement drag event binding in `connectedCallback` / `disconnectedCallback`
- [x] `Dropzone.base.ts`: implement debounced drag-leave; timer cleared in `disconnectedCallback`
- [x] `Dropzone.base.ts`: implement `dropEffect` value validation with dev warning in DEBUG builds
- [x] Dev warning for missing accessible name — implemented in `Dropzone.ts` (SWC class), not base class.
  Correct per architecture (SWC layer owns ARIA/debug concerns); plan locates it in the base.
- [x] Status text updates for dragged, filled+dragged, and filled states — implemented in `Dropzone.ts`
  via `_updateStatusRegion()` (Lit cycle) and `_onDragStateChange()` hook (synchronous). Correct per
  architecture; plan locates these in the base class.
- [x] Event handler methods made **private** (`_onDragOver`, `_onDragLeave`, `_onDrop`) — stricter than
  the plan's `protected` recommendation (B6/Q9), but more correct: no subclass should override
  individual handlers.

#### Alignment checks

- [x] Confirm event naming convention with the team (Q5) — resolved: `swc-dropzone-*`
- [x] Confirm `role="group"` vs `role="region"` with accessibility reviewer (Q6) — resolved: `role="group"`

### Styling

> Follow the [CSS style guide](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/) as the source of truth. Key references: [migration steps](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/04_spectrum-swc-migration.md), [custom properties](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/02_custom-properties.md), [anti-patterns](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/05_anti-patterns.md).

- [x] Resolve SVG stroke vs. CSS border question (Q4) — **Decided: CSS-only dashed border.** SVG stroke deferred; matches `spectrum-css` `main`; additive if needed later.
- [x] Add `.swc-Dropzone` to the internal wrapper `<div>` in `render()`; keep `:host` styling minimal
- [x] Copy `spectrum-css/components/dropzone/index.css` from `spectrum-two` branch as baseline (not `/dist`) — **Note:** sibling is on `main`; used S2 tokens from `spectrum-two.css` theme file + S2 token names.
- [x] Redesign `swc-illustrated-message` styling relationship (Q8) — **Resolved:** CSS custom property `--swc-illustrated-message-illustration-color` cascades from `:host([dragged])` into the slotted element via normal CSS inheritance. No `--mod-*` passthrough needed.
- [x] Verify `[dragged]`, `[filled]`, and `[filled][dragged]` state selectors map to the 2nd-gen attribute names
- [ ] Verify CJK font size modifier (`:lang(ja)`, `:lang(ko)`, `:lang(zh)`) is present in S2 source and ported — **Deferred:** no CJK text tokens in dropzone container; only relevant if text inside illustrated message needs overrides. Tracked for Phase 7 review.
- [x] Add visually-hidden utility class for `.swc-Dropzone-status` (position absolute, `clip-path: inset(50%)` pattern)
- [x] Verify `@media (forced-colors: active)` high-contrast overrides are present and correct
- [x] Add `@cssprop` JSDoc tags on any exposed `--swc-*` properties
- [x] Pass `yarn lint:css`

#### Visual model and regressions

- [ ] Verify default state: dashed border, background, corner radius
- [ ] Verify dragged state: solid border (accent color), background tint, illustration/icon accent-color treatment
- [ ] Verify filled state: illustrated message hidden
- [ ] Verify filled+dragged state: replace content visible (if applicable to chosen architecture)
- [ ] Verify `:focus-visible` ring applies to the browse control in the slot, not the host
- [ ] Verify forced-colors border and background
- [ ] Verify all three sizes (`s`, `m`, `l`): container dimensions, icon/illustration scale per Figma

### Accessibility

#### Naming and semantics

- [x] `role="group"` fixed on host — **Diverges from plan:** set in `connectedCallback` via
  `setAttribute` (guarded with `hasAttribute` so consumer-set roles are not overwritten), rather than
  via a `role` attribute on the host in `render()`.
- [x] `aria-dropeffect` and `aria-grabbed` not used anywhere in implementation or documentation
- [x] Shadow DOM contains `<div role="status" aria-live="polite" class="visually-hidden">`
- [x] Dev warning fires in debug builds when neither `aria-label` nor `aria-labelledby` is present

#### State verification

- [x] Status text updates to "File ready to drop" when `dragged` becomes true
- [x] Status text updates to "File accepted" when `filled` is set (consumer sets this in drop handler)
- [x] Status text updates to "Drop to replace existing file" when `dragged` becomes true while `filled` is set
- [x] Host has no `tabindex`; browse control in slot owns the Tab stop
- [ ] All stories and documentation examples include a browse control (button or link) — Phase 7
- [ ] Documentation replaces `javascript:;` hrefs and inline `onclick` patterns with accessible alternatives — Phase 7

### Testing

- [ ] Port `1st-gen/packages/dropzone/test/dropzone.test.ts` coverage that still applies
- [ ] Add Playwright `dropzone.a11y.spec.ts` with `toMatchAriaSnapshot`

#### Behavior

- [ ] `dropEffect` defaults to `'copy'`; invalid values are silently ignored
- [ ] `dragover` without `dataTransfer` always calls `event.preventDefault()` (cross-platform drop support)
- [ ] `dragover` with `dataTransfer` sets `dragged = true` and fires the dragover event
- [ ] Cancelling `swc-dropzone-should-accept` sets `dataTransfer.dropEffect = 'none'` and prevents `dragged = true`
- [ ] `dragleave` is debounced at 100 ms
- [ ] `dragleave` is ignored when `relatedTarget` is an internal child
- [ ] Debounce timeout is cleared on `drop` and `dragover`
- [ ] Debounce timeout is cleared in `disconnectedCallback`
- [ ] `filled = true` reflects to the `[filled]` attribute (regression: was not reflected in 1st-gen)
- [ ] `dragged = true` reflects to the `[dragged]` attribute
- [ ] `swc-dropzone-drop` fires after `dragover` + `drop` sequence on Windows Chrome (SWC-2069 regression)
- [ ] Shadow DOM status text updates on drag state transitions
- [ ] Dev warning fires when no accessible name is present

#### Accessibility tests (unit)

- [ ] `role="group"` (or confirmed equivalent) is on the host
- [ ] Shadow DOM contains `role="status"` element
- [ ] Status text is empty in default state
- [ ] Status text is "File ready to drop" when `dragged = true`
- [ ] Status text is "File accepted" after a drop event
- [ ] Status text is "Drop to replace existing file" when `dragged = true` while `filled = true`
- [ ] Host has no `tabindex` attribute by default

#### Accessibility tests (Playwright ARIA snapshots)

- [ ] Default state: group label, heading in slot, browse button focusable
- [ ] Dragged state: status text update verified
- [ ] Filled state: illustrated message hidden; status text update
- [ ] Filled+dragged state: replace announcement verified

#### Visual regression

- [ ] Default state: border, background, corner radius (all three sizes)
- [ ] Dragged state: accent border, background tint, icon/illustration accent-color (all three sizes)
- [ ] Filled state (medium size at minimum)
- [ ] Filled+dragged (replace) state (medium size at minimum)
- [ ] Forced-colors mode (medium size)

### Documentation

#### General

- [ ] JSDoc on all public properties (`dropEffect`, `dragged`, `filled`, `size`), slots, and CSS custom properties
- [ ] Storybook stories: Playground, Overview, Anatomy, Options (Sizes story: `s`, `m`, `l`), States (default, dragged, filled, filled+dragged), Behaviors (event log, browse+drop interaction), Accessibility
- [ ] Per-unit MDX file at `2nd-gen/packages/swc/components/dropzone/dropzone.mdx`
- [ ] All stories include a browse control; no example omits it
- [ ] Accessibility story demonstrates `aria-label` and event-driven `filled` state management
- [ ] Consumer migration guide at `migration-guide.mdx`

#### Breaking changes

- [ ] Document B1–B7 with migration steps in `migration-guide.mdx`; note B16 (`size`) as additive (no consumer action needed)
- [ ] Document that `--mod-*` properties are not carried forward
- [ ] Document that `aria-label` or `aria-labelledby` is now required
- [ ] Document that `role="group"` is now fixed on the host (remove any consumer-added `role`)

### Review

- [ ] `yarn lint:2nd-gen` passes (ESLint, Stylelint, Prettier)
- [ ] Status table in workstream doc updated
- [ ] PR created with description referencing Epic SWC-2145
- [ ] Peer engineer sign-off

---

## Blockers and open questions

### Design

| # | Item | Blocking? | Status | Owner |
| - | ---- | --------- | ------ | ----- |
| **Q1** | Does the dropzone have an error state? | Yes — for Stories scope and testing coverage | **Resolved.** Figma shows no error state. Deferred to additive A1 with a follow-up Jira ticket. | Design + implementation |
| **Q2** | Should the hover state be visually distinct from keyboard focus? | Yes — for Stories scope and styling | **Resolved.** Figma Hover state = drag-over state. No separate pointer-hover treatment. `:focus-visible` on the browse control uses the same accent border. Absorbed into B10. | Design + implementation |
| **Q3** | Should the slotted illustration receive an accent-color treatment when dragged? | No — doesn't affect core API or Stories MVP | **Resolved.** Figma confirms accent/gradient icon treatment in the Hover (dragged) state. This is Must-ship; absorbed into styling phase. | Design + implementation |
| **Q4** | SVG stroke border vs. CSS-only dashed border. The rendering-and-styling analysis documents an SVG `<rect>` stroke system. The actual `spectrum-css` `spectrum-two` branch `index.css` uses `border-style: dashed` (no SVG). This discrepancy changes the shadow DOM render shape and whether an SVG element is needed. | **Yes — blocks shadow DOM architecture and CSS** | **Partially resolved.** Figma confirms visual intent for rounded dashes at corners (implies SVG). The spectrum-css CSS-only implementation is inconsistent with Figma. CSS team alignment required before styling phase begins. | Design + CSS reviewer |

### Architecture and behavior

| # | Item | Blocking? | Status | Owner |
| - | ---- | --------- | ------ | ----- |
| **Q5** | Event naming convention in 2nd-gen. Current 1st-gen events use `sp-dropzone-*` prefix. | **Yes — blocks API phase** | **Resolved.** All migrated 2nd-gen components use the `swc-` prefix (e.g. `swc-accordion-item-toggle`, `swc-open`). Events rename to `swc-dropzone-should-accept`, `swc-dropzone-dragover`, `swc-dropzone-dragleave`, `swc-dropzone-drop`. Breaking for consumers listening to `sp-dropzone-*` events; document in migration guide. | Architecture reviewer |
| **Q6** | `role="group"` (accessibility analysis recommendation) vs. `role="region"` (spectrum-css template). `group` creates a labeled group; `region` creates a page landmark. The a11y analysis strongly recommends `group` to avoid polluting the landmark tree. | **Yes — blocks API phase** | **Resolved.** Use `role="group"` per the a11y analysis. | Accessibility reviewer |
| **Q7** | `filled` vs. `replace` as the state name. The rendering analysis notes that the Figma design file calls the filled state the "replace" variant. Should the attribute/property be renamed from `filled` to `replace`? Renaming would be an attribute-level breaking change (consumers who set `filled` in HTML would break). **Recommendation: keep `filled`.** "Filled" accurately describes the component's state (content has been uploaded). "Replace" is the user-facing overlay message shown in the filled+dragged composite state, not the persistent state itself. | No — current evidence favors keeping `filled` | Open. Confirm with design. | Design + ticket owner |
| **Q8** | How does `swc-dropzone` style the slotted `swc-illustrated-message` in S2? In 1st-gen, `sp-dropzone` sets `--mod-illustrated-message-*` CSS custom properties on `:host`, which are inherited by `sp-illustrated-message` in the slot. In 2nd-gen, `swc-illustrated-message` may not expose the same `--mod-*` hooks. The replacement approach (CSS custom properties, `::slotted()` selectors, or consumer-managed styling) must be decided before the styling phase. | **Yes — blocks styling phase** | Open. Requires investigation of `swc-illustrated-message` CSS API before styling can begin. | Architecture reviewer |
| **Q9** | Should `onDragOver`, `onDragLeave`, `onDrop` change from `public` to `protected`? This is breaking for any consumer subclassing the component and overriding these methods. Risk is assessed as low — no evidence of this pattern in the wild — but should be confirmed. **Recommendation: make them `protected`; they are implementation details, not a stable public API.** | No — low-impact breaking change | Open. Confirm with team. | Ticket owner |

### Scope and prerequisites

| # | Item | Blocking? | Status | Owner |
| - | ---- | --------- | ------ | ----- |
| **Q10** | Epic SWC number. | No — required before plan is finalized | **Resolved.** Epic is SWC-2145. | Ticket owner |

---

## References

- [Washing machine workflow](../../02_workstreams/02_2nd-gen-component-migration/02_step-by-step/01_washing-machine-workflow.md)
- [2nd-gen migration status table](../../02_workstreams/02_2nd-gen-component-migration/01_status.md)
- [Accessibility migration analysis](./accessibility-migration-analysis.md)
- [Rendering and styling migration analysis](./rendering-and-styling-migration-analysis.md)
- [CSS style guide — Component Custom Property Exposure](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/02_custom-properties.md#component-custom-property-exposure)
- [CSS style guide — Selector conventions](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/02_custom-properties.md#selector-conventions)
- [1st-gen source](../../../../1st-gen/packages/dropzone/src/Dropzone.ts)
- [1st-gen CSS](../../../../1st-gen/packages/dropzone/src/dropzone.css) (imports `spectrum-dropzone.css` + `dropzone-overrides.css`)
- [1st-gen tests](../../../../1st-gen/packages/dropzone/test/dropzone.test.ts)
- [1st-gen README](../../../../1st-gen/packages/dropzone/README.md)
- [React Spectrum S2 DropZone](https://react-spectrum.adobe.com/DropZone)
- [Spectrum CSS — `spectrum-two` branch — dropzone `index.css`](https://github.com/adobe/spectrum-css/blob/spectrum-two/components/dropzone/index.css) (reviewed via sibling checkout at `../spectrum-css/components/dropzone/index.css`)
- [Spectrum CSS — dropzone stories template](https://github.com/adobe/spectrum-css/blob/spectrum-two/components/dropzone/stories/template.js) (reviewed via sibling checkout)
- [Badge migration reference](../../02_workstreams/02_2nd-gen-component-migration/02_step-by-step/01_washing-machine-workflow.md#reference-badge-migration)
- [SWC-2069](https://jira.corp.adobe.com/browse/SWC-2069): `sp-dropzone-drop` event does not fire on Windows Chrome
- Epic: SWC-2145 — Dropzone S2 migration epic

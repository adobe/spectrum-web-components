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

No prerequisites. Toast has no dependents in-tree and depends only on `swc-close-button`, which already exists in 2nd-gen (`2nd-gen/packages/swc/components/close-button/`). No shared base or controller currently covers Toast's pause-preserving countdown; recommend implementing it directly in `Toast.base.ts` rather than extracting a shared controller, since no other in-flight component needs it yet.

### Related components and ordering notes

| Component | Relationship | Notes |
| --------- | ------------ | ----- |
| `swc-close-button` | Dependency, already migrated | `accessible-label` confirmed as the real 2nd-gen attribute (verified in `button` family source) |
| Toast container / queue | In scope, ships alongside `swc-toast` | Shape and API still being finalized across this plan; see Q6 |

### User confirmation needed

Whether a pausable-countdown utility belongs in `2nd-gen/packages/core/controllers/` now or stays inline in Toast until a second consumer appears. See Q5 in [Architecture and behavior](#architecture-and-behavior).

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
| A1 | `--swc-*` custom properties | See the recommended initial set in [CSS custom properties (2nd-gen)](#css-custom-properties-2nd-gen) |

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
| default | Toast message text | **Confirmed.** |
| `action` | Optional action button | **Open question**, Q3: may become `action-label`/`swc-action` props instead |

#### CSS custom properties (2nd-gen)

No `--mod-*` properties will be exposed. New `--swc-*` component-level properties may be introduced where needed — these are additive and not breaking. See [Component Custom Property Exposure](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/02_custom-properties.md#component-custom-property-exposure) for what to expose and how.

No properties are exposed in the initial set. Add a `--swc-toast-*` property only once implementation surfaces a concrete override need, per the [decision tree](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/02_custom-properties.md#decision-tree-for-exposure) above. Height in particular is composed from padding, font-size, and line-height rather than exposed as its own property, matching Design's direction away from explicit height controls.

**Excluded:**

- Background color, text color, icon color, per the style guide's exclusions. Toast's text/icon color is fixed white against a saturated variant background (the same contrast-intent exclusion as static-color components), and background color is set per semantic variant, not consumer-overridable per the badge/status-light precedent for semantic (non-decorative) variant colors.
- `max-inline-size`. A single constant value regardless of variant, same as `swc-tooltip`/`swc-popover` (also not exposed). The host is directly stylable from outside (`swc-toast { max-inline-size: 400px; }`), no custom property needed.

### Behavioral semantics

- Auto-dismiss timer pauses on `pointerenter` + `focusin`, preserving remaining time; resumes only once both `pointerleave` and `focusout` have fired. This describes per-toast pause; whether this should instead be region-wide (matching RSP S2, which pauses every visible toast together) is Q7.
- `role="alertdialog"` + `aria-modal="false"` on host; opening never moves focus.
- `tabindex="0"` on host always, per the a11y doc; opening a toast does not move focus there. It makes the host a normal tab stop, matching RSP.
- Matches the event set of other visibility-toggling components: `swc-open` before the enter transition plays, `swc-after-open` once it completes, `swc-close` (cancelable) before the exit transition plays, `swc-after-close` once it completes.
- Text wrapping is automatic, not an option. Content wraps naturally within whatever `max-inline-size` the host is given (directly stylable from outside; no `--swc-*` custom property, see [CSS custom properties (2nd-gen)](#css-custom-properties-2nd-gen)); no `width` property exists on `sp-toast` in 1st-gen or on `Toast` in RSP S2. Long unbroken words specifically need `overflow-wrap`/`word-break` (SWC-475, see [Styling](#styling)) on top of normal wrapping.
- No `placement` property. Confirmed absent from 1st-gen `sp-toast`'s own API: the 1st-gen story's `placement` values (bottom/left/right/top) belong to `overlay-trigger`, an unrelated demo wrapper, not `sp-toast` itself. RSP's `placement` (`top`/`bottom`/`top end`/`bottom end`) lives on `ToastContainer`, never on individual `Toast`. Placement is a future container-level concern; see Q6.

### Accessibility semantics notes (2nd-gen)

See [Toast accessibility migration analysis](./accessibility-migration-analysis.md) for the full spec.

- Host naming uses `aria-labelledby` referencing a content-element ID, falling back to `aria-label` from slot text when no explicit ID is available. RSP S2 splits this further into a separate `aria-labelledby` (title) and `aria-describedby` (description) element; `swc-toast`'s single content ID is a deliberate simplification, since it has one default slot for message text rather than separate title/description slots.

---

## Architecture: core vs SWC split

> The 1st-gen component is a **reference only** — 2nd-gen is built independently. Neither generation imports from the other.

Follow the [Badge migration reference](../../02_workstreams/02_2nd-gen-component-migration/02_step-by-step/01_washing-machine-workflow.md#reference-badge-migration) as the concrete pattern for the core/SWC split.

| Layer | Path | Contains |
| ----- | ---- | -------- |
| **Core** | `2nd-gen/packages/core/components/toast/` | `Toast.base.ts`, `Toast.types.ts`: property declarations, variant validation, `aria-labelledby`/`aria-label` derivation, pausable-countdown logic (`pointerenter`/`focusin`/`pointerleave`/`focusout`, scope pending Q7), timeout flooring. No rendering. |
| **SWC** | `2nd-gen/packages/swc/components/toast/` | `Toast.ts`, `toast.css`: renders host role/state attributes, variant icon, inner `role="alert"` wrapper, default + `action` slots, `swc-close-button`. Element registration, stories, tests. |

Planned rendering shape:

- Core owns timer state, ARIA attribute wiring, and variant validation
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
- [ ] `Toast.base.ts`: variant validation, `icon-label` fallback, timeout floor (resolve Q1 first)

#### Alignment checks

- [ ] Confirm action API shape with Design (Q3)

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

### Accessibility

Checklist items sourced from [accessibility-migration-analysis.md](./accessibility-migration-analysis.md); resolve Q1, Q2, Q7 before treating this section as final.

#### Naming and semantics

- [ ] Host: `role="alertdialog"`, `aria-modal="false"`, `aria-labelledby` from slot text (or `aria-label` fallback)
- [ ] Inner wrapper: `role="alert"`, `aria-atomic="true"`
- [ ] `aria-hidden="true"` on host when `open` is false

#### State verification

- [ ] Timer pauses on `pointerenter` + `focusin`, preserves remaining time, resumes only when both clear; scope (per-toast vs. region-wide) resolved per Q7
- [ ] Dev warning (or hard block, pending Q2) when `timeout` and `action` slot both set
- [ ] `tabindex="0"` on host always; opening a toast does not move focus there

### Testing

- [ ] Port `1st-gen/packages/toast/test/toast.test.ts` coverage that still applies
- [ ] Add Playwright `toast.a11y.spec.ts` with `toMatchAriaSnapshot`

#### Behavior

- [ ] Countdown pause/resume unit tests (pointer, focus, both simultaneously)
- [ ] Timeout floor enforcement test

#### Visual regression

- [ ] Add VRT coverage for all variants, with/without action button, closed state
- [ ] Add VRT coverage for text wrapping: short single-line message, long message wrapping to multiple lines within the host's `max-inline-size`
- [ ] Add focus-visible regression coverage for the close and action buttons

### Documentation

#### General

- [ ] JSDoc on all public props, slots, and CSS custom properties
- [ ] Storybook stories for each variant, with/without action, with/without icon-label override
- [ ] Storybook story demonstrating text wrapping with a long message

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

### Architecture and behavior

| # | Item | Blocking? | Status | Owner |
| --- | ---- | --------- | ------ | ----- |
| Q5 | Should the pause-preserving countdown be extracted to a shared core controller now, or stay inline in `Toast.base.ts` until a second consumer needs it? | No | Open | Architecture reviewer |

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
- [React Spectrum: Toast (docs)](https://react-spectrum.adobe.com/react-spectrum/Toast.html)
- [Figma: S2 / Web — Toast](https://www.figma.com/design/xHBWBBIe2eo5vwoCeNrC4Q/S2---Web?node-id=9908-3216&m=dev)
- [Spectrum CSS — `spectrum-two` branch, Toast component](https://github.com/adobe/spectrum-css/tree/spectrum-two/components/toast)
- [Badge migration reference](../../02_workstreams/02_2nd-gen-component-migration/02_step-by-step/01_washing-machine-workflow.md#reference-badge-migration)

<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../../README.md) / [Project planning](../../README.md) / [Components](../README.md) / Action Group / Action group migration plan

<!-- Document title (editable) -->

# Action group migration plan

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
- [Migration checklist](#migration-checklist)
    - [Preparation (this ticket)](#preparation-this-ticket)
    - [Setup](#setup)
    - [API](#api)
    - [Styling](#styling)
    - [Accessibility](#accessibility)
    - [Testing](#testing)
    - [Documentation](#documentation)
    - [Review](#review)
    - [Deferred implementation tickets](#deferred-implementation-tickets)
- [References](#references)

</details>

<!-- Document content (editable) -->

> **Epic SWC-2212** · Planning output. Must be reviewed before implementation begins.

---

## TL;DR

- `swc-action-group` is a composite keyboard control: one Tab stop into the strip, arrow-key navigation among children via `FocusgroupNavigationController`, and optional managed selection (`selects="single|multiple"`). It is substantially more complex than `swc-button-group`, which has no roving tabindex.
- Three ARIA-breaking changes ship in this migration: host is always `role="group"` (never `toolbar` or `radiogroup`); children are always `role="button"` (never `radio` or `checkbox`); selection state is exposed via `aria-pressed`/`aria-checked` on the button's focus target rather than through host or child role changes.
- The `selects` API is retained. `swc-action-group` is the appropriate home for selection behavior until `swc-segmented-control` and `swc-toggle-button-group` exist in 2nd-gen. Consumer chooses the right component for their UX; action-group does not mandate a migration to those alternatives.
- Compact mode uses `data-group-position` attributes propagated by action-group to each `swc-action-button` child; action-button applies border-radius overrides via `:host([data-group-position])` CSS. This requires a coordinated addition to action-button during its implementation phase.
- `swc-action-button` PR #6340 drops `selected`, `toggles`, and `emphasized`. Selection state is expressed by setting `aria-pressed`/`aria-checked` on child hosts, forwarded by ButtonBase to the inner `<button>`. No `selected` property needed on action-button.
- `vertical` boolean → `orientation="horizontal|vertical"`; `FocusgroupNavigationController` confirmed available in this branch.

---

## 1st-gen API surface

**Source:** [`1st-gen/packages/action-group/src/ActionGroup.ts`](../../../../1st-gen/packages/action-group/src/ActionGroup.ts)
**Version:** `@spectrum-web-components/action-group@1.12.1`
**Custom element tag:** `sp-action-group`

### Properties / attributes

| Property | Type | Default | Attribute | Notes |
| -------- | ---- | ------- | --------- | ----- |
| `compact` | `boolean` | `false` | `compact` | Visually joins children; shared borders collapse; inactive in quiet mode |
| `emphasized` | `boolean` | `false` | `emphasized` | Propagates to child action buttons |
| `justified` | `boolean` | `false` | `justified` | Children fill available width equally |
| `label` | `string` | `''` | `label` (no reflect) | Reflects to `aria-label` on host in `updated()` |
| `quiet` | `boolean` | `false` | `quiet` | Propagates to child action buttons |
| `selected` | `string[]` | `[]` | `selected` (JSON attr) | Getter/setter; values of selected children; cancelable via `preventDefault()` on `change` |
| `selects` | `'single' \| 'multiple' \| undefined` | `undefined` | `selects` | Selection mode; drives host role and child role assignment in 1st-gen |
| `size` | `'xs' \| 's' \| 'm' \| 'l' \| 'xl'` | none | `size` | SizedMixin; `noDefaultSize: true`; propagates to children |
| `static-color` | `'white' \| 'black' \| undefined` | `undefined` | `static-color` | Propagates to child action buttons |
| `vertical` | `boolean` | `false` | `vertical` | Stacks children vertically |

### Methods

| Method | Signature | Notes |
| ------ | --------- | ----- |
| `focus` | `focus(options?: FocusOptions): void` | Delegates to `RovingTabindexController.focus()` |

Internal methods (not public API; listed for migration context):

| Method | Notes |
| ------ | ----- |
| `manageButtons` | Slot-change handler; collects `sp-action-button` / `sp-action-menu` children into `this.buttons` |
| `manageChildren` | Propagates `quiet`, `emphasized`, `size`, `staticColor`, `selected` state to children |
| `manageSelects` | Assigns host role and child role + `aria-checked`/`aria-pressed` based on `selects` mode |
| `deselectSelectedButtons` | Clears selection before applying single-select radio behavior |
| `handleClick` | Routes click events to selection logic per mode |
| `dispatchChange` | Fires cancelable `change` event; rolls back selection if `preventDefault()` called |

### Events

| Event | Type | Bubbles | Composed | Cancelable | Notes |
| ----- | ---- | ------- | -------- | ---------- | ----- |
| `change` | `Event` | Yes | Yes | Yes | Fired after `selected` state commits. Known bug: fires before selection in some paths (SWC-889). |

### Slots

| Slot | Content | Notes |
| ---- | ------- | ----- |
| Default | `sp-action-button`, `sp-action-menu` | Selector: `sp-action-button, sp-action-menu`; nested descendants are also found via `querySelectorAll` |

### CSS custom properties

This full modifier surface will not be carried forward to 2nd-gen.

**Passthroughs:**
- `--mod-actionbutton-focus-indicator-border-radius`

**Spacing:**
- `--mod-actiongroup-horizontal-spacing-regular`
- `--mod-actiongroup-horizontal-spacing-compact`
- `--mod-actiongroup-vertical-spacing-regular`
- `--mod-actiongroup-vertical-spacing-compact`
- `--mod-actiongroup-gap-size-compact`

**Compact mode border radius and spacing reset:**
- `--mod-actiongroup-border-radius`
- `--mod-actiongroup-border-radius-reset`
- `--mod-actiongroup-button-spacing-reset`

### Shadow DOM output (rendered HTML)

```html
<!-- Same in all modes; role assignment happens on the host element, not in shadow DOM -->
<slot role="presentation"></slot>
```

---

## Dependencies

| Package | Version | Role |
| ------- | ------- | ---- |
| `@spectrum-web-components/base` | workspace | `SpectrumElement`, `SizedMixin` |
| `@lit-labs/observers/mutation-controller.js` | workspace | `MutationController` — watches `childList` mutations to re-collect buttons |
| `@spectrum-web-components/action-button` | workspace | `ActionButton` class — used for `instanceof` checks and slot query matching |
| `@spectrum-web-components/reactive-controllers/src/RovingTabindex.js` | workspace | `RovingTabindexController` — replaced in 2nd-gen by `FocusgroupNavigationController` |

---

## Migration sequencing and prerequisites

### Dependency-aware recommendation

**Proceed independently, after action-button.** Action group does not extend action-button and does not share a base class with button-group. Key dependency decisions are now confirmed:

- Action-group does not rely on a `selected` property on action-button; selection state is expressed via `aria-pressed`/`aria-checked` on child hosts, forwarded by ButtonBase to the inner `<button>`.
- Compact mode uses position attributes (`data-group-position`) propagated by action-group to each child; action-button applies border-radius overrides via `:host([data-group-position])` CSS — this requires a coordinated addition to action-button during its implementation phase.
- `FocusgroupNavigationController` is available in this branch and will be used.

### Related components and ordering notes

| Component | Relationship | Ordering note |
| --------- | ------------ | ------------- |
| `swc-action-button` | Runtime child dependency | Compact position mechanism (`data-group-position`) requires a coordinated addition to action-button during its implementation phase |
| `swc-action-menu` | Slotted child | Participates in roving tabindex sequence; must be compatible with `FocusgroupNavigationController` |
| `swc-button-group` | Sibling (same ARIA role, different keyboard model) | PR #6395 establishes the `orientation` rename convention that action-group follows |
| `swc-segmented-control` | Future alternative for exclusive-selection UX | Not migrated yet; action-group retains `selects` until this exists |
| `swc-toggle-button-group` | Future alternative for toggle-selection UX | Not migrated yet; same reasoning |
| `FocusgroupNavigationController` | Core controller dependency | Available in this branch; confirmed for use |

---

## Changes overview

> **Priority framing:**
>
> - **Must ship** items define the in-scope work required for this migration.
> - **Additive** items are deferred or out of scope for this migration.
> - **Accessibility is non-negotiable** — all a11y requirements ship as part of this migration.

### Must ship — breaking or a11y-required

#### API and naming

| # | What changes | 1st-gen behavior | 2nd-gen behavior | Consumer migration path |
| --- | ------------ | ---------------- | ---------------- | ----------------------- |
| **B1** | `vertical` boolean → `orientation` attribute | `vertical` boolean; no default | `orientation="horizontal"` default, `orientation="vertical"` | Replace `<sp-action-group vertical>` with `<swc-action-group orientation="vertical">`. Confirmed: matches button-group PR #6395 convention. 1st-gen `vertical` gets `@deprecated` JSDoc + `window.__swc.warn()` runtime warning. |
| **B2** | `--mod-*` CSS custom properties dropped | Nine `--mod-actiongroup-*` modifier properties | No `--mod-*` properties; additive `--swc-*` set introduced | Remove all `--mod-actiongroup-*` overrides; wait for announced `--swc-*` properties. Standard 2nd-gen change. |
| **B3** | `disabled` attribute added to group | No group-level `disabled` in 1st-gen (SWC-621) | `disabled` propagates `aria-disabled="true"` to host and children; children remain keyboard-reachable | No 1st-gen consumer migration; new additive API. Consumers using `disabled` on individual children may remove per-child attribute if group-level is preferred. |

#### Styling and visuals

| # | What changes | 1st-gen behavior | 2nd-gen behavior | Consumer migration path |
| --- | ------------ | ---------------- | ---------------- | ----------------------- |
| **B4** | Compact mode border-radius mechanism | 1st-gen CSS targets `.spectrum-ActionGroup-item` class on direct DOM children (native `<button>`) | 2nd-gen must propagate position context to `swc-action-button` children because `::slotted()` cannot reach inner `<button>` shadow DOM | Consumers using `compact` see no API change; internal implementation requires coordinated addition to action-button (see deferred tickets) |
| **B5** | S2 design tokens replace Spectrum 1 tokens | Spectrum 1 color, spacing, and size tokens | S2 design tokens from `spectrum-css` `spectrum-two` branch | Visual update; no consumer API change |

#### Accessibility and behavior

| # | What changes | 1st-gen behavior | 2nd-gen behavior | Consumer migration path |
| --- | ------------ | ---------------- | ---------------- | ----------------------- |
| **B6** | Host role fixed to `role="group"` | Default `role="toolbar"`; switches to `role="radiogroup"` when `selects="single"` | Always `role="group"`; not author-overridable | Remove any `role="toolbar"` or `role="radiogroup"` on `<sp-action-group>`. Move `role="toolbar"` to a parent wrapper element. Source: [accessibility migration analysis](./accessibility-migration-analysis.md). |
| **B7** | Child roles fixed to `role="button"` | `selects="single"` assigns `role="radio"` + `aria-checked`; `selects="multiple"` assigns `role="checkbox"` + `aria-checked` | Children always `role="button"`; selection state via `aria-pressed` (no `selects`) or `aria-checked` (`selects` set) on the button focus target | Remove any consumer code that relied on child `role="radio"`/`role="checkbox"`. Source: [accessibility migration analysis](./accessibility-migration-analysis.md), [action button accessibility migration analysis](../action-button/accessibility-migration-analysis.md). |
| **B8** | `RovingTabindexController` → `FocusgroupNavigationController` | `RovingTabindexController` with `hostDelegatesFocus: true` | `FocusgroupNavigationController`; direction tied to `orientation`; `delegatesFocus` preserved | No consumer-visible change; keyboard behavior is equivalent |
| **B9** | `change` fires after `selected` commits | Known bug: fires before selection in some paths (SWC-889) | `change` fires after `selected` state is committed | Consumers using `change` to read `selected` synchronously will now work correctly |
| **B10** | `label` required when `selects` is set | No warning when `selects` is set without label | Dev-mode warning when `selects` is set without `label` or `aria-labelledby` | Add `label` attribute when using `selects`; matches WCAG 1.3.1 requirement (SWC-1121) |
| **B11** | Focus stacking z-index fixed | Focused button's z-index may hide focus indicator (SWC-1342) | Focus indicator always visible | No consumer action required |

### Additive — ships when ready, zero breakage for consumers already on 2nd-gen

| # | What is added | Notes |
| --- | ------------- | ----- |
| **A1** | `emphasized` group-level propagation | Dropped from 2nd-gen action-button (PR #6340). If action-button adds it in a future release, action-group propagation follows as an additive change. |
| **A2** | Consumer guidance for `swc-segmented-control` / `swc-toggle-button-group` | Documentation note only. When those components ship in 2nd-gen, a migration guide can point consumers to the appropriate alternative for exclusive or toggle selection UX. No code change to action-group. |
| **A3** | `orientation="both"` (vertical and horizontal arrow keys) | Possible future extension of `FocusgroupNavigationController` direction. Not in current scope. |

---

## 2nd-gen API decisions

These are derived from the 1st-gen implementation, the [accessibility migration analysis](./accessibility-migration-analysis.md), the [rendering and styling migration analysis](./rendering-and-styling-migration-analysis.md), Figma (`S2 / Web (Desktop scale)`, action-group frame), and the React Spectrum S2 `ActionButtonGroup`.

**Decision status key:**

- **Confirmed**: directly supported by one authoritative source
- **Inferred**: recommended based on multiple signals, not one authoritative source
- **Dropped**: explicitly removed; not implemented in 2nd-gen

### Public API

#### Properties / attributes (2nd-gen)

| Property | Type | Default | Attribute | Notes |
| -------- | ---- | ------- | --------- | ----- |
| `compact` | `boolean` | `false` | `compact` | **Confirmed** (Figma). Figma labels this "Density: Compact". Buttons visually join; shared borders collapse. Quiet mode disables compact styling (same as 1st-gen). |
| `disabled` | `boolean` | `false` | `disabled` | **Confirmed** (a11y analysis). New in 2nd-gen. Uses `aria-disabled="true"` on host and propagates to children; children remain keyboard-reachable per APG guidance (SWC-621). |
| `justified` | `boolean` | `false` | `justified` | **Inferred** (SWC convention). Children fill available width equally. React S2 uses `isJustified`; 2nd-gen SWC convention drops the `is` prefix on booleans; `justified` follows that pattern. |
| `label` | `string` | `''` | `label` | **Confirmed** (a11y analysis). Reflects to `aria-label` on host. Required when `selects` is set; dev warning otherwise. |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | `orientation` | **Inferred** (Figma "Orientation" property, React S2 `orientation` prop, button-group PR #6395). Breaking rename from `vertical` boolean. 1st-gen `vertical` gets `@deprecated` JSDoc + `window.__swc.warn()` runtime warning. |
| `quiet` | `boolean` | `false` | `quiet` | **Confirmed** (1st-gen carryover). Propagates to children. Quiet disables compact border-join styling. |
| `selected` | `string[]` | `[]` | `selected` (JSON serializable) | **Confirmed** (1st-gen carryover, a11y analysis). Retained; getter/setter pattern preserved; `change` event fires after commit. |
| `selects` | `'single' \| 'multiple' \| undefined` | `undefined` | `selects` | **Confirmed** (1st-gen carryover, a11y analysis). Retained. ARIA expression fixed: host stays `role="group"`, children stay `role="button"`, state via `aria-pressed`/`aria-checked` on focus target. |
| `size` | `'xs' \| 's' \| 'm' \| 'l' \| 'xl'` | none | `size` | **Confirmed** (Figma, 1st-gen carryover). `noDefaultSize: true` preserved; propagates to children. Figma shows xs–xl. |
| `static-color` | `'white' \| 'black' \| undefined` | `undefined` | `static-color` | **Confirmed** (1st-gen carryover). Propagates to children. |
| `emphasized` | `boolean` | `false` | `emphasized` | **Dropped** (action-button PR #6340). Action-button explicitly removes `emphasized`. Figma shows no group-level emphasized style. Not implemented in 2nd-gen action-group. |

#### Visual matrix (2nd-gen)

Based on Figma (`S2 / Web (Desktop scale)`, action-group frame provided):

| Dimension | Values | Notes |
| --------- | ------ | ----- |
| Sizes | xs, s, m, l, xl | All five shown in Figma size frames |
| Styles | Default, Quiet | Figma shows exactly these two; no group-level `emphasized` in Figma |
| Density | Default, Compact | Figma labels these "# of buttons: Default / Compact" |
| Orientation | Horizontal, Vertical | Figma shows both; vertical stacks children |
| Button count | 2, 3 (representative) | Not a fixed constraint; any count supported |

#### Slots (2nd-gen)

| Slot | Content | Notes |
| ---- | ------- | ----- |
| Default | `swc-action-button`, `swc-action-menu` | **Confirmed** (1st-gen carryover). Slot remains `role="presentation"`. |

#### CSS custom properties (2nd-gen)

No `--mod-*` properties will be exposed. New `--swc-*` component-level properties may be introduced where needed — these are additive and not breaking. See [Component Custom Property Exposure](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/02_custom-properties.md#component-custom-property-exposure) for what to expose and how.

Each exposed `--swc-*` property must be documented with a `@cssprop` JSDoc tag on the primary SWC component class.

Initial expectation for `swc-action-group` is a small reviewed set covering gap/spacing overrides. Compact border-radius values may be exposed if the chosen compact-position mechanism requires consumer-overridable tokens.

### Behavioral semantics

#### Selection management

When `selects` is set, `swc-action-group` manages the `selected` string array and fires a cancelable `change` event after each user interaction. `preventDefault()` rolls back the selection and restores the prior `selected` value.

The `selected` setter accepts an array of child `value` attribute strings. On slot change, the group re-collects children and reconciles the `selected` array against the current DOM. The initial tab stop is the first selected enabled child, or the first enabled child if none are selected.

In 2nd-gen, ARIA state moves from host/child role changes to attribute mutations on the button's focus target. Action-group sets `aria-pressed` or `aria-checked` directly on each `swc-action-button` host; ButtonBase's `getForwardedButtonAttributes` mechanism forwards those to the inner `<button>` (the same forwarding path already used for `aria-haspopup`/`aria-expanded` in menu-trigger patterns). Visual selected treatment is driven by `:host([aria-pressed="true"])` or `:host([aria-checked="true"])` CSS on action-button — no `selected` property on action-button needed.

- No `selects`: action-group sets `aria-pressed="true"` on selected child hosts; unselected children have no `aria-pressed`
- `selects="single"`: action-group sets `aria-checked="true"` on the selected child host, `aria-checked="false"` on others; host stays `role="group"`
- `selects="multiple"`: action-group sets `aria-checked="true"` or `aria-checked="false"` on each child host; host stays `role="group"`

Child `value` attributes are read by action-group as plain DOM attributes (`child.getAttribute('value')`) for selection tracking — independent of whether action-button formally exposes `value` as a reflected property.

#### Compact mode

Compact mode (`compact` attribute) visually joins buttons by collapsing shared borders and resetting interior border-radius values. The Figma spec calls this "Density: Compact".

In 1st-gen, the CSS targets `.spectrum-ActionGroup-item` class on native `<button>` children directly. In 2nd-gen, children are `swc-action-button` custom elements with their own shadow DOM. The action-group's `::slotted()` selector can style the host boundary of slotted children (margin collapse, border between adjacent children) but cannot reach the inner `<button>` element to adjust border-radius on interior edges.

**Chosen approach: position attributes.** Action-group propagates `data-group-position="first"`, `"middle"`, or `"last"` to each `swc-action-button` child. Action-button applies border-radius overrides in its own shadow CSS using `:host([data-group-position="first"])`, etc. This approach is more explicit and testable than CSS custom property injection and keeps the contract surface small. Requires a coordinated addition to `swc-action-button` during its implementation phase.

#### Focus management

`swc-action-group` owns composite keyboard navigation: one Tab stop into the strip, arrow keys move among enabled `swc-action-button` and `swc-action-menu` children. In 2nd-gen, `RovingTabindexController` is replaced by `FocusgroupNavigationController`, with `direction` set to match `orientation`.

Initial focus target: first enabled child whose value is in `this.selected`, otherwise first enabled child.

When a child `swc-action-menu` is open, focus enters the menu; when the menu closes, focus returns to the menu trigger (the `swc-action-menu` host).

`delegatesFocus: true` on the shadow root is preserved: calling `focus()` on the host delegates to the current roving item.

Mouse click updates the roving `tabindex="0"` to the clicked item (SWC-250 fix required; the 1st-gen mouse test is `it.skip`).

#### Child propagation

On each slot change and on changes to `quiet`, `size`, `staticColor`, `disabled`, `compact` (position mechanism), and `selects`, the group propagates the relevant state to each managed child. The managed child selector in 2nd-gen is `swc-action-button, swc-action-menu`.

#### `change` event ordering

The `change` event must fire after `_selected` is committed (SWC-889 fix). Consumers reading `event.target.selected` inside the handler should see the updated value.

When `change` is canceled via `preventDefault()`, sibling state mutation (deselecting the previously selected child under `selects="single"`) must not have occurred yet. Use `queueMicrotask()` to defer sibling deselection until after the event dispatch returns; check whether the interaction was actually committed before applying sibling changes. See accordion migration (`AccordionBase.closeSiblingsOnOpen`) for the same pattern.

#### Re-enable reconciliation

When `disabled` transitions from `true` to `false` and `selects="single"` is set, the group must reconcile potentially inconsistent `selected` state that accumulated while disabled. If more than one child has a value in `selected`, truncate to the first. This mirrors `AccordionBase.enforceExclusiveOpen()`, which runs on re-enable when `allowMultiple` is false.

### Accessibility semantics notes (2nd-gen)

Source: [accessibility migration analysis](./accessibility-migration-analysis.md)

- **Host role:** `role="group"` is prescribed and fixed in all modes. Not author-overridable. A page-level `role="toolbar"` landmark goes on an outer wrapper, never on `swc-action-group`.
- **Child roles:** `swc-action-button` stays `role="button"` only. No `role="radio"` or `role="checkbox"` on children.
- **`aria-orientation`:** Set to `"vertical"` when `orientation="vertical"`; `"horizontal"` or omitted otherwise. Wired to `FocusgroupNavigationController` direction.
- **`aria-disabled`:** When `disabled` is set on the group, the host receives `aria-disabled="true"` and each child receives `aria-disabled="true"`. Children remain in the Tab/Arrow sequence and are discoverable but must not activate.
- **Group name:** `label` → `aria-label` on host. `aria-labelledby` remains valid. Dev warning when `selects` is set without a discernible group name.
- **Selected state (non-color):** Selected styling must include a non-color visual cue in addition to the token-driven color change (WCAG 1.4.1, SWC-1123). ARIA state (`aria-pressed`/`aria-checked`) is the programmatic signal.
- **`FormFieldMixin`:** Must not be applied. `swc-action-group` is a composite keyboard widget, not a form field (SWC-1612 must not apply).
- **Toolbar composition:** Storybook and docs must show `role="toolbar"` on an outer wrapper with named `swc-action-group` clusters as inner groups, per the APG toolbar example.

---

## Architecture: core vs SWC split

> The 1st-gen component is a **reference only** — 2nd-gen is built independently. Neither generation imports from the other.

Follow the [Badge migration reference](../../02_workstreams/02_2nd-gen-component-migration/02_step-by-step/01_washing-machine-workflow.md#reference-badge-migration) as the concrete pattern for the core/SWC split.

| Layer | Path | Contains |
| -------- | ----------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| **Core** | `2nd-gen/packages/core/components/action-group/` | `ActionGroup.base.ts`, `ActionGroup.types.ts`. Selection state (`selects`, `selected`, `_selected`, `dispatchChange`), child collection logic, `label` → `aria-label`, dev warnings, `disabled` propagation contract. No rendering. |
| **SWC** | `2nd-gen/packages/swc/components/action-group/` | `ActionGroup.ts`, `action-group.css`, element registration (`swc-action-group`), stories, tests. Renders `<slot role="presentation">`. Wires `FocusgroupNavigationController`. Propagates `compact` position mechanism, `quiet`, `size`, `staticColor` to slotted children. |

Planned rendering shape:

- Core owns: selection API, `change` event lifecycle, `label` / `aria-label` management, `selects`-without-label dev warning, `disabled` state contract
- SWC renders: single slot (`<slot role="presentation">`), wires focus controller, propagates visual attributes to children, applies S2 CSS from `spectrum-css` `spectrum-two` branch

No global element stylesheet (`global-action-group.css`) needed — action-group has no global HTML element equivalent.

No `_lit-styles/` fragment needed — action-group renders only a slot; all layout is via `:host` and `::slotted(*)`. The CSS does not duplicate a structural pattern shared with other components.

---

## Migration checklist

> `[x]` done · `[ ]` not yet started · `[skip]` does not apply to this component

### Preparation (this ticket)

- [x] 1st-gen API surface documented
- [x] Dependencies identified
- [x] Breaking changes documented
- [x] 2nd-gen API decisions drafted
- [ ] Plan reviewed by at least one other engineer

### Setup

- [ ] Create `2nd-gen/packages/core/components/action-group/`
- [ ] Create `2nd-gen/packages/swc/components/action-group/`
- [ ] Wire exports in both `package.json` files
- [ ] Check out `spectrum-css` at `spectrum-two` branch as sibling directory (required for Phase 5 styling)
- [x] `FocusgroupNavigationController` confirmed available in this branch
- [x] `swc-action-button` API confirmed: no `selected` property; compact uses `data-group-position` attributes (coordinated addition required)

### API

#### Naming and public surface

- [ ] `ActionGroup.types.ts`: define `ActionGroupOrientation` (`'horizontal' | 'vertical'`), `ActionGroupSelectsMode` (`'single' | 'multiple'`)
- [ ] `ActionGroupSize` type: `(typeof ACTION_GROUP_VALID_SIZES)[number]` — same pattern as `BadgeSize`, `ButtonSize`, `StatusLightSize`
- [ ] `ActionGroup.base.ts`: `selects`, `selected` (getter/setter), `label` → `aria-label`, `dispatchChange` with `cancelable: true` rollback, `disabled` propagation contract, dev warning for `selects` without group name
- [ ] `ActionGroup.ts`: `compact`, `quiet`, `orientation`, `justified`, `size`, `staticColor`, child propagation, `FocusgroupNavigationController` wiring, `delegatesFocus: true`
- [ ] Drop `--mod-*` CSS custom properties; introduce `--swc-*` set after Phase 5 review

#### 1st-gen deprecation notices

- [ ] `@deprecated` JSDoc on `vertical` property in `sp-action-group`; runtime warn in existing `vertical` setter via `window.__swc.warn()`

#### Alignment checks

- [x] `orientation` rename confirmed — matches button-group PR #6395 convention
- [x] `emphasized` dropped — action-button PR #6340 removes it; no group-level propagation
- [x] Compact position mechanism confirmed — `data-group-position` attributes

### Styling

> Follow the [CSS style guide](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/) as the source of truth for all styling work. Key references: [migration steps](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/04_spectrum-swc-migration.md), [custom properties](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/02_custom-properties.md), [anti-patterns](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/05_anti-patterns.md).

- [ ] Add `.swc-ActionGroup` to the internal semantic element in `render()`; keep layout styling off `:host` where possible
- [ ] Copy S2 source from `spectrum-css` `spectrum-two` branch `components/action-group/index.css` (not `/dist`) into `action-group.css` as baseline
- [ ] Translate `.spectrum-ActionGroup-item` child selectors to `::slotted(*)` equivalents for gap, margin, and border-between adjustments
- [ ] Implement compact mode via `data-group-position` attributes: propagate `"first"`, `"middle"`, `"last"` to each `swc-action-button` child; action-button applies inner border-radius overrides via `:host([data-group-position])` CSS
- [ ] Verify compact mode disables correctly when `quiet` is also set (same as 1st-gen: compact has no visual effect in quiet mode)
- [ ] Verify `justified` layout (children fill available width)
- [ ] Verify `orientation="vertical"` layout and compact + vertical combined mode
- [ ] Add `@cssprop` JSDoc tags for each exposed `--swc-*` property
- [ ] Pass stylelint (property order, `no-descending-specificity`, token validation)

#### Visual model and regressions

- [ ] Verify all five sizes (xs, s, m, l, xl) render correctly with spacing and compact joins
- [ ] Verify quiet + compact interaction (compact border-join is inactive in quiet mode)
- [ ] Verify static-color on dark and light backgrounds
- [ ] Verify forced-colors (high contrast) media query is present if applicable in S2 source
- [ ] Pass stylelint

### Accessibility

#### Naming and semantics

- [ ] Host always `role="group"`; never author-overridable; no `toolbar`, `radiogroup`, or other role
- [ ] `aria-orientation` reflects `orientation` value; wired to `FocusgroupNavigationController` direction
- [ ] `label` → `aria-label` on host; empty `label` removes `aria-label`
- [ ] Dev warning in debug builds when `selects` is set without `label` or `aria-labelledby` (SWC-1121 fix)
- [ ] `swc-action-button` children stay `role="button"` only; no `role="radio"` or `role="checkbox"` assigned by action-group
- [ ] `aria-pressed` or `aria-checked` set on the button's focus target (inner `<button>`) per `selects` mode; not on action-group host
- [ ] Group `disabled`: host `aria-disabled="true"`, children `aria-disabled="true"`; children remain keyboard-reachable (SWC-621)

#### State verification

- [ ] Roving tabindex: exactly one child has `tabindex="0"`, others `tabindex="-1"`
- [ ] Initial focus target is first selected enabled child, or first enabled child
- [ ] Mouse click updates `tabindex="0"` to clicked item (SWC-250 fix; port `it.skip` test)
- [ ] Focus ring visible on focused child; no z-index stacking hides indicator (SWC-1342 fix)
- [ ] `change` fires after `selected` state is committed (SWC-889 fix)
- [ ] `selected` removal does not throw console error (SWC-282 fix)
- [ ] `swc-action-menu` in group: open menu; arrow inside; Escape returns focus to menu trigger; roving continues from trigger
- [ ] `FormFieldMixin` not applied (SWC-1612 must remain closed/not applied)

### Testing

- [ ] Port applicable coverage from [`1st-gen/packages/action-group/test/action-group.test.ts`](../../../../1st-gen/packages/action-group/test/action-group.test.ts)
- [ ] Add Playwright `action-group.a11y.spec.ts` with `toMatchAriaSnapshot`

#### Behavior

- [ ] Host `role="group"` in all modes (no `selects`, `selects="single"`, `selects="multiple"`)
- [ ] `label` → `aria-label` on host; empty label removes it
- [ ] `orientation="vertical"` → `aria-orientation="vertical"`; horizontal → `"horizontal"` or omitted
- [ ] Roving tabindex: one `tabindex="0"`, rest `tabindex="-1"`; verified after slot change, after click, and after `selected` update
- [ ] `selects="single"`: selecting one child deselects others; `aria-checked` set on focus target of each child; `change` fires once after commit
- [ ] `selects="multiple"`: each child toggles independently; `aria-checked` correct on each; `change` fires after each commit
- [ ] No `selects`, with `selected`: `aria-pressed="true"` on selected children's focus targets
- [ ] `change` is cancelable: `preventDefault()` rolls back `selected` to prior value
- [ ] `change` cancelation timing: canceling `change` under `selects="single"` does not deselect the previously selected sibling (sibling mutation deferred via `queueMicrotask` until after dispatch returns)
- [ ] Re-enable reconciliation: removing `disabled` when `selects="single"` and multiple values are in `selected` truncates to the first; no stale multi-selection persists
- [ ] Group `disabled`: host `aria-disabled="true"`; all children `aria-disabled="true"`; Tab reaches group; arrow moves within; activation suppressed
- [ ] Mouse click moves `tabindex="0"` to clicked child (SWC-250)
- [ ] `swc-action-menu` in group: keyboard opens menu; Escape closes; focus returns to trigger; roving sequence intact
- [ ] `selects` without label triggers dev warning in debug builds
- [ ] Compact + quiet: compact border-join is inactive

#### Visual regression

- [ ] VRT coverage for all five sizes in default density, horizontal orientation
- [ ] VRT coverage for compact density, horizontal and vertical
- [ ] VRT coverage for quiet style
- [ ] VRT coverage for static-color white and black on correct backgrounds
- [ ] VRT coverage for `selects="single"` and `selects="multiple"` selected state (non-color cue visible)
- [ ] VRT coverage for focus-visible ring not clipped or hidden (SWC-1342)
- [ ] VRT coverage for toolbar wrapper composition (outer `role="toolbar"`, named inner groups)

### Documentation

#### General

- [ ] JSDoc on all public props, slots, events, and CSS custom properties
- [ ] Storybook stories: overview, anatomy (slot types), sizes, styles (default/quiet), density (default/compact), orientation (horizontal/vertical), justified, `selects="single"`, `selects="multiple"`, disabled, static-color, toolbar wrapper composition
- [ ] Distinguish `swc-action-group` vs `swc-button-group` in docs: composite keyboard navigation vs independent Tab stops

#### Breaking changes

- [ ] Consumer migration guide: `vertical` → `orientation="vertical"`
- [ ] Consumer migration guide: remove `role` overrides from `<sp-action-group>`; move `role="toolbar"` to a parent wrapper
- [ ] Consumer migration guide: children no longer receive `role="radio"`/`role="checkbox"` from action-group; update any consumer code or tests that asserted those roles
- [ ] Consumer migration guide: `--mod-actiongroup-*` properties removed; document any `--swc-*` replacements

### Review

- [ ] `yarn lint:2nd-gen` passes (ESLint, Stylelint, Prettier)
- [ ] Status table in workstream doc updated
- [ ] PR created with description referencing Epic SWC-2212
- [ ] Peer engineer sign-off

---

### Deferred implementation tickets

Create these tickets before this migration PR closes. Link each to Epic SWC-2212.

| Ticket | Summary | Why deferred | Plan sections |
| ------ | ------- | ------------ | ------------- |
| TBD | **Add `data-group-position` support to `swc-action-button`.** Action-group sets `data-group-position="first|middle|last"` on each child in compact mode; action-button must apply border-radius overrides via `:host([data-group-position])` CSS. | Requires a coordinated addition to a separate component's implementation phase. Cannot land without action-button implementing the receiving side. | B4 (compact mode border-radius), Behavioral semantics: Compact mode, Styling checklist |
| TBD | **Group-level `emphasized` propagation.** If `swc-action-button` adds `emphasized` in a future release, action-group should propagate it as a group-level attribute. | Action-button PR #6340 explicitly removed `emphasized`; no action-button support exists yet. | A1 (additive) |
| TBD | **Consumer guidance for `swc-segmented-control` / `swc-toggle-button-group`.** When those components ship in 2nd-gen, add a docs note pointing consumers toward the appropriate alternative for exclusive or toggle selection UX. | Components do not exist yet in 2nd-gen. | A2 (additive) |

---

## References

- [Washing machine workflow](../../02_workstreams/02_2nd-gen-component-migration/02_step-by-step/01_washing-machine-workflow.md)
- [2nd-gen migration status table](../../02_workstreams/02_2nd-gen-component-migration/01_status.md)
- [Accessibility migration analysis](./accessibility-migration-analysis.md)
- [Rendering and styling migration analysis](./rendering-and-styling-migration-analysis.md)
- [CSS style guide — Component Custom Property Exposure](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/02_custom-properties.md#component-custom-property-exposure)
- [CSS style guide — Selector conventions](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/02_custom-properties.md#selector-conventions)
- [1st-gen source](../../../../1st-gen/packages/action-group/src/ActionGroup.ts)
- [1st-gen tests](../../../../1st-gen/packages/action-group/test/action-group.test.ts)
- [1st-gen README](../../../../1st-gen/packages/action-group/README.md)
- [Focus management strategy RFC](../../05_strategies/focus-management-strategy-rfc.md)
- [FocusgroupNavigationController source](../../../../2nd-gen/packages/core/controllers/focusgroup-navigation-controller/src/)
- [Action button accessibility migration analysis](../action-button/accessibility-migration-analysis.md)
- [Action menu accessibility migration analysis](../action-menu/accessibility-migration-analysis.md)
- [Button group accessibility migration analysis](../button-group/accessibility-migration-analysis.md)
- [React Spectrum S2 ActionButtonGroup](https://react-spectrum.adobe.com/s2/ActionButtonGroup.html)
- [Spectrum CSS — `spectrum-two` branch](https://github.com/adobe/spectrum-css/tree/spectrum-two) — S2 styling source of truth; check out `spectrum-css/components/action-group/index.css` from sibling directory at `spectrum-two` branch (not `/dist`)
- [Badge migration reference](../../02_workstreams/02_2nd-gen-component-migration/02_step-by-step/01_washing-machine-workflow.md#reference-badge-migration)
- [WAI-ARIA APG: Toolbar pattern](https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/)
- [WAI-ARIA APG: Keyboard navigation inside components](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#keyboardnavigationinsidecomponents)
- SWC-2212: Action Group 2nd-gen migration epic
- SWC-2213: Accessibility recommendations for 2nd-gen action-group migration (complete)
- SWC-2214: Analyze component and create migration plan (this ticket)
- SWC-2215: Update file structure, API, TypeScript, and accessibility
- SWC-2219: Review and finalize migration
- SWC-621: `disabled` attribute should disable all child action buttons
- SWC-889: `change` event fires before selection change
- SWC-1121: Group of radio buttons not associated with group label
- SWC-1123: Color alone used to convey control state (selects multiple)
- SWC-1342: `sp-action-group` sets z-index on focused button, hiding focus indicator
- SWC-1612: Migrate to `FormFieldMixin` (must NOT apply to 2nd-gen action-group)
- SWC-1676: FocusgroupNavigationController
- SWC-282: Removing `selected` attribute leads to console error
- SWC-250: Mouse focus does not update roving tabindex

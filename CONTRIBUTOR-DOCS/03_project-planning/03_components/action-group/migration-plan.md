<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../../README.md) / [Project planning](../../README.md) / [Components](../README.md) / Action Group / Action group migration plan

<!-- Document title (editable) -->

# Action group migration plan

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
- [Blockers and open questions](#blockers-and-open-questions)
    - [Architecture and behavior](#architecture-and-behavior)
- [References](#references)

</details>

<!-- Document content (editable) -->

> **Epic SWC-2212** · Planning output. Must be reviewed before implementation begins.

---

## TL;DR

- `swc-action-group` is a composite keyboard control: one Tab stop into the strip, arrow-key navigation among children via `FocusgroupNavigationController`. It differs from `swc-button-group` in one key way: `swc-action-group` owns composite keyboard navigation (one Tab stop; arrow keys move among items), while `swc-button-group` lets Tab reach each button independently.
- Two ARIA-breaking changes ship in this migration: host is always `role="group"` (never `toolbar` or `radiogroup`); children are always `role="button"` (never `radio` or `checkbox`).
- `selects` and `selected` are dropped. There is no accessible path to set `aria-pressed`/`aria-checked` on `swc-action-button` children and have those attributes forwarded to the inner `<button>` — action-button's forwarding mechanism covers only `aria-haspopup`/`aria-expanded`, and the action-button plan explicitly removes `aria-pressed`. Selection UX belongs on `swc-toggle-button-group` (toggle/multi) and `swc-segmented-control` (exclusive choice). `swc-action-group` is a layout and keyboard navigation container only.
- Compact mode border-radius is handled entirely in CSS: action-group uses `::slotted(:first-child)` and `::slotted(:last-child)` to set `--swc-action-button-border-*-radius` custom properties, which cascade into action-button's shadow DOM. Action-button must expose those properties as overridable fallbacks in its shadow CSS (a small addition to its styling phase, not a separate ticket).
- `vertical` boolean → `orientation="horizontal|vertical"`; `FocusgroupNavigationController` confirmed available in this branch.

---

## Most blocking open questions

- **Q1** in [Architecture and behavior](#architecture-and-behavior): `aria-disabled` forwarding — **resolved:** add `aria-disabled` to action-button's `attributeChangedCallback` intercept (same pattern as `aria-haspopup`/`aria-expanded`).

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

**Proceed independently, after action-button.** Action group does not extend action-button and does not share a base class with button-group. Key dependency decisions established for this plan:

- Action-group does not rely on a `selected` property on action-button; `selects` and `selected` are dropped from action-group entirely (see TL;DR).
- Compact mode border-radius is handled entirely in CSS via `::slotted(:first-child)` / `::slotted(:last-child)` setting `--swc-action-button-border-*-radius` custom properties that cascade into action-button's shadow DOM.
- `FocusgroupNavigationController` is available in this branch and will be used.

### Related components and ordering notes

| Component | Relationship | Ordering note |
| --------- | ------------ | ------------- |
| `swc-action-button` | Runtime child dependency | Compact mode requires action-button to expose border-radius as `--swc-action-button-border-*-radius` custom properties so action-group can override them via CSS cascade |
| `swc-action-menu` | Slotted child | Participates in roving tabindex sequence; must be compatible with `FocusgroupNavigationController` |
| `swc-button-group` | Sibling (same ARIA role, different keyboard model) | Establishes the `orientation` rename convention that action-group follows |
| `swc-segmented-control` | Alternative for exclusive-selection UX | Not migrated yet in 2nd-gen; consumers needing exclusive-choice UX should use this when it ships |
| `swc-toggle-button-group` | Alternative for toggle-selection UX | Not migrated yet in 2nd-gen; consumers needing toggle/multi-select UX should use this when it ships |
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
| **B1** | `vertical` boolean → `orientation` attribute | `vertical` boolean; no default | `orientation="horizontal"` default, `orientation="vertical"` | Replace `<sp-action-group vertical>` with `<swc-action-group orientation="vertical">`. Matches established `swc-button-group` convention. 1st-gen `vertical` gets `@deprecated` JSDoc + `window.__swc.warn()` runtime warning. |
| **B2** | `--mod-*` CSS custom properties dropped | Nine `--mod-actiongroup-*` modifier properties | No `--mod-*` properties; additive `--swc-*` set introduced | Remove all `--mod-actiongroup-*` overrides; wait for announced `--swc-*` properties. Standard 2nd-gen change. |
| **B3** | `disabled` attribute added to group | No group-level `disabled` in 1st-gen (SWC-621) | `disabled` propagates `aria-disabled="true"` to host and children; children remain keyboard-reachable | No 1st-gen consumer migration; new additive API. Consumers using `disabled` on individual children may remove per-child attribute if group-level is preferred. |

#### Styling and visuals

| # | What changes | 1st-gen behavior | 2nd-gen behavior | Consumer migration path |
| --- | ------------ | ---------------- | ---------------- | ----------------------- |
| **B4** | Compact mode border-radius mechanism | 1st-gen CSS targets `.spectrum-ActionGroup-item` with `:first-child` / `:last-child` directly on native `<button>` children | 2nd-gen uses `::slotted(:first-child)` / `::slotted(:last-child)` to set `--swc-action-button-border-*-radius` custom properties that cascade into action-button's shadow DOM; action-button must expose those properties as overridable fallbacks | Consumers using `compact` see no API change |
| **B5** | S2 design tokens replace Spectrum 1 tokens | Spectrum 1 color, spacing, and size tokens | S2 design tokens from `spectrum-css` `spectrum-two` branch | Visual update; no consumer API change |

#### Accessibility and behavior

| # | What changes | 1st-gen behavior | 2nd-gen behavior | Consumer migration path |
| --- | ------------ | ---------------- | ---------------- | ----------------------- |
| **B6** | Host role fixed to `role="group"` | Default `role="toolbar"`; switches to `role="radiogroup"` when `selects="single"` | Always `role="group"`; not author-overridable | Remove any `role="toolbar"` or `role="radiogroup"` on `<sp-action-group>`. Move `role="toolbar"` to a parent wrapper element. Source: [accessibility migration analysis](./accessibility-migration-analysis.md). |
| **B7** | Child roles fixed to `role="button"` | `selects="single"` assigns `role="radio"` + `aria-checked`; `selects="multiple"` assigns `role="checkbox"` + `aria-checked` | Children always `role="button"`; `selects` and `selected` are dropped; selection UX moves to `swc-toggle-button-group` / `swc-segmented-control` | Remove any consumer code that relied on child `role="radio"`/`role="checkbox"` or on action-group's `selects`/`selected` API. Source: [accessibility migration analysis](./accessibility-migration-analysis.md), [action button accessibility migration analysis](../action-button/accessibility-migration-analysis.md). |
| **B8** | `RovingTabindexController` → `FocusgroupNavigationController` | `RovingTabindexController` with `hostDelegatesFocus: true` | `FocusgroupNavigationController`; direction tied to `orientation`; `delegatesFocus` preserved | No consumer-visible change; keyboard behavior is equivalent |
| **B9** | Focus stacking z-index fixed | Focused button's z-index may hide focus indicator (SWC-1342) | Focus indicator always visible | No consumer action required |

### Additive — ships when ready, zero breakage for consumers already on 2nd-gen

| # | What is added | Notes |
| --- | ------------- | ----- |
| **A1** | `emphasized` group-level propagation | `emphasized` is deprecated in 1st-gen `sp-action-button` with a `window.__swc.warn()` runtime warning and has no announced timeline for 2nd-gen. If `swc-action-button` adds it in a future release, action-group propagation follows as an additive change. |
| **A2** | Consumer migration guidance for `swc-segmented-control` / `swc-toggle-button-group` | `selects` and `selected` are dropped. When those components ship in 2nd-gen, the consumer migration guide can document the upgrade path. No code change to action-group. |
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
| `label` | `string` | `''` | `label` | **Confirmed** (a11y analysis). Reflects to `aria-label` on host. Recommended whenever the strip has a distinct purpose. |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | `orientation` | **Inferred** (Figma "Orientation" property, React S2 `orientation` prop, established `swc-button-group` convention). Breaking rename from `vertical` boolean. 1st-gen `vertical` gets `@deprecated` JSDoc + `window.__swc.warn()` runtime warning. |
| `quiet` | `boolean` | `false` | `quiet` | **Confirmed** (1st-gen carryover). Propagates to children. Quiet disables compact border-join styling. |
| `selected` | removed | n/a | removed | **Dropped**. No accessible path to forward `aria-pressed`/`aria-checked` from `swc-action-button` host to its inner `<button>`; action-button's forwarding covers only `aria-haspopup`/`aria-expanded`. Selection UX moves to `swc-toggle-button-group` / `swc-segmented-control`. |
| `selects` | removed | n/a | removed | **Dropped**. Same reason as `selected`. `swc-action-group` is a layout and keyboard navigation container; selection is not its responsibility. |
| `size` | `'xs' \| 's' \| 'm' \| 'l' \| 'xl'` | none | `size` | **Confirmed** (Figma, 1st-gen carryover). `noDefaultSize: true` preserved; propagates to children. Figma shows xs–xl. |
| `static-color` | `'white' \| 'black' \| undefined` | `undefined` | `static-color` | **Confirmed** (1st-gen carryover). Propagates to children. |
| `emphasized` | `boolean` | `false` | `emphasized` | **Dropped**. `emphasized` is deprecated in 1st-gen `sp-action-button` with `window.__swc.warn()` and has no announced 2nd-gen timeline. Figma shows no group-level emphasized style. Not implemented in 2nd-gen action-group. |

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

#### Compact mode

Compact mode (`compact` attribute) visually joins buttons by collapsing shared borders and resetting interior border-radius values. The Figma spec calls this "Density: Compact".

In 1st-gen, the CSS targets `.spectrum-ActionGroup-item` class on native `<button>` children directly. In 2nd-gen, children are `swc-action-button` custom elements with their own shadow DOM. The action-group's `::slotted()` selector can style the host boundary of slotted children (margin collapse, border between adjacent children) but cannot reach the inner `<button>` element to adjust border-radius on interior edges.

**Chosen approach: CSS custom property cascade.** Action-group sets `--swc-action-button-border-*-radius` custom properties on slotted children via `::slotted(:first-child)` and `::slotted(:last-child)`. CSS custom properties inherit through shadow DOM boundaries, so these values cascade into action-button's shadow CSS automatically. Action-button must expose the four logical border-radius properties as `var(--swc-action-button-border-*-radius, token("corner-radius-100"))` fallbacks — a small addition to its shadow CSS, not a behavioral change.

This mirrors both spectrum-css's own `:first-child` / `:last-child` approach and the accordion migration's pattern of parent-to-child state via `::slotted()` custom property cascade. No JS attribute propagation is needed.

#### Focus management

`swc-action-group` owns composite keyboard navigation: one Tab stop into the strip, arrow keys move among enabled `swc-action-button` and `swc-action-menu` children. In 2nd-gen, `RovingTabindexController` is replaced by `FocusgroupNavigationController`, with `direction` set to match `orientation`.

Initial focus target: first enabled child.

When a child `swc-action-menu` is open, focus enters the menu; when the menu closes, focus returns to the menu trigger (the `swc-action-menu` host).

`delegatesFocus: true` on the shadow root is preserved: calling `focus()` on the host delegates to the current roving item.

Mouse click updates the roving `tabindex="0"` to the clicked item (SWC-250 fix required; the 1st-gen mouse test is `it.skip`).

#### Child propagation

On each slot change and on changes to `quiet`, `size`, `staticColor`, `disabled`, and `compact`, the group propagates the relevant state to each managed child. The managed child selector in 2nd-gen is `swc-action-button, swc-action-menu`.

### Accessibility semantics notes (2nd-gen)

Source: [accessibility migration analysis](./accessibility-migration-analysis.md)

- **Host role:** `role="group"` is prescribed and fixed in all modes. Not author-overridable. A page-level `role="toolbar"` landmark goes on an outer wrapper, never on `swc-action-group`.
- **Child roles:** `swc-action-button` stays `role="button"` only. No `role="radio"` or `role="checkbox"` on children.
- **`aria-orientation`:** Set to `"vertical"` when `orientation="vertical"`; `"horizontal"` or omitted otherwise. Wired to `FocusgroupNavigationController` direction.
- **`aria-disabled`:** When `disabled` is set on the group, the host receives `aria-disabled="true"` and each child receives `aria-disabled="true"`. Children remain in the Tab/Arrow sequence and are discoverable but must not activate. `ButtonBase.getForwardedButtonAttributes()` currently derives `aria-disabled` only from the component's own `pending` state — it does not forward a host-level `aria-disabled` attribute set by an external parent. **Decision (Phase 3):** add `aria-disabled` to action-button's `attributeChangedCallback` intercept, following the same pattern as `aria-haspopup`/`aria-expanded`.
- **Group name:** `label` → `aria-label` on host. `aria-labelledby` remains valid. Labeling the group is recommended whenever the strip has a distinct purpose.
- **`FormFieldMixin`:** Must not be applied. `swc-action-group` is a composite keyboard widget, not a form field. SWC-1612 is a ticket that uses `FormFieldMixin` for `sp-action-group`; that must not carry into the 2nd-gen migration. The `label` property could be mistaken for a field-label association, but it is used only to provide `aria-label` on the group — not for form association.
- **Toolbar composition:** Storybook and docs must show `role="toolbar"` on an outer wrapper with named `swc-action-group` clusters as inner groups, per the APG toolbar example:

  ```html
  <div role="toolbar" aria-label="Text formatting">
    <swc-action-group label="Text style">
      <swc-action-button>Bold</swc-action-button>
      <swc-action-button>Italic</swc-action-button>
    </swc-action-group>
    <swc-action-group label="Alignment">
      <swc-action-button>Left align</swc-action-button>
      <swc-action-button>Center</swc-action-button>
      <swc-action-button>Right align</swc-action-button>
    </swc-action-group>
  </div>
  ```

---

## Architecture: core vs SWC split

> The 1st-gen component is a **reference only** — 2nd-gen is built independently. Neither generation imports from the other.

Follow the [Badge migration reference](../../02_workstreams/02_2nd-gen-component-migration/02_step-by-step/01_washing-machine-workflow.md#reference-badge-migration) as the concrete pattern for the core/SWC split.

| Layer | Path | Contains |
| -------- | ----------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| **Core** | `2nd-gen/packages/core/components/action-group/` | `ActionGroup.base.ts`, `ActionGroup.types.ts`. Child collection logic, `label` → `aria-label`, `disabled` propagation contract, dev warnings. No rendering. |
| **SWC** | `2nd-gen/packages/swc/components/action-group/` | `ActionGroup.ts`, `action-group.css`, element registration (`swc-action-group`), stories, tests. Renders `<slot role="presentation">`. Wires `FocusgroupNavigationController`. Propagates `compact` position mechanism, `quiet`, `size`, `staticColor` to slotted children. |

Planned rendering shape:

- Core owns: `label` / `aria-label` management, `disabled` state contract, child collection logic
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
- [x] Plan reviewed by at least one other engineer

### Setup

- [x] Create `2nd-gen/packages/core/components/action-group/`
- [x] Create `2nd-gen/packages/swc/components/action-group/`
- [x] Wire exports in both `package.json` files
- [ ] Check out `spectrum-css` at `spectrum-two` branch as sibling directory (required for Phase 5 styling)
- [x] `FocusgroupNavigationController` confirmed available in this branch
- [x] `swc-action-button` API confirmed: no `selected` property, no `aria-pressed`/`aria-checked` forwarding; compact uses CSS custom property cascade via `::slotted(:first-child)` / `::slotted(:last-child)` (action-button must expose `--swc-action-button-border-*-radius` fallbacks)

### API

#### Naming and public surface

- [ ] `ActionGroup.types.ts`: define `ActionGroupOrientation` (`'horizontal' | 'vertical'`)
- [ ] `ActionGroupSize` type: `(typeof ACTION_GROUP_VALID_SIZES)[number]` — same pattern as `BadgeSize`, `ButtonSize`, `StatusLightSize`
- [ ] `ActionGroup.base.ts`: `label` → `aria-label`, `disabled` propagation contract, child collection logic
- [ ] `ActionGroup.ts`: `compact`, `quiet`, `orientation`, `justified`, `size`, `staticColor`, child propagation, `FocusgroupNavigationController` wiring, `delegatesFocus: true`
- [ ] Drop `--mod-*` CSS custom properties; introduce `--swc-*` set after Phase 5 review

#### 1st-gen deprecation notices

- [ ] `@deprecated` JSDoc on `vertical` property in `sp-action-group`; runtime warn in existing `vertical` setter via `window.__swc.warn()`

#### Alignment checks

- [x] `orientation` rename confirmed — matches established `swc-button-group` convention (on main)
- [x] `emphasized` deprecated in 1st-gen `sp-action-button` with `window.__swc.warn()`; not in 2nd-gen `swc-action-button`; no group-level propagation
- [x] Compact position mechanism confirmed — CSS custom property cascade via `::slotted(:first-child)` / `::slotted(:last-child)`

### Styling

> Follow the [CSS style guide](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/) as the source of truth for all styling work. Key references: [migration steps](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/04_spectrum-swc-migration.md), [custom properties](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/02_custom-properties.md), [anti-patterns](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/05_anti-patterns.md).

- [ ] Add `.swc-ActionGroup` to the internal semantic element in `render()`; keep layout styling off `:host` where possible
- [ ] Copy S2 source from `spectrum-css` `spectrum-two` branch `components/action-group/index.css` (not `/dist`) into `action-group.css` as baseline
- [ ] Translate `.spectrum-ActionGroup-item` child selectors to `::slotted(*)` equivalents for gap, margin, and border-between adjustments
- [ ] Implement compact mode via CSS custom property cascade: use `::slotted(:first-child)` and `::slotted(:last-child)` to set `--swc-action-button-border-start-start-radius`, `--swc-action-button-border-start-end-radius`, `--swc-action-button-border-end-start-radius`, `--swc-action-button-border-end-end-radius`; all four reset to `0` on `::slotted(*)`, then outer corners restored on first and last children
  - **Prerequisite:** `swc-action-button` must expose these four properties as `var(--swc-action-button-border-*-radius, token("corner-radius-100"))` fallbacks in its shadow CSS. This is a small addition to action-button's styling phase alongside action-group's compact mode.
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
- [ ] `swc-action-button` children stay `role="button"` only; no `role="radio"` or `role="checkbox"` assigned by action-group
- [ ] Group `disabled`: host `aria-disabled="true"`, children `aria-disabled="true"`; children remain keyboard-reachable (SWC-621)

#### State verification

- [ ] Roving tabindex: exactly one child has `tabindex="0"`, others `tabindex="-1"`
- [ ] Initial focus target is first selected enabled child, or first enabled child
- [ ] Mouse click updates `tabindex="0"` to clicked item (SWC-250 fix; port `it.skip` test)
- [ ] Focus ring visible on focused child; no z-index stacking hides indicator (SWC-1342 fix)
- [ ] `change` fires after `selected` state is committed (SWC-889 fix)
- [ ] `selected` removal does not throw console error (SWC-282 fix)
- [ ] `swc-action-menu` in group: open menu; arrow inside; Escape returns focus to menu trigger; roving continues from trigger
- [ ] `FormFieldMixin` not applied (SWC-1612 not applied)

### Testing

- [ ] Port applicable coverage from [`1st-gen/packages/action-group/test/action-group.test.ts`](../../../../1st-gen/packages/action-group/test/action-group.test.ts)
- [ ] Add Playwright `action-group.a11y.spec.ts` with `toMatchAriaSnapshot`

#### Behavior

- [ ] Host `role="group"` in all orientations and density combinations
- [ ] `label` → `aria-label` on host; empty label removes it
- [ ] `orientation="vertical"` → `aria-orientation="vertical"`; horizontal → `"horizontal"` or omitted
- [ ] Roving tabindex: one `tabindex="0"`, rest `tabindex="-1"`; verified after slot change and after click
- [ ] Group `disabled`: host `aria-disabled="true"`; all children `aria-disabled="true"`; Tab reaches group; arrow moves within; activation suppressed
- [ ] Mouse click moves `tabindex="0"` to clicked child (SWC-250)
- [ ] `swc-action-menu` in group: keyboard opens menu; Escape closes; focus returns to trigger; roving sequence intact
- [ ] Compact + quiet: compact border-join is inactive

#### Visual regression

- [ ] VRT coverage for all five sizes in default density, horizontal orientation
- [ ] VRT coverage for compact density, horizontal and vertical
- [ ] VRT coverage for quiet style
- [ ] VRT coverage for static-color white and black on correct backgrounds
- [ ] VRT coverage for focus-visible ring not clipped or hidden (SWC-1342)
- [ ] VRT coverage for toolbar wrapper composition (outer `role="toolbar"`, named inner groups)

### Documentation

#### General

- [ ] JSDoc on all public props, slots, events, and CSS custom properties
- [ ] Storybook stories: overview, anatomy (slot types), sizes, styles (default/quiet), density (default/compact), orientation (horizontal/vertical), justified, disabled, static-color, toolbar wrapper composition
- [ ] Distinguish `swc-action-group` vs `swc-button-group` in docs: composite keyboard navigation vs independent Tab stops

#### Breaking changes

- [ ] Consumer migration guide: `vertical` → `orientation="vertical"`
- [ ] Consumer migration guide: remove `role` overrides from `<sp-action-group>`; move `role="toolbar"` to a parent wrapper
- [ ] Consumer migration guide: `selects` and `selected` removed; consumers using selection UX should migrate to `swc-toggle-button-group` (toggle/multi) or `swc-segmented-control` (exclusive choice) when those ship in 2nd-gen
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

No deferred implementation tickets at this time.

---

## Blockers and open questions

### Architecture and behavior

| # | Item | Blocking? | Status | Owner |
| --- | ---- | --------- | ------ | ----- |
| **Q1** | **`aria-disabled` forwarding on `swc-action-button`.** When action-group sets `aria-disabled="true"` on a child host, `ButtonBase.getForwardedButtonAttributes()` does not forward it to the inner `<button>` — it derives `aria-disabled` only from the component's own `pending` state. **Resolved:** add `aria-disabled` to action-button's `attributeChangedCallback` intercept, following the same pattern as `aria-haspopup`/`aria-expanded`. | Yes — Phase 3 | Resolved | Architecture reviewer |

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

<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../../README.md) / [Project planning](../../README.md) / [Components](../README.md) / Button Group / Button group migration plan

<!-- Document title (editable) -->

# Button group migration plan

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
- [References](#references)

</details>

<!-- Document content (editable) -->

> **Epic SWC-2071** · Planning output. Must be reviewed before implementation begins.

---

## TL;DR

Button group is a simple layout and semantics wrapper for related button actions. The 1st-gen implementation is minimal (flexbox container with size propagation), making the migration straightforward. The core changes are:

- **Rename `vertical` boolean to `orientation` property** (aligns with React Spectrum S2 and Figma); this is the only consumer-facing breaking change.
- **Add `role="group"` and `aria-orientation`** on the host for WCAG compliance (1st-gen is missing this).
- **Add `align` property** for button alignment (start/center/end); matches React S2.
- **Propagate disabled state** from group to children via an optional `disabled` attribute.
- **Overflow behavior (auto-switch to vertical)** is documented in React S2 but is not in the Figma design spec; flagged as an open question and out of scope for MVP unless decided otherwise.
- Button group depends on `swc-button` being available in 2nd-gen (already migrated).

### Most blocking open questions

- Q1 in [Design](#design): Should XL size be supported in 2nd-gen? Figma shows it but React S2 limits to S/M/L.
- Q2 in [Architecture and behavior](#architecture-and-behavior): Should overflow behavior (auto-switch horizontal → vertical) be in-scope for MVP or deferred as additive?

---

## 1st-gen API surface

**Source:** [`1st-gen/packages/button-group/src/ButtonGroup.ts`](../../../../1st-gen/packages/button-group/src/ButtonGroup.ts)
**Version:** `@spectrum-web-components/button-group@1.12.1`
**Custom element tag:** `sp-button-group`

### Properties / attributes

| Property | Type | Default | Attribute | Notes |
| -------- | ---- | ------- | --------- | ----- |
| `vertical` | `boolean` | `false` | `vertical` | Reflected. Switches flex-direction to column. |
| `size` | `ElementSize` (`'s'` \| `'m'` \| `'l'` \| `'xl'`) | none (`noDefaultSize: true`) | `size` | From `SizedMixin`. Propagated to slotted children on change and slotchange. |

### Methods

| Method | Signature | Notes |
| ------ | --------- | ----- |
| `manageChildrenSize` | `(slot: HTMLSlotElement): void` | Private. Iterates assigned elements and sets `button.size = this.size`. |
| `handleSlotchange` | `(event: Event & { target: HTMLSlotElement }): void` | Protected. Calls `manageChildrenSize` on slotchange. |

### Events

None. `sp-button-group` does not dispatch any custom events.

### Slots

| Slot | Content | Notes |
| ---- | ------- | ----- |
| default | `sp-button` elements | The buttons that make up the group. Size is propagated to all assigned elements. |

### CSS custom properties

From `button-group.css.ts` (sourced from spectrum-css `spectrum-two` branch):

| Property | Purpose | Notes |
| -------- | ------- | ----- |
| `--mod-buttongroup-spacing` | Gap between buttons | Default: `--spectrum-spacing-300`; size S: `--spectrum-spacing-200` |
| `--mod-buttongroup-justify-content` | Alignment of buttons | Default: `normal` |
| `--mod-buttongroup-flex-wrap` | Wrap behavior | Default: `wrap` |
| `--mod-buttongroup-spacing-horizontal` | Horizontal gap (deprecated) | Replaced by `--mod-buttongroup-spacing` |
| `--mod-buttongroup-spacing-vertical` | Vertical gap (deprecated) | Replaced by `--mod-buttongroup-spacing` |

This full modifier surface will not be carried forward to 2nd-gen.

### Shadow DOM output (rendered HTML)

```html
<slot></slot>
```

The component renders only a default slot. All styling is on `:host` and `::slotted(*)`.

---

## Dependencies

| Package | Version | Role |
| ------- | ------- | ---- |
| `@spectrum-web-components/base` | 1.12.1 | `SpectrumElement`, `SizedMixin`, Lit, decorators |
| `@spectrum-web-components/button` | 1.12.1 | Type import only (`Button` type for casting slotted elements) |

---

## Migration sequencing and prerequisites

### Dependency-aware recommendation

**Proceed independently.** Button group's only hard dependency is `swc-button`, which is already fully migrated to 2nd-gen (status table shows Button at all steps complete). Button group does not need to wait on any other component, and no other component depends on it being migrated first.

### Related components and ordering notes

| Component | Relationship | Status |
| --------- | ------------ | ------ |
| **Button** (`swc-button`) | Children of button group; must exist in 2nd-gen | **Complete** — fully migrated |
| **Action Group** (`swc-action-group`) | Similar layout pattern but for action buttons with toolbar semantics | Analyze ✓ only |
| **Toggle Group** (`swc-toggle-group`) | Separate component for toggle/selection semantics; not this component | N/A (new for S2) |

### User confirmation needed

None. Button group can proceed independently because `swc-button` is already complete and button group does not serve as a base for other components.

---

## Changes overview

> **Priority framing:**
>
> - Use the component's full feature/functionality inventory to decide what belongs here; do not classify scope without first identifying the full surface area.
> - **Must ship** items define the in-scope work required for this migration.
> - **Additive** items are typically deferred or out of scope for this migration unless the user explicitly pulls them in.
> - **Additive / deferred** does not mean deprecated or dropped; it usually means not required to meet the baseline 80% consumer-use needs for this migration.
> - **Accessibility is non-negotiable** — all a11y requirements ship as part of this migration.
> - **Breaking changes** are assessed on merit — some must ship now to avoid a second, more disruptive migration event later.
> - **Additive changes** can be deferred and will not cause consumer breakage when they do ship.

### Must ship — breaking or a11y-required

#### API and naming

| #   | What changes | 1st-gen behavior | 2nd-gen behavior | Consumer migration path |
| --- | ------------ | ---------------- | ---------------- | ----------------------- |
| **B1** | `vertical` boolean → `orientation` property | `vertical` boolean attribute switches to column layout | `orientation="horizontal"` (default) or `orientation="vertical"`; explicit API aligned with React S2 and Figma | Replace `vertical` attribute with `orientation="vertical"`. Source: React S2 `orientation` prop. |
| **B2** | Size type narrowing (provisional) | Accepts `'s'` \| `'m'` \| `'l'` \| `'xl'` | Accept `'s'` \| `'m'` \| `'l'` minimum; XL pending Q1 | If XL is dropped, consumers using `size="xl"` must switch to `size="l"`. |

#### Styling and visuals

| #   | What changes | 1st-gen behavior | 2nd-gen behavior | Consumer migration path |
| --- | ------------ | ---------------- | ---------------- | ----------------------- |
| **B3** | Updated spacing tokens | Uses `--spectrum-spacing-300` (default), `--spectrum-spacing-200` (S) | Same tokens from spectrum-css `spectrum-two`; no visual change expected | No consumer action needed; visual refresh happens automatically. |

#### Accessibility and behavior

| #   | What changes | 1st-gen behavior | 2nd-gen behavior | Consumer migration path |
| --- | ------------ | ---------------- | ---------------- | ----------------------- |
| **B4** | Add `role="group"` on host | No role set on host | Host exposes `role="group"` via ElementInternals or explicit attribute | No consumer action; improvement is transparent. |
| **B5** | Add `aria-orientation` | Not set | `aria-orientation="horizontal"` or `"vertical"` matching `orientation` prop | No consumer action; transparent addition. |
| **B6** | Disabled propagation to children | Not supported | `disabled` attribute on host propagates `disabled` to each slotted `swc-button` | Consumers gain group-level disable; no breaking change. |

### Additive — ships when ready, zero breakage for consumers already on 2nd-gen

| #   | What is added | Notes |
| --- | ------------- | ----- |
| **A1** | `align` property (`"start"` \| `"center"` \| `"end"`) | Matches React S2 `align` prop. Maps to `justify-content`. Can ship after MVP. |
| **A2** | Overflow behavior (auto-switch horizontal → vertical) | React S2 uses a `ResizeObserver` to detect overflow and switch orientation. Out of scope for MVP pending Q2. |
| **A3** | `aria-label` / `aria-labelledby` attribute forwarding | Group naming for screen readers; recommended in accessibility analysis. Can be consumer-applied without API support. |

---

## 2nd-gen API decisions

These are derived from the 1st-gen implementation, current deprecations, the Figma Desktop Button group spec, the React S2 implementation, and the rendering roadmap. Confirmed items are marked; open items are tracked in [Blockers and open questions](#blockers-and-open-questions).

### Public API

#### Properties / attributes (2nd-gen)

| Property | Type | Default | Attribute | Notes |
| -------- | ---- | ------- | --------- | ----- |
| `orientation` | `'horizontal'` \| `'vertical'` | `'horizontal'` | `orientation` | **Confirmed.** Replaces `vertical` boolean. Aligns with React S2 and aria-orientation. |
| `size` | `'s'` \| `'m'` \| `'l'` (provisional; XL pending Q1) | `'m'` | `size` | **Inferred.** React S2 uses S/M/L with M default. Figma shows XL. 1st-gen had no default. 2nd-gen should have a default of `'m'`. |
| `disabled` | `boolean` | `false` | `disabled` | **Confirmed.** Aligns with React S2 `isDisabled`. Propagates to child buttons. |

#### Visual matrix (2nd-gen)

N/A. Button group is a layout container, not a visual component with fill/outline treatments. The buttons inside carry their own visual variants.

Figma-confirmed presentation modes:

- Horizontal orientation (default)
- Vertical orientation
- Size S, M, L (XL pending Q1)
- 2+ buttons in group

#### Slots (2nd-gen)

| Slot | Content | Notes |
| ------- | ------------------------- | -------------------------------------------- |
| default | `swc-button` elements | **Confirmed.** Slotted children receive size and disabled propagation. |

#### CSS custom properties (2nd-gen)

No `--mod-*` properties will be exposed. New `--swc-*` component-level properties may be introduced where needed — these are additive and not breaking. See [Component Custom Property Exposure](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/02_custom-properties.md#component-custom-property-exposure) for what to expose and how.

Each exposed `--swc-*` property must be documented with a `@cssprop` JSDoc tag on the primary SWC component class. Storybook picks these up and surfaces them in the API docs panel automatically.

Initial expectation for Button Group is a small reviewed set:

| Property | Purpose | Notes |
| -------- | ------- | ----- |
| `--swc-button-group-gap` | Space between buttons | Allows consumer override of gap spacing |
| `--swc-button-group-justify-content` | Alignment of buttons within the group | Only if `align` property is not shipped in MVP |

### Behavioral semantics

#### Size propagation

When the `size` attribute changes or new children are slotted, the component iterates all assigned `swc-button` elements in the default slot and sets their `size` property to match. This matches 1st-gen behavior.

#### Disabled propagation

When `disabled` is set on the group host, all slotted `swc-button` elements receive `disabled`. When the attribute is removed, children are re-enabled. This mirrors React S2's `isDisabled` behavior.

#### Orientation

The `orientation` property controls CSS flex-direction (row vs column) and sets `aria-orientation` on the host accordingly. The default is `"horizontal"`.

### Accessibility semantics notes (2nd-gen)

Sourced from the [accessibility migration analysis](./accessibility-migration-analysis.md):

- **Host role:** `role="group"` (never `radiogroup` or `toolbar`)
- **aria-orientation:** Matches `orientation` property
- **Group name:** Optional `aria-label` / `aria-labelledby` when the group carries distinct meaning
- **No roving tabindex:** Each button is a separate Tab stop; arrow-key navigation belongs on a parent toolbar/composite, not on button-group
- **Focus:** Standard Tab/Shift+Tab through children in DOM order
- **Not a toggle group:** No `aria-pressed` orchestration; that belongs on `swc-toggle-group`

---

## Architecture: core vs SWC split

> The 1st-gen component is a **reference only** — 2nd-gen is built independently. Neither generation imports from the other.

Follow the [Badge migration reference](../../02_workstreams/02_2nd-gen-component-migration/02_step-by-step/01_washing-machine-workflow.md#reference-badge-migration) as the concrete pattern for the core/SWC split.

| Layer    | Path                                            | Contains                                                                                                                                                                                                                                          |
| -------- | ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Core** | `2nd-gen/packages/core/components/button-group/` | `ButtonGroup.base.ts`, `ButtonGroup.types.ts`, validation (size/orientation normalization), disabled-propagation logic, ARIA attribute management (`role="group"`, `aria-orientation`). No rendering. |
| **SWC**  | `2nd-gen/packages/swc/components/button-group/`  | `ButtonGroup.ts`, `button-group.css`, element registration (`sp-button-group`), stories, tests, and the specific S2 rendering/styling. |

Planned rendering shape:

- Core owns API normalization (orientation, size, disabled propagation to children) and ARIA attribute management
- SWC renders: a single `<slot>` element with `.swc-ButtonGroup` class for styling, flexbox layout driven by orientation and size

---

## Migration checklist

### Preparation (this ticket)

- [x] 1st-gen API surface documented
- [x] Dependencies identified
- [x] Breaking changes documented
- [x] 2nd-gen API decisions drafted
- [ ] Plan reviewed by at least one other engineer

### Setup

- [ ] Create `2nd-gen/packages/core/components/button-group/`
- [ ] Create `2nd-gen/packages/swc/components/button-group/`
- [ ] Wire exports in both `package.json` files
- [ ] Check out `spectrum-css` at `spectrum-two` branch as sibling directory

### API

#### Naming and public surface

- [ ] `ButtonGroup.types.ts`: define `ButtonGroupOrientation`, `ButtonGroupSize`, public property interfaces
- [ ] `ButtonGroup.base.ts`: `orientation`, `size`, `disabled` properties with validation; size/disabled propagation to slotted children; `role="group"` and `aria-orientation` management

#### Alignment checks

- [ ] Confirm XL size decision (Q1) before finalizing size type
- [ ] Confirm overflow behavior scope (Q2) before finalizing behavioral API

### Styling

> Follow the [CSS style guide](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/) as the source of truth for all styling work. Key references: [migration steps](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/04_spectrum-swc-migration.md), [custom properties](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/02_custom-properties.md), [anti-patterns](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/05_anti-patterns.md).

- [ ] Add `.swc-ButtonGroup` to the internal semantic element in `render()`; keep styling off `:host`
- [ ] Copy S2 source from `spectrum-css` `spectrum-two` branch `components/buttongroup/index.css` (not `/dist`) into `button-group.css` as baseline
- [ ] Map `--spectrum-buttongroup-*` tokens to `:host` and orientation/size selectors

#### Visual model and regressions

- [ ] Verify size S spacing token (`--spectrum-spacing-200`) vs default (`--spectrum-spacing-300`)
- [ ] Add `@cssprop` JSDoc tag for any exposed `--swc-*` properties
- [ ] Pass stylelint (property order, `no-descending-specificity`, token validation)

### Accessibility

#### Naming and semantics

- [ ] Host exposes `role="group"` (ElementInternals or explicit attribute)
- [ ] `aria-orientation` reflects `orientation` property
- [ ] `aria-label` / `aria-labelledby` passthrough supported
- [ ] No `role="radiogroup"` or `role="toolbar"` on host
- [ ] No `FocusgroupNavigationController` on button-group

#### State verification

- [ ] `disabled` propagation sets `disabled` on each slotted `swc-button`
- [ ] Removing `disabled` from group re-enables children
- [ ] Screen reader announces "group" landmark with name when provided

### Testing

- [ ] Port `1st-gen/packages/button-group/test/button-group.test.ts` coverage that still applies
- [ ] Add Playwright `button-group.a11y.spec.ts` with `toMatchAriaSnapshot`

#### Behavior

- [ ] Size propagation: changing `size` on group updates all slotted buttons
- [ ] Disabled propagation: setting `disabled` on group disables all children
- [ ] Orientation: switching orientation changes flex-direction and aria-orientation
- [ ] Slotchange: newly slotted buttons receive current size and disabled state
- [ ] Default size: group defaults to `size="m"` when no attribute set

#### Visual regression

- [ ] Add VRT coverage for horizontal and vertical orientations
- [ ] Add VRT coverage for all size variants (S, M, L; XL if confirmed)
- [ ] Add VRT coverage for disabled group state

### Documentation

#### General

- [ ] JSDoc on all public props, slots, and CSS custom properties
- [ ] Storybook stories for: default, vertical, each size, disabled, alignment (if shipped)
- [ ] Consumer migration guide documenting `vertical` → `orientation` change

#### Breaking changes

- [ ] Document `vertical` → `orientation="vertical"` migration path
- [ ] Document default size change (1st-gen: none → 2nd-gen: `m`)

### Review

- [ ] `yarn lint:2nd-gen` passes (ESLint, Stylelint, Prettier)
- [ ] Status table in workstream doc updated
- [ ] PR created with description referencing Epic SWC-2071
- [ ] Peer engineer sign-off

---

## Blockers and open questions

### Design

| #   | Item | Blocking? | Status | Owner |
| --- | ---- | --------- | ------ | ----- |
| **Q1** | Should `size="xl"` be supported in 2nd-gen? Figma S2 Desktop shows XL but React S2 limits to S/M/L. The spectrum-css `spectrum-two` branch only defines spacing for default and sizeS; no dedicated XL token. **Recommendation:** Align with React S2 (S/M/L only) and treat XL as additive/deferred. | Yes — affects type definition and test matrix | Open | Design + implementation |

### Architecture and behavior

| #   | Item | Blocking? | Status | Owner |
| --- | ---- | --------- | ------ | ----- |
| **Q2** | Should overflow behavior (auto-switch from horizontal to vertical when space is limited) be in MVP scope? React S2 implements this with a `ResizeObserver`. The Figma design spec does not mention it. The ticket notes flag this as "needs decision". **Recommendation:** Defer to additive. The core layout component should ship without resize detection complexity; consumers can set `orientation="vertical"` explicitly. | No — can be additive | Open | Architecture reviewer |

### Scope and prerequisites

| #   | Item | Blocking? | Status | Owner |
| --- | ---- | --------- | ------ | ----- |
| **Q3** | Should `align` be part of MVP or additive? React S2 has `align` ("start"/"center"/"end") with "start" default. 1st-gen does not have it. **Recommendation:** Include in MVP; it is a simple CSS property mapping with no behavioral complexity. | No — recommended for MVP but not blocking | Open | Implementation |

---

## References

- [Washing machine workflow](../../02_workstreams/02_2nd-gen-component-migration/02_step-by-step/01_washing-machine-workflow.md)
- [2nd-gen migration status table](../../02_workstreams/02_2nd-gen-component-migration/01_status.md)
- [Accessibility migration analysis](./accessibility-migration-analysis.md)
- [Rendering and styling migration analysis](./rendering-and-styling-migration-analysis.md)
- [CSS style guide — Component Custom Property Exposure](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/02_custom-properties.md#component-custom-property-exposure)
- [CSS style guide — Selector conventions](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/02_custom-properties.md#selector-conventions)
- [1st-gen source](../../../../1st-gen/packages/button-group/src/ButtonGroup.ts)
- [1st-gen tests](../../../../1st-gen/packages/button-group/test/button-group.test.ts)
- [1st-gen README](../../../../1st-gen/packages/button-group/README.md)
- [React Spectrum S2 ButtonGroup](https://react-spectrum.adobe.com/ButtonGroup)
- [Spectrum CSS — `spectrum-two` branch — `components/buttongroup/index.css`](https://github.com/adobe/spectrum-css/blob/spectrum-two/components/buttongroup/index.css)
- [Spectrum CSS migration PR #2457](https://github.com/adobe/spectrum-css/pull/2457)
- [Figma S2 / Web (Desktop scale) — Button group](https://www.figma.com/design/Mngz9H7WZLbrCvGQf3GnsY/S2---Web--Desktop-scale-?node-id=13663-6530)
- [WAI-ARIA APG: Toolbar pattern](https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/)
- [WAI-ARIA APG: Keyboard navigation inside components](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#keyboardnavigationinsidecomponents)
- [Badge migration reference](../../02_workstreams/02_2nd-gen-component-migration/02_step-by-step/01_washing-machine-workflow.md#reference-badge-migration)
- [Button migration plan](../button/migration-plan.md)
- [Button accessibility migration analysis](../button/accessibility-migration-analysis.md)
- Epic: SWC-2071 - Button group epic

<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../../README.md) / [Project planning](../../README.md) / [Components](../README.md) / Radio Group / Radio group migration plan

<!-- Document title (editable) -->

# Radio group migration plan

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

> **Epic SWC-2348** · Planning output. Must be reviewed before implementation begins. Deliverable for SWC-2546.
>
> This plan covers **`swc-radio-group`, the coordinating container, only.** `swc-radio` (the individual item) has its own migration plan, [`radio/migration-plan.md`](../radio/migration-plan.md), already reviewed and largely resolved.
>
> **Source priority: `radio/migration-plan.md`'s resolved decisions take priority over `radio-group/accessibility-migration-analysis.md`** wherever the two conflict. The a11y analysis was authored before the item's plan resolved Q12, and it describes a split that Q12 supersedes: it says value submission happens through each radio's own `FieldAssociationController` and the group needs only a separate, lighter validity-only wiring. Q12, **officially signed off by the a11y SME** (item plan), instead puts **all** form-value participation on `swc-radio-group` alone. This plan treats that resolution as settled fact, not something to re-derive.
>
> No dedicated rendering-and-styling migration analysis was produced for this component, and none is needed: `swc-radio-group` reuses the shared `form-fields` styles and render template built for `swc-text-field` rather than authoring its own CSS mapping from scratch. A Figma reference **was** supplied for this plan (size × top/side-label × default/error/disabled state matrix) and is treated as satisfying the Figma requirement. Everything visual-matrix-related below is sourced from that image plus the `spectrum-css` `fieldgroup` component (reviewed directly, since no dedicated `radio-group` CSS component exists); nothing here is invented.

---

## TL;DR

- **No native equivalent for the group's own role, unlike the item.** `swc-radio` has a real `<input type="radio">` to hang role/label/checked on; `swc-radio-group` has no native "radiogroup" element at all. `role="radiogroup"` and the group's own accessible name/description/error message all live on the **host** via `ElementInternals`, matching 1st-gen's own pattern (`FieldGroup` defaults to `role="group"`, `RadioGroup` overrides it to `radiogroup` in `willUpdate`).
- **`LabellingController` is a confirmed dependency here, unlike for `swc-radio`.** The group has no native element to attach a label to, so the host-attachment mode `LabellingController` is being built to support is the only mechanism available. Why the item rejected it: [`radio/migration-plan.md`](../radio/migration-plan.md#decision-log) (Q5/B5). See [Decision log](#decision-log) for this component's own reasoning.
- **Consumes `swc-text-field`'s shared `form-fields` `_lit-styles/` stylesheet and render template, per explicit direction.** `swc-radio-group` becomes the second confirmed consumer of the `.swc-FormFieldTemplate` grid (`label-position` `top`/`side`) and `.swc-FormFieldLabel`/`.swc-FormFieldDescription`/`.swc-FormFieldErrorIcon` classes proposed in [`text-field/migration-plan.md`](../text-field/migration-plan.md). Location of the render fragment will be determined through implementation of text field. `swc-radio` (the item) explicitly does **not** consume it (already decided in the item's plan); only the group does. See [Decision log](#decision-log).
- **`FieldAssociationController` now handles both value and validity, not a split.** The a11y doc originally proposed the group needing only a lighter validity-only `ElementInternals` wiring, with value handled per-item. Q12 (resolved) simplifies this: one `FieldAssociationController` instance on the group handles `setFormValue` (driven by its own `selected`) **and** validity (`setValidity`/`checkValidity`) together — no split, no lighter alternate wiring needed.
- **Three shared dependencies don't exist yet, all from the same unmerged `swc-text-field` work:** `FieldAssociationController` (SWC-2467), `LabellingController` (SWC-2466), and the shared `form-fields` stylesheet/render template itself (verified absent from `2nd-gen/packages/swc/stylesheets/_lit-styles/` — still only a proposal in `text-field/migration-plan.md`). See [Migration sequencing and prerequisites](#migration-sequencing-and-prerequisites).
- **`disabled`, `size`, and `emphasized` propagate from the group onto its slotted radios via the already-built `SlotAttributePropagationController`**, replacing 1st-gen's hand-rolled `slotchange` loop. `size`/`emphasized` propagation was already recommended in the item's own plan; this plan confirms `disabled` alongside it as one consistent mechanism. `name` does **not** propagate: per the item plan's own rationale, native radio-group scoping is per-tree, so cross-shadow-root `name` matching between item inputs never produces mutual exclusion, and `ElementInternals` fully provides form participation without it. See [Decision log](#decision-log).
- **Keyboard model ports behavior-for-behavior onto the already-built `FocusgroupNavigationController`** (`direction: 'both'`, `wrap: true`, `skipDisabled: true`), reacting only to `source: 'keyboard'` so Tab-entry never selects. 1st-gen's model is already APG-correct; this is a direct port, not a redesign.
- **`RadioGroupController` (SWC-2470) stays an open, non-blocking architecture question**, tracked as a subticket of this plan's own ticket (SWC-2546). Whichever way it resolves doesn't change any decision in this plan.
- **Two layout axes, not one:** `label-position` (`top`/`side`, the group's own label placement, newly confirmed via the shared template) and item-stacking `orientation` (`horizontal`/`vertical`) are independent. `orientation` is a new single enum property replacing 1st-gen's separate `horizontal`/`vertical` booleans, matching React Spectrum's identical `orientation` prop (**Q1**, resolved — see [Decision log](#decision-log)).

### Most blocking open questions

_None currently — all resolved; see [Decision log](#decision-log)._

---

## 1st-gen API surface

**Source:** [`1st-gen/packages/radio/src/RadioGroup.ts`](../../../../1st-gen/packages/radio/src/RadioGroup.ts), extending [`1st-gen/packages/field-group/src/FieldGroup.ts`](../../../../1st-gen/packages/field-group/src/FieldGroup.ts)
**Version:** `@spectrum-web-components/radio@1.12.2` (`RadioGroup`); `@spectrum-web-components/field-group@1.12.2` (`FieldGroup`, the shared base)
**Custom element tag:** `sp-radio-group`

`RadioGroup extends FocusVisiblePolyfillMixin(FieldGroup)`, and `FieldGroup extends ManageHelpText(SpectrumElement, { mode: 'external' })`. Two separate 1st-gen packages combine to form the full surface; there is no distinct `sp-radio-group`-only CSS component in `spectrum-css` either — layout comes entirely from the shared `fieldgroup` component (see [CSS custom properties](#css-custom-properties)).

### Properties / attributes

| Property | Type | Default | Attribute | Source | Notes |
| -------- | ---- | ------- | --------- | ------ | ----- |
| `name` | `string` | `''` | `name` (reflect) | `RadioGroup` | **Not** propagated onto items in 2nd-gen; used only for the group's own `FieldAssociationController`-submitted value pair (see [Decision log](#decision-log)). |
| `selected` | `string` | `''` | `selected` (reflect) | `RadioGroup` | The checked item's `value`; single source of truth for the set. |
| `label` | `string` | `''` | `label` | `FieldGroup` | Sets `aria-label` directly (plain string, not an IDREF) — one of the few 1st-gen cross-root label mechanisms that already works correctly today. |
| `invalid` | `boolean` | `false` | `invalid` (reflect) | `FieldGroup` | Only switches which help-text slot renders and drives `:invalid` CSS; **never sets `aria-invalid`** — a real 1st-gen a11y gap (see a11y analysis). |
| `horizontal` | `boolean` | `false` | `horizontal` (reflect) | `FieldGroup` | Item-stacking direction (row), independent of label position. Merged into a single `orientation` property in 2nd-gen (see [Decision log](#decision-log)). |
| `vertical` | `boolean` | `false` | `vertical` (reflect) | `FieldGroup` | Item-stacking direction (column, the default). Merged into a single `orientation` property in 2nd-gen (see [Decision log](#decision-log)). |

No 1st-gen `required` or `readonly` property exists on either class; both are React Spectrum-only concepts (`isRequired`, `isReadOnly`) the a11y analysis recommends adding at the group level in 2nd-gen.

### Methods

| Method | Signature | Source | Notes |
| ------ | --------- | ------ | ----- |
| `focus` | `() => void` | `RadioGroup` (override) | Delegates to `rovingTabindexController.focus()`. |
| `buttons` | `Radio[]` (readonly getter) | `RadioGroup` | **Public**, not implementation detail: `public get buttons(): Radio[]` filters `defaultNodes` to `Radio` instances. Exercised directly in 1st-gen's own tests (`group.buttons.length`), not just used internally. 2nd-gen carry-forward is undecided — see **Q7**. |

`_setSelected()`, `validateRadios()`, and `handleSlotchange()` are implementation detail (`private`/`protected`), not public API.

### Events

- `change`: dispatched (`cancelable: true, bubbles: true, composed: true`) from `_setSelected()` when the selection changes; cancelable, so a listener can call `preventDefault()` to reject the change and have `selected` revert.

### Slots

| Slot | Content | Source | Notes |
| ---- | ------- | ------ | ----- |
| default | The `sp-radio` elements to manage | `RadioGroup` | |
| `help-text` | Default/non-negative help text | `FieldGroup` via `ManageHelpText` | |
| `negative-help-text` | Help text shown when `invalid` | `FieldGroup` via `ManageHelpText` | |

### CSS custom properties

No `--mod-fieldgroup-*` (or equivalent) modifier surface exists at all. `spectrum-css`'s `fieldgroup` component (`components/fieldgroup/index.css`, 54 lines total) is purely structural: `.spectrum-FieldGroup--toplabel`/`--sidelabel` set the outer flex direction (label position), and `.spectrum-FieldGroup--horizontal`/`--vertical` (scoped under `.spectrum-FieldGroupInputLayout`) set the inner item-stacking direction independently. No colors, spacing tokens beyond one `margin-inline-end`, or typography live in this component; those come from the label/description/error rendering the shared `form-fields` fragment owns (see [Migration sequencing and prerequisites](#migration-sequencing-and-prerequisites)) and from each item's own styling (`swc-radio`'s CSS, unaffected by this plan).

### Shadow DOM output (rendered HTML)

1st-gen (`role="group"` default overridden to `"radiogroup"`; help text via `ManageHelpText`, external mode — rendered in the group's own shadow root but associated to *light-DOM* slotted content):

```html
<sp-radio-group role="radiogroup" aria-label="…">
  #shadow-root
    <div class="group" role="presentation">
      <slot></slot>
    </div>
    <!-- ManageHelpText external-mode help/negative-help-text container -->
</sp-radio-group>
```

2nd-gen (planned; host-role exception via `ElementInternals`, `LabellingController`-rendered label/description/error using the shared `form-fields` template, `label-position` grid — see [Public API](#public-api) and [Decision log](#decision-log)):

```html
<swc-radio-group>
  #shadow-root
    <div class="swc-FormFieldTemplate">
      <span class="swc-FormFieldLabel"><slot name="label"></slot></span>
      <div class="swc-RadioGroup-items">
        <slot></slot> <!-- swc-radio items -->
      </div>
      <span class="swc-FormFieldDescription"><slot name="description"></slot></span>
      <!-- swc-FormFieldErrorIcon + error text, only while invalid -->
    </div>
</swc-radio-group>
```

`internals.role = 'radiogroup'`; `internals.ariaLabel`/`ariaLabelledByElements`, `ariaDescribedByElements`, and `ariaInvalid`/`ariaRequired`/`ariaReadOnly` are all set on the host, not an inner element — there is no inner control to delegate to.

---

## Dependencies

| Package | Version | Role |
| ------- | ------- | ---- |
| `@spectrum-web-components/base` | workspace | `SpectrumElement`, decorators. |
| `@spectrum-web-components/field-group` | workspace | `FieldGroup` base class (`label`, `invalid`, `horizontal`/`vertical`, help-text rendering). **Not carried forward as an extension relationship in 2nd-gen** — see [Migration sequencing and prerequisites](#migration-sequencing-and-prerequisites). |
| `@spectrum-web-components/help-text` | workspace | `ManageHelpText` mixin, consumed via `FieldGroup`. **Replaced by `LabellingController` in 2nd-gen**, same as `swc-text-field`. |
| `@spectrum-web-components/shared` | workspace | `FocusVisiblePolyfillMixin`. **Dropped in 2nd-gen** — native `:focus-visible`, same rationale as the item's plan. |
| `@spectrum-web-components/reactive-controllers` | workspace | `RovingTabindexController`. **Replaced by `FocusgroupNavigationController` (already built)** in 2nd-gen. |
| `FocusgroupNavigationController` | already built | Roving tabindex + arrow navigation (`direction: 'both'`, `wrap: true`, `skipDisabled: true`). See [`2nd-gen/packages/core/controllers/focusgroup-navigation-controller/`](../../../../2nd-gen/packages/core/controllers/focusgroup-navigation-controller/focusgroup-navigation-controller.mdx). Already confirmed (in the item's plan) to correctly handle items whose real focus target is nested via `delegatesFocus`. |
| `SlotAttributePropagationController` | already built | Propagates `disabled`, `size`, and `emphasized` from the group onto its slotted `swc-radio` items; not `name` (see [Decision log](#decision-log)). See [`2nd-gen/packages/core/controllers/slot-attribute-propagation-controller/`](../../../../2nd-gen/packages/core/controllers/slot-attribute-propagation-controller/slot-attribute-propagation-controller.mdx). |
| `LabellingController` (SWC-2466) | **not yet built** | In-shadow, host-attached accessible-name/description/error rendering. **Sequenced implementation dependency**, shared with `swc-text-field`. Confirmed needed here (unlike `swc-radio`) — see [Decision log](#decision-log). |
| `FieldAssociationController` (SWC-2467) | **not yet built** | `ElementInternals` form participation — now handles both value (`setFormValue`, driven by the group's own `selected`) and validity (`setValidity`/`checkValidity`), per Q12's resolution in the item's plan. **Sequenced implementation dependency**, shared with `swc-text-field`. |
| Shared `form-fields` `_lit-styles/` stylesheet + render template | **not yet built** | Verified absent from `2nd-gen/packages/swc/stylesheets/_lit-styles/`. Still only a proposal in [`text-field/migration-plan.md`](../text-field/migration-plan.md#related-components-and-ordering-notes). **Sequenced implementation dependency**; `swc-radio-group` is confirmed as its second consumer per direction for this plan. |

`RadioGroupController` (SWC-2470) is explicitly **not** a dependency decision this plan makes; see [Migration sequencing and prerequisites](#migration-sequencing-and-prerequisites).

---

## Open gen1 issues

<!-- Queried live: `project = SWC AND component = "Radio" AND type in (Bug, Story) AND status != Done` (no distinct "Radio Group" Jira component exists; group-related issues, e.g. SWC-1178, are filed under "Radio"). Every open, non-Done result carries an `a11y` or `gen2` label, so none qualify for this table. -->

**None found** outside of ones carrying the `a11y` label. [SWC-1178](https://jira.corp.adobe.com/browse/SWC-1178), "visible group label missing," is the one relevant a11y-labelled issue and is already tracked in this doc's own [Related 1st-gen accessibility (Jira)](../radio-group/accessibility-migration-analysis.md#related-1st-gen-accessibility-jira) table in the a11y analysis — no action needed here.

## Migration sequencing and prerequisites

### Dependency-aware recommendation

`swc-radio-group` does not extend another 2nd-gen component. 1st-gen's `RadioGroup extends FieldGroup` inheritance is **not** carried forward as a shared-base relationship: `swc-field-group` has not been migrated, and per the forms strategy RFC's direction (already applied to `swc-text-field`), label/description/error rendering moves to a composed controller (`LabellingController`) rather than an inherited base class. If `swc-field-group` is migrated later, it should compose the same controllers `swc-radio-group` does, not the other way around.

Three not-yet-built shared resources gate implementation, all currently in progress on `swc-text-field`'s unmerged work (epic SWC-2323):

1. **`FieldAssociationController` (SWC-2467).** Let `swc-text-field` finish proving it out first (already the designated first consumer); `swc-radio-group` adopts it once available. Unlike the item's plan (which dropped this dependency entirely per Q12), the group's use is confirmed and unaffected by that resolution — Q12 only decided *where* form-value participation lives (the group, not the item), not *whether* the group needs the controller.
2. **`LabellingController` (SWC-2466).** Same sequencing: wait for `swc-text-field`, then adopt. Confirmed needed here (see [Decision log](#decision-log) for why this differs from the item's rejection of it).
3. **Shared `form-fields` `_lit-styles/` stylesheet and render template.** Per explicit direction, `swc-radio-group` is confirmed as its second consumer. This does not yet exist in code on any branch (verified). No accommodation is needed for a non-field, host-role-exception consumer (**Q6**, resolved — see [Decision log](#decision-log)): the template only governs the render tree, independent of where ARIA role attaches. `swc-radio-group`'s own item-stacking axis (`orientation`) is independent of this template and does not affect its design.

Do not duplicate any of the three above inside `swc-radio-group` while waiting; coordinate scheduling instead.

### Related components and ordering notes

- **`swc-radio`**: the coordinated item; separate migration and plan, already largely resolved. This plan treats `radio/migration-plan.md`'s decisions as authoritative input (see banner) and does not re-open them. The item exposes a minimal `select()`/`deselect()`-style hook for this component to call; that hook's exact shape is this plan's decision (see [Architecture: core vs SWC split](#architecture-core-vs-swc-split)), independent of whether `RadioGroupController` (SWC-2470) ends up composing it or `swc-radio-group` does so inline.
- **`RadioGroupController` (SWC-2470)**: tracked as a subticket of this plan's own ticket (SWC-2546), not resolved here. Whichever way it resolves (dedicated controller vs. inline composition) does not change any API or behavioral decision in this plan — every responsibility below is described in terms of *what* must happen (sibling discovery, mutual exclusion, roving focus, form participation, ARIA), not *which class* implements it.
- **`swc-field-group`**: not yet migrated; see the "not carried forward as a shared base" note above. No ordering dependency on this plan. Deferred rather than scheduled here: 1st-gen `sp-field-group` is a standalone component whose primary real-world use is grouping `sp-checkbox` elements (no separate 1st-gen `CheckboxGroup` class exists), so its migration shares responsibility with the Checkbox epic rather than Radio Group's. **SWC-2548** is a research spike, attached to the Checkbox epic, deciding whether `swc-field-group` migrates as part of that epic's scope, as independent coordinated work, or stays deferred; if migration is recommended, it's a candidate to adopt the same `LabellingController`/shared `form-fields` template pattern this plan establishes, generalizing beyond the current two consumers (`swc-text-field`, `swc-radio-group`).
- **Checkbox / other grouped-selection patterns** (swatch groups, segmented controls, select groups, toggle button groups): named in the a11y analysis as potential future consumers of whatever `RadioGroupController` research concludes. None are in scope here; not this plan's decision to make.
- **Global element stylesheet**: no `stylesheets/global/global-radio-group.css` is anticipated; mark **N/A** unless Design requests a global baseline.

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
| B1 | Rename `label` → slotted `label` content | Plain string `label` property, sets `aria-label` directly | Visible label via a named `label` slot, rendered by `LabellingController`; `accessible-label`/`accessible-labelledby` added for the no-visible-label / composed-name cases | Move slotted content from a plain attribute to `<span slot="label">…</span>`, or use `accessible-label` for the no-visible-label case. |
| B2 | Rename `help-text`/`negative-help-text` slots → `description`/`error-text` | `ManageHelpText`-provided slots | Named slots matching `swc-text-field`'s renamed slots and the shared `form-fields` template's class names | Rename `slot="help-text"` → `slot="description"`, `slot="negative-help-text"` → `slot="error-text"`. |
| B3 | Add `required` | No equivalent | New property, React Spectrum `isRequired` parity; sets `aria-required` via `ElementInternals` | Additive; no consumer action unless adopting. |
| B4 | Add `accessible-label`/`accessible-labelledby`/`accessible-describedby` | No equivalent | New properties, wired by `LabellingController` onto the host's own `ElementInternals` (`ariaLabel`/`ariaLabelledByElements`/`ariaDescribedByElements`) — the host-attached counterpart to what the item's plan rejected for itself | Additive; slotted-label usage is unaffected. |
| B13 | Rename `horizontal`/`vertical` boolean pair → `orientation` enum property | Two independent boolean attributes (`horizontal`, `vertical`) | Single `orientation: 'horizontal' \| 'vertical'` property (default `vertical`), matching React Spectrum's identical `orientation` prop | Replace `horizontal`/`vertical` attribute with `orientation="horizontal"`, or omit for the default `vertical`. |

#### Styling and visuals

| #   | What changes | 1st-gen behavior | 2nd-gen behavior | Consumer migration path |
| --- | ------------ | ---------------- | ---------------- | ----------------------- |
| B5 | Consume the shared `form-fields` template | Own hand-rolled `<div class="group">` wrapper | `.swc-FormFieldTemplate` grid shared with `swc-text-field`, with a `label-position` (`top`/`side`) variant | None for normal usage; new `label-position` attribute available. |
| B6 | `--mod-*` surface: none existed, none added | No modifier surface | Not exposed; matches 1st-gen (nothing to remove) | None. |

#### Accessibility and behavior

| #   | What changes | 1st-gen behavior | 2nd-gen behavior | Consumer migration path |
| --- | ------------ | ---------------- | ---------------- | ----------------------- |
| B7 | Add `aria-invalid` | Never set (real 1st-gen gap; `invalid` only swaps help-text slot and CSS) | Set via `ElementInternals` when `invalid` is `true` | None (additive AT fix). |
| B8 | Add `aria-readonly` at the group level | No equivalent (item-level `readonly` existed on `sp-radio` but was unenforced; see item plan) | New `readonly` property on `swc-radio-group`, sets `aria-readonly`; blocks selection changes while keeping focus movement | Additive for consumers using the item-level `readonly` today: move to the group. |
| B9 | Form value **and** validity, both on the group | Not applicable (no `ElementInternals` at all in 1st-gen) | Single `FieldAssociationController` instance handles `setFormValue` (driven by `selected`) and `setValidity`/`checkValidity` together (Q12-simplified; source: [Decision log](#decision-log)) | None for basic forms; gains real `FormData` participation and native constraint validation. |
| B10 | `disabled` propagation via `SlotAttributePropagationController` | Ad hoc `slotchange` loop propagated `name`; no `disabled` propagation at all | `disabled` propagated automatically via the shared controller, alongside `size`/`emphasized` (already recommended in the item's plan); `name` is dropped (serves no purpose on items, see [Decision log](#decision-log)) | None; propagation is automatic. |
| B11 | Keyboard model ports to `FocusgroupNavigationController` | `RovingTabindexController`, already APG-correct | Same behavior (`direction: 'both'`, `wrap: true`, `skipDisabled: true`, reacting only to `source: 'keyboard'`), different controller | None (internal implementation change; behavior-for-behavior port). |
| B12 | Help/error container: no default `aria-live` | Defaults to `aria-live="assertive"` unconditionally | No default live region for the common case (already-associated `aria-describedby`/`aria-errormessage` covers it); `polite` only if a genuine focus-elsewhere case is found | None. |
| B14 | Dev-mode warning for duplicate `value`s among slotted radios | No detection; selection matching by `value` (see [Behavioral semantics](#behavioral-semantics)) silently breaks mutual exclusion if two items share a `value` | Console warning, dev-mode only, when two or more slotted `swc-radio` items share the same `value` | None (dev-time only; no behavior change). |

### Additive — ships when ready, zero breakage for consumers already on 2nd-gen

| #   | What is added | Notes |
| --- | -------------- | ----- |
| A1 | Additional `--swc-*` custom properties | Add only on confirmed need post-ship; 1st-gen exposed none at all. |

---

## 2nd-gen API decisions

These are derived from the 1st-gen implementation, `radio/migration-plan.md` (priority source per the banner), the [accessibility migration analysis](./accessibility-migration-analysis.md), the `spectrum-css` `fieldgroup` component, the Figma reference supplied for this plan, the approved forms strategy (SWC-1888), and React Spectrum. Confirmed items are marked; open items are tracked in [Blockers and open questions](#blockers-and-open-questions).

- **Confirmed**: directly supported by source material
- **Inferred**: recommended based on multiple signals, but not explicitly specified in one authoritative source
- **Open question**: unresolved and needs review or more input

### Public API

#### Properties / attributes (2nd-gen)

| Property | Type | Default | Attribute | Notes |
| -------- | ---- | ------- | --------- | ----- |
| `name` | `string` | `''` | `name` (reflect) | **Confirmed.** Used only by the group's own `FieldAssociationController`-submitted value pair; **not** propagated onto items' inner inputs (see [Decision log](#decision-log) for why that would serve no purpose). |
| `selected` | `string` | `''` | `selected` (reflect) | **Confirmed.** Consumer-settable (attribute or property), not internal-only state; ported as-is from 1st-gen. Single source of truth: on first update, a child's own declarative `checked` takes precedence and is read up into `selected`; afterward `selected` drives every child's `checked` back down (`validateRadios`-equivalent sync) and `setFormValue` (see the item plan's checked-state-flow section). |
| `invalid` | `boolean` | `false` | `invalid` (reflect) | **Confirmed.** Now drives real `aria-invalid` (B7), not just CSS/slot-swapping. |
| `required` | `boolean` | `false` | `required` (reflect) | **Confirmed (new).** React Spectrum `isRequired` parity; sets `aria-required`. Presentation of the required indicator itself (asterisk icon vs. `(required)` text — React Spectrum's `necessityIndicator`) is not this component's decision: it's rendered by the shared `LabellingController`/`form-fields` template and already tracked as open, cross-cutting work at [`text-field/migration-plan.md`](../text-field/migration-plan.md) Q4/A4 (there named `isRequiredWithoutAsterisk`, the same underlying capability). |
| `readonly` | `boolean` | `false` | `readonly` (reflect) | **Confirmed (new, relocated from the item).** Blocks selection changes; keeps focus movement working. |
| `label-position` | `'top' \| 'side'` | `'top'` | `label-position` (reflect) | **Confirmed.** Matches the shared `form-fields` template's grid variant and `swc-text-field`'s identical property; confirmed present in the supplied Figma reference for every size. |
| `orientation` | `'horizontal' \| 'vertical'` | `'vertical'` | `orientation` (reflect) | **Confirmed (renamed, B13).** Replaces 1st-gen's separate `horizontal`/`vertical` booleans with a single enum, matching React Spectrum's identical `orientation` prop; independent of `label-position`. |
| `accessible-label` / `accessible-labelledby` / `accessible-describedby` | string / element refs / element refs | — | (reflect where applicable) | **Confirmed (new).** Wired by `LabellingController` onto the host's own `ElementInternals`; see [Decision log](#decision-log) for why this is warranted here but was rejected for the item. |
| `label` (1st-gen plain string) | — | — | — | **Removed** (see B1); superseded by the `label` slot + `accessible-label`. |

#### Visual matrix (2nd-gen)

Based on the Figma size/state/label-position matrix supplied for this plan:

| Axis | Values |
| ---- | ------ |
| Size | `s` (Small), `m` (Medium), `l` (Large), `xl` (Extra large) — matches the item's own size axis |
| Label position | `top`, `side` |
| Interaction state | Default, Error, Disabled |
| Content | Group description text (below the items); error message with icon (replaces/joins the description while invalid) |

Additional Figma-confirmed presentation notes:

- Every size × label-position combination is shown in both Default and Error states, plus one Disabled row; no separate `readonly` or `required` visual treatment appears in the supplied reference — open, see **Q3**.
- The reference only shows vertically-stacked items; horizontal `orientation`'s continued visual support is confirmed via React Spectrum's identical prop (**Q1**, resolved) even though this specific Figma reference doesn't depict it.
- No item-level `emphasized` variation appears at the group level in this reference (expected — `emphasized` is an item-level visual property, unaffected by the group).

#### Slots (2nd-gen)

| Slot | Content | Notes |
| ---- | ------- | ----- |
| default | The `swc-radio` items to manage | **Confirmed.** Unchanged in kind from 1st-gen (default slot for items), though naming/rendering of label and description move to named slots (see below). |
| `label` | Visible group label | **Confirmed.** Named slot, rendered by `LabellingController` via the shared `form-fields` template — see B1. |
| `description` | Group-level guidance text | **Confirmed (renamed).** Was 1st-gen `help-text`; renamed to match `swc-text-field` and the shared template's class naming (see B2). |
| `error-text` | Error message shown when `invalid` | **Confirmed (renamed).** Was 1st-gen `negative-help-text` (see B2). Also targeted by `aria-errormessage` when invalid. |

#### CSS custom properties (2nd-gen)

No `--mod-*` properties will be exposed (1st-gen had none to remove). New `--swc-*` component-level properties may be introduced where needed. See [Component Custom Property Exposure](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/02_custom-properties.md#component-custom-property-exposure).

Each exposed `--swc-*` property must be documented with a `@cssprop` JSDoc tag on the primary SWC component class.

Initial expectation for Radio Group is a minimal set, likely limited to inter-item spacing overrides, since most visual weight lives in the shared `form-fields` template and in each item's own styling.

### Behavioral semantics

- **Selection matching is by `value`, not identity or index.** `selected` holds a plain string that must match a slotted item's own `value` property (ported unchanged from 1st-gen `RadioGroup.ts`: `_setSelected` resolves the target via `sp-radio[value="..."]`, and the reconciliation pass sets `button.checked = this.selected === button.value` across every item). There is no id- or index-based addressing at all — `value` is the only identity `swc-radio-group` has for its items, exactly like a native `<input type="radio" value="...">` set. **Edge case carried forward unchanged:** nothing enforces `value` uniqueness among slotted items. Two items sharing the same `value` doesn't error; it silently breaks mutual exclusion, since the reconciliation pass checks *every* item whose `value` matches, not just one. 1st-gen ships with no detection for this. **Mitigation (new, B14):** a dev-mode-only console warning when two or more slotted `swc-radio` items share a `value`, following this repo's existing dev-warning pattern for misuse (e.g. the item plan's B15 standalone-usage warning).
- **Sibling discovery and mutual exclusion:** a cache-authoritative selection primitive (the a11y doc's `SelectionController` concept), not `LiveSelectionController` (documented as the wrong fit for radio groups). The group is the single source of truth for which item is checked; items are passive and only propose changes. Whether this is composed via `RadioGroupController` or inline is SWC-2470's open, non-blocking question.
- **Keyboard and focus:** `FocusgroupNavigationController` (`direction: 'both'`, `wrap: true`, `skipDisabled: true`) drives movement; the group reacts only to `focusgroupNavigationActiveChange` events with `source: 'keyboard'` to select, so Tab-entry and programmatic `.focus()` never select on their own (matches the item plan's checked-state-flow "imperative sync" direction).
- **Form participation:** one `FieldAssociationController` instance handles both `setFormValue` (from `selected`) and constraint validity (`setValidity`/`checkValidity`), per Q12's resolution. Does not set `internals.role` — role comes from the separate `internals.role = 'radiogroup'` assignment.
- **Coordinated reset:** `formResetCallback()` restores the group's tracked default-checked item, not just an empty selection, then drives every item's `checked` back in sync (the item plan's "imperative sync" direction, triggered by reset instead of user interaction).
- **Read-only:** every item stays focusable and reachable via Tab/arrows; only the "also checks it" half of `Space`, arrow movement, Home, and End is suppressed.
- **Disabled cascade:** the group's own `disabled` propagates explicitly to every item via `SlotAttributePropagationController`; it does not rely on the native `fieldset[disabled]` cascade (each item is not independently form-associated after Q12, so there's no per-item `formDisabledCallback` to fire).

### Accessibility semantics notes (2nd-gen)

Authoritative source: [accessibility migration analysis](./accessibility-migration-analysis.md), read together with `radio/migration-plan.md`'s Q12 resolution where the two differ (see banner). Key points: `role="radiogroup"` is host-role-exception via `ElementInternals` (no native element exists to hang it on, unlike the item); accessible name/description/error resolve through `LabellingController` in precedence order `accessible-labelledby` > `accessible-label` > slotted label, all attached to the host; `aria-invalid`/`aria-required`/`aria-readonly` are all new-or-fixed group-level states; form value **and** validity both live on the group's single `FieldAssociationController` instance; keyboard model is a direct, behavior-preserving port to `FocusgroupNavigationController`.

---

## Architecture: core vs SWC split

> The 1st-gen component is a **reference only** — 2nd-gen is built independently. Neither generation imports from the other.

Follow the [Badge migration reference](../../02_workstreams/02_2nd-gen-component-migration/02_step-by-step/01_washing-machine-workflow.md#reference-badge-migration) as the concrete pattern for the core/SWC split.

| Layer    | Path                                                  | Contains                                                                                                                                                                                                                                                                              |
| -------- | ------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Core** | `2nd-gen/packages/core/components/radio-group/` | `RadioGroup.base.ts`, `RadioGroup.types.ts`, `selected`/validity normalization, wiring of `FieldAssociationController`, `LabellingController`, `FocusgroupNavigationController`, and `SlotAttributePropagationController`, and the minimal `select()`/`deselect()`-style hook exposed to items. No rendering. |
| **SWC**  | `2nd-gen/packages/swc/components/radio-group/`  | `RadioGroup.ts`, `radio-group.css`, `swc-radio-group` registration, stories, tests, and the specific S2 rendering/styling, consuming the shared `form-fields` template. |

Planned rendering shape:

- Core owns API normalization, selection/validity state, and all four controllers' wiring.
- SWC renders: the shared `.swc-FormFieldTemplate` grid (via the shared render-template function, once it exists) for label/description/error, plus an item-stacking wrapper (driven by `orientation`) around the default slot holding the `swc-radio` items.

**Relationship to `swc-radio`.** This plan's decisions hold regardless of how `swc-radio` itself is implemented (already largely resolved in its own plan). The item's exposed `select()`/`deselect()`-style hook is this plan's decision to shape, informed by whichever way SWC-2470 resolves, but not blocked by it.

---

## Migration checklist

<!-- Adjust the following checklists as needed. New sections may be added under API for clarity. Keep the stable baseline checklist items unless they are truly not applicable; prefer additive edits over removing them. -->

### Preparation (this ticket)

- [x] 1st-gen API surface documented
- [x] Dependencies identified
- [x] Breaking changes documented
- [x] 2nd-gen API decisions drafted
- [ ] Plan reviewed by at least one other engineer

### Setup

- [ ] Create `2nd-gen/packages/core/components/radio-group/`
- [ ] Create `2nd-gen/packages/swc/components/radio-group/`
- [ ] Wire exports in both `package.json` files
- [ ] Confirm this component lands on the shared `swc-radio`/`swc-radio-group` feature branch (see [`radio/migration-plan.md`](../radio/migration-plan.md#related-components-and-ordering-notes))
- [ ] Confirm `FieldAssociationController`, `LabellingController`, and the shared `form-fields` stylesheet/template are available to depend on, or coordinate scheduling with the `swc-text-field` work building them

### API

#### Naming and public surface

- [ ] `RadioGroup.types.ts`: define the `label-position` union (`top`/`side`, default `top`); export public types
- [ ] `RadioGroup.base.ts`: implement `name`, `selected`, `invalid`, `required`, `readonly`, `label-position`, `accessible-label`/`accessible-labelledby`/`accessible-describedby`
- [ ] Rename `help-text`/`negative-help-text` slots to `description`/`error-text` (B2)
- [ ] Implement the `orientation` enum property (`horizontal`/`vertical`, default `vertical`), replacing 1st-gen's boolean pair (B13)
- [ ] Implement the dev-mode duplicate-`value` warning (B14)

#### Alignment checks

- [ ] Verify property names and defaults against the Figma size/label-position/state matrix and [React Spectrum RadioGroup](https://react-spectrum.adobe.com/RadioGroup)
- [ ] Confirm the `LabellingController` host-attachment mode (vs. the item's inner-input mode) with the a11y reviewer once the controller's shape is settled

### Styling

> Follow the [CSS style guide](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/) as the source of truth for all styling work. Key references: [migration steps](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/04_spectrum-swc-migration.md), [custom properties](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/02_custom-properties.md), [anti-patterns](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/05_anti-patterns.md).

- [ ] Add `.swc-RadioGroup` to the internal semantic wrapper in `render()`; keep styling off `:host`
- [ ] Copy S2 source from `spectrum-css` `spectrum-two` branch `components/fieldgroup/index.css` (not `/dist`) into `radio-group.css` as baseline for the item-stacking/label-position layout
- [ ] Consume the shared `form-fields` `_lit-styles/` fragment and render template once available (B5); do not author a parallel implementation while waiting

#### Visual model and regressions

- [ ] Add `@cssprop` JSDoc tag to the primary SWC component class for every exposed `--swc-*` property
- [ ] Pass stylelint (property order, `no-descending-specificity`, token validation)

### Accessibility

<!-- Sourced from accessibility-migration-analysis.md summary checklist, reconciled with radio/migration-plan.md's Q12 per the banner. -->

#### Naming and semantics

- [ ] `role="radiogroup"` set via `ElementInternals` on the host, fixed and never author-overridable
- [ ] Accessible name/description/error resolve through `LabellingController`, attached to the host (not an inner control)
- [ ] `aria-invalid` added when `invalid` (B7, real 1st-gen gap fix)
- [ ] `aria-required`/`aria-readonly` implemented at the group level

#### State verification

- [ ] Exactly one item ever exposes `aria-checked="true"` after any selection change
- [ ] `FieldAssociationController` handles both `setFormValue` and validity from one instance (B9); does not set `internals.role`
- [ ] `disabled`/`size`/`emphasized` propagate to every slotted radio via `SlotAttributePropagationController`; `name` does not
- [ ] Arrow/Home/End movement always selects; Tab-entry and programmatic `.focus()` never do (reacting only to `source: 'keyboard'`)
- [ ] Disabled items are fully skipped by both Tab-entry and arrow movement
- [ ] Coordinated reset restores the default-checked item, not just an empty selection
- [ ] Help/error container does not default to `aria-live="assertive"` (B12)
- [ ] Duplicate `value`s among slotted radios trigger the dev-mode console warning (B14)

### Testing

<!-- Fill in comprehensive test cases -->

- [ ] Port `1st-gen/packages/radio/test/radio-group.test.ts` coverage that still applies
- [ ] Add Playwright `radio-group.a11y.spec.ts` with `toMatchAriaSnapshot`

#### Behavior

- [ ] All four arrow keys move focus and select, with wraparound
- [ ] `Space` checks a focused, unchecked item independent of arrow movement
- [ ] Read-only keeps focus movement but blocks selection change
- [ ] `change` event is cancelable; a cancelled change reverts `selected`
- [ ] Two slotted radios sharing a `value` trigger the dev-mode console warning (B14); production build is silent

#### Visual regression

<!--
Retain this section for any components with visual rendering, modifying as needed for the component's specs and variants. Replace the example bullets below with VRT items that match this component, and reference real bug tickets only when they apply to this component.
-->

- [ ] Add VRT coverage for the size × label-position × state matrix confirmed in [Visual matrix (2nd-gen)](#visual-matrix-2nd-gen)
- [ ] Add VRT coverage for both `orientation` values (`horizontal`/`vertical`)
- [ ] Add focus-visible regression coverage for the roving focus indicator as it moves between items
- [ ] Add forced-colors (high-contrast) coverage for invalid/disabled/read-only states

### Documentation

<!-- Notes of what to include in documentation -->

#### General

- [ ] JSDoc on all public props, slots, and CSS custom properties
- [ ] Storybook stories cover both `swc-radio-group` and `swc-radio` together, since the item has no standalone docs page (per [`radio/migration-plan.md`](../radio/migration-plan.md))

#### Breaking changes

- [ ] Consumer migration guide entries for B1–B4 (label/slot renames, new `required`/`accessible-*` properties) and B8 (`readonly` moves from the item to the group)

### Review

- [ ] `yarn lint:2nd-gen` passes (ESLint, Stylelint, Prettier)
- [ ] Status table in workstream doc updated
- [ ] PR created against the shared `swc-radio`/`swc-radio-group` feature branch (not directly against `main`), with a description referencing Epic SWC-2348
- [ ] Peer engineer sign-off

---

## Blockers and open questions

During drafting, this section tracks active blockers and open questions. In the final review-ready plan, once core migration questions are resolved and deferred tickets exist, replace those drafting-time rows with a concise deferred-ticket table.

### Design

| #   | Item | Blocking? | Status | Owner |
| --- | ---- | --------- | ------ | ----- |
| Q3 | No distinct visual treatment for `required` or `readonly` appears in the supplied Figma reference. Confirm whether that's intentional (matching the item's own read-only-has-no-distinct-treatment precedent) or the reference simply doesn't cover those states yet. | No | Open | Design |

### Architecture and behavior

| #   | Item | Blocking? | Status | Owner |
| --- | ---- | --------- | ------ | ----- |
| Q4 | `RadioGroupController` (SWC-2470) architecture decision. Genuinely unresolved; tracked as a subticket of this plan's own ticket (SWC-2546). Does not block this plan — see [Related components and ordering notes](#related-components-and-ordering-notes). | No | Tracked as a subticket of SWC-2546, not blocking here | Architecture |
| Q5 | `FieldAssociationController` and `LabellingController` do not exist yet (verified absent from `2nd-gen/packages/core/controllers/`). Sequenced delivery tracked under `swc-text-field`'s epic (SWC-2323), not a blocker to this plan. | No | Open: track `swc-text-field`'s controller delivery | Architecture |
| Q7 | 1st-gen's public `buttons` getter (`Radio[]` over slotted children, exercised directly in 1st-gen's own tests) has no proposed 2nd-gen equivalent in this plan. Decide whether to carry it forward, drop it as a documented breaking removal, or point consumers at standard DOM query instead. | No | Open | Architecture |

### Scope and prerequisites

| #   | Item | Blocking? | Status | Owner |
| --- | ---- | --------- | ------ | ----- |

_None currently — all resolved; see [Decision log](#decision-log)._

---

## Decision log

Resolved decisions from planning, kept here as a historical record so [Blockers and open questions](#blockers-and-open-questions) stays focused on what's still unresolved. Entries retain their original `Q`/`B` identifiers where one existed, so inline references elsewhere in the plan still resolve here. Going forward, when a blocker or open question is resolved, move its row here with a what/why summary instead of leaving it in the Blockers tables.

| Ref | Decision | Rationale / context |
| --- | -------- | -------------------- |
| — | `radio/migration-plan.md`'s resolved decisions take priority over `radio-group/accessibility-migration-analysis.md` wherever they conflict. | Explicit direction. The a11y doc predates the item plan's Q12 resolution and describes a value/validity split Q12 supersedes (all form-value participation moves to the group; see the next entry). **Q12 is now officially signed off by the a11y SME.** `radio/accessibility-migration-analysis.md` (the item's own doc) has already been corrected to match, as precedent; this doc's own per-item-value language (see [Related recommendations: `<swc-radio-group>`](../radio-group/accessibility-migration-analysis.md#recommendations-swc-radio-group)) has been corrected to match as well. |
| — | `FieldAssociationController` on `swc-radio-group` handles both form value (`setFormValue`, from `selected`) and constraint validity (`setValidity`/`checkValidity`) from one instance, not a split between per-item value and group-only validity. | Direct consequence of the item plan's Q12: since the item no longer participates in form value at all, the a11y doc's originally-proposed "lighter, validity-only" group wiring is no longer lighter than anything — it's the *only* wiring, so it may as well be the full controller. |
| — | `LabellingController` is a confirmed dependency for `swc-radio-group`, despite being rejected for `swc-radio` itself. | The group has no native "radiogroup" equivalent at all, so `ElementInternals`-based host attachment is the only mechanism available for its accessible name/description/error, which is exactly what `LabellingController` is being built to provide. Why the item rejected it: [`radio/migration-plan.md`](../radio/migration-plan.md#decision-log) (Q5/B5); that reasoning doesn't transfer here since it depended on a native element the group doesn't have. |
| — | `swc-radio-group` is confirmed as the shared `form-fields` `_lit-styles/` stylesheet and render template's second consumer, resolving that fragment's ownership question by precedent. `swc-radio` (the item) explicitly remains a non-consumer. | Explicit direction for this plan. The `spectrum-css` `fieldgroup` component's own `--toplabel`/`--sidelabel` modifiers independently confirm the group's layout need matches the shared template's `label-position` axis, not a coincidence being forced onto the component. |
| — | No dedicated rendering-and-styling migration analysis is needed for this component. | `swc-radio-group` reuses the shared `form-fields` styles and render template rather than authoring its own CSS mapping, so the usual per-component CSS-inventory doc doesn't apply here. |
| Q6 | The shared `form-fields` stylesheet/render template's design generalizes cleanly to `swc-radio-group` despite it being a host-role-exception consumer with no inner control, unlike `swc-text-field`. No accommodation is needed. | The template only governs the render tree: a `.swc-FormFieldTemplate` wrapper containing `LabellingController`-rendered label/description/error plus content — a real `<input>` for `swc-text-field`, the slotted `swc-radio` items here. It says nothing about *where* ARIA role attaches. Role placement (`internals.role` on the host vs. delegated to an inner control) is decided independently via `ElementInternals`, so it doesn't constrain or complicate the shared template. Structurally identical to `swc-text-field`; only the slotted content differs. |
| — | The [Open gen1 issues](#open-gen1-issues) table is empty. | Queried live: `project = SWC AND component = "Radio"` (no distinct "Radio Group" component exists). Every result carries an `a11y` or `gen2` label and is excluded by the documented exclusion rule; none qualify. |
| — | `name` does not propagate from `swc-radio-group` onto its slotted items. | Same rationale as the item plan: native radio-button-group scoping is per-tree, so cross-shadow-root `name` matching between item inputs never produces native mutual exclusion, and `ElementInternals` fully provides form participation without it. Propagating it would be purely cosmetic with no functional benefit, so it's dropped rather than added for parity's sake alongside `disabled`/`size`/`emphasized`. |
| B14 | Duplicate-`value` misuse is mitigated with a dev-mode console warning, not a runtime error or auto-dedup. | Matches this repo's existing dev-warning pattern for accessibility/correctness safety nets on misuse patterns (e.g. the item plan's B15 standalone-usage warning). The condition is a consumer authoring mistake, not a state a running app should ever hit in production; warning (rather than throwing or silently renaming/ignoring the duplicate) surfaces it during development without changing runtime behavior for anyone not hitting the bug. |
| Q1 | Horizontal item stacking remains supported, confirmed via React Spectrum's identical `orientation` prop even though the supplied Figma reference only shows vertical stacking. | 1st-gen's two independent `horizontal`/`vertical` booleans are merged into a single `orientation: 'horizontal' \| 'vertical'` property (default `vertical`), matching `label-position`'s enum pattern and React Spectrum's own naming (B13). |

---

## References

- [Washing machine workflow](../../02_workstreams/02_2nd-gen-component-migration/02_step-by-step/01_washing-machine-workflow.md)
- [2nd-gen migration status table](../../02_workstreams/02_2nd-gen-component-migration/01_status.md)
- [Accessibility migration analysis](./accessibility-migration-analysis.md) — authored before Q12; see banner and [Decision log](#decision-log) for where this plan supersedes it
- [Radio migration plan](../radio/migration-plan.md) — the coordinated item's plan; priority source for this plan per the banner
- [Text field migration plan](../text-field/migration-plan.md) — source of `FieldAssociationController`/`LabellingController` sequencing and the shared `form-fields` stylesheet/template this plan consumes as second confirmed consumer (not yet merged at time of drafting)
- [`FocusgroupNavigationController`](../../../../2nd-gen/packages/core/controllers/focusgroup-navigation-controller/focusgroup-navigation-controller.mdx) — already-built controller this plan uses for roving tabindex and arrow navigation
- [`SlotAttributePropagationController`](../../../../2nd-gen/packages/core/controllers/slot-attribute-propagation-controller/slot-attribute-propagation-controller.mdx) — already-built controller this plan uses to propagate `disabled`/`size`/`emphasized` onto items (not `name`, see [Decision log](#decision-log))
- [Forms strategy RFC (SWC-1888)](../../05_strategies/forms-strategy-rfc.md)
- [CSS style guide — Component Custom Property Exposure](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/02_custom-properties.md#component-custom-property-exposure)
- [1st-gen source: RadioGroup](../../../../1st-gen/packages/radio/src/RadioGroup.ts)
- [1st-gen source: FieldGroup](../../../../1st-gen/packages/field-group/src/FieldGroup.ts)
- [1st-gen tests](../../../../1st-gen/packages/radio/test/radio-group.test.ts)
- [1st-gen README](../../../../1st-gen/packages/radio/README.md)
- [React Spectrum RadioGroup](https://react-spectrum.adobe.com/RadioGroup)
- [Spectrum CSS — `spectrum-two` branch, `components/fieldgroup/index.css`](https://github.com/adobe/spectrum-css/tree/spectrum-two/components/fieldgroup): reviewed via a sibling checkout; no distinct `radio-group` CSS component exists
- [Badge migration reference](../../02_workstreams/02_2nd-gen-component-migration/02_step-by-step/01_washing-machine-workflow.md#reference-badge-migration)
- Epic: SWC-2348, Radio migration epic (covers both `swc-radio` and `swc-radio-group`)
- SWC-2546, "[Radio Group] Analyze component and create migration plan" — **this document is its deliverable**
- SWC-2470, `RadioGroupController` research spike — subticket of SWC-2546, tracked in [Blockers and open questions](#blockers-and-open-questions) as Q4
- SWC-2548, research spike deciding whether `swc-field-group`'s migration is scoped with the Checkbox epic (SWC-2340) — see [Related components and ordering notes](#related-components-and-ordering-notes)
- SWC-2466, `LabellingController` — confirmed dependency for this component (see [Decision log](#decision-log))
- SWC-2467, `FieldAssociationController` — confirmed dependency for this component, now handling both value and validity (see [Decision log](#decision-log))
- SWC-1178, open a11y bug: visible group label missing — already tracked in the [accessibility migration analysis](./accessibility-migration-analysis.md#related-1st-gen-accessibility-jira)

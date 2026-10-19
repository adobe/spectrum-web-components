<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../../README.md) / [Project planning](../../README.md) / [Components](../README.md) / Switch / Switch migration plan

<!-- Document title (editable) -->

# Switch migration plan

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
- [React Spectrum S2 API surface](#react-spectrum-s2-api-surface)
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

> **Epic SWC-####** · Planning output. Must be reviewed before implementation begins.
>
> **Status: provisional draft.** The epic number (Q11), the Figma `S2 / Web` PNG (Q1), and the Jira-sourced open gen1 issues table (Q12) were not available while drafting. Sections that depend on them are marked **provisional**. The [accessibility migration analysis](./accessibility-migration-analysis.md) is authoritative for gen2 semantics. The in-flight [checkbox migration plan (#6834)](https://github.com/adobe/spectrum-web-components/pull/6834) is treated as the closest precedent: switch shares the same native-input-in-shadow-DOM and form-associated foundation, and this plan deliberately aligns with checkbox's decisions so the two toggle controls behave the same way wherever their semantics overlap.

---

## TL;DR

- **Same foundation as `swc-checkbox`, different role.** gen2 keeps a real native `<input type="checkbox">` in the shadow root, now rendered with `role="switch"` declaratively (1st-gen sets it imperatively in `firstUpdated()` and hand-writes `aria-checked`). Role, checked state, and <kbd>Space</kbd> come from the browser. No `indeterminate`/`mixed`: a switch is strictly two-state.
- **Becomes a real form control.** 1st-gen `sp-switch` forwards `name` to a shadow-DOM input, so it never submits with an ancestor `<form>`. gen2 is a form-associated custom element (FACE) with `value`, `required`, reset, restore, and disabled cascade through `FieldAssociationController` (B16, B17, B19).
- **Built on the shared form foundation from the text field epic.** `LabellingMixin` (`label` slot, `accessible-label`, `accessible-labelledby`), `FieldDescriptionMixin` (`description` and `error-text` slots, `accessible-describedby`), and `FieldAssociationController` exist only on the unmerged text field branch ([#6724](https://github.com/adobe/spectrum-web-components/pull/6724)). Switch implementation cannot start before that merges (Q13).
- **Read-only gets fixed (B14).** 1st-gen inherits `CheckboxMixin`'s hack of disabling the inner input, so a read-only switch is announced as disabled and leaves the Tab order. gen2 keeps it focusable, exposes `aria-readonly="true"`, and blocks the toggle, matching checkbox.
- **Largest consumer-facing changes:** label content moves to a named `label` slot (B1); the `Focusable` focus/tabindex proxy surface is removed in favor of `delegatesFocus` (B7); the `checked` attribute becomes the default state (B9); `change` is no longer cancelable (B10); all 46 `--mod-switch-*` properties are removed (B12).
- **Biggest open decision: shared toggle logic with checkbox (Q4).** The checkbox plan chose "no shared base class; extract a mixin if duplication grows during switch's migration." Most of switch's core behavior (B9, B10, B14, B16, B17, B19) is identical to checkbox's, so this plan recommends extracting that logic into a shared core mixin during switch's API phase. This needs explicit confirmation.

### Most blocking open questions

- **Q4** in [Architecture and behavior](#architecture-and-behavior): extract a shared toggle-field core mixin with `swc-checkbox` now (recommended) or duplicate the logic in `Switch.base.ts`. Changes the core file layout and sequencing.
- **Q5** in [Architecture and behavior](#architecture-and-behavior): whether `swc-switch` ships `invalid` and `error-text`. The accessibility analysis and React S2 say yes; the checkbox plan's Q4 rationale says switch has no `invalid`. Changes the public API.
- **Q6** in [Architecture and behavior](#architecture-and-behavior): how `description` and `error-text` coexist while invalid. Shares checkbox's open Q7; switch should adopt the same resolution. Blocks the API phase.
- **Q13** in [Scope and prerequisites](#scope-and-prerequisites): sequencing behind the text field foundation and `swc-checkbox`. Determines when Setup can start.
- **Q1** in [Design](#design): Figma `S2 / Web` PNG not yet supplied, so the visual matrix is provisional.

Q11 (epic number) and Q12 (Jira open gen1 issues) are required before the plan is finalized but do not change any recommendation.

---

## 1st-gen API surface

**Source:** [`1st-gen/packages/switch/src/Switch.ts`](../../../../1st-gen/packages/switch/src/Switch.ts), with inherited state from [`CheckboxBase.ts`](../../../../1st-gen/packages/checkbox/src/CheckboxBase.ts), [`CheckboxMixin.ts`](../../../../1st-gen/packages/checkbox/src/CheckboxMixin.ts), and [`focusable.ts`](../../../../1st-gen/tools/shared/src/focusable.ts)
**Version:** `@spectrum-web-components/switch@1.12.5`
**Custom element tag:** `sp-switch`

`Switch extends SizedMixin(CheckboxBase)`, where `CheckboxBase extends CheckboxMixin(Focusable)` and overrides `focusElement` to return the inner input. Unlike `sp-checkbox`, `sp-switch` does not set `delegatesFocus`; focus forwarding comes from `Focusable`. `SizedMixin` is applied without `noDefaultSize`, so `size` defaults to `m` and reflects.

### Properties / attributes

| Property | Type | Default | Attribute | Notes |
| -------- | ---- | ------- | --------- | ----- |
| `checked` | `boolean` | `false` | `checked` (reflect) | From `CheckboxMixin`. Reflects live state, so the attribute cannot serve as a reset default. |
| `name` | `string \| undefined` | `undefined` | `name` (reflect) | From `CheckboxMixin`. Forwarded to the inner input, which has no effect on an ancestor `<form>` because the input is in shadow DOM. |
| `readonly` | `boolean` | `false` | `readonly` (reflect) | From `CheckboxMixin`. Implemented by setting `disabled` on the inner input and reverting `checked` in `handleChange()`. Accessibility bug: announced as disabled, removed from Tab order. |
| `disabled` | `boolean` | `false` | `disabled` (reflect) | From `Focusable`. Sets `disabled` on the focus element and manages host `tabindex`/`aria-disabled`. |
| `emphasized` | `boolean` | `false` | `emphasized` (reflect) | Declared on `Switch`. Accent fill on the selected track. |
| `size` (SizedMixin) | `'s' \| 'm' \| 'l' \| 'xl'` | `'m'` | `size` (reflect) | Default size applied by `SizedMixin`. |
| `autofocus` | `boolean` | `false` | `autofocus` | From `Focusable`; `manageAutoFocus()` focuses the inner input after first update. |
| `tabIndex` | `number` | `0` | `tabindex` | From `Focusable`. Getter/setter proxy that stores the value and applies it to the focus element. |
| `inputElement` | `HTMLInputElement` | n/a | none | Public `@query('#input')` field from `CheckboxMixin`. |
| `focusElement` | `HTMLElement` | n/a | none | Public getter from `CheckboxBase`, returns `inputElement`. |
| `selfManageFocusElement` | `boolean` | `false` | none | Public getter from `Focusable`. |

There is **no `value` property** and no `required` or `invalid` in 1st-gen.

### Methods

| Method | Signature | Notes |
| ------ | --------- | ----- |
| `handleChange` | `() => void` | Public on the `CheckboxElement` interface. Honors `readonly`, syncs `checked`, dispatches `change`, reverts if cancelled. Public only because of the mixin pattern. |
| `click` | `() => void` | From `Focusable`; forwards to the focus element unless disabled. |
| `focus` | `(options?: FocusOptions) => void` | From `Focusable`; forwards to the focus element unless disabled. |
| `blur` | `() => void` | From `Focusable`; forwards to the focus element. |

`firstUpdated()` sets `role="switch"` on the inner input; `updated()` sets `aria-checked` on the inner input whenever `checked` changes. Both are `protected` implementation detail.

### Events

- `change`: `CustomEvent`, `bubbles: true`, `cancelable: true`, `composed: true`, dispatched from `handleChange()` after the inner input changes. Calling `preventDefault()` reverts `checked` on both host and input.
- The native inner `change` is not composed and does not escape the shadow root; the native `input` event is composed and reaches host listeners but is undocumented.

### Slots

| Slot | Content | Notes |
| ---- | ------- | ----- |
| default | Text label of the switch | Rendered inside `<label id="label" for="input">`. |

1st-gen has no description or error slot. The README recommends a visually hidden span inside the default slot when no visible label is wanted; there is no `label`/`accessible-label` attribute.

### CSS custom properties

1st-gen exposes 46 `--mod-switch-*` modifiers covering track background and border colors per state (default, hover, down, focus, selected, disabled), handle background colors and sizes, focus indicator color/gap/thickness, control width/height, label colors, font size, line height (including CJK), spacing, border radius and width, and animation duration. `switch-overrides.css` additionally bridges 22 `--system-switch-*` properties for theme overrides, and `switch-legacy.css` is loaded only under the ShadyDOM polyfill. See the [rendering and styling migration analysis](./rendering-and-styling-migration-analysis.md#css) for the full modifier list.

This full modifier surface will not be carried forward to gen2.

### Shadow DOM output (rendered HTML)

1st-gen (`size="m"`, checked):

```html
<sp-switch checked size="m">
  #shadow-root
  <input id="input" type="checkbox" role="switch" aria-checked="true" name="…" />
  <span id="switch"></span>
  <label id="label" for="input"><slot></slot></label>
</sp-switch>
```

gen2 (planned, provisional on Q4, Q5, and Q6; see [Architecture](#architecture-core-vs-swc-split)):

```html
<swc-switch name="notifications" value="on" checked>
  #shadow-root (delegatesFocus: true)
  <div class="swc-Switch">
    <input
      type="checkbox"
      role="switch"
      class="swc-Switch-input"
      id="…input…"
      aria-readonly="true | omitted"
      aria-invalid="true | omitted"
      required
    />
    <span class="swc-Switch-switch" aria-hidden="true"></span>
    <!-- LabellingMixin.renderLabel(): only when the label slot has content -->
    <label class="swc-FormFieldLabel" for="…input…">
      <slot name="label"></slot>
    </label>
  </div>
  <!-- FieldDescriptionMixin.renderFieldDescription() -->
  <span class="swc-FormFieldDescription"><slot name="description"></slot></span>
  <span class="swc-FormFieldErrorText"><slot name="error-text"></slot></span>
</swc-switch>
```

No `aria-checked` is hand-written: a native checkbox input with `role="switch"` exposes its checkedness as the switch state (Q7 verifies this across engines).

---

## React Spectrum S2 API surface

**Source:** [`@react-spectrum/s2/src/Switch.tsx`](https://github.com/adobe/react-spectrum/blob/main/packages/%40react-spectrum/s2/src/Switch.tsx) and [React Spectrum Switch docs](https://react-spectrum.adobe.com/Switch).

| React prop | Type | gen2 mapping | Notes |
| ---------- | ---- | ------------ | ----- |
| `children` | `ReactNode` | `label` slot | No children renders the track only (`isNoVisibleLabel`). |
| `isSelected` / `defaultSelected` | `boolean` | `checked` property / `checked` attribute | Basis for B9. |
| `isDisabled` | `boolean` | `disabled` | |
| `isReadOnly` | `boolean` | `readonly` | "Can be selected but not changed." |
| `isRequired` | `boolean` | `required` | New in gen2. |
| `isInvalid` | `boolean` | `invalid` | New in gen2, pending Q5. React renders invalid only through `HelpText`; the track has no invalid styling. |
| `isEmphasized` | `boolean` | `emphasized` | |
| `size` | `'S' \| 'M' \| 'L' \| 'XL'` | `size` | Default `M`. |
| `description` | `ReactNode` | `description` slot | New in gen2. |
| `errorMessage` | `ReactNode \| (v) => ReactNode` | `error-text` slot | New in gen2, pending Q5 and Q6. |
| `name`, `value`, `form` | `string` | `name`, `value`; `form` via `ElementInternals` | |
| `validate`, `validationBehavior` | function, `'aria' \| 'native'` | Not mapped | Deferred (A2). |
| `autoFocus` | `boolean` | native `autofocus` | |
| `excludeFromTabOrder` | `boolean` | Not mapped | Consumers can set host `tabindex="-1"`. |
| `aria-label`, `aria-labelledby`, `aria-describedby` | `string` | `accessible-label`, `accessible-labelledby`, `accessible-describedby` | Per the forms RFC naming table; raw `aria-*` is not exposed on the host. |
| `aria-errormessage`, `aria-details`, `aria-controls` | `string` | Not mapped | The forms RFC does not prescribe `aria-errormessage`; the others have no evidenced switch need. |
| `onChange(isSelected)` | handler | `change` event | |
| `onFocus`, `onBlur`, `onKeyDown`, `onPress*` | handlers | Native DOM events | No custom events needed. |
| `inputRef` | ref | Not exposed | Inner input stays private (B8). |
| `styles`, `UNSAFE_className`, `UNSAFE_style` | | Not mapped | React styling escape hatches. |

**Visual facts from the React source** that inform styling: `pressScale` applied to the handle on press (the S2 down-state perspective shift), accent-900 selected fill when emphasized, `GrayText` for disabled and `Highlight` for selected in forced colors, and no invalid or read-only styling on the track.

---

## Dependencies

| Package | Version | Role |
| ------- | ------- | ---- |
| `@spectrum-web-components/base` | 1.12.5 | 1st-gen: `SizedMixin`, decorators. gen2 equivalents: `SpectrumElement` and `SizedMixin` from `@adobe/spectrum-wc-core`. |
| `@spectrum-web-components/checkbox` | 1.12.5 | 1st-gen: `CheckboxBase`/`CheckboxMixin`. **Dropped**; the checkbox plan removes these subpath exports (its B21). gen2 shares logic through core mixins instead (Q4). |
| `@spectrum-web-components/shared` (via checkbox) | 1.12.5 | 1st-gen: `Focusable`. **Dropped**; `delegatesFocus` and native `tabindex` replace it (B7). |
| `SizedMixin` (gen2 core) | already built | `size` with default `m`. |
| `LabellingMixin` (gen2 core) | **unmerged** (text field branch) | `label` slot, `renderLabel()` (`<label for>`), `accessible-label`, `accessible-labelledby`, missing-name dev warning. See Q10, Q13. |
| `FieldDescriptionMixin` (gen2 core) | **unmerged** (text field branch) | `description` and `error-text` slots, `renderFieldDescription()`, `accessible-describedby`. The forms RFC and the accessibility analysis call it `HelpTextMixin`. See Q6, Q13. |
| `FieldAssociationController` (gen2 core) | **unmerged** (text field branch) | `ElementInternals` value, restore state, disabled cascade, validity reads. See Q13. |
| Shared toggle-field core mixin | **proposed** (Q4) | Checked default/live semantics, read-only guard, form value/reset/restore, required validity, `click()` forwarding, `change` dispatch, shared with `swc-checkbox`. |
| `SlotPresenceController` (gen2 core) | already built | Used internally by both form mixins. |
| `warnIf` / `isDebug` (gen2 core) | already built | Dev-mode warnings. |
| Focus modality controller (gen2 core) | **not built** | Soft dependency, same as checkbox: native `:focus-visible` on a checkbox-type input already matches keyboard focus only. Adopt if it lands before Styling. |

**Not used:** `DisabledMixin`, for the same reason as checkbox (C3 in the [Decision log](#decision-log)).

**1st-gen consumers of `sp-switch`:** none outside its own package. No migrated gen2 component depends on `swc-switch`.

---

## Open gen1 issues

| Jira | Type | Status (snapshot) | Summary | Notes |
| ---- | ---- | ----------------- | ------- | ----- |
| Not yet queried | n/a | n/a | Jira was unreachable while drafting (Q12). | Run `project = SWC AND component = "Switch" AND statusCategory != Done AND type not in (Epic, Initiative)`, drop rows labeled `a11y` or `gen2`, and replace this row. A GitHub search for open `sp-switch` issues returned none. |

## Migration sequencing and prerequisites

### Dependency-aware recommendation

**Provisional, needs confirmation (Q13):** start `swc-switch` implementation after both of these land:

1. **The text field form foundation** (`LabellingMixin`, `FieldDescriptionMixin`, `FieldAssociationController`, and the shared `form-fields` `_lit-styles/` fragment) merges to `main` from the text field branch ([#6724](https://github.com/adobe/spectrum-web-components/pull/6724)). This is a hard prerequisite; switch has no independent way to provide labelling and form participation without duplicating that work.
2. **`swc-checkbox`'s API phase** (plan in [#6834](https://github.com/adobe/spectrum-web-components/pull/6834)). Switch should be the second consumer of the toggle-field behavior checkbox implements, so the shared mixin (Q4) is extracted from working, tested code rather than designed speculatively. This also lets switch inherit checkbox's resolutions for description/error coexistence (Q6), the read-only mechanism, and label wiring (Q10).

Switch does not extend another gen2 component, and no other component depends on it.

### Related components and ordering notes

- **`swc-checkbox`**: 1st-gen `sp-switch` extends `CheckboxBase`. The checkbox plan (Q4 there) decided **no shared base class**, composing the same mixins in each component, and said to "extract a `ToggleFieldMixin` into core" if duplication grows during switch's migration. Comparing the two plans, the overlap is most of the base class: B9 (checked default vs live), B10 (non-cancelable `change`), B14 (read-only guard), B16 (form value, reset, restore), B17 (required validity), B19 (effective disabled), plus `click()` forwarding. Only role, `indeterminate`, and visuals differ. **Recommendation (Q4):** extract a shared core mixin during switch's API phase and refactor `Checkbox.base.ts` onto it in the same change. This keeps two independent public classes (honoring checkbox's "no shared base class" decision) while avoiding two copies of the form logic.
- **Checkbox plan inconsistency to resolve (Q5):** the checkbox plan's Q4 rationale says switch has "no `mixed` or `invalid`." The `mixed` part is correct. The `invalid` part conflicts with the [switch accessibility analysis](./accessibility-migration-analysis.md#aria-roles-states-and-properties) (required and invalid state, visible error text) and React S2 (`isInvalid`, `errorMessage`). This plan recommends switch ships `invalid` and `error-text`; if confirmed, the shared mixin from Q4 can own `invalid` too.
- **`swc-text-field`**: owner of the shared form foundation; no API coupling beyond consuming it.
- **Shared `_lit-styles/` fragment**: same recommendation as checkbox (its Q8): consume only the description and error styles from the shared `form-fields` fragment; the switch label sits inline beside the track and keeps its own styles (Q9).
- **Shared render template**: none today. The checkbox plan notes switch "may become a second consumer later" of a control-plus-inline-label-plus-description layout. **Recommendation:** do not extract a render template in this migration; the markup differs (box and icon vs track and handle) and `renderLabel()`/`renderFieldDescription()` already carry the shared parts. Revisit if radio, checkbox, and switch layouts converge.
- **`swc-field-group` / `swc-checkbox-group`**: 1st-gen docs group switches in `sp-field-group`. No dependency: switches in a group are independent Tab stops with independent values. Stories use a labelled native `<fieldset>` until a group component exists.
- **Global element stylesheet**: N/A. A switch is not a bare global element.

### User confirmation needed

- **Q4** (must-confirm): extract a shared toggle-field core mixin with `swc-checkbox` during this migration.
- **Q13** (must-confirm): sequence switch after the text field foundation merges and after `swc-checkbox`'s API phase.
- **Q9** (provisional): consume only description and error styles from the shared `form-fields` fragment, matching checkbox.

Sections marked provisional in [Architecture](#architecture-core-vs-swc-split) and [Dependencies](#dependencies) follow these recommendations until confirmed.

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

| #   | What changes | 1st-gen behavior | gen2 behavior | Consumer migration path |
| --- | ------------ | ---------------- | ------------- | ----------------------- |
| B1 | Label moves to a named `label` slot | Default slot | `slot="label"`, rendered by `LabellingMixin`; default slot unused. Source: forms RFC naming table; same slot as `swc-text-field`, `swc-radio`, and `swc-checkbox`. | Wrap label content: `<span slot="label">…</span>`. |
| B2 | Add `value` | No `value` property | `value: string`, default `'on'` (native checkbox default). Submitted under `name` when checked. Source: React `value`, accessibility analysis (form participation). | None (additive). |
| B3 | Add `required` | None | `required: boolean`; native `required` on the inner input plus host `valueMissing` validity. Source: React `isRequired`, accessibility analysis. | None (additive). |
| B4 | Add `description` and `error-text` slots | None; help text needs an external wrapper | Per-item slots via `FieldDescriptionMixin`. Source: React `description`/`errorMessage`, accessibility analysis. `error-text` is pending Q5; coexistence is pending Q6. | None (additive). |
| B5 | Add `invalid` | None | `invalid: boolean` sets `aria-invalid="true"` on the inner input and shows `error-text`. **Pending Q5.** Source: React `isInvalid`, accessibility analysis. | None (additive). |
| B6 | Add `accessible-label`, `accessible-labelledby`, `accessible-describedby` | None; README recommends a visually hidden span | From the shared mixins. Source: forms RFC §3.3, accessibility analysis (accessible name). | Replace visually hidden label spans with `accessible-label`, or keep a visible `label` slot. |
| B7 | `Focusable` surface removed | `tabIndex` proxy property, `focusElement`, `selfManageFocusElement`, JS `focus()`/`blur()`/`click()` forwarding, `manageAutoFocus()` | `delegatesFocus: true` plus native host `tabindex`. Native `disabled` on the inner input removes a disabled switch from the Tab order. Source: accessibility analysis (keyboard and focus), checkbox plan B6. | Remove explicit `tabindex="0"`; `tabindex="-1"` still works natively. Stop reading `focusElement`. |
| B8 | `handleChange()` and `inputElement` become internal | Public members | Not public API. Source: React exposes neither (inner input behind `inputRef`); checkbox plan B7. | Use `checked`, the `change` event, `click()`, and `focus()`. |
| B9 | `checked` attribute semantics | `checked` reflects live state | The `checked` attribute is the default (restored by `form.reset()`); the property is live and not reflected; after a user or script change, attribute changes no longer move live state. Source: native `defaultChecked`/dirty checkedness, React `isSelected`/`defaultSelected`, checkbox plan B9. | Replace `sp-switch[checked]` selectors with a property read or the `change` event. |
| B10 | `change` event shape | Cancelable `CustomEvent`; `preventDefault()` reverts | Non-cancelable `Event('change', { bubbles: true, composed: true })`; cancel a toggle with `preventDefault()` on `click`. Source: native `change`, React `onChange`, checkbox plan B10. | Move `preventDefault()` from `change` to `click`. |
| B11 | `size` default unchanged; `emphasized` unchanged | `m` default, reflected | Same. Listed to confirm no change. Source: React default `M`, accessibility analysis. | None. |

#### Styling and visuals

| #   | What changes | 1st-gen behavior | gen2 behavior | Consumer migration path |
| --- | ------------ | ---------------- | ------------- | ----------------------- |
| B12 | `--mod-switch-*`, `--system-switch-*`, and ShadyDOM legacy styles removed | 46 modifiers, 22 system bridges, `switch-legacy.css` under ShadyDOM | Not exposed; a small reviewed `--swc-*` set only. No ShadyDOM path. Source: CSS style guide, [Component Custom Property Exposure](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/02_custom-properties.md#component-custom-property-exposure). | Remove overrides; request `--swc-*` properties if needed. |
| B13 | S2 visual refresh | S1/Express tokens (S2 foundations via theme bridge) | S2 tokens from Spectrum CSS `spectrum-two`, including the new down-state perspective shift on the handle, RTL handle travel, CJK line height, and the forced-colors block. Source: [rendering analysis](./rendering-and-styling-migration-analysis.md#css--swc-implementation-gaps), Spectrum CSS `spectrum-two`. | None. |

#### Accessibility and behavior

| #   | What changes | 1st-gen behavior | gen2 behavior | Consumer migration path |
| --- | ------------ | ---------------- | ------------- | ----------------------- |
| B14 | Read-only fixed | Inner input `disabled`; announced as disabled; not focusable | Focusable; `aria-readonly="true"` on the inner input; toggle blocked. `aria-readonly` announcement verified manually (Q8). Source: accessibility analysis, forms RFC §3.1 (native `readonly` does not apply to checkbox inputs). | None. Behavior change: read-only switches become Tab stops. |
| B15 | Role and state wiring | `role="switch"` set imperatively in `firstUpdated()`; `aria-checked` hand-written in `updated()` | `role="switch"` rendered in the template; state from the native input's checkedness, never `mixed`. Q7 confirms engine support before removing the hand-written `aria-checked`. Source: accessibility analysis, WAI-ARIA switch pattern. | None. |
| B16 | Form participation | None; never submits | `static formAssociated = true`; `FieldAssociationController` sets the value to `value` when checked and `null` when not, with the checked boolean as restore state; `formResetCallback`, `formDisabledCallback`, `formStateRestoreCallback`. Source: accessibility analysis, forms RFC §3.1. | None. Switches in a `<form>` now submit. |
| B17 | Required validity | None | Host `setValidity({ valueMissing: true }, message, input)` while `required && !checked`; cleared when checked. Source: accessibility analysis, forms RFC §3.1. | None. |
| B18 | Invalid association | None | `aria-invalid="true"` on the inner input plus `error-text` associated through `ariaDescribedByElements`. **Pending Q5.** Source: accessibility analysis, forms RFC §3.3. | Provide `error-text` content with `invalid`. |
| B19 | Effective disabled includes form disabling | Own `disabled` only | `disabled \|\| formDisabled` applied as native `disabled` on the inner input. Source: forms RFC §3.1. | None. |
| B20 | Missing-name dev warning | None | `LabellingMixin` warns when no `label` slot content, `accessible-label`, or resolvable `accessible-labelledby` exists. Source: accessibility analysis. | Dev-time only. |

Unchanged from 1st-gen: the host sets no `role`, and <kbd>Enter</kbd> does not toggle (native behavior; [SWC-209](https://jira.corp.adobe.com/browse/SWC-209) was resolved Won't Fix).

### Additive — ships when ready, zero breakage for consumers already on gen2

| #   | What is added | Notes |
| --- | ------------- | ----- |
| A1 | Additional `--swc-*` custom properties | Beyond the initial reviewed set, only on confirmed need. |
| A2 | Custom validation (`validate`) and `validationBehavior` | React parity; no 1st-gen equivalent. Follows the shared forms strategy once it settles a `setValidity()` pattern. |
| A3 | Custom states (`:state(checked)`) | Styling hook now that `checked` no longer reflects (B9). Add on request; share with checkbox's A4. |
| A4 | Error icon in `error-text` | Comes with `FieldDescriptionMixin` if it adds one for `swc-text-field`. |
| A5 | Switch group component | Group label, description, and propagation of `size`/`emphasized`. No 1st-gen equivalent beyond `sp-field-group`; no evidenced need yet. |

---

## gen2 API decisions

These are derived from the 1st-gen implementation, the React S2 implementation, Spectrum CSS `spectrum-two`, the [accessibility migration analysis](./accessibility-migration-analysis.md), the [forms strategy RFC](../../05_strategies/forms-strategy-rfc.md), and the checkbox plan. The Figma `S2 / Web` switch frame was not available as a PNG while drafting (Q1); visual items cite the Figma states described in the accessibility analysis. Confirmed items are marked; open items are tracked in [Blockers and open questions](#blockers-and-open-questions).

- **Confirmed**: directly supported by source material
- **Inferred**: recommended based on multiple signals, but not explicitly specified in one authoritative source
- **Open question**: unresolved and needs review or more input

### Public API

#### Properties / attributes (gen2)

| Property | Type | Default | Attribute | Notes |
| -------- | ---- | ------- | --------- | ----- |
| `checked` | `boolean` | `false` | `checked` | **Inferred.** Attribute is the default; property is live (B9). Aligns with checkbox. |
| `disabled` | `boolean` | `false` | `disabled` (reflect) | **Confirmed.** Native `disabled` on the inner input (B19). |
| `readonly` | `boolean` | `false` | `readonly` (reflect) | **Confirmed.** Focusable, `aria-readonly="true"`, toggle blocked (B14). |
| `required` | `boolean` | `false` | `required` (reflect) | **Confirmed (new).** React `isRequired`, accessibility analysis. |
| `invalid` | `boolean` | `false` | `invalid` (reflect) | **Open question (Q5).** Recommended: ship it. |
| `emphasized` | `boolean` | `false` | `emphasized` (reflect) | **Confirmed.** Accent fill on the selected track only. |
| `size` | `'s' \| 'm' \| 'l' \| 'xl'` | `'m'` | `size` (reflect) | **Confirmed.** 1st-gen, React, and the Figma sizes described in the accessibility analysis. |
| `name` | `string \| undefined` | `undefined` | `name` (reflect) | **Confirmed.** Form field name. |
| `value` | `string` | `'on'` | `value` | **Confirmed (new).** Submitted when checked. |
| `accessibleLabel` | `string` | `''` | `accessible-label` | **Confirmed.** From `LabellingMixin`. |
| `accessibleLabelledby` | `string \| undefined` | `undefined` | `accessible-labelledby` | **Confirmed.** From `LabellingMixin`; highest precedence. |
| `accessibleDescribedby` | `string \| undefined` | `undefined` | `accessible-describedby` | **Confirmed.** From `FieldDescriptionMixin`. |
| `autofocus` | `boolean` | `false` | `autofocus` | **Inferred.** Native global attribute with `delegatesFocus`; confirm with a test. |
| `form`, `validity`, `validationMessage`, `willValidate` | getters | n/a | none | **Inferred.** Same `ElementInternals` read surface as `swc-text-field` and `swc-checkbox`. |
| `tabIndex` proxy, `focusElement`, `selfManageFocusElement`, `inputElement`, `handleChange` | removed | n/a | n/a | B7, B8. |

Methods: `click()` forwards to the inner input (no-op when effectively disabled; read-only blocks the toggle through the same guard as user clicks); `focus()` is native; `checkValidity()` and `reportValidity()` match `swc-text-field`.

Events: `change` (`Event`, `bubbles`, `composed`, not cancelable; B10). The native `input` event already crosses the shadow boundary and is not re-dispatched.

#### Visual matrix (gen2)

**Provisional (Q1).** Based on the Figma `S2 / Web` switch states listed in the [accessibility analysis](./accessibility-migration-analysis.md#aria-roles-states-and-properties), Spectrum CSS `spectrum-two`, and React S2:

| Selection | Default | Emphasized | Hover | Down | Disabled |
| --------- | ------- | ---------- | ----- | ---- | -------- |
| Not selected | Yes | Same as default | Yes | Yes | Yes |
| Selected | Yes, neutral fill | Yes, accent fill | Yes | Yes | Yes, gray |

Additional presentation modes:

- Sizes `s`, `m`, `l`, `xl` (**Confirmed**).
- Label text wrap: the label wraps and the track stays aligned to the first line. CSS behavior, not a property (**Inferred**; confirm against the Figma PNG).
- **Down (active):** S2 perspective shift on the handle, new for S2 (**Confirmed** by the rendering analysis and Spectrum CSS).
- **Focus-visible:** Spectrum CSS focus ring on `.spectrum-Switch-switch::after` (**Confirmed** by Spectrum CSS).
- **RTL:** handle travel flips with `:dir(rtl)` (**Confirmed** by Spectrum CSS).
- **Forced colors:** Spectrum CSS `@media (forced-colors: active)` block (**Confirmed**).
- **Invalid:** no track treatment; conveyed by `error-text` (**Open question, Q2**; follows React S2).
- **Read-only:** no distinct visual; suppress the down-state shift (**Open question, Q3**; follows checkbox Q2).

#### Slots (gen2)

| Slot | Content | Notes |
| ---- | ------- | ----- |
| `label` | Visible label | **Confirmed.** B1. Optional when `accessible-label` or `accessible-labelledby` supplies the name. |
| `description` | Per-item description | **Confirmed (new).** B4. Coexistence with `error-text` pending Q6. |
| `error-text` | Error message shown while `invalid` | **Open question (Q5).** Slot name follows `swc-text-field`. |

#### CSS custom properties (gen2)

No `--mod-*` properties will be exposed. New `--swc-*` component-level properties may be introduced where needed — these are additive and not breaking. See [Component Custom Property Exposure](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/02_custom-properties.md#component-custom-property-exposure) for what to expose and how.

Each exposed `--swc-*` property must be documented with a `@cssprop` JSDoc tag on the primary SWC component class. Storybook picks these up and surfaces them in the API docs panel automatically.

Initial expectation for Switch is a small reviewed set. Candidates: control width and control height (the dimensions 1st-gen `--mod-switch-control-*` and `--system-switch-*` users override most).

### Behavioral semantics

- **Toggling:** a click on the track or label, or <kbd>Space</kbd> on the focused input, toggles the native input. The host syncs `checked`, updates form value and validity, and dispatches `change`. <kbd>Enter</kbd> does not toggle.
- **Two-state only:** no `indeterminate` property; the switch never exposes `mixed`.
- **Read-only:** focus works. The `click` is cancelled, which reverts the native input's provisional toggle, so neither `input` nor `change` fires. Mechanism follows checkbox's resolution of its Q9.
- **Disabled:** effective disabled (B19) sets native `disabled`; `click()` is a no-op; the field is excluded from validation.
- **Form value:** checked submits `name=value`; unchecked submits nothing. The restore state is the checked boolean.
- **Reset:** `formResetCallback` restores `checked` to its default (the `checked` attribute, B9).
- **Validity:** `required && !checked` sets `valueMissing`, anchored to the inner input so `reportValidity()` points at the track. `invalid` (Q5) adds `aria-invalid` and shows `error-text` without changing native validity.
- **Motion:** the handle transition respects `prefers-reduced-motion: reduce`, following gen2 precedent in `progress-bar`, `tooltip`, and `button` CSS (**Inferred**).

### Accessibility semantics notes (gen2)

The [accessibility migration analysis](./accessibility-migration-analysis.md) is authoritative; the [Accessibility checklist](#accessibility) turns it into implementation items. Points that shape the design beyond that checklist:

- **Role on the inner input, not the host.** `role="switch"` is fixed in the template and is not author-overridable. Expect the roleless-host axe `label` false positive; exclude it per story with a `// reason:` comment, per forms RFC §3.4.
- **Item-level state, like checkbox.** `required`, `readonly`, `invalid` (Q5), and form value all live on each switch.
- **On/off words stay out of the name.** The state is exposed through the switch role; docs should not recommend "On"/"Off" label text.

---

## Architecture: core vs SWC split

> The 1st-gen component is a **reference only** — gen2 is built independently. Neither generation imports from the other.

Follow the [Badge migration reference](../../02_workstreams/02_gen2-component-migration/02_step-by-step/01_washing-machine-workflow.md#reference-badge-migration) as the concrete pattern for the core/SWC split.

| Layer    | Path                                         | Contains                                                                                                                                                                                                                                          |
| -------- | -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Core** | `gen2/packages/core/components/switch/` | `Switch.base.ts`, `Switch.types.ts`, `index.ts`. Composes `SizedMixin`, `LabellingMixin`, `FieldDescriptionMixin`, and (provisional, Q4) the shared toggle-field mixin; owns `formAssociated`, `attachInternals()`, `FieldAssociationController`, validity, reset/restore callbacks, checked/readonly state, and `change` dispatch (via the shared mixin if Q4 is confirmed). Overrides `roleElement` to return the inner input. No rendering. |
| **Core (shared, provisional Q4)** | `gen2/packages/core/mixins/` | Shared toggle-field mixin extracted from `Checkbox.base.ts`, consumed by both `swc-checkbox` and `swc-switch`. Name to be settled with Q4. |
| **SWC**  | `gen2/packages/swc/components/switch/`  | `Switch.ts`, `switch.css`, `swc-switch.ts`, `index.ts`, `switch.mdx`, `migration-guide.mdx`, stories, tests, and the S2 rendering/styling for `swc-switch`. |

Planned rendering shape:

- Core owns API normalization, form participation, validity, and warnings.
- SWC renders: a `.swc-Switch` wrapper (position context) containing the visually hidden but full-size native input with `role="switch"` (Spectrum CSS pattern, so the whole track-plus-label area is the hit target), the `.swc-Switch-switch` track with its `::before` handle, and `renderLabel()` output; then `renderFieldDescription()` output below, outside the hit target (matches React, where help text sits outside the switch wrapper).

---

## Migration checklist

### Preparation (this ticket)

- [x] 1st-gen API surface documented
- [x] React Spectrum S2 API surface documented
- [x] Dependencies identified
- [x] Breaking changes documented
- [x] gen2 API decisions drafted
- [ ] Figma `S2 / Web` switch component frame reviewed as PNG (Q1)
- [ ] Open gen1 issues table populated from Jira (Q12)
- [ ] Epic number confirmed (Q11)
- [ ] Q4, Q5, and Q13 confirmed
- [ ] Plan reviewed by at least one other engineer

### Setup

- [ ] Confirm the text field branch (shared form mixins and controller) has merged to `main` (Q13)
- [ ] Confirm `swc-checkbox`'s API phase has landed, or agree to extract the shared mixin without it (Q4, Q13)
- [ ] Create `gen2/packages/core/components/switch/`
- [ ] Create `gen2/packages/swc/components/switch/`
- [ ] Wire exports in both `package.json` files
- [ ] Check out `spectrum-css` at `spectrum-two` branch as sibling directory

### API

#### Naming and public surface

- [ ] `Switch.types.ts`: define the `size` union with default `m` and the public interface
- [ ] Q4: extract the shared toggle-field mixin from `Checkbox.base.ts` and refactor checkbox onto it in the same change, or record the decision to duplicate
- [ ] `Switch.base.ts`: implement `checked`, `disabled`, `readonly`, `required`, `invalid` (Q5), `emphasized`, `size`, `name`, `value`
- [ ] Compose `LabellingMixin` and `FieldDescriptionMixin`; override `roleElement` to return the inner input
- [ ] `static formAssociated = true`, `attachInternals()`, `FieldAssociationController` with `onDisabledChange`
- [ ] `formResetCallback`, `formStateRestoreCallback`, `formDisabledCallback` delegation
- [ ] `setValidity()` for `valueMissing`, anchored to the inner input
- [ ] `click()` forwarding; non-cancelable `change` (B10); `checked` attribute as default, property live (B9)
- [ ] Keep the inner input reference and change handler private (B8); rely on `delegatesFocus` and native host `tabindex` (B7)
- [ ] Q6: apply checkbox's description/error coexistence resolution

#### Alignment checks

- [ ] `form`, `validity`, `validationMessage`, `willValidate`, `checkValidity()`, and `reportValidity()` exist on the host with the same types as `swc-text-field` and `swc-checkbox`
- [ ] Property names and defaults match React S2 `Switch` and the Figma PNG (Q1)

### Styling

> Follow the [CSS style guide](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/) as the source of truth for all styling work. Key references: [migration steps](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/04_spectrum-swc-migration.md), [custom properties](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/02_custom-properties.md), [anti-patterns](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/05_anti-patterns.md).

- [ ] Add `.swc-Switch` to the internal wrapper in `render()`; keep styling off `:host`
- [ ] Copy S2 source from `spectrum-css` `spectrum-two` branch `index.css` (not `/dist`) into `switch.css` as baseline
- [ ] Map `--emphasized`, `--size*`, `--disabled`, and `--active` selectors to host attribute selectors and `:active`
- [ ] Q9: consume only the description and error styles from the shared `form-fields` fragment, matching checkbox
- [ ] Respect `prefers-reduced-motion: reduce` for the handle and label transitions

#### Visual model and regressions

- [ ] Carry over the CJK line-height rule (`:lang(ja)`, `:lang(ko)`, `:lang(zh)`) from the S2 source
- [ ] Carry over the S2 down-state perspective shift, including the RTL variants
- [ ] Verify label wrap keeps the track aligned to the first line at every size
- [ ] Carry over the `@media (forced-colors: active)` block from the S2 source
- [ ] Suppress the down-state shift while read-only (Q3)
- [ ] Focus ring: use the shared focus modality controller if available; otherwise native `:focus-visible` on the inner input
- [ ] Add `@cssprop` JSDoc tag to the primary SWC component class for every exposed `--swc-*` property (e.g. `@cssprop --swc-switch-control-width - Inline size of the switch track.`)
- [ ] Pass stylelint (property order, `no-descending-specificity`, token validation)

### Accessibility

#### Naming and semantics

- [ ] Host sets no `role`; the inner native input carries a fixed, non-overridable `role="switch"`
- [ ] `delegatesFocus: true`; <kbd>Tab</kbd> and `focus()` land on the inner input
- [ ] Name precedence `accessible-labelledby` > `accessible-label` > `label` slot targets the inner input, wired by `LabellingMixin` (Q10)
- [ ] `description` and `error-text` associate through `ariaDescribedByElements` only (no `aria-errormessage`)
- [ ] Dev warning when no accessible name is available

#### State verification

- [ ] Switch state is always `true` or `false`, never `mixed`, and updates for pointer, keyboard, and programmatic changes (Q7)
- [ ] Effective disabled (B19) maps to native `disabled`, which removes the switch from the Tab order
- [ ] `readonly` is focusable, exposes `aria-readonly="true"`, blocks toggling, and is not announced as disabled (Q8)
- [ ] `invalid` sets `aria-invalid="true"` only when `true`, with associated error text; not color alone (Q5)
- [ ] `required` exposes native `required` and host `valueMissing`
- [ ] Each switch is independently form-associated and submits its own `name`/`value`
- [ ] The track-plus-label hit target meets [WCAG 2.5.8](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html) at every size
- [ ] Track, handle, selected, emphasized, hover, disabled, and focus indicator meet 3:1 [non-text contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html), covering the 1st-gen contrast issues [SWC-1115](https://jira.corp.adobe.com/browse/SWC-1115) and [SWC-1194](https://jira.corp.adobe.com/browse/SWC-1194)

### Testing

Use red/green test-driven development: write each test first, confirm it fails against the empty scaffold, then implement until it passes. Order: unit state → form participation → accessibility → keyboard → visual.

- [ ] Every row of the 1st-gen test mapping below is ported, rewritten, or dropped as its row says
- [ ] Add Playwright `switch.a11y.spec.ts` with `toMatchAriaSnapshot`

1st-gen test mapping:

| 1st-gen test | gen2 action |
| ------------ | ----------- |
| "loads default switch accessibly", "loads `checked` switch accessibly" | Port as ARIA snapshots (`switch` role, name, checked state) |
| "has name attribute" | Rewrite: `name`/`value` appear in `FormData` when checked; the label `for` check becomes a name assertion |
| "maintains its value when [readonly]" | Port; add "is focusable and not disabled" and "exposes `aria-readonly`" |
| `switch-memory.test.ts` (`testForMemoryLeaks`) | Drop; gen2 has no memory-leak harness |
| `test/benchmark/` | Drop |
| `switch.stories.ts`, `switch-sizes.stories.ts` (Default, Checked, Sizes, readonly, emphasized, emphasizedChecked, Autofocus, Disabled, disabledChecked) | Replace with gen2 stories and VRT stories covering the same states |

#### Behavior

Unit (`test/switch.test.ts`):

- [ ] Shadow root contains one `<input type="checkbox" role="switch">`; host has no `role`
- [ ] `size` defaults to `m`
- [ ] `checked` property and inner input checkedness stay in sync both ways
- [ ] After a user toggle, changing the `checked` attribute does not change `checked`; `form.reset()` restores the attribute's value (B9)
- [ ] User toggle dispatches exactly one `change` on the host (bubbles, composed); programmatic changes dispatch none
- [ ] `change` is not cancelable; `preventDefault()` on `click` blocks the toggle and no `change` fires
- [ ] `click()` toggles when enabled; no-op when disabled
- [ ] `readonly`: click and <kbd>Space</kbd> do not toggle; no `change`; inner input not `disabled`; `aria-readonly="true"`
- [ ] `disabled`: inner input `disabled`; `click()` no-op
- [ ] `invalid`: `aria-invalid="true"` only when `true` (Q5)
- [ ] `required`: inner input `required`
- [ ] `label` slot content names the input; `accessible-label` names it without a label slot; `accessible-labelledby` wins over both
- [ ] `description` is associated; `error-text` behavior follows Q6
- [ ] Dev warning fires with no name source

Form participation (in a native `<form>` with native submit and reset buttons, per forms RFC §3.5):

- [ ] Checked submits `name=value`; unchecked contributes nothing; default `value` is `on`
- [ ] `required` and unchecked blocks submit; `checkValidity()` is `false`; `:invalid` and `:user-invalid` match; checking clears it
- [ ] `form.reset()` restores the default checked state
- [ ] `formStateRestoreCallback` restores `checked`
- [ ] `<fieldset disabled>` disables the switch and excludes it from `FormData` and validation
- [ ] External `form` attribute association works
- [ ] Value read programmatically matches the submitted value across checked, unchecked, and post-reset states

Keyboard (Playwright):

- [ ] One Tab stop; <kbd>Space</kbd> toggles; <kbd>Enter</kbd> does not
- [ ] Several switches are each a Tab stop; arrow keys do not move focus
- [ ] Disabled is skipped by <kbd>Tab</kbd>; read-only is reached but does not toggle

Accessibility (`switch.a11y.spec.ts` plus Storybook axe):

- [ ] ARIA snapshots for not selected, selected, emphasized, disabled, read-only, required, invalid, description, and no-visible-label stories, plus each size, confirming none changes role or name and none exposes `mixed`
- [ ] ARIA snapshots run in Chromium, Firefox, and WebKit to confirm native checkedness maps to the switch state (Q7)
- [ ] axe passes on all stories, with the documented host `label` false-positive exclusion only
- [ ] Manual screen reader pass (VoiceOver, NVDA, plus Firefox): switch state announced; read-only announced as read-only (Q8); error text announced

#### Visual regression

- [ ] VRT for every cell of the visual matrix in [Public API](#public-api), at each size
- [ ] VRT for down state, including RTL
- [ ] VRT for wrapped labels at every size
- [ ] VRT for focus-visible ring, including that it is not clipped
- [ ] VRT for forced-colors mode across selected, not selected, and disabled
- [ ] VRT for description and error text placement
- [ ] Custom-properties VRT for each exposed `--swc-*` property

### Documentation

#### General

- [ ] JSDoc on all public props, slots, events, and CSS custom properties
- [ ] Storybook stories: Playground; Overview; Anatomy (label, description, error text); Options (sizes, emphasized); States (selected, disabled, read-only, required, invalid); Behaviors (form participation in a native `<form>`, `change` event); Accessibility (no-visible-label with `accessible-label`, grouped switches inside a labelled native `fieldset`)
- [ ] `switch.mdx` docs page per the stories-documentation guide, including when to use a switch vs a checkbox

#### Breaking changes

- [ ] `migration-guide.mdx` has one entry per B row whose consumer migration path asks consumers to act or changes observable behavior: B1, B6, B7, B8, B9, B10, B12, B14

### Review

- [ ] `yarn lint:gen2` passes (ESLint, Stylelint, Prettier)
- [ ] Status table in workstream doc updated
- [ ] PR created with description referencing Epic SWC-####
- [ ] Peer engineer sign-off

---

## Blockers and open questions

During drafting, this section tracks active blockers and open questions. As each item resolves, move it out of these tables: settled **decisions** go to the [Decision log](#decision-log) (with their rationale), and **deferred** items with tickets go to the deferred-ticket table. In the final review-ready plan, these tables should contain only genuinely open items plus the deferred-ticket table.

### Design

| #   | Item | Blocking? | Status | Owner |
| --- | ---- | --------- | ------ | ----- |
| Q1 | Figma `S2 / Web` switch component frame (with variants) not supplied as a PNG. The visual matrix uses the states listed in the accessibility analysis plus Spectrum CSS and React. Next action: copy the frame as PNG and confirm the matrix, label wrap, and any states not listed. | Yes, before finalizing | Open | Design + implementation |
| Q2 | Invalid visual: recommend no track treatment, with invalid conveyed by `error-text` (React S2 has no invalid track styling; Spectrum CSS has no `.is-invalid` for switch). Confirm with Design once Q5 is settled. | No | Open | Design |
| Q3 | Read-only visual: recommend no distinct treatment and suppressing the down-state shift, matching checkbox's Q2. Confirm with Design. | No | Open | Design |

### Architecture and behavior

| #   | Item | Blocking? | Status | Owner |
| --- | ---- | --------- | ------ | ----- |
| Q4 | Shared toggle-field logic with `swc-checkbox`. Recommendation: extract a core mixin (checked default/live semantics, read-only guard, form value/reset/restore, required validity, effective disabled, `click()` forwarding, `change` dispatch) during switch's API phase and refactor `Checkbox.base.ts` onto it. Tradeoff: one more core abstraction and a checkbox refactor, versus two copies of the form logic that must stay in sync. Alternative: duplicate in `Switch.base.ts` per checkbox's current Q4. Must confirm. | Yes | Open: provisional recommendation | Architecture reviewer + checkbox plan owner |
| Q5 | Does `swc-switch` ship `invalid` and `error-text`? Recommendation: yes. Supported by the accessibility analysis (required and invalid state, visible error text) and React S2 (`isInvalid`, `errorMessage`). Conflicts with the checkbox plan's Q4 rationale ("no `mixed` or `invalid`"); update that rationale once confirmed. | Yes | Open | Accessibility reviewer + implementation |
| Q6 | How `description` and `error-text` coexist while invalid. The accessibility analysis asks for an explicit decision; `FieldDescriptionMixin` replaces the description with error text. Recommendation: adopt checkbox's Q7 resolution unchanged. | Yes, blocks API phase | Open: waiting on checkbox Q7 | Implementation + accessibility reviewer |
| Q7 | Native checkedness exposed as the switch state on `<input type="checkbox" role="switch">` without a hand-written `aria-checked`. Recommendation: rely on native mapping, verify with ARIA snapshots in Chromium, Firefox, and WebKit, and keep an explicit `aria-checked` only if an engine fails. | No | Open: settle in API phase with a test | Implementation |
| Q8 | `aria-readonly="true"` announcement on the switch role is inconsistent across screen readers ([w3c/aria#1309](https://github.com/w3c/aria/issues/1309)). Verify in Phase 4; evaluate `aria-disabled` as a fallback, coordinated with the same checkbox question. | No | Open: Phase 4 manual testing | Accessibility reviewer |
| Q9 | Consume only the description and error styles from the shared `form-fields` fragment; keep inline label styles local. Matches checkbox's Q8; import details depend on how the text field branch splits the fragment. | No | Open: provisional | CSS reviewer |
| Q10 | `LabellingMixin` wires the slotted label through a native `<label for>`; the accessibility analysis describes same-root references. Adopt checkbox's Q13 resolution. Internal wiring only; no public API change. | No | Open: waiting on checkbox Q13 | Accessibility reviewer |

### Scope and prerequisites

| #   | Item | Blocking? | Status | Owner |
| --- | ---- | --------- | ------ | ----- |
| Q11 | Epic number for the switch migration is not yet known; the header and Review checklist keep `Epic SWC-####` until it is supplied. The accessibility analysis PR referenced SWC-2570, which likely sits under the same epic. | Yes, before finalizing | Open | Ticket owner |
| Q12 | Open gen1 issues table: Jira was unreachable while drafting. Run the JQL in [Open gen1 issues](#open-gen1-issues), drop `a11y`/`gen2`-labeled rows, and replace the placeholder row. | Yes, before finalizing | Open | Ticket owner |
| Q13 | Sequencing: start Setup after the text field foundation merges ([#6724](https://github.com/adobe/spectrum-web-components/pull/6724)) and after `swc-checkbox`'s API phase ([#6834](https://github.com/adobe/spectrum-web-components/pull/6834)), so Q4's mixin is extracted from tested code and Q6/Q10 inherit checkbox's answers. Alternative: start in parallel with checkbox and co-design the mixin. Must confirm. | Yes | Open: provisional recommendation | Team |
| Q14 | File `deferred` tickets under the switch epic for any Additive items the team wants scheduled (A5 is the only candidate; A1 to A4 are on-request or come with shared work). Then replace this row with the deferred-ticket table. | No | Open | Team |

---

## Decision log

`C#` rows record decisions made while drafting that never had a `Q` or `B` id.

| Ref | Decision | Rationale / context |
| --- | -------- | ------------------- |
| C1 | Keep a native `<input type="checkbox">` in shadow DOM with `role="switch"`; host sets no role. | Accessibility analysis and forms RFC §3.2. 1st-gen already uses a native input; only the role wiring moves into the template. |
| C2 | No `indeterminate` or `mixed` state. | WAI-ARIA switch pattern and the accessibility analysis: a switch is two-state. |
| C3 | Implement `disabled` as native `disabled` on the inner input, in place of `DisabledMixin`. | Same reasoning as checkbox's C3: `DisabledMixin` targets host-role components; the switch host has no role. |
| C4 | Use `LabellingMixin` (like checkbox, unlike radio). | Unlabelled switches are an evidenced pattern (the 1st-gen README documents a switch next to a panel title with a visually hidden label), so `accessible-label`/`accessible-labelledby` are needed. |
| C5 | No custom <kbd>Enter</kbd> activation. | Native behavior and the accessibility analysis; [SWC-209](https://jira.corp.adobe.com/browse/SWC-209) resolved Won't Fix. |
| C6 | No shared render template in this migration. | Track-and-handle markup differs from checkbox's box-and-icon; the shared label and description parts already come from the mixins. |
| C7 | Global element stylesheet is N/A. | A switch is not a bare global element. |

---

## References

- [Washing machine workflow](../../02_workstreams/02_gen2-component-migration/02_step-by-step/01_washing-machine-workflow.md)
- [gen2 migration status table](../../02_workstreams/02_gen2-component-migration/01_status.md)
- [Accessibility migration analysis](./accessibility-migration-analysis.md)
- [Rendering and styling migration analysis](./rendering-and-styling-migration-analysis.md)
- [Checkbox accessibility migration analysis](../checkbox/accessibility-migration-analysis.md)
- [Checkbox migration plan (PR #6834)](https://github.com/adobe/spectrum-web-components/pull/6834): closest precedent; source of B7 to B10, B14, B16, B17, B19, and the shared-logic question
- [Text field implementation (PR #6724)](https://github.com/adobe/spectrum-web-components/pull/6724): shared form foundation
- [Radio migration plan](../radio/migration-plan.md): sibling form control; precedent for the `label` slot
- [Forms strategy RFC](../../05_strategies/forms-strategy-rfc.md)
- [gen2 shared resources quick reference](../../../01_contributor-guides/16_gen2-shared-resources.md)
- [CSS style guide — Component Custom Property Exposure](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/02_custom-properties.md#component-custom-property-exposure)
- [CSS style guide — Selector conventions](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/02_custom-properties.md#selector-conventions)
- [1st-gen source](../../../../1st-gen/packages/switch/src/Switch.ts)
- [1st-gen shared base / mixins](../../../../1st-gen/packages/checkbox/src/): `CheckboxBase.ts`, `CheckboxMixin.ts`; plus [`focusable.ts`](../../../../1st-gen/tools/shared/src/focusable.ts)
- [1st-gen tests](../../../../1st-gen/packages/switch/test/switch.test.ts)
- [1st-gen README](../../../../1st-gen/packages/switch/README.md)
- [React Spectrum S2 Switch](https://react-spectrum.adobe.com/Switch) and [source](https://github.com/adobe/react-spectrum/blob/main/packages/%40react-spectrum/s2/src/Switch.tsx)
- [Spectrum CSS `spectrum-two` switch source](https://github.com/adobe/spectrum-css/blob/spectrum-two/components/switch/index.css) and [template](https://github.com/adobe/spectrum-css/blob/spectrum-two/components/switch/stories/template.js)
- [Switch S2 Figma design](https://www.figma.com/design/xHBWBBIe2eo5vwoCeNrC4Q/S2---Web?node-id=9397-4673&p=f&m=dev) (PNG pending, Q1)
- [WAI-ARIA APG: Switch pattern](https://www.w3.org/WAI/ARIA/apg/patterns/switch/)
- [Badge migration reference](../../02_workstreams/02_gen2-component-migration/02_step-by-step/01_washing-machine-workflow.md#reference-badge-migration)
- Epic: SWC-#### - Switch epic (Q11)
- 1st-gen accessibility tickets: [SWC-1115](https://jira.corp.adobe.com/browse/SWC-1115) (checked contrast), [SWC-1194](https://jira.corp.adobe.com/browse/SWC-1194) (emphasized contrast), [SWC-209](https://jira.corp.adobe.com/browse/SWC-209) (<kbd>Enter</kbd> does not toggle, Won't Fix)

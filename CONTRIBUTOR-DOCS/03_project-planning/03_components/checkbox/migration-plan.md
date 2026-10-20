<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../../README.md) / [Project planning](../../README.md) / [Components](../README.md) / Checkbox / Checkbox migration plan

<!-- Document title (editable) -->

# Checkbox migration plan

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
    - [Deferred tickets](#deferred-tickets)
- [Decision log](#decision-log)
- [References](#references)

</details>

<!-- Document content (editable) -->

> **Epic SWC-2340** · Planning output for SWC-2342. Must be reviewed before implementation begins.
>
> This plan covers **`swc-checkbox`, the individual checkbox, only.** Unlike `swc-radio`, a checkbox is a complete control on its own (a single required consent box is a first-class use case), so `swc-checkbox` can ship and be documented independently. `swc-checkbox-group` is planned separately (Q10). The [accessibility migration analysis](./accessibility-migration-analysis.md) is authoritative for gen2 semantics, except where Q7 (description and error text), Q13 (name wiring), and B18 (`invalid` inside a group) override it. It was authored against the approved [forms strategy RFC](../../05_strategies/forms-strategy-rfc.md).
>
> **Status: ready for review.** Core migration questions are resolved in the [Decision log](#decision-log), except Q14, which blocks the accessibility phase. Q8 and Q9 are settled during implementation and do not change the API.

---

## TL;DR

- **A form-associated custom element with a real native input.** gen2 keeps 1st-gen's native `<input type="checkbox">` in the shadow root, so role, `checked`, `mixed`, and <kbd>Space</kbd> come from the browser. It adds host form participation through `ElementInternals` (B16), which 1st-gen lacks: `sp-checkbox` never submits with a `<form>`.
- **Built on the shared form foundation, after two branches merge.** `LabellingMixin` (label slot, `accessible-label`, `accessible-labelledby`), `FieldDescriptionMixin` (`description` and `error-text` slots, `accessible-describedby`), and `FieldAssociationController` exist only on the unmerged text field branch (Epic SWC-2323). Checkbox implementation starts after the text field and radio branches both merge (Q3).
- **Read-only gets fixed (B15).** 1st-gen fakes `readonly` by disabling the inner input, so screen readers announce it as disabled and it leaves the tab order. gen2 keeps it focusable, exposes `aria-readonly="true"`, and blocks the toggle.
- **Consumer-facing changes:** B1, B4, B5, B6, B7, B9, B10, B11, B12, B15, B16, B17, B18, and B21 each name a migration path. The largest: label content moves to a named `label` slot (B1); the `checked` attribute becomes the default state, as on a native checkbox (B9); `change` is no longer cancelable (B10); `--mod-checkbox-*` is removed (B11); and read-only checkboxes become Tab stops (B15).
- **Visual options carry over.** The [Figma `S2 / Web` checkbox frame](https://www.figma.com/design/xHBWBBIe2eo5vwoCeNrC4Q/S2---Web?node-id=9961-2510) confirms sizes `s`/`m`/`l`/`xl`, unchecked, indeterminate, and checked selection, `emphasized` (accent fill on checked and indeterminate), hover, disabled, and wrapping labels. Figma has no invalid state; per Design, invalid leaves the box colors unchanged and shows an error icon instead (B14).
- **MVP (minimum viable product) scope:** `swc-checkbox` with the full [public API](#public-api), including the `label`, `description`, and `error-text` slots, plus form participation and every accessibility item. **Out of scope:** everything in [Additive](#additive--ships-when-ready-zero-breakage-for-consumers-already-on-gen2) (A1–A4), including `swc-checkbox-group`.

### Most blocking open questions

- **Q14**: where to suppress the native validation bubble without losing focus on a failed submit, shared with `swc-text-field`. Blocks the accessibility phase.

Q8, Q9, and Q12 are open but do not block implementation; see [Blockers and open questions](#blockers-and-open-questions).

---

## 1st-gen API surface

**Source:** [`1st-gen/packages/checkbox/src/Checkbox.ts`](../../../../1st-gen/packages/checkbox/src/Checkbox.ts), with shared state in [`CheckboxMixin.ts`](../../../../1st-gen/packages/checkbox/src/CheckboxMixin.ts)
**Version:** `@spectrum-web-components/checkbox@1.12.4`
**Custom element tag:** `sp-checkbox`

`Checkbox extends SizedMixin(CheckboxMixin(SpectrumElement), { noDefaultSize: true })` with `delegatesFocus: true`. The package also publishes two subpath exports that exist for `sp-switch`, not for `sp-checkbox` itself: `./src/CheckboxBase.js` (`CheckboxBase extends CheckboxMixin(Focusable)`, which `Switch` extends) and `./src/CheckboxMixin.js` (`CheckboxMixin` and the `CheckboxElement` interface). The package root (`src/index.ts`) exports only `Checkbox`. B21 covers their removal.

### Properties / attributes

| Property | Type | Default | Attribute | Notes |
| -------- | ---- | ------- | --------- | ----- |
| `checked` | `boolean` | `false` | `checked` (reflect) | From `CheckboxMixin`. Reflects, so the attribute tracks live state and cannot serve as a reset default. |
| `name` | `string \| undefined` | `undefined` | `name` (reflect) | From `CheckboxMixin`. Forwarded to the inner input, which has no effect on an ancestor `<form>` because the input is in shadow DOM. |
| `readonly` | `boolean` | `false` | `readonly` (reflect) | From `CheckboxMixin`. Implemented by disabling the inner input and reverting `checked` in `handleChange()`. Accessibility bug: announced as disabled, removed from tab order. |
| `disabled` | `boolean` | `false` | `disabled` (reflect) | Sets inner input `disabled` and swaps `tabIndex` between host (`-1`) and input in `updated()`. |
| `indeterminate` | `boolean` | `false` | `indeterminate` (reflect) | Sets inner input `.indeterminate` (produces `aria-checked="mixed"`); cleared by `handleChange()`. |
| `invalid` | `boolean` | `false` | `invalid` (reflect) | Sets `aria-invalid="true"` on the inner input. No associated error text of its own. |
| `emphasized` | `boolean` | `false` | `emphasized` (reflect) | Accent color on checked and indeterminate states. |
| `tabIndex` | `number` | `0` | `tabindex` (reflect) | Overrides the native property so the disabled swap can store and restore it. |
| `size` (SizedMixin) | `'s' \| 'm' \| 'l' \| 'xl'` | none (`noDefaultSize`) | `size` (reflect) | Effective `m` via CSS. Also selects the checkmark and dash icon element per size. |
| `autofocus` | n/a | n/a | `autofocus` | Not a property; `connectedCallback()` reads the attribute and calls `focus()` after first update. |
| `inputElement` | `HTMLInputElement` | n/a | none | Public `@query('#input')` field. Used by `sp-switch` and tests. |

There is **no `value` property** in 1st-gen. The README's `<sp-checkbox value="email">` examples set an attribute that nothing reads.

### Methods

| Method | Signature | Notes |
| ------ | --------- | ----- |
| `click` | `() => void` | Overridden: no-op when `disabled`, otherwise calls `inputElement.click()`. |
| `handleChange` | `() => void` | Public on `CheckboxElement` interface. Clears `indeterminate`, honors `readonly`, syncs `checked`, dispatches `change`, reverts if cancelled. Public only because of the mixin pattern. |
| `focus` | native | Works through `delegatesFocus`. |

### Events

- `change`: `CustomEvent`, `bubbles: true`, `cancelable: true`, `composed: true`, dispatched from `handleChange()` after the inner input changes. Calling `preventDefault()` reverts `checked` on both host and input. Covered by the 1st-gen test "can have `change` events cancelled".
- The native inner `change` is not composed, so it does not escape the shadow root; the native `input` event is composed and does reach host listeners, but 1st-gen does not document it.

### Slots

| Slot | Content | Notes |
| ---- | ------- | ----- |
| default | Label content | Rendered in `<label id="label" for="input">`. |

1st-gen has no description or error slot. Help text requires wrapping the checkbox in `sp-field-group` and using its `help-text`/`negative-help-text` slots ([README, help text](../../../../1st-gen/packages/checkbox/README.md#help-text)).

### CSS custom properties

1st-gen exposes 38 `--mod-checkbox-*` modifiers plus `--mod-focus-indicator-thickness`. They cover content, control, selected, emphasized, and invalid colors per state; checkmark color; control size, corner radius, and height; focus indicator gap, thickness, and color; font size; line height, including CJK; spacing (`spacing`, `text-to-control`, `top-to-text`); border widths; and animation duration. `checkbox-overrides.css` also bridges six `--system-checkbox-*` properties for theme overrides. The Spectrum CSS `spectrum-two` source defines 30 `--mod-checkbox-*` modifiers; the [rendering and styling migration analysis](./rendering-and-styling-migration-analysis.md#css) lists them.

This full modifier surface will not be carried forward to gen2.

### Shadow DOM output (rendered HTML)

1st-gen (`size="m"`, checked):

```html
<sp-checkbox checked size="m" tabindex="0">
  #shadow-root (delegatesFocus: true)
  <input id="input" type="checkbox" name="…" />
  <span id="box">
    <!-- rendered only when checked -->
    <sp-icon-checkmark100
      id="checkmark"
      class="spectrum-Icon spectrum-UIIcon-Checkmark100"
    ></sp-icon-checkmark100>
    <!-- rendered only when indeterminate -->
    <sp-icon-dash100
      id="partial-checkmark"
      class="spectrum-Icon spectrum-UIIcon-Dash100"
    ></sp-icon-dash100>
  </span>
  <label id="label" for="input"><slot></slot></label>
</sp-checkbox>
```

gen2 (planned; see [Architecture](#architecture-core-vs-swc-split)):

```html
<swc-checkbox name="terms" value="accepted" required>
  #shadow-root (delegatesFocus: true)
  <div class="swc-Checkbox">
    <input
      type="checkbox"
      class="swc-Checkbox-input"
      id="…input…"
      aria-readonly="true | omitted"
      aria-invalid="true | omitted"
      required
    />
    <span class="swc-Checkbox-box" aria-hidden="true">
      <!-- S2 Checkmark or Dash UI icon, sized per component size -->
    </span>
    <!-- LabellingMixin.renderLabel(): only when the label slot has content -->
    <label class="swc-FormFieldLabel" for="…input…">
      <slot name="label"></slot>
    </label>
  </div>
  <!-- FieldDescriptionMixin.renderFieldDescription(), placed per Q7 -->
  <span class="swc-FormFieldDescription"><slot name="description"></slot></span>
  <!-- or, while invalid with error text, in its place: -->
  <span class="swc-FormFieldErrorText">
    <!-- error icon markup from the radio branch; other placements: B14 -->
    <span class="swc-FormFieldErrorText-icon">
      <swc-icon-alert-triangle aria-hidden="true"></swc-icon-alert-triangle>
    </span>
    <span class="swc-FormFieldErrorText-text"><slot name="error-text"></slot></span>
  </span>
</swc-checkbox>
```

---

## React Spectrum S2 API surface

**Source:** [`@react-spectrum/s2/src/Checkbox.tsx`](https://github.com/adobe/react-spectrum/blob/main/packages/%40react-spectrum/s2/src/Checkbox.tsx) and [React Spectrum Checkbox docs](https://react-spectrum.adobe.com/Checkbox). Built on `react-aria-components` `CheckboxField`/`CheckboxButton`.

| React prop | Type | gen2 mapping | Notes |
| ---------- | ---- | ------------ | ----- |
| `children` | `ReactNode` | `label` slot | Label. No children renders the box only (`isNoVisibleLabel`). |
| `isSelected` / `defaultSelected` | `boolean` | `checked` property / `checked` attribute | Basis for B9 (Q5). |
| `isIndeterminate` | `boolean` | `indeterminate` | "Presentational only… remains regardless of user interaction." React keeps it set; gen2 clears it on activation (C2). |
| `isDisabled` | `boolean` | `disabled` | |
| `isReadOnly` | `boolean` | `readonly` | "Can be selected but not changed." |
| `isRequired` | `boolean` | `required` | New in gen2. |
| `isInvalid` | `boolean` | `invalid` | Inside a `CheckboxGroup`, an invalid group marks every item invalid and hides per-item error text in favor of the group's message; gen2 sets the invalid state on the group instead (B18). |
| `isEmphasized` | `boolean` | `emphasized` | Inherited from `CheckboxGroup` context when inside one. |
| `size` | `'S' \| 'M' \| 'L' \| 'XL'` | `size` | Default `M`. |
| `description` | `ReactNode` | `description` slot | New in gen2. On a standalone checkbox, help text starts under the box at the control's text size; inside a `CheckboxGroup`, it moves under the label, one size smaller (Q7). |
| `errorMessage` | `ReactNode \| (v) => ReactNode` | `error-text` slot | React's `HelpText` shows the error **instead of** the description while invalid; gen2 does the same through `FieldDescriptionMixin`, except that the description stays when `error-text` is empty (Q7). Renders with an error icon (`showErrorIcon`); gen2 also renders one, even with no error text (B14). |
| `name`, `value`, `form` | `string` | `name`, `value`; `form` via `ElementInternals` | |
| `validate`, `validationBehavior` | function, `'aria' \| 'native'` | Not mapped | Deferred (A3). |
| `autoFocus` | `boolean` | native `autofocus` | |
| `excludeFromTabOrder` | `boolean` | Not mapped | Consumers can set host `tabindex="-1"`. |
| `aria-label`, `aria-labelledby`, `aria-describedby` | `string` | `accessible-label`, `accessible-labelledby`, `accessible-describedby` | Per forms RFC naming table; raw `aria-*` is not exposed on the host. |
| `aria-errormessage`, `aria-details`, `aria-controls` | `string` | Not mapped | The forms RFC does not prescribe `aria-errormessage`; the others have no evidenced checkbox need. |
| `onChange(isSelected)` | handler | `change` event | |
| `onFocus`, `onBlur`, `onKeyDown`, `onPress*`, `onHover*` | handlers | Native DOM events | No custom events needed. |
| `ref` | `FocusableRef<HTMLInputElement, HTMLDivElement>` | Host element | The ref's `focus()` targets the input; gen2 gets the same from native `focus()` with `delegatesFocus`. Its only other member, `UNSAFE_getDOMNode()`, is a React escape hatch with no gen2 equivalent. |
| `inputRef` | ref | Not exposed | Inner input stays private (B7). |
| `styles`, `UNSAFE_className`, `UNSAFE_style` | | Not mapped | React styling escape hatches. |

**Visual facts from the React source** that inform styling: box border `gray-800`, checked/indeterminate fill neutral (`accent-900` when emphasized), disabled `gray-400` (gen2 uses `disabled-content-color`; C6), forced colors use `Highlight`/`GrayText`, press scale on the box, icon one size step smaller than the control (`S` → `XS`). gen2 does not use React's invalid box colors (B14).

---

## Dependencies

| Package | Version | Role |
| ------- | ------- | ---- |
| `@spectrum-web-components/base` | 1.12.4 | 1st-gen: `SpectrumElement`, `SizedMixin`, decorators, `ifDefined`. gen2 equivalents: `SpectrumElement` and `SizedMixin` from `@adobe/spectrum-wc-core`. |
| `@spectrum-web-components/icon` | 1.12.4 | 1st-gen: checkmark/dash icon CSS. **Dropped**; gen2 renders inline UI icon SVGs. |
| `@spectrum-web-components/icons-ui` | 1.12.4 | 1st-gen: `sp-icon-checkmark75`–`300`, `sp-icon-dash75`–`300` elements. **Replaced** by gen2 `Checkmark` and `Dash` from [`gen2/packages/swc/components/ui-icons/icon-set/`](../../../../gen2/packages/swc/components/ui-icons/icon-set/index.ts) (already built). Size mapping follows the Spectrum CSS S2 template: `s` → 50, `m` → 75, `l` → 100, `xl` → 200. |
| `@spectrum-web-components/shared` | 1.12.4 | 1st-gen: `Focusable`, used only by `CheckboxBase` for `sp-switch`. **Dropped.** |
| `SizedMixin` (gen2 core) | already built | `size` with explicit default `m`. |
| `LabellingMixin` (gen2 core) | **unmerged** (text field branch) | `label` slot presence, `renderLabel()` (`<label for>`), `accessible-label`, `accessible-labelledby`, `ariaLabelledByElements` wiring for `accessible-labelledby`, missing-name dev warnings. See Q3, Q13. |
| `FieldDescriptionMixin` (gen2 core) | **unmerged** (text field branch) | `description` and `error-text` slots, `renderFieldDescription()`, `accessible-describedby`, `ariaDescribedByElements` wiring. The `errorIcon` option of `renderFieldDescription()`, needed for B14, exists only on the radio branch so far. The forms RFC and the accessibility analysis call it `HelpTextMixin`. See Q3, Q7, B14. |
| `swc-radio` and `swc-radio-group` | **unmerged** (radio branch) | Patterns checkbox reuses or aligns with (Q8, B14, B17), plus the `errorIcon` option. Checkbox waits for this branch to merge (Q3). |
| `swc-icon-alert-triangle` (`@adobe/spectrum-wc-icons`) | already built | Error icon passed to `renderFieldDescription()`'s `errorIcon` option (B14), as `swc-radio-group` does. |
| `FieldAssociationController` (gen2 core, SWC-2467) | **unmerged** (text field branch) | Wraps `ElementInternals`: `setValue()` (form value plus restore state), `formDisabledCallback`, validity reads. Host keeps `formAssociated`, `attachInternals()`, `setValidity()`, and `formResetCallback`. See Q3. |
| `SlotPresenceController` (gen2 core) | already built | Used internally by both mixins. |
| `warnIf` / `isDebug` (gen2 core) | already built | Dev-mode warnings (missing accessible name comes from `LabellingMixin`). |
| Focus modality controller (gen2 core, SWC-2604) | **not built** | Keyboard-only focus ring via the `keyboard-focused` custom state, reusing the host's `ElementInternals`. Soft dependency, for consistency with `swc-text-field`: native `:focus-visible` on a checkbox input already matches keyboard focus only. Consume it if it lands before Styling; otherwise ship native `:focus-visible` and adopt it later (non-breaking). |

**Not used:** `DisabledMixin` (C3).

**1st-gen consumers of `sp-checkbox`** (for migration-guide awareness, not gen2 dependencies): `sp-switch` (extends `CheckboxBase`), `sp-card` (selection checkbox), `sp-table` (`TableCheckboxCell`), plus `sp-field-group`, `sp-menu-item`, and `sp-dialog` stories. gen2 `swc-card` already dropped its selection checkbox, so no migrated gen2 component depends on `swc-checkbox` today.

---

## Open gen1 issues

<!-- Queried live: project = SWC AND component = "Checkbox" AND statusCategory != Done AND type not in (Epic, Initiative). Excluded by label: SWC-1182, SWC-1188 (`a11y`, tracked in the accessibility migration analysis) and SWC-2342 to SWC-2347 (`gen2`, this epic's phase tickets). SWC-2604 is a gen2 core story, listed under Dependencies. -->

| Jira | Type | Status (snapshot) | Summary | Notes |
| ---- | ---- | ----------------- | ------- | ----- |
| [SWC-1518](https://jira.corp.adobe.com/browse/SWC-1518) | Bug | To Do | `Checkbox.checked` property reported as not defined (GitHub #5970) | Typing/declaration report against the mixin-based class. gen2 declares `checked` as a typed public property on `CheckboxBase`; covered by a unit test in [Testing](#testing). |

## Migration sequencing and prerequisites

### Dependency-aware recommendation

**Proceed after the text field and radio branches merge.** `swc-checkbox` does not extend another gen2 component, but it waits for two branches. The first is the text field branch (Epic SWC-2323), which carries the shared form foundation (`LabellingMixin`, `FieldDescriptionMixin`, `FieldAssociationController`), implemented and tested but not yet on `main`. The second is the radio branch (`seckles/radio-migration`), which carries the `errorIcon` option of `renderFieldDescription()` that B14 needs and the radio and radio group patterns that checkbox reuses or aligns with (Q8, B14, B17). Waiting for both avoids rework while those patterns still shift. Checkbox joins text field and radio group as a consumer of the shared form foundation, and is its first boolean field, which validates the boolean-field path. `FieldAssociationController`'s docs already name checkbox, and its `setValue(value, state)` signature supports a checked-state restore value.

### Related components and ordering notes

- **`swc-switch`**: 1st-gen `sp-switch` extends `CheckboxBase` (`CheckboxMixin(Focusable)`). **Decision (Q4): no shared base class in gen2.** Switch composes the same mixins and controller in its own `Switch.base.ts`; the switch accessibility analysis already frames the relationship as a shared foundation (different role, no `mixed`, no `invalid`). The cost is a few duplicated lines (`checked`, the read-only toggle guard, form value), in exchange for two independent public APIs. If the duplication grows during switch's migration, extract a `ToggleFieldMixin` into core then.
- **`swc-checkbox-group`**: Has its own [accessibility migration analysis](../checkbox-group/accessibility-migration-analysis.md); SWC-2548 concluded a dedicated `swc-checkbox-group` replaces `sp-field-group` for checkboxes. **Decision (Q10): planned separately, outside this migration.** The checkbox is usable standalone, so it ships first. The group will later propagate `size`/`emphasized` with `SlotAttributePropagationController` and, when invalid, own the invalid state and its error message instead of each item (B18). Both behaviors leave this item's API unchanged. The group will also change where each item places its description, which needs a way to flag group membership on each item (Q7).
- **`swc-radio`**: Sibling form control. Checkbox does not extend `swc-radio`, but waits for the radio branch to merge (Q3). Radio renders its own label and does not use `LabellingMixin`; checkbox does (C4). Its styles inform checkbox's (Q8).
- **Shared `_lit-styles/` fragment**: The text field plan creates a shared `form-fields` stylesheet for label, required indicator, description, and error. How much of it checkbox shares is open (Q8).
- **Shared render template**: None. Checkbox anatomy (box, inline label, description below) is not shared with another component today; switch may become a second consumer later.
- **Global element stylesheet**: N/A. Checkbox is not a bare global element.

### User confirmation needed

Q8 (open until the Styling phase): recommended local description and error rules in `checkbox.css`, and styling the fixed classes that `renderLabel()` emits; the CSS reviewer confirms. Q3, Q4, and Q10 are settled in the [Decision log](#decision-log).

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
| B1 | Label moves to a named `label` slot | Default slot | `slot="label"`, rendered by `LabellingMixin`; default slot unused. Source: forms RFC naming table; the `swc-text-field` and `swc-radio` plans use the same slot. | Wrap label content: `<span slot="label">…</span>`. |
| B2 | Add `value` | No `value` property; attribute ignored | `value: string`, default `'on'` (native checkbox default). Submitted under `name` when checked. Source: React `value`, accessibility analysis. | None (additive). Form submission now works. |
| B3 | Add `required` | None | `required: boolean`; maps to native `required` on the inner input (implicit `aria-required`) and host `valueMissing` validity. Source: React `isRequired`, accessibility analysis. | None (additive). |
| B4 | Add `description` and `error-text` slots | None; help text needs a wrapping `sp-field-group` | Per-item `description` and `error-text` slots via `FieldDescriptionMixin`. Source: React `description`/`errorMessage`, accessibility analysis. | Move single-checkbox help text from `sp-field-group` `help-text`/`negative-help-text` into the checkbox's own slots. |
| B5 | Add `accessible-label`, `accessible-labelledby`, `accessible-describedby` | None | From the shared mixins. Source: forms RFC §3.3. | Replace any host `aria-label` with `accessible-label`. |
| B6 | Remove `tabIndex` override and disabled tabindex swap | Reflected `tabindex` property defaulting to `0`; swapped with the input when disabled | Native host `tabindex` only. This keeps the behavior the accessibility analysis asks for: native `disabled` on the inner input removes a disabled checkbox from the tab order, and `delegatesFocus` keeps a standalone checkbox one Tab stop. Source: HTML focus navigation for shadow hosts with `delegatesFocus`; accessibility analysis (`disabled`, keyboard and focus). | Remove explicit `tabindex="0"`; `tabindex="-1"` still works natively. |
| B7 | `handleChange()` and `inputElement` become internal | Public members (used by `sp-switch` and tests) | Not public API. Source: React S2 exposes neither (the inner input stays behind `inputRef`); `sp-switch`, the only 1st-gen consumer, migrates separately (Q4). | Use `checked`, the `change` event, `click()`, and `focus()`. |
| B8 | `size` gets an explicit default | `noDefaultSize`; effective `m` from CSS | Default `'m'`. Source: `swc-text-field` default, React default `M`. | None. |
| B9 | `checked` attribute semantics | `checked` reflects live state | **Confirmed (Q5).** Matches native `defaultChecked` and dirty checkedness: the `checked` attribute is the default (restored by `form.reset()`), and once the user or a script changes `checked`, later attribute changes no longer move live state. Lit's default attribute-to-property sync does not do this on its own. The property is live and not reflected. Source: native `<input type="checkbox">`, React `isSelected`/`defaultSelected`. | Replace `sp-checkbox[checked]` selectors with a property read or the `change` event. |
| B10 | `change` event shape | Cancelable `CustomEvent`; `preventDefault()` reverts | **Confirmed (Q6).** Non-cancelable `Event('change', { bubbles: true, composed: true })`, matching native; cancel a toggle by calling `preventDefault()` on `click`. Source: native `change` (not cancelable), React `onChange` (no cancel). | Move `preventDefault()` from `change` to `click`. |
| B21 | 1st-gen `CheckboxBase` and `CheckboxMixin` subpath exports removed | `./src/CheckboxBase.js` and `./src/CheckboxMixin.js` (with the `CheckboxElement` interface) are public subpath exports, used by `sp-switch` | No `CheckboxMixin` or `CheckboxElement`. gen2 core's `CheckboxBase` shares the 1st-gen name but is the abstract base for `swc-checkbox` only, not a shared toggle base. Source: Q4. | Code that extends 1st-gen `CheckboxBase` or applies `CheckboxMixin` composes the shared core mixins instead. |

#### Styling and visuals

| #   | What changes | 1st-gen behavior | gen2 behavior | Consumer migration path |
| --- | ------------ | ---------------- | ------------- | ----------------------- |
| B11 | `--mod-checkbox-*` and `--system-checkbox-*` removed | 38 modifiers plus 6 system bridges | Not exposed; a small reviewed `--swc-*` set only. Source: CSS style guide, [Component Custom Property Exposure](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/02_custom-properties.md#component-custom-property-exposure). | Remove overrides; request `--swc-*` properties if needed. |
| B12 | Icon elements replaced with inline S2 UI icons | `sp-icon-checkmark*`/`sp-icon-dash*` elements with ids `checkmark`/`partial-checkmark` | Inline `Checkmark`/`Dash` SVGs inside `.swc-Checkbox-box`, sized 50/75/100/200 for `s`/`m`/`l`/`xl` (C5). Source: Spectrum CSS `spectrum-two` template, gen2 UI icon set. | None for normal usage; tests querying `#checkmark` must change. |
| B13 | S2 visual refresh | S1 tokens | S2 tokens, including the new down-state perspective shift on the box. Source: Spectrum CSS `spectrum-two`. | None. |
| B14 | Invalid visual treatment | Negative border via `.is-invalid` | **Confirmed (Q1).** The box's border and fill colors do not change for invalid, per Design. A decorative error icon (`swc-icon-alert-triangle`, `aria-hidden`) shows whenever `invalid` is `true`: beside the error text, beside the description when there is no error text, and alone when there is neither, so the state never relies on color. The icon follows `invalid` even while disabled, as in `swc-radio-group`. Rendered through `renderFieldDescription()`'s `errorIcon` option, as `swc-radio-group` does. This settles the rendering question the accessibility analysis cites. Source: Design, in a Slack discussion relayed in plan review; `swc-radio-group` (radio branch). | None. |

#### Accessibility and behavior

| #   | What changes | 1st-gen behavior | gen2 behavior | Consumer migration path |
| --- | ------------ | ---------------- | ------------- | ----------------------- |
| B15 | Read-only fixed | Inner input `disabled`; announced as disabled; not focusable | Focusable; `aria-readonly="true"` on the inner input; toggle blocked. Source: accessibility analysis, forms RFC §3.1 (native `readonly` does not apply to checkboxes). | None. Behavior change: read-only checkboxes become Tab stops. |
| B16 | Form participation | None; never submits | `static formAssociated = true`; `FieldAssociationController.setValue(checked ? value : null, String(checked))`; `formResetCallback` restores the default checked state; `formDisabledCallback` cascade; `formStateRestoreCallback`. Source: accessibility analysis, forms RFC §3.1. | Checked checkboxes in a `<form>` now add `name=value` to its data; drop any code that collected them by hand. |
| B17 | Required and invalid validity | None | Host `setValidity()`, anchored to the inner input: `valueMissing` while `required && !checked`, cleared when checked; `customError` while `invalid`, so an application-set error blocks native submit and `checkValidity()` even when the box is checked. Neither applies while disabled or read-only: HTML [bars a form-associated custom element with `readonly`](https://html.spec.whatwg.org/multipage/custom-elements.html#attr-face-readonly) from constraint validation, unlike a native checkbox, which ignores `readonly`. `setValidity()` needs a non-empty message while a flag is set; the message source matches `swc-text-field`: its default custom message while `invalid`, otherwise the inner input's native message. Source: accessibility analysis (`required`), forms RFC §3.1; `swc-radio-group` (radio branch) and `swc-text-field` (text field branch) both turn `invalid` into `customError`. | Clear `invalid` once the error is resolved; while it is set, the form does not submit. |
| B18 | Invalid association | `aria-invalid` only | `aria-invalid="true"` on the inner input plus `error-text` associated with `ariaDescribedByElements` (the `aria-describedby` relationship that forms RFC §3.3 standardizes on). This applies to a standalone checkbox; inside a group, the group owns the invalid state (B18 in the Decision log). Source: accessibility analysis, forms RFC §3.3. | Provide `error-text` content with `invalid`; inside a group, on `swc-checkbox-group`. |
| B19 | Effective disabled includes form disabling | Own `disabled` only | Effective disabled = `disabled \|\| formDisabled`, where `formDisabled` comes from `formDisabledCallback` (an ancestor `<fieldset disabled>` or owning form). Applied as native `disabled` on the inner input. Source: forms RFC §3.1. | None. |
| B20 | Missing-name dev warning | None | `LabellingMixin` warns when no label slot, `accessible-label`, or resolvable `accessible-labelledby` is present. Source: accessibility analysis (axe and Storybook row), `LabellingMixin`. | Dev-time only. |

Unchanged from 1st-gen: the host sets no `role`, `delegatesFocus` stays `true`, and `checked` and `mixed` come from the native input (C1). `indeterminate` still clears on the next activation (C2).

### Additive — ships when ready, zero breakage for consumers already on gen2

| #   | What is added | Notes |
| --- | ------------- | ----- |
| A1 | `swc-checkbox-group` | Group label, description, error, "select at least one" validity, `size`/`emphasized` propagation, group-level invalid state (B18), and in-group item layout (Q7). |
| A2 | Additional `--swc-*` custom properties | Beyond the initial reviewed set, only on confirmed need. |
| A3 | Custom validation (`validate`) and `validationBehavior` | React parity; no 1st-gen equivalent. Revisit once the forms strategy settles a shared `setValidity()` pattern. B17 already makes `invalid` block submit; an `aria`-only mode, where `invalid` does not block, would come with A3. |
| A4 | Custom states (`:state(checked)`, `:state(indeterminate)`) | Styling hook for consumers now that `checked` no longer reflects (B9). Add on request. |

---

## gen2 API decisions

These are derived from the 1st-gen implementation, the [Figma `S2 / Web` checkbox component frame](https://www.figma.com/design/xHBWBBIe2eo5vwoCeNrC4Q/S2---Web?node-id=9961-2510), the React S2 implementation, Spectrum CSS `spectrum-two`, the [accessibility migration analysis](./accessibility-migration-analysis.md), and the [forms strategy RFC](../../05_strategies/forms-strategy-rfc.md). Confirmed items are marked; open items are tracked in [Blockers and open questions](#blockers-and-open-questions).

- **Confirmed**: directly supported by source material
- **Inferred**: recommended based on multiple signals, but not explicitly specified in one authoritative source
- **Open question**: unresolved and needs review or more input

### Public API

#### Properties / attributes (gen2)

| Property | Type | Default | Attribute | Notes |
| -------- | ---- | ------- | --------- | ----- |
| `checked` | `boolean` | `false` | `checked` | **Confirmed.** Attribute is the default; property is live (B9). |
| `indeterminate` | `boolean` | `false` | `indeterminate` (reflect) | **Confirmed.** Sets the inner input's `.indeterminate` (C2). |
| `disabled` | `boolean` | `false` | `disabled` (reflect) | **Confirmed.** Native `disabled` on the inner input (B19). |
| `readonly` | `boolean` | `false` | `readonly` (reflect) | **Confirmed.** Focusable, `aria-readonly="true"`, toggle blocked (B15). |
| `required` | `boolean` | `false` | `required` (reflect) | **Confirmed (new).** Native `required` on the inner input plus host validity. |
| `invalid` | `boolean` | `false` | `invalid` (reflect) | **Confirmed.** `aria-invalid="true"` only when `true` (B18); sets host `customError` validity, which blocks form submission (B17); `error-text` replaces `description` while `error-text` has content (Q7). In a group: B18. |
| `emphasized` | `boolean` | `false` | `emphasized` (reflect) | **Confirmed** by Figma: accent fill on checked and indeterminate only. |
| `size` | `'s' \| 'm' \| 'l' \| 'xl'` | `'m'` | `size` (reflect) | **Confirmed** by Figma (four sizes) and React default. |
| `name` | `string \| undefined` | `undefined` | `name` (reflect) | **Confirmed.** Form field name. |
| `value` | `string` | `'on'` | `value` | **Confirmed (new).** Submitted when checked. |
| `accessibleLabel` | `string` | `''` | `accessible-label` | **Confirmed.** From `LabellingMixin`. |
| `accessibleLabelledby` | `string \| undefined` | `undefined` | `accessible-labelledby` | **Confirmed.** From `LabellingMixin`; highest precedence. |
| `accessibleDescribedby` | `string \| undefined` | `undefined` | `accessible-describedby` | **Confirmed.** From `FieldDescriptionMixin`. |
| `autofocus` | `boolean` | `false` | `autofocus` | **Inferred.** Native global attribute with `delegatesFocus`; drop the JS `connectedCallback` handling if a test confirms native behavior works. |
| `form`, `validity`, `validationMessage`, `willValidate` | getters | n/a | none | **Inferred.** Expose the same `ElementInternals` read surface as `swc-text-field`. |
| `tabIndex` override | removed | n/a | n/a | B6. |

Methods: `click()` forwards to the inner input (no-op when effectively disabled; read-only blocks the toggle through the same guard as user clicks); `focus()` is native; `checkValidity()` and `reportValidity()` match `swc-text-field`.

Events: `change` (`Event`, `bubbles`, `composed`, not cancelable; B10). The native `input` event already crosses the shadow boundary (composed) and is not re-dispatched.

#### Visual matrix (gen2)

Based on the [Figma `S2 / Web` checkbox component frame](https://www.figma.com/design/xHBWBBIe2eo5vwoCeNrC4Q/S2---Web?node-id=9961-2510):

| Selection | Default | Emphasized | Hover | Disabled |
| --------- | ------- | ---------- | ----- | -------- |
| Unchecked | Yes | Not shown | Yes | Yes, `disabled-content-color` border |
| Indeterminate (Figma: Partial) | Yes, neutral fill | Yes, accent fill | Yes | Yes, `disabled-content-color` fill |
| Checked (Figma: Selected) | Yes, neutral fill | Yes, accent fill | Yes | Yes, `disabled-content-color` fill |

Figma shows no emphasized unchecked or emphasized disabled rows: `emphasized` changes only the checked and indeterminate fill. Disabled uses the `disabled-content-color` token with or without `emphasized`: for the box border, the checked and indeterminate fill, the label, and the description, with `GrayText` in forced colors. Disabled also suppresses the down-state shift. This matches `swc-radio`'s `radio.css`. **Confirmed (C6).**

Additional Figma-confirmed presentation modes:

- Sizes `s`, `m`, `l`, `xl`
- Label text wrap (`Text wrap = true`): the label wraps across lines and the box stays aligned to the first line. CSS behavior, not a property; take it from `swc-radio`'s `radio.css` (Q8).

Not shown in the Figma frame, sourced elsewhere:

- **Focus-visible**: the focus ring draws on the box (`.swc-Checkbox-box::after`), not on the native input, which is visually hidden. The inner input drives it through a sibling selector, as Spectrum CSS does (`.spectrum-Checkbox-input:focus-visible + .spectrum-Checkbox-box`), and the label takes its focus color the same way. **Inferred.**
- **Down (active)**: Spectrum CSS perspective shift, suppressed when read-only or disabled (C6); React has the matching `pressScale`. **Inferred.**
- **Invalid**: box colors unchanged; an error icon shows beside the help text, or alone (B14). **Confirmed (Q1).**
- **Read-only**: No distinct visual; keeps Spectrum CSS's suppression of the down-state transform. **Confirmed (Q2).**
- **Forced colors**: Spectrum CSS `@media (forced-colors: active)` block. **Confirmed** by Spectrum CSS and React.

#### Slots (gen2)

| Slot | Content | Notes |
| ---- | ------- | ----- |
| `label` | Visible label | **Confirmed.** B1. Optional when `accessible-label` or `accessible-labelledby` supplies the name. |
| `description` | Per-item description | **Confirmed (new).** B4. Replaced by `error-text` while `invalid` and `error-text` has content (Q7). |
| `error-text` | Error message shown while `invalid` | **Confirmed (new).** B4, B18. Slot name follows `swc-text-field`. |

#### CSS custom properties (gen2)

No `--mod-*` properties will be exposed. New `--swc-*` component-level properties may be introduced where needed — these are additive and not breaking. See [Component Custom Property Exposure](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/02_custom-properties.md#component-custom-property-exposure) for what to expose and how.

Each exposed `--swc-*` property must be documented with a `@cssprop` JSDoc tag on the primary SWC component class. Storybook picks these up and surfaces them in the API docs panel automatically.

Initial expectation for Checkbox is a small reviewed set. Candidates: control size and corner radius (the two values 1st-gen's `--system-checkbox-*` bridge and `--mod-*` users override most).

### Behavioral semantics

- **Toggling:** a click on the box or label, or <kbd>Space</kbd> on the focused input, toggles the native input. The host then clears `indeterminate`, syncs `checked`, updates form value and validity, and dispatches `change`. <kbd>Enter</kbd> does not toggle (native behavior).
- **Indeterminate:** a visual and assistive technology state only. Setting it does not change `checked` or the form value. The next user activation clears it and then toggles `checked` from its current value (1st-gen tests: indeterminate + checked → unchecked; indeterminate + unchecked → checked). React keeps it set after interaction; gen2 clears it (C2).
- **Read-only:** focus works. The `click` is cancelled, which reverts the native input's provisional toggle, so neither `input` nor `change` fires (mechanism: Q9).
- **Disabled:** effective disabled (B19) sets native `disabled`; `click()` is a no-op; the field is excluded from validation (`willValidate === false`).
- **Form value:** checked submits `name=value`; unchecked submits nothing (`setValue(null)`). The restore state is the checked boolean so back/forward navigation restores state, not just value.
- **Reset:** `formResetCallback` restores `checked` to its default (the `checked` attribute, B9). It leaves `indeterminate` untouched, matching native reset, and leaves `invalid` set, as a native custom validity message survives a reset.
- **Validity:** `required && !checked` sets `valueMissing`, and `invalid` sets `customError` (B17). Disabled and read-only checkboxes are barred from validation. The inner input is the validation anchor, so `reportValidity()` points at the box.

### Accessibility semantics notes (gen2)

The [accessibility migration analysis](./accessibility-migration-analysis.md) is authoritative, except where Q7, Q13, and B18 override it; the [Accessibility checklist](#accessibility) turns it into implementation items. Two points shape the design beyond that checklist:

- **Item-level state when standalone.** `invalid`, `required`, `readonly`, and form value all live on each checkbox, because a single checkbox is a complete control. Inside a group, the invalid state moves to the group (B18).
- **Expected axe false positive.** axe reports `label` on the roleless host. Exclude it per story with a `// reason:` comment that links the upstream axe-core issue, following forms RFC §3.4.

---

## Architecture: core vs SWC split

> The 1st-gen component is a **reference only** — gen2 is built independently. Neither generation imports from the other.

Follow the [Badge migration reference](../../02_workstreams/02_gen2-component-migration/02_step-by-step/01_washing-machine-workflow.md#reference-badge-migration) as the concrete pattern for the core/SWC split.

| Layer    | Path                                         | Contains                                                                                                                                                                                                                                          |
| -------- | -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Core** | `gen2/packages/core/components/checkbox/` | `Checkbox.base.ts`, `Checkbox.types.ts`, `index.ts`. Composes `SizedMixin`, `LabellingMixin`, `FieldDescriptionMixin`; owns `formAssociated`, `attachInternals()`, `FieldAssociationController`, validity, reset/restore callbacks, checked/indeterminate/readonly state, and `change` dispatch. Overrides `roleElement` to return the inner input. No rendering. |
| **SWC**  | `gen2/packages/swc/components/checkbox/`  | `Checkbox.ts`, `checkbox.css`, `swc-checkbox.ts`, `index.ts`, `checkbox.mdx`, `migration-guide.mdx`, stories, tests, and the S2 rendering/styling for `swc-checkbox`.                                                                                                            |

Planned rendering shape:

- Core owns API normalization, form participation, validity, and warnings.
- SWC renders: a `.swc-Checkbox` wrapper (position context) containing the visually hidden but full-size native input (Spectrum CSS pattern, so the whole box-plus-label area is the hit target), the `.swc-Checkbox-box` with the size-mapped `Checkmark`/`Dash` SVG, and `renderLabel()` output; then `renderFieldDescription()` output with the error icon (B14), placed per Q7 and outside the hit target, as React S2 keeps help text outside `CheckboxButton`.

Rationale for using `LabellingMixin` and skipping `DisabledMixin`: C4 and C3 in the [Decision log](#decision-log).

---

## Migration checklist

### Preparation (this ticket)

- [x] 1st-gen API surface documented
- [x] React Spectrum S2 API surface documented
- [x] Dependencies identified
- [x] Breaking changes documented
- [x] gen2 API decisions drafted
- [x] [Figma `S2 / Web` component frame](https://www.figma.com/design/xHBWBBIe2eo5vwoCeNrC4Q/S2---Web?node-id=9961-2510) reviewed
- [x] Open gen1 issues table populated from Jira
- [x] Out-of-scope work recorded in [Additive](#additive--ships-when-ready-zero-breakage-for-consumers-already-on-gen2) (A1–A4)
- [ ] Deferred ticket filed for A1 (Q12)
- [ ] Reviewer confirms Q11, which narrows SWC-2342's "tickets for all out-of-scope work" criterion to A1
- [ ] Plan reviewed by at least one other engineer

### Setup

- [ ] Confirm the text field branch (shared form mixins and controller) has merged to `main` (Q3)
- [ ] Confirm the radio branch has merged to `main`, including the `errorIcon` option of `renderFieldDescription()` (B14, Q3)
- [ ] Create `gen2/packages/core/components/checkbox/`
- [ ] Create `gen2/packages/swc/components/checkbox/`
- [ ] Wire exports in both `package.json` files
- [ ] Check out `spectrum-css` at `spectrum-two` branch as sibling directory

### API

#### Naming and public surface

- [ ] `Checkbox.types.ts`: define the `size` union with default `m` and the public interface
- [ ] `Checkbox.base.ts`: implement `checked`, `indeterminate`, `disabled`, `readonly`, `required`, `invalid`, `emphasized`, `size`, `name`, `value`
- [ ] Compose `LabellingMixin` and `FieldDescriptionMixin`; override `roleElement` to return the inner input
- [ ] `static formAssociated = true`, `attachInternals()`, `FieldAssociationController` with `onDisabledChange`
- [ ] `formResetCallback`, `formStateRestoreCallback`, `formDisabledCallback` delegation
- [ ] `setValidity()` for `valueMissing` and for `customError` while `invalid`, anchored to the inner input (B17)
- [ ] `click()` forwarding; non-cancelable `change` (B10); `checked` attribute as default, property live (B9)
- [ ] Keep the inner input reference and change handler private (B7); focus order relies on the native host `tabindex` (B6)
- [ ] Q9: write the read-only unit test first and confirm it fails, implement the guard, then record the mechanism in the Decision log

#### Alignment checks

- [ ] `form`, `validity`, `validationMessage`, `willValidate`, `checkValidity()`, and `reportValidity()` exist on the host with the same types as `swc-text-field`

### Styling

> Follow the [CSS style guide](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/) as the source of truth for all styling work. Key references: [migration steps](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/04_spectrum-swc-migration.md), [custom properties](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/02_custom-properties.md), [anti-patterns](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/05_anti-patterns.md).

- [ ] Add `.swc-Checkbox` to the internal wrapper in `render()`; keep styling off `:host`
- [ ] Copy S2 source from `spectrum-css` `spectrum-two` branch `index.css` (not `/dist`) into `checkbox.css` as baseline
- [ ] After the baseline copy, align `checkbox.css` with `swc-radio`'s `radio.css` where it fits (Q8): the box-and-label grid, label wrapping and first-line box alignment, size custom properties, label typography, and state colors, including `disabled-content-color` for disabled. Leave out its description layout and description font sizes (the in-group layout that Q7 defers), its host focus selectors (checkbox focuses the inner input), and its group read-only container query (checkbox read-only is per item)
- [ ] Map `.is-indeterminate`, `.is-readOnly`, `--emphasized`, and `--size*` selectors to host attribute selectors
- [ ] Q8: settle both open choices, record them in the Decision log, then implement them. Error text needs styles from the shared `form-fields` rules or `checkbox.css`; `radio.css` has none
- [ ] Style the label and required indicator that `renderLabel()` emits, per Q8. Its `swc-FormFieldLabel`, `swc-FormFieldLabel-requiredIndicator`, and `swc-FormFieldLabel-necessityLabel` classes are fixed; `checkbox.css` supplies the indicator and necessity-label styles
- [ ] Implement the Q7 standalone placement for description and error text
- [ ] After the baseline copy, remove the `.is-invalid` box color rules. Style the error icon to match `swc-radio-group`: negative color, one line tall, the `--swc-form-field-invalid-icon-gap` gap, and `CanvasText` in forced colors; copy these from the shared `form-fields` fragment if Q8 picks local rules (B14)

#### Visual model and regressions

- [ ] Carry over the CJK line-height rule (`:lang(ja)`, `:lang(ko)`, `:lang(zh)`) from the S2 source
- [ ] Verify label wrap keeps the box aligned to the first line at every size
- [ ] Carry over the `@media (forced-colors: active)` block from the S2 source
- [ ] Focus ring: draw it on `.swc-Checkbox-box`, not the visually hidden native input, and apply the label's focus color. Drive both from the inner input's `:focus-visible` with sibling selectors (`+` for the box; `~` for the label, which follows the box), or from the host's `keyboard-focused` state if the shared focus modality controller (SWC-2604) is available. Radio's host focus selectors don't apply (Q8)
- [ ] Add `@cssprop` JSDoc tag to the primary SWC component class for every exposed `--swc-*` property (e.g. `@cssprop --swc-checkbox-control-size - Inline and block size of the checkbox box.`)
- [ ] Pass stylelint (property order, `no-descending-specificity`, token validation)

### Accessibility

#### Naming and semantics

- [ ] Host sets no `role`; the inner native input supplies `checkbox`
- [ ] `delegatesFocus: true`; <kbd>Tab</kbd> and `focus()` land on the inner input
- [ ] Name precedence `accessible-labelledby` > `accessible-label` > `label` slot resolves on the inner input through `LabellingMixin` (Q13)
- [ ] `description` and `error-text` associate through `ariaDescribedByElements` only (the `aria-describedby` relationship); while `invalid` with error text, `error-text` replaces `description` in both the rendering and the association (Q7)
- [ ] Dev warning when no accessible name is available

#### State verification

- [ ] `aria-checked` (`true`/`false`/`mixed`) comes solely from the native inner input
- [ ] `indeterminate` clears on the next activation and stays out of the form value
- [ ] Effective disabled (B19) maps to native `disabled`, which removes the checkbox from the tab order
- [ ] `readonly` is focusable, exposes `aria-readonly="true"`, blocks toggling, and is not announced as disabled
- [ ] `invalid` sets `aria-invalid="true"` only when `true`, with associated error text; the error icon shows even without error text, so the state does not rely on color (B14); host `customError` (B17)
- [ ] `required` exposes `aria-required` (native) and host `valueMissing`
- [ ] Each checkbox is independently form-associated and submits its own `name`/`value`
- [ ] The box-plus-label hit target meets [WCAG 2.5.8](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html) target size at every size
- [ ] The box, checkmark, and dash meet 3:1 [non-text contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html) in unchecked, checked, and mixed states, and the error icon meets it while invalid

### Testing

Use red/green test-driven development (TDD): write each test below first, confirm it fails against the empty scaffold, then implement until it passes. Group the work in this order so each layer is green before the next starts: unit state → form participation → accessibility → keyboard → visual.

- [ ] Every row of the 1st-gen test mapping below is ported, rewritten, or dropped as its row says
- [ ] Add Playwright `checkbox.a11y.spec.ts` with `toMatchAriaSnapshot`

1st-gen test mapping:

| 1st-gen test | gen2 action |
| ------------ | ----------- |
| "loads", "loads default checkbox accessibly", "loads `checked` checkbox accessibly", "is `invalid` checkbox accessibly" | Port as ARIA snapshots |
| "autofocuses" | Port; verifies native `autofocus` with `delegatesFocus` |
| "`click()`ing host clicks `focusElement`" | Port against `click()` forwarding |
| "respects checked attribute", "has name attribute", "handles click events" | Port; the `checked` attribute sets the default only (B9) |
| "can have `change` events cancelled" | Rewrite: `preventDefault()` on `click` blocks the toggle; `change` is not cancelable (B10) |
| "should recognize readonly property", "maintains its value when [readonly]" | Port; add "is focusable and not disabled" |
| "`indeterminate, checked` becomes `not checked` on click", "`indeterminate, not checked` becomes `checked` on click" | Port unchanged |
| "updates checkmark icons in response to size", "updates partialCheckmark icons in response to size" | Rewrite for inline SVG sizes |
| "updates tabindex when no longer disabled" | Drop; replaced by tab-order tests |
| `checkbox-memory.test.ts` (`testForMemoryLeaks`) | Drop; gen2 has no memory-leak harness |
| `checkbox.test-vrt.ts`, `checkbox-sizes.test-vrt.ts` | Replace with the gen2 visual regression test (VRT) stories under **Visual regression** in [Testing](#testing) |

#### Behavior

Unit (`test/checkbox.test.ts`):

- [ ] Shadow root contains one `<input type="checkbox">`; host has no `role`
- [ ] `size` defaults to `m`; invalid sizes fall back per `SizedMixin`
- [ ] `checked` is a declared, typed public property readable from a `change` handler's `currentTarget` (regression for SWC-1518)
- [ ] `checked` property ↔ inner input `checked` stay in sync both ways
- [ ] After a user toggle, changing the `checked` attribute does not change `checked`; `form.reset()` restores the attribute's value (B9)
- [ ] `indeterminate` sets the inner input's `.indeterminate`; activation clears it and toggles correctly from both checked and unchecked
- [ ] User toggle dispatches exactly one `change` on the host (bubbles, composed); programmatic `checked` changes dispatch none
- [ ] `change` is not cancelable; `preventDefault()` on `click` blocks the toggle and no `change` fires
- [ ] `click()` toggles when enabled; no-op when disabled
- [ ] `readonly`: click and <kbd>Space</kbd> do not toggle; no `change`; inner input not `disabled`; `aria-readonly="true"`
- [ ] `disabled`: inner input `disabled`; `click()` no-op
- [ ] `invalid`: `aria-invalid="true"` only when `true`; attribute removed when `false`
- [ ] `required`: inner input `required`
- [ ] Label slot content names the input; `accessible-label` names it without a label slot and wins over slotted label content; `accessible-labelledby` wins over both
- [ ] `description` associated by default; while `invalid` with error text, `error-text` replaces it in the rendering and the association; `description` returns when `invalid` clears (Q7)
- [ ] While `invalid`, the `aria-hidden` error icon renders beside the error text, beside the description when there is no error text, and alone when there is neither; it is gone when `invalid` clears (B14)
- [ ] `accessible-describedby` adds the referenced elements to the inner input's description
- [ ] Dev warning fires with no name source

Form participation (in a native `<form>` with native submit and reset buttons, per forms RFC §3.5):

- [ ] Checked submits `name=value`; unchecked contributes nothing; default `value` is `on`
- [ ] Checkboxes that share a `name` each submit their own `value` when checked, so `FormData.getAll(name)` returns one entry per checked box, in document order
- [ ] `required` and unchecked blocks submit in a form without `novalidate`; `checkValidity()` is `false`; `reportValidity()` shows the Spectrum error presentation instead of the native bubble (Q14); the host matches `:invalid`; checking clears it
- [ ] `invalid` blocks submit even when checked; `checkValidity()` is `false` and `validity.customError` is `true`; clearing `invalid` clears both (B17)
- [ ] A read-only checkbox is barred from validation: `willValidate` is `false`, and neither `required` nor `invalid` blocks submit (B17)
- [ ] After a user interaction or a failed submit, the host matches `:state(user-invalid)`. The native `:user-invalid` applies only to `input`, `textarea`, and `select`, so it never matches the host ([whatwg/html#9639](https://github.com/whatwg/html/issues/9639))
- [ ] `form.reset()` restores the default checked state and leaves `invalid` and its `customError` in place
- [ ] `formStateRestoreCallback` with state `'true'` or `'false'` restores `checked`
- [ ] `<fieldset disabled>` disables the checkbox and excludes it from `FormData` and validation
- [ ] Value read programmatically matches the submitted value across checked, unchecked, and post-reset states

Keyboard (Playwright):

- [ ] Standalone checkbox is one Tab stop; <kbd>Space</kbd> toggles; <kbd>Enter</kbd> does not
- [ ] Several checkboxes are each a Tab stop; arrow keys do not move focus
- [ ] Disabled is skipped by <kbd>Tab</kbd>; read-only is reached but does not toggle
- [ ] <kbd>Tab</kbd> shows the focus ring on the box and the label focus color; a pointer click does not show the ring

Accessibility (`checkbox.a11y.spec.ts` plus Storybook axe):

- [ ] ARIA snapshots for unchecked, checked, mixed, disabled, read-only, required, invalid, and no-visible-label stories, plus each size (`s`/`m`/`l`/`xl`) and default/emphasized to confirm neither changes role, name, or state (accessibility analysis)
- [ ] axe passes on all stories, with the documented host `label` false-positive exclusion only
- [ ] Manual screen reader pass (VoiceOver, NVDA, plus Firefox): `mixed` announced; read-only announced as read-only; error text announced

#### Visual regression

- [ ] VRT for every "Yes" cell of the visual matrix in [Public API](#public-api), at each size
- [ ] VRT for wrapped labels at every size
- [ ] VRT for invalid: box colors unchanged across unchecked, checked, indeterminate, emphasized, and disabled; error icon with error text, with only a description, and alone; error icon visible in forced colors (B14)
- [ ] VRT for the focus-visible ring on the box, including that it is not clipped
- [ ] VRT for forced-colors mode across checked, indeterminate, and disabled
- [ ] VRT for description and error text placement (Q7), at every size and with a wrapped label
- [ ] Custom-properties VRT for each exposed `--swc-*` property

### Documentation

#### General

- [ ] JSDoc on all public props, slots, events, and CSS custom properties
- [ ] Storybook stories: Playground; Overview; Anatomy (label, description, error text); Options (sizes, emphasized); States (checked, indeterminate, disabled, read-only, required, invalid); Behaviors (form participation in a native `<form>`, `change` event); Accessibility (no-visible-label with `accessible-label`, grouped checkboxes inside a labelled native `fieldset` until `swc-checkbox-group` exists)
- [ ] `checkbox.mdx` docs page per the stories-documentation guide

#### Breaking changes

- [ ] `migration-guide.mdx` has one entry per B row whose Consumer migration path asks consumers to act or changes behavior they can observe: B1, B4, B5, B6, B7, B9, B10, B11, B12, B15, B16, B17, B18, B21

### Review

- [ ] `yarn lint:gen2` passes (ESLint, Stylelint, Prettier)
- [ ] Status table in workstream doc updated
- [ ] PR created with description referencing Epic SWC-2340
- [ ] Peer engineer sign-off

---

## Blockers and open questions

During drafting, this section tracks active blockers and open questions. As each item resolves, move it out of these tables: settled **decisions** go to the [Decision log](#decision-log) (with their rationale), and **deferred** items with tickets go to the deferred-ticket table. In the final review-ready plan, these tables should contain only genuinely open items plus the deferred-ticket table.

### Design

| #   | Item | Blocking? | Status | Owner |
| --- | ---- | --------- | ------ | ----- |

_None currently; Q1 and Q2 resolved, see [Decision log](#decision-log)._

### Architecture and behavior

| #   | Item | Blocking? | Status | Owner |
| --- | ---- | --------- | ------ | ----- |
| Q8 | Direction from review: checkbox mostly uses custom styles, with `swc-radio`'s `radio.css` as a base where it fits, and likely won't fully share the shared `form-fields` `_lit-styles/` fragment. The fragment's `.swc-FormFieldLabel` rules lay out the labels of `swc-text-field` and `swc-radio-group` above or to the side of the field, not inline after a control, so the checkbox label needs its own styles. Open choices: (a) whether description and error text reuse the fragment's `.swc-FormFieldDescription` and `.swc-FormFieldErrorText` rules or get local rules, judged against the Q7 placement; (b) whether `checkbox.css` styles the fixed `swc-FormFieldLabel*` classes that `renderLabel()` emits, or the directive gains a class option. Recommended: local rules for (a), and the fixed classes for (b), which needs no core change. | No | Open: settle in the Styling phase | CSS reviewer |
| Q9 | Exact read-only mechanism (likely `preventDefault()` on the inner input's `click` while read-only, which also blocks <kbd>Space</kbd>). Settle in API phase with a test first. | No | Open | Implementation |
| Q14 | Where to suppress the native validation bubble, shared with `swc-text-field`. Cancelling the host's `invalid` event suppresses the bubble and keeps submit blocking, but the browser then skips focusing the field on a failed submit. The shared behavior must therefore cancel the event, turn on the invalid presentation through `:state(user-invalid)`, and focus the first invalid field. It must not set `invalid`, which adds a `customError` that checking the box cannot clear (B17). Recommended: one opt-in behavior on `FieldAssociationController`, which needs the host passed in to listen for `invalid`. Text field currently relies on `novalidate` plus a consumer submit handler, and its [accessibility analysis](../text-field/accessibility-migration-analysis.md) defers the decision to the forms strategy. Open edge case: in a form that mixes native and `swc-` fields, a later native field can take focus ahead of an earlier `swc-` field. | Yes | Open: blocks the accessibility phase | Forms strategy owners + accessibility reviewer |

### Scope and prerequisites

| #   | Item | Blocking? | Status | Owner |
| --- | ---- | --------- | ------ | ----- |
| Q12 | File a `deferred` ticket for A1 (`swc-checkbox-group`) under Epic SWC-2340, then move A1 into the deferred-ticket table. Required before SWC-2342 closes. | No | Open | Team |

_Q10 and Q11 are settled in the [Decision log](#decision-log)._

### Deferred tickets

| Ticket | Deferred item | Why deferred | Related plan section |
| ------ | ------------- | ------------ | -------------------- |

_None yet (Q12)._

A2–A4 have no tickets by decision (Q11): they are on-request or follow from shared work, and the [Additive](#additive--ships-when-ready-zero-breakage-for-consumers-already-on-gen2) table is their record.

---

## Decision log

`C#` rows record decisions made while drafting or in review that never had a `Q` or `B` id.

| Ref | Decision | Rationale / context |
| --- | -------- | ------------------- |
| C1 | Keep a native `<input type="checkbox">` in shadow DOM; host sets no role. | Accessibility analysis and forms RFC §3.2. 1st-gen already does this; only form association and labelling wiring change. |
| C2 | `indeterminate` clears on the next activation (diverges from React). | 1st-gen behavior and tests, the accessibility analysis, and the ARIA Authoring Practices Guide mixed-checkbox example all clear it on activation. React's "presentational only" behavior would be a silent behavior change for 1st-gen consumers. |
| C3 | Implement `disabled` as native `disabled` on the inner input, in place of `DisabledMixin`. | `DisabledMixin` sets `aria-disabled` on the host and swaps the host `tabindex`, which suits host-role components. The checkbox host has no role, B6 removes the swap, and the accessibility analysis requires native `disabled` on the inner input. |
| C4 | Use `LabellingMixin` (unlike `swc-radio`). | Checkboxes without visible text are an evidenced pattern (table row selection, card selection), so `accessible-label`/`accessible-labelledby` are needed. |
| C5 | Icon size mapping 50/75/100/200 for `s`/`m`/`l`/`xl`. | Spectrum CSS `spectrum-two` template; matches React's "one size smaller than the control" rule. |
| C6 | Disabled uses the `disabled-content-color` token, as specified in the note under the visual matrix in [Public API](#public-api). | From plan review: matches `swc-radio`'s `radio.css`, and replaces the earlier inference from React S2's `gray-400`. |
| Q1 / B14 | Invalid leaves the box colors unchanged; a decorative error icon marks the state, as specified in B14. | Design decided, in a Slack discussion relayed in plan review, that invalid does not change the input's border or fill. This matches Figma, where checkbox has no invalid state, and follows Spectrum CSS, which already removed radio's invalid styles ([spectrum-css#2209](https://github.com/adobe/spectrum-css/pull/2209)). The error icon copies the `swc-radio-group` decision: it shows whenever `invalid` is set, so the state never relies on color alone. This replaces the earlier plan to follow React S2's negative box colors and brings the error icon, formerly A5, into scope. |
| Q2 | Read-only has no distinct visual treatment; it looks like the enabled state. Spectrum CSS's suppression of the down-state transform for read-only is kept. | Follows React S2, whose checkbox styles have no read-only condition. Figma's component frame has no read-only state. Read-only is conveyed to assistive technology by `aria-readonly="true"`. |
| Q3 | Build on the shared form mixins and controller; start Setup (SWC-2343) after the text field branch and the radio branch both merge to `main`. | The foundation exists only on the text field branch; building on it avoids a second labelling and form implementation and validates its boolean-field path. Plan review asked to wait for the radio branch too, so checkbox reuses settled radio patterns instead of chasing them while they shift; that branch also carries the `errorIcon` option that B14 needs. Details: [Dependency-aware recommendation](#dependency-aware-recommendation). |
| Q4 | No shared toggle base class with `swc-switch`. | Switch has a different role and no `mixed` or `invalid`; composing the same mixins keeps the two public APIs independent. Details: [Related components and ordering notes](#related-components-and-ordering-notes). |
| Q5 / B9 | `checked` follows native semantics, as specified in B9. | A reflected attribute cannot serve as the reset default. Matches `<input type="checkbox">` and React's controlled/uncontrolled split (`isSelected`/`defaultSelected`). Custom states (A4) remain available as a styling hook. |
| Q6 / B10 | `change` follows native semantics, as specified in B10. | Matches native checkbox behavior; React has no cancel. Removes the 1st-gen revert path in `handleChange()`. |
| Q7 | Description and error text. **Swap:** use `FieldDescriptionMixin` unchanged, so `error-text` replaces `description` while `invalid` and `error-text` has content. **Placement:** on a standalone checkbox, both sit fully below the box and label, starting at the box's inline-start edge, at the control's text size. | Swapping is the correct default: it matches React S2 and `swc-text-field`, which uses the same mixin, and the description returns once `invalid` clears. The need to show both came partly from an earlier idea of wrapping a single checkbox in a checkbox group to get the in-group layout. Grid layout or slot placement inside `swc-checkbox` can produce either layout, so no wrapper is needed. This supersedes the accessibility analysis's two notes that a standalone required checkbox keeps its description alongside the error, under [ARIA roles, states, and properties](./accessibility-migration-analysis.md#aria-roles-states-and-properties) and [Shadow DOM and cross-root ARIA issues](./accessibility-migration-analysis.md#shadow-dom-and-cross-root-aria-issues). Placement follows React S2's standalone layout. In a group, React S2 moves the description under the label, one size smaller, and `swc-radio` uses the same under-label placement; the group layout waits for `swc-checkbox-group` (A1), because the item needs a way to flag group membership. |
| Q10 | `swc-checkbox-group` is outside this migration. | The checkbox works standalone, so it ships first. Details: [Related components and ordering notes](#related-components-and-ordering-notes). |
| Q11 | Only A1 gets a deferred ticket; A2–A4 are tracked in the Additive table without tickets. | A2 and A4 are on-request; A3 belongs to the shared forms strategy. Keeps the backlog limited to real, scheduled work. The former A5, the error icon, moved into scope with B14. |
| Q13 | Use `LabellingMixin`'s name wiring unchanged: an in-shadow `<label for>` names the inner input from the `label` slot, `aria-label` carries `accessible-label`, and `ariaLabelledByElements` carries `accessible-labelledby`. | Testing during plan review found an in-shadow `<label for>` acceptable, and it matches `swc-text-field`. Browsers rank `aria-labelledby` over `aria-label` over a native label, so the precedence matches the order the accessibility analysis specifies. Internal wiring only; no public API change. This supersedes the accessibility analysis's description of the slotted label wired through `ariaLabelledByElements`, under [ARIA roles, states, and properties](./accessibility-migration-analysis.md#aria-roles-states-and-properties), [Shadow DOM and cross-root ARIA issues](./accessibility-migration-analysis.md#shadow-dom-and-cross-root-aria-issues), and [Summary checklist](./accessibility-migration-analysis.md#summary-checklist). |
| B17 | `invalid` sets host `customError` validity, so it blocks native submit and `checkValidity()` even when the box is checked. | Settled in plan review. It covers errors the application sets, such as a checked option the application then rejects, and matches `swc-radio-group` and `swc-text-field`. Details, including the read-only and disabled exceptions: B17. |
| B18 | Inside a group, `swc-checkbox-group` owns the invalid state, its error text, and its constraint validity; items show no error text or error icon of their own. | From plan review; the checkbox-group plan confirms the details. This supersedes the accessibility analysis notes that keep item-level invalidity in a group, under [Overview](./accessibility-migration-analysis.md#overview) and [ARIA roles, states, and properties](./accessibility-migration-analysis.md#aria-roles-states-and-properties). How the group exposes the state to assistive technology is the checkbox-group plan's decision; its [accessibility analysis](../checkbox-group/accessibility-migration-analysis.md#aria-roles-states-and-properties) advises against `aria-invalid` on `role="group"` without a separate standards and assistive-technology decision. Details: B18. |

---

## References

- [Washing machine workflow](../../02_workstreams/02_gen2-component-migration/02_step-by-step/01_washing-machine-workflow.md)
- [gen2 migration status table](../../02_workstreams/02_gen2-component-migration/01_status.md)
- [Accessibility migration analysis](./accessibility-migration-analysis.md)
- [Rendering and styling migration analysis](./rendering-and-styling-migration-analysis.md)
- [Checkbox group accessibility migration analysis](../checkbox-group/accessibility-migration-analysis.md)
- [Switch accessibility migration analysis](../switch/accessibility-migration-analysis.md)
- [Radio migration plan](../radio/migration-plan.md): sibling form control; precedent for the `label` slot; its branch (`seckles/radio-migration`) must merge before Setup (Q3)
- [Forms strategy RFC](../../05_strategies/forms-strategy-rfc.md)
- [gen2 shared resources quick reference](../../../01_contributor-guides/16_gen2-shared-resources.md)
- [CSS style guide — Component Custom Property Exposure](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/02_custom-properties.md#component-custom-property-exposure)
- [CSS style guide — Selector conventions](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/02_custom-properties.md#selector-conventions)
- [1st-gen source](../../../../1st-gen/packages/checkbox/src/Checkbox.ts)
- [1st-gen shared base / mixins](../../../../1st-gen/packages/checkbox/src/): `CheckboxMixin.ts`, `CheckboxBase.ts`
- [1st-gen tests](../../../../1st-gen/packages/checkbox/test/checkbox.test.ts)
- [1st-gen README](../../../../1st-gen/packages/checkbox/README.md)
- [React Spectrum S2 Checkbox docs](https://react-spectrum.adobe.com/Checkbox)
- [React Spectrum S2 Checkbox source](https://github.com/adobe/react-spectrum/blob/main/packages/%40react-spectrum/s2/src/Checkbox.tsx)
- [Spectrum CSS `spectrum-two`, `components/checkbox/index.css`](https://github.com/adobe/spectrum-css/blob/spectrum-two/components/checkbox/index.css): reviewed via sibling checkout, along with `components/checkbox/stories/template.js`
- gen2 UI icons: [`Checkmark` and `Dash`](../../../../gen2/packages/swc/components/ui-icons/icon-set/index.ts)
- [Figma `S2 / Web` checkbox component frame](https://www.figma.com/design/xHBWBBIe2eo5vwoCeNrC4Q/S2---Web?node-id=9961-2510): size × selection × emphasis × state × text wrap
- [Badge migration reference](../../02_workstreams/02_gen2-component-migration/02_step-by-step/01_washing-machine-workflow.md#reference-badge-migration)
- Epic: SWC-2340, Checkbox migration epic
- SWC-2341: checkbox accessibility research (source of the accessibility migration analysis)
- SWC-2342: "[Checkbox] Analyze component and create migration plan"; this document is its deliverable
- SWC-2343: "Update [Checkbox] file structure, API, TypeScript, and accessibility" (Setup, API, and accessibility phases)
- SWC-2344: "[Checkbox] Full S2 visual fidelity" (Styling phase)
- SWC-2345: "[Checkbox] Review and complete test suites" (Testing phase)
- SWC-2346: "[Checkbox] Storybook docs and consumer migration guide" (Documentation phase)
- SWC-2347: "[Checkbox] Review and finalize migration" (Review phase)
- SWC-1518: `Checkbox.checked` not defined (open 1st-gen bug)
- SWC-2604: shared focus modality controller (soft dependency)
- SWC-2323: text field epic, source of the shared form foundation (Q3)
- SWC-2466: shared labelling work (`LabellingMixin`)
- SWC-2467: `FieldAssociationController`
- SWC-2548: `swc-field-group` scoping spike; concluded a dedicated `swc-checkbox-group`
- SWC-1888: RFC, form field strategy for gen2 migration

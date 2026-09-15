<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../../README.md) / [Project planning](../../README.md) / [Components](../README.md) / Checkbox / Checkbox accessibility migration analysis

<!-- Document title (editable) -->

# Checkbox accessibility migration analysis

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [Overview](#overview)
    - [Also read](#also-read)
    - [What it is](#what-it-is)
    - [When to use something else](#when-to-use-something-else)
    - [What it is not](#what-it-is-not)
    - [Related](#related)
- [ARIA and WCAG context](#aria-and-wcag-context)
    - [Pattern in the APG](#pattern-in-the-apg)
    - [Guidelines that apply](#guidelines-that-apply)
- [Related 1st-gen accessibility (Jira)](#related-1st-gen-accessibility-jira)
- [Recommendations: `<swc-checkbox>`](#recommendations-swc-checkbox)
    - [ARIA roles, states, and properties](#aria-roles-states-and-properties)
    - [Shadow DOM and cross-root ARIA Issues](#shadow-dom-and-cross-root-aria-issues)
    - [Accessibility tree expectations](#accessibility-tree-expectations)
    - [Keyboard and focus](#keyboard-and-focus)
- [Testing](#testing)
    - [Automated tests](#automated-tests)
- [Summary checklist](#summary-checklist)
- [References](#references)

</details>

<!-- Document content (editable) -->

## Overview

This doc tells you how **`swc-checkbox`** should work for **accessibility**, targeting **WCAG 2.2 Level AA**. `swc-checkbox` is the 2nd-gen replacement for 1st-gen `sp-checkbox`: an independent on/off (or tri-state) selection.

The defining difference from [`swc-radio`](../radio/accessibility-migration-analysis.md) is that **a checkbox is a complete control on its own**. A single checkbox is a valid, common pattern (for example a required "I agree to the terms of service" box), so `swc-checkbox` keeps its own Tab stop, its own accessible name, its own `invalid`/`required` state, and its own form participation, whether or not it is inside a group. When checkboxes are grouped, the group is **multi-select**: every item is an independent boolean, unlike a radio group's single mutually-exclusive value. Because of that, this doc treats `swc-checkbox` as the primary, self-contained unit and defers only the group-wide concerns (a shared visible label, "select at least one" validation) to the checkbox group.

### Also read

- [Checkbox migration roadmap](./rendering-and-styling-migration-analysis.md) for layout, CSS, and DOM.
- Checkbox group accessibility migration analysis, for the multi-select container that supplies a group label and group-level validation across a set of checkboxes (not yet written as of this doc; whether the group ships as part of the checkbox epic or as a migrated `swc-field-group` is a research spike, [SWC-2548](https://jira.corp.adobe.com/browse/SWC-2548)).
- [Radio accessibility migration analysis](../radio/accessibility-migration-analysis.md), the single-select sibling pattern, for the contrast in how selection, form value, and keyboard focus are owned.
- [Forms Strategy: 2nd-Gen Proposal](../../05_strategies/forms-strategy-rfc.md), specifically [§3.1](../../05_strategies/forms-strategy-rfc.md#31-form-participation-elementinternals--face) on form participation and [§3.2](../../05_strategies/forms-strategy-rfc.md#32-where-aria-roles-live) on where the ARIA role lives.

### What it is

- An independent selectable option. `swc-checkbox` can stand entirely on its own (a single required consent box), or appear alongside other checkboxes in a multi-select group. Either way it owns its own Tab stop, name, checked state, validity, and form value. This is a deliberate contrast with 1st-gen-to-2nd-gen `swc-radio`, which drops standalone support and delegates its tabindex and selection entirely to its group; `swc-checkbox` keeps 1st-gen `sp-checkbox`'s standalone behavior (host `tabIndex` defaults to `0`) because a lone checkbox is a first-class use case, not a degenerate group.
- Renders a real, native `<input type="checkbox">` inside its own shadow DOM to carry `role="checkbox"`, `checked`, `aria-checked` (including `"mixed"`), and keyboard activation natively, the same shadow-DOM-first pattern `swc-text-field` uses for its `<input type="text">` and `swc-radio` uses for its `<input type="radio">`. The host itself sets no role. This follows the forms strategy RFC's general rule that the role element defaults to the shadow DOM (see [§3.2](../../05_strategies/forms-strategy-rfc.md#32-where-aria-roles-live)); a checkbox has a native equivalent, so it does not need the host-role exception reserved for container roles such as `radiogroup`.
- Form-associated on its own host. Because a native input inside the shadow root is invisible to an ancestor light-DOM `<form>`, `swc-checkbox` mirrors its value to the form through `ElementInternals` (`setFormValue`) on the host, while the role and name stay on the inner input. This "role on the inner input, form value on the host" split is exactly the hybrid pattern the [form-strategy proof-of-concept](https://github.com/nikkimk/web-component-form-strategy-demos)'s [`checkbox-hybrid.js`](https://github.com/nikkimk/web-component-form-strategy-demos/blob/main/checkbox-hybrid.js) models, and the same `checkbox-hybrid.js`/[`labelling-controller.js`](https://github.com/nikkimk/web-component-form-strategy-demos/blob/main/labelling-controller.js) pair the [radio doc](../radio/accessibility-migration-analysis.md#shadow-dom-and-cross-root-aria-issues) cites for its labelling wiring.

### When to use something else

- Turning a single setting on or off as an action (enabling Wi-Fi, muting sound): use a switch. Reserve checkbox for selecting or marking items, and for consent, rather than for immediately-applied on/off actions.
- Exactly one option from a mutually exclusive set must be chosen: use [radio](../radio/accessibility-migration-analysis.md) and a radio group, where selecting one clears the others. A checkbox group never enforces "only one".
- A large or dynamic list of options that does not fit the available space: use a picker or combobox. Checkbox (and checkbox group) exists so every option stays visible at once.

### What it is not

- Not a radio. Radios in a group are mutually exclusive and share one value; checkboxes in a group are independent booleans, each with its own value and form participation. This difference is why form value and keyboard focus live on the item for checkbox but on the group for radio.
- Not a switch. A switch signals an immediately-applied on/off action and uses `role="switch"`; a checkbox signals selection or consent and uses `role="checkbox"`, including the tri-state `"mixed"` value a switch never has.

### Related

- Checkbox group, the multi-select container for a set of checkboxes that supplies a group-wide visible label and group-level validation ("select at least one"). No separate 1st-gen `CheckboxGroup` class exists; 1st-gen groups `sp-checkbox` elements with `sp-field-group`, whose 2nd-gen fate is the [SWC-2548](https://jira.corp.adobe.com/browse/SWC-2548) research spike. This doc's recommendations for `swc-checkbox` hold whether or not that group ships, because the item is self-contained.
- Tri-state parent/child selection: a checkbox that summarizes a set of child checkboxes shows the indeterminate (`"mixed"`) state when its children are partially selected. That state lives on the individual `swc-checkbox` (see [ARIA roles, states, and properties](#aria-roles-states-and-properties)); coordinating which parent reflects which children is application logic, not something `swc-checkbox` decides.

---

## ARIA and WCAG context

### Pattern in the APG

- The [Checkbox pattern](https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/) is the normative reference. APG documents two variants: a two-state checkbox (`aria-checked` is `true`/`false`) and a [tri-state checkbox](https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/examples/checkbox-mixed/) (`aria-checked` can also be `"mixed"`). `swc-checkbox` supports both, since 1st-gen `sp-checkbox` already exposes an `indeterminate` state.
- Unlike the [Radio Group pattern](https://www.w3.org/WAI/ARIA/apg/patterns/radio/), the checkbox pattern is complete for a single control: a lone checkbox needs no container to be a valid, fully-specified widget. APG's checkbox examples assume a native `<input type="checkbox">` (or an element with `role="checkbox"`), where the browser supplies role, `checked`/`mixed` state, and <kbd>Space</kbd> activation. `swc-checkbox` keeps that native element inside its own shadow DOM, so the browser continues to supply role, state, and keyboard activation the same way APG's examples assume.
- A group of checkboxes uses `role="group"` (not `radiogroup`) with a group label, and every checkbox stays an independent Tab stop; the checkbox pattern has **no roving tabindex** and **no arrow-key navigation** across items, again unlike radio.

### Guidelines that apply

| Idea | Plain meaning |
| --- | --- |
| [Name, role, value (WCAG 4.1.2)](https://www.w3.org/TR/WCAG22/#name-role-value) | Each checkbox needs role `checkbox`, an accessible name from its label, and a `checked` state (`true`/`false`/`mixed`) that tracks real selection. The native inner `<input type="checkbox">` supplies role and state; `swc-checkbox` supplies the name. |
| [Info and relationships (WCAG 1.3.1)](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html) | When checkboxes are grouped, the grouping and the shared group label must be programmatic (`role="group"` plus an accessible name on the group), not just visual proximity. 1st-gen has open reports of missing group association ([SWC-1188](https://jira.corp.adobe.com/browse/SWC-1188)); the group association is the checkbox group's responsibility, but each item must still expose its own name so the pairing reads correctly. |
| [Labels or instructions (WCAG 3.3.2)](https://www.w3.org/WAI/WCAG22/Understanding/labels-or-instructions.html) | A visible label is required, both per checkbox and for a group of related checkboxes; 1st-gen tracks a missing group label ([SWC-1182](https://jira.corp.adobe.com/browse/SWC-1182)). |
| [Error identification (WCAG 3.3.1)](https://www.w3.org/WAI/WCAG22/Understanding/error-identification.html) | When a checkbox is invalid (for example a required consent box left unchecked), the error must be conveyed in text and programmatically associated, not implied. 1st-gen has a fixed report where the error was not described in text ([SWC-1154](https://jira.corp.adobe.com/browse/SWC-1154)); pair `aria-invalid` with an associated error message. |
| [Use of color (WCAG 1.4.1)](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html) | Invalid state must not be signaled by color alone; 1st-gen has an open report on this ([SWC-1169](https://jira.corp.adobe.com/browse/SWC-1169)). This intersects the open design question in the [rendering roadmap](./rendering-and-styling-migration-analysis.md#css--swc-implementation-gaps) about whether an individual checkbox shows a red border at all, versus surfacing the error only through associated help text. |
| [Keyboard (WCAG 2.1.1)](https://www.w3.org/TR/WCAG22/#keyboard) | Toggling a checkbox, and moving to and from it, must work without a pointer. |
| [Focus visible (WCAG 2.4.7)](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html) | The focus indicator on a focused checkbox must stay visible and distinct in every size and style. |
| [Non-text contrast (WCAG 1.4.11)](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html) | The box, the checkmark, and the indeterminate dash each need 3:1 contrast against their background across checked, unchecked, and mixed states. |
| [Target size minimum (WCAG 2.5.8)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html) | The clickable or tappable area (box plus label, per the Figma anatomy) should meet minimum target size across the `s`/`m`/`l`/`xl` sizes. |

**Bottom line:** `swc-checkbox` keeps a real, native `<input type="checkbox">` in its own shadow DOM, so role, `checked`/`mixed`, and <kbd>Space</kbd> activation come from the browser. The accessibility work for the item is correctly labelling that inner input, mirroring its value to the form through the host's `ElementInternals`, exposing `invalid`/`required` at the item level (where a standalone checkbox genuinely needs them), and fixing 1st-gen's read-only implementation. Group-wide concerns (a shared visible label, "select at least one" validation) belong to the checkbox group.

---

## Related 1st-gen accessibility (Jira)

| Jira | Type | Status (snapshot) | Resolution (snapshot) | Summary |
| --- | --- | --- | --- | --- |
| [SWC-1182](https://jira.corp.adobe.com/browse/SWC-1182) | Bug | To Do | Unresolved | Visible group label missing: `sp-checkbox` (label groups of related checkboxes) |
| [SWC-1188](https://jira.corp.adobe.com/browse/SWC-1188) | Bug | To Do | Unresolved | Group of checkboxes not associated with group label: `sp-checkbox` |
| [SWC-1154](https://jira.corp.adobe.com/browse/SWC-1154) | Bug | Done | Fixed | Input error is not described in text: `sp-checkbox` (Variants) |
| [SWC-1169](https://jira.corp.adobe.com/browse/SWC-1169) | Bug | Done | Won't Fix | Color alone is used to identify errors: `sp-checkbox` (invalid checkboxes) |
| [SWC-268](https://jira.corp.adobe.com/browse/SWC-268) | Story | Done | Duplicate | `CheckboxBase` should support `label`, `labelledby`, and `describedby` |
| [SWC-364](https://jira.corp.adobe.com/browse/SWC-364) | Story | Done | Fixed | docs(checkbox): audit documentation |
| [SWC-1217](https://jira.corp.adobe.com/browse/SWC-1217) | Story | Done | Done | docs(Switch, Checkbox, Radio, Field Group): create migration documentation |
| [SWC-772](https://jira.corp.adobe.com/browse/SWC-772) | Story | Done | Fixed | RFC: form element patterns |
| [SWC-645](https://jira.corp.adobe.com/browse/SWC-645) | Epic | In Progress | Unresolved | Improve accessibility of form/field components |
| [SWC-320](https://jira.corp.adobe.com/browse/SWC-320) | Story | Done | Deferred | Improve form association for input elements |
| [SWC-196](https://jira.corp.adobe.com/browse/SWC-196) | Epic | Done | Duplicate | Loosening the API for form input elements |
| [SWC-48](https://jira.corp.adobe.com/browse/SWC-48) | Epic | Done | Deferred | RFC: recommendations for form-associated custom elements (`ElementInternals`) |

---

## Recommendations: `<swc-checkbox>`

Component tag may change until API freeze.

### ARIA roles, states, and properties

| Topic | What to do |
| --- | --- |
| **Host role** | None. The host sets no `role`. A real, native `<input type="checkbox">` inside `swc-checkbox`'s own shadow DOM supplies the implicit `checkbox` role. This follows the forms strategy RFC's [§3.2](../../05_strategies/forms-strategy-rfc.md#32-where-aria-roles-live) general rule (role element defaults to the shadow DOM), not the host-role exception reserved for container roles with no native equivalent. Attach the shadow root with `delegatesFocus: true` (as 1st-gen `sp-checkbox` already does) so Tab and programmatic focus land on the inner `<input>` directly. Expect the roleless-host axe false positive described in [§3.4](../../05_strategies/forms-strategy-rfc.md#34-axe-core-policy). |
| **`checked` / `aria-checked`** | Comes from the browser for free: the native `<input type="checkbox">`'s `checked` IDL property drives its own implicit `aria-checked`. Keep `swc-checkbox`'s own `checked` property in sync with the inner input's `checked`. |
| **`indeterminate` / `aria-checked="mixed"`** | Unlike radio, checkbox **does** expose the tri-state value. 1st-gen sets `inputElement.indeterminate = true`, which makes the native input report `aria-checked="mixed"` and renders the dash icon; keep this. `indeterminate` is a **visual and assistive-technology state only**, not a third form value: the submitted value is still governed by `checked`. The next activation clears it, matching 1st-gen `Checkbox.handleChange()` (which sets `indeterminate = false` before toggling `checked`). Do not hand-write `aria-checked="mixed"` on the host; let the native input's `indeterminate` property produce it. |
| **Accessible name** | Rendered as a hidden-until-populated label element inside `swc-checkbox`'s own shadow root, wired by the **`LabellingController`** ([SWC-2466](https://jira.corp.adobe.com/browse/SWC-2466), *pending research*), which points the inner `<input type="checkbox">`'s (the role-bearing element's) `ariaLabelledByElements` at that span. `ariaLabelledByElements` is a general ARIAMixin element-reference property available directly on any element, including a plain native `<input>`; it does not require `ElementInternals`. In precedence order: (1) `accessible-labelledby`, for the case a checkbox's name is composed from elements it doesn't own; (2) `accessible-label`, for a checkbox with no visible text label of its own; (3) the slotted label content, the normal case. 1st-gen tracked adding `label`/`labelledby`/`describedby` support to the shared checkbox base ([SWC-268](https://jira.corp.adobe.com/browse/SWC-268)); the 2nd-gen version delivers it through the shared controller. See [Shadow DOM and cross-root ARIA Issues](#shadow-dom-and-cross-root-aria-issues). |
| **Per-item description** | [React Spectrum's `Checkbox`](https://react-spectrum.adobe.com/Checkbox) accepts a per-checkbox `description` (for example "Get notified about new features" under a label). Implement it with a plain same-root `aria-describedby` pointing at an element in the input's own shadow root, the same pattern `swc-text-field` uses for its description; no element-reference API is needed for this same-root case. Finalize the exact API in the migration plan ([SWC-2342](https://jira.corp.adobe.com/browse/SWC-2342)) and Phase 3 (API). |
| **`disabled`** | Reflect `disabled` onto the inner `<input type="checkbox">`'s native `disabled` attribute. The browser removes a natively disabled input from the tab order and exposes disabled state to assistive technology for free; `swc-checkbox` does not need to hand-write `aria-disabled`. 1st-gen already does this in `updated()`, additionally swapping host/input `tabindex` so the host is skipped while the inner input carries the state; preserve equivalent behavior. |
| **`readonly` (fix, do not carry the 1st-gen hack forward)** | 1st-gen fakes read-only by **disabling the native input** (`?disabled=${this.readonly}` in `CheckboxMixin.render`) and separately reverting the input's `checked` in `handleChange`. That is an accessibility bug: a read-only checkbox is announced as unavailable/disabled rather than read-only, and it is removed from the tab order. Native `readonly` does not apply to `<input type="checkbox">` at all (the browser ignores it), so a real fix cannot use the native attribute either. In 2nd-gen, keep the control **focusable** and expose `aria-readonly="true"` (valid on the `checkbox` role in WAI-ARIA 1.2) while blocking the toggle, rather than disabling the input; confirm the exact mechanism in Phase 3/4. When a read-only checkbox appears inside a group, the group may set read-only across the set, but each item still needs correct per-item read-only semantics for the standalone case. |
| **`invalid` / `aria-invalid` (keep at the item level, unlike radio)** | A standalone checkbox can be invalid entirely on its own; the canonical case is a required "agree to the terms" box left unchecked. This is the opposite of radio, where invalid describes the selection as a whole and moves to the group. 1st-gen already sets `aria-invalid="true"` on the inner input when `invalid` is `true`; keep item-level `invalid`. Pair it with a programmatically associated error message (`aria-errormessage`, plus `aria-describedby` for broader support) so the error is conveyed in text, closing [SWC-1154](https://jira.corp.adobe.com/browse/SWC-1154), and do not rely on color alone for the invalid affordance ([SWC-1169](https://jira.corp.adobe.com/browse/SWC-1169), and the [rendering roadmap's](./rendering-and-styling-migration-analysis.md#css--swc-implementation-gaps) open question on individual-checkbox invalid styling). A checkbox group may **additionally** carry a group-level invalid ("select at least one") on the group host; the two levels are independent and can both apply. |
| **`required` / `aria-required`** | React Spectrum places `isRequired` on both `Checkbox` and `CheckboxGroup`, because a single checkbox is legitimately required on its own. Expose a per-item `required` and map it to `aria-required` (via the inner input's native `required`, which also participates in native constraint validation). A group-level "at least one" requirement lives on the checkbox group, separately. |
| **Form association (item-level, the key difference from radio)** | `swc-checkbox` is a form-associated custom element in its own right: `static formAssociated = true`, `attachInternals()`, and value mirroring via `internals.setFormValue()`, wrapped by one **`FieldAssociationController`** ([SWC-2467](https://jira.corp.adobe.com/browse/SWC-2467)) instance **on each checkbox**, per the forms RFC [§3.1](../../05_strategies/forms-strategy-rfc.md#31-form-participation-elementinternals--face) (which lists checkbox alongside text field and combobox). This is required because a checkbox group is multi-select: every checkbox is an independent boolean that submits its own `value` under its own `name`, so there is no single group-owned value to centralize the way radio does. The native input inside the shadow root is invisible to an ancestor `<form>`, so the value goes to the form through the host's `ElementInternals`, not the inner input; the role stays on the inner input (the [`checkbox-hybrid.js`](https://github.com/nikkimk/web-component-form-strategy-demos/blob/main/checkbox-hybrid.js) split). `formDisabledCallback` and `formResetCallback` fire on each checkbox host. Contrast [radio](../radio/accessibility-migration-analysis.md#aria-roles-states-and-properties), where the item has no `FieldAssociationController` and form value lives on the group. |
| **`value` and `name` (plain form attributes, propagated, unlike radio)** | `value` is the string submitted with `name` when the checkbox is checked; `name` is the form field name. Both are content attributes the form reads, not accessibility properties, and both are genuinely used here (a checkbox submits its own value), so `name` **is** carried onto the item's form participation, unlike radio (which drops `name` propagation because no radio item participates in form value). Do not confuse `value` with the accessible name, which always comes from the label sources above. |

### Shadow DOM and cross-root ARIA Issues

`swc-checkbox` has two distinct cross-boundary concerns, both already modeled by the proof-of-concept's [`checkbox-hybrid.js`](https://github.com/nikkimk/web-component-form-strategy-demos/blob/main/checkbox-hybrid.js)/[`labelling-controller.js`](https://github.com/nikkimk/web-component-form-strategy-demos/blob/main/labelling-controller.js), which is a structurally identical native-input-in-shadow-DOM case.

**Labelling.** The **`LabellingController`** ([SWC-2466](https://jira.corp.adobe.com/browse/SWC-2466), *pending research*) sets `ariaLabelledByElements`/`ariaDescribedByElements` on the inner `<input type="checkbox">` (the role-bearing element), pointing at a shadow-internal label/description span when content is slotted. Because `ariaLabelledByElements` is a general ARIAMixin element-reference property available on any element, not something reserved for `ElementInternals`, the controller wires it onto the native input directly without the outer custom element needing to attach internals for labelling purposes. The same property also resolves external light-DOM elements (via `accessible-labelledby`/`accessible-describedby`) when nothing is slotted, unifying the same-root and cross-root cases through one API rather than switching between a plain IDREF string and an element-reference API depending on tree topology. This is the same mechanism, on the same kind of element, that the [radio doc](../radio/accessibility-migration-analysis.md#shadow-dom-and-cross-root-aria-issues) documents for `swc-radio`.

**Form value.** Separately, the checkbox is form-associated on its **host** via `ElementInternals` (`setFormValue`), because a native input inside the shadow root cannot be seen by an ancestor light-DOM `<form>`. So the role and accessible name resolve on the inner input, while form value and constraint validity resolve on the host: two different nodes carry two different responsibilities, by design. This is the hybrid split, and it is why an axe scan of the roleless host reports the expected `label` false positive covered by the forms RFC's [§3.4](../../05_strategies/forms-strategy-rfc.md#34-axe-core-policy) axe policy.

### Accessibility tree expectations

- **Unchecked, enabled (standalone):** role `checkbox` (from the inner native input); name from the slotted label; `aria-checked="false"`; its own Tab stop.
- **Checked:** role `checkbox`; `aria-checked="true"`.
- **Indeterminate:** role `checkbox`; `aria-checked="mixed"` (regardless of the underlying `checked` value); the dash icon is shown. This state is exposed by the native input's `indeterminate` property, never by a hand-written host attribute.
- **Disabled:** the inner input's native `disabled` removes it from the tab order and exposes disabled state to assistive technology.
- **Read-only:** stays focusable and reachable; exposes `aria-readonly="true"`; toggling is blocked. It must **not** be announced as disabled (the 1st-gen behavior this doc fixes).
- **Invalid (for example a required, unchecked consent box):** `aria-invalid="true"` on the control, with the error text both visible and reachable via `aria-errormessage`/`aria-describedby`. This item-level invalid is legitimate for checkbox (it is not, for radio).
- **Required:** `aria-required="true"` on the control.
- **In a group:** each checkbox still exposes its own role, name, and checked state and remains an independent Tab stop; the group host supplies the shared `role="group"`, group label, and any group-level required/invalid.

### Keyboard and focus

- **Standalone:** `swc-checkbox` has its own Tab stop (host `tabIndex` defaults to `0`, delegating focus to the inner input via `delegatesFocus`). <kbd>Space</kbd> toggles the checked state on the focused checkbox, supplied natively by the inner `<input type="checkbox">`. There are no arrow-key or <kbd>Enter</kbd> activations: a native checkbox toggles on <kbd>Space</kbd> only. This is a deliberate contrast with `swc-radio`, which has no independent Tab stop and is driven by its group's roving tabindex and arrow keys.
- **In a group:** checkboxes are **each** a Tab stop and are reached with <kbd>Tab</kbd> and <kbd>Shift</kbd> + <kbd>Tab</kbd>; a checkbox group does **not** use roving tabindex or arrow-key navigation (the [APG checkbox pattern](https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/) has neither). Each is toggled independently with <kbd>Space</kbd>. This is the multi-select counterpart to radio's single-roving-Tab-stop model. See the [checkbox group doc's keyboard section](../checkbox-group/accessibility-migration-analysis.md#keyboard-and-focus) for the full group model.
- **Disabled:** never receives focus, by Tab or otherwise, because the inner input's native `disabled` removes it from the tab order.
- **Read-only:** still receives focus and is reachable by Tab; <kbd>Space</kbd> does not change the checked state.

---

## Testing

Stories and docs must demonstrate the checkbox **inside a form**, since form participation is a defining part of this component. Use a native `<form>` for now, and move to a dedicated form component once one exists; use **native** `<button type="submit">`/`<button type="reset">` for the controls until the clear-button component and the button form-association fast-follow are complete. A minimal shape:

```html
<form id="signup">
    <swc-checkbox name="terms" value="accepted" required>
        I agree to the terms of service
    </swc-checkbox>
    <button type="submit">Submit</button>
    <button type="reset">Reset</button>
</form>
```

### Automated tests

| Kind of test | What to check |
| --- | --- |
| **Unit** | `swc-checkbox`'s shadow DOM contains a real `<input type="checkbox">`; the host sets no `role`; `checked` stays in sync with the inner input; `indeterminate` sets the inner input's `indeterminate` property (producing `aria-checked="mixed"`) and is cleared by the next activation; the item mirrors its value to the form via `internals.setFormValue` (checked contributes `name`/`value`, unchecked contributes nothing); read-only blocks the toggle **without** setting the inner input's `disabled`; `required`/`invalid` map to `aria-required`/`aria-invalid`. |
| **Form participation (in a `<form>`)** | Rendered inside a native `<form>`: **submit** yields the expected `FormData` (a checked box contributes its `name`/`value`; an unchecked box contributes nothing), so the **value on submit** is correct; **validation** blocks submission and reports validity when a `required` checkbox is unchecked (`:invalid`/`:user-invalid`, `reportValidity()`), and clears once checked; **reset** (`form.reset()`) restores the default checked state via `formResetCallback`. A story demonstrating this in a native `<form>` doubles as the consumer-facing example. |
| **aXe + Storybook** | WCAG rules on standalone default, checked, indeterminate, disabled, read-only, required, and invalid stories, plus a grouped (multi-select, `role="group"`) story. A story with no visible label and no `accessible-label`/`accessible-labelledby` should dev-warn rather than silently render an unnamed control. Document the expected roleless-host `label` false positive as a story-level exclusion with a `// reason:` comment, per the forms RFC [§3.4](../../05_strategies/forms-strategy-rfc.md#34-axe-core-policy). |
| **Playwright ARIA snapshots** | `role=checkbox` with the correct accessible name and the correct `checked` value (`true`/`false`/`mixed`), across the `s`/`m`/`l`/`xl` sizes and the default/emphasized styles from the design spec's state matrix; `aria-invalid`/`aria-required`/`aria-readonly` where set. |
| **Playwright keyboard** | <kbd>Space</kbd> toggles a focused checkbox; a standalone checkbox is a single Tab stop; every checkbox in a group is an independent Tab stop (no roving, no arrow navigation); a disabled checkbox is never reachable; a read-only checkbox is reachable but does not toggle. |
| **Manual screen reader** | `mixed` is announced for the indeterminate state; read-only is announced as read-only (not disabled); the associated error message is announced for an invalid checkbox. Verify `ElementInternals`-exposed state in Firefox in particular, per the forms RFC [§3.4](../../05_strategies/forms-strategy-rfc.md#34-axe-core-policy). |

---

## Summary checklist

- [ ] `swc-checkbox` sets no `role` on its own host; a real, native `<input type="checkbox">` inside its shadow DOM supplies `role="checkbox"`.
- [ ] The shadow root uses `delegatesFocus: true` so Tab and programmatic focus land on the inner input; the checkbox keeps its own Tab stop (standalone-capable, unlike `swc-radio`).
- [ ] `checked`/`aria-checked` come from the native inner input; `swc-checkbox` supports the tri-state `aria-checked="mixed"` via the inner input's `indeterminate` property, cleared by the next activation.
- [ ] Accessible name precedence (`accessible-labelledby` > `accessible-label` > slotted label) resolves through `ariaLabelledByElements`, wired by `LabellingController` onto the inner `<input type="checkbox">`, confirmed against the PoC's `checkbox-hybrid.js`/`labelling-controller.js`.
- [ ] Per-item `description` (React Spectrum parity) is implemented via a same-root `aria-describedby` on the inner input, with the exact API finalized during Phase 3 (API).
- [ ] `disabled` reflects onto the inner input's native `disabled` attribute rather than a hand-written `aria-disabled`.
- [ ] `readonly` is fixed: the control stays focusable and exposes `aria-readonly="true"` while blocking the toggle, instead of 1st-gen's disable-the-input hack that mis-announces read-only as disabled.
- [ ] `invalid`/`aria-invalid` stay at the item level (a standalone required checkbox can be invalid on its own), paired with an associated error message and not signaled by color alone.
- [ ] `required`/`aria-required` are supported per item (a single required consent checkbox).
- [ ] Each `swc-checkbox` is independently form-associated via its own `FieldAssociationController`/`ElementInternals` on the host (`setFormValue`), with `name`/`value` submitted per item; form value is not centralized on a group (the reverse of radio).
- [ ] Stories and tests demonstrate the checkbox in a native `<form>` and cover the full form lifecycle: value on submit (`FormData`), constraint validation of a `required` checkbox, and `form.reset()` restoring the default checked state.
- [ ] A standalone checkbox is a single Tab stop and toggles on `Space`; checkboxes in a group are each independent Tab stops with no roving tabindex and no arrow-key navigation.

## References

- [Forms Strategy: 2nd-Gen Proposal (this repo)](../../05_strategies/forms-strategy-rfc.md), specifically [§3.1 Form participation: ElementInternals / FACE](../../05_strategies/forms-strategy-rfc.md#31-form-participation-elementinternals--face), [§3.2 Where ARIA roles live](../../05_strategies/forms-strategy-rfc.md#32-where-aria-roles-live), [§3.4 axe-core policy](../../05_strategies/forms-strategy-rfc.md#34-axe-core-policy), and the [naming table](../../05_strategies/forms-strategy-rfc.md#4-naming-table).
- [Web component form strategy demos](https://github.com/nikkimk/web-component-form-strategy-demos/tree/main), the proof of concept for the controller-composition findings this doc relies on, specifically [`checkbox-hybrid.js`](https://github.com/nikkimk/web-component-form-strategy-demos/blob/main/checkbox-hybrid.js) and [`labelling-controller.js`](https://github.com/nikkimk/web-component-form-strategy-demos/blob/main/labelling-controller.js).
- [WAI-ARIA APG: Checkbox pattern](https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/) and the [tri-state (mixed) checkbox example](https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/examples/checkbox-mixed/)
- [WAI-ARIA](https://www.w3.org/TR/wai-aria-1.2/), [WCAG 2.2](https://www.w3.org/TR/WCAG22/), [APG: read me first](https://www.w3.org/WAI/ARIA/apg/practices/read-me-first/)
- [React Spectrum: Checkbox](https://react-spectrum.adobe.com/Checkbox) and [CheckboxGroup](https://react-spectrum.adobe.com/CheckboxGroup)
- 1st-gen: [`sp-checkbox`](../../../../1st-gen/packages/checkbox/README.md), [`sp-field-group`](../../../../1st-gen/packages/field-group/README.md)
- [Checkbox migration roadmap (this repo)](./rendering-and-styling-migration-analysis.md)
- [Radio accessibility migration analysis (this repo)](../radio/accessibility-migration-analysis.md), the single-select sibling for contrast
- Jira: [SWC-2340](https://jira.corp.adobe.com/browse/SWC-2340) (epic), [SWC-2341](https://jira.corp.adobe.com/browse/SWC-2341) (this research ticket), [SWC-2342](https://jira.corp.adobe.com/browse/SWC-2342) (migration plan), [SWC-2548](https://jira.corp.adobe.com/browse/SWC-2548) (`swc-field-group` scoping spike), [SWC-2466](https://jira.corp.adobe.com/browse/SWC-2466) (`LabellingController`), [SWC-2467](https://jira.corp.adobe.com/browse/SWC-2467) (`FieldAssociationController`), [SWC-1888](https://jira.corp.adobe.com/browse/SWC-1888) (RFC: form field strategy for 2nd-gen migration)

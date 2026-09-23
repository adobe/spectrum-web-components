<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../../README.md) / [Project planning](../../README.md) / [Components](../README.md) / Switch / Switch accessibility migration analysis

<!-- Document title (editable) -->

# Switch accessibility migration analysis

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
    - [React Spectrum reference](#react-spectrum-reference)
    - [Guidelines that apply](#guidelines-that-apply)
- [Related 1st-gen accessibility (Jira)](#related-1st-gen-accessibility-jira)
- [Recommendations: `<swc-switch>`](#recommendations-swc-switch)
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

This doc defines how **`swc-switch`** should work for **accessibility**, targeting **WCAG 2.2 Level AA**. A switch is a single form control that immediately turns one setting on or off. It is not a multi-select group and it does not represent a tri-state value.

### Also read

- [Switch migration roadmap](./rendering-and-styling-migration-analysis.md) for DOM, CSS, sizing, and Spectrum token decisions.
- [Forms Strategy: 2nd-Gen Proposal](../../05_strategies/forms-strategy-rfc.md), especially [§3.1](../../05_strategies/forms-strategy-rfc.md#31-form-participation-elementinternals--face), [§3.2](../../05_strategies/forms-strategy-rfc.md#32-where-aria-roles-live), [§3.3](../../05_strategies/forms-strategy-rfc.md#33-idref-strategy-label-help-text-and-errors), and [§3.5](../../05_strategies/forms-strategy-rfc.md#35-testing-form-participation).
- [Checkbox accessibility migration analysis](../checkbox/accessibility-migration-analysis.md) for the shared native-input-in-shadow-DOM and FACE hybrid model. Switch shares the form and labelling foundation, but exposes `role="switch"` and only the two-state `aria-checked` model.

### What it is

- A single, labeled control that toggles an individual setting between on and off.
- An independently focusable form-associated control. Its value is submitted only when selected, using its `name` and `value`.
- A control with one fixed semantic role: `switch`. Styling variants such as `emphasized`, sizes, and selected state do not change the role or keyboard model.

### When to use something else

- Use a checkbox when users are selecting or marking one or more items, accepting terms, or choosing options that do not immediately apply a setting.
- Use a radio group when users must choose one option from a mutually exclusive set.
- Use a button when the action is a command rather than a persistent on/off setting.

### What it is not

- Not a checkbox with a tri-state value. A switch exposes only `aria-checked="true"` or `aria-checked="false"`; `mixed` does not apply.
- Not a radio group. It has no group container, roving tabindex, or arrow-key navigation.
- Not a visual-only control. Its selected state, form value, validity, disabled state, and read-only state must be exposed programmatically.

### Related

- [`swc-checkbox`](../checkbox/accessibility-migration-analysis.md) uses the native checkbox pattern for selection and may expose `aria-checked="mixed"`; `swc-switch` uses the switch pattern for an immediate setting.
- [`swc-radio-group`](../radio-group/accessibility-migration-analysis.md) owns a mutually exclusive selection and a group-level value; `swc-switch` owns one boolean setting.

---

## ARIA and WCAG context

### Pattern in the APG

- The [WAI-ARIA switch pattern](https://www.w3.org/WAI/ARIA/apg/patterns/switch/) represents a binary setting with `role="switch"` and `aria-checked="true"` or `aria-checked="false"`. The switch has an accessible name and is toggled with <kbd>Space</kbd>.
- A switch is a single Tab stop. It does not use a container role, roving tabindex, or arrow-key navigation.
- The label identifies the setting, while the checked state identifies whether the setting is on or off. Do not put the on/off words in the accessible name when the state is already exposed through `aria-checked`.

### React Spectrum reference

The [React Spectrum Switch](https://react-spectrum.adobe.com/Switch) reference defines the comparable API and behavior: `isSelected`, `defaultSelected`, `isDisabled`, `isReadOnly`, `isRequired`, `isInvalid`, `description`, `errorMessage`, `name`, `value`, `validate`, and native validation by default. Its forms example uses a required switch with a name, value, description, and submit button. These capabilities inform the migration API, but the shipped `swc-switch` API must still be verified against the 2nd-gen implementation and this repository's forms strategy.

### Guidelines that apply

| Idea | Plain meaning |
| --- | --- |
| [Switch pattern (APG)](https://www.w3.org/WAI/ARIA/apg/patterns/switch/) | Expose one binary setting with a named `switch` role and `aria-checked` set to `true` or `false`; do not use `mixed`. |
| [Name, role, value](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html) | The switch needs a programmatic name, a fixed role, and a state that updates when the setting changes. |
| [Labels or instructions (WCAG 3.3.2)](https://www.w3.org/WAI/WCAG22/Understanding/labels-or-instructions.html) | Provide a visible label by default, with an accessible-labeling API for cases where the visible label is supplied elsewhere. |
| [Info and relationships (WCAG 1.3.1)](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html) | Associate the label, description, and error text programmatically rather than relying on visual proximity. |
| [Error identification (WCAG 3.3.1)](https://www.w3.org/WAI/WCAG22/Understanding/error-identification.html) | Required or otherwise invalid state needs visible error text and native form validity; color alone is insufficient. |
| [Non-text contrast (WCAG 1.4.11)](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html) | The switch track, thumb, focus indicator, and selected-state affordance need sufficient contrast in default, hover, disabled, and emphasized states. |
| [Keyboard (WCAG 2.1.1)](https://www.w3.org/WAI/WCAG22/Understanding/keyboard.html) | The switch must be reachable and toggleable with the keyboard. <kbd>Space</kbd> is the switch activation key; do not add a conflicting custom <kbd>Enter</kbd> behavior. |
| [Focus visible (WCAG 2.4.7)](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html) | Focus must remain visible around the switch control in every supported size and visual state. |

**Bottom line:** keep one native, focusable switch control with a stable accessible name, a fixed `switch` role, a two-state `aria-checked`, and FACE-based form participation.

---

## Related 1st-gen accessibility (Jira)

| Jira | Type | Status (snapshot) | Resolution (snapshot) | Summary |
| --- | --- | --- | --- | --- |
| [SWC-1115](https://jira.corp.adobe.com/browse/SWC-1115) | Bug | Done | Fixed | Active user interface component lacks 3 to 1 contrast ratio: `sp-switch` checked |
| [SWC-1194](https://jira.corp.adobe.com/browse/SWC-1194) | Bug | Done | Duplicate | Active user interface component lacks 3 to 1 contrast ratio: `sp-switch` emphasized |
| [SWC-209](https://jira.corp.adobe.com/browse/SWC-209) | Bug | Done | Won't Fix | `sp-switch` does not toggle on <kbd>Enter</kbd> key press |
| [SWC-158](https://jira.corp.adobe.com/browse/SWC-158) | Story | Done | Deferred | Refactor `sp-switch` test structure |
| [SWC-410](https://jira.corp.adobe.com/browse/SWC-410) | Story | Done | Fixed | Audit `sp-switch` documentation |
| [SWC-268](https://jira.corp.adobe.com/browse/SWC-268) | Story | Done | Duplicate | `CheckboxBase` should support label, labelledby, and describedby |
| [SWC-1217](https://jira.corp.adobe.com/browse/SWC-1217) | Story | Done | Done | Create migration documentation for Switch, Checkbox, Radio, and Field Group |
| [SWC-645](https://jira.corp.adobe.com/browse/SWC-645) | Epic | In Progress | Unresolved | Improve accessibility of form and field components |
| [SWC-196](https://jira.corp.adobe.com/browse/SWC-196) | Epic | Done | Duplicate | Loosen the API for form input elements |
| [SWC-320](https://jira.corp.adobe.com/browse/SWC-320) | Story | Done | Deferred | Improve form association for input elements |

---

## Recommendations: `<swc-switch>`

### ARIA roles, states, and properties

| Topic | What to do |
| --- | --- |
| **Host and role placement** | The host should not carry the `switch` role. Render a real native `<input type="checkbox">` in the shadow root and set that input's role to `switch`, following the forms strategy's general shadow-DOM role placement. The role is fixed and must not be author-overridable. The host carries FACE internals for form value and validity. |
| **Accessible name** | Use the default label slot for the common case, wired by `LabellingMixin` to the inner role-bearing input. Support `accessible-label` for a switch with no visible label and `accessible-labelledby` for a name composed from external light-DOM elements. Do not require consumers to set raw `aria-label` or `aria-labelledby` on the host. A switch without an accessible name should produce the repository's development warning and have a dedicated Storybook/aXe test. |
| **Selected state** | Mirror the `checked` or selected property to the native input's checked state and expose `aria-checked="true"` when selected and `aria-checked="false"` when not selected. Never expose `aria-checked="mixed"` for a switch. The state must update for pointer, keyboard, and programmatic changes. |
| **Read-only state** | Preserve focusability and expose read-only semantics on the role-bearing switch when `readonly` or `isReadOnly` is set. Do not carry forward 1st-gen `CheckboxMixin` behavior, which sets `disabled` on the native input and removes a read-only switch from the Tab order. A read-only switch must not change state on activation, but it remains discoverable and exposes its current state. |
| **Disabled state** | Reflect `disabled` to the native input so the browser removes the switch from sequential focus navigation and exposes disabled state. Do not use disabled to emulate read-only. Verify disabled selected and disabled unselected states. |
| **Description and error text** | Compose with `LabellingMixin` and `HelpTextMixin`. Associate a description and error message with the role-bearing inner input through `aria-describedby`. Preserve a visible error when invalid. Define whether a persistent description remains associated while the error is shown, because the current `HelpTextMixin` swaps help text for error text while invalid. Do not use `aria-errormessage`: the current `HelpTextMixin` contract does not add it, and browser and screen reader support remains inconsistent. |
| **Required and invalid state** | A required switch means the user must select it. Expose invalidity through the native form-associated host's `ElementInternals.setValidity()` and the role-bearing input's supported invalid semantics. Do not rely on `aria-required` alone. The invalid state must clear when the switch is selected, and a visible error message must identify the problem. |
| **Form participation** | Make `swc-switch` a form-associated custom element with `static formAssociated = true`, `attachInternals()`, and a `FieldAssociationController` or equivalent. The checked switch submits its `name` and `value`; the unchecked switch contributes no value. The host's internals mirror the native input's state because the shadow-DOM input is not visible to the ancestor light-DOM form. Support `form`, disabled cascade, reset to the default checked state, and validity through the same FACE contract as the forms strategy. |
| **Events and value** | Preserve a composed, bubbling, cancelable `change` event when the selected state changes. Keep the boolean selected state separate from the submitted string `value`; the value is not the accessible name. Programmatic state changes must keep the input, host property, ARIA state, validity, and form value synchronized. |
| **Visual states and properties** | `emphasized`, selected/not selected, hover, disabled, and sizes `s`/`m`/`l`/`xl` change visual presentation only. They must not change the accessible name, role, keyboard model, or form semantics. Match the supplied [Switch Figma design](https://www.figma.com/design/xHBWBBIe2eo5vwoCeNrC4Q/S2---Web?node-id=9397-4673&p=f&m=dev): default, hover, and disabled states; selected, not selected, and emphasized states; and small, medium, large, and extra-large sizes. |

### Shadow DOM and cross-root ARIA Issues

`swc-switch` needs the same hybrid split as the 2nd-gen checkbox: the inner native input owns the `switch` role, label, description, and state exposure, while the host's `ElementInternals` owns form value, validity, reset, and disabled callbacks. `LabellingMixin` should use same-root element references for slotted labels and descriptions, and cross-root element references for `accessible-labelledby` and `accessible-describedby`. Do not create raw cross-root IDREFs that point from the host to shadow-only nodes. Verify the host and inner input behavior manually in Chromium, Safari, and Firefox because axe-core and browser accessibility trees do not consistently expose `ElementInternals` relationships.

### Accessibility tree expectations

- **Default, not selected:** one focusable `switch` node with the visible label as its accessible name and `aria-checked="false"`.
- **Selected:** the same `switch` node and name with `aria-checked="true"`.
- **Emphasized:** the same tree as the corresponding selected or not-selected state; emphasized is visual only.
- **Disabled:** the switch exposes disabled state and is skipped in sequential keyboard navigation. Its selected state remains exposed when checked.
- **Read-only:** the switch remains focusable, exposes its current selected state and read-only semantics, and does not toggle on <kbd>Space</kbd>.
- **Required and valid:** the switch exposes its required form constraint through the supported form-validity path without adding unsupported group-style ARIA states.
- **Invalid:** visible error text is associated with the switch through the supported description relationship, and the host reports invalidity through `ElementInternals`.
- **No visible label:** the switch still has an accessible name from `accessible-label` or `accessible-labelledby`; otherwise the component emits a development warning.
- **Unsupported mixed state:** a switch never exposes `aria-checked="mixed"`.

### Keyboard and focus

The switch is one Tab stop. Focus should land on the inner native input through `delegatesFocus` or the component's focus delegation, matching the forms strategy and the existing 1st-gen `focusElement` contract.

| Key | Behavior |
| --- | --- |
| <kbd>Tab</kbd> | Moves focus to the enabled switch in document order. |
| <kbd>Shift</kbd> + <kbd>Tab</kbd> | Moves focus to the previous focusable element. |
| <kbd>Space</kbd> | Toggles the switch and dispatches the composed `change` event unless the switch is read-only or disabled. |
| <kbd>Enter</kbd> | Does not need to toggle the switch. Do not add a custom Enter activation solely to preserve the resolved 1st-gen issue [SWC-209](https://jira.corp.adobe.com/browse/SWC-209). |

---

## Testing

Stories and tests must demonstrate Switch inside a native `<form>`, because the component is a form-associated control. Use native `<button type="submit">` and `<button type="reset">` until a form-associated Spectrum button is available. A minimal story shape is:

```html
<form id="settings-form">
    <swc-switch name="available-offline" value="available" checked>
        Available offline
    </swc-switch>
    <swc-switch name="require-password" value="required" required>
        Require password
    </swc-switch>
    <button type="submit">Submit</button>
    <button type="reset">Reset</button>
</form>
```

The form story must cover the full lifecycle required by [forms strategy §3.5](../../05_strategies/forms-strategy-rfc.md#35-testing-form-participation): checked value appears in `FormData`, unchecked value is omitted, `required` blocks submission and exposes `valueMissing` until selected, `form.reset()` restores each default state, and the value read programmatically matches the submitted value. Include description, error, disabled, read-only, emphasized, selected/not selected, all four sizes, hover, and keyboard states in the Storybook/test matrix.

### Automated tests

| Kind of test | What to check |
| --- | --- |
| **Unit** | The inner input has the fixed `switch` role; the host role is not author-overridable; `aria-checked` is always `true` or `false`; accessible-name and description wiring targets the role-bearing input; read-only remains focusable and blocks toggling; disabled removes the input from the Tab order; `change` is composed, bubbling, and cancelable. |
| **Form participation (in a `<form>`)** | Submit a checked and unchecked switch and verify `FormData` includes only the checked `name`/`value`; verify the component supports external `form` association, disabled cascade, reset, programmatic value reading, and the required validity lifecycle through `checkValidity()`/`reportValidity()`. |
| **aXe + Storybook** | Test named default, selected, emphasized, disabled, read-only, required, invalid, description, error, and all size stories. Include a written exclusion for the expected roleless-host false positive caused by the inner shadow-DOM input and `ElementInternals`, following forms strategy §3.4. |
| **Playwright ARIA snapshots** | Verify one `switch` node with the expected accessible name and `aria-checked` state, plus disabled/read-only/invalid and description or error exposure. Verify no `mixed` state and no duplicate accessible name. |
| **Playwright keyboard** | Verify Tab reaches the switch, Space toggles it, read-only keeps focus but blocks changes, disabled is skipped, and Enter does not add a non-native activation path. |
| **Contrast and focus** | Verify the track, thumb, selected state, emphasized state, disabled state, hover state, and focus indicator against the Figma state matrix at small, medium, large, and extra-large sizes. Include the 3:1 non-text contrast requirements from the first-gen issues. |

---

## Summary checklist

- [ ] The role-bearing inner native input exposes one fixed `switch` role; the host does not expose a competing role.
- [ ] The switch has an accessible name from its visible label, `accessible-label`, or `accessible-labelledby`, with a development warning when no name is available.
- [ ] `aria-checked` is synchronized to selected state and is always `true` or `false`, never `mixed`.
- [ ] Read-only preserves focusability, exposes supported read-only semantics, and blocks toggling; disabled remains natively disabled and skipped by Tab.
- [ ] Description and error text use the supported `aria-describedby` relationship, with persistent-description/error coexistence decided before implementation.
- [ ] Required and invalid state use FACE validity and visible error text; invalidity clears when the switch is selected.
- [ ] The checked switch submits `name`/`value`, the unchecked switch contributes no value, reset restores defaults, and external form association works.
- [ ] Stories and tests cover the full native-form lifecycle: submit, validation, reset, and programmatic value reading.
- [ ] Keyboard behavior is documented and tested: Tab focus, Space toggle, no custom Enter requirement, and read-only/disabled behavior.
- [ ] Default, hover, disabled, selected, not selected, emphasized, and small/medium/large/extra-large states match the supplied Figma design.
- [ ] Contrast and focus indicators meet WCAG requirements, including the first-gen switch contrast issues.

## References

- [React Spectrum Switch](https://react-spectrum.adobe.com/Switch) (API researched from its LLM-friendly [Markdown source](https://react-spectrum.adobe.com/Switch.md)).
- [Switch S2 Figma design](https://www.figma.com/design/xHBWBBIe2eo5vwoCeNrC4Q/S2---Web?node-id=9397-4673&p=f&m=dev).
- [WAI-ARIA APG: Switch pattern](https://www.w3.org/WAI/ARIA/apg/patterns/switch/).
- [WAI-ARIA 1.2: `switch` role](https://www.w3.org/TR/wai-aria-1.2/#switch).
- [Forms Strategy: 2nd-Gen Proposal](../../05_strategies/forms-strategy-rfc.md).
- [Switch migration roadmap](./rendering-and-styling-migration-analysis.md).
- 1st-gen: [`sp-switch`](../../../../1st-gen/packages/switch/README.md), [`sp-checkbox`](../../../../1st-gen/packages/checkbox/README.md), and [`sp-field-group`](../../../../1st-gen/packages/field-group/README.md).
- Jira: [SWC-1115](https://jira.corp.adobe.com/browse/SWC-1115), [SWC-1194](https://jira.corp.adobe.com/browse/SWC-1194), [SWC-209](https://jira.corp.adobe.com/browse/SWC-209), [SWC-158](https://jira.corp.adobe.com/browse/SWC-158), [SWC-410](https://jira.corp.adobe.com/browse/SWC-410), [SWC-268](https://jira.corp.adobe.com/browse/SWC-268), [SWC-1217](https://jira.corp.adobe.com/browse/SWC-1217), [SWC-645](https://jira.corp.adobe.com/browse/SWC-645), [SWC-196](https://jira.corp.adobe.com/browse/SWC-196), and [SWC-320](https://jira.corp.adobe.com/browse/SWC-320).

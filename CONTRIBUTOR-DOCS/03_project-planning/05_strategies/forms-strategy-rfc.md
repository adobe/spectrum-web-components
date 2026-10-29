<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../README.md) / [Project planning](../README.md) / Strategies / Forms Strategy: gen2 Proposal

<!-- Document title (editable) -->

# Forms Strategy: gen2 Proposal

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [Summary](#summary)
- [Value Impact](#value-impact)
    - [Accessibility](#accessibility)
    - [Consumer Experience](#consumer-experience)
    - [Author Maintenance](#author-maintenance)
- [1. Why Change?](#1-why-change)
- [2. Scope](#2-scope)
- [3. Recommendations](#3-recommendations)
    - [3.1 Form participation: ElementInternals / FACE](#31-form-participation-elementinternals--face)
    - [3.2 Where ARIA roles live](#32-where-aria-roles-live)
    - [3.3 IDREF strategy: label, help text, and errors](#33-idref-strategy-label-help-text-and-errors)
    - [3.4 axe-core policy](#34-axe-core-policy)
    - [3.5 Testing form participation](#35-testing-form-participation)
    - [3.6 Validation timing and submit behavior](#36-validation-timing-and-submit-behavior)
    - [3.7 Field status and validation sources](#37-field-status-and-validation-sources)
    - [3.8 Shared and per-component responsibilities](#38-shared-and-per-component-responsibilities)
    - [3.9 Form documentation until a Forms page exists](#39-form-documentation-until-a-forms-page-exists)
- [4. Naming table](#4-naming-table)
- [5. Migration path](#5-migration-path)
- [6. Open questions](#6-open-questions)
- [Appendix A: PoC findings](#appendix-a-poc-findings)

</details>

<!-- Document content (editable) -->

## Summary

This proposal records the team's recommended direction for **gen2 form fields** (text field, checkbox, radio, picker, combobox) before scaling migration. It synthesizes the proof-of-concept findings for text field and combobox as form-associated custom elements, plus the cross-root ARIA `referenceTarget` shim research. The core decisions are: form fields participate in forms through the **ElementInternals / form-associated custom element (FACE)** API; ARIA roles default to the **shadow DOM**, with an explicit host-role exception for button-like and radio-like controls (see [§3.2](#32-where-aria-roles-live)); label, help text, and error text associate through **IDREF relationships** that use a cross-root-safe pattern; **axe-core** exclusions are documented, not silent; validation errors display when the user **commits** a value or submits the form, not on each keystroke, and forms use `novalidate` with the application moving focus to the first invalid field and keeping the submit button enabled (see [§3.6](#36-validation-timing-and-submit-behavior)); and each field has **one mutually exclusive `field-status`** (`disabled`, `invalid`, `valid`, or `readonly`) with native constraints and authored invalid status kept as independent validity sources, and the slotted `error-text` supplying the validation message (see [§3.7](#37-field-status-and-validation-sources)).


> **Scope:** Form-field API and accessibility direction for gen2 only. The `LabellingMixin` / `FieldDescriptionMixin` decision does not change 1st-gen implementations. This proposal does **not** implement the shared mixins/controllers or migrate a production component; those are follow-up work.

> ⚠️ **Important:** The direction and names below are drawn from the [form-strategy proof-of-concept](https://github.com/nikkimk/web-component-form-strategy-demos). Controllers marked *pending research* have not been accepted yet; their names and APIs may change when the corresponding research spikes conclude.

---

## Value Impact

### Accessibility

1. **Native form validation and focus.** Form-associated custom elements expose validity, validation messages, and focus behavior to the browser and to assistive technology the same way native controls do, rather than reconstructing them in JavaScript over a hidden input.
2. **Consistent label, help, and error exposure.** A single label/help/error pattern across all fields means screen readers announce the accessible name and descriptions consistently, instead of per-component variation.
3. **Cross-root descriptions that actually associate.** A documented cross-root ARIA pattern ensures `aria-describedby` and `aria-errormessage` relationships resolve across the shadow boundary instead of silently pointing at nothing.

### Consumer Experience

1. **Fields work inside a native `<form>`.** Values submit, reset, and restore through the standard form lifecycle without wrapper glue in consumer code.
2. **Predictable validation surface.** Consumers read and set validity through one consistent property/method surface across every field.

### Author Maintenance

1. **One form-participation pattern to learn.** Authors follow the same FACE wiring for every field rather than inventing per-component value/validity plumbing.
2. **A shared naming table.** Property, slot, and event names come from one table, so text-like fields and pickers stay aligned and migration reviews are faster.

---

## 1. Why Change?

1st-gen form controls vary in how they participate in forms, where roles live, and how label/help/error text is associated. Some rely on a nested light-DOM `<input>`; some manage validity by hand; cross-root ARIA relationships are inconsistent. Scaling gen2 migration without a single agreed direction would multiply that inconsistency across every field. This proposal fixes the direction once so contributors do not re-litigate it per component.

---

## 2. Scope

**In scope:** the recommended direction for form participation, role placement, IDREF/label/help/error association, axe policy, validation timing and submit behavior, field status and validation sources, and the split between shared and per-component responsibilities, plus a naming table contributors follow during migration.

**Out of scope:** implementing a shared form-field mixin, migrating a specific production component, and the full validation UI (for example, a form-level error summary component). Those are tracked as follow-up work.

---

## 3. Recommendations

### 3.1 Form participation: ElementInternals / FACE

gen2 form fields are **form-associated custom elements**: set `static formAssociated = true`, attach internals with `this.attachInternals()`, and mirror value through `setFormValue()`. Do not nest a hidden light-DOM `<input>` to participate in forms. `FieldAssociationController` exposes the read side of validity; each field writes its own validity through `internals.setValidity()`. See [§3.8](#38-shared-and-per-component-responsibilities) for what stays per component.

- **Decision:** yes, adopt ElementInternals/FACE for form fields. The value is submitted via `internals.setFormValue(value)` on change, and the `formDisabledCallback(disabled)` lifecycle hook receives cascades from an ancestor `<fieldset disabled>` or an owning form.
- **Shared controller:** a **`FieldAssociationController`** wraps `ElementInternals` to handle value submission, the disabled cascade, and form reset once, so text field, checkbox, and combobox do not each reimplement it.
- **Browser / AT notes:** Chromium and Safari expose `ElementInternals` ARIA more consistently than Firefox; verify exposure manually in Firefox (see [§3.4](#34-axe-core-policy)).
- **Attribute applicability by input type:** before relying on a native form-related HTML attribute (`readonly`, `minlength`, `maxlength`, `pattern`, `step`, `size`, `multiple`, and similar), confirm it actually applies to the underlying `<input>` type. The HTML Standard's [table of attributes that do not apply to certain input types](https://html.spec.whatwg.org/multipage/input.html#do-not-apply) is the canonical reference; for example, `readonly` does not apply to `checkbox` or `radio` inputs, so a checkbox-based or radio-based component cannot use the native attribute and needs a documented ARIA-based workaround instead.

### 3.2 Where ARIA roles live

For value-bearing fields, the role element **defaults to the shadow DOM**, not the host. This is a deliberate design decision: keeping the role element inside the shadow root enables CSS encapsulation and lets slotted label and description content associate through same-root `aria-labelledby` / `aria-describedby` ID references, while external (light-DOM) label sources use cross-root element-reference properties (see [§3.3](#33-idref-strategy-label-help-text-and-errors)).

- **Exception (button-like controls, and container-only roles with no native HTML equivalent, such as `radiogroup`):** these put the role on the **host** instead, via `ElementInternals` (`internals.role = 'button'` / `'radiogroup'`). This is safe specifically because neither role needs to expose a *live value* to assistive technology the way a textbox or combobox trigger does, and neither has a native HTML element it would otherwise be giving up by moving to the host; there is no `<button>` or `<radiogroup>` element being bypassed. Do not extend this exception to controls that carry a live value (textbox, combobox); see [Why not put the value-bearing role on the host?](#why-not-put-the-value-bearing-role-on-the-host) for why that case does not work the same way. Even with the role on the host, name these controls through `accessible-label` / `accessible-labelledby`, not raw `aria-label` (see [§3.3](#33-idref-strategy-label-help-text-and-errors)).
- **Individual radio items are not part of this exception.** A radio *does* have a native HTML equivalent (`<input type="radio">`), so `swc-radio` follows the general shadow-DOM-default rule above: it renders a real native radio input inside its own shadow root (carrying `role="radio"`, `checked`, and keyboard activation natively), and the host sets no role. Only the group container (`swc-radio-group`, `role="radiogroup"`) uses the host-role exception, because the group itself has no native element to render. See the [naming table](#4-naming-table) for the split.
- **A note on the PoC's `my-radio.js`, which is not evidence either way here.** The [form-strategy proof-of-concept](https://github.com/nikkimk/web-component-form-strategy-demos)'s [`my-radio.js`](https://github.com/nikkimk/web-component-form-strategy-demos/blob/main/my-radio.js) also puts `role="radio"` on the host via `ElementInternals`, with no inner native input. That is not a competing recommendation to weigh against the rule above: the PoC's demo components exist to show which responsibilities can be pulled out into reusable controllers (sibling discovery, mutual exclusion, roving tabindex, name propagation, coordinated reset, see [§6](#6-open-questions) and the [naming table](#4-naming-table)), not to model correct role placement for a production radio. Putting the role on the PoC's host was the fastest way to get `aria-checked` working for that demo, not a design recommendation, so this RFC's shadow-DOM-native-input choice for the item does not "deviate" from anything the PoC was trying to establish. Rely on the PoC for its controller-composition findings (for example, `FocusgroupNavigationController`'s `source` field distinguishing keyboard-driven moves from Tab-entry, used directly in [`radio-group-controller.js`](https://github.com/nikkimk/web-component-form-strategy-demos/blob/main/radio-group-controller.js)); do not treat its components' own internal ARIA choices as validated guidance.
- **Consequence:** because a value-bearing field's host has no role, an axe-core scan of the host alone reports a false positive; this is expected and handled by the axe policy in [§3.4](#34-axe-core-policy). The same false positive is expected on `swc-radio`'s host now that its role lives on an inner native input rather than the host.

#### Why not put the value-bearing role on the host?

A textbox or combobox exposes a **live value** to assistive technology, and that value must live on the element that carries the role. If the role were placed on the host via `ElementInternals` while the editable control stayed in the shadow DOM, the value and the role would sit on different nodes, and the accessible value would not track the control. Keeping the role on the inner shadow control keeps the role and its value on the same node. Button-like controls and the `radiogroup` container do not hit this problem because they expose no live value (see the exception above) and have no native HTML element of their own to delegate to, which is why the host-role shortcut is safe for them but not for value-bearing fields. Individual radio items are a third case: they don't expose a live value either, but because they *do* have a native equivalent (`<input type="radio">`), they follow the general shadow-DOM rule directly rather than needing the host-role exception at all.

### 3.3 IDREF strategy: label, help text, and errors

Hosts do **not** expose the raw `aria-label` / `aria-labelledby` attributes. Because of cross-root ARIA issues, and so consumers get one consistent API across every field instead of setting `aria-label` on the components that happen to support it (and then reaching for it on the ones that do not), fields expose the established **`accessible-label`** attribute for a string name, and the proposed **`accessible-labelledby`** / **`accessible-describedby`** attributes (properties `accessibleLabelledby` / `accessibleDescribedby`) for ID references to a name and a description respectively. This holds even for host-role controls (button-like, radio-like); see [§3.2](#32-where-aria-roles-live).

A **`LabellingMixin`** owns visible-label rendering, label-slot tracking, and accessible-name wiring (`accessible-label` / `accessible-labelledby`). **`FieldDescriptionMixin`** owns description/error-text rendering, description/error-slot tracking, and accessible-description wiring (`accessible-describedby`); its invalid-state behavior replaces help text with error text. These responsibilities are implemented as separate mixins, not a shared labelling controller. Components that need both a persistent description and an error must define that coexistence explicitly rather than assuming both remain associated. Use `aria-errormessage` only where the receiving role supports it, and retain `aria-describedby` for compatibility because browser and screen reader support for `aria-errormessage` remains inconsistent ([support is improving but incomplete](https://cerovac.com/a11y/2024/06/support-for-aria-errormessage-is-getting-better-but-still-not-there-yet/), [current support data](https://a11ysupport.io/tech/aria/aria-errormessage)).

Two complementary sources feed the accessible name and description:

- **Slotted content** (`slot="label"` / `slot="description"`) projects into the shadow DOM and wires through **same-root** `aria-labelledby` / `aria-describedby` pointing at the shadow-internal elements. This is a plain IDREF because both ends live in the same root.
- **Light-DOM siblings** wire through `accessible-labelledby` and `accessible-describedby`. `LabellingMixin` resolves name sources into `ariaLabelledByElements`; `FieldDescriptionMixin` resolves description sources into `ariaDescribedByElements`. These **cross-root element-reference properties** replace raw IDREFs that cannot cross the shadow boundary.

When both sources exist, the shadow-internal label appears first in the merged element-reference list. Error text associates the same way through `aria-describedby`, not `aria-errormessage`.

- **Reference:** [semantic HTML and ARIA guide](../../../gen2/packages/swc/.storybook/guides/accessibility-guides/semantic_html_aria.mdx).

### 3.4 axe-core policy

Browsers currently lack a standardized path for axe-core to read ARIA relationships set via `ElementInternals` (for example `ariaLabelledByElements`, `ariaDescribedByElements`), so form-field stories produce known false positives and blind spots.

**Known false positives** (valid patterns axe flags as violations):

- **`label`**: "Form element does not have a label" on the host, because axe inspects the roleless host without following the shadow root to the inner control's cross-root label wiring.
- **`aria-required-children`**: fires on a combobox-style component with slotted options because axe does not traverse the light-DOM slot to find the `role="option"` children.
- **`duplicate-id-aria`**: fires on shadow DOM IDs, which cannot actually conflict across instances because they are shadow-scoped.

**Known blind spots** (real issues axe misses): a misconfigured `accessible-labelledby` that silently yields a missing label, and stale element references after a target is removed. Screen reader testing is authoritative for these; axe is supplementary.

**Policy:**

- Add a **story-level or test-level exclusion with a written rationale**, not a silent global disable.
- Include a `// reason:` comment linking the relevant upstream Deque / axe-core issue, and remove the exclusion once that issue ships a fix (review on a quarterly cadence).
- Verify exposure with manual AT testing, particularly in **Firefox**, which handles `ElementInternals` ARIA less consistently than Chromium and Safari.
- Align with the [Storybook test-runner axe usage](https://github.com/adobe/spectrum-web-components/blob/main/gen2/packages/swc/.storybook/test-runner.ts). The [ElementInternals and axe-core guide](../../../gen2/packages/swc/.storybook/guides/accessibility-guides/element_internals_axe_core.mdx) in the [accessibility guides](../../../gen2/packages/swc/.storybook/guides/accessibility-guides/) is the detailed reference for axe-core's current `ElementInternals` support and known gaps.

### 3.5 Testing form participation

Every form-associated component (text field, checkbox, checkbox group, radio group, picker, combobox, and any future field) must **prove** its form participation, not just its ARIA. Because the whole point of FACE is behaving like a native control inside a real form, both the stories and the automated tests must exercise the component **inside a native `<form>`** (use a native `<form>` for now; move to a dedicated form component once one exists). This is a requirement for all such components, not a per-component choice.

Every form-associated component's story set and test suite must cover the full form lifecycle:

- **Value on submit:** submitting the form yields the expected `FormData`. A control contributes its `name`/`value` when it has a value and contributes nothing when it does not (an unchecked checkbox, an empty field). Grouped multi-select controls (checkbox group) contribute one entry per selected item under the shared `name`; single-value controls (radio group, picker) contribute one entry.
- **Validation:** a `required` (or otherwise constrained) control blocks submission and reports validity (`:invalid` on the host, `checkValidity()`/`reportValidity()`), and the invalid state clears once the constraint is satisfied. Validate at the level the constraint lives (per item for a standalone required checkbox; at the group for "select at least one" or "choose exactly one"). Tests also cover:
  - **No automatic side effects** ([§3.7](#37-field-status-and-validation-sources)): typing and a native constraint failure do not change `field-status` or show error text, and supplying `error-text` does not make the field invalid.
  - **Independent sources** ([§3.7](#37-field-status-and-validation-sources)): `field-status="invalid"` fails validation, and clearing one source (native constraint or authored invalid status) does not clear the other. Clearing `field-status` removes the derived custom error and its message but keeps native constraint failures.
  - **Invalid presentation** ([§3.7](#37-field-status-and-validation-sources)): error text replaces the description, and the invalid icon shows with and without error text.
  - **Barred states:** `field-status="disabled"` and `field-status="readonly"` do not block validation.
  - **Status warnings:** `undefined` is accepted silently, and an unsupported `field-status` value (including a value the component does not accept, such as `valid` on the radio group) produces a dev-mode enum warning ([§3.7](#37-field-status-and-validation-sources)).
  - **Focus target** ([§3.6](#36-validation-timing-and-submit-behavior)): calling `focus()` on the host moves focus to the validation anchor. The form story uses `novalidate`, and after a failed submit its handler moves focus to the first invalid field.
- **Reset:** `form.reset()` restores every control to its default value via `formResetCallback()`.
- **Getting the value:** the value read on submit matches the value read programmatically, across the checked/selected, unchecked/empty, and post-reset states.

A single story that renders the component in a `<form>` with a submit button and a reset button doubles as the consumer-facing example and the fixture these tests drive. Use **native** `<button type="submit">` and `<button type="reset">` for now: hold off on a Spectrum button for the submit/reset controls until the clear-button component ships and the button form-association fast-follow is complete (the button-activation open question in [§6](#6-open-questions)). The field under test is the form-associated 2nd-gen component; the surrounding submit/reset controls stay native until then.

### 3.6 Validation timing and submit behavior

Good validation helps the user with specific error messages, but does not show errors for input that is not complete yet. gen2 fields follow the same behavior as React Spectrum; see the [React Spectrum forms guide](https://react-spectrum.adobe.com/forms#validation) and [Form focus management](https://react-spectrum.adobe.com/Form#focus-management).

gen2 fields do not show errors by themselves. The application sets `field-status="invalid"` and supplies `error-text` (see [§3.7](#37-field-status-and-validation-sources)). This section defines when the application does that, how submit behaves, and what each field must supply so that the application can do it.

- **Validate on commit, not as the user types (default).** A field has two separate validity states:
  - **Live constraint validity** is owned by the field and is always current, so `checkValidity()`, `validity`, `validationMessage`, and the host's `:invalid` match are accurate at all times. It combines the validity sources in [§3.7](#37-field-status-and-validation-sources).
  - **Displayed validity** controls the invalid styling, icon, and error text. It is `field-status="invalid"` plus `error-text`, which the application sets. The application updates it only when the user commits a value (for example, on blur or `change`) or submits the form. A native form reset clears `invalid` and `valid` status. This prevents errors for partial input.

  React Spectrum uses the same split: `realtimeValidation` and `displayValidation` in [`useFormValidationState`](https://github.com/adobe/react-spectrum/blob/main/packages/react-stately/src/form/useFormValidationState.ts).
- **Do not use `:user-invalid` for the displayed state.** HTML defines `:user-invalid` only for native `input`, `textarea`, and `select` elements, so it does not match FACE hosts. Also, after the first commit or submit, native `:user-invalid` follows live validity on each keystroke, which is not the commit-based display above. Style the invalid state from `field-status="invalid"`.
- **Realtime validation is opt-in.** Some cases need feedback on each keystroke, for example password requirements. For these cases, the application listens for `input` and sets `field-status` and `error-text` itself. Do not make realtime validation the default for any field.
- **Do not switch to realtime validation after submit.** After a failed submit, the field keeps commit-based timing. The displayed validity updates on the next commit, not on each keystroke. This keeps the behavior consistent before and after submit.
- **Forms use `novalidate`.** Fields show their own inline error text, so the browser must not show its native validation bubbles. With `novalidate`, the browser also does not block submit, does not fire `invalid` events on submit, and does not move focus. The application's submit handler does all three. Fields do not suppress native bubbles themselves; controlling the enclosing form is the application's responsibility.
- **On a blocked submit, focus the first invalid field, or another target the application chooses.** The submit handler does these steps:
  1. Clear stale authored `invalid` status if the handler recomputes it, because authored status is itself a validity source ([§3.7](#37-field-status-and-validation-sources)). Await `updateComplete` before the next step.
  2. Call `form.checkValidity()`. It shows no browser UI and returns only a boolean. It fires `invalid` events on the invalid fields, which the handler can ignore.
  3. If it returns `false`, prevent submission, set `field-status="invalid"` and `error-text` on each invalid field, and move focus. By default, focus the first invalid field in DOM order. The application can instead move focus somewhere else, for example to an inline alert that summarizes the errors.

  ```js
  const firstInvalid = [...form.elements].find(
    (element) => element.willValidate && !element.validity.valid
  );
  firstInvalid?.focus();
  ```

  - Use `form.elements`. It lists every associated field in tree order, including fields outside the form subtree that join it through the `form` attribute (`form="form-id"`).
  - Do not use `form.querySelector(':invalid')`. `:invalid` matches the field host through the shadow boundary, but it also matches an enclosing `<fieldset>` and the form itself, and it does not find fields outside the form subtree.
  - Do not call `form.submit()` to submit. It skips constraint validation and the `submit` event, so the handler above never runs. Use `form.requestSubmit()` or a submit button.
  - `novalidate` on the form makes `formnovalidate` on a submit button a no-op for the browser, because the browser is not validating at all. If the form has a button that should skip validation (for example, "Save draft"), the handler checks `event.submitter?.formNoValidate` itself and skips steps 2 and 3. This is application logic, not something fields handle.
  - Do not use `form.reportValidity()` to move focus. It focuses the validation anchor, but it shows the native bubble that `novalidate` avoids, and it does not show the inline error.
  - If a form does not use `novalidate`, the browser runs interactive validation: it shows native bubbles and focuses the first invalid field's anchor. Canceling `invalid` suppresses this only for the fields whose event is canceled. Because `invalid` does not bubble, a capture listener on the `<form>` catches only fields inside the form subtree; add listeners on each field in `form.elements` to include fields associated through the `form` attribute. We do not recommend this setup.
- **Fields supply a focusable validation anchor.** For the steps above to work, each field must meet both requirements. One without the other does not move focus.
  - Pass a focusable element as the third argument (`anchor`) of `internals.setValidity(flags, message, anchor)`. A native inner control, such as the text field's `<input>`, is already focusable. A field without a native inner control, such as the radio group's `role="radiogroup"` wrapper, needs `tabindex="-1"` on the anchor. The browser uses the anchor for `reportValidity()` and for interactive validation without `novalidate`.
  - Make `host.focus()` reach the anchor, so that the application can focus the field it found. Fields with a native inner control use `delegatesFocus: true`, as the text field does. Other fields override `focus()` to forward to the anchor, as the radio group does.
- **Keep the submit button enabled.** Do not disable the submit button until the form is valid. A disabled button is removed from the tab order, gives no reason why it is disabled, and does not tell the user which field to fix. Let submit run validation and move focus to the problem instead.

### 3.7 Field status and validation sources

These decisions come from the text field and radio group migrations. The [text field documentation](../../../gen2/packages/swc/components/text-field/text-field.mdx) shows the consumer-facing behavior.

- **One mutually exclusive field status.** A field exposes one `field-status` attribute (`fieldStatus` property) with the values `disabled`, `invalid`, `valid`, and `readonly`. The default is `undefined`. A field has at most one status, so it cannot be disabled and invalid, or read-only and invalid, at the same time. `required` stays a separate property. A component accepts only the values that apply to it; for example, the radio group has no `valid`.
  - **Why mutually exclusive:** a user cannot correct an invalid value in a disabled or read-only field. Separate booleans would need logic to resolve conflicting states in every component. If old data in a non-editable field is invalid, show that in the content, not with an invalid status.
  - **Never combine statuses in code.** Do not write logic that treats a field as disabled and invalid, or read-only and invalid, at once: no `invalid && disabled` branches, no separate `disabled`, `readonly`, or `invalid` booleans, and no reflecting `disabled` or `readonly` onto the host. Read one value, `fieldStatus`, and treat any other combination as unreachable.
  - **The form or fieldset disabled cascade is not a status.** A `<fieldset disabled>` or disabled form reaches the field through `formDisabledCallback()` and `fieldAssoc.formDisabled`, so an authored `invalid` or `valid` status can sit under a cascaded disabled state. Resolve it in one place, with **effective disabled** (authored `field-status="disabled"` or the cascade) taking precedence over authored `invalid` and `valid`: the field is barred, leaves `FormData`, sets `:state(disabled)`, and does not show the invalid icon. Never overwrite `fieldStatus` to record the cascade. The authored status is kept and applies again when the field is re-enabled.
  - Core exports the shared values (`FIELD_STATUSES`) and type (`FieldStatus`). A component that accepts a subset narrows the type. A shared mixin that owns the property and its behavior is deferred, so each component implements the property.
- **Validity sources.** Live constraint validity ([§3.6](#36-validation-timing-and-submit-behavior)) combines two independent sources, plus the message that describes them:
  1. **Native constraints.** Use the native constraint validation API. Reflect `required`, `pattern`, `minlength`, and `maxlength` to the native inner control, where one exists, and any other constraint attributes the field supports (for example `type`, `min`, `max`, and `step`). A field without a native control sets the validity flags itself, such as `valueMissing` for a required group. As with native controls, `minlength` and `maxlength` apply only to user-provided input, not to values set programmatically. Keep `checkValidity()` and `reportValidity()` public on the host.
  2. **Authored invalid status.** `field-status="invalid"` sets the `customError` flag, so an eligible field fails validation and blocks submit. `customError` is an implementation detail; consumers set the status, not the flag. This is the gen2 equivalent of the native `setCustomValidity()` for rules that native constraints cannot express, such as a username that is already taken or a rule that spans several fields. The application runs that logic and sets the status and `error-text`.
  3. **Validation message from `error-text`.** The plain text of the slotted `error-text` is the message passed to `internals.setValidity()` while the field is invalid, so a field has one source of truth for its message. `error-text` alone does not make the field invalid, and hidden or empty error content does not either. To show a different message, the application changes the content of `error-text`.
  - **Do not expose `setCustomValidity()` on the host.** A separate host message adds no value to this workflow and creates a second message source to reconcile. Consumers supply one error message in `error-text` and set `field-status="invalid"`. The text field removed it for this reason. Reconsider only for a concrete need.
  - **Keep the message in sync.** Slot-presence tracking does not notify when only the text changes, so the field observes `error-text` content changes (for example, with a `MutationObserver`) and re-syncs validity. It also applies content that exists before the first render.
- **Keep the sources independent.** Clearing one source never clears another. For example, clearing `field-status` removes the derived custom error but does not clear native constraint failures, and a native constraint that passes does not clear authored invalid status.
- **No automatic side effects.** Typing, native constraint failures, and the presence of `error-text` never change `field-status` or the displayed error. The field does not validate on each keystroke.
- **Message and presentation precedence.**
  - While `field-status="invalid"`, the plain text of `error-text` is the validation message. Without error text, the field uses a standard fallback message: "Enter a valid value." for text-like fields and "Select an option." for selection fields such as the radio group, checkbox group, and picker. The fallback is not shown inline. It appears only in the browser's native validation bubble (a form without `novalidate`, or a call to `reportValidity()`), and through `validationMessage` for an application that reads it. Applications that need other or localized text supply `error-text`. Use these exact strings so every field reports the same message.
  - Error text replaces the description while the field is invalid.
  - The invalid icon always shows while the field is invalid, also without error text, so the invalid state is not shown by color alone (a WCAG 1.4.1 failure). Without error text, a description stays visible, turns the error color, and appears alongside the icon. A control that shows its own icon, such as the text field's input, does not need another one. A control without one, such as the radio group, passes `errorIcon` to `renderFieldDescription()`.
  - Documentation tells consumers to always pair `field-status="invalid"` with error text.
- **Disabled and read-only fields do not block validation.** Both are barred from constraint validation. The browser bars a FACE host only through its own `disabled` or `readonly` attribute, or the form or fieldset disabled cascade. Fields set these states through `field-status` and do not also reflect `disabled` or `readonly` onto the host, so each field bars itself:
  - Override `willValidate` to return `false` while barred.
  - Pass no constraint failures to `internals.setValidity()` while barred, for example no `valueMissing` for a required radio group. The browser reads the internals' flags for `form.checkValidity()` and submit, not the overridden getter. Native controls behave the same way: a disabled or read-only input does not report `valueMissing`.
  - `customError` from authored `invalid` status can stay set. A native control keeps its custom error while barred, and because `field-status` is exclusive, authored `invalid` can only meet a barred state through the form or fieldset disabled cascade, which the browser already bars. Consumers must therefore check `willValidate` as well as `validity.valid`, as the submit handler in [§3.6](#36-validation-timing-and-submit-behavior) does.
  - Compute "barred" from the **effective** disabled state (authored `field-status="disabled"` or the form or fieldset cascade in `fieldAssoc.formDisabled`) or `field-status="readonly"`, never from `field-status` alone.
- **Unsupported status values warn.** Validate `field-status` with `validateEnum` against the component's own status list, and warn in dev mode on a value the component does not accept. `undefined` never warns. Do not add a warning for `invalid` without `error-text` for now; documentation tells consumers to pair them.
- **Disabled styling uses a custom state.** Fields set `internals.states.add('disabled')` from the effective disabled state, and styles select `:host(:state(disabled))`. The shared `form-fields.css` relies on this state to dim the label, description, and error text, so every field that uses it must set the state.
- **Disabled versus read-only.** A disabled field is not in the tab order, not in `FormData`, and its value cannot be selected or copied. When users need to review or copy a value, documentation recommends `readonly` instead. A future recommendation may be a display-only component such as [React Spectrum's `LabeledValue`](https://react-spectrum.adobe.com/LabeledValue) for values that are not editable at all. Whether `disabled` should behave like `aria-disabled` (focusable, but not editable) needs more research; see [§6](#6-open-questions).

### 3.8 Shared and per-component responsibilities

Shared code owns the behavior that is the same for every field. Each component owns the behavior that depends on its shape. When a component adds behavior from this table that another field already has, first check whether it can move to a shared controller, mixin, or utility.

| Responsibility | Owner | Notes |
|----------------|-------|-------|
| Form value, `FormData` exclusion, disabled cascade, validity reads | `FieldAssociationController` | See the [controller documentation](../../../gen2/packages/core/controllers/field-association-controller/field-association-controller.mdx). |
| Visible label and accessible name | `LabellingMixin` | See [§3.3](#33-idref-strategy-label-help-text-and-errors). |
| Description, error text, and accessible description | `FieldDescriptionMixin` | The component passes its invalid state, for example `renderFieldDescription({ invalid: this.fieldStatus === 'invalid' })`, and an `errorIcon` when the control has no invalid icon of its own. |
| `field-status` values | `FIELD_STATUSES` and `FieldStatus` in core; property per component | A shared mixin is deferred. |
| Label, description, and error text dimming while disabled | Shared `form-fields.css` | The component must set the `disabled` custom state. |
| `static formAssociated`, `attachInternals()`, `formResetCallback()`, `formStateRestoreCallback()` | Component | The browser reads or calls these on the host. A component that reflects its value attribute (for example, a radio group's `selected`) captures the initial value on first update and restores it on reset. |
| Writing validity with `internals.setValidity(flags, message, anchor)` | Component | Combines the sources in [§3.7](#37-field-status-and-validation-sources). The message must not be empty when a flag is `true`. |
| Validation message from `error-text` (including content that exists before the first render and text-only changes) | Component | Shared helper is a candidate. See [§3.7](#37-field-status-and-validation-sources) and [§6](#6-open-questions). |
| Focusable validation anchor and `host.focus()` forwarding | Component | See [§3.6](#36-validation-timing-and-submit-behavior). |
| Barring disabled and read-only fields from validation, and the `disabled` custom state | Component | Uses the effective disabled state. See [§3.7](#37-field-status-and-validation-sources). |
| Invalid icon | Component, or `FieldDescriptionMixin` through `errorIcon` | Shows while invalid, also without error text. |
| `novalidate`, the submit handler, setting `field-status`, and moving focus | Application | See [§3.6](#36-validation-timing-and-submit-behavior). |

**Reference implementations.** Follow the naming and structure of the existing fields so the per-component pieces stay recognizable. Read the code before writing a new field, and match it unless this RFC says otherwise:

- **Text field** (`gen2/packages/core/components/text-field/TextField.base.ts`): a native inner control. `syncValidity()` derives the validation message from the slotted `error-text`, `errorTextObserver` re-syncs when only the text changes, `delegatesFocus: true` routes `host.focus()` to the input, and `formResetCallback()` clears `valid` and `invalid` status. The submit and reset examples are in `text-field.mdx` and `text-field.stories.ts`.
- **Radio group** (`RadioGroup.base.ts` and `RadioGroup.ts` in the radio group component, which lands with the radio migration): a wrapper without a native control. `update()` writes `valueMissing` (cleared while barred) and `customError` with the `role="radiogroup"` element as the anchor, `focus()` forwards to that element, which has `tabindex="-1"`, and `render()` passes `errorIcon` to `renderFieldDescription()`.
- **Barring and the `disabled` state:** `FieldAssociationController` (`getStatus`, `host`, `barred`, `syncDisabledState()`) in `field-association-controller.mdx`. This arrives with the field-status reconciliation work, so check its documentation for the current API.

### 3.9 Form documentation until a Forms page exists

Until a shared Forms pattern page exists ([§6](#6-open-questions)), each form field's component page carries the consumer-facing form guidance. The text field documentation (`text-field.mdx`, "Form participation") is the reference. Its "Showing and clearing errors", "Validating a form", "Reset", and validation-methods sections are the model for structure and wording. A form-associated component's page covers each point below, in its form participation section, its field status states, and its best practices.

- **Errors are set by the application.** The application sets `field-status="invalid"` and supplies `error-text`. Nothing sets them automatically, and `error-text` alone does not make the field invalid. Clear the status explicitly. Await `updateComplete` before checking validity. Always pair `invalid` with error text.
- **Validation timing.** Errors display on commit or submit, not on each keystroke. Realtime validation is opt-in through the application's own `input` listener, and a field never switches to realtime after a failed submit ([§3.6](#36-validation-timing-and-submit-behavior)).
- **Form setup and submit handler.** Use `novalidate`. The handler clears stale status, calls `form.checkValidity()`, sets status and error text, and moves focus. It finds the first invalid field with `form.elements` and `willValidate`, not `:invalid` selectors or `reportValidity()`. Keep the submit button enabled and submit with `requestSubmit()` or a button, not `form.submit()`.
- **Focus.** Say that `host.focus()` reaches the field's focus target, so the handler can focus the field it found.
- **Status and barring.** Status values are mutually exclusive. Disabled and read-only fields do not block validation. A disabled field is excluded from `FormData`, and its value cannot be selected or copied, so recommend `readonly` when users need to review or copy it. A `<fieldset disabled>` does not change `fieldStatus`, and an authored invalid status returns when the field is re-enabled.
- **Reset and methods.** Reset restores the default value and clears `valid` and `invalid` status. Explain `checkValidity()` versus `reportValidity()`, the `invalid` event, and that authored `invalid` sets `validity.customError`.
- **Styling hooks.** Style the invalid state from `field-status`, and the disabled state from `:state(disabled)`. Do not use `:user-invalid`, and note that `:invalid` follows live validity.

The points that are the same for every field (timing, form setup, the submit handler, and focus management) move to the Forms page when it exists. Component pages then keep only what is specific to the component: its native constraints, its focus target, its reset target, and its value formatting. When copying these points to a new component page, link to the Forms page once it is available instead of repeating the handler.

---

## 4. Naming table

The canonical surface for form fields. Contributors align Phase 3 (API) and Phase 4 (accessibility) work to this table. Names are drawn from the [form-strategy proof-of-concept](https://github.com/nikkimk/web-component-form-strategy-demos); treat *pending research* rows as provisional until their spikes conclude.

| Concern | Name / approach | Notes |
|---------|-----------------|-------|
| Form participation | `static formAssociated = true` + `attachInternals()`, wrapped by `FieldAssociationController` | Value submitted via `internals.setFormValue(value)`. |
| Label surface (visible) | Named `slot="label"` | Preferred over the default slot so label content is explicit and consistent across fields; pending confirmation across all migrated components. |
| Accessible name (no visible label) | `accessible-label` attribute | Established convention; do **not** expose raw `aria-label` on the host. |
| Help / description surface | `slot="description"`, wired by `FieldDescriptionMixin` | Associates through a role-appropriate ARIA description relationship. |
| Error text surface | `slot="error-text"`, wired by `FieldDescriptionMixin` | Shown while `field-status="invalid"`; its plain text is the validation message. Associates through a role-appropriate ARIA description/error relationship; retain `aria-describedby` when using `aria-errormessage` for compatibility. |
| Disabled cascade | `formDisabledCallback(disabled)` | Receives cascade from ancestor `<fieldset disabled>` or owning form. |
| Reset | `formResetCallback()` | Restores the field to its default value on form reset and clears `invalid` and `valid` status. |
| Field status | `field-status` attribute (property `fieldStatus`): `disabled` \| `invalid` \| `valid` \| `readonly` | One status at a time; `required` stays separate. See [§3.7](#37-field-status-and-validation-sources). |
| Validation message | Plain text of the slotted `error-text` | Passed to `internals.setValidity()` while `field-status="invalid"`. No host `setCustomValidity()`. See [§3.7](#37-field-status-and-validation-sources). |
| Disabled styling hook | `:state(disabled)` custom state | Set from the effective disabled state. |
| Cross-root name from light DOM | `accessible-labelledby` attribute (property `accessibleLabelledby`) → `ariaLabelledByElements` via `LabellingMixin` | Element references, not raw IDREFs; do **not** expose raw `aria-labelledby`. |
| Cross-root description from light DOM | `accessible-describedby` attribute (property `accessibleDescribedby`) → `ariaDescribedByElements` via `FieldDescriptionMixin` | Element references, not raw IDREFs; do **not** expose raw `aria-describedby`. |

Implementation names. Text field and radio group already agree on most of these. Match them in every field, so a reader moves between fields without relearning the structure:

| Concern | Name | Notes |
|---------|------|-------|
| Status property | `fieldStatus`, attribute `field-status`, reflected, default `undefined` | Use the converter `fromAttribute: (value) => value ?? undefined` so removing the attribute clears the status. |
| Status values and type | `<COMPONENT>_STATUSES` and `<Component>Status`, for example `TEXT_FIELD_STATUSES` and `TextFieldStatus` | Typed against the shared `FieldStatus`. Narrow to the values the component accepts. Check the property with `validateEnum`. |
| Form participation members | `internals` (from `attachInternals()`) and `fieldAssoc` (the `FieldAssociationController`) | Both private. |
| Effective disabled | `effectiveDisabled` getter, reading `fieldAssoc.disabled` | The only disabled value the component reads. |
| Public validity members | `form`, `validity`, `validationMessage`, `willValidate`, `checkValidity()`, `reportValidity()` | Pass through to `fieldAssoc`. `willValidate` is `false` while barred. |
| Writing validity | private `syncValidity()` | The only place that calls `internals.setValidity()`. It derives flags and the message, applies the barred rule, and passes the anchor. Call it when the properties that affect validity change, and when the `error-text` content changes. |
| Reset | `formResetCallback()` | Restores the default value and clears `valid` and `invalid` status. |
| Disabled cascade | `formDisabledCallback()` | Delegates to `fieldAssoc.formDisabledCallback()`. |
| Focus target | `focus()` override, or `delegatesFocus: true` | See [§3.6](#36-validation-timing-and-submit-behavior). |

| Component class | Role placement | Internals (FACE) | IDREF approach | axe note |
|-----------------|----------------|------------------|----------------|----------|
| Text-like (text field) | inner control in shadow DOM | `FieldAssociationController` | `LabellingMixin` for names; `FieldDescriptionMixin` for descriptions (slotted same-root + light-DOM element refs) | `label` false positive on host |
| Button-like (clear / submit) | **host**, via `ElementInternals` (see [§3.2 exception](#32-where-aria-roles-live)) | `ButtonAssociationController` *(pending research)* | n/a | verify role and activation exposure manually |
| Grouped selection — group container (radio group) | **host**, via `ElementInternals` (see [§3.2 exception](#32-where-aria-roles-live)): `role="radiogroup"` | group-level validity (required/invalid), coordinated by `RadioGroupController` *(pending research)* | host-attached labelling (no native container element to anchor a same-root IDREF to) | verify group semantics manually |
| Grouped selection — item (radio) | **shadow DOM**, the general rule, not the host exception: a native `<input type="radio">` inside the item's own shadow root | per-item `FieldAssociationController` | same-root labelling, anchored to the inner input (matches text-like fields) | verify `aria-checked` and per-item labelling manually |

---

## 5. Migration path

Contributors migrating a form field follow the washing machine workflow with these additions:

- **Phase 3 (API):** wire form participation, name the API from the [naming table](#4-naming-table), and replace status booleans with `field-status` per [§3.7](#37-field-status-and-validation-sources). See [Washing machine workflow, Phase 3](../02_workstreams/02_gen2-component-migration/02_step-by-step/01_washing-machine-workflow.md#phase-3-api-migration).
- **Phase 4 (accessibility):** wire label, help text, and errors per [§3.3](#33-idref-strategy-label-help-text-and-errors), satisfy the axe policy in [§3.4](#34-axe-core-policy), follow the validation timing, `novalidate`, and focus behavior in [§3.6](#36-validation-timing-and-submit-behavior), and supply a focusable validation anchor that `host.focus()` reaches. See [Washing machine workflow, Phase 4](../02_workstreams/02_gen2-component-migration/02_step-by-step/01_washing-machine-workflow.md#phase-4-accessibility).
- **Phase 6 (testing):** add stories and tests that exercise the component inside a native `<form>` and cover the full form lifecycle (value on submit, validation, reset, getting the value) per [§3.5](#35-testing-form-participation). See [Washing machine workflow, Phase 6](../02_workstreams/02_gen2-component-migration/02_step-by-step/01_washing-machine-workflow.md#phase-6-testing).
- **Phase 7 (documentation):** cover the form documentation points in [§3.9](#39-form-documentation-until-a-forms-page-exists) on the component page. See [Washing machine workflow, Phase 7](../02_workstreams/02_gen2-component-migration/02_step-by-step/01_washing-machine-workflow.md#phase-7-documentation).

---

## 6. Open questions

These are active research spikes; their outcomes finalize the *pending research* rows in the [naming table](#4-naming-table):

- **Button activation:** whether a dedicated `ButtonAssociationController` is needed for button-like fields (clear button, a future submit button), or whether a native inner `<button>` already covers keyboard activation, role, and focusability.
- **Grouped selection:** whether a dedicated `RadioGroupController` is needed for radio group (composing `SelectionController`, `FocusgroupNavigationController`, and `SlotAttributePropagationController`), or whether those primitives are composed inline.
- **Label slot rule:** confirming the primary-vs-supplementary rule for default slot vs named `slot="label"` holds across all migrated components, and how it relates to the `accessible-label` attribute used for no-visible-label cases.
- **Role-specific mixin integration:** `LabellingMixin` owns `accessible-labelledby`; `FieldDescriptionMixin` owns `accessible-describedby`. The mixin split is decided; components must still verify the exact role-specific association behavior and avoid prescribing unsupported ARIA states.

These questions come from the text field and radio group migrations. They do not block migration:

- **Field status mixin:** whether a shared mixin should own `field-status`, its barring from validation, and the `disabled` custom state ([§3.7](#37-field-status-and-validation-sources)). Deferred for now. A related question is where shared form types such as `FieldStatus` live in core (mixins, utilities, or a shared types folder), and whether every field accepts `valid` for consistency even when it has no visual effect.
- **Disabled as `aria-disabled`:** whether `field-status="disabled"` should keep the field focusable and exposed as `aria-disabled`, instead of natively disabled. A disabled field is not in `FormData`, and its value cannot be selected or copied, but lower contrast can be useful to show that the field is not available. Deferred for more research. Until then, documentation recommends `readonly` when users need to review or copy a value.
- **Duplicated field code:** text field and radio group repeat the same code: the public validity passthroughs, status clearing in `formResetCallback()`, forwarding `focus()` to the anchor, and the `field-status` property with its enum check. Decide which of these move into `FieldAssociationController`, a mixin, or a utility when the field status mixin question above is resolved, and when checkbox or another field repeats them.
- **Shared `error-text` validity message:** whether the wiring that turns `error-text` content into the `setValidity()` message (observing text changes, applying pre-render content, and the generic fallback) moves into a shared controller or mixin, so each field does not re-implement it.
- **Native validation bubbles:** whether fields should do more than rely on `novalidate` in the application ([§3.6](#36-validation-timing-and-submit-behavior)).
- **Necessity indicator text:** whether consumers can override the `(required)` and `(optional)` text, for example for localization.
- **Form documentation:** whether form behavior that is the same for every field (`novalidate`, the submit handler, focus management, and reset) moves from each component page to a shared Forms pattern page, as React Spectrum does with its Form page. Component pages would keep only component-specific behavior.
- **Shared test helpers:** whether to add shared helpers or assertions for the form lifecycle tests in [§3.5](#35-testing-form-participation), so each field does not write the same tests again.

---

## Appendix A: PoC findings

The form-strategy proof-of-concept documents the controllers and the axe policy this proposal is based on:

- Repository: [web-component-form-strategy-demos](https://github.com/nikkimk/web-component-form-strategy-demos).
- Historical PoC abstractions include `FieldAssociationController`, `LabellingMixin`, `HelpTextMixin`, `ButtonAssociationController`, and `RadioGroupController` (composing `SelectionController`, `FocusgroupNavigationController`, `SlotAttributePropagationController`). Earlier planning also called the combined label/description abstraction `LabellingController`. The gen2 decision separates these responsibilities into `LabellingMixin` and `FieldDescriptionMixin`; historical PoC names and source links are not current implementation guidance.
- axe-core policy and `ElementInternals` gaps: see the repository's [axe-core policy section](https://github.com/nikkimk/web-component-form-strategy-demos/tree/main#axe-core-policy-and-elementinternals).

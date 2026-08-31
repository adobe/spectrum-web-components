<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../README.md) / [Project planning](../README.md) / Strategies / Forms Strategy: 2nd-Gen Proposal

<!-- Document title (editable) -->

# Forms Strategy: 2nd-Gen Proposal

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
- [4. Naming table](#4-naming-table)
- [5. Migration path](#5-migration-path)
- [6. Open questions](#6-open-questions)
- [Appendix A: PoC findings](#appendix-a-poc-findings)

</details>

<!-- Document content (editable) -->

## Summary

This proposal records the team's recommended direction for **2nd-gen form fields** (text field, checkbox, radio, picker, combobox) before scaling migration. It synthesizes the proof-of-concept findings for text field and combobox as form-associated custom elements, plus the cross-root ARIA `referenceTarget` shim research. The core decisions are: form fields participate in forms through the **ElementInternals / form-associated custom element (FACE)** API; ARIA roles default to the **shadow DOM**, with an explicit host-role exception for button-like and radio-like controls (see [§3.2](#32-where-aria-roles-live)); label, help text, and error text associate through **IDREF relationships** that use a cross-root-safe pattern; and **axe-core** exclusions are documented, not silent.


> **Scope:** Form-field API and accessibility direction only. This proposal does **not** implement the shared controllers or migrate a production component; those are follow-up work.

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

1st-gen form controls vary in how they participate in forms, where roles live, and how label/help/error text is associated. Some rely on a nested light-DOM `<input>`; some manage validity by hand; cross-root ARIA relationships are inconsistent. Scaling 2nd-gen migration without a single agreed direction would multiply that inconsistency across every field. This proposal fixes the direction once so contributors do not re-litigate it per component.

---

## 2. Scope

**In scope:** the recommended direction for form participation, role placement, IDREF/label/help/error association, and axe policy, plus a naming table contributors follow during migration.

**Out of scope:** implementing a shared form-field mixin, migrating a specific production component, and full validation UI. Those are tracked as follow-up work.

---

## 3. Recommendations

### 3.1 Form participation: ElementInternals / FACE

2nd-gen form fields are **form-associated custom elements**: set `static formAssociated = true`, attach internals with `this.attachInternals()`, and mirror value through `setFormValue()`. Do not nest a hidden light-DOM `<input>` to participate in forms. A `setValidity()` pass-through on `FieldAssociationController` is proposed but not yet implemented (*pending research*); see [§6](#6-open-questions) before hand-rolling validity per component.

- **Decision:** yes, adopt ElementInternals/FACE for form fields. The value is submitted via `internals.setFormValue(value)` on change, and the `formDisabledCallback(disabled)` lifecycle hook receives cascades from an ancestor `<fieldset disabled>` or an owning form.
- **Shared controller:** a **`FieldAssociationController`** wraps `ElementInternals` to handle value submission, the disabled cascade, and form reset once, so text field, checkbox, and combobox do not each reimplement it.
- **Browser / AT notes:** Chromium and Safari expose `ElementInternals` ARIA more consistently than Firefox; verify exposure manually in Firefox (see [§3.4](#34-axe-core-policy)).

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

A **`LabellingController`** (in flight as part of the text field epic; *pending research*) owns the wiring so fields do not hand-roll it: it watches the shadow DOM slots, shows or hides the internal label element based on slot content presence, and keeps the ARIA relationships in sync as content changes. Help text and error text associate through `aria-describedby` and `aria-errormessage`.

Two complementary sources feed the accessible name and description:

- **Slotted content** (`slot="label"` / `slot="description"`) projects into the shadow DOM and wires through **same-root** `aria-labelledby` / `aria-describedby` pointing at the shadow-internal elements. This is a plain IDREF because both ends live in the same root.
- **Light-DOM siblings** wire through the `accessible-labelledby` and `accessible-describedby` attributes, which resolve element IDs and, via the `LabellingController`, set the **cross-root element-reference properties** `ariaLabelledByElements` / `ariaDescribedByElements`, rather than raw IDREFs that cannot cross the shadow boundary.

When both sources exist, the shadow-internal label appears first in the merged element-reference list. Error text associates the same way through `aria-errormessage`.

- **Reference:** [semantic HTML and ARIA guide](../../../2nd-gen/packages/swc/.storybook/guides/accessibility-guides/semantic_html_aria.mdx).

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
- Align with the [Storybook test-runner axe usage](https://github.com/adobe/spectrum-web-components/blob/main/2nd-gen/packages/swc/.storybook/test-runner.ts). The [ElementInternals and axe-core guide](../../../2nd-gen/packages/swc/.storybook/guides/accessibility-guides/element_internals_axe_core.mdx) in the [accessibility guides](../../../2nd-gen/packages/swc/.storybook/guides/accessibility-guides/) is the detailed reference for axe-core's current `ElementInternals` support and known gaps.

---

## 4. Naming table

The canonical surface for form fields. Contributors align Phase 3 (API) and Phase 4 (accessibility) work to this table. Names are drawn from the [form-strategy proof-of-concept](https://github.com/nikkimk/web-component-form-strategy-demos); treat *pending research* rows as provisional until their spikes conclude.

| Concern | Name / approach | Notes |
|---------|-----------------|-------|
| Form participation | `static formAssociated = true` + `attachInternals()`, wrapped by `FieldAssociationController` | Value submitted via `internals.setFormValue(value)`. |
| Label surface (visible) | Default slot when the label is the component's only or primary content; named `slot="label"` when it is supplementary to other primary content | Primary-vs-supplementary rule; pending the slot-API research decision. |
| Accessible name (no visible label) | `accessible-label` attribute | Established convention; do **not** expose raw `aria-label` on the host. |
| Help / description surface | `slot="description"`, wired by `LabellingController` | Associates via `aria-describedby`. |
| Error text surface | Error text wired by `LabellingController` | Associates via `aria-errormessage`. |
| Disabled cascade | `formDisabledCallback(disabled)` | Receives cascade from ancestor `<fieldset disabled>` or owning form. |
| Reset | `formResetCallback()` | Restores the field to its default value on form reset. |
| Cross-root name from light DOM | `accessible-labelledby` attribute (property `accessibleLabelledby`) → `ariaLabelledByElements` via `LabellingController` *(pending research)* | Element references, not raw IDREFs; do **not** expose raw `aria-labelledby`. |
| Cross-root description from light DOM | `accessible-describedby` attribute (property `accessibleDescribedby`) → `ariaDescribedByElements` via `LabellingController` *(pending research)* | Element references, not raw IDREFs; do **not** expose raw `aria-describedby`. |

| Component class | Role placement | Internals (FACE) | IDREF approach | axe note |
|-----------------|----------------|------------------|----------------|----------|
| Text-like (text field) | inner control in shadow DOM | `FieldAssociationController` | `LabellingController` (slotted same-root + light-DOM element refs) | `label` false positive on host |
| Button-like (clear / submit) | **host**, via `ElementInternals` (see [§3.2 exception](#32-where-aria-roles-live)) | `ButtonAssociationController` *(pending research)* | n/a | verify role and activation exposure manually |
| Grouped selection — group container (radio group) | **host**, via `ElementInternals` (see [§3.2 exception](#32-where-aria-roles-live)): `role="radiogroup"` | group-level validity (required/invalid), coordinated by `RadioGroupController` *(pending research)* | host-attached labelling (no native container element to anchor a same-root IDREF to) | verify group semantics manually |
| Grouped selection — item (radio) | **shadow DOM**, the general rule, not the host exception: a native `<input type="radio">` inside the item's own shadow root | per-item `FieldAssociationController` | same-root labelling, anchored to the inner input (matches text-like fields) | verify `aria-checked` and per-item labelling manually |

---

## 5. Migration path

Contributors migrating a form field follow the washing machine workflow with these additions:

- **Phase 3 (API):** wire form participation and name the API from the [naming table](#4-naming-table). See [Washing machine workflow, Phase 3](../02_workstreams/02_2nd-gen-component-migration/02_step-by-step/01_washing-machine-workflow.md#phase-3-api-migration).
- **Phase 4 (accessibility):** wire label, help text, and errors per [§3.3](#33-idref-strategy-label-help-text-and-errors), and satisfy the axe policy in [§3.4](#34-axe-core-policy). See [Washing machine workflow, Phase 4](../02_workstreams/02_2nd-gen-component-migration/02_step-by-step/01_washing-machine-workflow.md#phase-4-accessibility).

---

## 6. Open questions

These are active research spikes; their outcomes finalize the *pending research* rows in the [naming table](#4-naming-table):

- **Button activation:** whether a dedicated `ButtonAssociationController` is needed for button-like fields (clear button, a future submit button), or whether a native inner `<button>` already covers keyboard activation, role, and focusability.
- **Grouped selection:** whether a dedicated `RadioGroupController` is needed for radio group (composing `SelectionController`, `FocusgroupNavigationController`, and `SlotAttributePropagationController`), or whether those primitives are composed inline.
- **Label slot rule:** confirming the primary-vs-supplementary rule for default slot vs named `slot="label"` holds across all migrated components, and how it relates to the `accessible-label` attribute used for no-visible-label cases.
- **`accessible-labelledby` / `accessible-describedby` and `LabellingController`:** the cross-root name and description mappings are part of the in-flight text field epic and not yet in the codebase; the exact API and whether the controller wiring lands separately from the attributes is still under discussion.

---

## Appendix A: PoC findings

The form-strategy proof-of-concept documents the controllers and the axe policy this proposal is based on:

- Repository: [web-component-form-strategy-demos](https://github.com/nikkimk/web-component-form-strategy-demos).
- Controllers: `FieldAssociationController`, `LabellingController`, `ButtonAssociationController`, `RadioGroupController` (composing `SelectionController`, `FocusgroupNavigationController`, `SlotAttributePropagationController`).
- axe-core policy and `ElementInternals` gaps: see the repository's [axe-core policy section](https://github.com/nikkimk/web-component-form-strategy-demos/tree/main#axe-core-policy-and-elementinternals).

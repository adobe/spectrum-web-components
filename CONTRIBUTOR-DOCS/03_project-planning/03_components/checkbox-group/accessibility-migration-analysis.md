<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../../README.md) / [Project planning](../../README.md) / [Components](../README.md) / Checkbox Group / Checkbox group accessibility migration analysis

<!-- Document title (editable) -->

# Checkbox group accessibility migration analysis

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
    - [First-gen (`sp-field-group`) grouping model](#first-gen-sp-field-group-grouping-model)
    - [Guidelines that apply](#guidelines-that-apply)
- [Related 1st-gen accessibility (Jira)](#related-1st-gen-accessibility-jira)
- [Recommendations: `<swc-checkbox-group>`](#recommendations-swc-checkbox-group)
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

This doc tells you how **`swc-checkbox-group`** should work for **accessibility**, targeting **WCAG 2.2 Level AA**. A checkbox group organizes related [`swc-checkbox`](../checkbox/accessibility-migration-analysis.md) items into a single field: it supplies a shared visible label, an optional group description, an optional error message, and group-wide state (required, invalid, read-only, disabled) across a multi-select set.

The important thing to hold onto, and the reason this doc reads differently from [radio group](../radio-group/accessibility-migration-analysis.md), is that **the group coordinates presentation and validation, not value**. Each `swc-checkbox` is independently form-associated and submits its own `name`/`value` (see the [checkbox doc](../checkbox/accessibility-migration-analysis.md#aria-roles-states-and-properties)); the group does not own a single selected value the way a radio group does, and it has **no roving tabindex or arrow-key navigation**, because every checkbox stays its own Tab stop. So the group's accessibility responsibilities are: a fixed `role="group"`, a group accessible name, group-level `required`/`invalid`/`read-only` semantics, a description/error-message association, and a disabled cascade to its items.

**Open question, tracked separately:** there is no dedicated 1st-gen `CheckboxGroup` class. 1st-gen groups `sp-checkbox` elements with the generic `sp-field-group` (`role="group"`). Whether the 2nd-gen group ships as a purpose-built `swc-checkbox-group`, as a migrated general-purpose `swc-field-group`, or stays deferred is the [SWC-2548](https://jira.corp.adobe.com/browse/SWC-2548) research spike, attached to the Checkbox epic ([SWC-2340](https://jira.corp.adobe.com/browse/SWC-2340)). This doc uses `swc-checkbox-group` as a working name and states the accessibility responsibilities the shipped component must satisfy regardless of that outcome; the tag may change.

### Also read

- [Checkbox accessibility migration analysis](../checkbox/accessibility-migration-analysis.md) for the individual multi-select item this component coordinates.
- [Checkbox migration roadmap](../checkbox/rendering-and-styling-migration-analysis.md) for layout, CSS, and DOM.
- [Radio group accessibility migration analysis](../radio-group/accessibility-migration-analysis.md), the single-select container, for the contrast in how value, validation, and keyboard focus are owned.
- [Forms Strategy: 2nd-Gen Proposal](../../05_strategies/forms-strategy-rfc.md), specifically [§3.2](../../05_strategies/forms-strategy-rfc.md#32-where-aria-roles-live) on where the ARIA role lives and [§3.3](../../05_strategies/forms-strategy-rfc.md#33-idref-strategy-label-help-text-and-errors) on label, help text, and error wiring.

### What it is

- The container for two or more related, independently selectable `swc-checkbox` items. It owns the group's visible label, description, and error message, and the group-wide state (required, invalid, read-only, disabled). It does **not** enforce mutual exclusion (any number of items may be checked, including none or all).
- Sets `role="group"` on its own host via `ElementInternals` (`internals.role = 'group'`), using the forms strategy RFC's host-role exception (see [§3.2](../../05_strategies/forms-strategy-rfc.md#32-where-aria-roles-live)): the group has no native container element to render, so the role goes on the host instead. This is the same host-role placement `swc-radio-group` uses, but with `group` rather than `radiogroup`.

### When to use something else

- Exactly one option must be chosen from a mutually exclusive set: use [radio group](../radio-group/accessibility-migration-analysis.md), which owns a single value and uses `role="radiogroup"` with roving tabindex.
- A single, standalone on/off or consent choice: use a lone [`swc-checkbox`](../checkbox/accessibility-migration-analysis.md) with its own label; you do not need a group to make one checkbox valid.
- A large or dynamic option set where showing every choice is impractical: use a picker or combobox. A checkbox group exists so every option stays visible for direct selection.

### What it is not

- Not a radio group. It never enforces "only one selected", never owns a single value, and never uses roving tabindex. Keeping the two patterns distinct in the accessibility tree (`group` versus `radiogroup`, per-item versus group-owned value) is the point.
- Not a generic layout wrapper. Even though 1st-gen reuses the generic `sp-field-group` (whose `role="group"` is author-overridable via an `if (!hasAttribute('role'))` guard), the 2nd-gen checkbox grouping must expose a **fixed** `group` role and real group-level semantics (name, required, invalid, read-only), not just visual spacing.

### Related

- [`swc-checkbox`](../checkbox/accessibility-migration-analysis.md), the item this component coordinates; each item carries its own form value, so the group carries none.
- [`swc-radio-group`](../radio-group/accessibility-migration-analysis.md), the single-select sibling. Several controller pieces this doc relies on (`LabellingController`, `SlotAttributePropagationController`, `FieldAssociationController`) are shared with the radio group and text field; the pieces the radio group needs but the checkbox group does **not** (a cache-authoritative selection controller, `FocusgroupNavigationController`) are called out below.
- `swc-field-group`, the generic grouping component whose 2nd-gen scoping relative to this component is the [SWC-2548](https://jira.corp.adobe.com/browse/SWC-2548) spike.

---

## ARIA and WCAG context

### Pattern in the APG

- The [Checkbox pattern](https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/) covers the items; a set of related checkboxes is wrapped in a container with `role="group"` and an accessible name (the group label), so assistive technology announces the shared context when a user enters the set. Unlike the [Radio Group pattern](https://www.w3.org/WAI/ARIA/apg/patterns/radio/), the checkbox pattern defines **no** container-level keyboard model: there is no roving tabindex and no arrow-key movement across a checkbox group. Each checkbox is reached with <kbd>Tab</kbd> and toggled with <kbd>Space</kbd> on its own.
- The group is where a shared label, a description, and a group-level error ("select at least one") are associated, because those describe the set rather than any one item.

### First-gen (`sp-field-group`) grouping model

1st-gen has no `CheckboxGroup` class; related checkboxes are grouped with the generic `sp-field-group`, whose behavior is confirmed directly against its source:

```55:80:1st-gen/packages/field-group/src/FieldGroup.ts
  protected override render(): TemplateResult {
    return html`
      <div class="group" role="presentation">
        <slot @slotchange=${this.handleSlotchange}></slot>
      </div>
      ${this.renderHelpText(this.invalid)}
    `;
  }

  protected override firstUpdated(changes: PropertyValues): void {
    super.firstUpdated(changes);
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'group');
    }
  }
```

- **`role="group"` is set on the host, but author-overridable**: the `if (!this.hasAttribute('role'))` guard means any author-supplied `role` wins. 2nd-gen should make the role fixed and non-overridable via `ElementInternals`.
- **The accessible name comes from a `label` string written to `aria-label`** in `updated()`. This plain-string mechanism already resolves correctly (it does not cross a shadow boundary), but it is the only naming path 1st-gen offers, and there is an open report that the visible group label is missing from the checkbox anatomy ([SWC-1182](https://jira.corp.adobe.com/browse/SWC-1182)) and that a group of checkboxes is not associated with its group label ([SWC-1188](https://jira.corp.adobe.com/browse/SWC-1188)).
- **`invalid` only switches which help-text slot renders** (`negative-help-text` versus `help-text`), through the shared `ManageHelpText` mixin in `"external"` mode; it never sets `aria-invalid` on the host. This is the same [WCAG 3.3.1](https://www.w3.org/WAI/WCAG22/Understanding/error-identification.html) gap the radio group documents, and there is a matching fixed 1st-gen report that the input error was not described in text ([SWC-1154](https://jira.corp.adobe.com/browse/SWC-1154)).
- **There is no `required`/`aria-required` and no group-level form association at all.** `sp-field-group` is presentational plus help text; the "select at least one" constraint is not implemented.
- **The help-text container uses `aria-live="assertive"` unconditionally** (via `ManageHelpText`/`HelpTextManager`), the same over-assertive default the radio group flags.

**2nd-gen note:** the movement mechanics that dominate the radio group (`FocusgroupNavigationController`, roving tabindex, a cache-authoritative selection controller for mutual exclusion) are **not needed here**, because a checkbox group has no roving focus and no single value. What carries over is the label/description/error wiring (`LabellingController`), the disabled cascade (`SlotAttributePropagationController`), and group-level validity, plus fixing the three 1st-gen gaps above (overridable role, missing `aria-invalid`/`aria-required`, assertive live region).

### Guidelines that apply

| Idea | Plain meaning |
| --- | --- |
| [Checkbox pattern (APG)](https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/) | Related checkboxes sit inside a named `role="group"`; each item is an independent Tab stop toggled with <kbd>Space</kbd>; no roving tabindex or arrow navigation at the group level. |
| [Labels or instructions (WCAG 3.3.2)](https://www.w3.org/WAI/WCAG22/Understanding/labels-or-instructions.html) | The group as a whole needs a visible, programmatically associated label, not just labels on the individual checkboxes. 1st-gen tracks a missing visible group label ([SWC-1182](https://jira.corp.adobe.com/browse/SWC-1182)); verify every 2nd-gen anatomy and Storybook example supplies one. |
| [Info and relationships (WCAG 1.3.1)](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html) | The grouping, the label, the description, and the error message must all be programmatic (role containment plus `aria-describedby`/`aria-errormessage`), not conveyed by layout alone. 1st-gen tracks a group not associated with its label ([SWC-1188](https://jira.corp.adobe.com/browse/SWC-1188)). |
| [Error identification (WCAG 3.3.1)](https://www.w3.org/WAI/WCAG22/Understanding/error-identification.html) | When the group is invalid (for example a required group with nothing selected), that state must be exposed via `aria-invalid` on the group host, not only through visible error styling. 1st-gen never sets this; it is a real gap to fix ([SWC-1154](https://jira.corp.adobe.com/browse/SWC-1154)). |
| [Use of color (WCAG 1.4.1)](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html) | The invalid affordance must not rely on color alone; the associated error message text carries the meaning ([SWC-1169](https://jira.corp.adobe.com/browse/SWC-1169)). |
| [Keyboard (WCAG 2.1.1)](https://www.w3.org/TR/WCAG22/#keyboard) | Reaching and toggling every checkbox, and discovering read-only/disabled state, must work without a pointer. |
| [Focus visible (WCAG 2.4.7)](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html) | Each checkbox's focus indicator must stay visible and distinct as focus moves through the set. |
| [Status messages (WCAG 4.1.3)](https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html) | An error that appears without a focus change needs a path to a screen reader, but that does not justify defaulting the help/error container to `aria-live="assertive"`. |

**Bottom line:** the checkbox group is a coordinator, not a value owner. Give it a fixed `role="group"`, a real group accessible name, group-level `required`/`invalid`/`read-only` semantics wired to the host, a description/error-message association, and a disabled cascade to its items, while leaving value submission on each `swc-checkbox`. Fix the three 1st-gen gaps: an overridable role, `aria-invalid`/`aria-required` never set, and an unconditionally assertive help-text live region.

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

## Recommendations: `<swc-checkbox-group>`

Component tag may change until API freeze, and its very existence as a distinct component is pending [SWC-2548](https://jira.corp.adobe.com/browse/SWC-2548).

### ARIA roles, states, and properties

| Topic | What to do |
| --- | --- |
| **Host role** | `role="group"`, set via `ElementInternals` (`internals.role = 'group'`), fixed and never author-overridable. This uses the host-role exception from the forms strategy RFC's [§3.2](../../05_strategies/forms-strategy-rfc.md#32-where-aria-roles-live) (a container role with no native element), the same placement `swc-radio-group` uses for `radiogroup`. Do not carry forward 1st-gen `sp-field-group`'s author-overridable `if (!hasAttribute('role'))` guard. |
| **Accessible name** | In precedence order: `accessible-labelledby` (composing a name from elements the group does not own) > `accessible-label` (no visible label) > a visible label rendered inside the group's own shadow root (the common case, matching the Figma top-label and side-label positions). Wired by the **`LabellingController`** ([SWC-2466](https://jira.corp.adobe.com/browse/SWC-2466), *pending research*). Because the role lives on the host, the controller resolves all three sources against the host's own `ElementInternals` (`internals.ariaLabel`, `internals.ariaLabelledByElements`), the "attach to host" mode also used by `swc-radio-group` (see the [radio group doc](../radio-group/accessibility-migration-analysis.md#shadow-dom-and-cross-root-aria-issues)). 1st-gen's `label`-to-`aria-label` path already works across the shadow boundary, so this is a wiring-location change, not a bug fix; it does address the missing-group-label reports ([SWC-1182](https://jira.corp.adobe.com/browse/SWC-1182), [SWC-1188](https://jira.corp.adobe.com/browse/SWC-1188)). |
| **`aria-required` (add, real 1st-gen gap)** | Set via `ElementInternals` (`internals.ariaRequired`) when the group's `required` (React Spectrum: `isRequired`) is `true`. For a checkbox group, "required" means **select at least one**, a group-level constraint the 1st-gen `sp-field-group` does not implement at all. This is distinct from a per-item `required` on an individual `swc-checkbox` (a specific box that must be checked, such as a single consent box); both can exist, at different levels. |
| **`aria-invalid` (add, real 1st-gen gap)** | 1st-gen `sp-field-group` uses `invalid` only to switch which help-text slot renders and to drive `:invalid`-style CSS; it never sets `aria-invalid` on the host (confirmed in `FieldGroup.ts`). Set `internals.ariaInvalid` alongside the error-message wiring so a screen reader gets the invalid **state**, not just the error text. Do not carry the omission forward. |
| **`aria-readonly` (add at the group)** | `aria-readonly` is valid on `role="group"` per the [WAI-ARIA global states table](https://www.w3.org/TR/wai-aria-1.2/#global_states). Implement React Spectrum's `isReadOnly` here and propagate a read-only affordance to each item; when read-only, every checkbox stays focusable but its <kbd>Space</kbd> toggle is suppressed (read-only blocks the change, not the focus). See the [checkbox doc's read-only note](../checkbox/accessibility-migration-analysis.md#aria-roles-states-and-properties) for the item-level behavior and the 1st-gen disable-hack this replaces. |
| **Description, help text, error message** | Render inside `swc-checkbox-group`'s own shadow root via the `LabellingController` ([SWC-2466](https://jira.corp.adobe.com/browse/SWC-2466), *pending research*), matching the group description and error-message rows in the reviewed Figma files. Associate via `aria-describedby` (description/help text) and `aria-errormessage` (error message, only while `invalid`, in addition to `aria-describedby` for broader AT support), both set on the host via `ElementInternals`. |
| **Live region (fix, do not carry forward)** | 1st-gen's shared `ManageHelpText`/`HelpTextManager` renders the help-text container with `aria-live="assertive"` unconditionally. Do not default to `assertive`, or to any live region, for the common case: the description/error text is already reachable via `aria-describedby`/`aria-errormessage`, so a screen reader announces it when focus is within the group. If a genuine focus-elsewhere validation case is found later, use `aria-live="polite"`, never `assertive`. |
| **Form value stays on the items (the key difference from radio group)** | The group does **not** call `setFormValue` and owns **no** single value. Because a checkbox group is multi-select, each `swc-checkbox` is independently form-associated and submits its own `name`/`value` (see the [checkbox doc](../checkbox/accessibility-migration-analysis.md#aria-roles-states-and-properties)). There is no cache-authoritative selection controller and no mutual exclusion here, unlike `swc-radio-group`. React Spectrum's group `name` and `value[]`/`onChange` are a convenience view over the items' individual values, not a group-owned form value. |
| **Group-level validity, without a group value** | Group-level constraints ("select at least one", a custom `validate`) still need somewhere to run. Recommended: the group carries its own `ElementInternals` for **constraint validity only** (`setValidity`/`checkValidity`/`reportValidity`, `:invalid`/`:user-invalid` matching), driven by inspecting its items' checked states, while still calling **no** `setFormValue`. This is a real divergence from the radio group's single `FieldAssociationController` (which does both value and validity); confirm the exact split (group validity + per-item value) in the migration plan ([SWC-2342](https://jira.corp.adobe.com/browse/SWC-2342)) and the [SWC-2548](https://jira.corp.adobe.com/browse/SWC-2548) spike. |
| **Disabled cascade** | Propagate the group's `disabled` onto every slotted checkbox using the already-implemented [`SlotAttributePropagationController`](../../../../2nd-gen/packages/core/controllers/slot-attribute-propagation-controller/slot-attribute-propagation-controller.mdx), the same approach `swc-radio-group` uses; the group has no native fieldset-like disabling mechanism of its own. Each disabled checkbox then removes itself from the tab order natively. |
| **Visual-only group props** | `emphasized`, `size` (`s`/`m`/`l`/`xl`), `labelPosition` (top/side), `labelAlign`, and `orientation` (vertical default, horizontal) affect presentation and are propagated to items for consistent sizing/emphasis, but must not change the accessibility tree shape. |

### Shadow DOM and cross-root ARIA Issues

The `LabellingController` ([SWC-2466](https://jira.corp.adobe.com/browse/SWC-2466), *pending research*) attaches the group's label, description, and error message directly to `swc-checkbox-group`'s own host via `ElementInternals` (`internals.ariaLabel`, `internals.ariaLabelledByElements`, `internals.ariaDescribedByElements`), because `role="group"` lives on the host rather than an inner control. This is the same "attach to host" mode `swc-radio-group` needs (see the [radio group doc](../radio-group/accessibility-migration-analysis.md#shadow-dom-and-cross-root-aria-issues)), and different from `swc-checkbox`/`swc-text-field`, where the controller wires the equivalent properties onto an inner role-bearing input instead.

1st-gen's field-group help-text association does not have a cross-root problem to fix: `ManageHelpText` in `"external"` mode sets `aria-describedby` on the group's own host pointing at the `id` of the *slotted* (light-DOM) help-text element, so both ends live in the same tree. When re-implementing via `LabellingController`, preserve that correctness property; do not introduce a cross-root break by moving the description into the group's own shadow root without the equivalent host-attached element-reference wiring.

A "missing accessible name" dev-warning is not blocked by the host-role pattern: the accessible-name inputs (`accessible-label`/`accessible-labelledby`) are ordinary host-level `@property` fields, so the shared `warnIf` helper can run from the host's own lifecycle, exactly as existing host-role components already do (the [radio group doc](../radio-group/accessibility-migration-analysis.md#shadow-dom-and-cross-root-aria-issues) cites `Button.base.ts` and `Tabs.base.ts` for the same point).

### Accessibility tree expectations

- **Labeled, some items checked, valid:** role `group`, name from whichever of `accessible-labelledby`/`accessible-label`/visible label is set; each child checkbox exposes its own `aria-checked` independently (any mix of `true`/`false`/`mixed`); `aria-describedby` present only if a description is slotted.
- **Required, nothing selected yet:** `aria-required="true"` on the group; no child is forced checked (multi-select "at least one" is a group constraint, not a per-item default).
- **Invalid:** `aria-invalid="true"` on the group host (the 1st-gen gap this doc adds); error-message text both visible and reachable via `aria-describedby`/`aria-errormessage`.
- **Read-only:** every item stays focusable and reachable via Tab; `aria-readonly="true"` on the group; no <kbd>Space</kbd> toggle changes any item.
- **Disabled (group-level):** `disabled` propagates to every child checkbox; the group has no Tab stop once every item is unreachable.
- **Layout-only variation:** top-label versus side-label, and vertical versus horizontal orientation (per the reviewed Figma files), change visual layout only; they must not change the accessibility tree shape.

### Keyboard and focus

The checkbox group has **no group-level keyboard model**: no roving tabindex, no arrow-key navigation, and no `FocusgroupNavigationController` (contrast the [radio group](../radio-group/accessibility-migration-analysis.md#keyboard-and-focus)).

| Key | Behavior |
| --- | --- |
| <kbd>Tab</kbd> / <kbd>Shift</kbd> + <kbd>Tab</kbd> | Move focus to and from **each** checkbox in turn; every enabled checkbox is its own Tab stop (the group is not a single stop). |
| <kbd>Space</kbd> | Toggles the currently focused checkbox, supplied natively by that item's inner `<input type="checkbox">`. |
| N/A (disabled items) | A disabled checkbox is skipped by Tab because its inner input is natively disabled. |

When the group is read-only, keep all focus/Tab behavior above and suppress only the <kbd>Space</kbd> toggle on each item.

---

## Testing

### Automated tests

| Kind of test | What to check |
| --- | --- |
| **Unit** | `role="group"` is fixed on the host and not author-overridable; `aria-invalid`, `aria-required`, and `aria-readonly` on the host track their respective properties; `disabled` propagates to every slotted checkbox; the group calls **no** `setFormValue` (each checkbox submits its own value); group-level validity ("select at least one") reports invalid when required and nothing is checked, and clears when an item is checked. |
| **aXe + Storybook** | A dev-warning story for a group with no accessible name. A required-and-untouched story. An invalid story with a visible, `aria-describedby`/`aria-errormessage`-associated error message. Read-only and disabled stories. Top-label, side-label, vertical, and horizontal layout stories (layout only; same tree shape). Document any roleless-child axe false positives per the forms RFC [§3.4](../../05_strategies/forms-strategy-rfc.md#34-axe-core-policy). |
| **Playwright ARIA snapshots** | `role=group` with the correct accessible name and the correct independent `aria-checked` on each child, across required/invalid/read-only/disabled states and both label positions and orientations from the design spec's state matrix. |
| **Playwright keyboard** | Each checkbox is an independent Tab stop (no roving, no arrow navigation); <kbd>Space</kbd> toggles the focused item; disabled items are skipped; read-only keeps focus movement but blocks every toggle. |
| **Contrast / focus** | Each item's focus indicator remains visible and distinct as focus moves through the set, across sizes and styles. |

---

## Summary checklist

- [ ] `role="group"` is set via `ElementInternals` on the host, fixed and never author-overridable (not 1st-gen `sp-field-group`'s overridable guard).
- [ ] Accessible name precedence (`accessible-labelledby` > `accessible-label` > visible label) resolves through the host's own `ElementInternals`, addressing the missing-group-label reports.
- [ ] `aria-required` reflects the group's `required`/`isRequired` ("select at least one"), a group-level constraint 1st-gen never implemented.
- [ ] `aria-invalid` is set on the group host when invalid, a real 1st-gen gap, paired with an associated error message and not signaled by color alone.
- [ ] `aria-readonly` is implemented at the group and suppresses each item's toggle while keeping items focusable.
- [ ] Description/help text and error message render inside the group's own shadow root and associate via host-attached `aria-describedby`/`aria-errormessage`, preserving 1st-gen's already-correct light-DOM-slot association (no cross-root regression).
- [ ] The help/error container does not default to `aria-live="assertive"`, or to any live region, for the common case.
- [ ] The group owns **no** form value and calls **no** `setFormValue`; each `swc-checkbox` submits its own `name`/`value` (the reverse of radio group).
- [ ] There is no cache-authoritative selection controller, no mutual exclusion, and no `FocusgroupNavigationController`; each checkbox is an independent Tab stop with no arrow-key navigation.
- [ ] Group-level validity ("select at least one", custom `validate`) runs on the group via its own `ElementInternals` for validity only, with the group-validity-plus-per-item-value split confirmed in the migration plan and the `swc-field-group` scoping spike.
- [ ] `disabled` propagates to every slotted checkbox via `SlotAttributePropagationController`.
- [ ] Top/side label, and vertical/horizontal orientation, change visual presentation only, never the accessibility tree shape.

## References

- [Forms Strategy: 2nd-Gen Proposal (this repo)](../../05_strategies/forms-strategy-rfc.md), specifically [§3.2 Where ARIA roles live](../../05_strategies/forms-strategy-rfc.md#32-where-aria-roles-live), [§3.3 IDREF strategy](../../05_strategies/forms-strategy-rfc.md#33-idref-strategy-label-help-text-and-errors), [§3.4 axe-core policy](../../05_strategies/forms-strategy-rfc.md#34-axe-core-policy), and the [naming table](../../05_strategies/forms-strategy-rfc.md#4-naming-table).
- [WAI-ARIA APG: Checkbox pattern](https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/)
- [WAI-ARIA](https://www.w3.org/TR/wai-aria-1.2/), [WCAG 2.2](https://www.w3.org/TR/WCAG22/), [APG: read me first](https://www.w3.org/WAI/ARIA/apg/practices/read-me-first/)
- [React Spectrum: CheckboxGroup](https://react-spectrum.adobe.com/CheckboxGroup) and [Checkbox](https://react-spectrum.adobe.com/Checkbox)
- [`SlotAttributePropagationController` (this repo)](../../../../2nd-gen/packages/core/controllers/slot-attribute-propagation-controller/slot-attribute-propagation-controller.mdx)
- 1st-gen: [`sp-field-group`](../../../../1st-gen/packages/field-group/README.md), [`sp-checkbox`](../../../../1st-gen/packages/checkbox/README.md), [`sp-help-text`](../../../../1st-gen/packages/help-text/README.md)
- [Checkbox accessibility migration analysis (this repo)](../checkbox/accessibility-migration-analysis.md)
- [Radio group accessibility migration analysis (this repo)](../radio-group/accessibility-migration-analysis.md), the single-select sibling for contrast
- Jira: [SWC-2340](https://jira.corp.adobe.com/browse/SWC-2340) (epic), [SWC-2341](https://jira.corp.adobe.com/browse/SWC-2341) (a11y research ticket), [SWC-2342](https://jira.corp.adobe.com/browse/SWC-2342) (migration plan), [SWC-2548](https://jira.corp.adobe.com/browse/SWC-2548) (`swc-field-group` scoping spike), [SWC-2466](https://jira.corp.adobe.com/browse/SWC-2466) (`LabellingController`), [SWC-2467](https://jira.corp.adobe.com/browse/SWC-2467) (`FieldAssociationController`), [SWC-1888](https://jira.corp.adobe.com/browse/SWC-1888) (RFC: form field strategy for 2nd-gen migration)

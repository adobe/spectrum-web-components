<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../../README.md) / [Project planning](../../README.md) / [Components](../README.md) / Radio / Radio accessibility migration analysis

<!-- Document title (editable) -->

# Radio accessibility migration analysis

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
- [Recommendations: `<swc-radio>`](#recommendations-swc-radio)
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

This doc tells you how **`swc-radio`** should work for **accessibility**, targeting **WCAG 2.2 Level AA**. `swc-radio` is the 2nd-gen replacement for 1st-gen `sp-radio`: one option within a mutually exclusive set. A `swc-radio` is almost always used inside [`swc-radio-group`](../radio-group/accessibility-migration-analysis.md), which owns sibling discovery, mutual exclusion, and keyboard navigation across the set. This doc covers the individual radio item; the group's ARIA, roving-tabindex, and form-participation model live in the radio group doc, since several of the item's behaviors (whether it is checked, whether Tab reaches it) are driven by the group rather than decided locally.

### Also read

- [Radio migration roadmap](./rendering-and-styling-migration-analysis.md) for layout, CSS, and DOM.
- [Radio group accessibility migration analysis](../radio-group/accessibility-migration-analysis.md) for the group that coordinates selection, keyboard navigation, and form participation across a set of radios.
- [Forms Strategy: 2nd-Gen Proposal](../../05_strategies/forms-strategy-rfc.md), whose "grouped selection" row in the naming table this doc and the radio group doc both follow.

### What it is

- One option in a mutually exclusive set. The element itself remains independently focusable and checkable when it is not slotted into a group: 1st-gen `sp-radio` defaults its own `tabIndex` to `0` and answers `Space` on its own when no `sp-radio-group` is coordinating it, and `swc-radio` should keep that standalone behavior rather than requiring a group wrapper just to be operable.
- Sets `role="radio"` on its own host via `ElementInternals` (`internals.role = 'radio'`), not on an inner shadow element. This is the host-role exception the forms strategy RFC carves out for radio-like controls: a radio carries no live value that needs to stay attached to a separate control node the way a textbox's value does, so role and focusability can safely share the one host element (see [ARIA and WCAG context](#aria-and-wcag-context) and the RFC's [§3.2](../../05_strategies/forms-strategy-rfc.md#32-where-aria-roles-live)).

### When to use something else

- More than one option can be true at once: use a checkbox group, not radio. An APG radio group always has exactly one, or zero, checked items.
- A large or dynamic list of mutually exclusive options that doesn't fit the available space: use a picker or combobox instead. Radio (and radio group) exists specifically so every option stays visible at once for direct comparison.

### What it is not

- Not a toggle switch. A single `swc-radio` never stands alone to represent an independent on/off setting; it only makes sense as one of at least two mutually exclusive options inside a group.

### Related

- [`swc-radio-group`](../radio-group/accessibility-migration-analysis.md), the coordinating parent for any set of two or more radios.
- Checkbox is the multi-select sibling pattern (not yet migrated to 2nd-gen as of this doc; see the [checkbox migration roadmap](../checkbox/rendering-and-styling-migration-analysis.md)).

---

## ARIA and WCAG context

### Pattern in the APG

- The [Radio Group pattern](https://www.w3.org/WAI/ARIA/apg/patterns/radio/) is the normative reference for the whole widget: a `radiogroup` containing two or more `radio` elements, exactly one of which is checked. This doc covers the `radio` half; the `radiogroup` half (the container, sibling discovery, roving tabindex) is documented in [Radio group accessibility migration analysis](../radio-group/accessibility-migration-analysis.md#aria-and-wcag-context).
- APG's radio examples assume a native `<input type="radio">` per item, where the browser supplies role, `checked` state, and grouping via a shared `name` attribute. `swc-radio` has no native radio input anywhere in its tree; it has to reproduce the role, `aria-checked`, and grouping behavior itself. That is exactly the host-role exception the forms strategy RFC documents for radio-like controls, not a deviation from it.

### Guidelines that apply

| Idea | Plain meaning |
| --- | --- |
| [Name, role, value (WCAG 4.1.2)](https://www.w3.org/TR/WCAG22/#name-role-value) | Each radio needs role `radio`, an accessible name from its label, and `aria-checked` that tracks the real selection state. |
| [Info and relationships (WCAG 1.3.1)](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html) | The relationship between a radio and its group, and the fact that it is mutually exclusive with its siblings, must be programmatic, not just visual proximity. `radiogroup` containment supplies this; styling alone does not. |
| [Keyboard (WCAG 2.1.1)](https://www.w3.org/TR/WCAG22/#keyboard) | Selecting, moving between, and (when standalone) activating a radio must all work without a pointer. |
| [Focus visible (WCAG 2.4.7)](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html) | The focus indicator on the currently focused radio must stay visible and distinct, since only one radio in the group has a Tab stop at a time (roving tabindex). |
| [Non-text contrast (WCAG 1.4.11)](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html) | The radio button's visual indicator (ring and dot) needs 3:1 contrast against its background in both the checked and unchecked states. |
| [Target size minimum (WCAG 2.5.8)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html) | The clickable or tappable area for a radio (button plus label, per the Figma anatomy) should meet minimum target size across the `s`/`m`/`l`/`xl` sizes. |

**Bottom line:** almost everything here reduces to one fact: `swc-radio` has no native input to lean on, so `swc-radio` itself is responsible for role, name, and `aria-checked`, and getting those right on its own host (via `ElementInternals`) is essentially the entire accessibility surface of the individual item. The group is responsible for making sure only one item is ever checked and for moving focus between them.

---

## Related 1st-gen accessibility (Jira)

| Jira | Type | Status (snapshot) | Resolution (snapshot) | Summary |
| --- | --- | --- | --- | --- |
| [SWC-285](https://jira.corp.adobe.com/browse/SWC-285) | Story | To Do | Unresolved | Remove deprecated support for `aria-invalid` state on the Radio component |
| [SWC-772](https://jira.corp.adobe.com/browse/SWC-772) | Story | Done | Fixed | RFC: form element patterns |
| [SWC-645](https://jira.corp.adobe.com/browse/SWC-645) | Epic | In Progress | Unresolved | Improve accessibility of form/field components |
| [SWC-401](https://jira.corp.adobe.com/browse/SWC-401) | Story | Done | Fixed | docs(radio): documentation audit |
| [SWC-320](https://jira.corp.adobe.com/browse/SWC-320) | Story | Done | Deferred | Improve form association for input elements |
| [SWC-196](https://jira.corp.adobe.com/browse/SWC-196) | Epic | Done | Duplicate | Loosening the API for form input elements |
| [SWC-48](https://jira.corp.adobe.com/browse/SWC-48) | Epic | Done | Deferred | RFC: recommendations for form-associated custom elements (`ElementInternals`) |

---

## Recommendations: `<swc-radio>`

Component tag may change until API freeze.

### ARIA roles, states, and properties

| Topic | What to do |
| --- | --- |
| **Host role** | `role="radio"`, set via `ElementInternals` (`internals.role = 'radio'`), fixed and never author-overridable. This is the single host-role exception in the forms strategy RFC's [naming table](../../05_strategies/forms-strategy-rfc.md#4-naming-table): unlike `swc-text-field`, there is no inner shadow control to carry the role instead. |
| **`aria-checked`** | Set to `"true"`/`"false"` on the host, mirroring the `checked` (or `selected`) state; write it whenever that state changes, the same way 1st-gen `sp-radio` does in `updated()`. Radio's `aria-checked` only ever takes `true`/`false`, never `"mixed"` (unlike checkbox's tri-state support). |
| **Accessible name** | In precedence order: (1) **`accessible-labelledby`**, for the rare case a radio's name is composed from elements it doesn't own; (2) **`accessible-label`**, for a radio with no visible text label of its own (for example, an icon-only swatch-style radio, if that variant is ever added); (3) the **slotted default-content text**, the normal case for a radio, since the label is the radio's primary and only expected content, not supplementary to something else. Because `role="radio"` lives on the host rather than an inner shadow control, all three sources resolve directly against the host's own `ElementInternals` (`internals.ariaLabel`, `internals.ariaLabelledByElements`), not against an inner `<label for>` pairing the way `swc-text-field` does — see [Shadow DOM and cross-root ARIA Issues](#shadow-dom-and-cross-root-aria-issues). |
| **Per-item description (open scope question)** | [React Spectrum's `Radio`](https://react-spectrum.adobe.com/RadioGroup) accepts an optional per-radio `description` (used for enriched option text, for example "Delivers in 5–7 business days" under a shipping-method label). 1st-gen `sp-radio` has no equivalent, and the reviewed Figma files show only a group-level description and error message, matching 1st-gen's `sp-radio-group` help-text slots rather than a per-radio one. Whether `swc-radio` adds a per-radio `description` in this migration wave, or defers it, is an open API-scope question for the migration plan (SWC-2350) and Phase 3 (API), not decided here. If it is added, it needs the same host-attached `aria-describedby`/element-reference wiring called out for the accessible name above, since there is no inner shadow control to attach a same-root `aria-describedby` to. |
| **`aria-disabled` and tab reachability** | Custom elements have no native `disabled` IDL behavior, so `swc-radio` must explicitly both set `aria-disabled="true"` (via `ElementInternals`) and remove itself from the tab sequence when `disabled`. When standalone, that means not setting a Tab stop at all; when inside `swc-radio-group`, it means being excluded from the group's roving-tabindex sequence (`skipDisabled: true` on `FocusgroupNavigationController` — see the [radio group doc](../radio-group/accessibility-migration-analysis.md#keyboard-and-focus)). |
| **`readonly` (relocate to the group)** | 1st-gen `sp-radio` carries its own `readonly` property, but it is not actually enforced: `click()`/`activate()` only check `this.disabled`, never `this.readonly`, and the one existing test for it only confirms an *already-checked* readonly radio stays checked when clicked, not that selecting a *different* radio is blocked. [React Spectrum](https://react-spectrum.adobe.com/RadioGroup) places `isReadOnly` on `RadioGroup`, not `Radio`, which is the correct level: read-only-ness is a property of the whole mutually exclusive set, not of one item. Do not carry a per-radio `readonly` property into `swc-radio`; implement it once, correctly, on `swc-radio-group` (see the [radio group doc](../radio-group/accessibility-migration-analysis.md#aria-roles-states-and-properties)). |
| **`aria-invalid` (remove, do not carry forward)** | 1st-gen `sp-radio` sets `aria-invalid="true"` on itself when its own `invalid` property is `true` ([SWC-285](https://jira.corp.adobe.com/browse/SWC-285) tracks removing this). Invalid/error state describes the *selection as a whole* ("you must pick one of these"), not one item in isolation, and React Spectrum's `isInvalid` lives on `RadioGroup`. Do not add an `invalid` property or `aria-invalid` handling to `swc-radio`; keep that state entirely on `swc-radio-group`. |
| **`value` — a plain attribute, not ARIA** | `value` identifies which option this radio represents within its group's shared `name`; it is a content attribute the group reads and the form submits, not an accessibility property. Do not confuse it with the radio's accessible name, which always comes from the label sources above. |
| **Form association** | Use a **`FieldAssociationController`** ([SWC-2467](https://jira.corp.adobe.com/browse/SWC-2467), *pending research*) per radio: `static formAssociated = true`, its own `attachInternals()`, and `internals.setFormValue(value)` when checked. When unchecked, call `internals.setFormValue(null)` so the unchecked item is excluded from `FormData` — mirroring how only the checked native `<input type="radio">` in a group contributes its `name`/`value` pair. Do not set `internals.role` from `FieldAssociationController`; the radio's own role assignment (above) already owns that. `name` is not set directly by the author on each radio; it is propagated down from `swc-radio-group` (see the [radio group doc](../radio-group/accessibility-migration-analysis.md#aria-roles-states-and-properties)). |
| **Tabbability defaults** | Default to an independent Tab stop (`tabIndex = 0`) when not slotted into a `swc-radio-group`, matching 1st-gen's standalone behavior. When slotted into a group, yield tabindex management entirely to the group's roving-tabindex controller; do not fight over `tabIndex` between the item and the group. |

### Shadow DOM and cross-root ARIA Issues

Mostly none for the item in isolation, with one structural difference from `swc-text-field` worth calling out explicitly. Because `role="radio"` lives on `swc-radio`'s own host rather than on an inner shadow control, the accessible name (`accessible-label`/`accessible-labelledby`) and any future per-item description are wired through the host's own `ElementInternals` (`ariaLabel`, `ariaLabelledByElements`, `ariaDescribedByElements`), not through a same-root `aria-labelledby`/`aria-describedby` IDREF pointing at an inner `<label>`/help-text element the way `swc-text-field`'s `LabellingController` usage does. That is the *default* wiring here, not an edge case: `swc-text-field` reaches for element-reference APIs only for the unusual grid-labelling case, but `swc-radio` (and `swc-radio-group`, see that doc) needs it for the ordinary case, because there is no inner control to attach a plain same-root IDREF to. Confirm during Phase 3/4 implementation that `LabellingController`'s eventual API supports this "attach to host" mode in addition to the "attach to an inner control" mode it was designed around for value-bearing fields.

### Accessibility tree expectations

- **Unchecked, enabled, standalone:** role `radio`; name from the slotted label; `aria-checked="false"`; one Tab stop.
- **Checked, in a group:** role `radio`; `aria-checked="true"`; Tab stop only on this item (`tabIndex = 0`), all sibling radios `tabIndex = -1`.
- **Disabled:** `aria-disabled="true"`; not reachable by Tab (standalone) or by Tab/arrow roving (in a group).
- **No invalid state at this level:** `swc-radio` never exposes `aria-invalid` on itself; an invalid selection is communicated entirely by `swc-radio-group` (see that doc's [accessibility tree expectations](../radio-group/accessibility-migration-analysis.md#accessibility-tree-expectations)).

### Keyboard and focus

- **Standalone (no `swc-radio-group` ancestor):** one Tab stop (`tabIndex = 0` by default); <kbd>Space</kbd> checks the radio if it is not already checked; click checks it. Matches 1st-gen `sp-radio`'s independent behavior.
- **Inside `swc-radio-group`:** the group manages `tabIndex` (roving tabindex: `0` on exactly one eligible radio, `-1` on the rest) and arrow-key movement between siblings; see the [radio group doc's keyboard section](../radio-group/accessibility-migration-analysis.md#keyboard-and-focus) for the full model. From the item's own perspective: receiving focus via Tab or a bare `.focus()` call must *not* by itself change `checked` (matches 1st-gen's "does not select on focus" behavior); receiving focus via the group's arrow-key movement *does* check the newly focused item, per the [APG radio pattern](https://www.w3.org/WAI/ARIA/apg/patterns/radio/); and <kbd>Space</kbd> checks whichever radio currently has focus if it is not already checked, regardless of how focus got there.
- **Disabled:** never receives focus, by Tab or by arrow-key roving.

---

## Testing

### Automated tests

| Kind of test | What to check |
| --- | --- |
| **Unit** | `internals.role` is `'radio'`; `aria-checked` (via `internals.ariaChecked` or the equivalent reflected attribute) tracks `checked` exactly, and is never left as `"mixed"`; standalone tabbability defaults to `tabIndex = 0`; `FieldAssociationController` calls `setFormValue(value)` while checked and `setFormValue(null)` while unchecked, so an unchecked radio's `value` is absent from `FormData`. |
| **aXe + Storybook** | WCAG rules on a standalone `swc-radio` story (outside any group) and on default/checked/disabled stories. A story with no visible label and no `accessible-label`/`accessible-labelledby` set should dev-warn rather than silently render an unnamed control. |
| **Playwright ARIA snapshots** | `role=radio` with the correct accessible name and `checked` state, in both standalone and grouped contexts, across the `s`/`m`/`l`/`xl` sizes and the default/emphasized styles from the design spec's state matrix. |
| **Manual keyboard** | <kbd>Space</kbd> checks a focused, unchecked, standalone radio; a disabled radio is never reachable by Tab. |

---

## Summary checklist

- [ ] `role="radio"` is set via `ElementInternals` on the host, fixed and never author-overridable.
- [ ] `aria-checked` mirrors `checked` exactly on every change; never emits `"mixed"`.
- [ ] Accessible name precedence (`accessible-labelledby` > `accessible-label` > slotted label) resolves through the host's own `ElementInternals`, not an inner shadow control.
- [ ] Per-item `description` (React Spectrum parity) is explicitly scoped in or out during Phase 3 (API), not silently omitted or silently added.
- [ ] `aria-disabled` and tab-sequence removal are both handled explicitly; no reliance on a native `disabled` IDL that custom elements don't have.
- [ ] No per-radio `readonly` property; that state moves to `swc-radio-group` and its enforcement gap in 1st-gen is fixed there, not carried forward.
- [ ] No per-radio `invalid`/`aria-invalid`; [SWC-285](https://jira.corp.adobe.com/browse/SWC-285) is resolved by removing it, not re-implementing it, since invalid state belongs to the group.
- [ ] `FieldAssociationController` excludes an unchecked radio's value from `FormData` (`setFormValue(null)`), matching native radio-group form semantics.
- [ ] `name` is propagated from `swc-radio-group`, not set directly by the author on each radio.
- [ ] Standalone tabbability (`tabIndex = 0` default, `Space` to check) is preserved for use outside a group.
- [ ] Receiving focus via Tab or `.focus()` never auto-selects; receiving focus via the group's arrow-key roving always does.

## References

- [Forms Strategy: 2nd-Gen Proposal (this repo)](../../05_strategies/forms-strategy-rfc.md), specifically [§3.2 Where ARIA roles live](../../05_strategies/forms-strategy-rfc.md#32-where-aria-roles-live) and the [naming table](../../05_strategies/forms-strategy-rfc.md#4-naming-table).
- [Web component form strategy demos](https://github.com/nikkimk/web-component-form-strategy-demos/tree/main) — the proof of concept this doc's controller composition follows.
- [WAI-ARIA APG: Radio Group pattern](https://www.w3.org/WAI/ARIA/apg/patterns/radio/)
- [WAI-ARIA](https://www.w3.org/TR/wai-aria-1.2/), [WCAG 2.2](https://www.w3.org/TR/WCAG22/), [APG: read me first](https://www.w3.org/WAI/ARIA/apg/practices/read-me-first/)
- [React Spectrum: RadioGroup](https://react-spectrum.adobe.com/RadioGroup) (covers both `RadioGroup` and `Radio` props)
- 1st-gen: [`sp-radio`/`sp-radio-group`](../../../../1st-gen/packages/radio/README.md)
- [Radio migration roadmap (this repo)](./rendering-and-styling-migration-analysis.md)
- [Radio group accessibility migration analysis (this repo)](../radio-group/accessibility-migration-analysis.md)
- Jira: [SWC-2348](https://jira.corp.adobe.com/browse/SWC-2348) (epic), [SWC-2349](https://jira.corp.adobe.com/browse/SWC-2349) (this research ticket), [SWC-2467](https://jira.corp.adobe.com/browse/SWC-2467) (`FieldAssociationController`), [SWC-1888](https://jira.corp.adobe.com/browse/SWC-1888) (RFC: form field strategy for 2nd-gen migration)

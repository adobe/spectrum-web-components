<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../../README.md) / [Project planning](../../README.md) / [Components](../README.md) / Radio Group / Radio group accessibility migration analysis

<!-- Document title (editable) -->

# Radio group accessibility migration analysis

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
    - [First-gen (`sp-radio-group`) keyboard model](#first-gen-sp-radio-group-keyboard-model)
    - [Guidelines that apply](#guidelines-that-apply)
- [Related 1st-gen accessibility (Jira)](#related-1st-gen-accessibility-jira)
- [Recommendations: `<swc-radio-group>`](#recommendations-swc-radio-group)
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

This doc tells you how **`swc-radio-group`** should work for **accessibility**, targeting **WCAG 2.2 Level AA**. `swc-radio-group` is the 2nd-gen replacement for 1st-gen `sp-radio-group`: the container that coordinates a set of [`swc-radio`](../radio/accessibility-migration-analysis.md) items so that exactly one is ever checked, keyboard focus moves correctly between them, and the group participates in a native `<form>`. Whether that coordination is provided by a dedicated `RadioGroupController` or composed inline in `swc-radio-group` itself is an open research question tracked by [SWC-2470](https://jira.corp.adobe.com/browse/SWC-2470) and [§6 of the forms strategy RFC](../../05_strategies/forms-strategy-rfc.md#6-open-questions). This doc does not resolve that question; it states the accessibility responsibilities that whichever approach ships must satisfy, so the research spike and this doc stay consistent with each other.

### Also read

- [Radio group migration roadmap](./rendering-and-styling-migration-analysis.md) for layout, CSS, and DOM (not yet written as of this doc).
- [Radio accessibility migration analysis](../radio/accessibility-migration-analysis.md) for the individual item this component coordinates.
- [Forms Strategy: 2nd-Gen Proposal](../../05_strategies/forms-strategy-rfc.md), specifically the "grouped selection" row of its [naming table](../../05_strategies/forms-strategy-rfc.md#4-naming-table) and its [open questions](../../05_strategies/forms-strategy-rfc.md#6-open-questions) on the `RadioGroupController` decision.

### What it is

- The container for two or more mutually exclusive `swc-radio` items. It owns sibling discovery, enforces that exactly one item is checked, moves roving keyboard focus between items, and is the level at which group-wide concerns (label, description, error message, required, invalid, read-only, disabled) live, rather than any one item.
- Sets `role="radiogroup"` on its own host via `ElementInternals` (`internals.role = 'radiogroup'`), for the same reason `swc-radio` sets `role="radio"` on its own host: the group's state is fully described by which child has `aria-checked="true"`, so there is no separate live value that needs a different node to carry it.

### When to use something else

- Fewer than two options, or a single independent on/off setting: use a single control (switch/toggle), not a one-item radio group.
- Multiple selections allowed: use a checkbox group, not radio group.
- A large or dynamic option set where showing every choice isn't practical: use picker or combobox. Radio group exists specifically because every option stays visible for comparison.

### What it is not

- Not a generic `role="group"` wrapper for arbitrary form controls. 1st-gen's `sp-radio-group` extends the shared `FieldGroup`/`sp-field-group` base (which defaults to `role="group"`) and overrides it to `role="radiogroup"` specifically because it only ever contains radios. `swc-radio-group` should not be generalized back into a plain field group; keep the fixed `radiogroup` role.

### Related

- [`swc-radio`](../radio/accessibility-migration-analysis.md), the item this component coordinates.
- Other mutually-exclusive grouped-selection patterns named as potential future consumers of the same controller research in [SWC-2470](https://jira.corp.adobe.com/browse/SWC-2470): swatch groups, segmented controls, select groups, and toggle button groups. None of those are in scope for this doc; they are listed only because a decision made here (inline composition vs. a shared `RadioGroupController`) is expected to set precedent for them.

---

## ARIA and WCAG context

### Pattern in the APG

- The [Radio Group pattern](https://www.w3.org/WAI/ARIA/apg/patterns/radio/) is the normative reference: a `radiogroup` containing `radio` children, roving `tabindex` across them, and arrow-key movement that both moves focus and changes the checked item. Unlike the [Tabs pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/), which offers a documented manual-activation variant (arrows move focus without changing selection until the user presses Enter/Space), APG's radio pattern has no manual variant: moving focus with the arrow keys always checks the newly focused radio. Do not add a "manual" keyboard mode to `swc-radio-group`; it would not match the named APG pattern for this widget.
- The pattern also specifies: on entering the group with Tab, focus goes to the checked radio if one exists, otherwise to the first radio; a plain Tab or programmatic focus (not arrow-driven) does not itself change which item is checked; Home/End move to the first/last radio; and disabled radios are skipped by both Tab-entry and arrow movement.

### First-gen (`sp-radio-group`) keyboard model

1st-gen `sp-radio-group` already implements the full APG model above using `RovingTabindexController` from `@spectrum-web-components/reactive-controllers`, confirmed directly against its test suite:

```46:59:1st-gen/packages/radio/src/RadioGroup.ts
  rovingTabindexController = new RovingTabindexController<Radio>(this, {
    focusInIndex: (elements: Radio[]) => {
      return elements.findIndex((el) => {
        return this.selected
          ? !el.disabled && el.value === this.selected
          : !el.disabled;
      });
    },
    elementEnterAction: (el: Radio) => {
      this._setSelected(el.value);
    },
    elements: () => this.buttons,
    isFocusableElement: (el: Radio) => !el.disabled,
  });
```

- **All four arrow keys move focus in one linear sequence**, not just the two matching the group's visual axis: the test suite dispatches `arrowRightEvent`, `arrowDownEvent`, `arrowLeftEvent`, and `arrowUpEvent` on the same group and expects each to move focus one step through the same `buttons` order. This maps to `FocusgroupNavigationController`'s `direction: 'both'` mode, not `'vertical'` or `'horizontal'`.
- **Wraps at both ends**: a test focuses the last radio in a five-item group and dispatches `ArrowRight`, landing on the first radio (`accepts keyboard interactions where checked and calculateFocusInIndex might conflict`, `1st-gen/packages/radio/test/radio-group.test.ts`). Maps to `wrap: true`.
- **Disabled radios are fully skipped**, not just unselectable: a test with radios 1 and 5 disabled shows `Home`/`End`/arrow movement landing on 2 and 4 respectively, never touching the disabled ends (`acknowledges disabled and accepts keyboard events while focused`). Maps to `skipDisabled: true`.
- **Arrow-driven focus movement also selects**; landing focus by any other means does not. `elementEnterAction` calls `_setSelected(el.value)`, which the test suite confirms fires a `change` event and updates `selected` on every arrow-key move (`emits change events on arrow key events`), while a separate test confirms that calling `.focus()` directly, or Tab-entry via `focusInIndex`, does not by itself select anything (`does not select on focus`).
- **`Space` on the focused item is the escape hatch that does not depend on `RovingTabindexController` at all**: it is handled inside `Radio.ts`'s own `handleKeyup`, independent of the group. This is what lets a user Tab into a group with no selection, land on the first (unchecked) radio, and press `Space` to check it, without having to move focus first.

**2nd-gen note:** replace `RovingTabindexController` with the already-implemented `FocusgroupNavigationController` ([mdx](../../../../2nd-gen/packages/core/controllers/focusgroup-navigation-controller/focusgroup-navigation-controller.mdx)) configured as `direction: 'both'`, `wrap: true`, `skipDisabled: true`. The behavioral detail that mattered here (whether the controller distinguishes arrow-key-driven movement from Tab-entry) is confirmed, but only by reading the controller's own source, not its published mdx: `focusgroupNavigationActiveChange`'s `detail` includes a `source` field (`'keyboard' | 'focus' | 'refresh' | 'programmatic'`, see [`focusgroup-navigation-controller.ts`](../../../../2nd-gen/packages/core/controllers/focusgroup-navigation-controller/src/focusgroup-navigation-controller.ts)) that the mdx doc omits entirely. `swc-radio-group` (or its composing controller) should react only to `source === 'keyboard'` and ignore `'focus'`, `'refresh'`, and `'programmatic'`, exactly matching the [form-strategy proof-of-concept](https://github.com/nikkimk/web-component-form-strategy-demos)'s [`radio-group-controller.js`](https://github.com/nikkimk/web-component-form-strategy-demos/blob/main/radio-group-controller.js) (`if (activeElement && source === 'keyboard') { this.#selection.setSelectedItem(activeElement); }`). This is narrower than the controller's own JSDoc example for "selection-follows-focus" widgets, which says to react to both `'keyboard'` **and** `'focus'` (that guidance describes automatic-activation tabs, where a pointer click or Tab-entry is also expected to select); a radio group's APG-mandated behavior is stricter, since Tab-entry must never select on its own.

### Guidelines that apply

| Idea | Plain meaning |
| --- | --- |
| [Radio Group pattern (APG)](https://www.w3.org/WAI/ARIA/apg/patterns/radio/) | `radiogroup` containing `radio` children; roving `tabindex`; arrow keys move focus and selection together; no manual-activation variant. |
| [Labels or instructions (WCAG 3.3.2)](https://www.w3.org/WAI/WCAG22/Understanding/labels-or-instructions.html) | The group as a whole needs a visible, programmatically associated label, not just labels on the individual radios. [SWC-1178](https://jira.corp.adobe.com/browse/SWC-1178) tracks a report of a missing visible group label in 1st-gen's anatomy documentation; verify against the live `sp-radio-group` API (which does support a `label` property/attribute) rather than assuming the underlying capability is missing, but treat the report as a signal to double-check every 2nd-gen anatomy and Storybook example actually supplies one. |
| [Info and relationships (WCAG 1.3.1)](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html) | Grouping, label, description, and error message must all be programmatic (role containment plus `aria-describedby`/`aria-errormessage`), not conveyed by layout alone. |
| [Error identification (WCAG 3.3.1)](https://www.w3.org/WAI/WCAG22/Understanding/error-identification.html) | When the group is invalid, that must be exposed via `aria-invalid` on the group host, not only through visible error-message styling. 1st-gen never sets this (see [ARIA roles, states, and properties](#aria-roles-states-and-properties)); this is a real gap to fix, not a pattern to carry forward. |
| [Keyboard (WCAG 2.1.1)](https://www.w3.org/TR/WCAG22/#keyboard) | Every interaction (moving, selecting, discovering read-only/disabled state) must work without a pointer. |
| [Focus visible (WCAG 2.4.7)](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html) | The single roving Tab stop needs a clearly visible focus indicator as it moves between items. |
| [Status messages (WCAG 4.1.3)](https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html) | An error message that appears without a focus change (for example, after a delayed validation) needs some way to reach a screen reader user, but that does not mean the help/error container should default to `aria-live="assertive"` (see [ARIA roles, states, and properties](#aria-roles-states-and-properties)). |

**Bottom line:** 1st-gen's roving-tabindex keyboard model is already APG-correct and should be ported behavior-for-behavior onto `FocusgroupNavigationController`; the real accessibility work for `swc-radio-group` is fixing the gaps 1st-gen left at the group level (`aria-invalid` never set, per-item `readonly` that doesn't belong there and isn't enforced, an unconditionally assertive help-text live region) and giving the label/description/error-message wiring an "attach ARIA directly to the host" story, since the group's role lives on its own host rather than an inner control.

---

## Related 1st-gen accessibility (Jira)

| Jira | Type | Status (snapshot) | Resolution (snapshot) | Summary |
| --- | --- | --- | --- | --- |
| [SWC-1178](https://jira.corp.adobe.com/browse/SWC-1178) | Bug | To Do | Unresolved | Visible group label missing: `sp-radio` (anatomy group of radio buttons) |
| [SWC-1613](https://jira.corp.adobe.com/browse/SWC-1613) | Story | Done | Deferred | Migrate `radio-group` to use `FormFieldMixin` |
| [SWC-736](https://jira.corp.adobe.com/browse/SWC-736) | Story | Done | Working As Designed | docs(radio-group): documentation audit |
| [SWC-683](https://jira.corp.adobe.com/browse/SWC-683) | Story | Done | Verified | Radio group value cleared on non-radio change events |
| [SWC-250](https://jira.corp.adobe.com/browse/SWC-250) | Bug | Done | Fixed | FocusGroup won't set `tabindex="0"` on the item focused using the mouse |
| [SWC-1217](https://jira.corp.adobe.com/browse/SWC-1217) | Story | Done | Done | docs(Switch, Checkbox, Radio, Field Group): create migration documentation |
| [SWC-772](https://jira.corp.adobe.com/browse/SWC-772) | Story | Done | Fixed | RFC: form element patterns |
| [SWC-645](https://jira.corp.adobe.com/browse/SWC-645) | Epic | In Progress | Unresolved | Improve accessibility of form/field components |
| [SWC-320](https://jira.corp.adobe.com/browse/SWC-320) | Story | Done | Deferred | Improve form association for input elements |
| [SWC-196](https://jira.corp.adobe.com/browse/SWC-196) | Epic | Done | Duplicate | Loosening the API for form input elements |
| [SWC-48](https://jira.corp.adobe.com/browse/SWC-48) | Epic | Done | Deferred | RFC: recommendations for form-associated custom elements (`ElementInternals`) |

---

## Recommendations: `<swc-radio-group>`

Component tag may change until API freeze.

### ARIA roles, states, and properties

| Topic | What to do |
| --- | --- |
| **Host role** | `role="radiogroup"`, set via `ElementInternals` (`internals.role = 'radiogroup'`), fixed and never author-overridable. 1st-gen achieves the same fixed role imperatively (`this.setAttribute('role', 'radiogroup')` in `willUpdate`); the 2nd-gen version should use the host-role exception from the forms strategy RFC's [naming table](../../05_strategies/forms-strategy-rfc.md#4-naming-table) instead of a plain attribute write. |
| **Accessible name** | In precedence order: `accessible-labelledby` (composing a name from elements the group doesn't own) > `accessible-label` (no visible label) > a visible label rendered inside the group's own shadow root (the common case, matching the Figma "top label"/"side label" positions). Because the group's role lives on its own host, all three resolve against the host's own `ElementInternals` (`internals.ariaLabel`, `internals.ariaLabelledByElements`), the same "attach to host" pattern `swc-radio` uses for its own name — see [Shadow DOM and cross-root ARIA Issues](#shadow-dom-and-cross-root-aria-issues). 1st-gen's `FieldGroup` base sets `aria-label` directly from a `label` property; that specific mechanism (a plain string, not an IDREF) already works correctly across the shadow boundary today, so this is a wiring-location change, not a bug fix. |
| **`aria-required`** | Set via `ElementInternals` (`internals.ariaRequired`) when the group's `required` (React Spectrum: `isRequired`) is `true`. `aria-required` is a group-level concept for radio groups, matching the [WAI-ARIA global states table](https://www.w3.org/TR/wai-aria-1.2/#global_states), not a per-item one; there is no `required` on `swc-radio`. |
| **`aria-invalid` (add — real 1st-gen gap)** | 1st-gen `sp-radio-group` has an `invalid` property, but only uses it to switch which help-text slot renders (`negative-help-text` vs. `help-text`) and to drive `:invalid`-style CSS; it never sets `aria-invalid` on the group host itself (confirmed: no `aria-invalid` handling anywhere in `FieldGroup.ts`, `RadioGroup.ts`, or the shared `HelpTextManager`). This is a real [WCAG 3.3.1](https://www.w3.org/WAI/WCAG22/Understanding/error-identification.html) gap: a screen reader user gets the error text (via `aria-describedby`, see below) but never gets the `invalid` *state* itself unless they read the description. Set `internals.ariaInvalid` (or the equivalent `aria-invalid` mapping) alongside the error-message wiring; do not carry the 1st-gen omission forward. |
| **`aria-readonly` (relocate here from `swc-radio`)** | `aria-readonly` is valid on the `radiogroup` role per the [WAI-ARIA global states table](https://www.w3.org/TR/wai-aria-1.2/#global_states); it is *not* valid on the `radio` role. Implement React Spectrum's `isReadOnly` here, on `swc-radio-group`, not per item (see the [radio doc's note](../radio/accessibility-migration-analysis.md#aria-roles-states-and-properties) on 1st-gen's unenforced per-radio `readonly`). When read-only, every item stays focusable and roving tabindex still works, but neither click, `Space`, nor arrow-key movement changes the checked item — read-only blocks the *selection* half of the interaction model, not the *focus* half. |
| **Description, help text, error message** | Render inside `swc-radio-group`'s own shadow root via the `LabellingController` ([SWC-2466](https://jira.corp.adobe.com/browse/SWC-2466), *pending research*), matching the group-level description/error-message rows shown in the reviewed Figma files. Associate via `aria-describedby` (description/help text) and `aria-errormessage` (error message, only while `invalid` is `true`, in addition to `aria-describedby` for broader AT support) — both set on the host via `ElementInternals`, again the "attach to host" variant rather than `swc-text-field`'s "attach to an inner input" variant. |
| **Live region (fix, don't carry forward)** | 1st-gen's shared `HelpTextManager` (used in `"external"` mode by `FieldGroup`/`RadioGroup`) renders its help-text container with `aria-live="assertive"` unconditionally, regardless of whether the content is a first-render description or a later validation error. Do not default to `assertive`, and do not default to any live region at all for the common case: because the description/error text is already reachable via `aria-describedby`/`aria-errormessage` on the group, a screen reader announces it whenever focus lands on (or stays within) the group, the same reasoning `swc-text-field`'s doc applies. If a genuine focus-elsewhere validation case is found later, use `aria-live="polite"`, never `assertive`. |
| **Sibling discovery and mutual exclusion** | Needs a cache-authoritative selection primitive: the group, not each item, is the single source of truth for which radio is checked, and it must deselect the previously checked item whenever a new one is selected. The proof-of-concept calls this piece `SelectionController`. This repository's existing [`LiveSelectionController`](../../../../2nd-gen/packages/core/controllers/live-selection-controller/live-selection-controller.mdx) is explicitly **not** this piece: its own docs state "Do not use it for radio groups... those patterns call for a cache-authoritative controller" and name `SelectionController` as the separately tracked alternative, because `swc-radio` items are passive (they change only because the group tells them to via `selectItem`/`deselectItem`), not self-toggling the way an accordion panel is. Whether that cache-authoritative piece ships as a new shared controller or is composed inline inside `swc-radio-group` is exactly the [SWC-2470](https://jira.corp.adobe.com/browse/SWC-2470) decision; this doc only fixes the accessibility invariant it must satisfy (exactly one `aria-checked="true"` at a time), not which shape it takes. |
| **Roving tabindex and arrow navigation** | Use the already-implemented [`FocusgroupNavigationController`](../../../../2nd-gen/packages/core/controllers/focusgroup-navigation-controller/focusgroup-navigation-controller.mdx) with `direction: 'both'`, `wrap: true`, `skipDisabled: true` — see [First-gen keyboard model](#first-gen-sp-radio-group-keyboard-model) above for exactly which 1st-gen behaviors these options need to reproduce, and the note there about confirming arrow-driven vs. Tab-driven focus entry are distinguishable. |
| **Name propagation** | Use the already-implemented [`SlotAttributePropagationController`](../../../../2nd-gen/packages/core/controllers/slot-attribute-propagation-controller/slot-attribute-propagation-controller.mdx) to propagate the group's `name` onto every slotted radio, replacing 1st-gen's ad hoc `slotchange` handling and the PoC's flagged hand-rolled `slotchange -> setAttribute('name', ...)` loop. Also use it (or equivalent) to propagate the group's `disabled` onto every radio, since the group has no native fieldset-like disabling mechanism of its own. |
| **Form association — validity, not value** | React Spectrum's `isRequired`/`isInvalid`/`validate`/`validationBehavior` live on `RadioGroup`, not `Radio`. That suggests `swc-radio-group` needs its own `ElementInternals` participation for **constraint validation** (`setValidity`/`checkValidity`/`reportValidity`, `:invalid`/`:user-invalid` matching), even though actual **value submission** happens through each radio's own `FieldAssociationController` (see the [radio doc](../radio/accessibility-migration-analysis.md#aria-roles-states-and-properties)), not the group's. Whether the group needs a full `FieldAssociationController` instance for this (used only for validity, never for `setFormValue`) or a lighter-weight validity-only wiring is open; resolve it alongside [SWC-2470](https://jira.corp.adobe.com/browse/SWC-2470)/Phase 3, not here. |
| **Disabled cascade** | An ancestor `<fieldset disabled>` or owning form's disabled cascade reaches each radio automatically and independently, *because* each radio is itself form-associated (`formDisabledCallback` fires per form-associated element, not once for the group). The group does not need to manually relay that specific cascade; it only needs to propagate its own explicit `disabled` property down to its items (see **Name propagation** above). |
| **Coordinated reset** | `formResetCallback()` on an individual radio is not, by itself, enough: "the default checked item" is a group-level fact (which radio had `checked`/was the initial selection), not something any one radio can recover on its own. The group needs to track the default selection and drive every item back to it on reset, matching the PoC's description of `SelectionController` (which sibling) working together with each radio's own `FieldAssociationController`. Exact mechanism is open; resolve alongside [SWC-2470](https://jira.corp.adobe.com/browse/SWC-2470)/Phase 3. |

### Shadow DOM and cross-root ARIA Issues

The group's label, description, and error message all attach directly to `swc-radio-group`'s own host via `ElementInternals` (`ariaLabel`, `ariaLabelledByElements`, `ariaDescribedByElements`), the same "attach to host" pattern noted in the [radio doc](../radio/accessibility-migration-analysis.md#shadow-dom-and-cross-root-aria-issues), because `role="radiogroup"` lives on the host rather than an inner control. `LabellingController`'s eventual API needs to support this mode in addition to the "attach to an inner control" mode `swc-text-field` uses; confirm this during Phase 3/4 implementation.

Separately, and worth stating explicitly because the forms strategy RFC's [§3.3](../../05_strategies/forms-strategy-rfc.md#33-idref-strategy-label-help-text-and-errors) describes a real cross-root violation for `sp-field-label`/`sp-textfield`: **1st-gen's radio-group help-text association does not have that problem today.** `HelpTextManager` in `"external"` mode sets `aria-describedby` on the group's own host, pointing at the `id` of the *slotted* (light-DOM) help-text element, and both the attribute and the referenced `id` live in the same tree (the group's light DOM), so the IDREF resolves correctly without crossing a shadow boundary. When re-implementing this via `LabellingController`, preserve that correctness property: don't accidentally introduce a cross-root break by moving the description into the group's own shadow root without also giving it the equivalent host-attached element-reference wiring described above.

### Accessibility tree expectations

- **Labeled, one item checked, valid:** role `radiogroup`, name from whichever of `accessible-labelledby`/`accessible-label`/visible label is set; exactly one child exposes `aria-checked="true"`, all others `"false"`. `aria-describedby` present only if a description is slotted.
- **Required, nothing yet selected:** `aria-required="true"`; no child has `aria-checked="true"` until the user picks one.
- **Invalid:** `aria-invalid="true"` on the group host (the 1st-gen gap this doc adds — see [ARIA roles, states, and properties](#aria-roles-states-and-properties)); error message text both visible and reachable via `aria-describedby`/`aria-errormessage`.
- **Read-only:** every item remains focusable and reachable via Tab/arrows; `aria-readonly="true"` on the group; no arrow-key, `Space`, or click interaction changes which item is checked.
- **Disabled (group-level):** `disabled` propagates to every child radio; the group has no Tab stop at all once every item is unreachable.
- **Layout-only variation:** top-label vs. side-label positioning (per the reviewed Figma files) changes the visual layout only; it must not change the accessibility tree shape.

### Keyboard and focus

Implement the full [APG radio pattern](https://www.w3.org/WAI/ARIA/apg/patterns/radio/), reproducing the specific 1st-gen behaviors confirmed in [First-gen keyboard model](#first-gen-sp-radio-group-keyboard-model):

| Key | Behavior |
| --- | --- |
| <kbd>Tab</kbd> | Moves focus into the group, landing on the checked radio if one exists, otherwise the first enabled radio; moves focus out of the group entirely (one Tab stop total, via roving tabindex). Does **not** change which item is checked. |
| <kbd>Space</kbd> | Checks the currently focused radio, if it is not already checked. Works independently of arrow-key movement; this is how a user checks the very first item they land on via Tab. |
| <kbd>ArrowUp</kbd> / <kbd>ArrowDown</kbd> / <kbd>ArrowLeft</kbd> / <kbd>ArrowRight</kbd> | All four move focus one step through the same linear item sequence (not split by visual axis), wrapping from last to first and first to last. Moving focus this way also checks the newly focused item. |
| <kbd>Home</kbd> / <kbd>End</kbd> | Move focus to the first/last enabled radio; also check it, same as arrow movement. |
| N/A (disabled items) | Never receive focus via Tab-entry, arrow movement, or Home/End. |

Use [`FocusgroupNavigationController`](../../../../2nd-gen/packages/core/controllers/focusgroup-navigation-controller/focusgroup-navigation-controller.mdx) (`direction: 'both'`, `wrap: true`, `skipDisabled: true`) for the movement mechanics, and confirm (per the note in [First-gen keyboard model](#first-gen-sp-radio-group-keyboard-model)) that the select-on-arrow-move vs. no-select-on-Tab-entry split is preserved when wiring it up. When read-only, keep all of the above focus/Tab behavior; suppress only the "also checks it" half of `Space`, arrow movement, Home, and End.

---

## Testing

### Automated tests

| Kind of test | What to check |
| --- | --- |
| **Unit** | Exactly one child ever has `aria-checked="true"` after any selection change; `aria-invalid`, `aria-required`, and `aria-readonly` on the host track their respective properties; `name` and `disabled` propagate to every slotted radio; a reset restores the item that was checked by default, not just clears the current selection. |
| **aXe + Storybook** | A dev-warning story for a group with no accessible name at all. A required-and-untouched story. An invalid story with a visible, `aria-describedby`/`aria-errormessage`-associated error message. Read-only and disabled stories. Top-label and side-label layout stories (layout only; same tree shape). |
| **Playwright ARIA snapshots** | `role=radiogroup` with the correct accessible name and exactly one checked child, across required/invalid/read-only/disabled states and both label positions from the design spec's state matrix. |
| **Playwright keyboard** | Tab lands on the checked (or first enabled) radio and moves out after one stop; all four arrow keys move and select with wraparound; Home/End move and select; disabled items are fully skipped; read-only keeps focus movement but blocks selection change; `Space` checks an unchecked, focused item. |
| **Contrast / focus** | Roving focus indicator remains visible and distinct as it moves between items, across sizes and styles. |

---

## Summary checklist

- [ ] `role="radiogroup"` is set via `ElementInternals` on the host, fixed and never author-overridable.
- [ ] Accessible name precedence (`accessible-labelledby` > `accessible-label` > visible label) resolves through the host's own `ElementInternals`, matching the "attach to host" pattern the [radio doc](../radio/accessibility-migration-analysis.md) also uses.
- [ ] `aria-invalid` is added on the group host when invalid — a real 1st-gen gap, not previously implemented at all.
- [ ] `aria-readonly` is implemented once, correctly, at the group level (not the unenforced per-radio version 1st-gen shipped).
- [ ] `aria-required` reflects the group's `required`/`isRequired`.
- [ ] Description/help text and error message render inside the group's own shadow root and associate via host-attached `aria-describedby`/`aria-errormessage`, preserving the fact that 1st-gen's light-DOM-slot association already resolves correctly (no cross-root regression introduced).
- [ ] Help/error container does not default to `aria-live="assertive"`, or to any live region, for the common case.
- [ ] Mutual exclusion uses a cache-authoritative selection primitive, not `LiveSelectionController` (which explicitly documents itself as the wrong fit for radio groups); whether that primitive is a new shared controller or inlined is tracked by [SWC-2470](https://jira.corp.adobe.com/browse/SWC-2470), not decided in this doc.
- [ ] Roving tabindex and arrow navigation use `FocusgroupNavigationController` (`direction: 'both'`, `wrap: true`, `skipDisabled: true`), reproducing every behavior confirmed in [First-gen keyboard model](#first-gen-sp-radio-group-keyboard-model).
- [ ] Arrow/Home/End movement always selects the newly focused item; Tab-entry and programmatic `.focus()` never do.
- [ ] `name` and `disabled` propagate to every slotted radio via `SlotAttributePropagationController`.
- [ ] Group-level validity (`setValidity`/`checkValidity`) is resolved as part of [SWC-2470](https://jira.corp.adobe.com/browse/SWC-2470)/Phase 3; per-radio value submission and exclusion from `FormData` stays on each radio's own `FieldAssociationController`.
- [ ] Coordinated reset restores the default-checked item, not just an empty selection.
- [ ] Top-label vs. side-label layout changes visual presentation only, never the accessibility tree shape.

## References

- [Forms Strategy: 2nd-Gen Proposal (this repo)](../../05_strategies/forms-strategy-rfc.md), specifically the [naming table](../../05_strategies/forms-strategy-rfc.md#4-naming-table) and [open questions](../../05_strategies/forms-strategy-rfc.md#6-open-questions).
- [Web component form strategy demos](https://github.com/nikkimk/web-component-form-strategy-demos/tree/main) — the proof of concept this doc's controller composition follows.
- [WAI-ARIA APG: Radio Group pattern](https://www.w3.org/WAI/ARIA/apg/patterns/radio/)
- [WAI-ARIA](https://www.w3.org/TR/wai-aria-1.2/), [WCAG 2.2](https://www.w3.org/TR/WCAG22/), [APG: read me first](https://www.w3.org/WAI/ARIA/apg/practices/read-me-first/)
- [React Spectrum: RadioGroup](https://react-spectrum.adobe.com/RadioGroup)
- [`LiveSelectionController` (this repo)](../../../../2nd-gen/packages/core/controllers/live-selection-controller/live-selection-controller.mdx) — documents why it is the wrong fit for radio groups
- [`FocusgroupNavigationController` (this repo)](../../../../2nd-gen/packages/core/controllers/focusgroup-navigation-controller/focusgroup-navigation-controller.mdx)
- [`SlotAttributePropagationController` (this repo)](../../../../2nd-gen/packages/core/controllers/slot-attribute-propagation-controller/slot-attribute-propagation-controller.mdx)
- 1st-gen: [`sp-radio`/`sp-radio-group`](../../../../1st-gen/packages/radio/README.md), [`sp-field-group`](../../../../1st-gen/packages/field-group/README.md), [`sp-help-text`](../../../../1st-gen/packages/help-text/README.md)
- [Radio group migration roadmap (this repo)](./rendering-and-styling-migration-analysis.md) (not yet written)
- [Radio accessibility migration analysis (this repo)](../radio/accessibility-migration-analysis.md)
- Jira: [SWC-2348](https://jira.corp.adobe.com/browse/SWC-2348) (epic), [SWC-2349](https://jira.corp.adobe.com/browse/SWC-2349) (this research ticket), [SWC-2470](https://jira.corp.adobe.com/browse/SWC-2470) (`RadioGroupController` research spike), [SWC-2466](https://jira.corp.adobe.com/browse/SWC-2466) (`LabellingController`), [SWC-2467](https://jira.corp.adobe.com/browse/SWC-2467) (`FieldAssociationController`), [SWC-1888](https://jira.corp.adobe.com/browse/SWC-1888) (RFC: form field strategy for 2nd-gen migration)

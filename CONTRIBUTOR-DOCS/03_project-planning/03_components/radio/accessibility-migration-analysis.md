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

This doc tells you how **`swc-radio`** should work for **accessibility**, targeting **WCAG 2.2 Level AA**. `swc-radio` is the 2nd-gen replacement for 1st-gen `sp-radio`: one option within a mutually exclusive set. A `swc-radio` is always used inside [`swc-radio-group`](../radio-group/accessibility-migration-analysis.md), which owns sibling discovery, mutual exclusion, and keyboard navigation across the set. This doc covers the individual radio item; the group's ARIA, roving-tabindex, and form-participation model live in the radio group doc, since several of the item's behaviors (whether it is checked, whether Tab reaches it) are driven by the group rather than decided locally.

### Also read

- [Radio migration roadmap](./rendering-and-styling-migration-analysis.md) for layout, CSS, and DOM.
- [Radio group accessibility migration analysis](../radio-group/accessibility-migration-analysis.md) for the group that coordinates selection, keyboard navigation, and form participation across a set of radios.
- [Forms Strategy: 2nd-Gen Proposal](../../05_strategies/forms-strategy-rfc.md), specifically [§3.2](../../05_strategies/forms-strategy-rfc.md#32-where-aria-roles-live) on where each part of a grouped-selection component's role lives.

### What it is

- One option in a mutually exclusive set. `swc-radio` is always used inside a `swc-radio-group`, which owns its tabindex and answers keyboard activation for it; `swc-radio` has no independent Tab stop of its own. This is a deliberate change from 1st-gen `sp-radio`, which defaults its own `tabIndex` to `0` and answers `Space` on its own so it can be used without a wrapping `sp-radio-group`; 2nd-gen drops that standalone support in favor of the group always owning tabindex management (see [Keyboard and focus](#keyboard-and-focus)).
- Renders a real, native `<input type="radio">` inside its own shadow DOM to carry `role="radio"`, `checked`, and keyboard activation natively, the same shadow-DOM-first pattern `swc-text-field` uses for its `<input type="text">`. The host itself sets no role. This follows the forms strategy RFC's general rule that the role element defaults to the shadow DOM (see the RFC's [§3.2](../../05_strategies/forms-strategy-rfc.md#32-where-aria-roles-live)); unlike `swc-radio-group` (which has no native container element to render and so uses the RFC's host-role exception instead), `swc-radio` has a native equivalent and does not need that exception.
- **A note on the [form-strategy proof-of-concept](https://github.com/nikkimk/web-component-form-strategy-demos)'s `my-radio.js`, which is not evidence either way here.** That PoC component also puts `role="radio"` on the host via `ElementInternals`, with no inner native input at all. This is not a competing recommendation this doc has to argue against: the PoC's demo components exist to show which responsibilities can be pulled into reusable controllers (sibling discovery, mutual exclusion, roving tabindex, name propagation, coordinated reset), not to model correct role placement for a production radio. Putting the role on the PoC's host was the fastest way to get `aria-checked` working for that demo, not a design recommendation. `swc-radio`'s native-input choice here rests on its own merits (a native input gets `checked`/`aria-checked`/keyboard activation for free from the browser, instead of hand-writing `internals.ariaChecked` at every state-change call site the way the PoC's item does; and it keeps this repo's host-role exceptions limited to roles with no native HTML equivalent at all, such as `radiogroup`), not on agreeing or disagreeing with the PoC. See the RFC's [§3.2](../../05_strategies/forms-strategy-rfc.md#32-where-aria-roles-live) for the same note recorded at the strategy level.

### When to use something else

- More than one option can be true at once: use a checkbox group, not radio. An APG radio group always has exactly one, or zero, checked items.
- A large or dynamic list of mutually exclusive options that doesn't fit the available space: use a picker or combobox instead. Radio (and radio group) exists specifically so every option stays visible at once for direct comparison.

### What it is not

- Not a toggle switch. A single `swc-radio` never stands alone to represent an independent on/off setting; it only makes sense as one of at least two mutually exclusive options inside a group.

### Related

- [`swc-radio-group`](../radio-group/accessibility-migration-analysis.md), the coordinating parent for any set of two or more radios. Whether that coordination (including this item's own `select()`/`deselect()` hooks) is driven by a dedicated `RadioGroupController` or composed inline in `swc-radio-group` is an open question tracked by [SWC-2470](https://jira.corp.adobe.com/browse/SWC-2470); see the [radio group doc](../radio-group/accessibility-migration-analysis.md#recommendations-swc-radio-group) for the current state of that decision. This doc's recommendations for `swc-radio` hold regardless of which shape that coordination takes.
- Checkbox is the multi-select sibling pattern (not yet migrated to 2nd-gen as of this doc; see the [checkbox migration roadmap](../checkbox/rendering-and-styling-migration-analysis.md)).

---

## ARIA and WCAG context

### Pattern in the APG

- The [Radio Group pattern](https://www.w3.org/WAI/ARIA/apg/patterns/radio/) is the normative reference for the whole widget: a `radiogroup` containing two or more `radio` elements, exactly one of which is checked. This doc covers the `radio` half; the `radiogroup` half (the container, sibling discovery, roving tabindex) is documented in [Radio group accessibility migration analysis](../radio-group/accessibility-migration-analysis.md#aria-and-wcag-context).
- APG's radio examples assume a native `<input type="radio">` per item, where the browser supplies role, `checked` state, and grouping via a shared `name` attribute. `swc-radio` keeps that native element: it renders a real `<input type="radio">` inside its own shadow DOM, so the browser continues to supply role, `checked`, and keyboard activation the same way APG's examples assume, instead of `swc-radio` reproducing that behavior itself on the host.

### Guidelines that apply

| Idea | Plain meaning |
| --- | --- |
| [Name, role, value (WCAG 4.1.2)](https://www.w3.org/TR/WCAG22/#name-role-value) | Each radio needs role `radio`, an accessible name from its label, and a `checked` state that tracks real selection. The native inner `<input type="radio">` supplies role and state; `swc-radio` supplies the name. |
| [Info and relationships (WCAG 1.3.1)](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html) | The relationship between a radio and its group, and the fact that it is mutually exclusive with its siblings, must be programmatic, not just visual proximity. `radiogroup` containment supplies this; styling alone does not. |
| [Keyboard (WCAG 2.1.1)](https://www.w3.org/TR/WCAG22/#keyboard) | Selecting and moving between radios must all work without a pointer. |
| [Focus visible (WCAG 2.4.7)](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html) | The focus indicator on the currently focused radio must stay visible and distinct, since only one radio in the group has a Tab stop at a time (roving tabindex). |
| [Non-text contrast (WCAG 1.4.11)](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html) | The radio button's visual indicator (ring and dot) needs 3:1 contrast against its background in both the checked and unchecked states. |
| [Target size minimum (WCAG 2.5.8)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html) | The clickable or tappable area for a radio (button plus label, per the Figma anatomy) should meet minimum target size across the `s`/`m`/`l`/`xl` sizes. |

**Bottom line:** `swc-radio` keeps a real, native `<input type="radio">` in its own shadow DOM, so role, `checked`, and keyboard activation come from the browser, not from `swc-radio` reproducing them on the host. The accessibility work for the item is almost entirely about correctly labelling that inner input and keeping its custom visual button in sync with it. The group is responsible for making sure only one item is ever checked and for moving focus between them.

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
| **Host role** | None. The host sets no `role`. A real, native `<input type="radio">` inside `swc-radio`'s own shadow DOM supplies the implicit `radio` role. This follows the forms strategy RFC's [§3.2](../../05_strategies/forms-strategy-rfc.md#32-where-aria-roles-live) general rule (role element defaults to the shadow DOM), not the host-role exception reserved for controls with no native equivalent, such as `swc-radio-group`'s `radiogroup` container (see the [radio group doc](../radio-group/accessibility-migration-analysis.md#aria-roles-states-and-properties)). Attach the shadow root with `delegatesFocus: true` so Tab and programmatic focus land on the inner `<input>` directly, the same pattern `swc-text-field` uses. |
| **`checked` / `aria-checked`** | Comes from the browser for free: the native `<input type="radio">`'s `checked` IDL property drives its own implicit `aria-checked`, so `swc-radio` does not need to write `aria-checked` manually the way 1st-gen `sp-radio` does on itself in `updated()`. Keep `swc-radio`'s own `checked` (or `selected`) property in sync with the inner input's `checked`. Radio's `aria-checked` only ever takes `true`/`false`, never `"mixed"` (unlike checkbox's tri-state support). |
| **Accessible name** | Rendered as a hidden-until-populated label element inside `swc-radio`'s own shadow root (matching the shape of the PoC's [`checkbox-hybrid.js`](https://github.com/nikkimk/web-component-form-strategy-demos/blob/main/checkbox-hybrid.js)), wired by the **`LabellingController`** ([SWC-2466](https://jira.corp.adobe.com/browse/SWC-2466), *pending research*), which points the inner `<input type="radio">`'s (the role-bearing element's) `ariaLabelledByElements` at that span. `ariaLabelledByElements` is a general ARIAMixin element-reference property available directly on any element, including a plain native `<input>`; it does not require `ElementInternals`. In precedence order: (1) `accessible-labelledby`, for the rare case a radio's name is composed from elements it doesn't own, resolved by the controller into the same `ariaLabelledByElements` array; (2) `accessible-label`, for a radio with no visible text label of its own; (3) the slotted label content, the normal case. See [Shadow DOM and cross-root ARIA Issues](#shadow-dom-and-cross-root-aria-issues) for why this is one mechanism for both the slotted and light-DOM-sibling cases, not two. |
| **Per-item description (open scope question)** | [React Spectrum's `Radio`](https://react-spectrum.adobe.com/RadioGroup) accepts an optional per-radio `description` (used for enriched option text, for example "Delivers in 5–7 business days" under a shipping-method label). 1st-gen `sp-radio` has no equivalent, and the reviewed Figma files show only a group-level description and error message, matching 1st-gen's `sp-radio-group` help-text slots rather than a per-radio one. Whether `swc-radio` adds a per-radio `description` in this migration wave, or defers it, is an open API-scope question for the migration plan (SWC-2350) and Phase 3 (API), not decided here. If it is added, it can use a plain same-root `aria-describedby` pointing at an element in the input's own shadow root, the same pattern `swc-text-field` uses for its description; no element-reference API is needed for this case. |
| **Disabled** | Reflect `disabled` onto the inner `<input type="radio">`'s native `disabled` attribute. The browser removes a natively disabled input from the tab order and exposes it correctly to assistive technology for free; `swc-radio` does not need to hand-write `aria-disabled` or manage tab reachability itself for the standalone case. The enclosing `swc-radio-group` separately excludes disabled radios from its own roving-tabindex sequence (`skipDisabled: true` on `FocusgroupNavigationController`, see the [radio group doc](../radio-group/accessibility-migration-analysis.md#keyboard-and-focus)); confirm during Phase 3/4 implementation how the group's roving-tabindex bookkeeping (which typically tracks the `swc-radio` host elements it discovers as siblings) interacts with `delegatesFocus` funnelling actual keyboard focus into each item's inner input. |
| **`readonly` (relocate to the group)** | 1st-gen `sp-radio` carries its own `readonly` property, but it is not actually enforced: `click()`/`activate()` only check `this.disabled`, never `this.readonly`, and the one existing test for it only confirms an *already-checked* readonly radio stays checked when clicked, not that selecting a *different* radio is blocked. [React Spectrum](https://react-spectrum.adobe.com/RadioGroup) places `isReadOnly` on `RadioGroup`, not `Radio`, which is the correct level: read-only-ness is a property of the whole mutually exclusive set, not of one item. Native `readonly` does not apply to `<input type="radio">` at all (the browser ignores it), so this was never going to be a native attribute regardless. Do not carry a per-radio `readonly` property into `swc-radio`; implement it once, correctly, on `swc-radio-group` (see the [radio group doc](../radio-group/accessibility-migration-analysis.md#aria-roles-states-and-properties)). |
| **`aria-invalid` (remove, do not carry forward)** | 1st-gen `sp-radio` sets `aria-invalid="true"` on itself when its own `invalid` property is `true` ([SWC-285](https://jira.corp.adobe.com/browse/SWC-285) tracks removing this). Invalid/error state describes the *selection as a whole* ("you must pick one of these"), not one item in isolation, and React Spectrum's `isInvalid` lives on `RadioGroup`. Do not add an `invalid` property or `aria-invalid` handling to `swc-radio`; keep that state entirely on `swc-radio-group`. |
| **`value` — a plain attribute, not ARIA** | `value` identifies which option this radio represents within its group's shared `name`; it is a content attribute the group reads and the form submits, not an accessibility property. Do not confuse it with the radio's accessible name, which always comes from the label sources above. |
| **Form association** | Use a **`FieldAssociationController`** ([SWC-2467](https://jira.corp.adobe.com/browse/SWC-2467), *pending research*) per radio: `static formAssociated = true`, its own `attachInternals()`, and `internals.setFormValue(value)` when checked. When unchecked, call `internals.setFormValue(null)` so the unchecked item is excluded from `FormData`, mirroring how only the checked native `<input type="radio">` in a group contributes its `name`/`value` pair. Do not set `internals.role` on this `ElementInternals` at all; role comes from the inner native input instead (see **Host role** above), not from the outer custom element's own internals. `name` is not set directly by the author on each radio; it is propagated down from `swc-radio-group` and forwarded onto the inner `<input>` (see the [radio group doc](../radio-group/accessibility-migration-analysis.md#aria-roles-states-and-properties)). |

### Shadow DOM and cross-root ARIA Issues

None as a design risk, but the actual wiring mechanism is more specific than an ordinary same-root IDREF, confirmed against the PoC's [`checkbox-hybrid.js`](https://github.com/nikkimk/web-component-form-strategy-demos/blob/main/checkbox-hybrid.js)/[`labelling-controller.js`](https://github.com/nikkimk/web-component-form-strategy-demos/blob/main/labelling-controller.js), a structurally identical native-input-in-shadow-DOM case (checkbox). The **`LabellingController`** ([SWC-2466](https://jira.corp.adobe.com/browse/SWC-2466), *pending research*) sets `ariaLabelledByElements`/`ariaDescribedByElements` on the inner `<input type="radio">` (the role-bearing element), pointing at a shadow-internal label/description span when content is slotted. `ariaLabelledByElements` is a general ARIAMixin element-reference property available on any element, not something reserved for `ElementInternals`, so the controller can wire it onto the native input directly without the outer custom element needing to attach internals for labelling purposes. The same property also resolves external light-DOM elements (via `accessible-labelledby`/`accessible-describedby`) when nothing is slotted, unifying the same-root and cross-root cases through one API rather than switching between a plain IDREF string and an element-reference API depending on tree topology. For `swc-radio-group`, the controller instead wires the equivalent property onto the group's own host (`internals.ariaLabelledByElements`, via `ElementInternals`, since the host itself carries the role there), not an inner control; see the [radio group doc](../radio-group/accessibility-migration-analysis.md#shadow-dom-and-cross-root-aria-issues).

### Accessibility tree expectations

- **Unchecked, enabled:** role `radio` (from the inner native input); name from the slotted label; not the currently active item in the group's roving-tabindex sequence.
- **Checked:** role `radio`; `checked`/`aria-checked="true"`; this is the item the group gives the roving Tab stop to.
- **Disabled:** the inner input's native `disabled` removes it from the tab order and exposes disabled state to assistive technology; also excluded from the group's roving-tabindex sequence.
- **No invalid state at this level:** `swc-radio` never exposes `aria-invalid` on itself; an invalid selection is communicated entirely by `swc-radio-group` (see that doc's [accessibility tree expectations](../radio-group/accessibility-migration-analysis.md#accessibility-tree-expectations)).

### Keyboard and focus

- `swc-radio-group` manages roving `tabIndex` across its items (`0` on exactly one eligible radio, `-1` on the rest) and arrow-key movement between siblings; see the [radio group doc's keyboard section](../radio-group/accessibility-migration-analysis.md#keyboard-and-focus) for the full model. From the item's own perspective: receiving focus via Tab or a bare `.focus()` call must *not* by itself change `checked` (matches 1st-gen's "does not select on focus" behavior); receiving focus via the group's arrow-key movement *does* check the newly focused item, per the [APG radio pattern](https://www.w3.org/WAI/ARIA/apg/patterns/radio/); and <kbd>Space</kbd> on the inner native input checks whichever radio currently has focus if it is not already checked, regardless of how focus got there.
- **Disabled:** never receives focus, by Tab or by arrow-key roving, because the inner input's native `disabled` removes it from the tab order.

---

## Testing

### Automated tests

| Kind of test | What to check |
| --- | --- |
| **Unit** | `swc-radio`'s shadow DOM contains a real `<input type="radio">`; the host itself sets no `role`; `checked` on `swc-radio` stays in sync with the inner input's `checked`; `FieldAssociationController` calls `setFormValue(value)` while checked and `setFormValue(null)` while unchecked, so an unchecked radio's `value` is absent from `FormData`. |
| **aXe + Storybook** | WCAG rules on default/checked/disabled stories, always rendered inside a `swc-radio-group`. A story with no visible label and no `accessible-label`/`accessible-labelledby` set should dev-warn rather than silently render an unnamed control. |
| **Playwright ARIA snapshots** | `role=radio` with the correct accessible name and `checked` state, within a group, across the `s`/`m`/`l`/`xl` sizes and the default/emphasized styles from the design spec's state matrix. |
| **Manual keyboard** | <kbd>Space</kbd> checks a focused, unchecked radio; a disabled radio is never reachable by Tab or arrow-key roving. |

---

## Summary checklist

- [ ] `swc-radio` sets no `role` on its own host; a real, native `<input type="radio">` inside its shadow DOM supplies `role="radio"`.
- [ ] The shadow root uses `delegatesFocus: true` so Tab and programmatic focus land on the inner input.
- [ ] `checked`/`aria-checked` come from the native inner input; `swc-radio` never emits `"mixed"`.
- [ ] Accessible name precedence (`accessible-labelledby` > `accessible-label` > slotted label) resolves through `ariaLabelledByElements`, wired by `LabellingController` onto the inner `<input type="radio">`, the same mechanism for both the slotted (shadow-internal) and light-DOM-sibling sources, confirmed against the PoC's `checkbox-hybrid.js`/`labelling-controller.js`.
- [ ] Per-item `description` (React Spectrum parity) is explicitly scoped in or out during Phase 3 (API), not silently omitted or silently added.
- [ ] `disabled` reflects onto the inner input's native `disabled` attribute rather than a hand-written `aria-disabled`.
- [ ] No per-radio `readonly` property; that state moves to `swc-radio-group` and its enforcement gap in 1st-gen is fixed there, not carried forward.
- [ ] No per-radio `invalid`/`aria-invalid`; [SWC-285](https://jira.corp.adobe.com/browse/SWC-285) is resolved by removing it, not re-implementing it, since invalid state belongs to the group.
- [ ] `FieldAssociationController`'s `ElementInternals` never sets `internals.role`; role comes only from the inner native input.
- [ ] `FieldAssociationController` excludes an unchecked radio's value from `FormData` (`setFormValue(null)`), matching native radio-group form semantics.
- [ ] `name` is propagated from `swc-radio-group` onto each item's inner input, not set directly by the author on each radio.
- [ ] `swc-radio` has no independent Tab stop; tabindex management is delegated entirely to the enclosing `swc-radio-group`.
- [ ] Receiving focus via Tab or `.focus()` never auto-selects; receiving focus via the group's arrow-key roving always does.

## References

- [Forms Strategy: 2nd-Gen Proposal (this repo)](../../05_strategies/forms-strategy-rfc.md), specifically [§3.2 Where ARIA roles live](../../05_strategies/forms-strategy-rfc.md#32-where-aria-roles-live) (the general shadow-DOM-default rule `swc-radio` follows, and why `swc-radio-group` is the exception, not `swc-radio`) and the [naming table](../../05_strategies/forms-strategy-rfc.md#4-naming-table).
- [Web component form strategy demos](https://github.com/nikkimk/web-component-form-strategy-demos/tree/main), the proof of concept for the controller-composition findings this doc relies on. Its demo components' own internal ARIA choices, such as [`my-radio.js`](https://github.com/nikkimk/web-component-form-strategy-demos/blob/main/my-radio.js)'s host-role placement, are not evidence for or against this doc's role-placement recommendation; see [What it is](#what-it-is).
- [WAI-ARIA APG: Radio Group pattern](https://www.w3.org/WAI/ARIA/apg/patterns/radio/)
- [WAI-ARIA](https://www.w3.org/TR/wai-aria-1.2/), [WCAG 2.2](https://www.w3.org/TR/WCAG22/), [APG: read me first](https://www.w3.org/WAI/ARIA/apg/practices/read-me-first/)
- [React Spectrum: RadioGroup](https://react-spectrum.adobe.com/RadioGroup) (covers both `RadioGroup` and `Radio` props)
- 1st-gen: [`sp-radio`/`sp-radio-group`](../../../../1st-gen/packages/radio/README.md)
- [Radio migration roadmap (this repo)](./rendering-and-styling-migration-analysis.md)
- [Radio group accessibility migration analysis (this repo)](../radio-group/accessibility-migration-analysis.md)
- Jira: [SWC-2348](https://jira.corp.adobe.com/browse/SWC-2348) (epic), [SWC-2349](https://jira.corp.adobe.com/browse/SWC-2349) (this research ticket), [SWC-2470](https://jira.corp.adobe.com/browse/SWC-2470) (`RadioGroupController` research spike), [SWC-2467](https://jira.corp.adobe.com/browse/SWC-2467) (`FieldAssociationController`), [SWC-1888](https://jira.corp.adobe.com/browse/SWC-1888) (RFC: form field strategy for 2nd-gen migration)

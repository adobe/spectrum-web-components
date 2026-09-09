<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../../README.md) / [Project planning](../../README.md) / [Components](../README.md) / Option / Option accessibility migration analysis

<!-- Document title (editable) -->

# Option accessibility migration analysis

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
- [Recommendations: `<swc-option>`](#recommendations-swc-option)
    - [ARIA roles, states, and properties](#aria-roles-states-and-properties)
    - [Shadow DOM and cross-root ARIA Issues](#shadow-dom-and-cross-root-aria-issues)
    - [Accessibility tree expectations](#accessibility-tree-expectations)
    - [Keyboard and focus](#keyboard-and-focus)
- [Testing](#testing)
    - [Automated tests](#automated-tests)
    - [Manual screen reader testing](#manual-screen-reader-testing)
- [Summary checklist](#summary-checklist)
- [References](#references)

</details>

<!-- Document content (editable) -->

## Overview

This doc tells you how **`swc-option`** should work for **accessibility**. It matches the goal of **WCAG 2.2 Level AA**. `swc-option` is a new 2nd-gen component — it has no 1st-gen `sp-option` predecessor. It is the selectable row inside a `listbox`: a single value the user can choose. Its first consumer is [`swc-combobox`](../combobox/accessibility-migration-analysis.md), which replaces 1st-gen's practice of borrowing `sp-menu-item` for combobox options.

The reason `swc-option` exists is **role ownership**. 1st-gen `sp-combobox` builds its popup from `sp-menu` / `sp-menu-item`, which carry `menu`/`menuitem` semantics, and then works around that mismatch by re-rendering shadow-DOM copies of the options so it can attach the `listbox`/`option` roles it actually needs. A dedicated `swc-option` that **owns `role="option"` on its own host** lets the combobox point `aria-activedescendant` straight at the author's real element, across shadow roots, with the correct role already in place — no menu-to-listbox impedance mismatch and no duplicate rendering. See [`swc-combobox`'s Shadow DOM section](../combobox/accessibility-migration-analysis.md#shadow-dom-and-cross-root-aria-issues) for the parent side of this relationship.

### Also read

- [Combobox accessibility migration analysis](../combobox/accessibility-migration-analysis.md) — the first consumer; explains the cross-root `aria-activedescendant` / `aria-controls` wiring that references `swc-option` elements.
- [Menu item accessibility migration analysis](../menu-item/accessibility-migration-analysis.md) — the `menuitem` sibling `swc-option` is deliberately **not** a variant of (different role, different pattern).
- [Forms strategy: 2nd-gen proposal](../../05_strategies/forms-strategy-rfc.md) — role-placement and cross-root ARIA direction.

### What it is

- A **selectable option in a listbox**: `role="option"`, a visible label, an optional description, and optional decorative icon/avatar content. Its selected state is exposed through `aria-selected`; its disabled state through `aria-disabled`.
- It carries a **`value`** property that identifies the option to the combobox for selection and form submission. Every option in a combobox must have a **unique `value`**, and sibling options must have **distinct labels** (see [ARIA roles, states, and properties](#aria-roles-states-and-properties)).
- Its parent is a [`swc-combobox`](../combobox/accessibility-migration-analysis.md) or a picker — and, within either, it may be nested in a [`swc-option-group`](../option-group/accessibility-migration-analysis.md) that adds a labeled category. The option is authored in that parent's light DOM and projected by slot into the internal `role="listbox"` element the parent renders in its shadow DOM (each parent owns its own listbox rather than sharing one component, because a combobox listbox uses active-descendant while a picker listbox sets focus); the option itself stays a real light-DOM element.
- **The role lives on the `swc-option` host**, set via `ElementInternals` (`internals.role = 'option'`). This is deliberate and is what makes the component worth creating: because the option's own element carries the role, a combobox (or listbox) in a different shadow root can reference it with `aria-activedescendant` via the `ariaActiveDescendantElement` element-reference property and land on a node that is already an `option`.
- Its accessible name comes from its slotted content (label text), with an optional `textValue`-style string for typeahead when the visible content is not plain text (icon-only or richly formatted rows), mirroring [React Spectrum's `textValue` on `ComboBoxItem`](https://react-spectrum.adobe.com/ComboBox).

### When to use something else

- A **command** that performs an action in a menu — use [`swc-menu-item`](../menu-item/accessibility-migration-analysis.md) (`role="menuitem"`), not `swc-option`. Options are *values you select*; menu items are *commands you run*. This is the core distinction and the reason `swc-option` is a separate component rather than a mode of `swc-menu-item`.
- A **checkbox or radio** choice — use the appropriate form control; `aria-selected` on an option is not the same semantic as `aria-checked`.
- A **static, non-selectable label or divider** inside a listbox — use a group label or separator element, not an `option` with selection disabled.

### What it is not

- Not a menu item. Even though 1st-gen composes combobox options from `sp-menu-item`, `swc-option` must not inherit `menuitem` semantics, menu-button keyboard behavior, or a `submenu` slot. It is a leaf `option`.
- Not an independently focusable control in its default (combobox) use. In the active-descendant model, DOM focus stays on the combobox input and never moves to the option (see [Keyboard and focus](#keyboard-and-focus)).
- Not a container for interactive children. Per [React Spectrum's guidance](https://react-spectrum.adobe.com/ComboBox), buttons or other interactive elements inside an option break keyboard and screen reader navigation; `swc-option` should hold only text and decorative graphics.

### Related

- [`swc-combobox`](../combobox/accessibility-migration-analysis.md) — the parent that references `swc-option` elements as active descendants.
- [`swc-option-group`](../option-group/accessibility-migration-analysis.md) — a labeled `role="group"` container that groups a set of `swc-option`s inside the parent's listbox.
- [`swc-menu-item`](../menu-item/accessibility-migration-analysis.md) — the `menuitem` counterpart; same visual family, different role and pattern.
- The [`LiveSelectionController`](../../../../2nd-gen/packages/core/controllers/live-selection-controller/live-selection-controller.mdx) — driven by the *parent* (combobox or picker) over a set of `swc-option` children, not by the option itself. A **focus-managing** parent such as a picker (roving `tabindex`) may additionally use the [`FocusgroupNavigationController`](../../../../2nd-gen/packages/core/controllers/focusgroup-navigation-controller/focusgroup-navigation-controller.mdx), but the active-descendant combobox does **not** — it manages the active option without moving DOM focus.

---

## ARIA and WCAG context

### Pattern in the APG

- `swc-option` is the `option` half of the [listbox pattern](https://www.w3.org/WAI/ARIA/apg/patterns/listbox/) and, in its first use, the [combobox pattern](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/). The APG requires that every child of a `listbox` be an `option` (or a `group` of options), that the selected option carry `aria-selected="true"`, and that a disabled option carry `aria-disabled="true"` while remaining perceivable.
- The APG describes two focus models for options: roving `tabindex` (DOM focus moves to the option) and active-descendant (DOM focus stays on a container, and the active option is referenced by `aria-activedescendant`). `swc-option`'s first consumer, `swc-combobox`, uses the **active-descendant** model, so `swc-option` is designed to be *referenced while not focused*. A future roving-tabindex listbox could reuse `swc-option` with parent-managed `tabindex`; that is out of scope here (see [Keyboard and focus](#keyboard-and-focus)).
- **Single host role.** `swc-option` exposes exactly one role, `option`, on its host. This does not conflict with the project's single-host-role policy or the forms strategy's "value-bearing role stays in shadow DOM" rule: an option is **not** a value-bearing form control. It has no live editable value to mirror; its entire state is `aria-selected` plus its name. That is precisely why the role can safely sit on the host (the same reasoning the forms strategy applies to button-like and radio-like controls), which is required for a cross-root `aria-activedescendant` reference to resolve to a node that is already an `option`.

### Guidelines that apply

| Idea | Plain meaning |
| --- | --- |
| [Name, role, value (4.1.2)](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html) | Each option exposes `role="option"`, an accessible name from its content, and its `aria-selected` state. Disabled options expose `aria-disabled="true"` and stay perceivable. |
| [Info and relationships (1.3.1)](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html) | The option is a child of a `listbox` and the target of the combobox's `aria-activedescendant`; that relationship must resolve programmatically even across a shadow boundary. |
| [Language of parts (3.1.2)](https://www.w3.org/WAI/WCAG22/Understanding/language-of-parts.html) | When an option's text is in a different language than the page, its `lang` must be present on the real option element so AT pronounces it correctly. Owning the option element (rather than re-rendering a shadow copy) is what preserves this — the structural fix for combobox's [SWC-2359](https://jira.corp.adobe.com/browse/SWC-2359). |
| [Use of color (1.4.1)](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html) | Selected and disabled states must not be signalled by color alone; pair color with `aria-selected` / `aria-disabled` and a non-color visual cue (checkmark, dimming plus reduced affordance). |
| [Non-text contrast (1.4.11)](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html) | The active-option indicator and the selected-option indicator must each meet 3:1 against adjacent colors and be distinguishable from one another. |

**Bottom line:** `swc-option` is a small component with one job — be a correctly-roled, correctly-named, correctly-stated `option` that a parent listbox or combobox can reference and select. Its accessibility value is concentrated in owning `role="option"` on a real, author-provided element so the parent's cross-root ARIA resolves and per-option `lang` survives.

---

## Related 1st-gen accessibility (Jira)

| Jira | Type | Status (snapshot) | Resolution (snapshot) | Summary |
| --- | --- | --- | --- | --- |
| [SWC-2359](https://jira.corp.adobe.com/browse/SWC-2359) | Bug | In Progress | Unresolved | Combobox should support `lang` on the option element ([WCAG 3.1.2](https://www.w3.org/WAI/WCAG22/Understanding/language-of-parts.html)); owning the option element is the structural fix |
| [SWC-592](https://jira.corp.adobe.com/browse/SWC-592) | Bug | To Do | Unresolved | Combobox a11y issues speaking the options — rooted in re-rendered shadow-copy options rather than real option elements |
| [SWC-534](https://jira.corp.adobe.com/browse/SWC-534) | Story | Done | Fixed | Extend the combobox option type to support a disabled state — `swc-option` owns `aria-disabled` |

---

## Recommendations: `<swc-option>`

Component tag may change until API freeze. `swc-option` is new in 2nd-gen; there is no 1st-gen `sp-option` to preserve compatibility with. Where behavior is inherited from a parent, this doc points at [`swc-combobox`](../combobox/accessibility-migration-analysis.md) rather than restating it.

### ARIA roles, states, and properties

| Topic | What to do |
| --- | --- |
| **Host role** | `option`, set on the host via `ElementInternals` (`internals.role = 'option'`). This is the whole point of the component: the role lives on the real, author-supplied element so a parent in a different shadow root can reference it. Do not put `menuitem` or any other role on `swc-option`, and do not move the role into the shadow root — a cross-root `aria-activedescendant` reference must land on a node that itself carries `role="option"`. |
| **Accessible name** | From the option's slotted label content by default. Provide a `textValue`-style string property for typeahead and for cases where the visible content is not plain readable text (icon-only, or label-plus-description), matching [React Spectrum's `textValue`](https://react-spectrum.adobe.com/ComboBox). Do not rely on a description slot for the name; the name is the label. |
| **`value` — separate from the label, always unique** | Each option carries a **`value`** property that identifies it for selection and form submission, **decoupled from the displayed label**. This separation is a deliberate fix for a real 1st-gen limitation: consumers with duplicate display text have no key to disambiguate on. `value` is what the combobox submits and what selection is keyed on; the label is what the user reads. Every option in a combobox must have a **unique `value`** across the whole widget (including options inside any [`swc-option-group`](../option-group/accessibility-migration-analysis.md)); the combobox **dev-warns** on a duplicate or missing `value`. A duplicate `value` makes selection ambiguous (the 1st-gen root of [SWC-23](https://jira.corp.adobe.com/browse/SWC-23)). |
| **Distinct label among siblings** | Sibling options — options sharing one parent (the combobox directly, or the same `swc-option-group`) — must have **distinct computed labels**, where the computed label is the option's text content **including the alt text of any icon or image** that visually distinguishes it. Two siblings that read identically to a screen reader (and look identical to a sighted user) cannot be told apart, so the combobox **dev-warns** when two sibling options compute to the same label. Options in *different* groups may repeat a label because the group name disambiguates them. Give near-identical options a distinguishing suffix, description, or image alt so the computed labels differ. |
| **`aria-selected`** | Reflects whether this option is the chosen value. Exactly one option per single-select listbox is `aria-selected="true"` at a time; the parent enforces that via the `LiveSelectionController`. Keep `aria-selected` distinct from *active* state: being the keyboard-active row (the combobox's `aria-activedescendant` target) is **not** selection and must not set `aria-selected`. This separation is the fix for 1st-gen conflating the two. |
| **`aria-disabled`, not native `disabled`** | Disabled options use `aria-disabled="true"` and stay in the listbox so screen reader users can perceive them and the parent can skip them during arrow traversal (a roving-`tabindex` listbox skips them via the `FocusgroupNavigationController`'s `skipDisabled`; the active-descendant combobox skips them in its own arrow handler). Do not use native `disabled` (it is not valid on the host and would risk removing the element from the accessibility tree). |
| **Active state (owned by the parent)** | The option does **not** set its own active state. The parent combobox marks the active option through `aria-activedescendant` / `ariaActiveDescendantElement`. `swc-option` should expose a hook (attribute or property) the parent can toggle purely for the *visual* active indicator, but that hook must not write `aria-selected` or any role-bearing ARIA — it is presentation only. |
| **`lang` passthrough** | Whatever `lang` the author sets on `<swc-option lang="…">` must remain on the element that carries `role="option"`, so AT pronounces the option in the right language ([WCAG 3.1.2](https://www.w3.org/WAI/WCAG22/Understanding/language-of-parts.html), [SWC-2359](https://jira.corp.adobe.com/browse/SWC-2359)). This is automatic when the host is the option element and there is no shadow-copy re-render. |
| **Decorative icon / avatar** | Icons and avatars inside an option are decorative reinforcement of the label and must be `aria-hidden="true"` (or otherwise excluded from the name) unless they carry information the label does not — in which case that information belongs in the accessible name via `textValue`, not in a separately-announced graphic. |
| **No interactive children** | Do not support buttons, links, or other interactive controls as option content; they break the single-activation, active-descendant model. Keep option content to text and decorative graphics. |

### Shadow DOM and cross-root ARIA Issues

`swc-option`'s own label and description render in its shadow root, and its accessible name computes from that content same-root, so the option has no internal cross-root problem. The cross-root relationship is **between the option and its parent**, and it is resolved on the parent's side: the combobox (or listbox) references the option via the `ariaActiveDescendantElement` and `ariaControlsElements` element-reference properties, which resolve across shadow boundaries — see [`swc-combobox`'s Shadow DOM section](../combobox/accessibility-migration-analysis.md#shadow-dom-and-cross-root-aria-issues).

What `swc-option` must guarantee for that to work: it carries `role="option"` **on the referenceable host** (not on an inner shadow node the parent cannot reach), and its `lang`, name, and `aria-selected`/`aria-disabled` state are all on that same host node. Because the option is the author's real element (slotted into the combobox or picker and projected into that parent's internal shadow-DOM listbox), there is no duplicate shadow-DOM copy to keep in sync — the defect class 1st-gen's re-render created ([SWC-592](https://jira.corp.adobe.com/browse/SWC-592), [SWC-2359](https://jira.corp.adobe.com/browse/SWC-2359)) does not exist here.

**Embedded case — demonstrated by proof of concept:** whether the parent's `ariaActiveDescendantElement` resolves to this option when it is projected by slot into a combobox's or picker's internal shadow-DOM listbox — and especially when it is nested one further level inside a `swc-option-group` — is shown to work by the [hybrid grouped-combobox POC](https://nikkimk.github.io/web-component-form-strategy-demos/demo-hybrid.html), where the active-descendant reference points at the option (never its group) across the slot projection. This is tracked on the parent side; see [`swc-combobox`'s Shadow DOM section](../combobox/accessibility-migration-analysis.md#shadow-dom-and-cross-root-aria-issues). `swc-option`'s obligation is only to keep the role and state on the referenceable host so the reference has a valid target.

Expected axe-core note: a `listbox` whose `option` children are slotted or cross-root can trip `aria-required-children`, because axe does not traverse the slot or element reference to find them. That is the **parent's** exclusion to document (per the [forms strategy axe policy](../../05_strategies/forms-strategy-rfc.md#34-axe-core-policy)); `swc-option` itself, scanned in isolation, simply exposes `role="option"` with a name and state.

### Accessibility tree expectations

- **Default option:** role `option`; name from label content (or `textValue`); `aria-selected` absent or `false`; not the active descendant.
- **Selected option:** role `option`; `aria-selected="true"`; exactly one per single-select listbox.
- **Active option (combobox open, arrowing):** role `option`; referenced by the combobox input's `aria-activedescendant`; visually indicated as active, but **not** `aria-selected` unless it is also the chosen value.
- **Disabled option:** role `option`; `aria-disabled="true"`; still present in the tree and perceivable; skipped by parent arrow traversal.
- **Localized option:** role `option`; carries its author `lang`, so AT switches pronunciation for that row.

### Keyboard and focus

In its default `swc-combobox` use, `swc-option` follows the **active-descendant** model: it is **not** a Tab stop, it does not receive DOM focus, and it does not handle its own arrow keys. DOM focus stays on the combobox input; the combobox moves the *active* option with its own arrow handler and reflects it through `aria-activedescendant` (it does not use the `FocusgroupNavigationController`, which would move DOM focus onto the option). Activation (choosing the option) is driven by the parent's <kbd>Enter</kbd> handling and by pointer clicks, which the option turns into a selection change the `LiveSelectionController` observes.

This is not the divider-style "permanently non-focusable decoration" case: the option is an interactive part of a composite widget, just one whose focus and key handling are owned by the parent rather than the option itself. If `swc-option` is reused inside a **focus-managing** listbox such as a picker's (roving `tabindex`, not the combobox), that parent would manage each option's `tabindex` and move DOM focus onto the option; `swc-option` should not hard-code `tabindex` in a way that prevents either model. Pointer users can click an option to select it in every model.

---

## Testing

### Automated tests

| Kind of test | What to check |
| --- | --- |
| **Unit** | `internals.role` is `option` on the host; `aria-selected` reflects selected state and is set on exactly the chosen option (never on the merely-active option); `aria-disabled="true"` is used for disabled options and native `disabled` is not; author `lang` remains on the host that carries the role; the visual active hook set by the parent writes no `aria-selected` or role ARIA; `textValue` feeds the accessible name for icon-only content. |
| **aXe + Storybook** | An option in isolation exposes `role="option"` with a name and no violations. A localized-option story asserting `lang` survives on the option element (regression guard for [SWC-2359](https://jira.corp.adobe.com/browse/SWC-2359)). A disabled-option story asserting `aria-disabled` and perceivability. Composed listbox/combobox stories carry the parent's documented `aria-required-children` exclusion, not a silent global disable. **All stories use distinct sibling labels and globally-unique `value`s;** exactly one dedicated dev-warning story deliberately pairs two identical sibling options (and a duplicate `value`) to assert the warning fires. Consumer docs explain the unique-`value` and distinct-sibling-label requirement. |
| **Playwright ARIA snapshots** | Within a composed `swc-combobox`: `option` children with correct names, `selected` state on only the chosen option, `disabled` state on disabled options, and correct `activedescendant` targeting from the input as the user arrows. |

### Manual screen reader testing

Test `swc-option` through its **composed** parent (`swc-combobox`), not in isolation, using [Screen reader testing](../../../../2nd-gen/packages/swc/.storybook/guides/accessibility-guides/screen_reader_testing.mdx) in NVDA, JAWS, and VoiceOver. Confirm that: arrowing through the open listbox announces each option's name once (including a localized option in its own language), the selected option is announced as selected, disabled options are announced as dimmed/unavailable and are skipped by arrow keys, and the active option announced by the combobox matches the visible active indicator. Verify cross-root exposure in **Firefox**, where element-reference ARIA is least consistent.

---

## Summary checklist

- [ ] `swc-option` sets `role="option"` on its host via `ElementInternals`, so a cross-root `aria-activedescendant` reference lands on a real, correctly-roled element.
- [ ] `swc-option` is a distinct component from [`swc-menu-item`](../menu-item/accessibility-migration-analysis.md) — `option` (a value you select), not `menuitem` (a command you run); no menu semantics or `submenu` slot.
- [ ] Each option has a `value` decoupled from its label; `value` is unique across the combobox; the combobox dev-warns on a duplicate or missing `value`.
- [ ] Sibling options have distinct computed labels (text content including image/icon alt); the combobox dev-warns on identical sibling labels; options in different groups may repeat a label.
- [ ] Stories use distinct sibling labels and unique values; one dedicated dev-warning story violates the rule; consumer docs explain it.
- [ ] `aria-selected` marks only the chosen value; the keyboard-active option is conveyed by the parent's `aria-activedescendant`, never by the option setting its own `aria-selected`.
- [ ] Disabled options use `aria-disabled="true"` and stay perceivable and skippable; native `disabled` is not used.
- [ ] Author `lang` survives on the option host that carries the role (fixes [SWC-2359](https://jira.corp.adobe.com/browse/SWC-2359)); no shadow-DOM duplicate of the option.
- [ ] Accessible name comes from label content, with a `textValue`-style property for typeahead / icon-only rows; decorative icons/avatars are `aria-hidden`.
- [ ] No interactive children inside an option.
- [ ] In the combobox active-descendant model the option is not a Tab stop and does not receive DOM focus; it does not hard-code `tabindex` in a way that blocks a future roving-tabindex listbox.
- [ ] Selected/disabled/active states are not conveyed by color alone; active and selected indicators are visually distinct and meet non-text contrast.
- [ ] Manual SR testing is done through the composed `swc-combobox`, including a localized option and Firefox.

## References

- [Combobox accessibility migration analysis (this repo)](../combobox/accessibility-migration-analysis.md) — the first consumer and the cross-root reference model.
- [Option group accessibility migration analysis (this repo)](../option-group/accessibility-migration-analysis.md) — the `role="group"` container for a set of options.
- [Menu item accessibility migration analysis (this repo)](../menu-item/accessibility-migration-analysis.md) — the `menuitem` sibling `swc-option` is deliberately not.
- [Forms strategy: 2nd-gen proposal (this repo)](../../05_strategies/forms-strategy-rfc.md) — role placement and cross-root ARIA policy.
- [WAI-ARIA](https://www.w3.org/TR/wai-aria-1.2/), [WCAG 2.2](https://www.w3.org/TR/WCAG22/), [APG: read me first](https://www.w3.org/WAI/ARIA/apg/practices/read-me-first/)
- [APG: listbox pattern](https://www.w3.org/WAI/ARIA/apg/patterns/listbox/) and [combobox pattern](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/)
- [`LiveSelectionController` (this repo)](../../../../2nd-gen/packages/core/controllers/live-selection-controller/live-selection-controller.mdx) and [`FocusgroupNavigationController` (this repo)](../../../../2nd-gen/packages/core/controllers/focusgroup-navigation-controller/focusgroup-navigation-controller.mdx)
- [React Spectrum: ComboBox](https://react-spectrum.adobe.com/ComboBox) — `ComboBoxItem` slots (`label`, `description`, icon, avatar) and `textValue`.
- [2nd-gen Storybook: Screen reader testing](../../../../2nd-gen/packages/swc/.storybook/guides/accessibility-guides/screen_reader_testing.mdx)

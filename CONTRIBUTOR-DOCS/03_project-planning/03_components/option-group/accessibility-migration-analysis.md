<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../../README.md) / [Project planning](../../README.md) / [Components](../README.md) / Option Group / Option group accessibility migration analysis

<!-- Document title (editable) -->

# Option group accessibility migration analysis

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
- [Recommendations: `<swc-option-group>`](#recommendations-swc-option-group)
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

This doc tells you how **`swc-option-group`** should work for **accessibility**. It matches the goal of **WCAG 2.2 Level AA**. `swc-option-group` is a new 2nd-gen component — there is no 1st-gen `sp-option-group`, and 1st-gen `sp-combobox` had no grouping at all. It is a labeled container that groups related [`swc-option`](../option/accessibility-migration-analysis.md) elements inside a listbox, implementing the APG [grouped listbox](https://www.w3.org/WAI/ARIA/apg/patterns/listbox/examples/listbox-grouped/) pattern for [`swc-combobox`](../combobox/accessibility-migration-analysis.md).

Like `swc-option`, its reason for existing is **role ownership**: it carries `role="group"` on its own host and names that group, so a combobox in a different shadow root can present grouped options with correct structure and correct group labels, without re-rendering shadow-DOM copies.

### Also read

- [Listbox accessibility migration analysis](../listbox/accessibility-migration-analysis.md) — the `role="listbox"` container that holds option groups (standalone, or inside a combobox/picker).
- [Combobox accessibility migration analysis](../combobox/accessibility-migration-analysis.md) — the consumer; options and option groups are its accepted children.
- [Option accessibility migration analysis](../option/accessibility-migration-analysis.md) — the `swc-option` rows this component groups; the sibling-label and unique-`value` rules are shared and defined there and in the combobox doc.
- [Menu group accessibility migration analysis](../menu-group/accessibility-migration-analysis.md) — the `role="group"` sibling in the menu family; same grouping idea, different (menu) context.

### What it is

- A **labeled group of options** inside a listbox: `role="group"` on the host, an accessible name for the group (from a slotted label or a label property), and one or more `swc-option` children in its default slot. Like an option, its parent may be a [`swc-listbox`](../listbox/accessibility-migration-analysis.md) (standalone), a [`swc-combobox`](../combobox/accessibility-migration-analysis.md), or a picker; in a combobox or picker it is authored in the parent's light DOM and projected by slot into the `swc-listbox` the parent renders in its shadow DOM.
- **The role lives on the `swc-option-group` host**, set via `ElementInternals` (`internals.role = 'group'`), for the same reason `swc-option` owns `role="option"`: the real, author-supplied element carries the correct role, so grouping survives across the shadow boundary between the combobox input and its options.
- A structural container only. It groups and labels; it is never itself selectable, focusable, or the target of `aria-activedescendant`.

### When to use something else

- A **flat list of options** with no categories — put `swc-option`s directly in the combobox; no group is needed.
- A **command menu** with sections — use [`swc-menu-group`](../menu-group/accessibility-migration-analysis.md) (`role="group"` among `menuitem`s), not `swc-option-group`. Groups of options and groups of commands are different patterns.
- A **visual divider** with no group semantics — use a separator element, not an empty group.

### What it is not

- Not an option. `swc-option-group` is never selectable and never carries `aria-selected`; its label is not a choosable value. Do not give it a `value` or let it become an `aria-activedescendant` target.
- Not a nesting container for more groups. The APG grouped-listbox pattern is one level deep: `listbox` → `group` → `option`. Do not nest `swc-option-group` inside another `swc-option-group`.
- Not a menu group. It must not carry `menu`/`menuitem`-family semantics.

### Related

- [`swc-listbox`](../listbox/accessibility-migration-analysis.md), [`swc-combobox`](../combobox/accessibility-migration-analysis.md), and [`swc-option`](../option/accessibility-migration-analysis.md) — the containers and the leaf this component sits between.
- [`swc-menu-group`](../menu-group/accessibility-migration-analysis.md) — the menu-family analogue.

---

## ARIA and WCAG context

### Pattern in the APG

- `swc-option-group` implements the group layer of the APG [grouped listbox example](https://www.w3.org/WAI/ARIA/apg/patterns/listbox/examples/listbox-grouped/): the `listbox` contains `group` elements, each `group` is named (via `aria-labelledby` pointing at its label, or `aria-label`), and each group's `option` children are its selectable rows. The group label itself is **not** an option and is not part of the selectable set.
- Grouping is presentational structure plus a name; it does not change how selection or active-descendant movement works. Arrowing moves from option to option across group boundaries as one linear sequence; the group only adds a spoken "group, [name]" context and a heading in the reading order.
- **Single host role.** `swc-option-group` exposes exactly one role, `group`, on its host — never conditional, never an option. This satisfies the single-host-role policy; the group is not a value-bearing control, so (like `swc-option`) the role sitting on the host is correct and is what lets grouping resolve across the shadow boundary.

### Guidelines that apply

| Idea | Plain meaning |
| --- | --- |
| [Info and relationships (1.3.1)](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html) | The group and its label must be programmatically associated (`role="group"` + `aria-labelledby`/`aria-label`), and the options must be exposed as children of the group, so AT conveys the category structure — not just visual spacing or a bold heading. |
| [Name, role, value (4.1.2)](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html) | The group exposes `role="group"` and an accessible name. The label is a name for the group, not a selectable node. |
| [Language of parts (3.1.2)](https://www.w3.org/WAI/WCAG22/Understanding/language-of-parts.html) | A group label (and its option children) in another language must carry `lang` on the real element so AT pronounces the category name and rows correctly. |
| [Headings and labels (2.4.6)](https://www.w3.org/WAI/WCAG22/Understanding/headings-and-labels.html) | Group labels must be descriptive and distinct, so a listener can tell one category from another. |

**Bottom line:** `swc-option-group` adds one thing — a named `role="group"` wrapper around a subset of options — and its accessibility job is to make that name and the group→option containment real and cross-root-safe, without becoming selectable itself.

---

## Related 1st-gen accessibility (Jira)

| Jira | Type | Status (snapshot) | Resolution (snapshot) | Summary | Notes |
| --- | --- | --- | --- | --- | --- |
| [SWC-592](https://jira.corp.adobe.com/browse/SWC-592) | Bug | To Do | Unresolved | Combobox a11y issues speaking the options | Grouping adds category context to option announcements; net-new in 2nd-gen (1st-gen combobox had no groups) |
| [SWC-1373](https://jira.corp.adobe.com/browse/SWC-1373) | Story | To Do | Unresolved | Spike: compare semantics across menu, action menu, combobox, and picker | Informs how option groups relate to menu groups |

---

## Recommendations: `<swc-option-group>`

Component tag may change until API freeze. `swc-option-group` is new in 2nd-gen; there is no 1st-gen equivalent to preserve compatibility with.

### ARIA roles, states, and properties

| Topic | What to do |
| --- | --- |
| **Host role** | `group`, set on the host via `ElementInternals` (`internals.role = 'group'`). Keep it on the real, author-supplied element so grouping survives across the boundary between the combobox input and its options. Do not use `menu`/`listbox` roles, and do not make the group itself an `option`. |
| **Group name** | Every group must be named. Provide the name via a slotted label rendered inside the group's shadow root (associated same-root with `aria-labelledby`) or an `accessible-label`-style string property that sets `aria-label`. An unnamed group defeats the purpose; dev-warn on a group with no accessible name (matching the project's `window.__swc.warn` pattern). |
| **Label is not selectable** | The group label element is presentational: it must not be an `option`, must not be focusable, and must not be an `aria-activedescendant` target. It participates in the reading order as the group's name only. |
| **Options are the children** | The group's default slot holds `swc-option` children. The group does not re-render or proxy them; they remain the author's real elements (owning their own `value`, `lang`, `aria-selected`, `aria-disabled`), so the combobox references them directly. See [`swc-option`](../option/accessibility-migration-analysis.md). |
| **Sibling-label distinctness within the group** | Options within one group are siblings for the distinct-label rule: two options in the same group must not have identical computed label text. Options in *different* groups may legitimately repeat a label because the group name disambiguates them. The combobox owns value-uniqueness across the whole widget and sibling-label distinctness within each option-parent scope (the combobox itself and each group); see [`swc-combobox`](../combobox/accessibility-migration-analysis.md#aria-roles-states-and-properties). |
| **No nested groups** | Do not support a `swc-option-group` inside another; the grouped-listbox pattern is one level deep. |
| **`lang` passthrough** | Author `lang` on the group or on any option child must remain on the real element carrying the role, per [WCAG 3.1.2](https://www.w3.org/WAI/WCAG22/Understanding/language-of-parts.html). |

### Shadow DOM and cross-root ARIA Issues

The group's own label renders in its shadow root and associates same-root (`aria-labelledby`/`aria-label`), so the group has no internal cross-root problem. The cross-root relationship is the same one the option has with the combobox: the combobox input, which may live in a different shadow root, references the **options** (not the group) via `ariaActiveDescendantElement`, and those references resolve because the options are the author's real elements. The group adds a containment layer that AT reads structurally; it does not need an IDREF from the input.

Because `swc-option-group` adds **one more nesting level** between the listbox and the option, it is the specific case that most needs verification: when a combobox or picker projects a group (and its options) by slot into its shadow `swc-listbox`, the parent's `ariaActiveDescendantElement` reference to an option *inside* the group must still resolve in real assistive technology. This is tracked on the combobox side; see [`swc-combobox`'s Shadow DOM section](../combobox/accessibility-migration-analysis.md#shadow-dom-and-cross-root-aria-issues). What `swc-option-group` must guarantee: `role="group"` and the group name live on the referenceable host, and the option children are not re-rendered as shadow copies (which would strip their `value`/`lang`/state and break the combobox's references). Expected axe-core note: the same `aria-required-children` false positive the combobox and listbox trigger applies through the group when options are slotted or cross-root; document it as a written exclusion on the composed story per the [forms strategy axe policy](../../05_strategies/forms-strategy-rfc.md#34-axe-core-policy), not a silent disable.

### Accessibility tree expectations

- **Named group:** role `group` with an accessible name; contains `option` children; not selectable; not the active descendant.
- **Grouped options:** each option exposes role `option` and its own name/state as usual; AT conveys it as within the named group.
- **Localized group:** the group label (and any localized option) carries its `lang`, so AT pronounces the category name and rows in the right language.
- **Arrowing across groups:** the active option moves linearly across group boundaries; the group name is announced as context when focus enters a new group, and the group itself is never the active descendant.

### Keyboard and focus

`swc-option-group` is **not focusable** and handles no keys. It is a structural container: DOM focus stays on the combobox input, and the parent moves the active option (via `aria-activedescendant`) linearly across group boundaries. The group label is never a Tab stop, never an active descendant, and never selectable. If `swc-option-group` is later reused inside a standalone roving-`tabindex` listbox, the parent listbox — not the group — would manage option `tabindex`; the group still holds no focus and handles no keys.

---

## Testing

### Automated tests

| Kind of test | What to check |
| --- | --- |
| **Unit** | `internals.role` is `group` on the host; the group has an accessible name (and dev-warns when it does not); the group label is not exposed as an `option` and is not focusable; option children keep their own `value`/`lang`/`aria-selected`/`aria-disabled` (not re-rendered by the group); no nested-group support. |
| **aXe + Storybook** | A grouped combobox story asserting `role="group"` with a name and `option` children within it, carrying the composed `aria-required-children` exclusion with a written `// reason:`. A localized-group story asserting `lang` survives on the group label and options. All grouped stories use distinct sibling labels within each group and globally-unique option `value`s; one dedicated dev-warning story pairs two identical sibling options within a group to assert the warning fires. |
| **Playwright ARIA snapshots** | Within a composed `swc-combobox`: named `group` nodes each containing their `option` children with correct names and states, and correct `activedescendant` targeting as the user arrows across group boundaries. |

### Manual screen reader testing

Test `swc-option-group` through its composed parent (`swc-combobox`), using [Screen reader testing](../../../../2nd-gen/packages/swc/.storybook/guides/accessibility-guides/screen_reader_testing.mdx) in NVDA, JAWS, and VoiceOver. Confirm that: entering a group announces the group name as context, arrowing moves across group boundaries without getting stuck on a label, each option is announced within its group, and a localized group name and rows are spoken in the correct language. Verify cross-root exposure in **Firefox**, where element-reference ARIA is least consistent.

---

## Summary checklist

- [ ] `swc-option-group` sets `role="group"` on its host via `ElementInternals`; grouping survives across the combobox/option shadow boundary.
- [ ] Every group has an accessible name; an unnamed group dev-warns.
- [ ] The group label is presentational — never an `option`, never focusable, never an `aria-activedescendant` target.
- [ ] Option children keep their own `value`, `lang`, and selected/disabled state; the group does not re-render them.
- [ ] Sibling-label distinctness is scoped within the group; options in different groups may repeat a label because the group name disambiguates; globally-unique option `value`s and the dev warning are enforced by the combobox.
- [ ] No nested option groups (grouped listbox is one level deep).
- [ ] Group and option `lang` survive on the real elements ([WCAG 3.1.2](https://www.w3.org/WAI/WCAG22/Understanding/language-of-parts.html)).
- [ ] Stories use distinct sibling labels and unique values; one dev-warning story deliberately violates the rule; consumer docs explain the requirement.
- [ ] Manual SR testing is done through the composed `swc-combobox`, including a localized group and Firefox.

## References

- [Combobox accessibility migration analysis (this repo)](../combobox/accessibility-migration-analysis.md) and [Option accessibility migration analysis (this repo)](../option/accessibility-migration-analysis.md) — the container and leaf this component sits between.
- [Menu group accessibility migration analysis (this repo)](../menu-group/accessibility-migration-analysis.md) — the menu-family `role="group"` analogue.
- [Forms strategy: 2nd-gen proposal (this repo)](../../05_strategies/forms-strategy-rfc.md) — role placement and cross-root ARIA policy.
- [WAI-ARIA](https://www.w3.org/TR/wai-aria-1.2/), [WCAG 2.2](https://www.w3.org/TR/WCAG22/), [APG: read me first](https://www.w3.org/WAI/ARIA/apg/practices/read-me-first/)
- [APG: listbox pattern](https://www.w3.org/WAI/ARIA/apg/patterns/listbox/) and [grouped listbox example](https://www.w3.org/WAI/ARIA/apg/patterns/listbox/examples/listbox-grouped/)
- [React Spectrum: ComboBox — sections](https://react-spectrum.adobe.com/ComboBox) (`ComboBoxSection` / `Header` grouping).
- [2nd-gen Storybook: Screen reader testing](../../../../2nd-gen/packages/swc/.storybook/guides/accessibility-guides/screen_reader_testing.mdx)

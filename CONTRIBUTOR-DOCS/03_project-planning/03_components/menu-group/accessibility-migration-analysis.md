<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../../README.md) / [Project planning](../../README.md) / [Components](../README.md) / Menu Group / Menu group accessibility migration analysis

<!-- Document title (editable) -->

# Menu group accessibility migration analysis

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [Overview](#overview)
    - [Migration scope (this phase)](#migration-scope-this-phase)
    - [Also read](#also-read)
    - [What `swc-menu-group` is (2nd-gen)](#what-swc-menu-group-is-2nd-gen)
    - [When to use something else](#when-to-use-something-else)
- [ARIA and WCAG context](#aria-and-wcag-context)
    - [Pattern in the APG](#pattern-in-the-apg)
    - [Guidelines that apply](#guidelines-that-apply)
- [Related 1st-gen accessibility (Jira)](#related-1st-gen-accessibility-jira)
- [Recommendations: `<swc-menu-group>`](#recommendations-swc-menu-group)
    - [ARIA roles, states, and properties](#aria-roles-states-and-properties)
    - [Shadow DOM and cross-root ARIA Issues](#shadow-dom-and-cross-root-aria-issues)
    - [Accessibility tree expectations](#accessibility-tree-expectations)
    - [Form-associated custom properties (labels, `ElementInternals`)](#form-associated-custom-properties-labels-elementinternals)
    - [Live regions, loading, and announcements](#live-regions-loading-and-announcements)
    - [Motion (dedicated recommendations subsection)](#motion-dedicated-recommendations-subsection)
    - [Keyboard and focus](#keyboard-and-focus)
- [Testing](#testing)
    - [Automated tests](#automated-tests)
    - [Keyboard testing](#keyboard-testing)
    - [Manual and screen reader testing](#manual-and-screen-reader-testing)
- [Summary checklist](#summary-checklist)
- [References](#references)

</details>

<!-- Document content (editable) -->

## Overview

This document sets accessibility expectations for 2nd-gen **Menu group** in Spectrum Web Components: **`swc-menu-group`** as a labeled grouping of [`menuitem`](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/) rows inside a parent [`role="menu"`](../menu/accessibility-migration-analysis.md) surface. It is not a stand-alone widget; it only makes sense inside `swc-menu` (or an equivalent menu tree). The target is **WCAG 2.2 Level AA**.

### Migration scope (this phase)

- **`menuitemcheckbox` / `menuitemradio` and selection UX** (including groupings of selectable rows) are **out of scope** for this migration phase—align with [Menu — Migration scope (current)](../menu/accessibility-migration-analysis.md#migration-scope-current). This doc addresses **plain command** structure and **`role="group"`** for non-selectable rows only.
- **Mobile tray**, **menu item selection modes**, and **checkbox / radio** keyboard behavior remain governed by the menu doc’s scope; do not document them as locked for 2nd-gen here.

### Also read

- [Menu accessibility migration analysis](../menu/accessibility-migration-analysis.md) for `role="menu"`, `swc-menu`, placement, controller split, and [migration scope](../menu/accessibility-migration-analysis.md#migration-scope-current).
- [Menu item accessibility migration analysis](../menu-item/accessibility-migration-analysis.md) for `swc-menu-item`, `menuitem` rows, submenus, and link rows.
- [Menu divider accessibility migration analysis](../menu-divider/accessibility-migration-analysis.md) for **`swc-menu-divider`** (**`separator`** lines between items).
- [Action menu accessibility migration analysis](../action-menu/accessibility-migration-analysis.md) for the trigger and composed `swc-action-menu` + `swc-menu` tree.

### What `swc-menu-group` is (2nd-gen)

- A **group** is a logical section of a menu: a container with [`role="group"`](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/) inside `role="menu"`, optionally with a visible label. It **organizes** `swc-menu-item` / `menuitem` children; it is **not** itself a `menuitem` and does not receive roving focus as a single stop—focus moves among **items** per the [menu button pattern](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/) and `FocusgroupNavigationController` (see [PR #6129](https://github.com/adobe/spectrum-web-components/pull/6129)).
- **Labeled section (recommended wiring):** Treat the **menu header** row as **not** a command item: in APG-style markup this is commonly an **`li`** with **`role="none"`** holding the visible section title text. The **collection of menuitem rows** that belongs to that section—in markup, often the **`ul`** (or equivalent list surface) **immediately following** that header—must expose the **same** section name on that grouped surface using **`aria-labelledby`** referencing the header’s **`id`** (preferred) **or** **`aria-label`** **with the identical string** so the **group’s accessible name matches the header text verbatim**. **`swc-menu-group`** should realize the same relationships in shadow / light DOM when 2nd-gen lands (**verify attribute wiring in source**); do **not** leave the grouped rows unnamed while a visible header exists.

### When to use something else

- **No menu context** — do not use `swc-menu-group` outside a `role="menu"` subtree; use **field groups**, **headings**, or **lists** in page content instead.
- **Site navigation or a list of links** — prefer a **navigation** pattern ([disclosure navigation](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/), landmarks, link lists) rather than a command menu; see [Menu — When to use something else](../menu/accessibility-migration-analysis.md#when-to-use-something-else).

---

## ARIA and WCAG context

### Pattern in the APG

- [Menu button](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/) — menus may contain **`group`** elements to organize **`menuitem`** rows; groups can be labeled. Section **headers** in menu markup are often authored as **non-item** rows (**`role="none"`**) with the **following group or list** labelled to **match** the header (**see [Editor Menubar example](https://www.w3.org/WAI/ARIA/apg/patterns/menubar/examples/menubar-editor/)** for reference patterns).
- Selection-related **`menuitemcheckbox`** / **`menuitemradio`** groupings are **out of scope** this phase (see [Menu — Migration scope](../menu/accessibility-migration-analysis.md#migration-scope-current)).

### Guidelines that apply

| Idea | Plain meaning |
| --- | --- |
| [Name, role, value (4.1.2)](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value) | `role="group"` inside `role="menu"` when used; labeled groups expose a **name** via `aria-labelledby` or `aria-label`. |
| [Info and relationships (1.3.1)](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships) | Visible **section header** text aligns with the **accessible name** on the **following grouped list / group region** (**`aria-labelledby`** or matching **`aria-label`**—same text as the header). |

Bottom line: **`swc-menu-group`** carries **structure and section labeling**: a **header** row with **`role="none"`** plus a **named group** whose accessible name matches that header; navigation and submenu behavior stay on **menu**, **menu item**, and **action menu** docs.

---

## Related 1st-gen accessibility (Jira)

Treat **menu-wide** defects as authoritative in [Menu — Related 1st-gen accessibility (Jira)](../menu/accessibility-migration-analysis.md#related-1st-gen-accessibility-jira). Add rows here only when an issue narrowly targets **`sp-menu-group`** / group labeling; otherwise omit and rely on that table.

---

## Recommendations: `<swc-menu-group>`

Scope: **`role="group"`** (or equivalent), **optional label**, **`menuitem`** children only for this phase—no **`menuitemcheckbox` / `menuitemradio`** selection groups until [Menu migration scope](../menu/accessibility-migration-analysis.md#migration-scope-current) closes.

### ARIA roles, states, and properties

| Topic | What to do |
| --- | --- |
| Host / surface | **`role="group"`** on the `swc-menu-group` surface (or equivalent wiring—verify in 2nd-gen source). Parent **must** be a **`role="menu"`** subtree. |
| Section header row | The **visible header** for the section is **not** a **`menuitem`**: expose it with **`role="none"`** on the header row (APG-style **`li`** pattern) so it does not register as a selectable command. Keyboard roving still targets **`menuitem`** descendants only. |
| Group name = header text | The **group** for the following **`menuitem`** rows (nested **`ul`** in native examples, or the **`swc-menu-group`** grouping region in SWC) **must** get its accessible name from **`aria-labelledby`** pointing at the header element **or** **`aria-label`**—**same text** as the header. Do **not** use an unlabeled group when a visible header exists. |
| Children | Command rows: **`swc-menu-item`** (**`menuitem`**) and [`swc-menu-divider`](../menu-divider/accessibility-migration-analysis.md) (**`separator`**) as applicable. **Section header** row: **`role="none"`** (**not** **`menuitem`**). |
| Checkbox / radio groups | **`menuitemcheckbox` / `menuitemradio`** rows and **selection UX** — **out of scope** this phase; see [Menu — Migration scope](../menu/accessibility-migration-analysis.md#migration-scope-current). |

### Shadow DOM and cross-root ARIA Issues

Keep **`aria-labelledby`** targets in the **same composable subtree** as the group and its label nodes so **IDREFs** do not cross unrelated shadow roots (same rule as [Menu — Shadow DOM](../menu/accessibility-migration-analysis.md#shadow-dom-and-cross-root-aria-issues)).

### Accessibility tree expectations

- The group is a **sectioning** node inside the menu: assistive technologies should hear a **stable section name** derived from the header, shared with the grouped list via **`aria-labelledby`** or matching **`aria-label`**.
- The **header row** contributes **name** (and is **`role="none"`**), not **`menuitem`** semantics.
- Child **command rows** expose **`menuitem`** (or separator) per the [menu item doc](../menu-item/accessibility-migration-analysis.md).

### Form-associated custom properties (labels, `ElementInternals`)

Does not apply. `swc-menu-group` is not a form-associated control; **section** labeling is via **`aria-labelledby`** / **`aria-label`** on the **group** (aligned with the **`role="none"`** header row), not `ElementInternals`.

### Live regions, loading, and announcements

Does not apply to the group host by default; announcements belong to **items** or **app chrome** if needed.

### Motion (dedicated recommendations subsection)

Intentionally omitted. If grouped regions affect motion, follow the **menu** / **popover** docs for layered UI.

### Keyboard and focus

Roving **`tabindex`** and **arrow-key** traversal are **managed for `menuitem` descendants** by the shared **menu** navigation model ([`FocusgroupNavigationController`](https://github.com/adobe/spectrum-web-components/pull/6129)); the **group** itself is not an extra Tab stop. Document edge cases where **screen readers** announce the **group label** when moving from a previous section (verify in implementation and manual testing).

---

## Testing

### Automated tests

| Kind of test | What to check |
| --- | --- |
| Unit / aXe + Storybook | `role="group"` and label wiring when a label is present; group appears inside menu stories; no **invalid** child roles. |
| With menu | Run **menu** and **action menu** story coverage; add **group** variants when group-specific bugs are filed. |

### Keyboard testing

Follow the 2nd-gen Storybook [Keyboard testing](../../../../2nd-gen/packages/swc/.storybook/guides/accessibility-guides/keyboard_testing.mdx) guide on a **composed** path with `swc-menu` (see [Menu — Keyboard testing](../menu/accessibility-migration-analysis.md#keyboard-testing)). Confirm **arrow** navigation across **group boundaries** and that **group labels** do not trap focus or break roving order.

### Manual and screen reader testing

Exercise **menu** stories that include **labeled groups**; confirm group **names** are discoverable and that behavior matches [Menu — Manual and screen reader testing](../menu/accessibility-migration-analysis.md#manual-and-screen-reader-testing-mandatory-host-alone). Use [Screen reader testing](../../../../2nd-gen/packages/swc/.storybook/guides/accessibility-guides/screen_reader_testing.mdx) as needed.

---

## Summary checklist

- [ ] `swc-menu-group` is used only inside a **`role="menu"`** tree; **section header** rows use **`role="none"`**; the **following grouped list / group region** uses **`aria-labelledby`** (or matching **`aria-label`**) so its name **matches the header text**.
- [ ] **`menuitemcheckbox` / `menuitemradio`** groupings are **not** documented as in-scope for this phase ([Menu migration scope](../menu/accessibility-migration-analysis.md#migration-scope-current)).
- [ ] Cross-root **IDREF** rules match [Menu](../menu/accessibility-migration-analysis.md) / [Action menu](../action-menu/accessibility-migration-analysis.md).
- [ ] Keyboard testing follows the **menu** composed pattern and Storybook guides above.

---

## References

- [Menu accessibility migration analysis](../menu/accessibility-migration-analysis.md)
- [Menu divider accessibility migration analysis](../menu-divider/accessibility-migration-analysis.md)
- [Menu item accessibility migration analysis](../menu-item/accessibility-migration-analysis.md)
- [Action menu accessibility migration analysis](../action-menu/accessibility-migration-analysis.md)
- [WAI-ARIA APG: Menu button](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/)
- [WAI-ARIA APG: Editor Menubar example](https://www.w3.org/WAI/ARIA/apg/patterns/menubar/examples/menubar-editor/) (study submenu **section headers** and **`role="none"`** patterns alongside grouped items)
- [spectrum-web-components PR #6129 — Focusgroup navigation controller](https://github.com/adobe/spectrum-web-components/pull/6129)
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- [2nd-gen Storybook: Keyboard testing](../../../../2nd-gen/packages/swc/.storybook/guides/accessibility-guides/keyboard_testing.mdx)
- [2nd-gen Storybook: Screen reader testing](../../../../2nd-gen/packages/swc/.storybook/guides/accessibility-guides/screen_reader_testing.mdx)

<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../../README.md) / [Project planning](../../README.md) / [Components](../README.md) / Menu Group / Menu group accessibility migration analysis

<!-- Document title (editable) -->

# Menu group accessibility migration analysis

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [Overview](#overview)
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

This document sets accessibility expectations for 2nd-gen **Menu group** in Spectrum Web Components: **`swc-menu-group`** as a labeled grouping of [`menuitem`](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/) rows inside the **internal** [`role="menu"`](../menu/accessibility-migration-analysis.md) **subtree**—the **element** with **`role="menu"`** **inside** **`swc-menu` / `swc-action-menu`’s** **shadow** **DOM** (**not** on the **custom** **element** **host**). It is not a stand-alone widget; it only makes sense **slotted** into that **menu** **surface** (or an **equivalent** **menu** **tree** in **tests**). The target is **WCAG 2.2 Level AA**.

### Also read

- [Menu accessibility migration analysis](../menu/accessibility-migration-analysis.md) for **`role="menu"`** (**internal** **shadow** **surface**), `swc-menu`, placement, controller split, and [migration scope](../menu/accessibility-migration-analysis.md#migration-scope-current).
- [Menu item accessibility migration analysis](../menu-item/accessibility-migration-analysis.md) for `swc-menu-item`, `menuitem` rows, submenus, and link rows.
- [Menu separator accessibility migration analysis](../menu-separator/accessibility-migration-analysis.md) for **`swc-menu-divider`** (**`separator`** lines between items).
- [Action menu accessibility migration analysis](../action-menu/accessibility-migration-analysis.md) for **`swc-action-menu`**, a full menu-button **host** parallel to `swc-menu` (ActionMenu / “**more**” **defaults**).

### What `swc-menu-group` is (2nd-gen)

- A **group** is a logical section of a menu: a container with [`role="group"`](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/) **descended** from the **internal** **`role="menu"`** **surface** (**`swc-menu` / `swc-action-menu` shadow** **markup**), optionally with a visible label. It **organizes** `swc-menu-item` / `menuitem` children; it is **not** itself a `menuitem` and does not receive roving focus as a single stop—focus moves among **items** per the [menu button pattern](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/) and `FocusgroupNavigationController` (see [PR #6129](https://github.com/adobe/spectrum-web-components/pull/6129)).
- **Reference implementation (2nd-gen target):** Implement **`swc-menu-group`** like the following structure: a **`role="group"`** container **inside** **`role="menu"`** uses **`aria-labelledby`** pointing at a **dedicated section-title node** (**stable `id`**); that title node carries **`role="presentation"`** (it is **not** a **`menuitem`**) and holds the visible **section label** text; **`menuitem`** rows are **siblings** of the title **inside** the same **`group`** (not a separate nested **`<ul`** after a header row unless the implementation requires it—**verify in 2nd-gen source**).

```html
<div role="menu" aria-label="Example Menu">
  <div role="group" aria-labelledby="group-label">
    <div id="group-label" role="presentation">Section Title</div>
    <div role="menuitem">Item 1</div>
    <div role="menuitem">Item 2</div>
  </div>
</div>
```

- **Naming:** The **group’s** accessible name comes from **`aria-labelledby="group-label"`** (preferred when a visible title exists) **or** **`aria-label`** with the **same string** as the visible section title. Other host-DOM patterns (for example **`li`** **`+`** **`role="none"`** for list-item menus) can be equivalent if they preserve the same **IDREF** and **name** relationships—**`role="presentation"`** on the **label** node above is the **default** pattern for **`swc-menu-group`**.

### When to use something else

- **No menu context** — do not use `swc-menu-group` outside the **internal** **`role="menu"`** **subtree** of **`swc-menu` / `swc-action-menu`**; use **field groups**, **headings**, or **lists** in page content instead.
- **Site navigation or a list of links** — prefer a **navigation** pattern ([disclosure navigation](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/), landmarks, link lists) rather than a command menu; see [Menu — When to use something else](../menu/accessibility-migration-analysis.md#when-to-use-something-else).

---

## ARIA and WCAG context

### Pattern in the APG

- [Menu button](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/) — menus may contain **`group`** elements to organize **`menuitem`** rows; groups can be labeled via **`aria-labelledby`** / **`aria-label`**. Section titles are **not** **`menuitem`**—often **`role="presentation"`** (or **`none`**) on a label element **referenced** by the **`group`** (**see [Editor Menubar example](https://www.w3.org/WAI/ARIA/apg/patterns/menubar/examples/menubar-editor/)** for related patterns).
- Selection-related **`menuitemcheckbox`** / **`menuitemradio`** groupings are **out of scope** this phase (see [Menu — Migration scope](../menu/accessibility-migration-analysis.md#migration-scope-current)).

### Guidelines that apply

| Idea | Plain meaning |
| --- | --- |
| [Name, role, value (4.1.2)](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value) | `role="group"` inside `role="menu"` when used; labeled groups expose a **name** via `aria-labelledby` or `aria-label`. |
| [Info and relationships (1.3.1)](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships) | Visible **section title** text aligns with the **`group`’**s **accessible name** (**`aria-labelledby`** to the title node’s **`id`**, or matching **`aria-label`**). |

Bottom line: **`swc-menu-group`** carries **structure and section labeling**: **`role="group"`** **`+`** **`aria-labelledby`** to a **presentation** (non-**`menuitem`**) **label** node **+** sibling **`menuitem`** rows—navigation and submenu behaviour stay on **menu**, **menu item**, and **action menu** docs.

---

## Related 1st-gen accessibility (Jira)

Treat **menu-wide** defects as authoritative in [Menu — Related 1st-gen accessibility (Jira)](../menu/accessibility-migration-analysis.md#related-1st-gen-accessibility-jira). Add rows here only when an issue narrowly targets **`sp-menu-group`** / group labeling; otherwise omit and rely on that table.

---

## Recommendations: `<swc-menu-group>`

Scope: **`role="group"`** (or equivalent), **optional label**, **`menuitem`** children only for this phase—no **`menuitemcheckbox` / `menuitemradio`** selection groups until [Menu migration scope](../menu/accessibility-migration-analysis.md#migration-scope-current) closes.

### ARIA roles, states, and properties

| Topic | What to do |
| --- | --- |
| Host / surface | **`role="group"`** on the `swc-menu-group` surface (or equivalent wiring—verify in 2nd-gen source). The **containing** **`role="menu"`** **must** be the **internal** **menu** **node** in **`swc-menu` / `swc-action-menu`’s** **shadow** **tree** (**not** the **CE** **host**). |
| Section title (label) node | **Not** a **`menuitem`**. Use **`role="presentation"`** on the visible **section title** element, give it a **stable `id`**, and reference that **`id`** from **`aria-labelledby`** on the **`role="group"`** host (**see [reference HTML](#what-swc-menu-group-is-2nd-gen)**). Keyboard roving targets **`menuitem`** (and **`separator`**) only. |
| Group name | The **`swc-menu-group`** host **`aria-labelledby`** must resolve to the section-title **`id`** **or** use **`aria-label`** with the **identical** string as the visible title. Do **not** ship a labeled section with an unnamed **`group`**. |
| Children | **Inside** the **`group`**: the **title** node (**`role="presentation"`**, **`id`**) **then** **`swc-menu-item`** (**`menuitem`**) and [`swc-menu-divider`](../menu-separator/accessibility-migration-analysis.md) (**`separator`**) as **siblings**—same flat section as the reference markup unless 2nd-gen DOM requires otherwise (**verify in source**). |
| Checkbox / radio groups | **`menuitemcheckbox` / `menuitemradio`** rows and **selection UX** — **out of scope** this phase; see [Menu — Migration scope](../menu/accessibility-migration-analysis.md#migration-scope-current). |

### Shadow DOM and cross-root ARIA Issues

Follow [Menu — Shadow DOM](../menu/accessibility-migration-analysis.md#shadow-dom-and-cross-root-aria-issues): slotted `swc-menu-group` (and its rows) do not have to be in the same DOM as the menu-button trigger or every node in the host tree around the internal `role="menu"`. Within the group, `aria-labelledby` on `role="group"` to the section title `id` should still resolve in the implementation’s composed section; if pairing IDs across roots fails, use `aria-label`, re-home the label node, or other naming strategies 2nd-gen documents in source—not a requirement that all menu list content and the trigger live in one flat subtree.

### Accessibility tree expectations

- The **`group`** exposes a **name** (**`aria-labelledby`** to the **`id`** on the presentation title node, or **`aria-label`**).
- The **section title** uses **`presentation`** (not **`menuitem`**); its **text** supplies the **`group`** name via **`aria-labelledby`**.
- Child **command rows** expose **`menuitem`** (or separator) per the [menu item doc](../menu-item/accessibility-migration-analysis.md).

### Form-associated custom properties (labels, `ElementInternals`)

Does not apply. `swc-menu-group` is not a form-associated control; labeling is **`aria-labelledby`** / **`aria-label`** on the **`group`** and **`id`** / **`presentation`** on the **title** node, not `ElementInternals`.

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

- [ ] `swc-menu-group` is used only inside the **internal** **`role="menu"`** **subtree** (**`swc-menu` / `swc-action-menu` shadow** **surface**, **not** the **CE** **host**); **`role="group"`** **`+`** **`aria-labelledby`** reference to a **`role="presentation"`** section-title node (**stable `id`**) **+** sibling **`menuitem`** rows (see [reference HTML](#what-swc-menu-group-is-2nd-gen)); **`aria-label`** alternative matches visible title text.
- [ ] **`menuitemcheckbox` / `menuitemradio`** groupings are **not** documented as in-scope for this phase ([Menu migration scope](../menu/accessibility-migration-analysis.md#migration-scope-current)).
- [ ] Shadow DOM and IDREF expectations match [Menu — Shadow DOM](../menu/accessibility-migration-analysis.md#shadow-dom-and-cross-root-aria-issues) and [Action menu](../action-menu/accessibility-migration-analysis.md) (slotted group and rows need not co-locate with the menu-button trigger; group ↔ label pairing still resolves as implemented).
- [ ] Keyboard testing follows the **menu** composed pattern and Storybook guides above.

---

## References

- [Menu accessibility migration analysis](../menu/accessibility-migration-analysis.md)
- [Menu separator accessibility migration analysis](../menu-separator/accessibility-migration-analysis.md)
- [Menu item accessibility migration analysis](../menu-item/accessibility-migration-analysis.md)
- [Action menu accessibility migration analysis](../action-menu/accessibility-migration-analysis.md)
- [WAI-ARIA APG: Menu button](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/)
- [WAI-ARIA APG: Editor Menubar example](https://www.w3.org/WAI/ARIA/apg/patterns/menubar/examples/menubar-editor/) (study submenu **section titles** alongside grouped **`menuitem`** rows)
- [WAI-ARIA: `presentation`](https://www.w3.org/TR/wai-aria/#presentation)
- [spectrum-web-components PR #6129 — Focusgroup navigation controller](https://github.com/adobe/spectrum-web-components/pull/6129)
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- [2nd-gen Storybook: Keyboard testing](../../../../2nd-gen/packages/swc/.storybook/guides/accessibility-guides/keyboard_testing.mdx)
- [2nd-gen Storybook: Screen reader testing](../../../../2nd-gen/packages/swc/.storybook/guides/accessibility-guides/screen_reader_testing.mdx)

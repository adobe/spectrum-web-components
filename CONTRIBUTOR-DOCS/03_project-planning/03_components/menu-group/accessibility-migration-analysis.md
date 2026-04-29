<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../../README.md) / [Project planning](../../README.md) / [Components](../README.md) / Menu Group / Menu group accessibility migration analysis

<!-- Document title (editable) -->

# Menu group accessibility migration analysis

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [Overview](#overview)
    - [In short](#in-short)
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

This page is for 2nd-gen `swc-menu-group` in Spectrum Web Components. A group is a [labeled section of `menuitem`](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/) rows. Goal: [WCAG 2.2](https://www.w3.org/TR/WCAG22/) Level AA.

### In short

- Put `swc-menu-group` only as a **direct** list child of `swc-menu`, `swc-action-menu`, or `swc-menu-item` (submenu when that item’s `submenu` slot is used). Do not nest one group inside another in the same list. Check 2nd-gen source for exact slotting.
- **Label** slot: section title. **Default** slot: only `swc-menu-item` in current migration. Put `swc-menu-separator` at the list level, not in the group ([separator doc](../menu-separator/accessibility-migration-analysis.md)).
- The parent’s `role="menu"` is in that host’s shadow tree, not the CE. This component does not own roving focus—the parent and [`FocusgroupNavigationController`](https://github.com/adobe/spectrum-web-components/pull/6129) do ([Keyboard and focus](#keyboard-and-focus)).

In tests, mirror the same list placement and internal `role="menu"` shape.

### Also read

- [Menu a11y doc](../menu/accessibility-migration-analysis.md) — internal `role="menu"`, `swc-menu`, controller split, [scope](../menu/accessibility-migration-analysis.md#migration-scope-current).
- [Menu item a11y doc](../menu-item/accessibility-migration-analysis.md) — rows, submenus, links.
- [Menu separator a11y doc](../menu-separator/accessibility-migration-analysis.md) — `swc-menu-separator` as a direct list row, not in a group’s default slot.
- [Action menu a11y doc](../action-menu/accessibility-migration-analysis.md) — `swc-action-menu` as a full host next to `swc-menu` (ActionMenu / “more”).

### What `swc-menu-group` is (2nd-gen)

- A group adds [`role="group"`](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/) when it is a direct list child of `swc-menu`, `swc-action-menu`, or `swc-menu-item`, next to the parent’s internal `role="menu"` in shadow DOM ([Overview](#overview)). The label slot is the section title. The default slot accepts only `swc-menu-item` in current scope. A group is not a `menuitem` and does not run arrow-key logic—the parent and [`FocusgroupNavigationController`](https://github.com/adobe/spectrum-web-components/pull/6129) do ([Keyboard and focus](#keyboard-and-focus)).
- **Nesting:** do not put one `swc-menu-group` inside another in the same list. Sibling groups and items in one list are fine. A submenu (child `role="menu"` on an item) is a new list and may have its own groups. Item `label` / `submenu` details: [Menu item — What `swc-menu-item` is (2nd-gen)](../menu-item/accessibility-migration-analysis.md#what-swc-menu-item-is-2nd-gen).
- **Slots:** `label` + default (items only in current migration). Check 2nd-gen source for API changes.
- **Shadow DOM (2nd-gen target, verify in source):** the shadow tree should wire:
  1. A container with `role="group"`. It sets `aria-labelledby` to the **`id`** on the presentation label wrapper in the same composed subtree (IDREF to that node).
  2. A container with `role="presentation"` and a **stable** `id`. It wraps the **label** slot; it is not a `menuitem`. The group’s accessible name is derived from this node via `aria-labelledby`, or from `aria-label` on the `role="group"` node when that pattern is used.
  3. A **default** slot for **`swc-menu-item`** **rows** only (current scope), in the order the parent menu’s list model expects.
- The exposed accessibility **shape** for the section should still match this logical (flattened) example when composed under `role="menu"`:
```html
<div role="menu" aria-label="Example Menu">
  <div role="group" aria-labelledby="group-label">
    <div id="group-label" role="presentation">Section Title</div>
    <div role="menuitem">Item 1</div>
    <div role="menuitem">Item 2</div>
  </div>
</div>
```

- **Naming:** Prefer `aria-labelledby` to the `id` on the `role="presentation"` label wrapper when a visible title exists; otherwise `aria-label` on the `role="group"` node with the same string as the visible title. `role="presentation"` (or `none`) on the label node remains the default; other host patterns are fine if they preserve the same IDREF and name relationship (see [APG](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/)).

### When to use something else

- **No valid parent** — do not use `swc-menu-group` unless its **parent** is **`swc-menu`**, **`swc-action-menu`**, or **`swc-menu-item`** in a **valid** **menu** or **submenu** **list** (see [Overview](#overview)); use field groups, headings, or lists in page content instead.
- **Group inside group in one list** — do not author `swc-menu-group` as a child of another `swc-menu-group` in the same `role="menu"` list. Use a **submenu** if you need a grouped section *below* a section that already uses `swc-menu-group`, or flatten into sibling groups; see the **Nesting** bullet in [What `swc-menu-group` is (2nd-gen)](#what-swc-menu-group-is-2nd-gen).
- **Site navigation or a list of links** — prefer a **navigation** pattern ([disclosure navigation](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/), landmarks, link lists) rather than a command menu; see [Menu — When to use something else](../menu/accessibility-migration-analysis.md#when-to-use-something-else).

---

## ARIA and WCAG context

### Pattern in the APG

- [Menu button](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/) — menus may contain **`group`** elements to organize **`menuitem`** rows; groups can be labeled via **`aria-labelledby`** / **`aria-label`**. Section titles are **not** **`menuitem`**—often **`role="presentation"`** (or **`none`**) on a label element **referenced** by the **`group`** (**see [Editor Menubar example](https://www.w3.org/WAI/ARIA/apg/patterns/menubar/examples/menubar-editor/)** for related patterns).
- Selection-related **`menuitemcheckbox`** / **`menuitemradio`** groupings are **out of scope** this phase (see [Menu — Migration scope](../menu/accessibility-migration-analysis.md#migration-scope-current)).

### Guidelines that apply

| Idea | Plain meaning |
| --- | --- |
| [Name, role, value (4.1.2)](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value) | `role="group"` inside `role="menu"` when used; labeled groups expose a **name** via `aria-labelledby` or `aria-label`. Each `swc-menu-item` in the default slot uses `aria-disabled="true"` when that row is disabled, same as [Menu item — ARIA: Disabled row](../menu-item/accessibility-migration-analysis.md#aria-roles-states-and-properties) (the `group` host does not set `aria-disabled` on the section). |
| [Info and relationships (1.3.1)](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships) | Visible **section title** text aligns with the **`group`’**s **accessible name** (**`aria-labelledby`** to the title node’s **`id`**, or matching **`aria-label`**). |

**Bottom line:** `swc-menu-group` gives structure and a name (`role="group"`, `presentation` label wrapper, default slot for rows). It does not own in-menu focus—the parent `swc-menu` / `swc-action-menu` / `swc-menu-item` list and [`FocusgroupNavigationController`](https://github.com/adobe/spectrum-web-components/pull/6129) do. For submenus and commands, see the menu, menu item, and action menu docs.

---

## Related 1st-gen accessibility (Jira)

Treat **menu-wide** defects as authoritative in [Menu — Related 1st-gen accessibility (Jira)](../menu/accessibility-migration-analysis.md#related-1st-gen-accessibility-jira). Add rows here only when an issue narrowly targets **`sp-menu-group`** / group labeling; otherwise omit and rely on that table.

---

## Recommendations: `<swc-menu-group>`

**Scope:** `role="group"` (or the same in implementation), only as a direct child of `swc-menu`, `swc-action-menu`, or `swc-menu-item`, with `label` and `default` slots as in [What `swc-menu-group` is (2nd-gen)](#what-swc-menu-group-is-2nd-gen). Default slot: `swc-menu-item` only in current scope. Checkboxes and radios: out until [Menu migration scope](../menu/accessibility-migration-analysis.md#migration-scope-current) closes.

### ARIA roles, states, and properties

| Topic | What to do |
| --- | --- |
| Host / surface | Direct list child of `swc-menu`, `swc-action-menu`, or `swc-menu-item` (submenu). Not a child of another `swc-menu-group`. `role="group"` wraps label + default slot in shadow (see source). Parent `role="menu"` is internal to the menu host, not the CE. |
| Slots | Label → `role="presentation"` wrapper. Default: only [`swc-menu-item`](../menu-item/accessibility-migration-analysis.md)—no nested group, no [`swc-menu-separator`](../menu-separator/accessibility-migration-analysis.md) (siblings in parent list). See [What `swc-menu-group` is](#what-swc-menu-group-is-2nd-gen). |
| Label region (in shadow) | Node with `role="presentation"`, stable `id`, and label content—not a `menuitem`. The `group` node uses `aria-labelledby` to that `id` (local to this subtree; [Shadow DOM](#shadow-dom-and-cross-root-aria-issues)). The label is not a roving focus stop; roving goes to `swc-menu-item` rows in the default slot and separator rows in the parent list ([Menu — Keyboard and focus](../menu/accessibility-migration-analysis.md#keyboard-and-focus)). |
| Group name | `aria-labelledby` on the `role="group"` node must resolve to the label wrapper `id`, or use `aria-label` with the same string as the visible title when there is no label slot content. Do not ship a labeled section with an unnamed `group`. |
| Disabled `swc-menu-item` in the default slot | Set `aria-disabled="true"` on a row when the item is disabled; the group does not add a separate disabled state. Follow [Menu item — ARIA: Disabled row](../menu-item/accessibility-migration-analysis.md#aria-roles-states-and-properties) and [Menu — Recommendations: `swc-menu`](../menu/accessibility-migration-analysis.md#recommendations-swc-menu). |
| Keyboard and focus | **Not** owned by `swc-menu-group`. Do **not** add a separate focus or arrow-key **controller** on the group: the parent **`swc-menu`**, **`swc-action-menu`**, or **`swc-menu-item`** (submenu list) and [`FocusgroupNavigationController`](https://github.com/adobe/spectrum-web-components/pull/6129) move focus among **default-slot** item rows. The group only exposes structure and naming (see [Keyboard and focus](#keyboard-and-focus)). |
| Checkbox / radio groups | `menuitemcheckbox` / `menuitemradio` rows and selection UX — out of scope this phase; see [Menu — Migration scope](../menu/accessibility-migration-analysis.md#migration-scope-current). |

### Shadow DOM and cross-root ARIA Issues

[Menu — Shadow DOM](../menu/accessibility-migration-analysis.md#shadow-dom-and-cross-root-aria-issues) governs the parent **`swc-menu`**, **`swc-action-menu`**, or **`swc-menu-item`** (submenu) **host**: trigger and internal `role="menu"` (or submenu equivalent), list content that may be light-DOM slotted, no per-item IDREF for roving focus, and [`FocusgroupNavigationController`](https://github.com/adobe/spectrum-web-components/pull/6129) on that **parent** list (not on `swc-menu-group`—see [Keyboard and focus](#keyboard-and-focus)).

Inside `swc-menu-group`’s shadow tree, match [What `swc-menu-group` is (2nd-gen)](#what-swc-menu-group-is-2nd-gen): a `div` with `role="group"`, a `div` with `role="presentation"` and a stable `id` that contains the label slot, and a default slot for items. The `role="group"` node sets `aria-labelledby` to the `id` on the presentation `div` in the same composed subtree (verify in 2nd-gen source). This group↔label IDREF is for section naming only, separate from the parent list’s per-item roving model. If a refactor ever split the group and label in a way that broke that IDREF, use `aria-label` on `role="group"`, re-home the label wrapper, or other strategies 2nd-gen documents in source.

### Accessibility tree expectations

- The `role="group"` node exposes a name (`aria-labelledby` to the `id` on the `role="presentation"` label wrapper that contains the label slot, or `aria-label`).
- The label region uses `presentation` (not `menuitem`); its text supplies the group name via `aria-labelledby` when used.
- Default-slot child rows expose `menuitem` per the [menu item doc](../menu-item/accessibility-migration-analysis.md); a disabled item uses `aria-disabled="true"` as in [Menu item — ARIA: Disabled row](../menu-item/accessibility-migration-analysis.md#aria-roles-states-and-properties). Focus order follows the parent menu (not additional logic on `swc-menu-group`). **`swc-menu-separator`** is **not** a **default-slot** child of the **group**—[Menu separator doc](../menu-separator/accessibility-migration-analysis.md).

### Form-associated custom properties (labels, `ElementInternals`)

Does not apply. `swc-menu-group` is not a form-associated control; labeling is `aria-labelledby` / `aria-label` on the `role="group"` node and `id` + `role="presentation"` on the label **wrapper** (label slot), not `ElementInternals`.

### Live regions, loading, and announcements

Does not apply to the group host by default; announcements belong to **items** or **app chrome** if needed.

### Motion (dedicated recommendations subsection)

Intentionally omitted. If grouped regions affect motion, follow the **menu** / **popover** docs for layered UI.

### Keyboard and focus

`swc-menu-group` must not implement or override keyboard navigation, arrow keys, or roving `tabindex` for its default-slot `menuitem` rows. The parent **`swc-menu`**, **`swc-action-menu`**, or **`swc-menu-item`** (submenu) applies [`FocusgroupNavigationController`](https://github.com/adobe/spectrum-web-components/pull/6129) to those rows (see [Menu — Keyboard and focus](../menu/accessibility-migration-analysis.md#keyboard-and-focus)). A disabled `swc-menu-item` should not run its action on Enter or Space, per [Menu item — ARIA: Disabled row](../menu-item/accessibility-migration-analysis.md#aria-roles-states-and-properties). The `role="presentation"` label wrapper and label slot content are not roving focus stops; the `role="group"` container is not an extra Tab stop. Document screen reader edge cases when crossing into a new section (verify in implementation and manual testing).

---

## Testing

### Automated tests

| Kind of test | What to check |
| --- | --- |
| Unit / aXe + Storybook | `role="group"`, `role="presentation"` label `id` and `aria-labelledby` when a label is present; label and default slots per [What `swc-menu-group` is (2nd-gen)](#what-swc-menu-group-is-2nd-gen); group inside menu stories; `aria-disabled` on disabled `swc-menu-item` children when applicable ([Menu item — ARIA](../menu-item/accessibility-migration-analysis.md#aria-roles-states-and-properties)); no invalid child roles. Assert `swc-menu-group` does not add its own focus/keyboard layer (see [Keyboard and focus](#keyboard-and-focus)). |
| With menu | Run **menu** and **action menu** story coverage; add **group** variants when group-specific bugs are filed. |

### Keyboard testing

Follow the 2nd-gen Storybook [Keyboard testing](../../../../2nd-gen/packages/swc/.storybook/guides/accessibility-guides/keyboard_testing.mdx) guide on a **composed** path with `swc-menu` (see [Menu — Keyboard testing](../menu/accessibility-migration-analysis.md#keyboard-testing)). Confirm **arrow** navigation across **group** **boundaries**; roving focus is owned by the parent menu and [`FocusgroupNavigationController`](https://github.com/adobe/spectrum-web-components/pull/6129), with no focus traps and no roving stops on the presentation/label **region** (see [Keyboard and focus](#keyboard-and-focus) on this page).

### Manual and screen reader testing

Exercise **menu** stories that include **labeled groups**; confirm group **names** are discoverable and that behavior matches [Menu — Manual and screen reader testing](../menu/accessibility-migration-analysis.md#manual-and-screen-reader-testing-mandatory-host-alone). Use [Screen reader testing](../../../../2nd-gen/packages/swc/.storybook/guides/accessibility-guides/screen_reader_testing.mdx) as needed.

---

## Summary checklist

- [ ] Group only as a direct list child of `swc-menu`, `swc-action-menu`, or `swc-menu-item` (submenu)—not under another group. Lies under the parent’s internal `role="menu"`. Shadow: `role="group"`, `role="presentation"` label with stable `id`, default slot with items only; `aria-labelledby` to label `id` (or `aria-label`) per [What `swc-menu-group` is (2nd-gen)](#what-swc-menu-group-is-2nd-gen). Submenus can have new groups in their own list. [`swc-menu-separator`](../menu-separator/accessibility-migration-analysis.md) is not a default-slot child of the group.
- [ ] `menuitemcheckbox` / `menuitemradio` groupings are not in scope for this phase ([Menu migration scope](../menu/accessibility-migration-analysis.md#migration-scope-current)).
- [ ] [Menu — Shadow DOM](../menu/accessibility-migration-analysis.md#shadow-dom-and-cross-root-aria-issues) and [Action menu](../action-menu/accessibility-migration-analysis.md) parent-host rules **and** this doc’s [Shadow DOM](#shadow-dom-and-cross-root-aria-issues) group↔label IDREF hold in 2nd-gen source.
- [ ] Default-slot `swc-menu-item` rows: disabled state and `aria-disabled` match [Menu item — ARIA: Disabled row](../menu-item/accessibility-migration-analysis.md#aria-roles-states-and-properties) (group host does not replace item-level disabled semantics).
- [ ] `swc-menu-group` does not add its own keyboard or focus manager; [Keyboard and focus](#keyboard-and-focus) and [Keyboard testing](#keyboard-testing) align with the parent menu + [`FocusgroupNavigationController`](https://github.com/adobe/spectrum-web-components/pull/6129).

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

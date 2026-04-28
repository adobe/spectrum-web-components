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

This document sets accessibility expectations for 2nd-gen **Menu group** in Spectrum Web Components: **`swc-menu-group`** as a labeled grouping of [`menuitem`](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/) rows inside the **internal** [`role="menu"`](../menu/accessibility-migration-analysis.md) **subtree**—the **element** with **`role="menu"`** **inside** **`swc-menu` / `swc-action-menu`’s** **shadow** **DOM** (**not** on the **custom** **element** **host**). The component uses a **label** **slot** and a **default** **slot** (items); the **group** does **not** own keyboard or roving focus—that stays on the parent **`swc-menu` / `swc-action-menu`** and [`FocusgroupNavigationController`](https://github.com/adobe/spectrum-web-components/pull/6129) (see [Keyboard and focus](#keyboard-and-focus)). It is not a stand-alone widget; it only makes sense **slotted** into that **menu** **surface** (or an **equivalent** **menu** **tree** in **tests**). The target is **WCAG 2.2 Level AA**.

### Also read

- [Menu accessibility migration analysis](../menu/accessibility-migration-analysis.md) for **`role="menu"`** (**internal** **shadow** **surface**), `swc-menu`, placement, controller split, and [migration scope](../menu/accessibility-migration-analysis.md#migration-scope-current).
- [Menu item accessibility migration analysis](../menu-item/accessibility-migration-analysis.md) for `swc-menu-item`, `menuitem` rows, submenus, and link rows.
- [Menu separator accessibility migration analysis](../menu-separator/accessibility-migration-analysis.md) for **`swc-menu-separator`** (**`separator`** lines between items).
- [Action menu accessibility migration analysis](../action-menu/accessibility-migration-analysis.md) for **`swc-action-menu`**, a full menu-button **host** parallel to `swc-menu` (ActionMenu / “**more**” **defaults**).

### What `swc-menu-group` is (2nd-gen)

- A **group** is a logical section of a menu: a container with [`role="group"`](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/) descended from the internal `role="menu"` surface (`swc-menu` / `swc-action-menu` shadow markup), optionally with a visible label. It organizes `swc-menu-item` / `menuitem` children (default slot). It is not a `menuitem` and does **not** own keyboard handling or roving `tabindex`; the parent `swc-menu` or `swc-action-menu` applies [`FocusgroupNavigationController`](https://github.com/adobe/spectrum-web-components/pull/6129) to slotted rows (see [Keyboard and focus](#keyboard-and-focus)).
- **Slots (2nd-gen):** a **label** slot (section title / face) and a **default** slot for `swc-menu-item`, `swc-menu-separator`, and other list row primitives. Verify default and label slot names in 2nd-gen source.
- **Shadow DOM (2nd-gen target, verify in source):** the shadow tree should wire:
  1. A container with `role="group"`. It sets `aria-labelledby` to the **`id`** on the presentation label wrapper in the same composed subtree (IDREF to that node).
  2. A container with `role="presentation"` and a **stable** `id`. It wraps the **label** slot; it is not a `menuitem`. The group’s accessible name is derived from this node via `aria-labelledby`, or from `aria-label` on the `role="group"` node when that pattern is used.
  3. A **default** slot for **items** (for example `swc-menu-item`, separators), in the order the parent menu’s list model expects.
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

Bottom line: `swc-menu-group` supplies structure and section labeling (shadow `role="group"`, `role="presentation"` label slot wrapper, default slot for rows) and does not own in-menu keyboard or focus—the parent menu and [`FocusgroupNavigationController`](https://github.com/adobe/spectrum-web-components/pull/6129) do. Submenu and command row detail stay on the menu, menu item, and action menu docs.

---

## Related 1st-gen accessibility (Jira)

Treat **menu-wide** defects as authoritative in [Menu — Related 1st-gen accessibility (Jira)](../menu/accessibility-migration-analysis.md#related-1st-gen-accessibility-jira). Add rows here only when an issue narrowly targets **`sp-menu-group`** / group labeling; otherwise omit and rely on that table.

---

## Recommendations: `<swc-menu-group>`

Scope: **`role="group"`** (or equivalent), **label** and **default** **slots** as in [What `swc-menu-group` is (2nd-gen)](#what-swc-menu-group-is-2nd-gen), **optional** visible **label** content, `menuitem` **children** **in** the **default** **slot** only for this phase—no **`menuitemcheckbox` / `menuitemradio`** selection groups until [Menu migration scope](../menu/accessibility-migration-analysis.md#migration-scope-current) closes.

### ARIA roles, states, and properties

| Topic | What to do |
| --- | --- |
| Host / surface | `role="group"` on the shadow **container** that wraps the **label** region and the **default** (items) **slot** (or equivalent wiring—verify in 2nd-gen source). The containing `role="menu"` must be the internal menu node in `swc-menu` / `swc-action-menu`’s shadow tree (not the CE host). |
| Slots | **Label** slot: projects into the `role="presentation"` **label** wrapper (next row). **Default** slot: `swc-menu-item`, [`swc-menu-separator`](../menu-separator/accessibility-migration-analysis.md), and other list rows. Verify slot API names in 2nd-gen source. |
| Label region (in shadow) | A `div` (or equivalent) with `role="presentation"`, a **stable** `id`, and the **label** **slot** as its content. It is **not** a `menuitem`. The `role="group"` **ancestor** in the same shadow **subtree** sets `aria-labelledby` to that `id` (IDREF is **local** to `swc-menu-group`’s **composition**—see [Shadow DOM](#shadow-dom-and-cross-root-aria-issues)). The label row is **not** a roving `tabindex` stop; roving targets `menuitem` and `separator` only. |
| Group name | `aria-labelledby` on the `role="group"` node must resolve to the label wrapper `id`, or use `aria-label` with the same string as the visible title when there is no label slot content. Do not ship a labeled section with an unnamed `group`. |
| Keyboard and focus | **Not** owned by `swc-menu-group`. Do **not** add a separate focus or arrow-key **controller** on the group: the parent `swc-menu` / `swc-action-menu` and [`FocusgroupNavigationController`](https://github.com/adobe/spectrum-web-components/pull/6129) move focus among **default-slot** item rows. The group only exposes structure and naming (see [Keyboard and focus](#keyboard-and-focus)). |
| Checkbox / radio groups | `menuitemcheckbox` / `menuitemradio` rows and selection UX — out of scope this phase; see [Menu — Migration scope](../menu/accessibility-migration-analysis.md#migration-scope-current). |

### Shadow DOM and cross-root ARIA Issues

[Menu — Shadow DOM](../menu/accessibility-migration-analysis.md#shadow-dom-and-cross-root-aria-issues) governs the parent `swc-menu` / `swc-action-menu` host: trigger and internal `role="menu"`, list content that may be light-DOM slotted, no per-item IDREF for roving focus, and [`FocusgroupNavigationController`](https://github.com/adobe/spectrum-web-components/pull/6129) on the **parent** menu (not on `swc-menu-group`—see [Keyboard and focus](#keyboard-and-focus)).

Inside `swc-menu-group`’s shadow tree, match [What `swc-menu-group` is (2nd-gen)](#what-swc-menu-group-is-2nd-gen): a `div` with `role="group"`, a `div` with `role="presentation"` and a stable `id` that contains the label slot, and a default slot for items. The `role="group"` node sets `aria-labelledby` to the `id` on the presentation `div` in the same composed subtree (verify in 2nd-gen source). This group↔label IDREF is for section naming only, separate from the parent list’s per-item roving model. If a refactor ever split the group and label in a way that broke that IDREF, use `aria-label` on `role="group"`, re-home the label wrapper, or other strategies 2nd-gen documents in source.

### Accessibility tree expectations

- The `role="group"` node exposes a name (`aria-labelledby` to the `id` on the `role="presentation"` label wrapper that contains the label slot, or `aria-label`).
- The label region uses `presentation` (not `menuitem`); its text supplies the group name via `aria-labelledby` when used.
- Default-slot child rows expose `menuitem` (or `separator`) per the [menu item doc](../menu-item/accessibility-migration-analysis.md); focus order follows the parent menu (not additional logic on `swc-menu-group`).

### Form-associated custom properties (labels, `ElementInternals`)

Does not apply. `swc-menu-group` is not a form-associated control; labeling is `aria-labelledby` / `aria-label` on the `role="group"` node and `id` + `role="presentation"` on the label **wrapper** (label slot), not `ElementInternals`.

### Live regions, loading, and announcements

Does not apply to the group host by default; announcements belong to **items** or **app chrome** if needed.

### Motion (dedicated recommendations subsection)

Intentionally omitted. If grouped regions affect motion, follow the **menu** / **popover** docs for layered UI.

### Keyboard and focus

`swc-menu-group` must not implement or override keyboard navigation, arrow keys, or roving `tabindex` for its default-slot `menuitem` / `separator` rows. The parent `swc-menu` or `swc-action-menu` applies [`FocusgroupNavigationController`](https://github.com/adobe/spectrum-web-components/pull/6129) to those rows (see [Menu — Keyboard and focus](../menu/accessibility-migration-analysis.md#keyboard-and-focus)). The `role="presentation"` label wrapper and label slot content are not roving focus stops; the `role="group"` container is not an extra Tab stop. Document screen reader edge cases when crossing into a new section (verify in implementation and manual testing).

---

## Testing

### Automated tests

| Kind of test | What to check |
| --- | --- |
| Unit / aXe + Storybook | `role="group"`, `role="presentation"` label `id` and `aria-labelledby` when a label is present; label and default slots per [What `swc-menu-group` is (2nd-gen)](#what-swc-menu-group-is-2nd-gen); group inside menu stories; no invalid child roles. Assert `swc-menu-group` does not add its own focus/keyboard layer (see [Keyboard and focus](#keyboard-and-focus)). |
| With menu | Run **menu** and **action menu** story coverage; add **group** variants when group-specific bugs are filed. |

### Keyboard testing

Follow the 2nd-gen Storybook [Keyboard testing](../../../../2nd-gen/packages/swc/.storybook/guides/accessibility-guides/keyboard_testing.mdx) guide on a **composed** path with `swc-menu` (see [Menu — Keyboard testing](../menu/accessibility-migration-analysis.md#keyboard-testing)). Confirm **arrow** navigation across **group** **boundaries**; roving focus is owned by the parent menu and [`FocusgroupNavigationController`](https://github.com/adobe/spectrum-web-components/pull/6129), with no focus traps and no roving stops on the presentation/label **region** (see [Keyboard and focus](#keyboard-and-focus) on this page).

### Manual and screen reader testing

Exercise **menu** stories that include **labeled groups**; confirm group **names** are discoverable and that behavior matches [Menu — Manual and screen reader testing](../menu/accessibility-migration-analysis.md#manual-and-screen-reader-testing-mandatory-host-alone). Use [Screen reader testing](../../../../2nd-gen/packages/swc/.storybook/guides/accessibility-guides/screen_reader_testing.mdx) as needed.

---

## Summary checklist

- [ ] `swc-menu-group` is used only inside the internal `role="menu"` subtree (`swc-menu` / `swc-action-menu` shadow surface, not the CE host). Shadow structure: `role="group"`, `role="presentation"` label wrapper (label slot) with stable `id`, default slot for items; `aria-labelledby` on the group node IDREFs that `id` (see [What `swc-menu-group` is (2nd-gen)](#what-swc-menu-group-is-2nd-gen)); `aria-label` when used matches visible title.
- [ ] `menuitemcheckbox` / `menuitemradio` groupings are not in scope for this phase ([Menu migration scope](../menu/accessibility-migration-analysis.md#migration-scope-current)).
- [ ] [Menu — Shadow DOM](../menu/accessibility-migration-analysis.md#shadow-dom-and-cross-root-aria-issues) and [Action menu](../action-menu/accessibility-migration-analysis.md) parent-host rules **and** this doc’s [Shadow DOM](#shadow-dom-and-cross-root-aria-issues) group↔label IDREF hold in 2nd-gen source.
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

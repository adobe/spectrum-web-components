<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../../README.md) / [Project planning](../../README.md) / [Components](../README.md) / Menu Item / Menu item accessibility migration analysis

<!-- Document title (editable) -->

# Menu item accessibility migration analysis

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [Overview](#overview)
    - [In short](#in-short)
    - [Migration scope (this phase)](#migration-scope-this-phase)
    - [Also read](#also-read)
    - [What `swc-menu-item` is (2nd-gen)](#what-swc-menu-item-is-2nd-gen)
    - [When to use something else](#when-to-use-something-else)
- [ARIA and WCAG context](#aria-and-wcag-context)
    - [Pattern in the APG](#pattern-in-the-apg)
    - [Guidelines that apply](#guidelines-that-apply)
- [Related 1st-gen accessibility (Jira)](#related-1st-gen-accessibility-jira)
- [Recommendations: `<swc-menu-item>`](#recommendations-swc-menu-item)
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

This page is for 2nd-gen `swc-menu-item` in Spectrum Web Components. Most rows are `role="menuitem"` in the parent’s internal [`role="menu"`](../menu/accessibility-migration-analysis.md) list. That `role="menu"` node is in `swc-menu` / `swc-action-menu` shadow DOM, not on the custom element. Goal: [WCAG 2.2](https://www.w3.org/TR/WCAG22/) Level AA.

### In short

- A row is usually a `menuitem` with a clear name. Dividers are [`swc-menu-separator`](../menu-separator/accessibility-migration-analysis.md), not a menu item.
- When the `submenu` slot has content, the submenu trigger and child `role="menu"` are in `swc-menu-item`’s shadow tree, not the `<swc-menu-item>` host. Do not add a second `swc-menu` in the list to fake a submenu.
- This doc does not lock checkbox or radio menu rows for 2nd-gen until product work finishes ([scope below](#migration-scope-this-phase)). When they are implemented, using separate components for them  is highly recommended as they function differently and have a different aria-role than regular menu items.

### Migration scope (this phase)

- `menuitemcheckbox`, `menuitemradio`, `aria-checked`, and selection modes are out of scope. Follow [Menu — Migration scope (current)](../menu/accessibility-migration-analysis.md#migration-scope-current).
- In scope: plain `menuitem`, submenu parents, and link rows (see below).

### Also read

- [Menu a11y doc](../menu/accessibility-migration-analysis.md) — `swc-menu`, `FocusgroupNavigationController`, link rows.
- [Menu group a11y doc](../menu-group/accessibility-migration-analysis.md) — `swc-menu-group` (same three parents; `role="group"` in the list).
- [Menu separator a11y doc](../menu-separator/accessibility-migration-analysis.md) — `swc-menu-separator` in the list, not in a group default slot; `role="separator"`. [Overview](../menu-separator/accessibility-migration-analysis.md#overview).
- [Action menu a11y doc](../action-menu/accessibility-migration-analysis.md) — `swc-action-menu` next to `swc-menu` (ActionMenu).

### What `swc-menu-item` is (2nd-gen)

- A command row: `role="menuitem"` with a name and [menu button pattern](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/) keys.
- **Placement:** slotted under `swc-menu`, `swc-action-menu`, `swc-menu-group`, or `swc-menu-item`. **Label** slot: text, icons, etc. (check exposed name in source). **Submenu** slot: only `swc-menu-group`, `swc-menu-item`, and `swc-menu-separator` in current allow-list (source).
- **Submenu slot:** with children from that list, the row is a submenu parent. Trigger and child `role="menu"` live in `swc-menu-item`’s shadow DOM, with `swc-popover` (or similar) for the layer—**not** another `swc-menu` in the parent list. Empty slot: plain `menuitem`. Verify DOM in source.
- **Submenu ARIA:** `aria-haspopup="menu"`; `aria-expanded` matches open state. Which node carries the row ARIA: verify in source. Child `role="menu"` is inside the item’s shadow, not the CE. See [Menu: Shadow DOM](../menu/accessibility-migration-analysis.md#shadow-dom-and-cross-root-aria-issues) and [Action menu](../action-menu/accessibility-migration-analysis.md).
- **Link rows:** consumers should slot a real `<a href>` with a clear name in the label slot. For a full row hit, they can consider using the [Cards](https://inclusive-components.design/cards/) pattern (one big click, no double fire). For main site nav, consider nav patterns ([disclosure navigation](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/))—menus are for commands, not main nav.

### When to use something else

- **Picker / combobox** single-select from a field — [APG combobox](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/); not a menu row.
- **Page navigation** — prefer **nav** and disclosure patterns over `role="menu"` + link rows when **links** are the **main** affordance ([Menu — When to use something else](../menu/accessibility-migration-analysis.md#when-to-use-something-else)).

---

## ARIA and WCAG context

### Pattern in the APG

- [Menu button](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/) — the pattern includes **`menuitem`**, **`menuitemcheckbox`**, **`menuitemradio`**, and **`separator`**. This doc covers **`swc-menu-item`** as **`menuitem`**. **[`swc-menu-separator`](../menu-separator/accessibility-migration-analysis.md)** covers **`separator`** rows. **Checkbox / radio** variants are **out of scope** (see [Migration scope](../menu/accessibility-migration-analysis.md#migration-scope-current)).

### Guidelines that apply

| Idea | Plain meaning |
| --- | --- |
| [Name, role, value (4.1.2)](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value) | `menuitem` name from content or `aria-*`; disabled items use `aria-disabled="true"` when appropriate. |
| [Keyboard (2.1.1)](https://www.w3.org/WAI/WCAG22/Understanding/keyboard) | Activate with **Enter** / **Space** per pattern; **no** pointer-only rows (see 1st-gen [SWC-1332](https://jira.corp.adobe.com/browse/SWC-1332)). |
| [Link purpose (2.4.4)](https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context) | Link rows expose a **clear** link **name**; avoid duplicate activations ([SWC-923](https://jira.corp.adobe.com/browse/SWC-923)). |

**Bottom line:** Items use roving `tabindex` and `FocusgroupNavigationController`. Submenu parents wire open, close, focus return, and child `role="menu"` in the item’s shadow, not the CE. Top-level hosts stay `swc-menu` / `swc-action-menu` ([Menu](../menu/accessibility-migration-analysis.md), [Action menu](../action-menu/accessibility-migration-analysis.md)).

---

## Related 1st-gen accessibility (Jira)

| Jira | Type | Status (snapshot) | Resolution (snapshot) | Summary |
| --- | --- | --- | --- | --- |
| [SWC-923](https://jira.corp.adobe.com/browse/SWC-923) | Bug | To Do | Unresolved | `menu-item` with `href` triggers link twice |
| [SWC-1332](https://jira.corp.adobe.com/browse/SWC-1332) | Bug | To Do | Unresolved | Custom content as submenu not keyboard accessible |

See [Menu — Related 1st-gen accessibility (Jira)](../menu/accessibility-migration-analysis.md#related-1st-gen-accessibility-jira) for the full menu-family table.

---

## Recommendations: `<swc-menu-item>`

**Scope:** `menuitem` rows, submenu parents, and link rows (Cards). Checkbox/radio rows: out for now ([Menu migration scope](../menu/accessibility-migration-analysis.md#migration-scope-current)).

### ARIA roles, states, and properties

| Topic | What to do |
| --- | --- |
| Plain command | `role="menuitem"` and a name; one clear action per row. |
| Disabled | `aria-disabled="true"` when the row looks disabled and cannot run. |
| Submenu parent | Only when the `submenu` slot has content. Trigger + child `role="menu"` in `swc-menu-item`’s shadow, not the CE. `aria-haspopup="menu"`; `aria-expanded` matches state (see source for which node gets ARIA). Do not add `swc-menu` in the list to mean submenu ([Menu recommendations](../menu/accessibility-migration-analysis.md#recommendations-swc-menu)). |
| Link row | Do not make the host fire both menu and link ([SWC-923](https://jira.corp.adobe.com/browse/SWC-923)). Child `<a href>` with [Cards](https://inclusive-components.design/cards/)-style full row hit. For main nav, use nav patterns when that fits (Overview). |
| Checkbox / radio | Out of scope this phase. |

### Shadow DOM and cross-root ARIA Issues

Follow [Menu — Shadow DOM](../menu/accessibility-migration-analysis.md#shadow-dom-and-cross-root-aria-issues). On the top-level host, the menu-button trigger and the internal `role="menu"` node are implemented together in `swc-menu` / `swc-action-menu` shadow DOM; a `swc-menu-item` may still be slotted from the light DOM and does not need to be a child of that shadow subtree. The menu list pattern does not need IDREF to each item; in-menu movement uses `FocusgroupNavigationController` and roving `tabindex`. IDREF-driven ARIA that pairs IDs across separate roots is still fragile—per the menu and action menu docs, avoid patterns that need that. For a populated `submenu` slot, the submenu trigger and child `role="menu"` are implemented together in `swc-menu-item`’s shadow; submenu list rows can be slotted like top-level items—verify in 2nd-gen source.

### Accessibility tree expectations

- Command and link rows expose `menuitem` and a name.
- Submenu parents (when the `submenu` slot has content) tie `aria-expanded` / `aria-haspopup` to open state and expose a child `role="menu"` (with items) from `swc-menu-item`’s shadow—not by putting `role="menu"` on the `<swc-menu-item>` host.

### Form-associated custom properties (labels, `ElementInternals`)

Does not apply at the row host for typical command items; **`aria-label`** on an item may be used when the visible pattern requires it—verify implementation.

### Live regions, loading, and announcements

Does not apply to the **row shell** by default; async messaging belongs on **content** or **host app** chrome.

### Motion (dedicated recommendations subsection)

Intentionally omitted; see **menu** / **popover** for layered UI motion if needed.

### Keyboard and focus

When the parent menu is open, items take part in roving `tabindex`. **Enter** / **Space** runs a command or opens a submenu (if the `submenu` slot is used). Arrows, Home, and End: `FocusgroupNavigationController` in each `role="menu"` list. Top list: `swc-menu` / `swc-action-menu` shadow; **nested list** (submenu): the child `role="menu"` in **this** `swc-menu-item`’s shadow should use the **same** optional [printable character navigation](../menu/accessibility-migration-analysis.md#printable-character-navigation-optional-not-typeahead) rules as the top-level menu (not combobox typeahead). Check 2nd-gen stories. Submenu keys (arrows, Escape, return) should match cascading menu needs—test with [Action menu — Keyboard](../action-menu/accessibility-migration-analysis.md#keyboard-and-focus) and [Menu — Keyboard](../menu/accessibility-migration-analysis.md#keyboard-and-focus).

On a parent `role="menu"` list (top-level or submenu surface as implemented), a `swc-menu-item` is in the roving row set when it is a direct list child or a child of a direct `swc-menu-group`. See [Menu — Keyboard and focus](../menu/accessibility-migration-analysis.md#keyboard-and-focus) and the illustrative `this.querySelectorAll(':scope > swc-menu-item, :scope > swc-menu-group > swc-menu-item')` (verify in 2nd-gen source).

---

## Testing

### Automated tests

| Kind of test | What to check |
| --- | --- |
| Unit / aXe + Storybook | `role`, **name**, **disabled**, **expanded** props as implemented; link rows — **no** duplicate activation ([SWC-923](https://jira.corp.adobe.com/browse/SWC-923)). |
| Playwright / ARIA snapshots | Roving focus; **submenu** open/close when in scope; **no** gated **`menuitemcheckbox` / `menuitemradio`** coverage until [Migration scope](../menu/accessibility-migration-analysis.md#migration-scope-current) closes. |

### Keyboard testing

Follow [Keyboard testing](../../../../2nd-gen/packages/swc/.storybook/guides/accessibility-guides/keyboard_testing.mdx) on a composed **trigger + menu** path ([Menu — Keyboard testing](../menu/accessibility-migration-analysis.md#keyboard-testing)). Include **menu item** behaviors: activate, move with arrows, submenu **Escape**/**return** as covered by shared stories; if your build implements it, [printable character navigation](../menu/accessibility-migration-analysis.md#printable-character-navigation-optional-not-typeahead) on the submenu list as well as the top-level list.

### Manual and screen reader testing

Use [Screen reader testing](../../../../2nd-gen/packages/swc/.storybook/guides/accessibility-guides/screen_reader_testing.mdx) with the **composed** menu pattern ([Menu](../menu/accessibility-migration-analysis.md)); verify **link** rows announce **once** and **match** **[Cards](https://inclusive-components.design/cards/)** expectations.

---

## Summary checklist

- [ ] Checkbox / radio `menuitem` not in scope for this doc ([Menu migration scope](../menu/accessibility-migration-analysis.md#migration-scope-current)).
- [ ] Names, disabled, submenu `aria-expanded` / `aria-haspopup` match implementation when `submenu` has content; trigger + child `role="menu"` in item shadow + popover as built. If [printable character navigation](../menu/accessibility-migration-analysis.md#printable-character-navigation-optional-not-typeahead) is implemented, submenu list behavior matches the top-level menu (not typeahead).
- [ ] Link rows: child `<a>` + Cards; call out nav patterns when links are the main job.
- [ ] SWC-923 duplicate click guarded in tests; SWC-1332 when custom submenu content is in scope.

---

## References

- [Menu accessibility migration analysis](../menu/accessibility-migration-analysis.md)
- [Menu group accessibility migration analysis](../menu-group/accessibility-migration-analysis.md)
- [Menu separator accessibility migration analysis](../menu-separator/accessibility-migration-analysis.md)
- [Action menu accessibility migration analysis](../action-menu/accessibility-migration-analysis.md)
- [Heydon Pickering: Inclusive Components — Cards](https://inclusive-components.design/cards/)
- [WAI-ARIA APG: Menu button](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/)
- [WAI-ARIA APG: Disclosure navigation](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/)
- [spectrum-web-components PR #6129 — Focusgroup navigation controller](https://github.com/adobe/spectrum-web-components/pull/6129)
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- [2nd-gen Storybook: Keyboard testing](../../../../2nd-gen/packages/swc/.storybook/guides/accessibility-guides/keyboard_testing.mdx)
- [2nd-gen Storybook: Screen reader testing](../../../../2nd-gen/packages/swc/.storybook/guides/accessibility-guides/screen_reader_testing.mdx)

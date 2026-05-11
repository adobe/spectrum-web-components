<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../../README.md) / [Project planning](../../README.md) / [Components](../README.md) / Menu Separator / Menu separator accessibility migration analysis

<!-- Document title (editable) -->

# Menu separator accessibility migration analysis

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [Overview](#overview)
    - [In short](#in-short)
    - [Also read](#also-read)
    - [What the menu separator is (`swc-menu-separator`, 2nd-gen)](#what-the-menu-separator-is-swc-menu-separator-2nd-gen)
    - [When to use something else](#when-to-use-something-else)
- [ARIA and WCAG context](#aria-and-wcag-context)
    - [Pattern in the APG](#pattern-in-the-apg)
    - [Guidelines that apply](#guidelines-that-apply)
- [Related 1st-gen accessibility (Jira)](#related-1st-gen-accessibility-jira)
- [Recommendations: `<swc-menu-separator>`](#recommendations-swc-menu-separator)
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

This page is for 2nd-gen `swc-menu-separator` in Spectrum Web Components. It is a non-active row with `role="separator"` that splits parts of a menu. Goal: [WCAG 2.2](https://www.w3.org/TR/WCAG22/) Level AA.

### In short

- The host has **no** slotted children—it is a line only (see 2nd-gen source).
- Place it as a **direct** list child of `swc-menu`, `swc-action-menu`, or `swc-menu-item` (submenu when the item’s `submenu` slot is in use). **Not** inside `swc-menu-group` ([Menu group](../menu-group/accessibility-migration-analysis.md#what-swc-menu-group-is-2nd-gen)).
- It is not a `menuitem`. [FocusgroupNavigationController](https://github.com/adobe/spectrum-web-components/pull/6129) should skip it for roving focus, like 1st-gen `sp-menu-separator` tests.

1st-gen used [`sp-menu-separator` / `MenuDivider`](https://github.com/adobe/spectrum-web-components/blob/main/1st-gen/packages/menu/src/MenuDivider.ts) with `role="separator"` on the host. 2nd-gen should match; confirm attribute timing in source before you lock this copy.

**Docs and examples:** avoid separators unless they sit next to [labelled `swc-menu-group`](../menu-group/accessibility-migration-analysis.md#what-swc-menu-group-is-2nd-gen) blocks. Random lines between loose items can add screen reader noise; prefer real groups for structure.

### Also read

- [Menu a11y doc](../menu/accessibility-migration-analysis.md) — `swc-menu`, `FocusgroupNavigationController`, open/close.
- [Menu item a11y doc](../menu-item/accessibility-migration-analysis.md) — `menuitem` next to a separator.
- [Menu group a11y doc](../menu-group/accessibility-migration-analysis.md) — when to pair separators with group labels.
- [Action menu a11y doc](../action-menu/accessibility-migration-analysis.md) — `swc-action-menu` host next to `swc-menu`.
- [Divider a11y doc](../divider/accessibility-migration-analysis.md) — `swc-separator` **outside** menus (not a splitter).

### What the menu separator is (`swc-menu-separator`, 2nd-gen)

- A non-active row, no slotted content, as a direct child of `swc-menu`, `swc-action-menu`, or `swc-menu-item` in the parent’s internal `role="menu"` list. Uses [`role="separator"`](https://www.w3.org/TR/wai-aria/#separator) with the [menu button](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/) pattern.
- Not a `menuitem`. [FocusgroupNavigationController](https://github.com/adobe/spectrum-web-components/pull/6129) should move between items **past** the line, not **onto** it as a command, like `sp-menu-separator` menu tests.

### When to use something else

- **No valid menu parent** — do not use **`swc-menu-separator`** unless its **parent** is **`swc-menu`**, **`swc-action-menu`**, or **`swc-menu-item`** in a **menu** or **submenu** list (see [Overview](#overview)). For non-menu layouts, use **`swc-separator`** (or structural headings / whitespace) instead.
- **A draggable pane boundary** — use a **[window splitter](https://www.w3.org/WAI/ARIA/apg/patterns/windowsplitter/)** pattern, not a static separator ([Divider — When to use something else](../divider/accessibility-migration-analysis.md#when-to-use-something-else)).

---

## ARIA and WCAG context

### Pattern in the APG

- [Menu button](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/) — menus allow **`separator`** elements between **`menuitem`** siblings.
- The [APG **Editor Menubar** example](https://www.w3.org/WAI/ARIA/apg/patterns/menubar/examples/menubar-editor/) (menubar demo) illustrates **`separator`** usage inside **`role="menu"`** surfaces among **`menuitem`** rows—same **`separator`** semantics **`swc-menu-separator`** targets in **`swc-menu`** / **`swc-action-menu`** (layout differs from a **top-level** **ActionMenu** **story**, but a concrete live reference).
- **Checkbox / radio** rows are scoped per [Menu — Migration scope (current)](../menu/accessibility-migration-analysis.md#migration-scope-current); they do **not** change **`separator`** requirements for ordinary command menus.

### Guidelines that apply

| Idea | Plain meaning |
| --- | --- |
| [Name, role, value (4.1.2)](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value) | **`role="separator"`** with **no** progress value semantics (no **`aria-valuenow`**, **`aria-valuemax`**, etc.—not a draggable splitter—see [WAI-ARIA: `separator`](https://www.w3.org/TR/wai-aria/#separator)). Accessible name: usually omit; **`aria-label`** only if authors must verbalize unusual structure (avoid unnecessary verbosity). |
| [Non-text contrast (1.4.11)](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast) | The **line** should meet contrast against the menu panel background consistent with **`swc-menu`** styling tokens. |

**Bottom line:** `swc-menu-separator` is a visual and semantic line, not a focus stop. The parent `swc-menu` / `swc-action-menu` / `swc-menu-item` list and `FocusgroupNavigationController` own movement.

---

## Related 1st-gen accessibility (Jira)

Treat **menu-wide** defects as authoritative in [Menu — Related 1st-gen accessibility (Jira)](../menu/accessibility-migration-analysis.md#related-1st-gen-accessibility-jira). Log rows here **only** if an issue is specific to **`sp-menu-separator`** / separator announcement or traversal; otherwise omit.

| Jira | Type | Status (snapshot) | Resolution (snapshot) | Summary |
| --- | --- | --- | --- | --- |

---

## Recommendations: `<swc-menu-separator>`

**Scope:** static `separator`, no slotted children; only a direct child of `swc-menu`, `swc-action-menu`, or `swc-menu-item`. In docs, use rarely—best between [labelled groups](#overview) for command menus in scope ([Menu migration scope](../menu/accessibility-migration-analysis.md#migration-scope-current)).

### ARIA roles, states, and properties

| Topic | What to do |
| --- | --- |
| **`role="separator"`** | **Prescribed** on the **`swc-menu-separator`** host (analogous to **`sp-menu-separator`**)—**fixed**, not overridden with **`presentation`** / **`none`** on the shipped default; authors who need content omitted from the accessibility tree should change **structure or content**, not override **`role`** on this primitive without a deliberate pattern change elsewhere. **`swc-menu-separator`** maps to **one** semantic meaning: **separator** inside a **`menu`**—verify final attribute timing in source. |
| Slotted content | **None.** The host must not use a default (or other) slot for author content; it is a line **primitive** only (verify in 2nd-gen source). |
| Parent (placement) | **Slotted** only as a direct row of **`swc-menu`**, **`swc-action-menu`**, or **`swc-menu-item`** in the open menu or submenu list—**not** inside **`swc-menu-group`’s** default slot ([Menu group — What `swc-menu-group` is (2nd-gen)](../menu-group/accessibility-migration-analysis.md#what-swc-menu-group-is-2nd-gen): default slot is **`swc-menu-item` only** for the current scope). **Light**-DOM list composition is fine; the row need not be in the internal `role="menu"` shadow subtree ([Menu — Shadow DOM](../menu/accessibility-migration-analysis.md#shadow-dom-and-cross-root-aria-issues)). |
| Naming | Omit **accessible name** by default (no **`aria-labelledby`**). |
| Docs / examples | **Favor** a separator when flanking siblings are **`swc-menu-group`** with visible / exposed section names; see the **Documentation and examples** paragraph in [Overview](#overview). |
| A11y tree placement | The separator is a `role="separator"` sibling between rows under the same `role="menu"` (verify in 2nd-gen source). |

### Shadow DOM and cross-root ARIA Issues

[Menu — Shadow DOM](../menu/accessibility-migration-analysis.md#shadow-dom-and-cross-root-aria-issues) applies: the **parent** **`swc-menu`**, **`swc-action-menu`**, or **`swc-menu-item`** (submenu) implements the **internal** `role="menu"` in its shadow DOM (with a **top-level** **menu-button** **trigger** on the two **menu** **hosts**); `swc-menu-separator` does not need to be in that shadow subtree—light-DOM slotting is fine. Inter-item navigation uses `FocusgroupNavigationController` ([PR #6129](https://github.com/adobe/spectrum-web-components/pull/6129)) and does not need IDREF to each item; other naming notes follow the menu and action menu docs.

### Accessibility tree expectations

- **`role="separator"`** (horizontal—in-menu layout is effectively **horizontal orientation** semantics; **`aria-orientation`** is optional if implementation omits defaults already implied by visuals).
- **Not** exposed as **`menuitem`**; **does not** advertise **`aria-expanded`**, **`aria-haspopup`**, or command names.

### Form-associated custom properties (labels, `ElementInternals`)

Does not apply.

### Live regions, loading, and announcements

Does not apply.

### Motion (dedicated recommendations subsection)

Intentionally omitted. Separator lines follow **menu** / **popover** motion guidance only if surfaced as layered UI elsewhere.

### Keyboard and focus

**Not focusable.** Roving **tabindex** and **arrow-key** traversal are **applied to `menuitem` rows** ([`FocusgroupNavigationController`](https://github.com/adobe/spectrum-web-components/pull/6129)); the separator host must **not** become a **`tabindex`** roving stop. Keyboard testing should prove **ArrowUp** / **ArrowDown** skips the separator boundary while focus moves between neighbouring **items**.

---

## Testing

### Automated tests

| Kind of test | What to check |
| --- | --- |
| Unit / aXe + Storybook | Host **`role="separator"`**; **no invalid** **`aria-valuemax`** splitter props when not interactive (see **`swc-separator`** tests for separator baseline). Story includes **≥1** **`swc-menu-separator`** in the **internal** **`role="menu"`** **subtree** of a **full** **`swc-menu`** or **`swc-action-menu`** ( **`role="menu"`** **not** on the **CE** **host**). Prefer a story where the separator is **between** **labelled** **`swc-menu-group`** **siblings** to match [Overview](#overview) **guidance**. |
| With [`swc-menu`](../menu/accessibility-migration-analysis.md) | Snapshot **accessible name** omission by default when no **`aria-label`**. |

### Keyboard testing

Follow the 2nd-gen Storybook [Keyboard testing](../../../../2nd-gen/packages/swc/.storybook/guides/accessibility-guides/keyboard_testing.mdx) guide on a full menu path: either **`swc-menu`** or **`swc-action-menu`** (each a menu-button **host** with **`swc-popover`** and an **internal** **`role="menu"`** **in** **shadow** **DOM**; see [Menu — Keyboard testing](../menu/accessibility-migration-analysis.md#keyboard-testing)). Confirm **ArrowUp**/**ArrowDown** moves between **`menuitem`** entries past separators without focusing the separator row as a selectable command.

### Manual and screen reader testing

Compose **menu + separator + items** paths; reconcile with [Menu — Manual and screen reader testing](../menu/accessibility-migration-analysis.md#manual-and-screen-reader-testing-mandatory-host-alone) guidance. Optionally compare announcement patterns with **`sp-menu-separator`** before behaviour parity freezes. Follow [Screen reader testing](../../../../2nd-gen/packages/swc/.storybook/guides/accessibility-guides/screen_reader_testing.mdx).

---

## Summary checklist

- [ ] Parent is `swc-menu`, `swc-action-menu`, or `swc-menu-item` (submenu) as a direct list child—[Overview](#overview). No slotted children; not under `swc-menu-group` ([group parent rule](../menu-group/accessibility-migration-analysis.md#what-swc-menu-group-is-2nd-gen)). In docs, only when between labelled `swc-menu-group` blocks when you can ([Overview](#overview)).
- [ ] Host **`role="separator"`**, **non-focusable**, **no** draggable **value semantics** (**verify timing** versus **`sp-menu-separator`** in 2nd-gen source).
- [ ] **`FocusgroupNavigationController`** skips separator for **menuitem** traversal; **manual** sanity on **Escape** returning to trigger or **submenu** **parent** follows the **`swc-menu`** / **`swc-action-menu`** / **`swc-menu-item`** docs.
- [ ] Visual **contrast** for line versus menu background aligns with **`swc-menu`** tokens.
- [ ] **`menuitemcheckbox`** / **`menuitemradio`** rows and selection separators **defer** per [menu migration scope](../menu/accessibility-migration-analysis.md#migration-scope-current)—do not document selectable-separator UX here prematurely.

---

## References

- [Menu accessibility migration analysis](../menu/accessibility-migration-analysis.md)
- [Menu item accessibility migration analysis](../menu-item/accessibility-migration-analysis.md)
- [Menu group accessibility migration analysis](../menu-group/accessibility-migration-analysis.md)
- [Action menu accessibility migration analysis](../action-menu/accessibility-migration-analysis.md)
- [Divider accessibility migration analysis](../divider/accessibility-migration-analysis.md)
- [WAI-ARIA **`separator`** role definition](https://www.w3.org/TR/wai-aria/#separator)
- [WAI-ARIA APG: Menu button](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/)
- [WAI-ARIA APG: Editor Menubar example (includes menu **separators**)](https://www.w3.org/WAI/ARIA/apg/patterns/menubar/examples/menubar-editor/)
- [spectrum-web-components PR #6129 — Focusgroup navigation controller](https://github.com/adobe/spectrum-web-components/pull/6129)
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- [2nd-gen Storybook: Keyboard testing](../../../../2nd-gen/packages/swc/.storybook/guides/accessibility-guides/keyboard_testing.mdx)
- [2nd-gen Storybook: Screen reader testing](../../../../2nd-gen/packages/swc/.storybook/guides/accessibility-guides/screen_reader_testing.mdx)

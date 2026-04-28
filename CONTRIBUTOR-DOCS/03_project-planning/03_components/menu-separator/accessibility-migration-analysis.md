<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../../README.md) / [Project planning](../../README.md) / [Components](../README.md) / Menu Separator / Menu separator accessibility migration analysis

<!-- Document title (editable) -->

# Menu separator accessibility migration analysis

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [Overview](#overview)
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

This document sets accessibility expectations for 2nd-gen **Menu separator** in Spectrum Web Components: **`swc-menu-separator`** as a non-interactive **`role="separator"`** rule between [`menuitem`](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/) rows inside the **internal** [`role="menu"`](../menu/accessibility-migration-analysis.md) **subtree**—the **element** with **`role="menu"`** **inside** **`swc-menu` / `swc-action-menu`’s** **shadow** **DOM** (**not** the **CE** **host**). Visually it is the horizontal Spectrum menu section line—the same semantic role browsers expose for **`separator`** in menus. **1st-gen** shipped this behavior on [`sp-menu-separator`](https://github.com/adobe/spectrum-web-components/blob/main/1st-gen/packages/menu/src/MenuDivider.ts) (`role="separator"` on the host in `firstUpdated`); **`swc-menu-separator`** API and shadow wiring should follow the same semantics when 2nd-gen lands (**verify attribute timing and inheritance in repo source before locking contributor copy**). The target is **WCAG 2.2 Level AA**.

### Also read

- [Menu accessibility migration analysis](../menu/accessibility-migration-analysis.md) for `swc-menu`, `FocusgroupNavigationController`, and open/close wiring.
- [Menu item accessibility migration analysis](../menu-item/accessibility-migration-analysis.md) for `menuitem` rows adjacent to separators.
- [Menu group accessibility migration analysis](../menu-group/accessibility-migration-analysis.md) for labelled **`role="group"`** sections versus a plain **`separator`** line (different structure).
- [Action menu accessibility migration analysis](../action-menu/accessibility-migration-analysis.md) for the **`swc-action-menu`** **host** (parallel **full** **menu-button** **pattern** to `swc-menu`).
- [Divider accessibility migration analysis](../divider/accessibility-migration-analysis.md) for generic **`swc-separator`** / **`separator`** semantics outside menus (orientation, misuse as splitter).

### What the menu separator is (`swc-menu-separator`, 2nd-gen)

- A **non-interactive separator** authored only **under** the **internal** **`role="menu"`** **list** (**`swc-menu` / `swc-action-menu` shadow** **surface**): exposes [`role="separator"`](https://www.w3.org/TR/wai-aria/#separator) compatible with the APG **[menu button](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/)** pattern.
- **Not** a **`menuitem`**: assistive tech should not treat it as an actionable row; **`FocusgroupNavigationController`** ([PR #6129](https://github.com/adobe/spectrum-web-components/pull/6129)) arrow traversal should jump between adjacent **`menuitem`** stops **without** treating the separator as a roving focus target (consistent with **`sp-menu-separator`** menu tests that advance from item to item across the separator).

### When to use something else

- **Outside a menu** — use **`swc-separator`** (or structural headings / whitespace) instead; do not place **`swc-menu-separator`** in arbitrary page layouts.
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

Bottom line: **`swc-menu-separator`** exposes a **semantic separator**, not keyboard focus chrome; traversal behavior belongs to **`swc-menu`** and **`FocusgroupNavigationController`**.

---

## Related 1st-gen accessibility (Jira)

Treat **menu-wide** defects as authoritative in [Menu — Related 1st-gen accessibility (Jira)](../menu/accessibility-migration-analysis.md#related-1st-gen-accessibility-jira). Log rows here **only** if an issue is specific to **`sp-menu-separator`** / separator announcement or traversal; otherwise omit.

| Jira | Type | Status (snapshot) | Resolution (snapshot) | Summary |
| --- | --- | --- | --- | --- |

---

## Recommendations: `<swc-menu-separator>`

Scope: **non-interactive** **`separator`** between **`menuitem`** siblings for command menus **in scope** ([Menu migration scope](../menu/accessibility-migration-analysis.md#migration-scope-current)).

### ARIA roles, states, and properties

| Topic | What to do |
| --- | --- |
| **`role="separator"`** | **Prescribed** on the **`swc-menu-separator`** host (analogous to **`sp-menu-separator`**)—**fixed**, not overridden with **`presentation`** / **`none`** on the shipped default; authors who need content omitted from the accessibility tree should change **structure or content**, not override **`role`** on this primitive without a deliberate pattern change elsewhere. **`swc-menu-separator`** maps to **one** semantic meaning: **separator** inside a **`menu`**—verify final attribute timing in source. |
| Naming | Omit **accessible name** by default (no **`aria-labelledby`**); add **`aria-label`** only when product requires disambiguating multiple separators (rare). |
| Placement | The parent host keeps the trigger and internal `role="menu"` together in shadow; a slotted `swc-menu-separator` need not live in that shadow subtree—light-DOM slotting is fine ([Menu — Shadow DOM](../menu/accessibility-migration-analysis.md#shadow-dom-and-cross-root-aria-issues)). In the exposed accessibility tree, the separator must read as between `menuitem` siblings under `role="menu"` (verify in 2nd-gen source). |

### Shadow DOM and cross-root ARIA Issues

[Menu — Shadow DOM](../menu/accessibility-migration-analysis.md#shadow-dom-and-cross-root-aria-issues) applies: the parent host implements the menu-button trigger and internal `role="menu"` together in `swc-menu` / `swc-action-menu` shadow DOM; `swc-menu-separator` does not need to be in that shadow subtree—light-DOM slotting is fine. Inter-item navigation uses `FocusgroupNavigationController` ([PR #6129](https://github.com/adobe/spectrum-web-components/pull/6129)) and does not need IDREF to each item; other naming notes follow the menu and action menu docs.

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
| Unit / aXe + Storybook | Host **`role="separator"`**; **no invalid** **`aria-valuemax`** splitter props when not interactive (see **`swc-separator`** tests for separator baseline). Story includes **≥1** **`swc-menu-separator`** between **`swc-menu-item`** rows in the **internal** **`role="menu"`** **subtree** of a **full** **`swc-menu`** or **`swc-action-menu`** ( **`role="menu"`** **not** on the **CE** **host**). |
| With [`swc-menu`](../menu/accessibility-migration-analysis.md) | Snapshot **accessible name** omission by default when no **`aria-label`**. |

### Keyboard testing

Follow the 2nd-gen Storybook [Keyboard testing](../../../../2nd-gen/packages/swc/.storybook/guides/accessibility-guides/keyboard_testing.mdx) guide on a full menu path: either **`swc-menu`** or **`swc-action-menu`** (each a menu-button **host** with **`swc-popover`** and an **internal** **`role="menu"`** **in** **shadow** **DOM**; see [Menu — Keyboard testing](../menu/accessibility-migration-analysis.md#keyboard-testing)). Confirm **ArrowUp**/**ArrowDown** moves between **`menuitem`** entries past separators without focusing the separator row as a selectable command.

### Manual and screen reader testing

Compose **menu + separator + items** paths; reconcile with [Menu — Manual and screen reader testing](../menu/accessibility-migration-analysis.md#manual-and-screen-reader-testing-mandatory-host-alone) guidance. Optionally compare announcement patterns with **`sp-menu-separator`** before behaviour parity freezes. Follow [Screen reader testing](../../../../2nd-gen/packages/swc/.storybook/guides/accessibility-guides/screen_reader_testing.mdx).

---

## Summary checklist

- [ ] Host **`role="separator"`**, **non-focusable**, **no** draggable **value semantics** (**verify timing** versus **`sp-menu-separator`** in 2nd-gen source).
- [ ] **`FocusgroupNavigationController`** skips separator for **menuitem** traversal; **manual** sanity on **Escape** returning to trigger still lives on **`swc-menu`** / **`swc-action-menu`** docs.
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

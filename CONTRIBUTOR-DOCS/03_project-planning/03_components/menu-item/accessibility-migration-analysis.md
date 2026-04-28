<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../../README.md) / [Project planning](../../README.md) / [Components](../README.md) / Menu Item / Menu item accessibility migration analysis

<!-- Document title (editable) -->

# Menu item accessibility migration analysis

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [Overview](#overview)
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

This document sets accessibility expectations for 2nd-gen **Menu item** in Spectrum Web Components: **`swc-menu-item`** is **typically** a **`role="menuitem"`** **row** in the **internal** [`role="menu"`](../menu/accessibility-migration-analysis.md) **list** (that menu **`role` lives** in **`swc-menu` / `swc-action-menu`’s** **shadow** **DOM**, **not** on the **CE** **host**). **Nested** **submenus** (when the **`submenu` slot** is **populated**) **render** the **submenu** **trigger** and **child** **`role="menu"`** as **elements** in **`swc-menu-item`’s** **shadow** **DOM**—**not** on the **`<swc-menu-item>`** **host**. **Separator** and **link**-row **patterns** and other **variations** **follow** the **implementation**. The target is **WCAG 2.2 Level AA**.

### Migration scope (this phase)

- **`menuitemcheckbox`**, **`menuitemradio`**, **`aria-checked`**, and **selection modes** (single, multiple, persisted state) are **out of scope** for this migration phase. Align with [Menu — Migration scope (current)](../menu/accessibility-migration-analysis.md#migration-scope-current); do not treat selectable rows as **locked** for 2nd-gen until that program work closes.
- **Plain `menuitem`**, **submenu** parents, **separator** rows (where applicable), and **link** rows (with constraints below) are in scope for this doc.

### Also read

- [Menu accessibility migration analysis](../menu/accessibility-migration-analysis.md) for `swc-menu`, controller split, `FocusgroupNavigationController`, and link-row guidance.
- [Menu group accessibility migration analysis](../menu-group/accessibility-migration-analysis.md) for **`role="group"`** sections inside a menu.
- [Menu separator accessibility migration analysis](../menu-separator/accessibility-migration-analysis.md) for **`swc-menu-divider`** (**`separator`** between rows—not a **`menuitem`**).
- [Action menu accessibility migration analysis](../action-menu/accessibility-migration-analysis.md) for **`swc-action-menu`** (full **menu-button** **host** parallel to **`swc-menu`**, **ActionMenu** **defaults**).

### What `swc-menu-item` is (2nd-gen)

- A **row** in the menu list: **`role="menuitem"`** for command actions, with a **visible name** and supported **keyboard** activation per the [menu button pattern](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/).
- **Submenu** **(the `submenu` slot):** **`swc-menu-item`** exposes a **`submenu` slot**. When that **slot** has **child** **nodes**, **this** **item** **is** a **submenu** **parent**: the **submenu** **trigger** and the **child** **`role="menu"`** **are** **elements** **in** **`swc-menu-item`’s** **shadow** **DOM**—**not** on the **`<swc-menu-item>`** custom element **host**—**along** with **`swc-popover`** (or **equivalent**) **for** **anchoring** the **open** **layer** (**not** a **second** **nested** **`swc-menu`** or **`swc-action-menu`** **in** the **list**). When the **slot** is **empty**, the **row** behaves as a **plain** **`menuitem`**. **Verify** **DOM** in 2nd-gen **source**.
- **Submenu** **parent** **ARIA:** **`aria-haspopup="menu"`** and **`aria-expanded`** **align** with **open** state; the **exposed** **`menuitem`** **semantics** may **live** **on** the **row** **or** **on** an **internal** **submenu** **trigger** **in** **shadow** **DOM**—**verify** in 2nd-gen **source**. The **child** **`role="menu"`** is **a** **separate** **node** **in** the **same** **`swc-menu-item` shadow** **subtree** (see [Menu](../menu/accessibility-migration-analysis.md) and [Action menu](../action-menu/accessibility-migration-analysis.md)).
- Link-like content: when a row must navigate (`href`), use a real `<a href="…">` (or framework link) as descendant content with a clear name; for a full-row click target without double activation, follow [Inclusive Components: Cards](https://inclusive-components.design/cards/)—stretch the link with CSS (for example pseudo-element / positioning) so one interactive surface activates once. In general, for primary site or app navigation by links, authors should consider a navigation component or pattern ([disclosure navigation](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/), landmarks, link lists) instead of modeling a list of links as `role="menu"`—command menus are for actions, not a substitute for nav chrome.

### When to use something else

- **Picker / combobox** single-select from a field — [APG combobox](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/); not a menu row.
- **Page navigation** — prefer **nav** and disclosure patterns over `role="menu"` + link rows when **links** are the **main** affordance ([Menu — When to use something else](../menu/accessibility-migration-analysis.md#when-to-use-something-else)).

---

## ARIA and WCAG context

### Pattern in the APG

- [Menu button](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/) — **`menuitem`**, **`menuitemcheckbox`**, **`menuitemradio`**, **`separator`**; this phase documents **`menuitem`** (and separator handling as implemented). **Checkbox / radio** variants are **out of scope** (see [Migration scope](../menu/accessibility-migration-analysis.md#migration-scope-current)).

### Guidelines that apply

| Idea | Plain meaning |
| --- | --- |
| [Name, role, value (4.1.2)](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value) | `menuitem` name from content or `aria-*`; disabled items use `aria-disabled="true"` when appropriate. |
| [Keyboard (2.1.1)](https://www.w3.org/WAI/WCAG22/Understanding/keyboard) | Activate with **Enter** / **Space** per pattern; **no** pointer-only rows (see 1st-gen [SWC-1332](https://jira.corp.adobe.com/browse/SWC-1332)). |
| [Link purpose (2.4.4)](https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context) | Link rows expose a **clear** link **name**; avoid duplicate activations ([SWC-923](https://jira.corp.adobe.com/browse/SWC-923)). |

Bottom line: items participate in **roving tabindex** and **FocusgroupNavigationController** navigation. **Submenu** **parents** coordinate **open/close**, **focus** **return**, and **child** **`role="menu"`** through **markup** **in** **`swc-menu-item`’s** **shadow** **DOM** (**submenu** **trigger** + **`role="menu"`** **—** **not** the **item** **CE** **host**); the **top-level** **host** is still **`swc-menu`** / **`swc-action-menu`** (see [Menu](../menu/accessibility-migration-analysis.md) and [Action menu](../action-menu/accessibility-migration-analysis.md)).

---

## Related 1st-gen accessibility (Jira)

| Jira | Type | Status (snapshot) | Resolution (snapshot) | Summary |
| --- | --- | --- | --- | --- |
| [SWC-923](https://jira.corp.adobe.com/browse/SWC-923) | Bug | To Do | Unresolved | `menu-item` with `href` triggers link twice |
| [SWC-1332](https://jira.corp.adobe.com/browse/SWC-1332) | Bug | To Do | Unresolved | Custom content as submenu not keyboard accessible |

See [Menu — Related 1st-gen accessibility (Jira)](../menu/accessibility-migration-analysis.md#related-1st-gen-accessibility-jira) for the full menu-family table.

---

## Recommendations: `<swc-menu-item>`

Scope: **`menuitem`** rows, **submenu** parents, **separators** as implemented, and **link** rows using the **Cards** pattern; **`menuitemcheckbox` / `menuitemradio`** **out of scope** this phase ([Menu migration scope](../menu/accessibility-migration-analysis.md#migration-scope-current)).

### ARIA roles, states, and properties

| Topic | What to do |
| --- | --- |
| Plain command | **`role="menuitem"`** with an **accessible name**; keep **one** clear action per row. |
| Disabled | **`aria-disabled="true"`** when the row is visibly disabled and cannot be invoked. |
| Submenu parent | **Only** when the **`submenu` slot** has **content** (otherwise treat as a **plain** **command** **row**). The **submenu** **trigger** and **child** **`role="menu"`** **live** in **`swc-menu-item`’s** **shadow** **tree**—**not** the **item** **CE** **host**; **expose** **`aria-haspopup="menu"`** and **`aria-expanded`** **in** line **with** **open** **state** (**verify** **which** **node** **carries** **ARIA** in 2nd-gen **source**). **Do** **not** **model** **submenus** by **nesting** **`swc-menu`** in the list (see [Menu: Submenus](../menu/accessibility-migration-analysis.md#recommendations-swc-menu) in the **Recommendations** table). |
| Separator | Implemented per APG (**`separator`** or host-specific mapping—verify in source); not a **`menuitem`**. |
| Link row | **No** proxy click on the **host** firing both **menuitem** and **link** behavior ([SWC-923](https://jira.corp.adobe.com/browse/SWC-923)). Prefer a **child** `<a href="…">` with **[Cards](https://inclusive-components.design/cards/)**-style **full-row hit** (**pseudo-element** / **positioning**) so activation is **once**. Prefer **navigation** patterns for **primary** **link** **navigation** where **appropriate** (see Overview). |
| Checkbox / radio | **`menuitemcheckbox` / `menuitemradio`** and **`aria-checked`** — **out of scope** this phase. |

### Shadow DOM and cross-root ARIA Issues

Align with [Menu — Shadow DOM](../menu/accessibility-migration-analysis.md#shadow-dom-and-cross-root-aria-issues): **`aria-labelledby`**, **`aria-describedby`**, and **IDs** for **items** should stay in **one composable subtree** with the **top-level** **trigger** and the **internal** **`role="menu"`** **surface** (**`swc-menu` / `swc-action-menu` shadow** **tree**, **not** the **CE** **host**) so **IDREFs** do not cross unrelated shadow roots. For a **row** with a **populated** **`submenu` slot**, the **submenu** **trigger**, **child** **`role="menu"`**, **popover** **anchoring**, and **descendant** **items** **all** **participate** **in** **`swc-menu-item`’s** **shadow** **composition**—**keep** **IDREFs** and **focus** **hand**-**off** **contained** so they **do** **not** **rely** on **disconnected** **roots**—**verify** in 2nd-gen **implementation**.

### Accessibility tree expectations

- Rows expose **`menuitem`** (or **`separator`**) roles and names. **Submenu** **parent** **rows** (when the **`submenu` slot** is **populated**) tie **`aria-expanded`** / **`aria-haspopup`** to **submenu** **open** state and **expose** a **child** **`role="menu"`** **(with** **items**)** from **markup** **in** **`swc-menu-item`’s** **shadow** **DOM**—**not** by **assigning** **`role="menu"`** to the **`<swc-menu-item>`** **host**.

### Form-associated custom properties (labels, `ElementInternals`)

Does not apply at the row host for typical command items; **`aria-label`** on an item may be used when the visible pattern requires it—verify implementation.

### Live regions, loading, and announcements

Does not apply to the **row shell** by default; async messaging belongs on **content** or **host app** chrome.

### Motion (dedicated recommendations subsection)

Intentionally omitted; see **menu** / **popover** for layered UI motion if needed.

### Keyboard and focus

Participate in **roving `tabindex`** on **items** when the **parent** **menu** is **open**; **Enter** / **Space** to **activate** **or** **open** a **submenu** **parent** (when the **`submenu` slot** is **used**), per **APG**; **arrow** keys, **Home** / **End**, **typeahead** via **`FocusgroupNavigationController`** in **each** **`role="menu"`** **list**—**top-level** **menus** use **`swc-menu` / `swc-action-menu` shadow**; **nested** **child** **`role="menu"`** **sits** in **`swc-menu-item`’s** **shadow** **tree**—**verify** in **2nd-gen** **stories**. **Submenu** **arrow** / **Escape** / **return** **behavior** should **match** **cascading** **menu** **expectations**—**verify** in **stories** **alongside** [Action menu — Keyboard and focus](../action-menu/accessibility-migration-analysis.md#keyboard-and-focus) and [Menu — Keyboard and focus](../menu/accessibility-migration-analysis.md#keyboard-and-focus).

---

## Testing

### Automated tests

| Kind of test | What to check |
| --- | --- |
| Unit / aXe + Storybook | `role`, **name**, **disabled**, **expanded** props as implemented; link rows — **no** duplicate activation ([SWC-923](https://jira.corp.adobe.com/browse/SWC-923)). |
| Playwright / ARIA snapshots | Roving focus; **submenu** open/close when in scope; **no** gated **`menuitemcheckbox` / `menuitemradio`** coverage until [Migration scope](../menu/accessibility-migration-analysis.md#migration-scope-current) closes. |

### Keyboard testing

Follow [Keyboard testing](../../../../2nd-gen/packages/swc/.storybook/guides/accessibility-guides/keyboard_testing.mdx) on a composed **trigger + menu** path ([Menu — Keyboard testing](../menu/accessibility-migration-analysis.md#keyboard-testing)). Include **menu item** behaviors: activate, move with arrows, submenu **Escape**/**return** as covered by shared stories.

### Manual and screen reader testing

Use [Screen reader testing](../../../../2nd-gen/packages/swc/.storybook/guides/accessibility-guides/screen_reader_testing.mdx) with the **composed** menu pattern ([Menu](../menu/accessibility-migration-analysis.md)); verify **link** rows announce **once** and **match** **[Cards](https://inclusive-components.design/cards/)** expectations.

---

## Summary checklist

- [ ] **`menuitemcheckbox` / `menuitemradio`** not documented as in-scope for this phase ([Menu migration scope](../menu/accessibility-migration-analysis.md#migration-scope-current)).
- [ ] **`menuitem`** names, disabled state, and **submenu**-**parent** **`aria-expanded`** / **`aria-haspopup`** match **implementation** (only when the **`submenu` slot** has **content**; **submenu** **trigger** + child **`role="menu"`** **in** **`swc-menu-item`’s** **shadow** **DOM** + **popover** **as** **implemented**).
- [ ] Link rows: **child** `<a>` + **Cards** full-row pattern; **navigation** alternatives called out where links dominate.
- [ ] SWC-923 duplicate activation guarded in tests; SWC-1332 retested when custom submenu content is in scope.

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

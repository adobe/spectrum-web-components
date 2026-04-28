<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../../README.md) / [Project planning](../../README.md) / [Components](../README.md) / Action Menu / Action menu accessibility migration analysis

<!-- Document title (editable) -->

# Action menu accessibility migration analysis

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [Overview](#overview)
    - [Also read](#also-read)
    - [What `swc-action-menu` is (2nd-gen)](#what-swc-action-menu-is-2nd-gen)
    - [When to use something else](#when-to-use-something-else)
    - [What it is not](#what-it-is-not)
    - [Related](#related)
- [ARIA and WCAG context](#aria-and-wcag-context)
    - [Pattern in the APG](#pattern-in-the-apg)
    - [Guidelines that apply](#guidelines-that-apply)
- [Related 1st-gen accessibility (Jira)](#related-1st-gen-accessibility-jira)
- [Recommendations: `<swc-action-menu>`](#recommendations-swc-action-menu)
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
    - [Playwright-only or host-only accessibility gates](#playwright-only-or-host-only-accessibility-gates)
    - [Manual and screen reader testing](#manual-and-screen-reader-testing)
    - [Submenu (submenu slot) tests](#submenu-submenu-slot-tests)
- [Summary checklist](#summary-checklist)
- [References](#references)

</details>

<!-- Document content (editable) -->

## Overview

This document sets accessibility expectations for 2nd-gen **Action menu** in Spectrum Web Components: **`swc-action-menu`**. In 2nd-gen it is a **full** [menu button](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/) host, **parallel** in anatomy to [`swc-menu`](../menu/accessibility-migration-analysis.md): a **trigger** button, **`swc-popover`** (or equivalent) for **placement** of the open surface, an **internal** **`role="menu"`** **surface** (**inside** **`swc-action-menu`’s** **shadow** **DOM**, **not** the **`<swc-action-menu>`** **host**), and **slots** for **`swc-menu-group`**, **`swc-menu-item`**, and **`swc-menu-separator`**. **Cascading** **submenus** are **not** a **second** **nested** **`swc-menu`** or **`swc-action-menu`**: they are implemented when a **`swc-menu-item`** has **child** **nodes** in its **`submenu` slot** ( **submenu** **trigger** and **child** **`role="menu"`** **in** **`swc-menu-item`’s** **shadow** **DOM**; **not** the **item** **CE** **host**; **popover** **anchoring** as **implemented** )—see [Menu item — What `swc-menu-item` is (2nd-gen)](../menu-item/accessibility-migration-analysis.md#what-swc-menu-item-is-2nd-gen). Neither top-level host is “**only** the list” while the other is “**only** the trigger”—**both** ship the **entire** pattern. **`swc-action-menu`** aligns with [React Spectrum **`ActionMenu`**](https://react-spectrum.adobe.com/ActionMenu) (typical “more” / **ellipses** trigger); [`swc-menu`](../menu/accessibility-migration-analysis.md) aligns with [React Spectrum **`Menu`**](https://react-spectrum.adobe.com/Menu) (**general** **Menu** case). **Mobile** **tray** and **selectable** **row** / **mode** work defer per [Menu — Migration scope (current)](../menu/accessibility-migration-analysis.md#migration-scope-current). The target is **WCAG 2.2** **Level** **AA**.

Slotted item, group, separator, and **submenu-slot** behaviour and open/close wiring are covered in the [Menu accessibility migration analysis](../menu/accessibility-migration-analysis.md) and the [Menu item doc](../menu-item/accessibility-migration-analysis.md). [Popover](../popover/accessibility-migration-analysis.md) covers anchored layering and dismiss mechanics; `swc-popover` does not implement `role="menu"` or in-menu keys by itself.

### Also read

- [Action menu migration roadmap](./rendering-and-styling-migration-analysis.md) — 2nd-gen DOM, CSS, and API (placeholder until expanded).
- [Menu accessibility migration analysis](../menu/accessibility-migration-analysis.md) — `swc-menu` as a full menu-button host (parallel to this doc); `FocusgroupNavigationController`; [Migration scope](../menu/accessibility-migration-analysis.md#migration-scope-current); link row pattern ([Inclusive Components: Cards](https://inclusive-components.design/cards/)).
- [Popover accessibility migration analysis](../popover/accessibility-migration-analysis.md) — `swc-popover` anchors the layered surface and may participate in open/dismiss wiring; `swc-action-menu` and `swc-menu` **wire** the **internal** **`role="menu"`** (shadow **tree**) and in-menu keyboard when the menu is open (see [Menu: What `swc-menu` is (2nd-gen)](../menu/accessibility-migration-analysis.md#what-swc-menu-is-2nd-gen) for coordination—**not** the popover host alone).

### What `swc-action-menu` is (2nd-gen)

- A **top-level** [menu button](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/) **host** with the **same** **anatomy** as [`swc-menu`](../menu/accessibility-migration-analysis.md): **trigger** button, **`swc-popover`** for **anchoring** the open **layer**, a **shadow-internal** **`role="menu"`** **node** (**not** the **CE** **host**), and **slots** for **groups**, **items**, and **separators**. **Submenus** are **on** **`swc-menu-item`’s** **`submenu` slot** ( **submenu** **trigger** and **child** **`role="menu"`** in **`swc-menu-item`’s** **shadow** **DOM**; **not** a **nested** **`swc-menu`** in the list ). Product defaults match [ActionMenu](https://react-spectrum.adobe.com/ActionMenu) (typical **ellipses** / “**more**”); **verify** final **DOM** in 2nd-gen **source**.
- **Not** [combobox](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/) or **text** [Picker](https://react-spectrum.adobe.com/Picker) territory (see [Menu — When to use something else](../menu/accessibility-migration-analysis.md#when-to-use-something-else)).
- **Placement** uses **`swc-popover`**; **not** 1st-gen **overlay** as the **2nd-gen** **default** **story**. **Mobile** **tray** and **item**-**selection** **rows** **defer** per [Menu **migration** **scope** (current)](../menu/accessibility-migration-analysis.md#migration-scope-current).

### When to use something else

- Single-select from a closed field with a textbox — [APG combobox](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/) (combobox + listbox) `swc-picker` or `swc-combobox`, not `swc-menu`.
- Site navigation links — [disclosure navigation](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/) (no `role="menu"` on a link list by default); use `uec-sidenav` or `swc-sidenav`.
- Modal dialog — [dialog (modal) pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/); not a menu surface (may still use shared popover styles on the dialog chrome per [Popover](../popover/accessibility-migration-analysis.md)).
- Trigger button other than the ellipses / “more” default — use `swc-menu`.

### What it is not

- Not `<swc-popover>` by itself: **`swc-action-menu`** and **`swc-menu`** orchestrate APG menu button semantics and in-list keyboard; `swc-popover` anchors the surface and may participate in layered open/dismiss mechanics as implemented, but it does not replace **`role="menu"`** or in-menu keys on the popover host alone (see [Menu](../menu/accessibility-migration-analysis.md#what-swc-menu-is-2nd-gen)).
- Not a modal dialog; for modal chrome that reuses shared popover styles, see [Modal dialogs](../popover/accessibility-migration-analysis.md#overview) in the popover a11y doc (including styles without a `swc-popover` host).

### Related

- [Menu accessibility migration analysis](../menu/accessibility-migration-analysis.md) for `swc-menu`, `menuitem`, submenus, link items, and [migration scope](../menu/accessibility-migration-analysis.md#migration-scope-current) (selection variants defer until clarification).
- [Menu group accessibility migration analysis](../menu-group/accessibility-migration-analysis.md) for `swc-menu-group`.
- [Menu separator accessibility migration analysis](../menu-separator/accessibility-migration-analysis.md) for `swc-menu-separator`.
- [Menu item accessibility migration analysis](../menu-item/accessibility-migration-analysis.md) for `swc-menu-item` rows, the **`submenu` slot** ( **submenu** **trigger** and child **`role="menu"`** in **`swc-menu-item`’s** **shadow** **DOM**, **popover** **anchoring** ), and link rows.

---

## ARIA and WCAG context

### Pattern in the APG

- [Menu button / actions](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/) — trigger opens `role="menu"`; plain items use `menuitem`; `menuitemcheckbox` / `menuitemradio` and selection UX sync with [Menu migration scope](../menu/accessibility-migration-analysis.md#migration-scope-current) when that work lands.
- [Menubar](https://www.w3.org/WAI/ARIA/apg/patterns/menubar/) — for submenu keystrokes and **child** `role="menu"` **surfaces** in **cascading** **menus** where relevant (item **`submenu` slot**; see [Menu item](../menu-item/accessibility-migration-analysis.md) and [Menu](../menu/accessibility-migration-analysis.md)).

### Guidelines that apply

| Idea | Plain meaning |
| --- | --- |
| [Name, role, value (4.1.2)](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value) | Trigger has button semantics and a name; menu and items are exposed per [Menu](../menu/accessibility-migration-analysis.md). Picker-style label gaps (for example [SWC-1174](https://jira.corp.adobe.com/browse/SWC-1174)) are separate Picker work, not the default for ellipses-only action menus—still require an accessible name on the control. |
| [Focus order (2.4.3)](https://www.w3.org/WAI/WCAG22/Understanding/focus-order) / [Focus visible (2.4.7)](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible) | Open moves focus into the menu; Escape returns focus to the trigger; roving tabindex in the list (`FocusgroupNavigationController`). |
| [Keyboard (2.1.1)](https://www.w3.org/WAI/WCAG22/Understanding/keyboard) | All commands from the [menu button](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/) pattern; no pointer-only submenus (1st-gen [SWC-1332](https://jira.corp.adobe.com/browse/SWC-1332), [SWC-671](https://jira.corp.adobe.com/browse/SWC-671)). |
| [Non-text contrast (1.4.11)](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast) | Focus indicators on items and submenu parents ([SWC-1517](https://jira.corp.adobe.com/browse/SWC-1517)). |

Bottom line: **`swc-action-menu`** is the ActionMenu-flavoured **full** menu-button host (same structural parts as **`swc-menu`**: trigger, **`swc-popover`**, **shadow-internal** **`role="menu"`** **surface** (**not** on the **`<swc-action-menu>`** **host**), slotted groups, items, dividers). **Submenus** are **item-scoped** via **`swc-menu-item`’s** **`submenu` slot** ( **submenu** **trigger** and **child** **`role="menu"`** **in** the **item**’s **shadow** **DOM**; **not** a **nested** **`swc-menu`** ). **Item**-level and **submenu** detail are in the [menu item doc](../menu-item/accessibility-migration-analysis.md) and the [menu doc](../menu/accessibility-migration-analysis.md); this doc focuses on ActionMenu trigger defaults, composition, and tests. Mobile tray and selectable rows defer per [Migration scope](../menu/accessibility-migration-analysis.md#migration-scope-current).

---

## Related 1st-gen accessibility (Jira)

| Jira | Type | Status (snapshot) | Resolution (snapshot) | Summary |
| --- | --- | --- | --- | --- |
| [SWC-617](https://jira.corp.adobe.com/browse/SWC-617) | Bug | — | Fixed | Remove `aria-activedescendant`; roving tabindex / focus group |
| [SWC-572](https://jira.corp.adobe.com/browse/SWC-572) | Bug | — | Fixed | Action menu / picker VoiceOver |
| [SWC-1488](https://jira.corp.adobe.com/browse/SWC-1488) | Bug | — | Fixed | Safari crash ActionMenu + VoiceOver |
| [SWC-1448](https://jira.corp.adobe.com/browse/SWC-1448) | Bug | — | Fixed | Refactor Picker / action menu split |
| [SWC-230](https://jira.corp.adobe.com/browse/SWC-230) | Bug | — | Fixed | Arrow keys when opened by mouse |
| [SWC-60](https://jira.corp.adobe.com/browse/SWC-60) | Bug | — | Fixed | Keyboard should start at first item |
| [SWC-923](https://jira.corp.adobe.com/browse/SWC-923) | Bug | To Do | Unresolved | `menu-item` + `href` double link (see [Menu](../menu/accessibility-migration-analysis.md)) |
| [SWC-1332](https://jira.corp.adobe.com/browse/SWC-1332) | Bug | To Do | Unresolved | Submenu custom content not keyboard accessible |
| [SWC-1941](https://jira.corp.adobe.com/browse/SWC-1941) | Bug | To Do | Unresolved | Space/Enter on menu item in modal + popover |
| [SWC-933](https://jira.corp.adobe.com/browse/SWC-933) / [SWC-932](https://jira.corp.adobe.com/browse/SWC-932) | Bug | Blocked / To Do | Unresolved | Picker arrow in popover list |
| [SWC-686](https://jira.corp.adobe.com/browse/SWC-686) | Bug | — | Unresolved | iOS submenu + VoiceOver closes tray |
| [SWC-671](https://jira.corp.adobe.com/browse/SWC-671) | Bug | Blocked | Unresolved | Submenus on mobile visibility |
| [SWC-1517](https://jira.corp.adobe.com/browse/SWC-1517) | Bug | To Do | Unresolved | Submenu item focus on hover Safari |
| [SWC-1174](https://jira.corp.adobe.com/browse/SWC-1174) | — | To Do | Unresolved | Picker visible label (Menu-related) |
| [SWC-89](https://jira.corp.adobe.com/browse/SWC-89) | Story | — | Unresolved | Touch submenu UI |
| [SWC-553](https://jira.corp.adobe.com/browse/SWC-553) | Bug | To Do | Unresolved | i18n strings (Picker + action menu context) |
| [SWC-577](https://jira.corp.adobe.com/browse/SWC-577) | Story | — | Done | Research accessible menu navigation |

---

## Recommendations: `<swc-action-menu>`

Normative item-level and submenu detail is in [Menu — Recommendations: `<swc-menu>`](../menu/accessibility-migration-analysis.md#recommendations-swc-menu). This section covers the **`swc-action-menu`** host and ActionMenu-specific **trigger** defaults; it does not re-specify **where** **`role="menu"`** **lives** (**internal** to **`swc-action-menu`’s** **shadow** **root**, as for **`swc-menu`**) or **nested** **submenu** **markup** (**`swc-menu-item`’s** **shadow** **DOM** when the **`submenu` slot** is used), which are **shared** with **`swc-menu`** via the same slotted primitives.

### ARIA roles, states, and properties

| Topic | What to do |
| --- | --- |
| Trigger | Button with `aria-haspopup="menu"`; `aria-expanded` matches open state; name (via `aria-label`, with "More..." as the default)([ActionMenu](https://react-spectrum.adobe.com/ActionMenu), `aria-label` on icon-only controls). |
| Relation to `swc-menu` | Both are full top-level menu-button hosts whose `role="menu"` is on an element inside each component’s shadow DOM (not the CE host): `swc-menu` follows [React Spectrum `Menu`](https://react-spectrum.adobe.com/Menu); `swc-action-menu` follows [React Spectrum `ActionMenu`](https://react-spectrum.adobe.com/ActionMenu) (see [Menu doc](../menu/accessibility-migration-analysis.md)). Do not set `role="listbox"` on that internal menu surface for this pattern. |
| No shortcut | Action menu is for commands; combobox + listbox is a different import and doc. |

### Shadow DOM and cross-root ARIA Issues

**Host shell (stays in shadow):** the ActionMenu trigger and the internal `role="menu"` node are implemented together in `swc-action-menu`’s shadow tree (same rule as [Menu — Recommendations: `swc-menu`](../menu/accessibility-migration-analysis.md#recommendations-swc-menu); verify in 2nd-gen source).

**Slotted list content (need not be in that shadow tree):** `swc-menu-item`, `swc-menu-group`, and `swc-menu-separator` are not required in that shadow subtree—authors typically slot them from the light DOM. The menu list does not use IDREF to each item; `FocusgroupNavigationController` handles in-menu roving focus. Do not nest one `swc-menu-group` inside another in the same list; groups in submenus are allowed (see [Menu group — What `swc-menu-group` is (2nd-gen)](../menu-group/accessibility-migration-analysis.md#what-swc-menu-group-is-2nd-gen)). See [Menu: Shadow DOM](../menu/accessibility-migration-analysis.md#shadow-dom-and-cross-root-aria-issues) for IDREF caveats (for example `aria-activedescendant` across roots) and related notes.

### Accessibility tree expectations

- Closed: focusable trigger; menu not in the tab order; `aria-expanded="false"`.
- Open: `aria-expanded="true"`; focus moves into the internal `role="menu"` surface (shadow tree) and items as in the [menu doc](../menu/accessibility-migration-analysis.md) (same menu-button pattern for `swc-menu` and `swc-action-menu`).

### Form-associated custom properties (labels, `ElementInternals`)

Does not apply to `swc-action-menu` as a form field; it is not a form-associated control. Label the button for accessibility.

### Live regions, loading, and announcements

Does not apply by default on the action menu host. Item-level busy states or toasts are out of scope for this primitive.

### Motion (dedicated recommendations subsection)

Intentionally omitted. If popover open/close uses motion, treat it like other layered UI; document reduced motion in sibling guideline docs only.

### Keyboard and focus

- Open from the trigger per the [menu button pattern](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/) (Arrow Up/Down, Space, Enter); in-menu navigation in the open internal `role="menu"` surface (`swc-menu` / `swc-action-menu` shadow tree, not the CE host; or a test harness) via [FocusgroupNavigationController](https://github.com/adobe/spectrum-web-components/pull/6129) (not `aria-activedescendant` in 2nd-gen; see [SWC-617](https://jira.corp.adobe.com/browse/SWC-617)). Use the same item-collection model as [`swc-menu`](../menu/accessibility-migration-analysis.md#keyboard-and-focus): the controller should look for `swc-menu-item` as direct list children and `swc-menu-item` under each direct `swc-menu-group`, e.g.:

  ```js
  this.querySelectorAll(':scope > swc-menu-item, :scope > swc-menu-group > swc-menu-item');
  ```

  (with `this` as the list context the controller binds to; verify in 2nd-gen source). Submenu keys on rows with a populated `submenu` slot per [Menu item — Keyboard and focus](../menu-item/accessibility-migration-analysis.md#keyboard-and-focus).
- Close: Escape returns focus to the trigger; see [Menu: Testing](../menu/accessibility-migration-analysis.md#testing) and action menu stories for submenu cases.

---

## Testing

### Automated tests

| Kind of test | What to check |
| --- | --- |
| aXe / Storybook | Open/closed; no duplicate link activation for `href` items (see [SWC-923](https://jira.corp.adobe.com/browse/SWC-923) and [Menu doc](../menu/accessibility-migration-analysis.md)). |
| Playwright / ARIA snapshots | Trigger plus **internal** **`role="menu"`** **(shadow** **markup**, **not** the **CE** **host**)** (1st-gen E2E themes: [SWC-1941](https://jira.corp.adobe.com/browse/SWC-1941), [SWC-230](https://jira.corp.adobe.com/browse/SWC-230), [SWC-60](https://jira.corp.adobe.com/browse/SWC-60)); **cascading** **menu** via **`submenu` slot** ( **trigger** + **`role="menu"`** in **`swc-menu-item`’s** **shadow** **DOM** ) ([SWC-1332](https://jira.corp.adobe.com/browse/SWC-1332)). |
| iOS / VoiceOver | Covered (see [SWC-686](https://jira.corp.adobe.com/browse/SWC-686), [SWC-1488](https://jira.corp.adobe.com/browse/SWC-1488), [SWC-572](https://jira.corp.adobe.com/browse/SWC-572)). |

### Keyboard testing

Follow the 2nd-gen Storybook [Keyboard testing](../../../../2nd-gen/packages/swc/.storybook/guides/accessibility-guides/keyboard_testing.mdx) guide on a fully composed path (**`swc-action-menu`** or **`swc-menu`**: **trigger** + **internal** **`role="menu"`** **(shadow)** + **`swc-popover`**, not the 1st-gen overlay stack). Cover the [menu button pattern](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/) on the trigger (open/close, focus return) and in-menu keys on the **open** **menu** **surface** ([FocusgroupNavigationController](https://github.com/adobe/spectrum-web-components/pull/6129)); include Escape, **submenu** **item** / **`submenu` slot** cases, and small-viewport popover positioning as relevant. See [Menu: Keyboard testing](../menu/accessibility-migration-analysis.md#keyboard-testing) for list-surface detail, [Menu item: Keyboard and focus](../menu-item/accessibility-migration-analysis.md#keyboard-and-focus) for **submenu** **rows**, and [Recommendations: Keyboard and focus](#keyboard-and-focus) here.

### Playwright-only or host-only accessibility gates

Mirror test cases from 1st-gen defects in the Jira table; add 2nd-gen stories for ellipsis, icon naming, and a fully composed **Action menu** (or **Menu**) path: **trigger** + **top-level** **`swc-popover`**. Mobile tray is out of scope for the current migration (no separate tray test branch here).

### Manual and screen reader testing

- macOS + iOS VoiceOver, NVDA; follow [Keyboard testing](#keyboard-testing) and [Screen reader testing](../../../../2nd-gen/packages/swc/.storybook/guides/accessibility-guides/screen_reader_testing.mdx) on a fully composed **`swc-action-menu`** (or equivalent **Menu** host) path (**trigger** + **`swc-popover`**, not the 1st-gen overlay stack).
- Submenus and mobile/touch ([SWC-686](https://jira.corp.adobe.com/browse/SWC-686), [SWC-89](https://jira.corp.adobe.com/browse/SWC-89)): tray-related issues may not apply until tray is in scope; still verify popover-positioned menus on small viewports where relevant.

Do not require checkbox or radio menu item stories or selection-mode coverage until [Menu migration scope](../menu/accessibility-migration-analysis.md#migration-scope-current) closes; the APG [editor menubar example](https://www.w3.org/WAI/ARIA/apg/patterns/menubar/examples/menubar-editor/) remains a future reference when that work ships.

### Submenu (submenu slot) tests

If 2nd-gen supports **cascading** **menus** via **`swc-menu-item`’s** **`submenu` slot** (see [Menu item — Testing](../menu-item/accessibility-migration-analysis.md#testing), [Menu: Testing](../menu/accessibility-migration-analysis.md#testing), and [SWC-671](https://jira.corp.adobe.com/browse/SWC-671) / [SWC-89](https://jira.corp.adobe.com/browse/SWC-89)), add ARIA and keyboard end-to-end tests for at least one two-level path (**submenu** **trigger** and **child** **`role="menu"`** in **`swc-menu-item`’s** **shadow** **DOM** + **popover** **anchoring** as **implemented**).

---

## Summary checklist

- [ ] ActionMenu-style trigger (ellipses + optional label or override) with a named icon-only default; separate from combobox/Picker ([SWC-1174](https://jira.corp.adobe.com/browse/SWC-1174); separate stories if needed).
- [ ] **`swc-menu`** and **`swc-action-menu`** are each **documented** as **full** **menu-button** **hosts** (see [Menu — Overview](../menu/accessibility-migration-analysis.md#overview)); **`role="menu"`** is **on** a **node** **inside** each **component**’s **shadow** **DOM**, **not** the **CE** **host**; **not** a **model** where **one** is **only** the **list** and the **other** **only** the **trigger**. **Submenus** use **`swc-menu-item`’s** **`submenu` slot** ( **submenu** **trigger** and **`role="menu"`** in **`swc-menu-item`’s** **shadow** **DOM**; **not** a **nested** **`swc-menu`** in the list ).
- [ ] Open/close + role wiring vs in-list keys (see [Menu doc](../menu/accessibility-migration-analysis.md)—may split controller, `swc-popover`, `swc-menu`, `swc-action-menu`); `FocusgroupNavigationController` for in-menu movement; `swc-popover` anchors the surface (not 1st-gen overlay). [Migration scope](../menu/accessibility-migration-analysis.md#migration-scope-current): mobile tray and menu item selection defer pending clarification.
- [ ] Jira backlog (1st-gen table above) triaged alongside current migration work in Jira; tests for `swc-popover`-positioned menus (no tray branch in this scope).
- [ ] iOS, touch, and submenus ([SWC-686](https://jira.corp.adobe.com/browse/SWC-686), [SWC-89](https://jira.corp.adobe.com/browse/SWC-89), [SWC-1332](https://jira.corp.adobe.com/browse/SWC-1332), [SWC-671](https://jira.corp.adobe.com/browse/SWC-671))—SWC-686 references 1st-gen tray; revalidate against `swc-popover` where applicable.

---

## References

- [React Spectrum: ActionMenu](https://react-spectrum.adobe.com/ActionMenu)
- [React Spectrum: Menu](https://react-spectrum.adobe.com/Menu)
- [WAI-ARIA APG: Menu button (actions) example](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/examples/menu-button-actions/)
- [Menu accessibility migration analysis](../menu/accessibility-migration-analysis.md)
- [Menu group accessibility migration analysis](../menu-group/accessibility-migration-analysis.md)
- [Menu item accessibility migration analysis](../menu-item/accessibility-migration-analysis.md)
- [Popover accessibility migration analysis](../popover/accessibility-migration-analysis.md)
- [PR #6129 — Focusgroup navigation](https://github.com/adobe/spectrum-web-components/pull/6129)
- [2nd-gen Storybook: Keyboard testing](../../../../2nd-gen/packages/swc/.storybook/guides/accessibility-guides/keyboard_testing.mdx)
- [2nd-gen Storybook: Screen reader testing](../../../../2nd-gen/packages/swc/.storybook/guides/accessibility-guides/screen_reader_testing.mdx)
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/)

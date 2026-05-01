<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../../README.md) / [Project planning](../../README.md) / [Components](../README.md) / Action Menu / Action menu accessibility migration analysis

<!-- Document title (editable) -->

# Action menu accessibility migration analysis

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [Overview](#overview)
    - [In short](#in-short)
    - [Migration scope (current)](#migration-scope-current)
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

This page is for 2nd-gen `swc-action-menu` in Spectrum Web Components. It is the [ActionMenu](https://react-spectrum.adobe.com/ActionMenu)-flavored host (often a “more” or ellipses control). The goal is [WCAG 2.2](https://www.w3.org/TR/WCAG22/) Level AA.

### In short

- `swc-action-menu` is a full [menu button](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/) host, like [`swc-menu`](../menu/accessibility-migration-analysis.md). It has a trigger, `swc-popover` (or similar) for the open layer, and a `role="menu"` list in shadow DOM—not on the custom element.
- The menu slot holds only `swc-menu-item`, `swc-menu-group`, and `swc-menu-separator`. Do not nest another `swc-menu` or `swc-action-menu` in that slot. Submenus use the menu item [`submenu` slot](../menu-item/accessibility-migration-analysis.md#what-swc-menu-item-is-2nd-gen).
- Mobile tray and checkbox/radio style rows are out of scope for now ([Menu — Migration scope](../menu/accessibility-migration-analysis.md#migration-scope-current)).
- **Target:** [WCAG 2.2](https://www.w3.org/TR/WCAG22/) Level AA. Menu items that work like checkboxes or radios are out of scope for now ([Migration scope](#migration-scope-current)).

[Popover](../popover/accessibility-migration-analysis.md) only positions the layer. Menu roles and in-menu keys live in `swc-action-menu` / `swc-menu` (see [Menu: What `swc-menu` is](../menu/accessibility-migration-analysis.md#what-swc-menu-is-2nd-gen)).

### Migration scope (current)

These items wait on a single product decision from design and accessibility:

- **Mobile tray** — small-screen / bottom sheet (covered in other docs here).
- **Selectable menu items** — checkboxes, radios, `aria-checked`, and multi-select. This doc still points to the [APG](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/) for when that work ships; do not treat those rows as final for 2nd-gen until that work closes.

### Also read

- [Action menu migration roadmap](./rendering-and-styling-migration-analysis.md) for DOM, CSS, and API.
- [Menu a11y doc](../menu/accessibility-migration-analysis.md) — `swc-menu` as a parallel top-level host, `FocusgroupNavigationController`, [Migration scope](../menu/accessibility-migration-analysis.md#migration-scope-current), link rows ([Cards](https://inclusive-components.design/cards/)).
- [Popover a11y doc](../popover/accessibility-migration-analysis.md) — `swc-popover` and layering; it does not replace the internal `role="menu"` wiring in menu hosts.

### What `swc-action-menu` is (2nd-gen)

- Same parts as `swc-menu` ([Menu doc](../menu/accessibility-migration-analysis.md)): trigger, `swc-popover` for the open layer, `role="menu"` inside the shadow tree, menu slot for item / group / separator. Defaults follow React Spectrum's [ActionMenu](https://react-spectrum.adobe.com/ActionMenu) (ellipses / “more”); check 2nd-gen source for final DOM.
- Not a [combobox](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/) or [Picker](https://react-spectrum.adobe.com/Picker) field ([When to use something else](../menu/accessibility-migration-analysis.md#when-to-use-something-else) on the menu doc).
- Use `swc-popover` for placement, not the old overlay stack as the default. Tray and selection rows follow [Menu — Migration scope](../menu/accessibility-migration-analysis.md#migration-scope-current).

### When to use something else

- Picker with a text field — [APG combobox](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/); `swc-picker` or `swc-combobox`, not the menu.
- Main site nav — [disclosure navigation](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/); e.g. `uec-sidenav` or `swc-sidenav`.
- Modal work — [dialog (modal) pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/); you may still reuse popover-style chrome on the frame ([Popover](../popover/accessibility-migration-analysis.md)).
- A control that is not the ActionMenu / “more” look — use [`swc-menu`](../menu/accessibility-migration-analysis.md) with the right trigger.

### What it is not

- Not `swc-popover` alone: the action menu and menu host own shadow DOM ARIA and list keyboard navigation. Popover positions and may help dismiss; see [Menu: What it is not](../menu/accessibility-migration-analysis.md#what-it-is-not).
- Not slotted as a child of `swc-menu`, `swc-action-menu`, or `swc-menu-item`. For nested menus, use the menu item `submenu` slot.
- Not a modal. Modal chrome is covered in the [Popover doc — Overview](../popover/accessibility-migration-analysis.md#overview).

### Related

- [Menu a11y doc](../menu/accessibility-migration-analysis.md) — `swc-menu`, items, submenus, links, [scope](../menu/accessibility-migration-analysis.md#migration-scope-current).
- [Menu group a11y doc](../menu-group/accessibility-migration-analysis.md) — `swc-menu-group` under `swc-menu`, `swc-action-menu`, or `swc-menu-item` (submenu list).
- [Menu separator a11y doc](../menu-separator/accessibility-migration-analysis.md) — `swc-menu-separator` as a direct list row, not under a group; in docs, prefer it between [labelled groups](../menu-group/accessibility-migration-analysis.md#what-swc-menu-group-is-2nd-gen) ([Overview](../menu-separator/accessibility-migration-analysis.md#overview)).
- [Menu item a11y doc](../menu-item/accessibility-migration-analysis.md) — rows, `submenu` slot, link rows.

---

## ARIA and WCAG context

### Pattern in the APG

- [Menu button / actions](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/) — trigger opens `role="menu"`; plain items use `menuitem`; `menuitemcheckbox` / `menuitemradio` and selection UX sync with [Menu migration scope](../menu/accessibility-migration-analysis.md#migration-scope-current) when that work lands.
- [Menubar](https://www.w3.org/WAI/ARIA/apg/patterns/menubar/) — for submenu keystrokes and **child** `role="menu"` **surfaces** in **cascading** **menus** where relevant (item **`submenu` slot**; see [Menu item](../menu-item/accessibility-migration-analysis.md) and [Menu](../menu/accessibility-migration-analysis.md)).

### Guidelines that apply

| Idea | Plain meaning |
| --- | --- |
| [Name, role, value (4.1.2)](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value) | Trigger has button semantics and a name; menu and items are exposed per [Menu](../menu/accessibility-migration-analysis.md). Ellipses-only action menus still need a name. Disabled `swc-menu-item` rows use `aria-disabled="true"` when the row is disabled and cannot be activated, same as [Menu item — ARIA: Disabled row](../menu-item/accessibility-migration-analysis.md#aria-roles-states-and-properties) and [Menu — Guidelines that apply](../menu/accessibility-migration-analysis.md#guidelines-that-apply). |
| [Focus order (2.4.3)](https://www.w3.org/WAI/WCAG22/Understanding/focus-order) / [Focus visible (2.4.7)](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible) | Open moves focus into the menu; Escape returns focus to the trigger; roving tabindex in the list (`FocusgroupNavigationController`). |
| [Keyboard (2.1.1)](https://www.w3.org/WAI/WCAG22/Understanding/keyboard) | All commands from the [menu button](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/) pattern; no pointer-only submenus (1st-gen [SWC-1332](https://jira.corp.adobe.com/browse/SWC-1332), [SWC-671](https://jira.corp.adobe.com/browse/SWC-671)). |
| [Non-text contrast (1.4.11)](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast) | Focus indicators on items and submenu parents ([SWC-1517](https://jira.corp.adobe.com/browse/SWC-1517)). |

**Bottom line:** `swc-action-menu` is a full menu-button host like `swc-menu` (trigger, `swc-popover`, `role="menu"` in shadow DOM, items / groups / separators in the menu slot). Submenus sit on `swc-menu-item` in its shadow tree, not a second `swc-menu` in the list. Row and submenu details are in the [menu item doc](../menu-item/accessibility-migration-analysis.md) and [menu doc](../menu/accessibility-migration-analysis.md). This doc centers ActionMenu trigger defaults, wiring, and tests. Tray and selectable rows follow [Migration scope](../menu/accessibility-migration-analysis.md#migration-scope-current).

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

Item- and submenu-level rules live in [Menu — Recommendations: `swc-menu`](../menu/accessibility-migration-analysis.md#recommendations-swc-menu). Here: the `swc-action-menu` host and ActionMenu trigger defaults. Where `role="menu"` lives and how the `submenu` slot works match `swc-menu`—same [menu slot rules](../menu/accessibility-migration-analysis.md#recommendations-swc-menu) (no nested `swc-menu` / `swc-action-menu`; only item, group, separator in the menu slot for current scope).

### ARIA roles, states, and properties

| Topic | What to do |
| --- | --- |
| Host placement | `swc-menu` and `swc-action-menu` are not slotted into `swc-menu`, `swc-action-menu`, or `swc-menu-item`. They are top-level [menu button](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/) hosts. |
| Menu slot (current migration) | Intended children: only `swc-menu-item`, `swc-menu-group`, and `swc-menu-separator`. Do not depend on other types in that slot (check 2nd-gen source). |
| Trigger | Button: `aria-haspopup="menu"`; `aria-expanded` matches open/closed. Name the control (`aria-label`; icon-only needs a name) ([ActionMenu](https://react-spectrum.adobe.com/ActionMenu) defaults, e.g. “More...”). |
| Internal `role="menu"` (not the CE host) | The menu-button trigger and the internal `role="menu"` node are implemented together in `swc-action-menu`’s (or `swc-menu`’s) shadow DOM—`role="menu"` is not on the `<swc-menu>` / `<swc-action-menu>` custom element host, and the host design keeps the trigger and menu surface in that shadow tree together. Verify final markup in 2nd-gen source before shipping docs. |
| Relation to `swc-menu` | Both `swc-action-menu` and `swc-menu` hosts put `role="menu"` in shadow DOM, not on the custom element. `swc-menu` ~ [Menu](https://react-spectrum.adobe.com/Menu); `swc-action-menu` ~ [ActionMenu](https://react-spectrum.adobe.com/ActionMenu) ([Menu doc](../menu/accessibility-migration-analysis.md)). Do not use `role="listbox"` on the internal list for this pattern. |
| No shortcut | Action menu is for commands, not a combobox + listbox. |
| Disabled `swc-menu-item` | Each disabled item sets `aria-disabled="true"` and must not run its action when disabled (roving focus may still visit the row; see [Menu item — ARIA: Disabled row](../menu-item/accessibility-migration-analysis.md#aria-roles-states-and-properties) and [Menu — Recommendations: `swc-menu`](../menu/accessibility-migration-analysis.md#recommendations-swc-menu). |

### Shadow DOM and cross-root ARIA Issues

**Host shell (stays in shadow):** the ActionMenu trigger and the internal `role="menu"` node are implemented together in `swc-action-menu`’s shadow tree (same rule as [Menu — Recommendations: `swc-menu`](../menu/accessibility-migration-analysis.md#recommendations-swc-menu); verify in 2nd-gen source).

**Slotted menu content** does not have to sit inside the trigger’s shadow tree, but: do not slot `swc-menu` or `swc-action-menu` into `swc-menu`, `swc-action-menu`, or `swc-menu-item`. The menu slot is for `swc-menu-item`, `swc-menu-group`, and `swc-menu-separator` only. `swc-menu-group` and `swc-menu-separator` are direct list children of those three parents; see [Menu group](../menu-group/accessibility-migration-analysis.md#what-swc-menu-group-is-2nd-gen), [Menu item](../menu-item/accessibility-migration-analysis.md#what-swc-menu-item-is-2nd-gen), and [Menu separator](../menu-separator/accessibility-migration-analysis.md#what-the-menu-separator-is-swc-menu-separator-2nd-gen). Roving focus uses `FocusgroupNavigationController`, not IDREF to each item. See [Menu: Shadow DOM](../menu/accessibility-migration-analysis.md#shadow-dom-and-cross-root-aria-issues) for cross-root ID issues.

### Accessibility tree expectations

- Closed: focusable trigger; menu not in the tab order; `aria-expanded="false"`.
- Open: `aria-expanded="true"`; focus moves into the internal `role="menu"` surface (shadow tree) and items as in the [menu doc](../menu/accessibility-migration-analysis.md) (same menu-button pattern for `swc-menu` and `swc-action-menu`). Disabled `swc-menu-item` rows expose `aria-disabled="true"` as in the [menu doc — Accessibility tree expectations](../menu/accessibility-migration-analysis.md#accessibility-tree-expectations) and [Menu item — ARIA: Disabled row](../menu-item/accessibility-migration-analysis.md#aria-roles-states-and-properties).

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
- **Printable character navigation (optional; not typeahead):** `swc-action-menu` uses the same in-list keyboard model as `swc-menu`—arrows, Home, End, and the same optional printable-character rules for the open `role="menu"`. It is **not** combobox **typeahead** on a text field. Submenus inside `swc-menu-item` should match. See [Menu — Printable character navigation (optional; not typeahead)](../menu/accessibility-migration-analysis.md#printable-character-navigation-optional-not-typeahead).
- **Disabled items:** `aria-disabled="true"` and no activation on Enter/Space when a `swc-menu-item` is disabled, per [Menu item — ARIA: Disabled row](../menu-item/accessibility-migration-analysis.md#aria-roles-states-and-properties) and [Menu — Keyboard and focus](../menu/accessibility-migration-analysis.md#keyboard-and-focus).
- Close: Escape returns focus to the trigger; see [Menu: Testing](../menu/accessibility-migration-analysis.md#testing) and action menu stories for submenu cases.

---

## Testing

### Automated tests

| Kind of test | What to check |
| --- | --- |
| aXe / Storybook | Open/closed; `aria-disabled` on disabled items as implemented ([Menu item — ARIA](../menu-item/accessibility-migration-analysis.md#aria-roles-states-and-properties), [Menu doc](../menu/accessibility-migration-analysis.md)); no duplicate link activation for `href` items ([SWC-923](https://jira.corp.adobe.com/browse/SWC-923)). |
| Playwright / ARIA snapshots | Trigger plus internal `role="menu"` in shadow DOM, not the CE host ([SWC-1941](https://jira.corp.adobe.com/browse/SWC-1941), [SWC-230](https://jira.corp.adobe.com/browse/SWC-230), [SWC-60](https://jira.corp.adobe.com/browse/SWC-60)); cascading menu via `submenu` slot (trigger + `role="menu"` in `swc-menu-item` shadow) ([SWC-1332](https://jira.corp.adobe.com/browse/SWC-1332)). |
| iOS / VoiceOver | Covered (see [SWC-686](https://jira.corp.adobe.com/browse/SWC-686), [SWC-1488](https://jira.corp.adobe.com/browse/SWC-1488), [SWC-572](https://jira.corp.adobe.com/browse/SWC-572)). |

### Keyboard testing

Follow the 2nd-gen Storybook [Keyboard testing](../../../../2nd-gen/packages/swc/.storybook/guides/accessibility-guides/keyboard_testing.mdx) guide on a fully composed path (**`swc-action-menu`** or **`swc-menu`**: **trigger** + **internal** **`role="menu"`** **(shadow)** + **`swc-popover`**, not the 1st-gen overlay stack). Cover the [menu button pattern](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/) on the trigger (open/close, focus return) and in-menu keys on the **open** **menu** **surface** ([FocusgroupNavigationController](https://github.com/adobe/spectrum-web-components/pull/6129)); if implemented, cover [printable character navigation (not typeahead)](../menu/accessibility-migration-analysis.md#printable-character-navigation-optional-not-typeahead) on the top-level list and in submenus. Include Escape, **submenu** **item** / **`submenu` slot** cases, and small-viewport popover positioning as relevant. See [Menu: Keyboard testing](../menu/accessibility-migration-analysis.md#keyboard-testing) for menu surface detail, [Menu item: Keyboard and focus](../menu-item/accessibility-migration-analysis.md#keyboard-and-focus) for **submenu** **rows**, and [Recommendations: Keyboard and focus](#keyboard-and-focus) here.

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

- [ ] ActionMenu trigger (ellipses, optional label) with a clear name on icon-only controls; keep separate from combobox / Picker stories ([SWC-1174](https://jira.corp.adobe.com/browse/SWC-1174)).
- [ ] Both `swc-menu` and `swc-action-menu` are full menu-button hosts; `role="menu"` is in shadow DOM, not the CE host ([Menu — Overview](../menu/accessibility-migration-analysis.md#overview)). Do not slot `swc-menu` / `swc-action-menu` as list children. Menu slot: only item, group, separator (check source). Submenus: `submenu` slot on `swc-menu-item` in shadow, not a nested `swc-menu` in the list.
- [ ] Disabled `swc-menu-item` rows: `aria-disabled="true"` and no activation when disabled, aligned with [Menu item — ARIA: Disabled row](../menu-item/accessibility-migration-analysis.md#aria-roles-states-and-properties) and [Menu — Recommendations](../menu/accessibility-migration-analysis.md#recommendations-swc-menu).
- [ ] Open/close and keyboard wiring (see [Menu doc](../menu/accessibility-migration-analysis.md); may split controller, `swc-popover`, menu hosts). `FocusgroupNavigationController` for in-list move; `swc-popover` anchors the layer. If implemented, [printable character navigation (not typeahead)](../menu/accessibility-migration-analysis.md#printable-character-navigation-optional-not-typeahead) on `swc-action-menu` and submenus matches `swc-menu`. Tray and item selection: [Migration scope](../menu/accessibility-migration-analysis.md#migration-scope-current).
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

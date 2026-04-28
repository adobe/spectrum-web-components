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
    - [Nested menu tests](#nested-menu-tests)
- [Summary checklist](#summary-checklist)
- [References](#references)

</details>

<!-- Document content (editable) -->

## Overview

This document sets accessibility expectations for 2nd-gen Action menu in Spectrum Web Components: `swc-action-menu`, a menu button that opens `swc-menu`, positioned with `swc-popover` (not the 1st-gen overlay system). Mobile tray and menu item selection (checkbox / radio rows, `aria-checked`, modes) are out of scope pending design and accessibility clarification; see [Menu — Migration scope (current)](../menu/accessibility-migration-analysis.md#migration-scope-current). The target is **WCAG 2.2 Level AA**. Product alignment: [React Spectrum `ActionMenu`](https://react-spectrum.adobe.com/ActionMenu)—an action button with a “more” (typically ellipses) icon that opens a command menu; same APG model as [React Spectrum `Menu`](https://react-spectrum.adobe.com/Menu) with MenuTrigger (trigger + list).

`swc-menu`, group / separator / submenu and link item patterns, where open/close and role wiring ship (possibly a controller, **`swc-popover`**, and **`swc-menu` / `swc-action-menu`** together—see the menu doc), layered popover vs modal chrome, and [migration scope](../menu/accessibility-migration-analysis.md#migration-scope-current) (what is not locked for this wave) are covered in [Menu accessibility migration analysis](../menu/accessibility-migration-analysis.md) and [Popover accessibility migration analysis](../popover/accessibility-migration-analysis.md).

### Also read

- [Action menu migration roadmap](./rendering-and-styling-migration-analysis.md) — 2nd-gen DOM, CSS, and API (placeholder until expanded).
- [Menu accessibility migration analysis](../menu/accessibility-migration-analysis.md) — `swc-menu` only with a parent trigger; `FocusgroupNavigationController`; no stand-alone menu; [Migration scope](../menu/accessibility-migration-analysis.md#migration-scope-current); link row pattern ([Inclusive Components: Cards](https://inclusive-components.design/cards/)).
- [Popover accessibility migration analysis](../popover/accessibility-migration-analysis.md) — `swc-popover` anchors the layered surface and may participate in open/dismiss wiring as implemented; **`swc-action-menu`** and **`swc-menu`** own **`role="menu"`** and in-menu keyboard when the menu is open (see [Menu: Two coordination pieces](../menu/accessibility-migration-analysis.md#what-swc-menu-is-2nd-gen) for how responsibility may split—not the popover host alone).

### What `swc-action-menu` is (2nd-gen)

- A host that composes a button (`aria-haspopup="menu"`, `aria-expanded`, `aria-controls` or equivalent when valid in the same root) with a `swc-menu` list surface in one composable subtree so cross-root IDREFs are not required between unrelated shadow roots.
- Default trigger chrome for the "more actions" pattern, matching [ActionMenu](https://react-spectrum.adobe.com/ActionMenu): icon-only or labelled more actions per design; not a generic text picker (that is combobox / Picker territory).
- Positioning for the open menu uses `swc-popover`; do not rely on 1st-gen overlay for 2nd-gen menu placement. Mobile tray is out of scope for the current migration (no tray-vs-popover branch in these docs for now).

### When to use something else

- Single-select from a field with or without a textbox — [APG combobox](../menu/accessibility-migration-analysis.md#when-to-use-something-else); not action menu.
- Page navigation by links only — [disclosure navigation](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/); do not apply `role="menu"` for a plain link list without a menu button contract.

### What it is not

- Not `<swc-popover>` by itself: **`swc-action-menu`** and **`swc-menu`** orchestrate APG menu button semantics and in-list keyboard; `swc-popover` anchors the surface and may participate in layered open/dismiss mechanics as implemented, but it does not replace **`role="menu"`** or in-menu keys on the popover host alone (see [Menu](../menu/accessibility-migration-analysis.md#what-swc-menu-is-2nd-gen)).
- Not a modal dialog; for modal chrome that reuses shared popover styles, see [Modal dialogs](../popover/accessibility-migration-analysis.md#overview) in the popover a11y doc (including styles without a `swc-popover` host).

### Related

- [Menu accessibility migration analysis](../menu/accessibility-migration-analysis.md) for `swc-menu`, `menuitem`, submenus, link items, and [migration scope](../menu/accessibility-migration-analysis.md#migration-scope-current) (selection variants defer until clarification).
- [Menu group accessibility migration analysis](../menu-group/accessibility-migration-analysis.md) for `swc-menu-group`.
- [Menu divider accessibility migration analysis](../menu-divider/accessibility-migration-analysis.md) for `swc-menu-divider`.
- [Menu item accessibility migration analysis](../menu-item/accessibility-migration-analysis.md) for `swc-menu-item` rows (including link rows).

---

## ARIA and WCAG context

### Pattern in the APG

- [Menu button / actions](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/) — trigger opens `role="menu"`; plain items use `menuitem`; `menuitemcheckbox` / `menuitemradio` and selection UX sync with [Menu migration scope](../menu/accessibility-migration-analysis.md#migration-scope-current) when that work lands.
- [Menubar](https://www.w3.org/WAI/ARIA/apg/patterns/menubar/) — for submenu keystrokes and nested `role="menu"` surfaces where relevant (see [Menu](../menu/accessibility-migration-analysis.md) for item-level detail).

### Guidelines that apply

| Idea | Plain meaning |
| --- | --- |
| [Name, role, value (4.1.2)](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value) | Trigger has button semantics and a name; menu and items are exposed per [Menu](../menu/accessibility-migration-analysis.md). Picker-style label gaps (for example [SWC-1174](https://jira.corp.adobe.com/browse/SWC-1174)) are separate Picker work, not the default for ellipses-only action menus—still require an accessible name on the control. |
| [Focus order (2.4.3)](https://www.w3.org/WAI/WCAG22/Understanding/focus-order) / [Focus visible (2.4.7)](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible) | Open moves focus into the menu; Escape returns focus to the trigger; roving tabindex in the list (`FocusgroupNavigationController`). |
| [Keyboard (2.1.1)](https://www.w3.org/WAI/WCAG22/Understanding/keyboard) | All commands from the [menu button](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/) pattern; no pointer-only submenus (1st-gen [SWC-1332](https://jira.corp.adobe.com/browse/SWC-1332), [SWC-671](https://jira.corp.adobe.com/browse/SWC-671)). |
| [Non-text contrast (1.4.11)](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast) | Focus indicators on items and submenu parents ([SWC-1517](https://jira.corp.adobe.com/browse/SWC-1517)). |

Bottom line: `swc-action-menu` is the public menu button API (including ellipsis ActionMenu alignment and trigger chrome such as icon-only vs visible label); `swc-menu` and `menuitem` behavior are covered in the [menu doc](../menu/accessibility-migration-analysis.md); placement uses `swc-popover` (not 1st-gen overlay), with open/close and role wiring possibly split across controller, popover, and menu hosts as described there. [Migration scope](../menu/accessibility-migration-analysis.md#migration-scope-current): mobile tray and menu item selection defer until design and accessibility clarification.

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

Normative item-level and submenu detail is in [Menu — Recommendations: `<swc-menu>`](../menu/accessibility-migration-analysis.md#recommendations-swc-menu). This section covers the action-menu host and trigger-to-list composition only.

### ARIA roles, states, and properties

| Topic | What to do |
| --- | --- |
| Trigger | Button with `aria-haspopup="menu"`; `aria-expanded` matches open state; name (visible text, `aria-label`, or `aria-labelledby`) even when the default is ellipses-only ([ActionMenu](https://react-spectrum.adobe.com/ActionMenu), `aria-label` on icon-only controls). |
| Relation to `swc-menu` | `swc-menu` has `role="menu"`; see [Menu doc](../menu/accessibility-migration-analysis.md). Do not set `role="listbox"` on the same list for this pattern. |
| No shortcut | Action menu is for commands; combobox + listbox is a different import and doc. |

### Shadow DOM and cross-root ARIA Issues

Keep the button and `swc-menu` (and popover or slot targets for IDs as implemented) in one composable subtree so ID-based ARIA and focus hand-off do not require crossing unconnected shadow roots. See [Menu: Shadow DOM](../menu/accessibility-migration-analysis.md#shadow-dom-and-cross-root-aria-issues).

### Accessibility tree expectations

- Closed: focusable trigger; menu not in the tab order; `aria-expanded="false"`.
- Open: `aria-expanded="true"`; focus inside `swc-menu`; items as in the menu doc.

### Form-associated custom properties (labels, `ElementInternals`)

Does not apply to `swc-action-menu` as a form field; it is not a form-associated control. Label the button for accessibility.

### Live regions, loading, and announcements

Does not apply by default on the action menu host. Item-level busy states or toasts are out of scope for this primitive.

### Motion (dedicated recommendations subsection)

Intentionally omitted. If popover open/close uses motion, treat it like other layered UI; document reduced motion in sibling guideline docs only.

### Keyboard and focus

- Open from the trigger per the [menu button pattern](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/) (Arrow Up/Down, Space, Enter); in-menu navigation in `swc-menu` via [FocusgroupNavigationController](https://github.com/adobe/spectrum-web-components/pull/6129) (not `aria-activedescendant` in 2nd-gen; see [SWC-617](https://jira.corp.adobe.com/browse/SWC-617)).
- Close: Escape returns focus to the trigger; see [Menu: Testing](../menu/accessibility-migration-analysis.md#testing) and action menu stories for submenu cases.

---

## Testing

### Automated tests

| Kind of test | What to check |
| --- | --- |
| aXe / Storybook | Open/closed; no duplicate link activation for `href` items (see [SWC-923](https://jira.corp.adobe.com/browse/SWC-923) and [Menu doc](../menu/accessibility-migration-analysis.md)). |
| Playwright / ARIA snapshots | Trigger plus menu (1st-gen E2E themes: [SWC-1941](https://jira.corp.adobe.com/browse/SWC-1941), [SWC-230](https://jira.corp.adobe.com/browse/SWC-230), [SWC-60](https://jira.corp.adobe.com/browse/SWC-60)); submenu ([SWC-1332](https://jira.corp.adobe.com/browse/SWC-1332)). |
| iOS / VoiceOver | Covered (see [SWC-686](https://jira.corp.adobe.com/browse/SWC-686), [SWC-1488](https://jira.corp.adobe.com/browse/SWC-1488), [SWC-572](https://jira.corp.adobe.com/browse/SWC-572)). |

### Keyboard testing

Follow the 2nd-gen Storybook [Keyboard testing](../../../../2nd-gen/packages/swc/.storybook/guides/accessibility-guides/keyboard_testing.mdx) guide on a fully composed path (trigger + `swc-menu` + `swc-popover`, not the 1st-gen overlay stack). Cover the [menu button pattern](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/) on the trigger (open/close, focus return) and in-menu keys on `swc-menu` ([FocusgroupNavigationController](https://github.com/adobe/spectrum-web-components/pull/6129)); include Escape, submenu cases, and small-viewport popover positioning as relevant. See [Menu: Keyboard testing](../menu/accessibility-migration-analysis.md#keyboard-testing) for list-surface detail and [Recommendations: Keyboard and focus](#keyboard-and-focus).

### Playwright-only or host-only accessibility gates

Mirror test cases from 1st-gen defects in the Jira table; add 2nd-gen stories for ellipsis, icon naming, and a fully composed trigger + `swc-menu` + `swc-popover`. Mobile tray is out of scope for the current migration (no separate tray test branch here).

### Manual and screen reader testing

- macOS + iOS VoiceOver, NVDA; follow [Keyboard testing](#keyboard-testing) and [Screen reader testing](../../../../2nd-gen/packages/swc/.storybook/guides/accessibility-guides/screen_reader_testing.mdx) on a fully composed path (trigger + `swc-menu` + `swc-popover`), not the 1st-gen overlay stack.
- Submenus and mobile/touch ([SWC-686](https://jira.corp.adobe.com/browse/SWC-686), [SWC-89](https://jira.corp.adobe.com/browse/SWC-89)): tray-related issues may not apply until tray is in scope; still verify popover-positioned menus on small viewports where relevant.

Do not require checkbox or radio menu item stories or selection-mode coverage until [Menu migration scope](../menu/accessibility-migration-analysis.md#migration-scope-current) closes; the APG [editor menubar example](https://www.w3.org/WAI/ARIA/apg/patterns/menubar/examples/menubar-editor/) remains a future reference when that work ships.

### Nested menu tests

If 2nd-gen keeps submenus (see [Menu: Testing](../menu/accessibility-migration-analysis.md#testing) and [SWC-671](https://jira.corp.adobe.com/browse/SWC-671) / [SWC-89](https://jira.corp.adobe.com/browse/SWC-89)), add ARIA and keyboard end-to-end tests for at least one two-level path.

---

## Summary checklist

- [ ] ActionMenu-style trigger (ellipses + optional label or override) with a named icon-only default; separate from combobox/Picker ([SWC-1174](https://jira.corp.adobe.com/browse/SWC-1174); separate stories if needed).
- [ ] `swc-menu` is never standalone (see [Menu — Overview](../menu/accessibility-migration-analysis.md#overview)).
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

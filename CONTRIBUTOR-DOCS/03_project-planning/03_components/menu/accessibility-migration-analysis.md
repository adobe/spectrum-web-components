<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../../README.md) / [Project planning](../../README.md) / [Components](../README.md) / Menu / Menu accessibility migration analysis

<!-- Document title (editable) -->

# Menu accessibility migration analysis

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [Overview](#overview)
    - [Migration scope (current)](#migration-scope-current)
    - [Also read](#also-read)
    - [What `swc-menu` is (2nd-gen)](#what-swc-menu-is-2nd-gen)
    - [When to use something else](#when-to-use-something-else)
    - [What it is not](#what-it-is-not)
    - [Related](#related)
- [ARIA and WCAG context](#aria-and-wcag-context)
    - [Pattern in the APG](#pattern-in-the-apg)
    - [Guidelines that apply](#guidelines-that-apply)
- [Related 1st-gen accessibility (Jira)](#related-1st-gen-accessibility-jira)
- [Recommendations: `<swc-menu>`](#recommendations-swc-menu)
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
    - [Manual and screen reader testing (mandatory, host alone)](#manual-and-screen-reader-testing-mandatory-host-alone)
- [Summary checklist](#summary-checklist)
- [References](#references)

</details>

<!-- Document content (editable) -->

## Overview

This document sets accessibility expectations for 2nd-gen **`Menu` (`swc-menu`)**: the **`role="menu"`** surface (**`menuitem`**, **`swc-menu-item`**, **`swc-menu-group`**, **`separator`**, …) paired with **`swc-action-menu`** to satisfy the **[menu-button](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/)** layering described by [React **`Menu`**](https://react-spectrum.adobe.com/react-spectrum/Menu.html) **`+`** **[`MenuTrigger`](https://react-spectrum.adobe.com/react-spectrum/MenuTrigger.html)**.

That pairing is **functionally much closer to `sp-action-menu` than to `sp-menu` used alone.** **`sp-action-menu`** already bundled **trigger + anchored **`role="menu"`** list** (**`sp-menu`** inside); **`swc-action-menu`** and **`swc-menu`** inherit the same **[React **`Menu`**](https://react-spectrum.adobe.com/react-spectrum/Menu.html) + [`MenuTrigger`](https://react-spectrum.adobe.com/react-spectrum/MenuTrigger.html)** composition. **`sp-menu`** by itself remains only the list/listbox surface Spectrum embedded in overlays and pickers (**often **`role="listbox"`**) ([§ What **`swc-menu`** is (2nd-gen)](#what-swc-menu-is-2nd-gen)).

The target is **WCAG 2.2 Level AA**. Product alignment mirrors [React Spectrum `Menu`](https://react-spectrum.adobe.com/Menu) with MenuTrigger; `menuitemcheckbox` / `menuitemradio` and selection UX remain tracked separately ([Migration scope](#migration-scope-current)).

### Migration scope (current)

These topics are out of scope for the migration wave documented here until design and accessibility provide a single product answer:

- Mobile tray — small-viewport / bottom-sheet presentation (already called out elsewhere in these docs).
- Menu item selection — including selection modes (single vs multiple), persisted selected state, `menuitemcheckbox` / `menuitemradio` behavior, `aria-checked`, keyboard for toggle items, and group patterns for selectables. This doc still names [APG](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/) roles for when that work lands; do not treat checkbox / radio menu rows as locked for 2nd-gen until that clarification closes.

### Also read

- [Menu migration roadmap](./rendering-and-styling-migration-analysis.md) for epics, placement with popover, and 1st-gen / 2nd-gen scope ([SWC-1980](https://jira.corp.adobe.com/browse/SWC-1980)).
- [Action menu accessibility migration analysis](../action-menu/accessibility-migration-analysis.md) for **`swc-action-menu`** (trigger) **`+`** **`swc-menu`**, ellipsis trigger, **`swc-popover`** for anchored positioning (versus **`sp-menu`** tucked under **overlay** + external triggers), and submenus. Mobile tray and menu item selection (`menuitemcheckbox` / `menuitemradio`, modes) defer per [Migration scope (current)](#migration-scope-current).
- [Popover accessibility migration analysis](../popover/accessibility-migration-analysis.md) — `swc-popover` is a positioning host; it does not implement `role="menu"` or in-menu keyboard (those stay in menu + action menu).

### What `swc-menu` is (2nd-gen)

- A menu is the popup list with `role="menu"` and focusable `menuitem` rows (and `separator`, `group` where used) per the APG. Checkbox / radio menu items and menu item selection (modes, `aria-checked`, toggle keyboard) are deferred pending design and accessibility clarification (see [Migration scope](#migration-scope-current)). In React Spectrum, Menu is always associated with MenuTrigger; 2nd-gen SWC mirrors that pairing: **`swc-action-menu`** holds the trigger and **`swc-menu`** is the **`role="menu"`** list (top-level or nested via **`swc-menu`** / **`swc-menu-item`** for submenus), never an orphan root—together they implement the **[menu button pattern](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/)** (trigger **`+`** **`role="menu"`** subtree **`+`** in-menu behaviour). **Lineage:** this is the same **trigger + list** split **`sp-action-menu`** already shipped—**not** the **`sp-menu`** **only** primitive reused in pickers.
- **Compared with 1st-gen `sp-menu`:** **`sp-menu`** was primarily **popup list/container markup** authored inside overlays, **`sp-popover`**, **`sp-picker`**, **`<sp-action-menu>`**, or other hosts that supplied opening behaviour, **z-order**, focus choreography, and the visible trigger. **Picker-oriented** usages often surfaced **`role="listbox"`**; authors could set **`role="menu"`**, but **`sp-menu`** **did not** ship one cohesive [menu-button](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/) composition (trigger plus **`role="menu"`** list) analogous to **`swc-action-menu`** and **`swc-menu`**—integrations wired overlays and triggers externally.
- Placement (anchor to trigger, flip, z-index) uses the shared [popover](https://react-spectrum.adobe.com/Popover) / **`swc-popover`** host instead of layering **`sp-menu`** through the legacy **overlay** stack. ARIA for **`menu`** and items lives on the **`swc-menu`** tree; **`swc-popover`** does not implement **`role="menu"`** or in-menu keyboard (see [Popover](../popover/accessibility-migration-analysis.md)). Mobile tray (alternative small-viewport presentation) is out of scope for the current migration and is not part of the 2nd-gen positioning spec in these docs.
- Two coordination pieces (conceptual; how they ship may split across packages—verify in 2nd-gen source):
  1. Open/close and role wiring — must satisfy the [menu button pattern](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/) (`role`, `aria-*` on trigger and menu, open state, focus on open with first item or return on close, Escape). Implementations may do this via a **dedicated controller** (given a root such as `swc-action-menu`, `swc-menu`, or `swc-menu-item`), partly via **`swc-popover`** where that host owns anchoring or dismiss/open-close coordination for the layered surface, partly via **`swc-menu`** when the menu owns more of the wiring. **`swc-action-menu`** may then compose trigger + menu—for example rendering the trigger button with **icon only** or **replacing the icon with visible label text** when design calls for labelled “more” actions. Regardless of split, **menu ARIA and in-menu keyboard** are not implemented by `swc-popover` alone (see [Popover](../popover/accessibility-migration-analysis.md)).
  2. In-menu movement — arrow / Home / End / typeahead via `FocusgroupNavigationController` (and related work, for example [spectrum-web-components#6129](https://github.com/adobe/spectrum-web-components/pull/6129)), not `aria-activedescendant` across shadow roots for 2nd-gen (see the action menu doc).

### When to use something else

- Single-select from a closed field with a textbox — [APG combobox](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/); use combobox + listbox, not `swc-menu`.
- Site navigation links only — [disclosure navigation](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/) (no `role="menu"` on a link list by default).
- Modal dialog — [dialog (modal) pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/); not a menu surface (may still use shared popover styles on the dialog chrome per [Popover](../popover/accessibility-migration-analysis.md)).

### What it is not

- Not a stand-alone import for “drop a menu on the page”: without a controlling button (or menubar), there is no valid focus return, open state, or screen reader close affordance (for example “Escape to close” only makes sense when a parent implements it).
- Not the same as `swc-popover`: popover positions; menu exposes menu semantics to assistive tech.
- Not a link list widget by default: command menus use `menuitem`; link-like rows are covered below (real link child, not proxy click on the row).

### Related

- Action menu — [Action menu accessibility migration analysis](../action-menu/accessibility-migration-analysis.md) for `swc-action-menu`, [ActionMenu](https://react-spectrum.adobe.com/ActionMenu) (more-actions pattern / ellipses trigger), `swc-popover`, and [Migration scope](#migration-scope-current) (tray and selection deferrals).
- [Menu separator accessibility migration analysis](../menu-separator/accessibility-migration-analysis.md) for **`swc-menu-divider`** (**`separator`** between **`menuitem`** rows).
- [Menu group accessibility migration analysis](../menu-group/accessibility-migration-analysis.md) for `swc-menu-group` (`role="group"` inside `swc-menu`).
- [Menu item accessibility migration analysis](../menu-item/accessibility-migration-analysis.md) for `swc-menu-item`, `menuitem` rows, submenus, and link rows.
- Menubar — a different layout and focus model than a single action button; if 2nd-gen ships a menubar, it will get its own doc; submenu surfaces still use `swc-menu`.

---

## ARIA and WCAG context

### Pattern in the APG

- [Menu button](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/) — trigger + `role="menu"` + `menuitem`; APG also defines `menuitemcheckbox` and `menuitemradio` (selection UX out of scope until [Migration scope (current)](#migration-scope-current) closes). `swc-menu` is the menu surface; the trigger lives on `swc-action-menu` (or menubar).
- [Menubar](https://www.w3.org/WAI/ARIA/apg/patterns/menubar/) — submenu surfaces are also `role="menu"`; the parent item has `aria-haspopup="menu"` and `aria-expanded`.

### Guidelines that apply

| Idea | Plain meaning |
| --- | --- |
| [Name, role, value (4.1.2)](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value) | `role="menu"` and `menuitem` on rows; `group` / `separator` when used for plain commands per APG-style structure; names on items. `menuitemcheckbox`, `menuitemradio`, and menu item selection (state and modes) are out of scope until [Migration scope (current)](#migration-scope-current) closes. |
| [Focus order (2.4.3)](https://www.w3.org/WAI/WCAG22/Understanding/focus-order) / [Focus visible (2.4.7)](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible) | On open, focus moves into the menu; roving tabindex inside the list; closing returns focus to the trigger (or parent menu item for submenus). |
| [Keyboard (2.1.1)](https://www.w3.org/WAI/WCAG22/Understanding/keyboard) | All actions are available from the keyboard per the menu pattern; no pointer-only submenu chrome (see 1st-gen [SWC-1332](https://jira.corp.adobe.com/browse/SWC-1332), [SWC-671](https://jira.corp.adobe.com/browse/SWC-671)). |
| [Non-text contrast (1.4.11)](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast) | Focus ring and icons meet contrast where they convey state (for example [SWC-1517](https://jira.corp.adobe.com/browse/SWC-1517) submenu focus on Safari). |

Bottom line: `swc-menu` implements the menu subtree structure (`menu` plus `menuitem` navigation and activation) **with `swc-action-menu`**, matching **`sp-action-menu` / React `Menu` + `MenuTrigger`** far more than **`sp-menu`** alone; open/close and role wiring may be shared by a controller, `swc-popover` (lifecycle/anchoring), and menu/action-menu hosts (`swc-action-menu` trigger chrome such as icon vs label is one example—confirm in implementation). `FocusgroupNavigationController` owns in-list keys. Anchor placement uses `swc-popover`, not layering `sp-menu` through the legacy **overlay** stack. Mobile tray and menu item selection (checkbox, radio, modes) remain out of scope for the wave documented here ([Migration scope](#migration-scope-current)).

---

## Related 1st-gen accessibility (Jira)

| Jira | Type | Status (snapshot) | Resolution (snapshot) | Summary |
| --- | --- | --- | --- | --- |
| [SWC-923](https://jira.corp.adobe.com/browse/SWC-923) | Bug | To Do | Unresolved | `menu-item` with `href` triggers link twice |
| [SWC-1332](https://jira.corp.adobe.com/browse/SWC-1332) | Bug | To Do | Unresolved | Custom content as submenu not keyboard accessible |
| [SWC-1941](https://jira.corp.adobe.com/browse/SWC-1941) | Bug | To Do | Unresolved | Space/Enter on `sp-menu-item` in modal overlay + `sp-popover` |
| [SWC-933](https://jira.corp.adobe.com/browse/SWC-933) / [SWC-932](https://jira.corp.adobe.com/browse/SWC-932) | Bug | Blocked / To Do | Unresolved | Picker: arrow navigation when popover is overlay |
| [SWC-671](https://jira.corp.adobe.com/browse/SWC-671) | Bug | Blocked | Unresolved | Submenus not visible on mobile |
| [SWC-686](https://jira.corp.adobe.com/browse/SWC-686) | Bug | — | Unresolved | iOS VoiceOver: submenu tray closes unexpectedly |
| [SWC-1517](https://jira.corp.adobe.com/browse/SWC-1517) | Bug | To Do | Unresolved | Submenu item focus outline on hover (Safari) |
| [SWC-1174](https://jira.corp.adobe.com/browse/SWC-1174) | — | To Do | Unresolved | Picker / dropdown visible label (Menu-related) |
| [SWC-89](https://jira.corp.adobe.com/browse/SWC-89) | Story | — | Unresolved | Mobile submenu UI |
| [SWC-963](https://jira.corp.adobe.com/browse/SWC-963) | Epic | To Do | Unresolved | Align menu components with APG; reduce semantic confusion |

---

## Recommendations: `<swc-menu>`

Scope: menu root; plain `menuitem` rows; submenus; `group` / `separator` as needed for structure; and link item pattern (see below). Trigger button semantics stay on `swc-action-menu` ([action menu doc](../action-menu/accessibility-migration-analysis.md)). Selectable `menuitemcheckbox` / `menuitemradio` rows and menu item selection UX are out of scope until [Migration scope](#migration-scope-current) is resolved (design + accessibility); APG references below remain orienting only.

### ARIA roles, states, and properties

| Topic | What to do |
| --- | --- |
| Host | `role="menu"` on the `swc-menu` surface (or equivalent light DOM wiring if role is forwarded from a child—verify in 2nd-gen source before shipping docs). |
| Items | `menuitem` and `separator` / `group` as for plain commands; no `listitem` inside `menu`. Checkbox and radio `menuitem*` rows and selection behavior (`aria-checked`, multi-select) are out of scope until clarification ([Migration scope](#migration-scope-current)). |
| Submenus | Parent `menuitem`: `aria-haspopup="menu"`, `aria-expanded`; child surface `role="menu"` (see action menu submenus). |
| Link-like rows | Do not use the 1st-gen proxy click pattern for `href` on the row (see [SWC-923](https://jira.corp.adobe.com/browse/SWC-923)). Prefer a real `<a href="…">` (or router link) as a descendant of the item content with a clear name; for a full-row click target, follow [Inclusive Components: Cards](https://inclusive-components.design/cards/) (stretch the link with pseudo / positioning so the entire row is one interactive surface without double activation). |
| Open/close + roles | Responsibility may sit in a **controller module**, in **`swc-popover`** (where it participates in anchored open/close or dismiss wiring), or in **`swc-menu`** / **`swc-action-menu`** (for example **`swc-action-menu`** rendering the trigger—icon-only vs swapping in **visible label text** instead of an icon—while keeping ID wiring coherent). Confirm the actual split in 2nd-gen source. In all cases keep open/close, initial and return focus, and ID wiring inside one composable subtree so IDREFs do not span unrelated shadow roots. |

### Shadow DOM and cross-root ARIA Issues

Keep the trigger and `swc-menu` (and item id targets) in one composable subtree so `aria-controls`, `aria-labelledby`, and focus order do not depend on IDREFs across disconnected shadow roots. Prefer roving `tabindex` on items over `aria-activedescendant` for 2nd-gen (see action menu doc).

### Accessibility tree expectations

- Closed: menu hidden; focus on trigger (or parent item).
- Open: `role="menu"` visible; first keystroke lands on an item per pattern; items expose roles and names; disabled items use `aria-disabled="true"` when appropriate.

### Form-associated custom properties (labels, `ElementInternals`)

Does not apply. `swc-menu` is not a labeled form control; labelling applies to the trigger (action menu) or to field controls elsewhere.

### Live regions, loading, and announcements

Does not apply to the `swc-menu` host by default; status for async actions belongs to content or app chrome, not the menu list shell.

### Motion (dedicated recommendations subsection)

Intentionally omitted. If open/close motion is added, treat reduced motion like other layered UI (popover surfaces); no separate Motion subsection here.

### Keyboard and focus

- In-menu navigation (arrow keys, Home / End, typeahead) via `FocusgroupNavigationController` ([PR #6129](https://github.com/adobe/spectrum-web-components/pull/6129)), not `aria-activedescendant` for this pattern on 2nd-gen.
- Open, close, and focus hand-off to first, last, or return are coordinated with `swc-action-menu` (or the submenu parent item).

---

## Testing

### Automated tests

| Kind of test | What to check |
| --- | --- |
| Unit | Role and state props on host and items; open and closed affordances. |
| aXe + Storybook | Menu and action menu stories; no duplicate link activation on href items ([SWC-923](https://jira.corp.adobe.com/browse/SWC-923)). |
| Playwright / ARIA snapshots | Open and close; roving focus; submenu expansion where in scope. Do not gate on checkbox, radio, or selection stories until [Migration scope](#migration-scope-current) closes. |

### Keyboard testing

Follow the 2nd-gen Storybook [Keyboard testing](../../../../2nd-gen/packages/swc/.storybook/guides/accessibility-guides/keyboard_testing.mdx) guide whenever you verify `swc-menu` with a real trigger or test harness (`swc-action-menu` or submenu parent). Cover open and close from the trigger per the [menu button pattern](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/), in-list movement (arrow keys, Home, End, typeahead) via `FocusgroupNavigationController`, Escape with focus return, and submenu keyboard behavior where in scope. Automated and Playwright expectations should match the same behaviors (see [Recommendations: Keyboard and focus](#keyboard-and-focus)).

### Playwright-only or host-only accessibility gates

Align with the action menu test plan; add menu-only paths for nested menus and link item rows.

### Manual and screen reader testing (mandatory, host alone)

When verifying `swc-menu` in isolation in Storybook, always compose with a real trigger or test harness that implements open and close plus focus return—a raw menu alone is not a supported end user pattern. Use [Keyboard testing](#keyboard-testing) and [Screen reader testing](../../../../2nd-gen/packages/swc/.storybook/guides/accessibility-guides/screen_reader_testing.mdx) for the composed pattern.

---

## Summary checklist

- [ ] `swc-menu` is never documented or shipped as a stand-alone page-level widget; always with `swc-action-menu` or a submenu parent.
- [ ] `role="menu"` and `menuitem` (plus `group` / `separator` as needed) per APG for commands in scope; selection and `menuitemcheckbox` / `menuitemradio` defer per [Migration scope](#migration-scope-current).
- [ ] Open/close + role wiring vs in-list keys: implementation may split across a controller, `swc-popover`, and `swc-menu` / `swc-action-menu` (verify in source); `FocusgroupNavigationController` for in-menu movement; **`swc-popover`** anchors the surface—not **`sp-menu`** slid under the legacy overlay stack alone. Mobile tray is out of scope for the current migration.
- [ ] No proxy click for link items; link child plus [Cards](https://inclusive-components.design/cards/)-style full-row hit where needed.
- [ ] 1st-gen defects in the Jira table are retested or superseded in 2nd-gen.
- [ ] 2nd-gen implementation tracked in Jira as it lands (see program epics such as migration of menu, action menu, and popover positioning).

---

## References

- [React Spectrum: Menu](https://react-spectrum.adobe.com/Menu)
- [WAI-ARIA APG: Menu button](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/)
- [WAI-ARIA APG: Menubar](https://www.w3.org/WAI/ARIA/apg/patterns/menubar/)
- [Heydon Pickering: Inclusive Components — Cards](https://inclusive-components.design/cards/) (link as child; full-row interactive area)
- [Action menu accessibility migration analysis](../action-menu/accessibility-migration-analysis.md)
- [Menu group accessibility migration analysis](../menu-group/accessibility-migration-analysis.md)
- [Menu item accessibility migration analysis](../menu-item/accessibility-migration-analysis.md)
- [Popover accessibility migration analysis](../popover/accessibility-migration-analysis.md)
- [spectrum-web-components PR #6129 — Focusgroup navigation controller](https://github.com/adobe/spectrum-web-components/pull/6129)
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- [2nd-gen Storybook: Keyboard testing](../../../../2nd-gen/packages/swc/.storybook/guides/accessibility-guides/keyboard_testing.mdx)
- [2nd-gen Storybook: Screen reader testing](../../../../2nd-gen/packages/swc/.storybook/guides/accessibility-guides/screen_reader_testing.mdx)

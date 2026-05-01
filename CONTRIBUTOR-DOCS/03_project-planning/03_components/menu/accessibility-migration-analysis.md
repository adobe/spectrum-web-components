<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../../README.md) / [Project planning](../../README.md) / [Components](../README.md) / Menu / Menu accessibility migration analysis

<!-- Document title (editable) -->

# Menu accessibility migration analysis

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [Overview](#overview)
    - [In short](#in-short)
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
    - [Printable character navigation (optional; not typeahead)](#printable-character-navigation-optional-not-typeahead)
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

### In short

- `swc-menu` follows the [menu button pattern](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/): a **trigger** opens a layer that holds the list of actions. The **menu slot** accepts `swc-menu-item`, `swc-menu-group`, and `swc-menu-separator` only.
- The `role="menu"` node lives in **shadow DOM** inside the component. It is not on the `<swc-menu>` custom element.
- Do **not** nest another `swc-menu` or `swc-action-menu` in the menu slot. Nested menus use `swc-menu-item` and its `submenu` slot ([menu item doc](../menu-item/accessibility-migration-analysis.md#what-swc-menu-item-is-2nd-gen)).
- Mobile tray and checkbox/radio style rows are out of scope for now ([Menu — Migration scope](#migration-scope-current)).
- **Target:** [WCAG 2.2](https://www.w3.org/TR/WCAG22/) Level AA. Menu items that work like checkboxes or radios are out of scope for now ([Migration scope](#migration-scope-current)).

This page states accessibility expectations for 2nd-gen `swc-menu`. `swc-menu` and `swc-action-menu` are built the same way: trigger, `swc-popover` (or similar) to place the open surface, and the real menu list in shadow DOM. In 1st-gen, `sp-menu` was often just the list; 2nd-gen puts the full pattern in one place, like [React Spectrum Menu](https://react-spectrum.adobe.com/Menu). Pick `swc-menu` or `swc-action-menu` for product defaults (general menu vs. “more” / actions) ([What `swc-menu` is (2nd-gen)](#what-swc-menu-is-2nd-gen)).

- **`swc-menu-group`:** Direct child of `swc-menu`, `swc-action-menu`, or `swc-menu-item` (submenu). Not inside another group. Default slot: `swc-menu-item` only ([menu group doc](../menu-group/accessibility-migration-analysis.md#what-swc-menu-group-is-2nd-gen)).
- **`swc-menu-separator`:** Direct child of the same three parents. Not inside a group. No slotted content on the host ([menu separator doc](../menu-separator/accessibility-migration-analysis.md#what-the-menu-separator-is-swc-menu-separator-2nd-gen)).
- **`swc-menu-item`:** Sits in the parent list or under a group’s default slot ([menu item doc](../menu-item/accessibility-migration-analysis.md#what-swc-menu-item-is-2nd-gen)).

**Do not** place `swc-menu` or `swc-action-menu` inside `swc-menu`, `swc-action-menu`, or `swc-menu-item`. The menu slot is only for the three types above in current migration (confirm in 2nd-gen source).

### Migration scope (current)

These items wait on a single product decision from design and accessibility:

- **Mobile tray** — small-screen / bottom sheet (covered in other docs here).
- **Selectable menu items** — checkboxes, radios, `aria-checked`, and multi-select. This doc still points to the [APG](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/) for when that work ships; do not treat those rows as final for 2nd-gen until that work closes.

### Also read

- [Menu migration roadmap](./rendering-and-styling-migration-analysis.md) for epics, placement with popover, and 1st-gen / 2nd-gen scope ([SWC-1980](https://jira.corp.adobe.com/browse/SWC-1980)).
- [Action menu accessibility migration analysis](../action-menu/accessibility-migration-analysis.md) for **`swc-action-menu`** (ActionMenu: parallel **full** host to **`swc-menu`**, with default “more” / ellipses trigger chrome), **`swc-popover`**-based anchoring (versus 1st-gen **overlay** + ad hoc triggers around **`sp-menu`**), and submenus. Mobile tray and menu item selection (`menuitemcheckbox` / `menuitemradio`, modes) defer per [Migration scope (current)](#migration-scope-current).
- [Popover accessibility migration analysis](../popover/accessibility-migration-analysis.md) — `swc-popover` is a positioning host; it does not implement `role="menu"` or in-menu keyboard (those stay in menu + action menu).

### What `swc-menu` is (2nd-gen)

- Full [menu button](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/) host, same idea as `swc-action-menu` ([action menu doc](../action-menu/accessibility-migration-analysis.md)): a trigger, `swc-popover` for the open layer, `role="menu"` in the shadow tree (not the custom element), and a menu slot for `swc-menu-item`, `swc-menu-group`, and `swc-menu-separator` only. Do not slot `swc-menu` or `swc-action-menu` into `swc-menu`, `swc-action-menu`, or `swc-menu-item`. For nested lists, use `swc-menu-item` and its [`submenu` slot](../menu-item/accessibility-migration-analysis.md#what-swc-menu-item-is-2nd-gen)—not another `swc-menu` in the list. Product defaults follow React Spectrum [Menu](https://react-spectrum.adobe.com/Menu); check 2nd-gen source. Checkbox, radio, and other selection-style rows: [Migration scope](#migration-scope-current).
- In 1st gen, `sp-menu` was often the list (sometimes listbox-like) under `sp-action-menu`, overlay, or picker, with a separate parent for the trigger. In 2nd gen, `swc-menu` is the full pattern in one place (the same move 1st gen made with `sp-action-menu` when trigger + list shipped together). Old picker- or listbox-style `sp-menu` uses that are not a real command menu stay out of this doc; use a [combobox](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/) + listbox when that matches the product ([When to use something else](#when-to-use-something-else)).
- Use the shared [Popover](https://react-spectrum.adobe.com/Popover) / `swc-popover` path for placement instead of the default legacy overlay stack. `swc-menu` and `swc-action-menu` own the menu-button wiring (open/close, trigger + internal `role="menu"`, first focus, Escape, focus return). In-menu move uses `FocusgroupNavigationController` and related work ([#6129](https://github.com/adobe/spectrum-web-components/pull/6129)), not `aria-activedescendant` across shadow roots. Submenu trigger and child `role="menu"` live in `swc-menu-item`’s shadow tree. `swc-popover` only positions; it does not stand in for `role="menu"` or in-menu keys ([Popover doc](../popover/accessibility-migration-analysis.md), [action menu — Keyboard and focus](../action-menu/accessibility-migration-analysis.md#keyboard-and-focus)). **Mobile tray** (small-viewport / sheet style) is out of scope in these migration docs.

### When to use something else

- Single-select from a closed field with a textbox — [APG combobox](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/) (combobox + listbox) `swc-picker` or `swc-combobox`, not `swc-menu`.
- Site navigation links — [disclosure navigation](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/) (no `role="menu"` on a link list by default); use `uec-sidenav` or `swc-sidenav`.
- Modal dialog — [dialog (modal) pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/); not a menu surface (may still use shared popover styles on the dialog chrome per [Popover](../popover/accessibility-migration-analysis.md)).
- A control that is is an ellipses icon — the ActionMenu / “more” look — use [`swc-action-menu`](../action-menu/accessibility-migration-analysis.md).

### What it is not

- **Not** the old **list-only** `sp-menu`: 2nd-gen **`swc-menu`** and **`swc-action-menu`** each ship **trigger**, **`swc-popover`** placement, a **shadow-internal** **`role="menu"`** **surface** (**not** on the **CE** **host**), and **slots** together. Do **not** document a **detached** `role="menu"` fragment. **Submenus** use **`swc-menu-item`’s** **`submenu` slot** (not a **nested** top-level **menu** **host** in the list). **Do** **not** **slot** **`swc-menu`** or **`swc-action-menu`** **into** **`swc-menu`**, **`swc-action-menu`**, or **`swc-menu-item`**.
- **Not** an **arbitrary list dump**: the **open menu slot** (current scope) is **for** **`swc-menu-item`**, **`swc-menu-group`**, and **`swc-menu-separator`** **only** ( **verify** in 2nd-gen **source** ).
- Not the same as `swc-popover`: popover positions; menu exposes menu semantics to assistive tech.
- Not a link list widget by default: command menus use `menuitem`; link-like rows are covered below (real link child, not proxy click on the row).

### Related

- [Action menu a11y doc](../action-menu/accessibility-migration-analysis.md) — `swc-action-menu`, [ActionMenu](https://react-spectrum.adobe.com/ActionMenu), `swc-popover`, [Migration scope](#migration-scope-current).
- [Menu separator a11y doc](../menu-separator/accessibility-migration-analysis.md) — `swc-menu-separator`: only a direct child of `swc-menu`, `swc-action-menu`, or `swc-menu-item`; not under `swc-menu-group`. In docs, avoid separators unless they sit between [labelled groups](../menu-group/accessibility-migration-analysis.md#what-swc-menu-group-is-2nd-gen) ([separator doc — Overview](../menu-separator/accessibility-migration-analysis.md#overview)).
- [Menu group a11y doc](../menu-group/accessibility-migration-analysis.md) — `swc-menu-group` under those same parents; do not put one group inside another in the same list.
- [Menu item a11y doc](../menu-item/accessibility-migration-analysis.md) — rows, submenus, links.
- **Menubar** (if we ship it later) is a different pattern. Submenus here still use the menu item’s [`submenu` slot](../menu-item/accessibility-migration-analysis.md).

---

## ARIA and WCAG context

### Pattern in the APG

- [Menu button / actions](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/) — trigger opens `role="menu"`; plain items use `menuitem`; `menuitemcheckbox` / `menuitemradio` and selection UX sync with [Menu migration scope](../menu/accessibility-migration-analysis.md#migration-scope-current) when that work lands.
- [Menubar](https://www.w3.org/WAI/ARIA/apg/patterns/menubar/) — for submenu keystrokes and **child** `role="menu"` **surfaces** in **cascading** **menus** where relevant (item **`submenu` slot**; see [Menu item](../menu-item/accessibility-migration-analysis.md) and [Menu](../menu/accessibility-migration-analysis.md)).

### Guidelines that apply

| Idea | Plain meaning |
| --- | --- |
| [Name, role, value (4.1.2)](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value) | `role="menu"` and `menuitem` on rows; `group` / `separator` when used for plain commands per APG-style structure; names on items. A disabled `swc-menu-item` that cannot be activated exposes `aria-disabled="true"` (same rule as the [Menu item — ARIA: Disabled row](../menu-item/accessibility-migration-analysis.md#aria-roles-states-and-properties)). `menuitemcheckbox`, `menuitemradio`, and menu item selection (state and modes) are out of scope until [Migration scope (current)](#migration-scope-current) closes. |
| [Focus order (2.4.3)](https://www.w3.org/WAI/WCAG22/Understanding/focus-order) / [Focus visible (2.4.7)](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible) | On open, focus moves into the menu; roving tabindex inside the list; closing returns focus to the trigger (or parent menu item for submenus). |
| [Keyboard (2.1.1)](https://www.w3.org/WAI/WCAG22/Understanding/keyboard) | All actions are available from the keyboard per the menu pattern; no pointer-only submenu chrome (see 1st-gen [SWC-1332](https://jira.corp.adobe.com/browse/SWC-1332), [SWC-671](https://jira.corp.adobe.com/browse/SWC-671)). |
| [Non-text contrast (1.4.11)](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast) | Focus ring and icons meet contrast where they convey state (for example [SWC-1517](https://jira.corp.adobe.com/browse/SWC-1517) submenu focus on Safari). |

**Bottom line:** `swc-menu` is a full menu-button host like [`swc-action-menu`](../action-menu/accessibility-migration-analysis.md) (trigger, `swc-popover`, `role="menu"` in shadow DOM, items / groups / separators in the menu slot). Submenus sit on `swc-menu-item` in its shadow tree, not a second `swc-menu` in the list. Row and submenu details are in the [menu item doc](../menu-item/accessibility-migration-analysis.md). This doc centers Menu trigger defaults, wiring, and tests. Tray and selectable rows follow [Migration scope](#migration-scope-current).

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

Scope: the internal `role="menu"` surface (inside `swc-menu`’s shadow DOM, not the CE host). **`swc-menu` and `swc-action-menu`** are **not** slotted into **`swc-menu`**, **`swc-action-menu`**, or **`swc-menu-item`**. The **menu** **slot** **(current** **migration**)** supports **only** **`swc-menu-item`**, **`swc-menu-group`**, and **`swc-menu-separator`**. **Scope** also **covers** **slotted** **groups**, **items**, and **separators**; plain `menuitem` rows; submenu ARIA on rows that use the `submenu` slot ([Menu item doc](../menu-item/accessibility-migration-analysis.md)); and the link item pattern (see below). Trigger wiring for the top-level menu button is part of the `swc-menu` host (parallel to `swc-action-menu`—see [action menu doc](../action-menu/accessibility-migration-analysis.md) for ActionMenu-only defaults). Selectable `menuitemcheckbox` / `menuitemradio` rows and menu item selection UX are out of scope until [Migration scope](#migration-scope-current) is resolved (design + accessibility); APG references below remain orienting only.

### ARIA roles, states, and properties

| Topic | What to do |
| --- | --- |
| Host placement | `swc-menu` and `swc-action-menu` are not slotted into `swc-menu`, `swc-action-menu`, or `swc-menu-item`. They are top-level [menu button](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/) hosts. |
| Menu slot (current migration) | Intended children: only `swc-menu-item`, `swc-menu-group`, and `swc-menu-separator`. Do not depend on other types in that slot (check 2nd-gen source). |
| Internal `role="menu"` (not the CE host) | The menu-button trigger and the internal `role="menu"` node are implemented together in `swc-menu`’s (or `swc-action-menu`’s) shadow DOM—`role="menu"` is not on the `<swc-menu>` / `<swc-action-menu>` custom element host, and the host design keeps the trigger and menu surface in that shadow tree together. Verify final markup in 2nd-gen source before shipping docs. |
| Items | `menuitem` and `separator` / `group` as for plain commands; no `listitem` inside `menu`. Slotted `swc-menu-item`, `swc-menu-group`, and `swc-menu-separator` do not need to be in that shadow tree with the co-located trigger and `role="menu"`—they are commonly slotted from the light DOM. The list pattern does not need ID references from the menu or trigger to each item; inter-item movement uses roving `tabindex` and `FocusgroupNavigationController` ([PR #6129](https://github.com/adobe/spectrum-web-components/pull/6129)) (see [Shadow DOM](#shadow-dom-and-cross-root-aria-issues)). Checkbox and radio `menuitem*` rows and selection behavior (`aria-checked`, multi-select) are out of scope until clarification ([Migration scope](#migration-scope-current)). |
| Disabled `swc-menu-item` | Each disabled row sets `aria-disabled="true"` when the item looks disabled and must not run its action (roving focus may still land on it; activation is ignored per pattern). See [Menu item — ARIA: Disabled](../menu-item/accessibility-migration-analysis.md#aria-roles-states-and-properties). |
| Menu groups | **`swc-menu-group`** is **slotted** **as** a **direct** **list** **child** of **`swc-menu`**, **`swc-action-menu`**, or **`swc-menu-item`** ( **submenu** only—**not** the **default** **slot** of **another** **`swc-menu-group`**, which would **nest** **groups**). **Only** **`swc-menu-item`** **rows** **in** a **group**’s **default** **slot**; **`swc-menu-separator`** **lives** **in** the **parent** list (see [Menu separator doc](../menu-separator/accessibility-migration-analysis.md)). A **group** **may** also **appear** **inside** a **submenu** (child `role="menu"` on `swc-menu-item`). See [Menu group — What `swc-menu-group` is (2nd-gen)](../menu-group/accessibility-migration-analysis.md#what-swc-menu-group-is-2nd-gen) and [Menu item — What `swc-menu-item` is (2nd-gen)](../menu-item/accessibility-migration-analysis.md#what-swc-menu-item-is-2nd-gen). |
| Submenus | On `swc-menu-item`: when the `submenu` slot has content, the submenu parent is a `menuitem` with `aria-haspopup="menu"` and `aria-expanded`. The submenu trigger and child `role="menu"` live in `swc-menu-item`’s shadow DOM (not the item CE host), with popover anchoring ([Menu item — Recommendations](../menu-item/accessibility-migration-analysis.md#recommendations-swc-menu-item); not a nested `swc-menu` in the list). |
| Link-like rows | Do not use the 1st-gen proxy click pattern for `href` on the row (see [SWC-923](https://jira.corp.adobe.com/browse/SWC-923)). Prefer a real `<a href="…">` (or router link) as a descendant of the item content with a clear name; for a full-row click target, follow [Inclusive Components: Cards](https://inclusive-components.design/cards/) (stretch the link with pseudo / positioning so the entire row is one interactive surface without double activation). |
| Open/close + roles | Responsibility may sit in a controller module, in `swc-popover`, or in the menu-button host (`swc-menu` or `swc-action-menu`) that owns the co-located trigger and internal `role="menu"` in shadow—for example ActionMenu-specific trigger chrome (icon-only vs visible label) on `swc-action-menu`, or Menu-specific trigger on `swc-menu`. Confirm the actual split in 2nd-gen source. Open/close and initial/return focus must still satisfy the [menu button pattern](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/). |
| In-menu navigation | In-menu movement does not rely on IDREF to each slotted item—`FocusgroupNavigationController` drives roving focus and does not require list rows in the same shadow tree as the trigger and menu. Optional **printable character navigation** (not combobox typeahead) may move among items; see [Keyboard and focus — Printable character navigation](#printable-character-navigation-optional-not-typeahead). Avoid `aria-activedescendant` and other IDREF patterns that resolve IDs across unrelated roots (see [SWC-617](https://jira.corp.adobe.com/browse/SWC-617) and the action menu doc); verify wiring in 2nd-gen source. |

### Shadow DOM and cross-root ARIA Issues

**Host shell (stays in shadow):** the menu-button trigger and the internal `role="menu"` element are implemented together in the `swc-menu` / `swc-action-menu` shadow tree (verify node relationships in 2nd-gen source).

**Slotted menu slot content (need not be in that shadow tree):** the **menu** **slot** of **`swc-menu`** / **`swc-action-menu`** **(current migration scope)** is **for** **`swc-menu-item`**, **`swc-menu-group`**, and **`swc-menu-separator`** only—**do** **not** **slot** the **`swc-menu`** or **`swc-action-menu` hosts** into **`swc-menu`**, **`swc-action-menu`**, or **`swc-menu-item`**. `swc-menu-item`, `swc-menu-group`, and `swc-menu-separator` nodes (and their **allowed** **descendant** **content**—**separators** have **no** **slotted** **author** **children** per [Menu separator doc](../menu-separator/accessibility-migration-analysis.md)) do not need to be children of the trigger **`role="menu"`** shadow subtree—authors may slot them from the light DOM. **Placement** of **rows** and **primitives** follows [Menu item — What `swc-menu-item` is (2nd-gen)](../menu-item/accessibility-migration-analysis.md#what-swc-menu-item-is-2nd-gen) and the [Menu group](../menu-group/accessibility-migration-analysis.md#what-swc-menu-group-is-2nd-gen) and [Menu separator](../menu-separator/accessibility-migration-analysis.md#what-the-menu-separator-is-swc-menu-separator-2nd-gen) **docs** ( **`swc-menu-item`**: under **`swc-menu`**, **`swc-action-menu`**, **`swc-menu-group`**, or **`swc-menu-item`**; **`swc-menu-separator`**: **direct** **row** of **`swc-menu`**, **`swc-action-menu`**, or **`swc-menu-item`**, **not** under a **group** ). The menu list pattern does not need IDREF from the trigger or the `role="menu"` node to each item; arrow and roving focus between items are handled by `FocusgroupNavigationController` ([PR #6129](https://github.com/adobe/spectrum-web-components/pull/6129)) with roving `tabindex`, not by stringing item IDs. An implementation may still relayer or portal list content for layout while preserving `menu` / `menuitem` exposure (verify in 2nd-gen source).

Other IDREF-based ARIA that spans separate roots (for example `aria-activedescendant` to distant element IDs, or `aria-labelledby` / `aria-describedby` across unrelated trees) is unreliable. Prefer the controller-driven list model for in-menu focus; avoid trigger↔row ID resolution where roots do not line up (see action menu doc, [SWC-617](https://jira.corp.adobe.com/browse/SWC-617)). Group section titles that use `aria-labelledby` to a local label `id` are a separate case from item IDREFs—see [Menu group — Shadow DOM](../menu-group/accessibility-migration-analysis.md#shadow-dom-and-cross-root-aria-issues) if labeled groups apply.

For nested submenus (when `swc-menu-item`’s `submenu` slot is used), the submenu trigger and child `role="menu"` render in `swc-menu-item`’s shadow DOM (not the item CE host). Child menu rows slotted into that submenu need not be in the same DOM as the ancestor top-level menu trigger; align submenu ARIA and focus with the parent row per [Menu item — Shadow DOM](../menu-item/accessibility-migration-analysis.md#shadow-dom-and-cross-root-aria-issues) and 2nd-gen source.

### Accessibility tree expectations

- Closed: menu hidden; focus on trigger (or parent item).
- Open: internal `role="menu"` exposed to assistive technologies; first keystroke lands on an item per pattern; items expose roles and names. A `swc-menu-item` that is disabled and must not run sets `aria-disabled="true"`, in line with [Menu item — ARIA: Disabled row](../menu-item/accessibility-migration-analysis.md#aria-roles-states-and-properties) (roving focus may still visit the row; the pattern prevents activation when disabled). Keeping disabled items in the roving set allows screen reader users to discover that an option exists but is currently unavailable, giving them more context about the menu's full capabilities. (See WAI/ARIA Authoring Practice Guide's [Focusability of disabled controls](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#focusabilityofdisabledcontrols).)

### Form-associated custom properties (labels, `ElementInternals`)

Does not apply. The internal `role="menu"` list is not a form field; the menu-button trigger on the `swc-menu` / `swc-action-menu` host still needs a name; `swc-action-menu` the same. Field labels for pickers and comboboxes belong on those patterns.

### Live regions, loading, and announcements

Does not apply to the `swc-menu` host by default; status for async actions belongs to content or app chrome, not the menu list shell.

### Motion (dedicated recommendations subsection)

Intentionally omitted. If open/close motion is added, treat reduced motion like other layered UI (popover surfaces); no separate Motion subsection here.

### Keyboard and focus

- In-menu navigation: arrow keys, Home, and End via `FocusgroupNavigationController` ([PR #6129](https://github.com/adobe/spectrum-web-components/pull/6129)), not `aria-activedescendant` for this pattern on 2nd-gen. The controller does not require slotted items, groups, or dividers to live in the same shadow tree as the co-located trigger and internal `role="menu"`. Optional [printable character navigation](#printable-character-navigation-optional-not-typeahead) is separate from combobox typeahead.
- The focus-group / `FocusgroupNavigationController` wiring on the `role="menu"` list owner should collect `swc-menu-item` roving targets as direct children and as children of each direct `swc-menu-group` (items in the default slot under a group are included that way). An illustrative query for that row set (with `this` being the list surface the controller runs against—e.g. the open menu or slotted row host; verify in 2nd-gen source) is:

  ```js
  this.querySelectorAll(':scope > swc-menu-item, :scope > swc-menu-group > swc-menu-item');
  ```

  Separators are not roving stops; the query is for `menuitem` rows only. See [Menu item](../menu-item/accessibility-migration-analysis.md) and [Menu group](../menu-group/accessibility-migration-analysis.md) for slot and shadow details.
- **Disabled items:** a disabled `swc-menu-item` keeps `aria-disabled="true"` and should not run its action when the user presses Enter or Space, per [Menu item — ARIA: Disabled row](../menu-item/accessibility-migration-analysis.md#aria-roles-states-and-properties) (it may still appear in the roving set; verify in 2nd-gen stories).
- Open, close, and focus hand-off to first, last, or return are coordinated with the top-level `swc-menu` or `swc-action-menu` host (or a `swc-menu-item` submenu row, whose submenu trigger and child `role="menu"` are in the item’s shadow tree as implemented). Submenu `role="menu"` lists should use the same item and group collection model on their own list context (verify in source).

### Printable character navigation (optional; not typeahead)

The [menu button pattern](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/) allows moving focus in the list with character keys. For `swc-menu` and `swc-action-menu`, an **optional** enhancement is **printable character navigation**: when the user presses a **printable** key (letter, digit, or similar) while the list is open, focus can move among `swc-menu-item` rows by matching the **visible label** of each item (for example the next item whose label **starts with** that character, with wrapping in the roving set—exact rules live in 2nd-gen source).

This is **not** the same as **combobox typeahead** (a timed, multi-character string buffer in a text field + listbox, as in [APG combobox](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/)). Do not document or implement combobox-style typeahead on the `role="menu"` surface.

The same optional printable character behavior should apply to the **submenu** `role="menu"` that lives in `swc-menu-item`’s shadow when that submenu is open, so top-level and nested lists stay consistent. Whether the project ships this behavior is **optional**; confirm in 2nd-gen `FocusgroupNavigationController` (or follow-on work) and Storybook before treating it as guaranteed.

---

## Testing

### Automated tests

| Kind of test | What to check |
| --- | --- |
| Unit | **Internal** **`role="menu"`** (shadow **tree**) **and** **row** / **item** state **props**; open and closed affordances. |
| aXe + Storybook | Menu and action menu stories; `aria-disabled` on disabled items where applicable ([Menu item — ARIA](../menu-item/accessibility-migration-analysis.md#aria-roles-states-and-properties)); no duplicate link activation on href items ([SWC-923](https://jira.corp.adobe.com/browse/SWC-923)). |
| Playwright / ARIA snapshots | Open and close; roving focus; at least one disabled `swc-menu-item` path when the implementation supports it; submenu expansion where in scope. Do not gate on checkbox, radio, or selection stories until [Migration scope](#migration-scope-current) closes. |

### Keyboard testing

Follow the 2nd-gen Storybook [Keyboard testing](../../../../2nd-gen/packages/swc/.storybook/guides/accessibility-guides/keyboard_testing.mdx) guide whenever you verify `swc-menu` with a real trigger or test harness (`swc-action-menu` or submenu parent). Cover open and close from the trigger per the [menu button pattern](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/), in-list movement (arrow keys, Home, End) via `FocusgroupNavigationController`, and—if implemented—[printable character navigation](#printable-character-navigation-optional-not-typeahead) (not combobox typeahead), plus Escape with focus return and submenu keyboard behavior where in scope. Automated and Playwright expectations should match the same behaviors (see [Recommendations: Keyboard and focus](#keyboard-and-focus)).

### Playwright-only or host-only accessibility gates

Align with the action menu test plan; add menu-only paths for item **`submenu` slot** (submenu) behaviour and link item rows.

### Manual and screen reader testing (mandatory, host alone)

When **spot-testing** the menu **surface** in Storybook, use the **full** `swc-menu` **host** (or a **test** harness with the same trigger, open/close, and focus return) so behaviour matches the [menu button](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/) **pattern**—a **naked** slotted list without that host is not a supported end user pattern. Use [Keyboard testing](#keyboard-testing) and [Screen reader testing](../../../../2nd-gen/packages/swc/.storybook/guides/accessibility-guides/screen_reader_testing.mdx).

---

## Summary checklist

- [ ] `swc-menu` is a full menu-button host (trigger + `swc-popover` + **shadow-internal** **`role="menu"`** + **menu** **slot** for groups, items, dividers), parallel to `swc-action-menu`; **`role="menu"`** is **not** on the **`<swc-menu>`** **host**; do not document a detached `role="menu"` list. **Submenus** are **on** **`swc-menu-item`’s** **`submenu` slot** ( **submenu** **trigger** and child **`role="menu"`** **in** the **item**’s **shadow** **DOM**; **not** a **nested** **`swc-menu`** in the list). **Do** **not** **slot** **`swc-menu` / `swc-action-menu`** into **`swc-menu`**, **`swc-action-menu`**, or **`swc-menu-item`**; the **menu** **slot** **(current** **scope**)**: **`swc-menu-item`**, **`swc-menu-group`**, **`swc-menu-separator`** **only** ( **verify** **source** ).
- [ ] On the host, the menu-button trigger and internal `role="menu"` are co-located in `swc-menu` / `swc-action-menu` shadow; slotted `swc-menu-item` / `swc-menu-group` / `swc-menu-separator` need not be in that shadow subtree (see [Shadow DOM](#shadow-dom-and-cross-root-aria-issues)).
- [ ] **Internal** **`role="menu"`** (**shadow** **DOM**, **not** the **CE** **host**), **`menuitem`**, and **`group` / `separator` as needed** per APG for commands in scope; selection and `menuitemcheckbox` / `menuitemradio` defer per [Migration scope](#migration-scope-current).
- [ ] Disabled `swc-menu-item` rows: `aria-disabled="true"` and no action on Enter/Space when disabled, per [Menu item — ARIA: Disabled row](../menu-item/accessibility-migration-analysis.md#aria-roles-states-and-properties) (covered in tests when supported).
- [ ] Open/close + role wiring vs in-list keys: implementation may split across a controller, `swc-popover`, and `swc-menu` / `swc-action-menu` (verify in source); `FocusgroupNavigationController` for in-menu movement; **`swc-popover`** anchors the surface—not **`sp-menu`** slid under the legacy overlay stack alone. Optional [printable character navigation](#printable-character-navigation-optional-not-typeahead) (if shipped) is consistent on top-level and submenu lists—not combobox typeahead. Mobile tray is out of scope for the current migration.
- [ ] No proxy click for link items; link child plus [Cards](https://inclusive-components.design/cards/)-style full-row hit where needed.
- [ ] 1st-gen defects in the Jira table are retested or superseded in 2nd-gen.

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

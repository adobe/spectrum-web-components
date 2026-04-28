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

This document sets accessibility expectations for 2nd-gen **`Menu` (`swc-menu`)**: a **full** **[menu-button](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/)** host in the same **structural** class as **`swc-action-menu`**. **Both** **`swc-menu`** and **`swc-action-menu`** include: a **trigger** button, **`swc-popover`** (or equivalent) for **placement** of the layered surface, an **internal** **menu** **surface** (an **element** with **`role="menu"`** **inside** **`swc-menu`’s** **shadow** **DOM**—**not** on the **`<swc-menu>`** custom element **host**), and **slots** for **`swc-menu-group`**, **`swc-menu-item`**, and **`swc-menu-divider`** in that **list**. **Submenus** are **not** authored by **nesting** another **`swc-menu`** **inside** the list—**they** are created when a **`swc-menu-item`** has **child** **nodes** in its **`submenu` slot**: the **submenu** **trigger** and **child** **`role="menu"`** **are** **elements** **in** **`swc-menu-item`’s** **shadow** **DOM**—**not** the **`<swc-menu-item>`** **host**—**with** **`swc-popover`** (or **equivalent**) **for** **anchoring** (see [Menu item — What `swc-menu-item` is (2nd-gen)](../menu-item/accessibility-migration-analysis.md#what-swc-menu-item-is-2nd-gen); **verify** in 2nd-gen **source**). There is no 2nd-gen split where one component owns **only** the trigger and the other **only** the list—**each** top-level host implements trigger **`+`** popover **`+`** **menu** subtree **`+`** in-menu behaviour, aligned with [React Spectrum **`Menu`**](https://react-spectrum.adobe.com/Menu) and [React Spectrum **`ActionMenu`**](https://react-spectrum.adobe.com/ActionMenu) respectively. **`sp-menu`** in 1st-gen was most often a **list/listbox** container composed **inside** external overlays, **`sp-action-menu`**, and pickers; authors chose **`swc-menu`** vs **`swc-action-menu`** for **general** Menu vs **ActionMenu** (more-actions) product defaults ([§ What **`swc-menu`** is (2nd-gen)](#what-swc-menu-is-2nd-gen)).

The target is **WCAG 2.2 Level AA**. Product alignment follows [React Spectrum `Menu`](https://react-spectrum.adobe.com/Menu); `menuitemcheckbox` / `menuitemradio` and selection UX remain tracked separately ([Migration scope](#migration-scope-current)).

### Migration scope (current)

These topics are out of scope for the migration wave documented here until design and accessibility provide a single product answer:

- Mobile tray — small-viewport / bottom-sheet presentation (already called out elsewhere in these docs).
- Menu item selection — including selection modes (single vs multiple), persisted selected state, `menuitemcheckbox` / `menuitemradio` behavior, `aria-checked`, keyboard for toggle items, and group patterns for selectables. This doc still names [APG](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/) roles for when that work lands; do not treat checkbox / radio menu rows as locked for 2nd-gen until that clarification closes.

### Also read

- [Menu migration roadmap](./rendering-and-styling-migration-analysis.md) for epics, placement with popover, and 1st-gen / 2nd-gen scope ([SWC-1980](https://jira.corp.adobe.com/browse/SWC-1980)).
- [Action menu accessibility migration analysis](../action-menu/accessibility-migration-analysis.md) for **`swc-action-menu`** (ActionMenu: parallel **full** host to **`swc-menu`**, with default “more” / ellipses trigger chrome), **`swc-popover`**-based anchoring (versus 1st-gen **overlay** + ad hoc triggers around **`sp-menu`**), and submenus. Mobile tray and menu item selection (`menuitemcheckbox` / `menuitemradio`, modes) defer per [Migration scope (current)](#migration-scope-current).
- [Popover accessibility migration analysis](../popover/accessibility-migration-analysis.md) — `swc-popover` is a positioning host; it does not implement `role="menu"` or in-menu keyboard (those stay in menu + action menu).

### What `swc-menu` is (2nd-gen)

- **`swc-menu`** (this doc) and **`swc-action-menu`** ([action menu doc](../action-menu/accessibility-migration-analysis.md)) are **both** top-level **menu-button** hosts. **Each** includes: a **trigger** button, **`swc-popover`** for **anchoring** the open surface, a **menu** **surface** whose **`role="menu"`** **node** **lives** in **the** **component**’s **shadow** **tree** (**not** the **CE** **host**), and **slots** for **`swc-menu-group`**, **`swc-menu-item`**, and **`swc-menu-divider`**. **Submenus** are **not** a **second** **nested** **`swc-menu`** or **`swc-action-menu`** **in** the **list**; they are **implemented** on **`swc-menu-item`** through the **`submenu` slot**: when that **slot** has **child** **nodes**, the **submenu** **trigger** and **child** **`role="menu"`** **render** **in** **`swc-menu-item`’s** **shadow** **DOM** (**not** the **item** **CE** **host**), **with** **popover** **anchoring** as **implemented** (see [Menu item — What `swc-menu-item` is (2nd-gen)](../menu-item/accessibility-migration-analysis.md#what-swc-menu-item-is-2nd-gen); **verify** in 2nd-gen **source**). Checkbox / radio menu items and selection UX (`aria-checked`, modes) defer per [Migration scope](#migration-scope-current).
- **Compared with 1st-gen `sp-menu`:** **`sp-menu`** was primarily **the list (or listbox) surface** composed **under** **`<sp-action-menu>`**, **overlay**/**`sp-popover`**, **picker**, or other parents that supplied **orchestration and trigger** separately. In 2nd-gen, **`swc-menu`** **folds in** the **full** [menu-button](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/) **composition** (as does **`swc-action-menu`**, in line with 1st-gen **`sp-action-menu`’s** long-standing **trigger + list** package). Picker- and listbox-oriented **`sp-menu`** usages that were **not** full **menu** patterns remain out of this doc’s scope; prefer combobox + listbox where that is the product.
- Placement (anchor to trigger, flip, z-index) uses the shared [popover](https://react-spectrum.adobe.com/Popover) / **`swc-popover`** host instead of layering **`sp-menu`** through the legacy **overlay** stack. ARIA for **`menu`** and **`menuitem`** is **on** the **internal** **shadow** **markup** and **slotted** **row** **content** (**`role="menu"`** is **not** on the **`<swc-menu>`** **host**); **`swc-popover`** does not implement **`role="menu"`** or in-menu keyboard (see [Popover](../popover/accessibility-migration-analysis.md)). Mobile tray (alternative small-viewport presentation) is out of scope for the current migration and is not part of the 2nd-gen positioning spec in these docs.
- Two coordination pieces (conceptual; how they ship may split across packages—verify in 2nd-gen source):
  1. Open/close and role wiring — must satisfy the [menu button pattern](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/) (`role`, `aria-*` on **trigger** and on the **internal** **`role="menu"`** **node** in **shadow** **DOM** (**not** the **CE** **host**), open state, focus on open with first item or return on close, Escape) **on whichever top-level host** the author uses (**`swc-menu`** or **`swc-action-menu`**). For **submenus** (**`submenu` slot** on **`swc-menu-item`**), the **submenu** **trigger** and **child** **`role="menu"`** also **belong** in **`swc-menu-item`’s** **shadow** **tree** (see the **item** **doc**). Implementation may use a **dedicated controller** (root **`swc-action-menu`**, **`swc-menu`**, or **`swc-menu-item`**) plus **`swc-popover`** for **anchoring** and dismiss as applicable. **`swc-action-menu`**-specific product defaults (for example **icon-only** “more” vs **visible** label) do **not** change the fact that **both** top-level menu hosts **own** trigger + **internal** **menu** **subtree**; **menu ARIA and in-menu keyboard** are still **not** implemented by **`swc-popover`** alone (see [Popover](../popover/accessibility-migration-analysis.md)).
  2. In-menu movement — arrow / Home / End / typeahead via `FocusgroupNavigationController` (and related work, for example [spectrum-web-components#6129](https://github.com/adobe/spectrum-web-components/pull/6129)), not `aria-activedescendant` across shadow roots for 2nd-gen (see the action menu doc).

### When to use something else

- Single-select from a closed field with a textbox — [APG combobox](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/) (combobox + listbox) `swc-picker` or `swc-combobox`, not `swc-menu`.
- Site navigation links — [disclosure navigation](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/) (no `role="menu"` on a link list by default); use `uec-sidenav` or `swc-sidenav`.
- Modal dialog — [dialog (modal) pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/); not a menu surface (may still use shared popover styles on the dialog chrome per [Popover](../popover/accessibility-migration-analysis.md)).

### What it is not

- **Not** the old **list-only** `sp-menu`: 2nd-gen **`swc-menu`** and **`swc-action-menu`** each ship **trigger**, **`swc-popover`** placement, a **shadow-internal** **`role="menu"`** **surface** (**not** on the **CE** **host**), and **slots** together. Do **not** document a **detached** `role="menu"` fragment. **Submenus** use **`swc-menu-item`’s** **`submenu` slot** (not a **nested** top-level **menu** **host** in the list).
- Not the same as `swc-popover`: popover positions; menu exposes menu semantics to assistive tech.
- Not a link list widget by default: command menus use `menuitem`; link-like rows are covered below (real link child, not proxy click on the row).

### Related

- Action menu — [Action menu accessibility migration analysis](../action-menu/accessibility-migration-analysis.md) for `swc-action-menu`, [ActionMenu](https://react-spectrum.adobe.com/ActionMenu) (more-actions pattern / ellipses trigger), `swc-popover`, and [Migration scope](#migration-scope-current) (tray and selection deferrals).
- [Menu separator accessibility migration analysis](../menu-separator/accessibility-migration-analysis.md) for **`swc-menu-divider`** (**`separator`** between **`menuitem`** rows).
- [Menu group accessibility migration analysis](../menu-group/accessibility-migration-analysis.md) for `swc-menu-group` (`role="group"` **inside** the **internal** **`role="menu"`** **subtree** of **`swc-menu` / `swc-action-menu`**).
- [Menu item accessibility migration analysis](../menu-item/accessibility-migration-analysis.md) for `swc-menu-item`, `menuitem` rows, submenus, and link rows.
- Menubar — a different layout and focus model than a single action button; if 2nd-gen ships a menubar, it will get its own doc; **cascading** **submenu** **surfaces** still use **`swc-menu-item`’s** **`submenu` slot** ([Menu item doc](../menu-item/accessibility-migration-analysis.md)) in this workstream.

---

## ARIA and WCAG context

### Pattern in the APG

- [Menu button](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/) — trigger + `role="menu"` + `menuitem`; APG also defines `menuitemcheckbox` and `menuitemradio` (selection UX out of scope until [Migration scope (current)](#migration-scope-current) closes). **`swc-menu`** and **`swc-action-menu`** each **expose a trigger** and an **internal** **`role="menu"`** ( **inside** the **component**’s **shadow** **DOM**, **not** the **CE** **host** ); a **`swc-menu-item`** with a **populated** **`submenu` slot** **carries** **submenu**-**parent** **semantics** ( **`aria-haspopup`**, **`aria-expanded`**, **submenu** **trigger**, **child** **`role="menu"`** ) **rendered** **in** **`swc-menu-item`’s** **shadow** **DOM**; **menubar** (if ever shipped) would differ.
- [Menubar](https://www.w3.org/WAI/ARIA/apg/patterns/menubar/) — submenu surfaces are also `role="menu"`; the parent item has `aria-haspopup="menu"` and `aria-expanded`.

### Guidelines that apply

| Idea | Plain meaning |
| --- | --- |
| [Name, role, value (4.1.2)](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value) | `role="menu"` and `menuitem` on rows; `group` / `separator` when used for plain commands per APG-style structure; names on items. `menuitemcheckbox`, `menuitemradio`, and menu item selection (state and modes) are out of scope until [Migration scope (current)](#migration-scope-current) closes. |
| [Focus order (2.4.3)](https://www.w3.org/WAI/WCAG22/Understanding/focus-order) / [Focus visible (2.4.7)](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible) | On open, focus moves into the menu; roving tabindex inside the list; closing returns focus to the trigger (or parent menu item for submenus). |
| [Keyboard (2.1.1)](https://www.w3.org/WAI/WCAG22/Understanding/keyboard) | All actions are available from the keyboard per the menu pattern; no pointer-only submenu chrome (see 1st-gen [SWC-1332](https://jira.corp.adobe.com/browse/SWC-1332), [SWC-671](https://jira.corp.adobe.com/browse/SWC-671)). |
| [Non-text contrast (1.4.11)](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast) | Focus ring and icons meet contrast where they convey state (for example [SWC-1517](https://jira.corp.adobe.com/browse/SWC-1517) submenu focus on Safari). |

Bottom line: **`swc-menu`** is a **full** [menu button](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/) **host** (trigger + **`swc-popover`** + **shadow-internal** **`role="menu"`** **surface** + slotted **groups** / **items** / **separators**), in parallel with **`swc-action-menu`** (ActionMenu defaults) and 1st-gen **`sp-action-menu`**, **not** the **list-only** **`sp-menu`** *primitive* in isolation. The **`role="menu"`** **value** is **on** a **node** **inside** **`swc-menu`’s** **shadow** **tree**, **not** the **custom** **element** **itself** (**verify** in **source**). **Submenus** are **not** a **nested** **`swc-menu`** **in** the list; they are **on** **`swc-menu-item`’s** **`submenu` slot** ( **submenu** **trigger** and child **`role="menu"`** **in** the **item**’s **shadow** **tree**—**not** the **item** **CE** **host**—**plus** **popover** **anchoring** as **implemented**). **Item**-level **behaviour** is in **`swc-menu-item`**, **`swc-menu-group`**, **`swc-menu-divider`**, etc. Open/close and role wiring may be split across a **controller**, **`swc-popover`**, or the **menu**/**action-menu** **or** **submenu**-**item** **hosts** (confirm in implementation). `FocusgroupNavigationController` owns in-list keys. **Anchor** via **`swc-popover`**, not the legacy **overlay** + external trigger pattern around **`sp-menu`**. Mobile tray and item selection (checkbox, radio) remain out of scope ([Migration scope](#migration-scope-current)).

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

Scope: the internal `role="menu"` surface (inside `swc-menu`’s shadow DOM, not the CE host) and slotted groups, items, and separators; plain `menuitem` rows; submenu ARIA on rows that use the `submenu` slot ([Menu item doc](../menu-item/accessibility-migration-analysis.md)); and the link item pattern (see below). Trigger wiring for the top-level menu button is part of the `swc-menu` host (parallel to `swc-action-menu`—see [action menu doc](../action-menu/accessibility-migration-analysis.md) for ActionMenu-only defaults). Selectable `menuitemcheckbox` / `menuitemradio` rows and menu item selection UX are out of scope until [Migration scope](#migration-scope-current) is resolved (design + accessibility); APG references below remain orienting only.

### ARIA roles, states, and properties

| Topic | What to do |
| --- | --- |
| Internal `role="menu"` (not the CE host) | The menu-button trigger and the internal `role="menu"` node are implemented together in `swc-menu`’s (or `swc-action-menu`’s) shadow DOM—`role="menu"` is not on the `<swc-menu>` / `<swc-action-menu>` custom element host, and the host design keeps the trigger and menu surface in that shadow tree together. Verify final markup in 2nd-gen source before shipping docs. |
| Items | `menuitem` and `separator` / `group` as for plain commands; no `listitem` inside `menu`. Slotted `swc-menu-item`, `swc-menu-group`, and `swc-menu-divider` do not need to be in that shadow tree with the co-located trigger and `role="menu"`—they are commonly slotted from the light DOM. The list pattern does not need ID references from the menu or trigger to each item; inter-item movement uses roving `tabindex` and `FocusgroupNavigationController` ([PR #6129](https://github.com/adobe/spectrum-web-components/pull/6129)) (see [Shadow DOM](#shadow-dom-and-cross-root-aria-issues)). Checkbox and radio `menuitem*` rows and selection behavior (`aria-checked`, multi-select) are out of scope until clarification ([Migration scope](#migration-scope-current)). |
| Submenus | On `swc-menu-item`: when the `submenu` slot has content, the submenu parent is a `menuitem` with `aria-haspopup="menu"` and `aria-expanded`. The submenu trigger and child `role="menu"` live in `swc-menu-item`’s shadow DOM (not the item CE host), with popover anchoring ([Menu item — Recommendations](../menu-item/accessibility-migration-analysis.md#recommendations-swc-menu-item); not a nested `swc-menu` in the list). |
| Link-like rows | Do not use the 1st-gen proxy click pattern for `href` on the row (see [SWC-923](https://jira.corp.adobe.com/browse/SWC-923)). Prefer a real `<a href="…">` (or router link) as a descendant of the item content with a clear name; for a full-row click target, follow [Inclusive Components: Cards](https://inclusive-components.design/cards/) (stretch the link with pseudo / positioning so the entire row is one interactive surface without double activation). |
| Open/close + roles | Responsibility may sit in a controller module, in `swc-popover`, or in the menu-button host (`swc-menu` or `swc-action-menu`) that owns the co-located trigger and internal `role="menu"` in shadow—for example ActionMenu-specific trigger chrome (icon-only vs visible label) on `swc-action-menu`, or Menu-specific trigger on `swc-menu`. Confirm the actual split in 2nd-gen source. Open/close and initial/return focus must still satisfy the [menu button pattern](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/). In-menu movement does not rely on IDREF to each slotted item—`FocusgroupNavigationController` drives roving focus and does not require list rows in the same shadow tree as the trigger and menu. Avoid `aria-activedescendant` and other IDREF patterns that resolve IDs across unrelated roots (see [SWC-617](https://jira.corp.adobe.com/browse/SWC-617) and the action menu doc); verify wiring in 2nd-gen source. |

### Shadow DOM and cross-root ARIA Issues

**Host shell (stays in shadow):** the menu-button trigger and the internal `role="menu"` element are implemented together in the `swc-menu` / `swc-action-menu` shadow tree (verify node relationships in 2nd-gen source).

**Slotted list content (need not be in that shadow tree):** `swc-menu-item`, `swc-menu-group`, and `swc-menu-divider` nodes (and their descendant content) do not need to be children of that shadow subtree—authors may slot them from the light DOM. The menu list pattern does not need IDREF from the trigger or the `role="menu"` node to each item; arrow and roving focus between items are handled by `FocusgroupNavigationController` ([PR #6129](https://github.com/adobe/spectrum-web-components/pull/6129)) with roving `tabindex`, not by stringing item IDs. An implementation may still relayer or portal list content for layout while preserving `menu` / `menuitem` exposure (verify in 2nd-gen source).

Other IDREF-based ARIA that spans separate roots (for example `aria-activedescendant` to distant element IDs, or `aria-labelledby` / `aria-describedby` across unrelated trees) is unreliable. Prefer the controller-driven list model for in-menu focus; avoid trigger↔row ID resolution where roots do not line up (see action menu doc, [SWC-617](https://jira.corp.adobe.com/browse/SWC-617)). Group section titles that use `aria-labelledby` to a local label `id` are a separate case from item IDREFs—see [Menu group — Shadow DOM](../menu-group/accessibility-migration-analysis.md#shadow-dom-and-cross-root-aria-issues) if labeled groups apply.

For nested submenus (when `swc-menu-item`’s `submenu` slot is used), the submenu trigger and child `role="menu"` render in `swc-menu-item`’s shadow DOM (not the item CE host). Child menu rows slotted into that submenu need not be in the same DOM as the ancestor top-level menu trigger; align submenu ARIA and focus with the parent row per [Menu item — Shadow DOM](../menu-item/accessibility-migration-analysis.md#shadow-dom-and-cross-root-aria-issues) and 2nd-gen source.

### Accessibility tree expectations

- Closed: menu hidden; focus on trigger (or parent item).
- Open: internal `role="menu"` exposed to assistive technologies; first keystroke lands on an item per pattern; items expose roles and names; disabled items use `aria-disabled="true"` when appropriate.

### Form-associated custom properties (labels, `ElementInternals`)

Does not apply. The internal `role="menu"` list is not a form field; the menu-button trigger on the `swc-menu` / `swc-action-menu` host still needs a name; `swc-action-menu` the same. Field labels for pickers and comboboxes belong on those patterns.

### Live regions, loading, and announcements

Does not apply to the `swc-menu` host by default; status for async actions belongs to content or app chrome, not the menu list shell.

### Motion (dedicated recommendations subsection)

Intentionally omitted. If open/close motion is added, treat reduced motion like other layered UI (popover surfaces); no separate Motion subsection here.

### Keyboard and focus

- In-menu navigation (arrow keys, Home / End, typeahead) via `FocusgroupNavigationController` ([PR #6129](https://github.com/adobe/spectrum-web-components/pull/6129)), not `aria-activedescendant` for this pattern on 2nd-gen. The controller does not require slotted items, groups, or dividers to live in the same shadow tree as the co-located trigger and internal `role="menu"`.
- Open, close, and focus hand-off to first, last, or return are coordinated with the top-level `swc-menu` or `swc-action-menu` host (or a `swc-menu-item` submenu row, whose submenu trigger and child `role="menu"` are in the item’s shadow tree as implemented).

---

## Testing

### Automated tests

| Kind of test | What to check |
| --- | --- |
| Unit | **Internal** **`role="menu"`** (shadow **tree**) **and** **row** / **item** state **props**; open and closed affordances. |
| aXe + Storybook | Menu and action menu stories; no duplicate link activation on href items ([SWC-923](https://jira.corp.adobe.com/browse/SWC-923)). |
| Playwright / ARIA snapshots | Open and close; roving focus; submenu expansion where in scope. Do not gate on checkbox, radio, or selection stories until [Migration scope](#migration-scope-current) closes. |

### Keyboard testing

Follow the 2nd-gen Storybook [Keyboard testing](../../../../2nd-gen/packages/swc/.storybook/guides/accessibility-guides/keyboard_testing.mdx) guide whenever you verify `swc-menu` with a real trigger or test harness (`swc-action-menu` or submenu parent). Cover open and close from the trigger per the [menu button pattern](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/), in-list movement (arrow keys, Home, End, typeahead) via `FocusgroupNavigationController`, Escape with focus return, and submenu keyboard behavior where in scope. Automated and Playwright expectations should match the same behaviors (see [Recommendations: Keyboard and focus](#keyboard-and-focus)).

### Playwright-only or host-only accessibility gates

Align with the action menu test plan; add menu-only paths for item **`submenu` slot** (submenu) behaviour and link item rows.

### Manual and screen reader testing (mandatory, host alone)

When **spot-testing** the menu **surface** in Storybook, use the **full** `swc-menu` **host** (or a **test** harness with the same trigger, open/close, and focus return) so behaviour matches the [menu button](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/) **pattern**—a **naked** slotted list without that host is not a supported end user pattern. Use [Keyboard testing](#keyboard-testing) and [Screen reader testing](../../../../2nd-gen/packages/swc/.storybook/guides/accessibility-guides/screen_reader_testing.mdx).

---

## Summary checklist

- [ ] `swc-menu` is a full menu-button host (trigger + `swc-popover` + **shadow-internal** **`role="menu"`** + slots for groups, items, dividers), parallel to `swc-action-menu`; **`role="menu"`** is **not** on the **`<swc-menu>`** **host**; do not document a detached `role="menu"` list. **Submenus** are **on** **`swc-menu-item`’s** **`submenu` slot** ( **submenu** **trigger** and child **`role="menu"`** **in** the **item**’s **shadow** **DOM**; **not** a **nested** **`swc-menu`** in the list).
- [ ] On the host, the menu-button trigger and internal `role="menu"` are co-located in `swc-menu` / `swc-action-menu` shadow; slotted `swc-menu-item` / `swc-menu-group` / `swc-menu-divider` need not be in that shadow subtree (see [Shadow DOM](#shadow-dom-and-cross-root-aria-issues)).
- [ ] **Internal** **`role="menu"`** (**shadow** **DOM**, **not** the **CE** **host**), **`menuitem`**, and **`group` / `separator` **as** **needed** per APG for commands in scope; selection and `menuitemcheckbox` / `menuitemradio` defer per [Migration scope](#migration-scope-current).
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

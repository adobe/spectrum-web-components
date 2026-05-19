<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../../README.md) / [Project planning](../../README.md) / [Components](../README.md) / Grid / Grid accessibility migration analysis

<!-- Document title (editable) -->

# Grid accessibility migration analysis

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [Overview](#overview)
    - [Also read](#also-read)
    - [What it is](#what-it-is)
    - [When to use something else](#when-to-use-something-else)
    - [What it is not](#what-it-is-not)
    - [Program (2nd-gen, Jira snapshot)](#program-2nd-gen-jira-snapshot)
- [ARIA and WCAG context](#aria-and-wcag-context)
    - [Pattern in the APG](#pattern-in-the-apg)
    - [Guidelines that apply](#guidelines-that-apply)
- [Related 1st-gen accessibility (Jira)](#related-1st-gen-accessibility-jira)
- [1st-gen implementation notes (avoid in 2nd-gen)](#1st-gen-implementation-notes-avoid-in-2nd-gen)
- [Recommendations: `<swc-grid>`](#recommendations-swc-grid)
    - [ARIA roles, states, and properties](#aria-roles-states-and-properties)
    - [Shadow DOM and cross-root ARIA Issues](#shadow-dom-and-cross-root-aria-issues)
    - [Form-associated custom elements](#form-associated-custom-elements)
    - [Accessibility tree expectations](#accessibility-tree-expectations)
    - [Live regions, loading, and announcements](#live-regions-loading-and-announcements)
    - [Keyboard and focus](#keyboard-and-focus)
- [Testing](#testing)
    - [Automated tests](#automated-tests)
- [Summary checklist](#summary-checklist)
- [References](#references)

</details>

<!-- Document content (editable) -->

## Overview

This doc describes how **`swc-grid`** should behave for **accessibility** in 2nd-gen, targeting **WCAG 2.2 Level AA**. **`swc-grid`** is a **virtualized layout grid** host (successor to 1st-gen **`sp-grid`** in [`1st-gen/tools/grid`](../../../../1st-gen/tools/grid/)) used to present **many focusable items** in rows and columns with **arrow-key** navigation. The primary product consumer is planned **`swc-card-view`**, modeled on [React Spectrum CardView](https://react-spectrum.adobe.com/CardView) (collections of cards, selection, async **loading**, bulk actions). There is **no** Spectrum 2 Figma file for **`swc-grid`** at planning time—semantics follow the [APG Grid pattern](https://www.w3.org/WAI/ARIA/apg/patterns/grid/) and [Data Grid Examples](https://www.w3.org/WAI/ARIA/apg/patterns/grid/examples/data-grids/).

**2nd-gen direction:** Prescribed host **`role="grid"`** with **roving** **`tabindex`** on **cells** (or **rows**, per layout contract), implemented with **`FocusgroupNavigationController`** and **`direction: 'grid'`** ([Focus management](../../../01_contributor-guides/14_focus-management.md))—**not** 1st-gen **`RovingTabindexController`**. **Virtualization** must keep **logical** row/column position and **focus** stable when items mount and unmount. **Layout** styling (**gap**, **item size**, **grid** vs **waterfall**) is visual only and must not replace grid **roles** or **keyboard** contracts.

### Also read

[Grid migration roadmap](./rendering-and-styling-migration-analysis.md) (virtualization, layout, 1st-gen **`sp-grid`** API). [Focus management](../../../01_contributor-guides/14_focus-management.md) (**`FocusgroupNavigationController`**). [React Spectrum CardView](https://react-spectrum.adobe.com/CardView) (target collection UX). When **`swc-card-view`** exists, its accessibility doc should reference this file for **grid** keyboard and **ARIA** ownership.

### What it is

- **`swc-grid`:** A **single Tab stop** composite that exposes **`role="grid"`** on the host (or on a single scrollable **grid** element inside shadow DOM—pick one tree shape and document it). **Arrow** keys move focus among **grid cells** per [Data Grid Examples](https://www.w3.org/WAI/ARIA/apg/patterns/grid/examples/data-grids/) (Right/Left/Up/Down, **Home** / **End**, **Ctrl+Home** / **Ctrl+End**, **Page Up** / **Page Down** when scrollable via **`pageStep`**).
- **Navigation implementation:** **`FocusgroupNavigationController`** with **`direction: 'grid'`**, **`getItems`** returning focusable **cells** (or row wrappers—see [Accessibility tree expectations](#accessibility-tree-expectations)), **`skipDisabled: true`**, **`wrap`** per product, and **`refresh()`** after **virtualizer** range changes.
- **Naming:** **`accessible-label`** or **`aria-label`** / **`aria-labelledby`** on the **grid**—required (CardView examples use **`aria-label="Nature photos"`**). Each **item** needs a **name** (**`textValue`**, **`aria-label`**, or visible title on the card)—owned by the **item** renderer (`renderItem` / slotted **`swc-card`**), not only by the grid host.
- **Virtualization:** Only **visible** items (+ buffer) are in the DOM; **`aria-rowcount`** / **`aria-colcount`** (and **`aria-rowindex`** / **`aria-colindex`** on rows/cells when rows/columns are omitted from the tree) must reflect **logical** collection size, not mounted node count ([Data Grid Examples — scrollable grid notes](https://www.w3.org/WAI/ARIA/apg/patterns/grid/examples/data-grids/)).
- **Selection (when enabled):** Host **`aria-multiselectable`** when **`selectionMode`** allows multiple selection; **rows** or **cells** expose **`aria-selected`**; **Space** toggles selection per APG grid guidance unless product uses **link**/**action**-only cards ([React Spectrum CardView — Selection](https://react-spectrum.adobe.com/CardView)).

### When to use something else

- **Single column list** with no 2D navigation → [Listbox](https://www.w3.org/WAI/ARIA/apg/patterns/listbox/) / future **`swc-list`** patterns—not **`role="grid"`**.
- **Tabular data** with sortable **column headers** and **editable cells** → full [Data Grid](https://www.w3.org/WAI/ARIA/apg/patterns/grid/) table semantics; **`swc-grid`** for CardView is a **simpler** cell matrix (often **one cell per card**).
- **Toolbar** or **button row** → [Button group](../button-group/accessibility-migration-analysis.md) / **`FocusgroupNavigationController`** **`horizontal`** on the toolbar host—not a **grid**.
- **Non-virtualized** small sets → static layout or **gridlist** may suffice; still document keyboard if using **`role="grid"`**.

### What it is not

- **Not a 1st-gen `RovingTabindexController` host:** 2nd-gen must use **`FocusgroupNavigationController`** (bounding-rect **grid** layout, **Ctrl+Home** / **Ctrl+End**, optional **pageStep**).
- **Not author-overridable `role`:** **`grid`** is **prescribed**; do not expose **`role="list"`**, **`role="table"`**, or **`role="grid"`** overrides on **`swc-grid`**.
- **Not free of item semantics:** **`renderItem`** / slotted cards must supply **row** / **gridcell** / **name** / **selected**—the grid does not invent names from images alone.
- **Not CardView itself:** **`swc-card-view`** composes **`swc-grid`** + **`swc-card`** (and action bar, empty state, etc.); bulk **action bar** keyboard lives on **`swc-action-bar`** / toolbar patterns.

### Program (2nd-gen, Jira snapshot)

Add **`gen2`** program tickets here when filed (**`swc-grid`**, **`swc-card-view`**, virtualization, CardView parity). Those items are **out of scope** for the **Related 1st-gen** table below.

---

## ARIA and WCAG context

### Pattern in the APG

- [Grid pattern](https://www.w3.org/WAI/ARIA/apg/patterns/grid/) — composite **2D** navigation; host uses **roving** **`tabindex`**; **grid** container is typically **not** focused—focus is on **cells** ([Managing focus with roving tabindex](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#kbd_roving_tabindex)).
- [Data Grid Examples](https://www.w3.org/WAI/ARIA/apg/patterns/grid/examples/data-grids/) — target **keyboard** contract for **`swc-grid`** (**arrows**, **Home** / **End**, **Ctrl+Home** / **Ctrl+End**, **Page Up** / **Page Down** when virtualized scrolling applies).
- [Layout Grid Examples](https://www.w3.org/WAI/ARIA/apg/patterns/grid/examples/layout-grids/) — secondary reference when **CardView** presents **widgets** in a **masonry** / **waterfall** layout rather than uniform **data** columns.
- [React Spectrum CardView](https://react-spectrum.adobe.com/CardView) — product API reference (**`aria-label`**, **`selectionMode`**, **`loadingState`**, **`onLoadMore`**, **`renderEmptyState`**, **`renderActionBar`**); map behaviors onto **`swc-grid`** + sibling components.

### Guidelines that apply

| Idea | Plain meaning |
| --- | --- |
| [Name, role, value (WCAG 4.1.2)](https://www.w3.org/TR/WCAG22/#name-role-value) | **Grid** **role** on the container; **label** on the grid; each focusable **cell** has a **name** and correct **`aria-selected`** / **disabled** when applicable. |
| [Keyboard (WCAG 2.1.1)](https://www.w3.org/TR/WCAG22/#keyboard) | **Tab** enters the **grid** (one stop); **arrows** move among **cells**; **Space** / **Enter** activate or select per documented CardView/grid contract. |
| [Focus visible (WCAG 2.4.7)](https://www.w3.org/TR/WCAG22/#focus-visible) | Focus ring on the **active cell** (or card focus target), visible when virtualized content scrolls. |
| [Content on hover or focus (WCAG 1.4.13)](https://www.w3.org/TR/WCAG22/#content-on-hover-or-focus) | Card previews and tooltips inside cells follow overlay rules ([Popover](../popover/accessibility-migration-analysis.md), [Tooltip](../tooltip/accessibility-migration-analysis.md)). |
| [Status messages (WCAG 4.1.3)](https://www.w3.org/TR/WCAG22/#status-messages) | **Loading more** / **empty** / **selection count** use **`role="status"`** or pattern-appropriate messaging—not **`aria-live="assertive"`** on the grid host for routine loads. |

**Bottom line:** **`swc-grid`** = **labeled** **`role="grid"`** + **`FocusgroupNavigationController`** (**`grid`**) + **virtualization-aware** **indices** + **item**-level **names** and **selection**; **`swc-card-view`** builds on top.

---

## Related 1st-gen accessibility (Jira)

Adobe Jira is authoritative for current status and resolution; refresh cells when you triage. **gen2**-labeled tickets belong in **Program (2nd-gen)** above, not here. Audit epic **[SWC-872](https://jira.corp.adobe.com/browse/SWC-872)** is omitted per contributor-doc rules.

No **`sp-grid`** / **Grid** component accessibility rows were available in the migration brief at authoring time—**add rows** when you file or discover 1st-gen issues (for example keyboard, virtualization focus loss, selection announcements).

| Jira | Type | Status (snapshot) | Resolution (snapshot) | Summary |
| --- | --- | --- | --- | --- |

---

## 1st-gen implementation notes (avoid in 2nd-gen)

**`sp-grid`** ([`Grid.ts`](../../../../1st-gen/tools/grid/src/Grid.ts), [`GridController.ts`](../../../../1st-gen/tools/grid/src/GridController.ts)) virtualizes with **`lit-virtualizer`**, uses **`RovingTabindexController`** with **`direction: 'grid'`**, and expects authors to set **`role="grid"`**, **`aria-label`**, **`aria-multiselectable`**, **`aria-rowcount`**, **`aria-colcount`**, and per-item **`role="row"`** / **`aria-selected`** / **`aria-rowindex`** in **`renderItem`** (see [1st-gen README](../../../../1st-gen/tools/grid/README.md) and [grid stories](../../../../1st-gen/tools/grid/stories/grid.stories.ts)).

**2nd-gen should:**

- Replace **`RovingTabindexController`** with **`FocusgroupNavigationController`** (`direction: 'grid'`, bounding-rect rows/columns, **Ctrl+Home** / **Ctrl+End**, optional **`pageStep`** for virtualized scroll).
- **Own** default **`role="grid"`** and required **label** API on **`swc-grid`**—do not rely on Storybook-only ARIA wiring.
- Call **`navigation.refresh()`** when **virtualizer** visible range or **`items`** length changes so roving **tabindex** and **memory** stay correct.
- Preserve **`focusableSelector`** (or equivalent) so **`renderItem`** can target **`swc-card`** (or inner button/link) as the **cell** focus target.
- Keep **focus** on **logical** index when scrolling—1st-gen documents that focus enters at index **0** of the **full** set, not only visible DOM nodes; verify the same with virtualization + **`FocusgroupNavigationController`**.

---

## Recommendations: `<swc-grid>`

### ARIA roles, states, and properties

| Topic | What to do |
| --- | --- |
| **Prescribed role** | Host (or single inner scroll container) **`role="grid"`** is **fixed**—not author-overridable. Use **`grid`** for CardView-style collections; do not expose **`list`** / **`table`** overrides on this element. |
| **Grid label (required)** | **`accessible-label`** and/or **`aria-labelledby`** on the **grid**—mirror [React Spectrum CardView](https://react-spectrum.adobe.com/CardView) **`aria-label`**. |
| **Row/column count** | When virtualization omits rows/columns from the DOM, set **`aria-rowcount`** / **`aria-colcount`** on the **grid**; set **`aria-rowindex`** / **`aria-colindex`** on **rows** / **cells** that are mounted ([Data Grid Examples](https://www.w3.org/WAI/ARIA/apg/patterns/grid/examples/data-grids/)). |
| **Selection** | **`aria-multiselectable="true"`** when multiple selection is allowed; **`aria-selected`** on **rows** or **cells**; sync with **`selectedKeys`** / CardView selection API. |
| **Disabled items** | **`disabledKeys`** / **`isDisabled`** on items → **`skipDisabled: true`** on **`FocusgroupNavigationController`**; expose **disabled** on the **cell** focus target. |
| **Item naming** | Document that **`renderItem`** / **`swc-card`** must expose a **discernible name** (**`textValue`**, title text, **`aria-label`**)—decorative images **`alt=""`** when the name is elsewhere. |
| **Layout props** | **`gap`**, **`itemSize`**, **`layout`** (**grid** / **waterfall**) are **visual** only—no ARIA **`orientation`** on the host unless product adds a documented **`aria-orientation`**. |
| **Docs** | Storybook: labeled grid, **2D** arrows, **selection**, **virtualized** long list, **loading more**, **empty state**—link [Keyboard testing](../../../../2nd-gen/packages/swc/.storybook/guides/accessibility-guides/keyboard_testing.mdx) and [Screen reader testing](../../../../2nd-gen/packages/swc/.storybook/guides/accessibility-guides/screen_reader_testing.mdx). |

### Shadow DOM and cross-root ARIA Issues

**`aria-labelledby`** / **`aria-describedby`** that reference **light DOM** **IDs** may not resolve to **virtualized** **cells** inside shadow DOM. Prefer **`accessible-label`** on the **grid** host; for **per-item** descriptions, use **names** on the **cell** focus target or **row**-local **`aria-describedby`** wired in **`renderItem`**. Document limits like [Button accessibility migration analysis](../button/accessibility-migration-analysis.md) **ElementInternals** / cross-root deferral where applicable.

### Form-associated custom elements

**Does not apply.** **`swc-grid`** is a **collection layout** host, not a form control. Slotted inputs inside a card use normal field semantics on those controls.

### Accessibility tree expectations

**`swc-grid` (default CardView-style, one card per cell)**

- **Container:** **`role="grid"`**, **name** from **`accessible-label`** / **`aria-labelledby`**.
- **Row:** **`role="row"`** per item (or per logical row when multiple columns).
- **Cell:** **`role="gridcell"`** containing the card focus target (often **`swc-card`** or inner **button** / **link**); **one** roving **tabindex="0"** among cells.
- **Selection:** **`aria-selected`** on **row** or **gridcell** when selected; **`aria-multiselectable`** on **grid** when needed.

**Virtualized subset**

- Off-screen **rows**/**cells** may be absent from the DOM; **`aria-rowindex`** / **`aria-colindex`** on mounted nodes reflect **logical** position in the full **`items`** collection.

### Live regions, loading, and announcements

**Does not apply on the `swc-grid` host by default.** **`loadingState`** / **`onLoadMore`** (CardView) should use **`role="status"`** or a single **polite** region on **`swc-card-view`** (or app chrome)—**not** **`aria-live="assertive"`** for **loading more** or scroll fetch. **Never** flood the grid with per-card live regions. **Empty state** content is static structure inside **`renderEmptyState`**, not a host **`assertive`** alert.

### Keyboard and focus

- **Enter the grid:** **Tab** focuses the **active cell** (roving **`tabindex="0"`**); the **grid** container itself is **not** focused ([APG roving tabindex](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#kbd_roving_tabindex)).
- **Move between cells:** **`FocusgroupNavigationController`** with **`direction: 'grid'`** — **Arrow** keys per [Data Grid Examples](https://www.w3.org/WAI/ARIA/apg/patterns/grid/examples/data-grids/); **Home** / **End** (row); **Ctrl+Home** / **Ctrl+End** (first/last cell); **Page Up** / **Page Down** when **`pageStep`** is set and the collection scrolls.
- **After virtualizer updates:** Call **`refresh()`** so **`getItems()`** matches visible + focusable cells; verify focus is not lost on off-screen items (scroll into view or retain logical index).
- **Selection:** **Space** toggles selection when **`selectionMode`** is enabled (unless **`selectionBehavior`** / link mode defers to **Enter**—document CardView parity).
- **Typeahead:** Optional **`focusFirstItemByTextPrefix`** for large collections—coordinate with **`disallowTypeAhead`** when the grid is inside a composite.
- **Action bar / bulk actions:** When **`renderActionBar`** is used (CardView), toolbar keyboard is **`horizontal`** **`FocusgroupNavigationController`** on the **action bar** host—separate from **grid** **2D** navigation.

---

## Testing

### Automated tests

| Kind of test | What to check |
| --- | --- |
| **Unit** | **`FocusgroupNavigationController`** wired with **`direction: 'grid'`**; **`getItems`** returns cell focus targets; **`refresh()`** on item list / virtualizer range change; **`skipDisabled`**; prescribed **`role="grid"`**; required **label**. |
| **aXe + Storybook** | Labeled grid; **arrow** movement; **Home** / **End** / **Ctrl+Home**; **selection** + **`aria-selected`**; **virtualized** list (100+ items) with stable **rowindex**; **loading** / **empty** fixtures without **assertive** live spam. |
| **Playwright ARIA snapshots** | **grid** + **name**; **row** / **gridcell** roles; **multiselectable**; **selected** states. |
| **Playwright keyboard** | **Tab** enters grid on active cell; **arrows** move in 2D; **Space** selection; focus remains coherent after scroll (virtualization). |
| **Manual screen reader** | Long virtualized collection: position announced via **rowindex**; **loading more** does not interrupt with **assertive** announcements ([Screen reader testing](../../../../2nd-gen/packages/swc/.storybook/guides/accessibility-guides/screen_reader_testing.mdx)). |

---

## Summary checklist

- [ ] **`swc-grid`** prescribes **`role="grid"`**; required **accessible name** on the grid.
- [ ] **`FocusgroupNavigationController`** (**`direction: 'grid'`**) replaces 1st-gen **`RovingTabindexController`**.
- [ ] **Arrow**, **Home** / **End**, **Ctrl+Home** / **Ctrl+End**, and **Page Up** / **Down** (when scrollable) match [Data Grid Examples](https://www.w3.org/WAI/ARIA/apg/patterns/grid/examples/data-grids/).
- [ ] **Virtualization:** **`aria-rowcount`** / **`aria-colcount`** and per-item **indices**; **`refresh()`** on range changes; focus policy documented and tested.
- [ ] **Items** expose **names** and **`aria-selected`**; **`skipDisabled`** for disabled keys.
- [ ] **CardView** doc links here; **loading** / **empty** / **action bar** do not use **`assertive`** live on the grid host.
- [ ] **1st-gen Jira** table populated when tickets are triaged.
- [ ] Cross-links to [Grid migration roadmap](./rendering-and-styling-migration-analysis.md) and [Focus management](../../../01_contributor-guides/14_focus-management.md).

---

## References

- [WAI-ARIA APG: Grid pattern](https://www.w3.org/WAI/ARIA/apg/patterns/grid/)
- [WAI-ARIA APG: Data Grid Examples](https://www.w3.org/WAI/ARIA/apg/patterns/grid/examples/data-grids/)
- [WAI-ARIA APG: Layout Grid Examples](https://www.w3.org/WAI/ARIA/apg/patterns/grid/examples/layout-grids/)
- [WAI-ARIA APG: Keyboard — roving tabindex](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#kbd_roving_tabindex)
- [WAI-ARIA APG: Read me first](https://www.w3.org/WAI/ARIA/apg/practices/read-me-first/)
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- [React Spectrum: CardView](https://react-spectrum.adobe.com/CardView)
- [Grid migration roadmap](./rendering-and-styling-migration-analysis.md)
- [Focus management (contributor guide)](../../../01_contributor-guides/14_focus-management.md)
- [1st-gen `sp-grid` README](../../../../1st-gen/tools/grid/README.md)
- [`Grid.ts` (1st-gen)](../../../../1st-gen/tools/grid/src/Grid.ts)
- [`GridController.ts` (1st-gen)](../../../../1st-gen/tools/grid/src/GridController.ts)
- [Keyboard testing (2nd-gen Storybook accessibility guide)](../../../../2nd-gen/packages/swc/.storybook/guides/accessibility-guides/keyboard_testing.mdx)
- [Screen reader testing (2nd-gen Storybook accessibility guide)](../../../../2nd-gen/packages/swc/.storybook/guides/accessibility-guides/screen_reader_testing.mdx)

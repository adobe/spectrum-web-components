<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../../README.md) / [Project planning](../../README.md) / [Components](../README.md) / Menu / Menu migration roadmap

<!-- Document title (editable) -->

# Menu migration roadmap

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [Overview](#overview)
    - [Also read](#also-read)
- [References](#references)

</details>

<!-- Document content (editable) -->

## Overview

**`<swc-menu>`** in 2nd-gen is a **full** [menu button](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/) **host**—**trigger**, **`swc-popover`** for **placement**, a **shadow-internal** **`role="menu"`** **surface** (**not** the **`<swc-menu>`** **host**), and **slots** for **groups**, **items**, and **separators**; **cascading** **submenus** are **on** **`swc-menu-item`’s** **`submenu` slot** (item-owned **popover** + child **`role="menu"`**), not **nested** **`swc-menu`** / **`swc-action-menu`** in the list—**structurally** **parallel** to **`swc-action-menu`**, and aligned with [React Spectrum **`Menu`**](https://react-spectrum.adobe.com/Menu). **1st-gen** **`sp-menu`** was most often a **list** or **listbox** **surface** composed **under** **external** **triggers** and **overlays**; **1st-gen** **`sp-action-menu`** **did** **bundle** **trigger** + **list**. **2nd-gen** **`swc-menu`** and **`swc-action-menu`** **each** **ship** that **full** **composition** (see [What `swc-menu` is (2nd-gen)](./accessibility-migration-analysis.md#what-swc-menu-is-2nd-gen) in the **[Menu accessibility migration analysis](./accessibility-migration-analysis.md)**). **Anchor** **placement** uses **`swc-popover`** and the [shared **popover** roadmap](../popover/rendering-and-styling-migration-analysis.md), not **only** the **legacy** **overlay** **path** around **`sp-menu`**. **Mobile** **tray** and **selectable** **item** **rows** are **out** of **scope**; see [Menu a11y — scope](./accessibility-migration-analysis.md#migration-scope-current).

Planned work is **tracked under the menu migration epic** [SWC-1980](https://jira.corp.adobe.com/browse/SWC-1980) (Adobe internal Jira) with child stories (analyze, 2nd-gen file structure, API, a11y, S2 visual fidelity, style, tests, Storybook, consumer guide, finalize). Docs under [docs(Menu): Create migration documentation](https://jira.corp.adobe.com/browse/SWC-1223) and accessibility recommendations [SWC-1981](https://jira.corp.adobe.com/browse/SWC-1981) overlap; prefer this roadmap plus [Menu accessibility migration analysis](./accessibility-migration-analysis.md) for a11y expectations.

### Also read

- [Menu accessibility migration analysis](./accessibility-migration-analysis.md) — APG `menu` / `menuitem` expectations, **controller** split (roles + open/close focus vs. in-menu navigation), link items, and Jira.
- [Action menu migration roadmap](../action-menu/rendering-and-styling-migration-analysis.md) — **`swc-action-menu`** (ActionMenu: **full** **host** **parallel** to **`swc-menu`**; default **ellipses** / “**more**” **trigger** **chrome**).
- [Popover migration roadmap](../popover/rendering-and-styling-migration-analysis.md) — `swc-popover` and shared **styles**; menu **positions** in that layer.

## References

- [React Spectrum `Menu`](https://react-spectrum.adobe.com/Menu) — product alignment for **`swc-menu`**; 2nd-gen maps **`swc-menu`** to a **full** **host**, **not** a **detached** **list** **only** **primitive**.
- 1st-gen: [`sp-menu`](../../../../1st-gen/packages/menu/README.md) — list or listbox container used inside overlay, **`sp-popover`**, picker, or **`<sp-action-menu>`**, with **varying** wiring per host; 2nd-gen **`swc-menu`** and **`swc-action-menu`** each ship a cohesive [menu-button](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/) on the import (see the a11y doc).

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

**`<swc-menu>`** in 2nd-gen is the **list surface** and semantics for a **WAI-ARIA menu**—always composed with a **triggering parent** ([`swc-action-menu`](../action-menu/rendering-and-styling-migration-analysis.md) or a **submenu** inside another `swc-menu` / `swc-menu-item` tree), not a standalone custom element in product. **Positioning** no longer goes through the 1st-gen **overlay** system: **anchor** placement and stacking use **`swc-popover`** with the shared [popover](../popover/rendering-and-styling-migration-analysis.md) stack. **Mobile tray** and **menu item selection** (**checkbox**/ **radio** rows, modes, **`aria-checked`**) are **out of scope** **pending design and accessibility clarification** (**see [Menu accessibility migration analysis](./accessibility-migration-analysis.md#migration-scope-current)**).

Planned work is **tracked under the menu migration epic** [SWC-1980](https://jira.corp.adobe.com/browse/SWC-1980) (Adobe internal Jira) with child stories (analyze, 2nd-gen file structure, API, a11y, S2 visual fidelity, style, tests, Storybook, consumer guide, finalize). Docs under [docs(Menu): Create migration documentation](https://jira.corp.adobe.com/browse/SWC-1223) and accessibility recommendations [SWC-1981](https://jira.corp.adobe.com/browse/SWC-1981) overlap; prefer this roadmap plus [Menu accessibility migration analysis](./accessibility-migration-analysis.md) for a11y expectations.

### Also read

- [Menu accessibility migration analysis](./accessibility-migration-analysis.md) — APG `menu` / `menuitem` expectations, **controller** split (roles + open/close focus vs. in-menu navigation), link items, and Jira.
- [Action menu migration roadmap](../action-menu/rendering-and-styling-migration-analysis.md) — the **menu button** + **menu** product shape (ellipsis trigger and trigger chrome live there).
- [Popover migration roadmap](../popover/rendering-and-styling-migration-analysis.md) — `swc-popover` and shared **styles**; menu **positions** in that layer.

## References

- [React Spectrum `Menu`](https://react-spectrum.adobe.com/Menu) — product alignment: **Menu** + **MenuTrigger**; **Menu** is the popup list, not a top-level app shell by itself.
- 1st-gen: [`sp-menu`](../../../../1st-gen/packages/menu/README.md) and related pickers (historical; many call sites set `role` and keyboard via the **1st-gen overlay** system and controller mix-ins).

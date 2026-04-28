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

**`<swc-menu>`** in 2nd-gen is **`role="menu"`** popup list semantics paired with **`swc-action-menu`** (or submenu parents), delivering one cohesive **[menu button pattern](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/)**—aligning **much more** with **`sp-action-menu`** (**trigger + list** using **`sp-menu`**) and **[React **`Menu`**](https://react-spectrum.adobe.com/react-spectrum/Menu.html) + [`MenuTrigger`](https://react-spectrum.adobe.com/react-spectrum/MenuTrigger.html)** than with **`sp-menu`** used **alone**. **1st-gen `sp-menu`** was **standalone list/listbox container chrome** (**often **`role="listbox"`** in Spectrum pickers**) that callers still composed with **overlay**, **`sp-popover`**, and **trigger** parents—unlike **`swc-action-menu`** paired with **`swc-menu`** ([sp-menu versus 2nd-gen](./accessibility-migration-analysis.md#what-swc-menu-is-2nd-gen) in **[Menu accessibility migration analysis](./accessibility-migration-analysis.md)**). **Anchor** placement uses **`swc-popover`** with the shared [popover](../popover/rendering-and-styling-migration-analysis.md) stack rather than routing **`sp-menu`** through **only** the legacy **overlay** stack. **Mobile tray** and **menu item selection** (**checkbox** / **radio** rows, modes, **`aria-checked`**) remain **out of scope** pending clarification (**see [Menu accessibility migration analysis](./accessibility-migration-analysis.md#migration-scope-current)**).

Planned work is **tracked under the menu migration epic** [SWC-1980](https://jira.corp.adobe.com/browse/SWC-1980) (Adobe internal Jira) with child stories (analyze, 2nd-gen file structure, API, a11y, S2 visual fidelity, style, tests, Storybook, consumer guide, finalize). Docs under [docs(Menu): Create migration documentation](https://jira.corp.adobe.com/browse/SWC-1223) and accessibility recommendations [SWC-1981](https://jira.corp.adobe.com/browse/SWC-1981) overlap; prefer this roadmap plus [Menu accessibility migration analysis](./accessibility-migration-analysis.md) for a11y expectations.

### Also read

- [Menu accessibility migration analysis](./accessibility-migration-analysis.md) — APG `menu` / `menuitem` expectations, **controller** split (roles + open/close focus vs. in-menu navigation), link items, and Jira.
- [Action menu migration roadmap](../action-menu/rendering-and-styling-migration-analysis.md) — the **menu button** + **menu** product shape (ellipsis trigger and trigger chrome live there).
- [Popover migration roadmap](../popover/rendering-and-styling-migration-analysis.md) — `swc-popover` and shared **styles**; menu **positions** in that layer.

## References

- [React Spectrum `Menu`](https://react-spectrum.adobe.com/Menu) — product alignment: **Menu** + **MenuTrigger**; **Menu** is the popup list, not a top-level app shell by itself.
- 1st-gen: [`sp-menu`](../../../../1st-gen/packages/menu/README.md) — **popup list container** surfaced **inside** overlay / **`sp-popover`** / picker (**often **`role="listbox"`**; authored **`role="menu"`** when needed**); unlike 2nd-gen, it does **not** ship one cohesive **`swc-action-menu`** **+** **`swc-menu`** [menu-button](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/) pairing (**overlay** history and controllers vary by host).

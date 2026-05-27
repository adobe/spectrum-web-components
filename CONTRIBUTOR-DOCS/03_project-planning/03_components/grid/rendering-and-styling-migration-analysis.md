<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../../README.md) / [Project planning](../../README.md) / [Components](../README.md) / Grid / Grid migration roadmap

<!-- Document title (editable) -->

# Grid migration roadmap

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [Overview](#overview)
- [Planned scope (snapshot)](#planned-scope-snapshot)
- [Also read](#also-read)

</details>

<!-- Document content (editable) -->

## Overview

This doc will capture **rendering**, **layout**, **virtualization**, and **styling** for **`swc-grid`** (2nd-gen successor to 1st-gen **`sp-grid`** in [`1st-gen/tools/grid`](../../../../1st-gen/tools/grid/)). **`swc-grid`** is a **tooling / layout** host built on **`lit-virtualizer`**, not a Spectrum-visual “component” in the same sense as **`swc-button`**.

**Primary consumer:** planned **`swc-card-view`** (aligned with [React Spectrum CardView](https://react-spectrum.adobe.com/CardView))—a virtualized collection of cards with selection, async loading, and bulk actions.

**Accessibility:** [Grid accessibility migration analysis](./accessibility-migration-analysis.md) (**`role="grid"`**, **`FocusgroupNavigationController`** with **`direction: 'grid'`**, virtualization + focus, selection).

**Design source:** No Spectrum 2 Figma file for **`swc-grid`** at planning time; layout metrics will come from **CardView** / card child specs when available.

## Planned scope (snapshot)

| Area | Direction |
| --- | --- |
| **Layout** | Configurable **gap**, **padding**, **item size**, and layout modes (for example fixed **grid** vs **waterfall** for CardView). |
| **Virtualization** | **`lit-virtualizer`** (or successor) so only visible items (+ buffer) mount in the DOM. |
| **Keyboard** | **`FocusgroupNavigationController`** on the host—**not** 1st-gen **`RovingTabindexController`** ([Focus management](../../../01_contributor-guides/14_focus-management.md)). |
| **1st-gen API** | **`items`**, **`renderItem`**, **`selected`**, **`focusableSelector`**, **`itemSize`**, **`gap`**—reshape for 2nd-gen collections and **`swc-card`** slotted content. |

## Also read

- [Grid accessibility migration analysis](./accessibility-migration-analysis.md)
- [Focus management (contributor guide)](../../../01_contributor-guides/14_focus-management.md)
- [Tools vs packages](../../../01_contributor-guides/12_tools-vs-packages.md)

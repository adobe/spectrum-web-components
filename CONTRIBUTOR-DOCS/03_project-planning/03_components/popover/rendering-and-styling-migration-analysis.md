<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../../README.md) / [Project planning](../../README.md) / [Components](../README.md) / Popover / Popover migration roadmap

<!-- Document title (editable) -->

# Popover migration roadmap

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [Overview](#overview)
    - [Planned consumers (2nd-gen)](#planned-consumers-2nd-gen)
    - [Consumer migration and deprecation](#consumer-migration-and-deprecation)
- [References](#references)

</details>

<!-- Document content (editable) -->

## Overview

In 1st-gen, **`<sp-popover>`** supplies **Spectrum** look (stroke, shadow, optional tip) and attributes such as `placement` for the tip, but overlay behavior (open/close, stacking, focus) is composed with the [1st-gen overlay system](../../../../1st-gen/packages/overlay/README.md) and app code. Call sites often position the host with inline `style` or an overlay layer. That split is visual surface vs. orchestration.

2nd-gen is planned to separate concerns clearly:

- **Shared popover** styles (tokens, tip, size) for any container that should look like a popover, **including** **modal** **dialog** **surfaces** (same **chrome**). **Modal** **dialogs** **use** those **shared** **styles** when the design needs them; they **do** **not** use the **`<swc-popover>`** **component**. Modals are layered and centered (or full-viewport), not **anchor**-positioned to a **trigger** like **menus** or **tooltips**.
- A **repurposed** **`<swc-popover>`** (or equivalent name) that applies those styles and anchored placement (for example, [CSS anchor positioning](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_anchor_positioning) and/or [Floating UI](https://floating-ui.com/)), similar to [React Spectrum `Popover`](https://react-spectrum.adobe.com/Popover), for **anchored** UIs: action menu **dropdowns**, combobox **listbox** popups, **tooltips**, and similar—not for **viewport-centered** or **full-screen** modals and dialogs. The host is a **container** for those surfaces, not a replacement for listbox, menu, or tooltip as full components; ARIA, focus, and keyboard are implemented by the consumers (action menu, combobox, tooltip, and similar) that use `swc-popover`.

### Planned consumers (2nd-gen)

The new **`swc-popover` host** is the common **anchored** surface for **dropdown menus** in **action menu**, for **listbox** popups in **combobox**, and for **tooltip** UI. **Modals and dialogs** are **out of scope** for that **host**; they do not use **anchor**-relative positioning. They may still use **shared** **popover** **styles** on the **dialog** **surface** (see **Overview** **above**). **Tooltips** are intended to move off 1st-gen [Overlay](../../../../1st-gen/packages/overlay/README.md) orchestration toward this **popover**-based **positioning**; see [Tooltip migration roadmap](../tooltip/rendering-and-styling-migration-analysis.md). ARIA, focus, and keyboard stay the responsibility of action menu, combobox, tooltip, and (separately) modal or dialog. This roadmap and the [a11y analysis](./accessibility-migration-analysis.md) cover the shared **chrome** and **geometry** for `swc-popover` and **styles** only.

[Popover accessibility migration analysis](./accessibility-migration-analysis.md) describes accessibility expectations for the 2nd-gen positioning host and the style layer.

### Consumer migration and deprecation

Consumers of 1st-gen **`<sp-popover>`** will need deprecation notices and a [consumer migration guide](https://jira.corp.adobe.com/browse/SWC-2003) for:

- using package-level popover **styles** on arbitrary markup, including **modal** and **dialog** surfaces that do not use the `swc-popover` host, and
- when to adopt `swc-popover` for **anchored** overlays (action menu, combobox, tooltip) instead of hand-rolled `sp-popover` plus overlay wiring.

Program work is tracked in Jira (for example [SWC-1993](https://jira.corp.adobe.com/browse/SWC-1993), [SWC-2001](https://jira.corp.adobe.com/browse/SWC-2001), [SWC-1999](https://jira.corp.adobe.com/browse/SWC-1999)); this roadmap does not duplicate the full work breakdown.

## References

- [1st-gen: `sp-popover` **README**](../../../../1st-gen/packages/popover/README.md) — relationship to the **Overlay** system.
- [React Spectrum: **Popover**](https://react-spectrum.adobe.com/Popover) — product alignment for a **positioning** + **styles** **split** without ARIA on the **popover** **chrome** alone.

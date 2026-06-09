<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../../README.md) / [Project planning](../../README.md) / [Components](../README.md) / Opacity Checkerboard / Opacity Checkerboard accessibility migration analysis

<!-- Document title (editable) -->

# Opacity Checkerboard accessibility migration analysis

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [Overview](#overview)
    - [Also read](#also-read)
    - [What the opacity checkerboard is](#what-the-opacity-checkerboard-is)
    - [What it is not](#what-it-is-not)
- [ARIA and WCAG context](#aria-and-wcag-context)
    - [Pattern in the APG](#pattern-in-the-apg)
    - [Guidelines that apply](#guidelines-that-apply)
- [Related 1st-gen accessibility (Jira)](#related-1st-gen-accessibility-jira)
- [Recommendations: `.swc-OpacityCheckerboard`](#recommendations-swc-opacitycheckerboard)
    - [ARIA roles, states, and properties](#aria-roles-states-and-properties)
    - [Shadow DOM and cross-root ARIA Issues](#shadow-dom-and-cross-root-aria-issues)
    - [Accessibility tree expectations](#accessibility-tree-expectations)
    - [Keyboard and focus](#keyboard-and-focus)
- [Testing](#testing)
    - [Automated tests](#automated-tests)
    - [Manual screen reader testing](#manual-screen-reader-testing)
- [Summary checklist](#summary-checklist)
- [References](#references)

</details>

<!-- Document content (editable) -->

## Overview

This doc explains how the **`.swc-OpacityCheckerboard`** utility should behave for **accessibility**. It supports **WCAG 2.2 Level AA**. The utility is not a custom element: it is an importable lit `css` fragment at `stylesheets/shared/opacity-checkerboard.css`. Consuming components import it directly (`import opacityCheckerboardStyles from '../../stylesheets/shared/opacity-checkerboard.css'`; `vite-plugin-lit-css` yields a `CSSResult`), add it to their `styles` array, and apply the class to a **decorative** element inside their own shadow root.

### Also read

[Opacity Checkerboard migration roadmap](./rendering-and-styling-migration-analysis.md) for visuals, DOM, and the CSS-to-utility mapping.

### What the opacity checkerboard is

- A **decorative background pattern** (a checkerboard) painted behind transparent or semi-transparent content so users can see where transparency exists. It is purely visual.
- It is consumed by components such as **color-handle**, **color-loupe**, **color-slider**, **swatch**, and **thumbnail**, each applying the class to an element inside its own shadow root.

### What it is not

- **Not** a custom element, **not** a host with a role, and **not** a focus target. It carries no semantics of its own.
- **Not** a status, progress, or live-region surface. It conveys no state and must not announce anything.

---

## ARIA and WCAG context

### Pattern in the APG

- There is **no** APG pattern for a decorative background. The utility has no widget role and no interaction model.

### Guidelines that apply

| Idea | Plain meaning |
|------|----------------|
| [Info and relationships (WCAG 1.3.1)](https://www.w3.org/TR/WCAG22/#info-and-relationships) | The checkerboard is **decorative**. The transparency it illustrates must not be communicated by the pattern **alone** to assistive tech; the consuming component supplies any needed name or value (e.g. a swatch's color/label). |
| [Non-text contrast (WCAG 1.4.11)](https://www.w3.org/TR/WCAG22/#non-text-contrast) | The pattern is **not** a UI control or meaningful graphic, so 1.4.11 does not gate it. Its squares still need to read as a pattern so the **consuming** control's transparency stays legible against its background. |
| [Use of color (WCAG 1.4.1)](https://www.w3.org/TR/WCAG22/#use-of-color) | Transparency is shown by **pattern**, not color alone, which is the accessible intent of the checkerboard. Consuming components must not rely on the checkerboard as the only cue for a stateful meaning. |
| [`forced-colors` / high-contrast](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/forced-colors) | The fragment sets **`forced-color-adjust: none`** so the checkerboard stays visible in forced-colors mode; without it the pattern would be flattened and transparency would no longer read. |

**Bottom line:** Keep the checkerboard **decorative and silent**. Accessibility is owned by the **consuming** component, which must hide the decorative element from assistive tech and provide the real name/value.

---

## Related 1st-gen accessibility (Jira)

| Jira | Type | Status (snapshot) | Resolution (snapshot) | Summary |
|------|------|-------------------|-------------------------|---------|

---

## Recommendations: `.swc-OpacityCheckerboard`

### ARIA roles, states, and properties

| Topic | What to do |
|-------|------------|
| **No host role** | The utility is a **CSS class on a decorative element**, not a custom element. Do **not** add a `role` to the checkerboard element; it must contribute **no** semantics. |
| **`aria-hidden`** | The **consuming** component is responsible for marking the decorative element `aria-hidden="true"` (or otherwise keeping it out of the accessibility tree) so the pattern is never announced. Documented in the `opacity-checkerboard.css` fragment comment. |
| **Name / value** | The utility exposes **no** name or value. Any accessible name, color value, or state belongs to the **consuming** control (swatch, color-slider, etc.), not the checkerboard element. |
| **States** | **None.** The `--sizeS` modifier is a visual size only; it carries no semantic state and must not map to ARIA. |
| **Docs** | Tell consumers: apply the class to a **purely decorative** element, hide it from AT, and keep the real semantics on the surrounding control. |

### Shadow DOM and cross-root ARIA Issues

None. The utility relies on **no** ID references and is **not** a form-associated control. It is a style fragment applied inside each consumer's shadow root; it sets no `aria-*` and creates no cross-root relationships.

### Accessibility tree expectations

- The decorative element using `.swc-OpacityCheckerboard` should be **absent** from the accessibility tree (hidden by the consuming component via `aria-hidden="true"` or equivalent).
- The utility contributes **no** role, **no** name, and **no** state. Assistive tech should perceive only the **consuming** control (e.g. the swatch with its color/label), never the checkerboard itself.

### Keyboard and focus

**Not focusable.** Keyboard navigation should skip this element and move to the next focusable element.

---

## Testing

### Automated tests

| Kind of test | What to check |
|--------------|----------------|
| **Unit** | No unit tests target the utility directly (no custom element). Consuming components test that their decorative checkerboard element is **hidden** (`aria-hidden="true"`) and carries **no** role. |
| **aXe + Storybook** | **WCAG 2.x** rules run on consuming-component stories. The checkerboard must not introduce stray roles or unnamed elements in the tree. |
| **Forced colors** | Verify the pattern stays visible under `forced-colors: active` (the fragment's `forced-color-adjust: none`); confirm consuming controls remain legible. |
| **Visual regression** | VRT on consuming components covers the rendered pattern, including the `--sizeS` modifier and forced-colors rendering. |

### Manual screen reader testing

The checkerboard is **not focusable** and must be **hidden** from assistive tech, so there is nothing to encounter directly. Manual verification belongs to the **consuming** component: using a screen reader in **browse mode** (document/scan mode), confirm that reading order surfaces only the consuming control's name/role/value and **never** announces the decorative checkerboard. See [Screen reader testing](../../../../2nd-gen/packages/swc/.storybook/guides/accessibility-guides/screen_reader_testing.mdx) for the **Browse mode (document/scan mode)** section.

---

## Summary checklist

- [ ] Utility adds **no** `role` and **no** `aria-*` to any element.
- [ ] Consuming components mark the decorative checkerboard element **`aria-hidden="true"`** (or otherwise hide it from AT).
- [ ] The checkerboard contributes **nothing** to the accessibility tree; only the consuming control is announced.
- [ ] `--sizeS` is treated as **visual only**, never mapped to ARIA state.
- [ ] Pattern stays visible under **`forced-colors: active`** (`forced-color-adjust: none`).
- [ ] Transparency is conveyed by **pattern**, with the consuming control supplying any name/value (WCAG 1.4.1, 1.3.1).
- [ ] Manual SR testing of consuming components uses **browse mode** per the Storybook screen reader guide.
- [ ] The `opacity-checkerboard.css` fragment comment states the consumer owns `aria-hidden`.

---

## References

- [WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- [Using ARIA (read this first)](https://www.w3.org/WAI/ARIA/apg/practices/read-me-first/)
- [WCAG 1.3.1: Info and relationships](https://www.w3.org/TR/WCAG22/#info-and-relationships)
- [WCAG 1.4.1: Use of color](https://www.w3.org/TR/WCAG22/#use-of-color)
- [WCAG 1.4.11: Non-text contrast](https://www.w3.org/TR/WCAG22/#non-text-contrast)
- [MDN: forced-colors media feature](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/forced-colors)
- [Opacity Checkerboard migration roadmap](./rendering-and-styling-migration-analysis.md)
- [Screen reader testing](../../../../2nd-gen/packages/swc/.storybook/guides/accessibility-guides/screen_reader_testing.mdx)

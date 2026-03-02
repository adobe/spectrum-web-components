<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../README.md) / [Style guide](../README.md) / [2nd-Gen CSS](README.md) / Property order quick reference

<!-- Document title (editable) -->

# Property order quick reference

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [Why property order matters](#why-property-order-matters)
- [Property order checklist](#property-order-checklist)
- [Example from Badge](#example-from-badge)
- [Example from Status Light](#example-from-status-light)

</details>

<!-- Document content (editable) -->

Use this guide when writing or reviewing component CSS. Consistent property order makes stylesheets easier to scan and reduces merge conflicts. This order is enforced via `stylelint-order` and the property groups defined in [`linters/stylelint-property-order.js`](../../../linters/stylelint-property-order.js). The table below is a condensed summary — see that file for the full list.

For full context, see [Component CSS](01_component-css.md#rule-order).

## Why property order matters

- **Consistency**: Everyone can find properties quickly
- **Readability**: Related properties stay together
- **Maintainability**: Changes are easier to spot in code review

## Property order checklist

Use this order inside each ruleset:

| #  | Category                   | Common properties                                                                                                                                        |
| -- | -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1  | **Display**                | `box-sizing`, `display`, `visibility`                                                                                                                    |
| 2  | **Position**               | `position`, `inset`, `top`, `right`, `bottom`, `left`, `z-index`                                                                                         |
| 3  | **Flex/Grid**              | `flex`, `flex-grow`, `flex-shrink`, `flex-basis`, `flex-direction`, `flex-wrap`, `grid`, `grid-template-*`, `grid-auto-*`                                |
| 4  | **Alignment**              | `gap`, `place-content`, `place-items`, `place-self`, `align-items`, `align-self`, `justify-content`, `justify-items`, `order`                            |
| 5  | **Dimensions**             | `inline-size`, `block-size`, `width`, `height`, `min-*`, `max-*`, `aspect-ratio`                                                                         |
| 6  | **Spacing**                | `padding`, `padding-*`, `margin`, `margin-*`                                                                                                             |
| 7  | **Typography**             | `font`, `font-family`, `font-size`, `font-style`, `font-weight`, `line-height`, `color`, `text-align`, `text-transform`, `letter-spacing`, `white-space` |
| 8  | **Decoration**             | `background`, `background-*`, `border`, `border-*`, `border-radius`, `box-shadow`                                                                        |
| 9  | **Overflow**               | `overflow`, `text-overflow`                                                                                                                              |
| 10 | **User interface**         | `appearance`, `pointer-events`, `cursor`, `user-select`, `outline`, `outline-*`                                                                          |
| 11 | **Color adjustment**       | `color-scheme`, `forced-color-adjust`                                                                                                                    |
| 12 | **Generated content**      | `content`, `quotes`                                                                                                                                      |
| 13 | **SVG**                    | `fill`, `stroke`, `stroke-width`, `stroke-dasharray`, `stroke-dashoffset`                                                                                |
| 14 | **Effects**                | `opacity`, `filter`, `backdrop-filter`                                                                                                                   |
| 15 | **Transforms**             | `transform`, `transform-origin`                                                                                                                          |
| 16 | **Transitions/Animations** | `transition`, `animation`, `will-change`                                                                                                                 |

## Example from Badge

From [badge.css](../../../2nd-gen/packages/swc/components/badge/badge.css):

```css
.swc-Badge {
  /* Custom properties first (definitions) */
  --_swc-badge-border-width: token("border-width-200");
  --_swc-badge-border-width-deduction: calc(var(--_swc-badge-border-width) * 2);
  --_swc-badge-padding-block-start: token("component-top-to-text-100");
  --_swc-badge-padding-block-end: token("component-bottom-to-text-100");

  /* Display */
  display: inline-flex;
  /* Alignment */
  gap: var(--swc-badge-gap, token("text-to-visual-100"));
  align-items: center;
  /* Dimensions */
  min-block-size: var(--swc-badge-height, token("component-height-100"));
  /* Spacing */
  padding-block-start: calc(var(--swc-badge-padding-block-start, var(--_swc-badge-padding-block-start)) - var(--_swc-badge-border-width-deduction));
  padding-block-end: calc(var(--swc-badge-padding-block-end, var(--_swc-badge-padding-block-end)) - var(--_swc-badge-border-width-deduction));
  padding-inline: calc(var(--swc-badge-padding-inline, token("component-edge-to-text-100")) - var(--_swc-badge-border-width-deduction));
  /* Typography */
  color: var(--swc-badge-label-icon-color, token("white"));
  /* Decoration */
  background: var(--swc-badge-background-color, token("accent-background-color-default"));
  border: var(--_swc-badge-border-width) solid var(--swc-badge-border-color, transparent);
  border-radius: var(--swc-badge-corner-radius, token("corner-radius-medium-size-medium"));
  /* User interface */
  cursor: default;
}
```


## Example from Status Light

From [status-light.css](../../../2nd-gen/packages/swc/components/status-light/status-light.css):

```css
.swc-StatusLight::before {
  /* Display */
  box-sizing: border-box;
  display: inline-block;
  /* Flex/Grid */
  flex-grow: 0;
  flex-shrink: 0;
  /* Dimensions */
  inline-size: var(--_swc-statuslight-dot-size);
  block-size: var(--_swc-statuslight-dot-size);
  /* Spacing */
  margin-block-start: calc(var(--_swc-statuslight-top-to-dot) - var(--_swc-statuslight-top-to-text));
  /* Decoration */
  background-color: var(--swc-statuslight-dot-color);
  border-radius: token("corner-radius-full");
  /* Generated content */
  content: "";
}
```

---

**Reference implementations**: [Badge](../../../2nd-gen/packages/swc/components/badge/badge.css) · [Status Light](../../../2nd-gen/packages/swc/components/status-light/status-light.css)

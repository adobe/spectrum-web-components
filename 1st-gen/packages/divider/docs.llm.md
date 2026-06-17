---
component: divider
tag: sp-divider
package: '@spectrum-web-components/divider'
source: 1st-gen/packages/divider/README.md
generated: 2026-06-17T11:01:22.157Z
generator: scripts/generate-llm-docs.mjs
---

## Overview

`sp-divider` brings clarity to a layout by grouping and dividing content that exists in close proximity. It can also be used to establish rhythm and hierarchy.

[View the design documentation for this component.](https://spectrum.adobe.com/page/divider/)

### Usage

```zsh
yarn add @spectrum-web-components/divider
```

Import the side effectful registration of `<sp-divider>` via:

```js
import '@spectrum-web-components/divider/sp-divider.js';
```

When looking to leverage the `Divider` base class as a type and/or for extension purposes, do so via:

```js
import { Divider } from '@spectrum-web-components/divider';
```

### Options

Horizontal dividers are used to separate content stacked vertically.

```html
<h2 class="spectrum-Heading spectrum-Heading--sizeXS">Small</h2>
<sp-divider size="s"></sp-divider>
<p class="spectrum-Body">
  The small divider is used to divide similar components such as table rows,
  action button groups, and components within a panel.
</p>
html
<h2 class="spectrum-Heading spectrum-Heading--sizeS">Medium</h2>
<sp-divider size="m"></sp-divider>
<p class="spectrum-Body">
  The medium divider is used to divide subsections on a page, or to separate
  different groups of components such as panels, rails, etc.
</p>
html
<h2 class="spectrum-Heading spectrum-Heading--sizeM">Large</h2>
<sp-divider size="l"></sp-divider>
<p class="spectrum-Body">
  The large divider should be used only for page titles or section titles.
</p>
```

#### Vertical

Vertical dividers are used to separate content horizontally.

When a vertical divider is used inside of a flex container, use `align-self: stretch; height: auto;` on the divider.

```html
<div style="height: 32px; display: flex;">
  <sp-action-button quiet label="Zoom in">
    <sp-icon-magnify slot="icon"></sp-icon-magnify>
  </sp-action-button>
  <sp-divider
    size="s"
    style="align-self: stretch; height: auto;"
    vertical
  ></sp-divider>
  <sp-action-button quiet label="Zoom in">
    <sp-icon-magnify slot="icon"></sp-icon-magnify>
  </sp-action-button>
</div>
html
<div style="height: 32px; display: flex;">
  <sp-action-button quiet label="Zoom in">
    <sp-icon-magnify slot="icon"></sp-icon-magnify>
  </sp-action-button>
  <sp-divider
    size="m"
    style="align-self: stretch; height: auto;"
    vertical
  ></sp-divider>
  <sp-action-button quiet label="Zoom in">
    <sp-icon-magnify slot="icon"></sp-icon-magnify>
  </sp-action-button>
</div>
html
<div style="height: 32px; display: flex;">
  <sp-action-button quiet label="Zoom in">
    <sp-icon-magnify slot="icon"></sp-icon-magnify>
  </sp-action-button>
  <sp-divider
    size="l"
    style="align-self: stretch; height: auto;"
    vertical
  ></sp-divider>
  <sp-action-button quiet label="Zoom in">
    <sp-icon-magnify slot="icon"></sp-icon-magnify>
  </sp-action-button>
</div>
```

#### Static color

Use the static color option when a divider needs to be placed on top of a color background or visual. Static color dividers are available in black or white regardless of color theme.

```html
<div
  style="background-color: var(--spectrum-docs-static-black-background-color); color: var(--spectrum-black); padding: 20px"
>
  <h2 class="spectrum-Heading spectrum-Heading--sizeS">
    Static black on light background
  </h2>
  <sp-divider static-color="black" size="m"></sp-divider>
  <p class="spectrum-Body">
    Use static black on light color or image backgrounds.
  </p>
</div>
html
<div
  style="background-color: var(--spectrum-docs-static-white-background-color); color: var(--spectrum-white); padding: 20px;"
>
  <h2 class="spectrum-Heading spectrum-Heading--sizeS">
    Static white on dark background
  </h2>
  <sp-divider static-color="white" size="m"></sp-divider>
  <p class="spectrum-Body">
    Use static white on dark color or image backgrounds.
  </p>
</div>
```

### Accessibility

The `<sp-divider>` element implements the following accessibility features:

- **ARIA role**: Automatically sets `role="separator"` to ensure proper semantic meaning for assistive technologies
- **Orientation support**: When `vertical` is true, automatically sets `aria-orientation="vertical"` to indicate the divider's orientation

#### Best practices

- Medium or large dividers can be used with header text to visually create a section or page title. Place the divider below the header for best results.
- Ensure sufficient color contrast when using `static-color` variants on colored backgrounds.
- Use dividers to create meaningful visual separation, not just decorative lines.
- Use dividers sparingly; excessive use can diminish their visual impact.

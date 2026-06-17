---
component: swatch
tag: sp-swatch
package: '@spectrum-web-components/swatch'
source: 1st-gen/packages/swatch/README.md
generator: scripts/generate-llm-docs.mjs
---

## Overview

An `<sp-swatch>` shows a small sample of a fill — such as a color, gradient, texture, or material — that is intended to be applied to an object.

### Usage

```bash
yarn add @spectrum-web-components/swatch
```

Import the side effectful registration of `<sp-swatch>` via:

```js
import '@spectrum-web-components/swatch/sp-swatch.js';
```

When looking to leverage the `Swatch` base class as a type and/or for extension purposes, do so via:

```js
import { Swatch } from '@spectrum-web-components/swatch';
```

### Options

#### Sizes

```html
<sp-swatch-group selects="multiple">
  <sp-swatch color="rgb(255 0 0 / 0.7)" size="xs"></sp-swatch>
  <sp-swatch rounding="none" color="rgb(255 0 0 / 0.7)" size="xs"></sp-swatch>
  <sp-swatch rounding="full" color="rgb(255 0 0 / 0.7)" size="xs"></sp-swatch>
  <sp-swatch border="light" color="rgb(255 0 0 / 0.7)" size="xs"></sp-swatch>
  <sp-swatch border="none" color="rgb(255 0 0 / 0.7)" size="xs"></sp-swatch>
  <sp-swatch nothing size="xs"></sp-swatch>
  <sp-swatch shape="rectangle" color="rgb(255 0 0 / 0.7)" size="xs"></sp-swatch>
  <sp-swatch
    shape="rectangle"
    disabled
    color="rgb(255 0 0 / 0.7)"
    size="xs"
  ></sp-swatch>
  <sp-swatch
    rounding="full"
    shape="rectangle"
    mixed-value
    size="xs"
  ></sp-swatch>
</sp-swatch-group>
html
<sp-swatch-group selects="multiple">
  <sp-swatch color="rgb(255 0 0 / 0.7)" size="s"></sp-swatch>
  <sp-swatch rounding="none" color="rgb(255 0 0 / 0.7)" size="s"></sp-swatch>
  <sp-swatch rounding="full" color="rgb(255 0 0 / 0.7)" size="s"></sp-swatch>
  <sp-swatch border="light" color="rgb(255 0 0 / 0.7)" size="s"></sp-swatch>
  <sp-swatch border="none" color="rgb(255 0 0 / 0.7)" size="s"></sp-swatch>
  <sp-swatch nothing size="s"></sp-swatch>
  <sp-swatch shape="rectangle" color="rgb(255 0 0 / 0.7)" size="s"></sp-swatch>
  <sp-swatch
    shape="rectangle"
    disabled
    color="rgb(255 0 0 / 0.7)"
    size="s"
  ></sp-swatch>
  <sp-swatch rounding="full" shape="rectangle" mixed-value size="s"></sp-swatch>
</sp-swatch-group>
html
<sp-swatch-group selects="multiple">
  <sp-swatch color="rgb(255 0 0 / 0.7)" size="m"></sp-swatch>
  <sp-swatch rounding="none" color="rgb(255 0 0 / 0.7)" size="m"></sp-swatch>
  <sp-swatch rounding="full" color="rgb(255 0 0 / 0.7)" size="m"></sp-swatch>
  <sp-swatch border="light" color="rgb(255 0 0 / 0.7)" size="m"></sp-swatch>
  <sp-swatch border="none" color="rgb(255 0 0 / 0.7)" size="m"></sp-swatch>
  <sp-swatch nothing size="m"></sp-swatch>
  <sp-swatch shape="rectangle" color="rgb(255 0 0 / 0.7)" size="m"></sp-swatch>
  <sp-swatch
    shape="rectangle"
    disabled
    color="rgb(255 0 0 / 0.7)"
    size="m"
  ></sp-swatch>
  <sp-swatch rounding="full" shape="rectangle" mixed-value size="m"></sp-swatch>
</sp-swatch-group>
html
<sp-swatch-group selects="multiple">
  <sp-swatch color="rgb(255 0 0 / 0.7)" size="l"></sp-swatch>
  <sp-swatch rounding="none" color="rgb(255 0 0 / 0.7)" size="l"></sp-swatch>
  <sp-swatch rounding="full" color="rgb(255 0 0 / 0.7)" size="l"></sp-swatch>
  <sp-swatch border="light" color="rgb(255 0 0 / 0.7)" size="l"></sp-swatch>
  <sp-swatch border="none" color="rgb(255 0 0 / 0.7)" size="l"></sp-swatch>
  <sp-swatch nothing size="l"></sp-swatch>
  <sp-swatch shape="rectangle" color="rgb(255 0 0 / 0.7)" size="l"></sp-swatch>
  <sp-swatch
    shape="rectangle"
    disabled
    color="rgb(255 0 0 / 0.7)"
    size="l"
  ></sp-swatch>
  <sp-swatch rounding="full" shape="rectangle" mixed-value size="l"></sp-swatch>
</sp-swatch-group>
```

#### Variants

An `<sp-swatch>` element can be modified by the following attributes/properties to customize its delivery as desired for your use case: `border`, `color`, `disabled`, `mixedValue` (accepted as the `mixed-value` attribute), `nothing`, `rounding`, and `shape`. Use these in concert with each other for a variety of final visual deliveries.

The `border` attribute/property is not required and when applied accepts the values of `none` or `light`.

```html
<sp-swatch-group selects="multiple">
  <sp-swatch color="rgb(255 0 0 / 0.7)"></sp-swatch>
  <sp-swatch color="rgb(255 0 0 / 0.7)" border="light"></sp-swatch>
  <sp-swatch color="rgb(255 0 0 / 0.7)" border="none"></sp-swatch>
</sp-swatch-group>
```

The `color` attribute/property determines the color value that the `<sp-swatch>` element will deliver.

```html
<sp-swatch-group selects="multiple">
  <sp-swatch color="rgb(255 0 0 / 0.7)"></sp-swatch>
  <sp-swatch color="orange"></sp-swatch>
  <sp-swatch color="var(--spectrum-magenta-500)"></sp-swatch>
</sp-swatch-group>
```

The `mixed-value` attribute and `mixedValue` property outline when an `<sp-swatch>` element represents more than one color.

```html
<sp-swatch-group selects="multiple">
  <sp-swatch mixed-value></sp-swatch>
  <sp-swatch mixed-value rounding="full"></sp-swatch>
  <sp-swatch mixed-value shape="rectangle"></sp-swatch>
</sp-swatch-group>
```

Please note that the `aria-checked="mixed"` value only applies when the swatch is in a group with `selects="multiple"`

The `nothing` attribute/property outlines that the `<sp-swatch>` represents no color or that it represents "transparent".

```html
<sp-swatch-group selects="multiple">
  <sp-swatch nothing></sp-swatch>
  <sp-swatch nothing rounding="full"></sp-swatch>
  <sp-swatch nothing shape="rectangle"></sp-swatch>
</sp-swatch-group>
```

The `rounding` attribute/property is not required and when applied accepts the values of `none` or `full`.

```html
<sp-swatch-group selects="multiple">
  <sp-swatch color="rgb(255 0 0 / 0.7)"></sp-swatch>
  <sp-swatch color="rgb(255 0 0 / 0.7)" rounding="none"></sp-swatch>
  <sp-swatch color="rgb(255 0 0 / 0.7)" rounding="full"></sp-swatch>
</sp-swatch-group>
```

The `shape` attribute/property is not required and when applied accepts the values of `rectangle`.

```html
<sp-swatch-group selects="multiple">
  <sp-swatch color="rgb(255 0 0 / 0.7)"></sp-swatch>
  <sp-swatch color="rgb(255 0 0 / 0.7)" shape="rectangle"></sp-swatch>
</sp-swatch-group>
```

### States

#### Disabled

The `disabled` attribute/property determines prevents interaction on the `<sp-swatch>` element.

```html
<sp-swatch-group selects="multiple">
  <sp-swatch disabled color="rgb(255 0 0 / 0.7)"></sp-swatch>
  <sp-swatch disabled color="orange"></sp-swatch>
  <sp-swatch disabled color="var(--spectrum-magenta-500)"></sp-swatch>
</sp-swatch-group>
```

### Accessibility

#### Use the selects property for proper ARIA semantics

When swatches are intended to be selectable, set the `selects` property on `<sp-swatch-group>` to enable proper ARIA semantics:

- `selects="single"`: Swatches have `role="radio"` and announce as radio buttons
- `selects="multiple"`: Swatches have `role="checkbox"` and announce as checkboxes with checked/unchecked states

Without the `selects` property, swatches default to `role="button"` and the swatch-group stops propagation of change events, so `selected` and `aria-pressed` states won't update when clicked. This prevents screen readers from announcing selection state changes.

```html
<!-- Correct: selects property enables proper selection semantics -->
<sp-swatch-group selects="multiple" aria-label="Select colors">
  <sp-swatch color="red" label="Red"></sp-swatch>
  <sp-swatch color="blue" label="Blue"></sp-swatch>
</sp-swatch-group>
```

#### Best practices

- Ensure swatches have sufficient color contrast for visibility.
- Verify that swatches are appropriately labeled for screen readers.
- Use the `selects` property when swatches represent a selection interface.

#### Keyboard navigation

- `Tab`: Move focus to the next focusable element
- `Arrow keys`: Navigate between swatches in the group and move the focus indicator
- `Enter` or `Space`: Select the focused swatch

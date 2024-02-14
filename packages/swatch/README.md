## Description

An `<sp-swatch>` shows a small sample of a fill — such as a color, gradient, texture, or material — that is intended to be applied to an object.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/swatch?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/swatch)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/swatch?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/swatch)

```
yarn add @spectrum-web-components/swatch
```

Import the side effectful registration of `<sp-swatch>` via:

```
import '@spectrum-web-components/swatch/sp-swatch.js';
```

When looking to leverage the `Swatch` base class as a type and/or for extension purposes, do so via:

```
import { Swatch } from '@spectrum-web-components/swatch';
```

## Sizes

<sp-tabs selected="m" auto label="Size Attribute Options">
<sp-tab value="xs">Extra Small</sp-tab>
<sp-tab-panel value="xs">

```html
<div style="display: flex;gap: 5px;">
    <sp-swatch color="rgb(255 0 0 / 0.7)" size="xs"></sp-swatch>
    <sp-swatch rounding="none" color="rgb(255 0 0 / 0.7)" size="xs"></sp-swatch>
    <sp-swatch rounding="full" color="rgb(255 0 0 / 0.7)" size="xs"></sp-swatch>
    <sp-swatch border="light" color="rgb(255 0 0 / 0.7)" size="xs"></sp-swatch>
    <sp-swatch border="none" color="rgb(255 0 0 / 0.7)" size="xs"></sp-swatch>
    <sp-swatch nothing size="xs"></sp-swatch>
    <sp-swatch
        shape="rectangle"
        color="rgb(255 0 0 / 0.7)"
        size="xs"
    ></sp-swatch>
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
</div>
```

</sp-tab-panel>
<sp-tab value="s">Small</sp-tab>
<sp-tab-panel value="s">

```html
<div style="display: flex;gap: 5px;">
    <sp-swatch color="rgb(255 0 0 / 0.7)" size="s"></sp-swatch>
    <sp-swatch rounding="none" color="rgb(255 0 0 / 0.7)" size="s"></sp-swatch>
    <sp-swatch rounding="full" color="rgb(255 0 0 / 0.7)" size="s"></sp-swatch>
    <sp-swatch border="light" color="rgb(255 0 0 / 0.7)" size="s"></sp-swatch>
    <sp-swatch border="none" color="rgb(255 0 0 / 0.7)" size="s"></sp-swatch>
    <sp-swatch nothing size="s"></sp-swatch>
    <sp-swatch
        shape="rectangle"
        color="rgb(255 0 0 / 0.7)"
        size="s"
    ></sp-swatch>
    <sp-swatch
        shape="rectangle"
        disabled
        color="rgb(255 0 0 / 0.7)"
        size="s"
    ></sp-swatch>
    <sp-swatch
        rounding="full"
        shape="rectangle"
        mixed-value
        size="s"
    ></sp-swatch>
</div>
```

</sp-tab-panel>
<sp-tab value="m">Medium</sp-tab>
<sp-tab-panel value="m">

```html
<div style="display: flex;gap: 5px;">
    <sp-swatch color="rgb(255 0 0 / 0.7)" size="m"></sp-swatch>
    <sp-swatch rounding="none" color="rgb(255 0 0 / 0.7)" size="m"></sp-swatch>
    <sp-swatch rounding="full" color="rgb(255 0 0 / 0.7)" size="m"></sp-swatch>
    <sp-swatch border="light" color="rgb(255 0 0 / 0.7)" size="m"></sp-swatch>
    <sp-swatch border="none" color="rgb(255 0 0 / 0.7)" size="m"></sp-swatch>
    <sp-swatch nothing size="m"></sp-swatch>
    <sp-swatch
        shape="rectangle"
        color="rgb(255 0 0 / 0.7)"
        size="m"
    ></sp-swatch>
    <sp-swatch
        shape="rectangle"
        disabled
        color="rgb(255 0 0 / 0.7)"
        size="m"
    ></sp-swatch>
    <sp-swatch
        rounding="full"
        shape="rectangle"
        mixed-value
        size="m"
    ></sp-swatch>
</div>
```

</sp-tab-panel>
<sp-tab value="l">Large</sp-tab>
<sp-tab-panel value="l">

```html
<div style="display: flex;gap: 5px;">
    <sp-swatch color="rgb(255 0 0 / 0.7)" size="l"></sp-swatch>
    <sp-swatch rounding="none" color="rgb(255 0 0 / 0.7)" size="l"></sp-swatch>
    <sp-swatch rounding="full" color="rgb(255 0 0 / 0.7)" size="l"></sp-swatch>
    <sp-swatch border="light" color="rgb(255 0 0 / 0.7)" size="l"></sp-swatch>
    <sp-swatch border="none" color="rgb(255 0 0 / 0.7)" size="l"></sp-swatch>
    <sp-swatch nothing size="l"></sp-swatch>
    <sp-swatch
        shape="rectangle"
        color="rgb(255 0 0 / 0.7)"
        size="l"
    ></sp-swatch>
    <sp-swatch
        shape="rectangle"
        disabled
        color="rgb(255 0 0 / 0.7)"
        size="l"
    ></sp-swatch>
    <sp-swatch
        rounding="full"
        shape="rectangle"
        mixed-value
        size="l"
    ></sp-swatch>
</div>
```

</sp-tab-panel>
</sp-tabs>

## Modifying attributes

An `<sp-swatch>` element can be modified by the following attributes/properties to customize its delivery as desired for your use case: `border`, `color`, `disabled`, `mixedValue` (accepted as the `mixed-value` attribute), `nothing`, `rounding`, and `shape`. Use these in concert with each other for a variety of final visual deliveries.

### Border

The `border` attribute/property is not required and when applied accepts the values of `none` or `light`.

```html
<sp-swatch-group>
    <sp-swatch color="rgb(255 0 0 / 0.7)"></sp-swatch>
    <sp-swatch color="rgb(255 0 0 / 0.7)" border="light"></sp-swatch>
    <sp-swatch color="rgb(255 0 0 / 0.7)" border="none"></sp-swatch>
</sp-swatch-group>
```

### Color

The `color` attribute/property determines the color value that the `<sp-swatch>` element will deliver.

```html
<sp-swatch-group>
    <sp-swatch color="rgb(255 0 0 / 0.7)"></sp-swatch>
    <sp-swatch color="orange"></sp-swatch>
    <sp-swatch color="var(--spectrum-magenta-500)"></sp-swatch>
</sp-swatch-group>
```

### Disabled

The `disabled` attribute/property determines prevents interaction on the `<sp-swatch>` element.

```html
<sp-swatch-group>
    <sp-swatch disabled color="rgb(255 0 0 / 0.7)"></sp-swatch>
    <sp-swatch disabled color="orange"></sp-swatch>
    <sp-swatch disabled color="var(--spectrum-magenta-500)"></sp-swatch>
</sp-swatch-group>
```

### Mixed value

The `mixed-value` attribute and `mixedValue` property outline when an `<sp-swatch>` element represents more than one color.

```html
<sp-swatch-group selects="multiple">
    <sp-swatch mixed-value></sp-swatch>
    <sp-swatch mixed-value rounding="full"></sp-swatch>
    <sp-swatch mixed-value shape="rectangle"></sp-swatch>
</sp-swatch-group>
```

Please note that the `aria-checked="mixed"` value only applies when the swatch is in a group with `selects="multiple"`

### Nothing

The `nothing` attribute/property outlines that the `<sp-swatch>` represents no color or that it represents "transparent".

```html
<sp-swatch-group>
    <sp-swatch nothing></sp-swatch>
    <sp-swatch nothing rounding="full"></sp-swatch>
    <sp-swatch nothing shape="rectangle"></sp-swatch>
</sp-swatch-group>
```

### Rounding

The `rounding` attribute/property is not required and when applied accepts the values of `none` or `full`.

```html
<sp-swatch-group>
    <sp-swatch color="rgb(255 0 0 / 0.7)"></sp-swatch>
    <sp-swatch color="rgb(255 0 0 / 0.7)" rounding="none"></sp-swatch>
    <sp-swatch color="rgb(255 0 0 / 0.7)" rounding="full"></sp-swatch>
</sp-swatch-group>
```

### Shape

The `shape` attribute/property is not required and when applied accepts the values of `rectangle`.

```html
<sp-swatch-group>
    <sp-swatch color="rgb(255 0 0 / 0.7)"></sp-swatch>
    <sp-swatch color="rgb(255 0 0 / 0.7)" shape="rectangle"></sp-swatch>
</sp-swatch-group>
```

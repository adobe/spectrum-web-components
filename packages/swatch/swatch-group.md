## Description

An `<sp-swatch-group>` group is a grouping of `<sp-swatch>` elements that are related to each other.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/swatch?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/swatch)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/swatch?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/swatch)

```
yarn add @spectrum-web-components/swatch
```

Import the side effectful registration of `<sp-swatch-group>` via:

```
import '@spectrum-web-components/swatch/sp-swatch-group.js';
```

When looking to leverage the `SwatchGroup` base class as a type and/or for extension purposes, do so via:

```
import { SwatchGroup } from '@spectrum-web-components/swatch';
```

## Sizes

<sp-tabs selected="m" auto label="Size Attribute Options">
<sp-tab value="xs">Extra Small</sp-tab>
<sp-tab-panel value="xs">

```html
<sp-swatch-group size="xs">
    <sp-swatch color="var(--spectrum-global-color-gray-500)"></sp-swatch>
    <sp-swatch color="var(--spectrum-global-color-red-500)"></sp-swatch>
    <sp-swatch color="var(--spectrum-global-color-orange-500)"></sp-swatch>
    <sp-swatch color="var(--spectrum-global-color-yellow-500)"></sp-swatch>
    <sp-swatch color="var(--spectrum-global-color-chartreuse-500)"></sp-swatch>
    <sp-swatch color="var(--spectrum-global-color-celery-500)"></sp-swatch>
    <sp-swatch color="var(--spectrum-global-color-green-500)"></sp-swatch>
    <sp-swatch color="var(--spectrum-global-color-seafoam-500)"></sp-swatch>
    <sp-swatch color="var(--spectrum-global-color-blue-500)"></sp-swatch>
    <sp-swatch color="var(--spectrum-global-color-indigo-500)"></sp-swatch>
    <sp-swatch color="var(--spectrum-global-color-purple-500)"></sp-swatch>
    <sp-swatch color="var(--spectrum-global-color-fuchsia-500)"></sp-swatch>
    <sp-swatch color="var(--spectrum-global-color-magenta-500)"></sp-swatch>
</sp-swatch-group>
```

</sp-tab-panel>
<sp-tab value="s">Small</sp-tab>
<sp-tab-panel value="s">

```html
<sp-swatch-group size="s">
    <sp-swatch color="var(--spectrum-global-color-gray-500)"></sp-swatch>
    <sp-swatch color="var(--spectrum-global-color-red-500)"></sp-swatch>
    <sp-swatch color="var(--spectrum-global-color-orange-500)"></sp-swatch>
    <sp-swatch color="var(--spectrum-global-color-yellow-500)"></sp-swatch>
    <sp-swatch color="var(--spectrum-global-color-chartreuse-500)"></sp-swatch>
    <sp-swatch color="var(--spectrum-global-color-celery-500)"></sp-swatch>
    <sp-swatch color="var(--spectrum-global-color-green-500)"></sp-swatch>
    <sp-swatch color="var(--spectrum-global-color-seafoam-500)"></sp-swatch>
    <sp-swatch color="var(--spectrum-global-color-blue-500)"></sp-swatch>
    <sp-swatch color="var(--spectrum-global-color-indigo-500)"></sp-swatch>
    <sp-swatch color="var(--spectrum-global-color-purple-500)"></sp-swatch>
    <sp-swatch color="var(--spectrum-global-color-fuchsia-500)"></sp-swatch>
    <sp-swatch color="var(--spectrum-global-color-magenta-500)"></sp-swatch>
</sp-swatch-group>
```

</sp-tab-panel>
<sp-tab value="m">Medium</sp-tab>
<sp-tab-panel value="m">

```html
<sp-swatch-group size="m">
    <sp-swatch color="var(--spectrum-global-color-gray-500)"></sp-swatch>
    <sp-swatch color="var(--spectrum-global-color-red-500)"></sp-swatch>
    <sp-swatch color="var(--spectrum-global-color-orange-500)"></sp-swatch>
    <sp-swatch color="var(--spectrum-global-color-yellow-500)"></sp-swatch>
    <sp-swatch color="var(--spectrum-global-color-chartreuse-500)"></sp-swatch>
    <sp-swatch color="var(--spectrum-global-color-celery-500)"></sp-swatch>
    <sp-swatch color="var(--spectrum-global-color-green-500)"></sp-swatch>
    <sp-swatch color="var(--spectrum-global-color-seafoam-500)"></sp-swatch>
    <sp-swatch color="var(--spectrum-global-color-blue-500)"></sp-swatch>
    <sp-swatch color="var(--spectrum-global-color-indigo-500)"></sp-swatch>
    <sp-swatch color="var(--spectrum-global-color-purple-500)"></sp-swatch>
    <sp-swatch color="var(--spectrum-global-color-fuchsia-500)"></sp-swatch>
    <sp-swatch color="var(--spectrum-global-color-magenta-500)"></sp-swatch>
</sp-swatch-group>
```

</sp-tab-panel>
<sp-tab value="l">Large</sp-tab>
<sp-tab-panel value="l">

```html
<sp-swatch-group size="l">
    <sp-swatch color="var(--spectrum-global-color-gray-500)"></sp-swatch>
    <sp-swatch color="var(--spectrum-global-color-red-500)"></sp-swatch>
    <sp-swatch color="var(--spectrum-global-color-orange-500)"></sp-swatch>
    <sp-swatch color="var(--spectrum-global-color-yellow-500)"></sp-swatch>
    <sp-swatch color="var(--spectrum-global-color-chartreuse-500)"></sp-swatch>
    <sp-swatch color="var(--spectrum-global-color-celery-500)"></sp-swatch>
    <sp-swatch color="var(--spectrum-global-color-green-500)"></sp-swatch>
    <sp-swatch color="var(--spectrum-global-color-seafoam-500)"></sp-swatch>
    <sp-swatch color="var(--spectrum-global-color-blue-500)"></sp-swatch>
    <sp-swatch color="var(--spectrum-global-color-indigo-500)"></sp-swatch>
    <sp-swatch color="var(--spectrum-global-color-purple-500)"></sp-swatch>
    <sp-swatch color="var(--spectrum-global-color-fuchsia-500)"></sp-swatch>
    <sp-swatch color="var(--spectrum-global-color-magenta-500)"></sp-swatch>
</sp-swatch-group>
```

</sp-tab-panel>
</sp-tabs>

## Density

The `density` attribute/property is not required and when applied accepts the values of `compact` or `spacious`.

### Compact

```html
<sp-swatch-group density="compact">
    <sp-swatch color="var(--spectrum-global-color-blue-500)"></sp-swatch>
    <sp-swatch color="var(--spectrum-global-color-indigo-500)"></sp-swatch>
    <sp-swatch color="var(--spectrum-global-color-purple-500)"></sp-swatch>
    <sp-swatch color="var(--spectrum-global-color-fuchsia-500)"></sp-swatch>
    <sp-swatch color="var(--spectrum-global-color-magenta-500)"></sp-swatch>
</sp-swatch-group>
```

### Spacious

```html
<sp-swatch-group density="spacious">
    <sp-swatch color="var(--spectrum-global-color-blue-500)"></sp-swatch>
    <sp-swatch color="var(--spectrum-global-color-indigo-500)"></sp-swatch>
    <sp-swatch color="var(--spectrum-global-color-purple-500)"></sp-swatch>
    <sp-swatch color="var(--spectrum-global-color-fuchsia-500)"></sp-swatch>
    <sp-swatch color="var(--spectrum-global-color-magenta-500)"></sp-swatch>
</sp-swatch-group>
```

## Selection

An `<sp-swatch-group>` element can carry a selection of a `single` swatch or of `multiple` swatches. Then the `selects` property is set to one of these values, the `selected` property will surface an array the represents the string values that have been selected in the UI.

When the value of `selected` is updated via user input, the `change` event will be dispatched on the `<sp-swatch-group>` element to announce that interaction. Calling `preventDefault()` on the `chagne` event will prevent both the `<sp-swatch-group>` and the `<sp-swatch>` that initiated the `change` interaction from updating their `selected` values.

The value of `selected` can also be privited directly from the `<sp-swatch>` children. Child `<sp-swatch>` elements with their own `selected` attribute will be gathered and merged with any other selection data on the `<sp-swatch-group>` parent to populate `selected`.

### Single

The `selected` property is always represented as an array, and as such an application leveraging an `<sp-swatch-group>` element can apply more than one selection, regardless of the vaue of `selects`, however all future interactions will force the interace to a single selection.

```html
<sp-swatch-group
    selects="single"
    onchange="this.nextElementSibling.textContent = `Selected: ${JSON.stringify(this.selected, null, ' ')}`"
>
    <sp-swatch color="var(--spectrum-global-color-blue-500)"></sp-swatch>
    <sp-swatch color="var(--spectrum-global-color-indigo-500)"></sp-swatch>
    <sp-swatch
        color="var(--spectrum-global-color-purple-500)"
        selected
    ></sp-swatch>
    <sp-swatch color="var(--spectrum-global-color-fuchsia-500)"></sp-swatch>
    <sp-swatch
        color="var(--spectrum-global-color-magenta-500)"
        selected
    ></sp-swatch>
</sp-swatch-group>
<div>
    Selected: [ "var(--spectrum-global-color-purple-500)",
    "var(--spectrum-global-color-magenta-500)" ]
</div>
```

### Multiple

`<sp-swatch>` children of an `<sp-swatch-group selects="mutiple">` parent will toggle their selection.

```html
<sp-swatch-group
    selects="multiple"
    onchange="this.nextElementSibling.textContent = `Selected: ${JSON.stringify(this.selected, null, ' ')}`"
>
    <sp-swatch color="var(--spectrum-global-color-blue-500)"></sp-swatch>
    <sp-swatch color="var(--spectrum-global-color-indigo-500)"></sp-swatch>
    <sp-swatch color="var(--spectrum-global-color-purple-500)"></sp-swatch>
    <sp-swatch color="var(--spectrum-global-color-fuchsia-500)"></sp-swatch>
    <sp-swatch color="var(--spectrum-global-color-magenta-500)"></sp-swatch>
</sp-swatch-group>
<div>Selected: [ ]</div>
```

### Value

When available, the value of `selected` will be constructed from the `value` attributes/properties of the child `<sp-swatch>` elements. This can be useful when you would like the swatch data needs to correlate to a hash rather than the raw color string.

```html
<sp-swatch-group
    selects="multiple"
    selected='["color-2"]'
    onchange="this.nextElementSibling.textContent = `Selected: ${JSON.stringify(this.selected, null, ' ')}`"
>
    <sp-swatch
        color="var(--spectrum-global-color-blue-500)"
        value="color-0"
    ></sp-swatch>
    <sp-swatch
        color="var(--spectrum-global-color-indigo-500)"
        value="color-1"
        selected
    ></sp-swatch>
    <sp-swatch
        color="var(--spectrum-global-color-purple-500)"
        value="color-2"
    ></sp-swatch>
    <sp-swatch
        color="var(--spectrum-global-color-fuchsia-500)"
        value="color-3"
        selected
    ></sp-swatch>
    <sp-swatch
        color="var(--spectrum-global-color-magenta-500)"
        value="color-4"
    ></sp-swatch>
</sp-swatch-group>
<div>Selected: [ "color-2", "color-1", "color-3" ]</div>
```

## Swatch modifying attributes

An `<sp-swatch-group>` element can be modified by the following attributes/properties to customize its delivery as desired for your use case: `border`, `disabled`, `mixedValue` (accepted as the `mixed-value` attribute), `nothing`, `rounding`, `shape`, and `size`. Use these in concert with each other for a variety of final visual deliveries. Applying a value for one of these attributes/properties to an `<sp-swatch-group>` element will have it forward the value to all of the `<sp-swatch>` elements that are a direct child of the group, overriding any value that may be applied directly to those children.

## Description

`<sp-badge>` elements display a small amount of color-categorized metadata. They're ideal for getting a user's attention.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/badge?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/badge)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/badge?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/badge)

```
yarn add @spectrum-web-components/badge
```

Import the side effectful registration of `<sp-badge>` via:

```
import '@spectrum-web-components/badge/sp-badge.js';
```

When looking to leverage the `Badge` base class as a type and/or for extension purposes, do so via:

```
import { Badge } from '@spectrum-web-components/badge';
```

## Sizes

<sp-tabs selected="m" auto label="Size Attribute Options">
<sp-tab value="s">Small</sp-tab>
<sp-tab-panel value="s">

```html demo
<div style="display: flex; gap: var(--spectrum-spacing-75);">
    <sp-badge size="s">Label</sp-badge>
    <sp-badge size="s">
        <sp-icon-checkmark-circle slot="icon"></sp-icon-checkmark-circle>
        Icon and label
    </sp-badge>
</div>
```

</sp-tab-panel>
<sp-tab value="m">Medium</sp-tab>
<sp-tab-panel value="m">

```html demo
<div style="display: flex; gap: var(--spectrum-spacing-75);">
    <sp-badge size="m">Label</sp-badge>
    <sp-badge size="m">
        <sp-icon-checkmark-circle slot="icon"></sp-icon-checkmark-circle>
        Icon and label
    </sp-badge>
</div>
```

</sp-tab-panel>
<sp-tab value="l">Large</sp-tab>
<sp-tab-panel value="l">

```html demo
<div style="display: flex; gap: var(--spectrum-spacing-75);">
    <sp-badge size="l">Label</sp-badge>
    <sp-badge size="l">
        <sp-icon-checkmark-circle slot="icon"></sp-icon-checkmark-circle>
        Icon and label
    </sp-badge>
</div>
```

</sp-tab-panel>
<sp-tab value="xl">Extra Large</sp-tab>
<sp-tab-panel value="xl">

```html demo
<div style="display: flex; gap: var(--spectrum-spacing-75);">
    <sp-badge size="xl">Label</sp-badge>
    <sp-badge size="xl">
        <sp-icon-checkmark-circle slot="icon"></sp-icon-checkmark-circle>
        Icon and label
    </sp-badge>
</div>
```

</sp-tab-panel>
</sp-tabs>

## Variants

The `<sp-badge>` can be customized with either semantic or non-semantic variants.

### Semantic

```html demo
<div style="display: flex; gap: var(--spectrum-spacing-75);">
    <sp-badge variant="accent">Informative</sp-badge>
    <sp-badge variant="neutral">Neutral</sp-badge>
    <sp-badge variant="informative">Informative</sp-badge>
    <sp-badge variant="positive">Positive</sp-badge>
    <sp-badge variant="negative">Negative</sp-badge>
    <sp-badge variant="notice">Notice</sp-badge>
</div>
```

### Non-Semantic

Non-semantic badge colors are no longer supported directly by Spectrum and Spectrum Web Components. You can mimic their delivery via the following CSS Custom Properties. These values for the `variant` attribute/property have not been marked as deprecated, but will no longer achieve the results you may have relied on in the past.

```html demo
<div style="display: flex; gap: var(--spectrum-spacing-75); flex-wrap:wrap;">
    <sp-badge variant="seafoam">Seafoam</sp-badge>
    <sp-badge variant="indigo">Indigo</sp-badge>
    <sp-badge variant="purple">Purple</sp-badge>
    <sp-badge variant="fuchsia">Fuchsia</sp-badge>
    <sp-badge variant="magenta">Magenta</sp-badge>
    <sp-badge variant="yellow">Yellow</sp-badge>
    <sp-badge variant="gray">Gray</sp-badge>
    <sp-badge variant="red">Red</sp-badge>
    <sp-badge variant="orange">Orange</sp-badge>
    <sp-badge variant="chartreuse">Chartreuse</sp-badge>
    <sp-badge variant="celery">Celery</sp-badge>
    <sp-badge variant="green">Green</sp-badge>
    <sp-badge variant="cyan">Cyan</sp-badge>
    <sp-badge variant="blue">Blue</sp-badge>
</div>
```

## Fixed

When you'd like to have the `<sp-badge>` display as if "fixed" to the edge of a UI, the `fixed` attribute/property can be leveraged to alter the border rounding based on the position you would like to achieve:

```html
<div
    style="position: relative; width: 400px; height: 200px; background: #eee; max-width: 100%"
>
    <sp-badge>None</sp-badge>
    <sp-badge
        fixed="block-start"
        style="position: absolute; top: 0; left: 200px;"
    >
        block-start
    </sp-badge>
    <sp-badge
        fixed="inline-end"
        style="position: absolute; right: 0; top: 100px;"
    >
        inline-end
    </sp-badge>
    <sp-badge
        fixed="block-end"
        style="position: absolute; bottom: 0; left: 200px;"
    >
        block-end
    </sp-badge>
    <sp-badge
        fixed="inline-start"
        style="position: absolute; left: 0; top: 100px;"
    >
        inline-start
    </sp-badge>
</div>
```

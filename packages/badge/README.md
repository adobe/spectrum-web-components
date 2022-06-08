## Description

`<sp-badge>` elements display a small amount of color-categorized metadata. They're ideal for getting a user's attention.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/badge?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/badge)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/badge?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/badge)
[![Try it on webcomponents.dev](https://img.shields.io/badge/Try%20it%20on-webcomponents.dev-green?style=for-the-badge)](https://studio.webcomponents.dev/edit/qxPsOTrGAPB92LzPfk4P/src/index.ts?p=stories)

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
<div style="display: flex; gap: var(--spectrum-global-dimension-size-50);">
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
<div style="display: flex; gap: var(--spectrum-global-dimension-size-50);">
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
<div style="display: flex; gap: var(--spectrum-global-dimension-size-50);">
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
<div style="display: flex; gap: var(--spectrum-global-dimension-size-50);">
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
<div style="display: flex; gap: var(--spectrum-global-dimension-size-50);">
    <sp-badge variant="neutral">Neutral</sp-badge>
    <sp-badge variant="informative">Informative</sp-badge>
    <sp-badge variant="positive">Positive</sp-badge>
    <sp-badge variant="negative">Negative</sp-badge>
</div>
```

### Non-Semantic

```html demo
<div style="display: flex; gap: var(--spectrum-global-dimension-size-50);">
    <sp-badge variant="fuchsia">Fuchsia</sp-badge>
    <sp-badge variant="indigo">Indigo</sp-badge>
    <sp-badge variant="magenta">Magenta</sp-badge>
    <sp-badge variant="purple">Purple</sp-badge>
    <sp-badge variant="seafoam">Seafoam</sp-badge>
    <sp-badge variant="yellow">Yellow</sp-badge>
</div>
```

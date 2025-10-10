## Description

When composing complex form fields, an `<sp-infield-button>` can visually associate button functionality with other form fields to delivery enhanced capabilities to your visitors.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/infield-button?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/infield-button)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/infield-button?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/infield-button)

```
yarn add @spectrum-web-components/infield-button
```

Import the side effectful registration of `<sp-infield-button>` via:

```
import '@spectrum-web-components/infield-button/sp-infield-button.js';
```

When looking to leverage the `InfieldButton` base class as a type and/or for extension purposes, do so via:

```
import { InfieldButton } from '@spectrum-web-components/infield-button';
```

## Sizes

<sp-tabs selected="m" auto label="Size Attribute Options">
<sp-tab value="s">Small</sp-tab>
<sp-tab-panel value="s">

```html
<sp-infield-button label="Add" size="s">
    <sp-icon-add></sp-icon-add>
</sp-infield-button>
```

</sp-tab-panel>
<sp-tab value="m">Medium</sp-tab>
<sp-tab-panel value="m">

```html
<sp-infield-button label="Add" size="m">
    <sp-icon-add></sp-icon-add>
</sp-infield-button>
```

</sp-tab-panel>
<sp-tab value="l">Large</sp-tab>
<sp-tab-panel value="l">

```html
<sp-infield-button label="Add" size="l">
    <sp-icon-add></sp-icon-add>
</sp-infield-button>
```

</sp-tab-panel>
<sp-tab value="xl">Extra Large</sp-tab>
<sp-tab-panel value="xl">

```html
<sp-infield-button label="Add" size="xl">
    <sp-icon-add></sp-icon-add>
</sp-infield-button>
```

</sp-tab-panel>
</sp-tabs>

## Inline buttons

Use the `inline` attribute to describe whether the `<sp-infield-button>` should be visually at the `start` or `end` of the field is associated to:

### inline="start"

```html
<sp-infield-button inline="start" label="Add">
    <sp-icon-add></sp-icon-add>
</sp-infield-button>
```

### inline="end"

```html
<sp-infield-button inline="end" label="Add">
    <sp-icon-add></sp-icon-add>
</sp-infield-button>
```

## Stacked buttons

The `block` attribute can be used to create a vertial stack of buttons. You can place buttons visually on the stack with the `start` or `end` values:

```html
<sp-infield-button block="start" label="Increment">
    <sp-icon-add size="xxs"></sp-icon-add>
</sp-infield-button>
<sp-infield-button block="end" label="Decrement">
    <sp-icon-remove size="xxs"></sp-icon-remove>
</sp-infield-button>
```

## Disabled

An `<sp-infield-button>` with the `disabled` attribute will become non-interactive and dimmed:

```html
<sp-infield-button disabled inline="start" label="Add">
    <sp-icon-add></sp-icon-add>
</sp-infield-button>
```

## Quiet

An `<sp-infield-button>` with the `quiet` attribute will feature a diminished visual presence:

```html
<sp-infield-button inline="start" label="Add" quiet>
    <sp-icon-add></sp-icon-add>
</sp-infield-button>
```

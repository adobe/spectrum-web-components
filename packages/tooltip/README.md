## Description

`<sp-tooltip>` elements allow users to get contextual help or information about specific components when hovering or focusing on them. When an `<sp-tooltip>` is delivered without a `managed` attribute the element will bind its presence to the parent element in which it is placed. Non-`managed` `<sp-tooltip>` elements will display when that parent element is hovered or given focus. This requires that that parent be interactive, like an `<sp-button>` or similar. When the `managed` attribute is used, that means that something outside of the `<sp-tooltip>` will be managing its presence, like an `<overlay-trigger>` or similar.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/tooltip?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/tooltip)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/tooltip?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/tooltip)
[![Try it on webcomponents.dev](https://img.shields.io/badge/Try%20it%20on-webcomponents.dev-green?style=for-the-badge)](https://webcomponents.dev/edit/collection/fO75441E1Q5ZlI0e9pgq/VmbuRedDUMmN4amLK7ie/src/index.ts)

```
yarn add @spectrum-web-components/tooltip
```

Import the side effectful registration of `<sp-tooltip>` via:

```
import '@spectrum-web-components/tooltip/sp-tooltip.js';
```

When looking to leverage the `Tooltip` base class as a type and/or for extension purposes, do so via:

```
import { Tooltip } from '@spectrum-web-components/tooltip';
```

## Example

Tooltips can be top, bottom, left, or right.

```html
<sp-tooltip open placement="top" managed>Label</sp-tooltip>
<br />
<br />
<sp-tooltip open placement="bottom" managed>Label</sp-tooltip>
<br />
<br />
<sp-tooltip open placement="left" managed>Label</sp-tooltip>
<br />
<br />
<sp-tooltip open placement="right" managed>Label</sp-tooltip>
```

## Variants

### Informative

This is the informative or info variant of Tooltip

```html
<sp-tooltip open placement="top" variant="info" managed>Label</sp-tooltip>
<sp-tooltip open placement="top" variant="info" managed>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit
</sp-tooltip>
<sp-tooltip open placement="top" variant="info" managed>
    <sp-icon-info slot="icon" size="s"></sp-icon-info>
    Label
</sp-tooltip>
<sp-tooltip open placement="top" variant="info" managed>
    <sp-icon-info slot="icon" size="s"></sp-icon-info>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit
</sp-tooltip>
```

### Positive

This is the postive (a.k.a.) success variant of Tooltip

```html
<sp-tooltip open placement="top" variant="positive" managed>Label</sp-tooltip>
<sp-tooltip open placement="top" variant="positive" managed>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit
</sp-tooltip>
<sp-tooltip open placement="top" variant="positive" managed>
    <sp-icon-checkmark-circle slot="icon" size="s"></sp-icon-checkmark-circle>
    Label
</sp-tooltip>
<sp-tooltip open placement="top" variant="positive" managed>
    <sp-icon-checkmark-circle slot="icon" size="s"></sp-icon-checkmark-circle>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit
</sp-tooltip>
```

### Negative

This is the negative a.k.a. error variant of Tooltip

```html
<sp-tooltip open placement="top" variant="negative" managed>Label</sp-tooltip>
<sp-tooltip open placement="top" variant="negative" managed>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit
</sp-tooltip>
<sp-tooltip open placement="top" variant="negative" managed>
    <sp-icon-alert slot="icon" size="s"></sp-icon-alert>
    Label
</sp-tooltip>
<sp-tooltip open placement="top" variant="negative" managed>
    <sp-icon-alert slot="icon" size="s"></sp-icon-alert>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit
</sp-tooltip>
```

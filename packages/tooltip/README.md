## Description

`sp-tooltip` allow users to get contextual help or information about specific components when hovering or focusing on them.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/tooltip?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/tooltip)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/tooltip?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/tooltip)

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

### Example

Tooltips can be top, bottom, left, or right.

```html
<sp-tooltip open placement="top">Label</sp-tooltip>
<br />
<br />
<sp-tooltip open placement="bottom">Label</sp-tooltip>
<br />
<br />
<sp-tooltip open placement="left">Label</sp-tooltip>
<br />
<br />
<sp-tooltip open placement="right">Label</sp-tooltip>
```

### Variants

#### Informative

This is the informative or info variant of Tooltip

```html
<sp-tooltip open placement="top" variant="info">Label</sp-tooltip>
<sp-tooltip open placement="top" variant="info">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit
</sp-tooltip>
<sp-tooltip open placement="top" variant="info">
    <sp-icon-info slot="icon" size="s"></sp-icon-info>
    Label
</sp-tooltip>
<sp-tooltip open placement="top" variant="info">
    <sp-icon-info slot="icon" size="s"></sp-icon-info>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit
</sp-tooltip>
```

#### Positive

This is the postive (a.k.a.) success variant of Tooltip

```html
<sp-tooltip open placement="top" variant="positive">Label</sp-tooltip>
<sp-tooltip open placement="top" variant="positive">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit
</sp-tooltip>
<sp-tooltip open placement="top" variant="positive">
    <sp-icon-checkmark-circle slot="icon" size="s"></sp-icon-checkmark-circle>
    Label
</sp-tooltip>
<sp-tooltip open placement="top" variant="positive">
    <sp-icon-checkmark-circle slot="icon" size="s"></sp-icon-checkmark-circle>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit
</sp-tooltip>
```

#### Negative

This is the negative a.k.a. error variant of Tooltip

```html
<sp-tooltip open placement="top" variant="negative">Label</sp-tooltip>
<sp-tooltip open placement="top" variant="negative">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit
</sp-tooltip>
<sp-tooltip open placement="top" variant="negative">
    <sp-icon-alert slot="icon" size="s"></sp-icon-alert>
    Label
</sp-tooltip>
<sp-tooltip open placement="top" variant="negative">
    <sp-icon-alert slot="icon" size="s"></sp-icon-alert>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit
</sp-tooltip>
```

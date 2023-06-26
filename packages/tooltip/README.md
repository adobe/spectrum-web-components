## Description

`sp-tooltip` allow users to get contextual help or information about specific components when hovering or focusing on them.

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

### Self-managed overlays

By default, Tooltip provides styling without behavior.
You must combine it with an [Overlay Trigger](https://opensource.adobe.com/spectrum-web-components/components/overlay-trigger/#%22hover%22-content-only) in order to manage its overlay behavior.

You can instead apply the `self-managed` attribute for this common case,
which automaticaly binds to the parent element's hover interaction:

```html
<sp-action-button>
    Trigger
    <sp-tooltip self-managed>Content</sp-tooltip>
</sp-action-button>
```

This is especially useful when inserting an intermediate `<overlay-trigger>` would interfere with
parent/child relationships, such as between `<sp-action-group>` and `<sp-action-button>`.

## Variants

### Informative

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

### Positive

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

### Negative

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

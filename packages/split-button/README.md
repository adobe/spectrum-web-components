## Description

An `sp-split-button` surfaces an immediately envokable action via it's main button, as well as a list of alternative actions in its toggleable menu overlay. By default, any actions envoked from the overlay will replace the main action button. When leveraging `[type="more"]` the action will be envoked, but the main button will remain the action initally persribed by the implementor.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/split-button?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/split-button)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/split-button?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/splitbutton)

```
yarn add @spectrum-web-components/split-button
```

Import the side effectful registration of `<sp-split-button>` via:

```
import '@spectrum-web-components/split-button/sp-split-button.js';
```

When looking to leverage the `SplitButton` base class as a type and/or for extension purposes, do so via:

```
import { SplitButton } from '@spectrum-web-components/split-button';
```

## CTA Split Button

```html
<sp-split-button>
    Split Button
    <sp-popover slot="more" open>
        <sp-menu>
            <sp-menu-item>Option 1</sp-menu-item>
            <sp-menu-item>Option Extended</sp-menu-item>
        </sp-menu>
    </sp-popover>
</sp-split-button>
<sp-split-button left>
    Split Button
    <sp-popover slot="more" open>
        <sp-menu>
            <sp-menu-item>Option 1</sp-menu-item>
            <sp-menu-item>Option Extended</sp-menu-item>
        </sp-menu>
    </sp-popover>
</sp-split-button>
```

## Primary Split Button

```html
<sp-split-button variant="primary">
    Split Button
    <sp-popover slot="more" open>
        <sp-menu>
            <sp-menu-item>Option 1</sp-menu-item>
            <sp-menu-item>Option Extended</sp-menu-item>
        </sp-menu>
    </sp-popover>
</sp-split-button>
<sp-split-button left variant="primary">
    Split Button
    <sp-popover slot="more" open>
        <sp-menu>
            <sp-menu-item>Option 1</sp-menu-item>
            <sp-menu-item>Option Extended</sp-menu-item>
        </sp-menu>
    </sp-popover>
</sp-split-button>
```

## Secondary Split Button

```html
<sp-split-button variant="secondary">
    Split Button
    <sp-popover slot="more" open>
        <sp-menu>
            <sp-menu-item>Option 1</sp-menu-item>
            <sp-menu-item>Option Extended</sp-menu-item>
        </sp-menu>
    </sp-popover>
</sp-split-button>
<sp-split-button left>
    Split Button
    <sp-popover slot="more" open variant="secondary">
        <sp-menu>
            <sp-menu-item>Option 1</sp-menu-item>
            <sp-menu-item>Option Extended</sp-menu-item>
        </sp-menu>
    </sp-popover>
</sp-split-button>
```

## CTA More Split Button

```html
<sp-split-button type="more">
    Split Button
    <sp-popover slot="more" open>
        <sp-menu>
            <sp-menu-item>Option 1</sp-menu-item>
            <sp-menu-item>Option Extended</sp-menu-item>
        </sp-menu>
    </sp-popover>
</sp-split-button>
<sp-split-button type="more" left>
    Split Button
    <sp-popover slot="more" open>
        <sp-menu>
            <sp-menu-item>Option 1</sp-menu-item>
            <sp-menu-item>Option Extended</sp-menu-item>
        </sp-menu>
    </sp-popover>
</sp-split-button>
```

## Primary More Split Button

```html
<sp-split-button type="more" variant="primary">
    Split Button
    <sp-popover slot="more" open>
        <sp-menu>
            <sp-menu-item>Option 1</sp-menu-item>
            <sp-menu-item>Option Extended</sp-menu-item>
        </sp-menu>
    </sp-popover>
</sp-split-button>
<sp-split-button type="more" left variant="primary">
    Split Button
    <sp-popover slot="more" open>
        <sp-menu>
            <sp-menu-item>Option 1</sp-menu-item>
            <sp-menu-item>Option Extended</sp-menu-item>
        </sp-menu>
    </sp-popover>
</sp-split-button>
```

## Secondary More Split Button

```html
<sp-split-button type="more" variant="secondary">
    Split Button
    <sp-popover slot="more" open>
        <sp-menu>
            <sp-menu-item>Option 1</sp-menu-item>
            <sp-menu-item>Option Extended</sp-menu-item>
        </sp-menu>
    </sp-popover>
</sp-split-button>
<sp-split-button type="more" left variant="secondary">
    Split Button
    <sp-popover slot="more" open>
        <sp-menu>
            <sp-menu-item>Option 1</sp-menu-item>
            <sp-menu-item>Option Extended</sp-menu-item>
        </sp-menu>
    </sp-popover>
</sp-split-button>
```

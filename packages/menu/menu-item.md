## Overview

For use within an `<sp-menu>` element, an `<sp-menu-item>` represents a single item in a menu.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/menu?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/menu)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/menu?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/menu)
[![Try it on webcomponents.dev](https://img.shields.io/badge/Try%20it%20on-webcomponents.dev-green?style=for-the-badge)](https://webcomponents.dev/edit/collection/fO75441E1Q5ZlI0e9pgq/FikFeTXNsYhxAVmCz2f4/src/index.ts)

```
yarn add @spectrum-web-components/menu
```

Import the side effectful registration of `<sp-menu-item>` as follows:

```
import '@spectrum-web-components/menu/sp-menu-item.js';
```

When looking to leverage the `MenuItem` base class as a type and/or for extension purposes, do so via:

```
import { MenuItem } from '@spectrum-web-components/menu';
```

## Example

Menus are a collection of `<sp-menu-item>`s that can be modified via a `disabled` or `selected` attribute to represent an item in that state.

```html
<sp-menu>
    <sp-menu-item>Active Menu Item</sp-menu-item>
    <sp-menu-item disabled>Disabled Menu Item</sp-menu-item>
    <sp-menu-item selected>Selected Menu Item</sp-menu-item>
</sp-menu>
```

### Value

When displayed as a descendent of an element that manages selection (e.g. `<sp-action-menu>`, `<sp-picker>`, `<sp-split-button>`, etc.), an `<sp-menu-item>` will represent the "selected" value of that ancestor when its `value` attribute or the trimmed `textContent` (represeted by `el.itemText`) matches the `value` of the ancestor element.

In the following example, the selected `<sp-menu-item>` represents a `value` of `Text that is really long and useful to a visitor, but not exactly good to use in your application or component state.` for the ancestor element.

```html
<sp-picker
    label="Menu items examples"
    value="Text that is really long and useful to a visitor, but not exactly good to use in your application or component state."
>
    <sp-menu-item>
        Text that is really long and useful to a visitor, but not exactly good
        to use in your application or component state.
    </sp-menu-item>
    <sp-menu-item>Not selected</sp-menu-item>
</sp-picker>

<sp-action-menu
    value="Text that is really long and useful to a visitor, but not exactly good to use in your application or component state."
>
    <span slot="label">Menu items examples</span>
    <sp-menu-item>
        Text that is really long and useful to a visitor, but not exactly good
        to use in your application or component state.
    </sp-menu-item>
    <sp-menu-item>Not selected</sp-menu-item>
</sp-action-menu>
```

When the `value` attribute is leveraged, the selected `<sp-menu-item>` represents a `value` of `short-key` for the `<sp-action-menu>` element.

```html
<sp-picker value="short-key">
    <span slot="label">Menu items examples</span>
    <sp-menu-item value="not-selected">Not selected</sp-menu-item>
    <sp-menu-item value="short-key">
        Text that is really long and useful to a visitor, but not exactly good
        to use in your application or component state.
    </sp-menu-item>
</sp-picker>
<sp-action-menu value="short-key">
    <span slot="label">Menu items examples</span>
    <sp-menu-item value="not-selected">Not selected</sp-menu-item>
    <sp-menu-item value="short-key">
        Text that is really long and useful to a visitor, but not exactly good
        to use in your application or component state.
    </sp-menu-item>
</sp-action-menu>
```

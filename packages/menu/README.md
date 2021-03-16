## Description

An `<sp-menu>` is used for creating a menu list. The various elements inside a menu are given as `<sp-menu-group>`, `<sp-menu-item>`, or `<sp-menu-divider>`. Often a `<sp-menu>` element will appear in a `<sp-popover>` element so that it displays as a togglig menu.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/menu?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/menu)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/menu?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/menu)
[![Try it on webcomponents.dev](https://img.shields.io/badge/Try%20it%20on-webcomponents.dev-green?style=for-the-badge)](https://webcomponents.dev/edit/collection/fO75441E1Q5ZlI0e9pgq/FikFeTXNsYhxAVmCz2f4/src/index.ts)

```
yarn add @spectrum-web-components/menu
```

Import the side effectful registration of `<sp-menu>`, `<sp-menu-group>`, `<sp-menu-item>`, or `<sp-menu-divider>` individually as follows:

```
import '@spectrum-web-components/menu/sp-menu.js';
import '@spectrum-web-components/menu/sp-menu-group.js';
import '@spectrum-web-components/menu/sp-menu-item.js';
import '@spectrum-web-components/menu/sp-menu-divider.js';
```

When looking to leverage the `Menu`, `MenuGroup`, `MenuItem`, or `MenuDivider` base classes as a type and/or for extension purposes, do so via:

```
import {
    Menu,
    MenuGroup,
    MenuItem,
    MenuDivider
} from '@spectrum-web-components/menu';
```

## Example

<!-- prettier-ignore -->
```html
<sp-menu>
    <sp-menu-item>
        Deselect
    </sp-menu-item>
    <sp-menu-item>
        Select inverse
    </sp-menu-item>
    <sp-menu-item>
        Feather...
    </sp-menu-item>
    <sp-menu-item>
        Select and mask...
    </sp-menu-item>
    <sp-menu-item>
        Save selection
    </sp-menu-item>
    <sp-menu-item disabled>
        Make work path
    </sp-menu-item>
</sp-menu>
```

```html
<sp-popover open style="position: relative">
    <sp-menu>
        <sp-menu-item value="item-1">Deselect</sp-menu-item>
        <sp-menu-item value="item-2">Select inverse</sp-menu-item>
        <sp-menu-item value="item-3">Feather...</sp-menu-item>
        <sp-menu-item value="item-4">Select and mask...</sp-menu-item>
        <sp-menu-item value="item-5">Save selection</sp-menu-item>
        <sp-menu-item value="item-6" disabled>Make work path</sp-menu-item>
    </sp-menu>
</sp-popover>
```

## Accessibility

`<sp-menu>`, `<sp-menu-group>`, and `<sp-menu-item>` each deliver a different part of the wai-aria "menu" pattern and support the `menu`, `group`, and `menuitem` roles respectively. To support ease of keyboard navigation, only the first active _or_ first selected `<sp-menu-item>` can be accessed in the tab order. Once the focus has entered the menu the up and down arrow keys can be used to access the rest of the menu.

## Description

The visible label that is be provided via the default `<slot>` interface can be ommitted in preference of an icon only interface. In this context be sure that the `<sp-action-menu>` continued to be accessible to screen readers by applying the `label` attribute. This will apply an `aria-label` attribute of the same value to the `<botton>` element that toggles the menu list.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/action-menu?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/action-menu)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/action-menu?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/action-menu)

```
yarn add @spectrum-web-components/action-menu
```

Import the side effectful registration of `<sp-action-menu>` via:

```
import '@spectrum-web-components/action-menu/sp-action-menu.js';
```

When looking to leverage the `ActionMenu` base class as a type and/or for extension purposes, do so via:

```
import { ActionMenu } from '@spectrum-web-components/action-menu';
```

## Example

<!-- prettier-ignore -->
```html
<sp-action-menu>
    <span slot="label">More Actions</span>
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
        <sp-menu-divider></sp-menu-divider>
        <sp-menu-item>
            Save selection
        </sp-menu-item>
        <sp-menu-item disabled>
            Make work path
        </sp-menu-item>
    </sp-menu>
</sp-action-menu>
```

## Variants

### No visible label

An `sp-action-menu` parent will ensure that the wrapped `sp-menu` features a role of `menu` and contains children with the role `menuitem`. Upon focusing the `sp-action-menu` using `ArrowDown` will also open the menu while throwing focus into first selected (or unselected when none are selected) menu item to assist in selecting of a new value.

<!-- prettier-ignore -->
```html
<sp-action-menu label="More Actions">
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
        <sp-menu-divider></sp-menu-divider>
        <sp-menu-item>
            Save selection
        </sp-menu-item>
        <sp-menu-item disabled>
            Make work path
        </sp-menu-item>
    </sp-menu>
</sp-action-menu>
```

### Alternate icon

A custom icon can be supplied via the `icon` slot in order to replace the default meatballs icon.

<sp-icons-medium></sp-icons-medium>

<!-- prettier-ignore -->
```html
<sp-action-menu label="More actions">
    <sp-icon slot="icon" size="xxs" name="ui:ChevronDownSmall"></sp-icon>
    <span slot="label">Actions Under the Arrow</span>
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
        <sp-menu-divider></sp-menu-divider>
        <sp-menu-item>
            Save selection
        </sp-menu-item>
        <sp-menu-item disabled>
            Make work path
        </sp-menu-item>
    </sp-menu>
</sp-action-menu>
```

## Accessibility

An `sp-action-menu` parent will ensure that the wrapped `sp-menu` features a role of `menu` and contains children with the role `menuitem`. Upon focusing the `sp-action-menu` using `ArrowDown` will also open the menu while throwing focus into first selected (or unselected when none are selected) menu item to facilitate selecting of a new value.

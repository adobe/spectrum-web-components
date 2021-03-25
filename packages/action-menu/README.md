## Description

An `<sp-action-menu>` is an action button with a Popover. Use an `<sp-menu>` element to outline the items that will be made available to the user when interacting with the `sp-action-menu` element.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/action-menu?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/action-menu)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/action-menu?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/action-menu)
[![Try it on webcomponents.dev](https://img.shields.io/badge/Try%20it%20on-webcomponents.dev-green?style=for-the-badge)](https://webcomponents.dev/edit/collection/fO75441E1Q5ZlI0e9pgq/EYQn9T6wOnieZbv4xnPj/src/index.ts)

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
</sp-action-menu>
```

## Variants

### No visible label

The visible label that is be provided via the default `<slot>` interface can be ommitted in preference of an icon only interface. In this context be sure that the `<sp-action-menu>` continued to be accessible to screen readers by applying the `label` attribute. This will apply an `aria-label` attribute of the same value to the `<button>` element that toggles the menu list.

<!-- prettier-ignore -->
```html
<sp-action-menu label="More Actions">
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
</sp-action-menu>
```

### Alternate icon

A custom icon can be supplied via the `icon` slot in order to replace the default meatballs icon.

<sp-icons-medium></sp-icons-medium>

<!-- prettier-ignore -->
```html
<sp-action-menu>
    <sp-icon-settings slot="icon"></sp-icon-settings>
    <span slot="label">Actions under the gear</span>
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
</sp-action-menu>
```

## Accessibility

An `<sp-action-menu>` parent will ensure that the internal `<sp-menu>` features a role of `listbox` and contains children with the role `option`. Upon focusing the `<sp-action-menu>` using `ArrowDown` will also open the menu while throwing focus into first selected (or unselected when none are selected) menu item to assist in selecting of a new value.

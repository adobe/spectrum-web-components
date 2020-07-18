## Description

An `<sp-dropdown>` is an alternative to HTML's `<select>` element. Use an `<sp-menu>` element to outline the options that will be made available to the user when interacting with the `<sp-dropdown>` element.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/dropdown?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/dropdown)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/dropdown?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/dropdown)

```
yarn add @spectrum-web-components/dropdown
```

Import the side effectful registration of `<sp-dropdown>` via:

```
import '@spectrum-web-components/dropdown/sp-dropdown.js';
```

When looking to leverage the `Dropdown` base class as a type and/or for extension purposes, do so via:

```
import { Dropdown } from '@spectrum-web-components/dropdown';
```

## Example

```html
<p><strong>Standard:</strong></p>
<sp-dropdown label="Select a Country with a very long label, too long in fact">
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
</sp-dropdown>
<br />
<br />
<p><strong>Quiet:</strong></p>
<sp-dropdown
    label="Select a Country with a very long label, too long in fact"
    quiet
>
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
</sp-dropdown>
```

## States

### Invalid

```html
<p><strong>Standard:</strong></p>
<sp-dropdown
    label="Select a Country with a very long label, too long in fact"
    invalid
>
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
</sp-dropdown>
<br />
<br />
<p><strong>Quiet:</strong></p>
<sp-dropdown
    label="Select a Country with a very long label, too long in fact"
    invalid
    quiet
>
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
</sp-dropdown>
```

### Disabled

```html
<p><strong>Standard:</strong></p>
<sp-dropdown
    label="Select a Country with a very long label, too long in fact"
    disabled
>
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
</sp-dropdown>
<br />
<br />
<p><strong>Quiet:</strong></p>
<sp-dropdown
    label="Select a Country with a very long label, too long in fact"
    disabled
    quiet
>
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
</sp-dropdown>
```

## Accessibility

An `<sp-dropdown>` parent will ensure that the wrapped `<sp-menu>` features a role of `listbox` and contains children with the role `option`. Upon focusing the `<sp-dropdown>` using `ArrowDown` will also open the menu while throwing focus into first selected (or unselected when none are selected) menu item to assist in selecting of a new value.

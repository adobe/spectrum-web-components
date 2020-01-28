## Description

An `<sp-dropdown />` is an alternative to HTML's `select` element. Use an `<sp-menu>` element to outline the options that will be made available to the user when interacting with the `sp-dropdown` element.

### Installation

```
npm install @spectrum-web-components/dropdown

# or

yarn add @spectrum-web-components/dropdown
```

## Example

<!-- prettier-ignore -->
```html
<sp-dropdown>
    Select a Country with a very long label, too long in fact
    <sp-menu slot="options" role="listbox">
        <sp-menu-item>
            Deselect
        </sp-menu-item>
        <sp-menu-item>
            Select Inverse
        </sp-menu-item>
        <sp-menu-item>
            Feather...
        </sp-menu-item>
        <sp-menu-item>
            Select and Mask...
        </sp-menu-item>
        <sp-menu-divider></sp-menu-divider>
        <sp-menu-item>
            Save Selection
        </sp-menu-item>
        <sp-menu-item disabled>
            Make Work Path
        </sp-menu-item>
    </sp-menu>
</sp-dropdown>
```

## Variants

### Invalid

<!-- prettier-ignore -->
```html
<sp-dropdown
    invalid
>
    Select a Country with a very long label, too long in fact
    <sp-menu slot="options" role="listbox">
        <sp-menu-item>
            Deselect
        </sp-menu-item>
        <sp-menu-item>
            Select Inverse
        </sp-menu-item>
        <sp-menu-item>
            Feather...
        </sp-menu-item>
        <sp-menu-item>
            Select and Mask...
        </sp-menu-item>
        <sp-menu-divider></sp-menu-divider>
        <sp-menu-item>
            Save Selection
        </sp-menu-item>
        <sp-menu-item disabled>
            Make Work Path
        </sp-menu-item>
    </sp-menu>
</sp-dropdown>
```

### Disabled

<!-- prettier-ignore -->
```html
<sp-dropdown
    disabled
>
    Select a Country with a very long label, too long in fact
    <sp-menu slot="options" role="listbox">
        <sp-menu-item>
            Deselect
        </sp-menu-item>
        <sp-menu-item>
            Select Inverse
        </sp-menu-item>
        <sp-menu-item>
            Feather...
        </sp-menu-item>
        <sp-menu-item>
            Select and Mask...
        </sp-menu-item>
        <sp-menu-divider></sp-menu-divider>
        <sp-menu-item>
            Save Selection
        </sp-menu-item>
        <sp-menu-item disabled>
            Make Work Path
        </sp-menu-item>
    </sp-menu>
</sp-dropdown>
```

## Accessibility

An `sp-dropdown` parent will ensure that the wrapped `sp-menu` features a role of `listbox` and contains children with the role `option`. Upon focusing the `sp-dropdown` using `ArrowDown` will also open the menu while throwing focus into first selected (or unselected when none are selected) menu item for easy selecting of a new value.

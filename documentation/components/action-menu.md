## Overview

An `<sp-action-menu />` is simply an action button with a Popover. Use an `<sp-menu>` element to outline the items that will be made available to the user when interacting with the `sp-action-menu` element.

## Example

<!-- prettier-ignore -->
```html
<sp-action-menu
    label="More Actions"
>
    <sp-menu slot="options">
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
</sp-action-menu>
```

## Variants

### No Label

If you ommit the `label` attribtue, then only the ellipse icon will deplay while close.

<!-- prettier-ignore -->
```html

<sp-action-menu>
    <sp-menu slot="options">
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
</sp-action-menu>
```

## Accessibility

An `sp-action-menu` parent will ensure that the wrapped `sp-menu` features a role of `menu` and contains children with the role `menuitem`. Upon focusing the `sp-action-menu` using `ArrowDown` will also open the menu while throwing focus into first selected (or unselected when none are selected) menu item for easy selecting of a new value.

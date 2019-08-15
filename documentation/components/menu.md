## Overview

An `<sp-menu />` is used for creating a menu list. The various elements inside a menu are given as `<sp-menu-group/>`, `<sp-menu-item />`, or `<sp-menu-divider />`. Often a `<sp-menu />` element will appear in a `<sp-popover />` element so that it displays as a togglig menu.

## Example

<!-- prettier-ignore -->
```html
<sp-menu>
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
    <sp-menu-item>
        Save Selection
    </sp-menu-item>
    <sp-menu-item disabled>
        Make Work Path
    </sp-menu-item>
</sp-menu>
```

```html
<sp-popover open style="position: relative">
    <sp-menu>
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
        <sp-menu-item>
            Save Selection
        </sp-menu-item>
        <sp-menu-item disabled>
            Make Work Path
        </sp-menu-item>
    </sp-menu>
</sp-popover>
```

## Variants

### Menu Items

Menus are a collection of `<sp-menu-items />` that can be modified to be `disabled` or `selected`.

<!-- prettier-ignore -->
```html
<sp-menu>
    <sp-menu-item>
        Active Menu Item
    </sp-menu-item>
    <sp-menu-item disabled>
        Disabled Menu Item
    </sp-menu-item>
    <sp-menu-item selected>
        Selected Menu Item
    </sp-menu-item>
</sp-menu>
```

### Organization

The content of a menu can be organized by either adding `<sp-menu-divider />` elements to a flat list, or by labeling groups of items in a longer list with a `<sp-menu-group />` element which provides a slot for a group header; `[slot="header"]`.

<!-- prettier-ignore -->
```html
<sp-popover open style="position: relative">
    <sp-menu>
        <sp-menu-item>
            Menu Item 1a
        </sp-menu-item>
        <sp-menu-item>
            Menu Item 2a
        </sp-menu-item>
        <sp-menu-item>
            Menu Item 3a
        </sp-menu-item>
        <sp-menu-divider></sp-menu-divider>
        <sp-menu-item>
            Menu Item 1b
        </sp-menu-item>
        <sp-menu-item>
            Menu Item 2b
        </sp-menu-item>
    </sp-menu>
</sp-popover>
```

<!-- prettier-ignore -->
```html
<sp-popover open style="position: relative">
    <sp-menu>
        <sp-menu-group>
            <span slot="header">New York</span>
            <sp-menu-item>
                Central Park
            </sp-menu-item>
            <sp-menu-item>
                Prospect Park
            </sp-menu-item>
        </sp-menu-group>
        <sp-menu-divider></sp-menu-divider>
        <sp-menu-group>
            <span slot="header">San Fransisco</span>
            <sp-menu-item>
                Golden Gate Park
            </sp-menu-item>
            <sp-menu-item>
                Lake Merced Park
            </sp-menu-item>
        </sp-menu-group>
    </sp-menu>
</sp-popover>
```

## Accessibility

`<sp-menu />`, `<sp-menu-group />`, and `<sp-menu-item />` each deliver a different part of the wai-aria "menu" pattern and support the `menu`, `group`, and `menuitem` roles respectively. To support ease of keyboard navigation, only the first active _or_ first selected `<sp-menu-item />` can be accessed in the tab order. Once the focus has entered the menu the up and down arrow keys can be used to access the rest of the menu.

## Overview

An `<sp-menu />` is used for creating a menu list. The various elements inside a menu are given as `<sp-menu-group/>`, `<sp-menu-item />`, or `<sp-menu-divider />`.

## Variants

### Organization

The content of a menu can be organized by either adding `<sp-menu-divider />` elements to a flat list, or by labeling groups of items in a longer list with a `<sp-menu-group />` element which provides a slot for a group header; `[slot="header"]`.

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

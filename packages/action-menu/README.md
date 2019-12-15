## Overview

An `<sp-action-menu />` is simply an action button with a Popover. Use an `<sp-menu>` element to outline the items that will be made available to the user when interacting with the `sp-action-menu` element.

### Installation

```
npm install @spectrum-web-components/action-menu

# or

yarn add @spectrum-web-components/action-menu
```

## Example

<!-- prettier-ignore -->
```html
<sp-action-menu>
    More Actions
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

### No Visible Label

The visible label that is be provided via the default `<slot>` interface can be ommitted in preference of an icon only interface. In this context be sure that the `<sp-action-menu>` remains accessible to screen readers by applying the `label` attribute. This will apply an `aria-label` attribute of the same value to the `<botton>` element that toggles the menu list.

<!-- prettier-ignore -->
```html
<sp-action-menu label="More Actions">
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

### Alternate Icon

A custom icon can be supplied via the `icon` slot in order to replace the default meatballs icon.

<sp-icons-medium></sp-icons-medium>

<!-- prettier-ignore -->
```html
<sp-action-menu label="More Actions">
    <sp-icon slot="icon" size="xxs" name="ui:ChevronDownSmall"></sp-icon>
    Actions Under the Arrow
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

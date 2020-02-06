## Description

An `<sp-menu />` is used for creating a menu list. The various elements inside a menu are given as `<sp-menu-group/>`, `<sp-menu-item />`, or `<sp-menu-divider />`. Often a `<sp-menu />` element will appear in a `<sp-popover />` element so that it displays as a togglig menu.

### Installation

```
npm install @spectrum-web-components/menu

# or

yarn add @spectrum-web-components/menu
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
</sp-popover>
```

## Accessibility

`<sp-menu />`, `<sp-menu-group />`, and `<sp-menu-item />` each deliver a different part of the wai-aria "menu" pattern and support the `menu`, `group`, and `menuitem` roles respectively. To support ease of keyboard navigation, only the first active _or_ first selected `<sp-menu-item />` can be accessed in the tab order. Once the focus has entered the menu the up and down arrow keys can be used to access the rest of the menu.

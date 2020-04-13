# `Action menu`

#### `loads`

```html
<sp-menu role="menu">
    <sp-menu-item data-js-focus-visible="" role="menuitem" tabindex="0">
        Deselect
    </sp-menu-item>
    <sp-menu-item data-js-focus-visible="" role="menuitem" tabindex="-1">
        Select Inverse
    </sp-menu-item>
    <sp-menu-item data-js-focus-visible="" role="menuitem" tabindex="-1">
        Feather...
    </sp-menu-item>
    <sp-menu-item data-js-focus-visible="" role="menuitem" tabindex="-1">
        Select and Mask...
    </sp-menu-item>
    <sp-menu-divider role="separator"></sp-menu-divider>
    <sp-menu-item data-js-focus-visible="" role="menuitem" tabindex="-1">
        Save Selection
    </sp-menu-item>
    <sp-menu-item
        aria-disabled="true"
        data-js-focus-visible=""
        disabled=""
        role="menuitem"
        tabindex="-1"
    >
        Make Work Path
    </sp-menu-item>
</sp-menu>
```

```html
<button aria-haspopup="true" id="button" tabindex="0">
    <slot name="icon"></slot>
    <div hidden="" id="label">
        <slot id="slot" name="label"></slot>
    </div>
</button>
<sp-popover id="popover" open="" placement="none"></sp-popover>
```

#### `loads - [label]`

```html
<sp-menu role="menu">
    <sp-menu-item data-js-focus-visible="" role="menuitem" tabindex="0">
        Deselect
    </sp-menu-item>
    <sp-menu-item data-js-focus-visible="" role="menuitem" tabindex="-1">
        Select Inverse
    </sp-menu-item>
    <sp-menu-item data-js-focus-visible="" role="menuitem" tabindex="-1">
        Feather...
    </sp-menu-item>
    <sp-menu-item data-js-focus-visible="" role="menuitem" tabindex="-1">
        Select and Mask...
    </sp-menu-item>
    <sp-menu-divider role="separator"></sp-menu-divider>
    <sp-menu-item data-js-focus-visible="" role="menuitem" tabindex="-1">
        Save Selection
    </sp-menu-item>
    <sp-menu-item
        aria-disabled="true"
        data-js-focus-visible=""
        disabled=""
        role="menuitem"
        tabindex="-1"
    >
        Make Work Path
    </sp-menu-item>
</sp-menu>
```

```html
<button aria-haspopup="true" aria-label="More Actions" id="button" tabindex="0">
    <slot name="icon"></slot>
    <div hidden="" id="label">
        <slot id="slot" name="label"></slot>
    </div>
</button>
<sp-popover id="popover" open="" placement="none"></sp-popover>
```

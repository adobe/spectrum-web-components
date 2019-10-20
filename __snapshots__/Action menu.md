# `Action menu`

#### `loads`

```html
<sp-menu role="listbox" slot="options">
    <sp-menu-item role="menuitem" tabindex="-1">
        Deselect
    </sp-menu-item>
    <sp-menu-item role="menuitem" tabindex="-1">
        Select Inverse
    </sp-menu-item>
    <sp-menu-item role="menuitem" tabindex="-1">
        Feather...
    </sp-menu-item>
    <sp-menu-item role="menuitem" tabindex="-1">
        Select and Mask...
    </sp-menu-item>
    <sp-menu-divider role="separator"></sp-menu-divider>
    <sp-menu-item role="menuitem" tabindex="-1">
        Save Selection
    </sp-menu-item>
    <sp-menu-item
        aria-disabled="true"
        disabled=""
        role="menuitem"
        tabindex="-1"
    >
        Make Work Path
    </sp-menu-item>
</sp-menu>
```

```html
<sp-icons-medium style="display: none;"></sp-icons-medium>
<button aria-haspopup="true" id="button" tabindex="0">
    <slot name="icon"></slot>
    <div hidden="" id="label">
        <slot id="slot"></slot>
    </div>
</button>
<sp-popover direction="bottom" id="popover">
    <slot name="options">
        <sp-menu-item
            aria-disabled="true"
            disabled=""
            role="menuitem"
            tabindex="-1"
        >
            There are no options currently available.
        </sp-menu-item>
    </slot>
</sp-popover>
```

#### `loads - [label]`

```html
<sp-menu role="listbox" slot="options">
    <sp-menu-item role="menuitem" tabindex="-1">
        Deselect
    </sp-menu-item>
    <sp-menu-item role="menuitem" tabindex="-1">
        Select Inverse
    </sp-menu-item>
    <sp-menu-item role="menuitem" tabindex="-1">
        Feather...
    </sp-menu-item>
    <sp-menu-item role="menuitem" tabindex="-1">
        Select and Mask...
    </sp-menu-item>
    <sp-menu-divider role="separator"></sp-menu-divider>
    <sp-menu-item role="menuitem" tabindex="-1">
        Save Selection
    </sp-menu-item>
    <sp-menu-item
        aria-disabled="true"
        disabled=""
        role="menuitem"
        tabindex="-1"
    >
        Make Work Path
    </sp-menu-item>
</sp-menu>
```

```html
<sp-icons-medium style="display: none;"></sp-icons-medium>
<button aria-haspopup="true" aria-label="More Actions" id="button" tabindex="0">
    <slot name="icon"></slot>
    <div hidden="" id="label">
        <slot id="slot"></slot>
    </div>
</button>
<sp-popover direction="bottom" id="popover">
    <slot name="options">
        <sp-menu-item
            aria-disabled="true"
            disabled=""
            role="menuitem"
            tabindex="-1"
        >
            There are no options currently available.
        </sp-menu-item>
    </slot>
</sp-popover>
```

# `Dropdown`

#### `loads`

```html
Select a Country with a very long label, too long in fact
<sp-menu role="listbox" slot="options">
    <sp-menu-item data-js-focus-visible="" role="option" tabindex="0">
        Deselect
    </sp-menu-item>
    <sp-menu-item
        data-js-focus-visible=""
        role="option"
        tabindex="-1"
        value="option-2"
    >
        Select Inverse
    </sp-menu-item>
    <sp-menu-item data-js-focus-visible="" role="option" tabindex="-1">
        Feather...
    </sp-menu-item>
    <sp-menu-item data-js-focus-visible="" role="option" tabindex="-1">
        Select and Mask...
    </sp-menu-item>
    <sp-menu-divider role="separator"></sp-menu-divider>
    <sp-menu-item data-js-focus-visible="" role="option" tabindex="-1">
        Save Selection
    </sp-menu-item>
    <sp-menu-item
        aria-disabled="true"
        data-js-focus-visible=""
        disabled=""
        role="option"
        tabindex="-1"
    >
        Make Work Path
    </sp-menu-item>
</sp-menu>
```

```html
<sp-icons-medium style="display: none;"></sp-icons-medium>
<button aria-haspopup="true" id="button" tabindex="0">
    <div class="placeholder" id="label">
        <slot></slot>
    </div>
    <sp-icon
        class="chevron-down-medium dropdown icon"
        name="ui:ChevronDownMedium"
        size="s"
    ></sp-icon>
</button>
<sp-popover direction="bottom" id="popover">
    <slot name="options">
        <sp-menu-item
            aria-disabled="true"
            data-js-focus-visible=""
            disabled=""
            role="option"
            tabindex="-1"
        >
            There are no options currently available.
        </sp-menu-item>
    </slot>
</sp-popover>
```

#### `renders invalid`

```html
Select a Country with a very long label, too long in fact
<sp-menu role="listbox" slot="options">
    <sp-menu-item data-js-focus-visible="" role="option" tabindex="0">
        Deselect
    </sp-menu-item>
    <sp-menu-item
        data-js-focus-visible=""
        role="option"
        tabindex="-1"
        value="option-2"
    >
        Select Inverse
    </sp-menu-item>
    <sp-menu-item data-js-focus-visible="" role="option" tabindex="-1">
        Feather...
    </sp-menu-item>
    <sp-menu-item data-js-focus-visible="" role="option" tabindex="-1">
        Select and Mask...
    </sp-menu-item>
    <sp-menu-divider role="separator"></sp-menu-divider>
    <sp-menu-item data-js-focus-visible="" role="option" tabindex="-1">
        Save Selection
    </sp-menu-item>
    <sp-menu-item
        aria-disabled="true"
        data-js-focus-visible=""
        disabled=""
        role="option"
        tabindex="-1"
    >
        Make Work Path
    </sp-menu-item>
</sp-menu>
```

```html
<sp-icons-medium style="display: none;"></sp-icons-medium>
<button aria-haspopup="true" id="button" tabindex="0">
    <div class="placeholder" id="label">
        <slot></slot>
    </div>
    <sp-icon class="alert-small icon" name="ui:AlertSmall" size="s"></sp-icon>
    <sp-icon
        class="chevron-down-medium dropdown icon"
        name="ui:ChevronDownMedium"
        size="s"
    ></sp-icon>
</button>
<sp-popover direction="bottom" id="popover">
    <slot name="options">
        <sp-menu-item
            aria-disabled="true"
            data-js-focus-visible=""
            disabled=""
            role="option"
            tabindex="-1"
        >
            There are no options currently available.
        </sp-menu-item>
    </slot>
</sp-popover>
```

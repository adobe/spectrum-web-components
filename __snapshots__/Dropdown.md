# `Dropdown`

#### `loads`

```html
<sp-menu-item data-js-focus-visible="" role="option" tabindex="-1">
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
```

```html
<sp-icons-medium style="display: none;"></sp-icons-medium>
<button
    aria-haspopup="true"
    aria-label="Select a Country with a very long label, too long in fact"
    id="button"
    tabindex="0"
>
    <div class="placeholder" id="label">
        <slot name="label">
            Select a Country with a very long label, too long in fact
        </slot>
    </div>
    <sp-icon
        class="chevron-down-medium dropdown icon"
        name="ui:ChevronDownMedium"
        size="s"
    ></sp-icon>
</button>
<sp-popover id="popover" open="" placement="none">
    <sp-menu role="listbox">
        <sp-menu-item
            data-js-focus-visible=""
            role="option"
            tabindex="0"
            value="Deselect"
        >
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
        <sp-menu-item
            data-js-focus-visible=""
            role="option"
            tabindex="-1"
            value="Feather..."
        >
            Feather...
        </sp-menu-item>
        <sp-menu-item
            data-js-focus-visible=""
            role="option"
            tabindex="-1"
            value="Select and Mask..."
        >
            Select and Mask...
        </sp-menu-item>
        <sp-menu-divider role="separator"></sp-menu-divider>
        <sp-menu-item
            data-js-focus-visible=""
            role="option"
            tabindex="-1"
            value="Save Selection"
        >
            Save Selection
        </sp-menu-item>
        <sp-menu-item
            aria-disabled="true"
            data-js-focus-visible=""
            disabled=""
            role="option"
            tabindex="-1"
            value="Make Work Path"
        >
            Make Work Path
        </sp-menu-item>
    </sp-menu>
</sp-popover>
<slot hidden=""></slot>
```

#### `renders invalid`

```html
<sp-menu-item data-js-focus-visible="" role="option" tabindex="-1">
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
```

```html
<sp-icons-medium style="display: none;"></sp-icons-medium>
<button
    aria-haspopup="true"
    aria-label="Select a Country with a very long label, too long in fact"
    id="button"
    tabindex="0"
>
    <div class="placeholder" id="label">
        <slot name="label">
            Select a Country with a very long label, too long in fact
        </slot>
    </div>
    <sp-icon class="alert-small icon" name="ui:AlertSmall" size="s"></sp-icon>
    <sp-icon
        class="chevron-down-medium dropdown icon"
        name="ui:ChevronDownMedium"
        size="s"
    ></sp-icon>
</button>
<sp-popover id="popover" open="" placement="none">
    <sp-menu role="listbox">
        <sp-menu-item
            data-js-focus-visible=""
            role="option"
            tabindex="0"
            value="Deselect"
        >
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
        <sp-menu-item
            data-js-focus-visible=""
            role="option"
            tabindex="-1"
            value="Feather..."
        >
            Feather...
        </sp-menu-item>
        <sp-menu-item
            data-js-focus-visible=""
            role="option"
            tabindex="-1"
            value="Select and Mask..."
        >
            Select and Mask...
        </sp-menu-item>
        <sp-menu-divider role="separator"></sp-menu-divider>
        <sp-menu-item
            data-js-focus-visible=""
            role="option"
            tabindex="-1"
            value="Save Selection"
        >
            Save Selection
        </sp-menu-item>
        <sp-menu-item
            aria-disabled="true"
            data-js-focus-visible=""
            disabled=""
            role="option"
            tabindex="-1"
            value="Make Work Path"
        >
            Make Work Path
        </sp-menu-item>
    </sp-menu>
</sp-popover>
<slot hidden=""></slot>
```

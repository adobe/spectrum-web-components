# `Dropdown`

#### `loads`

```html
<sp-menu role="listbox">
  <sp-menu-item
    data-js-focus-visible=""
    role="option"
    tabindex="0"
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
  >
    Feather...
  </sp-menu-item>
  <sp-menu-item
    data-js-focus-visible=""
    role="option"
    tabindex="-1"
  >
    Select and Mask...
  </sp-menu-item>
  <sp-menu-divider role="separator">
  </sp-menu-divider>
  <sp-menu-item
    data-js-focus-visible=""
    role="option"
    tabindex="-1"
  >
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
<button
  aria-haspopup="true"
  aria-label="Select a Country with a very long label, too long in fact"
  id="button"
  tabindex="0"
>
  <div
    class="placeholder"
    id="label"
  >
    <slot name="label">
      Select a Country with a very long label, too long in fact
    </slot>
  </div>
  <sp-icon
    class="chevron-down-medium dropdown icon"
    size="s"
  >
  </sp-icon>
</button>
<sp-popover
  id="popover"
  open=""
  placement="none"
>
</sp-popover>
```


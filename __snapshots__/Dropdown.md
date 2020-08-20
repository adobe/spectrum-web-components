# `Dropdown`

#### `loads`

```html
<sp-menu
  dir="ltr"
  role="listbox"
  tabindex="0"
>
  <sp-menu-item
    data-js-focus-visible=""
    dir="ltr"
    role="option"
    tabindex="0"
  >
    Deselect
  </sp-menu-item>
  <sp-menu-item
    data-js-focus-visible=""
    dir="ltr"
    role="option"
    tabindex="-1"
    value="option-2"
  >
    Select Inverse
  </sp-menu-item>
  <sp-menu-item
    data-js-focus-visible=""
    dir="ltr"
    role="option"
    tabindex="-1"
  >
    Feather...
  </sp-menu-item>
  <sp-menu-item
    data-js-focus-visible=""
    dir="ltr"
    role="option"
    tabindex="-1"
  >
    Select and Mask...
  </sp-menu-item>
  <sp-menu-divider
    dir="ltr"
    role="separator"
  >
  </sp-menu-divider>
  <sp-menu-item
    data-js-focus-visible=""
    dir="ltr"
    role="option"
    tabindex="-1"
  >
    Save Selection
  </sp-menu-item>
  <sp-menu-item
    aria-disabled="true"
    data-js-focus-visible=""
    dir="ltr"
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
  class="button"
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
    dir="ltr"
    size="s"
  >
  </sp-icon>
</button>
<sp-popover
  dir="ltr"
  id="popover"
  open=""
  placement="none"
>
</sp-popover>

```


# Action Menu migration roadmap

## Component specifications

### CSS

Action Menu does not have its own CSS component. It is a composite pattern that combines Action Button, Popover, and Menu components.

<details>
<summary>CSS selectors</summary>

None found for this component.

</details>

<details>
<summary>Passthroughs</summary>

None found for this component.

</details>

<details>
<summary>Modifiers</summary>

None found for this component.

</details>

### SWC

<details>
<summary>Attributes</summary>

- `selects` - By default sp-action-menu does not manage a selection. If you'd like for a selection to be held by the sp-menu that it presents in its overlay, use selects="single" to activate this functionality
- `static-color` - white
- `static-color` - black
- `quiet` (inherited from PickerBase)
- `disabled` (inherited from PickerBase)
- `invalid` (inherited from PickerBase)
- `label` (inherited from PickerBase)
- `open` (inherited from PickerBase)
- `size` (inherited from SizedMixin)

</details>

<details>
<summary>Slots</summary>

- Default slot - menu items to be listed in the Action Menu
- `icon` - The icon to use for the Action Menu
- `label` - The label to use for the Action Menu
- `label-only` - The label to use for the Action Menu (no icon space reserved)
- `tooltip` - Tooltip to be applied to the Action Button

</details>

## Comparison

### DOM structure changes

<details>
<summary>Spectrum Web Components:</summary>

```html
<sp-action-menu>
  <sp-action-button
    aria-describedby="..."
    ?quiet=${this.quiet}
    ?selected=${this.open}
    static-color=${ifDefined(this.staticColor)}
    aria-haspopup="true"
    aria-controls=${ifDefined(this.open ? 'menu' : undefined)}
    aria-expanded=${this.open ? 'true' : 'false'}
    aria-label=${ifDefined(this.label || undefined)}
    id="button"
    class="button"
    size=${this.size}
    ?disabled=${this.disabled}
  >
    <slot name="icon" slot="icon" ?icon-only=${!this.hasLabel} ?hidden=${this.labelOnly}>
      <sp-icon-more class="icon" size=${this.size}></sp-icon-more>
    </slot>
    <slot name="label" ?hidden=${!this.hasLabel}></slot>
    <slot name="label-only"></slot>
  </sp-action-button>
  <slot name="tooltip"></slot>
  <!-- renderMenu -->
  <!-- renderDescriptionSlot -->
</sp-action-menu>
```

</details>

<details>
<summary>Legacy (CSS main branch):</summary>

```html
<!-- Action Menu is a composite pattern in CSS -->
<div class="spectrum-Popover" data-testid="actionmenu" id="actionmenu-...">
  <button
    class="spectrum-ActionButton spectrum-ActionButton--size..."
    aria-haspopup="menu"
    id="actionmenu-trigger-..."
  >
    <svg class="spectrum-Icon spectrum-Icon--size... spectrum-ActionButton-icon">
      <!-- More icon -->
    </svg>
  </button>
  <ul class="spectrum-Menu spectrum-Menu--size...">
    <!-- Menu items -->
  </ul>
</div>
```

</details>

<details>
<summary>Spectrum 2 (CSS spectrum-two branch):</summary>

```html
<!-- Action Menu is a composite pattern in CSS -->
<div class="spectrum-Popover" data-testid="actionmenu" id="actionmenu-...">
  <button
    class="spectrum-ActionButton spectrum-ActionButton--size..."
    aria-haspopup="menu"
    id="actionmenu-trigger-..."
  >
    <svg class="spectrum-Icon spectrum-Icon--size... spectrum-ActionButton-icon">
      <!-- More icon -->
    </svg>
  </button>
  <ul class="spectrum-Menu spectrum-Menu--size...">
    <!-- Menu items -->
  </ul>
</div>
```

</details>

### CSS => SWC mapping

Action Menu does not have dedicated CSS selectors. It is implemented as a composition of:
- Action Button (trigger)
- Popover (container)
- Menu (content)

| CSS selector | Attribute or slot | Status |
|-------------|------------------|--------|
| N/A | `selects` | Missing from CSS |
| N/A | `static-color` | Missing from CSS |
| N/A | `quiet` | Missing from CSS |
| N/A | `disabled` | Missing from CSS |
| N/A | `label` | Missing from CSS |
| N/A | `open` | Missing from CSS |
| N/A | `size` | Missing from CSS |
| N/A | `icon` slot | Missing from CSS |
| N/A | `label` slot | Missing from CSS |
| N/A | `label-only` slot | Missing from CSS |
| N/A | `tooltip` slot | Missing from CSS |
| N/A | Default slot (menu items) | Missing from CSS |

## Summary of changes

### CSS => SWC implementation gaps

Action Menu is a composite pattern, not a standalone component in CSS. In Spectrum CSS, Action Menu is implemented by combining:
1. An Action Button as the trigger
2. A Popover as the container
3. A Menu for the content

In Spectrum Web Components, Action Menu is a dedicated component (`<sp-action-menu>`) that manages these three elements internally. This provides a simpler, more cohesive API for developers.

All WC-specific attributes and slots listed as "Missing from CSS" are implementation details of the web component abstraction and don't have direct CSS equivalents since CSS implements this as separate components.

### CSS Spectrum 2 changes

No changes between CSS main and spectrum-two branches for Action Menu template structure. Both branches implement Action Menu identically as a composite pattern using Action Button, Popover, and Menu.

## Resources

- [CSS migration]()
- [Spectrum 2 preview]()
- [React]()

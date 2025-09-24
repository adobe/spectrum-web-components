# Swatch migration roadmap

## Component specifications

### CSS

<details>
<summary>CSS selectors</summary>

- `.spectrum-Swatch`
- `.spectrum-Swatch .spectrum-Swatch-disabledIcon`
- `.spectrum-Swatch .spectrum-Swatch-fill`
- `.spectrum-Swatch--rectangle`
- `.spectrum-Swatch--roundingFull.is-selected:not(.spectrum-Swatch--rectangle) .spectrum-Swatch-fill`
- `.spectrum-Swatch--roundingFull.is-selected:not(.spectrum-Swatch--rectangle) .spectrum-Swatch-fill:before`
- `.spectrum-Swatch--roundingFull:not(.spectrum-Swatch--rectangle)`
- `.spectrum-Swatch--roundingFull:not(.spectrum-Swatch--rectangle) .spectrum-Swatch-fill`
- `.spectrum-Swatch--roundingFull:not(.spectrum-Swatch--rectangle) .spectrum-Swatch-fill:before`
- `.spectrum-Swatch--roundingFull:not(.spectrum-Swatch--rectangle):after`
- `.spectrum-Swatch--roundingFull:not(.spectrum-Swatch--rectangle):before`
- `.spectrum-Swatch--roundingNone`
- `.spectrum-Swatch--roundingNone .spectrum-Swatch-fill`
- `.spectrum-Swatch--roundingNone .spectrum-Swatch-fill:before`
- `.spectrum-Swatch--roundingNone.is-selected .spectrum-Swatch-fill`
- `.spectrum-Swatch--roundingNone.is-selected .spectrum-Swatch-fill:before`
- `.spectrum-Swatch--roundingNone:after`
- `.spectrum-Swatch--roundingNone:before`
- `.spectrum-Swatch--sizeL`
- `.spectrum-Swatch--sizeS`
- `.spectrum-Swatch--sizeXS`
- `.spectrum-Swatch-disabledIcon`
- `.spectrum-Swatch-disabledIcon path:first-child`
- `.spectrum-Swatch-disabledIcon path:last-child`
- `.spectrum-Swatch-fill`
- `.spectrum-Swatch-fill:before`
- `.spectrum-Swatch-icon`
- `.spectrum-Swatch-image`
- `.spectrum-Swatch.is-addSwatch`
- `.spectrum-Swatch.is-addSwatch .spectrum-Swatch-fill`
- `.spectrum-Swatch.is-addSwatch .spectrum-Swatch-icon`
- `.spectrum-Swatch.is-addSwatch.is-keyboardFocused`
- `.spectrum-Swatch.is-addSwatch:active`
- `.spectrum-Swatch.is-addSwatch:focus-visible`
- `.spectrum-Swatch.is-addSwatch:hover`
- `.spectrum-Swatch.is-disabled`
- `.spectrum-Swatch.is-disabled .spectrum-Swatch-disabledIcon`
- `.spectrum-Swatch.is-image .spectrum-Swatch-fill:before`
- `.spectrum-Swatch.is-keyboardFocused`
- `.spectrum-Swatch.is-mixedValue`
- `.spectrum-Swatch.is-mixedValue .spectrum-Swatch-fill`
- `.spectrum-Swatch.is-mixedValue .spectrum-Swatch-icon`
- `.spectrum-Swatch.is-nothing.spectrum-Swatch--rectangle:not(.spectrum-Swatch.is-mixedValue, .spectrum-Swatch.is-addSwatch) .spectrum-Swatch-fill:after`
- `.spectrum-Swatch.is-nothing:not(.spectrum-Swatch.is-mixedValue, .spectrum-Swatch.is-addSwatch) .spectrum-Swatch-fill`
- `.spectrum-Swatch.is-nothing:not(.spectrum-Swatch.is-mixedValue, .spectrum-Swatch.is-addSwatch) .spectrum-Swatch-fill:after`
- `.spectrum-Swatch.is-selected`
- `.spectrum-Swatch.is-selected .spectrum-Swatch-fill`
- `.spectrum-Swatch.is-selected .spectrum-Swatch-fill:before`
- `.spectrum-Swatch.is-selected:before`
- `.spectrum-Swatch:before`
- `.spectrum-Swatch:focus-visible`
- `.spectrum-Swatch[disabled]`
- `.spectrum-Swatch[disabled] .spectrum-Swatch-disabledIcon`

</details>

<details>
<summary>Passthroughs</summary>

None found for this component.

</details>

<details>
<summary>Modifiers</summary>

- `--mod-add-button-background`
- `--mod-add-button-background-down`
- `--mod-add-button-background-hover`
- `--mod-add-button-background-keyboard-focus`
- `--mod-animation-duration-100`
- `--mod-corner-radius-full`
- `--mod-mixed-button-background`
- `--mod-swatch-border`
- `--mod-swatch-border-color`
- `--mod-swatch-border-color-selected`
- `--mod-swatch-border-opacity`
- `--mod-swatch-border-radius`
- `--mod-swatch-border-thickness`
- `--mod-swatch-border-thickness-selected`
- `--mod-swatch-disabled-icon-color`
- `--mod-swatch-disabled-icon-size`
- `--mod-swatch-focus-indicator-color`
- `--mod-swatch-focus-indicator-gap`
- `--mod-swatch-focus-indicator-thickness`
- `--mod-swatch-icon-border-color`
- `--mod-swatch-icon-color`
- `--mod-swatch-inner-border-color-selected`
- `--mod-swatch-size`
- `--mod-swatch-slash-icon-color`
- `--mod-swatch-slash-thickness`

</details>

### SWC

<details>
<summary>Attributes</summary>

- `border` (string) - Border style: 'light', 'none'
- `color` (string) - Color value for the swatch
- `label` (string) - Label for the swatch
- `mixed-value` (boolean) - Whether the swatch represents a mixed value
- `nothing` (boolean) - Whether the swatch represents no value
- `role` (string) - ARIA role, defaults to 'button'
- `rounding` (string) - Corner rounding: 'none', 'full'
- `selected` (boolean) - Whether the swatch is selected
- `shape` (string) - Shape variant: 'rectangle'
- `size` (string) - Size: 'xs', 's', 'm', 'l'
- `value` (string) - Value of the swatch (computed from color or label)

</details>

<details>
<summary>Slots</summary>

- `image` slot - Image element for the swatch

</details>

## Comparison

### DOM Structure changes

<details>
<summary>Spectrum Web Components</summary>

```html
<div class="opacity-checkerboard fill" style="--spectrum-picked-color: [color]">
    <slot name="image"></slot>
    <!-- Disabled icon SVG when disabled -->
    <!-- Mixed value icon when mixed-value -->
</div>
```

</details>

<details>
<summary>Legacy (CSS main branch)</summary>

```html
<div
    class="spectrum-Swatch spectrum-Swatch--sizeM spectrum-Swatch--roundingRegular is-selected is-disabled is-hover is-active is-keyboardFocused is-image is-mixedValue is-addSwatch spectrum-Swatch--rectangle is-nothing"
    disabled
    id="[id]"
    style="--spectrum-picked-color: [swatchColor]"
    tabindex="0"
>
    <!-- With image -->
    <div class="spectrum-Swatch-fill">
        <img src="[imageUrl]" alt="" class="spectrum-Swatch-image" />
    </div>

    <!-- Without image -->
    <div class="spectrum-Swatch-fill">
        <!-- Disabled icon SVG -->
        <!-- Mixed value icon -->
        <!-- Add swatch icon -->
    </div>
</div>
```

</details>

<details>
<summary>Spectrum 2 (CSS spectrum-two branch)</summary>

```html
<div
    class="spectrum-Swatch spectrum-Swatch--sizeM spectrum-Swatch--roundingRegular is-selected is-disabled is-hover is-active is-keyboardFocused is-image is-mixedValue is-addSwatch spectrum-Swatch--rectangle is-nothing"
    disabled
    id="[id]"
    style="--spectrum-picked-color: [swatchColor]"
    tabindex="0"
>
    <!-- With image -->
    <div class="spectrum-Swatch-fill">
        <img src="[imageUrl]" alt="" class="spectrum-Swatch-image" />
    </div>

    <!-- Without image -->
    <div class="spectrum-Swatch-fill">
        <!-- Disabled icon SVG -->
        <!-- Mixed value icon -->
        <!-- Add swatch icon -->
    </div>
</div>
```

</details>

<details>
<summary>Diff: Legacy (CSS main) → Spectrum 2 (CSS spectrum-two)</summary>

No significant structural changes.

</details>

### CSS => SWC mapping

| CSS selector                          | Attribute or slot        | Status          |
| ------------------------------------- | ------------------------ | --------------- |
| `.spectrum-Swatch--sizeXS`            | `size="xs"`              | Implemented     |
| `.spectrum-Swatch--sizeS`             | `size="s"`               | Implemented     |
| `.spectrum-Swatch--sizeM`             | `size="m"`               | Implemented     |
| `.spectrum-Swatch--sizeL`             | `size="l"`               | Implemented     |
| `.spectrum-Swatch--roundingNone`      | `rounding="none"`        | Implemented     |
| `.spectrum-Swatch--roundingFull`      | `rounding="full"`        | Implemented     |
| `.spectrum-Swatch--rectangle`         | `shape="rectangle"`      | Implemented     |
| `.spectrum-Swatch.is-selected`        | `selected` attribute     | Implemented     |
| `.spectrum-Swatch.is-disabled`        | `disabled` attribute     | Implemented     |
| `.spectrum-Swatch.is-mixedValue`      | `mixed-value` attribute  | Implemented     |
| `.spectrum-Swatch.is-addSwatch`       | Add swatch functionality | Missing from WC |
| `.spectrum-Swatch.is-nothing`         | `nothing` attribute      | Implemented     |
| `.spectrum-Swatch.is-keyboardFocused` | Focus state              | Missing from WC |
| `.spectrum-Swatch.is-hover`           | Hover state              | Missing from WC |
| `.spectrum-Swatch.is-active`          | Active state             | Missing from WC |
| `.spectrum-Swatch.is-image`           | Image state              | Missing from WC |
| `.spectrum-Swatch-image`              | `image` slot             | Implemented     |
| `.spectrum-Swatch-fill`               | Internal wrapper         | Implemented     |
| `.spectrum-Swatch-icon`               | Icon elements            | Implemented     |
| `.spectrum-Swatch-disabledIcon`       | Disabled icon            | Implemented     |
| `.spectrum-Swatch:before`             | Pseudo-element styling   | Missing from WC |
| `.spectrum-Swatch:after`              | Pseudo-element styling   | Missing from WC |
| `.spectrum-Swatch:focus-visible`      | Focus styling            | Missing from WC |

## Summary of changes

### CSS => SWC implementation gaps

**CSS features missing from Web Component:**

- Add swatch functionality (`.spectrum-Swatch.is-addSwatch`)
- Focus state support (`.spectrum-Swatch.is-keyboardFocused`)
- Hover state support (`.spectrum-Swatch.is-hover`)
- Active state support (`.spectrum-Swatch.is-active`)
- Image state support (`.spectrum-Swatch.is-image`)
- Pseudo-element styling (`:before`, `:after` selectors)
- Focus styling (`:focus-visible`)

**Web Component features missing from CSS:**

None found for this component.

### CSS Spectrum 2 changes

There is a new add swatch functionality in the `spectrum-two` branch.

## Resources

- [CSS migration](https://github.com/adobe/spectrum-css/pull/3677)
- [Spectrum 2 preview](https://spectrumcss.z13.web.core.windows.net/pr-2352/index.html?path=/docs/components-swatch--docs)
- [React](https://react-spectrum.adobe.com/s2/index.html?path=/docs/colorswatch--docs)

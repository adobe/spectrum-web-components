# Swatch migration roadmap

## Component specifications

### CSS

<details>
<summary>CSS selectors</summary>

**Root class**: `.spectrum-Swatch`

**Elements**:

- `.spectrum-Swatch:before`
- `.spectrum-Swatch:after`
- `.spectrum-Swatch-icon`
- `.spectrum-Swatch-image`
- `.spectrum-Swatch-disabledIcon` - visible only when the swatch is disabled
    - `.spectrum-Swatch-disabledIcon path:first-child`
    - `.spectrum-Swatch-disabledIcon path:last-child`
- `.spectrum-Swatch-fill`
    - `.spectrum-Swatch-fill:before`

**Variants**:

- **Rounding**:
    - `.spectrum-Swatch--rectangle`
    - `.spectrum-Swatch--roundingFull`
    - `.spectrum-Swatch--roundingNone`
- **Size**:
    - `.spectrum-Swatch--sizeXS`
    - `.spectrum-Swatch--sizeS`
    - (medium is the default)
    - `.spectrum-Swatch--sizeL`
- `.is-addSwatch`
- `.is-image`
- `.is-mixedValue`
- `.is-nothing`

**States**:

- `.is-disabled`, `[disabled]`
- `.is-focused`, `:focus-visible`
- `.is-keyboardFocused`
- `.is-selected`
- `.is-hover`, `:hover`
- `.is-active`, `:active`

</details>

<details>
<summary>Passthroughs</summary>

None found for this component.

</details>

<details>
<summary>Modifiers *deprecated*</summary>

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
- `disabled` (boolean) - Whether the swatch is disabled
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

| CSS selector                     | Attribute or slot        | Status                                     |
| -------------------------------- | ------------------------ | ------------------------------------------ |
| `.spectrum-Swatch--sizeXS`       | `size="xs"`              | Implemented                                |
| `.spectrum-Swatch--sizeS`        | `size="s"`               | Implemented                                |
| `.spectrum-Swatch--sizeM`        | `size="m"`               | Implemented                                |
| `.spectrum-Swatch--sizeL`        | `size="l"`               | Implemented                                |
| `.spectrum-Swatch--roundingNone` | `rounding="none"`        | Implemented                                |
| `.spectrum-Swatch--roundingFull` | `rounding="full"`        | Implemented                                |
| `.spectrum-Swatch--rectangle`    | `shape="rectangle"`      | Implemented                                |
| `.is-selected`                   | `selected` attribute     | Implemented                                |
| `.is-disabled`                   | `disabled` attribute     | Implemented                                |
| `.is-mixedValue`                 | `mixed-value` attribute  | Implemented                                |
| `.spectrum-Swatch--lightBorder`  | `border` attribute       | **Deprecated**                             |
| `.is-addSwatch`                  | Add swatch functionality | Missing from WC (new for S2)               |
| `.is-nothing`                    | `nothing` attribute      | Implemented                                |
| `.is-keyboardFocused`            | Focus state              | Implemented                                |
| `.is-hover`, `:hover`            | Hover state              | Implemented                                |
| `.is-active`, `:active`          | Active state             | Implemented                                |
| `:focus-visible`                 | Focus styling            | Implemented                                |
| `.is-image`                      | `image` slot not empty   | Might need additional hooks or logic in WC |
| `.spectrum-Swatch-image`         | `image` slot             | Implemented                                |
| `.spectrum-Swatch-fill`          | Internal wrapper         | Implemented                                |
| `.spectrum-Swatch-icon`          | Icon elements            | Implemented                                |
| `.spectrum-Swatch-disabledIcon`  | Disabled icon            | Implemented                                |
| `.spectrum-Swatch:before`        | Pseudo-element styling   | Implemented                                |
| `.spectrum-Swatch:after`         | Pseudo-element styling   | Implemented                                |

## Summary of changes

### CSS => SWC implementation gaps

**CSS features missing from Web Component:**

- Add swatch functionality (`.is-addSwatch`)
- Image functionality (SWC has an image slot, but this may need additional updates to work properly)

**Web Component features missing from CSS:**

None found for this component.

### CSS Spectrum 2 changes

There is a new **add swatch** functionality in the `spectrum-two` branch and supplemental state and pseudo-element styling selectors in the `spectrum-two` branch which will automatically be applied when consumed by the web component for Spectrum 2.

The light and no border variants have been removed. Individual swatches have a border set to `--spectrum-gray-1000` at 42% opacity, while the border opacity is set to 20% in swatch groups.

## Resources

- [CSS migration](https://github.com/adobe/spectrum-css/pull/3677)
- [Spectrum 2 preview](https://spectrumcss.z13.web.core.windows.net/pr-2352/index.html?path=/docs/components-swatch--docs)
- [React](https://react-spectrum.adobe.com/s2/index.html?path=/docs/colorswatch--docs)

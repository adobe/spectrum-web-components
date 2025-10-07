# Slider migration roadmap

## Component specifications

### CSS

<details>
<summary>CSS selectors</summary>

- `.spectrum-Slider`

**Subcomponents:**

- `.spectrum-Slider-handleContainer`
- `.spectrum-Slider-handle`
- `.spectrum-Slider-handle:before`
- `.spectrum-Slider:dir(rtl) .spectrum-Slider-handle:before`
- `.spectrum-Slider--precise .spectrum-Slider-handle`
- `.spectrum-Slider.spectrum-Slider--ramp .spectrum-Slider-handle`
- `.spectrum-Slider-ticks ~ .spectrum-Slider-handleContainer .spectrum-Slider-handle`
- `.spectrum-Slider.is-disabled .spectrum-Slider-handle`
- `.spectrum-Slider.is-disabled .spectrum-Slider-ramp + .spectrum-Slider-handle`
- `.spectrum-Slider-input`
- `.spectrum-Slider-labelContainer`
- `.spectrum-Slider--sideLabel .spectrum-Slider-labelContainer`
- `.spectrum-Slider.is-disabled .spectrum-Slider-labelContainer`
- `.spectrum-Slider-label`
- `.spectrum-Slider--sideLabel .spectrum-Slider-labelContainer .spectrum-Slider-label`
- `.spectrum-Slider-value`
- `.spectrum-Slider--range .spectrum-Slider-value`
- `.spectrum-Slider--sideLabel .spectrum-Slider-value`
- `.spectrum-Slider-controls`
- `.spectrum-Slider--tick .spectrum-Slider-controls`
- `.spectrum-Slider-content--editable .spectrum-Slider-controls`
- `.spectrum-Slider.is-disabled .spectrum-Slider-controls`
- `.spectrum-Slider:not(.spectrum-Slider--sideLabel) .spectrum-Slider-labelContainer + .spectrum-Slider-controls:has(.spectrum-Slider-ramp)`
- `.spectrum-Slider-content`
- `.spectrum-Slider-labelContainer + .spectrum-Slider-content`
- `.spectrum-Slider--sideLabel .spectrum-Slider-labelContainer + .spectrum-Slider-content`
- `.spectrum-Slider-labelContainer + .spectrum-Slider-content--editable`
- `.spectrum-Slider-trackContainer`
- `.spectrum-Slider-track`
- `.spectrum-Slider-track:before`
- `.spectrum-Slider.is-disabled .spectrum-Slider-track:before`
- `.spectrum-Slider-track:first-of-type:before`
- `.spectrum-Slider-track:last-of-type:before`
- `.spectrum-Slider-track ~ .spectrum-Slider-track`
- `.spectrum-Slider-track ~ .spectrum-Slider-track:before`
- `.spectrum-Slider--emphasized .spectrum-Slider-track:first-child:before`
- `.spectrum-Slider.is-disabled.spectrum-Slider--filled .spectrum-Slider-track:first-child:before`
- `.spectrum-Slider--emphasized.spectrum-Slider--range .spectrum-Slider-track:not(:first-of-type, :last-of-type):before`
- `.spectrum-Slider.is-disabled.spectrum-Slider--range .spectrum-Slider-track:not(:first-of-type, :last-of-type):before`
- `.spectrum-Slider-track:not(:has(~ .spectrum-Slider-fill)):before`
- `.spectrum-Slider--track-height-large .spectrum-Slider-track`
- `.spectrum-Slider--filled .spectrum-Slider-track:first-child:before`
- `.spectrum-Slider--range .spectrum-Slider-track:first-of-type`
- `.spectrum-Slider--range .spectrum-Slider-track:first-of-type:before`
- `.spectrum-Slider--range .spectrum-Slider-track:not(:first-of-type, :last-of-type):before`
- `.spectrum-Slider--range .spectrum-Slider-track:last-of-type`
- `.spectrum-Slider--range .spectrum-Slider-track:last-of-type:before`
- `.spectrum-Slider--range .spectrum-Slider-track ~ .spectrum-Slider-track`
- `.spectrum-Slider-ramp .spectrum-Slider-ramp-track`
- `.spectrum-Slider-ramp .spectrum-Slider-ramp-track-fill`
- `.spectrum-Slider--emphasized .spectrum-Slider-fill:before`
- `.spectrum-Slider--emphasized .spectrum-Slider-ramp .spectrum-Slider-ramp-track-fill`
- `.spectrum-Slider-fill`
- `.spectrum-Slider--track-height-large .spectrum-Slider-fill`
- `.spectrum-Slider-fill--right`
- `.spectrum-Slider-fill:before`
- `.spectrum-Slider.is-disabled .spectrum-Slider-fill:before`
- `.spectrum-Slider--tick`
- `.spectrum-Slider-controls:not(:has(.spectrum-Slider-ticks))`
- `.spectrum-Slider--tick .spectrum-Slider-tickLabel`
- `.spectrum-Slider-tick`
- `.spectrum-Slider-tick:after`
- `.spectrum-Slider-tick:first-of-type`
- `.spectrum-Slider-tick:first-of-type:after`
- `.spectrum-Slider-tick:last-of-type`
- `.spectrum-Slider-tick:last-of-type:after`
- `.spectrum-Slider-tick.spectrum-Slider-tick--track-height-large:after`
- `.spectrum-Slider.is-disabled .spectrum-Slider-tick:after`
- `.spectrum-Slider-tick .spectrum-Slider-tickLabel`
- `.spectrum-Slider-tick:first-of-type .spectrum-Slider-tickLabel`
- `.spectrum-Slider-tick:last-of-type .spectrum-Slider-tickLabel`
- `.spectrum-Slider.is-disabled .spectrum-Slider-tickLabel`
- `.spectrum-Slider--emphasized .spectrum-Slider-tick:nth-child(-n + 4):after`
- `.spectrum-Slider--range .spectrum-Slider-tick:nth-child(3):after`
- `.spectrum-Slider--range .spectrum-Slider-tick:nth-child(4):after`
- `.spectrum-Slider--range .spectrum-Slider-tick:nth-child(5):after`
- `.spectrum-Slider--filled:not(.spectrum-Slider--range, .is-disabled, .spectrum-Slider--emphasized) .spectrum-Slider-tick:nth-child(-n + 4):after`
- `.spectrum-Slider--offset:not(.spectrum-Slider--range, .is-disabled, .spectrum-Slider--emphasized) .spectrum-Slider-tick:nth-child(-n + 4):after`
- `.spectrum-Slider-ticks`
- `.spectrum-Slider-ramp svg`
- `.spectrum-Slider.is-disabled .spectrum-Slider-ramp path`

**Variants:**

- `.spectrum-Slider--sideLabel`
- `.spectrum-Slider-content--editable`
- `.spectrum-Slider-ramp`
- `.spectrum-Slider-handle.is-tophandle`

**Sizes:**

- `.spectrum-Slider--sizeL`
- `.spectrum-Slider--sizeS`
- `.spectrum-Slider--sizeXL`

**Interactive states:**

- `.spectrum-Slider-handle.is-dragged`
- `.spectrum-Slider-handle.is-focused`
- `.spectrum-Slider .spectrum-Slider-handle.is-focused:before`
- `.spectrum-Slider:not(.is-disabled) .spectrum-Slider-handle.is-focused`
- `.spectrum-Slider.spectrum-Slider--precise:not(.is-disabled) .spectrum-Slider-handle.is-focused:before`
- `.spectrum-Slider:not(.is-disabled) .spectrum-Slider-handle:focus`
- `.spectrum-Slider.spectrum-Slider--precise:not(.is-disabled) .spectrum-Slider-handle:focus:before`
- `.spectrum-Slider:not(.is-disabled) .spectrum-Slider-handle:focus:before`
- `.spectrum-Slider:not(.is-disabled) .spectrum-Slider-handle:focus-visible`
- `.spectrum-Slider.spectrum-Slider--precise:not(.is-disabled) .spectrum-Slider-handle:focus-visible:before`
- `.spectrum-Slider:not(.is-disabled) .spectrum-Slider-handle:focus-visible:before`
- `.spectrum-Slider:not(.is-disabled) .spectrum-Slider-handle.is-focused:before`
- `.spectrum-Slider-handle:active`
- `.spectrum-Slider.is-disabled .spectrum-Slider-handle:active`
- `.spectrum-Slider-handle:hover`
- `.spectrum-Slider.is-disabled .spectrum-Slider-handle:hover`
- `.spectrum-Slider-input:focus`
- `.spectrum-Slider.is-disabled`
- `.spectrum-Slider:not(.is-disabled, .spectrum-Slider--filled, .spectrum-Slider--range) .spectrum-Slider-controls:active`
- `.spectrum-Slider:not(.is-disabled, .spectrum-Slider--filled, .spectrum-Slider--range) .spectrum-Slider-controls.is-focused`
- `.spectrum-Slider:not(.is-disabled, .spectrum-Slider--filled, .spectrum-Slider--range) .spectrum-Slider-controls:focus-within`
- `.spectrum-Slider:not(.is-disabled, .spectrum-Slider--filled, .spectrum-Slider--range) .spectrum-Slider-controls:hover`

**Internationalization:**

- `.spectrum-Slider-labelContainer:lang(ja)`
- `.spectrum-Slider-labelContainer:lang(ko)`
- `.spectrum-Slider-labelContainer:lang(zh)`
- `.spectrum-Slider:dir(rtl)`

</details>

<details>
<summary>Passthroughs</summary>

- `--mod-fieldlabel-bottom-to-text`
- `--mod-fieldlabel-top-to-text`
- `--mod-textfield-width`

</details>

<details>
<summary>Modifiers</summary>

- `--mod-animation-duration-100`
- `--mod-focus-indicator-gap`
- `--mod-font-size-75`
- `--mod-line-height-100`
- `--mod-slider-cjk-line-height`
- `--mod-slider-control-height`
- `--mod-slider-control-to-side-field-label`
- `--mod-slider-control-to-text-field`
- `--mod-slider-controls-margin`
- `--mod-slider-disabled-border-color`
- `--mod-slider-editable-field-inline-size`
- `--mod-slider-emphasized-tick-mark-color`
- `--mod-slider-emphasized-track-fill-color`
- `--mod-slider-font-size`
- `--mod-slider-handle-background-color`
- `--mod-slider-handle-background-color-disabled`
- `--mod-slider-handle-border-color`
- `--mod-slider-handle-border-color-disabled`
- `--mod-slider-handle-border-color-down`
- `--mod-slider-handle-border-color-hover`
- `--mod-slider-handle-border-color-key-focus`
- `--mod-slider-handle-border-radius`
- `--mod-slider-handle-border-width`
- `--mod-slider-handle-disabled-background-color`
- `--mod-slider-handle-focus-ring-color-key-focus`
- `--mod-slider-handle-size`
- `--mod-slider-inline-size`
- `--mod-slider-input-left`
- `--mod-slider-input-top-size`
- `--mod-slider-label-font-family`
- `--mod-slider-label-font-style`
- `--mod-slider-label-font-weight`
- `--mod-slider-label-margin-start`
- `--mod-slider-label-text-color`
- `--mod-slider-label-text-color-disabled`
- `--mod-slider-ramp-track-color`
- `--mod-slider-ramp-track-color-disabled`
- `--mod-slider-ramp-track-fill-color`
- `--mod-slider-ramp-track-height`
- `--mod-slider-range-track-reset`
- `--mod-slider-tick-label-color`
- `--mod-slider-tick-mark-border-radius`
- `--mod-slider-tick-mark-color`
- `--mod-slider-tick-mark-color-filled-track`
- `--mod-slider-tick-mark-height`
- `--mod-slider-tick-mark-width`
- `--mod-slider-ticks-handle-background-color`
- `--mod-slider-track-color`
- `--mod-slider-track-color-disabled`
- `--mod-slider-track-corner-radius`
- `--mod-slider-track-fill-color`
- `--mod-slider-track-fill-color-disabled`
- `--mod-slider-track-fill-thickness`
- `--mod-slider-track-height-medium`
- `--mod-slider-track-thickness`
- `--mod-slider-value-inline-size`

</details>

### SWC

<details>
<summary>Attributes</summary>

- `defaultValue` (Number) - Sets the default value of the `<sp-slider-handle>`
- `dragging` (Boolean) - Whether the slider value is actively being changed
- `editable` (Boolean) - Whether to display an `<sp-number-field>` alongside the slider UI
- `fillStart` (Number/Boolean) - Start point for fill
- `label` (String) - The visible slider text label
- `labelVisibility` (String) - Label visibility mode: 'text', 'value', or 'none'
- `max` (Number) - Maximum value
- `min` (Number) - Minimum value
- `quiet` (Boolean) - Applies quiet styling to underlying `<sp-number-field>` when editable
- `step` (Number) - Step increment
- `tickStep` (Number) - Tick step increment
- `tickLabels` (Boolean) - Whether to show tick labels
- `value` (Number) - The value of the slider handle
- `variant` (String) - Slider variant: 'filled', 'ramp', 'range', or 'tick'

**Inherited from `<sp-number-field>`:**

- `hideStepper` (Boolean) - Whether the stepper buttons of the `<sp-number-field>` are hidden or not
- `format-options` (Object) - Intl.NumberFormatOptions for customizing number formatting
- `indeterminate` (Boolean) - Applies `indeterminate` to underlying number field

**Inherited from `<sp-number-field>`:**

- `name` - Name of the form control
- `type` (String) - Component type

**Inherited from `HandleController`:**

- `highlight` (Boolean) - Indicates whether the slider handle should be visually highlighted during focus-visible or keyboard interaction states

**Inherited from `SizedMixin`:**

`size` - Size of the slider (s, m, l, xl)

**Inherited from `Focusable`:**

`disabled` - Disable this control. It will not receive focus or events
`tabIndex` - The tab index to apply to this control

</details>

<details>
<summary>Slots</summary>

- Default slot - @deprecated Text label for the slider. Use the `label` property instead
- Handle slot - Optionally accepts two or more sp-slider-handle elements

</details>

## Comparison

### DOM Structure changes

<details>
<summary>Spectrum Web Components:</summary>

```html
<div id="label-container">
    <sp-field-label class="label" size="[size]">
        <span>[label]</span>
        <slot></slot>
    </sp-field-label>
    <sp-field-label class="" size="[size]">
        <output id="value" aria-live="off" for="input">[value]</output>
    </sp-field-label>
</div>
<div id="track">
    <div id="controls">
        <div class="track" role="presentation"></div>
        <div class="handle" role="presentation">
            <input type="range" class="input" aria-labelledby="label" />
            <span id="slider-description">
                Press escape or double click to reset the slider to its default
                value.
            </span>
        </div>
        <div class="track" role="presentation"></div>
    </div>
</div>
<sp-number-field
    id="number-field"
    [size]
    [min]
    [max]
    [step]
    [hideStepper]
    [value]
    [disabled]
    [quiet]
    [indeterminate]
    [formatOptions]
></sp-number-field>
```

</details>

<details>
<summary>Legacy (CSS main branch):</summary>

```html
<div
    class="spectrum-Slider spectrum-Slider--sizeM"
    aria-labelledby="slider-label"
>
    <!-- Label region -->
    <div class="spectrum-Slider-labelContainer">
        <label
            class=" spectrum-FieldLabel spectrum-Slider-label "
            id="slider-label"
            for="slider-1"
        >
            Slider label
        </label>
        <div
            role="textbox"
            aria-readonly="true"
            class="spectrum-Slider-value"
            aria-labelledby="slider-label"
        >
            14
        </div>
    </div>

    <!-- Slider controls -->
    <div class=" spectrum-Slider-controls ">
        <div class="spectrum-Slider-track" style="width:40%;"></div>
        <div class=" spectrum-Slider-handle " style="left:40%;">
            <input
                type="range"
                id="slider-input-1"
                class="spectrum-Slider-input"
                value="14"
                step="2"
                min="10"
                max="20"
            />
        </div>
        <div class="spectrum-Slider-track" style="width:60%;"></div>
    </div>
</div>
```

</details>

<details>
<summary>Spectrum 2 (CSS spectrum-two branch):</summary>

```html
<div
    class="spectrum-Slider spectrum-Slider--sizeM"
    aria-labelledby="slider-label"
>
    <!-- Label region -->
    <div class="spectrum-Slider-labelContainer">
        <label
            class=" spectrum-FieldLabel spectrum-Slider-label "
            id="slider-label"
            for="slider-1"
        >
            Slider label
        </label>
        <div
            role="textbox"
            aria-readonly="true"
            class="spectrum-Slider-value"
            aria-labelledby="slider-label"
        >
            14
        </div>
    </div>

    <div class="spectrum-Slider-content">
        <!-- Slider controls -->
        <div class="spectrum-Slider-controls">
            <div class="spectrum-Slider-track" style="width: 40%;"></div>
            <div class="spectrum-Slider-handle" style="left: 40%;">
                <input
                    type="range"
                    id="slider-input-1"
                    class="spectrum-Slider-input"
                    value="14"
                    step="2"
                    min="10"
                    max="20"
                    tabindex="0"
                />
            </div>
            <div class="spectrum-Slider-track" style="width: 60%;"></div>
        </div>

        <!-- Conditionally rendered textfield if slider is editable -->
        <div class="spectrum-Textfield spectrum-Slider-editable">
            <input type="text" class=" spectrum-Textfield-input " />
        </div>
    </div>
</div>
```

</details>

<details>
<summary>Diff: Legacy (CSS main) → Spectrum 2 (CSS spectrum-two)</summary>

```diff
<div class="spectrum-Slider spectrum-Slider--sizeM" aria-labelledby="slider-label">
  <!-- Label region -->
  <div class="spectrum-Slider-labelContainer">
    <label class=" spectrum-FieldLabel spectrum-Slider-label " id="slider-label" for="slider-1">
      Slider label
    </label>
    <div role="textbox" aria-readonly="true" class="spectrum-Slider-value" aria-labelledby="slider-label">
      14
    </div>
  </div>

+ <div class="spectrum-Slider-content">
    <!-- Slider controls -->
    <div class="spectrum-Slider-controls">
      <div class="spectrum-Slider-track" style="width:40%;"></div>
      <div class=" spectrum-Slider-handle " style="left:40%;">
-       <input type="range" id="slider-input-1" class="spectrum-Slider-input" value="14" step="2" min="10" max="20">
+       <input type="range" id="slider-input-1" class="spectrum-Slider-input" value="14" step="2" min="10" max="20" tabindex="0"/>
      </div>
      <div class="spectrum-Slider-track" style="width:60%;"></div>
    </div>
+
+   <!-- Conditionally rendered textfield if slider is editable -->
+   <div class="spectrum-Textfield spectrum-Slider-editable">
+     <input type="text" class=" spectrum-Textfield-input ">
+   </div>
+ </div>
</div>
```

**Key Changes in HTML Structure:**

1. **Content wrapper introduction**: Added `.spectrum-Slider-content` container that wraps both the slider controls and the optional editable text field, providing better structural organization, as well as supporting the side-label layout.

2. **Editable field integration**: Introduced conditional `.spectrum-Textfield.spectrum-Slider-editable` container with text input for editable slider functionality, enabling users to directly input values.

3. **Enhanced accessibility**: Added explicit `tabindex="0"` to the slider handle for improved keyboard navigation and focus management.

</details>

### CSS => SWC mapping

| CSS selector                           | Attribute or slot                             | Status                                                           |
| -------------------------------------- | --------------------------------------------- | ---------------------------------------------------------------- |
| `.spectrum-Slider`                     | `:host`                                       | Implemented                                                      |
| `.spectrum-Slider--sizeS`              | `size="s"`                                    | Implemented                                                      |
| `.spectrum-Slider--sizeL`              | `size="l"`                                    | Implemented                                                      |
| `.spectrum-Slider--sizeXL`             | `size="xl"`                                   | Implemented                                                      |
| `.spectrum-Slider--ramp`               | `variant="ramp"`                              | Implemented                                                      |
| `.spectrum-Slider--filled`             | `variant="filled"`                            | Implemented                                                      |
| `.spectrum-Slider--range`              | `variant="range"`                             | Implemented                                                      |
| `.spectrum-Slider--tick`               | `variant="tick"`                              | Implemented                                                      |
| `.spectrum-Slider--offset`             | `variant="filled` with `fill-start` attribute | Implemented                                                      |
| `.spectrum-Slider--sideLabel`          | -                                             | Implemented (possible with field label's `side-label` attribute) |
| `.spectrum-Slider.is-disabled`         | `disabled` attribute                          | Implemented                                                      |
| `.spectrum-Slider-label`               | Label slot/property                           | Implemented                                                      |
| `.spectrum-Slider-value`               | Value label                                   | Implemented                                                      |
| `.spectrum-Slider-labelContainer`      | `#label-container`                            | Implemented                                                      |
| `.spectrum-Slider-content--editable`   | `editable` attribute                          | Implemented                                                      |
| `.spectrum-Slider-controls`            | `#controls`                                   | Implemented                                                      |
| `.spectrum-Slider-track`               | `.track` elements                             | Implemented                                                      |
| `.spectrum-Slider-fill`                | `.fill` element                               | Implemented                                                      |
| `.spectrum-Slider-fill--right`         | Fill direction                                | Implemented                                                      |
| `.spectrum-Slider-handle`              | `.handle` element                             | Implemented                                                      |
| `.spectrum-Slider-input`               | `.input` element                              | Implemented                                                      |
| `.spectrum-Slider-ramp`                | Ramp container                                | Implemented                                                      |
| `.spectrum-Slider-ticks`               | `.ticks` container                            | Implemented                                                      |
| `.spectrum-Slider-tick`                | Individual `.tick` element                    | Implemented                                                      |
| `.spectrum-Slider-tickLabel`           | `tickLabels` attribute                        | Implemented                                                      |
| `.spectrum-Slider-handleContainer`     | `.handleContainer` in `variant="tick"`        | Implemented                                                      |
| `.spectrum-Slider-trackContainer`      | `.trackContainer` in `variant="tick"`         | Implemented                                                      |
| `.spectrum-Slider-content`             | Container for controls and editable field     | Missing from WC (new for S2)                                     |
| `.spectrum-Slider--emphasized`         | Emphasized variant                            | Missing from WC (new for S2)                                     |
| `.spectrum-Slider--track-height-large` | Track height variant                          | Missing from WC (new for S2)                                     |
| `.spectrum-Slider--precise`            | -                                             | Missing from WC (new for S2)                                     |
| -                                      | `quiet` number field                          | Not supported in S2                                              |

## Summary of changes

### CSS => SWC implementation gaps

- **Emphasized variant**: The web component lacks support for `.spectrum-Slider--emphasized` which provides emphasized styling for certain slider variants in Spectrum 2.

- **Track height variants**: The web component lacks support for `.spectrum-Slider--track-height-large` which allows for different track heights. This feature was added in Spectrum 2.

- **Container structure**: Missing structural elements for complex layouts like the side label slider.

- **Precise handle variant**: For Spectrum 2, a new handle variant was introduced called "precise" with `.spectrum-Slider--precise` class. The slider's API will need an additional property to capture the new precise handle option. Discussion with design may be needed to properly update any "precision" behaviors.

**Note about custom track color:** The current `<sp-slider>` has support for inline styles to cascade into the shadow DOM, and apply custom styles to the track element. For Spectrum 2, the design specs suggest that there is a fill more often than not (except perhaps in the offset variant). We should collaborate with design to see if this level of customization is still intended or required for S2, to avoid any design issues when paired with the filled track color (i.e. how do we avoid a custom track color clashing with the specified fill color?).

### CSS Spectrum 2 changes

The Spectrum 2 migration introduces several key structural enhancements to the slider component:

1. **Content wrapper architecture**: The addition of `.spectrum-Slider-content` container provides better structural organization and enables improved layout flexibility, particularly for side-label configurations and editable slider variants.

2. **Editable functionality integration**: Introduction of the conditional `.spectrum-Textfield.spectrum-Slider-editable` container with text input enables direct value input functionality, specifically with a text input. The editable functionality was already implemented in Spectrum 1 web components, but we should reexamine the use of `<sp-number-field>`, or opt for the specified `<sp-textfield>`.

3. **Enhanced accessibility standards**: The explicit addition of `tabindex="0"` to slider handles improves keyboard navigation compliance and ensures consistent focus management across different interaction modes.

4. **Layout modernization**: The restructured DOM hierarchy better supports responsive design patterns and provides cleaner separation between control elements and content areas, facilitating more maintainable CSS architecture.

## Resources

- [CSS migration](https://github.com/adobe/spectrum-css/pull/3945)
- [Spectrum 2 preview](https://spectrumcss.z13.web.core.windows.net/pr-2352/index.html?path=/docs/components-slider--docs)
- [React](https://react-spectrum.adobe.com/s2/index.html?path=/docs/slider--docs)

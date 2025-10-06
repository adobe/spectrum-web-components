# Meter migration roadmap

## Component specifications

### CSS

<details>
<summary>CSS selectors</summary>

- `.spectrum-Meter`

**Subcomponents:**

- `.spectrum-Meter .spectrum-ProgressBar-helptext`

**Variants:**

- `.spectrum-Meter.is-negative`
- `.spectrum-Meter.is-notice`
- `.spectrum-Meter.is-positive`
- `.spectrum-Meter--staticWhite` (The `.spectrum-Meter--staticWhite` class is not present in the Meter CSS, as it makes use of `spectrum-ProgressBar--staticWhite`)
- `.spectrum-Meter--staticBlack` (The `.spectrum-Meter--staticBlack` class is not present in the Meter CSS, as it makes use of `spectrum-ProgressBar--staticBlack`)

**Sizes:**

- `.spectrum-Meter.spectrum-Meter--sizeL`
- `.spectrum-Meter.spectrum-Meter--sizeS`
- `.spectrum-Meter.spectrum-Meter--sizeXL`

</details>

<details>
<summary>Passthroughs</summary>

- `--mod-progressbar-fill-color`
- `--mod-progressbar-max-size`
- `--mod-progressbar-min-size`
- `--mod-progressbar-thickness`

</details>

<details>
<summary>Modifiers</summary>

- `--mod-meter-help-text-to-progress-bar`
- `--mod-meter-max-width`
- `--mod-meter-min-width`

</details>

### SWC

<details>
<summary>Attributes</summary>

- `progress` (Number) - Progress value
- `variant` (String) - Meter variant: 'positive', 'notice', or 'negative'
- `label` (String) - Label text
- `sideLabel` (Boolean) - Whether to display label on the side
- `staticColor` (String) - Static color: 'white'

**Inherited from SizedMixin:**

- `size` - Size of the number field (s, m, l, xl)

</details>

<details>
<summary>Slots</summary>

- Default slot - Text labeling the Meter

</details>

## Comparison

### DOM Structure changes

<details>
<summary>Spectrum Web Components:</summary>

```html
<sp-field-label size="[size]" class="label">
    <slot>[label]</slot>
</sp-field-label>
<sp-field-label size="[size]" class="percentage">[progress]</sp-field-label>
<div class="track">
    <div class="fill" style="transform: scaleX(calc([progress] / 100));"></div>
</div>
```

</details>

<details>
<summary>Legacy (CSS main branch):</summary>

```html
<div
    class="spectrum-ProgressBar spectrum-ProgressBar--sizeM spectrum-Meter spectrum-Meter--sizeL is-positive spectrum-ProgressBar--topLabel"
    role="progressbar"
    aria-valuemin="0"
    aria-valuemax="100"
    value="50%"
    aria-valuenow="50%"
>
    <label
        class="spectrum-ProgressBar-label spectrum-FieldLabel spectrum-Field-label--sizeM"
        >Progress</label
    >
    <label
        class="spectrum-ProgressBar-percentage spectrum-FieldLabel spectrum-Field-label--sizeM"
        >50%</label
    >
    <div class="spectrum-ProgressBar-track">
        <div class="spectrum-ProgressBar-fill" style="inline-size: 50%;"></div>
    </div>
</div>
```

</details>

<details>
<summary>Spectrum 2 (CSS spectrum-two branch):</summary>

```html
<div
    class="spectrum-ProgressBar spectrum-Meter spectrum-Meter--sizeM is-positive spectrum-ProgressBar--topLabel"
    role="progressbar"
    aria-valuemin="0"
    aria-valuemax="100"
    value="50%"
    aria-valuenow="50%"
>
    <label
        class="spectrum-ProgressBar-label spectrum-FieldLabel spectrum-Field-label--sizeM"
        >Progress</label
    >
    <label
        class="spectrum-ProgressBar-percentage spectrum-FieldLabel spectrum-Field-label--sizeM"
        >50%</label
    >
    <div class="spectrum-ProgressBar-track">
        <div class="spectrum-ProgressBar-fill" style="inline-size: 50%;"></div>
    </div>
    <!-- Conditionally rendered help text -->
    <div class="spectrum-ProgressBar-helptext" style="">
        <div class="spectrum-HelpText-text">Help text</div>
    </div>
</div>
```

</details>

<details>
<summary>Diff: Legacy (CSS main) → Spectrum 2 (CSS spectrum-two)</summary>

### HTML Output Diff

```diff
<div class="spectrum-ProgressBar spectrum-Meter
-    spectrum-ProgressBar--sizeM
-    spectrum-Meter--sizeL
+    spectrum-Meter--sizeM
     is-positive spectrum-ProgressBar--topLabel"
     role="progressbar" aria-valuemin="0" aria-valuemax="100" value="50%" aria-valuenow="50%">
  <label class="spectrum-ProgressBar-label spectrum-FieldLabel spectrum-Field-label--sizeM">Progress</label>
  <label class="spectrum-ProgressBar-percentage spectrum-FieldLabel spectrum-Field-label--sizeM">50%</label>
  <div class="spectrum-ProgressBar-track">
    <div class="spectrum-ProgressBar-fill" style="inline-size: 50%;"></div>
  </div>
+ <!-- Conditionally rendered help text -->
+ <div class="spectrum-ProgressBar-helptext" style="">
+   <div class="spectrum-HelpText-text">
+     Help text
+   </div>
+ </div>
</div>
```

### Key Changes in HTML Structure

1. **Size class adjustment**: Changed default size class from `spectrum-Meter--sizeL` to `spectrum-Meter--sizeM`. In S2, size options were expanded (although SWC already supported S/M/L/XL). In Spectrum 1, the meter component extended the default medium-sized progress bar with `.spectrum-ProgressBar--sizeM`, as well as set the default meter size to `.spectrum-Meter--sizeL`. In Spectrum 2, you'll notice the `.spectrum-ProgressBar--sizeM` modifier is removed since that t-shirt size is not needed for default progress bars and/or meters.

2. **Help text integration**: Added optional `.spectrum-ProgressBar-helptext` container with `.spectrum-HelpText-text` wrapper for displaying contextual help information below the meter.

</details>

### CSS => SWC mapping

**Note:** The meter extends progress bar, so the progress bar selectors listed below are inherited in the CSS meter.

| CSS selector                       | Attribute or slot                     | Status                       |
| ---------------------------------- | ------------------------------------- | ---------------------------- |
| `.spectrum-Meter`                  | `:host`                               | Implemented                  |
| `.spectrum-Meter--sizeS`           | `size="s"`                            | Implemented                  |
| `.spectrum-Meter--sizeL`           | `size="l"`                            | Implemented                  |
| `.spectrum-Meter--sizeXL`          | `size="xl"`                           | Implemented                  |
| `.spectrum-Meter.is-positive`      | `variant="positive"`                  | Implemented                  |
| `.spectrum-Meter.is-negative`      | `variant="negative"`                  | Implemented                  |
| `.spectrum-Meter.is-notice`        | `variant="notice"`                    | Implemented                  |
| `.spectrum-Meter--staticWhite`     | `staticColor="white"`                 | Implemented                  |
| `.spectrum-ProgressBar-label`      | `label` attribute; default slot       | Implemented                  |
| `.spectrum-ProgressBar-percentage` | `<sp-field-label class="percentage">` | Implemented                  |
| `.spectrum-ProgressBar-track`      | `.track` container                    | Implemented                  |
| `.spectrum-ProgressBar-fill`       | `fill` element                        | Implemented                  |
| `.spectrum-ProgressBar--sideLabel` | `side-label` attribute                | Implemented                  |
| `.spectrum-Meter--staticBlack`     | `staticColor="black"`                 | Missing from WC (new for S2) |
| `.spectrum-ProgressBar-helptext`   | Help text                             | Missing from WC (new for S2) |

## Summary of changes

### CSS => SWC implementation gaps

- **Help text support**: The web component lacks support for conditional help text, which would display help text below the meter.

- **Static black**: The web component lacks support for the new static black styles for the meter.

### CSS Spectrum 2 changes

The CSS Spectrum 2 meter DOM includes the addition of optional help text, but otherwise remains the same. The meter component essentially extends the progress bar with semantic color variants (positive, negative, notice) and uses the same underlying structure and styling.

## Resources

- [CSS migration](https://github.com/adobe/spectrum-css/pull/3968)
- [Spectrum 2 preview](https://spectrumcss.z13.web.core.windows.net/pr-2352/index.html?path=/docs/components-meter--docs)
- [React](https://react-spectrum.adobe.com/s2/index.html?path=/docs/meter--docs)

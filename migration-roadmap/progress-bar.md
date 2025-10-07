# Progress bar migration roadmap

## Component specifications

### CSS

<details>
<summary>CSS selectors</summary>

- `.spectrum-ProgressBar`

**Subcomponents:**

- `.spectrum-ProgressBar .spectrum-ProgressBar-fill`
- `.spectrum-ProgressBar .spectrum-ProgressBar-label`
- `.spectrum-ProgressBar .spectrum-ProgressBar-percentage`
- `.spectrum-ProgressBar .spectrum-ProgressBar-track`
- `.spectrum-ProgressBar-track`

**Variants:**

- `.spectrum-ProgressBar--indeterminate`
- `.spectrum-ProgressBar--sideLabel`
- `.spectrum-ProgressBar--staticWhite`

**Internationalization:**

- `.spectrum-ProgressBar--indeterminate .spectrum-ProgressBar-fill:dir(rtl)`
- `.spectrum-ProgressBar .spectrum-ProgressBar-label:lang(ja)`
- `.spectrum-ProgressBar .spectrum-ProgressBar-label:lang(ko)`
- `.spectrum-ProgressBar .spectrum-ProgressBar-label:lang(zh)`
- `.spectrum-ProgressBar .spectrum-ProgressBar-percentage:lang(ja)`
- `.spectrum-ProgressBar .spectrum-ProgressBar-percentage:lang(ko)`
- `.spectrum-ProgressBar .spectrum-ProgressBar-percentage:lang(zh)`

**Sizes:**

- `.spectrum-ProgressBar--sizeL`
- `.spectrum-ProgressBar--sizeS`
- `.spectrum-ProgressBar--sizeXL`

**For extension use only by meter component:**

Progress bar itself does not support static black styles, but because meter extends the progress bar in Spectrum CSS, these selectors were necessary to support meter's static black design requirements.

- `.spectrum-ProgressBar--staticBlack .spectrum-ProgressBar-fill`
- `.spectrum-ProgressBar--staticBlack .spectrum-ProgressBar-label`
- `.spectrum-ProgressBar--staticBlack .spectrum-ProgressBar-percentage`
- `.spectrum-ProgressBar--staticBlack .spectrum-ProgressBar-track`

</details>

<details>
<summary>Passthroughs</summary>

None found for this component.

</details>

<details>
<summary>Modifiers</summary>

- `--mod-progressbar-animation-duration-indeterminate`
- `--mod-progressbar-animation-ease-in-out-indeterminate`
- `--mod-progressbar-fill-color`
- `--mod-progressbar-fill-color-black`
- `--mod-progressbar-fill-color-white`
- `--mod-progressbar-fill-size-indeterminate`
- `--mod-progressbar-font-size`
- `--mod-progressbar-inline-size`
- `--mod-progressbar-label-and-value-black`
- `--mod-progressbar-label-and-value-white`
- `--mod-progressbar-line-height`
- `--mod-progressbar-line-height-cjk`
- `--mod-progressbar-max-size`
- `--mod-progressbar-min-size`
- `--mod-progressbar-spacing-label-to-progressbar`
- `--mod-progressbar-spacing-label-to-text`
- `--mod-progressbar-spacing-top-to-text`
- `--mod-progressbar-text-color`
- `--mod-progressbar-thickness`
- `--mod-progressbar-track-color`
- `--mod-spacing-progressbar-label-to-text`

</details>

### SWC

<details>
<summary>Attributes</summary>

- `indeterminate` (Boolean) - Whether the progress bar is in indeterminate state
- `label` (String) - Label text for the progress bar
- `overBackground` (Boolean) - @deprecated; Use `staticColor` instead
- `sideLabel` (Boolean) - Whether to display label on the side
- `progress` (Number) - Progress value
- `staticColor` (String) - Static color: 'white'

</details>

<details>
<summary>Slots</summary>

- Default slot - Text labeling the progress bar

</details>

## Comparison

### DOM Structure changes

<details>
<summary>Spectrum Web Components:</summary>

```html
<!-- Both field labels are conditionally rendered. -->
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
    class="spectrum-ProgressBar spectrum-ProgressBar--sizeM spectrum-ProgressBar--topLabel"
    role="progressbar"
    aria-valuemin="0"
    aria-valuemax="100"
    value="50%"
    aria-valuenow="50%"
>
    <label class="spectrum-ProgressBar-label" size="m">Progress</label>
    <label class="spectrum-ProgressBar-percentage" size="m">50%</label>
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
    class="spectrum-ProgressBar spectrum-ProgressBar--sizeM spectrum-ProgressBar--topLabel"
    role="progressbar"
    aria-valuemin="0"
    aria-valuemax="100"
    value="50%"
    aria-valuenow="50%"
>
    <label class="spectrum-ProgressBar-label" size="m">Progress</label>
    <label class="spectrum-ProgressBar-percentage" size="m">50%</label>
    <div class="spectrum-ProgressBar-track">
        <div class="spectrum-ProgressBar-fill" style="inline-size: 50%;"></div>
    </div>
</div>
```

</details>

<details>
<summary>Diff: Legacy (CSS main) → Spectrum 2 (CSS spectrum-two)</summary>

**No differences found between main and spectrum-two branches.**

</details>

### CSS => SWC mapping

| CSS selector                           | Attribute or slot                     | Status      |
| -------------------------------------- | ------------------------------------- | ----------- |
| `.spectrum-ProgressBar`                | `:host`                               | Implemented |
| `.spectrum-ProgressBar--sizeS`         | `size="s"`                            | Implemented |
| `.spectrum-ProgressBar--sizeL`         | `size="l"`                            | Implemented |
| `.spectrum-ProgressBar--sizeXL`        | `size="xl"`                           | Implemented |
| `.spectrum-ProgressBar--indeterminate` | `indeterminate` attribute             | Implemented |
| `.spectrum-ProgressBar--sideLabel`     | `sideLabel` attribute                 | Implemented |
| `.spectrum-ProgressBar--staticWhite`   | `staticColor="white"`                 | Implemented |
| `.spectrum-ProgressBar-label`          | `label` attribute; default slot       | Implemented |
| `.spectrum-ProgressBar-percentage`     | `<sp-field-label class="percentage">` | Implemented |
| `.spectrum-ProgressBar-track`          | `.track` container                    | Implemented |
| `.spectrum-ProgressBar-fill`           | `.fill` element                       | Implemented |

## Summary of changes

### CSS => SWC implementation gaps

No implementation gaps found.

### CSS Spectrum 2 changes

No structural differences found between the legacy (CSS main) and Spectrum 2 (CSS spectrum-two) branches. The template structure and class naming remain consistent across both branches.

## Resources

- [Original CSS migration](https://github.com/adobe/spectrum-css/pull/2659)
- [Additional follow-up migration work](https://github.com/adobe/spectrum-css/pull/3968) (occurred in the meter S2 migration)
- [Spectrum 2 preview](https://spectrumcss.z13.web.core.windows.net/pr-2352/index.html?path=/docs/components-progress-bar--docs)
- [React](https://react-spectrum.adobe.com/s2/index.html?path=/docs/progressbar--docs)

<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../../README.md) / [Project planning](../../README.md) / [Components](../README.md) / Meter / Meter migration roadmap

<!-- Document title (editable) -->

# Meter migration roadmap

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [Component specifications](#component-specifications)
    - [CSS](#css)
    - [SWC](#swc)
- [Comparison](#comparison)
    - [DOM Structure changes](#dom-structure-changes)
    - [HTML Output Diff](#html-output-diff)
    - [Key Changes in HTML Structure](#key-changes-in-html-structure)
    - [CSS => SWC mapping](#css--swc-mapping)
- [Summary of changes](#summary-of-changes)
    - [CSS => SWC implementation gaps](#css--swc-implementation-gaps)
    - [CSS Spectrum 2 changes](#css-spectrum-2-changes)
- [Resources](#resources)

</details>

<!-- Document content (editable) -->

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
- `accessibleLabel` (String) - Screen-reader-only label for contexts where no visible label slot is used (for example a data grid). Sets `aria-label` on the inner `role="meter"` element instead of `aria-labelledby`.
- `sideLabel` (Boolean) - Whether to display label on the side
- `staticColor` (String) - Static color: 'white'

**Inherited from SizedMixin:**

- `size` - Size of the number field (s, m, l, xl)

</details>

<details>
<summary>Slots</summary>

- `label` slot - Visible label for the meter. The slot content is wrapped in a shadow DOM container with a stable ID; the inner `role="meter"` element references it via `aria-labelledby`.
- `description` slot - Additional text rendered below the meter (for example "2 GB of 10 GB used"). The slot content is wrapped in a shadow DOM container with a stable ID; the inner `role="meter"` element references it via `aria-describedby`. This is not "help text": meter is not a form field.

</details>

## Comparison

### DOM Structure changes

<details>
<summary>Spectrum Web Components (2nd-gen target):</summary>

```html
<!-- shadow root -->
<div id="label" class="label">
    <slot name="label"></slot>
</div>
<div
    role="meter"
    aria-labelledby="label"
    aria-describedby="description"
    aria-valuemin="0"
    aria-valuemax="100"
    aria-valuenow="[progress]"
    aria-valuetext="[localized percent]"
>
    <sp-field-label size="[size]" class="percentage">[progress]%</sp-field-label>
    <div class="track">
        <div class="fill" style="transform: scaleX(calc([progress] / 100));"></div>
    </div>
</div>
<div id="description" class="description">
    <slot name="description"></slot>
</div>
```

When `accessibleLabel` is set and no label slot content is present, `aria-label="[accessibleLabel]"` is used on the meter element instead of `aria-labelledby`.

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

2. **Description slot integration**: Added optional `.spectrum-ProgressBar-helptext` container with `.spectrum-HelpText-text` wrapper for displaying additional text below the meter. In SWC 2nd-gen this maps to a `description` slot — not a "help text" slot, since meter is not a form field.

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
| `.spectrum-ProgressBar-label`      | `label` slot                          | Needs update (named slot)    |
| `.spectrum-ProgressBar-percentage` | `<sp-field-label class="percentage">` | Implemented                  |
| `.spectrum-ProgressBar-track`      | `.track` container                    | Implemented                  |
| `.spectrum-ProgressBar-fill`       | `fill` element                        | Implemented                  |
| `.spectrum-ProgressBar--sideLabel` | `side-label` attribute                | Implemented                  |
| `.spectrum-Meter--staticBlack`     | `staticColor="black"`                 | Missing from WC (new for S2) |
| `.spectrum-ProgressBar-helptext`   | `description` slot                    | Missing from WC (new for S2) |

## Summary of changes

### CSS => SWC implementation gaps

- **Description slot**: The web component lacks support for a `description` slot, which renders additional text below the meter. This replaces the Spectrum CSS `.spectrum-ProgressBar-helptext` pattern. The slot is named **description**, not **help text**, because meter is not a form field.

- **Label slot**: The `label` attribute should become a named `label` slot with a shadow DOM container that has a stable ID, so the inner `role="meter"` element can reference it via `aria-labelledby`.

- **`accessibleLabel` property**: New property that sets `aria-label` on the inner `role="meter"` element for contexts where no visible label is present.

- **`role="meter"` placement**: The role should move from the host element to an inner shadow DOM element, with `aria-labelledby` and `aria-describedby` referencing shadow-DOM-internal IDs.

- **Static black**: The web component lacks support for the new static black styles for the meter.

### CSS Spectrum 2 changes

The CSS Spectrum 2 meter DOM includes the addition of an optional `.spectrum-ProgressBar-helptext` container below the bar. In the SWC 2nd-gen implementation this maps to a `description` slot (not "help text", since meter is not a form field). Otherwise the structure remains the same: the meter extends the progress bar with semantic color variants (positive, negative, notice) and uses the same underlying bar and track styling.

## Resources

- [CSS migration](https://github.com/adobe/spectrum-css/pull/3968)
- [Spectrum 2 preview](https://spectrumcss.z13.web.core.windows.net/pr-2352/index.html?path=/docs/components-meter--docs)
- [React](https://react-spectrum.adobe.com/Meter)

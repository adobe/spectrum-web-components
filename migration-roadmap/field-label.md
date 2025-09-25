# Field label migration roadmap

## Component specifications

### CSS

<details>
<summary>CSS selectors</summary>

- `.spectrum-FieldLabel`
- `.spectrum-FieldLabel--left`
- `.spectrum-FieldLabel--right`
- `.spectrum-FieldLabel--sizeL`
- `.spectrum-FieldLabel--sizeS`
- `.spectrum-FieldLabel--sizeXL`
- `.spectrum-FieldLabel--staticBlack`
- `.spectrum-FieldLabel--staticWhite`
- `.spectrum-FieldLabel-requiredIcon`
- `.spectrum-FieldLabel.is-disabled`
- `.spectrum-FieldLabel:lang(ja)`
- `.spectrum-FieldLabel:lang(ko)`
- `.spectrum-FieldLabel:lang(zh)`

</details>

<details>
<summary>Passthroughs</summary>

None found for this component.

</details>

<details>
<summary>Modifiers</summary>

- `--mod-fieldlabel-asterisk-vertical-align`
- `--mod-fieldlabel-bottom-to-text`
- `--mod-fieldlabel-font-size`
- `--mod-fieldlabel-font-weight`
- `--mod-fieldlabel-line-height`
- `--mod-fieldlabel-line-height-cjk`
- `--mod-fieldlabel-min-height`
- `--mod-fieldlabel-padding-inline`
- `--mod-fieldlabel-side-margin-block-start`
- `--mod-fieldlabel-side-padding-right`
- `--mod-fieldlabel-text-to-asterisk`
- `--mod-fieldlabel-top-to-text`

</details>

### SWC

<details>
<summary>Attributes</summary>

- `disabled` (Boolean) - Whether the field label is disabled
- `id` (String) - Unique identifier for the field label
- `for` (String) - ID of the form control the label is associated with
- `required` (Boolean) - Whether the field is required
- `side-aligned` (String) - Alignment of the label: 'start' or 'end'

</details>

<details>
<summary>Slots</summary>

- Default slot - Text content of the label

</details>

## Comparison

### DOM Structure changes

<details>
<summary>Spectrum Web Components:</summary>

```html
<label>
    <slot></slot>
    <sp-icon-asterisk100
        class="required-icon spectrum-UIIcon-Asterisk100"
    ></sp-icon-asterisk100>
</label>
```

</details>

<details>
<summary>Legacy (CSS main branch):</summary>

```html
<label class="spectrum-FieldLabel spectrum-FieldLabel--sizeM">
    Label text
    <svg
        class="spectrum-FieldLabel-UIIcon spectrum-FieldLabel-requiredIcon"
        focusable="false"
        aria-hidden="true"
    >
        <path
            d="M10 2L13.09 8.26L20 9L14 14.74L15.18 22L10 18.77L4.82 22L6 14.74L0 9L6.91 8.26L10 2Z"
        ></path>
    </svg>
</label>
```

</details>

<details>
<summary>Spectrum 2 (CSS spectrum-two branch):</summary>

```html
<label class="spectrum-FieldLabel spectrum-FieldLabel--sizeM">
    Label text&#8288;
    <svg
        class="spectrum-FieldLabel-UIIcon spectrum-FieldLabel-requiredIcon"
        focusable="false"
        aria-hidden="true"
    >
        <path
            d="M10 2L13.09 8.26L20 9L14 14.74L15.18 22L10 18.77L4.82 22L6 14.74L0 9L6.91 8.26L10 2Z"
        ></path>
    </svg>
</label>
```

</details>

<details>
<summary>Diff: Legacy (CSS main) → Spectrum 2 (CSS spectrum-two)</summary>

### HTML Output Diff

```diff
<label class="spectrum-FieldLabel spectrum-FieldLabel--sizeM">
-    Label text
+    Label text&#8288;
    <svg
        class="spectrum-FieldLabel-UIIcon spectrum-FieldLabel-requiredIcon"
        focusable="false"
        aria-hidden="true"
    >
        <path
            d="M10 2L13.09 8.26L20 9L14 14.74L15.18 22L10 18.77L4.82 22L6 14.74L0 9L6.91 8.26L10 2Z"
        ></path>
    </svg>
</label>
```

</details>

### Key Changes in HTML Structure

1. **Text processing enhancement**: Added `?.trim()` to remove whitespace from label text
2. **Zero-width non-joiner**: Added `&#8288;` (zero-width non-joiner) between label text and required asterisk icon to prevent text wrapping issues in internationalized content
3. **Static color support**: Added support for `--staticBlack` and `--staticWhite` variants through the `staticColor` parameter

</details>

### CSS => SWC mapping

| CSS selector                                                                                  | Attribute or slot                       | Status                       |
| --------------------------------------------------------------------------------------------- | --------------------------------------- | ---------------------------- |
| `.spectrum-FieldLabel`                                                                        | `:host`                                 | Implemented                  |
| `.spectrum-FieldLabel--left`                                                                  | `side-aligned="start"`                  | Implemented                  |
| `.spectrum-FieldLabel--right`                                                                 | `side-aligned="end"`                    | Implemented                  |
| `.spectrum-FieldLabel--sizeL`                                                                 | `size="l"`                              | Implemented                  |
| `.spectrum-FieldLabel--sizeS`                                                                 | `size="s"`                              | Implemented                  |
| `.spectrum-FieldLabel--sizeXL`                                                                | `size="xl"`                             | Implemented                  |
| `.spectrum-FieldLabel--staticBlack`                                                           | `static-color="black"`                  | Missing from WC (new for S2) |
| `.spectrum-FieldLabel--staticWhite`                                                           | `static-color="white"`                  | Missing from WC (new for S2) |
| `.spectrum-FieldLabel-requiredIcon`                                                           | Required icon element; `.required-icon` | Implemented                  |
| `.spectrum-FieldLabel.is-disabled`                                                            | `disabled` attribute                    | Implemented                  |
| `.spectrum-FieldLabel:lang(ja), .spectrum-FieldLabel:lang(ko), .spectrum-FieldLabel:lang(zh)` | Language-specific styling               | Implemented                  |

## Summary of changes

### CSS => SWC implementation gaps

- **Static color variants**: The web component is missing support for static color variants (`--staticBlack` and `--staticWhite`). These are commonly used for overlays and high-contrast scenarios where labels need to maintain visibility over varying backgrounds.

### CSS Spectrum 2 changes

- **Improved text handling**: Enhanced label text processing with `?.trim()` to remove whitespace and added a zero-width non-joiner (`&#8288;`) between label text and the required asterisk icon. This ensures proper spacing and prevents text wrapping issues in internationalized content.

## Resources

- [CSS migration](https://github.com/adobe/spectrum-css/pull/2569)
- [Spectrum 2 preview](https://spectrumcss.z13.web.core.windows.net/pr-2352/index.html?path=/docs/components-field-label--docs)

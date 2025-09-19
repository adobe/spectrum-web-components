# Help text migration roadmap

## Component specifications

### CSS

<details>
<summary>CSS selectors</summary>

- `.spectrum-HelpText`
- `.spectrum-HelpText .spectrum-HelpText-text`
- `.spectrum-HelpText .spectrum-HelpText-validationIcon`
- `.spectrum-HelpText.is-disabled`
- `.spectrum-HelpText.is-disabled .spectrum-HelpText-text`
- `.spectrum-HelpText.is-disabled .spectrum-HelpText-validationIcon`
- `.spectrum-HelpText.spectrum-HelpText--negative`
- `.spectrum-HelpText.spectrum-HelpText--negative .spectrum-HelpText-text`
- `.spectrum-HelpText.spectrum-HelpText--negative .spectrum-HelpText-validationIcon`
- `.spectrum-HelpText.spectrum-HelpText--neutral`
- `.spectrum-HelpText.spectrum-HelpText--neutral .spectrum-HelpText-text`
- `.spectrum-HelpText.spectrum-HelpText--neutral .spectrum-HelpText-validationIcon`
- `.spectrum-HelpText.spectrum-HelpText--sizeL`
- `.spectrum-HelpText.spectrum-HelpText--sizeS`
- `.spectrum-HelpText.spectrum-HelpText--sizeXL`
- `.spectrum-HelpText:lang(ja)`
- `.spectrum-HelpText:lang(ko)`
- `.spectrum-HelpText:lang(zh)`

</details>

<details>
<summary>Passthroughs</summary>

None found for this component.

</details>

<details>
<summary>Modifiers</summary>

- `--mod-helptext-bottom-edge-to-workflow-icon`
- `--mod-helptext-bottom-to-text`
- `--mod-helptext-content-color-default`
- `--mod-helptext-font-family`
- `--mod-helptext-font-size`
- `--mod-helptext-font-style`
- `--mod-helptext-font-weight`
- `--mod-helptext-icon-color-default`
- `--mod-helptext-icon-size`
- `--mod-helptext-line-height`
- `--mod-helptext-line-height-cjk`
- `--mod-helptext-min-height`
- `--mod-helptext-text-to-visual`
- `--mod-helptext-top-edge-to-workflow-icon`
- `--mod-helptext-top-to-text`

</details>

### SWC

<details>
<summary>Attributes</summary>

- `icon` (Boolean) - Whether to show the validation icon
- `variant` (String) - Visual variant: 'neutral' or 'negative'

</details>

<details>
<summary>Slots</summary>

- Default slot - Text content of the help text

</details>

## Comparison

### DOM Structure changes

<details>
<summary>Spectrum Web Components:</summary>

```html
<sp-icon-alert class="icon"></sp-icon-alert>
<div class="text"><slot></slot></div>
```

</details>

<details>
<summary>Legacy (CSS main branch):</summary>

```html
<div class="spectrum-HelpText spectrum-HelpText--sizeM">
    <sp-icon-alert class="spectrum-HelpText-validationIcon"></sp-icon-alert>
    <div class="spectrum-HelpText-text">Help text content</div>
</div>
```

</details>

<details>
<summary>Spectrum 2 (CSS spectrum-two branch):</summary>

```html
<div class="spectrum-HelpText spectrum-HelpText--sizeM">
    <sp-icon-alert class="spectrum-HelpText-validationIcon"></sp-icon-alert>
    <div class="spectrum-HelpText-text">Help text content</div>
</div>
```

</details>

<details>
<summary>Diff: Legacy (CSS main) → Spectrum 2 (CSS spectrum-two)</summary>

### HTML Output Comparison

**Legacy (CSS main branch) - Negative variant:**

```html
<div
    class="spectrum-HelpText spectrum-HelpText--sizeM spectrum-HelpText--negative"
>
    <sp-icon-alert class="spectrum-HelpText-validationIcon"></sp-icon-alert>
    <div class="spectrum-HelpText-text">Help text content</div>
</div>
```

**Spectrum 2 (CSS spectrum-two branch) - Negative variant:**

```html
<div
    class="spectrum-HelpText spectrum-HelpText--sizeM spectrum-HelpText--negative"
>
    <sp-icon-alerttriangle
        class="spectrum-HelpText-validationIcon"
    ></sp-icon-alerttriangle>
    <div class="spectrum-HelpText-text">Help text content</div>
</div>
```

### Key Changes in HTML Structure

1. **Updated validation icon**: Changed from `sp-icon-alert` to `sp-icon-alerttriangle` for better visual consistency with other form validation elements
2. **Enhanced text alignment**: Added support for custom text alignment through CSS custom properties (`--mod-helptext-align-text`)

</details>

### CSS => SWC mapping

| CSS selector                                                                            | Attribute or slot         | Status          |
| --------------------------------------------------------------------------------------- | ------------------------- | --------------- |
| `.spectrum-HelpText`                                                                    | Base element              | Implemented     |
| `.spectrum-HelpText-text`                                                               | Text slot                 | Implemented     |
| `.spectrum-HelpText-validationIcon`                                                     | Icon element              | Implemented     |
| `.spectrum-HelpText.is-disabled`                                                        | `disabled` attribute      | Missing from WC (Implementation gap) |
| `.spectrum-HelpText--negative`                                                          | `variant="negative"`      | Implemented     |
| `.spectrum-HelpText--neutral`                                                           | `variant="neutral"`       | Implemented     |
| `.spectrum-HelpText--sizeL`                                                             | `size="l"`                | Implemented     |
| `.spectrum-HelpText--sizeS`                                                             | `size="s"`                | Implemented     |
| `.spectrum-HelpText--sizeXL`                                                            | `size="xl"`               | Implemented     |
| `.spectrum-HelpText:lang(ja), .spectrum-HelpText:lang(ko), .spectrum-HelpText:lang(zh)` | Language-specific styling | Implemented     |

## Summary of changes

### CSS => SWC implementation gaps

- **Disabled state**: The web component lacks a `disabled` attribute, which would be useful for form validation scenarios where help text should be visually de-emphasized when the associated input is disabled.

### CSS Spectrum 2 changes

- **Updated validation icon**: Changed the validation icon from `"Alert"` to `"AlertTriangle"` for better visual consistency with other form validation elements. This provides a more recognizable warning indicator for negative validation states.

## Resources

- [CSS migration](https://github.com/adobe/spectrum-css/pull/3628)
- [Spectrum 2 preview](https://spectrumcss.z13.web.core.windows.net/pr-2352/index.html?path=/docs/components-help-text--docs)

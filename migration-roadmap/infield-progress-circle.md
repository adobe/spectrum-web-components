# In-field progress circle migration roadmap

## Component specifications

### CSS

<details>
<summary>CSS selectors</summary>

- `.spectrum-InfieldProgressCircle`
- `.spectrum-InfieldProgressCircle .spectrum-ProgressCircle-fill`
- `.spectrum-InfieldProgressCircle--sizeL`
- `.spectrum-InfieldProgressCircle--sizeS`
- `.spectrum-InfieldProgressCircle--sizeXL`

</details>

<details>
<summary>Passthroughs</summary>

- `--mod-progress-circle-size`
- `--mod-progress-circle-thickness`

</details>

<details>
<summary>Modifiers</summary>

None found for this component.

</details>

### SWC

<details>
<summary>Attributes</summary>

- `indeterminate` (Boolean) - Whether the progress circle is in indeterminate state
- `label` (String) - Accessible label for the progress circle
- `progress` (Number) - Progress value (0-100)
- `size` (String) - Size of the progress circle: 's', 'm', 'l', 'xl'
- `static-color` (String) - Static color variant

</details>

<details>
<summary>Slots</summary>

- Default slot - Content inside the progress circle

</details>

### CSS => SWC mapping

| CSS selector                                                    | Attribute or slot     | Status             |
| --------------------------------------------------------------- | --------------------- | ------------------ |
| `.spectrum-InfieldProgressCircle`                               | Base element          | Implemented        |
| `.spectrum-InfieldProgressCircle .spectrum-ProgressCircle-fill` | Progress fill element | Implemented        |
| `.spectrum-InfieldProgressCircle--sizeL`                        | `size="l"`            | Implemented        |
| `.spectrum-InfieldProgressCircle--sizeS`                        | `size="s"`            | Implemented        |
| `.spectrum-InfieldProgressCircle--sizeXL`                       | `size="xl"`           | Implemented        |
| N/A                                                             | `indeterminate`       | Web component only |
| N/A                                                             | `label`               | Web component only |

## Summary of changes

### CSS => SWC implementation gaps

- **CSS coverage**: All CSS selectors are available in the `spectrum-two` branch, but the web component has not yet been implemented.

### CSS Spectrum 2 changes

- **New component introduction**: The infield progress circle is entirely new in the spectrum-two branch, designed specifically for inline loading states within form fields and input components.
- **Modular architecture**: Built as a wrapper around the base ProgressCircle component with infield-specific styling classes, promoting code reuse and consistency.
- **Comprehensive sizing**: Introduced S, M, L, and XL size variants to match the sizing scale used throughout the Spectrum design system.
- **Static color variants**: Added support for static color variants to ensure visibility in various background contexts and high-contrast scenarios.

## Resources

- [CSS migration](https://github.com/adobe/spectrum-css/pull/3430)

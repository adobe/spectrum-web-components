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

Since the infield progress circle doesn't exist as a separate web component, this mapping shows how it **could** work with the existing `sp-progress-circle` component:

| CSS selector                                                    | ProgressCircle attribute       | Status                       |
| --------------------------------------------------------------- | ------------------------------ | ---------------------------- |
| `.spectrum-InfieldProgressCircle`                               | `:host` (with infield classes) | Would need implementation    |
| `.spectrum-InfieldProgressCircle .spectrum-ProgressCircle-fill` | Progress fill element          | Available via ProgressCircle |
| `.spectrum-InfieldProgressCircle--sizeL`                        | `size="l"`                     | Available via ProgressCircle |
| `.spectrum-InfieldProgressCircle--sizeS`                        | `size="s"`                     | Available via ProgressCircle |
| `.spectrum-InfieldProgressCircle--sizeXL`                       | `size="xl"`                    | Available via ProgressCircle |
| N/A                                                             | `indeterminate`                | Available via ProgressCircle |
| N/A                                                             | `label`                        | Available via ProgressCircle |
| N/A                                                             | `progress`                     | Available via ProgressCircle |
| N/A                                                             | `static-color`                 | Available via ProgressCircle |

## Summary of changes

### CSS => SWC implementation gaps

- **Missing infield variant**: The infield progress circle doesn't exist as a separate web component. Implementation would likely involve extending the existing `sp-progress-circle` component with infield-specific styling classes, similar to how it's done in CSS.
- **Infield-specific styling**: The `.spectrum-InfieldProgressCircle` base class and its size variants would need to be implemented as additional CSS classes that can be applied to the base progress circle component.

### CSS Spectrum 2 changes

- **New component introduction**: The infield progress circle is entirely new in the spectrum-two branch, designed specifically for inline loading states within form fields and input components.
- **Modular architecture**: Built as a wrapper around the base ProgressCircle component with infield-specific styling classes, promoting code reuse and consistency.
- **Comprehensive sizing**: Introduced S, M, L, and XL size variants to match the sizing scale used throughout the Spectrum design system.
- **Static color variants**: Added support for static color variants to ensure visibility in various background contexts and high-contrast scenarios.

## Resources

- [CSS migration](https://github.com/adobe/spectrum-css/pull/3430)

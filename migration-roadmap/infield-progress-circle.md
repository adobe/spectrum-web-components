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

## Comparison

### DOM Structure changes

<details>
<summary>Spectrum Web Components:</summary>

```html
<slot></slot>
<div class="track"></div>
<div class="fills">
    <div class="fillMask1">
        <div class="fillSubMask1" style="transform: rotate(0deg);">
            <div class="fill"></div>
        </div>
    </div>
    <div class="fillMask2">
        <div class="fillSubMask2" style="transform: rotate(0deg);">
            <div class="fill"></div>
        </div>
    </div>
</div>
```

</details>

<details>
<summary>Legacy (CSS main branch):</summary>

```html
<!-- No template.js file exists in main branch -->
```

</details>

<details>
<summary>Spectrum 2 (CSS spectrum-two branch):</summary>

```html
<div
    class="spectrum-InfieldProgressCircle spectrum-InfieldProgressCircle--sizeM"
>
    <div class="spectrum-ProgressCircle-fill"></div>
</div>
```

</details>

<details>
<summary>Diff: Legacy (CSS main) → Spectrum 2 (CSS spectrum-two)</summary>

```diff
--- a/components/infieldprogresscircle/stories/template.js (main branch)
+++ b/components/infieldprogresscircle/stories/template.js (spectrum-two branch)
@@ -1,0 +1,22 @@
+import { Template as ProgressCircle } from "@spectrum-css/progresscircle/stories/template.js";
+import { capitalize } from "lodash-es";
+import "../index.css";
+
+export const Template = ({
+	customClasses = [],
+	rootClass = "spectrum-InfieldProgressCircle",
+	size = "m",
+	staticColor,
+	...item
+} = {}, context = {}) => ProgressCircle({
+	customClasses: [
+		rootClass,
+		typeof size !== "undefined" ? `${rootClass}--size${size.toUpperCase()}` : null,
+		typeof staticColor !== "undefined" ? `${rootClass}--static${capitalize(staticColor)}` : null,
+		...customClasses
+	].filter(Boolean),
+	size,
+	staticColor,
+	...item
+}, context );
```

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

- **New component introduction**: The infield progress circle is entirely new in the `spectrum-two` branch, designed specifically for inline loading states within form fields and input components.
- **Modular architecture**: Built as a wrapper around the base ProgressCircle component with infield-specific styling classes, promoting code reuse and consistency.
- **Comprehensive sizing**: Introduced S, M, L, and XL size variants to match the sizing scale used throughout the Spectrum design system.
- **Static color variants**: Added support for static color variants to ensure visibility in various background contexts and high-contrast scenarios.

## Resources

- [CSS migration](https://github.com/adobe/spectrum-css/pull/3430)

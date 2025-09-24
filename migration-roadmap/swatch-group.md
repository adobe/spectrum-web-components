# Swatch Group migration roadmap

## Component specifications

### CSS

<details>
<summary>CSS selectors</summary>

- `.spectrum-SwatchGroup`
- `.spectrum-SwatchGroup--compact`
- `.spectrum-SwatchGroup--spacious:has(.spectrum-Swatch--sizeM, .spectrum-Swatch--sizeL)`
- `.spectrum-SwatchGroup--spacious:has(.spectrum-Swatch--sizeXS, .spectrum-Swatch--sizeS)`

</details>

<details>
<summary>Passthroughs</summary>

- `--mod-swatch-border-opacity`

</details>

<details>
<summary>Modifiers</summary>

- `--mod-swatchgroup-spacing`

</details>

### SWC

<details>
<summary>Attributes</summary>

- `border` (string) - Border style: 'light', 'none'
- `density` (string) - Density: 'compact', 'spacious'
- `rounding` (string) - Corner rounding: 'none', 'full'
- `selected` (array) - Array of selected swatch values
- `selects` (string) - Selection mode: 'single', 'multiple'
- `shape` (string) - Shape variant: 'rectangle'
- `size` (string) - Size: 'xs', 's', 'm', 'l'

</details>

<details>
<summary>Slots</summary>

- Default slot - Swatch elements to manage as a group

</details>

## Comparison

### DOM Structure changes

<details>
<summary>Spectrum Web Components</summary>

```html
<slot @change="[handleChange]" @slotchange="[manageChange]">
    <!-- Swatch elements -->
</slot>
```

</details>

<details>
<summary>Legacy (CSS main branch)</summary>

```html
<div
    class="spectrum-SwatchGroup spectrum-SwatchGroup--compact"
    style="max-inline-size: [containerWidth]; size: calc([items.length] / 10 * 32px);"
    id="[id]"
>
    <!-- Swatch elements -->
</div>
```

</details>

<details>
<summary>Spectrum 2 (CSS spectrum-two branch)</summary>

```html
<div
    class="spectrum-SwatchGroup spectrum-SwatchGroup--compact"
    style="max-inline-size: [containerWidth]; size: calc([items.length] / 10 * 32px);"
    id="[id]"
>
    <!-- Swatch elements -->
</div>
```

</details>

<details>
<summary>Diff: Legacy (CSS main) → Spectrum 2 (CSS spectrum-two)</summary>

No significant structural changes.

</details>

### CSS => SWC mapping

| CSS selector                      | Attribute or slot    | Status           |
| --------------------------------- | -------------------- | ---------------- |
| `.spectrum-SwatchGroup--compact`  | `density="compact"`  | Implemented      |
| `.spectrum-SwatchGroup--spacious` | `density="spacious"` | Implemented      |
| `.spectrum-SwatchGroup`           | Base component       | Implemented      |
| -                                 | `border` attribute   | Missing from CSS |
| -                                 | `rounding` attribute | Missing from CSS |
| -                                 | `selected` attribute | Missing from CSS |
| -                                 | `selects` attribute  | Missing from CSS |
| -                                 | `shape` attribute    | Missing from CSS |
| -                                 | `size` attribute     | Missing from CSS |

## Summary of changes

### CSS => SWC implementation gaps

**CSS features missing from Web Component:**
None found for this component.

**Web Component features missing from CSS:**

- Border attribute support
- Rounding attribute support
- Selected state management
- Selection mode (single/multiple)
- Shape attribute support
- Size attribute support

### CSS Spectrum 2 changes

No significant structural changes between CSS main and spectrum-two branches. The templates are identical, indicating that the swatch group component structure remains consistent across Spectrum 2 migration.

## Resources

- [CSS migration](https://github.com/adobe/spectrum-css/pull/3677)
- [Spectrum 2 preview](https://spectrumcss.z13.web.core.windows.net/pr-2352/index.html?path=/docs/components-swatch-group--docs)
- [React](https://react-spectrum.adobe.com/s2/index.html?path=/docs/colorswatchpicker--docs)

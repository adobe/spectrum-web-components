# Swatch Group migration roadmap

## Component specifications

### CSS

<details>
<summary>CSS selectors</summary>

**Root class**: `.spectrum-SwatchGroup`

**Variants**:

- **Density**:
- `.spectrum-SwatchGroup--compact`
- `.spectrum-SwatchGroup--spacious`

</details>

<details>
<summary>Passthroughs</summary>

- `--mod-swatch-border-opacity`

</details>

<details>
<summary>Modifiers *deprecated*</summary>

- `--mod-swatchgroup-spacing`

</details>

### SWC

<details>
<summary>Attributes</summary>

- `border` (string) - Border style: 'light', 'none' **deprecated** (from Swatch component)
- `density` (string) - Density: 'compact', 'spacious'
- `rounding` (string) - Corner rounding: 'none', 'full'
- `shape` (string) - Shape variant: 'rectangle' **note**: should this be combined with rounding?
- `selected` (array) - Array of selected swatch values
- `selects` (string) - Selection mode: 'single', 'multiple' **note**: does this need any unique styles designed for single or multi-select swatch groups?
- `size` (string) - Size: 'xs', 's', 'm' (default), 'l'

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

| CSS selector                      | Attribute or slot    | Status                                                             |
| --------------------------------- | -------------------- | ------------------------------------------------------------------ |
| `.spectrum-SwatchGroup--compact`  | `density="compact"`  | Implemented                                                        |
| `.spectrum-SwatchGroup--spacious` | `density="spacious"` | Implemented                                                        |
| `.spectrum-SwatchGroup`           | Base component       | Implemented                                                        |
| -                                 | `border` attribute   | **deprecated** (from Swatch component)                             |
| -                                 | `rounding` attribute | See Swatch component                                               |
| -                                 | `selected` state     | See Swatch component                                               |
| -                                 | `selects` attribute  | No unique styles designed for single or multi-select swatch groups |
| -                                 | `shape` attribute    | See Swatch component                                               |
| -                                 | `size` attribute     | See Swatch component                                               |

## Summary of changes

### CSS => SWC implementation gaps

**CSS features missing from Web Component:**
None found for this component.

**Web Component features missing from CSS:**

None identified for this component.

### CSS Spectrum 2 changes

No significant structural changes between CSS main and spectrum-two branches. The templates are identical, indicating that the swatch group component structure remains consistent across Spectrum 2 migration. Swatch group includes a setting for single or multiple selection and it might be worth connecting with design to see if there should be any unique styles designed that differentiates single or multi-select swatch groups.

The border attribute is being removed from the group component as the border property is no longer customizable. The design direction is more opinionated for Spectrum 2 than it was for S1.

## Resources

- [CSS migration](https://github.com/adobe/spectrum-css/pull/3677)
- [Spectrum 2 preview](https://spectrumcss.z13.web.core.windows.net/pr-2352/index.html?path=/docs/components-swatch-group--docs)
- [React](https://react-spectrum.adobe.com/s2/index.html?path=/docs/colorswatchpicker--docs)

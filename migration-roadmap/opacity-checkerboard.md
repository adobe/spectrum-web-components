# Opacity Checkerboard migration roadmap

## Component specifications

### CSS

<details>
<summary>CSS selectors</summary>

**Root class**: `.spectrum-OpacityCheckerboard`

**Variants**:

- `.spectrum-OpacityCheckerboard--sizeS`

</details>

<details>
<summary>Passthroughs</summary>

None found for this component.

</details>

<details>
<summary>Modifiers *deprecated*</summary>

- `--mod-opacity-checkerboard-dark`
- `--mod-opacity-checkerboard-light`
- `--mod-opacity-checkerboard-position`
- `--mod-opacity-checkerboard-size`

</details>

### SWC

<details>
<summary>Attributes</summary>

None found for this component. This is a utility component used by other components.

</details>

<details>
<summary>Slots</summary>

None found for this component. This is a utility component used by other components.

</details>

## Comparison

### DOM Structure changes

<details>
<summary>Spectrum Web Components</summary>

```html
<!-- Used as a utility class in other components -->
<div class="opacity-checkerboard">
    <!-- Content -->
</div>
```

</details>

<details>
<summary>Legacy (CSS main branch)</summary>

```html
<div
    class="spectrum-OpacityCheckerboard spectrum-OpacityCheckerboard--sizeS"
    style="--mod-opacity-checkerboard-position: [backgroundPosition]; [customStyles]"
    role="[role]"
    id="[id]"
>
    <!-- Content -->
</div>
```

</details>

<details>
<summary>Spectrum 2 (CSS spectrum-two branch)</summary>

```html
<div
    class="spectrum-OpacityCheckerboard spectrum-OpacityCheckerboard--sizeS"
    style="--mod-opacity-checkerboard-position: [backgroundPosition]; [customStyles]"
    role="[role]"
    id="[id]"
>
    <!-- Content -->
</div>
```

</details>

<details>
<summary>Diff: Legacy (CSS main) → Spectrum 2 (CSS spectrum-two)</summary>

No significant structural changes.

</details>

### CSS => SWC mapping

| CSS selector                           | Attribute or slot | Status                 |
| -------------------------------------- | ----------------- | ---------------------- |
| `.spectrum-OpacityCheckerboard`        | Utility class     | Implemented as utility |
| `.spectrum-OpacityCheckerboard--sizeS` | Size variant      | Implemented as utility |

## Summary of changes

### CSS => SWC implementation gaps

**CSS features missing from Web Component:**
None found for this component. The opacity checkerboard is implemented as a utility class in the Web Components.

**Web Component features missing from CSS:**
None found for this component.

### CSS Spectrum 2 changes

No significant structural changes between CSS main and spectrum-two branches. The templates are identical, indicating that the opacity checkerboard component structure remains consistent across Spectrum 2 migration.

## Notes

The opacity checkerboard is a utility component that provides a checkerboard pattern background to highlight transparency in other components. It's not a standalone component but rather a utility class that's used by components like thumbnail, swatch, and others to provide visual indication of transparency.

## Resources

- [CSS migration](https://github.com/adobe/spectrum-css/pull/3394)
- [Spectrum 2 preview](https://spectrumcss.z13.web.core.windows.net/pr-2352/index.html?path=/docs/components-opacity-checkerboard--docs)
- [React](https://react-spectrum.adobe.com/s2/index.html?path=/docs/colorslider--docs) (not a standalone component, but styles are used by the color slider)

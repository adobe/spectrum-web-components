# Divider migration roadmap

## Component specifications

### CSS

<details>
<summary>CSS selectors</summary>

- `.spectrum-Divider`
- `.spectrum-Divider--sizeL`
- `.spectrum-Divider--sizeS`
- `.spectrum-Divider--staticBlack`
- `.spectrum-Divider--staticBlack.spectrum-Divider--sizeL`
- `.spectrum-Divider--staticWhite`
- `.spectrum-Divider--staticWhite.spectrum-Divider--sizeL`
- `.spectrum-Divider--vertical`
- `.spectrum-Divider:not(.spectrum-Divider.spectrum-Divider--vertical)`

</details>

<details>
<summary>Passthroughs</summary>

None found for this component.

</details>

<details>
<summary>Modifiers</summary>

- `--mod-divider-background-color`
- `--mod-divider-block-minimum-size`
- `--mod-divider-inline-minimum-size`
- `--mod-divider-thickness`
- `--mod-divider-vertical-align`
- `--mod-divider-vertical-height`
- `--mod-divider-vertical-margin`

</details>

### SWC

<details>
<summary>Attributes</summary>

- `size` (s, m, l)
- `vertical` (boolean)
- `static-color` (white, black)

</details>

<details>
<summary>Slots</summary>

None found for this component.

</details>

## Comparison

### DOM structure changes

<details>
<summary>Spectrum Web Components:</summary>

```html
<sp-divider>
    #shadow-root
    <!-- Empty - styling applied to :host -->
</sp-divider>
```

</details>

<details>
<summary>Legacy (CSS main branch):</summary>

```html
<hr
    class="spectrum-Divider spectrum-Divider--sizeM"
    style="min-inline-size: 200px;"
    role="separator"
/>
```

</details>

<details>
<summary>Spectrum 2 (CSS spectrum-two branch):</summary>

```html
<hr
    class="spectrum-Divider spectrum-Divider--sizeM"
    style=""
    role="separator"
/>
```

</details>

<details>
<summary>Diff: Legacy (CSS main) → Spectrum 2 (CSS spectrum-two)</summary>

```diff
<hr
    class="spectrum-Divider spectrum-Divider--sizeM"
-   style="min-inline-size: 200px;"
+   style=""
    role="separator"
/>
```

</details>

### CSS => SWC mapping

| CSS selector                                                          | Attribute or slot                   | Status      |
| --------------------------------------------------------------------- | ----------------------------------- | ----------- |
| `.spectrum-Divider--sizeS`                                            | `size="s"`                          | Implemented |
| `.spectrum-Divider--sizeL`                                            | `size="l"`                          | Implemented |
| `.spectrum-Divider--vertical`                                         | `vertical`                          | Implemented |
| `.spectrum-Divider--staticBlack`                                      | `static-color="black"`              | Implemented |
| `.spectrum-Divider--staticWhite`                                      | `static-color="white"`              | Implemented |
| `.spectrum-Divider`                                                   | Base component                      | Implemented |
| `.spectrum-Divider:not(.spectrum-Divider.spectrum-Divider--vertical)` | Default horizontal orientation      | Implemented |
| `.spectrum-Divider--staticBlack.spectrum-Divider--sizeL`              | `static-color="black"` + `size="l"` | Implemented |
| `.spectrum-Divider--staticWhite.spectrum-Divider--sizeL`              | `static-color="white"` + `size="l"` | Implemented |

## Summary of changes

### CSS => SWC implementation gaps

**No missing features.** All CSS selectors have corresponding web component attributes:

- **Size variants**: `--sizeS` → `size="s"`, `--sizeL` → `size="l"` (medium is default)
- **Orientation**: `--vertical` → `vertical` boolean attribute
- **Static colors**: `--staticBlack` → `static-color="black"`, `--staticWhite` → `static-color="white"`

### CSS Spectrum 2 changes

The main difference between the legacy (CSS main) and Spectrum 2 (CSS spectrum-two) branches is the removal of minimum dimension styling. Horizontal divider's minimum width and vertical divider's minimum height are now controlled by tokens.

## Resources

- [CSS migration](https://github.com/adobe/spectrum-css/pull/3557)
- [Spectrum 2 preview](https://spectrumcss.z13.web.core.windows.net/pr-2352/index.html?path=/docs/components-divider--docs)
- [React](https://react-spectrum.adobe.com/s2/index.html?path=/docs/divider--docs)

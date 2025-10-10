# Button Group migration roadmap

## Component specifications

### CSS

<details>
<summary>CSS selectors</summary>

- `.spectrum-ButtonGroup`
- `.spectrum-ButtonGroup-item`
- `.spectrum-ButtonGroup.spectrum-ButtonGroup--sizeS`
- `.spectrum-ButtonGroup.spectrum-ButtonGroup--vertical`

</details>

<details>
<summary>Passthroughs</summary>

None found for this component.

</details>

<details>
<summary>Modifiers</summary>

- `--mod-buttongroup-flex-wrap`
- `--mod-buttongroup-justify-content`
- `--mod-buttongroup-spacing`
- `--mod-buttongroup-spacing-horizontal` (deprecated in favor of --mod-buttongroup-spacing)
- `--mod-buttongroup-spacing-vertical` (deprecated in favor of --mod-buttongroup-spacing)

</details>

### SWC

<details>
<summary>Attributes</summary>

- `vertical`
- `size` (values: `s`, `m`, `l`, `xl`)

</details>

<details>
<summary>Slots</summary>

- Default slot (the sp-button elements that make up the group)

</details>

## Comparison

### DOM structure changes

<details>
<summary>Spectrum Web Components:</summary>

```html
<!-- Default slot for sp-button elements -->
<slot></slot>
```

</details>

<details>
<summary>Legacy (CSS main branch):</summary>

```html
<div class="spectrum-ButtonGroup spectrum-ButtonGroup--sizeM">
    <button class="spectrum-Button spectrum-ButtonGroup-item">...</button>
    <button class="spectrum-Button spectrum-ButtonGroup-item">...</button>
    <button class="spectrum-Button spectrum-ButtonGroup-item">...</button>
</div>
```

</details>

<details>
<summary>Spectrum 2 (CSS spectrum-two branch):</summary>

```html
<div class="spectrum-ButtonGroup spectrum-ButtonGroup--sizeM">
    <button class="spectrum-Button spectrum-ButtonGroup-item">...</button>
    <button class="spectrum-Button spectrum-ButtonGroup-item">...</button>
    <button class="spectrum-Button spectrum-ButtonGroup-item">...</button>
</div>
```

</details>

<details>
<summary>Diff: Legacy (CSS main) → Spectrum 2 (CSS spectrum-two)</summary>

**No differences found between main and spectrum-two branches.**

</details>

### CSS => SWC mapping

| CSS selector                      | Attribute or slot             | Status                                                                                  |
| --------------------------------- | ----------------------------- | --------------------------------------------------------------------------------------- |
| `.spectrum-ButtonGroup`           | Base component                | Implemented                                                                             |
| `.spectrum-ButtonGroup--sizeS`    | `size="s"`                    | Implemented (there are spacing differences for size small in comparison to the default) |
| `.spectrum-ButtonGroup--vertical` | `vertical`                    | Implemented                                                                             |
| `.spectrum-ButtonGroup-item`      | Default slot / `::slotted(*)` | Implemented                                                                             |

## Summary of changes

### CSS => SWC implementation gaps

**Missing from WC:**
None. All CSS selectors have corresponding web component implementations.

**Missing from CSS:**
None. The web component attributes all map to CSS classes.

### CSS Spectrum 2 changes

**No structural changes:**
The Button Group template is identical between the main branch (legacy) and spectrum-two branch (Spectrum 2). Both branches use the same DOM structure with:

- A `div` wrapper with `spectrum-ButtonGroup` class
- Size classes applied via `--size{size}` modifier pattern
- `--vertical` modifier for vertical layout
- Child buttons with `spectrum-ButtonGroup-item` class

The component structure remains stable across both versions of Spectrum.

## Resources

- [CSS migration](https://github.com/adobe/spectrum-css/pull/2457)
- [Spectrum 2 preview](https://spectrumcss.z13.web.core.windows.net/pr-2352/index.html?path=/docs/components-button-group--docs)
- [React](https://react-spectrum.adobe.com/s2/index.html?path=/docs/buttongroup--docs)

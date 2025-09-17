# Radio migration roadmap

## Component specifications

### CSS

<details>
<summary>CSS selectors</summary>

- `.spectrum-Radio`
- `.spectrum-Radio .spectrum-Radio-button:after`
- `.spectrum-Radio .spectrum-Radio-input:checked:disabled + .spectrum-Radio-button:before`
- `.spectrum-Radio .spectrum-Radio-input:checked:disabled ~ .spectrum-Radio-label`
- `.spectrum-Radio .spectrum-Radio-input:disabled + .spectrum-Radio-button:before`
- `.spectrum-Radio .spectrum-Radio-input:disabled ~ .spectrum-Radio-label`
- `.spectrum-Radio--emphasized .spectrum-Radio-input:checked + .spectrum-Radio-button:before`
- `.spectrum-Radio--emphasized:active .spectrum-Radio-input:checked + .spectrum-Radio-button:before`
- `.spectrum-Radio--emphasized:focus .spectrum-Radio-input:checked + .spectrum-Radio-button:before`
- `.spectrum-Radio--emphasized:hover .spectrum-Radio-input:checked + .spectrum-Radio-button:before`
- `.spectrum-Radio--sizeL`
- `.spectrum-Radio--sizeS`
- `.spectrum-Radio--sizeXL`
- `.spectrum-Radio-button`
- `.spectrum-Radio-button:after`
- `.spectrum-Radio-button:before`
- `.spectrum-Radio-input`
- `.spectrum-Radio-input:checked + .spectrum-Radio-button:before`
- `.spectrum-Radio-input:disabled`
- `.spectrum-Radio-input:focus-visible + .spectrum-Radio-button:after`
- `.spectrum-Radio-label`
- `.spectrum-Radio-label:lang(ja)`
- `.spectrum-Radio-label:lang(ko)`
- `.spectrum-Radio-label:lang(zh)`
- `.spectrum-Radio.is-active .spectrum-Radio-button:before`
- `.spectrum-Radio.is-active .spectrum-Radio-input:checked + .spectrum-Radio-button:before`
- `.spectrum-Radio.is-active .spectrum-Radio-label`
- `.spectrum-Radio.is-readOnly .spectrum-Radio-input`
- `.spectrum-Radio.is-readOnly .spectrum-Radio-input + .spectrum-Radio-button:before`
- `.spectrum-Radio.is-readOnly .spectrum-Radio-input:checked:disabled ~ .spectrum-Radio-label`
- `.spectrum-Radio.is-readOnly .spectrum-Radio-input:disabled ~ .spectrum-Radio-label`
- `.spectrum-Radio.is-readOnly .spectrum-Radio-label`
- `.spectrum-Radio.is-readOnly:hover .spectrum-Radio-input + .spectrum-Radio-button:before`
- `.spectrum-Radio:active .spectrum-Radio-button:before`
- `.spectrum-Radio:active .spectrum-Radio-input:checked + .spectrum-Radio-button:before`
- `.spectrum-Radio:active .spectrum-Radio-label`
- `.spectrum-Radio:dir(rtl) .spectrum-Radio-button:after`
- `.spectrum-Radio:focus .spectrum-Radio-button:after`
- `.spectrum-Radio:focus .spectrum-Radio-button:before`
- `.spectrum-Radio:focus .spectrum-Radio-input:checked + .spectrum-Radio-button:before`
- `.spectrum-Radio:focus .spectrum-Radio-label`
- `.spectrum-Radio:hover .spectrum-Radio-button:before`
- `.spectrum-Radio:hover .spectrum-Radio-input:checked + .spectrum-Radio-button:before`
- `.spectrum-Radio:hover .spectrum-Radio-label`
- `.spectrum-Radio:lang(ja)`
- `.spectrum-Radio:lang(ko)`
- `.spectrum-Radio:lang(zh)`
- `.spectrum-Radio:not(.is-readOnly):active .spectrum-Radio-input:not(:disabled) + .spectrum-Radio-button`

</details>

<details>
<summary>Passthroughs</summary>

None found for this component.

</details>

<details>
<summary>Modifiers</summary>

- `--mod-radio-animation-duration`
- `--mod-radio-border-width`
- `--mod-radio-button-background-color`
- `--mod-radio-button-border-color-default`
- `--mod-radio-button-border-color-down`
- `--mod-radio-button-border-color-focus`
- `--mod-radio-button-border-color-hover`
- `--mod-radio-button-checked-border-color-default`
- `--mod-radio-button-checked-border-color-down`
- `--mod-radio-button-checked-border-color-focus`
- `--mod-radio-button-checked-border-color-hover`
- `--mod-radio-button-control-size`
- `--mod-radio-button-top-to-control`
- `--mod-radio-disabled-border-color`
- `--mod-radio-disabled-content-color`
- `--mod-radio-emphasized-accent-color`
- `--mod-radio-emphasized-accent-color-down`
- `--mod-radio-emphasized-accent-color-focus`
- `--mod-radio-emphasized-accent-color-hover`
- `--mod-radio-focus-indicator-color`
- `--mod-radio-focus-indicator-thickness`
- `--mod-radio-font-size`
- `--mod-radio-height`
- `--mod-radio-line-height`
- `--mod-radio-line-height-cjk`
- `--mod-radio-neutral-content-color`
- `--mod-radio-neutral-content-color-down`
- `--mod-radio-neutral-content-color-focus`
- `--mod-radio-neutral-content-color-hover`
- `--mod-radio-text-to-control`

</details>

### SWC

<details>
<summary>Attributes</summary>

- `autofocus` - Boolean attribute for auto-focusing the radio button
- `value` - String attribute identifying this radio button within its group
- `checked` - Boolean attribute representing when the input is checked
- `disabled` - Boolean attribute for disabled state
- `emphasized` - Boolean attribute for emphasized styling
- `invalid` - Boolean attribute for invalid state styling
- `readonly` - Boolean attribute for read-only state
- `size` - String attribute with values: `s`, `m`, `l`, `xl` (from SizedMixin)

</details>

<details>
<summary>Slots</summary>

- Default slot - Text label of the Radio button

</details>

## Comparison

### DOM Structure changes

<details>
<summary>Spectrum Web Components:</summary>

```html
<!-- Current HTML structure from web component render() method -->
<div id="input"></div>
<span id="button"></span>
<span id="label" role="presentation">
    <slot></slot>
</span>
```

</details>

<details>
<summary>Legacy (CSS main branch):</summary>

```html
<div class="spectrum-Radio spectrum-Radio--sizeM">
    <input
        type="radio"
        name=""
        class="spectrum-Radio-input"
        id="radio-input-123"
        checked="false"
        disabled="false"
    />
    <span class="spectrum-Radio-button spectrum-Radio-button--sizeS"></span>
    <label
        class="spectrum-Radio-label spectrum-Radio-label--sizeS"
        for="radio-input-123"
    >
        Radio Button Label
    </label>
</div>
```

</details>

<details>
<summary>Spectrum 2 (CSS spectrum-two branch):</summary>

```html
<div class="spectrum-Radio spectrum-Radio--sizeM">
    <input
        type="radio"
        name=""
        class="spectrum-Radio-input is-focus-visible is-active"
        id="radio-input-123"
        checked="false"
        disabled="false"
    />
    <span class="spectrum-Radio-button spectrum-Radio-button--sizeS"></span>
    <label
        class="spectrum-Radio-label spectrum-Radio-label--sizeS"
        for="radio-input-123"
    >
        Radio Button Label
    </label>
</div>
```

</details>

<details>
<summary>Diff: Legacy (CSS main) → Spectrum 2 (CSS spectrum-two)</summary>

**No differences found between main and spectrum-two branches.**

</details>

### CSS => SWC mapping

| CSS selector                                                                                         | Attribute or slot                        | Status           |
| ---------------------------------------------------------------------------------------------------- | ---------------------------------------- | ---------------- |
| `.spectrum-Radio`                                                                                    | `:host`                                  | Implemented      |
| `.spectrum-Radio--emphasized`                                                                        | `emphasized` attribute                   | Implemented      |
| `.spectrum-Radio--sizeS`                                                                             | `size="s"` attribute                     | Implemented      |
| `.spectrum-Radio--sizeL`                                                                             | `size="l"` attribute                     | Implemented      |
| `.spectrum-Radio--sizeXL`                                                                            | `size="xl"` attribute                    | Implemented      |
| `.spectrum-Radio-input`                                                                              | Internal radio input element, `#input`   | Implemented      |
| `.spectrum-Radio-input:checked`                                                                      | `checked` attribute                      | Implemented      |
| `.spectrum-Radio-input:disabled`                                                                     | `disabled` attribute                     | Implemented      |
| `.spectrum-Radio-button`                                                                             | Internal radio button element, `#button` | Implemented      |
| `.spectrum-Radio-label`                                                                              | Default slot content                     | Implemented      |
| `.spectrum-Radio-label:lang(ja)`, `.spectrum-Radio-label:lang(ko)`, `.spectrum-Radio-label:lang(zh)` | Language-specific styling                | Implemented      |
| `.spectrum-Radio.is-readOnly`                                                                        | `readonly` attribute                     | Implemented      |
|                                                                                                      | `invalid` attribute                      | Missing from CSS |
|                                                                                                      | `autofocus` attribute                    | Missing from CSS |

## Summary of changes

### CSS => SWC implementation gaps

**New for S2:**
The radio component in Spectrum 2 has the new down state (active) perspective shift applied.

### CSS Spectrum 2 changes

No structural differences found between the legacy (CSS main) and Spectrum 2 (CSS spectrum-two) branches. The template structure and class naming remain consistent across both branches.

## Resources

- [CSS migration](https://github.com/adobe/spectrum-css/pull/3555)
- [Spectrum 2 preview](https://spectrumcss.z13.web.core.windows.net/pr-2352/index.html?path=/docs/components-radio--docs)
- [React](https://react-spectrum.adobe.com/s2/index.html?path=/docs/radiogroup--docs)

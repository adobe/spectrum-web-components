# Checkbox migration roadmap

## Component specifications

### CSS

<details>
<summary>CSS selectors</summary>

- `.spectrum-Checkbox`
- `.spectrum-Checkbox .spectrum-Checkbox-box`
- `.spectrum-Checkbox .spectrum-Checkbox-box:after`
- `.spectrum-Checkbox .spectrum-Checkbox-box:before`
- `.spectrum-Checkbox .spectrum-Checkbox-checkmark`
- `.spectrum-Checkbox .spectrum-Checkbox-input`
- `.spectrum-Checkbox .spectrum-Checkbox-input:checked + .spectrum-Checkbox-box .spectrum-Checkbox-checkmark`
- `.spectrum-Checkbox .spectrum-Checkbox-input:checked + .spectrum-Checkbox-box:before`
- `.spectrum-Checkbox .spectrum-Checkbox-input:checked:disabled + .spectrum-Checkbox-box:before`
- `.spectrum-Checkbox .spectrum-Checkbox-input:checked:disabled ~ .spectrum-Checkbox-label`
- `.spectrum-Checkbox .spectrum-Checkbox-input:checked:hover:disabled + .spectrum-Checkbox-box:before`
- `.spectrum-Checkbox .spectrum-Checkbox-input:disabled`
- `.spectrum-Checkbox .spectrum-Checkbox-input:disabled + .spectrum-Checkbox-box:before`
- `.spectrum-Checkbox .spectrum-Checkbox-input:disabled ~ .spectrum-Checkbox-label`
- `.spectrum-Checkbox .spectrum-Checkbox-input:focus-visible + .spectrum-Checkbox-box:after`
- `.spectrum-Checkbox .spectrum-Checkbox-input:focus-visible + .spectrum-Checkbox-box:before`
- `.spectrum-Checkbox .spectrum-Checkbox-input:focus-visible + .spectrum-Checkbox-label`
- `.spectrum-Checkbox .spectrum-Checkbox-input:hover:disabled + .spectrum-Checkbox-box:before`
- `.spectrum-Checkbox .spectrum-Checkbox-label`
- `.spectrum-Checkbox .spectrum-Checkbox-partialCheckmark`
- `.spectrum-Checkbox--emphasized.is-indeterminate .spectrum-Checkbox-box:before`
- `.spectrum-Checkbox--emphasized.is-indeterminate .spectrum-Checkbox-input:checked + .spectrum-Checkbox-box:before`
- `.spectrum-Checkbox--emphasized.is-indeterminate:hover .spectrum-Checkbox-box:before`
- `.spectrum-Checkbox--emphasized.is-indeterminate:hover .spectrum-Checkbox-input:checked + .spectrum-Checkbox-box:before`
- `.spectrum-Checkbox--emphasized.is-indeterminate:not(.is-invalid) .spectrum-Checkbox-input:focus-visible + .spectrum-Checkbox-box:before`
- `.spectrum-Checkbox--emphasized:not(.is-invalid) .spectrum-Checkbox-input:focus-visible:checked + .spectrum-Checkbox-box:before`
- `.spectrum-Checkbox-input:focus-visible + .spectrum-Checkbox-box`
- `.spectrum-Checkbox.is-indeterminate .spectrum-Checkbox-box .spectrum-Checkbox-checkmark`
- `.spectrum-Checkbox.is-indeterminate .spectrum-Checkbox-box .spectrum-Checkbox-partialCheckmark`
- `.spectrum-Checkbox.is-indeterminate .spectrum-Checkbox-box:before`
- `.spectrum-Checkbox.is-indeterminate .spectrum-Checkbox-input:checked + .spectrum-Checkbox-box .spectrum-Checkbox-checkmark`
- `.spectrum-Checkbox.is-indeterminate .spectrum-Checkbox-input:checked + .spectrum-Checkbox-box .spectrum-Checkbox-partialCheckmark`
- `.spectrum-Checkbox.is-indeterminate .spectrum-Checkbox-input:checked + .spectrum-Checkbox-box:before`
- `.spectrum-Checkbox.is-invalid`
- `.spectrum-Checkbox.is-invalid.is-indeterminate .spectrum-Checkbox-box:before`
- `.spectrum-Checkbox.is-invalid.is-indeterminate .spectrum-Checkbox-input:checked:not(:disabled) + .spectrum-Checkbox-box:before`
- `.spectrum-Checkbox.is-invalid.is-indeterminate .spectrum-Checkbox-input:focus-visible + .spectrum-Checkbox-box:before`
- `.spectrum-Checkbox.is-invalid.is-indeterminate:hover .spectrum-Checkbox-box:before`
- `.spectrum-Checkbox.is-invalid.is-indeterminate:hover .spectrum-Checkbox-input:checked:not(:disabled) + .spectrum-Checkbox-box:before`
- `.spectrum-Checkbox.spectrum-Checkbox--emphasized`
- `.spectrum-Checkbox.spectrum-Checkbox--sizeL`
- `.spectrum-Checkbox.spectrum-Checkbox--sizeS`
- `.spectrum-Checkbox.spectrum-Checkbox--sizeXL`
- `.spectrum-Checkbox:active .spectrum-Checkbox-box:before`
- `.spectrum-Checkbox:active .spectrum-Checkbox-input:checked + .spectrum-Checkbox-box:before`
- `.spectrum-Checkbox:active .spectrum-Checkbox-label`
- `.spectrum-Checkbox:hover .spectrum-Checkbox-box:before`
- `.spectrum-Checkbox:hover .spectrum-Checkbox-input:checked + .spectrum-Checkbox-box:before`
- `.spectrum-Checkbox:hover .spectrum-Checkbox-label`
- `.spectrum-Checkbox:lang(ja)`
- `.spectrum-Checkbox:lang(ko)`
- `.spectrum-Checkbox:lang(zh)`
- `.spectrum-Checkbox:not(.is-readOnly) .spectrum-Checkbox-input:active:not(:disabled) + .spectrum-Checkbox-box`
- `.spectrum-Checkbox:not(.is-readOnly):active .spectrum-Checkbox-input:not(:disabled) + .spectrum-Checkbox-box`

</details>

<details>
<summary>Passthroughs</summary>

None found for this component.

</details>

<details>
<summary>Modifiers</summary>

- `--mod-checkbox-animation-duration`
- `--mod-checkbox-border-width`
- `--mod-checkbox-bottom-to-text`
- `--mod-checkbox-checkmark-color`
- `--mod-checkbox-content-color-default`
- `--mod-checkbox-content-color-disabled`
- `--mod-checkbox-content-color-down`
- `--mod-checkbox-content-color-focus`
- `--mod-checkbox-content-color-hover`
- `--mod-checkbox-control-color-default`
- `--mod-checkbox-control-color-disabled`
- `--mod-checkbox-control-color-down`
- `--mod-checkbox-control-color-focus`
- `--mod-checkbox-control-color-hover`
- `--mod-checkbox-control-corner-radius`
- `--mod-checkbox-control-selected-color-default`
- `--mod-checkbox-control-selected-color-down`
- `--mod-checkbox-control-selected-color-hover`
- `--mod-checkbox-control-size`
- `--mod-checkbox-focus-indicator-color`
- `--mod-checkbox-focus-indicator-gap`
- `--mod-checkbox-focus-indicator-thickness`
- `--mod-checkbox-font-size`
- `--mod-checkbox-height`
- `--mod-checkbox-line-height`
- `--mod-checkbox-line-height-cjk`
- `--mod-checkbox-margin-block`
- `--mod-checkbox-selected-border-width`
- `--mod-checkbox-text-to-control`
- `--mod-checkbox-top-to-text`
- `--mod-focus-indicator-thickness`

</details>

### SWC

<details>
<summary>Attributes</summary>

- `disabled` - Boolean attribute to disable the checkbox
- `indeterminate` - Boolean attribute for indeterminate state
- `invalid` - Boolean attribute for invalid state styling
- `emphasized` - Boolean attribute for emphasized styling
- `checked` - Boolean attribute for checked state (inherited from CheckboxMixin)
- `name` - String attribute for form submission (inherited from CheckboxMixin)
- `readonly` - Boolean attribute for read-only state (inherited from CheckboxMixin)
- `size` - String attribute with values: `s`, `m`, `l`, `xl` (from SizedMixin)
- `tabindex` - Number attribute for tab order management
- `autofocus` - Boolean HTML attribute for auto-focusing (handled in connectedCallback)

</details>

<details>
<summary>Slots</summary>

- Default slot - Content to display as the label for the Checkbox

</details>

## Comparison

### DOM Structure changes

<details>
<summary>Spectrum Web Components:</summary>

```html
<!-- Current HTML structure from web component render() method -->
<input
    id="input"
    name="example-name"
    type="checkbox"
    .checked="true"
    ?disabled="false"
    @change="handleChange"
/>
<span id="box">
    <sp-icon-checkmark100
        id="checkmark"
        class="spectrum-Icon spectrum-UIIcon-Checkmark100"
    ></sp-icon-checkmark100>
    <sp-icon-dash100
        id="partialCheckmark"
        class="spectrum-Icon spectrum-UIIcon-Dash100"
    ></sp-icon-dash100>
</span>
<label id="label" for="input"><slot></slot></label>
```

</details>

<details>
<summary>Legacy (CSS main branch):</summary>

```html
<label
    class="spectrum-Checkbox spectrum-Checkbox--sizeM spectrum-Checkbox--emphasized is-indeterminate is-disabled is-invalid is-hover is-readOnly"
>
    <input
        type="checkbox"
        class="spectrum-Checkbox-input"
        aria-labelledby="label-123"
        aria-disabled="true"
        checked="false"
        disabled="false"
        title="Checkbox title"
        value="checkbox-value"
        id="checkbox-input-123"
    />
    <span class="spectrum-Checkbox-box">
        <svg
            class="spectrum-Icon spectrum-UIIcon-Checkmark75 spectrum-Checkbox-checkmark"
        ></svg>
        <svg
            class="spectrum-Icon spectrum-UIIcon-Dash75 spectrum-Checkbox-partialCheckmark"
        ></svg>
    </span>
    <span class="spectrum-Checkbox-label">Checkbox Label</span>
</label>
```

</details>

<details>
<summary>Spectrum 2 (CSS spectrum-two branch):</summary>

```html
<label
    class="spectrum-Checkbox spectrum-Checkbox--sizeM spectrum-Checkbox--emphasized is-indeterminate is-disabled is-invalid is-hover is-readOnly is-active"
>
    <input
        type="checkbox"
        class="spectrum-Checkbox-input is-focus-visible is-active"
        aria-labelledby="label-123"
        aria-disabled="true"
        checked="false"
        disabled="false"
        title="Checkbox title"
        value="checkbox-value"
        id="checkbox-input-123"
    />
    <span class="spectrum-Checkbox-box">
        <svg
            class="spectrum-Icon spectrum-UIIcon-Checkmark75 spectrum-Checkbox-checkmark"
        ></svg>
        <svg
            class="spectrum-Icon spectrum-UIIcon-Dash75 spectrum-Checkbox-partialCheckmark"
        ></svg>
    </span>
    <span class="spectrum-Checkbox-label">Checkbox Label</span>
</label>
```

</details>

<details>
<summary>Diff: Legacy (CSS main) → Spectrum 2 (CSS spectrum-two)</summary>

**No differences found between main and spectrum-two branches.**

</details>

### CSS => SWC mapping

| CSS selector                                                                                | Attribute or slot                                    | Status           |
| ------------------------------------------------------------------------------------------- | ---------------------------------------------------- | ---------------- |
| `.spectrum-Checkbox`                                                                        | `:host`                                              | Implemented      |
| `.spectrum-Checkbox--emphasized`                                                            | `emphasized` attribute                               | Implemented      |
| `.spectrum-Checkbox--sizeS`                                                                 | `size="s"` attribute                                 | Implemented      |
| `.spectrum-Checkbox--sizeL`                                                                 | `size="l"` attribute                                 | Implemented      |
| `.spectrum-Checkbox--sizeXL`                                                                | `size="xl"` attribute                                | Implemented      |
| `.spectrum-Checkbox.is-indeterminate`                                                       | `indeterminate` attribute                            | Implemented      |
| `.spectrum-Checkbox.is-invalid`                                                             | `invalid` attribute                                  | Implemented      |
| `.spectrum-Checkbox-input`                                                                  | Internal checkbox input element, `#input`            | Implemented      |
| `.spectrum-Checkbox-input:checked`                                                          | `checked` attribute                                  | Implemented      |
| `.spectrum-Checkbox-input:disabled`                                                         | `disabled` attribute                                 | Implemented      |
| `.spectrum-Checkbox-box`                                                                    | Internal checkbox box element, `#box`                | Implemented      |
| `.spectrum-Checkbox-checkmark`                                                              | Checkmark icon element, `#checkmark`                 | Implemented      |
| `.spectrum-Checkbox-partialCheckmark`                                                       | Indeterminate dash icon element, `#partialCheckmark` | Implemented      |
| `.spectrum-Checkbox-label`                                                                  | Default slot content                                 | Implemented      |
| `.spectrum-Checkbox:lang(ja)`, `.spectrum-Checkbox:lang(ko)`, `.spectrum-Checkbox:lang(zh)` | Language-specific styling                            | Implemented      |
| `.spectrum-Checkbox.is-readOnly`                                                            | `readonly` attribute                                 | Implemented      |
|                                                                                             | `name` attribute                                     | Missing from CSS |
|                                                                                             | `tabindex` attribute                                 | Missing from CSS |
|                                                                                             | `autofocus` attribute                                | Missing from CSS |

## Summary of changes

### CSS => SWC implementation gaps

**New for S2:**
The checkbox component in Spectrum 2 has the new down state (active) perspective shift applied.

Note: There is some discussion ongoing about the invalid styles for checkbox. Currently, CSS supports individual red borders on the checkbox component, however, these styles are not present in the Figma specs for checkbox. The only invalid styling supported by design is the negative help text found in the field group component. When migrating, we'll need to consider clarifying the invalid styling with the design team for individual checkboxes.

**Features Missing from CSS:**

- `name` attribute for form submission has no corresponding CSS selector
- `tabindex` attribute for accessibility has no CSS representation
- `autofocus` attribute functionality implemented in JavaScript but has no CSS counterpart

### CSS Spectrum 2 changes

No structural differences found between the legacy (CSS main) and Spectrum 2 (CSS spectrum-two) branches. The template structure and class naming remain consistent across both branches.

## Resources

- [CSS migration](https://github.com/adobe/spectrum-css/pull/3531)
- [Spectrum 2 preview](https://spectrumcss.z13.web.core.windows.net/pr-2352/index.html?path=/docs/components-checkbox--docs)
- [React](https://react-spectrum.adobe.com/s2/index.html?path=/docs/checkbox--docs)

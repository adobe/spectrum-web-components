# Switch migration roadmap

## Component specifications

### CSS

<details>
<summary>CSS selectors</summary>

- `.spectrum-Switch`
- `.spectrum-Switch .spectrum-Switch-input:disabled + .spectrum-Switch-switch`
- `.spectrum-Switch .spectrum-Switch-input:disabled + .spectrum-Switch-switch:before`
- `.spectrum-Switch .spectrum-Switch-input:disabled ~ .spectrum-Switch-label`
- `.spectrum-Switch .spectrum-Switch-input:disabled:checked + .spectrum-Switch-switch`
- `.spectrum-Switch .spectrum-Switch-input:disabled:checked + .spectrum-Switch-switch:before`
- `.spectrum-Switch .spectrum-Switch-input[disabled] + .spectrum-Switch-switch`
- `.spectrum-Switch .spectrum-Switch-input[disabled] + .spectrum-Switch-switch:before`
- `.spectrum-Switch .spectrum-Switch-input[disabled] ~ .spectrum-Switch-label`
- `.spectrum-Switch .spectrum-Switch-input[disabled]:checked + .spectrum-Switch-switch`
- `.spectrum-Switch .spectrum-Switch-input[disabled]:checked + .spectrum-Switch-switch:before`
- `.spectrum-Switch--active .spectrum-Switch-input:checked + .spectrum-Switch-switch`
- `.spectrum-Switch--active .spectrum-Switch-input:checked + .spectrum-Switch-switch:before`
- `.spectrum-Switch--active .spectrum-Switch-input:not(:disabled) + .spectrum-Switch-switch:before`
- `.spectrum-Switch--active .spectrum-Switch-input:not(:disabled):checked + .spectrum-Switch-switch:before`
- `.spectrum-Switch--active .spectrum-Switch-input:not(:disabled):checked + .spectrum-Switch-switch:before:dir(rtl)`
- `.spectrum-Switch--disabled`
- `.spectrum-Switch--sizeL`
- `.spectrum-Switch--sizeS`
- `.spectrum-Switch--sizeXL`
- `.spectrum-Switch-input`
- `.spectrum-Switch-input:checked + .spectrum-Switch-switch`
- `.spectrum-Switch-input:checked + .spectrum-Switch-switch:before`
- `.spectrum-Switch-input:checked + .spectrum-Switch-switch:before:dir(rtl)`
- `.spectrum-Switch-input:checked:focus-visible + .spectrum-Switch-switch`
- `.spectrum-Switch-input:disabled`
- `.spectrum-Switch-input:focus-visible + .spectrum-Switch-switch`
- `.spectrum-Switch-input:focus-visible + .spectrum-Switch-switch:after`
- `.spectrum-Switch-input:focus-visible + .spectrum-Switch-switch:before`
- `.spectrum-Switch-input:focus-visible ~ .spectrum-Switch-label`
- `.spectrum-Switch-input[disabled]`
- `.spectrum-Switch-label`
- `.spectrum-Switch-label:lang(ja)`, `.spectrum-Switch-label:lang(ko)`, `.spectrum-Switch-label:lang(zh)`
- `.spectrum-Switch-switch`
- `.spectrum-Switch-switch .spectrum-Switch--active`
- `.spectrum-Switch-switch:after`
- `.spectrum-Switch-switch:before`
- `.spectrum-Switch.spectrum-Switch--emphasized`
- `.spectrum-Switch.spectrum-Switch:active .spectrum-Switch-input:checked + .spectrum-Switch-switch`
- `.spectrum-Switch.spectrum-Switch:active .spectrum-Switch-input:checked + .spectrum-Switch-switch:before`
- `.spectrum-Switch.spectrum-Switch:active .spectrum-Switch-switch`
- `.spectrum-Switch.spectrum-Switch:active .spectrum-Switch-switch:before`
- `.spectrum-Switch:active .spectrum-Switch-input:not(:disabled) + .spectrum-Switch-switch:before`
- `.spectrum-Switch:active .spectrum-Switch-input:not(:disabled):checked + .spectrum-Switch-switch:before`
- `.spectrum-Switch:active .spectrum-Switch-input:not(:disabled):checked + .spectrum-Switch-switch:before:dir(rtl)`
- `.spectrum-Switch:active ~ .spectrum-Switch-label`
- `.spectrum-Switch:hover .spectrum-Switch-input:checked + .spectrum-Switch-switch`
- `.spectrum-Switch:hover .spectrum-Switch-input:checked + .spectrum-Switch-switch:before`
- `.spectrum-Switch:hover .spectrum-Switch-input:disabled + .spectrum-Switch-switch`
- `.spectrum-Switch:hover .spectrum-Switch-input:disabled + .spectrum-Switch-switch:before`
- `.spectrum-Switch:hover .spectrum-Switch-input:disabled ~ .spectrum-Switch-label`
- `.spectrum-Switch:hover .spectrum-Switch-input:disabled:checked + .spectrum-Switch-switch`
- `.spectrum-Switch:hover .spectrum-Switch-input:disabled:checked + .spectrum-Switch-switch:before`
- `.spectrum-Switch:hover .spectrum-Switch-input[disabled] + .spectrum-Switch-switch`
- `.spectrum-Switch:hover .spectrum-Switch-input[disabled] + .spectrum-Switch-switch:before`
- `.spectrum-Switch:hover .spectrum-Switch-input[disabled] ~ .spectrum-Switch-label`
- `.spectrum-Switch:hover .spectrum-Switch-input[disabled]:checked + .spectrum-Switch-switch`
- `.spectrum-Switch:hover .spectrum-Switch-input[disabled]:checked + .spectrum-Switch-switch:before`
- `.spectrum-Switch:hover .spectrum-Switch-switch`
- `.spectrum-Switch:hover .spectrum-Switch-switch:before`
- `.spectrum-Switch:hover ~ .spectrum-Switch-label`

</details>

<details>
<summary>Passthroughs</summary>

None found for this component.

</details>

<details>
<summary>Modifiers</summary>

- `--mod-switch-animation-duration-switch`
- `--mod-switch-background-color`
- `--mod-switch-background-color-disabled`
- `--mod-switch-background-color-selected-default`
- `--mod-switch-background-color-selected-disabled`
- `--mod-switch-background-color-selected-down`
- `--mod-switch-background-color-selected-focus`
- `--mod-switch-background-color-selected-hover`
- `--mod-switch-border-color-default`
- `--mod-switch-border-color-disabled`
- `--mod-switch-border-color-down`
- `--mod-switch-border-color-focus`
- `--mod-switch-border-color-hover`
- `--mod-switch-border-color-selected-default`
- `--mod-switch-border-color-selected-down`
- `--mod-switch-border-color-selected-focus`
- `--mod-switch-border-color-selected-hover`
- `--mod-switch-border-radius`
- `--mod-switch-border-width`
- `--mod-switch-cjk-line-height`
- `--mod-switch-control-height`
- `--mod-switch-control-label-spacing`
- `--mod-switch-control-width`
- `--mod-switch-focus-indicator-color`
- `--mod-switch-focus-indicator-gap`
- `--mod-switch-focus-indicator-thickness`
- `--mod-switch-font-size`
- `--mod-switch-handle-background-color-default`
- `--mod-switch-handle-background-color-disabled`
- `--mod-switch-handle-background-color-down`
- `--mod-switch-handle-background-color-focus`
- `--mod-switch-handle-background-color-hover`
- `--mod-switch-handle-background-color-selected`
- `--mod-switch-handle-background-color-selected-disabled`
- `--mod-switch-handle-selected-size`
- `--mod-switch-handle-size`
- `--mod-switch-height`
- `--mod-switch-label-color-default`
- `--mod-switch-label-color-disabled`
- `--mod-switch-label-color-down`
- `--mod-switch-label-color-focus`
- `--mod-switch-label-color-hover`
- `--mod-switch-line-height`
- `--mod-switch-spacing-bottom-to-label`
- `--mod-switch-spacing-top-to-control`
- `--mod-switch-spacing-top-to-label`

</details>

### SWC

<details>
<summary>Attributes</summary>

- `emphasized` - Boolean attribute for emphasized styling
- `checked` - Boolean attribute for checked state (inherited from CheckboxBase)
- `disabled` - Boolean attribute for disabled state (inherited from CheckboxBase)
- `size` - String attribute with values: `s`, `m`, `l`, `xl` (from SizedMixin)

</details>

<details>
<summary>Slots</summary>

- Default slot - Text label of the Switch

</details>

## Comparison

**Legacy Component:**

<!-- Screenshot of legacy component will be added here -->

**Spectrum 2 Component:**

<!-- Screenshot of Spectrum 2 component will be added here -->

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
<span id="switch"></span>
<label id="label" for="input"><slot></slot></label>
```

</details>

<details>
<summary>Legacy (CSS main branch):</summary>

```html
<div
    class="spectrum-Switch spectrum-Switch--disabled spectrum-Switch--emphasized spectrum-Switch--sizeM"
>
    <input
        type="checkbox"
        class="spectrum-Switch-input"
        id="switch-input-123"
        disabled="false"
        checked="true"
    />
    <span class="spectrum-Switch-switch"></span>
    <label class="spectrum-Switch-label" for="switch-input-123">
        Switch label
    </label>
</div>
```

</details>

<details>
<summary>Spectrum 2 (CSS spectrum-two branch):</summary>

```html
<div
    class="spectrum-Switch spectrum-Switch--disabled spectrum-Switch--emphasized spectrum-Switch--sizeM spectrum-Switch--active"
>
    <input
        type="checkbox"
        class="spectrum-Switch-input"
        id="switch-input-123"
        disabled="false"
        checked="true"
    />
    <span class="spectrum-Switch-switch"></span>
    <label class="spectrum-Switch-label" for="switch-input-123">
        Switch label
    </label>
</div>
```

</details>

### CSS => SWC mapping

| CSS selector                                                                                            | Attribute or slot         | Status          |
| ------------------------------------------------------------------------------------------------------- | ------------------------- | --------------- |
| `.spectrum-Switch`                                                                                      | Component base            | Implemented     |
| `.spectrum-Switch--disabled`                                                                            | `disabled` attribute      | Implemented     |
| `.spectrum-Switch--emphasized`                                                                          | `emphasized` attribute    | Implemented     |
| `.spectrum-Switch--sizeS`                                                                               | `size="s"` attribute      | Implemented     |
| `.spectrum-Switch--sizeL`                                                                               | `size="l"` attribute      | Implemented     |
| `.spectrum-Switch--sizeXL`                                                                              | `size="xl"` attribute     | Implemented     |
| `.spectrum-Switch--active`                                                                              | Active state styling      | Missing from WC |
| `.spectrum-Switch-input`                                                                                | Internal input element    | Implemented     |
| `.spectrum-Switch-input:checked`                                                                        | `checked` attribute       | Implemented     |
| `.spectrum-Switch-input:disabled`                                                                       | `disabled` attribute      | Implemented     |
| `.spectrum-Switch-switch`                                                                               | Internal switch element   | Implemented     |
| `.spectrum-Switch-label`                                                                                | Default slot content      | Implemented     |
| `.spectrum-Switch-label:lang(ja)`, `.spectrum-Switch-label:lang(ko)`, `.spectrum-Switch-label:lang(zh)` | Language-specific styling | Implemented     |

## Summary of changes

### CSS => SWC implementation gaps

**Features Missing from WC:**

- `.spectrum-Switch--active` class is not automatically applied by the web component during active/pressed states
- Enhanced active state styling requires manual class management

**Features Missing from CSS:**

- All web component attributes have corresponding CSS selectors
- No identified gaps in CSS support for web component functionality

**Implementation Status:**

- All core switch functionality (checked, disabled, emphasized, size) is fully implemented
- Language-specific styling is supported
- Size variants are implemented

### CSS Spectrum 2 changes

Based on the analysis between CSS main and spectrum-two branches:

**No structural changes detected** - The switch template.js files are identical between main and spectrum-two branches, including:

- Same import statements
- Identical HTML structure generation
- Same class application logic
- No differences in element attributes or nesting

The switch component appears to be stable between legacy and Spectrum 2 implementations at the template level.

## Resources

- [CSS migration]()
- [Spectrum 2 preview]()
- [React]()

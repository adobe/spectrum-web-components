# Field Group migration roadmap

## Component specifications

### CSS

<details>
<summary>CSS selectors</summary>

- `.spectrum-FieldGroup`
- `.spectrum-FieldGroup--horizontal .spectrum-FieldGroupInputLayout`
- `.spectrum-FieldGroup--horizontal .spectrum-FieldGroupInputLayout .spectrum-FieldGroup-item:not(:last-child)`
- `.spectrum-FieldGroup--horizontal .spectrum-FieldGroupInputLayout .spectrum-HelpText`
- `.spectrum-FieldGroup--sidelabel`
- `.spectrum-FieldGroup--toplabel`
- `.spectrum-FieldGroup--vertical .spectrum-FieldGroupInputLayout`
- `.spectrum-FieldGroupInputLayout`

</details>

<details>
<summary>Passthroughs</summary>

None found for this component.

</details>

<details>
<summary>Modifiers</summary>

- `--mod-fieldgroup-content-area-spacing-block-end`
- `--mod-fieldgroup-content-area-spacing-block-start`
- `--mod-fieldgroup-flex-direction`
- `--mod-fieldgroup-invalid-icon-color`
- `--mod-fieldgroup-margin-bottom-fieldlabel`
- `--mod-fieldgroup-margin-left-fieldlabel`
- `--mod-fieldgroup-max-inline-size`
- `--mod-fieldgroup-min-block-size`
- `--mod-fieldgroup-min-inline-size`
- `--mod-fieldgroup-spacing-label-to-field`

</details>

### SWC

<details>
<summary>Attributes</summary>

- `horizontal` - Boolean attribute for horizontal layout orientation
- `invalid` - Boolean attribute for invalid state to show negative help text
- `required` - Boolean attribute for required field indication

</details>

<details>
<summary>Slots</summary>

- Default slot - The form controls that make up the group
- `help-text` - Default or non-negative help text to associate to your form element
- `negative-help-text` - Negative help text to associate to your form element when `invalid`

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
<div class="group" role="presentation">
    <slot @slotchange="handleSlotchange"></slot>
</div>
<!-- Help text rendered via renderHelpText method -->
<sp-help-text slot="help-text" variant="neutral" icon id="help-text-id">
    Help text content
</sp-help-text>
```

</details>

<details>
<summary>Legacy (CSS main branch):</summary>

```html
<div
    class="spectrum-FieldGroup spectrum-FieldGroup--horizontal spectrum-FieldGroup--sidelabel"
>
    <div class="spectrum-FieldGroupInputLayout">
        <sp-checkbox class="spectrum-FieldGroup-item" name="pets" value="dogs">
            Dogs
        </sp-checkbox>
        <sp-checkbox class="spectrum-FieldGroup-item" name="pets" value="cats">
            Cats
        </sp-checkbox>
        <sp-checkbox
            class="spectrum-FieldGroup-item"
            name="pets"
            value="dragons"
        >
            Dragons
        </sp-checkbox>
        <div class="spectrum-HelpText spectrum-HelpText--sizeS">
            <span class="spectrum-HelpText-text">Choose one or more pets.</span>
        </div>
    </div>
</div>
```

</details>

<details>
<summary>Spectrum 2 (CSS spectrum-two branch):</summary>

```html
<div
    class="spectrum-FieldGroup spectrum-FieldGroup--horizontal spectrum-FieldGroup--sidelabel"
>
    <div class="spectrum-FieldGroupInputLayout">
        <sp-checkbox class="spectrum-FieldGroup-item" name="pets" value="dogs">
            Dogs
        </sp-checkbox>
        <sp-checkbox class="spectrum-FieldGroup-item" name="pets" value="cats">
            Cats
        </sp-checkbox>
        <sp-checkbox
            class="spectrum-FieldGroup-item"
            name="pets"
            value="dragons"
        >
            Dragons
        </sp-checkbox>
        <div class="spectrum-HelpText spectrum-HelpText--sizeS">
            <span class="spectrum-HelpText-text">Choose one or more pets.</span>
        </div>
    </div>
</div>
```

</details>

### CSS => SWC mapping

| CSS selector                       | Attribute or slot         | Status                         |
| ---------------------------------- | ------------------------- | ------------------------------ |
| `.spectrum-FieldGroup`             | Component base            | Implemented                    |
| `.spectrum-FieldGroup--horizontal` | `horizontal` attribute    | Implemented                    |
| `.spectrum-FieldGroup--vertical`   | Default (vertical) layout | Implemented                    |
| `.spectrum-FieldGroup--sidelabel`  | Layout variant            | Missing from WC                |
| `.spectrum-FieldGroup--toplabel`   | Layout variant            | Missing from WC                |
| `.spectrum-FieldGroupInputLayout`  | Internal layout container | Missing from WC                |
| `.spectrum-FieldGroup-item`        | Individual field items    | Missing from WC                |
| `.spectrum-HelpText`               | Help text styling         | Implemented via `sp-help-text` |
|                                    | `invalid` attribute       | Missing from CSS               |
|                                    | `required` attribute      | Missing from CSS               |
|                                    | `help-text` slot          | Missing from CSS               |
|                                    | `negative-help-text` slot | Missing from CSS               |

## Summary of changes

### CSS => SWC implementation gaps

**Features Missing from WC:**

- `.spectrum-FieldGroup--sidelabel` and `.spectrum-FieldGroup--toplabel` layout variants are not supported by the web component
- `.spectrum-FieldGroupInputLayout` wrapper container is not generated by the web component
- `.spectrum-FieldGroup-item` classes are not automatically applied to slotted elements

**Features Missing from CSS:**

- `invalid` attribute has no corresponding CSS selector for error state styling
- `required` attribute has no corresponding CSS selector
- Help text slot functionality is implemented via `sp-help-text` component but lacks CSS integration
- `negative-help-text` slot for error states has no CSS representation

**Implementation Status:**

- Basic field group functionality (horizontal/vertical layout) is implemented
- Help text integration via `sp-help-text` component provides functionality but with different structure
- Core slot-based content grouping works as expected

### CSS Spectrum 2 changes

Based on the analysis between CSS main and spectrum-two branches:

**No structural changes detected** - The field-group template.js files are identical between main and spectrum-two branches, including:

- Same import statements
- Identical HTML structure generation
- Same class application logic
- No differences in element attributes or nesting

The field-group component appears to be stable between legacy and Spectrum 2 implementations at the template level.

## Resources

- [CSS migration]()
- [Spectrum 2 preview]()
- [React]()

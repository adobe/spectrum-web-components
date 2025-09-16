# Color field migration roadmap

There is no CSS implementation for this component; it only exists in SWC.

## Component specifications

### SWC

<details>
<summary>Attributes</summary>

- `disabled` - Disables the color field
- `focused` - Whether the color field is focused
- `invalid` - Whether the color field is invalid
- `keyboard-focused` - Whether the color field has keyboard focus
- `label` - The label for the color field
- `max` - Maximum value for the color field
- `min` - Minimum value for the color field
- `multiline` - Whether the color field is multiline (inherited from TextfieldBase)
- `pattern` - Pattern for validation (inherited from TextfieldBase)
- `placeholder` - Placeholder text (inherited from TextfieldBase)
- `quiet` - Quiet variant (inherited from TextfieldBase)
- `readonly` - Whether the color field is readonly
- `required` - Whether the color field is required (inherited from TextfieldBase)
- `size` - Size of the color field (s, m, l, xl)
- `step` - Step value for the color field
- `value` - The value of the color field
- `view-color` - Whether to show the color preview

</details>

<details>
<summary>Slots</summary>

- `help-text` - Help text for the color field (inherited from TextfieldBase)
- `negative-help-text` - Negative help text when invalid (inherited from TextfieldBase)

</details>

### React implementation

<details>
<summary>Props</summary>

- `label` - The label for the color field
- `autoFocus` - Whether the element should receive focus on render
- `channel` - The color channel that this field edits, if not provided, the color is edited as a hex value (`hue` | `saturation` | `brightness` | `lightness` | `red` | `green` | `blue` | `alpha`)
- `colorSpace` - The color space that the color field operates in if a channel prop is provided, if no channel is provided, the color field always displays the color as an RGB hex value (`rgb` | `hsl` | `hsb`)
- `defaultValue` - The default value
- `description` - A description for the field, provides a hint such as specific requirements for what to choose
- `errorMessage` - An error message for the field
- `excludeFromTabOrder` - Whether to exclude the element from the sequential tab order
- `form` - The `<form>` element to associate the input with
- `isDisabled` - Whether the input is disabled
- `isInvalid` - Whether the input value is invalid
- `isReadonly` - Whether the input can be selected but not changed by the user
- `isRequired` - Whether the color field is required before form submission
- `isWheelDisabled` - Enables or disables changing the value with scroll
- `labelAlign` - The label's horizontal alignment relative to the element it is labeling (`start` | `end`)
- `labelPosition` - The label's overall position relative to the element it is labeling (`top` | `side`)
- `name` - The name of the input element, used when submitting an HTML form
- `necessityIndicator`
- `size` - Size of the color field (s, m, l, xl)
- `validate` - A function that returns an error message if a given value is invalid
- `validationBehavior` - Whether to use native HTML form validation to prevent form submission when the value is missing or invalid
- `value` - The value of the color field

</details>

## DOM structure

### SWC DOM structure

```html
<sp-field-label for="color-field">Label</sp-field-label>
<sp-color-field id="color-field" view-color>
    #shadow-root
    <div id="textfield">
        <input type="text" class="input" aria-label="Label" />
    </div>
    <div id="sp-help-text-..." aria-live="assertive">
        <slot name="help-text"></slot>
    </div>
    <sp-color-handle size="m" color="..."></sp-color-handle>
</sp-color-field>
```

## Summary of changes

### Inherited from TextfieldBase

The ColorField component extends TextfieldBase, which means it will inherit all the changes and improvements made to the Textfield component in Spectrum 2 CSS, for example:

- **Quiet variant**: removed in Spectrum 2
- **Label position**: CSS supports side label as well as the default top label

## Resources

- [Spectrum React ColorField documentation](https://react-spectrum.adobe.com/s2/index.html?path=/docs/colorfield--docs)

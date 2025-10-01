# Color field migration roadmap

There is no CSS implementation for this component; it only exists in SWC.

## Component specifications

### SWC

<details>
<summary>Attributes</summary>

**Color Field specific attributes:**

- `view-color` - Whether to show the color preview

**Inherited from TextfieldBase:**

- `allowed-keys` - A regular expression outlining the keys that will be allowed to update the value
- `autocomplete` - What form of assistance should be provided when attempting to supply a value
- `focused` - Whether the color field is focused
- `grows` - Whether a form control with multiline attribute will change size vertically
- `invalid` - Whether the color field is invalid
- `label` - A string applied via aria-label to the form control when a user visible label is not provided
- `maxlength` - Defines the maximum string length that the user can enter
- `minlength` - Defines the minimum string length that the user can enter
- `multiline` - Whether the form control should accept a value longer than one line
- `name` - Name of the form control
- `pattern` - Pattern the value must match to be valid
- `placeholder` - Text that appears in the form control when it has no value set
- `quiet` - Whether to display the form control with no visible background
- `readonly` - Whether a user can interact with the value of the form control
- `required` - Whether the form control will be found to be invalid when it holds no value
- `rows` - The specific number of rows the form control should provide in the user interface
- `type` - The type of the form control (defaults to 'text')
- `valid` - Whether the value held by the form control is valid
- `value` - The value held by the form control

**Inherited from SizedMixin:**

- `size` - Size of the color field (s, m, l, xl)

**Inherited from Focusable:**

- `autofocus` - When this control is rendered, focus it automatically
- `disabled` - Disable this control. It will not receive focus or events
- `tabIndex` - The tab index to apply to this control

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
<div id="textfield">
    <!-- State icons (when invalid or valid) -->
    <sp-icon-alert id="invalid" class="icon"></sp-icon-alert>
    <!-- OR -->
    <sp-icon-checkmark100
        id="valid"
        class="icon spectrum-UIIcon-Checkmark100"
    ></sp-icon-checkmark100>

    <!-- Input element -->
    <input
        type="text"
        class="input"
        aria-describedby="sp-help-text-..."
        aria-label="Label"
        name="..."
        maxlength="..."
        minlength="..."
        pattern="..."
        placeholder="..."
        autocomplete="..."
        ?disabled
        ?required
        ?readonly
    />
</div>

<!-- Help text container (inherited from TextfieldBase) -->
<div id="sp-help-text-..." aria-live="assertive">
    <slot name="negative-help-text"></slot>
    <!-- OR -->
    <slot name="help-text"></slot>
</div>

<!-- Color handle (only when view-color=true and valid=true) -->
<sp-color-handle size="m" color="rgb(...)"></sp-color-handle>
```

## Summary of changes

### Inherited from TextfieldBase

The ColorField component extends TextfieldBase, which means it will inherit all the changes and improvements made to the Textfield component in Spectrum 2 CSS, for example:

- **Quiet variant**: removed in Spectrum 2
- **Label position**: CSS supports side label as well as the default top label

## Resources

- [Spectrum React ColorField documentation](https://react-spectrum.adobe.com/s2/index.html?path=/docs/colorfield--docs)

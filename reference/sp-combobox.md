# sp-combobox

An sp-combobox allows users to filter lists to only the options matching a query.

```js
import '@spectrum-web-components/combobox/sp-combobox.js';
// <sp-combobox></sp-combobox>
```

## Attributes

| Name                | Type                                                                                                                 | Default     | Description                                                                                                                                                                                             |
| ------------------- | -------------------------------------------------------------------------------------------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `autocomplete`      | `| 'list'
    | 'none'
    | HTMLInputElement['autocomplete']
    | HTMLTextAreaElement['autocomplete'] | undefined` | `'none'`    | What form of assistance should be provided when attempting to supply a value to the form control Note: combobox overrides `autocomplete` intentionally with `aria-autocomplete` values, which is why... |
| `open`              | `boolean`                                                                                                            | `false`     | Whether the listbox is visible.                                                                                                                                                                         |
| `pending`           | `boolean`                                                                                                            | `false`     | Whether the items are currently loading.                                                                                                                                                                |
| `pending-label`     | `string`                                                                                                             | `'Pending'` | Defines a string value that labels the Combobox while it is in pending state.                                                                                                                           |
| `options`           | `(ComboboxOption | MenuItem)[] | undefined`                                                                          | -           | An array of options to present in the Menu provided while typing into the input                                                                                                                         |
| `value`             | `string | number`                                                                                                    | -           | The value held by the form control                                                                                                                                                                      |
| `allowed-keys`      | `string`                                                                                                             | `''`        | A regular expression outlining the keys that will be allowed to update the value of the form control.                                                                                                   |
| `focused`           | `boolean`                                                                                                            | `false`     |                                                                                                                                                                                                         |
| `invalid`           | `boolean`                                                                                                            | `false`     | Whether the `value` held by the form control is invalid.                                                                                                                                                |
| `label`             | `string`                                                                                                             | `''`        | A string applied via `aria-label` to the form control when a user visible label is not provided.                                                                                                        |
| `name`              | `string | undefined`                                                                                                 | -           | Name of the form control.                                                                                                                                                                               |
| `placeholder`       | `string`                                                                                                             | `''`        | Text that appears in the form control when it has no value set                                                                                                                                          |
| `type`              | `TextfieldType`                                                                                                      | `'text'`    |                                                                                                                                                                                                         |
| `pattern`           | `string | undefined`                                                                                                 | -           | Pattern the `value` must match to be valid                                                                                                                                                              |
| `grows`             | `boolean`                                                                                                            | `false`     | Whether a form control delivered with the `multiline` attribute will change size vertically to accomodate longer input                                                                                  |
| `maxlength`         | `number`                                                                                                             | `-1`        | Defines the maximum string length that the user can enter                                                                                                                                               |
| `minlength`         | `number`                                                                                                             | `-1`        | Defines the minimum string length that the user can enter                                                                                                                                               |
| `multiline`         | `boolean`                                                                                                            | `false`     | Whether the form control should accept a value longer than one line                                                                                                                                     |
| `readonly`          | `boolean`                                                                                                            | `false`     | Whether a user can interact with the value of the form control                                                                                                                                          |
| `tooltip-placement` | `Placement`                                                                                                          | `'bottom'`  | Placement of the tooltip shown when the value is truncated (e.g. 'bottom', 'top'). Defaults to 'bottom' per Spectrum design.                                                                            |
| `rows`              | `number`                                                                                                             | `-1`        | The specific number of rows the form control should provide in the user interface                                                                                                                       |
| `valid`             | `boolean`                                                                                                            | `false`     | Whether the `value` held by the form control is valid.                                                                                                                                                  |
| `quiet`             | `boolean`                                                                                                            | `false`     | Whether to display the form control with no visible background                                                                                                                                          |
| `required`          | `boolean`                                                                                                            | `false`     | Whether the form control will be found to be invalid when it holds no `value`                                                                                                                           |
| `disabled`          | `boolean`                                                                                                            | `false`     | Disable this control. It will not receive focus or events                                                                                                                                               |
| `autofocus`         | `boolean`                                                                                                            | `false`     | When this control is rendered, focus it automatically                                                                                                                                                   |
| `tabIndex`          | `number`                                                                                                             | -           | The tab index to apply to this control. See general documentation about the tabindex HTML property                                                                                                      |

## Slots

| Name                 | Description                                                                              |
| -------------------- | ---------------------------------------------------------------------------------------- |
| `(default)`          | Supply Menu Item elements to the default slot in order to populate the available options |
| `tooltip`            | Tooltip to to be applied to the the Picker Button                                        |
| `help-text`          | default or non-negative help text to associate to your form element                      |
| `negative-help-text` | negative help text to associate to your form element when `invalid`                      |

## Events

| Name      | Description                                                               |
| --------- | ------------------------------------------------------------------------- |
| `change`  | An alteration to the value of the element has been committed by the user. |
| `input`   | The value of the element has changed.                                     |
| `keydown` | Trick :focus-visible polyfill into thinking keyboard based focus          |

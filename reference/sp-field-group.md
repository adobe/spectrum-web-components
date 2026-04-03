# sp-field-group

An sp-field-group element is used to layout a group of fields, usually sp-checkbox elements.

```js
import '@spectrum-web-components/field-group/sp-field-group.js';
// <sp-field-group></sp-field-group>
```

## Attributes

| Name         | Type      | Default | Description |
| ------------ | --------- | ------- | ----------- |
| `horizontal` | `boolean` | `false` |             |
| `invalid`    | `boolean` | `false` |             |
| `label`      | `string`  | `''`    |             |
| `vertical`   | `boolean` | `false` |             |

## Slots

| Name                 | Description                                                         |
| -------------------- | ------------------------------------------------------------------- |
| `(default)`          | the form controls that make up the group                            |
| `help-text`          | default or non-negative help text to associate to your form element |
| `negative-help-text` | negative help text to associate to your form element when `invalid` |

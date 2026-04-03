# sp-radio-group

sp-radio and sp-radio-group allow users to select a single option from a list of mutually exclusive options.

```js
import '@spectrum-web-components/radio/sp-radio-group.js';
// <sp-radio-group></sp-radio-group>
```

## Attributes

| Name         | Type      | Default | Description |
| ------------ | --------- | ------- | ----------- |
| `name`       | `string`  | `''`    |             |
| `selected`   | `string`  | `''`    |             |
| `horizontal` | `boolean` | `false` |             |
| `invalid`    | `boolean` | `false` |             |
| `label`      | `string`  | `''`    |             |
| `vertical`   | `boolean` | `false` |             |

## Slots

| Name                 | Description                                                         |
| -------------------- | ------------------------------------------------------------------- |
| `(default)`          | The `sp-radio` elements to display/manage in the group.             |
| `help-text`          | default or non-negative help text to associate to your form element |
| `negative-help-text` | negative help text to associate to your form element when `invalid` |

## Events

| Name     | Description                                                               |
| -------- | ------------------------------------------------------------------------- |
| `change` | An alteration to the value of the element has been committed by the user. |

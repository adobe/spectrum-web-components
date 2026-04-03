# sp-checkbox

sp-checkbox allow users to select multiple items from a list of independent options, or to mark an individual option as selected.

```js
import '@spectrum-web-components/checkbox/sp-checkbox.js';
// <sp-checkbox></sp-checkbox>
```

## Attributes

| Name            | Type                 | Default | Description                                               |
| --------------- | -------------------- | ------- | --------------------------------------------------------- |
| `disabled`      | `boolean`            | `false` | Disable this control. It will not receive focus or events |
| `indeterminate` | `boolean`            | `false` |                                                           |
| `invalid`       | `boolean`            | `false` |                                                           |
| `emphasized`    | `boolean`            | `false` |                                                           |
| `tabindex`      | `number`             | `0`     |                                                           |
| `checked`       | `boolean`            | `false` |                                                           |
| `name`          | `string | undefined` | -       |                                                           |
| `readonly`      | `boolean`            | `false` |                                                           |

## Slots

| Name        | Description                                      |
| ----------- | ------------------------------------------------ |
| `(default)` | content to display as the label for the Checkbox |

## Events

| Name     | Description                                                |
| -------- | ---------------------------------------------------------- |
| `change` | Announces a change in the `checked` property of a Checkbox |

# sp-radio

sp-radio and sp-radio-group allow users to select a single option from a list of mutually exclusive options.

```js
import '@spectrum-web-components/radio/sp-radio.js';
// <sp-radio></sp-radio>
```

## Attributes

| Name         | Type      | Default | Description                                           |
| ------------ | --------- | ------- | ----------------------------------------------------- |
| `invalid`    | `boolean` | `false` | Uses the invalid style                                |
| `disabled`   | `boolean` | `false` | Uses the disabled style                               |
| `checked`    | `boolean` | `false` | Represents when the input is checked                  |
| `value`      | `string`  | `''`    | Identifies this radio button within its radio group   |
| `autofocus`  | `boolean` | `false` | When this control is rendered, focus it automatically |
| `emphasized` | `boolean` | `false` |                                                       |
| `readonly`   | `boolean` | `false` |                                                       |

## Slots

| Name        | Description                    |
| ----------- | ------------------------------ |
| `(default)` | text label of the Radio button |

## Events

| Name      | Description                                                      |
| --------- | ---------------------------------------------------------------- |
| `keydown` | Trick :focus-visible polyfill into thinking keyboard based focus |
| `change`  | When the input is interacted with and its state is changed       |

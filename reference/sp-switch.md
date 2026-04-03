# sp-switch

An sp-switch is used to turn an option on or off.

```js
import '@spectrum-web-components/switch/sp-switch.js';
// <sp-switch></sp-switch>
```

## Attributes

| Name         | Type                 | Default | Description                                                                                        |
| ------------ | -------------------- | ------- | -------------------------------------------------------------------------------------------------- |
| `emphasized` | `boolean`            | `false` |                                                                                                    |
| `checked`    | `boolean`            | `false` |                                                                                                    |
| `name`       | `string | undefined` | -       |                                                                                                    |
| `readonly`   | `boolean`            | `false` |                                                                                                    |
| `disabled`   | `boolean`            | `false` | Disable this control. It will not receive focus or events                                          |
| `autofocus`  | `boolean`            | `false` | When this control is rendered, focus it automatically                                              |
| `tabIndex`   | `number`             | -       | The tab index to apply to this control. See general documentation about the tabindex HTML property |

## Slots

| Name        | Description              |
| ----------- | ------------------------ |
| `(default)` | text label of the Switch |

## Events

| Name      | Description                                                      |
| --------- | ---------------------------------------------------------------- |
| `change`  | Announces a change in the `checked` property of a Switch         |
| `keydown` | Trick :focus-visible polyfill into thinking keyboard based focus |

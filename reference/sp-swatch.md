# sp-swatch

An sp-swatch shows a small sample of a fill — such as a color, gradient, texture, or material — that is intended to be applied to an object.

```js
import '@spectrum-web-components/swatch/sp-swatch.js';
// <sp-swatch></sp-swatch>
```

## Attributes

| Name          | Type             | Default    | Description                                                                                        |
| ------------- | ---------------- | ---------- | -------------------------------------------------------------------------------------------------- |
| `border`      | `SwatchBorder`   | -          |                                                                                                    |
| `color`       | `string`         | `''`       |                                                                                                    |
| `label`       | `string`         | `''`       |                                                                                                    |
| `mixed-value` | `boolean`        | `false`    |                                                                                                    |
| `nothing`     | `boolean`        | `false`    |                                                                                                    |
| `role`        | `string`         | `'button'` |                                                                                                    |
| `rounding`    | `SwatchRounding` | -          |                                                                                                    |
| `selected`    | `boolean`        | `false`    |                                                                                                    |
| `shape`       | `SwatchShape`    | -          |                                                                                                    |
| `value`       | `string`         | -          |                                                                                                    |
| `disabled`    | `boolean`        | `false`    | Disable this control. It will not receive focus or events                                          |
| `autofocus`   | `boolean`        | `false`    | When this control is rendered, focus it automatically                                              |
| `tabIndex`    | `number`         | -          | The tab index to apply to this control. See general documentation about the tabindex HTML property |

## Events

| Name      | Description                                                      |
| --------- | ---------------------------------------------------------------- |
| `change`  |                                                                  |
| `keydown` | Trick :focus-visible polyfill into thinking keyboard based focus |

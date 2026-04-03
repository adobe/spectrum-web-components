# sp-color-slider

An sp-color-slider lets users visually change an individual channel of a color.

```js
import '@spectrum-web-components/color-slider/sp-color-slider.js';
// <sp-color-slider></sp-color-slider>
```

## Attributes

| Name        | Type         | Default | Description                                                                                        |
| ----------- | ------------ | ------- | -------------------------------------------------------------------------------------------------- |
| `disabled`  | `boolean`    | `false` | Disable this control. It will not receive focus or events                                          |
| `focused`   | `boolean`    | `false` |                                                                                                    |
| `label`     | `string`     | `'hue'` |                                                                                                    |
| `vertical`  | `boolean`    | `false` |                                                                                                    |
| `value`     | `number`     | -       |                                                                                                    |
| `color`     | `ColorTypes` | -       |                                                                                                    |
| `step`      | `number`     | `1`     |                                                                                                    |
| `autofocus` | `boolean`    | `false` | When this control is rendered, focus it automatically                                              |
| `tabIndex`  | `number`     | -       | The tab index to apply to this control. See general documentation about the tabindex HTML property |

## Slots

| Name       | Description                                                     |
| ---------- | --------------------------------------------------------------- |
| `gradient` | a custom gradient visually outlining the available color values |

## Events

| Name      | Description                                                                    |
| --------- | ------------------------------------------------------------------------------ |
| `input`   | The value of the Color Slider has changed.                                     |
| `change`  | An alteration to the value of the Color Slider has been committed by the user. |
| `keydown` | Trick :focus-visible polyfill into thinking keyboard based focus               |

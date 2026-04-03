# sp-color-wheel

An sp-color-wheel allows users to visually select the hue of a color on a circular track.

```js
import '@spectrum-web-components/color-wheel/sp-color-wheel.js';
// <sp-color-wheel></sp-color-wheel>
```

## Attributes

| Name        | Type         | Default | Description                                                                                        |
| ----------- | ------------ | ------- | -------------------------------------------------------------------------------------------------- |
| `disabled`  | `boolean`    | `false` | Disable this control. It will not receive focus or events                                          |
| `focused`   | `boolean`    | `false` |                                                                                                    |
| `label`     | `string`     | `'hue'` |                                                                                                    |
| `step`      | `number`     | `1`     |                                                                                                    |
| `value`     | `number`     | -       |                                                                                                    |
| `color`     | `ColorTypes` | -       |                                                                                                    |
| `autofocus` | `boolean`    | `false` | When this control is rendered, focus it automatically                                              |
| `tabIndex`  | `number`     | -       | The tab index to apply to this control. See general documentation about the tabindex HTML property |

## Slots

| Name       | Description                                                     |
| ---------- | --------------------------------------------------------------- |
| `gradient` | a custom gradient visually outlining the available color values |

## Events

| Name      | Description                                                                   |
| --------- | ----------------------------------------------------------------------------- |
| `input`   | The value of the Color Wheel has changed.                                     |
| `change`  | An alteration to the value of the Color Wheel has been committed by the user. |
| `keydown` | Trick :focus-visible polyfill into thinking keyboard based focus              |

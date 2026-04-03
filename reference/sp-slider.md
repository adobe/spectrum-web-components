# sp-slider

sp-slider allows users to quickly select a value within a range.

```js
import '@spectrum-web-components/slider/sp-slider.js';
// <sp-slider></sp-slider>
```

## Attributes

| Name               | Type                                    | Default | Description                                                                                                                                                  |
| ------------------ | --------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `editable`         | `boolean`                               | -       | Whether to display a Number Field along side the slider UI                                                                                                   |
| `hide-stepper`     | `boolean`                               | `false` | Whether the stepper UI of the Number Field is hidden or not                                                                                                  |
| `type`             | `string`                                | `''`    |                                                                                                                                                              |
| `variant`          | `string`                                | -       |                                                                                                                                                              |
| `label-visibility` | `'text' | 'value' | 'none' | undefined` | -       |                                                                                                                                                              |
| `min`              | `number | 'previous' | undefined`       | `0`     |                                                                                                                                                              |
| `max`              | `number | 'next' | undefined`           | `100`   |                                                                                                                                                              |
| `step`             | `number | undefined`                    | `1`     |                                                                                                                                                              |
| `tick-step`        | `number`                                | `0`     |                                                                                                                                                              |
| `tick-labels`      | `boolean`                               | `false` |                                                                                                                                                              |
| `disabled`         | `boolean`                               | `false` | Disable this control. It will not receive focus or events                                                                                                    |
| `fill-start`       | `number | boolean | undefined`          | -       |                                                                                                                                                              |
| `quiet`            | `boolean`                               | `false` | Applies `quiet` to the underlying `sp-number-field` when `editable === true`.                                                                                |
| `indeterminate`    | `boolean`                               | `false` | Applies `indeterminate` to the underlying `sp-number-field` when `editable === true`. Is removed on the next `change` event.                                 |
| `value`            | `number`                                | -       | By default, the value of a Slider Handle will be halfway between its `min` and `max` values, or the `min` value when `max` is less than `min`.               |
| `default-value`    | `number`                                | -       | Set the default value of the handle. Setting this property will cause the handle to reset to the default value on double click or pressing the `escape` key. |
| `dragging`         | `boolean`                               | `false` |                                                                                                                                                              |
| `highlight`        | `boolean`                               | `false` |                                                                                                                                                              |
| `name`             | `string`                                | `''`    |                                                                                                                                                              |
| `format-options`   | `NumberFormatOptions | undefined`       | -       |                                                                                                                                                              |
| `label`            | `string`                                | `''`    |                                                                                                                                                              |
| `autofocus`        | `boolean`                               | `false` | When this control is rendered, focus it automatically                                                                                                        |
| `tabIndex`         | `number`                                | -       | The tab index to apply to this control. See general documentation about the tabindex HTML property                                                           |

## Slots

| Name        | Description                                                              |
| ----------- | ------------------------------------------------------------------------ |
| `(default)` | @deprecated Text label for the Slider. Use the `label` property instead. |
| `handle`    | optionally accepts two or more sp-slider-handle elements                 |

## Events

| Name                     | Description                                                               |
| ------------------------ | ------------------------------------------------------------------------- |
| `sp-slider-handle-ready` |                                                                           |
| `input`                  | The value of the element has changed.                                     |
| `change`                 | An alteration to the value of the element has been committed by the user. |
| `keydown`                | Trick :focus-visible polyfill into thinking keyboard based focus          |

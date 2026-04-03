# sp-slider-handle

sp-slider allows users to quickly select a value within a range.

```js
import '@spectrum-web-components/slider/sp-slider-handle.js';
// <sp-slider-handle></sp-slider-handle>
```

## Attributes

| Name             | Type                              | Default | Description                                                                                                                                                  |
| ---------------- | --------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `value`          | `number`                          | -       | By default, the value of a Slider Handle will be halfway between its `min` and `max` values, or the `min` value when `max` is less than `min`.               |
| `default-value`  | `number`                          | -       | Set the default value of the handle. Setting this property will cause the handle to reset to the default value on double click or pressing the `escape` key. |
| `dragging`       | `boolean`                         | `false` |                                                                                                                                                              |
| `highlight`      | `boolean`                         | `false` |                                                                                                                                                              |
| `name`           | `string`                          | `''`    |                                                                                                                                                              |
| `min`            | `number | 'previous' | undefined` | -       |                                                                                                                                                              |
| `max`            | `number | 'next' | undefined`     | -       |                                                                                                                                                              |
| `step`           | `number | undefined`              | -       |                                                                                                                                                              |
| `format-options` | `NumberFormatOptions | undefined` | -       |                                                                                                                                                              |
| `label`          | `string`                          | `''`    |                                                                                                                                                              |
| `disabled`       | `boolean`                         | `false` | Disable this control. It will not receive focus or events                                                                                                    |
| `autofocus`      | `boolean`                         | `false` | When this control is rendered, focus it automatically                                                                                                        |
| `tabIndex`       | `number`                          | -       | The tab index to apply to this control. See general documentation about the tabindex HTML property                                                           |

## Events

| Name                     | Description                                                               |
| ------------------------ | ------------------------------------------------------------------------- |
| `sp-slider-handle-ready` |                                                                           |
| `input`                  | The value of the element has changed.                                     |
| `change`                 | An alteration to the value of the element has been committed by the user. |
| `keydown`                | Trick :focus-visible polyfill into thinking keyboard based focus          |

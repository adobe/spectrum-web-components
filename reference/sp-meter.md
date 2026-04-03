# sp-meter

An sp-meter is a visual representation of a quantity or achievement.

```js
import '@spectrum-web-components/meter/sp-meter.js';
// <sp-meter></sp-meter>
```

## Attributes

| Name           | Type                  | Default | Description                                                                                                                                          |
| -------------- | --------------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `progress`     | `number`              | `0`     |                                                                                                                                                      |
| `variant`      | `MeterVariants`       | -       | The variant applies specific styling when set to `negative`, `positive`, `notice` `variant` attribute is removed when not matching one of the above. |
| `label`        | `string`              | `''`    |                                                                                                                                                      |
| `side-label`   | `boolean`             | `false` |                                                                                                                                                      |
| `static-color` | `'white' | undefined` | -       |                                                                                                                                                      |

## Slots

| Name        | Description             |
| ----------- | ----------------------- |
| `(default)` | text labeling the Meter |

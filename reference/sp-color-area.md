# sp-color-area

An sp-color-area allows users to visually select two properties of a color simultaneously.

```js
import '@spectrum-web-components/color-area/sp-color-area.js';
// <sp-color-area></sp-color-area>
```

## Attributes

| Name       | Type         | Default        | Description |
| ---------- | ------------ | -------------- | ----------- |
| `disabled` | `boolean`    | `false`        |             |
| `focused`  | `boolean`    | `false`        |             |
| `label-x`  | `string`     | `'saturation'` |             |
| `label-y`  | `string`     | `'luminosity'` |             |
| `hue`      | `number`     | -              |             |
| `value`    | `ColorTypes` | -              |             |
| `color`    | `ColorTypes` | -              |             |
| `x`        | `number`     | -              |             |
| `y`        | `number`     | -              |             |
| `step`     | `number`     | `0.01`         |             |

## Slots

| Name       | Description                                                     |
| ---------- | --------------------------------------------------------------- |
| `gradient` | a custom gradient visually outlining the available color values |

## Events

| Name     | Description                                                                  |
| -------- | ---------------------------------------------------------------------------- |
| `input`  | The value of the Color Area has changed.                                     |
| `change` | An alteration to the value of the Color Area has been committed by the user. |

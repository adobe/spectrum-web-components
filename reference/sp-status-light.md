# sp-status-light

An sp-status-light is a great way to convey semantic meaning, such as statuses and categories.

```js
import '@spectrum-web-components/status-light/sp-status-light.js';
// <sp-status-light></sp-status-light>
```

## Attributes

| Name       | Type                   | Default  | Description                      |
| ---------- | ---------------------- | -------- | -------------------------------- |
| `variant`  | `StatusLightVariantS1` | `'info'` | The variant of the status light. |
| `disabled` | `boolean`              | `false`  |                                  |
| `size`     | `ElementSize`          | -        | The size of the status light.    |

## Slots

| Name        | Description                    |
| ----------- | ------------------------------ |
| `(default)` | text label of the Status Light |

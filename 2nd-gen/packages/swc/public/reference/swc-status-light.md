# swc-status-light

A status light is a great way to convey semantic meaning and the condition of an entity, such as statuses and categories.

```js
import '@adobe/spectrum-wc/components/status-light/index.js';
// <swc-status-light></swc-status-light>
```

## Attributes

| Name      | Type                 | Default  | Description                                                                                            |
| --------- | -------------------- | -------- | ------------------------------------------------------------------------------------------------------ |
| `variant` | `StatusLightVariant` | `'info'` | Changes the color of the status dot. The variant list includes both semantic and non-semantic options. |
| `size`    | `ElementSize`        | -        | -                                                                                                      |

## Slots

| Name        | Description                         |
| ----------- | ----------------------------------- |
| `(default)` | The text label of the status light. |

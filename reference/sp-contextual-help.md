# sp-contextual-help

Spectrum Contextual help provides additional information about the state of either an adjacent component or an entire view.

```js
import '@spectrum-web-components/contextual-help/sp-contextual-help.js';
// <sp-contextual-help></sp-contextual-help>
```

## Attributes

| Name        | Type                                                                                                                                                      | Default          | Description                                                                                                                                                                                           |
| ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `placement` | `"top" | "top-start" | "top-end" | "right" | "right-start" | "right-end" | "bottom" | "bottom-start" | "bottom-end" | "left" | "left-start" | "left-end"` | `'bottom-start'` |                                                                                                                                                                                                       |
| `label`     | `string | undefined`                                                                                                                                      | -                | Provides an accessible name for the action button trigger.                                                                                                                                            |
| `variant`   | `'info' | 'help'`                                                                                                                                         | `'info'`         | The `variant` property applies specific styling on the action button trigger.                                                                                                                         |
| `offset`    | `number | [number, number]`                                                                                                                               | `0`              | The `offset` property accepts either a single number, to define the offset of the Popover along the main axis from the action button, or 2-tuple, to define the offset along the main axis and the... |
| `open`      | `boolean`                                                                                                                                                 | `false`          |                                                                                                                                                                                                       |

## Slots

| Name      | Description                                      |
| --------- | ------------------------------------------------ |
| `heading` | content to display as the heading of the popover |
| `Text`    | content to display in the popover                |
| `link`    | link to additional informations                  |

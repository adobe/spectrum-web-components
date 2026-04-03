# sp-tooltip

sp-tooltip allow users to get contextual help or information about specific components when hovering or focusing on them.

```js
import '@spectrum-web-components/tooltip/sp-tooltip.js';
// <sp-tooltip></sp-tooltip>
```

## Attributes

| Name           | Type                                                                                                                                                      | Default | Description                                                                                                                                                                                           |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `placement`    | `"top" | "top-start" | "top-end" | "right" | "right-start" | "right-end" | "bottom" | "bottom-start" | "bottom-end" | "left" | "left-start" | "left-end"` | -       |                                                                                                                                                                                                       |
| `delayed`      | `boolean`                                                                                                                                                 | `false` | A Tooltip that is `delayed` will its Overlay wait until a warm-up period of 1000ms has completed before opening. Once the warmup period has completed, all subsequent Overlays will open immediately. |
| `disabled`     | `boolean`                                                                                                                                                 | `false` | Whether to prevent a self-managed Tooltip from responding to user input.                                                                                                                              |
| `self-managed` | `boolean`                                                                                                                                                 | `false` | Automatically bind to the parent element of the assigned `slot` or the parent element of the `sp-tooltip`. Without this, you must provide your own `overlay-trigger`.                                 |
| `offset`       | `number`                                                                                                                                                  | `0`     |                                                                                                                                                                                                       |
| `open`         | `boolean`                                                                                                                                                 | `false` |                                                                                                                                                                                                       |
| `tipPadding`   | `number | undefined`                                                                                                                                      | -       |                                                                                                                                                                                                       |
| `variant`      | `string`                                                                                                                                                  | -       |                                                                                                                                                                                                       |

## Slots

| Name        | Description                                          |
| ----------- | ---------------------------------------------------- |
| `icon`      | the icon element appearing at the start of the label |
| `(default)` | the text label of the Tooltip                        |

## Events

| Name        | Description |
| ----------- | ----------- |
| `undefined` |             |

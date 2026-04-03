# sp-popover

An sp-popover is used to display transient content (menus, options, additional actions etc.) and appears when clicking/tapping on a source (tools, buttons, etc.) It stands out via its visual style (stroke and drop shadow) and floats on top of the rest of the interface.

```js
import '@spectrum-web-components/popover/sp-popover.js';
// <sp-popover></sp-popover>
```

## Attributes

| Name        | Type                                                                                                                                                      | Default | Description                            |
| ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | -------------------------------------- |
| `placement` | `"top" | "top-start" | "top-end" | "right" | "right-start" | "right-end" | "bottom" | "bottom-start" | "bottom-end" | "left" | "left-start" | "left-end"` | -       |                                        |
| `open`      | `boolean`                                                                                                                                                 | `false` | Whether the popover is visible or not. |
| `tip`       | `boolean`                                                                                                                                                 | `false` |                                        |

## Slots

| Name        | Description                           |
| ----------- | ------------------------------------- |
| `(default)` | content to display within the Popover |

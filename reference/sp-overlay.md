# sp-overlay

An sp-overlay element is used to decorate content that you would like to present to your visitors as "overlaid" on the rest of the application.

```js
import '@spectrum-web-components/overlay/sp-overlay.js';
// <sp-overlay></sp-overlay>
```

## Attributes

| Name                  | Type                                                                                                                                                      | Default  | Description                                                                                                                                                                                                |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `placement`           | `"top" | "top-start" | "top-end" | "right" | "right-start" | "right-end" | "bottom" | "bottom-start" | "bottom-end" | "left" | "left-start" | "left-end"` | -        | Instruct the Overlay where to place itself in relationship to the trigger element.                                                                                                                         |
| `offset`              | `number | [number, number]`                                                                                                                               | `0`      | The `offset` property accepts either a single number to define the offset of the Overlay along the main axis from the trigger, or a 2-tuple to define the offset along both the main axis and the cross... |
| `disabled`            | `boolean`                                                                                                                                                 | `false`  | Indicates whether the overlay is currently functional or not. When set to `true`, the overlay is disabled, and any active strategy is aborted. The overlay will also close if it is currently open.        |
| `receives-focus`      | `'true' | 'false' | 'auto'`                                                                                                                               | `'auto'` | Whether to pass focus to the overlay once opened, or to the appropriate value based on the "type" of the overlay when set to `"auto"`.                                                                     |
| `delayed`             | `boolean`                                                                                                                                                 | `false`  | An Overlay that is `delayed` will wait until a warm-up period of 1000ms has completed before opening. Once the warm-up period has completed, all subsequent Overlays will open immediately.                |
| `open`                | `boolean`                                                                                                                                                 | `false`  | Indicates whether the Overlay is projected onto the "top layer" or not. When set to `true`, the overlay is open and visible. When set to `false`, the overlay is closed and hidden.                        |
| `allow-outside-click` | `boolean`                                                                                                                                                 | `false`  | DEPRECATED: Whether clicks outside the overlay should close it (not recommended for accessibility)                                                                                                         |
| `tip-padding`         | `number`                                                                                                                                                  | -        | The padding around the tip of the overlay. This property defines the padding around the tip of the overlay, which can be used to adjust its positioning.                                                   |
| `trigger`             | `string`                                                                                                                                                  | -        | An optional ID reference for the trigger element combined with the optional interaction (click | hover | longpress) by which the overlay should open. The format is `trigger@interaction`, e.g.            |
| `type`                | `"auto" | "hint" | "manual" | "modal" | "page"`                                                                                                           | `'auto'` | Configures the open/close heuristics of the Overlay.                                                                                                                                                       |

## Slots

| Name      | Description                                       |
| --------- | ------------------------------------------------- |
| `default` | The content that will be displayed in the overlay |

## Events

| Name                | Description                                                  |
| ------------------- | ------------------------------------------------------------ |
| `sp-opened`         | announces that an overlay has completed any entry animations |
| `sp-closed`         | announce that an overlay has completed any exit animations   |
| `slottable-request` | requests to add or remove slottable content                  |

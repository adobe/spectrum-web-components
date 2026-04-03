# sp-split-view

An sp-split-view element displays its first two direct child elements side by side (horizontal) or stacked (vertical with vertical attribute).

```js
import '@spectrum-web-components/split-view/sp-split-view.js';
// <sp-split-view></sp-split-view>
```

## Attributes

| Name            | Type                                             | Default            | Description                                                                                                                                               |
| --------------- | ------------------------------------------------ | ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `primarySize`   | `number | `${number}px` | `${number}%` | "auto"` | -                  | The start size of the primary pane, can be a real pixel number|string, percentage or "auto" For example: "100", "120px", "75%" or "auto" are valid values |
| `vertical`      | `boolean`                                        | `false`            |                                                                                                                                                           |
| `resizable`     | `boolean`                                        | `false`            |                                                                                                                                                           |
| `collapsible`   | `boolean`                                        | `false`            |                                                                                                                                                           |
| `primary-min`   | `number`                                         | `0`                | The minimum size of the primary pane                                                                                                                      |
| `primary-max`   |                                                  | `DEFAULT_MAX_SIZE` | The maximum size of the primary pane                                                                                                                      |
| `primary-size`  | `number | `${number}px` | `${number}%` | "auto"` | -                  | The start size of the primary pane, can be a real pixel number|string, percentage or "auto" For example: "100", "120px", "75%" or "auto" are valid values |
| `secondary-min` | `number`                                         | `0`                | The minimum size of the secondary pane                                                                                                                    |
| `secondary-max` |                                                  | `DEFAULT_MAX_SIZE` | The maximum size of the secondary pane                                                                                                                    |
| `splitter-pos`  | `number | undefined`                             | -                  | The current splitter position of split-view                                                                                                               |
| `label`         | `string | undefined`                             | -                  | Sets the `aria-label` on the splitter component                                                                                                           |
| `viewSize`      | `number`                                         | `0`                |                                                                                                                                                           |

## Slots

| Name  | Description                                            |
| ----- | ------------------------------------------------------ |
| `Two` | sibling elements to be sized by the element attritubes |

## Events

| Name     | Description                                |
| -------- | ------------------------------------------ |
| `change` | Announces the new position of the splitter |

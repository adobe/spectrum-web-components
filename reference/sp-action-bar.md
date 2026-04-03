# sp-action-bar

A sp-action-bar delivers a floating action bar that is a convenient way to deliver stateful actions in cases like selection mode.

```js
import '@spectrum-web-components/action-bar/sp-action-bar.js';
// <sp-action-bar></sp-action-bar>
```

## Attributes

| Name         | Type      | Default | Description                                                                                                                              |
| ------------ | --------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `emphasized` | `boolean` | `false` | Deliver the Action Bar with additional visual emphasis.                                                                                  |
| `flexible`   | `boolean` | `false` | When `flexible` the action bar sizes itself to its content rather than a specific width.                                                 |
| `open`       | `boolean` | `false` |                                                                                                                                          |
| `variant`    | `string`  | -       | The variant applies specific styling when set to `sticky` or `fixed`. `variant` attribute is removed when not matching one of the above. |

## Slots

| Name        | Description                            |
| ----------- | -------------------------------------- |
| `(default)` | Content to display with the Action Bar |

## Events

| Name    | Description |
| ------- | ----------- |
| `close` |             |

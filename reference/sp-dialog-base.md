# sp-dialog-base

sp-dialog displays important information that users need to acknowledge.

```js
import '@spectrum-web-components/dialog/sp-dialog-base.js';
// <sp-dialog-base></sp-dialog-base>
```

## Attributes

| Name          | Type                                              | Default | Description                                                                                  |
| ------------- | ------------------------------------------------- | ------- | -------------------------------------------------------------------------------------------- |
| `dismissable` | `boolean`                                         | `false` |                                                                                              |
| `open`        | `boolean`                                         | `false` |                                                                                              |
| `mode`        | `'fullscreen' | 'fullscreenTakeover' | undefined` | -       |                                                                                              |
| `responsive`  | `boolean`                                         | `false` | When set to true, fills screens smaller than 350px high and 400px wide with the full dialog. |
| `underlay`    | `boolean`                                         | `false` |                                                                                              |

## Slots

| Name        | Description                  |
| ----------- | ---------------------------- |
| `(default)` | A Dialog element to display. |

## Events

| Name        | Description                                |
| ----------- | ------------------------------------------ |
| `close`     | Announces that the dialog has been closed. |
| `undefined` |                                            |

# sp-dialog-wrapper

sp-dialog displays important information that users need to acknowledge.

```js
import '@spectrum-web-components/dialog/sp-dialog-wrapper.js';
// <sp-dialog-wrapper></sp-dialog-wrapper>
```

## Attributes

| Name                  | Type                                              | Default   | Description                                                                                  |
| --------------------- | ------------------------------------------------- | --------- | -------------------------------------------------------------------------------------------- |
| `error`               | `boolean`                                         | `false`   |                                                                                              |
| `cancel-label`        | `string`                                          | `''`      |                                                                                              |
| `confirm-label`       | `string`                                          | `''`      |                                                                                              |
| `dismiss-label`       | `string`                                          | `'Close'` |                                                                                              |
| `footer`              | `string`                                          | `''`      |                                                                                              |
| `hero`                | `string`                                          | `''`      |                                                                                              |
| `hero-label`          | `string`                                          | `''`      |                                                                                              |
| `no-divider`          | `boolean`                                         | `false`   |                                                                                              |
| `size`                | `'s' | 'm' | 'l' | undefined`                     | -         |                                                                                              |
| `secondary-label`     | `string`                                          | `''`      |                                                                                              |
| `headline`            | `string`                                          | `''`      |                                                                                              |
| `headline-visibility` | `'none' | undefined`                              | -         |                                                                                              |
| `dismissable`         | `boolean`                                         | `false`   |                                                                                              |
| `open`                | `boolean`                                         | `false`   |                                                                                              |
| `mode`                | `'fullscreen' | 'fullscreenTakeover' | undefined` | -         |                                                                                              |
| `responsive`          | `boolean`                                         | `false`   | When set to true, fills screens smaller than 350px high and 400px wide with the full dialog. |
| `underlay`            | `boolean`                                         | `false`   |                                                                                              |

## Slots

| Name        | Description            |
| ----------- | ---------------------- |
| `(default)` | content for the dialog |

## Events

| Name        | Description                                             |
| ----------- | ------------------------------------------------------- |
| `secondary` | Announces that the "secondary" button has been clicked. |
| `cancel`    | Announces that the "cancel" button has been clicked.    |
| `confirm`   | Announces that the "confirm" button has been clicked.   |
| `close`     | Announces that the dialog has been closed.              |
| `undefined` |                                                         |

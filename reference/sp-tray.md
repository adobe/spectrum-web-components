# sp-tray

sp-tray elements are typically used to portray information on mobile device or smaller screens.

```js
import '@spectrum-web-components/tray/sp-tray.js';
// <sp-tray></sp-tray>
```

## Attributes

| Name                   | Type      | Default | Description                                                                 |
| ---------------------- | --------- | ------- | --------------------------------------------------------------------------- |
| `open`                 | `boolean` | `false` |                                                                             |
| `has-keyboard-dismiss` | `boolean` | `false` | When set, prevents the tray from rendering visually-hidden dismiss helpers. |

## Slots

| Name        | Description                        |
| ----------- | ---------------------------------- |
| `(default)` | content to display within the Tray |

## Events

| Name    | Description                              |
| ------- | ---------------------------------------- |
| `close` | Announces that the Tray has been closed. |

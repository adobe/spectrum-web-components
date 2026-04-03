# sp-dialog

sp-dialog displays important information that users need to acknowledge.

```js
import '@spectrum-web-components/dialog/sp-dialog.js';
// <sp-dialog></sp-dialog>
```

## Attributes

| Name            | Type                                              | Default   | Description |
| --------------- | ------------------------------------------------- | --------- | ----------- |
| `error`         | `boolean`                                         | `false`   |             |
| `dismissable`   | `boolean`                                         | `false`   |             |
| `dismiss-label` | `string`                                          | `'Close'` |             |
| `no-divider`    | `boolean`                                         | `false`   |             |
| `mode`          | `'fullscreen' | 'fullscreenTakeover' | undefined` | -         |             |
| `size`          | `'s' | 'm' | 'l' | undefined`                     | -         |             |
| `variant`       | `AlertDialogVariants`                             | -         |             |

## Slots

| Name        | Description                                                                                                              |
| ----------- | ------------------------------------------------------------------------------------------------------------------------ |
| `hero`      | Accepts a hero image to display at the top of the dialog                                                                 |
| `heading`   | Acts as the heading of the dialog. This should be an actual heading tag `<h1-6 />`                                       |
| `(default)` | Content not addressed to a specific slot will be interpreted as the main content of the dialog                           |
| `footer`    | Content addressed to the `footer` will be placed below the main content and to the side of any `[slot='button']` content |
| `button`    | Button elements addressed to this slot may be placed below the content when not delivered in a fullscreen mode           |

## Events

| Name    | Description                                |
| ------- | ------------------------------------------ |
| `close` | Announces that the dialog has been closed. |

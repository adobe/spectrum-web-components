# sp-toast

sp-toast elements display brief, temporary notifications.

```js
import '@spectrum-web-components/toast/sp-toast.js';
// <sp-toast></sp-toast>
```

## Attributes

| Name         | Type                 | Default | Description                                                                                                                                                                                       |
| ------------ | -------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `open`       | `boolean`            | `false` | The `open` property indicates whether the toast is visible or hidden.                                                                                                                             |
| `timeout`    | `number | null`      | `null`  | When a timeout is provided, it represents the number of milliseconds from when the Toast was placed on the page before it will automatically dismiss itself.                                      |
| `variant`    | `ToastVariants`      | -       | The variant applies specific styling when set to `negative`, `positive`, `info`, `error`, or `warning`. The variants `error` and `warning` are deprecated and should be replaced with `negative`. |
| `icon-label` | `string | undefined` | -       | The `iconLabel` property is used to set the `label` attribute on the icon element. This is used to provide a text alternative for the icon to ensure accessibility.                               |

## Slots

| Name        | Description                                     |
| ----------- | ----------------------------------------------- |
| `(default)` | The toast content                               |
| `action`    | button element surfacing an action in the Toast |

## Events

| Name    | Description                                                             |
| ------- | ----------------------------------------------------------------------- |
| `close` | Announces that the Toast has been closed by the user or by its timeout. |

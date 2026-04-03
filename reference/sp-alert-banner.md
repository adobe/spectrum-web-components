# sp-alert-banner

The sp-alert-banner displays pressing and high-signal messages, such as system alerts.

```js
import '@spectrum-web-components/alert-banner/sp-alert-banner.js';
// <sp-alert-banner></sp-alert-banner>
```

## Attributes

| Name          | Type                 | Default | Description                                                                                                                                |
| ------------- | -------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `open`        | `boolean`            | `false` | Controls the display of the alert banner.                                                                                                  |
| `dismissible` | `boolean`            | `false` | Whether to include an icon-only close button to dismiss the alert banner.                                                                  |
| `variant`     | `AlertBannerVariant` | -       | The variant applies specific styling when set to `negative` or `info`; `variant` attribute is removed when it's passed an invalid variant. |

## Slots

| Name        | Description                                                                     |
| ----------- | ------------------------------------------------------------------------------- |
| `(default)` | The alert banner text context                                                   |
| `action`    | Slot for the button element that surfaces the contextual action a user can take |

## Events

| Name    | Description                                |
| ------- | ------------------------------------------ |
| `close` | Announces the alert banner has been closed |

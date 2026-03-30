# swc-asset

```js
import '@adobe/spectrum-wc/components/asset/index.js';
// <swc-asset></swc-asset>
```

## Attributes

| Name      | Type                        | Default | Description                                                                             |
| --------- | --------------------------- | ------- | --------------------------------------------------------------------------------------- |
| `variant` | `AssetVariant \| undefined` | -       | The variant of the asset. When not provided, slot content is rendered (e.g., an image). |
| `label`   | `string`                    | `''`    | Accessible label for the asset’s file or folder variant.                                |

## Slots

| Name        | Description                                                                     |
| ----------- | ------------------------------------------------------------------------------- |
| `(default)` | content to be displayed when no `variant` is set (typically an `<img>` element) |

# sp-asset

```js
import '@spectrum-web-components/asset/sp-asset.js';
// <sp-asset></sp-asset>
```

## Attributes

| Name      | Type                       | Default | Description                                                                             |
| --------- | -------------------------- | ------- | --------------------------------------------------------------------------------------- |
| `variant` | `AssetVariant | undefined` | -       | The variant of the asset. When not provided, slot content is rendered (e.g., an image). |
| `label`   | `string`                   | `''`    | Accessible label for the asset’s file or folder variant.                                |

## Slots

| Name        | Description                                                                             |
| ----------- | --------------------------------------------------------------------------------------- |
| `(default)` | content to be displayed in the asset when an acceptable value for `file` is not present |

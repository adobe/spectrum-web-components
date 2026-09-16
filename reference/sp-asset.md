# sp-asset

```js
import '@spectrum-web-components/asset/sp-asset.js';
// <sp-asset></sp-asset>
```

## Attributes

| Name               | Type                  | Default         | Description                                                                                                                                                             |
| ------------------ | --------------------- | --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `aspect-ratio`     | `string \| undefined` | -               | The aspect ratio to apply to the asset, in CSS `<ratio>` syntax (e.g. `"16/9"`), plus the `square` keyword. `:`-separated ratios (e.g. `"16:9"`) are normalized to `/`. |
| `width`            | `string \| undefined` | -               | An explicit width, as a CSS `<length-percentage>` (e.g. `"100px"`, `"90%"`). An alternative to `aspectRatio` for sizing the asset.                                      |
| `height`           | `string \| undefined` | -               | An explicit height, as a CSS `<length-percentage>` (e.g. `"100px"`, `"90%"`). An alternative to `aspectRatio` for sizing the asset.                                     |
| `fit`              | `AssetFit`            | `'cover'`       | How slotted image/SVG content fits within the asset's box.                                                                                                              |
| `decorative`       | `boolean`             | `false`         | Marks the asset as decorative, removing it from the accessibility tree (`aria-hidden="true"` on the host) regardless of slotted content or `accessibleLabel`.           |
| `accessible-label` | `string \| undefined` | -               | A fallback accessible name, applied to the slotted `<img>` or `<svg>` only when it doesn't already carry its own accessible name.                                       |
| `background`       | `AssetBackground`     | `'transparent'` | The background shown behind slotted content: `transparent` (no background), a `solid` color, or an opacity `checkerboard`.                                              |
| `load-state`       | `AssetLoadState`      | `'loading'`     | The load status of the slotted `<img>`: `'loading'` while its request is in flight, `'loaded'` on success, `'error'` on failure.                                        |

## Slots

| Name        | Description                                                                             |
| ----------- | --------------------------------------------------------------------------------------- |
| `(default)` | content to be displayed in the asset when an acceptable value for `file` is not present |

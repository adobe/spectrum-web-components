# sp-thumbnail

An sp-thumbnail can be used in a variety of locations as a way to display a preview of an image, layer, or effect.

```js
import '@spectrum-web-components/thumbnail/sp-thumbnail.js';
// <sp-thumbnail></sp-thumbnail>
```

## Attributes

| Name         | Type                 | Default | Description |
| ------------ | -------------------- | ------- | ----------- |
| `background` | `string | undefined` | -       |             |
| `cover`      | `boolean`            | `false` |             |
| `layer`      | `boolean`            | `false` |             |
| `size`       | `ThumbnailSize`      | -       |             |

## Slots

| Name    | Description                               |
| ------- | ----------------------------------------- |
| `image` | image element to present in the Thumbnail |

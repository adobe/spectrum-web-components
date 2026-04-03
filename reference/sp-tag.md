# sp-tag

sp-tags elements contain a collection of sp-tag elements and allow users to categorize content.

```js
import '@spectrum-web-components/tags/sp-tag.js';
// <sp-tag></sp-tag>
```

## Attributes

| Name        | Type      | Default | Description |
| ----------- | --------- | ------- | ----------- |
| `deletable` | `boolean` | `false` |             |
| `disabled`  | `boolean` | `false` |             |
| `readonly`  | `boolean` | `false` |             |

## Slots

| Name        | Description                                 |
| ----------- | ------------------------------------------- |
| `(default)` | text content for labeling the tag           |
| `avatar`    | an avatar element to display within the Tag |
| `icon`      | an icon element to display within the Tag   |

## Events

| Name     | Description |
| -------- | ----------- |
| `delete` |             |

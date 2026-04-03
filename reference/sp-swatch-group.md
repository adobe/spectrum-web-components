# sp-swatch-group

An sp-swatch shows a small sample of a fill — such as a color, gradient, texture, or material — that is intended to be applied to an object.

```js
import '@spectrum-web-components/swatch/sp-swatch-group.js';
// <sp-swatch-group></sp-swatch-group>
```

## Attributes

| Name       | Type                                 | Default | Description |
| ---------- | ------------------------------------ | ------- | ----------- |
| `border`   | `SwatchBorder`                       | -       |             |
| `density`  | `'compact' | 'spacious' | undefined` | -       |             |
| `rounding` | `SwatchRounding`                     | -       |             |
| `selected` | `string[]`                           | -       |             |
| `selects`  | `SwatchSelects`                      | -       |             |
| `shape`    | `SwatchShape`                        | -       |             |

## Slots

| Name        | Description                          |
| ----------- | ------------------------------------ |
| `(default)` | Swatch elements to manage as a group |

## Events

| Name     | Description |
| -------- | ----------- |
| `change` |             |

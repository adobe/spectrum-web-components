# sp-badge

sp-badge elements display a small amount of color-categorized metadata.

```js
import '@spectrum-web-components/badge/sp-badge.js';
// <sp-badge></sp-badge>
```

## Attributes

| Name      | Type                      | Default         | Description                      |
| --------- | ------------------------- | --------------- | -------------------------------- |
| `variant` | `BadgeVariantS1`          | `'informative'` | The variant of the badge.        |
| `size`    | `ElementSize`             | -               | The size of the badge.           |
| `fixed`   | `FixedValues | undefined` | -               | The fixed position of the badge. |

## Slots

| Name        | Description                                         |
| ----------- | --------------------------------------------------- |
| `(default)` | Text label of the badge                             |
| `icon`      | Optional icon that appears to the left of the label |

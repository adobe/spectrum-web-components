# swc-badge

A badge component that displays short, descriptive information about an element. Badges are typically used to indicate status, categories, or provide supplementary information.

```js
import '@adobe/spectrum-wc/components/badge/index.js';
// <swc-badge></swc-badge>
```

## Attributes

| Name      | Type                       | Default         | Description                                                             |
| --------- | -------------------------- | --------------- | ----------------------------------------------------------------------- |
| `variant` | `BadgeVariant`             | `'informative'` | The variant of the badge.                                               |
| `subtle`  | `boolean`                  | `false`         | Whether the badge is subtle.                                            |
| `outline` | `boolean`                  | `false`         | Whether the badge is outlined. Can only be used with semantic variants. |
| `size`    | `ElementSize`              | -               | The size of the badge.                                                  |
| `fixed`   | `FixedValues \| undefined` | -               | The fixed position of the badge.                                        |

## Slots

| Name        | Description                                         |
| ----------- | --------------------------------------------------- |
| `(default)` | Text label of the badge.                            |
| `icon`      | Optional icon that appears to the left of the label |

# sp-infield-button

```js
import '@spectrum-web-components/infield-button/sp-infield-button.js';
// <sp-infield-button></sp-infield-button>
```

## Attributes

| Name               | Type                  | Default | Description                                                                                                                                |
| ------------------ | --------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `block`            | `'start' \| 'end'`    | -       | Whether to style the button as if it is at the start or end of a vertical stack                                                            |
| `inline`           | `'start' \| 'end'`    | -       | Whether to style the button as if it is at the start or end of a horizontal group                                                          |
| `quiet`            | `boolean`             | `false` |                                                                                                                                            |
| `size`             | `ElementSize`         | -       | The size of the button.                                                                                                                    |
| `disabled`         | `boolean`             | `false` | Whether the button is disabled. Removes focusability and prevents interaction.                                                             |
| `accessible-label` | `string \| undefined` | -       | Accessible label forwarded to the internal `<button>` element as `aria-label`. Required for icon-only buttons, which have no visible text. |

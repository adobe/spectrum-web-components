# sp-infield-button

```js
import '@spectrum-web-components/infield-button/sp-infield-button.js';
// <sp-infield-button></sp-infield-button>
```

## Attributes

| Name               | Type                 | Default | Description                                                                                                                                                                          |
| ------------------ | -------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `block`            | `'start' | 'end'`    | -       | Whether to style the button as if it is at the start or end of a vertical stack                                                                                                      |
| `inline`           | `'start' | 'end'`    | -       | Whether to style the button as if it is at the start or end of a horizontal group                                                                                                    |
| `quiet`            | `boolean`            | `false` |                                                                                                                                                                                      |
| `size`             | `ElementSize`        | -       | The size of the button.                                                                                                                                                              |
| `disabled`         | `boolean`            | `false` | Whether the button is disabled. Removes focusability and prevents interaction.                                                                                                       |
| `pending`          | `boolean`            | `false` | Whether the button is in a pending (busy) state. The button remains focusable but activation is suppressed.                                                                          |
| `accessible-label` | `string | undefined` | -       | Accessible label forwarded to the internal `<button>` element as `aria-label`. Required for icon-only buttons, which have no visible text.                                           |
| `pending-label`    | `string | undefined` | -       | Custom accessible label used during the pending state. When omitted, the pending label is derived from the resolved non-busy accessible name plus a busy suffix (e.g. "Save, busy"). |

## Slots

| Name        | Description            |
| ----------- | ---------------------- |
| `(default)` | Visible button label.  |
| `icon`      | Optional leading icon. |

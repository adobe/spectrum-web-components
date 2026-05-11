# sp-close-button

An sp-button represents an action a user can take.

```js
import '@spectrum-web-components/button/sp-close-button.js';
// <sp-close-button></sp-close-button>
```

## Attributes

| Name               | Type                            | Default | Description                                                                                                                                                                          |
| ------------------ | ------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `variant`          | `ButtonStaticColors | ''`       | `''`    | The visual variant to apply to this button.                                                                                                                                          |
| `static-color`     | `'black' | 'white' | undefined` | -       |                                                                                                                                                                                      |
| `size`             | `ElementSize`                   | -       | The size of the button.                                                                                                                                                              |
| `disabled`         | `boolean`                       | `false` | Whether the button is disabled. Removes focusability and prevents interaction.                                                                                                       |
| `pending`          | `boolean`                       | `false` | Whether the button is in a pending (busy) state. The button remains focusable but activation is suppressed.                                                                          |
| `accessible-label` | `string | undefined`            | -       | Accessible label forwarded to the internal `<button>` element as `aria-label`. Required for icon-only buttons, which have no visible text.                                           |
| `pending-label`    | `string | undefined`            | -       | Custom accessible label used during the pending state. When omitted, the pending label is derived from the resolved non-busy accessible name plus a busy suffix (e.g. "Save, busy"). |

## Slots

| Name        | Description                    |
| ----------- | ------------------------------ |
| `(default)` | text label of the Close Button |
| `icon`      | Optional leading icon.         |

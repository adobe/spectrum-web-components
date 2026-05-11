# sp-picker-button

An sp-picker-button is used as a sub-component of patterns like the sp-combobox (release pending) to pair a button interface with a text input.

```js
import '@spectrum-web-components/picker-button/sp-picker-button.js';
// <sp-picker-button></sp-picker-button>
```

## Attributes

| Name               | Type                 | Default   | Description                                                                                                                                                                          |
| ------------------ | -------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `invalid`          | `boolean`            | `false`   |                                                                                                                                                                                      |
| `position`         | `'left' | 'right'`   | `'right'` |                                                                                                                                                                                      |
| `size`             | `ElementSize`        | -         | The size of the button.                                                                                                                                                              |
| `disabled`         | `boolean`            | `false`   | Whether the button is disabled. Removes focusability and prevents interaction.                                                                                                       |
| `pending`          | `boolean`            | `false`   | Whether the button is in a pending (busy) state. The button remains focusable but activation is suppressed.                                                                          |
| `accessible-label` | `string | undefined` | -         | Accessible label forwarded to the internal `<button>` element as `aria-label`. Required for icon-only buttons, which have no visible text.                                           |
| `pending-label`    | `string | undefined` | -         | Custom accessible label used during the pending state. When omitted, the pending label is derived from the resolved non-busy accessible name plus a busy suffix (e.g. "Save, busy"). |

## Slots

| Name        | Description            |
| ----------- | ---------------------- |
| `(default)` | Visible button label.  |
| `icon`      | Optional leading icon. |

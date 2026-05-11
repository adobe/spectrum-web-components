# sp-clear-button

An sp-button represents an action a user can take.

```js
import '@spectrum-web-components/button/sp-clear-button.js';
// <sp-clear-button></sp-clear-button>
```

## Attributes

| Name               | Type                           | Default | Description                                                                                                                                                                          |
| ------------------ | ------------------------------ | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `label`            | `string`                       | -       | An accessible label that describes the component. It will be applied to aria-label, but not visually rendered. This attribute is required for clear buttons.                         |
| `quiet`            | `boolean`                      | `false` |                                                                                                                                                                                      |
| `variant`          | `'overBackground' | undefined` | -       | The visual variant to apply to this button.                                                                                                                                          |
| `static-color`     | `'white' | undefined`          | -       | The visual variant to apply to this button.                                                                                                                                          |
| `size`             | `ElementSize`                  | -       | The size of the button.                                                                                                                                                              |
| `disabled`         | `boolean`                      | `false` | Whether the button is disabled. Removes focusability and prevents interaction.                                                                                                       |
| `pending`          | `boolean`                      | `false` | Whether the button is in a pending (busy) state. The button remains focusable but activation is suppressed.                                                                          |
| `accessible-label` | `string | undefined`           | -       | Accessible label forwarded to the internal `<button>` element as `aria-label`. Required for icon-only buttons, which have no visible text.                                           |
| `pending-label`    | `string | undefined`           | -       | Custom accessible label used during the pending state. When omitted, the pending label is derived from the resolved non-busy accessible name plus a busy suffix (e.g. "Save, busy"). |

## Slots

| Name        | Description            |
| ----------- | ---------------------- |
| `(default)` | Visible button label.  |
| `icon`      | Optional leading icon. |

# sp-button

An sp-button represents an action a user can take.

```js
import '@spectrum-web-components/button/sp-button.js';
// <sp-button></sp-button>
```

## Attributes

| Name               | Type                            | Default     | Description                                                                                                                                                                          |
| ------------------ | ------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `pending-label`    | `string | undefined`            | `'Pending'` | Custom accessible label used during the pending state. When omitted, the pending label is derived from the resolved non-busy accessible name plus a busy suffix (e.g. "Save, busy"). |
| `pending`          | `boolean`                       | `false`     | Whether the button is in a pending (busy) state. The button remains focusable but activation is suppressed.                                                                          |
| `variant`          | `ButtonVariants`                | -           | The visual variant to apply to this button.                                                                                                                                          |
| `static-color`     | `'black' | 'white' | undefined` | -           | The static color variant to use for this button.                                                                                                                                     |
| `treatment`        | `ButtonTreatments`              | `'fill'`    | The visual treatment to apply to this button.                                                                                                                                        |
| `quiet`            | `boolean`                       | -           | Style this button to be less obvious.                                                                                                                                                |
| `no-wrap`          | `boolean`                       | -           | Disables text wrapping within the button component's label.                                                                                                                          |
| `size`             | `ElementSize`                   | -           | The size of the button.                                                                                                                                                              |
| `disabled`         | `boolean`                       | `false`     | Whether the button is disabled. Removes focusability and prevents interaction.                                                                                                       |
| `accessible-label` | `string | undefined`            | -           | Accessible label forwarded to the internal `<button>` element as `aria-label`. Required for icon-only buttons, which have no visible text.                                           |

## Slots

| Name        | Description                |
| ----------- | -------------------------- |
| `(default)` | text label of the Button   |
| `icon`      | The icon to use for Button |

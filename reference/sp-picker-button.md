# sp-picker-button

An sp-picker-button is used as a sub-component of patterns like the sp-combobox (release pending) to pair a button interface with a text input.

```js
import '@spectrum-web-components/picker-button/sp-picker-button.js';
// <sp-picker-button></sp-picker-button>
```

## Attributes

| Name               | Type                  | Default   | Description                                                                                                                                |
| ------------------ | --------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `invalid`          | `boolean`             | `false`   |                                                                                                                                            |
| `position`         | `'left' \| 'right'`   | `'right'` |                                                                                                                                            |
| `size`             | `ElementSize`         | -         | The size of the button.                                                                                                                    |
| `disabled`         | `boolean`             | `false`   | Whether the button is disabled. Removes focusability and prevents interaction.                                                             |
| `accessible-label` | `string \| undefined` | -         | Accessible label forwarded to the internal `<button>` element as `aria-label`. Required for icon-only buttons, which have no visible text. |

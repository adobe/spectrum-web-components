# sp-action-button

An sp-action-button represents an action a user can take.

```js
import '@spectrum-web-components/action-button/sp-action-button.js';
// <sp-action-button></sp-action-button>
```

## Attributes

| Name               | Type                            | Default    | Description                                                                                                                                                                          |
| ------------------ | ------------------------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `emphasized`       | `boolean`                       | `false`    |                                                                                                                                                                                      |
| `hold-affordance`  | `boolean`                       | `false`    |                                                                                                                                                                                      |
| `quiet`            | `boolean`                       | `false`    |                                                                                                                                                                                      |
| `role`             | `string`                        | `'button'` |                                                                                                                                                                                      |
| `selected`         | `boolean`                       | `false`    | Whether an Action Button with `role='button'` should also be `aria-pressed='true'`                                                                                                   |
| `toggles`          | `boolean`                       | `false`    | Whether to automatically manage the `selected` attribute on interaction and whether `aria-pressed="false"` should be used when `selected === false`                                  |
| `static-color`     | `'white' | 'black' | undefined` | -          | The static color variant to use for the action button.                                                                                                                               |
| `value`            | `string`                        | -          |                                                                                                                                                                                      |
| `size`             | `ElementSize`                   | -          | The size of the button.                                                                                                                                                              |
| `disabled`         | `boolean`                       | `false`    | Whether the button is disabled. Removes focusability and prevents interaction.                                                                                                       |
| `pending`          | `boolean`                       | `false`    | Whether the button is in a pending (busy) state. The button remains focusable but activation is suppressed.                                                                          |
| `accessible-label` | `string | undefined`            | -          | Accessible label forwarded to the internal `<button>` element as `aria-label`. Required for icon-only buttons, which have no visible text.                                           |
| `pending-label`    | `string | undefined`            | -          | Custom accessible label used during the pending state. When omitted, the pending label is derived from the resolved non-busy accessible name plus a busy suffix (e.g. "Save, busy"). |

## Slots

| Name        | Description                       |
| ----------- | --------------------------------- |
| `(default)` | text label of the Action Button   |
| `icon`      | The icon to use for Action Button |

## Events

| Name        | Description                                                                                                                                                                        |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `longpress` | Synthesizes a "longpress" interaction that signifies a `pointerdown` event that is >=300ms or a keyboard event where code is `Space` or code is `ArrowDown` while `altKey===true`. |
| `change`    | Announces a change in the `selected` property of an action button                                                                                                                  |

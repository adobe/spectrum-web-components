# sp-picker

An `<sp-picker>` is a dropdown selection component that allows users to choose a single option from a list of menu items.

```js
import '@spectrum-web-components/picker/sp-picker.js';
// <sp-picker></sp-picker>
```

## Attributes

| Name            | Type                                                                                                                                                      | Default          | Description                                                                                                                                             |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `icons`         | `'only' | 'none' | undefined`                                                                                                                             | -                | Controls how icons are displayed in the picker button. - `'only'`: Shows only the icon, hiding the label visually. - `'none'`: Hides the icon entirely. |
| `invalid`       | `boolean`                                                                                                                                                 | `false`          | Whether the picker is in an invalid state. Displays a validation icon when true.                                                                        |
| `pending-label` | `string`                                                                                                                                                  | `'Pending'`      | Defines a string value that labels the Picker while it is in pending state.                                                                             |
| `label`         | `string | undefined`                                                                                                                                      | -                | The placeholder label displayed when no item is selected.                                                                                               |
| `quiet`         | `boolean`                                                                                                                                                 | `false`          | Whether to render the picker in quiet mode with minimal visual styling.                                                                                 |
| `value`         | `string`                                                                                                                                                  | `''`             | The current value of the picker, corresponding to the selected menu item's value.                                                                       |
| `placement`     | `"top" | "top-start" | "top-end" | "right" | "right-start" | "right-end" | "bottom" | "bottom-start" | "bottom-end" | "left" | "left-start" | "left-end"` | `'bottom-start'` | The preferred placement of the component's overlay relative to the trigger button.                                                                      |
| `disabled`      | `boolean`                                                                                                                                                 | `false`          | Whether the component is disabled. When disabled, the component cannot be interacted with.                                                              |
| `focused`       | `boolean`                                                                                                                                                 | `false`          | Whether the component currently has visible focus.                                                                                                      |
| `readonly`      | `boolean`                                                                                                                                                 | `false`          | Whether the component is read-only. When read-only, the component displays its value but cannot be changed.                                             |
| `pending`       | `boolean`                                                                                                                                                 | `false`          | Whether the items are currently loading.                                                                                                                |
| `force-popover` | `boolean`                                                                                                                                                 | `false`          | Forces the component to render as a popover on mobile instead of a tray.                                                                                |
| `open`          | `boolean`                                                                                                                                                 | `false`          | Whether the component's menu overlay is currently open.                                                                                                 |

## Slots

| Name          | Description                                       |
| ------------- | ------------------------------------------------- |
| `label`       | The placeholder content for the Picker            |
| `description` | The description content for the Picker            |
| `tooltip`     | Tooltip to to be applied to the the Picker Button |
| `(default)`   | menu items to be listed in the Picker             |

## Events

| Name        | Description                                           |
| ----------- | ----------------------------------------------------- |
| `change`    | Announces that the `value` of the element has changed |
| `scroll`    |                                                       |
| `sp-opened` | Announces that the overlay has been opened            |
| `sp-closed` | Announces that the overlay has been closed            |

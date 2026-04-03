# sp-action-menu

An `<sp-action-menu>` is an action button with an attached menu of options. Unlike a standard picker, it does not maintain a selection by default and displays a "more" icon instead of a chevron.

```js
import '@spectrum-web-components/action-menu/sp-action-menu.js';
// <sp-action-menu></sp-action-menu>
```

## Attributes

| Name            | Type                                                                                                                                                      | Default          | Description                                                                                                                                              |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `selects`       | `undefined | 'single'`                                                                                                                                    | `undefined`      | The selection mode for the action menu. Unlike Picker, defaults to `undefined` (no selection management). Set to `'single'` to maintain a selected item. |
| `icons`         | `'only' | 'none' | undefined`                                                                                                                             | -                | Controls how icons are displayed in the picker button. - `'only'`: Shows only the icon, hiding the label visually. - `'none'`: Hides the icon entirely.  |
| `invalid`       | `boolean`                                                                                                                                                 | `false`          | Whether the picker is in an invalid state. Displays a validation icon when true.                                                                         |
| `pending-label` | `string`                                                                                                                                                  | `'Pending'`      | Defines a string value that labels the Picker while it is in pending state.                                                                              |
| `label`         | `string | undefined`                                                                                                                                      | -                | The placeholder label displayed when no item is selected.                                                                                                |
| `static-color`  | `'white' | 'black' | undefined`                                                                                                                           | -                | Applies static color styling for use on colored backgrounds. - `'white'`: Use on dark backgrounds - `'black'`: Use on light backgrounds                  |
| `quiet`         | `boolean`                                                                                                                                                 | `false`          | Whether to render the picker in quiet mode with minimal visual styling.                                                                                  |
| `value`         | `string`                                                                                                                                                  | `''`             | The current value of the picker, corresponding to the selected menu item's value.                                                                        |
| `placement`     | `"top" | "top-start" | "top-end" | "right" | "right-start" | "right-end" | "bottom" | "bottom-start" | "bottom-end" | "left" | "left-start" | "left-end"` | `'bottom-start'` | The preferred placement of the component's overlay relative to the trigger button.                                                                       |
| `disabled`      | `boolean`                                                                                                                                                 | `false`          | Whether the component is disabled. When disabled, the component cannot be interacted with.                                                               |
| `focused`       | `boolean`                                                                                                                                                 | `false`          | Whether the component currently has visible focus.                                                                                                       |
| `readonly`      | `boolean`                                                                                                                                                 | `false`          | Whether the component is read-only. When read-only, the component displays its value but cannot be changed.                                              |
| `pending`       | `boolean`                                                                                                                                                 | `false`          | Whether the items are currently loading.                                                                                                                 |
| `force-popover` | `boolean`                                                                                                                                                 | `false`          | Forces the component to render as a popover on mobile instead of a tray.                                                                                 |
| `open`          | `boolean`                                                                                                                                                 | `false`          | Whether the component's menu overlay is currently open.                                                                                                  |

## Slots

| Name         | Description                                                   |
| ------------ | ------------------------------------------------------------- |
| `(default)`  | menu items to be listed in the Action Menu                    |
| `icon`       | The icon to use for the Action Menu                           |
| `label`      | The label to use for the Action Menu                          |
| `label-only` | The label to use for the Action Menu (no icon space reserved) |
| `tooltip`    | Tooltip to be applied to the Action Button                    |

## Events

| Name        | Description                                |
| ----------- | ------------------------------------------ |
| `change`    |                                            |
| `scroll`    |                                            |
| `sp-opened` | Announces that the overlay has been opened |
| `sp-closed` | Announces that the overlay has been closed |

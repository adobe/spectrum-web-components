# sp-menu-group

An sp-menu is used for creating a menu list.

```js
import '@spectrum-web-components/menu/sp-menu-group.js';
// <sp-menu-group></sp-menu-group>
```

## Attributes

| Name              | Type                                            | Default | Description                                                                                                                                                                                          |
| ----------------- | ----------------------------------------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `selects`         | `undefined | 'inherit' | 'single' | 'multiple'` | -       | how the menu allows selection of its items: - `undefined` (default): no selection is allowed - `"inherit"`: the selection behavior is managed from an ancestor - `"single"`: only one item can be... |
| `label`           | `string`                                        | `''`    | label of the menu                                                                                                                                                                                    |
| `ignore`          | `boolean`                                       | `false` | whether menu should be ignored by roving tabindex controller                                                                                                                                         |
| `value`           | `string`                                        | `''`    | value of the selected item(s)                                                                                                                                                                        |
| `value-separator` | `string`                                        | `','`   |                                                                                                                                                                                                      |

## Slots

| Name        | Description                          |
| ----------- | ------------------------------------ |
| `header`    | headline of the menu group           |
| `(default)` | menu items to be listed in the group |

## Events

| Name     | Description                                           |
| -------- | ----------------------------------------------------- |
| `change` | Announces that the `value` of the element has changed |
| `close`  |                                                       |

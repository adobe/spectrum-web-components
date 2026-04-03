# sp-table-head-cell

An sp-table is used to create a container for displaying information.

```js
import '@spectrum-web-components/table/sp-table-head-cell.js';
// <sp-table-head-cell></sp-table-head-cell>
```

## Attributes

| Name             | Type                         | Default          | Description |
| ---------------- | ---------------------------- | ---------------- | ----------- |
| `active`         | `boolean`                    | `false`          |             |
| `role`           | `string`                     | `'columnheader'` |             |
| `sortable`       | `boolean`                    | `false`          |             |
| `sort-direction` | `'asc' | 'desc' | undefined` | -                |             |
| `sort-key`       | `string`                     | `''`             |             |

## Events

| Name     | Description                                                                |
| -------- | -------------------------------------------------------------------------- |
| `sorted` | Announces that the table head has been sorted and handles the sorted event |

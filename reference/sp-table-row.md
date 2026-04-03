# sp-table-row

An sp-table is used to create a container for displaying information.

```js
import '@spectrum-web-components/table/sp-table-row.js';
// <sp-table-row></sp-table-row>
```

## Attributes

| Name         | Type      | Default | Description |
| ------------ | --------- | ------- | ----------- |
| `role`       | `string`  | `'row'` |             |
| `selectable` | `boolean` | `false` |             |
| `selected`   | `boolean` | `false` |             |
| `value`      | `string`  | `''`    |             |

## Events

| Name     | Description                                            |
| -------- | ------------------------------------------------------ |
| `sorted` | Announces that `selected` of the table row has changed |

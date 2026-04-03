# sp-table-checkbox-cell

An sp-table is used to create a container for displaying information.

```js
import '@spectrum-web-components/table/sp-table-checkbox-cell.js';
// <sp-table-checkbox-cell></sp-table-checkbox-cell>
```

## Attributes

| Name             | Type      | Default      | Description                                                                                                                                                                |
| ---------------- | --------- | ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `head-cell`      | `boolean` | `false`      | Whether or not the checkbox cell is in the table head.                                                                                                                     |
| `role`           | `string`  | `'gridcell'` |                                                                                                                                                                            |
| `indeterminate`  | `boolean` | `false`      |                                                                                                                                                                            |
| `checked`        | `boolean` | `false`      |                                                                                                                                                                            |
| `disabled`       | `boolean` | `false`      |                                                                                                                                                                            |
| `selects-single` | `boolean` | `false`      |                                                                                                                                                                            |
| `emphasized`     | `boolean` | `false`      |                                                                                                                                                                            |
| `label`          | `string`  | `''`         | The accessible label for the checkbox. For header rows, this defaults to 'Select All'. For body rows, this should be set to the text content of the first cell in the row. |

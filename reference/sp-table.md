# sp-table

An sp-table is used to create a container for displaying information.

```js
import '@spectrum-web-components/table/sp-table.js';
// <sp-table></sp-table>
```

## Attributes

| Name               | Type                                 | Default        | Description                                                                                                                                                            |
| ------------------ | ------------------------------------ | -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `role`             | `string`                             | `'grid'`       |                                                                                                                                                                        |
| `selects`          | `undefined | 'single' | 'multiple'`  | -              | Whether the Table allows users to select a row or rows, and thus controls whether or not the Table also renders checkboxes.                                            |
| `selected`         | `string[]`                           | `[]`           | An array of <sp-row> values that have been selected.                                                                                                                   |
| `select-all-label` | `string`                             | `'Select All'` | The accessible label for the "select all" checkbox in the table header. Defaults to 'Select All'.                                                                      |
| `items`            | `Record<string, unknown>[]`          | `[]`           | The content of the rows rendered by the virtualized table. The key is the value of the sp-table-row, and the value is the sp-table-row's content (not the row itself). |
| `itemValue`        |                                      | -              | The value of an item. By default, it is set to the index of the sp-table-row.                                                                                          |
| `itemLabel`        |                                      | -              | A function to extract the accessible label for a row's checkbox from an item. By default, returns a generic label based on the row index.                              |
| `scroller`         | `boolean`                            | `false`        | Whether or not the virtualized table has a scroll bar. If this is set to true, make sure to specify a height in the sp-table's inline styles.                          |
| `emphasized`       | `boolean`                            | `false`        | Deliver the Table with additional visual emphasis to selected rows.                                                                                                    |
| `quiet`            | `boolean`                            | `false`        | Display with "quiet" variant styles.                                                                                                                                   |
| `density`          | `'compact' | 'spacious' | undefined` | -              | Changes the spacing around table cell content.                                                                                                                         |

## Events

| Name           | Description                                                        |
| -------------- | ------------------------------------------------------------------ |
| `change`       | Announces a change in the `selected` property of a table row       |
| `undefined`    |                                                                    |
| `rangeChanged` | Announces a change in the range of visible cells on the table body |

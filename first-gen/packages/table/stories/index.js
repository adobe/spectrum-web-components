"use strict";
import { html } from "@spectrum-web-components/base";
export function makeItems(count) {
  const total = count;
  const items = [];
  while (count) {
    count--;
    items.push({
      name: String(total - count),
      date: count
    });
  }
  return items;
}
export const renderItem = (item, index) => {
  if (item._$rowType$ === 1) {
    return html`
            <sp-table-cell>This row has no checkbox!</sp-table-cell>
        `;
  }
  return html`
        <sp-table-cell>Row Item ${item.name}</sp-table-cell>
        <sp-table-cell>Row Item ${item.date}</sp-table-cell>
        <sp-table-cell>Row Item ${index}</sp-table-cell>
    `;
};
//# sourceMappingURL=index.js.map

## Description

An `<sp-table>` is used to create a container for displaying information. It allows users to sort, compare, and take action on large amounts of data.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/table?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/table)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/table?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/table)

```
yarn add @spectrum-web-components/table
```

Import the side effectful registration of `<sp-table>`, `<sp-table-body>`, `<sp-table-cell>`, `<sp-table-checkbox-cell>`, `<sp-table-head>`, `<sp-table-head-cell>`. and `<sp-table-row>` via:

```
import '@spectrum-web-components/table/elements.js';
```

Or individually via:

```
import '@spectrum-web-components/table/sp-table.js';
import '@spectrum-web-components/table/sp-table-body.js';
import '@spectrum-web-components/table/sp-table-cell.js';
import '@spectrum-web-components/table/sp-table-checkbox-cell.js';
import '@spectrum-web-components/table/sp-table-head.js';
import '@spectrum-web-components/table/sp-table-head-cell.js';
import '@spectrum-web-components/table/sp-table-row.js';
```

When looking to leverage the `Table`, `TableBody`, `TableCell`, `TableCheckboxCell`, `TableHead`, `TableHeadCell`, or `TableRow` base classes as a type and/or for extension purposes, do so via:

```
import {
    Table,
    TableBody,
    TableCell,
    TableCheckboxCell,
    TableHead,
    TableHeadCell,
    TableRow
} from '@spectrum-web-components/table';
```

## Example

To ensure that the table scrolls, make sure to add a `style` attribute to `<sp-table>` with your desired height. Otherwise, the table will automatically show all its items.

```html
<sp-table size="m">
    <sp-table-head>
        <sp-table-head-cell>Column Title</sp-table-head-cell>
        <sp-table-head-cell>Column Title</sp-table-head-cell>
        <sp-table-head-cell>Column Title</sp-table-head-cell>
    </sp-table-head>
    <sp-table-body>
        <sp-table-row>
            <sp-table-cell>Row Item Alpha</sp-table-cell>
            <sp-table-cell>Row Item Alpha</sp-table-cell>
            <sp-table-cell>Row Item Alpha</sp-table-cell>
        </sp-table-row>
        <sp-table-row>
            <sp-table-cell>Row Item Bravo</sp-table-cell>
            <sp-table-cell>Row Item Bravo</sp-table-cell>
            <sp-table-cell>Row Item Bravo</sp-table-cell>
        </sp-table-row>
        <sp-table-row>
            <sp-table-cell>Row Item Charlie</sp-table-cell>
            <sp-table-cell>Row Item Charlie</sp-table-cell>
            <sp-table-cell>Row Item Charlie</sp-table-cell>
        </sp-table-row>
        <sp-table-row>
            <sp-table-cell>Row Item Delta</sp-table-cell>
            <sp-table-cell>Row Item Delta</sp-table-cell>
            <sp-table-cell>Row Item Delta</sp-table-cell>
        </sp-table-row>
        <sp-table-row>
            <sp-table-cell>Row Item Echo</sp-table-cell>
            <sp-table-cell>Row Item Echo</sp-table-cell>
            <sp-table-cell>Row Item Echo</sp-table-cell>
        </sp-table-row>
    </sp-table-body>
</sp-table>
```

## Selection

To manage selection on an `<sp-table>`, utilise the `selects` attribute on `<sp-table>`. Each `<sp-table-row>` has a `value` attribute which, by default, corresponds to its index in the table, and these `value`s tell `<sp-table>` which `<sp-table-row>`s are selected. The selected items can be manually applied via the `selected` property on the table.

### `selects="single"`

When `selects="single"`, the `<sp-table>` will manage a _single_ selection in the array value of `selected`.

```html
<sp-table
    size="m"
    selects="single"
    selected='["row1"]'
    style="height: 200px"
    onchange="spAlert(this, `Selected: ${JSON.stringify(this.selected)}`)"
>
    <sp-table-head>
        <sp-table-head-cell>Column Title</sp-table-head-cell>
        <sp-table-head-cell>Column Title</sp-table-head-cell>
        <sp-table-head-cell>Column Title</sp-table-head-cell>
    </sp-table-head>
    <sp-table-body>
        <sp-table-row value="row1">
            <sp-table-cell>Row Item Alpha</sp-table-cell>
            <sp-table-cell>Row Item Alpha</sp-table-cell>
            <sp-table-cell>Row Item Alpha</sp-table-cell>
        </sp-table-row>
        <sp-table-row value="row2">
            <sp-table-cell>Row Item Bravo</sp-table-cell>
            <sp-table-cell>Row Item Bravo</sp-table-cell>
            <sp-table-cell>Row Item Bravo</sp-table-cell>
        </sp-table-row>
        <sp-table-row value="row3">
            <sp-table-cell>Row Item Charlie</sp-table-cell>
            <sp-table-cell>Row Item Charlie</sp-table-cell>
            <sp-table-cell>Row Item Charlie</sp-table-cell>
        </sp-table-row>
        <sp-table-row value="row4">
            <sp-table-cell>Row Item Delta</sp-table-cell>
            <sp-table-cell>Row Item Delta</sp-table-cell>
            <sp-table-cell>Row Item Delta</sp-table-cell>
        </sp-table-row>
        <sp-table-row value="row5">
            <sp-table-cell>Row Item Echo</sp-table-cell>
            <sp-table-cell>Row Item Echo</sp-table-cell>
            <sp-table-cell>Row Item Echo</sp-table-cell>
        </sp-table-row>
    </sp-table-body>
</sp-table>
```

### `selects="multiple"`

When `selects="multiple"`, the `<sp-table>` will manage a selection in the array value of `selected` in via a presence toggle. Additionally, an `<sp-table-checkbox-cell>` will be made available in the `<sp-table-head>` in order to select/deselect all items in the `<sp-table>`.

```html
<sp-table
    size="m"
    style="height: 200px"
    selects="multiple"
    selected='["row1", "row2"]'
    onchange="spAlert(this, `Selected: ${JSON.stringify(this.selected)}`)"
>
    <sp-table-head>
        <sp-table-head-cell>Column Title</sp-table-head-cell>
        <sp-table-head-cell>Column Title</sp-table-head-cell>
        <sp-table-head-cell>Column Title</sp-table-head-cell>
    </sp-table-head>
    <sp-table-body>
        <sp-table-row value="row1">
            <sp-table-cell>Row Item Alpha</sp-table-cell>
            <sp-table-cell>Row Item Alpha</sp-table-cell>
            <sp-table-cell>Row Item Alpha</sp-table-cell>
        </sp-table-row>
        <sp-table-row value="row2">
            <sp-table-cell>Row Item Bravo</sp-table-cell>
            <sp-table-cell>Row Item Bravo</sp-table-cell>
            <sp-table-cell>Row Item Bravo</sp-table-cell>
        </sp-table-row>
        <sp-table-row value="row3">
            <sp-table-cell>Row Item Charlie</sp-table-cell>
            <sp-table-cell>Row Item Charlie</sp-table-cell>
            <sp-table-cell>Row Item Charlie</sp-table-cell>
        </sp-table-row>
        <sp-table-row value="row4">
            <sp-table-cell>Row Item Delta</sp-table-cell>
            <sp-table-cell>Row Item Delta</sp-table-cell>
            <sp-table-cell>Row Item Delta</sp-table-cell>
        </sp-table-row>
        <sp-table-row value="row5">
            <sp-table-cell>Row Item Echo</sp-table-cell>
            <sp-table-cell>Row Item Echo</sp-table-cell>
            <sp-table-cell>Row Item Echo</sp-table-cell>
        </sp-table-row>
    </sp-table-body>
</sp-table>
```

## Virtualized Table

For large amounts of data, the `<sp-table>` can be virtualised to easily add table rows by using properties.

```html-live
<sp-table
    size="m"
    id="table-virtualized-demo"
    style="height: 200px"
    scroller="true"
>
    <sp-table-head>
        <sp-table-head-cell>Column Title</sp-table-head-cell>
        <sp-table-head-cell>Column Title</sp-table-head-cell>
        <sp-table-head-cell>Column Title</sp-table-head-cell>
    </sp-table-head>
</sp-table>
<script type="module">
    const initItems = (count) => {
        const total = count;
        const items = [];
        while (count) {
            count--;
            items.push({
                name: String(total - count),
                date: count,
            });
        }
        return items;
    };
    const initTable = () => {
        const table = document.querySelector('#table-virtualized-demo');
        table.items = initItems(50);

        table.renderItem = (item, index) => {
            const cell1 = document.createElement('sp-table-cell');
            const cell2 = document.createElement('sp-table-cell');
            const cell3 = document.createElement('sp-table-cell');
            cell1.textContent = `Row Item Alpha ${item.name}`;
            cell2.textContent = `Row Item Alpha ${index}`;
            cell3.textContent = `Last Thing`;
            return [cell1, cell2, cell3];
        }
    };
    customElements.whenDefined('sp-table').then(() => {
        initTable();
    });
</script>
```

<script type="module">
    const initItems = (count) => {
        const total = count;
        const items = [];
        while (count) {
            count--;
            items.push({
                name: String(total - count),
                date: count,
            });
        }
        return items;
    }

    const initTable = () => {
        const table = document.querySelector('#table-virtualized-demo');
        table.items = initItems(50);

        table.renderItem = (item, index) => { 
            const cell1 = document.createElement('sp-table-cell');
            const cell2 = document.createElement('sp-table-cell');
            const cell3 = document.createElement('sp-table-cell');
            cell1.textContent = `Row Item Alpha ${item.name}`;
            cell2.textContent = `Row Item Alpha ${index}`;
            cell3.textContent = `Last Thing`;
            return [cell1, cell2, cell3];
        }
    };
    customElements.whenDefined('sp-table').then(() => {
        initTable();
    });
</script>

### How to use it

The virtualised table takes `items` as either a property or a JSON-encoded string, an array of type `Record`, where the key is a `string` and the value can be whatever you'd like. `items` is then fed into the `renderItem` method, which takes an `item` and its `index` as parameters and renders the `<sp-table-row>` for each item. An example is as follows:

```javascript
const renderItem = (item: Item, index: number): TemplateResult => {
    return html`
        <sp-table-cell>Rowsaa Item Alpha ${item.name}</sp-table-cell>
        <sp-table-cell>Row Item Alpha ${item.date}</sp-table-cell>
        <sp-table-cell>Row Item Alpha ${index}</sp-table-cell>
    `;
};
```

`renderItem` is then included as a property of `<sp-table>`, along with the `items`, to render a full `<sp-table>` without excessive manual HTML writing.

You can also render a different cell at a particular index by doing something like below:

```javascript
const renderItem = (item: Item, index: number): TemplateResult => {
    if (index === 15) {
        return html`
            <sp-table-cell style="text-align: center">Custom Row</sp-table-cell>
        `;
    }
    return html`
        <sp-table-cell>Row Item ${item.name}</sp-table-cell>
        <sp-table-cell>Row Item ${item.date}</sp-table-cell>
        <sp-table-cell>Row Item ${index}</sp-table-cell>
    `;
};
```

Please note that there is a bug when attempting to select all virtualised elements. The items are selected programatically, it's just not reflected visually.

### Selection

By default the `selected` property will surface an array of item indexes that are currently selected. However, when making a selection on a virtualized table, it can be useful to track selection as something other than indexes. To do so, set a custom method for the `itemValue` property. The `itemValue` method accepts an item and its index as arguments and should return the value you would like to track in the `selected` property.

```html-live
<sp-table
    size="m"
    id="table-item-value-demo"
    style="height: 200px"
    scroller="true"
    selects="multiple"
>
    <sp-table-head>
        <sp-table-head-cell>Column Title</sp-table-head-cell>
        <sp-table-head-cell>Column Title</sp-table-head-cell>
        <sp-table-head-cell>Column Title</sp-table-head-cell>
    </sp-table-head>
</sp-table>
<div class="selection">Selected: [ ]</div>
<script type="module">
    const initItems = (count) => {
        const total = count;
        const items = [];
        while (count) {
            count--;
            items.push({
                id: crypto.randomUUID(),
                name: String(total - count),
                date: count,
            });
        }
        return items;
    };
    const initTable = () => {
        const table = document.querySelector('#table-item-value-demo');
        table.items = initItems(50);

        table.renderItem = (item, index) => {
            const cell1 = document.createElement('sp-table-cell');
            const cell2 = document.createElement('sp-table-cell');
            const cell3 = document.createElement('sp-table-cell');
            cell1.textContent = `Row Item Alpha ${item.name}`;
            cell2.textContent = `Row Item Alpha ${index}`;
            cell3.textContent = `Last Thing`;
            return [cell1, cell2, cell3];
        };

        table.addEventListener('change', (event) => {
            const selected = event.target.nextElementSibling;
            selected.textContent = `Selected: ${JSON.stringify(event.target.selected, null, ' ')}`;
        });
    };
    customElements.whenDefined('sp-table').then(() => {
        initTable();
    });
</script>
```

<script type="module">
    const initItems = (count) => {
        const total = count;
        const items = [];
        while (count) {
            count--;
            items.push({
                id: crypto.randomUUID(),
                name: String(total - count),
                date: count,
            });
        }
        return items;
    }

    const initTable = () => {
        const table = document.querySelector('#table-item-value-demo');
        table.items = initItems(50);
        table.itemValue = (item) => item.id;

        table.renderItem = (item, index) => { 
            const cell1 = document.createElement('sp-table-cell');
            const cell2 = document.createElement('sp-table-cell');
            const cell3 = document.createElement('sp-table-cell');
            cell1.textContent = `Row Item Alpha ${item.name}`;
            cell2.textContent = `Row Item Alpha ${index}`;
            cell3.textContent = `Last Thing`;
            return [cell1, cell2, cell3];
        };

        table.addEventListener('change', (event) => {
            const selected = event.target.nextElementSibling;
            selected.textContent = `Selected: ${JSON.stringify(event.target.selected, null, ' ')}`;
        });
    };
    customElements.whenDefined('sp-table').then(() => {
        initTable();
    });
</script>

### Row Types

All values in the item array are assumed to be homogenous by default. This means all of the rendered rows are either delivered as provided, or, in the case you are leveraging `selects`, rendered with an `<sp-table-checkbox-cell>`. However, when virtualizing a table with selection, it can sometimes be useful to surface rows with additional interactions, e.g. "Load more data" links. To support that, you can optionally include the `_$rowType$` brand in your item. The values for this are outlined by the `RowType` enum and include `ITEM` (0) and `INFORMATION` (1). When `_$rowType$: RowType.INFORMATION` is provided, it instructs the `<sp-table>` not to deliver an `<sp-table-checkbox-cell>` in that row.

```html-live
<sp-table
    size="m"
    id="table-row-type-demo"
    style="height: 200px"
    scroller="true"
    selects="single"
>
    <sp-table-head>
        <sp-table-head-cell>Column Title</sp-table-head-cell>
        <sp-table-head-cell>Column Title</sp-table-head-cell>
        <sp-table-head-cell>Column Title</sp-table-head-cell>
    </sp-table-head>
</sp-table>
<script type="module">
    const initItems = (count) => {
        const total = count;
        const items = [];
        while (count) {
            count--;
            items.push({
                name: String(total - count),
                date: count,
            });
        }
        return items;
    };
    const initTable = () => {
        const table = document.querySelector('#table-row-type-demo');
        const items = initItems(50);
        items.splice(3, 0, {
            _$rowType$: 1,
        });
        table.items = items;

        table.renderItem = (item, index) => {
            if (item._$rowType$ === 1) {
                const infoCell = document.createElement('sp-table-cell');
                infoCell.textContent = 'Use this row type for non-selectable content.';
                return [infoCell];
            }
            const cell1 = document.createElement('sp-table-cell');
            const cell2 = document.createElement('sp-table-cell');
            const cell3 = document.createElement('sp-table-cell');
            cell1.textContent = `Row Item Alpha ${item.name}`;
            cell2.textContent = `Row Item Alpha ${index}`;
            cell3.textContent = `Last Thing`;
            return [cell1, cell2, cell3];
        };
    };
    customElements.whenDefined('sp-table').then(() => {
        initTable();
    });
</script>
```

<script type="module">
    const initItems = (count) => {
        const total = count;
        const items = [];
        while (count) {
            count--;
            items.push({
                name: String(total - count),
                date: count,
            });
        }
        return items;
    }

    const initTable = () => {
        const table = document.querySelector('#table-row-type-demo');
        const items = initItems(50);
        items.splice(3, 0, {
            _$rowType$: 1,
        });
        table.items = items;


        table.renderItem = (item, index) => { 
            if (item._$rowType$ === 1) {
                const infoCell = document.createElement('sp-table-cell');
                infoCell.textContent = 'Use this row type for non-selectable content.';
                return [infoCell];
            }
            const cell1 = document.createElement('sp-table-cell');
            const cell2 = document.createElement('sp-table-cell');
            const cell3 = document.createElement('sp-table-cell');
            cell1.textContent = `Row Item Alpha ${item.name}`;
            cell2.textContent = `Row Item Alpha ${index}`;
            cell3.textContent = `Last Thing`;
            return [cell1, cell2, cell3];
        };
    };
    customElements.whenDefined('sp-table').then(() => {
        initTable();
    });
</script>

### The `scroller` property

By default, the virtualized table doesn't contain a scroll bar and will display the entire length of the table body. Use the `scroller` property and specify an inline style for the height to get a `Table` of your desired height that scrolls.

## Sorting on the Virtualized Table

The virtualized table supports sorting its elements.

For each table column you want to sort, use the `sortable` attribute in its respective `<sp-table-head-cell>`. `sort-direction="asc"|"desc"` specifies the direction the sort goes, in either ascending or descending order, respectively. The `@sorted` event listener on `<sp-table>` can be utilised to specify a method to fire when the `<sp-table-head-cell>` dispatches the `sorted` event. To specify which aspect of an item you'd like to sort by, use the `sort-key` attribute.

```html-live
<sp-table
    size="m"
    id="sorted-virtualized-table"
    style="height: 200px"
    scroller="true"
>
    <sp-table-head>
        <sp-table-head-cell sortable sort-direction="desc" sort-key="name">
            Sortable Column
        </sp-table-head-cell>
        <sp-table-head-cell>Non-sortable Column</sp-table-head-cell>
        <sp-table-head-cell>Non-sortable Column</sp-table-head-cell>
    </sp-table-head>
</sp-table>
<script type="module">
    const initItems = (count) => {
        const total = count;
        const items = [];
        while (count) {
            count--;
            items.push({
                name: String(total - count),
                date: count,
            });
        }
        return items;
    }

    let items = initItems(50);

    const initTable = () => {
        const table = document.querySelector('#sorted-virtualized-table');

        table.items = items;

        table.renderItem = (item, index) => {
            const cell1 = document.createElement('sp-table-cell');
            const cell2 = document.createElement('sp-table-cell');
            const cell3 = document.createElement('sp-table-cell');
            cell1.textContent = `Row Item Alpha ${item.name}`;
            cell2.textContent = `Row Item Beta ${item.date}`;
            cell3.textContent = `Index: ${index}`;
            return [cell1, cell2, cell3];
        }
        table.addEventListener('sorted', (event) => {
            const { sortDirection, sortKey } = event.detail;
            items = items.sort((a, b) => {
                const first = String(a[sortKey]);
                const second = String(b[sortKey]);
                return sortDirection === 'asc'
                    ? first.localeCompare(second)
                    : second.localeCompare(first);
            });
            table.items = [...items];
        });
    };

    customElements.whenDefined('sp-table').then(() => {
        initTable();
    });
</script>
```

<script type="module">
    const initItems = (count) => {
        const total = count;
        const items = [];
        while (count) {
            count--;
            items.push({
                name: String(total - count),
                date: count,
            });
        }
        return items;
    }

    let items = initItems(50);

    const initTable = () => {
        const table = document.querySelector('#sorted-virtualized-table');

        table.items = items;

        table.renderItem = (item, index) => { 
            const cell1 = document.createElement('sp-table-cell');
            const cell2 = document.createElement('sp-table-cell');
            const cell3 = document.createElement('sp-table-cell');
            cell1.textContent = `Row Item Alpha ${item.name}`;
            cell2.textContent = `Row Item Beta ${item.date}`;
            cell3.textContent = `Index: ${index}`;
            return [cell1, cell2, cell3];
        }
        table.addEventListener('sorted', (event) => {
            const { sortDirection, sortKey } = event.detail;
            items = items.sort((a, b) => {
                const first = String(a[sortKey]);
                const second = String(b[sortKey]);
                return sortDirection === 'asc'
                    ? first.localeCompare(second)
                    : second.localeCompare(first);
            });
            table.items = [...items];
        });
    };

    customElements.whenDefined('sp-table').then(() => {
        initTable();
    });
</script>

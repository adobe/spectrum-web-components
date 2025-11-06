## Overview

An `<sp-table>` is used to create a container for displaying information. It allows users to quickly scan, sort, compare, and take action on large amounts of data. Tables are essential for organizing and presenting structured information in a clear, accessible format.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/table?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/table)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/table?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/table)
[![Try it on Stackblitz](https://img.shields.io/badge/Try%20it%20on-Stackblitz-blue?style=for-the-badge)](https://stackblitz.com/edit/vitejs-vite-2ilo6nmh)

```zsh
yarn add @spectrum-web-components/table
```

Import the side effectful registration of `<sp-table>`, `<sp-table-body>`, `<sp-table-cell>`, `<sp-table-checkbox-cell>`, `<sp-table-head>`, `<sp-table-head-cell>`, and `<sp-table-row>` via:

```js
import '@spectrum-web-components/table/elements.js';
```

Or individually via:

```js
import '@spectrum-web-components/table/sp-table.js';
import '@spectrum-web-components/table/sp-table-body.js';
import '@spectrum-web-components/table/sp-table-cell.js';
import '@spectrum-web-components/table/sp-table-checkbox-cell.js';
import '@spectrum-web-components/table/sp-table-head.js';
import '@spectrum-web-components/table/sp-table-head-cell.js';
import '@spectrum-web-components/table/sp-table-row.js';
```

When looking to leverage the `Table`, `TableBody`, `TableCell`, `TableCheckboxCell`, `TableHead`, `TableHeadCell`, or `TableRow` base classes as a type and/or for extension purposes, do so via:

```js
import {
    Table,
    TableBody,
    TableCell,
    TableCheckboxCell,
    TableHead,
    TableHeadCell,
    TableRow,
} from '@spectrum-web-components/table';
```

### Anatomy

A table consists of the following parts:

- a table head section (`<sp-table-head>`)
- header cells (`<sp-table-head-cell>`) within the table head section
- a table body section, ie.`<sp-table-body>`
- rows (`<sp-table-row>`) within the table body section
- body cells (`<sp-table-cell>`) within the table body rows

```html demo
<sp-table>
    <sp-table-head>
        <sp-table-head-cell>File name</sp-table-head-cell>
        <sp-table-head-cell>Type</sp-table-head-cell>
        <sp-table-head-cell>Size</sp-table-head-cell>
        <sp-table-head-cell>Status</sp-table-head-cell>
    </sp-table-head>
    <sp-table-body>
        <sp-table-row>
            <sp-table-cell>Budget</sp-table-cell>
            <sp-table-cell>PDF</sp-table-cell>
            <sp-table-cell>89 KB</sp-table-cell>
            <sp-table-cell>Reviewed</sp-table-cell>
        </sp-table-row>
        <sp-table-row>
            <sp-table-cell>Onboarding</sp-table-cell>
            <sp-table-cell>XLS</sp-table-cell>
            <sp-table-cell>120 KB</sp-table-cell>
            <sp-table-cell>Draft</sp-table-cell>
        </sp-table-row>
        <sp-table-row>
            <sp-table-cell>Proposal</sp-table-cell>
            <sp-table-cell>PDF</sp-table-cell>
            <sp-table-cell>139 KB</sp-table-cell>
            <sp-table-cell>Published</sp-table-cell>
        </sp-table-row>
    </sp-table-body>
</sp-table>
```

### Options

<sp-tabs selected="selection" auto label="Table options">
<sp-tab value="selection">Selection</sp-tab>
<sp-tab-panel value="selection">

The `selects` attribute enables row selection functionality. When `selects="single"`, users can select one row at a time. When `selects="multiple"`, users can select multiple rows and a checkbox column is automatically added to the table header for select all functionality.

```html demo
<sp-table selects="multiple" selected='["row1", "row2"]'>
    <sp-table-head>
        <sp-table-head-cell>File name</sp-table-head-cell>
        <sp-table-head-cell>Type</sp-table-head-cell>
        <sp-table-head-cell>Size</sp-table-head-cell>
    </sp-table-head>
    <sp-table-body>
        <sp-table-row value="row1">
            <sp-table-cell>Budget</sp-table-cell>
            <sp-table-cell>PDF</sp-table-cell>
            <sp-table-cell>89 KB</sp-table-cell>
        </sp-table-row>
        <sp-table-row value="row2">
            <sp-table-cell>Onboarding</sp-table-cell>
            <sp-table-cell>XLS</sp-table-cell>
            <sp-table-cell>120 KB</sp-table-cell>
        </sp-table-row>
    </sp-table-body>
</sp-table>
```

</sp-tab-panel>
<sp-tab value="emphasized">Emphasized</sp-tab>
<sp-tab-panel value="emphasized">

The `emphasized` attribute adds visual priority to the table content. This affects the appearance of selected rows and checkboxes, providing a more prominent visual treatment.

```html demo
<sp-table emphasized selects="multiple" selected='["row1"]'>
    <sp-table-head>
        <sp-table-head-cell>File name</sp-table-head-cell>
        <sp-table-head-cell>Type</sp-table-head-cell>
        <sp-table-head-cell>Size</sp-table-head-cell>
    </sp-table-head>
    <sp-table-body>
        <sp-table-row value="row1">
            <sp-table-cell>Budget</sp-table-cell>
            <sp-table-cell>PDF</sp-table-cell>
            <sp-table-cell>89 KB</sp-table-cell>
        </sp-table-row>
        <sp-table-row value="row2">
            <sp-table-cell>Onboarding</sp-table-cell>
            <sp-table-cell>XLS</sp-table-cell>
            <sp-table-cell>120 KB</sp-table-cell>
        </sp-table-row>
    </sp-table-body>
</sp-table>
```

</sp-tab-panel>
<sp-tab value="density">Density</sp-tab>
<sp-tab-panel value="density">

The `density` attribute controls the spacing around table cell content. Available values are `compact` for tighter spacing and `spacious` for more generous spacing.

<sp-tabs selected="compact" auto label="Density Options">
<sp-tab value="compact">Compact</sp-tab>
<sp-tab-panel value="compact">

```html demo
<sp-table density="compact">
    <sp-table-head>
        <sp-table-head-cell>File name</sp-table-head-cell>
        <sp-table-head-cell>Type</sp-table-head-cell>
        <sp-table-head-cell>Size</sp-table-head-cell>
    </sp-table-head>
    <sp-table-body>
        <sp-table-row>
            <sp-table-cell>Budget</sp-table-cell>
            <sp-table-cell>PDF</sp-table-cell>
            <sp-table-cell>89 KB</sp-table-cell>
        </sp-table-row>
        <sp-table-row>
            <sp-table-cell>Onboarding</sp-table-cell>
            <sp-table-cell>XLS</sp-table-cell>
            <sp-table-cell>120 KB</sp-table-cell>
        </sp-table-row>
    </sp-table-body>
</sp-table>
```

</sp-tab-panel>
<sp-tab value="spacious">Spacious</sp-tab>
<sp-tab-panel value="spacious">

```html demo
<sp-table density="spacious">
    <sp-table-head>
        <sp-table-head-cell>File name</sp-table-head-cell>
        <sp-table-head-cell>Type</sp-table-head-cell>
        <sp-table-head-cell>Size</sp-table-head-cell>
    </sp-table-head>
    <sp-table-body>
        <sp-table-row>
            <sp-table-cell>Budget</sp-table-cell>
            <sp-table-cell>PDF</sp-table-cell>
            <sp-table-cell>89 KB</sp-table-cell>
        </sp-table-row>
        <sp-table-row>
            <sp-table-cell>Onboarding</sp-table-cell>
            <sp-table-cell>XLS</sp-table-cell>
            <sp-table-cell>120 KB</sp-table-cell>
        </sp-table-row>
    </sp-table-body>
</sp-table>
```

</sp-tab-panel>
</sp-tabs>

</sp-tab-panel>
<sp-tab value="size">Size</sp-tab>
<sp-tab-panel value="size">

The `size` attribute controls the overall size of the table. Available values are `s` (small), `m` (medium, default), `l` (large), and `xl` (extra large).

<sp-tabs selected="s" auto label="Size Options">
<sp-tab value="s">Small</sp-tab>
<sp-tab-panel value="s">

```html demo
<sp-table size="s">
    <sp-table-head>
        <sp-table-head-cell>File name</sp-table-head-cell>
        <sp-table-head-cell>Type</sp-table-head-cell>
        <sp-table-head-cell>Size</sp-table-head-cell>
    </sp-table-head>
    <sp-table-body>
        <sp-table-row>
            <sp-table-cell>Budget</sp-table-cell>
            <sp-table-cell>PDF</sp-table-cell>
            <sp-table-cell>89 KB</sp-table-cell>
        </sp-table-row>
        <sp-table-row>
            <sp-table-cell>Onboarding</sp-table-cell>
            <sp-table-cell>XLS</sp-table-cell>
            <sp-table-cell>120 KB</sp-table-cell>
        </sp-table-row>
    </sp-table-body>
</sp-table>
```

</sp-tab-panel>
<sp-tab value="m">Medium (Default)</sp-tab>
<sp-tab-panel value="m">

```html demo
<sp-table>
    <sp-table-head>
        <sp-table-head-cell>File name</sp-table-head-cell>
        <sp-table-head-cell>Type</sp-table-head-cell>
        <sp-table-head-cell>Size</sp-table-head-cell>
    </sp-table-head>
    <sp-table-body>
        <sp-table-row>
            <sp-table-cell>Budget</sp-table-cell>
            <sp-table-cell>PDF</sp-table-cell>
            <sp-table-cell>89 KB</sp-table-cell>
        </sp-table-row>
        <sp-table-row>
            <sp-table-cell>Onboarding</sp-table-cell>
            <sp-table-cell>XLS</sp-table-cell>
            <sp-table-cell>120 KB</sp-table-cell>
        </sp-table-row>
    </sp-table-body>
</sp-table>
```

</sp-tab-panel>
<sp-tab value="l">Large</sp-tab>
<sp-tab-panel value="l">

```html demo
<sp-table size="l">
    <sp-table-head>
        <sp-table-head-cell>File name</sp-table-head-cell>
        <sp-table-head-cell>Type</sp-table-head-cell>
        <sp-table-head-cell>Size</sp-table-head-cell>
    </sp-table-head>
    <sp-table-body>
        <sp-table-row>
            <sp-table-cell>Budget</sp-table-cell>
            <sp-table-cell>PDF</sp-table-cell>
            <sp-table-cell>89 KB</sp-table-cell>
        </sp-table-row>
        <sp-table-row>
            <sp-table-cell>Onboarding</sp-table-cell>
            <sp-table-cell>XLS</sp-table-cell>
            <sp-table-cell>120 KB</sp-table-cell>
        </sp-table-row>
    </sp-table-body>
</sp-table>
```

</sp-tab-panel>
<sp-tab value="xl">Extra Large</sp-tab>
<sp-tab-panel value="xl">

```html demo
<sp-table size="xl">
    <sp-table-head>
        <sp-table-head-cell>File name</sp-table-head-cell>
        <sp-table-head-cell>Type</sp-table-head-cell>
        <sp-table-head-cell>Size</sp-table-head-cell>
    </sp-table-head>
    <sp-table-body>
        <sp-table-row>
            <sp-table-cell>Budget</sp-table-cell>
            <sp-table-cell>PDF</sp-table-cell>
            <sp-table-cell>89 KB</sp-table-cell>
        </sp-table-row>
        <sp-table-row>
            <sp-table-cell>Onboarding</sp-table-cell>
            <sp-table-cell>XLS</sp-table-cell>
            <sp-table-cell>120 KB</sp-table-cell>
        </sp-table-row>
    </sp-table-body>
</sp-table>
```

</sp-tab-panel>
</sp-tabs>

</sp-tab-panel>
<sp-tab value="quiet">Quiet</sp-tab>
<sp-tab-panel value="quiet">

The `quiet` attribute creates a more subtle table appearance with a transparent background and no side borders. This is ideal for supplementary or lightweight data display.

```html demo
<sp-table quiet>
    <sp-table-head>
        <sp-table-head-cell>File name</sp-table-head-cell>
        <sp-table-head-cell>Type</sp-table-head-cell>
        <sp-table-head-cell>Size</sp-table-head-cell>
    </sp-table-head>
    <sp-table-body>
        <sp-table-row>
            <sp-table-cell>Budget</sp-table-cell>
            <sp-table-cell>PDF</sp-table-cell>
            <sp-table-cell>89 KB</sp-table-cell>
        </sp-table-row>
        <sp-table-row>
            <sp-table-cell>Onboarding</sp-table-cell>
            <sp-table-cell>XLS</sp-table-cell>
            <sp-table-cell>120 KB</sp-table-cell>
        </sp-table-row>
    </sp-table-body>
</sp-table>
```

</sp-tab-panel>
</sp-tabs>

### Behaviors

For large amounts of data, the `<sp-table>` can be virtualised to easily add table rows by using properties.

```html-live
<sp-table
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

    const initTable = async () => {
        const table = document.querySelector('#table-virtualized-demo');

        await table.updateComplete;
        await table.closest('code-example')?.updateComplete;
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
    customElements.whenDefined('code-example').then(() => {
        customElements.whenDefined('sp-table').then(() => {
            initTable();
        });
    });
</script>

#### How to use it

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

#### Virtualized table selection

By default the `selected` property will surface an array of item indexes that are currently selected. However, when making a selection on a virtualized table, it can be useful to track selection as something other than indexes. To do so, set a custom method for the `itemValue` property. The `itemValue` method accepts an item and its index as arguments and should return the value you would like to track in the `selected` property.

```html-live
<sp-table
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

    const initTable = async () => {
        const table = document.querySelector('#table-item-value-demo');

        await table.updateComplete;
        await table.closest('code-example')?.updateComplete;
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
    customElements.whenDefined('code-example').then(() => {
        customElements.whenDefined('sp-table').then(() => {
            initTable();
        });
    });
</script>

#### Row Types

All values in the item array are assumed to be homogenous by default. This means all of the rendered rows are either delivered as provided, or, in the case you are leveraging `selects`, rendered with an `<sp-table-checkbox-cell>`. However, when virtualizing a table with selection, it can sometimes be useful to surface rows with additional interactions, e.g. "Load more data" links. To support that, you can optionally include the `_$rowType$` brand in your item. The values for this are outlined by the `RowType` enum and include `ITEM` (0) and `INFORMATION` (1). When `_$rowType$: RowType.INFORMATION` is provided, it instructs the `<sp-table>` not to deliver an `<sp-table-checkbox-cell>` in that row.

```html-live
<sp-table
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

    const initTable = async () => {
        const table = document.querySelector('#table-row-type-demo');

        await table.updateComplete;
        await table.closest('code-example')?.updateComplete;
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
    customElements.whenDefined('code-example').then(() => {
        customElements.whenDefined('sp-table').then(() => {
            initTable();
        });
    });
</script>

#### The `scroller` property

By default, the virtualized table doesn't contain a scroll bar and will display the entire length of the table body. Use the `scroller` property and specify an inline style for the height to get a `Table` of your desired height that scrolls.

## Sorting on the Virtualized Table

The virtualized table supports sorting its elements.

For each table column you want to sort, use the `sortable` attribute in its respective `<sp-table-head-cell>`. `sort-direction="asc"|"desc"` specifies the direction the sort goes, in either ascending or descending order, respectively. The `@sorted` event listener on `<sp-table>` can be utilised to specify a method to fire when the `<sp-table-head-cell>` dispatches the `sorted` event. To specify which aspect of an item you'd like to sort by, use the `sort-key` attribute.

```html-live
<sp-table
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

    const initTable = async () => {
        const table = document.querySelector('#sorted-virtualized-table');

        await table.updateComplete;
        await table.closest('code-example')?.updateComplete;

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

    customElements.whenDefined('code-example').then(() => {
        customElements.whenDefined('sp-table').then(() => {
            initTable();
        });
    });
</script>

### Accessibility

The `<sp-table>` component provides accessibility support for tabular data:

#### ARIA attributes

The table automatically manages ARIA attributes for proper semantic structure:

- `role="grid"` on the table element
- `role="row"` on each table row
- `role="columnheader"` on header cells
- `role="gridcell"` on data cells
- `role="rowgroup"` on table body
- `aria-sort` on sortable column headers
- `aria-selected` on selectable rows
- `aria-hidden` on single selection checkboxes
- `aria-rowindex` on virtualized table rows
- `aria-rowcount` on virtualized tables

#### Selection accessibility

When using row selection:

- `aria-selected` is applied to selectable rows
- Selection state is announced to screen readers
- Checkboxes in selection cells are properly labeled

#### Keyboard navigation

Sortable column headers support keyboard interaction:

- **Space** - Activates the header and sorts on keyup
- **Enter** - Immediately sorts the column
- **Numpad Enter** - Immediately sorts the column
- **Tab** - Navigates to sortable headers (only sortable headers are focusable)

Selectable rows support keyboard interaction:

- **Click** - Toggles row selection
- **Tab** - Navigates through focusable elements

- **Tab** - Table body automatically receives `tabindex="0"` when content is scrollable
- **Mouse wheel** - Scrolls through table content when focused

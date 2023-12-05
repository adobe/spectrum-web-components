import './sp-table-cell-011910bb.js';
import { x } from './lit-html-126adc72.js';
import { S as SpectrumElement, n } from './define-element-617dba69.js';
import './lit-element-9354aa77.js';
import './mutation-controller-81a30f7f.js';
import './sizedMixin-9a9da45c.js';
import './base-511c8c11.js';
import './sp-checkbox-2808ae5b.js';
import './CheckboxMixin-20c2ed92.js';
import './query-d0113d5a.js';
import './if-defined-ae83b405.js';
import './sp-icon-checkmark300-36d623be.js';
import './Checkmark300-0ba007ba.js';
import './custom-tag-c228386e.js';
import './IconBase-d9572ad8.js';
import './spectrum-icon-checkmark.css-a8f99d4c.js';
import './sp-icon-dash300-0b171774.js';
import './Dash300-2d8f97df.js';
import './spectrum-icon-dash.css-7fdeaf11.js';
import './virtualize-5c844e71.js';
import './directive-2bb7789e.js';
import './async-directive-e6357bae.js';
import './directive-helpers-aa9210f2.js';
import './repeat-c64faecc.js';
import './sp-icon-arrow100-5c2d7038.js';
import './Arrow100-138748f9.js';

function makeItems(count) {
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
const renderItem = (item, index) => {
  if (item._$rowType$ === 1) {
    return x`
            <sp-table-cell>This row has no checkbox!</sp-table-cell>
        `;
  }
  return x`
        <sp-table-cell>Row Item ${item.name}</sp-table-cell>
        <sp-table-cell>Row Item ${item.date}</sp-table-cell>
        <sp-table-cell>Row Item ${index}</sp-table-cell>
    `;
};

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};
var tableVirtualized_stories = {
  title: "Table/Virtualized",
  component: "sp-table",
  argTypes: {
    onChange: { action: "change" },
    selected: {
      name: "selected",
      description: "The array of item values selected by the Table.",
      type: { name: "", required: false },
      control: "text"
    },
    selects: {
      name: "selects",
      description: 'If the Table accepts a "single" or "multiple" selection.',
      control: {
        type: "inline-radio",
        options: ["", "single", "multiple"]
      }
    }
  },
  args: {
    selects: "",
    selected: []
  }
};
class VirtualTable extends SpectrumElement {
  constructor() {
    super();
    this.items = makeItems(50);
    this.compareItems = (sortKey, sortDirection) => (a, b) => {
      const doSortKey = sortKey;
      if (!isNaN(Number(a[doSortKey]))) {
        const first = Number(a[doSortKey]);
        const second = Number(b[doSortKey]);
        return sortDirection === "asc" ? first - second : second - first;
      } else {
        const first = String(a[doSortKey]);
        const second = String(b[doSortKey]);
        return sortDirection === "asc" ? first.localeCompare(second) : second.localeCompare(first);
      }
    };
    this.items.sort(this.compareItems("name", "desc"));
  }
  render() {
    return x`
            <sp-table
                aria-rowcount="50"
                .items=${this.items}
                .renderItem=${renderItem}
                size="m"
                scroller="true"
                style="height: 200px"
                @sorted=${(event) => {
      const { sortKey, sortDirection } = event.detail;
      const items = [...this.items];
      items.sort(
        this.compareItems(
          sortKey,
          sortDirection
        )
      );
      this.items = items;
    }}
            >
                <sp-table-head>
                    <sp-table-head-cell
                        sortable
                        sort-key="name"
                        sort-direction="desc"
                    >
                        Column Title
                    </sp-table-head-cell>
                    <sp-table-head-cell sortable sort-key="date">
                        Column Title
                    </sp-table-head-cell>
                    <sp-table-head-cell>Column Title</sp-table-head-cell>
                </sp-table-head>
            </sp-table>
        `;
  }
}
__decorateClass([
  n({ type: Array })
], VirtualTable.prototype, "items", 2);
customElements.define("virtual-table", VirtualTable);
const virtualItems = makeItems(50);
const virtualized = () => {
  return x`
        <virtual-table></virtual-table>
    `;
};
const virtualizedSingle = (args) => {
  const onChange = args.onChange || (() => {
    return;
  });
  return x`
        <sp-table
            size="m"
            scroller="true"
            style="height: 300px"
            selects=${args.selects}
            .selected=${args.selected}
            @change=${({ target }) => {
    const next = target.nextElementSibling;
    next.textContent = `Selected: ${JSON.stringify(
      target.selected
    )}`;
  }}
            .items=${virtualItems}
            .renderItem=${renderItem}
            @visibilityChanged=${(event) => onChange({
    first: event.first,
    last: event.last,
    type: "visibility"
  })}
            @rangeChanged=${(event) => onChange({
    first: event.first,
    last: event.last,
    type: "range"
  })}
        >
            <sp-table-head>
                <sp-table-head-cell>Column Title</sp-table-head-cell>
                <sp-table-head-cell>Column Title</sp-table-head-cell>
                <sp-table-head-cell>Column Title</sp-table-head-cell>
            </sp-table-head>
        </sp-table>
        <div>Selected: ["49"]</div>
    `;
};
virtualizedSingle.args = {
  selects: "single",
  selected: ["49"]
};
const virtualizedMultiple = (args) => {
  return x`
        <sp-table
            size="m"
            scroller="true"
            style="height: 200px"
            selects=${args.selects}
            .selected=${args.selected}
            @change=${({ target }) => {
    const next = target.nextElementSibling;
    next.textContent = `Selected: ${JSON.stringify(
      target.selected,
      null,
      " "
    )}`;
    const nextNext = next.nextElementSibling;
    nextNext.textContent = `Selected Count: ${target.selected.length}`;
  }}
            .items=${virtualItems}
            .renderItem=${renderItem}
        >
            <sp-table-head>
                <sp-table-head-cell>Column Title</sp-table-head-cell>
                <sp-table-head-cell>Column Title</sp-table-head-cell>
                <sp-table-head-cell>Column Title</sp-table-head-cell>
            </sp-table-head>
        </sp-table>
        <div>Selected: ["0", "48"]</div>
        <div>Selected Count: 2</div>
    `;
};
virtualizedMultiple.args = {
  selects: "multiple",
  selected: ["0", "48"]
};
const virtualizedCustomValue = (args) => {
  return x`
        <sp-table
            size="m"
            scroller="true"
            style="height: 200px"
            selects=${args.selects}
            .selected=${args.selected}
            @change=${args.onChange}
            .items=${virtualItems}
            .itemValue=${(item) => "applied-" + item.date}
            .renderItem=${renderItem}
        >
            <sp-table-head>
                <sp-table-head-cell>Column Title</sp-table-head-cell>
                <sp-table-head-cell>Column Title</sp-table-head-cell>
                <sp-table-head-cell>Column Title</sp-table-head-cell>
            </sp-table-head>
            <sp-table-body></sp-table-body>
        </sp-table>
        <div>Selected: ["0", "48", "applied-47"]</div>
        <div>Selected Count: 2</div>
    `;
};
virtualizedCustomValue.args = {
  selected: ["0", "48", "applied-47"],
  selects: "multiple",
  onChange: ({ target }) => {
    const next = target.nextElementSibling;
    next.textContent = `Selected: ${JSON.stringify(
      target.selected,
      null,
      " "
    )}`;
    const nextNext = next.nextElementSibling;
    nextNext.textContent = `Selected Count: ${target.selected.length}`;
  }
};
const virtualizedCustomRow = (args) => {
  virtualItems.splice(3, 1, { name: "Scoobert", date: 2, _$rowType$: 1 });
  return x`
        <sp-table
            size="m"
            scroller="true"
            style="height: 200px"
            selects=${args.selects}
            .selected=${args.selected}
            @change=${({ target }) => {
    const next = target.nextElementSibling;
    next.textContent = `Selected: ${JSON.stringify(
      target.selected,
      null,
      " "
    )}`;
    const nextNext = next.nextElementSibling;
    nextNext.textContent = `Selected Count: ${target.selected.length}`;
  }}
            scroller?="false"
            .items=${virtualItems}
            .renderItem=${renderItem}
        >
            <sp-table-head>
                <sp-table-head-cell>Column Title</sp-table-head-cell>
                <sp-table-head-cell>Column Title</sp-table-head-cell>
                <sp-table-head-cell>Column Title</sp-table-head-cell>
            </sp-table-head>
        </sp-table>
        <div>Selected: ["0", "48"]</div>
        <div>Selected Count: 2</div>
    `;
};
virtualizedCustomRow.args = {
  selects: "multiple",
  selected: ["0", "48"]
};
const virtualizedNoScroller = () => {
  return x`
        <sp-table size="m" .items=${virtualItems} .renderItem=${renderItem}>
            <sp-table-head>
                <sp-table-head-cell>Column Title</sp-table-head-cell>
                <sp-table-head-cell>Column Title</sp-table-head-cell>
                <sp-table-head-cell>Column Title</sp-table-head-cell>
            </sp-table-head>
        </sp-table>
    `;
};
const __namedExportsOrder = ['virtualized', 'virtualizedSingle', 'virtualizedMultiple', 'virtualizedCustomValue', 'virtualizedCustomRow', 'virtualizedNoScroller'];

export { __namedExportsOrder, tableVirtualized_stories as default, virtualized, virtualizedCustomRow, virtualizedCustomValue, virtualizedMultiple, virtualizedNoScroller, virtualizedSingle };

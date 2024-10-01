import './sp-table-cell-DNWMy-6x.js';
import { x } from './lit-html-COgVUehj.js';
import { S as SpectrumElement, n } from './define-element-C_3bgzm7.js';
import './lit-element-BulMEkr1.js';
import './mutation-controller-D2lT1xZk.js';
import './query-assigned-elements-C9WOp2R6.js';
import './base-u8Z1Hrsd.js';
import './sp-checkbox-CbcDFwgB.js';
import './CheckboxMixin-CMl_b79j.js';
import './query-DQF6X5qW.js';
import './if-defined-DDJGFaN4.js';
import './sp-icon-checkmark300-BDWnUGU2.js';
import './Checkmark300-Cv25Kwxj.js';
import './custom-tag-B5IH9PTE.js';
import './IconBase-BIYWpr2G.js';
import './spectrum-icon-checkmark.css-NuoPlGW7.js';
import './sp-icon-dash300--ZN9FvZF.js';
import './Dash300-DagFK8mn.js';
import './spectrum-icon-dash.css-lElR_d7u.js';
import './sizedMixin-BzkTbMb8.js';
import './virtualize-DIfnaams.js';
import './directive-Bn5c4u4M.js';
import './async-directive-DF6rMZJ5.js';
import './directive-helpers-icdnqxxc.js';
import './repeat-D5JakrYV.js';
import './sp-icon-arrow100-DTex4xgn.js';
import './Arrow100-IWPn85qa.js';

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
var __decorateClass = (decorators, target, key, kind) => {
  var result = void 0 ;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (decorator(target, key, result) ) || result;
  if (result) __defProp(target, key, result);
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
], VirtualTable.prototype, "items");
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

import './sp-table-cell-CzV1_yIN.js';
import { x } from './lit-html-GmIhAbMP.js';
import { S as SpectrumElement, n } from './define-element-lju0qz2P.js';
import './lit-element-xBOPiTek.js';
import './mutation-controller-KeE5MDSl.js';
import './query-assigned-elements-1m6Cs7Ix.js';
import './base-STdhtiz1.js';
import './sp-checkbox-QQsNQivc.js';
import './CheckboxMixin-uct9gx7P.js';
import './query-JMOstM_r.js';
import './if-defined-pV6JZKXB.js';
import './sp-icon-checkmark300-ZpVxkyCy.js';
import './Checkmark300-WAcytU8S.js';
import './custom-tag-z2Xx81l9.js';
import './IconBase-YN3-eQCN.js';
import './spectrum-icon-checkmark.css-EqJn5hpL.js';
import './sp-icon-dash300-3Yj92jkG.js';
import './Dash300-GtH_7nnW.js';
import './spectrum-icon-dash.css-itJ-5huq.js';
import './sizedMixin-VwrJiqSW.js';
import './virtualize-hc5cLkbN.js';
import './directive-C1gRZbRe.js';
import './async-directive-cHMFxS7f.js';
import './directive-helpers-WPlpPO1F.js';
import './repeat-ry-ySa1b.js';
import './sp-icon-arrow100-8eLxKJJ8.js';
import './Arrow100-k1u4Bx1Z.js';

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

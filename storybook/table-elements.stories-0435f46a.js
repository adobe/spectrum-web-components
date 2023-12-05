import './sp-table-cell-011910bb.js';
import { x } from './lit-html-126adc72.js';
import './lit-element-9354aa77.js';
import './mutation-controller-81a30f7f.js';
import './define-element-617dba69.js';
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

var tableElements_stories = {
  title: "Table",
  component: "sp-table",
  args: {
    selected: [],
    selects: ""
  },
  argTypes: {
    selected: {
      name: "selected",
      description: "The value of the selected `<sp-table-row>`(s).",
      control: {
        type: "text"
      }
    },
    selects: {
      name: "selects",
      description: "Whether the elements selects its children and how many it can select at a time.",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "" }
      },
      control: {
        type: "inline-radio",
        options: ["", "single", "multiple"]
      }
    }
  }
};
const elements = () => {
  return x`
        <sp-table>
            <sp-table-head>
                <sp-table-head-cell>Column Title</sp-table-head-cell>
                <sp-table-head-cell>Column Title</sp-table-head-cell>
                <sp-table-head-cell>Column Title</sp-table-head-cell>
            </sp-table-head>
            <sp-table-body style="height: 200px">
                <sp-table-row value="row1" class="row1">
                    <sp-table-cell>Row Item Alpha</sp-table-cell>
                    <sp-table-cell>Row Item Alpha</sp-table-cell>
                    <sp-table-cell>Row Item Alpha</sp-table-cell>
                </sp-table-row>
                <sp-table-row value="row2" class="row2">
                    <sp-table-cell>Row Item Bravo</sp-table-cell>
                    <sp-table-cell>Row Item Bravo</sp-table-cell>
                    <sp-table-cell>Row Item Bravo</sp-table-cell>
                </sp-table-row>
                <sp-table-row value="row3" class="row3">
                    <sp-table-cell>Row Item Charlie</sp-table-cell>
                    <sp-table-cell>Row Item Charlie</sp-table-cell>
                    <sp-table-cell>Row Item Charlie</sp-table-cell>
                </sp-table-row>
                <sp-table-row value="row4" class="row4">
                    <sp-table-cell>Row Item Delta</sp-table-cell>
                    <sp-table-cell>Row Item Delta</sp-table-cell>
                    <sp-table-cell>Row Item Delta</sp-table-cell>
                </sp-table-row>
                <sp-table-row value="row5" class="row5">
                    <sp-table-cell>Row Item Echo</sp-table-cell>
                    <sp-table-cell>Row Item Echo</sp-table-cell>
                    <sp-table-cell>Row Item Echo</sp-table-cell>
                </sp-table-row>
            </sp-table-body>
        </sp-table>
    `;
};
const small = () => {
  return x`
        <sp-table size="s">
            <sp-table-head>
                <sp-table-head-cell>Column Title</sp-table-head-cell>
                <sp-table-head-cell>Column Title</sp-table-head-cell>
                <sp-table-head-cell>Column Title</sp-table-head-cell>
            </sp-table-head>
            <sp-table-body style="height: 120px">
                <sp-table-row value="row1" class="row1">
                    <sp-table-cell>Row Item Alpha</sp-table-cell>
                    <sp-table-cell>Row Item Alpha</sp-table-cell>
                    <sp-table-cell>Row Item Alpha</sp-table-cell>
                </sp-table-row>
                <sp-table-row value="row2" class="row2">
                    <sp-table-cell>Row Item Bravo</sp-table-cell>
                    <sp-table-cell>Row Item Bravo</sp-table-cell>
                    <sp-table-cell>Row Item Bravo</sp-table-cell>
                </sp-table-row>
                <sp-table-row value="row3" class="row3">
                    <sp-table-cell>Row Item Charlie</sp-table-cell>
                    <sp-table-cell>Row Item Charlie</sp-table-cell>
                    <sp-table-cell>Row Item Charlie</sp-table-cell>
                </sp-table-row>
                <sp-table-row value="row4" class="row4">
                    <sp-table-cell>Row Item Delta</sp-table-cell>
                    <sp-table-cell>Row Item Delta</sp-table-cell>
                    <sp-table-cell>Row Item Delta</sp-table-cell>
                </sp-table-row>
                <sp-table-row value="row5" class="row5">
                    <sp-table-cell>Row Item Echo</sp-table-cell>
                    <sp-table-cell>Row Item Echo</sp-table-cell>
                    <sp-table-cell>Row Item Echo</sp-table-cell>
                </sp-table-row>
            </sp-table-body>
        </sp-table>
    `;
};
const selectsSingle = () => {
  return x`
        <sp-table
            selects="single"
            .selected=${["row1"]}
            @change=${({ target }) => {
    const next = target.nextElementSibling;
    next.textContent = `Selected: ${JSON.stringify(
      target.selected
    )}`;
  }}
        >
            <sp-table-head>
                <sp-table-head-cell>Column Title</sp-table-head-cell>
                <sp-table-head-cell>Column Title</sp-table-head-cell>
                <sp-table-head-cell>Column Title</sp-table-head-cell>
            </sp-table-head>
            <sp-table-body style="height: 120px">
                <sp-table-row value="row1" class="row1">
                    <sp-table-cell>Row Item Alpha</sp-table-cell>
                    <sp-table-cell>Row Item Alpha</sp-table-cell>
                    <sp-table-cell>Row Item Alpha</sp-table-cell>
                </sp-table-row>
                <sp-table-row value="row2" class="row2">
                    <sp-table-cell>Row Item Bravo</sp-table-cell>
                    <sp-table-cell>Row Item Bravo</sp-table-cell>
                    <sp-table-cell>Row Item Bravo</sp-table-cell>
                </sp-table-row>
                <sp-table-row value="row3" class="row3">
                    <sp-table-cell>Row Item Charlie</sp-table-cell>
                    <sp-table-cell>Row Item Charlie</sp-table-cell>
                    <sp-table-cell>Row Item Charlie</sp-table-cell>
                </sp-table-row>
                <sp-table-row value="row4" class="row4">
                    <sp-table-cell>Row Item Delta</sp-table-cell>
                    <sp-table-cell>Row Item Delta</sp-table-cell>
                    <sp-table-cell>Row Item Delta</sp-table-cell>
                </sp-table-row>
                <sp-table-row value="row5" class="row5">
                    <sp-table-cell>Row Item Echo</sp-table-cell>
                    <sp-table-cell>Row Item Echo</sp-table-cell>
                    <sp-table-cell>Row Item Echo</sp-table-cell>
                </sp-table-row>
            </sp-table-body>
        </sp-table>
        <div>Selected: ["row1"]</div>
    `;
};
const noSelectsSpecified = () => {
  return x`
        <sp-table .selected=${["row1", "row2"]}>
            <sp-table-head>
                <sp-table-head-cell>Column Title</sp-table-head-cell>
                <sp-table-head-cell>Column Title</sp-table-head-cell>
                <sp-table-head-cell>Column Title</sp-table-head-cell>
            </sp-table-head>
            <sp-table-body style="height: 120px">
                <sp-table-row value="row1" class="row1">
                    <sp-table-cell>Row Item Alpha</sp-table-cell>
                    <sp-table-cell>Row Item Alpha</sp-table-cell>
                    <sp-table-cell>Row Item Alpha</sp-table-cell>
                </sp-table-row>
                <sp-table-row value="row2" class="row2">
                    <sp-table-cell>Row Item Bravo</sp-table-cell>
                    <sp-table-cell>Row Item Bravo</sp-table-cell>
                    <sp-table-cell>Row Item Bravo</sp-table-cell>
                </sp-table-row>
                <sp-table-row value="row3" class="row3">
                    <sp-table-cell>Row Item Charlie</sp-table-cell>
                    <sp-table-cell>Row Item Charlie</sp-table-cell>
                    <sp-table-cell>Row Item Charlie</sp-table-cell>
                </sp-table-row>
                <sp-table-row value="row4" class="row4">
                    <sp-table-cell>Row Item Delta</sp-table-cell>
                    <sp-table-cell>Row Item Delta</sp-table-cell>
                    <sp-table-cell>Row Item Delta</sp-table-cell>
                </sp-table-row>
                <sp-table-row value="row5" class="row5">
                    <sp-table-cell>Row Item Echo</sp-table-cell>
                    <sp-table-cell>Row Item Echo</sp-table-cell>
                    <sp-table-cell>Row Item Echo</sp-table-cell>
                </sp-table-row>
            </sp-table-body>
        </sp-table>
    `;
};
const selectsMultiple = () => {
  return x`
        <sp-table
            selects="multiple"
            .selected=${["row1", "row2"]}
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
        >
            <sp-table-head>
                <sp-table-head-cell>Column Title</sp-table-head-cell>
                <sp-table-head-cell>Column Title</sp-table-head-cell>
                <sp-table-head-cell>Column Title</sp-table-head-cell>
            </sp-table-head>
            <sp-table-body style="height: 120px">
                <sp-table-row value="row1" class="row1">
                    <sp-table-cell>Row Item Alpha</sp-table-cell>
                    <sp-table-cell>Row Item Alpha</sp-table-cell>
                    <sp-table-cell>Row Item Alpha</sp-table-cell>
                </sp-table-row>
                <sp-table-row value="row2" class="row2">
                    <sp-table-cell>Row Item Bravo</sp-table-cell>
                    <sp-table-cell>Row Item Bravo</sp-table-cell>
                    <sp-table-cell>Row Item Bravo</sp-table-cell>
                </sp-table-row>
                <sp-table-row value="row3" class="row3">
                    <sp-table-cell>Row Item Charlie</sp-table-cell>
                    <sp-table-cell>Row Item Charlie</sp-table-cell>
                    <sp-table-cell>Row Item Charlie</sp-table-cell>
                </sp-table-row>
                <sp-table-row value="row4" class="row4">
                    <sp-table-cell>Row Item Delta</sp-table-cell>
                    <sp-table-cell>Row Item Delta</sp-table-cell>
                    <sp-table-cell>Row Item Delta</sp-table-cell>
                </sp-table-row>
                <sp-table-row value="row5" class="row5">
                    <sp-table-cell>Row Item Echo</sp-table-cell>
                    <sp-table-cell>Row Item Echo</sp-table-cell>
                    <sp-table-cell>Row Item Echo</sp-table-cell>
                </sp-table-row>
            </sp-table-body>
        </sp-table>
        <div>Selected: ["row1", "row2"]</div>
        <div>Selected Count: 2</div>
    `;
};
const emphasized = () => {
  return x`
        <sp-table emphasized selects="multiple" .selected=${["row1", "row2"]}>
            <sp-table-head>
                <sp-table-head-cell>Column Title</sp-table-head-cell>
                <sp-table-head-cell>Column Title</sp-table-head-cell>
                <sp-table-head-cell>Column Title</sp-table-head-cell>
            </sp-table-head>
            <sp-table-body style="height: 120px">
                <sp-table-row value="row1" class="row1">
                    <sp-table-cell>Row Item Alpha</sp-table-cell>
                    <sp-table-cell>Row Item Alpha</sp-table-cell>
                    <sp-table-cell>Row Item Alpha</sp-table-cell>
                </sp-table-row>
                <sp-table-row value="row2" class="row2">
                    <sp-table-cell>Row Item Bravo</sp-table-cell>
                    <sp-table-cell>Row Item Bravo</sp-table-cell>
                    <sp-table-cell>Row Item Bravo</sp-table-cell>
                </sp-table-row>
                <sp-table-row value="row3" class="row3">
                    <sp-table-cell>Row Item Charlie</sp-table-cell>
                    <sp-table-cell>Row Item Charlie</sp-table-cell>
                    <sp-table-cell>Row Item Charlie</sp-table-cell>
                </sp-table-row>
                <sp-table-row value="row4" class="row4">
                    <sp-table-cell>Row Item Delta</sp-table-cell>
                    <sp-table-cell>Row Item Delta</sp-table-cell>
                    <sp-table-cell>Row Item Delta</sp-table-cell>
                </sp-table-row>
                <sp-table-row value="row5" class="row5">
                    <sp-table-cell>Row Item Echo</sp-table-cell>
                    <sp-table-cell>Row Item Echo</sp-table-cell>
                    <sp-table-cell>Row Item Echo</sp-table-cell>
                </sp-table-row>
            </sp-table-body>
        </sp-table>
    `;
};
const __namedExportsOrder = ['elements', 'small', 'selectsSingle', 'noSelectsSpecified', 'selectsMultiple', 'emphasized'];

export { __namedExportsOrder, tableElements_stories as default, elements, emphasized, noSelectsSpecified, selectsMultiple, selectsSingle, small };

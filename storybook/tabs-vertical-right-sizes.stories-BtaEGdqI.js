import './sp-icon-CJsQzHkb.js';
import './sp-icon-checkmark-CRFWtJmu.js';
import './sp-icon-chevron-down-CRMZ0Pz7.js';
import './sp-icon-help-4MTyBYi5.js';
import './sp-tab-panel-CnutJaNy.js';
import { x } from './lit-html-COgVUehj.js';
import './IconBase-qDHHH3Ln.js';
import './lit-element-BL-po2DW.js';
import './define-element-ByMWMcVd.js';
import './if-defined-DDJGFaN4.js';
import './query-DQF6X5qW.js';
import './base-u8Z1Hrsd.js';
import './Checkmark-FReycAe-.js';
import './custom-tag-Diwq7nXX.js';
import './ChevronDown-BSeiir5u.js';
import './Help-BVQBuYxu.js';
import './tab.css-DddYLmOz.js';
import './resize-controller-BJKfu6ft.js';
import './RovingTabindex-Dx9AbyW7.js';
import './FocusGroup-B9OwLCq7.js';
import './sizedMixin-C1lD98vT.js';
import './focusable-CCdy673g.js';
import './focus-visible-xZLLtEay.js';
import './class-map-DdRvesrq.js';
import './directive-Bn5c4u4M.js';
import './observe-slot-presence-CnXaHqXA.js';
import './mutation-controller-D2lT1xZk.js';
import './observe-slot-text-DSYHkFFl.js';
import './query-assigned-nodes-DAYI4epk.js';
import './random-id-BST1Puzz.js';

var tabsVerticalRightSizes_stories = {
  component: "sp-tabs",
  title: "Tabs/Sizes/Vertical Right",
  argTypes: {
    direction: {
      name: "direction",
      type: { name: "string", required: false },
      description: "The direction of the Tabs element",
      table: {
        type: {
          summary: '"vertical" | "vertical-right" | "horizontal"'
        },
        defaultValue: { summary: "horizontal" }
      },
      control: {
        type: "text"
      }
    },
    auto: { control: "boolean" },
    size: {
      name: "size",
      type: { name: "string", required: false },
      description: "The size at which to display the Tabs element",
      table: {
        type: { summary: '"s" | "m" | "l" | "xl"' },
        defaultValue: { summary: "m" }
      },
      control: {
        type: "text"
      }
    }
  },
  args: {
    direction: "vertical-right",
    auto: false,
    size: "m"
  }
};
const panels = () => x`
    <sp-tab-panel value="1">Content for "Really Long Name"</sp-tab-panel>
    <sp-tab-panel value="2">Content for tab 2</sp-tab-panel>
    <sp-tab-panel value="3">Content for tab 3</sp-tab-panel>
    <sp-tab-panel value="4">Content for tab 4</sp-tab-panel>
`;
const template = (args) => {
  return x`
        <sp-tabs
            selected="1"
            size=${args.size}
            ?auto=${args.auto}
            label="Demo Tabs"
            direction=${args.direction}
        >
            <sp-tab label="Tab 1" value="1"></sp-tab>
            <sp-tab label="Tab 2" value="2"></sp-tab>
            <sp-tab label="Tab 3" value="3"></sp-tab>
            <sp-tab label="Tab 4" value="4"></sp-tab>
            ${panels()}
        </sp-tabs>
    `;
};
const s = (args) => template(args);
s.args = {
  size: "s"
};
const m = (args) => template(args);
m.args = {
  size: "m"
};
const l = (args) => template(args);
l.args = {
  size: "l"
};
const XL = (args) => template(args);
XL.args = {
  size: "XL"
};
const __namedExportsOrder = ['s', 'm', 'l', 'XL'];

export { XL, __namedExportsOrder, tabsVerticalRightSizes_stories as default, l, m, s };

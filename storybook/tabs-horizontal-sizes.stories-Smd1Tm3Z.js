import './sp-icon-WjgaNaH_.js';
import './sp-icon-checkmark-xo6mkwQn.js';
import './sp-icon-chevron-down-dzINMRHj.js';
import './sp-icon-help-x1xR9mTN.js';
import './sp-tab-panel-JHDGEm52.js';
import { x } from './lit-html-GmIhAbMP.js';
import './IconBase-YN3-eQCN.js';
import './lit-element-xBOPiTek.js';
import './define-element-lju0qz2P.js';
import './if-defined-pV6JZKXB.js';
import './query-JMOstM_r.js';
import './base-STdhtiz1.js';
import './Checkmark-ae3T4lCi.js';
import './custom-tag-JXLWq-Sj.js';
import './ChevronDown-7lyUAIHR.js';
import './Help-MUMRCGeh.js';
import './tab.css-RK-bbgRK.js';
import './resize-controller--ByFn5Jx.js';
import './RovingTabindex-LnbiEVTh.js';
import './FocusGroup-TIL3fP6n.js';
import './sizedMixin-VwrJiqSW.js';
import './query-assigned-elements-1m6Cs7Ix.js';
import './focusable-wnRI1QCz.js';
import './focus-visible-68QWcOy-.js';
import './class-map-Q7DIFm9x.js';
import './directive-C1gRZbRe.js';
import './observe-slot-text-HaH5WFZ0.js';
import './mutation-controller-KeE5MDSl.js';
import './query-assigned-nodes-jGvx5qKR.js';
import './observe-slot-presence-tyJ_SCNf.js';

var tabsHorizontalSizes_stories = {
  component: "sp-tabs",
  title: "Tabs/Sizes/Horizontal",
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
    verticalTab: { control: "boolean" },
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
    direction: "horizontal",
    type: false,
    verticalTab: false,
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

export { XL, __namedExportsOrder, tabsHorizontalSizes_stories as default, l, m, s };

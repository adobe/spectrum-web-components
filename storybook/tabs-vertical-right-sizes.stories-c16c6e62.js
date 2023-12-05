import './sp-icon-8061244b.js';
import './sp-icon-checkmark-7b575366.js';
import './sp-icon-chevron-down-b5e7ebfe.js';
import './sp-icon-help-038cfed3.js';
import './sp-tab-panel-7c3cc30c.js';
import { x } from './lit-html-126adc72.js';
import './IconBase-d9572ad8.js';
import './lit-element-9354aa77.js';
import './define-element-617dba69.js';
import './if-defined-ae83b405.js';
import './query-d0113d5a.js';
import './base-511c8c11.js';
import './Checkmark-87ba3c87.js';
import './custom-tag-b5526d41.js';
import './ChevronDown-8a6d0720.js';
import './Help-10c43472.js';
import './tab.css-812caa61.js';
import './resize-controller-55608b66.js';
import './RovingTabindex-ca5f8b64.js';
import './FocusGroup-0f0b800e.js';
import './sizedMixin-9a9da45c.js';
import './focusable-f5539e66.js';
import './focus-visible-03398d98.js';
import './class-map-14530ec2.js';
import './directive-2bb7789e.js';
import './observe-slot-text-94a58958.js';
import './mutation-controller-81a30f7f.js';
import './query-assigned-nodes-db063b1b.js';
import './observe-slot-presence-ae37a9bc.js';

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

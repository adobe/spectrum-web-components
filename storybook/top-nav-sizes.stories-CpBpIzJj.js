import './sp-icon-CJsQzHkb.js';
import './sp-icon-checkmark-CRFWtJmu.js';
import './sp-icon-chevron-down-CRMZ0Pz7.js';
import './sp-icon-help-4MTyBYi5.js';
import './sp-top-nav-item-BXWumQPD.js';
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
import './resize-controller-BJKfu6ft.js';
import './tab.css-DddYLmOz.js';
import './RovingTabindex-Dx9AbyW7.js';
import './FocusGroup-B9OwLCq7.js';
import './sizedMixin-C1lD98vT.js';
import './focusable-CCdy673g.js';
import './focus-visible-xZLLtEay.js';
import './class-map-DdRvesrq.js';
import './directive-Bn5c4u4M.js';
import './like-anchor-3x3vwb8N.js';

var topNavSizes_stories = {
  component: "sp-top-nav",
  title: "Top Nav/Sizes",
  argTypes: {
    size: {
      name: "size",
      type: { name: "string", required: false },
      description: "The size at which to display the Top Nav element",
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
    size: "m"
  }
};
const template = (args) => {
  return x`
        <sp-top-nav selected="1" size=${args.size} label="Demo Top Nav">
            <sp-top-nav-item value="1">Item 1</sp-top-nav-item>
            <sp-top-nav-item value="2">Item 2</sp-top-nav-item>
            <sp-top-nav-item value="3">Item 3</sp-top-nav-item>
            <sp-top-nav-item value="4">Item 4</sp-top-nav-item>
        </sp-top-nav>
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

export { XL, __namedExportsOrder, topNavSizes_stories as default, l, m, s };

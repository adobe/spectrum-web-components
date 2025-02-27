import './sp-icon-CThFoDUE.js';
import './sp-icon-checkmark-CddmjqKE.js';
import './sp-icon-chevron-down-Dmc5-6Al.js';
import './sp-icon-help-CIWB74fN.js';
import './sp-top-nav-item-Cj512GbD.js';
import { x } from './lit-html-COgVUehj.js';
import './IconBase-CmREmoFq.js';
import './lit-element-BulMEkr1.js';
import './state-DrGS5Kkk.js';
import './define-element-B3-QvDZd.js';
import './if-defined-DDJGFaN4.js';
import './query-DQF6X5qW.js';
import './base-u8Z1Hrsd.js';
import './custom-tag-Diwq7nXX.js';
import './Checkmark-D8WZ4StE.js';
import './ChevronDown-s8uTipb9.js';
import './Help-DwXA_pCu.js';
import './resize-controller-BJKfu6ft.js';
import './tab.css-CfrPw2s0.js';
import './RovingTabindex-BIFuw_W7.js';
import './FocusGroup-CQTGJWkN.js';
import './sizedMixin-Bh0Au8rG.js';
import './focusable-CRwO5NCP.js';
import './focus-visible-D29Av9Xb.js';
import './class-map-DdRvesrq.js';
import './directive-Bn5c4u4M.js';
import './like-anchor-YCQdykQc.js';

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

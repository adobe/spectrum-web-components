import './sp-icon-3JXCeRZ3.js';
import './sp-icon-checkmark-CzM1Aw1i.js';
import './sp-icon-chevron-down-DJD4e2ZY.js';
import './sp-icon-help-mfzKvMT-.js';
import './sp-top-nav-item-DD8ftvrh.js';
import { x } from './lit-html-COgVUehj.js';
import './IconBase-5vvO1gxM.js';
import './lit-element-BulMEkr1.js';
import './state-DzluJiIq.js';
import './define-element-xyi5NDDf.js';
import './if-defined-DDJGFaN4.js';
import './query-DQF6X5qW.js';
import './base-u8Z1Hrsd.js';
import './custom-tag-Diwq7nXX.js';
import './Checkmark-D8WZ4StE.js';
import './ChevronDown-s8uTipb9.js';
import './Help-DwXA_pCu.js';
import './resize-controller-BJKfu6ft.js';
import './tab.css-B7nSVs8Y.js';
import './RovingTabindex-Bi74mHtS.js';
import './FocusGroup-DQHKf855.js';
import './sizedMixin-CTLIe6if.js';
import './focusable-DcHsG7Zg.js';
import './focus-visible-D29Av9Xb.js';
import './class-map-DdRvesrq.js';
import './directive-Bn5c4u4M.js';
import './like-anchor-Dgva6KsU.js';

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

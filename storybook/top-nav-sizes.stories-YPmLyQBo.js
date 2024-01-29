import './sp-icon-34kpoGCA.js';
import './sp-icon-checkmark-lj3otcnC.js';
import './sp-icon-chevron-down-LiHvJFYy.js';
import './sp-icon-help-fDVNeBlH.js';
import './sp-top-nav-item-XaGnV6bg.js';
import { x } from './lit-html-GmIhAbMP.js';
import './IconBase-_0RU6XqS.js';
import './lit-element-xBOPiTek.js';
import './define-element-s04w2teA.js';
import './if-defined-pV6JZKXB.js';
import './query-JMOstM_r.js';
import './base-STdhtiz1.js';
import './Checkmark-ae3T4lCi.js';
import './custom-tag-JXLWq-Sj.js';
import './ChevronDown-7lyUAIHR.js';
import './Help-MUMRCGeh.js';
import './resize-controller--ByFn5Jx.js';
import './tab.css-PvWKhry8.js';
import './RovingTabindex-LnbiEVTh.js';
import './FocusGroup-TIL3fP6n.js';
import './sizedMixin-D9_yg9Lr.js';
import './focusable-mx5LgJ38.js';
import './focus-visible-68QWcOy-.js';
import './class-map-Q7DIFm9x.js';
import './directive-C1gRZbRe.js';
import './like-anchor-Gwp5ooDH.js';

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

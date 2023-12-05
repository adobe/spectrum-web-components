import './sp-icon-8061244b.js';
import './sp-icon-checkmark-7b575366.js';
import './sp-icon-chevron-down-b5e7ebfe.js';
import './sp-icon-help-038cfed3.js';
import './sp-top-nav-item-c9edfd00.js';
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
import './resize-controller-55608b66.js';
import './tab.css-812caa61.js';
import './RovingTabindex-ca5f8b64.js';
import './FocusGroup-0f0b800e.js';
import './sizedMixin-9a9da45c.js';
import './focusable-f5539e66.js';
import './focus-visible-03398d98.js';
import './class-map-14530ec2.js';
import './directive-2bb7789e.js';
import './like-anchor-86192240.js';

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

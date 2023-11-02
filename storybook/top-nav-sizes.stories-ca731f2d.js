import './sp-icon-0926a2d4.js';
import './sp-icon-checkmark-06397d4b.js';
import './sp-icon-chevron-down-6ba8fd29.js';
import './sp-icon-help-1ae23d60.js';
import './sp-top-nav-item-a510a390.js';
import { x } from './lit-html-126adc72.js';
import './IconBase-fb970ebf.js';
import './lit-element-9354aa77.js';
import './define-element-43d4edd5.js';
import './if-defined-ae83b405.js';
import './query-d0113d5a.js';
import './base-511c8c11.js';
import './Checkmark-87ba3c87.js';
import './custom-tag-b5526d41.js';
import './ChevronDown-8a6d0720.js';
import './Help-10c43472.js';
import './resize-controller-55608b66.js';
import './tab.css-a2c66e69.js';
import './RovingTabindex-ca5f8b64.js';
import './FocusGroup-0f0b800e.js';
import './sizedMixin-281e4c72.js';
import './focusable-d03021f6.js';
import './focus-visible-03398d98.js';
import './class-map-14530ec2.js';
import './directive-2bb7789e.js';
import './like-anchor-0c856f1c.js';

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

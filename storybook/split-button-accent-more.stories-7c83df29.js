import { a as args, b as argTypes, r as renderSplitButtonSet, s as splitbutton } from './index-6a0765ad.js';
import './sp-menu-item-d1901258.js';
import { E as ElementSizes } from './sizedMixin-95b38e3e.js';
import './sp-popover-adc6def6.js';
import './lit-element-9354aa77.js';
import './lit-html-126adc72.js';
import './define-element-467f3dc4.js';
import './query-d0113d5a.js';
import './base-511c8c11.js';
import './sp-menu-a6b50bf6.js';
import './sp-button-c571335c.js';
import './ButtonBase-4ebd5d24.js';
import './like-anchor-79c92c76.js';
import './if-defined-ae83b405.js';
import './focusable-df7b829e.js';
import './focus-visible-03398d98.js';
import './observe-slot-text-2a3e6366.js';
import './mutation-controller-81a30f7f.js';
import './query-assigned-nodes-6218f033.js';
import './sp-icon-chevron100-d31cf739.js';
import './Chevron100-6f55b923.js';
import './custom-tag-c228386e.js';
import './IconBase-fdbfb1c1.js';
import './sp-icon-more-d39e1471.js';
import './More-78935819.js';
import './custom-tag-b5526d41.js';
import './spectrum-icon-chevron.css-d3283c08.js';
import './Picker-7a452146.js';
import './sp-icon-alert-107ad358.js';
import './MatchMedia-0123f918.js';
import './class-map-14530ec2.js';
import './directive-2bb7789e.js';
import './style-map-156e3c36.js';
import './state-879d3fe4.js';
import './spectrum-icon-checkmark.css-2fc91f81.js';
import './observe-slot-presence-ae37a9bc.js';

const variant = "accent";
const type = "more";
var splitButtonAccentMore_stories = {
  title: "Split Button/Accent/More",
  component: "sp-split-button",
  args: {
    ...args,
    variant,
    type
  },
  argTypes
};
const s = (args2) => renderSplitButtonSet(args2);
s.args = { size: ElementSizes.s };
const sOpen = (args2) => splitbutton(args2);
sOpen.args = { size: ElementSizes.s, open: true };
const m = (args2) => renderSplitButtonSet(args2);
m.args = { size: ElementSizes.m };
const mOpen = (args2) => splitbutton(args2);
mOpen.args = { size: ElementSizes.m, open: true };
const l = (args2) => renderSplitButtonSet(args2);
l.args = { size: ElementSizes.l };
const lOpen = (args2) => splitbutton(args2);
lOpen.args = { size: ElementSizes.l, open: true };
const XL = (args2) => renderSplitButtonSet(args2);
XL.args = { size: ElementSizes.xl };
const XLOpen = (args2) => splitbutton(args2);
XLOpen.args = { size: ElementSizes.xl, open: true };
const __namedExportsOrder = ['s', 'sOpen', 'm', 'mOpen', 'l', 'lOpen', 'XL', 'XLOpen'];

export { XL, XLOpen, __namedExportsOrder, splitButtonAccentMore_stories as default, l, lOpen, m, mOpen, s, sOpen };

import { a as args, b as argTypes, r as renderSplitButtonSet, s as splitbutton } from './index-cA2HDBgt.js';
import { i as isOverlayOpen } from './index-X5nIn6KY.js';
import './sp-menu-item-BnuqroME.js';
import { E as ElementSizes } from './sizedMixin-D9_yg9Lr.js';
import './sp-popover-jafHnpZt.js';
import './lit-element-xBOPiTek.js';
import './lit-html-GmIhAbMP.js';
import './define-element-s04w2teA.js';
import './query-JMOstM_r.js';
import './base-STdhtiz1.js';
import './sp-menu-aukB87hm.js';
import './sp-button-W8hFYHyg.js';
import './ButtonBase-jlLlzNEe.js';
import './like-anchor-Gwp5ooDH.js';
import './if-defined-pV6JZKXB.js';
import './focusable-mx5LgJ38.js';
import './focus-visible-68QWcOy-.js';
import './observe-slot-text-eZT7feU8.js';
import './mutation-controller-KeE5MDSl.js';
import './query-assigned-nodes-u86daeBT.js';
import './when-kvvOyHr2.js';
import './sp-icon-chevron100-3PcMAyn_.js';
import './Chevron100-WZwzwvjg.js';
import './custom-tag-z2Xx81l9.js';
import './IconBase-_0RU6XqS.js';
import './sp-icon-more-xai1q3s_.js';
import './More-RXlxfRbl.js';
import './custom-tag-JXLWq-Sj.js';
import './spectrum-icon-chevron.css-8l4pupPT.js';
import './Picker-C-8dV5AK.js';
import './sp-icon-alert-CNIIZm3E.js';
import './MatchMedia-SMh19R1m.js';
import './class-map-Q7DIFm9x.js';
import './directive-C1gRZbRe.js';
import './style-map-ak5mT6xX.js';
import './state-BSEind79.js';
import './spectrum-icon-checkmark.css-T4LCyo5k.js';
import './observe-slot-presence-tyJ_SCNf.js';

const variant = "primary";
const type = "more";
var splitButtonPrimaryMore_stories = {
  title: "Split Button/Primary/More",
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
const m = (args2) => renderSplitButtonSet(args2);
m.args = { size: ElementSizes.m };
const l = (args2) => renderSplitButtonSet(args2);
l.args = { size: ElementSizes.l };
const XL = (args2) => renderSplitButtonSet(args2);
XL.args = { size: ElementSizes.xl };
const open = (args2) => splitbutton(args2);
open.args = { open: true };
open.decorators = [isOverlayOpen];
const __namedExportsOrder = ['s', 'm', 'l', 'XL', 'open'];

export { XL, __namedExportsOrder, splitButtonPrimaryMore_stories as default, l, m, open, s };

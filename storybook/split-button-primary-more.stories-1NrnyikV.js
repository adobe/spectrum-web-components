import { a as args, b as argTypes, r as renderSplitButtonSet, s as splitbutton } from './index-3DWRQbj-.js';
import { i as isOverlayOpen } from './index-X5nIn6KY.js';
import './sp-menu-item-ll9spFiY.js';
import { E as ElementSizes } from './sizedMixin-mnNfh2gr.js';
import './sp-popover-ScQBhaVn.js';
import './lit-element-xBOPiTek.js';
import './lit-html-GmIhAbMP.js';
import './define-element-2O4ZhTAw.js';
import './query-JMOstM_r.js';
import './base-STdhtiz1.js';
import './sp-menu-rNqdCkwX.js';
import './sp-button-RmYXnt4x.js';
import './ButtonBase-H8ie1_xx.js';
import './like-anchor-J4T73PxR.js';
import './if-defined-pV6JZKXB.js';
import './focusable-WZR9a5Bc.js';
import './focus-visible-68QWcOy-.js';
import './observe-slot-text-ybW1xuBS.js';
import './mutation-controller-KeE5MDSl.js';
import './query-assigned-nodes-aJM_vOZ4.js';
import './when-kvvOyHr2.js';
import './sp-icon-chevron100-vrIsKneV.js';
import './Chevron100-WZwzwvjg.js';
import './custom-tag-z2Xx81l9.js';
import './IconBase-TDmbHQaH.js';
import './sp-icon-more-d5UW5tgp.js';
import './More-RXlxfRbl.js';
import './custom-tag-JXLWq-Sj.js';
import './spectrum-icon-chevron.css-8l4pupPT.js';
import './Picker-dJzHyOEz.js';
import './sp-icon-alert-Bolxr-zN.js';
import './MatchMedia-SMh19R1m.js';
import './class-map-Q7DIFm9x.js';
import './directive-C1gRZbRe.js';
import './style-map-ak5mT6xX.js';
import './state-fuvayDA0.js';
import './spectrum-icon-checkmark.css-3xBPG61g.js';
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

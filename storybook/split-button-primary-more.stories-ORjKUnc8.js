import { a as args, b as argTypes, r as renderSplitButtonSet, s as splitbutton } from './index-4r_H-SdT.js';
import { i as isOverlayOpen } from './index-X5nIn6KY.js';
import './sp-menu-item-WU5O76xQ.js';
import { E as ElementSizes } from './sizedMixin-6sBuja8e.js';
import './sp-popover-OhDGQO09.js';
import './Popover-uavtgZAO.js';
import './lit-element-xBOPiTek.js';
import './lit-html-GmIhAbMP.js';
import './define-element-UHExAFdK.js';
import './query-JMOstM_r.js';
import './base-STdhtiz1.js';
import './sp-menu-FQVYzy9J.js';
import './sp-button-idIiKTnO.js';
import './ButtonBase-sZHeZCuW.js';
import './like-anchor-njINSPTN.js';
import './if-defined-pV6JZKXB.js';
import './focusable-p9xQieT8.js';
import './focus-visible-68QWcOy-.js';
import './observe-slot-text-5oGzzbFn.js';
import './mutation-controller-KeE5MDSl.js';
import './query-assigned-nodes-7fQrqAdh.js';
import './when-kvvOyHr2.js';
import './sp-icon-chevron100-tb9aielX.js';
import './Chevron100-WZwzwvjg.js';
import './custom-tag-z2Xx81l9.js';
import './IconBase-Tav-FzmR.js';
import './sp-icon-more-8Poneot0.js';
import './More-RXlxfRbl.js';
import './custom-tag-JXLWq-Sj.js';
import './spectrum-icon-chevron.css-nkKXiUlE.js';
import './Picker-yxog523o.js';
import './sp-icon-alert-8xHFckqN.js';
import './MatchMedia-SMh19R1m.js';
import './class-map-Q7DIFm9x.js';
import './directive-C1gRZbRe.js';
import './style-map-ak5mT6xX.js';
import './state-FLXW5LJZ.js';
import './spectrum-icon-checkmark.css-QI1dlyU-.js';
import './observe-slot-presence-tyJ_SCNf.js';
import './random-id-M2k-wjyE.js';

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

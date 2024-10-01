import { a as args, b as argTypes, p as parameters, r as renderSplitButtonSet, s as splitbutton } from './index-6BhP77gV.js';
import { i as isOverlayOpen } from './index-DY1O5Zi9.js';
import './sp-menu-item-DOkBCZjF.js';
import { E as ElementSizes } from './sizedMixin-BzkTbMb8.js';
import './sp-popover-BH6yktMg.js';
import './Popover-CdFgwNhh.js';
import './lit-element-BulMEkr1.js';
import './lit-html-COgVUehj.js';
import './define-element-C_3bgzm7.js';
import './query-DQF6X5qW.js';
import './base-u8Z1Hrsd.js';
import './sp-menu-C-dIukbW.js';
import './sp-button-BTMm_ibC.js';
import './ButtonBase-Euqk2NbC.js';
import './like-anchor-B3Uz3TFY.js';
import './if-defined-DDJGFaN4.js';
import './focusable-w-VMKDtH.js';
import './focus-visible-D29Av9Xb.js';
import './observe-slot-text-C6K935AT.js';
import './mutation-controller-D2lT1xZk.js';
import './query-assigned-nodes-DAYI4epk.js';
import './PendingState-BK9ivzsq.js';
import './get-label-from-slot-Cg6mfN40.js';
import './sp-icon-chevron100-BExoFMYC.js';
import './Chevron100-2ZEB0c-t.js';
import './custom-tag-B5IH9PTE.js';
import './IconBase-BIYWpr2G.js';
import './sp-icon-more-DU6G5_Dk.js';
import './More-C2yzfCOG.js';
import './custom-tag-Diwq7nXX.js';
import './spectrum-icon-chevron.css-CeYia-Jd.js';
import './Picker-TUMgNVnC.js';
import './sp-icon-alert-Cbypiip7.js';
import './MatchMedia-SZ42m4IA.js';
import './DependencyManger-Dpkh1Bse.js';
import './platform-r3Lf9REX.js';
import './class-map-DdRvesrq.js';
import './directive-Bn5c4u4M.js';
import './style-map-DtKTc8KS.js';
import './state-DrummH0c.js';
import './spectrum-icon-checkmark.css-NuoPlGW7.js';
import './slottable-request-event-DXuuyGoq.js';
import './observe-slot-presence-Ceiwt-jV.js';
import './random-id-BST1Puzz.js';

const variant = "secondary";
const type = "more";
var splitButtonSecondaryMore_stories = {
  title: "Split Button/Secondary/More",
  component: "sp-split-button",
  args: {
    ...args,
    variant,
    type
  },
  argTypes,
  parameters
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

export { XL, __namedExportsOrder, splitButtonSecondaryMore_stories as default, l, m, open, s };

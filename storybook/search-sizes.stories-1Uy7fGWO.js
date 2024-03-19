import './sp-search--OOv9iEU.js';
import './sp-field-label-BRa7XgBa.js';
import './sp-help-text-NqtXXKzR.js';
import { x } from './lit-html-GmIhAbMP.js';
import { l as l$1 } from './if-defined-pV6JZKXB.js';
import './sp-clear-button-mGu_3bFI.js';
import './spectrum-icon-cross.css-8PYVteVZ.js';
import './ButtonBase-HA5NNgN2.js';
import './like-anchor-a_wuYSt2.js';
import './define-element-lju0qz2P.js';
import './lit-element-xBOPiTek.js';
import './focusable-wnRI1QCz.js';
import './focus-visible-68QWcOy-.js';
import './observe-slot-text-HaH5WFZ0.js';
import './mutation-controller-KeE5MDSl.js';
import './query-assigned-nodes-jGvx5qKR.js';
import './base-STdhtiz1.js';
import './query-assigned-elements-1m6Cs7Ix.js';
import './query-JMOstM_r.js';
import './custom-tag-z2Xx81l9.js';
import './IconBase-YN3-eQCN.js';
import './sizedMixin-VwrJiqSW.js';
import './sp-icon-magnify-HuJDvTSr.js';
import './custom-tag-JXLWq-Sj.js';
import './Textfield-qGiUbHPm.js';
import './manage-help-text-kfeeNmRL.js';
import './condition-attribute-with-id-nb2zon-s.js';
import './spectrum-icon-checkmark.css-EqJn5hpL.js';
import './sp-icon-alert-FVCBnC1q.js';
import './directive-C1gRZbRe.js';
import './directive-helpers-WPlpPO1F.js';
import './state-UPADzOvr.js';
import './ElementResolution-TTOqkMM7.js';

var searchSizes_stories = {
  component: "sp-search",
  title: "Search/Sizes"
};
const template = ({
  size
} = {}) => {
  return x`
        <sp-field-label for="name" size=${l$1(size)}>
            What would you like to find?
        </sp-field-label>
        <sp-search id="name" size=${l$1(size)} value="Sized Search">
            <sp-help-text size=${l$1(size)} slot="help-text">
                Anything within reason...
            </sp-help-text>
        </sp-search>
    `;
};
const s = () => template({ size: "s" });
const noSize = () => template();
const m = () => template({ size: "m" });
const l = () => template({ size: "l" });
const XL = () => template({ size: "xl" });
const __namedExportsOrder = ['s', 'noSize', 'm', 'l', 'XL'];

export { XL, __namedExportsOrder, searchSizes_stories as default, l, m, noSize, s };

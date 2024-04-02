import './sp-search-7OeFwX-T.js';
import './sp-field-label-LR663cei.js';
import './sp-help-text-qV58Z5c6.js';
import { x } from './lit-html-GmIhAbMP.js';
import { l as l$1 } from './if-defined-pV6JZKXB.js';
import './sp-clear-button-jBIhRkzG.js';
import './spectrum-icon-cross.css-jF12fKiX.js';
import './ButtonBase--K-lWDuL.js';
import './like-anchor-A-VxslPW.js';
import './define-element-tO8-r1bu.js';
import './lit-element-xBOPiTek.js';
import './focusable-GZ06kf6F.js';
import './focus-visible-68QWcOy-.js';
import './observe-slot-text-RiUvi5fT.js';
import './mutation-controller-KeE5MDSl.js';
import './query-assigned-nodes-jGvx5qKR.js';
import './base-STdhtiz1.js';
import './query-assigned-elements-1m6Cs7Ix.js';
import './query-JMOstM_r.js';
import './custom-tag-z2Xx81l9.js';
import './IconBase-EFa3DHxz.js';
import './sizedMixin-JAQz02f5.js';
import './sp-icon-magnify-dOVYszCN.js';
import './custom-tag-JXLWq-Sj.js';
import './Textfield-tevcOEW2.js';
import './manage-help-text-f9KNpcsn.js';
import './condition-attribute-with-id-nb2zon-s.js';
import './random-id-M2k-wjyE.js';
import './spectrum-icon-checkmark.css-vEh5gvyq.js';
import './sp-icon-alert-HIZE6wdL.js';
import './directive-C1gRZbRe.js';
import './directive-helpers-WPlpPO1F.js';
import './state-W6so4P5i.js';
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

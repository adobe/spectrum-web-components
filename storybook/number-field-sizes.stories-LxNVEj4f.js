import './sp-number-field-J-Oaj0wb.js';
import './sp-field-label-OXdzlFiz.js';
import { x } from './lit-html-GmIhAbMP.js';
import { l as l$1 } from './if-defined-pV6JZKXB.js';
import './LanguageResolution-433GhF-m.js';
import './streaming-listener-99YRN1c8.js';
import './lit-element-xBOPiTek.js';
import './async-directive-cHMFxS7f.js';
import './directive-helpers-WPlpPO1F.js';
import './directive-C1gRZbRe.js';
import './import-1J07yXlD.js';
import './sp-icon-chevron200-F11H0V8m.js';
import './Chevron200-UoWdMLUK.js';
import './custom-tag-z2Xx81l9.js';
import './IconBase-_gvXsC2f.js';
import './define-element-IUrhCXKn.js';
import './sp-icon-chevron75-gF0wn6Ye.js';
import './Chevron75-ykt7YsHW.js';
import './sp-icon-chevron100-tD6SrTfS.js';
import './Chevron100-WZwzwvjg.js';
import './sp-infield-button-n6idOiYC.js';
import './ButtonBase-nL2qW8Lw.js';
import './like-anchor-PHkAP_YZ.js';
import './focusable-zbBPTVfi.js';
import './focus-visible-68QWcOy-.js';
import './observe-slot-text-CVZsl2bC.js';
import './mutation-controller-KeE5MDSl.js';
import './query-assigned-nodes-mXMsr4SG.js';
import './base-STdhtiz1.js';
import './sizedMixin-qrvMoaCA.js';
import './query-JMOstM_r.js';
import './platform-c1C9ET3y.js';
import './spectrum-icon-chevron.css-8l4pupPT.js';
import './Textfield-0FkuUb2C.js';
import './manage-help-text-kfeeNmRL.js';
import './condition-attribute-with-id-nb2zon-s.js';
import './spectrum-icon-checkmark.css-QHy1sRmP.js';
import './sp-icon-alert-8oes3o2-.js';
import './custom-tag-JXLWq-Sj.js';
import './state-xjFlQaWq.js';
import './ElementResolution-TTOqkMM7.js';

var numberFieldSizes_stories = {
  component: "sp-number-field",
  title: "Number Field/Sizes"
};
const template = ({
  size
} = {}) => {
  return x`
        <sp-field-label for="name" size=${l$1(size)}>
            Pick a number
        </sp-field-label>
        <sp-number-field
            id="name"
            size=${l$1(size)}
            value="100"
        ></sp-number-field>
    `;
};
const s = () => template({ size: "s" });
const noSize = () => template();
const m = () => template({ size: "m" });
const l = () => template({ size: "l" });
const XL = () => template({ size: "xl" });
const __namedExportsOrder = ['s', 'noSize', 'm', 'l', 'XL'];

export { XL, __namedExportsOrder, numberFieldSizes_stories as default, l, m, noSize, s };

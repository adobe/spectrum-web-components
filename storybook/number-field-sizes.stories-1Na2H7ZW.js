import './sp-number-field-5n1-oK-0.js';
import './sp-field-label-Tiv8xbEr.js';
import { x } from './lit-html-GmIhAbMP.js';
import { l as l$1 } from './if-defined-pV6JZKXB.js';
import './LanguageResolution-433GhF-m.js';
import './streaming-listener-99YRN1c8.js';
import './lit-element-xBOPiTek.js';
import './async-directive-cHMFxS7f.js';
import './directive-helpers-WPlpPO1F.js';
import './directive-C1gRZbRe.js';
import './import-mabg3nA1.js';
import './sp-icon-chevron50-D8wrHsKq.js';
import './Chevron50-QkUmZTlQ.js';
import './custom-tag-z2Xx81l9.js';
import './IconBase-1lzddWrP.js';
import './define-element-z6bXN_P5.js';
import './sp-icon-chevron75-HIu8tzhM.js';
import './Chevron75-ykt7YsHW.js';
import './sp-icon-chevron100-uB3eMtQr.js';
import './Chevron100-ok1mOHjI.js';
import './sp-icon-chevron200-3Q-ccilY.js';
import './Chevron200-uafXU_JZ.js';
import './sp-infield-button-r5jVwXOL.js';
import './ButtonBase-xfo9cPrz.js';
import './like-anchor-iRdC2T2x.js';
import './focusable-M0S89eyW.js';
import './focus-visible-68QWcOy-.js';
import './observe-slot-text-MDYPopbw.js';
import './mutation-controller-KeE5MDSl.js';
import './query-assigned-nodes-qh-rhz36.js';
import './base-STdhtiz1.js';
import './sizedMixin-IBQibr2z.js';
import './query-JMOstM_r.js';
import './platform-c1C9ET3y.js';
import './spectrum-icon-chevron.css-i0thkS8X.js';
import './Textfield-ynBlbbxQ.js';
import './manage-help-text-kfeeNmRL.js';
import './condition-attribute-with-id-nb2zon-s.js';
import './spectrum-icon-checkmark.css-F44WP9wj.js';
import './sp-icon-alert-IfxTE-S5.js';
import './custom-tag-JXLWq-Sj.js';
import './state-qeP24jco.js';
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

import './sp-number-field-e2zYkBm4.js';
import './sp-field-label--CBS1ijW.js';
import { x } from './lit-html-GmIhAbMP.js';
import { l as l$1 } from './if-defined-pV6JZKXB.js';
import './LanguageResolution-433GhF-m.js';
import './streaming-listener-99YRN1c8.js';
import './lit-element-xBOPiTek.js';
import './async-directive-cHMFxS7f.js';
import './directive-helpers-WPlpPO1F.js';
import './directive-C1gRZbRe.js';
import './import-mabg3nA1.js';
import './sp-icon-chevron200-t0Bj5h5I.js';
import './Chevron200-UoWdMLUK.js';
import './custom-tag-z2Xx81l9.js';
import './IconBase-TDmbHQaH.js';
import './define-element-2O4ZhTAw.js';
import './sp-icon-chevron75-ROtKiCht.js';
import './Chevron75-ykt7YsHW.js';
import './sp-icon-chevron100-vrIsKneV.js';
import './Chevron100-WZwzwvjg.js';
import './sp-infield-button-lUG5TdIR.js';
import './ButtonBase-H8ie1_xx.js';
import './like-anchor-J4T73PxR.js';
import './focusable-WZR9a5Bc.js';
import './focus-visible-68QWcOy-.js';
import './observe-slot-text-ybW1xuBS.js';
import './mutation-controller-KeE5MDSl.js';
import './query-assigned-nodes-aJM_vOZ4.js';
import './base-STdhtiz1.js';
import './sizedMixin-mnNfh2gr.js';
import './query-JMOstM_r.js';
import './platform-c1C9ET3y.js';
import './spectrum-icon-chevron.css-8l4pupPT.js';
import './Textfield-rAX4ihoL.js';
import './manage-help-text-kfeeNmRL.js';
import './condition-attribute-with-id-nb2zon-s.js';
import './spectrum-icon-checkmark.css-3xBPG61g.js';
import './sp-icon-alert-Bolxr-zN.js';
import './custom-tag-JXLWq-Sj.js';
import './state-fuvayDA0.js';
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

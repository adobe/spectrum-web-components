import './sp-textfield-oI1hDHZL.js';
import './sp-field-label-Tiv8xbEr.js';
import './sp-help-text-WqWiaQAk.js';
import { x } from './lit-html-GmIhAbMP.js';
import { l as l$1 } from './if-defined-pV6JZKXB.js';
import './Textfield-ynBlbbxQ.js';
import './manage-help-text-kfeeNmRL.js';
import './condition-attribute-with-id-nb2zon-s.js';
import './focusable-M0S89eyW.js';
import './focus-visible-68QWcOy-.js';
import './define-element-z6bXN_P5.js';
import './lit-element-xBOPiTek.js';
import './spectrum-icon-checkmark.css-F44WP9wj.js';
import './custom-tag-z2Xx81l9.js';
import './IconBase-1lzddWrP.js';
import './sp-icon-alert-IfxTE-S5.js';
import './custom-tag-JXLWq-Sj.js';
import './directive-C1gRZbRe.js';
import './directive-helpers-WPlpPO1F.js';
import './sizedMixin-IBQibr2z.js';
import './base-STdhtiz1.js';
import './state-qeP24jco.js';
import './query-JMOstM_r.js';
import './ElementResolution-TTOqkMM7.js';

var textfieldSizes_stories = {
  component: "sp-textfield",
  title: "Textfield/Sizes"
};
const template = ({
  size
} = {}) => {
  return x`
        <sp-field-label for="name" size=${l$1(size)}>
            Enter your name
        </sp-field-label>
        <sp-textfield id="name" size=${l$1(size)} value="Sized Textfield">
            <sp-help-text size=${l$1(size)} slot="help-text">
                This is for the whole enchilada.
            </sp-help-text>
        </sp-textfield>
    `;
};
const s = () => template({ size: "s" });
const noSize = () => template();
const m = () => template({ size: "m" });
const l = () => template({ size: "l" });
const XL = () => template({ size: "xl" });
const __namedExportsOrder = ['s', 'noSize', 'm', 'l', 'XL'];

export { XL, __namedExportsOrder, textfieldSizes_stories as default, l, m, noSize, s };

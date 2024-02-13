import './sp-textfield-IEiMrNbr.js';
import './sp-field-label-50w0r-Gn.js';
import './sp-help-text-MQgthQoN.js';
import { x } from './lit-html-GmIhAbMP.js';
import { l as l$1 } from './if-defined-pV6JZKXB.js';
import './Textfield-xQbGP5yq.js';
import './manage-help-text-kfeeNmRL.js';
import './condition-attribute-with-id-nb2zon-s.js';
import './focusable-p9xQieT8.js';
import './focus-visible-68QWcOy-.js';
import './define-element-UHExAFdK.js';
import './lit-element-xBOPiTek.js';
import './spectrum-icon-checkmark.css-QI1dlyU-.js';
import './custom-tag-z2Xx81l9.js';
import './IconBase-Tav-FzmR.js';
import './sp-icon-alert-8xHFckqN.js';
import './custom-tag-JXLWq-Sj.js';
import './directive-C1gRZbRe.js';
import './directive-helpers-WPlpPO1F.js';
import './sizedMixin-6sBuja8e.js';
import './base-STdhtiz1.js';
import './state-FLXW5LJZ.js';
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

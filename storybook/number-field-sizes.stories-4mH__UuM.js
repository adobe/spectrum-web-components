import './sp-number-field-5-PFYxCz.js';
import './sp-field-label-MGGfIObj.js';
import { x } from './lit-html-GmIhAbMP.js';
import { l as l$1 } from './if-defined-pV6JZKXB.js';
import './LanguageResolution-433GhF-m.js';
import './streaming-listener-99YRN1c8.js';
import './lit-element-xBOPiTek.js';
import './async-directive-cHMFxS7f.js';
import './directive-helpers-WPlpPO1F.js';
import './directive-C1gRZbRe.js';
import './import-mabg3nA1.js';
import './sp-icon-chevron200-vVC8Y-9O.js';
import './Chevron200-UoWdMLUK.js';
import './custom-tag-z2Xx81l9.js';
import './IconBase-_0RU6XqS.js';
import './define-element-s04w2teA.js';
import './sp-icon-chevron75-CWMvoOM7.js';
import './Chevron75-ykt7YsHW.js';
import './sp-icon-chevron100-3PcMAyn_.js';
import './Chevron100-WZwzwvjg.js';
import './sp-infield-button-Q-JqKcvb.js';
import './ButtonBase-jlLlzNEe.js';
import './like-anchor-Gwp5ooDH.js';
import './focusable-mx5LgJ38.js';
import './focus-visible-68QWcOy-.js';
import './observe-slot-text-eZT7feU8.js';
import './mutation-controller-KeE5MDSl.js';
import './query-assigned-nodes-u86daeBT.js';
import './base-STdhtiz1.js';
import './sizedMixin-D9_yg9Lr.js';
import './query-JMOstM_r.js';
import './platform-c1C9ET3y.js';
import './spectrum-icon-chevron.css-8l4pupPT.js';
import './Textfield-DcG6jznK.js';
import './manage-help-text-kfeeNmRL.js';
import './condition-attribute-with-id-nb2zon-s.js';
import './spectrum-icon-checkmark.css-T4LCyo5k.js';
import './sp-icon-alert-CNIIZm3E.js';
import './custom-tag-JXLWq-Sj.js';
import './state-BSEind79.js';
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

import './sp-textfield-em5zHX20.js';
import './sp-field-label-MGGfIObj.js';
import './sp-help-text-fgzTjtTp.js';
import { x } from './lit-html-GmIhAbMP.js';
import { l as l$1 } from './if-defined-pV6JZKXB.js';
import './Textfield-DcG6jznK.js';
import './manage-help-text-kfeeNmRL.js';
import './condition-attribute-with-id-nb2zon-s.js';
import './focusable-mx5LgJ38.js';
import './focus-visible-68QWcOy-.js';
import './define-element-s04w2teA.js';
import './lit-element-xBOPiTek.js';
import './spectrum-icon-checkmark.css-T4LCyo5k.js';
import './custom-tag-z2Xx81l9.js';
import './IconBase-_0RU6XqS.js';
import './sp-icon-alert-CNIIZm3E.js';
import './custom-tag-JXLWq-Sj.js';
import './directive-C1gRZbRe.js';
import './directive-helpers-WPlpPO1F.js';
import './sizedMixin-D9_yg9Lr.js';
import './base-STdhtiz1.js';
import './state-BSEind79.js';
import './query-JMOstM_r.js';
import './ElementResolution-TTOqkMM7.js';

var textareaSizes_stories = {
  component: "sp-textfield",
  title: "Textarea/Sizes"
};
const template = ({
  size
} = {}) => {
  return x`
        <sp-field-label for="name" size=${l$1(size)}>
            Enter your life story
        </sp-field-label>
        <sp-textfield
            id="name"
            multiline
            size=${l$1(size)}
            value="Sized Textarea"
        >
            <sp-help-text size=${l$1(size)} slot="help-text">
                Spare no expense.
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

export { XL, __namedExportsOrder, textareaSizes_stories as default, l, m, noSize, s };

import './sp-textfield-00b5f14c.js';
import './sp-field-label-81c2b9be.js';
import './sp-help-text-9aa43d3a.js';
import { x } from './lit-html-126adc72.js';
import { l as l$1 } from './if-defined-ae83b405.js';
import './Textfield-bbb91e08.js';
import './manage-help-text-39f4c7ea.js';
import './condition-attribute-with-id-62869347.js';
import './focusable-391b57ba.js';
import './focus-visible-03398d98.js';
import './define-element-7dc6a572.js';
import './lit-element-9354aa77.js';
import './spectrum-icon-checkmark.css-ebf23520.js';
import './custom-tag-c228386e.js';
import './IconBase-7772fb01.js';
import './sp-icon-alert-f7ff11b9.js';
import './custom-tag-b5526d41.js';
import './directive-2bb7789e.js';
import './directive-helpers-aa9210f2.js';
import './sizedMixin-3d08a58f.js';
import './base-511c8c11.js';
import './state-3927c84f.js';
import './query-d0113d5a.js';
import './ElementResolution-b58a0825.js';

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

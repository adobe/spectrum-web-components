import './sp-textfield-504b84d9.js';
import './sp-field-label-eb7b786c.js';
import './sp-help-text-e88ae1be.js';
import { x } from './lit-html-126adc72.js';
import { l as l$1 } from './if-defined-ae83b405.js';
import './Textfield-f4934212.js';
import './manage-help-text-39f4c7ea.js';
import './condition-attribute-with-id-62869347.js';
import './focusable-6cc2c3b2.js';
import './focus-visible-03398d98.js';
import './define-element-e64f5ea4.js';
import './lit-element-9354aa77.js';
import './spectrum-icon-checkmark.css-359949f2.js';
import './custom-tag-c228386e.js';
import './IconBase-d00b1a4e.js';
import './sp-icon-alert-248f0d52.js';
import './custom-tag-b5526d41.js';
import './directive-2bb7789e.js';
import './directive-helpers-aa9210f2.js';
import './sizedMixin-43fe982f.js';
import './base-511c8c11.js';
import './state-5175507d.js';
import './query-d0113d5a.js';
import './ElementResolution-7469f128.js';

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

import './sp-textfield-5dc28219.js';
import './sp-field-label-286ffe1f.js';
import './sp-help-text-c83a6f75.js';
import { x } from './lit-html-126adc72.js';
import { l as l$1 } from './if-defined-ae83b405.js';
import './Textfield-7e6cdcd0.js';
import './manage-help-text-39f4c7ea.js';
import './condition-attribute-with-id-62869347.js';
import './focusable-f5539e66.js';
import './focus-visible-03398d98.js';
import './define-element-617dba69.js';
import './lit-element-9354aa77.js';
import './spectrum-icon-checkmark.css-a8f99d4c.js';
import './custom-tag-c228386e.js';
import './IconBase-d9572ad8.js';
import './sp-icon-alert-4033bfea.js';
import './custom-tag-b5526d41.js';
import './directive-2bb7789e.js';
import './directive-helpers-aa9210f2.js';
import './sizedMixin-9a9da45c.js';
import './base-511c8c11.js';
import './state-59f591cf.js';
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

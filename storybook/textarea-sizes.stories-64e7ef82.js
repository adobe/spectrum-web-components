import './sp-textfield-3b3fc1b7.js';
import './sp-field-label-05f39d18.js';
import './sp-help-text-b428b3b4.js';
import { x } from './lit-html-126adc72.js';
import { l as l$1 } from './if-defined-ae83b405.js';
import './Textfield-a0f64496.js';
import './manage-help-text-39f4c7ea.js';
import './condition-attribute-with-id-62869347.js';
import './focusable-d03021f6.js';
import './focus-visible-03398d98.js';
import './define-element-43d4edd5.js';
import './lit-element-9354aa77.js';
import './spectrum-icon-checkmark.css-c19acd0f.js';
import './custom-tag-c228386e.js';
import './IconBase-fb970ebf.js';
import './sp-icon-alert-d34893d7.js';
import './custom-tag-b5526d41.js';
import './directive-2bb7789e.js';
import './directive-helpers-aa9210f2.js';
import './sizedMixin-281e4c72.js';
import './base-511c8c11.js';
import './state-0afa7555.js';
import './query-d0113d5a.js';
import './ElementResolution-b58a0825.js';

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

import './sp-search-eaccf8c1.js';
import './sp-field-label-eb7b786c.js';
import './sp-help-text-e88ae1be.js';
import { x } from './lit-html-126adc72.js';
import { l as l$1 } from './if-defined-ae83b405.js';
import './sp-clear-button-42b9f79d.js';
import './spectrum-icon-cross.css-5810d93c.js';
import './ButtonBase-997f7a09.js';
import './like-anchor-72ed571c.js';
import './define-element-e64f5ea4.js';
import './lit-element-9354aa77.js';
import './focusable-6cc2c3b2.js';
import './focus-visible-03398d98.js';
import './observe-slot-text-16ab7d67.js';
import './mutation-controller-81a30f7f.js';
import './query-assigned-nodes-b8bfe193.js';
import './base-511c8c11.js';
import './sizedMixin-43fe982f.js';
import './query-d0113d5a.js';
import './custom-tag-c228386e.js';
import './IconBase-d00b1a4e.js';
import './sp-icon-magnify-b0889d95.js';
import './custom-tag-b5526d41.js';
import './Textfield-f4934212.js';
import './manage-help-text-39f4c7ea.js';
import './condition-attribute-with-id-62869347.js';
import './spectrum-icon-checkmark.css-359949f2.js';
import './sp-icon-alert-248f0d52.js';
import './directive-2bb7789e.js';
import './directive-helpers-aa9210f2.js';
import './state-5175507d.js';
import './ElementResolution-7469f128.js';

var searchSizes_stories = {
  component: "sp-search",
  title: "Search/Sizes"
};
const template = ({
  size
} = {}) => {
  return x`
        <sp-field-label for="name" size=${l$1(size)}>
            What would you like to find?
        </sp-field-label>
        <sp-search id="name" size=${l$1(size)} value="Sized Search">
            <sp-help-text size=${l$1(size)} slot="help-text">
                Anything within reason...
            </sp-help-text>
        </sp-search>
    `;
};
const s = () => template({ size: "s" });
const noSize = () => template();
const m = () => template({ size: "m" });
const l = () => template({ size: "l" });
const XL = () => template({ size: "xl" });
const __namedExportsOrder = ['s', 'noSize', 'm', 'l', 'XL'];

export { XL, __namedExportsOrder, searchSizes_stories as default, l, m, noSize, s };

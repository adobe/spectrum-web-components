import './sp-search-a1586611.js';
import './sp-field-label-5c290246.js';
import './sp-help-text-fc561657.js';
import { x } from './lit-html-126adc72.js';
import { l as l$1 } from './if-defined-ae83b405.js';
import './sp-clear-button-4035aaee.js';
import './spectrum-icon-cross.css-8adfc305.js';
import './ButtonBase-4ebd5d24.js';
import './like-anchor-79c92c76.js';
import './define-element-467f3dc4.js';
import './lit-element-9354aa77.js';
import './focusable-df7b829e.js';
import './focus-visible-03398d98.js';
import './observe-slot-text-2a3e6366.js';
import './mutation-controller-81a30f7f.js';
import './query-assigned-nodes-6218f033.js';
import './base-511c8c11.js';
import './sizedMixin-95b38e3e.js';
import './query-d0113d5a.js';
import './custom-tag-c228386e.js';
import './IconBase-fdbfb1c1.js';
import './sp-icon-magnify-6bb2bc75.js';
import './custom-tag-b5526d41.js';
import './Textfield-034d075f.js';
import './manage-help-text-39f4c7ea.js';
import './condition-attribute-with-id-62869347.js';
import './spectrum-icon-checkmark.css-2fc91f81.js';
import './sp-icon-alert-107ad358.js';
import './directive-2bb7789e.js';
import './directive-helpers-aa9210f2.js';
import './state-879d3fe4.js';
import './ElementResolution-b58a0825.js';

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

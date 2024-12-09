import './sp-textfield-DdBzCHuI.js';
import './sp-field-label-BCAcbvCy.js';
import './sp-help-text-DmnXooA_.js';
import { x } from './lit-html-COgVUehj.js';
import { o } from './if-defined-DDJGFaN4.js';
import './Textfield-DSh0H6VQ.js';
import './manage-help-text-CQxj8H8g.js';
import './condition-attribute-with-id-Cnyhr7Mp.js';
import './random-id-BST1Puzz.js';
import './focusable-8mrYv4ai.js';
import './focus-visible-D29Av9Xb.js';
import './define-element-CbLZvyrL.js';
import './lit-element-BulMEkr1.js';
import './icon-checkmark-overrides.css-DFANn-jw.js';
import './custom-tag-B5IH9PTE.js';
import './IconBase-Z2IxLljH.js';
import './state-DMEtq-nM.js';
import './sp-icon-alert-hlBBLxyR.js';
import './custom-tag-Diwq7nXX.js';
import './directive-Bn5c4u4M.js';
import './directive-helpers-icdnqxxc.js';
import './sizedMixin-HBGPeo6s.js';
import './query-DQF6X5qW.js';
import './base-u8Z1Hrsd.js';
import './ElementResolution-B9KteuX8.js';

var textfieldSizes_stories = {
  component: "sp-textfield",
  title: "Textfield/Sizes"
};
const template = ({
  size
} = {}) => {
  return x`
        <sp-field-label for="name" size=${o(size)}>
            Enter your name
        </sp-field-label>
        <sp-textfield id="name" size=${o(size)} value="Sized Textfield">
            <sp-help-text size=${o(size)} slot="help-text">
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

import './sp-textfield-C8pD4Ep_.js';
import './sp-field-label-d2_767OQ.js';
import './sp-help-text-0uGrOojQ.js';
import { x } from './lit-html-COgVUehj.js';
import { o } from './if-defined-DDJGFaN4.js';
import './Textfield-D4Mirr1j.js';
import './manage-help-text-83_bseGo.js';
import './condition-attribute-with-id-Cnyhr7Mp.js';
import './random-id-BST1Puzz.js';
import './focusable-CCdy673g.js';
import './focus-visible-xZLLtEay.js';
import './define-element-ByMWMcVd.js';
import './lit-element-BL-po2DW.js';
import './spectrum-icon-checkmark.css-B-kvSI14.js';
import './custom-tag-B5IH9PTE.js';
import './IconBase-qDHHH3Ln.js';
import './sp-icon-alert-CefcIj5Q.js';
import './custom-tag-Diwq7nXX.js';
import './directive-Bn5c4u4M.js';
import './directive-helpers-icdnqxxc.js';
import './sizedMixin-C1lD98vT.js';
import './state-DGkVCdxP.js';
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

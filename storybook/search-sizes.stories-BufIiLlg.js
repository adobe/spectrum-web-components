import './sp-search-Dbg5oILI.js';
import './sp-field-label-Be47fQIb.js';
import './sp-help-text-B68lpRT4.js';
import { x } from './lit-html-COgVUehj.js';
import { o } from './if-defined-DDJGFaN4.js';
import './sp-clear-button-CvisSdBy.js';
import './spectrum-icon-cross.css-u24GOVr3.js';
import './ButtonBase-CmrIm7Eg.js';
import './like-anchor-DDdhsGLB.js';
import './define-element-C6mUAqDT.js';
import './lit-element-BL-po2DW.js';
import './focusable-BcRsQ114.js';
import './focus-visible-D29Av9Xb.js';
import './observe-slot-text-Bwkw8iOx.js';
import './mutation-controller-D2lT1xZk.js';
import './query-assigned-nodes-DAYI4epk.js';
import './base-u8Z1Hrsd.js';
import './query-DQF6X5qW.js';
import './custom-tag-B5IH9PTE.js';
import './IconBase-BYYYVFxE.js';
import './sizedMixin-By06sgdw.js';
import './sp-icon-magnify-CZqUUq1r.js';
import './custom-tag-Diwq7nXX.js';
import './Textfield-D4O1fwTy.js';
import './manage-help-text-83_bseGo.js';
import './condition-attribute-with-id-Cnyhr7Mp.js';
import './random-id-BST1Puzz.js';
import './spectrum-icon-checkmark.css-BVKICtNJ.js';
import './sp-icon-alert-BEGHy3RV.js';
import './directive-Bn5c4u4M.js';
import './directive-helpers-icdnqxxc.js';
import './state-zrP_IumX.js';
import './ElementResolution-B9KteuX8.js';

var searchSizes_stories = {
  component: "sp-search",
  title: "Search/Sizes"
};
const template = ({
  size
} = {}) => {
  return x`
        <sp-field-label for="name" size=${o(size)}>
            What would you like to find?
        </sp-field-label>
        <sp-search id="name" size=${o(size)} value="Sized Search">
            <sp-help-text size=${o(size)} slot="help-text">
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

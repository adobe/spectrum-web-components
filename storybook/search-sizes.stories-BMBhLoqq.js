import './sp-search-B_SqSYvH.js';
import './sp-field-label-B40wq_43.js';
import './sp-help-text-DWFD1g24.js';
import { x } from './lit-html-COgVUehj.js';
import { o } from './if-defined-DDJGFaN4.js';
import './sp-clear-button-DNyZLj51.js';
import './icon-cross-overrides.css-DxRjpzaf.js';
import './ButtonBase-D1SFSKU5.js';
import './like-anchor-Du7qlE4L.js';
import './define-element-BcIuQqj7.js';
import './lit-element-BulMEkr1.js';
import './focusable-CVpJvZMa.js';
import './focus-visible-D29Av9Xb.js';
import './observe-slot-text-7-FmzoJl.js';
import './mutation-controller-D2lT1xZk.js';
import './query-assigned-nodes-DAYI4epk.js';
import './base-u8Z1Hrsd.js';
import './query-DQF6X5qW.js';
import './custom-tag-B5IH9PTE.js';
import './IconBase-CXSc4767.js';
import './state-mjpVzfMZ.js';
import './sizedMixin-y7jJohI-.js';
import './sp-icon-search-BLPmcEG2.js';
import './custom-tag-Diwq7nXX.js';
import './Magnify-C5ml_uGy.js';
import './Textfield-B1itjp0X.js';
import './manage-help-text-CQxj8H8g.js';
import './condition-attribute-with-id-Cnyhr7Mp.js';
import './random-id-BST1Puzz.js';
import './icon-checkmark-overrides.css-C6yIzVJ0.js';
import './sp-icon-alert-Bqs_mlSc.js';
import './directive-Bn5c4u4M.js';
import './directive-helpers-icdnqxxc.js';
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

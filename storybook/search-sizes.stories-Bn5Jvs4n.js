import './sp-search-CPIE3vko.js';
import './sp-field-label-Ch5xsMdL.js';
import './sp-help-text-iIORwHTb.js';
import { x } from './lit-html-COgVUehj.js';
import { o } from './if-defined-DDJGFaN4.js';
import './sp-clear-button-CYctPnkO.js';
import './spectrum-icon-cross.css-CaX-pCP6.js';
import './ButtonBase-DFBdS0ya.js';
import './like-anchor-YCQdykQc.js';
import './define-element-B3-QvDZd.js';
import './lit-element-BulMEkr1.js';
import './focusable-CRwO5NCP.js';
import './focus-visible-D29Av9Xb.js';
import './observe-slot-text-BVY5OzXy.js';
import './mutation-controller-D2lT1xZk.js';
import './query-assigned-nodes-DAYI4epk.js';
import './base-u8Z1Hrsd.js';
import './query-DQF6X5qW.js';
import './custom-tag-B5IH9PTE.js';
import './IconBase-CmREmoFq.js';
import './state-DrGS5Kkk.js';
import './sizedMixin-Bh0Au8rG.js';
import './sp-icon-search-YMpiW59j.js';
import './custom-tag-Diwq7nXX.js';
import './Magnify-C5ml_uGy.js';
import './Textfield-BMbLjje3.js';
import './manage-help-text-CQxj8H8g.js';
import './condition-attribute-with-id-Cnyhr7Mp.js';
import './random-id-BST1Puzz.js';
import './spectrum-icon-checkmark.css-CQ7hyD1X.js';
import './sp-icon-alert-BbDxiD8e.js';
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

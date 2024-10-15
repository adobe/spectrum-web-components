import './sp-search-bMtdXkjZ.js';
import './sp-field-label-BRjuK3Zz.js';
import './sp-help-text-ChrDHk8f.js';
import { x } from './lit-html-COgVUehj.js';
import { o } from './if-defined-DDJGFaN4.js';
import './sp-clear-button-DN3Q9X9v.js';
import './spectrum-icon-cross.css-De2yj4bz.js';
import './ButtonBase-CEd57Nas.js';
import './like-anchor-Do3nVKPx.js';
import './define-element-M8Esl59B.js';
import './lit-element-BulMEkr1.js';
import './focusable-BNUROw9U.js';
import './focus-visible-D29Av9Xb.js';
import './observe-slot-text-DjQnHXP-.js';
import './mutation-controller-D2lT1xZk.js';
import './query-assigned-nodes-DAYI4epk.js';
import './base-u8Z1Hrsd.js';
import './query-DQF6X5qW.js';
import './custom-tag-B5IH9PTE.js';
import './IconBase-CZp8HczU.js';
import './state-CGRProwJ.js';
import './sizedMixin-Cn6CHTgo.js';
import './sp-icon-magnify-qx6in9vs.js';
import './custom-tag-Diwq7nXX.js';
import './Textfield-CEZ5MeaA.js';
import './manage-help-text-83_bseGo.js';
import './condition-attribute-with-id-Cnyhr7Mp.js';
import './random-id-BST1Puzz.js';
import './spectrum-icon-checkmark.css-B_NDvW-u.js';
import './sp-icon-alert-Cm537ALf.js';
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

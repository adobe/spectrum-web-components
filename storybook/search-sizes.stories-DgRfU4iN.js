import './sp-search-Boj3ltMH.js';
import './sp-field-label-CRRlpuuh.js';
import './sp-help-text-CaKSu0ym.js';
import { x } from './lit-html-COgVUehj.js';
import { o } from './if-defined-DDJGFaN4.js';
import './sp-clear-button-BKqP97a8.js';
import './spectrum-icon-cross.css-DdK5rkHs.js';
import './ButtonBase-CGWMAWIx.js';
import './like-anchor-BF2mSMlR.js';
import './define-element-BgsU7oi-.js';
import './lit-element-BulMEkr1.js';
import './focusable-BVZVIowx.js';
import './focus-visible-D29Av9Xb.js';
import './observe-slot-text-vBV0Xc1Q.js';
import './mutation-controller-D2lT1xZk.js';
import './query-assigned-nodes-DAYI4epk.js';
import './base-u8Z1Hrsd.js';
import './query-DQF6X5qW.js';
import './custom-tag-B5IH9PTE.js';
import './IconBase-B4NmWdYY.js';
import './sizedMixin-CHWWI7zp.js';
import './sp-icon-magnify-DBYopHCv.js';
import './custom-tag-Diwq7nXX.js';
import './Textfield-DHp3zspX.js';
import './manage-help-text-83_bseGo.js';
import './condition-attribute-with-id-Cnyhr7Mp.js';
import './random-id-BST1Puzz.js';
import './spectrum-icon-checkmark.css-BXqe6sWG.js';
import './sp-icon-alert-DGTYhaNN.js';
import './directive-Bn5c4u4M.js';
import './directive-helpers-icdnqxxc.js';
import './state-ClgQn688.js';
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

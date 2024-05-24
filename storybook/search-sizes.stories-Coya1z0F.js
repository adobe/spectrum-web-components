import './sp-search-CIvS8syu.js';
import './sp-field-label-Cb-osIn1.js';
import './sp-help-text-FO8Qt1gg.js';
import { x } from './lit-html-COgVUehj.js';
import { o } from './if-defined-DDJGFaN4.js';
import './sp-clear-button-CpElt4en.js';
import './spectrum-icon-cross.css-B3SUg3Nz.js';
import './ButtonBase-CGZcb8D1.js';
import './like-anchor-jgQaL5Z3.js';
import './define-element-BgSxDJnI.js';
import './lit-element-BL-po2DW.js';
import './focusable-oYNn1hNO.js';
import './focus-visible-D29Av9Xb.js';
import './observe-slot-text-DhKFT2ma.js';
import './mutation-controller-D2lT1xZk.js';
import './query-assigned-nodes-DAYI4epk.js';
import './base-u8Z1Hrsd.js';
import './query-DQF6X5qW.js';
import './custom-tag-B5IH9PTE.js';
import './IconBase-BDjZkcAb.js';
import './sizedMixin-Gf9Y2JDv.js';
import './sp-icon-magnify-B8Y7uzb0.js';
import './custom-tag-Diwq7nXX.js';
import './Textfield-BOv6nLc1.js';
import './manage-help-text-83_bseGo.js';
import './condition-attribute-with-id-Cnyhr7Mp.js';
import './random-id-BST1Puzz.js';
import './spectrum-icon-checkmark.css-BV1eOpgj.js';
import './sp-icon-alert-B-aFpws-.js';
import './directive-Bn5c4u4M.js';
import './directive-helpers-icdnqxxc.js';
import './state-C3gUXJnn.js';
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

import './sp-search-CLdigTyQ.js';
import './sp-field-label-HzV2nEXR.js';
import './sp-help-text-DgD4ZIm8.js';
import { x } from './lit-html-COgVUehj.js';
import { o } from './if-defined-DDJGFaN4.js';
import './sp-clear-button-L_mfyHCN.js';
import './spectrum-icon-cross.css-BQ7-mmrJ.js';
import './ButtonBase-DrEDDNGU.js';
import './like-anchor-Cds2yNgE.js';
import './define-element-CuLWp0nJ.js';
import './lit-element-BL-po2DW.js';
import './focusable-B74rwTMw.js';
import './focus-visible-D29Av9Xb.js';
import './observe-slot-text-bZJQT55z.js';
import './mutation-controller-D2lT1xZk.js';
import './query-assigned-nodes-DAYI4epk.js';
import './base-u8Z1Hrsd.js';
import './query-DQF6X5qW.js';
import './custom-tag-B5IH9PTE.js';
import './IconBase-BoJOjJXT.js';
import './sizedMixin-BYlU5N2O.js';
import './sp-icon-magnify-1NJgIVBV.js';
import './custom-tag-Diwq7nXX.js';
import './Textfield-C7am2oMy.js';
import './manage-help-text-83_bseGo.js';
import './condition-attribute-with-id-Cnyhr7Mp.js';
import './random-id-BST1Puzz.js';
import './spectrum-icon-checkmark.css-BSJio64e.js';
import './sp-icon-alert-wnSI2IJT.js';
import './directive-Bn5c4u4M.js';
import './directive-helpers-icdnqxxc.js';
import './state-BIupEmlh.js';
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

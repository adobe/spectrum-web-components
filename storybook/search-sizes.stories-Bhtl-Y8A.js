import './sp-search-C1F1DYYw.js';
import './sp-field-label-DbPd38Np.js';
import './sp-help-text-C5Z1m_qT.js';
import { x } from './lit-html-COgVUehj.js';
import { o } from './if-defined-DDJGFaN4.js';
import './sp-clear-button-D5bum6xP.js';
import './spectrum-icon-cross.css-BqSX9MeP.js';
import './ButtonBase-C0zwFpsa.js';
import './like-anchor-vdd4WF9w.js';
import './define-element-DeMmBNCp.js';
import './lit-element-BL-po2DW.js';
import './focusable-X_T5Q3Xx.js';
import './focus-visible-D29Av9Xb.js';
import './observe-slot-text-CWSEtJ4X.js';
import './mutation-controller-D2lT1xZk.js';
import './query-assigned-nodes-DAYI4epk.js';
import './base-u8Z1Hrsd.js';
import './query-DQF6X5qW.js';
import './custom-tag-B5IH9PTE.js';
import './IconBase-B8dJ3OhJ.js';
import './sizedMixin-Cu5eACid.js';
import './sp-icon-magnify-CaVW1ccA.js';
import './custom-tag-Diwq7nXX.js';
import './Textfield-R8KvEDYi.js';
import './manage-help-text-83_bseGo.js';
import './condition-attribute-with-id-Cnyhr7Mp.js';
import './random-id-BST1Puzz.js';
import './spectrum-icon-checkmark.css-tikpK1L5.js';
import './sp-icon-alert-C8ua4NmY.js';
import './directive-Bn5c4u4M.js';
import './directive-helpers-icdnqxxc.js';
import './state-BMiL7_R7.js';
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

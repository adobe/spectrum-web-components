import './sp-number-field-D0a5bWQW.js';
import './sp-field-label-BCAcbvCy.js';
import { x } from './lit-html-COgVUehj.js';
import { o } from './if-defined-DDJGFaN4.js';
import './NumberFormatter-BGiO5zHN.js';
import './streaming-listener-CmIYw2xv.js';
import './lit-element-BulMEkr1.js';
import './async-directive-DF6rMZJ5.js';
import './directive-helpers-icdnqxxc.js';
import './directive-Bn5c4u4M.js';
import './LanguageResolution-BeoILyI5.js';
import './icon-chevron-overrides.css-Bz8Nk10Z.js';
import './sp-icon-chevron100-CZ-Fj22K.js';
import './custom-tag-B5IH9PTE.js';
import './Chevron100-OyV1wQMZ.js';
import './IconBase-Z2IxLljH.js';
import './state-DMEtq-nM.js';
import './define-element-CbLZvyrL.js';
import './sp-icon-chevron200-cGHopOoS.js';
import './Chevron200-BFofHHDY.js';
import './sp-icon-chevron50-DeVcZxNH.js';
import './Chevron50-tZCv_9-Q.js';
import './sp-icon-chevron75-DZnRbMtf.js';
import './Chevron75-pV8sz8oX.js';
import './sp-infield-button-D9jwTKfA.js';
import './ButtonBase-ixFv8y71.js';
import './like-anchor-DD7X4GZI.js';
import './focusable-8mrYv4ai.js';
import './focus-visible-D29Av9Xb.js';
import './observe-slot-text-nvMXakjD.js';
import './mutation-controller-D2lT1xZk.js';
import './query-assigned-nodes-DAYI4epk.js';
import './base-u8Z1Hrsd.js';
import './query-DQF6X5qW.js';
import './sizedMixin-HBGPeo6s.js';
import './platform-r3Lf9REX.js';
import './Textfield-DSh0H6VQ.js';
import './manage-help-text-CQxj8H8g.js';
import './condition-attribute-with-id-Cnyhr7Mp.js';
import './random-id-BST1Puzz.js';
import './icon-checkmark-overrides.css-DFANn-jw.js';
import './sp-icon-alert-hlBBLxyR.js';
import './custom-tag-Diwq7nXX.js';
import './ElementResolution-B9KteuX8.js';

var numberFieldSizes_stories = {
  component: "sp-number-field",
  title: "Number Field/Sizes"
};
const template = ({
  size
} = {}) => {
  return x`
        <sp-field-label for="name" size=${o(size)}>
            Pick a number
        </sp-field-label>
        <sp-number-field
            id="name"
            size=${o(size)}
            value="100"
        ></sp-number-field>
    `;
};
const s = () => template({ size: "s" });
const noSize = () => template();
const m = () => template({ size: "m" });
const l = () => template({ size: "l" });
const XL = () => template({ size: "xl" });
const __namedExportsOrder = ['s', 'noSize', 'm', 'l', 'XL'];

export { XL, __namedExportsOrder, numberFieldSizes_stories as default, l, m, noSize, s };

import './sp-number-field-o0iefiWk.js';
import './sp-field-label-C3IFjzeK.js';
import { x } from './lit-html-COgVUehj.js';
import { o } from './if-defined-DDJGFaN4.js';
import './NumberFormatter-D3opD4iN.js';
import './streaming-listener-CmIYw2xv.js';
import './lit-element-BulMEkr1.js';
import './async-directive-DF6rMZJ5.js';
import './directive-helpers-icdnqxxc.js';
import './directive-Bn5c4u4M.js';
import './LanguageResolution-BeoILyI5.js';
import './icon-chevron-overrides.css-Bz8Nk10Z.js';
import './sp-icon-chevron100-D186oDGl.js';
import './custom-tag-B5IH9PTE.js';
import './Chevron100-OyV1wQMZ.js';
import './IconBase-lDJoNs5V.js';
import './state-DWB0FQGh.js';
import './define-element-BacrH-dd.js';
import './sp-icon-chevron200-C9BxMgAc.js';
import './Chevron200-BFofHHDY.js';
import './sp-icon-chevron50-CETwhwSz.js';
import './Chevron50-tZCv_9-Q.js';
import './sp-icon-chevron75-C-3xaudD.js';
import './Chevron75-pV8sz8oX.js';
import './sp-infield-button-C70FpQY9.js';
import './ButtonBase-DjpCcxMx.js';
import './like-anchor-BTdhD6VU.js';
import './focusable-Qk_nX99k.js';
import './focus-visible-D29Av9Xb.js';
import './observe-slot-text-CG33WdGp.js';
import './mutation-controller-D2lT1xZk.js';
import './query-assigned-nodes-DAYI4epk.js';
import './base-u8Z1Hrsd.js';
import './query-DQF6X5qW.js';
import './sizedMixin-D27dvb1g.js';
import './platform-r3Lf9REX.js';
import './Textfield-DwZXN-nE.js';
import './manage-help-text-CQxj8H8g.js';
import './condition-attribute-with-id-Cnyhr7Mp.js';
import './random-id-BST1Puzz.js';
import './icon-checkmark-overrides.css-CNlpiO4P.js';
import './sp-icon-alert-CTB_1kHZ.js';
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

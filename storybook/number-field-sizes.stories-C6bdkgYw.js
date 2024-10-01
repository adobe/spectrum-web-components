import './sp-number-field-RGZKr7ku.js';
import './sp-field-label-oZHlTsnx.js';
import { x } from './lit-html-COgVUehj.js';
import { o } from './if-defined-DDJGFaN4.js';
import './LanguageResolution-BeoILyI5.js';
import './streaming-listener-CmIYw2xv.js';
import './lit-element-BulMEkr1.js';
import './async-directive-DF6rMZJ5.js';
import './directive-helpers-icdnqxxc.js';
import './directive-Bn5c4u4M.js';
import './NumberFormatter-D3opD4iN.js';
import './sp-icon-chevron50-1BIfcIRv.js';
import './Chevron50-B5C39iR5.js';
import './custom-tag-B5IH9PTE.js';
import './IconBase-BIYWpr2G.js';
import './define-element-C_3bgzm7.js';
import './sp-icon-chevron75-3C3N8MIH.js';
import './Chevron75-hetG6rdn.js';
import './sp-icon-chevron100-BExoFMYC.js';
import './Chevron100-2ZEB0c-t.js';
import './sp-icon-chevron200-CILeLHoO.js';
import './Chevron200-DFmczfFD.js';
import './sp-infield-button-DkHXBbsS.js';
import './ButtonBase-Euqk2NbC.js';
import './like-anchor-B3Uz3TFY.js';
import './focusable-w-VMKDtH.js';
import './focus-visible-D29Av9Xb.js';
import './observe-slot-text-C6K935AT.js';
import './mutation-controller-D2lT1xZk.js';
import './query-assigned-nodes-DAYI4epk.js';
import './base-u8Z1Hrsd.js';
import './query-DQF6X5qW.js';
import './sizedMixin-BzkTbMb8.js';
import './platform-r3Lf9REX.js';
import './spectrum-icon-chevron.css-CeYia-Jd.js';
import './Textfield-CNzGwBlh.js';
import './manage-help-text-83_bseGo.js';
import './condition-attribute-with-id-Cnyhr7Mp.js';
import './random-id-BST1Puzz.js';
import './spectrum-icon-checkmark.css-NuoPlGW7.js';
import './sp-icon-alert-Cbypiip7.js';
import './custom-tag-Diwq7nXX.js';
import './state-DrummH0c.js';
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

import './sp-number-field-B-HCPALG.js';
import './sp-field-label-wNOhSIef.js';
import { x } from './lit-html-COgVUehj.js';
import { o } from './if-defined-DDJGFaN4.js';
import './NumberFormatter-BGiO5zHN.js';
import './streaming-listener-CmIYw2xv.js';
import './lit-element-BulMEkr1.js';
import './async-directive-DF6rMZJ5.js';
import './directive-helpers-icdnqxxc.js';
import './directive-Bn5c4u4M.js';
import './LanguageResolution-BeoILyI5.js';
import './spectrum-icon-chevron.css-CeYia-Jd.js';
import './sp-icon-chevron100-DUm3RyOH.js';
import './custom-tag-B5IH9PTE.js';
import './Chevron100-OyV1wQMZ.js';
import './IconBase-DXeaJSV5.js';
import './state-CG9Kyp94.js';
import './define-element-B7NoFsQI.js';
import './sp-icon-chevron200-kRfztc0g.js';
import './Chevron200-BFofHHDY.js';
import './sp-icon-chevron50-CNKc4-lA.js';
import './Chevron50-tZCv_9-Q.js';
import './sp-icon-chevron75-CMKobdOz.js';
import './Chevron75-pV8sz8oX.js';
import './sp-infield-button-DK1cG8NW.js';
import './ButtonBase-CVCDQq4P.js';
import './like-anchor-BQR4wmj8.js';
import './focusable-CtU8nZTr.js';
import './focus-visible-D29Av9Xb.js';
import './observe-slot-text-DVS1yx82.js';
import './mutation-controller-D2lT1xZk.js';
import './query-assigned-nodes-DAYI4epk.js';
import './base-u8Z1Hrsd.js';
import './query-DQF6X5qW.js';
import './sizedMixin-SWvQmBKY.js';
import './platform-r3Lf9REX.js';
import './Textfield-z2pLfsYE.js';
import './manage-help-text-CQxj8H8g.js';
import './condition-attribute-with-id-Cnyhr7Mp.js';
import './random-id-BST1Puzz.js';
import './spectrum-icon-checkmark.css-B9su_ZeY.js';
import './sp-icon-alert-DAp49GVT.js';
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

import './sp-search-g9ZuM1R7.js';
import './sp-field-label-wNOhSIef.js';
import './sp-help-text-DZ_9cuN_.js';
import { x } from './lit-html-COgVUehj.js';
import { o } from './if-defined-DDJGFaN4.js';
import './sp-clear-button-kgYscJZS.js';
import './spectrum-icon-cross.css-cEqpDoFW.js';
import './ButtonBase-CVCDQq4P.js';
import './like-anchor-BQR4wmj8.js';
import './define-element-B7NoFsQI.js';
import './lit-element-BulMEkr1.js';
import './focusable-CtU8nZTr.js';
import './focus-visible-D29Av9Xb.js';
import './observe-slot-text-DVS1yx82.js';
import './mutation-controller-D2lT1xZk.js';
import './query-assigned-nodes-DAYI4epk.js';
import './base-u8Z1Hrsd.js';
import './query-DQF6X5qW.js';
import './custom-tag-B5IH9PTE.js';
import './IconBase-DXeaJSV5.js';
import './state-CG9Kyp94.js';
import './sizedMixin-SWvQmBKY.js';
import './sp-icon-search-CqjZMKrb.js';
import './custom-tag-Diwq7nXX.js';
import './Magnify-C5ml_uGy.js';
import './Textfield-z2pLfsYE.js';
import './manage-help-text-CQxj8H8g.js';
import './condition-attribute-with-id-Cnyhr7Mp.js';
import './random-id-BST1Puzz.js';
import './spectrum-icon-checkmark.css-B9su_ZeY.js';
import './sp-icon-alert-DAp49GVT.js';
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

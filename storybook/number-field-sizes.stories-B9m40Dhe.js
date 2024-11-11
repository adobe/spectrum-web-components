import './sp-number-field-CQgOkZ7S.js';
import './sp-field-label-B40wq_43.js';
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
import './sp-icon-chevron100-CJ4lly5n.js';
import './custom-tag-B5IH9PTE.js';
import './Chevron100-OyV1wQMZ.js';
import './IconBase-CXSc4767.js';
import './state-mjpVzfMZ.js';
import './define-element-BcIuQqj7.js';
import './sp-icon-chevron200-Da-uTu71.js';
import './Chevron200-BFofHHDY.js';
import './sp-icon-chevron50-CktRfEl4.js';
import './Chevron50-tZCv_9-Q.js';
import './sp-icon-chevron75-BjllsNfO.js';
import './Chevron75-pV8sz8oX.js';
import './sp-infield-button-VSlCsT-e.js';
import './ButtonBase-D1SFSKU5.js';
import './like-anchor-Du7qlE4L.js';
import './focusable-CVpJvZMa.js';
import './focus-visible-D29Av9Xb.js';
import './observe-slot-text-7-FmzoJl.js';
import './mutation-controller-D2lT1xZk.js';
import './query-assigned-nodes-DAYI4epk.js';
import './base-u8Z1Hrsd.js';
import './query-DQF6X5qW.js';
import './sizedMixin-y7jJohI-.js';
import './platform-r3Lf9REX.js';
import './Textfield-B1itjp0X.js';
import './manage-help-text-CQxj8H8g.js';
import './condition-attribute-with-id-Cnyhr7Mp.js';
import './random-id-BST1Puzz.js';
import './icon-checkmark-overrides.css-C6yIzVJ0.js';
import './sp-icon-alert-Bqs_mlSc.js';
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

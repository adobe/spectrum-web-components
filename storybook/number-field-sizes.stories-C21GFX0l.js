import './sp-number-field-CbW9EIcH.js';
import './sp-field-label-Ch5xsMdL.js';
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
import './sp-icon-chevron100-BDtqmJ8W.js';
import './custom-tag-B5IH9PTE.js';
import './Chevron100-OyV1wQMZ.js';
import './IconBase-CmREmoFq.js';
import './state-DrGS5Kkk.js';
import './define-element-B3-QvDZd.js';
import './sp-icon-chevron200-DglmmkLM.js';
import './Chevron200-BFofHHDY.js';
import './sp-icon-chevron50-DUEn5TJn.js';
import './Chevron50-tZCv_9-Q.js';
import './sp-icon-chevron75-BrzqWj_F.js';
import './Chevron75-pV8sz8oX.js';
import './sp-infield-button-bMcB7VXK.js';
import './ButtonBase-DFBdS0ya.js';
import './like-anchor-YCQdykQc.js';
import './focusable-CRwO5NCP.js';
import './focus-visible-D29Av9Xb.js';
import './observe-slot-text-BVY5OzXy.js';
import './mutation-controller-D2lT1xZk.js';
import './query-assigned-nodes-DAYI4epk.js';
import './base-u8Z1Hrsd.js';
import './query-DQF6X5qW.js';
import './sizedMixin-Bh0Au8rG.js';
import './platform-r3Lf9REX.js';
import './Textfield-BMbLjje3.js';
import './manage-help-text-CQxj8H8g.js';
import './condition-attribute-with-id-Cnyhr7Mp.js';
import './random-id-BST1Puzz.js';
import './spectrum-icon-checkmark.css-CQ7hyD1X.js';
import './sp-icon-alert-BbDxiD8e.js';
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

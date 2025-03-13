import './sp-number-field-DDXZmRFq.js';
import './sp-field-label-Bbgi80Vq.js';
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
import './sp-icon-chevron100-CWW9sooh.js';
import './custom-tag-B5IH9PTE.js';
import './Chevron100-OyV1wQMZ.js';
import './IconBase-BC0FCRBc.js';
import './state-ChcedIDn.js';
import './define-element-2VgsDjbW.js';
import './sp-icon-chevron200-CV9L0bkB.js';
import './Chevron200-BFofHHDY.js';
import './sp-icon-chevron50-DnIb1wIY.js';
import './Chevron50-tZCv_9-Q.js';
import './sp-icon-chevron75-DkxYeH7v.js';
import './Chevron75-pV8sz8oX.js';
import './sp-infield-button-CFzgW1k5.js';
import './ButtonBase-DcuiXj8E.js';
import './like-anchor-BBONMzyI.js';
import './focusable-D81tHnNY.js';
import './focus-visible-D29Av9Xb.js';
import './observe-slot-text-Mz9mFVuX.js';
import './mutation-controller-D2lT1xZk.js';
import './query-assigned-nodes-DAYI4epk.js';
import './base-u8Z1Hrsd.js';
import './query-DQF6X5qW.js';
import './sizedMixin-D4VoaNlz.js';
import './platform-r3Lf9REX.js';
import './Textfield-DWd10G-B.js';
import './manage-help-text-CQxj8H8g.js';
import './condition-attribute-with-id-Cnyhr7Mp.js';
import './random-id-BST1Puzz.js';
import './spectrum-icon-checkmark.css-CmBPoiLZ.js';
import './sp-icon-alert-2CW9YlXi.js';
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

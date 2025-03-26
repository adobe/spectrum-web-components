import './sp-number-field-tityaMZy.js';
import './sp-field-label-fJh5myzn.js';
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
import './sp-icon-chevron100-6ixyTd8T.js';
import './custom-tag-B5IH9PTE.js';
import './Chevron100-OyV1wQMZ.js';
import './IconBase-luFyVpTn.js';
import './state-a9qXQZw8.js';
import './define-element-Bun2ZgR-.js';
import './sp-icon-chevron200-BySBqjmj.js';
import './Chevron200-BFofHHDY.js';
import './sp-icon-chevron50-7BtzHpHd.js';
import './Chevron50-tZCv_9-Q.js';
import './sp-icon-chevron75-DNCaN36e.js';
import './Chevron75-pV8sz8oX.js';
import './sp-infield-button-D5oIpMpm.js';
import './ButtonBase-CsEYgJMd.js';
import './like-anchor-BaNwPfYf.js';
import './focusable-y67P8eQI.js';
import './focus-visible-D29Av9Xb.js';
import './observe-slot-text-B-N3zGRD.js';
import './mutation-controller-D2lT1xZk.js';
import './query-assigned-nodes-DAYI4epk.js';
import './base-u8Z1Hrsd.js';
import './query-DQF6X5qW.js';
import './sizedMixin-BPhwmt-S.js';
import './platform-r3Lf9REX.js';
import './Textfield-BRDfwIcl.js';
import './manage-help-text-CQxj8H8g.js';
import './condition-attribute-with-id-Cnyhr7Mp.js';
import './random-id-BST1Puzz.js';
import './spectrum-icon-checkmark.css-Df67pkTu.js';
import './sp-icon-alert-C9LsQVsg.js';
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

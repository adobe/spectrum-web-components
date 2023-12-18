import './sp-number-field-395a48c5.js';
import './sp-field-label-81c2b9be.js';
import { x } from './lit-html-126adc72.js';
import { l as l$1 } from './if-defined-ae83b405.js';
import './LanguageResolution-630dfe34.js';
import './streaming-listener-70cd7ec3.js';
import './lit-element-9354aa77.js';
import './async-directive-e6357bae.js';
import './directive-helpers-aa9210f2.js';
import './directive-2bb7789e.js';
import './import-76526f12.js';
import './sp-icon-chevron200-0bc4f1fa.js';
import './Chevron200-ff933a30.js';
import './custom-tag-c228386e.js';
import './IconBase-7772fb01.js';
import './define-element-7dc6a572.js';
import './sp-icon-chevron75-38b5bd8d.js';
import './Chevron75-0eaeeeac.js';
import './sp-icon-chevron100-19c0ec20.js';
import './Chevron100-6f55b923.js';
import './sp-infield-button-3b324763.js';
import './ButtonBase-dba358cb.js';
import './like-anchor-8f97823d.js';
import './focusable-391b57ba.js';
import './focus-visible-03398d98.js';
import './observe-slot-text-769cbc70.js';
import './mutation-controller-81a30f7f.js';
import './query-assigned-nodes-d63886c3.js';
import './base-511c8c11.js';
import './sizedMixin-3d08a58f.js';
import './query-d0113d5a.js';
import './platform-a32a5617.js';
import './spectrum-icon-chevron.css-d3283c08.js';
import './Textfield-bbb91e08.js';
import './manage-help-text-39f4c7ea.js';
import './condition-attribute-with-id-62869347.js';
import './spectrum-icon-checkmark.css-ebf23520.js';
import './sp-icon-alert-f7ff11b9.js';
import './custom-tag-b5526d41.js';
import './state-3927c84f.js';
import './ElementResolution-b58a0825.js';

var numberFieldSizes_stories = {
  component: "sp-number-field",
  title: "Number Field/Sizes"
};
const template = ({
  size
} = {}) => {
  return x`
        <sp-field-label for="name" size=${l$1(size)}>
            Pick a number
        </sp-field-label>
        <sp-number-field
            id="name"
            size=${l$1(size)}
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

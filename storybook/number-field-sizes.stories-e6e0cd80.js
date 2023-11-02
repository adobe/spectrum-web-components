import './sp-number-field-220aca5a.js';
import './sp-field-label-05f39d18.js';
import { x } from './lit-html-126adc72.js';
import { l as l$1 } from './if-defined-ae83b405.js';
import './LanguageResolution-630dfe34.js';
import './streaming-listener-70cd7ec3.js';
import './lit-element-9354aa77.js';
import './async-directive-e6357bae.js';
import './directive-helpers-aa9210f2.js';
import './directive-2bb7789e.js';
import './import-76526f12.js';
import './sp-icon-chevron200-e8a363a0.js';
import './Chevron200-ff933a30.js';
import './custom-tag-c228386e.js';
import './IconBase-fb970ebf.js';
import './define-element-43d4edd5.js';
import './sp-icon-chevron75-3e5b16b7.js';
import './Chevron75-0eaeeeac.js';
import './sp-icon-chevron100-cbc6bc68.js';
import './Chevron100-6f55b923.js';
import './sp-infield-button-e1966484.js';
import './ButtonBase-a71d6ce3.js';
import './like-anchor-0c856f1c.js';
import './focusable-d03021f6.js';
import './focus-visible-03398d98.js';
import './observe-slot-text-dbd83f39.js';
import './mutation-controller-81a30f7f.js';
import './query-assigned-nodes-c8aaaadd.js';
import './base-511c8c11.js';
import './sizedMixin-281e4c72.js';
import './query-d0113d5a.js';
import './platform-a32a5617.js';
import './spectrum-icon-chevron.css-d3283c08.js';
import './Textfield-a0f64496.js';
import './manage-help-text-39f4c7ea.js';
import './condition-attribute-with-id-62869347.js';
import './spectrum-icon-checkmark.css-c19acd0f.js';
import './sp-icon-alert-d34893d7.js';
import './custom-tag-b5526d41.js';
import './state-0afa7555.js';
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

import './sp-number-field-4ed9fe34.js';
import './sp-field-label-eb7b786c.js';
import { x } from './lit-html-126adc72.js';
import { l as l$1 } from './if-defined-ae83b405.js';
import './LanguageResolution-630dfe34.js';
import './streaming-listener-70cd7ec3.js';
import './lit-element-9354aa77.js';
import './async-directive-e6357bae.js';
import './directive-helpers-aa9210f2.js';
import './directive-2bb7789e.js';
import './import-76526f12.js';
import './sp-icon-chevron200-3b73351b.js';
import './Chevron200-62f4dc79.js';
import './custom-tag-c228386e.js';
import './IconBase-d00b1a4e.js';
import './define-element-e64f5ea4.js';
import './sp-icon-chevron100-232e7a83.js';
import './Chevron100-6f55b923.js';
import './sp-action-button-a3324e56.js';
import './sp-icon-corner-triangle300-e41520a7.js';
import './CornerTriangle300-488cc3d0.js';
import './ButtonBase-997f7a09.js';
import './like-anchor-72ed571c.js';
import './focusable-6cc2c3b2.js';
import './focus-visible-03398d98.js';
import './observe-slot-text-16ab7d67.js';
import './mutation-controller-81a30f7f.js';
import './query-assigned-nodes-b8bfe193.js';
import './base-511c8c11.js';
import './sizedMixin-43fe982f.js';
import './query-d0113d5a.js';
import './platform-a32a5617.js';
import './spectrum-icon-chevron.css-6d5a7762.js';
import './Textfield-f4934212.js';
import './manage-help-text-39f4c7ea.js';
import './condition-attribute-with-id-62869347.js';
import './spectrum-icon-checkmark.css-359949f2.js';
import './sp-icon-alert-248f0d52.js';
import './custom-tag-b5526d41.js';
import './state-5175507d.js';
import './ElementResolution-7469f128.js';

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

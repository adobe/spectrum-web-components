import './sp-number-field-fea6e15e.js';
import './sp-field-label-b445efc6.js';
import { x } from './lit-html-126adc72.js';
import { l as l$1 } from './if-defined-ae83b405.js';
import './LanguageResolution-630dfe34.js';
import './streaming-listener-70cd7ec3.js';
import './lit-element-9354aa77.js';
import './async-directive-e6357bae.js';
import './directive-helpers-aa9210f2.js';
import './directive-2bb7789e.js';
import './import-76526f12.js';
import './sp-icon-chevron200-2c4b4eb6.js';
import './Chevron200-ff933a30.js';
import './custom-tag-c228386e.js';
import './IconBase-d9572ad8.js';
import './define-element-617dba69.js';
import './sp-icon-chevron75-1f90ff13.js';
import './Chevron75-0eaeeeac.js';
import './sp-icon-chevron100-b4103ec6.js';
import './Chevron100-6f55b923.js';
import './sp-infield-button-22990ce1.js';
import './ButtonBase-f782d237.js';
import './like-anchor-86192240.js';
import './focusable-c7e64029.js';
import './focus-visible-03398d98.js';
import './observe-slot-text-03ae7746.js';
import './mutation-controller-81a30f7f.js';
import './query-assigned-nodes-c8b87639.js';
import './base-511c8c11.js';
import './sizedMixin-29c62bc2.js';
import './query-d0113d5a.js';
import './platform-a32a5617.js';
import './spectrum-icon-chevron.css-d3283c08.js';
import './Textfield-773874be.js';
import './manage-help-text-39f4c7ea.js';
import './condition-attribute-with-id-62869347.js';
import './spectrum-icon-checkmark.css-a8f99d4c.js';
import './sp-icon-alert-4033bfea.js';
import './custom-tag-b5526d41.js';
import './state-59f591cf.js';
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

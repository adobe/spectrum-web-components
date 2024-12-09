import './sp-textfield-CT9oJhIU.js';
import './sp-field-label-DqJ49MrI.js';
import './sp-help-text-BGc1bNcO.js';
import { x } from './lit-html-COgVUehj.js';
import { o } from './if-defined-DDJGFaN4.js';
import './Textfield-sgN8_g7r.js';
import './manage-help-text-CQxj8H8g.js';
import './condition-attribute-with-id-Cnyhr7Mp.js';
import './random-id-BST1Puzz.js';
import './focusable-CVpJvZMa.js';
import './focus-visible-D29Av9Xb.js';
import './define-element-BcIuQqj7.js';
import './lit-element-BulMEkr1.js';
import './icon-checkmark-overrides.css-CxCVTR9h.js';
import './custom-tag-B5IH9PTE.js';
import './IconBase-DryES_A6.js';
import './state-mjpVzfMZ.js';
import './sp-icon-alert-Bb-MfF4m.js';
import './custom-tag-Diwq7nXX.js';
import './directive-Bn5c4u4M.js';
import './directive-helpers-icdnqxxc.js';
import './sizedMixin-y7jJohI-.js';
import './query-DQF6X5qW.js';
import './base-u8Z1Hrsd.js';
import './ElementResolution-B9KteuX8.js';

var textareaSizes_stories = {
  component: "sp-textfield",
  title: "Textarea/Sizes"
};
const template = ({
  size
} = {}) => {
  return x`
        <sp-field-label for="name" size=${o(size)}>
            Enter your life story
        </sp-field-label>
        <sp-textfield
            id="name"
            multiline
            size=${o(size)}
            value="Sized Textarea"
        >
            <sp-help-text size=${o(size)} slot="help-text">
                Spare no expense.
            </sp-help-text>
        </sp-textfield>
    `;
};
const s = () => template({ size: "s" });
const noSize = () => template();
const m = () => template({ size: "m" });
const l = () => template({ size: "l" });
const XL = () => template({ size: "xl" });
const __namedExportsOrder = ['s', 'noSize', 'm', 'l', 'XL'];

export { XL, __namedExportsOrder, textareaSizes_stories as default, l, m, noSize, s };

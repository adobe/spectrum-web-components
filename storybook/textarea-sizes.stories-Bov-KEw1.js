import './sp-textfield-A7fHYFx7.js';
import './sp-field-label-CZ0naTeT.js';
import './sp-help-text-LBPqZMr_.js';
import { x } from './lit-html-COgVUehj.js';
import { o } from './if-defined-DDJGFaN4.js';
import './Textfield-Ip91EHmq.js';
import './manage-help-text-83_bseGo.js';
import './condition-attribute-with-id-Cnyhr7Mp.js';
import './random-id-BST1Puzz.js';
import './focusable-BHn_FpaM.js';
import './focus-visible-D29Av9Xb.js';
import './define-element-CXRu6sWi.js';
import './lit-element-BL-po2DW.js';
import './spectrum-icon-checkmark.css-BQx7WYUd.js';
import './custom-tag-B5IH9PTE.js';
import './IconBase-LhykbR0q.js';
import './sp-icon-alert-Q6xYlBo2.js';
import './custom-tag-Diwq7nXX.js';
import './directive-Bn5c4u4M.js';
import './directive-helpers-icdnqxxc.js';
import './sizedMixin-BKu_31Nm.js';
import './state-dMhNMyLY.js';
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

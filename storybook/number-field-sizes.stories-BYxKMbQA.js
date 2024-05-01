import './sp-number-field-CvIN9v0s.js';
import './sp-field-label-d2_767OQ.js';
import { x } from './lit-html-COgVUehj.js';
import { o } from './if-defined-DDJGFaN4.js';
import './LanguageResolution-BeoILyI5.js';
import './streaming-listener-BPAf_aKW.js';
import './lit-element-BL-po2DW.js';
import './async-directive-DF6rMZJ5.js';
import './directive-helpers-icdnqxxc.js';
import './directive-Bn5c4u4M.js';
import './import-D5KtMJTP.js';
import './sp-icon-chevron50-6lWptSb5.js';
import './Chevron50-B5C39iR5.js';
import './custom-tag-B5IH9PTE.js';
import './IconBase-qDHHH3Ln.js';
import './define-element-ByMWMcVd.js';
import './sp-icon-chevron75-CLlsSQ9G.js';
import './Chevron75-hetG6rdn.js';
import './sp-icon-chevron100-1NlnalYT.js';
import './Chevron100-2ZEB0c-t.js';
import './sp-icon-chevron200-CtiaUWmt.js';
import './Chevron200-DFmczfFD.js';
import './sp-infield-button-DYssHhl0.js';
import './ButtonBase-DVG8snfH.js';
import './like-anchor-3x3vwb8N.js';
import './focusable-CCdy673g.js';
import './focus-visible-xZLLtEay.js';
import './observe-slot-text-DSYHkFFl.js';
import './mutation-controller-D2lT1xZk.js';
import './query-assigned-nodes-DAYI4epk.js';
import './base-u8Z1Hrsd.js';
import './query-DQF6X5qW.js';
import './sizedMixin-C1lD98vT.js';
import './platform-Sl3sjF_S.js';
import './spectrum-icon-chevron.css-C5c2rYXA.js';
import './Textfield-D4Mirr1j.js';
import './manage-help-text-83_bseGo.js';
import './condition-attribute-with-id-Cnyhr7Mp.js';
import './random-id-BST1Puzz.js';
import './spectrum-icon-checkmark.css-B-kvSI14.js';
import './sp-icon-alert-CefcIj5Q.js';
import './custom-tag-Diwq7nXX.js';
import './state-DGkVCdxP.js';
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

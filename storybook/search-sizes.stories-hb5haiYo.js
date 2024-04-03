import './sp-search-DkEhaqdt.js';
import './sp-field-label-zgYSrBxX.js';
import './sp-help-text-7NegzDWq.js';
import { x } from './lit-html-GmIhAbMP.js';
import { l as l$1 } from './if-defined-pV6JZKXB.js';
import './sp-clear-button-9xyPyYU6.js';
import './spectrum-icon-cross.css-fyatyW0U.js';
import './ButtonBase-75QTpX6n.js';
import './like-anchor-aNXO7yKS.js';
import './define-element-2SKaLcgv.js';
import './lit-element-xBOPiTek.js';
import './focusable-n0Bfj6en.js';
import './focus-visible-68QWcOy-.js';
import './observe-slot-text-mc0YsU0d.js';
import './mutation-controller-KeE5MDSl.js';
import './query-assigned-nodes-jGvx5qKR.js';
import './base-STdhtiz1.js';
import './query-assigned-elements-1m6Cs7Ix.js';
import './query-JMOstM_r.js';
import './custom-tag-z2Xx81l9.js';
import './IconBase-6HeAKn4X.js';
import './sizedMixin-i8vReDsT.js';
import './sp-icon-magnify-I5n_8A3q.js';
import './custom-tag-JXLWq-Sj.js';
import './Textfield-LLFln75U.js';
import './manage-help-text-f9KNpcsn.js';
import './condition-attribute-with-id-nb2zon-s.js';
import './random-id-M2k-wjyE.js';
import './spectrum-icon-checkmark.css-1U1WWTA-.js';
import './sp-icon-alert-vqzws53s.js';
import './directive-C1gRZbRe.js';
import './directive-helpers-WPlpPO1F.js';
import './state-q_CC9QX6.js';
import './ElementResolution-TTOqkMM7.js';

var searchSizes_stories = {
  component: "sp-search",
  title: "Search/Sizes"
};
const template = ({
  size
} = {}) => {
  return x`
        <sp-field-label for="name" size=${l$1(size)}>
            What would you like to find?
        </sp-field-label>
        <sp-search id="name" size=${l$1(size)} value="Sized Search">
            <sp-help-text size=${l$1(size)} slot="help-text">
                Anything within reason...
            </sp-help-text>
        </sp-search>
    `;
};
const s = () => template({ size: "s" });
const noSize = () => template();
const m = () => template({ size: "m" });
const l = () => template({ size: "l" });
const XL = () => template({ size: "xl" });
const __namedExportsOrder = ['s', 'noSize', 'm', 'l', 'XL'];

export { XL, __namedExportsOrder, searchSizes_stories as default, l, m, noSize, s };

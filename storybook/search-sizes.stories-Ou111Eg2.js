import './sp-search--nSk9hPm.js';
import './sp-field-label-MGGfIObj.js';
import './sp-help-text-fgzTjtTp.js';
import { x } from './lit-html-GmIhAbMP.js';
import { l as l$1 } from './if-defined-pV6JZKXB.js';
import './sp-clear-button-H83TLSVa.js';
import './spectrum-icon-cross.css-Lnx-mdgp.js';
import './ButtonBase-jlLlzNEe.js';
import './like-anchor-Gwp5ooDH.js';
import './define-element-s04w2teA.js';
import './lit-element-xBOPiTek.js';
import './focusable-mx5LgJ38.js';
import './focus-visible-68QWcOy-.js';
import './observe-slot-text-eZT7feU8.js';
import './mutation-controller-KeE5MDSl.js';
import './query-assigned-nodes-u86daeBT.js';
import './base-STdhtiz1.js';
import './sizedMixin-D9_yg9Lr.js';
import './query-JMOstM_r.js';
import './custom-tag-z2Xx81l9.js';
import './IconBase-_0RU6XqS.js';
import './sp-icon-magnify-aSRg0u0J.js';
import './custom-tag-JXLWq-Sj.js';
import './Textfield-DcG6jznK.js';
import './manage-help-text-kfeeNmRL.js';
import './condition-attribute-with-id-nb2zon-s.js';
import './spectrum-icon-checkmark.css-T4LCyo5k.js';
import './sp-icon-alert-CNIIZm3E.js';
import './directive-C1gRZbRe.js';
import './directive-helpers-WPlpPO1F.js';
import './state-BSEind79.js';
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

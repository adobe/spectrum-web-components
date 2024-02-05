import './sp-search-nk4z4dsI.js';
import './sp-field-label--CBS1ijW.js';
import './sp-help-text-l3IJIhWn.js';
import { x } from './lit-html-GmIhAbMP.js';
import { l as l$1 } from './if-defined-pV6JZKXB.js';
import './sp-clear-button-Ztp7NYGp.js';
import './spectrum-icon-cross.css-qXBF5GML.js';
import './ButtonBase-H8ie1_xx.js';
import './like-anchor-J4T73PxR.js';
import './define-element-2O4ZhTAw.js';
import './lit-element-xBOPiTek.js';
import './focusable-WZR9a5Bc.js';
import './focus-visible-68QWcOy-.js';
import './observe-slot-text-ybW1xuBS.js';
import './mutation-controller-KeE5MDSl.js';
import './query-assigned-nodes-aJM_vOZ4.js';
import './base-STdhtiz1.js';
import './sizedMixin-mnNfh2gr.js';
import './query-JMOstM_r.js';
import './custom-tag-z2Xx81l9.js';
import './IconBase-TDmbHQaH.js';
import './sp-icon-magnify-3v1Chz30.js';
import './custom-tag-JXLWq-Sj.js';
import './Textfield-rAX4ihoL.js';
import './manage-help-text-kfeeNmRL.js';
import './condition-attribute-with-id-nb2zon-s.js';
import './spectrum-icon-checkmark.css-3xBPG61g.js';
import './sp-icon-alert-Bolxr-zN.js';
import './directive-C1gRZbRe.js';
import './directive-helpers-WPlpPO1F.js';
import './state-fuvayDA0.js';
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

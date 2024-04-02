import './sp-number-field-wilcTPCU.js';
import './sp-field-label-LR663cei.js';
import { x } from './lit-html-GmIhAbMP.js';
import { l as l$1 } from './if-defined-pV6JZKXB.js';
import './LanguageResolution-433GhF-m.js';
import './streaming-listener-99YRN1c8.js';
import './lit-element-xBOPiTek.js';
import './async-directive-cHMFxS7f.js';
import './directive-helpers-WPlpPO1F.js';
import './directive-C1gRZbRe.js';
import './import-mabg3nA1.js';
import './sp-icon-chevron50-igO-rqhi.js';
import './Chevron50-QkUmZTlQ.js';
import './custom-tag-z2Xx81l9.js';
import './IconBase-EFa3DHxz.js';
import './define-element-tO8-r1bu.js';
import './sp-icon-chevron75-HpwXQK2K.js';
import './Chevron75-ykt7YsHW.js';
import './sp-icon-chevron100-byRnlRuE.js';
import './Chevron100-ok1mOHjI.js';
import './sp-icon-chevron200-mXgJDmZj.js';
import './Chevron200-uafXU_JZ.js';
import './sp-infield-button-J1tc9FoG.js';
import './ButtonBase--K-lWDuL.js';
import './like-anchor-A-VxslPW.js';
import './focusable-GZ06kf6F.js';
import './focus-visible-68QWcOy-.js';
import './observe-slot-text-RiUvi5fT.js';
import './mutation-controller-KeE5MDSl.js';
import './query-assigned-nodes-jGvx5qKR.js';
import './base-STdhtiz1.js';
import './query-assigned-elements-1m6Cs7Ix.js';
import './query-JMOstM_r.js';
import './sizedMixin-JAQz02f5.js';
import './platform-c1C9ET3y.js';
import './spectrum-icon-chevron.css-hA8DP86t.js';
import './Textfield-tevcOEW2.js';
import './manage-help-text-f9KNpcsn.js';
import './condition-attribute-with-id-nb2zon-s.js';
import './random-id-M2k-wjyE.js';
import './spectrum-icon-checkmark.css-vEh5gvyq.js';
import './sp-icon-alert-HIZE6wdL.js';
import './custom-tag-JXLWq-Sj.js';
import './state-W6so4P5i.js';
import './ElementResolution-TTOqkMM7.js';

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

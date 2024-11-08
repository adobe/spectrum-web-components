import './sp-tags-BOz5VtwE.js';
import './sp-avatar-BvNf_ugL.js';
import './sp-icon-B_FQdtNF.js';
import './sp-icon-magnify-CWF3xmgz.js';
import { x } from './lit-html-COgVUehj.js';
import './define-element-BacrH-dd.js';
import './lit-element-BulMEkr1.js';
import './focus-visible-D29Av9Xb.js';
import './RovingTabindex-Bi74mHtS.js';
import './FocusGroup-DQHKf855.js';
import './sp-clear-button-7TIkdbdf.js';
import './icon-cross-overrides.css-B1b1jEW8.js';
import './ButtonBase-DjpCcxMx.js';
import './like-anchor-BTdhD6VU.js';
import './if-defined-DDJGFaN4.js';
import './focusable-Qk_nX99k.js';
import './observe-slot-text-CG33WdGp.js';
import './mutation-controller-D2lT1xZk.js';
import './query-assigned-nodes-DAYI4epk.js';
import './base-u8Z1Hrsd.js';
import './query-DQF6X5qW.js';
import './custom-tag-B5IH9PTE.js';
import './IconBase-lDJoNs5V.js';
import './state-DWB0FQGh.js';
import './sizedMixin-D27dvb1g.js';
import './custom-tag-Diwq7nXX.js';
import './Magnify-C5ml_uGy.js';

var tagsSizes_stories = {
  title: "Tags/Sizes",
  component: "sp-tags"
};
const template = ({ size }) => x`
    <sp-tags>
        <sp-tag deletable size=${size}>
            Tag 1
            <sp-icon-magnify slot="icon"></sp-icon-magnify>
        </sp-tag>
        <sp-tag invalid deletable size=${size}>
            Tag 2
            <sp-icon-magnify slot="icon"></sp-icon-magnify>
        </sp-tag>
        <sp-tag disabled deletable size=${size}>
            Tag 3
            <sp-icon-magnify slot="icon"></sp-icon-magnify>
        </sp-tag>
    </sp-tags>
`;
const s = () => template({ size: "s" });
const m = () => template({ size: "m" });
const l = () => template({ size: "l" });
const __namedExportsOrder = ['s', 'm', 'l'];

export { __namedExportsOrder, tagsSizes_stories as default, l, m, s };

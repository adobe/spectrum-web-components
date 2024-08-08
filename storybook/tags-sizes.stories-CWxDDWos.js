import './sp-tags-C2e5f50X.js';
import './sp-avatar-BdB7ImcC.js';
import './sp-icon-CWEX1gTR.js';
import './sp-icon-magnify-D5t0pL7C.js';
import { x } from './lit-html-COgVUehj.js';
import './define-element-DfDMCiEa.js';
import './lit-element-BL-po2DW.js';
import './focus-visible-D29Av9Xb.js';
import './RovingTabindex-CoaPJLDZ.js';
import './FocusGroup-BxawWWgQ.js';
import './sp-clear-button-DIy7dctK.js';
import './spectrum-icon-cross.css-BlifuMyY.js';
import './ButtonBase-C7Ofi_KG.js';
import './like-anchor-BYGSHbJ7.js';
import './if-defined-DDJGFaN4.js';
import './focusable-DH4iFM4s.js';
import './observe-slot-text-BtuI5sqC.js';
import './mutation-controller-D2lT1xZk.js';
import './query-assigned-nodes-DAYI4epk.js';
import './base-u8Z1Hrsd.js';
import './query-DQF6X5qW.js';
import './custom-tag-B5IH9PTE.js';
import './IconBase-Fm5B4nA1.js';
import './sizedMixin-Cgw04SVn.js';
import './custom-tag-Diwq7nXX.js';

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

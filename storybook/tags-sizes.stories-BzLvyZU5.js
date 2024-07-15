import './sp-tags-K7qW-X0f.js';
import './sp-avatar-CeVjHcQM.js';
import './sp-icon-R1TCc8mN.js';
import './sp-icon-magnify-BOl07iQI.js';
import { x } from './lit-html-COgVUehj.js';
import './define-element-Cg7S_Nvo.js';
import './lit-element-BL-po2DW.js';
import './focus-visible-D29Av9Xb.js';
import './RovingTabindex-CoaPJLDZ.js';
import './FocusGroup-BxawWWgQ.js';
import './sp-clear-button-CYKlchVn.js';
import './spectrum-icon-cross.css-BqOueTMn.js';
import './ButtonBase-DQebF_98.js';
import './like-anchor-DX5I66Td.js';
import './if-defined-DDJGFaN4.js';
import './focusable-C5h4CSZb.js';
import './observe-slot-text-Dl5hWaOm.js';
import './mutation-controller-D2lT1xZk.js';
import './query-assigned-nodes-DAYI4epk.js';
import './base-u8Z1Hrsd.js';
import './query-DQF6X5qW.js';
import './custom-tag-B5IH9PTE.js';
import './IconBase-C8frIgMv.js';
import './sizedMixin-sqnytUIU.js';
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

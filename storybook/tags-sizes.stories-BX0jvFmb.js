import './sp-tags-l4LOwQaX.js';
import './sp-avatar-CtX3wZp6.js';
import './sp-icon-DiFmj6GE.js';
import './sp-icon-magnify-1NJgIVBV.js';
import { x } from './lit-html-COgVUehj.js';
import './define-element-CuLWp0nJ.js';
import './lit-element-BL-po2DW.js';
import './focus-visible-D29Av9Xb.js';
import './RovingTabindex-Bi74mHtS.js';
import './FocusGroup-DQHKf855.js';
import './sp-clear-button-L_mfyHCN.js';
import './spectrum-icon-cross.css-BQ7-mmrJ.js';
import './ButtonBase-DrEDDNGU.js';
import './like-anchor-Cds2yNgE.js';
import './if-defined-DDJGFaN4.js';
import './focusable-B74rwTMw.js';
import './observe-slot-text-bZJQT55z.js';
import './mutation-controller-D2lT1xZk.js';
import './query-assigned-nodes-DAYI4epk.js';
import './base-u8Z1Hrsd.js';
import './query-DQF6X5qW.js';
import './custom-tag-B5IH9PTE.js';
import './IconBase-BoJOjJXT.js';
import './sizedMixin-BYlU5N2O.js';
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

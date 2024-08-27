import './sp-tags-DAWjjfgi.js';
import './sp-avatar-WEKRm7TK.js';
import './sp-icon-CYuqy0p0.js';
import './sp-icon-magnify-BV_mQ6Zk.js';
import { x } from './lit-html-COgVUehj.js';
import './define-element-CXRu6sWi.js';
import './lit-element-BL-po2DW.js';
import './focus-visible-D29Av9Xb.js';
import './RovingTabindex-Bi74mHtS.js';
import './FocusGroup-DQHKf855.js';
import './sp-clear-button-CFFjYw-P.js';
import './spectrum-icon-cross.css-BAONp4pC.js';
import './ButtonBase-B6EfsHA8.js';
import './like-anchor-BAH-foY5.js';
import './if-defined-DDJGFaN4.js';
import './focusable-BHn_FpaM.js';
import './observe-slot-text-CBh62R5W.js';
import './mutation-controller-D2lT1xZk.js';
import './query-assigned-nodes-DAYI4epk.js';
import './base-u8Z1Hrsd.js';
import './query-DQF6X5qW.js';
import './custom-tag-B5IH9PTE.js';
import './IconBase-LhykbR0q.js';
import './sizedMixin-BKu_31Nm.js';
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

import './sp-tags-BZe2WAup.js';
import './sp-avatar-7QF-LGNm.js';
import './sp-icon-BTK-ls8P.js';
import './sp-icon-magnify-DBYopHCv.js';
import { x } from './lit-html-COgVUehj.js';
import './define-element-BgsU7oi-.js';
import './lit-element-BulMEkr1.js';
import './focus-visible-D29Av9Xb.js';
import './RovingTabindex-Bi74mHtS.js';
import './FocusGroup-DQHKf855.js';
import './sp-clear-button-BKqP97a8.js';
import './spectrum-icon-cross.css-DdK5rkHs.js';
import './ButtonBase-CGWMAWIx.js';
import './like-anchor-BF2mSMlR.js';
import './if-defined-DDJGFaN4.js';
import './focusable-BVZVIowx.js';
import './observe-slot-text-vBV0Xc1Q.js';
import './mutation-controller-D2lT1xZk.js';
import './query-assigned-nodes-DAYI4epk.js';
import './base-u8Z1Hrsd.js';
import './query-DQF6X5qW.js';
import './custom-tag-B5IH9PTE.js';
import './IconBase-B4NmWdYY.js';
import './sizedMixin-CHWWI7zp.js';
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

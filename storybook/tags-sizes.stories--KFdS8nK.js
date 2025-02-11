import './sp-tags-CkOd02_K.js';
import './sp-avatar-mZL-tV8e.js';
import './sp-icon-CZ2xPYLk.js';
import './sp-icon-magnify-C4mgaHUX.js';
import { x } from './lit-html-COgVUehj.js';
import './define-element-JsEeAjlA.js';
import './lit-element-BulMEkr1.js';
import './focus-visible-D29Av9Xb.js';
import './RovingTabindex-Bi74mHtS.js';
import './FocusGroup-DQHKf855.js';
import './sp-clear-button-DKZty_MS.js';
import './icon-cross-overrides.css-a6lElF1Q.js';
import './ButtonBase-EiAuB8cn.js';
import './like-anchor-C9Xos9l8.js';
import './if-defined-DDJGFaN4.js';
import './focusable-C0Y2600m.js';
import './observe-slot-text-DKkDovCf.js';
import './mutation-controller-D2lT1xZk.js';
import './query-assigned-nodes-DAYI4epk.js';
import './base-u8Z1Hrsd.js';
import './query-DQF6X5qW.js';
import './custom-tag-B5IH9PTE.js';
import './IconBase-Bmj8ZYSq.js';
import './state-CJdJtSzk.js';
import './sizedMixin-CvxKvEie.js';
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

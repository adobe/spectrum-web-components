import './sp-tags-XdlbfeVM.js';
import './sp-avatar-Da9IF3Gf.js';
import './sp-icon-C7YVcg_M.js';
import './sp-icon-magnify-Bae2uSQv.js';
import { x } from './lit-html-COgVUehj.js';
import './define-element-BcIuQqj7.js';
import './lit-element-BulMEkr1.js';
import './focus-visible-D29Av9Xb.js';
import './RovingTabindex-Bi74mHtS.js';
import './FocusGroup-DQHKf855.js';
import './sp-clear-button-DNyZLj51.js';
import './icon-cross-overrides.css-DxRjpzaf.js';
import './ButtonBase-D1SFSKU5.js';
import './like-anchor-Du7qlE4L.js';
import './if-defined-DDJGFaN4.js';
import './focusable-CVpJvZMa.js';
import './observe-slot-text-7-FmzoJl.js';
import './mutation-controller-D2lT1xZk.js';
import './query-assigned-nodes-DAYI4epk.js';
import './base-u8Z1Hrsd.js';
import './query-DQF6X5qW.js';
import './custom-tag-B5IH9PTE.js';
import './IconBase-CXSc4767.js';
import './state-mjpVzfMZ.js';
import './sizedMixin-y7jJohI-.js';
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

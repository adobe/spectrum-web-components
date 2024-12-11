import './sp-tags-BeS6K5cB.js';
import './sp-avatar-D95kRGkG.js';
import './sp-icon-3JXCeRZ3.js';
import './sp-icon-magnify-BSmUBAZe.js';
import { x } from './lit-html-COgVUehj.js';
import './define-element-xyi5NDDf.js';
import './lit-element-BulMEkr1.js';
import './focus-visible-D29Av9Xb.js';
import './RovingTabindex-Bi74mHtS.js';
import './FocusGroup-DQHKf855.js';
import './sp-clear-button-CGJuVUBm.js';
import './icon-cross-overrides.css--gBtyYYm.js';
import './ButtonBase-C-5TBDaE.js';
import './like-anchor-Dgva6KsU.js';
import './if-defined-DDJGFaN4.js';
import './focusable-DcHsG7Zg.js';
import './observe-slot-text-64cbqGrA.js';
import './mutation-controller-D2lT1xZk.js';
import './query-assigned-nodes-DAYI4epk.js';
import './base-u8Z1Hrsd.js';
import './query-DQF6X5qW.js';
import './custom-tag-B5IH9PTE.js';
import './IconBase-5vvO1gxM.js';
import './state-DzluJiIq.js';
import './sizedMixin-CTLIe6if.js';
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

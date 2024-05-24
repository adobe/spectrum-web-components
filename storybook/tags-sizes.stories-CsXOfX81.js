import './sp-tags-DQtJH2Hk.js';
import './sp-avatar-CXsPWXqa.js';
import './sp-icon-D0SR2cox.js';
import './sp-icon-magnify-B8Y7uzb0.js';
import { x } from './lit-html-COgVUehj.js';
import './define-element-BgSxDJnI.js';
import './lit-element-BL-po2DW.js';
import './focus-visible-D29Av9Xb.js';
import './RovingTabindex-Dx9AbyW7.js';
import './FocusGroup-B9OwLCq7.js';
import './sp-clear-button-CpElt4en.js';
import './spectrum-icon-cross.css-B3SUg3Nz.js';
import './ButtonBase-CGZcb8D1.js';
import './like-anchor-jgQaL5Z3.js';
import './if-defined-DDJGFaN4.js';
import './focusable-oYNn1hNO.js';
import './observe-slot-text-DhKFT2ma.js';
import './mutation-controller-D2lT1xZk.js';
import './query-assigned-nodes-DAYI4epk.js';
import './base-u8Z1Hrsd.js';
import './query-DQF6X5qW.js';
import './custom-tag-B5IH9PTE.js';
import './IconBase-BDjZkcAb.js';
import './sizedMixin-Gf9Y2JDv.js';
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

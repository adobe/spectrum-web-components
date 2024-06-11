import './sp-tags-D4hLxp6r.js';
import './sp-avatar-BrEHrOjx.js';
import './sp-icon-Cm4Lt3cB.js';
import './sp-icon-magnify-CaVW1ccA.js';
import { x } from './lit-html-COgVUehj.js';
import './define-element-DeMmBNCp.js';
import './lit-element-BL-po2DW.js';
import './focus-visible-D29Av9Xb.js';
import './RovingTabindex-Dx9AbyW7.js';
import './FocusGroup-B9OwLCq7.js';
import './sp-clear-button-D5bum6xP.js';
import './spectrum-icon-cross.css-BqSX9MeP.js';
import './ButtonBase-C0zwFpsa.js';
import './like-anchor-vdd4WF9w.js';
import './if-defined-DDJGFaN4.js';
import './focusable-X_T5Q3Xx.js';
import './observe-slot-text-CWSEtJ4X.js';
import './mutation-controller-D2lT1xZk.js';
import './query-assigned-nodes-DAYI4epk.js';
import './base-u8Z1Hrsd.js';
import './query-DQF6X5qW.js';
import './custom-tag-B5IH9PTE.js';
import './IconBase-B8dJ3OhJ.js';
import './sizedMixin-Cu5eACid.js';
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

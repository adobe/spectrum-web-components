import './sp-tags-Bm9kFQrw.js';
import './sp-avatar-BgnNaPp4.js';
import './sp-icon-C6fwh19n.js';
import './sp-icon-magnify-DlLO05iP.js';
import { x } from './lit-html-COgVUehj.js';
import './define-element-B7NoFsQI.js';
import './lit-element-BulMEkr1.js';
import './focus-visible-D29Av9Xb.js';
import './RovingTabindex-Bi74mHtS.js';
import './FocusGroup-DQHKf855.js';
import './sp-clear-button-kgYscJZS.js';
import './spectrum-icon-cross.css-cEqpDoFW.js';
import './ButtonBase-CVCDQq4P.js';
import './like-anchor-BQR4wmj8.js';
import './if-defined-DDJGFaN4.js';
import './focusable-CtU8nZTr.js';
import './observe-slot-text-DVS1yx82.js';
import './mutation-controller-D2lT1xZk.js';
import './query-assigned-nodes-DAYI4epk.js';
import './base-u8Z1Hrsd.js';
import './query-DQF6X5qW.js';
import './custom-tag-B5IH9PTE.js';
import './IconBase-DXeaJSV5.js';
import './state-CG9Kyp94.js';
import './sizedMixin-SWvQmBKY.js';
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

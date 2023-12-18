import './sp-tags-8ef6f7f2.js';
import './sp-avatar-2d31820e.js';
import './sp-icon-ec6672fe.js';
import './sp-icon-magnify-fabd56c0.js';
import { x } from './lit-html-126adc72.js';
import './define-element-7dc6a572.js';
import './lit-element-9354aa77.js';
import './focus-visible-03398d98.js';
import './RovingTabindex-ca5f8b64.js';
import './FocusGroup-0f0b800e.js';
import './sp-clear-button-ee6a6e05.js';
import './spectrum-icon-cross.css-87c98b5d.js';
import './ButtonBase-dba358cb.js';
import './like-anchor-8f97823d.js';
import './if-defined-ae83b405.js';
import './focusable-391b57ba.js';
import './observe-slot-text-769cbc70.js';
import './mutation-controller-81a30f7f.js';
import './query-assigned-nodes-d63886c3.js';
import './base-511c8c11.js';
import './sizedMixin-3d08a58f.js';
import './query-d0113d5a.js';
import './custom-tag-c228386e.js';
import './IconBase-7772fb01.js';
import './custom-tag-b5526d41.js';

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

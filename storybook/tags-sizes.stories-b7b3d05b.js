import './sp-tags-77e837e4.js';
import './sp-avatar-27aa9336.js';
import './sp-icon-8061244b.js';
import './sp-icon-magnify-4997aa6c.js';
import { x } from './lit-html-126adc72.js';
import './define-element-617dba69.js';
import './lit-element-9354aa77.js';
import './focus-visible-03398d98.js';
import './RovingTabindex-ca5f8b64.js';
import './FocusGroup-0f0b800e.js';
import './sp-clear-button-1531965a.js';
import './spectrum-icon-cross.css-8f837689.js';
import './ButtonBase-f782d237.js';
import './like-anchor-86192240.js';
import './if-defined-ae83b405.js';
import './focusable-c7e64029.js';
import './observe-slot-text-03ae7746.js';
import './mutation-controller-81a30f7f.js';
import './query-assigned-nodes-c8b87639.js';
import './base-511c8c11.js';
import './sizedMixin-29c62bc2.js';
import './query-d0113d5a.js';
import './custom-tag-c228386e.js';
import './IconBase-d9572ad8.js';
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

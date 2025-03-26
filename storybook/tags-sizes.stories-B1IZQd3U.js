import './sp-tags-CSVBBLgi.js';
import './sp-avatar-C6aGGMaq.js';
import './sp-icon-DqRHAie2.js';
import './sp-icon-magnify-0_l9zCrI.js';
import { x } from './lit-html-COgVUehj.js';
import './define-element-Bun2ZgR-.js';
import './lit-element-BulMEkr1.js';
import './focus-visible-D29Av9Xb.js';
import './RovingTabindex-BIFuw_W7.js';
import './FocusGroup-CQTGJWkN.js';
import './sp-clear-button-BVAHOa7o.js';
import './spectrum-icon-cross.css-BnEt-gNk.js';
import './ButtonBase-CsEYgJMd.js';
import './like-anchor-BaNwPfYf.js';
import './if-defined-DDJGFaN4.js';
import './focusable-y67P8eQI.js';
import './observe-slot-text-B-N3zGRD.js';
import './mutation-controller-D2lT1xZk.js';
import './query-assigned-nodes-DAYI4epk.js';
import './base-u8Z1Hrsd.js';
import './query-DQF6X5qW.js';
import './custom-tag-B5IH9PTE.js';
import './IconBase-luFyVpTn.js';
import './state-a9qXQZw8.js';
import './sizedMixin-BPhwmt-S.js';
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

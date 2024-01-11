import './sp-tags-6i-eBarJ.js';
import './sp-avatar-Dumk-EI3.js';
import './sp-icon-p9w2_5nd.js';
import './sp-icon-magnify-5fuSsznp.js';
import { x } from './lit-html-GmIhAbMP.js';
import './define-element-IUrhCXKn.js';
import './lit-element-xBOPiTek.js';
import './focus-visible-68QWcOy-.js';
import './RovingTabindex-LnbiEVTh.js';
import './FocusGroup-TIL3fP6n.js';
import './sp-clear-button-ZbTgHpkw.js';
import './spectrum-icon-cross.css-ozsx60Ma.js';
import './ButtonBase-nL2qW8Lw.js';
import './like-anchor-PHkAP_YZ.js';
import './if-defined-pV6JZKXB.js';
import './focusable-zbBPTVfi.js';
import './observe-slot-text-CVZsl2bC.js';
import './mutation-controller-KeE5MDSl.js';
import './query-assigned-nodes-mXMsr4SG.js';
import './base-STdhtiz1.js';
import './sizedMixin-qrvMoaCA.js';
import './query-JMOstM_r.js';
import './custom-tag-z2Xx81l9.js';
import './IconBase-_gvXsC2f.js';
import './custom-tag-JXLWq-Sj.js';

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

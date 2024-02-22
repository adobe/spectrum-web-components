import './sp-tags-w9nseUt6.js';
import './sp-avatar-VfHCaCaN.js';
import './sp-icon-Rplr-oxC.js';
import './sp-icon-magnify-b4X8k-qm.js';
import { x } from './lit-html-GmIhAbMP.js';
import './define-element-b58XwwBM.js';
import './lit-element-xBOPiTek.js';
import './focus-visible-68QWcOy-.js';
import './RovingTabindex-LnbiEVTh.js';
import './FocusGroup-TIL3fP6n.js';
import './sp-clear-button-XoP82XFs.js';
import './spectrum-icon-cross.css-ZE2cfwM7.js';
import './ButtonBase-8MKa1AnW.js';
import './like-anchor-SzCf8Fo9.js';
import './if-defined-pV6JZKXB.js';
import './focusable-XJQHb8mq.js';
import './observe-slot-text-sowxnoY7.js';
import './mutation-controller-KeE5MDSl.js';
import './query-assigned-nodes-NJVGD18T.js';
import './base-STdhtiz1.js';
import './sizedMixin-SQxNgkJG.js';
import './query-JMOstM_r.js';
import './custom-tag-z2Xx81l9.js';
import './IconBase-O-P913zU.js';
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

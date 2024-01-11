import './sp-tags-6i-eBarJ.js';
import './sp-avatar-Dumk-EI3.js';
import { a as avatar } from './images-KUFsJw8o.js';
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

var tags_stories = {
  title: "Tags",
  component: "sp-tags",
  argTypes: { onDelete: { action: "delete" } }
};
const Default = () => {
  return x`
        <sp-tags>
            <sp-tag>Tag 1</sp-tag>
            <sp-tag invalid>Tag 2</sp-tag>
            <sp-tag disabled>Tag 3</sp-tag>
        </sp-tags>
        <br />
        <br />
        <sp-tags>
            <sp-tag>
                Tag 1
                <sp-avatar
                    slot="avatar"
                    label="Tag 1"
                    src=${avatar}
                ></sp-avatar>
            </sp-tag>
            <sp-tag invalid>
                Tag 2
                <sp-avatar
                    slot="avatar"
                    label="Tag 1"
                    src=${avatar}
                ></sp-avatar>
            </sp-tag>
            <sp-tag disabled>
                Tag 3
                <sp-avatar
                    slot="avatar"
                    label="Tag 1"
                    src=${avatar}
                ></sp-avatar>
            </sp-tag>
        </sp-tags>
        <br />
        <br />
        <sp-tags>
            <sp-tag>
                Tag 1
                <sp-icon-magnify slot="icon" size="s"></sp-icon-magnify>
            </sp-tag>
            <sp-tag invalid>
                Tag 2
                <sp-icon-magnify slot="icon" size="s"></sp-icon-magnify>
            </sp-tag>
            <sp-tag disabled>
                Tag 3
                <sp-icon-magnify slot="icon" size="s"></sp-icon-magnify>
            </sp-tag>
        </sp-tags>
    `;
};
const deletable = (args) => {
  return x`
        <sp-tags @delete=${args.onDelete}>
            <sp-tag deletable>Tag 1</sp-tag>
            <sp-tag invalid deletable>Tag 2</sp-tag>
            <sp-tag disabled deletable>Tag 3</sp-tag>
        </sp-tags>
        <br />
        <br />
        <sp-tags @delete=${args.onDelete}>
            <sp-tag deletable>
                Tag 1
                <sp-avatar
                    slot="avatar"
                    label="Tag 1"
                    src=${avatar}
                ></sp-avatar>
            </sp-tag>
            <sp-tag invalid deletable>
                Tag 2
                <sp-avatar
                    slot="avatar"
                    label="Tag 1"
                    src=${avatar}
                ></sp-avatar>
            </sp-tag>
            <sp-tag disabled deletable>
                Tag 3
                <sp-avatar
                    slot="avatar"
                    label="Tag 1"
                    src=${avatar}
                ></sp-avatar>
            </sp-tag>
        </sp-tags>
        <br />
        <br />
        <sp-tags @delete=${args.onDelete}>
            <sp-tag deletable>
                Tag 1
                <sp-icon-magnify slot="icon" size="s"></sp-icon-magnify>
            </sp-tag>
            <sp-tag invalid deletable>
                Tag 2
                <sp-icon-magnify slot="icon" size="s"></sp-icon-magnify>
            </sp-tag>
            <sp-tag disabled deletable>
                Tag 3
                <sp-icon-magnify slot="icon" size="s"></sp-icon-magnify>
            </sp-tag>
        </sp-tags>
    `;
};
const readonly = () => {
  return x`
        <sp-tags>
            <sp-tag deletable readonly>
                Tag 1
                <sp-icon-magnify slot="icon" size="s"></sp-icon-magnify>
            </sp-tag>
            <sp-tag invalid deletable readonly>
                Tag 2
                <sp-icon-magnify slot="icon" size="s"></sp-icon-magnify>
            </sp-tag>
            <sp-tag disabled deletable>
                Tag 3
                <sp-icon-magnify slot="icon" size="s"></sp-icon-magnify>
            </sp-tag>
        </sp-tags>
    `;
};
const __namedExportsOrder = ['Default', 'deletable', 'readonly'];

export { Default, __namedExportsOrder, tags_stories as default, deletable, readonly };

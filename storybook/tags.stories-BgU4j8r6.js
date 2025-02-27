import './sp-tags-Cor442Zx.js';
import './sp-avatar-BVzrMEKe.js';
import { a as avatar } from './images-CoOs26Rf.js';
import './sp-icon-CThFoDUE.js';
import './sp-icon-magnify-DdRfx8DE.js';
import { x } from './lit-html-COgVUehj.js';
import './define-element-B3-QvDZd.js';
import './lit-element-BulMEkr1.js';
import './focus-visible-D29Av9Xb.js';
import './RovingTabindex-BIFuw_W7.js';
import './FocusGroup-CQTGJWkN.js';
import './sp-clear-button-CYctPnkO.js';
import './spectrum-icon-cross.css-CaX-pCP6.js';
import './ButtonBase-DFBdS0ya.js';
import './like-anchor-YCQdykQc.js';
import './if-defined-DDJGFaN4.js';
import './focusable-CRwO5NCP.js';
import './observe-slot-text-BVY5OzXy.js';
import './mutation-controller-D2lT1xZk.js';
import './query-assigned-nodes-DAYI4epk.js';
import './base-u8Z1Hrsd.js';
import './query-DQF6X5qW.js';
import './custom-tag-B5IH9PTE.js';
import './IconBase-CmREmoFq.js';
import './state-DrGS5Kkk.js';
import './sizedMixin-Bh0Au8rG.js';
import './custom-tag-Diwq7nXX.js';
import './Magnify-C5ml_uGy.js';

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

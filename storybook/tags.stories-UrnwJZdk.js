import './sp-tags-Rl6Ia1Y4.js';
import './sp-avatar-a_AVKMZc.js';
import { a as avatar } from './images-KUFsJw8o.js';
import './sp-icon-nbUG1ZO_.js';
import './sp-icon-magnify-q4Fy0HZ6.js';
import { x } from './lit-html-GmIhAbMP.js';
import './define-element-z6bXN_P5.js';
import './lit-element-xBOPiTek.js';
import './focus-visible-68QWcOy-.js';
import './RovingTabindex-LnbiEVTh.js';
import './FocusGroup-TIL3fP6n.js';
import './sp-clear-button-0XhH_rVh.js';
import './spectrum-icon-cross.css-NAMb6F9U.js';
import './ButtonBase-xfo9cPrz.js';
import './like-anchor-iRdC2T2x.js';
import './if-defined-pV6JZKXB.js';
import './focusable-M0S89eyW.js';
import './observe-slot-text-MDYPopbw.js';
import './mutation-controller-KeE5MDSl.js';
import './query-assigned-nodes-qh-rhz36.js';
import './base-STdhtiz1.js';
import './sizedMixin-IBQibr2z.js';
import './query-JMOstM_r.js';
import './custom-tag-z2Xx81l9.js';
import './IconBase-1lzddWrP.js';
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

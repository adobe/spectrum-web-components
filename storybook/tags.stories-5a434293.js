import './sp-tags-77e837e4.js';
import './sp-avatar-27aa9336.js';
import { a as avatar } from './images-65980286.js';
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

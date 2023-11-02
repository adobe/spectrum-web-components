import './sp-tags-bcef21b9.js';
import './sp-avatar-0bb228a8.js';
import { a as avatar } from './images-65980286.js';
import './sp-icon-0926a2d4.js';
import './sp-icon-magnify-87776c4f.js';
import { x } from './lit-html-126adc72.js';
import './define-element-43d4edd5.js';
import './lit-element-9354aa77.js';
import './focus-visible-03398d98.js';
import './RovingTabindex-ca5f8b64.js';
import './FocusGroup-0f0b800e.js';
import './sp-clear-button-b5cd4c86.js';
import './spectrum-icon-cross.css-a270fccc.js';
import './ButtonBase-a71d6ce3.js';
import './like-anchor-0c856f1c.js';
import './if-defined-ae83b405.js';
import './focusable-d03021f6.js';
import './observe-slot-text-dbd83f39.js';
import './mutation-controller-81a30f7f.js';
import './query-assigned-nodes-c8aaaadd.js';
import './base-511c8c11.js';
import './sizedMixin-281e4c72.js';
import './query-d0113d5a.js';
import './custom-tag-c228386e.js';
import './IconBase-fb970ebf.js';
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

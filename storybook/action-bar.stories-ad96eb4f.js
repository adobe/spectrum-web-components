import './sp-action-bar-a39e3311.js';
import './sp-field-label-81c2b9be.js';
import './sp-action-button-9bf3b735.js';
import './sp-action-group-c5fb8392.js';
import './sp-icon-edit-f75652ae.js';
import './sp-icon-more-e673432e.js';
import { x } from './lit-html-126adc72.js';
import './sp-popover-f437c616.js';
import './lit-element-9354aa77.js';
import './define-element-7dc6a572.js';
import './query-d0113d5a.js';
import './base-511c8c11.js';
import './sp-close-button-b4a23c66.js';
import './spectrum-icon-cross.css-87c98b5d.js';
import './ButtonBase-dba358cb.js';
import './like-anchor-8f97823d.js';
import './if-defined-ae83b405.js';
import './focusable-391b57ba.js';
import './focus-visible-03398d98.js';
import './observe-slot-text-769cbc70.js';
import './mutation-controller-81a30f7f.js';
import './query-assigned-nodes-d63886c3.js';
import './sizedMixin-3d08a58f.js';
import './custom-tag-c228386e.js';
import './IconBase-7772fb01.js';
import './condition-attribute-with-id-62869347.js';
import './ElementResolution-b58a0825.js';
import './sp-icon-corner-triangle300-22f51337.js';
import './CornerTriangle300-488cc3d0.js';
import './RovingTabindex-ca5f8b64.js';
import './FocusGroup-0f0b800e.js';
import './Edit-e6e8ae2a.js';
import './custom-tag-b5526d41.js';
import './More-78935819.js';

var actionBar_stories = {
  title: "Action Bar",
  component: "sp-action-bar"
};
const Default = () => {
  return x`
        <sp-action-bar open>
            2 selected
            <sp-action-button slot="buttons" label="Edit">
                <sp-icon-edit slot="icon"></sp-icon-edit>
            </sp-action-button>
            <sp-action-button slot="buttons" label="More">
                <sp-icon-more slot="icon"></sp-icon-more>
            </sp-action-button>
        </sp-action-bar>
    `;
};
const emphasized = () => {
  return x`
        <sp-action-bar open emphasized>
            2 selected
            <sp-action-button slot="buttons" label="Edit">
                <sp-icon-edit slot="icon"></sp-icon-edit>
            </sp-action-button>
            <sp-action-button slot="buttons" label="More">
                <sp-icon-more slot="icon"></sp-icon-more>
            </sp-action-button>
        </sp-action-bar>
    `;
};
const fixed = () => {
  return x`
        <style>
            [variant='fixed'] {
                bottom: 2.5em;
                inset-inline-end: 1em;
            }
        </style>
        <sp-action-bar open variant="fixed">
            2 selected
            <sp-action-button slot="buttons" label="Edit">
                <sp-icon-edit slot="icon"></sp-icon-edit>
            </sp-action-button>
            <sp-action-button slot="buttons" label="More">
                <sp-icon-more slot="icon"></sp-icon-more>
            </sp-action-button>
        </sp-action-bar>
    `;
};
const flexible = () => {
  return x`
        <sp-action-bar open flexible emphasized>
            2 selected
            <sp-action-button slot="buttons" label="Edit">
                <sp-icon-edit slot="icon"></sp-icon-edit>
            </sp-action-button>
            <sp-action-button slot="buttons" label="More">
                <sp-icon-more slot="icon"></sp-icon-more>
            </sp-action-button>
        </sp-action-bar>
    `;
};
const __namedExportsOrder = ['Default', 'emphasized', 'fixed', 'flexible'];

export { Default, __namedExportsOrder, actionBar_stories as default, emphasized, fixed, flexible };

import './sp-action-bar-346fa19d.js';
import './sp-field-label-286ffe1f.js';
import './sp-action-button-b46ec901.js';
import './sp-action-group-05e619d3.js';
import './sp-icon-edit-fb5148df.js';
import './sp-icon-more-04da5606.js';
import { x } from './lit-html-126adc72.js';
import './sp-popover-d11a6e7d.js';
import './lit-element-9354aa77.js';
import './define-element-617dba69.js';
import './query-d0113d5a.js';
import './base-511c8c11.js';
import './sp-close-button-eb49d9df.js';
import './spectrum-icon-cross.css-db5add4c.js';
import './ButtonBase-5cb3a7f7.js';
import './like-anchor-86192240.js';
import './if-defined-ae83b405.js';
import './focusable-f5539e66.js';
import './focus-visible-03398d98.js';
import './observe-slot-text-94a58958.js';
import './mutation-controller-81a30f7f.js';
import './query-assigned-nodes-db063b1b.js';
import './sizedMixin-9a9da45c.js';
import './custom-tag-c228386e.js';
import './IconBase-d9572ad8.js';
import './condition-attribute-with-id-62869347.js';
import './ElementResolution-b58a0825.js';
import './sp-icon-corner-triangle300-d126a472.js';
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

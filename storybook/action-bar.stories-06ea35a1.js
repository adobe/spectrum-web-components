import './sp-action-bar-1af812b9.js';
import './sp-field-label-05f39d18.js';
import './sp-action-button-91f1b102.js';
import './sp-action-group-ba39e0fa.js';
import './sp-icon-edit-23d1bac7.js';
import './sp-icon-more-6b0074ad.js';
import { x } from './lit-html-126adc72.js';
import './sp-popover-45f01f5b.js';
import './lit-element-9354aa77.js';
import './define-element-43d4edd5.js';
import './query-d0113d5a.js';
import './base-511c8c11.js';
import './sp-close-button-35d5c555.js';
import './spectrum-icon-cross.css-a270fccc.js';
import './ButtonBase-a71d6ce3.js';
import './like-anchor-0c856f1c.js';
import './if-defined-ae83b405.js';
import './focusable-d03021f6.js';
import './focus-visible-03398d98.js';
import './observe-slot-text-dbd83f39.js';
import './mutation-controller-81a30f7f.js';
import './query-assigned-nodes-c8aaaadd.js';
import './sizedMixin-281e4c72.js';
import './custom-tag-c228386e.js';
import './IconBase-fb970ebf.js';
import './condition-attribute-with-id-62869347.js';
import './ElementResolution-b58a0825.js';
import './sp-icon-corner-triangle300-48f3695d.js';
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

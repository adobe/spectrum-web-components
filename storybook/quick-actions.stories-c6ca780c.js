import './sp-quick-actions-18aad47a.js';
import './sp-action-button-77300bea.js';
import './sp-icon-edit-fb5148df.js';
import './sp-icon-delete-fa5ccf41.js';
import './sp-underlay-fcec773d.js';
import { x } from './lit-html-126adc72.js';
import './lit-element-9354aa77.js';
import './define-element-617dba69.js';
import './sp-icon-corner-triangle300-d126a472.js';
import './CornerTriangle300-488cc3d0.js';
import './custom-tag-c228386e.js';
import './IconBase-d9572ad8.js';
import './ButtonBase-f782d237.js';
import './like-anchor-86192240.js';
import './if-defined-ae83b405.js';
import './focusable-c7e64029.js';
import './focus-visible-03398d98.js';
import './observe-slot-text-03ae7746.js';
import './mutation-controller-81a30f7f.js';
import './query-assigned-nodes-c8b87639.js';
import './base-511c8c11.js';
import './sizedMixin-29c62bc2.js';
import './query-d0113d5a.js';
import './Edit-e6e8ae2a.js';
import './custom-tag-b5526d41.js';
import './Delete-8be4a327.js';

var quickActions_stories = {
  title: "Quick Actions",
  component: "sp-quick-actions"
};
const iconButtons = () => {
  return x`
        <div
            style="padding: 2em; background-color: var(--spectrum-quickactions-overlay-color, var(--spectrum-alias-background-color-quickactions-overlay));"
        >
            <sp-quick-actions opened>
                <sp-action-button quiet label="Edit">
                    <sp-icon-edit slot="icon"></sp-icon-edit>
                </sp-action-button>
                <sp-action-button quiet label="Copy">
                    <sp-icon-copy slot="icon"></sp-icon-copy>
                </sp-action-button>
                <sp-action-button quiet label="Delete">
                    <sp-icon-delete slot="icon"></sp-icon-delete>
                </sp-action-button>
            </sp-quick-actions>
        </div>
    `;
};
const textOnly = () => {
  return x`
        <div
            style="padding: 2em; background-color: var(--spectrum-quickactions-overlay-color, var(--spectrum-alias-background-color-quickactions-overlay));"
        >
            <sp-quick-actions opened text-only>
                <sp-action-button quiet>Edit</sp-action-button>
                <sp-action-button quiet>Copy</sp-action-button>
                <sp-action-button quiet>Delete</sp-action-button>
            </sp-quick-actions>
        </div>
    `;
};
const __namedExportsOrder = ['iconButtons', 'textOnly'];

export { __namedExportsOrder, quickActions_stories as default, iconButtons, textOnly };

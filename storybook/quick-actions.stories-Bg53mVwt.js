import './sp-quick-actions-DlKO5z6c.js';
import './sp-action-button-tPVQtofG.js';
import './sp-icon-edit-Ci707tqk.js';
import './sp-icon-delete-Dvmp7K2v.js';
import './sp-underlay-Ye02jNXB.js';
import { x } from './lit-html-COgVUehj.js';
import './lit-element-BL-po2DW.js';
import './define-element-9Zj84-C8.js';
import './sp-icon-corner-triangle300-Cr7f54D_.js';
import './CornerTriangle300-B7hvHiLM.js';
import './custom-tag-B5IH9PTE.js';
import './IconBase-L76-n75s.js';
import './ButtonBase-adwZ7HOt.js';
import './like-anchor-c-omWQV-.js';
import './if-defined-DDJGFaN4.js';
import './focusable-CfMGZF2L.js';
import './focus-visible-D29Av9Xb.js';
import './observe-slot-text-Dr0dVrDu.js';
import './mutation-controller-D2lT1xZk.js';
import './query-assigned-nodes-DAYI4epk.js';
import './base-u8Z1Hrsd.js';
import './query-DQF6X5qW.js';
import './sizedMixin-H6qLwJc0.js';
import './Edit-CCpN7dze.js';
import './custom-tag-Diwq7nXX.js';
import './Delete-Q-M6K9oM.js';

var quickActions_stories = {
  title: "Quick Actions",
  component: "sp-quick-actions",
  parameters: {
    badges: ["deprecated"]
  }
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

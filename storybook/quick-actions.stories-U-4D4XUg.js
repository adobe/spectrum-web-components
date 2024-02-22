import './sp-quick-actions-MnwF-7vQ.js';
import './sp-action-button-4qaSBt6V.js';
import './sp-icon-edit-QOaPKp9C.js';
import './sp-icon-delete-Fi7EWMtq.js';
import './sp-underlay-NDHH1WvU.js';
import { x } from './lit-html-GmIhAbMP.js';
import './lit-element-xBOPiTek.js';
import './define-element-b58XwwBM.js';
import './sp-icon-corner-triangle300-adtwy5eo.js';
import './CornerTriangle300-scOUseNi.js';
import './custom-tag-z2Xx81l9.js';
import './IconBase-O-P913zU.js';
import './ButtonBase-8MKa1AnW.js';
import './like-anchor-SzCf8Fo9.js';
import './if-defined-pV6JZKXB.js';
import './focusable-XJQHb8mq.js';
import './focus-visible-68QWcOy-.js';
import './observe-slot-text-sowxnoY7.js';
import './mutation-controller-KeE5MDSl.js';
import './query-assigned-nodes-NJVGD18T.js';
import './base-STdhtiz1.js';
import './sizedMixin-SQxNgkJG.js';
import './query-JMOstM_r.js';
import './Edit-G5NAbE7j.js';
import './custom-tag-JXLWq-Sj.js';
import './Delete-VyjDFNcI.js';

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

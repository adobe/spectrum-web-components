import './sp-quick-actions-HyWXYjlp.js';
import './sp-action-button-y8BD6Z4p.js';
import './sp-icon-edit-OjHsT1g0.js';
import './sp-icon-delete-spPStLTq.js';
import './sp-underlay-1R8IorrD.js';
import { x } from './lit-html-GmIhAbMP.js';
import './lit-element-xBOPiTek.js';
import './define-element-2O4ZhTAw.js';
import './sp-icon-corner-triangle300-m3lcg1z3.js';
import './CornerTriangle300-wDtTC9xD.js';
import './custom-tag-z2Xx81l9.js';
import './IconBase-TDmbHQaH.js';
import './ButtonBase-H8ie1_xx.js';
import './like-anchor-J4T73PxR.js';
import './if-defined-pV6JZKXB.js';
import './focusable-WZR9a5Bc.js';
import './focus-visible-68QWcOy-.js';
import './observe-slot-text-ybW1xuBS.js';
import './mutation-controller-KeE5MDSl.js';
import './query-assigned-nodes-aJM_vOZ4.js';
import './base-STdhtiz1.js';
import './sizedMixin-mnNfh2gr.js';
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

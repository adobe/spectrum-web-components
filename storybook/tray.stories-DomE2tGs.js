import './sp-dialog-DPNTfuAi.js';
import './sp-menu-yLwRrkPA.js';
import './sp-menu-item-DM6Vd8jf.js';
import './sp-menu-divider-DgP49dwY.js';
import './sp-tray-D9KuQoaV.js';
import { x } from './lit-html-COgVUehj.js';
import './sp-divider-Df2H-TM9.js';
import './divider.css-CIsad19r.js';
import './lit-element-BulMEkr1.js';
import './sizedMixin-Cn6CHTgo.js';
import './define-element-M8Esl59B.js';
import './sp-close-button-BiB-LFS_.js';
import './spectrum-icon-cross.css-De2yj4bz.js';
import './ButtonBase-CEd57Nas.js';
import './like-anchor-Do3nVKPx.js';
import './if-defined-DDJGFaN4.js';
import './focusable-BNUROw9U.js';
import './focus-visible-D29Av9Xb.js';
import './observe-slot-text-DjQnHXP-.js';
import './mutation-controller-D2lT1xZk.js';
import './query-assigned-nodes-DAYI4epk.js';
import './base-u8Z1Hrsd.js';
import './query-DQF6X5qW.js';
import './custom-tag-B5IH9PTE.js';
import './IconBase-CZp8HczU.js';
import './state-CGRProwJ.js';
import './sp-icon-cross500-Bf3xWGbJ.js';
import './Cross500-HJNUUNvY.js';
import './sp-button-group-C79uabJ7.js';
import './sp-icon-alert-Cm537ALf.js';
import './custom-tag-Diwq7nXX.js';
import './AlertDialog-C7lNjgr1.js';
import './sp-button-T-oe-ZrM.js';
import './PendingState-J0gat4zB.js';
import './get-label-from-slot-Cg6mfN40.js';
import './random-id-BST1Puzz.js';
import './condition-attribute-with-id-Cnyhr7Mp.js';
import './resize-controller-BJKfu6ft.js';
import './observe-slot-presence-Ceiwt-jV.js';
import './class-map-DdRvesrq.js';
import './directive-Bn5c4u4M.js';
import './spectrum-icon-checkmark.css-B_NDvW-u.js';
import './sp-icon-chevron100-deGZrjiO.js';
import './Chevron100-2ZEB0c-t.js';
import './spectrum-icon-chevron.css-CeYia-Jd.js';
import './DependencyManger-Dpkh1Bse.js';
import './slottable-request-event-DXuuyGoq.js';
import './sp-underlay-Dldv_vx0.js';
import './first-focusable-in-BK_DAWOm.js';
import './focusable-selectors-CUZEb4r9.js';
import './MatchMedia-SZ42m4IA.js';
import './modal.css-SkAvNHaG.js';

var tray_stories = {
  title: "Tray",
  component: "sp-tray",
  args: {
    open: true
  },
  argTypes: {
    open: {
      name: "open",
      type: { name: "boolean", required: false },
      description: "Whether the tray is open.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: false }
      },
      control: {
        type: "boolean"
      }
    }
  }
};
const Default = (args) => {
  return x`
        <sp-tray ?open=${args.open}>
            <sp-dialog size="s">
                <h2 slot="heading">New Messages</h2>
                You have 5 new messages.
            </sp-dialog>
        </sp-tray>
    `;
};
const menu = (args) => {
  return x`
        <sp-tray ?open=${args.open}>
            <sp-menu style="width: 100%">
                <sp-menu-item>Deselect</sp-menu-item>
                <sp-menu-item selected>Select Inverse</sp-menu-item>
                <sp-menu-item>Feather...</sp-menu-item>
                <sp-menu-item>Select and Mask...</sp-menu-item>
                <sp-menu-divider></sp-menu-divider>
                <sp-menu-item>Save Selection</sp-menu-item>
                <sp-menu-item disabled>Make Work Path</sp-menu-item>
            </sp-menu>
        </sp-tray>
    `;
};
const __namedExportsOrder = ['Default', 'menu'];

export { Default, __namedExportsOrder, tray_stories as default, menu };

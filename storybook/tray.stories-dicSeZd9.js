import './sp-dialog-DzawesJV.js';
import './sp-menu-CUlDsjuI.js';
import './sp-menu-item-C1UX3rOw.js';
import './sp-menu-divider-C2nPYE43.js';
import './sp-tray-DMGe6bTD.js';
import { x } from './lit-html-COgVUehj.js';
import './sp-divider-BpFfGzVw.js';
import './divider.css-Y7Qapv-N.js';
import './lit-element-BL-po2DW.js';
import './sizedMixin-H6qLwJc0.js';
import './define-element-9Zj84-C8.js';
import './sp-close-button-FXF4gEEu.js';
import './spectrum-icon-cross.css-DAq7WwgI.js';
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
import './custom-tag-B5IH9PTE.js';
import './IconBase-L76-n75s.js';
import './sp-icon-cross500-D7FFi1Q9.js';
import './Cross500-HJNUUNvY.js';
import './sp-button-group-Dtho_kG8.js';
import './sp-icon-alert-GYTZvYm3.js';
import './custom-tag-Diwq7nXX.js';
import './AlertDialog-D-R6aPVf.js';
import './sp-button-Fy_2FMPk.js';
import './when-DEJm_QN9.js';
import './random-id-BST1Puzz.js';
import './condition-attribute-with-id-Cnyhr7Mp.js';
import './resize-controller-BJKfu6ft.js';
import './observe-slot-presence-Ceiwt-jV.js';
import './class-map-DdRvesrq.js';
import './directive-Bn5c4u4M.js';
import './spectrum-icon-checkmark.css-B4Pvgr0C.js';
import './sp-icon-chevron100-BVn8JicT.js';
import './Chevron100-2ZEB0c-t.js';
import './spectrum-icon-chevron.css-C5c2rYXA.js';
import './DependencyManger-Dpkh1Bse.js';
import './slottable-request-event-DXuuyGoq.js';
import './sp-underlay-Ye02jNXB.js';
import './first-focusable-in-BK_DAWOm.js';
import './focusable-selectors-CUZEb4r9.js';
import './MatchMedia-pSNe9kbs.js';
import './modal.css-Dkp8hmGu.js';

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

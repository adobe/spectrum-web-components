import './sp-dialog-eHzahp3n.js';
import './sp-menu-CTfuH1l3.js';
import './sp-menu-item-CPMamcOA.js';
import './sp-menu-divider-CzXsUZ7C.js';
import './sp-tray-DS-PmgeI.js';
import { x } from './lit-html-COgVUehj.js';
import './sp-divider-CHbE-g5i.js';
import './divider.css-B2ErksQK.js';
import './lit-element-BL-po2DW.js';
import './sizedMixin-DyuXUK9p.js';
import './define-element-C5BYKBZP.js';
import './sp-close-button-CURoaP9x.js';
import './spectrum-icon-cross.css-BUF8d0zt.js';
import './ButtonBase-D3KeK2NK.js';
import './like-anchor-CXjWBVJG.js';
import './if-defined-DDJGFaN4.js';
import './focusable-BQuZpn6Y.js';
import './focus-visible-D29Av9Xb.js';
import './observe-slot-text-C2oNg7p9.js';
import './mutation-controller-D2lT1xZk.js';
import './query-assigned-nodes-DAYI4epk.js';
import './base-u8Z1Hrsd.js';
import './query-DQF6X5qW.js';
import './custom-tag-B5IH9PTE.js';
import './IconBase-q22s6ZK0.js';
import './sp-icon-cross500-bbmJkCUk.js';
import './Cross500-HJNUUNvY.js';
import './sp-button-group-hPDPVdMB.js';
import './sp-icon-alert-C1Xt_mWd.js';
import './custom-tag-Diwq7nXX.js';
import './AlertDialog-DTxE8jXR.js';
import './sp-button-whL2STLK.js';
import './when-DEJm_QN9.js';
import './random-id-BST1Puzz.js';
import './condition-attribute-with-id-Cnyhr7Mp.js';
import './resize-controller-BJKfu6ft.js';
import './observe-slot-presence-Ceiwt-jV.js';
import './class-map-DdRvesrq.js';
import './directive-Bn5c4u4M.js';
import './spectrum-icon-checkmark.css-C_afKhIc.js';
import './sp-icon-chevron100-Dn3goYXa.js';
import './Chevron100-2ZEB0c-t.js';
import './spectrum-icon-chevron.css-C5c2rYXA.js';
import './DependencyManger-Dpkh1Bse.js';
import './slottable-request-event-DXuuyGoq.js';
import './sp-underlay-D3IrRzu0.js';
import './first-focusable-in-BK_DAWOm.js';
import './focusable-selectors-CUZEb4r9.js';
import './MatchMedia-SZ42m4IA.js';
import './modal.css-BQfDEsFe.js';

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

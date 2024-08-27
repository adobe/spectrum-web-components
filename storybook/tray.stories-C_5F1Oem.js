import './sp-dialog-BXXRsjCD.js';
import './sp-menu-BWEy12vg.js';
import './sp-menu-item-C8MCrD_m.js';
import './sp-menu-divider-ByotbH7R.js';
import './sp-tray-C606KZG7.js';
import { x } from './lit-html-COgVUehj.js';
import './sp-divider-DvQPBycM.js';
import './divider.css-B2ErksQK.js';
import './lit-element-BL-po2DW.js';
import './sizedMixin-BKu_31Nm.js';
import './define-element-CXRu6sWi.js';
import './sp-close-button-DeB-BbrO.js';
import './spectrum-icon-cross.css-BAONp4pC.js';
import './ButtonBase-B6EfsHA8.js';
import './like-anchor-BAH-foY5.js';
import './if-defined-DDJGFaN4.js';
import './focusable-BHn_FpaM.js';
import './focus-visible-D29Av9Xb.js';
import './observe-slot-text-CBh62R5W.js';
import './mutation-controller-D2lT1xZk.js';
import './query-assigned-nodes-DAYI4epk.js';
import './base-u8Z1Hrsd.js';
import './query-DQF6X5qW.js';
import './custom-tag-B5IH9PTE.js';
import './IconBase-LhykbR0q.js';
import './sp-icon-cross500-D_HHrgfj.js';
import './Cross500-HJNUUNvY.js';
import './sp-button-group-BnMjwnW7.js';
import './sp-icon-alert-Q6xYlBo2.js';
import './custom-tag-Diwq7nXX.js';
import './AlertDialog-C-vkQBmO.js';
import './sp-button-D1KAULH9.js';
import './when-DEJm_QN9.js';
import './random-id-BST1Puzz.js';
import './condition-attribute-with-id-Cnyhr7Mp.js';
import './resize-controller-BJKfu6ft.js';
import './observe-slot-presence-Ceiwt-jV.js';
import './class-map-DdRvesrq.js';
import './directive-Bn5c4u4M.js';
import './spectrum-icon-checkmark.css-BQx7WYUd.js';
import './sp-icon-chevron100-Bg4mTD65.js';
import './Chevron100-2ZEB0c-t.js';
import './spectrum-icon-chevron.css-C5c2rYXA.js';
import './DependencyManger-Dpkh1Bse.js';
import './slottable-request-event-DXuuyGoq.js';
import './sp-underlay-BzavupZT.js';
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

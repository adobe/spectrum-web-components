import './sp-dialog-CU3adQ2V.js';
import './sp-menu-C8v97wTb.js';
import './sp-menu-item-8u7lqO6f.js';
import './sp-menu-divider-CCA3Ih_f.js';
import './sp-tray-XcgLQ3Tc.js';
import { x } from './lit-html-COgVUehj.js';
import './sp-divider-C4qqgprH.js';
import './divider.css-B2ErksQK.js';
import './lit-element-BL-po2DW.js';
import './sizedMixin-Cgw04SVn.js';
import './define-element-DfDMCiEa.js';
import './sp-close-button-CIIV381x.js';
import './spectrum-icon-cross.css-BlifuMyY.js';
import './ButtonBase-C7Ofi_KG.js';
import './like-anchor-BYGSHbJ7.js';
import './if-defined-DDJGFaN4.js';
import './focusable-DH4iFM4s.js';
import './focus-visible-D29Av9Xb.js';
import './observe-slot-text-BtuI5sqC.js';
import './mutation-controller-D2lT1xZk.js';
import './query-assigned-nodes-DAYI4epk.js';
import './base-u8Z1Hrsd.js';
import './query-DQF6X5qW.js';
import './custom-tag-B5IH9PTE.js';
import './IconBase-Fm5B4nA1.js';
import './sp-icon-cross500-BK3u0Nvh.js';
import './Cross500-HJNUUNvY.js';
import './sp-button-group-BteaL6t5.js';
import './sp-icon-alert-BytVFlW2.js';
import './custom-tag-Diwq7nXX.js';
import './AlertDialog-BOt99ko7.js';
import './sp-button-B9ZHODJ3.js';
import './when-DEJm_QN9.js';
import './random-id-BST1Puzz.js';
import './condition-attribute-with-id-Cnyhr7Mp.js';
import './resize-controller-BJKfu6ft.js';
import './observe-slot-presence-Ceiwt-jV.js';
import './class-map-DdRvesrq.js';
import './directive-Bn5c4u4M.js';
import './spectrum-icon-checkmark.css-aJBgz3nt.js';
import './sp-icon-chevron100-rjktYDjS.js';
import './Chevron100-2ZEB0c-t.js';
import './spectrum-icon-chevron.css-C5c2rYXA.js';
import './DependencyManger-Dpkh1Bse.js';
import './slottable-request-event-DXuuyGoq.js';
import './sp-underlay-CnrPcC1Q.js';
import './first-focusable-in-BK_DAWOm.js';
import './focusable-selectors-CUZEb4r9.js';
import './MatchMedia-pSNe9kbs.js';
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

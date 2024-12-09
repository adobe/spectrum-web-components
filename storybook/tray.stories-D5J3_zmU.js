import './sp-dialog-C_oBj119.js';
import './sp-menu-CwKdnN4O.js';
import './sp-menu-item-BwIcje6B.js';
import './sp-menu-divider-D4JOFyHU.js';
import './sp-tray-45pHSSkS.js';
import { x } from './lit-html-COgVUehj.js';
import './sp-divider-CW7rxFuN.js';
import './divider.css-C7PIHskV.js';
import './lit-element-BulMEkr1.js';
import './sizedMixin-HBGPeo6s.js';
import './define-element-CbLZvyrL.js';
import './sp-close-button-CManuA8t.js';
import './icon-cross-overrides.css-DDISLFbH.js';
import './ButtonBase-ixFv8y71.js';
import './like-anchor-DD7X4GZI.js';
import './if-defined-DDJGFaN4.js';
import './focusable-8mrYv4ai.js';
import './focus-visible-D29Av9Xb.js';
import './observe-slot-text-nvMXakjD.js';
import './mutation-controller-D2lT1xZk.js';
import './query-assigned-nodes-DAYI4epk.js';
import './base-u8Z1Hrsd.js';
import './query-DQF6X5qW.js';
import './custom-tag-B5IH9PTE.js';
import './IconBase-Z2IxLljH.js';
import './state-DMEtq-nM.js';
import './sp-icon-cross500-CeKEkx1Y.js';
import './Cross500-Cv8kebkP.js';
import './sp-button-group-dKJojvdw.js';
import './sp-icon-alert-hlBBLxyR.js';
import './custom-tag-Diwq7nXX.js';
import './AlertDialog-DjBJ3b-x.js';
import './sp-button-RtDTDjdF.js';
import './PendingState-Ddh3k4V8.js';
import './get-label-from-slot-Cg6mfN40.js';
import './random-id-BST1Puzz.js';
import './condition-attribute-with-id-Cnyhr7Mp.js';
import './resize-controller-BJKfu6ft.js';
import './observe-slot-presence-Ceiwt-jV.js';
import './class-map-DdRvesrq.js';
import './directive-Bn5c4u4M.js';
import './icon-checkmark-overrides.css-DFANn-jw.js';
import './sp-icon-chevron100-CZ-Fj22K.js';
import './Chevron100-OyV1wQMZ.js';
import './icon-chevron-overrides.css-Bz8Nk10Z.js';
import './DependencyManger-Dpkh1Bse.js';
import './slottable-request-event-DXuuyGoq.js';
import './sp-underlay-BabZsihi.js';
import './first-focusable-in-BK_DAWOm.js';
import './focusable-selectors-CUZEb4r9.js';
import './MatchMedia-SZ42m4IA.js';
import './modal.css-fEtfRe6E.js';

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

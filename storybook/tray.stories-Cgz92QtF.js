import './sp-dialog-HOyCxUdK.js';
import './sp-menu-Bj8DrbR9.js';
import './sp-menu-item-Do1WjPZJ.js';
import './sp-menu-divider-D1sl1aH2.js';
import './sp-tray-C6Rt-Tc7.js';
import { x } from './lit-html-COgVUehj.js';
import './sp-divider-DLDHGuvh.js';
import './divider.css-C7PIHskV.js';
import './lit-element-BulMEkr1.js';
import './sizedMixin-D27dvb1g.js';
import './define-element-BacrH-dd.js';
import './sp-close-button-BQMi9PIM.js';
import './icon-cross-overrides.css-B1b1jEW8.js';
import './ButtonBase-DjpCcxMx.js';
import './like-anchor-BTdhD6VU.js';
import './if-defined-DDJGFaN4.js';
import './focusable-Qk_nX99k.js';
import './focus-visible-D29Av9Xb.js';
import './observe-slot-text-CG33WdGp.js';
import './mutation-controller-D2lT1xZk.js';
import './query-assigned-nodes-DAYI4epk.js';
import './base-u8Z1Hrsd.js';
import './query-DQF6X5qW.js';
import './custom-tag-B5IH9PTE.js';
import './IconBase-lDJoNs5V.js';
import './state-DWB0FQGh.js';
import './sp-icon-cross500-BQKM4d-b.js';
import './Cross500-Cv8kebkP.js';
import './sp-button-group-nrGxMcPT.js';
import './sp-icon-alert-CTB_1kHZ.js';
import './custom-tag-Diwq7nXX.js';
import './AlertDialog-CYZalv2x.js';
import './sp-button-qhC4v0uH.js';
import './PendingState-Dc-7wEUb.js';
import './get-label-from-slot-Cg6mfN40.js';
import './random-id-BST1Puzz.js';
import './condition-attribute-with-id-Cnyhr7Mp.js';
import './resize-controller-BJKfu6ft.js';
import './observe-slot-presence-Ceiwt-jV.js';
import './class-map-DdRvesrq.js';
import './directive-Bn5c4u4M.js';
import './icon-checkmark-overrides.css-CNlpiO4P.js';
import './sp-icon-chevron100-D186oDGl.js';
import './Chevron100-OyV1wQMZ.js';
import './icon-chevron-overrides.css-Bz8Nk10Z.js';
import './DependencyManger-Dpkh1Bse.js';
import './slottable-request-event-DXuuyGoq.js';
import './sp-underlay-DGHsMwd7.js';
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

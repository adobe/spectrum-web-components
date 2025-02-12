import './sp-dialog-2eCci9wG.js';
import './sp-menu-RLrO_nUh.js';
import './sp-menu-item-B4Ha1KcC.js';
import './sp-menu-divider-De1RnC5U.js';
import './sp-tray-BB_qlEMw.js';
import { x } from './lit-html-COgVUehj.js';
import './sp-divider-7mSK16ab.js';
import './divider.css-C7PIHskV.js';
import './lit-element-BulMEkr1.js';
import './sizedMixin-CvxKvEie.js';
import './define-element-JsEeAjlA.js';
import './sp-close-button-BN_0jq3n.js';
import './icon-cross-overrides.css-a6lElF1Q.js';
import './ButtonBase-EiAuB8cn.js';
import './like-anchor-C9Xos9l8.js';
import './if-defined-DDJGFaN4.js';
import './focusable-C0Y2600m.js';
import './focus-visible-D29Av9Xb.js';
import './observe-slot-text-DKkDovCf.js';
import './mutation-controller-D2lT1xZk.js';
import './query-assigned-nodes-DAYI4epk.js';
import './base-u8Z1Hrsd.js';
import './query-DQF6X5qW.js';
import './custom-tag-B5IH9PTE.js';
import './IconBase-Bmj8ZYSq.js';
import './state-CJdJtSzk.js';
import './sp-icon-cross500-DoIPFTBh.js';
import './Cross500-Cv8kebkP.js';
import './sp-button-group-D8yZLTSi.js';
import './sp-icon-alert-BIYj3aEh.js';
import './custom-tag-Diwq7nXX.js';
import './AlertDialog-C_VZtHLo.js';
import './sp-button-nbdGbWXQ.js';
import './PendingState-DrK3DVye.js';
import './get-label-from-slot-Cg6mfN40.js';
import './random-id-BST1Puzz.js';
import './condition-attribute-with-id-Cnyhr7Mp.js';
import './resize-controller-BJKfu6ft.js';
import './observe-slot-presence-Ceiwt-jV.js';
import './class-map-DdRvesrq.js';
import './directive-Bn5c4u4M.js';
import './icon-checkmark-overrides.css-BM8JyPpN.js';
import './sp-icon-chevron100-BV9O-ZIc.js';
import './Chevron100-OyV1wQMZ.js';
import './icon-chevron-overrides.css-Bz8Nk10Z.js';
import './DependencyManger-Dpkh1Bse.js';
import './slottable-request-event-DXuuyGoq.js';
import './sp-underlay-CoUAJlWY.js';
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

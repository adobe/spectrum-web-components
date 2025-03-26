import './sp-dialog-BL8303L7.js';
import './sp-menu-C8gwerW7.js';
import './sp-menu-item-BvCt6i1i.js';
import './sp-menu-divider-DO09jjiJ.js';
import './sp-tray-C0FGCqFQ.js';
import { x } from './lit-html-COgVUehj.js';
import './sp-button-group-CE41M4aF.js';
import './lit-element-BulMEkr1.js';
import './sizedMixin-BPhwmt-S.js';
import './define-element-Bun2ZgR-.js';
import './query-DQF6X5qW.js';
import './base-u8Z1Hrsd.js';
import './sp-close-button-lSGl90iz.js';
import './spectrum-icon-cross.css-BnEt-gNk.js';
import './ButtonBase-CsEYgJMd.js';
import './like-anchor-BaNwPfYf.js';
import './if-defined-DDJGFaN4.js';
import './focusable-y67P8eQI.js';
import './focus-visible-D29Av9Xb.js';
import './observe-slot-text-B-N3zGRD.js';
import './mutation-controller-D2lT1xZk.js';
import './query-assigned-nodes-DAYI4epk.js';
import './custom-tag-B5IH9PTE.js';
import './IconBase-luFyVpTn.js';
import './state-a9qXQZw8.js';
import './sp-icon-cross500-YCeW9dRQ.js';
import './Cross500-Cv8kebkP.js';
import './sp-divider-3kMtD0vw.js';
import './divider.css-CtZfV7_5.js';
import './sp-icon-alert-C9LsQVsg.js';
import './custom-tag-Diwq7nXX.js';
import './AlertDialog-HG6NuEhI.js';
import './sp-button-7UsB7th2.js';
import './PendingState-E3cyhDnE.js';
import './get-label-from-slot-Cg6mfN40.js';
import './random-id-BST1Puzz.js';
import './condition-attribute-with-id-Cnyhr7Mp.js';
import './resize-controller-BJKfu6ft.js';
import './observe-slot-presence-Ceiwt-jV.js';
import './class-map-DdRvesrq.js';
import './directive-Bn5c4u4M.js';
import './RovingTabindex-BIFuw_W7.js';
import './FocusGroup-CQTGJWkN.js';
import './spectrum-icon-checkmark.css-Df67pkTu.js';
import './sp-icon-chevron100-6ixyTd8T.js';
import './Chevron100-OyV1wQMZ.js';
import './spectrum-icon-chevron.css-CeYia-Jd.js';
import './DependencyManger-Dpkh1Bse.js';
import './slottable-request-event-DXuuyGoq.js';
import './sp-underlay-BPAUVGZw.js';
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

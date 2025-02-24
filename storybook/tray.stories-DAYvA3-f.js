import './sp-dialog-Rb1WPF0B.js';
import './sp-menu-BSg3IAdW.js';
import './sp-menu-item-KrzSVYpa.js';
import './sp-menu-divider-BXnOpNAH.js';
import './sp-tray-BdmPmUFJ.js';
import { x } from './lit-html-COgVUehj.js';
import './sp-divider-DKz7r0i2.js';
import './divider.css-CtZfV7_5.js';
import './lit-element-BulMEkr1.js';
import './sizedMixin-SWvQmBKY.js';
import './define-element-B7NoFsQI.js';
import './sp-close-button-X_CUt1V4.js';
import './spectrum-icon-cross.css-cEqpDoFW.js';
import './ButtonBase-CVCDQq4P.js';
import './like-anchor-BQR4wmj8.js';
import './if-defined-DDJGFaN4.js';
import './focusable-CtU8nZTr.js';
import './focus-visible-D29Av9Xb.js';
import './observe-slot-text-DVS1yx82.js';
import './mutation-controller-D2lT1xZk.js';
import './query-assigned-nodes-DAYI4epk.js';
import './base-u8Z1Hrsd.js';
import './query-DQF6X5qW.js';
import './custom-tag-B5IH9PTE.js';
import './IconBase-DXeaJSV5.js';
import './state-CG9Kyp94.js';
import './sp-icon-cross500-Di485fH6.js';
import './Cross500-Cv8kebkP.js';
import './sp-button-group-Cbk2a9tL.js';
import './sp-icon-alert-DAp49GVT.js';
import './custom-tag-Diwq7nXX.js';
import './AlertDialog-CCI49rHz.js';
import './sp-button-CCjeFkWT.js';
import './PendingState-D1EWknyv.js';
import './get-label-from-slot-Cg6mfN40.js';
import './random-id-BST1Puzz.js';
import './condition-attribute-with-id-Cnyhr7Mp.js';
import './resize-controller-BJKfu6ft.js';
import './observe-slot-presence-Ceiwt-jV.js';
import './class-map-DdRvesrq.js';
import './directive-Bn5c4u4M.js';
import './spectrum-icon-checkmark.css-B9su_ZeY.js';
import './sp-icon-chevron100-DUm3RyOH.js';
import './Chevron100-OyV1wQMZ.js';
import './spectrum-icon-chevron.css-CeYia-Jd.js';
import './DependencyManger-Dpkh1Bse.js';
import './slottable-request-event-DXuuyGoq.js';
import './sp-underlay-DnxWMrbv.js';
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

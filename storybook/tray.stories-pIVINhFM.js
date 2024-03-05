import './sp-dialog-1nENGXfj.js';
import './sp-menu-vKm9EXYM.js';
import './sp-menu-item-N-0TaoiF.js';
import './sp-menu-divider-oQzf6Djb.js';
import './sp-tray-KpQgAlQI.js';
import { x } from './lit-html-GmIhAbMP.js';
import './sp-divider-WftRh8OU.js';
import './divider.css-J1TsgOfe.js';
import './lit-element-xBOPiTek.js';
import './sizedMixin-IBQibr2z.js';
import './define-element-z6bXN_P5.js';
import './base-STdhtiz1.js';
import './sp-close-button-F0_4B7Dg.js';
import './spectrum-icon-cross.css-NAMb6F9U.js';
import './ButtonBase-xfo9cPrz.js';
import './like-anchor-iRdC2T2x.js';
import './if-defined-pV6JZKXB.js';
import './focusable-M0S89eyW.js';
import './focus-visible-68QWcOy-.js';
import './observe-slot-text-MDYPopbw.js';
import './mutation-controller-KeE5MDSl.js';
import './query-assigned-nodes-qh-rhz36.js';
import './query-JMOstM_r.js';
import './custom-tag-z2Xx81l9.js';
import './IconBase-1lzddWrP.js';
import './sp-icon-cross500-MLi7bA4s.js';
import './Cross500-CuS5PwKf.js';
import './sp-button-group-0qUjMOW-.js';
import './sp-icon-alert-IfxTE-S5.js';
import './custom-tag-JXLWq-Sj.js';
import './AlertDialog-0O57hEy-.js';
import './sp-button-St5-WM_S.js';
import './when-kvvOyHr2.js';
import './condition-attribute-with-id-nb2zon-s.js';
import './resize-controller--ByFn5Jx.js';
import './observe-slot-presence-tyJ_SCNf.js';
import './class-map-Q7DIFm9x.js';
import './directive-C1gRZbRe.js';
import './spectrum-icon-checkmark.css-F44WP9wj.js';
import './sp-icon-chevron100-uB3eMtQr.js';
import './Chevron100-ok1mOHjI.js';
import './spectrum-icon-chevron.css-i0thkS8X.js';
import './random-id-M2k-wjyE.js';
import './sp-underlay-LbN_7iY5.js';
import './first-focusable-in-LZ7hcu4z.js';
import './focusable-selectors-VCrFWGqo.js';
import './MatchMedia-SMh19R1m.js';
import './modal.css-JF8KQ-ZN.js';

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

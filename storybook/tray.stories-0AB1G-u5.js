import './sp-dialog-dkCFsNzA.js';
import './sp-menu-FQVYzy9J.js';
import './sp-menu-item-WU5O76xQ.js';
import './sp-menu-divider-_m0GybmG.js';
import './sp-tray-ny9ROp-B.js';
import { x } from './lit-html-GmIhAbMP.js';
import './sp-divider-ciRzsn_p.js';
import './divider.css-w129hLpK.js';
import './lit-element-xBOPiTek.js';
import './sizedMixin-6sBuja8e.js';
import './define-element-UHExAFdK.js';
import './base-STdhtiz1.js';
import './sp-close-button-RT_ZgufS.js';
import './spectrum-icon-cross.css-1cFDaPoP.js';
import './ButtonBase-sZHeZCuW.js';
import './like-anchor-njINSPTN.js';
import './if-defined-pV6JZKXB.js';
import './focusable-p9xQieT8.js';
import './focus-visible-68QWcOy-.js';
import './observe-slot-text-5oGzzbFn.js';
import './mutation-controller-KeE5MDSl.js';
import './query-assigned-nodes-7fQrqAdh.js';
import './query-JMOstM_r.js';
import './custom-tag-z2Xx81l9.js';
import './IconBase-Tav-FzmR.js';
import './sp-icon-cross500-sf0nDjEl.js';
import './Cross500-CuS5PwKf.js';
import './sp-button-group-c_YOTiHm.js';
import './sp-icon-alert-8xHFckqN.js';
import './custom-tag-JXLWq-Sj.js';
import './AlertDialog-_uLDfnbb.js';
import './sp-button-idIiKTnO.js';
import './when-kvvOyHr2.js';
import './condition-attribute-with-id-nb2zon-s.js';
import './resize-controller--ByFn5Jx.js';
import './observe-slot-presence-tyJ_SCNf.js';
import './class-map-Q7DIFm9x.js';
import './directive-C1gRZbRe.js';
import './spectrum-icon-checkmark.css-QI1dlyU-.js';
import './sp-icon-chevron100-tb9aielX.js';
import './Chevron100-WZwzwvjg.js';
import './spectrum-icon-chevron.css-nkKXiUlE.js';
import './random-id-M2k-wjyE.js';
import './sp-underlay-xE0l9xLO.js';
import './first-focusable-in-LZ7hcu4z.js';
import './focusable-selectors-VCrFWGqo.js';
import './MatchMedia-SMh19R1m.js';
import './modal.css-xwtx-S13.js';

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

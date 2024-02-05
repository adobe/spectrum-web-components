import './sp-dialog-SsXcWaUa.js';
import './sp-menu-rNqdCkwX.js';
import './sp-menu-item-ll9spFiY.js';
import './sp-menu-divider-2673MXbM.js';
import './sp-tray-mTvfUPdU.js';
import { x } from './lit-html-GmIhAbMP.js';
import './sp-divider-GAw1eG-h.js';
import './divider.css-w129hLpK.js';
import './lit-element-xBOPiTek.js';
import './sizedMixin-mnNfh2gr.js';
import './define-element-2O4ZhTAw.js';
import './base-STdhtiz1.js';
import './sp-close-button-xmnVNxRt.js';
import './spectrum-icon-cross.css-qXBF5GML.js';
import './ButtonBase-H8ie1_xx.js';
import './like-anchor-J4T73PxR.js';
import './if-defined-pV6JZKXB.js';
import './focusable-WZR9a5Bc.js';
import './focus-visible-68QWcOy-.js';
import './observe-slot-text-ybW1xuBS.js';
import './mutation-controller-KeE5MDSl.js';
import './query-assigned-nodes-aJM_vOZ4.js';
import './query-JMOstM_r.js';
import './custom-tag-z2Xx81l9.js';
import './IconBase-TDmbHQaH.js';
import './sp-icon-cross500-b7wJeVSY.js';
import './Cross500-CuS5PwKf.js';
import './sp-button-group-dfijI00y.js';
import './sp-icon-alert-Bolxr-zN.js';
import './custom-tag-JXLWq-Sj.js';
import './AlertDialog-4wUJEG5g.js';
import './sp-button-RmYXnt4x.js';
import './when-kvvOyHr2.js';
import './condition-attribute-with-id-nb2zon-s.js';
import './resize-controller--ByFn5Jx.js';
import './observe-slot-presence-tyJ_SCNf.js';
import './class-map-Q7DIFm9x.js';
import './directive-C1gRZbRe.js';
import './spectrum-icon-checkmark.css-3xBPG61g.js';
import './sp-icon-chevron100-vrIsKneV.js';
import './Chevron100-WZwzwvjg.js';
import './spectrum-icon-chevron.css-8l4pupPT.js';
import './sp-underlay-1R8IorrD.js';
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

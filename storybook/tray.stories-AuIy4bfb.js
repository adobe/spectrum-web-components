import './sp-dialog-sB41IToA.js';
import './sp-menu-PyZ2tt_N.js';
import './sp-menu-item-lnTe8cPw.js';
import './sp-menu-divider-BEpJLzyd.js';
import './sp-tray-CUzLgmw9.js';
import { x } from './lit-html-GmIhAbMP.js';
import './sp-divider-0HugelKz.js';
import './divider.css-w129hLpK.js';
import './lit-element-xBOPiTek.js';
import './sizedMixin-qrvMoaCA.js';
import './define-element-IUrhCXKn.js';
import './base-STdhtiz1.js';
import './sp-close-button-q8bGNosG.js';
import './spectrum-icon-cross.css-ozsx60Ma.js';
import './ButtonBase-nL2qW8Lw.js';
import './like-anchor-PHkAP_YZ.js';
import './if-defined-pV6JZKXB.js';
import './focusable-zbBPTVfi.js';
import './focus-visible-68QWcOy-.js';
import './observe-slot-text-CVZsl2bC.js';
import './mutation-controller-KeE5MDSl.js';
import './query-assigned-nodes-mXMsr4SG.js';
import './query-JMOstM_r.js';
import './custom-tag-z2Xx81l9.js';
import './IconBase-_gvXsC2f.js';
import './sp-button-group-torfWCzh.js';
import './sp-icon-alert-8oes3o2-.js';
import './custom-tag-JXLWq-Sj.js';
import './AlertDialog-aoAILym8.js';
import './sp-button-0ujDvHO2.js';
import './when-kvvOyHr2.js';
import './condition-attribute-with-id-nb2zon-s.js';
import './resize-controller--ByFn5Jx.js';
import './observe-slot-presence-tyJ_SCNf.js';
import './class-map-Q7DIFm9x.js';
import './directive-C1gRZbRe.js';
import './spectrum-icon-checkmark.css-QHy1sRmP.js';
import './sp-icon-chevron100-tD6SrTfS.js';
import './Chevron100-WZwzwvjg.js';
import './spectrum-icon-chevron.css-8l4pupPT.js';
import './sp-underlay-mWxQ3IJ7.js';
import './first-focusable-in-LZ7hcu4z.js';
import './focusable-selectors-VCrFWGqo.js';
import './MatchMedia-SMh19R1m.js';
import './modal.css-CqpIvq2y.js';

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

import './sp-dialog-LleoE1Ku.js';
import './sp-menu-4vecIofk.js';
import './sp-menu-item-PuYeADKw.js';
import './sp-menu-divider-P5gXuktb.js';
import './sp-tray-f-x-VuRB.js';
import { x } from './lit-html-GmIhAbMP.js';
import './sp-divider-mPFCMjwD.js';
import './divider.css-_gDvtMpM.js';
import './lit-element-xBOPiTek.js';
import './sizedMixin-SQxNgkJG.js';
import './define-element-b58XwwBM.js';
import './base-STdhtiz1.js';
import './sp-close-button-TmEbJuVO.js';
import './spectrum-icon-cross.css-ZE2cfwM7.js';
import './ButtonBase-8MKa1AnW.js';
import './like-anchor-SzCf8Fo9.js';
import './if-defined-pV6JZKXB.js';
import './focusable-XJQHb8mq.js';
import './focus-visible-68QWcOy-.js';
import './observe-slot-text-sowxnoY7.js';
import './mutation-controller-KeE5MDSl.js';
import './query-assigned-nodes-NJVGD18T.js';
import './query-JMOstM_r.js';
import './custom-tag-z2Xx81l9.js';
import './IconBase-O-P913zU.js';
import './sp-icon-cross500-RGnvKI4J.js';
import './Cross500-CuS5PwKf.js';
import './sp-button-group-2-SmZQuE.js';
import './sp-icon-alert-R3VPMRV3.js';
import './custom-tag-JXLWq-Sj.js';
import './AlertDialog-pfqvsQ4O.js';
import './sp-button-n-ZLKQ9l.js';
import './when-kvvOyHr2.js';
import './condition-attribute-with-id-nb2zon-s.js';
import './resize-controller--ByFn5Jx.js';
import './observe-slot-presence-tyJ_SCNf.js';
import './class-map-Q7DIFm9x.js';
import './directive-C1gRZbRe.js';
import './spectrum-icon-checkmark.css-HAq4zshr.js';
import './sp-icon-chevron100-Z3b2AbFg.js';
import './Chevron100-ok1mOHjI.js';
import './spectrum-icon-chevron.css-nkKXiUlE.js';
import './random-id-M2k-wjyE.js';
import './sp-underlay-NDHH1WvU.js';
import './first-focusable-in-LZ7hcu4z.js';
import './focusable-selectors-VCrFWGqo.js';
import './MatchMedia-SMh19R1m.js';
import './modal.css-G7yJjBNB.js';

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

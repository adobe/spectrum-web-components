import './sp-dialog-Cua0Cown.js';
import './sp-menu-aukB87hm.js';
import './sp-menu-item-BnuqroME.js';
import './sp-menu-divider-IXmQjkt_.js';
import './sp-tray-Qv2lrjSf.js';
import { x } from './lit-html-GmIhAbMP.js';
import './sp-divider-KH2bPAuz.js';
import './divider.css-w129hLpK.js';
import './lit-element-xBOPiTek.js';
import './sizedMixin-D9_yg9Lr.js';
import './define-element-s04w2teA.js';
import './base-STdhtiz1.js';
import './sp-close-button-__rs1xx6.js';
import './spectrum-icon-cross.css-Lnx-mdgp.js';
import './ButtonBase-jlLlzNEe.js';
import './like-anchor-Gwp5ooDH.js';
import './if-defined-pV6JZKXB.js';
import './focusable-mx5LgJ38.js';
import './focus-visible-68QWcOy-.js';
import './observe-slot-text-eZT7feU8.js';
import './mutation-controller-KeE5MDSl.js';
import './query-assigned-nodes-u86daeBT.js';
import './query-JMOstM_r.js';
import './custom-tag-z2Xx81l9.js';
import './IconBase-_0RU6XqS.js';
import './sp-button-group-RLQ_aOSl.js';
import './sp-icon-alert-CNIIZm3E.js';
import './custom-tag-JXLWq-Sj.js';
import './AlertDialog-00b_a74d.js';
import './sp-button-W8hFYHyg.js';
import './when-kvvOyHr2.js';
import './condition-attribute-with-id-nb2zon-s.js';
import './resize-controller--ByFn5Jx.js';
import './observe-slot-presence-tyJ_SCNf.js';
import './class-map-Q7DIFm9x.js';
import './directive-C1gRZbRe.js';
import './spectrum-icon-checkmark.css-T4LCyo5k.js';
import './sp-icon-chevron100-3PcMAyn_.js';
import './Chevron100-WZwzwvjg.js';
import './spectrum-icon-chevron.css-8l4pupPT.js';
import './sp-underlay--W8tWQXm.js';
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

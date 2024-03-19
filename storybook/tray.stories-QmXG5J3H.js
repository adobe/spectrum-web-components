import './sp-dialog-1fHocsR9.js';
import './sp-menu-yyR1trsN.js';
import './sp-menu-item-dzr3-vzb.js';
import './sp-menu-divider-GnA2SRvx.js';
import './sp-tray-UBn20hKA.js';
import { x } from './lit-html-GmIhAbMP.js';
import './sp-divider-jhXT_WtI.js';
import './divider.css-J1TsgOfe.js';
import './lit-element-xBOPiTek.js';
import './sizedMixin-VwrJiqSW.js';
import './define-element-lju0qz2P.js';
import './query-assigned-elements-1m6Cs7Ix.js';
import './base-STdhtiz1.js';
import './sp-close-button-JNwUg8gE.js';
import './spectrum-icon-cross.css-8PYVteVZ.js';
import './ButtonBase-HA5NNgN2.js';
import './like-anchor-a_wuYSt2.js';
import './if-defined-pV6JZKXB.js';
import './focusable-wnRI1QCz.js';
import './focus-visible-68QWcOy-.js';
import './observe-slot-text-HaH5WFZ0.js';
import './mutation-controller-KeE5MDSl.js';
import './query-assigned-nodes-jGvx5qKR.js';
import './query-JMOstM_r.js';
import './custom-tag-z2Xx81l9.js';
import './IconBase-YN3-eQCN.js';
import './sp-icon-cross500-2e8t4Utt.js';
import './Cross500-CuS5PwKf.js';
import './sp-button-group-P3ltpV_H.js';
import './sp-icon-alert-FVCBnC1q.js';
import './custom-tag-JXLWq-Sj.js';
import './AlertDialog-5MQ60UU8.js';
import './sp-button-dfYWkmHE.js';
import './when-kvvOyHr2.js';
import './condition-attribute-with-id-nb2zon-s.js';
import './resize-controller--ByFn5Jx.js';
import './observe-slot-presence-tyJ_SCNf.js';
import './class-map-Q7DIFm9x.js';
import './directive-C1gRZbRe.js';
import './spectrum-icon-checkmark.css-EqJn5hpL.js';
import './sp-icon-chevron100-hP_myJxP.js';
import './Chevron100-ok1mOHjI.js';
import './spectrum-icon-chevron.css-hA8DP86t.js';
import './random-id-M2k-wjyE.js';
import './sp-underlay-G8FhBDeQ.js';
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

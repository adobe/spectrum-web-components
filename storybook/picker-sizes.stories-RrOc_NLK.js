import './sp-picker-SWu-mC3R.js';
import './sp-menu-IOObpxkj.js';
import './sp-menu-item-owaTMTdi.js';
import { x } from './lit-html-GmIhAbMP.js';
import './Picker-tqqjHVSO.js';
import './lit-element-xBOPiTek.js';
import './spectrum-icon-chevron.css-hA8DP86t.js';
import './focusable-GZ06kf6F.js';
import './focus-visible-68QWcOy-.js';
import './define-element-tO8-r1bu.js';
import './sp-icon-chevron100-byRnlRuE.js';
import './Chevron100-ok1mOHjI.js';
import './custom-tag-z2Xx81l9.js';
import './IconBase-EFa3DHxz.js';
import './sp-icon-alert-HIZE6wdL.js';
import './custom-tag-JXLWq-Sj.js';
import './MatchMedia-SMh19R1m.js';
import './DependencyManger-0SYmL--C.js';
import './class-map-Q7DIFm9x.js';
import './directive-C1gRZbRe.js';
import './style-map-ak5mT6xX.js';
import './sizedMixin-JAQz02f5.js';
import './query-assigned-elements-1m6Cs7Ix.js';
import './base-STdhtiz1.js';
import './if-defined-pV6JZKXB.js';
import './when-kvvOyHr2.js';
import './state-W6so4P5i.js';
import './query-JMOstM_r.js';
import './spectrum-icon-checkmark.css-vEh5gvyq.js';
import './like-anchor-A-VxslPW.js';
import './mutation-controller-KeE5MDSl.js';
import './slottable-request-event-SQgFLN7g.js';
import './observe-slot-text-RiUvi5fT.js';
import './query-assigned-nodes-jGvx5qKR.js';
import './observe-slot-presence-tyJ_SCNf.js';
import './random-id-M2k-wjyE.js';

var pickerSizes_stories = {
  title: "Picker/Sizes",
  component: "sp-picker",
  argTypes: {
    onChange: { action: "change" },
    invalid: {
      name: "invalid",
      type: { name: "boolean", required: false },
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: false }
      },
      control: {
        type: "boolean"
      }
    },
    pending: {
      name: "pending",
      type: { name: "boolean", required: false },
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
const picker = ({
  onChange,
  open,
  size,
  pending,
  invalid
}) => {
  return x`
        <sp-field-label for="picker-${size}" size=${size}>
            Where do you live?
        </sp-field-label>
        <sp-picker
            id="picker-${size}"
            size=${size}
            @change="${(event) => {
    const picker2 = event.target;
    onChange(picker2.value);
  }}"
            label="Select a Country with a very long label, too long, in fact"
            ?pending="${pending}"
            ?invalid="${invalid}"
            ?open=${open}
        >
            <sp-menu-item>Deselect</sp-menu-item>
            <sp-menu-item>Select Inverse</sp-menu-item>
            <sp-menu-item>Feather...</sp-menu-item>
            <sp-menu-item>Select and Mask...</sp-menu-item>
            <sp-menu-item>Save Selection</sp-menu-item>
            <sp-menu-item disabled>Make Work Path</sp-menu-item>
        </sp-picker>
    `;
};
const s = (args) => picker({ ...args, size: "s" });
const sOpen = (args) => picker({ ...args, open: true, size: "s" });
const m = (args) => picker({ ...args, size: "m" });
const mOpen = (args) => picker({ ...args, open: true, size: "m" });
const l = (args) => picker({ ...args, size: "l" });
const lOpen = (args) => picker({ ...args, open: true, size: "l" });
const XL = (args) => picker({ ...args, size: "xl" });
const XLOpen = (args) => picker({ ...args, open: true, size: "xl" });
const __namedExportsOrder = ['s', 'sOpen', 'm', 'mOpen', 'l', 'lOpen', 'XL', 'XLOpen'];

export { XL, XLOpen, __namedExportsOrder, pickerSizes_stories as default, l, lOpen, m, mOpen, s, sOpen };

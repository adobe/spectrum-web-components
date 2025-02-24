import './sp-picker-wAkGFqvZ.js';
import './sp-menu-BSg3IAdW.js';
import './sp-menu-item-KrzSVYpa.js';
import { x } from './lit-html-COgVUehj.js';
import './Picker-BoHus1Kj.js';
import './lit-element-BulMEkr1.js';
import './spectrum-icon-chevron.css-CeYia-Jd.js';
import './focusable-CtU8nZTr.js';
import './focus-visible-D29Av9Xb.js';
import './define-element-B7NoFsQI.js';
import './sp-icon-chevron100-DUm3RyOH.js';
import './custom-tag-B5IH9PTE.js';
import './Chevron100-OyV1wQMZ.js';
import './IconBase-DXeaJSV5.js';
import './state-CG9Kyp94.js';
import './sp-icon-alert-DAp49GVT.js';
import './custom-tag-Diwq7nXX.js';
import './MatchMedia-SZ42m4IA.js';
import './DependencyManger-Dpkh1Bse.js';
import './PendingState-D1EWknyv.js';
import './get-label-from-slot-Cg6mfN40.js';
import './sizedMixin-SWvQmBKY.js';
import './if-defined-DDJGFaN4.js';
import './query-DQF6X5qW.js';
import './base-u8Z1Hrsd.js';
import './platform-r3Lf9REX.js';
import './class-map-DdRvesrq.js';
import './directive-Bn5c4u4M.js';
import './style-map-DtKTc8KS.js';
import './spectrum-icon-checkmark.css-B9su_ZeY.js';
import './like-anchor-BQR4wmj8.js';
import './mutation-controller-D2lT1xZk.js';
import './slottable-request-event-DXuuyGoq.js';
import './observe-slot-text-DVS1yx82.js';
import './query-assigned-nodes-DAYI4epk.js';
import './observe-slot-presence-Ceiwt-jV.js';
import './random-id-BST1Puzz.js';

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

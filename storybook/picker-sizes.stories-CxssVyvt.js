import './sp-picker-BzPgduwq.js';
import './sp-menu-CUlDsjuI.js';
import './sp-menu-item-C1UX3rOw.js';
import { x } from './lit-html-COgVUehj.js';
import './Picker-sbrTRXP-.js';
import './lit-element-BL-po2DW.js';
import './spectrum-icon-chevron.css-C5c2rYXA.js';
import './focusable-CfMGZF2L.js';
import './focus-visible-D29Av9Xb.js';
import './define-element-9Zj84-C8.js';
import './sp-icon-chevron100-BVn8JicT.js';
import './Chevron100-2ZEB0c-t.js';
import './custom-tag-B5IH9PTE.js';
import './IconBase-L76-n75s.js';
import './sp-icon-alert-GYTZvYm3.js';
import './custom-tag-Diwq7nXX.js';
import './MatchMedia-pSNe9kbs.js';
import './DependencyManger-Dpkh1Bse.js';
import './class-map-DdRvesrq.js';
import './directive-Bn5c4u4M.js';
import './style-map-DtKTc8KS.js';
import './sizedMixin-H6qLwJc0.js';
import './if-defined-DDJGFaN4.js';
import './when-DEJm_QN9.js';
import './state-DdC_O7Nr.js';
import './query-DQF6X5qW.js';
import './base-u8Z1Hrsd.js';
import './spectrum-icon-checkmark.css-B4Pvgr0C.js';
import './like-anchor-c-omWQV-.js';
import './mutation-controller-D2lT1xZk.js';
import './slottable-request-event-DXuuyGoq.js';
import './observe-slot-text-Dr0dVrDu.js';
import './query-assigned-nodes-DAYI4epk.js';
import './random-id-BST1Puzz.js';
import './observe-slot-presence-Ceiwt-jV.js';

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

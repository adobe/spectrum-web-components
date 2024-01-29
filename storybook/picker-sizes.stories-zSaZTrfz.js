import './sp-picker-U0hv5Mo5.js';
import './sp-menu-aukB87hm.js';
import './sp-menu-item-BnuqroME.js';
import { x } from './lit-html-GmIhAbMP.js';
import './Picker-C-8dV5AK.js';
import './lit-element-xBOPiTek.js';
import './spectrum-icon-chevron.css-8l4pupPT.js';
import './focusable-mx5LgJ38.js';
import './focus-visible-68QWcOy-.js';
import './define-element-s04w2teA.js';
import './sp-icon-chevron100-3PcMAyn_.js';
import './Chevron100-WZwzwvjg.js';
import './custom-tag-z2Xx81l9.js';
import './IconBase-_0RU6XqS.js';
import './sp-icon-alert-CNIIZm3E.js';
import './custom-tag-JXLWq-Sj.js';
import './MatchMedia-SMh19R1m.js';
import './class-map-Q7DIFm9x.js';
import './directive-C1gRZbRe.js';
import './style-map-ak5mT6xX.js';
import './sizedMixin-D9_yg9Lr.js';
import './base-STdhtiz1.js';
import './if-defined-pV6JZKXB.js';
import './state-BSEind79.js';
import './query-JMOstM_r.js';
import './spectrum-icon-checkmark.css-T4LCyo5k.js';
import './like-anchor-Gwp5ooDH.js';
import './mutation-controller-KeE5MDSl.js';
import './observe-slot-text-eZT7feU8.js';
import './query-assigned-nodes-u86daeBT.js';
import './observe-slot-presence-tyJ_SCNf.js';

var pickerSizes_stories = {
  title: "Picker/Sizes",
  component: "sp-picker",
  argTypes: {
    onChange: { action: "change" }
  }
};
const picker = ({
  onChange,
  open,
  size
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

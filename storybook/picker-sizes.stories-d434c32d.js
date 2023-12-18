import './sp-picker-c2f902c1.js';
import './sp-menu-b9e57a20.js';
import './sp-menu-item-a8496cf1.js';
import { x } from './lit-html-126adc72.js';
import './Picker-50b2dc89.js';
import './lit-element-9354aa77.js';
import './spectrum-icon-chevron.css-d3283c08.js';
import './focusable-391b57ba.js';
import './focus-visible-03398d98.js';
import './define-element-7dc6a572.js';
import './sp-icon-chevron100-19c0ec20.js';
import './Chevron100-6f55b923.js';
import './custom-tag-c228386e.js';
import './IconBase-7772fb01.js';
import './sp-icon-alert-f7ff11b9.js';
import './custom-tag-b5526d41.js';
import './MatchMedia-0123f918.js';
import './class-map-14530ec2.js';
import './directive-2bb7789e.js';
import './style-map-156e3c36.js';
import './sizedMixin-3d08a58f.js';
import './base-511c8c11.js';
import './if-defined-ae83b405.js';
import './state-3927c84f.js';
import './query-d0113d5a.js';
import './spectrum-icon-checkmark.css-ebf23520.js';
import './like-anchor-8f97823d.js';
import './mutation-controller-81a30f7f.js';
import './observe-slot-text-769cbc70.js';
import './query-assigned-nodes-d63886c3.js';
import './observe-slot-presence-ae37a9bc.js';

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

import './sp-picker-08cac453.js';
import './sp-menu-a6b50bf6.js';
import './sp-menu-item-d1901258.js';
import { x } from './lit-html-126adc72.js';
import './Picker-7a452146.js';
import './lit-element-9354aa77.js';
import './spectrum-icon-chevron.css-d3283c08.js';
import './focusable-df7b829e.js';
import './focus-visible-03398d98.js';
import './define-element-467f3dc4.js';
import './sp-icon-chevron100-d31cf739.js';
import './Chevron100-6f55b923.js';
import './custom-tag-c228386e.js';
import './IconBase-fdbfb1c1.js';
import './sp-icon-alert-107ad358.js';
import './custom-tag-b5526d41.js';
import './MatchMedia-0123f918.js';
import './class-map-14530ec2.js';
import './directive-2bb7789e.js';
import './style-map-156e3c36.js';
import './sizedMixin-95b38e3e.js';
import './base-511c8c11.js';
import './if-defined-ae83b405.js';
import './state-879d3fe4.js';
import './query-d0113d5a.js';
import './spectrum-icon-checkmark.css-2fc91f81.js';
import './like-anchor-79c92c76.js';
import './mutation-controller-81a30f7f.js';
import './observe-slot-text-2a3e6366.js';
import './query-assigned-nodes-6218f033.js';
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

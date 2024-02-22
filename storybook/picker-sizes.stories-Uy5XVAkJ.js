import './sp-picker-bs90PbqY.js';
import './sp-menu-4vecIofk.js';
import './sp-menu-item-PuYeADKw.js';
import { x } from './lit-html-GmIhAbMP.js';
import './Picker-YX902jDF.js';
import './lit-element-xBOPiTek.js';
import './spectrum-icon-chevron.css-nkKXiUlE.js';
import './focusable-XJQHb8mq.js';
import './focus-visible-68QWcOy-.js';
import './define-element-b58XwwBM.js';
import './sp-icon-chevron100-Z3b2AbFg.js';
import './Chevron100-ok1mOHjI.js';
import './custom-tag-z2Xx81l9.js';
import './IconBase-O-P913zU.js';
import './sp-icon-alert-R3VPMRV3.js';
import './custom-tag-JXLWq-Sj.js';
import './MatchMedia-SMh19R1m.js';
import './class-map-Q7DIFm9x.js';
import './directive-C1gRZbRe.js';
import './style-map-ak5mT6xX.js';
import './sizedMixin-SQxNgkJG.js';
import './base-STdhtiz1.js';
import './if-defined-pV6JZKXB.js';
import './state-OAXf-QuH.js';
import './query-JMOstM_r.js';
import './spectrum-icon-checkmark.css-HAq4zshr.js';
import './like-anchor-SzCf8Fo9.js';
import './mutation-controller-KeE5MDSl.js';
import './observe-slot-text-sowxnoY7.js';
import './query-assigned-nodes-NJVGD18T.js';
import './observe-slot-presence-tyJ_SCNf.js';
import './random-id-M2k-wjyE.js';

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

import { f as fruits } from './index-TWpWjnZp.js';
import { i as isOverlayOpen } from './index-X5nIn6KY.js';
import './sp-field-label-LR663cei.js';
import { x } from './lit-html-GmIhAbMP.js';
import './sp-overlay-8v49LtLr.js';
import './define-element-tO8-r1bu.js';
import './lit-element-xBOPiTek.js';
import './ElementResolution-TTOqkMM7.js';
import './random-id-M2k-wjyE.js';
import './first-focusable-in-LZ7hcu4z.js';
import './focusable-selectors-VCrFWGqo.js';
import './condition-attribute-with-id-nb2zon-s.js';
import './platform-c1C9ET3y.js';
import './slottable-request-event-SQgFLN7g.js';
import './query-assigned-elements-1m6Cs7Ix.js';
import './base-STdhtiz1.js';
import './query-JMOstM_r.js';
import './state-W6so4P5i.js';
import './if-defined-pV6JZKXB.js';
import './style-map-ak5mT6xX.js';
import './directive-C1gRZbRe.js';
import './sp-icon-chevron100-byRnlRuE.js';
import './Chevron100-ok1mOHjI.js';
import './custom-tag-z2Xx81l9.js';
import './IconBase-EFa3DHxz.js';
import './sp-popover-X_Nz1ZdE.js';
import './Popover-JrqWjzho.js';
import './sp-menu-IOObpxkj.js';
import './sizedMixin-JAQz02f5.js';
import './sp-menu-item-owaTMTdi.js';
import './spectrum-icon-checkmark.css-vEh5gvyq.js';
import './like-anchor-A-VxslPW.js';
import './focusable-GZ06kf6F.js';
import './focus-visible-68QWcOy-.js';
import './spectrum-icon-chevron.css-hA8DP86t.js';
import './DependencyManger-0SYmL--C.js';
import './mutation-controller-KeE5MDSl.js';
import './observe-slot-text-RiUvi5fT.js';
import './query-assigned-nodes-jGvx5qKR.js';
import './observe-slot-presence-tyJ_SCNf.js';
import './sp-picker-button-VYI4K39m.js';
import './ButtonBase--K-lWDuL.js';
import './class-map-Q7DIFm9x.js';
import './Textfield-tevcOEW2.js';
import './manage-help-text-f9KNpcsn.js';
import './sp-icon-alert-HIZE6wdL.js';
import './custom-tag-JXLWq-Sj.js';
import './directive-helpers-WPlpPO1F.js';
import './repeat-ry-ySa1b.js';

var comboboxSizes_stories = {
  title: "Combobox/Sizes",
  component: "sp-combobox"
};
const combobox = ({
  open,
  size
}) => {
  return x`
        <sp-field-label size=${size} for="combobox-1">Things</sp-field-label>
        <sp-combobox
            autocomplete="list"
            id="combobox-1"
            .options=${fruits}
            ?open=${open}
            size=${size}
        ></sp-combobox>
    `;
};
const s = (args) => combobox({ ...args, size: "s" });
const sOpen = (args) => combobox({ ...args, open: true, size: "s" });
sOpen.decorators = [isOverlayOpen];
const m = (args) => combobox({ ...args, size: "m" });
const mOpen = (args) => combobox({ ...args, open: true, size: "m" });
mOpen.decorators = [isOverlayOpen];
const l = (args) => combobox({ ...args, size: "l" });
const lOpen = (args) => combobox({ ...args, open: true, size: "l" });
lOpen.decorators = [isOverlayOpen];
const xL = (args) => combobox({ ...args, size: "xl" });
const XLOpen = (args) => combobox({ ...args, open: true, size: "xl" });
XLOpen.decorators = [isOverlayOpen];
const __namedExportsOrder = ['s', 'sOpen', 'm', 'mOpen', 'l', 'lOpen', 'xL', 'XLOpen'];

export { XLOpen, __namedExportsOrder, comboboxSizes_stories as default, l, lOpen, m, mOpen, s, sOpen, xL };

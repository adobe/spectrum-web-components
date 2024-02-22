import { f as fruits } from './index-_tMAg4Ca.js';
import { i as isOverlayOpen } from './index-X5nIn6KY.js';
import './sp-field-label-WhBVoFu4.js';
import { x } from './lit-html-GmIhAbMP.js';
import './sp-overlay-kCyWDr-Q.js';
import './define-element-b58XwwBM.js';
import './lit-element-xBOPiTek.js';
import './platform-c1C9ET3y.js';
import './ElementResolution-TTOqkMM7.js';
import './condition-attribute-with-id-nb2zon-s.js';
import './random-id-M2k-wjyE.js';
import './VirtualTrigger-5eFdVB9M.js';
import './first-focusable-in-LZ7hcu4z.js';
import './focusable-selectors-VCrFWGqo.js';
import './sizedMixin-SQxNgkJG.js';
import './base-STdhtiz1.js';
import './query-JMOstM_r.js';
import './state-OAXf-QuH.js';
import './if-defined-pV6JZKXB.js';
import './style-map-ak5mT6xX.js';
import './directive-C1gRZbRe.js';
import './sp-icon-chevron100-Z3b2AbFg.js';
import './Chevron100-ok1mOHjI.js';
import './custom-tag-z2Xx81l9.js';
import './IconBase-O-P913zU.js';
import './sp-popover-WpuWVPXK.js';
import './Popover-jYwDyU1E.js';
import './sp-menu-4vecIofk.js';
import './sp-menu-item-PuYeADKw.js';
import './spectrum-icon-checkmark.css-HAq4zshr.js';
import './like-anchor-SzCf8Fo9.js';
import './focusable-XJQHb8mq.js';
import './focus-visible-68QWcOy-.js';
import './spectrum-icon-chevron.css-nkKXiUlE.js';
import './mutation-controller-KeE5MDSl.js';
import './observe-slot-text-sowxnoY7.js';
import './query-assigned-nodes-NJVGD18T.js';
import './observe-slot-presence-tyJ_SCNf.js';
import './sp-picker-button-dNQ69-FR.js';
import './ButtonBase-8MKa1AnW.js';
import './class-map-Q7DIFm9x.js';
import './Textfield-5Qr4UnN3.js';
import './manage-help-text-kfeeNmRL.js';
import './sp-icon-alert-R3VPMRV3.js';
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

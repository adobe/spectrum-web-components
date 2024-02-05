import { f as fruits } from './index-nVItiFmy.js';
import { i as isOverlayOpen } from './index-X5nIn6KY.js';
import './sp-field-label--CBS1ijW.js';
import { x } from './lit-html-GmIhAbMP.js';
import './sp-overlay-x3COePdY.js';
import './define-element-2O4ZhTAw.js';
import './lit-element-xBOPiTek.js';
import './platform-c1C9ET3y.js';
import './ElementResolution-TTOqkMM7.js';
import './condition-attribute-with-id-nb2zon-s.js';
import './VirtualTrigger-9DH0MyFB.js';
import './first-focusable-in-LZ7hcu4z.js';
import './focusable-selectors-VCrFWGqo.js';
import './sizedMixin-mnNfh2gr.js';
import './base-STdhtiz1.js';
import './query-JMOstM_r.js';
import './state-fuvayDA0.js';
import './if-defined-pV6JZKXB.js';
import './style-map-ak5mT6xX.js';
import './directive-C1gRZbRe.js';
import './sp-icon-chevron100-vrIsKneV.js';
import './Chevron100-WZwzwvjg.js';
import './custom-tag-z2Xx81l9.js';
import './IconBase-TDmbHQaH.js';
import './sp-popover-ScQBhaVn.js';
import './sp-menu-rNqdCkwX.js';
import './sp-menu-item-ll9spFiY.js';
import './spectrum-icon-checkmark.css-3xBPG61g.js';
import './like-anchor-J4T73PxR.js';
import './focusable-WZR9a5Bc.js';
import './focus-visible-68QWcOy-.js';
import './spectrum-icon-chevron.css-8l4pupPT.js';
import './mutation-controller-KeE5MDSl.js';
import './observe-slot-text-ybW1xuBS.js';
import './query-assigned-nodes-aJM_vOZ4.js';
import './observe-slot-presence-tyJ_SCNf.js';
import './sp-picker-button-6xkjheRE.js';
import './ButtonBase-H8ie1_xx.js';
import './class-map-Q7DIFm9x.js';
import './Textfield-rAX4ihoL.js';
import './manage-help-text-kfeeNmRL.js';
import './sp-icon-alert-Bolxr-zN.js';
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

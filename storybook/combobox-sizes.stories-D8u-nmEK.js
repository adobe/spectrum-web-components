import { f as fruits } from './index-Cp-RJoBe.js';
import { i as isOverlayOpen } from './index-DY1O5Zi9.js';
import './sp-field-label-Cb-osIn1.js';
import { x } from './lit-html-COgVUehj.js';
import './sp-overlay-D9AssvwS.js';
import './define-element-BgSxDJnI.js';
import './lit-element-BL-po2DW.js';
import './Overlay-YRfPVsSz.js';
import './ElementResolution-B9KteuX8.js';
import './random-id-BST1Puzz.js';
import './AbstractOverlay-B0yP5xqm.js';
import './first-focusable-in-BK_DAWOm.js';
import './focusable-selectors-CUZEb4r9.js';
import './VirtualTrigger-BBWl770T.js';
import './strategies-D9oQIS25.js';
import './condition-attribute-with-id-Cnyhr7Mp.js';
import './platform-DpSwcmux.js';
import './slottable-request-event-DXuuyGoq.js';
import './query-assigned-elements-C9WOp2R6.js';
import './base-u8Z1Hrsd.js';
import './query-DQF6X5qW.js';
import './state-C3gUXJnn.js';
import './if-defined-DDJGFaN4.js';
import './style-map-DtKTc8KS.js';
import './directive-Bn5c4u4M.js';
import './sp-icon-chevron100-DnMGffWP.js';
import './Chevron100-2ZEB0c-t.js';
import './custom-tag-B5IH9PTE.js';
import './IconBase-BDjZkcAb.js';
import './sp-popover-IsIbwvzP.js';
import './Popover-DOMQLcfc.js';
import './sp-menu-BL6ia_oB.js';
import './sizedMixin-Gf9Y2JDv.js';
import './sp-menu-item-DQtURUKS.js';
import './spectrum-icon-checkmark.css-BV1eOpgj.js';
import './like-anchor-jgQaL5Z3.js';
import './focusable-oYNn1hNO.js';
import './focus-visible-D29Av9Xb.js';
import './spectrum-icon-chevron.css-C5c2rYXA.js';
import './DependencyManger-Dpkh1Bse.js';
import './mutation-controller-D2lT1xZk.js';
import './observe-slot-text-DhKFT2ma.js';
import './query-assigned-nodes-DAYI4epk.js';
import './observe-slot-presence-Ceiwt-jV.js';
import './sp-picker-button-NIUM1dHz.js';
import './ButtonBase-CGZcb8D1.js';
import './class-map-DdRvesrq.js';
import './Textfield-BOv6nLc1.js';
import './manage-help-text-83_bseGo.js';
import './sp-icon-alert-B-aFpws-.js';
import './custom-tag-Diwq7nXX.js';
import './directive-helpers-icdnqxxc.js';
import './repeat-D5JakrYV.js';

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

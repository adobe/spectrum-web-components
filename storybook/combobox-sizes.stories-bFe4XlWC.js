import { f as fruits } from './index-DuUnlyJs.js';
import { i as isOverlayOpen } from './index-DY1O5Zi9.js';
import './sp-field-label-Cf_nvrkT.js';
import { x } from './lit-html-COgVUehj.js';
import './sp-overlay-rmG6aBFp.js';
import './define-element-ByMWMcVd.js';
import './lit-element-BL-po2DW.js';
import './Overlay-Bunm4wxf.js';
import './ElementResolution-B9KteuX8.js';
import './random-id-BST1Puzz.js';
import './AbstractOverlay-BmdjRMJl.js';
import './first-focusable-in-BK_DAWOm.js';
import './focusable-selectors-CUZEb4r9.js';
import './VirtualTrigger-Cyjxfq5s.js';
import './strategies-LVmDxAdp.js';
import './condition-attribute-with-id-Cnyhr7Mp.js';
import './platform-DpSwcmux.js';
import './slottable-request-event-DXuuyGoq.js';
import './query-assigned-elements-C9WOp2R6.js';
import './base-u8Z1Hrsd.js';
import './query-DQF6X5qW.js';
import './state-DGkVCdxP.js';
import './if-defined-DDJGFaN4.js';
import './style-map-DtKTc8KS.js';
import './directive-Bn5c4u4M.js';
import './sp-icon-chevron100-CvWYkNtC.js';
import './Chevron100-2ZEB0c-t.js';
import './custom-tag-B5IH9PTE.js';
import './IconBase-C1z7UsT5.js';
import './sp-popover-Ico2SJk-.js';
import './Popover-D7EtKebK.js';
import './sp-menu-Bi5ZsR-Z.js';
import './sizedMixin-C1lD98vT.js';
import './sp-menu-item-KlLN_ToV.js';
import './spectrum-icon-checkmark.css-B6wBbQoF.js';
import './like-anchor-3x3vwb8N.js';
import './focusable-CUJIQEAB.js';
import './focus-visible-D29Av9Xb.js';
import './spectrum-icon-chevron.css-C5c2rYXA.js';
import './DependencyManger-Dpkh1Bse.js';
import './mutation-controller-D2lT1xZk.js';
import './observe-slot-text-DLXbbJr-.js';
import './query-assigned-nodes-DAYI4epk.js';
import './observe-slot-presence-Ceiwt-jV.js';
import './sp-picker-button-BSXx5XK2.js';
import './ButtonBase-CjmqgWAT.js';
import './class-map-DdRvesrq.js';
import './Textfield-wDs6AzMk.js';
import './manage-help-text-83_bseGo.js';
import './sp-icon-alert-ClrE4xtp.js';
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

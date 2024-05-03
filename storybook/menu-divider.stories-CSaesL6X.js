import './sp-menu-DkZ1KZaP.js';
import './sp-menu-divider-BGK0Fqa2.js';
import './sp-menu-item-CY4q-xUV.js';
import './sp-popover-CDcNcrBt.js';
import { x } from './lit-html-COgVUehj.js';
import './lit-element-BL-po2DW.js';
import './sizedMixin-C1lD98vT.js';
import './define-element-ByMWMcVd.js';
import './query-DQF6X5qW.js';
import './base-u8Z1Hrsd.js';
import './divider.css-_tP_fVWw.js';
import './spectrum-icon-checkmark.css-B-kvSI14.js';
import './custom-tag-B5IH9PTE.js';
import './IconBase-qDHHH3Ln.js';
import './like-anchor-3x3vwb8N.js';
import './if-defined-DDJGFaN4.js';
import './focusable-CCdy673g.js';
import './focus-visible-xZLLtEay.js';
import './sp-icon-chevron100-1NlnalYT.js';
import './Chevron100-2ZEB0c-t.js';
import './spectrum-icon-chevron.css-C5c2rYXA.js';
import './DependencyManger-Dpkh1Bse.js';
import './mutation-controller-D2lT1xZk.js';
import './slottable-request-event-DXuuyGoq.js';
import './observe-slot-text-DSYHkFFl.js';
import './query-assigned-nodes-DAYI4epk.js';
import './observe-slot-presence-CnXaHqXA.js';
import './random-id-BST1Puzz.js';
import './Popover-BIai2pXS.js';

var menuDivider_stories = {
  component: "sp-menu-divider",
  title: "Menu Divider"
};
const Template = (size) => {
  return x`
        <sp-popover open>
            <sp-menu>
                <sp-menu-item>Deselect</sp-menu-item>
                <sp-menu-item>Select Inverse</sp-menu-item>
                <sp-menu-item>Feather...</sp-menu-item>
                <sp-menu-divider size=${size}></sp-menu-divider>
                <sp-menu-item>Select and Mask...</sp-menu-item>
                <sp-menu-item>Make Work Path</sp-menu-item>
                <sp-menu-divider size=${size}></sp-menu-divider>
                <sp-menu-item>Save Selection</sp-menu-item>
                <sp-menu-divider size=${size}></sp-menu-divider>
                <sp-menu-item>Create group</sp-menu-item>
            </sp-menu>
        </sp-popover>
    `;
};
const sizeS = () => Template("s");
const sizeM = () => Template("m");
const sizeL = () => Template("l");
const __namedExportsOrder = ['sizeS', 'sizeM', 'sizeL'];

export { __namedExportsOrder, menuDivider_stories as default, sizeL, sizeM, sizeS };

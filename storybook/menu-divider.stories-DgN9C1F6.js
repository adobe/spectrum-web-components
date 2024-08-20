import './sp-menu-CTfuH1l3.js';
import './sp-menu-divider-CzXsUZ7C.js';
import './sp-menu-item-CPMamcOA.js';
import './sp-popover-C5FJ1XtN.js';
import { x } from './lit-html-COgVUehj.js';
import './lit-element-BL-po2DW.js';
import './sizedMixin-DyuXUK9p.js';
import './define-element-C5BYKBZP.js';
import './query-DQF6X5qW.js';
import './base-u8Z1Hrsd.js';
import './divider.css-B2ErksQK.js';
import './spectrum-icon-checkmark.css-C_afKhIc.js';
import './custom-tag-B5IH9PTE.js';
import './IconBase-q22s6ZK0.js';
import './like-anchor-CXjWBVJG.js';
import './if-defined-DDJGFaN4.js';
import './focusable-BQuZpn6Y.js';
import './focus-visible-D29Av9Xb.js';
import './sp-icon-chevron100-Dn3goYXa.js';
import './Chevron100-2ZEB0c-t.js';
import './spectrum-icon-chevron.css-C5c2rYXA.js';
import './DependencyManger-Dpkh1Bse.js';
import './mutation-controller-D2lT1xZk.js';
import './slottable-request-event-DXuuyGoq.js';
import './observe-slot-text-C2oNg7p9.js';
import './query-assigned-nodes-DAYI4epk.js';
import './observe-slot-presence-Ceiwt-jV.js';
import './random-id-BST1Puzz.js';
import './Popover-3sy-Xzo0.js';

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

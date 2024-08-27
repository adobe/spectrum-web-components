import './sp-menu-BWEy12vg.js';
import './sp-menu-divider-ByotbH7R.js';
import './sp-menu-item-C8MCrD_m.js';
import './sp-popover-BB5UbEe8.js';
import { x } from './lit-html-COgVUehj.js';
import './lit-element-BL-po2DW.js';
import './sizedMixin-BKu_31Nm.js';
import './define-element-CXRu6sWi.js';
import './query-DQF6X5qW.js';
import './base-u8Z1Hrsd.js';
import './divider.css-B2ErksQK.js';
import './spectrum-icon-checkmark.css-BQx7WYUd.js';
import './custom-tag-B5IH9PTE.js';
import './IconBase-LhykbR0q.js';
import './like-anchor-BAH-foY5.js';
import './if-defined-DDJGFaN4.js';
import './focusable-BHn_FpaM.js';
import './focus-visible-D29Av9Xb.js';
import './sp-icon-chevron100-Bg4mTD65.js';
import './Chevron100-2ZEB0c-t.js';
import './spectrum-icon-chevron.css-C5c2rYXA.js';
import './DependencyManger-Dpkh1Bse.js';
import './mutation-controller-D2lT1xZk.js';
import './slottable-request-event-DXuuyGoq.js';
import './observe-slot-text-CBh62R5W.js';
import './query-assigned-nodes-DAYI4epk.js';
import './observe-slot-presence-Ceiwt-jV.js';
import './random-id-BST1Puzz.js';
import './Popover-DxEMW8Ok.js';

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

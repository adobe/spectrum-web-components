import './sp-menu-DmYMiciX.js';
import './sp-menu-divider-CjEyqyoI.js';
import './sp-menu-item-_mXeWY76.js';
import './sp-popover-BPp-7MiM.js';
import { x } from './lit-html-COgVUehj.js';
import './lit-element-BulMEkr1.js';
import './sizedMixin-CHWWI7zp.js';
import './define-element-BgsU7oi-.js';
import './query-DQF6X5qW.js';
import './base-u8Z1Hrsd.js';
import './divider.css-DO2_iA7o.js';
import './spectrum-icon-checkmark.css-BXqe6sWG.js';
import './custom-tag-B5IH9PTE.js';
import './IconBase-B4NmWdYY.js';
import './like-anchor-BF2mSMlR.js';
import './if-defined-DDJGFaN4.js';
import './focusable-BVZVIowx.js';
import './focus-visible-D29Av9Xb.js';
import './sp-icon-chevron100-ravIHRxr.js';
import './Chevron100-2ZEB0c-t.js';
import './spectrum-icon-chevron.css-CeYia-Jd.js';
import './DependencyManger-Dpkh1Bse.js';
import './mutation-controller-D2lT1xZk.js';
import './slottable-request-event-DXuuyGoq.js';
import './observe-slot-text-vBV0Xc1Q.js';
import './query-assigned-nodes-DAYI4epk.js';
import './observe-slot-presence-Ceiwt-jV.js';
import './random-id-BST1Puzz.js';
import './Popover-Dihn8jKA.js';

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

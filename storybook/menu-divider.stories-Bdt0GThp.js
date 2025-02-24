import './sp-menu-BSg3IAdW.js';
import './sp-menu-divider-BXnOpNAH.js';
import './sp-menu-item-KrzSVYpa.js';
import './sp-popover-CI1UnX8v.js';
import { x } from './lit-html-COgVUehj.js';
import './lit-element-BulMEkr1.js';
import './sizedMixin-SWvQmBKY.js';
import './define-element-B7NoFsQI.js';
import './query-DQF6X5qW.js';
import './base-u8Z1Hrsd.js';
import './divider.css-CtZfV7_5.js';
import './spectrum-icon-checkmark.css-B9su_ZeY.js';
import './custom-tag-B5IH9PTE.js';
import './IconBase-DXeaJSV5.js';
import './state-CG9Kyp94.js';
import './like-anchor-BQR4wmj8.js';
import './if-defined-DDJGFaN4.js';
import './focusable-CtU8nZTr.js';
import './focus-visible-D29Av9Xb.js';
import './sp-icon-chevron100-DUm3RyOH.js';
import './Chevron100-OyV1wQMZ.js';
import './spectrum-icon-chevron.css-CeYia-Jd.js';
import './DependencyManger-Dpkh1Bse.js';
import './mutation-controller-D2lT1xZk.js';
import './slottable-request-event-DXuuyGoq.js';
import './observe-slot-text-DVS1yx82.js';
import './query-assigned-nodes-DAYI4epk.js';
import './observe-slot-presence-Ceiwt-jV.js';
import './random-id-BST1Puzz.js';
import './Popover-a4ouSAXr.js';

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

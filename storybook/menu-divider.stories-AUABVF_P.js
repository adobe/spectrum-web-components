import './sp-menu-vKm9EXYM.js';
import './sp-menu-divider-oQzf6Djb.js';
import './sp-menu-item-N-0TaoiF.js';
import './sp-popover-K6nK-Hu0.js';
import { x } from './lit-html-GmIhAbMP.js';
import './lit-element-xBOPiTek.js';
import './sizedMixin-IBQibr2z.js';
import './define-element-z6bXN_P5.js';
import './base-STdhtiz1.js';
import './query-JMOstM_r.js';
import './divider.css-J1TsgOfe.js';
import './spectrum-icon-checkmark.css-F44WP9wj.js';
import './custom-tag-z2Xx81l9.js';
import './IconBase-1lzddWrP.js';
import './like-anchor-iRdC2T2x.js';
import './if-defined-pV6JZKXB.js';
import './focusable-M0S89eyW.js';
import './focus-visible-68QWcOy-.js';
import './sp-icon-chevron100-uB3eMtQr.js';
import './Chevron100-ok1mOHjI.js';
import './spectrum-icon-chevron.css-i0thkS8X.js';
import './mutation-controller-KeE5MDSl.js';
import './observe-slot-text-MDYPopbw.js';
import './query-assigned-nodes-qh-rhz36.js';
import './observe-slot-presence-tyJ_SCNf.js';
import './random-id-M2k-wjyE.js';
import './Popover-ZO_2BJ88.js';

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

import './sp-menu-aukB87hm.js';
import './sp-menu-divider-IXmQjkt_.js';
import './sp-menu-item-BnuqroME.js';
import './sp-popover-jafHnpZt.js';
import { x } from './lit-html-GmIhAbMP.js';
import './lit-element-xBOPiTek.js';
import './sizedMixin-D9_yg9Lr.js';
import './define-element-s04w2teA.js';
import './base-STdhtiz1.js';
import './query-JMOstM_r.js';
import './divider.css-w129hLpK.js';
import './spectrum-icon-checkmark.css-T4LCyo5k.js';
import './custom-tag-z2Xx81l9.js';
import './IconBase-_0RU6XqS.js';
import './like-anchor-Gwp5ooDH.js';
import './if-defined-pV6JZKXB.js';
import './focusable-mx5LgJ38.js';
import './focus-visible-68QWcOy-.js';
import './sp-icon-chevron100-3PcMAyn_.js';
import './Chevron100-WZwzwvjg.js';
import './spectrum-icon-chevron.css-8l4pupPT.js';
import './mutation-controller-KeE5MDSl.js';
import './observe-slot-text-eZT7feU8.js';
import './query-assigned-nodes-u86daeBT.js';
import './observe-slot-presence-tyJ_SCNf.js';

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

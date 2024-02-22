import './sp-menu-4vecIofk.js';
import './sp-menu-divider-P5gXuktb.js';
import './sp-menu-item-PuYeADKw.js';
import './sp-popover-WpuWVPXK.js';
import { x } from './lit-html-GmIhAbMP.js';
import './lit-element-xBOPiTek.js';
import './sizedMixin-SQxNgkJG.js';
import './define-element-b58XwwBM.js';
import './base-STdhtiz1.js';
import './query-JMOstM_r.js';
import './divider.css-_gDvtMpM.js';
import './spectrum-icon-checkmark.css-HAq4zshr.js';
import './custom-tag-z2Xx81l9.js';
import './IconBase-O-P913zU.js';
import './like-anchor-SzCf8Fo9.js';
import './if-defined-pV6JZKXB.js';
import './focusable-XJQHb8mq.js';
import './focus-visible-68QWcOy-.js';
import './sp-icon-chevron100-Z3b2AbFg.js';
import './Chevron100-ok1mOHjI.js';
import './spectrum-icon-chevron.css-nkKXiUlE.js';
import './mutation-controller-KeE5MDSl.js';
import './observe-slot-text-sowxnoY7.js';
import './query-assigned-nodes-NJVGD18T.js';
import './observe-slot-presence-tyJ_SCNf.js';
import './random-id-M2k-wjyE.js';
import './Popover-jYwDyU1E.js';

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

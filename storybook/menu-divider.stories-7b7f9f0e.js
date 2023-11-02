import './sp-menu-9cba47df.js';
import './sp-menu-divider-4f0cd981.js';
import './sp-menu-item-8cb92ce2.js';
import './sp-popover-45f01f5b.js';
import { x } from './lit-html-126adc72.js';
import './lit-element-9354aa77.js';
import './sizedMixin-281e4c72.js';
import './define-element-43d4edd5.js';
import './base-511c8c11.js';
import './query-d0113d5a.js';
import './divider.css-d14b5633.js';
import './spectrum-icon-checkmark.css-c19acd0f.js';
import './custom-tag-c228386e.js';
import './IconBase-fb970ebf.js';
import './like-anchor-0c856f1c.js';
import './if-defined-ae83b405.js';
import './focusable-d03021f6.js';
import './focus-visible-03398d98.js';
import './sp-icon-chevron100-cbc6bc68.js';
import './Chevron100-6f55b923.js';
import './spectrum-icon-chevron.css-d3283c08.js';
import './mutation-controller-81a30f7f.js';
import './observe-slot-text-dbd83f39.js';
import './query-assigned-nodes-c8aaaadd.js';
import './observe-slot-presence-ae37a9bc.js';

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

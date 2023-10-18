import './sp-menu-6cab5582.js';
import './sp-menu-divider-e02a5ff2.js';
import './sp-menu-item-78994077.js';
import './sp-popover-a3c74c2f.js';
import { x } from './lit-html-126adc72.js';
import './lit-element-9354aa77.js';
import './sizedMixin-43fe982f.js';
import './define-element-e64f5ea4.js';
import './base-511c8c11.js';
import './query-d0113d5a.js';
import './divider.css-d14b5633.js';
import './spectrum-icon-checkmark.css-359949f2.js';
import './custom-tag-c228386e.js';
import './IconBase-d00b1a4e.js';
import './like-anchor-72ed571c.js';
import './if-defined-ae83b405.js';
import './focusable-6cc2c3b2.js';
import './focus-visible-03398d98.js';
import './sp-icon-chevron100-232e7a83.js';
import './Chevron100-6f55b923.js';
import './spectrum-icon-chevron.css-6d5a7762.js';
import './mutation-controller-81a30f7f.js';
import './observe-slot-text-16ab7d67.js';
import './query-assigned-nodes-b8bfe193.js';
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

import './sp-menu-a6b50bf6.js';
import './sp-menu-divider-96e8aafa.js';
import './sp-menu-item-d1901258.js';
import './sp-popover-adc6def6.js';
import { x } from './lit-html-126adc72.js';
import './lit-element-9354aa77.js';
import './sizedMixin-95b38e3e.js';
import './define-element-467f3dc4.js';
import './base-511c8c11.js';
import './query-d0113d5a.js';
import './divider.css-d14b5633.js';
import './spectrum-icon-checkmark.css-2fc91f81.js';
import './custom-tag-c228386e.js';
import './IconBase-fdbfb1c1.js';
import './like-anchor-79c92c76.js';
import './if-defined-ae83b405.js';
import './focusable-df7b829e.js';
import './focus-visible-03398d98.js';
import './sp-icon-chevron100-d31cf739.js';
import './Chevron100-6f55b923.js';
import './spectrum-icon-chevron.css-d3283c08.js';
import './mutation-controller-81a30f7f.js';
import './observe-slot-text-2a3e6366.js';
import './query-assigned-nodes-6218f033.js';
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

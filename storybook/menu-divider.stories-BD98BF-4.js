import './sp-menu-G1ogtxTh.js';
import './sp-menu-divider-hyg0DRsC.js';
import './sp-menu-item-Boi0IcWc.js';
import './sp-popover-BoBO_BVC.js';
import { x } from './lit-html-COgVUehj.js';
import './lit-element-BulMEkr1.js';
import './sizedMixin-CTLIe6if.js';
import './define-element-xyi5NDDf.js';
import './query-DQF6X5qW.js';
import './base-u8Z1Hrsd.js';
import './divider.css-C7PIHskV.js';
import './icon-checkmark-overrides.css-tFOMP7DY.js';
import './custom-tag-B5IH9PTE.js';
import './IconBase-5vvO1gxM.js';
import './state-DzluJiIq.js';
import './like-anchor-Dgva6KsU.js';
import './if-defined-DDJGFaN4.js';
import './focusable-DcHsG7Zg.js';
import './focus-visible-D29Av9Xb.js';
import './sp-icon-chevron100-CVbE_k3u.js';
import './Chevron100-OyV1wQMZ.js';
import './icon-chevron-overrides.css-Bz8Nk10Z.js';
import './DependencyManger-Dpkh1Bse.js';
import './mutation-controller-D2lT1xZk.js';
import './slottable-request-event-DXuuyGoq.js';
import './observe-slot-text-64cbqGrA.js';
import './query-assigned-nodes-DAYI4epk.js';
import './observe-slot-presence-Ceiwt-jV.js';
import './random-id-BST1Puzz.js';
import './Popover-C1--_1rJ.js';

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

import './sp-menu-yyR1trsN.js';
import './sp-menu-divider-GnA2SRvx.js';
import './sp-menu-item-dzr3-vzb.js';
import './sp-popover-JsdyhxsS.js';
import { x } from './lit-html-GmIhAbMP.js';
import './lit-element-xBOPiTek.js';
import './sizedMixin-VwrJiqSW.js';
import './define-element-lju0qz2P.js';
import './query-assigned-elements-1m6Cs7Ix.js';
import './base-STdhtiz1.js';
import './query-JMOstM_r.js';
import './divider.css-J1TsgOfe.js';
import './spectrum-icon-checkmark.css-EqJn5hpL.js';
import './custom-tag-z2Xx81l9.js';
import './IconBase-YN3-eQCN.js';
import './like-anchor-a_wuYSt2.js';
import './if-defined-pV6JZKXB.js';
import './focusable-wnRI1QCz.js';
import './focus-visible-68QWcOy-.js';
import './sp-icon-chevron100-hP_myJxP.js';
import './Chevron100-ok1mOHjI.js';
import './spectrum-icon-chevron.css-hA8DP86t.js';
import './mutation-controller-KeE5MDSl.js';
import './observe-slot-text-HaH5WFZ0.js';
import './query-assigned-nodes-jGvx5qKR.js';
import './observe-slot-presence-tyJ_SCNf.js';
import './random-id-M2k-wjyE.js';
import './Popover-vSC8_z_g.js';

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

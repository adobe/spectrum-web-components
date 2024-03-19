import './sp-icon-edit-ZazLFymR.js';
import './sp-menu-yyR1trsN.js';
import './sp-menu-item-dzr3-vzb.js';
import { x } from './lit-html-GmIhAbMP.js';
import './Edit-G5NAbE7j.js';
import './custom-tag-JXLWq-Sj.js';
import './IconBase-YN3-eQCN.js';
import './lit-element-xBOPiTek.js';
import './define-element-lju0qz2P.js';
import './sizedMixin-VwrJiqSW.js';
import './query-assigned-elements-1m6Cs7Ix.js';
import './base-STdhtiz1.js';
import './query-JMOstM_r.js';
import './spectrum-icon-checkmark.css-EqJn5hpL.js';
import './custom-tag-z2Xx81l9.js';
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

var menuItem_stories = {
  component: "sp-menu-item",
  title: "Menu Item"
};
const Default = () => {
  return x`
        <sp-menu>
            <sp-menu-item>Menu Item</sp-menu-item>
        </sp-menu>
    `;
};
const noWrap = () => {
  return x`
        <sp-menu style="width: 150px;">
            <sp-menu-item no-wrap>
                Select a Country with a very long label, too long, in fact
            </sp-menu-item>
        </sp-menu>
    `;
};
const descriptionSlot = () => {
  return x`
        <sp-menu>
            <sp-menu-item>
                Quick export
                <span slot="description">Share a snapshot</span>
            </sp-menu-item>
        </sp-menu>
    `;
};
const valueSlot = () => {
  return x`
        <style>
            kbd {
                font-family: var(--spectrum-alias-body-text-font-family);
                white-space: nowrap;
            }
        </style>
        <sp-menu style="width: 150px;" selects="single">
            <sp-menu-item>
                Save
                <kbd slot="value">⌘​S</kbd>
            </sp-menu-item>
            <sp-menu-item selected>
                Save As...
                <kbd slot="value">⇧​⌘​S</kbd>
            </sp-menu-item>
            <sp-menu-item disabled>
                Save All
                <kbd slot="value">⌥​⌘​S</kbd>
            </sp-menu-item>
        </sp-menu>
    `;
};
const href = () => {
  return x`
        <sp-menu style="width: 150px;">
            <sp-menu-item
                href="https://opensource.adobe.com/spectrum-web-components"
            >
                <sp-icon-edit slot="icon"></sp-icon-edit>
                Edit the Documentation Site
            </sp-menu-item>
        </sp-menu>
    `;
};
const __namedExportsOrder = ['Default', 'noWrap', 'descriptionSlot', 'valueSlot', 'href'];

export { Default, __namedExportsOrder, menuItem_stories as default, descriptionSlot, href, noWrap, valueSlot };

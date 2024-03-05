import './sp-icon-edit-LAQa2Ir4.js';
import './sp-menu-vKm9EXYM.js';
import './sp-menu-item-N-0TaoiF.js';
import { x } from './lit-html-GmIhAbMP.js';
import './Edit-G5NAbE7j.js';
import './custom-tag-JXLWq-Sj.js';
import './IconBase-1lzddWrP.js';
import './lit-element-xBOPiTek.js';
import './define-element-z6bXN_P5.js';
import './sizedMixin-IBQibr2z.js';
import './base-STdhtiz1.js';
import './query-JMOstM_r.js';
import './spectrum-icon-checkmark.css-F44WP9wj.js';
import './custom-tag-z2Xx81l9.js';
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

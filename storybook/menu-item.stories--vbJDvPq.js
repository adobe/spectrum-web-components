import './sp-icon-edit-S_kF3C-J.js';
import './sp-menu-aukB87hm.js';
import './sp-menu-item-BnuqroME.js';
import { x } from './lit-html-GmIhAbMP.js';
import './Edit-G5NAbE7j.js';
import './custom-tag-JXLWq-Sj.js';
import './IconBase-_0RU6XqS.js';
import './lit-element-xBOPiTek.js';
import './define-element-s04w2teA.js';
import './sizedMixin-D9_yg9Lr.js';
import './base-STdhtiz1.js';
import './query-JMOstM_r.js';
import './spectrum-icon-checkmark.css-T4LCyo5k.js';
import './custom-tag-z2Xx81l9.js';
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

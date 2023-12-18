import './sp-icon-edit-f75652ae.js';
import './sp-menu-b9e57a20.js';
import './sp-menu-item-a8496cf1.js';
import { x } from './lit-html-126adc72.js';
import './Edit-e6e8ae2a.js';
import './custom-tag-b5526d41.js';
import './IconBase-7772fb01.js';
import './lit-element-9354aa77.js';
import './define-element-7dc6a572.js';
import './sizedMixin-3d08a58f.js';
import './base-511c8c11.js';
import './query-d0113d5a.js';
import './spectrum-icon-checkmark.css-ebf23520.js';
import './custom-tag-c228386e.js';
import './like-anchor-8f97823d.js';
import './if-defined-ae83b405.js';
import './focusable-391b57ba.js';
import './focus-visible-03398d98.js';
import './sp-icon-chevron100-19c0ec20.js';
import './Chevron100-6f55b923.js';
import './spectrum-icon-chevron.css-d3283c08.js';
import './mutation-controller-81a30f7f.js';
import './observe-slot-text-769cbc70.js';
import './query-assigned-nodes-d63886c3.js';
import './observe-slot-presence-ae37a9bc.js';

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

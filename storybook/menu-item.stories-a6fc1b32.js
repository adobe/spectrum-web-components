import './sp-icon-edit-cdbd5288.js';
import './sp-menu-6cab5582.js';
import './sp-menu-item-78994077.js';
import { x } from './lit-html-126adc72.js';
import './Edit-e6e8ae2a.js';
import './custom-tag-b5526d41.js';
import './IconBase-d00b1a4e.js';
import './lit-element-9354aa77.js';
import './define-element-e64f5ea4.js';
import './sizedMixin-43fe982f.js';
import './base-511c8c11.js';
import './query-d0113d5a.js';
import './spectrum-icon-checkmark.css-359949f2.js';
import './custom-tag-c228386e.js';
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

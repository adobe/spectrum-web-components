import './sp-icon-edit-Ci707tqk.js';
import './sp-menu-CUlDsjuI.js';
import './sp-menu-item-C1UX3rOw.js';
import { x } from './lit-html-COgVUehj.js';
import './Edit-CCpN7dze.js';
import './custom-tag-Diwq7nXX.js';
import './IconBase-L76-n75s.js';
import './lit-element-BL-po2DW.js';
import './define-element-9Zj84-C8.js';
import './sizedMixin-H6qLwJc0.js';
import './query-DQF6X5qW.js';
import './base-u8Z1Hrsd.js';
import './spectrum-icon-checkmark.css-B4Pvgr0C.js';
import './custom-tag-B5IH9PTE.js';
import './like-anchor-c-omWQV-.js';
import './if-defined-DDJGFaN4.js';
import './focusable-CfMGZF2L.js';
import './focus-visible-D29Av9Xb.js';
import './sp-icon-chevron100-BVn8JicT.js';
import './Chevron100-2ZEB0c-t.js';
import './spectrum-icon-chevron.css-C5c2rYXA.js';
import './DependencyManger-Dpkh1Bse.js';
import './mutation-controller-D2lT1xZk.js';
import './slottable-request-event-DXuuyGoq.js';
import './observe-slot-text-Dr0dVrDu.js';
import './query-assigned-nodes-DAYI4epk.js';
import './random-id-BST1Puzz.js';
import './observe-slot-presence-Ceiwt-jV.js';

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

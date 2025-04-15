import './sp-icon-edit-DEXzL9ah.js';
import './sp-menu-DLS2qTtM.js';
import './sp-menu-item-lWzihiU5.js';
import './sp-action-button-C4sd6SlC.js';
import './sp-checkbox-KkmNuzyV.js';
import { x } from './lit-html-COgVUehj.js';
import { s } from './lit-element-BulMEkr1.js';
import { n } from './when-DEJm_QN9.js';
import './custom-tag-Diwq7nXX.js';
import './Edit-prqhnpZR.js';
import './IconBase-XNwB0O-B.js';
import './state-Cl59WR3S.js';
import './define-element-C4UuMSqY.js';
import './RovingTabindex-Bozun0RY.js';
import './FocusGroup-VP8jhztA.js';
import './sizedMixin-DUWGHsWj.js';
import './query-DQF6X5qW.js';
import './base-u8Z1Hrsd.js';
import './spectrum-icon-checkmark.css-CUMq8Erd.js';
import './custom-tag-B5IH9PTE.js';
import './like-anchor-BMTFbWfx.js';
import './if-defined-DDJGFaN4.js';
import './focusable-0UaXYqOQ.js';
import './focus-visible-D29Av9Xb.js';
import './sp-icon-chevron100-BOrsj08X.js';
import './Chevron100-OyV1wQMZ.js';
import './spectrum-icon-chevron.css-CeYia-Jd.js';
import './DependencyManger-Dpkh1Bse.js';
import './mutation-controller-D2lT1xZk.js';
import './slottable-request-event-DXuuyGoq.js';
import './observe-slot-text-Bj4_fBJm.js';
import './query-assigned-nodes-DAYI4epk.js';
import './observe-slot-presence-Ceiwt-jV.js';
import './random-id-BST1Puzz.js';
import './sp-icon-corner-triangle300-D56ofuvE.js';
import './CornerTriangle300-B0AKm-jy.js';
import './ButtonBase-vQ52yrzS.js';
import './CheckboxMixin-uNsfL0oq.js';
import './sp-icon-checkmark300-DHQol-LF.js';
import './Checkmark300-CQLndXBK.js';
import './sp-icon-dash300-CcpO73x9.js';
import './Dash300-BPmLOKTF.js';
import './spectrum-icon-dash.css-lElR_d7u.js';

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
class CheckBoxBehindMenuItem extends s {
  constructor() {
    super(...arguments);
    this._renderMenu = true;
  }
  _onMenuChange(_event) {
    this._renderMenu = false;
    this.requestUpdate();
    console.log("On menu change, renderMenu: ", this._renderMenu);
  }
  _onCheckboxChange(_event) {
    console.log("On checkbox change");
  }
  _handleReset() {
    this._renderMenu = true;
    this.requestUpdate();
  }
  render() {
    return x`
            <sp-action-button @click=${this._handleReset}>
                Reset
            </sp-action-button>
            ${n(
      this._renderMenu,
      () => x`
                    <sp-menu @change=${this._onMenuChange}>
                        <sp-menu-item value="Item 1">
                            Click left margin!
                        </sp-menu-item>
                    </sp-menu>
                `
    )}
            ${n(
      !this._renderMenu,
      () => x`
                    <sp-checkbox @change=${this._onCheckboxChange}>
                        Should not be checked
                    </sp-checkbox>
                `
    )}
        `;
  }
}
customElements.define("checkbox-behind-menu-item", CheckBoxBehindMenuItem);
const MenuItemWithCheckbox = () => {
  return x`
        <checkbox-behind-menu-item></checkbox-behind-menu-item>
    `;
};
MenuItemWithCheckbox.swc_vrt = {
  skip: true
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
const __namedExportsOrder = ['Default', 'MenuItemWithCheckbox', 'noWrap', 'descriptionSlot', 'valueSlot', 'href'];

export { Default, MenuItemWithCheckbox, __namedExportsOrder, menuItem_stories as default, descriptionSlot, href, noWrap, valueSlot };

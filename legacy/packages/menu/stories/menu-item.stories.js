"use strict";
import {
  html,
  LitElement
} from "@spectrum-web-components/base";
import { when } from "@spectrum-web-components/base/src/directives.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-edit.js";
import "@spectrum-web-components/menu/sp-menu.js";
import "@spectrum-web-components/menu/sp-menu-item.js";
import "@spectrum-web-components/action-button/sp-action-button.js";
import "@spectrum-web-components/checkbox/sp-checkbox.js";
export default {
  component: "sp-menu-item",
  title: "Menu Item"
};
export const Default = () => {
  return html`
        <sp-menu>
            <sp-menu-item>Menu Item</sp-menu-item>
        </sp-menu>
    `;
};
class CheckBoxBehindMenuItem extends LitElement {
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
    return html`
            <sp-action-button @click=${this._handleReset}>
                Reset
            </sp-action-button>
            ${when(
      this._renderMenu,
      () => html`
                    <sp-menu @change=${this._onMenuChange}>
                        <sp-menu-item value="Item 1">
                            Click left margin!
                        </sp-menu-item>
                    </sp-menu>
                `
    )}
            ${when(
      !this._renderMenu,
      () => html`
                    <sp-checkbox @change=${this._onCheckboxChange}>
                        Should not be checked
                    </sp-checkbox>
                `
    )}
        `;
  }
}
customElements.define("checkbox-behind-menu-item", CheckBoxBehindMenuItem);
export const MenuItemWithCheckbox = () => {
  return html`
        <checkbox-behind-menu-item></checkbox-behind-menu-item>
    `;
};
MenuItemWithCheckbox.swc_vrt = {
  skip: true
};
export const noWrap = () => {
  return html`
        <sp-menu style="width: 150px;">
            <sp-menu-item no-wrap>
                Select a Country with a very long label, too long, in fact
            </sp-menu-item>
        </sp-menu>
    `;
};
export const descriptionSlot = () => {
  return html`
        <sp-menu>
            <sp-menu-item>
                Quick export
                <span slot="description">Share a snapshot</span>
            </sp-menu-item>
        </sp-menu>
    `;
};
export const valueSlot = () => {
  return html`
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
export const href = () => {
  return html`
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
//# sourceMappingURL=menu-item.stories.js.map

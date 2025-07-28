"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp(target, key, result);
  return result;
};
import {
  html
} from "@spectrum-web-components/base";
import {
  queryAssignedNodes,
  state
} from "@spectrum-web-components/base/src/decorators.js";
import { randomID } from "@spectrum-web-components/shared/src/random-id.js";
import { Menu } from "./Menu.dev.js";
import "@spectrum-web-components/menu/sp-menu.js";
import menuGroupStyles from "./menu-group.css.js";
export class MenuGroup extends Menu {
  constructor() {
    super(...arguments);
    this.headerId = "";
  }
  static get styles() {
    return [...super.styles, menuGroupStyles];
  }
  /**
   * a menu group must have the role `group`
   * and should never function as a menu
   */
  get ownRole() {
    return "group";
  }
  /**
   * only a menu controls roving tabindex;
   * groups should defer navigation to parent menu
   */
  get controlsRovingTabindex() {
    return false;
  }
  updateLabel() {
    const headerElement = this.headerElements.length ? this.headerElements[0] : void 0;
    if (headerElement !== this.headerElement) {
      if (this.headerElement && this.headerElement.id === this.headerId) {
        this.headerElement.removeAttribute("id");
      }
      if (headerElement) {
        this.headerId = this.headerId || `sp-menu-group-label-${randomID()}`;
        const headerId = headerElement.id || this.headerId;
        if (!headerElement.id) {
          headerElement.id = headerId;
        }
        this.setAttribute("aria-labelledby", headerId);
      } else {
        this.removeAttribute("aria-labelledby");
      }
    }
    this.headerElement = headerElement;
  }
  render() {
    return html`
            <span class="header" ?hidden=${!this.headerElement}>
                <slot name="header" @slotchange=${this.updateLabel}></slot>
            </span>
            ${this.renderMenuItemSlot()}
        `;
  }
}
__decorateClass([
  queryAssignedNodes({
    slot: "header",
    flatten: true
  })
], MenuGroup.prototype, "headerElements", 2);
__decorateClass([
  state()
], MenuGroup.prototype, "headerElement", 2);
//# sourceMappingURL=MenuGroup.dev.js.map

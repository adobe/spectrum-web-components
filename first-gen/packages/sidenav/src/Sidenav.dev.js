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
import { property } from "@spectrum-web-components/base/src/decorators.js";
import { RovingTabindexController } from "@spectrum-web-components/reactive-controllers/src/RovingTabindex.js";
import sidenavStyles from "./sidenav.css.js";
import { Focusable } from "@spectrum-web-components/shared";
import { SideNavItem } from "./SidenavItem.dev.js";
import { SideNavHeading } from "./SidenavHeading.dev.js";
import { ifDefined } from "@spectrum-web-components/base/src/directives.js";
export class SideNav extends Focusable {
  constructor() {
    super(...arguments);
    this.items = /* @__PURE__ */ new Set();
    this.rovingTabindexController = new RovingTabindexController(this, {
      focusInIndex: (elements) => {
        let parentSideNavItem;
        let index = elements.findIndex((el) => {
          if (el.value === this.value && this.isDisabledChild(el)) {
            parentSideNavItem = el.closest(
              "sp-sidenav-item:not([expanded])"
            );
          }
          return this.value ? !el.disabled && !this.isDisabledChild(el) && el.value === this.value : !el.disabled && !this.isDisabledChild(el);
        });
        if (index === -1 && parentSideNavItem) {
          index = elements.findIndex((el) => el === parentSideNavItem);
        }
        return index;
      },
      direction: "vertical",
      elements: () => [...this.querySelectorAll("sp-sidenav-item")],
      isFocusableElement: (el) => !el.disabled && !this.isDisabledChild(el)
    });
    this.manageTabIndex = false;
    this.value = void 0;
    this.variant = void 0;
    this.label = void 0;
  }
  static get styles() {
    return [sidenavStyles];
  }
  startTrackingSelectionForItem(item) {
    this.items.add(item);
    this.rovingTabindexController.clearElementCache();
  }
  stopTrackingSelectionForItem(item) {
    this.items.delete(item);
    this.rovingTabindexController.clearElementCache();
  }
  handleSelect(event) {
    event.stopPropagation();
    if (this.value === event.detail.value) {
      return;
    }
    const oldValue = this.value;
    this.value = event.detail.value;
    const applyDefault = this.dispatchEvent(
      new Event("change", {
        bubbles: true,
        composed: true,
        cancelable: true
      })
    );
    if (!applyDefault) {
      this.value = oldValue;
      event.target.selected = false;
      event.preventDefault();
    } else {
      this.items.forEach((item) => item.handleSideNavSelect(event));
    }
  }
  focus() {
    this.rovingTabindexController.focus();
  }
  blur() {
    if (this.focusElement === this) {
      return;
    }
    super.blur();
  }
  click() {
    if (this.focusElement === this) {
      return;
    }
    super.click();
  }
  get focusElement() {
    return this.rovingTabindexController.focusInElement || this;
  }
  isDisabledChild(child) {
    if (child.disabled) {
      return true;
    }
    let parent = child.parentElement;
    while (parent instanceof SideNavHeading || !parent.disabled && parent instanceof SideNavItem && parent.expanded) {
      parent = parent.parentElement;
    }
    return parent !== this;
  }
  handleSlotchange() {
    if (this.manageTabIndex) {
      this.rovingTabindexController.manage();
    } else {
      this.rovingTabindexController.unmanage();
    }
  }
  render() {
    return html`
            <nav
                @sidenav-select=${this.handleSelect}
                aria-label=${ifDefined(this.label)}
            >
                <div role="list">
                    <slot
                        name="descendant"
                        @slotchange=${this.handleSlotchange}
                    ></slot>
                </div>
            </nav>
        `;
  }
  willUpdate() {
    if (!this.hasUpdated) {
      const selectedChild = this.querySelector(
        "[selected]"
      );
      if (selectedChild) {
        this.value = selectedChild.value;
      }
    }
  }
  updated(changes) {
    super.updated(changes);
    if (changes.has("manageTabIndex")) {
      if (this.manageTabIndex) {
        this.rovingTabindexController.manage();
      } else {
        this.rovingTabindexController.unmanage();
      }
    }
  }
}
__decorateClass([
  property({ type: Boolean, reflect: true, attribute: "manage-tab-index" })
], SideNav.prototype, "manageTabIndex", 2);
__decorateClass([
  property({ reflect: true })
], SideNav.prototype, "value", 2);
__decorateClass([
  property({ reflect: true })
], SideNav.prototype, "variant", 2);
__decorateClass([
  property({ reflect: true })
], SideNav.prototype, "label", 2);
//# sourceMappingURL=Sidenav.dev.js.map

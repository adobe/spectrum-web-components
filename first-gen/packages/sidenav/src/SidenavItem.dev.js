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
  html,
  nothing
} from "@spectrum-web-components/base";
import { property } from "@spectrum-web-components/base/src/decorators.js";
import { ifDefined } from "@spectrum-web-components/base/src/directives.js";
import { LikeAnchor } from "@spectrum-web-components/shared/src/like-anchor.js";
import { Focusable } from "@spectrum-web-components/shared/src/focusable.js";
import sidenavItemStyles from "./sidenav-item.css.js";
const _SideNavItem = class _SideNavItem extends LikeAnchor(Focusable) {
  constructor() {
    super(...arguments);
    this.value = void 0;
    this.selected = false;
    this.expanded = false;
  }
  static get styles() {
    return [sidenavItemStyles];
  }
  get parentSideNav() {
    if (!this._parentSidenav) {
      this._parentSidenav = this.closest("sp-sidenav");
    }
    return this._parentSidenav;
  }
  get hasChildren() {
    return !!this.querySelector("sp-sidenav-item");
  }
  get depth() {
    let depth = 0;
    let element = this.parentElement;
    while (element instanceof _SideNavItem) {
      depth++;
      element = element.parentElement;
    }
    return depth;
  }
  handleSideNavSelect(event) {
    this.selected = event.target === this;
  }
  handleClick(event) {
    if (!this.href && event) {
      event.preventDefault();
    }
    if (!this.disabled && (!this.href || (event == null ? void 0 : event.defaultPrevented))) {
      if (this.hasChildren) {
        this.expanded = !this.expanded;
      } else if (this.value) {
        this.announceSelected(this.value);
      }
    }
  }
  announceSelected(value) {
    const selectDetail = {
      value
    };
    const selectionEvent = new CustomEvent("sidenav-select", {
      bubbles: true,
      composed: true,
      detail: selectDetail
    });
    this.dispatchEvent(selectionEvent);
  }
  click() {
    this.handleClick();
  }
  get focusElement() {
    return this.shadowRoot.querySelector("#item-link");
  }
  update(changes) {
    if (!this.hasAttribute("slot")) {
      this.slot = "descendant";
    }
    super.update(changes);
  }
  render() {
    return html`
            <a
                href=${this.href || "#"}
                target=${ifDefined(this.target)}
                download=${ifDefined(this.download)}
                rel=${ifDefined(this.rel)}
                data-level="${this.depth}"
                @click="${this.handleClick}"
                id="item-link"
                aria-current=${ifDefined(
      this.selected && this.href ? "page" : void 0
    )}
                aria-expanded=${ifDefined(
      this.hasChildren ? this.expanded : void 0
    )}
                aria-controls=${ifDefined(
      this.hasChildren && this.expanded ? "list" : void 0
    )}
            >
                <slot name="icon"></slot>
                <span id="link-text">
                    ${this.label}
                    <slot></slot>
                </span>
            </a>
            ${this.expanded ? html`
                      <div id="list" aria-labelledby="item-link" role="list">
                          <slot name="descendant"></slot>
                      </div>
                  ` : nothing}
        `;
  }
  updated(changes) {
    var _a;
    if (this.hasChildren && this.expanded && !this.selected && ((_a = this.parentSideNav) == null ? void 0 : _a.manageTabIndex)) {
      this.focusElement.tabIndex = -1;
    } else {
      this.focusElement.removeAttribute("tabindex");
    }
    super.updated(changes);
  }
  connectedCallback() {
    super.connectedCallback();
    this.startTrackingSelection();
  }
  disconnectedCallback() {
    this.stopTrackingSelection();
    super.disconnectedCallback();
  }
  async startTrackingSelection() {
    const parentSideNav = this.parentSideNav;
    if (parentSideNav) {
      await parentSideNav.updateComplete;
      parentSideNav.startTrackingSelectionForItem(this);
      this.selected = this.value != null && this.value === parentSideNav.value;
      if (this.selected === true && parentSideNav.variant === "multilevel") {
        let element = this.parentElement;
        while (element instanceof _SideNavItem) {
          element.expanded = true;
          element = element.parentElement;
        }
      }
    }
  }
  stopTrackingSelection() {
    const parentSideNav = this.parentSideNav;
    if (parentSideNav) {
      parentSideNav.stopTrackingSelectionForItem(this);
    }
    this._parentSidenav = void 0;
  }
  firstUpdated(changed) {
    super.firstUpdated(changed);
    this.setAttribute("role", "listitem");
  }
};
__decorateClass([
  property()
], _SideNavItem.prototype, "value", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], _SideNavItem.prototype, "selected", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], _SideNavItem.prototype, "expanded", 2);
export let SideNavItem = _SideNavItem;
//# sourceMappingURL=SidenavItem.dev.js.map

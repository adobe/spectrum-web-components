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
  SpectrumElement
} from "@spectrum-web-components/base";
import {
  property,
  query,
  queryAssignedElements,
  state
} from "@spectrum-web-components/base/src/decorators.js";
import "@spectrum-web-components/breadcrumbs/sp-breadcrumb-item.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-folder-open.js";
import "@spectrum-web-components/action-menu/sp-action-menu.js";
import "@spectrum-web-components/menu/sp-menu-item.js";
import {
  createRef,
  ref
} from "@spectrum-web-components/base/src/directives.js";
import styles from "./breadcrumbs.css.js";
import { ifDefined } from "@spectrum-web-components/base/src/directives.js";
export class Breadcrumbs extends SpectrumElement {
  constructor() {
    super(...arguments);
    this.maxVisibleItems = 4;
    this.label = "";
    this.menuLabel = "More items";
    this.compact = false;
    this.items = [];
    this.visibleItems = 0;
    this.firstRender = true;
    this.menuRef = createRef();
  }
  static get styles() {
    return [styles];
  }
  get hasMenu() {
    var _a, _b;
    return this.visibleItems < ((_b = (_a = this.breadcrumbsElements) == null ? void 0 : _a.length) != null ? _b : 0);
  }
  connectedCallback() {
    super.connectedCallback();
    if (!this.hasAttribute("role")) {
      this.setAttribute("role", "navigation");
    }
    this.resizeObserver = new ResizeObserver(() => {
      if (this.firstRender) {
        this.firstRender = false;
        return;
      }
      this.adjustOverflow();
    });
    this.resizeObserver.observe(this);
  }
  disconnectedCallback() {
    var _a;
    (_a = this.resizeObserver) == null ? void 0 : _a.unobserve(this);
    super.disconnectedCallback();
  }
  updated(changes) {
    super.updated(changes);
    if (changes.has("label")) {
      this.setAttribute("aria-label", this.label || "Breadcrumbs");
    }
    if (changes.has("maxVisibleItems") || changes.has("compact")) {
      this.calculateBreadcrumbItemsWidth();
      this.adjustOverflow();
    }
    if (changes.has("visibleItems")) {
      this.items.forEach((item, index) => {
        this.breadcrumbsElements[index].isLastOfType = index === this.breadcrumbsElements.length - 1;
        this.breadcrumbsElements[index].toggleAttribute(
          "hidden",
          !item.isVisible
        );
      });
    }
  }
  /**
   * We need to understand how much space (px) each breadcrumb item occupies,
   * in order to know if it fits the available horizontal space.
   */
  calculateBreadcrumbItemsWidth() {
    this.items = this.breadcrumbsElements.map((el, index) => {
      let width = el.offsetWidth;
      if (el.hasAttribute("hidden")) {
        el.removeAttribute("hidden");
        width = el.offsetWidth;
        el.setAttribute("hidden", "");
      }
      return {
        label: el.innerText,
        href: el.href,
        value: el.value || index.toString(),
        offsetWidth: width,
        isVisible: true
      };
    });
  }
  /**
   * Calculate which breadcrumbs fit in the viewport, and which should be hidden.
   */
  adjustOverflow() {
    let occupiedSpace = 0;
    let newVisibleItems = 0;
    const availableSpace = this.list.clientWidth;
    if (this.hasMenu && this.menuRef.value) {
      occupiedSpace += this.menuRef.value.offsetWidth || 0;
    }
    if (this.rootElement.length > 0) {
      occupiedSpace += this.rootElement[0].offsetWidth;
    }
    const start = 0;
    for (let i = this.items.length - 1; i >= start; i--) {
      occupiedSpace += this.items[i].offsetWidth;
      if (occupiedSpace < availableSpace && newVisibleItems < Math.max(this.maxVisibleItems, 1)) {
        this.items[i].isVisible = true;
        newVisibleItems++;
      } else {
        for (let j = i; j >= start; j--) {
          this.items[j].isVisible = false;
        }
        break;
      }
    }
    if (newVisibleItems === 0) {
      this.items[this.items.length - 1].isVisible = true;
      newVisibleItems++;
    }
    if (newVisibleItems !== this.visibleItems) {
      this.visibleItems = newVisibleItems;
    }
  }
  announceChange(value) {
    const selectDetail = {
      value
    };
    const selectionEvent = new CustomEvent("change", {
      bubbles: true,
      composed: true,
      detail: selectDetail
    });
    this.dispatchEvent(selectionEvent);
  }
  handleSelect(event) {
    event.stopPropagation();
    this.announceChange(event.detail.value);
  }
  handleMenuChange(event) {
    event.stopPropagation();
    this.announceChange(event.target.value);
  }
  /**
   * The truncation menu when there is not enough space to display all the breadcrumbs.
   * It displays all options within a breadcrumb.
   * Items are listed with the hierarchy ordered from top (root) to bottom
   * and include the currently selected item.
   */
  renderMenu() {
    return html`
            <sp-breadcrumb-item role="listitem" class="is-menu">
                <sp-action-menu
                    ${ref(this.menuRef)}
                    quiet
                    label=${this.menuLabel}
                    selects="single"
                    value=${this.items[this.items.length - 1].value}
                    @change=${this.handleMenuChange}
                    slot="menu"
                >
                    <slot slot="icon" name="icon">
                        <sp-icon-folder-open class="icon"></sp-icon-folder-open>
                    </slot>

                    ${this.items.map(
      (item) => html`
                            <sp-menu-item
                                href=${ifDefined(item.href)}
                                value=${item.value}
                            >
                                ${item.label}
                            </sp-menu-item>
                        `
    )}
                </sp-action-menu>
            </sp-breadcrumb-item>
        `;
  }
  /**
   * Breadcrumbs were added / removed, we need to recalculate the width of each item
   * and adjust the overflow accordingly.
   */
  async slotChangeHandler() {
    if (this.breadcrumbsElements.length === 0) {
      this.items = [];
      this.visibleItems = 0;
      return;
    }
    await Promise.all(
      this.breadcrumbsElements.map((el) => el.updateComplete)
    );
    this.calculateBreadcrumbItemsWidth();
    this.visibleItems = 0;
    this.adjustOverflow();
  }
  render() {
    return html`
            <ul @breadcrumb-select=${this.handleSelect} id="list">
                <slot name="root"></slot>
                ${this.hasMenu ? this.renderMenu() : ""}
                <slot @slotchange=${this.slotChangeHandler}></slot>
            </ul>
        `;
  }
}
__decorateClass([
  property({ type: Number, attribute: "max-visible-items" })
], Breadcrumbs.prototype, "maxVisibleItems", 2);
__decorateClass([
  property({ type: String })
], Breadcrumbs.prototype, "label", 2);
__decorateClass([
  property({ type: String, attribute: "menu-label" })
], Breadcrumbs.prototype, "menuLabel", 2);
__decorateClass([
  property({ type: Boolean })
], Breadcrumbs.prototype, "compact", 2);
__decorateClass([
  queryAssignedElements({ selector: "sp-breadcrumb-item" })
], Breadcrumbs.prototype, "breadcrumbsElements", 2);
__decorateClass([
  queryAssignedElements({ slot: "root", selector: "sp-breadcrumb-item" })
], Breadcrumbs.prototype, "rootElement", 2);
__decorateClass([
  query("#list")
], Breadcrumbs.prototype, "list", 2);
__decorateClass([
  state()
], Breadcrumbs.prototype, "items", 2);
__decorateClass([
  state()
], Breadcrumbs.prototype, "visibleItems", 2);
//# sourceMappingURL=Breadcrumbs.dev.js.map

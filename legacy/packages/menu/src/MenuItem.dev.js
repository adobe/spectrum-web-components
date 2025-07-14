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
import {
  ObserveSlotPresence,
  ObserveSlotText,
  randomID
} from "@spectrum-web-components/shared";
import {
  property,
  query
} from "@spectrum-web-components/base/src/decorators.js";
import "@spectrum-web-components/icons-ui/icons/sp-icon-checkmark100.js";
import { LikeAnchor } from "@spectrum-web-components/shared/src/like-anchor.js";
import { Focusable } from "@spectrum-web-components/shared/src/focusable.js";
import "@spectrum-web-components/icons-ui/icons/sp-icon-chevron100.js";
import chevronStyles from "@spectrum-web-components/icon/src/spectrum-icon-chevron.css.js";
import { DependencyManagerController } from "@spectrum-web-components/reactive-controllers/src/DependencyManger.js";
import menuItemStyles from "./menu-item.css.js";
import checkmarkStyles from "@spectrum-web-components/icon/src/spectrum-icon-checkmark.css.js";
import { MutationController } from "@lit-labs/observers/mutation-controller.js";
import { SlottableRequestEvent } from "@spectrum-web-components/overlay/src/slottable-request-event.js";
const POINTERLEAVE_TIMEOUT = 100;
export class MenuItemAddedOrUpdatedEvent extends Event {
  constructor(item) {
    super("sp-menu-item-added-or-updated", {
      bubbles: true,
      composed: true
    });
    this.menuCascade = /* @__PURE__ */ new WeakMap();
    this.clear(item);
  }
  clear(item) {
    this._item = item;
    this.currentAncestorWithSelects = void 0;
    item.menuData = {
      cleanupSteps: [],
      focusRoot: void 0,
      selectionRoot: void 0,
      parentMenu: void 0
    };
    this.menuCascade = /* @__PURE__ */ new WeakMap();
  }
  get item() {
    return this._item;
  }
}
export class MenuItemKeydownEvent extends KeyboardEvent {
  constructor({ root, event }) {
    super("sp-menu-item-keydown", { bubbles: true, composed: true });
    this.root = root;
    this._event = event;
  }
  get altKey() {
    var _a;
    return ((_a = this._event) == null ? void 0 : _a.altKey) || false;
  }
  get code() {
    var _a;
    return ((_a = this._event) == null ? void 0 : _a.code) || "";
  }
  get ctrlKey() {
    var _a;
    return ((_a = this._event) == null ? void 0 : _a.ctrlKey) || false;
  }
  get isComposing() {
    var _a;
    return ((_a = this._event) == null ? void 0 : _a.isComposing) || false;
  }
  get key() {
    var _a;
    return ((_a = this._event) == null ? void 0 : _a.key) || "";
  }
  get location() {
    var _a;
    return ((_a = this._event) == null ? void 0 : _a.location) || 0;
  }
  get metaKey() {
    var _a;
    return ((_a = this._event) == null ? void 0 : _a.metaKey) || false;
  }
  get repeat() {
    var _a;
    return ((_a = this._event) == null ? void 0 : _a.repeat) || false;
  }
  get shiftKey() {
    var _a;
    return ((_a = this._event) == null ? void 0 : _a.shiftKey) || false;
  }
}
export class MenuItem extends LikeAnchor(
  ObserveSlotText(ObserveSlotPresence(Focusable, '[slot="icon"]'))
) {
  constructor() {
    super();
    this.active = false;
    this.dependencyManager = new DependencyManagerController(this);
    this.focused = false;
    this.selected = false;
    this._value = "";
    this.hasSubmenu = false;
    this.noWrap = false;
    this.open = false;
    /**
     * whether menu item's submenu is opened via keyboard
     */
    this._openedViaKeyboard = false;
    /**
     * whether menu item's submenu is closed via pointer leave
     */
    this._closedViaPointer = false;
    this.handleSlottableRequest = (event) => {
      var _a;
      (_a = this.submenuElement) == null ? void 0 : _a.dispatchEvent(
        new SlottableRequestEvent(event.name, event.data)
      );
    };
    this.proxyFocus = () => {
      this.focus();
    };
    /**
     * forward key info from keydown event to parent menu
     */
    this.handleKeydown = (event) => {
      const { target, key } = event;
      const openSubmenuKey = this.hasSubmenu && !this.open && [" ", "Enter"].includes(key);
      if (target === this) {
        if (["ArrowLeft", "ArrowRight", "Escape"].includes(key) || openSubmenuKey)
          event.preventDefault();
        this.dispatchEvent(
          new MenuItemKeydownEvent({ root: this, event })
        );
      }
    };
    this.handleBeforetoggle = (event) => {
      if (event.newState === "closed") {
        this.open = true;
        this.overlayElement.manuallyKeepOpen();
        this.overlayElement.removeEventListener(
          "beforetoggle",
          this.handleBeforetoggle
        );
      }
    };
    this.recentlyLeftChild = false;
    this.willDispatchUpdate = false;
    this.menuData = {
      // menu that controls ArrowUp/ArrowDown navigation
      focusRoot: void 0,
      parentMenu: void 0,
      // menu or menu group that controls selection
      selectionRoot: void 0,
      cleanupSteps: []
    };
    this.addEventListener("click", this.handleClickCapture, {
      capture: true
    });
    this.addEventListener("focus", this.handleFocus);
    this.addEventListener("blur", this.handleBlur);
    new MutationController(this, {
      config: {
        characterData: true,
        childList: true,
        subtree: true,
        attributeFilter: ["src"]
      },
      callback: (mutations) => {
        const isSubmenu = mutations.every(
          (mutation) => mutation.target.slot === "submenu"
        );
        if (isSubmenu) {
          return;
        }
        this.breakItemChildrenCache();
      }
    });
  }
  static get styles() {
    return [menuItemStyles, checkmarkStyles, chevronStyles];
  }
  get value() {
    return this._value || this.itemText;
  }
  set value(value) {
    if (value === this._value) {
      return;
    }
    this._value = value || "";
    if (this._value) {
      this.setAttribute("value", this._value);
    } else {
      this.removeAttribute("value");
    }
  }
  /**
   * @private
   * text content of the menu item minus whitespace
   */
  get itemText() {
    return this.itemChildren.content.reduce(
      (acc, node) => acc + (node.textContent || "").trim(),
      ""
    );
  }
  /**
   * the focusable element of the menu item
   */
  get focusElement() {
    return this;
  }
  get hasIcon() {
    return this.slotContentIsPresent;
  }
  get itemChildren() {
    if (!this.iconSlot || !this.contentSlot) {
      return {
        icon: [],
        content: []
      };
    }
    if (this._itemChildren) {
      return this._itemChildren;
    }
    const icon = this.iconSlot.assignedElements().map((element) => {
      const newElement = element.cloneNode(true);
      newElement.removeAttribute("slot");
      newElement.classList.toggle("icon");
      return newElement;
    });
    const content = this.contentSlot.assignedNodes().map((node) => node.cloneNode(true));
    this._itemChildren = { icon, content };
    return this._itemChildren;
  }
  handleClickCapture(event) {
    if (this.disabled) {
      event.preventDefault();
      event.stopImmediatePropagation();
      event.stopPropagation();
      return false;
    }
    if (this.shouldProxyClick()) {
      return;
    }
  }
  shouldProxyClick() {
    let handled = false;
    if (this.anchorElement) {
      this.anchorElement.click();
      handled = true;
    }
    return handled;
  }
  breakItemChildrenCache() {
    this._itemChildren = void 0;
    this.triggerUpdate();
  }
  renderSubmenu() {
    const slot = html`
            <slot
                name="submenu"
                @slotchange=${this.manageSubmenu}
                @sp-menu-item-added-or-updated=${{
      handleEvent: (event) => {
        event.clear(event.item);
      },
      capture: true
    }}
                @focusin=${(event) => event.stopPropagation()}
            ></slot>
        `;
    if (!this.hasSubmenu) {
      return slot;
    }
    this.dependencyManager.add("sp-overlay");
    this.dependencyManager.add("sp-popover");
    import("@spectrum-web-components/overlay/sp-overlay.js");
    import("@spectrum-web-components/popover/sp-popover.js");
    return html`
            <sp-overlay
                receives-focus="false"
                .triggerElement=${this}
                ?disabled=${!this.hasSubmenu}
                ?open=${this.hasSubmenu && this.open && this.dependencyManager.loaded}
                .placement=${this.isLTR ? "right-start" : "left-start"}
                receives-focus="false"
                .offset=${[-10, -5]}
                .type=${"auto"}
                @close=${(event) => event.stopPropagation()}
                @slottable-request=${this.handleSlottableRequest}
            >
                <sp-popover
                    @change=${(event) => {
      this.handleSubmenuChange(event);
      this.open = false;
    }}
                    @pointerenter=${this.handleSubmenuPointerenter}
                    @pointerleave=${this.handleSubmenuPointerleave}
                    @sp-menu-item-added-or-updated=${(event) => event.stopPropagation()}
                >
                    ${slot}
                </sp-popover>
            </sp-overlay>
            <sp-icon-chevron100
                class="spectrum-UIIcon-ChevronRight100 chevron icon"
            ></sp-icon-chevron100>
        `;
  }
  render() {
    return html`
            ${this.selected ? html`
                      <sp-icon-checkmark100
                          id="selected"
                          class="spectrum-UIIcon-Checkmark100 
                            icon 
                            checkmark
                            ${this.hasIcon ? "checkmark--withAdjacentIcon" : ""}"
                      ></sp-icon-checkmark100>
                  ` : nothing}
            <slot name="icon"></slot>
            <div id="label">
                <slot id="slot"></slot>
            </div>
            <slot name="description"></slot>
            <slot name="value"></slot>
            ${this.href && this.href.length > 0 ? super.renderAnchor({
      id: "button",
      ariaHidden: true,
      className: "button anchor hidden"
    }) : nothing}
            ${this.renderSubmenu()}
        `;
  }
  /**
   * determines if item has a submenu and updates the `aria-haspopup` attribute
   */
  manageSubmenu(event) {
    this.submenuElement = event.target.assignedElements({
      flatten: true
    })[0];
    this.hasSubmenu = !!this.submenuElement;
    if (this.hasSubmenu) {
      this.setAttribute("aria-haspopup", "true");
    }
  }
  handlePointerdown(event) {
    if (event.target === this && this.hasSubmenu && this.open) {
      this.addEventListener("focus", this.handleSubmenuFocus, {
        once: true
      });
      this.overlayElement.addEventListener(
        "beforetoggle",
        this.handleBeforetoggle
      );
    }
  }
  firstUpdated(changes) {
    super.firstUpdated(changes);
    this.setAttribute("tabindex", "-1");
    this.addEventListener("keydown", this.handleKeydown);
    this.addEventListener("mouseover", this.handleMouseover);
    this.addEventListener("pointerdown", this.handlePointerdown);
    this.addEventListener("pointerenter", this.closeOverlaysForRoot);
    if (!this.hasAttribute("id")) {
      this.id = `sp-menu-item-${randomID()}`;
    }
  }
  handleMouseover(event) {
    const target = event.target;
    if (target === this) {
      this.focus();
      this.focused = false;
    }
  }
  closeOverlaysForRoot() {
    var _a;
    if (this.open) return;
    (_a = this.menuData.parentMenu) == null ? void 0 : _a.closeDescendentOverlays();
  }
  handleFocus(event) {
    const { target } = event;
    if (target === this) {
      this.focused = true;
    }
  }
  handleBlur(event) {
    const { target } = event;
    if (target === this) {
      this.focused = false;
    }
  }
  handleSubmenuClick(event) {
    if (event.composedPath().includes(this.overlayElement)) {
      return;
    }
    this.openOverlay(true);
  }
  handleSubmenuFocus() {
    requestAnimationFrame(() => {
      this.overlayElement.open = this.open;
      this.focused = false;
    });
  }
  handlePointerenter() {
    if (this.leaveTimeout) {
      clearTimeout(this.leaveTimeout);
      delete this.leaveTimeout;
      this.recentlyLeftChild = false;
      return;
    }
    this.focus();
    this.openOverlay();
  }
  handlePointerleave() {
    this._closedViaPointer = true;
    if (this.open && !this.recentlyLeftChild) {
      this.leaveTimeout = setTimeout(() => {
        delete this.leaveTimeout;
        this.open = false;
      }, POINTERLEAVE_TIMEOUT);
    }
  }
  /**
   * When there is a `change` event in the submenu for this item
   * then we "click" this item to cascade the selection up the
   * menu tree allowing all submenus between the initial selection
   * and the root of the tree to have their selection changes and
   * be closed.
   */
  handleSubmenuChange(event) {
    var _a;
    event.stopPropagation();
    (_a = this.menuData.selectionRoot) == null ? void 0 : _a.selectOrToggleItem(this);
  }
  handleSubmenuPointerenter() {
    this.recentlyLeftChild = true;
  }
  async handleSubmenuPointerleave() {
    this.recentlyLeftChild = false;
  }
  handleSubmenuOpen(event) {
    var _a;
    const parentOverlay = event.composedPath().find((el) => {
      return el !== this.overlayElement && el.localName === "sp-overlay";
    });
    if (this._openedViaKeyboard) {
      (_a = this.submenuElement) == null ? void 0 : _a.focus();
    }
    this.overlayElement.parentOverlayToForceClose = parentOverlay;
  }
  cleanup() {
    this._closedViaPointer = false;
    this.setAttribute("aria-expanded", "false");
    this.open = false;
    this.active = false;
  }
  async openOverlay(shouldFocus = false) {
    if (!this.hasSubmenu || this.open || this.disabled) {
      return;
    }
    this.open = true;
    this.active = true;
    this.setAttribute("aria-expanded", "true");
    this._openedViaKeyboard = shouldFocus;
    this.addEventListener("sp-closed", this.cleanup, {
      once: true
    });
  }
  updateAriaSelected() {
    const role = this.getAttribute("role");
    if (role === "option") {
      this.setAttribute(
        "aria-selected",
        this.selected ? "true" : "false"
      );
    } else if (role === "menuitemcheckbox" || role === "menuitemradio") {
      this.setAttribute("aria-checked", this.selected ? "true" : "false");
    }
  }
  setRole(role) {
    this.setAttribute("role", role);
    this.updateAriaSelected();
  }
  willUpdate(changes) {
    super.updated(changes);
    if (changes.has("open") && !this.open && this.hasSubmenu && !this._closedViaPointer && this.matches(":focus-within")) {
      this.focus();
    }
  }
  updated(changes) {
    var _a, _b;
    super.updated(changes);
    if (changes.has("label") && (this.label || typeof changes.get("label") !== "undefined")) {
      this.setAttribute("aria-label", this.label || "");
    }
    if (changes.has("active") && (this.active || typeof changes.get("active") !== "undefined")) {
      if (this.active) {
        (_a = this.menuData.selectionRoot) == null ? void 0 : _a.closeDescendentOverlays();
      }
    }
    if (this.anchorElement) {
      this.anchorElement.addEventListener("focus", this.proxyFocus);
      this.anchorElement.tabIndex = -1;
    }
    if (changes.has("selected")) {
      this.updateAriaSelected();
    }
    if (changes.has("hasSubmenu") && (this.hasSubmenu || typeof changes.get("hasSubmenu") !== "undefined")) {
      if (this.hasSubmenu) {
        this.abortControllerSubmenu = new AbortController();
        const options = { signal: this.abortControllerSubmenu.signal };
        this.addEventListener(
          "click",
          this.handleSubmenuClick,
          options
        );
        this.addEventListener(
          "pointerenter",
          this.handlePointerenter,
          options
        );
        this.addEventListener(
          "pointerleave",
          this.handlePointerleave,
          options
        );
        this.addEventListener(
          "sp-opened",
          this.handleSubmenuOpen,
          options
        );
      } else {
        (_b = this.abortControllerSubmenu) == null ? void 0 : _b.abort();
      }
    }
  }
  connectedCallback() {
    super.connectedCallback();
    this.triggerUpdate();
  }
  disconnectedCallback() {
    this.menuData.cleanupSteps.forEach((removal) => removal(this));
    this.menuData = {
      focusRoot: void 0,
      parentMenu: void 0,
      selectionRoot: void 0,
      cleanupSteps: []
    };
    super.disconnectedCallback();
  }
  async triggerUpdate() {
    if (this.willDispatchUpdate) {
      return;
    }
    this.willDispatchUpdate = true;
    await new Promise((ready) => requestAnimationFrame(ready));
    this.dispatchUpdate();
  }
  focus() {
    super.focus();
    this.dispatchEvent(new FocusEvent("focus"));
  }
  blur() {
    this.dispatchEvent(new FocusEvent("blur"));
    super.blur();
  }
  dispatchUpdate() {
    if (!this.isConnected) {
      return;
    }
    this.dispatchEvent(new MenuItemAddedOrUpdatedEvent(this));
    this.willDispatchUpdate = false;
  }
}
__decorateClass([
  property({ type: Boolean, reflect: true })
], MenuItem.prototype, "active", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], MenuItem.prototype, "focused", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], MenuItem.prototype, "selected", 2);
__decorateClass([
  property({ type: String })
], MenuItem.prototype, "value", 1);
__decorateClass([
  property({ type: Boolean, reflect: true, attribute: "has-submenu" })
], MenuItem.prototype, "hasSubmenu", 2);
__decorateClass([
  query("slot:not([name])")
], MenuItem.prototype, "contentSlot", 2);
__decorateClass([
  query('slot[name="icon"]')
], MenuItem.prototype, "iconSlot", 2);
__decorateClass([
  property({
    type: Boolean,
    reflect: true,
    attribute: "no-wrap",
    hasChanged() {
      return false;
    }
  })
], MenuItem.prototype, "noWrap", 2);
__decorateClass([
  query(".anchor")
], MenuItem.prototype, "anchorElement", 2);
__decorateClass([
  query("sp-overlay")
], MenuItem.prototype, "overlayElement", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], MenuItem.prototype, "open", 2);
//# sourceMappingURL=MenuItem.dev.js.map

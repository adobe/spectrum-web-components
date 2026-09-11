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
  state
} from "@spectrum-web-components/base/src/decorators.js";
import { randomID } from "@spectrum-web-components/shared/src/random-id.js";
import "@spectrum-web-components/overlay/sp-overlay.js";
import overlayTriggerStyles from "./overlay-trigger.css.js";
const _OverlayTrigger = class _OverlayTrigger extends SpectrumElement {
  constructor() {
    super(...arguments);
    this.offset = 6;
    this.disabled = false;
    this.receivesFocus = "auto";
    this.clickContent = [];
    this.longpressContent = [];
    this.hoverContent = [];
    this.targetContent = [];
    /**
     * Tracks elements where this component has taken ownership
     * of ARIA attributes, so consumer-set values are never removed.
     */
    this.ariaManagedElements = /* @__PURE__ */ new WeakSet();
  }
  static get styles() {
    return [overlayTriggerStyles];
  }
  getAssignedElementsFromSlot(slot) {
    return slot.assignedElements({ flatten: true });
  }
  handleTriggerContent(event) {
    this.targetContent = this.getAssignedElementsFromSlot(event.target);
  }
  handleSlotContent(event) {
    switch (event.target.name) {
      case "click-content":
        this.clickContent = this.getAssignedElementsFromSlot(event.target);
        break;
      case "longpress-content":
        this.longpressContent = this.getAssignedElementsFromSlot(event.target);
        break;
      case "hover-content":
        this.hoverContent = this.getAssignedElementsFromSlot(event.target);
        break;
    }
  }
  handleBeforetoggle(event) {
    const { target } = event;
    let type;
    if (target === this.clickOverlayElement) {
      type = "click";
    } else if (target === this.longpressOverlayElement) {
      type = "longpress";
    } else if (target === this.hoverOverlayElement) {
      type = "hover";
    } else {
      return;
    }
    if (event.newState === "open") {
      this.open = type;
    } else if (this.open === type) {
      this.open = void 0;
    }
  }
  resolveHaspopupValue() {
    const content = this.clickContent[0] || this.longpressContent[0];
    if (!content) {
      return "dialog";
    }
    const role = content.getAttribute("role");
    if (role && _OverlayTrigger.VALID_HASPOPUP_ROLES.has(role)) {
      return role;
    }
    const firstChild = content.querySelector("[role]");
    if (firstChild && _OverlayTrigger.VALID_HASPOPUP_ROLES.has(firstChild.getAttribute("role"))) {
      return firstChild.getAttribute("role");
    }
    return "dialog";
  }
  removeAriaFromTrigger(element) {
    if (!this.ariaManagedElements.has(element)) {
      return;
    }
    element.removeAttribute("aria-expanded");
    element.removeAttribute("aria-controls");
    element.removeAttribute("aria-haspopup");
    this.ariaManagedElements.delete(element);
  }
  manageAriaOnTrigger() {
    const triggerElement = this.targetContent[0];
    if (this.previousTriggerElement && this.previousTriggerElement !== triggerElement) {
      this.removeAriaFromTrigger(this.previousTriggerElement);
    }
    this.previousTriggerElement = triggerElement;
    if (!triggerElement) {
      return;
    }
    const hasClickContent = this.clickContent.length > 0;
    const hasLongpressContent = this.longpressContent.length > 0;
    if (!hasClickContent && !hasLongpressContent) {
      this.removeAriaFromTrigger(triggerElement);
      return;
    }
    const isExpanded = this.open === "click" || this.open === "longpress";
    triggerElement.setAttribute("aria-expanded", String(isExpanded));
    if (this.ariaManagedElements.has(triggerElement) || !triggerElement.hasAttribute("aria-haspopup")) {
      triggerElement.setAttribute("aria-haspopup", this.resolveHaspopupValue());
    }
    this.ariaManagedElements.add(triggerElement);
    const content = this.open === "longpress" ? this.longpressContent[0] : this.open === "click" ? this.clickContent[0] : this.clickContent[0] || this.longpressContent[0];
    if (content) {
      if (!content.id) {
        content.id = `sp-overlay-content-${randomID()}`;
      }
      triggerElement.setAttribute("aria-controls", content.id);
    } else {
      triggerElement.removeAttribute("aria-controls");
    }
  }
  disconnectedCallback() {
    if (this.previousTriggerElement) {
      this.removeAriaFromTrigger(this.previousTriggerElement);
      this.previousTriggerElement = void 0;
    }
    super.disconnectedCallback();
  }
  update(changes) {
    var _a, _b, _c, _d, _e, _f;
    if (changes.has("clickContent")) {
      this.clickPlacement = ((_a = this.clickContent[0]) == null ? void 0 : _a.getAttribute("placement")) || ((_b = this.clickContent[0]) == null ? void 0 : _b.getAttribute("direction")) || void 0;
    }
    if (changes.has("hoverContent")) {
      this.hoverPlacement = ((_c = this.hoverContent[0]) == null ? void 0 : _c.getAttribute("placement")) || ((_d = this.hoverContent[0]) == null ? void 0 : _d.getAttribute("direction")) || void 0;
    }
    if (changes.has("longpressContent")) {
      this.longpressPlacement = ((_e = this.longpressContent[0]) == null ? void 0 : _e.getAttribute("placement")) || ((_f = this.longpressContent[0]) == null ? void 0 : _f.getAttribute("direction")) || void 0;
    }
    super.update(changes);
  }
  renderSlot(name) {
    return html`
      <slot name=${name} @slotchange=${this.handleSlotContent}></slot>
    `;
  }
  renderClickOverlay() {
    var _a;
    const slot = this.renderSlot("click-content");
    const clickOverlay = html`
      <sp-overlay
        id="click-overlay"
        ?disabled=${this.disabled || !this.clickContent.length}
        ?open=${this.open === "click" && !!this.clickContent.length}
        .offset=${this.offset}
        .placement=${this.clickPlacement || this.placement}
        .triggerElement=${this.targetContent[0]}
        .triggerInteraction=${"click"}
        .type=${this.type || "auto"}
        @beforetoggle=${this.handleBeforetoggle}
        .receivesFocus=${this.receivesFocus}
      >
        ${slot}
      </sp-overlay>
    `;
    if ((_a = this.triggeredBy) == null ? void 0 : _a.includes("click")) {
      return clickOverlay;
    }
    if (!this.clickContent.length) {
      return slot;
    } else {
      return clickOverlay;
    }
  }
  renderHoverOverlay() {
    var _a;
    const slot = this.renderSlot("hover-content");
    const hoverOverlay = html`
      <sp-overlay
        id="hover-overlay"
        ?open=${this.open === "hover" && !!this.hoverContent.length}
        ?disabled=${this.disabled || !this.hoverContent.length || !!this.open && this.open !== "hover"}
        .offset=${this.offset}
        .placement=${this.hoverPlacement || this.placement}
        .triggerElement=${this.targetContent[0]}
        .triggerInteraction=${"hover"}
        .type=${"hint"}
        @beforetoggle=${this.handleBeforetoggle}
        .receivesFocus=${this.receivesFocus}
      >
        ${slot}
      </sp-overlay>
    `;
    if ((_a = this.triggeredBy) == null ? void 0 : _a.includes("hover")) {
      return hoverOverlay;
    }
    if (!this.hoverContent.length) {
      return slot;
    } else {
      return hoverOverlay;
    }
  }
  renderLongpressOverlay() {
    var _a;
    const slot = this.renderSlot("longpress-content");
    const longpressOverlay = html`
      <sp-overlay
        id="longpress-overlay"
        ?disabled=${this.disabled || !this.longpressContent.length}
        ?open=${this.open === "longpress" && !!this.longpressContent.length}
        .offset=${this.offset}
        .placement=${this.longpressPlacement || this.placement}
        .triggerElement=${this.targetContent[0]}
        .triggerInteraction=${"longpress"}
        .type=${"auto"}
        @beforetoggle=${this.handleBeforetoggle}
        .receivesFocus=${this.receivesFocus}
      >
        ${slot}
      </sp-overlay>
      <slot name="longpress-describedby-descriptor"></slot>
    `;
    if ((_a = this.triggeredBy) == null ? void 0 : _a.includes("longpress")) {
      return longpressOverlay;
    }
    if (!this.longpressContent.length) {
      return slot;
    } else {
      return longpressOverlay;
    }
  }
  render() {
    return html`
      <slot
        id="trigger"
        name="trigger"
        @slotchange=${this.handleTriggerContent}
      ></slot>
      ${[
      this.renderClickOverlay(),
      this.renderHoverOverlay(),
      this.renderLongpressOverlay()
    ]}
    `;
  }
  updated(changedProperties) {
    super.updated(changedProperties);
    if (!this.triggeredBy) {
      const issues = [
        "You have not specified the `triggeredBy` property. For optimal performance, consider explicitly declaring which overlay types you plan to use.",
        'Example: triggered-by="click hover"',
        "This helps avoid unnecessary DOM operations and potential race conditions."
      ];
      window.__swc.warn(
        this,
        "Performance optimization available for <overlay-trigger>:",
        "https://opensource.adobe.com/spectrum-web-components/components/overlay-trigger/#performance-optimization",
        { issues }
      );
    }
    if (this.disabled && changedProperties.has("disabled")) {
      this.open = void 0;
      return;
    }
    if (changedProperties.has("open") || changedProperties.has("type") || changedProperties.has("targetContent") || changedProperties.has("clickContent") || changedProperties.has("longpressContent")) {
      this.manageAriaOnTrigger();
    }
  }
  async getUpdateComplete() {
    const complete = await super.getUpdateComplete();
    return complete;
  }
};
_OverlayTrigger.VALID_HASPOPUP_ROLES = /* @__PURE__ */ new Set([
  "menu",
  "listbox",
  "tree",
  "grid",
  "dialog"
]);
__decorateClass([
  property({ attribute: "triggered-by" })
], _OverlayTrigger.prototype, "triggeredBy", 2);
__decorateClass([
  property({ reflect: true })
], _OverlayTrigger.prototype, "placement", 2);
__decorateClass([
  property()
], _OverlayTrigger.prototype, "type", 2);
__decorateClass([
  property({ type: Number })
], _OverlayTrigger.prototype, "offset", 2);
__decorateClass([
  property({ reflect: true })
], _OverlayTrigger.prototype, "open", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], _OverlayTrigger.prototype, "disabled", 2);
__decorateClass([
  property({ attribute: "receives-focus" })
], _OverlayTrigger.prototype, "receivesFocus", 2);
__decorateClass([
  state()
], _OverlayTrigger.prototype, "clickContent", 2);
__decorateClass([
  state()
], _OverlayTrigger.prototype, "longpressContent", 2);
__decorateClass([
  state()
], _OverlayTrigger.prototype, "hoverContent", 2);
__decorateClass([
  state()
], _OverlayTrigger.prototype, "targetContent", 2);
__decorateClass([
  query("#click-overlay", true)
], _OverlayTrigger.prototype, "clickOverlayElement", 2);
__decorateClass([
  query("#longpress-overlay", true)
], _OverlayTrigger.prototype, "longpressOverlayElement", 2);
__decorateClass([
  query("#hover-overlay", true)
], _OverlayTrigger.prototype, "hoverOverlayElement", 2);
export let OverlayTrigger = _OverlayTrigger;
//# sourceMappingURL=OverlayTrigger.dev.js.map

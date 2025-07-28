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
import "@spectrum-web-components/overlay/sp-overlay.js";
import overlayTriggerStyles from "./overlay-trigger.css.js";
export class OverlayTrigger extends SpectrumElement {
  constructor() {
    super(...arguments);
    this.offset = 6;
    this.disabled = false;
    this.receivesFocus = "auto";
    this.clickContent = [];
    this.longpressContent = [];
    this.hoverContent = [];
    this.targetContent = [];
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
        this.clickContent = this.getAssignedElementsFromSlot(
          event.target
        );
        break;
      case "longpress-content":
        this.longpressContent = this.getAssignedElementsFromSlot(
          event.target
        );
        break;
      case "hover-content":
        this.hoverContent = this.getAssignedElementsFromSlot(
          event.target
        );
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
  update(changes) {
    var _a, _b, _c, _d, _e, _f;
    if (changes.has("clickContent")) {
      this.clickPlacement = ((_a = this.clickContent[0]) == null ? void 0 : _a.getAttribute("placement")) || ((_b = this.clickContent[0]) == null ? void 0 : _b.getAttribute(
        "direction"
      )) || void 0;
    }
    if (changes.has("hoverContent")) {
      this.hoverPlacement = ((_c = this.hoverContent[0]) == null ? void 0 : _c.getAttribute("placement")) || ((_d = this.hoverContent[0]) == null ? void 0 : _d.getAttribute(
        "direction"
      )) || void 0;
    }
    if (changes.has("longpressContent")) {
      this.longpressPlacement = ((_e = this.longpressContent[0]) == null ? void 0 : _e.getAttribute("placement")) || ((_f = this.longpressContent[0]) == null ? void 0 : _f.getAttribute(
        "direction"
      )) || void 0;
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
                .type=${this.type !== "modal" ? "auto" : "modal"}
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
  }
  async getUpdateComplete() {
    const complete = await super.getUpdateComplete();
    return complete;
  }
}
__decorateClass([
  property({ attribute: "triggered-by" })
], OverlayTrigger.prototype, "triggeredBy", 2);
__decorateClass([
  property({ reflect: true })
], OverlayTrigger.prototype, "placement", 2);
__decorateClass([
  property()
], OverlayTrigger.prototype, "type", 2);
__decorateClass([
  property({ type: Number })
], OverlayTrigger.prototype, "offset", 2);
__decorateClass([
  property({ reflect: true })
], OverlayTrigger.prototype, "open", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], OverlayTrigger.prototype, "disabled", 2);
__decorateClass([
  property({ attribute: "receives-focus" })
], OverlayTrigger.prototype, "receivesFocus", 2);
__decorateClass([
  state()
], OverlayTrigger.prototype, "clickContent", 2);
__decorateClass([
  state()
], OverlayTrigger.prototype, "longpressContent", 2);
__decorateClass([
  state()
], OverlayTrigger.prototype, "hoverContent", 2);
__decorateClass([
  state()
], OverlayTrigger.prototype, "targetContent", 2);
__decorateClass([
  query("#click-overlay", true)
], OverlayTrigger.prototype, "clickOverlayElement", 2);
__decorateClass([
  query("#longpress-overlay", true)
], OverlayTrigger.prototype, "longpressOverlayElement", 2);
__decorateClass([
  query("#hover-overlay", true)
], OverlayTrigger.prototype, "hoverOverlayElement", 2);
//# sourceMappingURL=OverlayTrigger.dev.js.map

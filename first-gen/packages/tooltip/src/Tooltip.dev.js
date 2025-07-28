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
  query
} from "@spectrum-web-components/base/src/decorators.js";
import { ifDefined } from "@spectrum-web-components/base/src/directives.js";
import tooltipStyles from "./tooltip.css.js";
import { focusableSelector } from "@spectrum-web-components/shared/src/focusable-selectors.js";
import { DependencyManagerController } from "@spectrum-web-components/reactive-controllers/src/DependencyManger.js";
class TooltipOpenable extends HTMLElement {
  constructor() {
    super();
    this._open = false;
    this._placement = "top";
    this.addEventListener("sp-opened", this.redispatchEvent);
    this.addEventListener("sp-closed", this.redispatchEvent);
  }
  redispatchEvent(event) {
    event.stopPropagation();
    this.tooltip.dispatchEvent(
      new CustomEvent(event.type, {
        bubbles: event.bubbles,
        composed: event.composed,
        detail: event.detail
      })
    );
  }
  get tooltip() {
    return this.getRootNode().host;
  }
  static get observedAttributes() {
    return ["open", "placement"];
  }
  attributeChangedCallback(name, _oldValue, newValue) {
    switch (name) {
      case "open":
        this.open = newValue !== null;
        break;
      case "placement":
        this.placement = newValue;
        break;
    }
  }
  set open(open) {
    this._open = open;
    const { tooltip } = this;
    if (!tooltip) {
      return;
    }
    tooltip.open = open;
  }
  /* c8 ignore next 3 */
  get open() {
    return this._open;
  }
  /**
   * @type {"top" | "top-start" | "top-end" | "right" | "right-start" | "right-end" | "bottom" | "bottom-start" | "bottom-end" | "left" | "left-start" | "left-end"}
   * @attr
   */
  set placement(placement) {
    this._placement = placement;
    const { tooltip } = this;
    if (!tooltip) {
      return;
    }
    tooltip.placement = placement;
  }
  /* c8 ignore next 3 */
  get placement() {
    return this._placement;
  }
  get tipElement() {
    return this.tooltip.tipElement;
  }
}
if (!customElements.get("sp-tooltip-openable")) {
  customElements.define("sp-tooltip-openable", TooltipOpenable);
}
export class Tooltip extends SpectrumElement {
  constructor() {
    super(...arguments);
    this.delayed = false;
    this.dependencyManager = new DependencyManagerController(this);
    this.disabled = false;
    this.selfManaged = false;
    this.offset = 0;
    this.open = false;
    /* Ensure that a '' value for `variant` removes the attribute instead of a blank value */
    this._variant = "";
    this.handleOpenOverlay = () => {
      this.open = true;
    };
    this.handleCloseOverlay = () => {
      this.open = false;
    };
  }
  static get styles() {
    return [tooltipStyles];
  }
  get variant() {
    return this._variant;
  }
  set variant(variant) {
    if (variant === this.variant) {
      return;
    }
    if (["info", "positive", "negative"].includes(variant)) {
      this.setAttribute("variant", variant);
      this._variant = variant;
      return;
    }
    this.removeAttribute("variant");
    this._variant = "";
  }
  forwardTransitionEvent(event) {
    this.dispatchEvent(
      new TransitionEvent(event.type, {
        bubbles: true,
        composed: true,
        propertyName: event.propertyName
      })
    );
  }
  get triggerElement() {
    var _a;
    let start = this.assignedSlot || this;
    let root = start.getRootNode();
    if (root === document) {
      if (true) {
        window.__swc.warn(
          this,
          `Self managed <${this.localName}> elements walk up the composed tree to acquire a trigger element. No trigger element was found before the document.`,
          "https://opensource.adobe.com/spectrum-web-components/components/tooltip#self-managed-overlays",
          {
            level: "high"
          }
        );
      }
      return null;
    }
    let triggerElement = start.parentElement || root.host || /* c8 ignore next 1 */
    root;
    while (!((_a = triggerElement == null ? void 0 : triggerElement.matches) == null ? void 0 : _a.call(triggerElement, focusableSelector))) {
      start = triggerElement.assignedSlot || triggerElement;
      root = start.getRootNode();
      if (root === document) {
        if (true) {
          window.__swc.warn(
            this,
            `Self managed <${this.localName}> elements walk up the composed tree to acquire a trigger element. No trigger element was found before the document.`,
            "https://opensource.adobe.com/spectrum-web-components/components/tooltip#self-managed-overlays",
            {
              level: "high"
            }
          );
        }
        return null;
      }
      triggerElement = start.parentElement || root.host || /* c8 ignore next 1 */
      root;
    }
    return triggerElement;
  }
  render() {
    const tooltip = html`
            <sp-tooltip-openable
                id="tooltip"
                placement=${ifDefined(this.placement)}
                @transitionrun=${this.forwardTransitionEvent}
                @transitionend=${this.forwardTransitionEvent}
                @transitioncancel=${this.forwardTransitionEvent}
            >
                <slot name="icon"></slot>
                <span id="label"><slot></slot></span>
                <span id="tip" aria-hidden="true"></span>
            </sp-tooltip-openable>
        `;
    if (this.selfManaged) {
      this.dependencyManager.add("sp-overlay");
      import("@spectrum-web-components/overlay/sp-overlay.js");
      return html`
                <sp-overlay
                    ?open=${this.open && !this.disabled && this.dependencyManager.loaded}
                    ?delayed=${this.delayed}
                    ?disabled=${this.disabled}
                    offset=${this.offset}
                    .placement=${this.placement}
                    type="hint"
                    .tipPadding=${this.tipPadding}
                    .triggerInteraction=${"hover"}
                    @sp-opened=${this.handleOpenOverlay}
                    @sp-closed=${this.handleCloseOverlay}
                >
                    ${tooltip}
                </sp-overlay>
            `;
    } else {
      return tooltip;
    }
  }
  connectedCallback() {
    super.connectedCallback();
    this.updateComplete.then(() => {
      if (!this.selfManaged) {
        return;
      }
      const overlayElement = this.overlayElement;
      if (overlayElement) {
        const triggerElement = this.triggerElement;
        overlayElement.triggerElement = triggerElement;
      }
    });
  }
}
__decorateClass([
  property({ type: Boolean })
], Tooltip.prototype, "delayed", 2);
__decorateClass([
  property({ type: Boolean })
], Tooltip.prototype, "disabled", 2);
__decorateClass([
  property({ type: Boolean, attribute: "self-managed" })
], Tooltip.prototype, "selfManaged", 2);
__decorateClass([
  property({ type: Number })
], Tooltip.prototype, "offset", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], Tooltip.prototype, "open", 2);
__decorateClass([
  query("sp-overlay")
], Tooltip.prototype, "overlayElement", 2);
__decorateClass([
  property({ reflect: true })
], Tooltip.prototype, "placement", 2);
__decorateClass([
  query("#tip")
], Tooltip.prototype, "tipElement", 2);
__decorateClass([
  property({ type: Number })
], Tooltip.prototype, "tipPadding", 2);
__decorateClass([
  property({ type: String })
], Tooltip.prototype, "variant", 1);
//# sourceMappingURL=Tooltip.dev.js.map

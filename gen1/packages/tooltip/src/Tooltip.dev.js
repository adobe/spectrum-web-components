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
import { DependencyManagerController } from "@spectrum-web-components/reactive-controllers/src/DependencyManger.js";
import { focusableSelector } from "@spectrum-web-components/shared/src/focusable-selectors.js";
import tooltipStyles from "./tooltip.css.js";
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
    this._triggerElement = null;
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
  /**
   * Explicit trigger element override for self-managed tooltip usage.
   *
   * This is useful when the intended trigger is not an ancestor of the tooltip
   * in the composed tree (for example, tooltips slotted into components that
   * render their interactive trigger internally).
   */
  set triggerElement(triggerElement) {
    this._triggerElement = triggerElement;
    if (this.overlayElement) {
      this.overlayElement.triggerElement = triggerElement;
    }
  }
  get triggerElement() {
    return this._triggerElement || this.resolveSelfManagedTriggerElement();
  }
  get variant() {
    return this._variant;
  }
  set variant(variant) {
    if (variant === this.variant) {
      return;
    }
    if (["info", "positive", "negative"].includes(variant)) {
      if (true) {
        if (variant === "info") {
          window.__swc.warn(
            this,
            `The "info" variant on <${this.localName}> is deprecated and will be removed in a future release. Use "informative" instead.`,
            "https://opensource.adobe.com/spectrum-web-components/components/tooltip",
            { level: "deprecation" }
          );
        } else if (variant === "positive") {
          window.__swc.warn(
            this,
            `The "positive" variant on <${this.localName}> is deprecated and will be removed in a future release.`,
            "https://opensource.adobe.com/spectrum-web-components/components/tooltip",
            { level: "deprecation" }
          );
        }
      }
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
  /**
   * Finds the trigger element for a self-managed tooltip by traversing up the composed DOM tree.
   *
   * Self-managed tooltips automatically bind to their first focusable ancestor element.
   * This method walks up through shadow DOM boundaries to find a suitable trigger element.
   *
   * A trigger element must match the focusableSelector, which includes:
   * - Interactive elements like buttons, inputs, links, etc.
   * - Elements with tabindex (except -1)
   * - Elements with focusable="true"
   *
   * Common scenarios where no trigger element is found:
   * 1. Tooltip is placed directly in document body without a focusable parent
   * 2. Tooltip is nested in non-interactive elements (divs, spans) without focusable ancestors
   * 3. All ancestor elements have tabindex="-1" or are otherwise non-focusable
   *
   * Expected usage: <sp-action-button><sp-tooltip self-managed>...</sp-tooltip></sp-action-button>
   *
   * @returns The first focusable ancestor element, or null if none found
   */
  resolveSelfManagedTriggerElement() {
    var _a;
    let start = this.assignedSlot || this;
    let root = start.getRootNode();
    if (root === document) {
      if (true) {
        window.__swc.warn(
          this,
          `[INITIAL_TRAVERSAL] Self-managed <${this.localName}> is at document root without a parent element. Self-managed tooltips must be nested inside focusable elements like <sp-action-button>, <sp-button>, or elements with tabindex.`,
          "https://opensource.adobe.com/spectrum-web-components/components/tooltip#self-managed-overlays",
          {
            level: "high"
          }
        );
      }
      return null;
    }
    let triggerElement = start.parentElement || root.host || root;
    while (!((_a = triggerElement == null ? void 0 : triggerElement.matches) == null ? void 0 : _a.call(triggerElement, focusableSelector))) {
      start = triggerElement.assignedSlot || triggerElement;
      root = start.getRootNode();
      if (root === document) {
        if (true) {
          window.__swc.warn(
            this,
            `[TRAVERSAL_EXHAUSTED] Self-managed <${this.localName}> could not find a focusable trigger element. All ancestor elements are non-focusable. Ensure the tooltip is nested inside an interactive element like <sp-action-button>, <sp-button>, or add tabindex="0" to a parent element.`,
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
      if (true) {
        window.__swc.warn(
          this,
          `The "self-managed" attribute on <${this.localName}> is deprecated and will be removed in a future release in favor of an updated binding method.`,
          "https://opensource.adobe.com/spectrum-web-components/components/tooltip",
          { level: "deprecation" }
        );
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

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
import "@spectrum-web-components/overlay/sp-overlay.js";
import "@spectrum-web-components/tooltip/sp-tooltip.js";
import {
  property,
  query,
  queryAssignedElements,
  queryAssignedNodes,
  state
} from "@spectrum-web-components/base/src/decorators.js";
import styles from "./truncated.css.js";
export class Truncated extends SpectrumElement {
  constructor() {
    super(...arguments);
    this.placement = "top-start";
    this.successMessage = "Copied to clipboard";
    this.hasCopied = false;
    this.fullText = "";
    this.overflowing = false;
    this.resizeObserver = new ResizeObserver(() => {
      this.measureOverflow();
    });
    this.mutationObserver = new MutationObserver(() => {
      this.copyText();
    });
  }
  static get styles() {
    return [styles];
  }
  get hasCustomOverflow() {
    return this.slottedOverflow.length > 0;
  }
  render() {
    return html`
            <span id="content" @click=${this.handleClick}>
                <slot></slot>
            </span>
            ${this.renderTooltip()}
        `;
  }
  renderTooltip() {
    if (!this.overflowing) {
      return html`
                <slot
                    name="overflow"
                    style="display: none"
                    @slotchange=${this.handleOverflowSlotchange}
                ></slot>
            `;
    }
    return html`
            <sp-overlay
                id="overlay"
                .triggerElement=${this}
                .triggerInteraction=${"hover"}
                type="hint"
                placement=${this.placement}
            >
                <sp-tooltip name="tooltip">
                    ${!this.hasCopied ? html`
                              <slot
                                  name="overflow"
                                  @slotchange=${this.handleOverflowSlotchange}
                              >
                                  ${this.fullText}
                              </slot>
                          ` : this.successMessage}
                </sp-tooltip>
            </sp-overlay>
        `;
  }
  firstUpdated(_changedProperties) {
    this.resizeObserver.observe(this);
    this.resizeObserver.observe(this.content);
    this.copyText();
    this.measureOverflow();
  }
  updated(changedProperties) {
    super.updated(changedProperties);
    if (changedProperties.has("hasCopied") && this.hasCopied && this.overlayEl) {
      this.overlayEl.open = true;
    }
  }
  handleOverflowSlotchange() {
    this.mutationObserver.disconnect();
    if (!this.hasCustomOverflow) {
      this.mutationObserver.observe(this.content, {
        subtree: true,
        childList: true,
        characterData: true
      });
    }
  }
  handleClick() {
    if (!this.overflowing) return;
    const textToCopy = this.slottedContent.map((node) => {
      var _a;
      return (_a = node.textContent) != null ? _a : "";
    }).join("").trim();
    navigator.clipboard.writeText(textToCopy);
    this.hasCopied = true;
    setTimeout(() => {
      this.hasCopied = false;
    }, 6e3);
  }
  measureOverflow() {
    this.overflowing = this.content.offsetWidth > this.clientWidth + 1;
  }
  // Copies just the textContent of slotted nodes into the tooltip to avoid duplicating the user's DOM
  copyText() {
    if (this.hasCustomOverflow) return;
    this.fullText = this.slottedContent.map((node) => {
      var _a;
      return (_a = node.textContent) != null ? _a : "";
    }).join("");
  }
}
__decorateClass([
  property()
], Truncated.prototype, "placement", 2);
__decorateClass([
  property({ type: String, attribute: "success-message" })
], Truncated.prototype, "successMessage", 2);
__decorateClass([
  state()
], Truncated.prototype, "hasCopied", 2);
__decorateClass([
  state()
], Truncated.prototype, "fullText", 2);
__decorateClass([
  state()
], Truncated.prototype, "overflowing", 2);
__decorateClass([
  query("#content")
], Truncated.prototype, "content", 2);
__decorateClass([
  query("#overlay")
], Truncated.prototype, "overlayEl", 2);
__decorateClass([
  queryAssignedNodes({ flatten: true })
], Truncated.prototype, "slottedContent", 2);
__decorateClass([
  queryAssignedElements({ slot: "overflow", flatten: true })
], Truncated.prototype, "slottedOverflow", 2);
//# sourceMappingURL=Truncated.dev.js.map

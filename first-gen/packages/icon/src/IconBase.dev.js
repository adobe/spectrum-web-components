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
  SystemResolutionController,
  systemResolverUpdatedSymbol
} from "@spectrum-web-components/reactive-controllers/src/SystemContextResolution.js";
import {
  property,
  state
} from "@spectrum-web-components/base/src/decorators.js";
import iconStyles from "./icon.css.js";
export class IconBase extends SpectrumElement {
  constructor() {
    super(...arguments);
    this.unsubscribeSystemContext = null;
    this.spectrumVersion = 1;
    this.label = "";
    this.systemResolver = new SystemResolutionController(this);
  }
  static get styles() {
    return [iconStyles];
  }
  connectedCallback() {
    super.connectedCallback();
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.unsubscribeSystemContext) {
      this.unsubscribeSystemContext();
      this.unsubscribeSystemContext = null;
    }
  }
  update(changes) {
    if (changes.has("label")) {
      if (this.label) {
        this.removeAttribute("aria-hidden");
      } else {
        this.setAttribute("aria-hidden", "true");
      }
    }
    if (changes.has(systemResolverUpdatedSymbol)) {
      this.spectrumVersion = this.systemResolver.system === "spectrum-two" ? 2 : 1;
    }
    super.update(changes);
  }
  render() {
    return html`
            <slot></slot>
        `;
  }
}
__decorateClass([
  state()
], IconBase.prototype, "spectrumVersion", 2);
__decorateClass([
  property({ reflect: true })
], IconBase.prototype, "label", 2);
__decorateClass([
  property({ reflect: true })
], IconBase.prototype, "size", 2);
//# sourceMappingURL=IconBase.dev.js.map

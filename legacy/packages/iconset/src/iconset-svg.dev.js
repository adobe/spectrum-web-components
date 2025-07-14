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
import { query } from "@spectrum-web-components/base/src/decorators.js";
import { Iconset } from "./iconset.dev.js";
export class IconsetSVG extends Iconset {
  constructor() {
    super(...arguments);
    this.iconMap = /* @__PURE__ */ new Map();
  }
  /**
   * First updated handler just ensures we've processed any slotted symbols
   */
  updated(changedProperties) {
    if (!this.slotContainer) {
      return;
    }
    const currentSVGNodes = this.getSVGNodes(this.slotContainer);
    this.updateSVG(currentSVGNodes);
    super.updated(changedProperties);
  }
  /**
   * Applies the requested icon from this iconset instance to the given element.
   *
   * @param el - the element to apply the icon to
   * @param icon - the name of the icon within this set to apply.
   */
  async applyIconToElement(el, icon, _size, label) {
    await this.updateComplete;
    const iconSymbol = this.iconMap.get(icon);
    if (!iconSymbol) {
      throw new Error(`Unable to find icon ${icon}`);
    }
    const clonedNode = this.prepareSvgClone(iconSymbol);
    clonedNode.setAttribute("role", "img");
    if (label) {
      clonedNode.setAttribute("aria-label", label);
    } else {
      clonedNode.setAttribute("aria-hidden", "true");
    }
    if (el.shadowRoot) {
      el.shadowRoot.appendChild(clonedNode);
    } else {
      el.appendChild(clonedNode);
    }
  }
  /**
   * Returns a list of all icons in this iconset.
   */
  getIconList() {
    return [...this.iconMap.keys()];
  }
  prepareSvgClone(sourceSvg) {
    const content = sourceSvg.cloneNode(true);
    const svg = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );
    const viewBox = content.getAttribute("viewBox") || "";
    const cssText = "pointer-events: none; display: block; width: 100%; height: 100%;";
    svg.style.cssText = cssText;
    svg.setAttribute("viewBox", viewBox);
    svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
    svg.setAttribute("focusable", "false");
    while (content.childNodes.length > 0) {
      svg.appendChild(content.childNodes[0]);
    }
    return svg;
  }
  getSVGIconName(icon) {
    return icon;
  }
  getSanitizedIconName(icon) {
    return icon;
  }
  renderDefaultContent() {
    return html``;
  }
  render() {
    return html`
            <slot @slotchange=${this.onSlotChange}>
                ${this.renderDefaultContent()}
            </slot>
        `;
  }
  updateSVG(nodes) {
    const symbols = nodes.reduce((prev, svgNode) => {
      const containedSymbols = svgNode.querySelectorAll("symbol");
      prev.push(...containedSymbols);
      return prev;
    }, []);
    symbols.forEach((symbol) => {
      this.iconMap.set(this.getSanitizedIconName(symbol.id), symbol);
    });
  }
  getSVGNodes(slotTarget) {
    const nodes = slotTarget.assignedNodes({ flatten: true });
    const svgNodes = nodes.filter((node) => {
      return node.nodeName === "svg";
    });
    return svgNodes;
  }
  onSlotChange(event) {
    const slotTarget = event.target;
    const svgNodes = this.getSVGNodes(slotTarget);
    this.updateSVG(svgNodes);
  }
}
__decorateClass([
  query("slot")
], IconsetSVG.prototype, "slotContainer", 2);
//# sourceMappingURL=iconset-svg.dev.js.map

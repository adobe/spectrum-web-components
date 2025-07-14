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
import { css, html, SpectrumElement } from "@spectrum-web-components/base";
import {
  property,
  queryAssignedNodes
} from "@spectrum-web-components/base/src/decorators.js";
import "@spectrum-web-components/slider/sp-slider.js";
import "@spectrum-web-components/thumbnail/sp-thumbnail.js";
import "@spectrum-web-components/overlay/sync/overlay-trigger.js";
import "@spectrum-web-components/tooltip/sp-tooltip.js";
export class OnionSkinner extends SpectrumElement {
  constructor() {
    super(...arguments);
    this.onionLevel = 0.5;
  }
  handleOnionInput(event) {
    this.onionLevel = event.target.value;
  }
  handleSlotchange() {
    const images = [...this.assignments].filter(
      (node) => node.tagName && node.matches("img")
    );
    if (images[0]) {
      this.leftThumbnail = images[0].cloneNode();
      this.leftThumbnail.removeAttribute("slot");
    }
    if (images[1]) {
      this.rightThumbnail = images[1].cloneNode();
      this.rightThumbnail.removeAttribute("slot");
    }
    if (images.length) {
      this.requestUpdate();
    }
  }
  allLeft() {
    this.onionLevel = 0;
  }
  allRight() {
    this.onionLevel = 1;
  }
  render() {
    return html`
            <slot
                @slotchange=${this.handleSlotchange}
                style="--onion-level: ${this.onionLevel}"
            ></slot>
            <div class="controls">
                <overlay-trigger placement="top">
                    <sp-thumbnail
                        slot="trigger"
                        size="xl"
                        @click=${this.allLeft}
                    >
                        ${this.leftThumbnail}
                    </sp-thumbnail>
                    <sp-tooltip slot="hover-content">
                        Baseline screenshot
                    </sp-tooltip>
                </overlay-trigger>
                <sp-slider
                    min="0"
                    max="1"
                    step="0.001"
                    .value=${this.onionLevel}
                    .getAriaValueText=${() => ""}
                    @input=${this.handleOnionInput}
                ></sp-slider>
                <overlay-trigger placement="top">
                    <sp-thumbnail
                        slot="trigger"
                        size="xl"
                        @click=${this.allRight}
                    >
                        ${this.rightThumbnail}
                    </sp-thumbnail>
                    <sp-tooltip slot="hover-content">
                        Current screenshot
                    </sp-tooltip>
                </overlay-trigger>
            </div>
        `;
  }
}
OnionSkinner.styles = [
  css`
            :host {
                display: grid;
                grid-template-areas: 'main';
            }
            ::slotted(*) {
                grid-area: main;
            }
            ::slotted(:first-child) {
                opacity: calc(1 - var(--onion-level));
            }
            ::slotted(:last-child) {
                opacity: var(--onion-level);
            }
            .controls {
                display: flex;
                gap: 1em;
                margin: 0.25em;
                align-items: center;
            }
            sp-slider {
                flex-grow: 1;
            }
        `
];
__decorateClass([
  property({ type: Number })
], OnionSkinner.prototype, "onionLevel", 2);
__decorateClass([
  queryAssignedNodes({
    slot: "",
    flatten: true
  })
], OnionSkinner.prototype, "assignments", 2);
//# sourceMappingURL=OnionSkinner.dev.js.map

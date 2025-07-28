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
  css,
  html,
  nothing,
  SpectrumElement
} from "@spectrum-web-components/base";
import { property } from "@spectrum-web-components/base/src/decorators.js";
import { ObserveSlotPresence } from "@spectrum-web-components/shared";
import bodyStyles from "@spectrum-web-components/styles/body.js";
import "@spectrum-web-components/action-button/sp-action-button.js";
import "@spectrum-web-components/action-group/sp-action-group.js";
import "@spectrum-web-components/split-view/sp-split-view.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-alert.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-zoom-in.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-zoom-out.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-refresh.js";
import "@spectrum-web-components/action-bar/sp-action-bar.js";
import "@spectrum-web-components/progress-circle/sp-progress-circle.js";
import "../onion-skinner.dev.js";
export class VrtCompare extends ObserveSlotPresence(SpectrumElement, [
  '[slot="actual"]',
  '[slot="baseline"]',
  '[slot="diff"]'
]) {
  constructor() {
    super(...arguments);
    this.view = "scrubber";
    this.zoom = 1;
    this.imagesLoaded = false;
    this._loadingImages = false;
  }
  get hasActual() {
    return this.getSlotContentPresence('[slot="actual"]');
  }
  get hasBaseline() {
    return this.getSlotContentPresence('[slot="baseline"]');
  }
  get hasDiff() {
    return this.getSlotContentPresence('[slot="diff"]');
  }
  get canCompare() {
    return this.hasActual && this.hasBaseline;
  }
  handleChange(event) {
    const view = event.target.selected[0];
    if (view) {
      this.view = view;
    }
  }
  handleZoomIn() {
    this.zoom += 0.1;
  }
  handleZoomClear() {
    this.zoom = 1;
  }
  handleZoomOut() {
    this.zoom -= 0.1;
  }
  get error() {
    return html`
            <sp-icon-alert class="icon" size="xl"></sp-icon-alert>
            <p class="spectrum-Body spectrum-Body--sizeXL">
                Please be sure to supply some combination of actual, baseline,
                and diff screenshots for review.
            </p>
        `;
  }
  get actual() {
    return html`
            <div class="view actual">
                <slot name="actual"></slot>
            </div>
        `;
  }
  get baseline() {
    return html`
            <div class="view baseline">
                <slot name="baseline"></slot>
            </div>
        `;
  }
  get diff() {
    return html`
            <div class="view diff">
                <slot name="diff"></slot>
            </div>
        `;
  }
  get scrubber() {
    return html`
            <sp-split-view resizable primary-size="50%">
                ${this.baseline} ${this.actual}
            </sp-split-view>
        `;
  }
  get sidebyside() {
    return html`
            ${this.baseline} ${this.actual}
        `;
  }
  get onion() {
    return html`
            <onion-skinner>
                <slot name="baseline"></slot>
                <slot name="actual"></slot>
            </onion-skinner>
        `;
  }
  get renderView() {
    switch (this.view) {
      case "error":
        return this.error;
      case "actual":
        return this.actual;
      case "baseline":
        return this.baseline;
      case "diff":
        return this.diff;
      case "onion":
        return this.onion;
      case "sidebyside":
        return this.sidebyside;
      case "scrubber":
      default:
        return this.scrubber;
    }
  }
  get viewFallback() {
    if (this.canCompare) {
      return "scrubber";
    } else if (this.hasActual) {
      return "actual";
    } else if (this.hasBaseline) {
      return "baseline";
    } else if (this.hasDiff) {
      return "diff";
    } else {
      return "error";
    }
  }
  async prepImages(event) {
    const slot = event.target;
    if (this._loadingImages || !slot.assignedNodes().length) {
      return;
    }
    this._loadingImages = true;
    this.imagesLoaded = false;
    const images = [...this.querySelectorAll("img")];
    if (!images.length) {
      this.imagesLoaded = true;
      this._loadingImages = false;
      return;
    }
    const imageLoadPromises = images.map((img) => {
      if (img.naturalWidth) {
        this.style.setProperty(
          "--image-width",
          `${img.naturalWidth}px`
        );
        return Promise.resolve();
      }
      return new Promise((resolve) => {
        img.addEventListener("load", () => {
          this.style.setProperty(
            "--image-width",
            `${img.naturalWidth}px`
          );
          resolve(true);
        });
      });
    });
    await Promise.all(imageLoadPromises);
    this.imagesLoaded = true;
    this._loadingImages = false;
  }
  shouldUpdate() {
    if (this.view === "error" || this.view === "actual" && !this.hasActual || this.view === "baseline" && !this.hasBaseline || this.view === "diff" && !this.hasDiff || (this.view === "onion" || this.view === "sidebyside" || this.view === "scrubber") && !this.canCompare) {
      this.view = this.viewFallback;
    }
    return true;
  }
  render() {
    if (this._loadingImages) {
      return html`
                <sp-progress-circle indeterminate></sp-progress-circle>
                <slot
                    name="actual"
                    @slotchange=${this.prepImages}
                    hidden
                ></slot>
                <slot
                    name="baseline"
                    @slotchange=${this.prepImages}
                    hidden
                ></slot>
                <slot name="diff" @slotchange=${this.prepImages} hidden></slot>
            `;
    }
    if (!this.imagesLoaded) {
      return html`
                <p class="spectrum-Body spectrum-Body--sizeXL">
                    Choose a test to review on the left...
                </p>
                <slot
                    name="actual"
                    @slotchange=${this.prepImages}
                    hidden
                ></slot>
                <slot
                    name="baseline"
                    @slotchange=${this.prepImages}
                    hidden
                ></slot>
                <slot name="diff" @slotchange=${this.prepImages} hidden></slot>
            `;
    }
    return html`
            <sp-action-group
                selects="single"
                compact
                emphasized
                @change=${this.handleChange}
            >
                ${this.view !== "error" ? nothing : html`
                          <sp-action-button value="error" disabled>
                              Error
                          </sp-action-button>
                      `}
                ${!this.canCompare ? nothing : html`
                          <sp-action-button
                              value="scrubber"
                              ?selected=${this.view === "scrubber"}
                          >
                              Scrubber
                          </sp-action-button>
                          <sp-action-button
                              value="onion"
                              ?selected=${this.view === "onion"}
                          >
                              Onion skin
                          </sp-action-button>
                          <sp-action-button
                              value="sidebyside"
                              ?selected=${this.view === "sidebyside"}
                          >
                              Side by side
                          </sp-action-button>
                      `}
                ${!this.hasDiff ? nothing : html`
                          <sp-action-button
                              value="diff"
                              ?selected=${this.view === "diff"}
                          >
                              Diff
                          </sp-action-button>
                      `}
                ${!this.hasActual ? nothing : html`
                          <sp-action-button
                              value="actual"
                              ?selected=${this.view === "actual"}
                          >
                              Actual
                          </sp-action-button>
                      `}
                ${!this.hasBaseline ? nothing : html`
                          <sp-action-button
                              value="baseline"
                              ?selected=${this.view === "baseline"}
                          >
                              Baseline
                          </sp-action-button>
                      `}
            </sp-action-group>
            <div class="review ${this.view}">${this.renderView}</div>
            <sp-action-group compact class="zoom-controls">
                <sp-action-button
                    @click=${this.handleZoomOut}
                    ?disabled=${this.zoom <= 0.5}
                >
                    <sp-icon-zoom-out slot="icon"></sp-icon-zoom-out>
                </sp-action-button>
                <sp-action-button @click=${this.handleZoomClear}>
                    <sp-icon-refresh slot="icon"></sp-icon-refresh>
                </sp-action-button>
                <sp-action-button
                    @click=${this.handleZoomIn}
                    ?disabled=${this.zoom >= 2}
                >
                    <sp-icon-zoom-in slot="icon"></sp-icon-zoom-in>
                </sp-action-button>
            </sp-action-group>
        `;
  }
  updated(changes) {
    if (changes.has("zoom")) {
      let zoom = Math.min(this.zoom, 2);
      zoom = Math.min(zoom, 0.5);
      this.style.setProperty("--zoom-level", `${this.zoom}`);
    }
  }
}
VrtCompare.styles = [
  css`
            :host {
                display: grid;
                max-width: 100%;
                overflow: auto;
                margin: 0 auto;
                position: relative;

                --image-display-width: calc(
                    var(--zoom-level, 1) * var(--image-width, 500px)
                );
            }
            sp-progress-circle {
                margin: auto;
                place-self: center;
            }
            .review {
                margin: 100px auto 0;
                display: flex;
                width: var(--image-display-width);
                place-self: start;
            }
            .error {
                flex-direction: column;
            }
            ::slotted(img) {
                display: flex;
                pointer-events: none;
            }
            sp-action-group[selects] {
                margin-bottom: 1em;
                justify-content: center;
                position: fixed;
                top: calc(var(--swc-scale-factor) * 8px);
                right: calc(var(--swc-scale-factor) * 8px);
            }
            .sidebyside {
                display: flex;
                gap: 2px;
            }
            .sidebyside ::slotted(img) {
                width: 100%;
            }
            .view {
                overflow: hidden;
            }
            .review:is(.baseline, .actual, .diff) .view,
            .review:is(.baseline, .actual, .diff) ::slotted(img) {
                width: 100%;
            }
            sp-split-view {
                width: var(--image-display-width);
            }
            sp-split-view ::slotted(img) {
                width: var(--image-display-width);
                height: auto;
                flex-shrink: 0;
            }
            sp-split-view .actual ::slotted(img) {
                float: right;
            }
            p {
                text-align: center;
                margin: 0 3em;
            }
            .icon {
                margin: 0 auto 2em;
                display: flex;
                color: var(--spectrum-semantic-negative-color-background);
            }
            .zoom-controls {
                position: fixed;
                bottom: calc(var(--swc-scale-factor) * 8px);
                left: calc(var(--swc-scale-factor) * 8px);
                z-index: 1;
            }
        `,
  bodyStyles
];
__decorateClass([
  property()
], VrtCompare.prototype, "view", 2);
__decorateClass([
  property({ type: Number })
], VrtCompare.prototype, "zoom", 2);
__decorateClass([
  property({ type: Boolean, attribute: false })
], VrtCompare.prototype, "imagesLoaded", 2);
//# sourceMappingURL=VrtCompare.dev.js.map

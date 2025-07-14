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
  nothing,
  SpectrumElement
} from "@spectrum-web-components/base";
import {
  classMap,
  ifDefined
} from "@spectrum-web-components/base/src/directives.js";
import {
  property,
  query,
  state
} from "@spectrum-web-components/base/src/decorators.js";
import { streamingListener } from "@spectrum-web-components/base/src/streaming-listener.js";
import { randomID } from "@spectrum-web-components/shared/src/random-id.js";
import styles from "./split-view.css.js";
const DEFAULT_MAX_SIZE = 3840;
const SPLITTERSIZE = 2;
const ARROW_KEY_CHANGE_VALUE = 10;
const PAGEUPDOWN_KEY_CHANGE_VALUE = 50;
const COLLAPSE_THREASHOLD = 50;
export class SplitView extends SpectrumElement {
  constructor() {
    super();
    this.vertical = false;
    this.resizable = false;
    this.collapsible = false;
    this.primaryMin = 0;
    this.primaryMax = DEFAULT_MAX_SIZE;
    this.secondaryMin = 0;
    this.secondaryMax = DEFAULT_MAX_SIZE;
    this.firstPaneSize = "auto";
    this.enoughChildren = false;
    this.viewSize = 0;
    this.offset = 0;
    this.minPos = 0;
    this.maxPos = DEFAULT_MAX_SIZE;
    this.controlledElIDApplied = false;
    const RO = window.ResizeObserver;
    if (RO) {
      this.observer = new RO(() => {
        this.rect = void 0;
        this.updateMinMax();
      });
    }
  }
  static get styles() {
    return [styles];
  }
  connectedCallback() {
    var _a;
    super.connectedCallback();
    (_a = this.observer) == null ? void 0 : _a.observe(this);
  }
  disconnectedCallback() {
    var _a;
    (_a = this.observer) == null ? void 0 : _a.unobserve(this);
    super.disconnectedCallback();
  }
  /**
   * @private
   **/
  get splitterSize() {
    if (!this._splitterSize) {
      this._splitterSize = this.splitter && Math.round(
        parseFloat(
          window.getComputedStyle(this.splitter).getPropertyValue(
            this.vertical ? "height" : "width"
          )
        )
      ) || SPLITTERSIZE;
    }
    return this._splitterSize;
  }
  render() {
    var _a, _b;
    const splitterClasses = {
      "is-resized-start": this.splitterPos === this.minPos,
      "is-resized-end": this.splitterPos && this.splitterPos > this.splitterSize && this.splitterPos === this.maxPos,
      "is-collapsed-start": this.splitterPos === 0,
      "is-collapsed-end": this.splitterPos && this.splitterPos >= Math.max(
        this.splitterSize,
        this.viewSize - this.splitterSize
      )
    };
    const label = this.resizable ? this.label || "Resize the panels" : void 0;
    return html`
            <slot
                id=${ifDefined(
      this.resizable ? (_a = this.controlledEl) == null ? void 0 : _a.id : void 0
    )}
                @slotchange=${this.onContentSlotChange}
                style="--spectrum-split-view-first-pane-size: ${this.firstPaneSize}"
            ></slot>
            ${this.enoughChildren ? html`
                      <div
                          id="splitter"
                          class=${classMap(splitterClasses)}
                          role="separator"
                          aria-controls=${ifDefined(
      this.resizable ? (_b = this.controlledEl) == null ? void 0 : _b.id : void 0
    )}
                          aria-label=${ifDefined(label)}
                          aria-orientation=${this.vertical ? "horizontal" : "vertical"}
                          aria-valuenow=${Math.round(
      parseFloat(this.firstPaneSize) / this.viewSize * 100
    )}
                          tabindex=${ifDefined(
      this.resizable ? "0" : void 0
    )}
                          @keydown=${this.onKeydown}
                          ${streamingListener({
      start: ["pointerdown", this.onPointerdown],
      streamInside: ["pointermove", this.onPointermove],
      end: [
        [
          "pointerup",
          "pointercancel",
          "pointerleave"
        ],
        this.onPointerup
      ]
    })}
                      >
                          ${this.resizable ? html`
                                    <div id="gripper"></div>
                                ` : nothing}
                      </div>
                  ` : nothing}
        `;
  }
  onContentSlotChange(event) {
    if (this.controlledEl && this.controlledElIDApplied) {
      this.controlledEl.removeAttribute("id");
      this.controlledElIDApplied = false;
    }
    this.controlledEl = event.target.assignedElements()[0];
    if (this.controlledEl && !this.controlledEl.id) {
      this.controlledEl.id = `${this.tagName.toLowerCase()}-${randomID()}`;
      this.controlledElIDApplied = true;
    }
    this.enoughChildren = this.children.length > 1;
    this.checkResize();
  }
  onPointerdown(event) {
    if (!this.resizable || event.button && event.button !== 0) {
      event.preventDefault();
      return;
    }
    this.splitter.setPointerCapture(event.pointerId);
    this.offset = this.getOffset();
  }
  onPointermove(event) {
    event.preventDefault();
    let pos = this.vertical || this.isLTR ? this.getPosition(event) - this.offset : this.offset - this.getPosition(event);
    if (this.collapsible && pos < this.minPos - COLLAPSE_THREASHOLD) {
      pos = 0;
    }
    if (this.collapsible && pos > this.maxPos + COLLAPSE_THREASHOLD) {
      pos = this.viewSize - this.splitterSize;
    }
    this.updatePosition(pos);
  }
  onPointerup(event) {
    this.splitter.releasePointerCapture(event.pointerId);
  }
  getOffset() {
    if (!this.rect) {
      this.rect = this.getBoundingClientRect();
    }
    const offsetX = this.isLTR ? this.rect.left : this.rect.right;
    return this.vertical ? this.rect.top : offsetX;
  }
  getPosition(event) {
    return this.vertical ? event.clientY : event.clientX;
  }
  movePosition(event, offset) {
    event.preventDefault();
    if (this.splitterPos !== void 0) {
      this.updatePosition(this.splitterPos + offset);
    }
  }
  onKeydown(event) {
    if (!this.resizable) {
      return;
    }
    let direction = 0;
    const isLTRorVertical = this.isLTR || this.vertical;
    switch (event.key) {
      case "Home":
        event.preventDefault();
        this.updatePosition(this.collapsible ? 0 : this.minPos);
        return;
      case "End":
        event.preventDefault();
        this.updatePosition(
          this.collapsible ? this.viewSize - this.splitterSize : this.maxPos
        );
        return;
      case "ArrowLeft":
        direction = isLTRorVertical ? -1 : 1;
        break;
      case "ArrowRight":
        direction = isLTRorVertical ? 1 : -1;
        break;
      case "ArrowUp":
        direction = this.vertical ? -1 : 1;
        break;
      case "ArrowDown":
        direction = this.vertical ? 1 : -1;
        break;
      case "PageUp":
        direction = this.vertical ? -1 : 1;
        break;
      case "PageDown":
        direction = this.vertical ? 1 : -1;
        break;
    }
    if (direction !== 0) {
      const moveBy = event.key.startsWith("Page") ? PAGEUPDOWN_KEY_CHANGE_VALUE : ARROW_KEY_CHANGE_VALUE;
      this.movePosition(event, moveBy * direction);
    }
  }
  async checkResize() {
    if (!this.enoughChildren) {
      return;
    }
    this.updateMinMax();
    if (this.splitterPos === void 0) {
      const startPos = await this.calcStartPos();
      this.updatePosition(startPos);
    }
  }
  updateMinMax() {
    this.viewSize = this.vertical ? this.offsetHeight : this.offsetWidth;
    this.minPos = Math.max(
      this.primaryMin,
      this.viewSize - this.secondaryMax
    );
    this.maxPos = Math.min(
      this.primaryMax,
      this.viewSize - Math.max(this.secondaryMin, this.splitterSize)
    );
  }
  updatePosition(x) {
    let pos = this.getLimitedPosition(x);
    if (this.collapsible && x <= 0) {
      pos = 0;
    }
    if (this.collapsible && x > this.maxPos && x >= this.viewSize - this.splitterSize) {
      pos = this.viewSize - this.splitterSize;
    }
    if (pos !== this.splitterPos) {
      this.splitterPos = pos;
      this.dispatchChangeEvent();
    }
  }
  getLimitedPosition(input) {
    if (input <= this.minPos) {
      return this.minPos;
    }
    if (input >= this.maxPos) {
      return this.maxPos;
    }
    return Math.max(this.minPos, Math.min(this.maxPos, input));
  }
  async calcStartPos() {
    if (this.primarySize !== void 0 && /^\d+(px)?$/.test(this.primarySize)) {
      return parseInt(this.primarySize, 10);
    }
    if (this.primarySize !== void 0 && /^\d+%$/.test(this.primarySize)) {
      return parseInt(this.primarySize, 10) * this.viewSize / 100;
    }
    if (this.primarySize === "auto") {
      this.firstPaneSize = "auto";
      const nodes = this.paneSlot.assignedNodes({ flatten: true });
      const firstEl = nodes.find(
        (node) => node instanceof HTMLElement
      );
      if (typeof firstEl.updateComplete !== "undefined") {
        await firstEl.updateComplete;
      }
      if (firstEl) {
        const size = window.getComputedStyle(firstEl).getPropertyValue(this.vertical ? "height" : "width");
        const size_i = parseFloat(size);
        if (!isNaN(size_i)) {
          return this.getLimitedPosition(Math.ceil(size_i));
        }
      }
    }
    return this.viewSize / 2;
  }
  dispatchChangeEvent() {
    const changeEvent = new Event("change", {
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(changeEvent);
  }
  willUpdate(changed) {
    if (!this.hasUpdated || changed.has("primarySize")) {
      this.splitterPos = void 0;
      this.checkResize();
    }
    if (changed.has("splitterPos") && this.splitterPos !== void 0 && this.enoughChildren) {
      this.firstPaneSize = `${Math.round(this.splitterPos)}px`;
    }
  }
}
__decorateClass([
  state()
], SplitView.prototype, "controlledEl", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], SplitView.prototype, "vertical", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], SplitView.prototype, "resizable", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], SplitView.prototype, "collapsible", 2);
__decorateClass([
  property({ type: Number, attribute: "primary-min" })
], SplitView.prototype, "primaryMin", 2);
__decorateClass([
  property({ type: Number, attribute: "primary-max" })
], SplitView.prototype, "primaryMax", 2);
__decorateClass([
  property({ type: String, attribute: "primary-size" })
], SplitView.prototype, "primarySize", 2);
__decorateClass([
  property({ type: Number, attribute: "secondary-min" })
], SplitView.prototype, "secondaryMin", 2);
__decorateClass([
  property({ type: Number, attribute: "secondary-max" })
], SplitView.prototype, "secondaryMax", 2);
__decorateClass([
  property({ type: Number, reflect: true, attribute: "splitter-pos" })
], SplitView.prototype, "splitterPos", 2);
__decorateClass([
  property({ type: String, attribute: false })
], SplitView.prototype, "firstPaneSize", 2);
__decorateClass([
  property()
], SplitView.prototype, "label", 2);
__decorateClass([
  property({ type: Boolean, attribute: false })
], SplitView.prototype, "enoughChildren", 2);
__decorateClass([
  property({ type: Number })
], SplitView.prototype, "viewSize", 2);
__decorateClass([
  query("slot")
], SplitView.prototype, "paneSlot", 2);
__decorateClass([
  query("#splitter")
], SplitView.prototype, "splitter", 2);
//# sourceMappingURL=SplitView.dev.js.map

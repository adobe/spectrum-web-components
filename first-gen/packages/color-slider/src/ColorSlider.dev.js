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
import {
  ifDefined,
  styleMap
} from "@spectrum-web-components/base/src/directives.js";
import {
  property,
  query
} from "@spectrum-web-components/base/src/decorators.js";
import { streamingListener } from "@spectrum-web-components/base/src/streaming-listener.js";
import { Focusable } from "@spectrum-web-components/shared/src/focusable.js";
import "@spectrum-web-components/color-handle/sp-color-handle.js";
import {
  ColorController
} from "@spectrum-web-components/reactive-controllers/src/ColorController.js";
import { LanguageResolutionController } from "@spectrum-web-components/reactive-controllers/src/LanguageResolution.js";
import opacityCheckerBoardStyles from "@spectrum-web-components/opacity-checkerboard/src/opacity-checkerboard.css.js";
import styles from "./color-slider.css.js";
export class ColorSlider extends Focusable {
  constructor() {
    super(...arguments);
    this.disabled = false;
    this.focused = false;
    this.label = "hue";
    this.vertical = false;
    this.languageResolver = new LanguageResolutionController(this);
    this.colorController = new ColorController(this, { manageAs: "hsv" });
    this.step = 1;
    this._altered = 0;
    this._pointerDown = false;
  }
  static get styles() {
    return [opacityCheckerBoardStyles, styles];
  }
  get value() {
    return this.colorController.hue;
  }
  set value(hue) {
    this.colorController.hue = hue;
  }
  get sliderHandlePosition() {
    return this.colorController.hue / 360 * 100;
  }
  get color() {
    return this.colorController.colorValue;
  }
  set color(color) {
    this.colorController.color = color;
  }
  get altered() {
    return this._altered;
  }
  set altered(altered) {
    this._altered = altered;
    this.step = Math.max(1, this.altered * 10);
  }
  get focusElement() {
    return this.input;
  }
  handleKeydown(event) {
    const { key } = event;
    this.focused = true;
    this.altered = [event.shiftKey, event.ctrlKey, event.altKey].filter(
      (key2) => !!key2
    ).length;
    let delta = 0;
    switch (key) {
      case "ArrowUp":
        delta = this.step;
        break;
      case "ArrowDown":
        delta = -this.step;
        break;
      case "ArrowLeft":
        delta = this.step * (this.isLTR ? -1 : 1);
        break;
      case "ArrowRight":
        delta = this.step * (this.isLTR ? 1 : -1);
        break;
      default:
        return;
    }
    event.preventDefault();
    const range = 360;
    const mult = 100 / range;
    const nextSliderHandlePosition = Math.min(
      100,
      Math.max(0, this.sliderHandlePosition + delta * mult)
    );
    this.value = 360 * (nextSliderHandlePosition / 100);
    if (delta != 0) {
      this.dispatchEvent(
        new Event("input", {
          bubbles: true,
          composed: true
        })
      );
      this.dispatchEvent(
        new Event("change", {
          bubbles: true,
          composed: true
        })
      );
    }
  }
  handleInput(event) {
    const { valueAsNumber } = event.target;
    this.value = valueAsNumber;
  }
  handleChange(event) {
    this.handleInput(event);
    this.dispatchEvent(
      new Event("change", {
        bubbles: true,
        composed: true
      })
    );
  }
  focus(focusOptions = {}) {
    super.focus(focusOptions);
    this.forwardFocus();
  }
  forwardFocus() {
    this.focused = this.hasVisibleFocusInTree();
    this.input.focus();
  }
  handleFocus() {
    this.focused = true;
  }
  handleBlur() {
    if (this._pointerDown) {
      return;
    }
    this.altered = 0;
    this.focused = false;
  }
  handlePointerdown(event) {
    if (event.button !== 0) {
      event.preventDefault();
      return;
    }
    this._pointerDown = true;
    this.colorController.savePreviousColor();
    this.boundingClientRect = this.getBoundingClientRect();
    event.target.setPointerCapture(event.pointerId);
    if (event.pointerType === "mouse") {
      this.focused = true;
    }
  }
  handlePointermove(event) {
    const nextsliderHandlePosition = this.calculateHandlePosition(event);
    this.value = 360 * (nextsliderHandlePosition / 100);
    this.dispatchEvent(
      new Event("input", {
        bubbles: true,
        composed: true,
        cancelable: true
      })
    );
  }
  handlePointerup(event) {
    this._pointerDown = false;
    event.target.releasePointerCapture(event.pointerId);
    const applyDefault = this.dispatchEvent(
      new Event("change", {
        bubbles: true,
        composed: true,
        cancelable: true
      })
    );
    if (!applyDefault) {
      this.colorController.restorePreviousColor();
    }
    this.focus();
    if (event.pointerType === "mouse") {
      this.focused = false;
    }
  }
  /**
   * Returns the value under the cursor
   * @param: PointerEvent on slider
   * @return: Slider value that correlates to the position under the pointer
   */
  calculateHandlePosition(event) {
    if (!this.boundingClientRect) {
      return this.sliderHandlePosition;
    }
    const rect = this.boundingClientRect;
    const minOffset = this.vertical ? rect.top : rect.left;
    const offset = this.vertical ? event.clientY : event.clientX;
    const size = this.vertical ? rect.height : rect.width;
    const percent = Math.max(0, Math.min(1, (offset - minOffset) / size));
    const sliderHandlePosition = this.vertical || !this.isLTR ? 100 - 100 * percent : 100 * percent;
    return sliderHandlePosition;
  }
  handleGradientPointerdown(event) {
    if (event.button !== 0) {
      return;
    }
    event.stopPropagation();
    event.preventDefault();
    this.handle.dispatchEvent(new PointerEvent("pointerdown", event));
    this.handlePointermove(event);
  }
  get handlePositionStyles() {
    return `${this.vertical ? "inset-block-end" : "inset-inline-start"}: ${this.sliderHandlePosition}%`;
  }
  get getColorSliderStyle() {
    const orientation = this.vertical ? "top" : "right";
    return {
      background: `linear-gradient(to ${orientation}, var(--sp-color-slider-gradient, var(--sp-color-slider-gradient-fallback)))`
    };
  }
  render() {
    return html`
            <div
                class="opacity-checkerboard checkerboard"
                role="presentation"
                @pointerdown=${this.handleGradientPointerdown}
            >
                <div
                    class="gradient"
                    role="presentation"
                    style=${styleMap(this.getColorSliderStyle)}
                >
                    <slot name="gradient"></slot>
                </div>
            </div>
            <sp-color-handle
                tabindex=${ifDefined(this.focused ? void 0 : "0")}
                @focus=${this.forwardFocus}
                ?focused=${this.focused}
                class="handle"
                color="hsl(${this.value}, 100%, 50%)"
                ?disabled=${this.disabled}
                style=${this.handlePositionStyles}
                ${streamingListener({
      start: ["pointerdown", this.handlePointerdown],
      streamInside: ["pointermove", this.handlePointermove],
      end: [
        ["pointerup", "pointercancel", "pointerleave"],
        this.handlePointerup
      ]
    })}
            ></sp-color-handle>
            <input
                type="range"
                class="slider"
                min="0"
                max="360"
                aria-orientation=${ifDefined(
      this.vertical ? "vertical" : void 0
    )}
                orient=${ifDefined(this.vertical ? "vertical" : void 0)}
                step=${this.step}
                aria-label=${this.label}
                .value=${String(this.value)}
                aria-valuetext=${`${new Intl.NumberFormat(
      this.languageResolver.language,
      {
        maximumFractionDigits: 0,
        minimumIntegerDigits: 1,
        style: "unit",
        unit: "degree",
        unitDisplay: "narrow"
      }
    ).format(this.value)}`}
                @input=${this.handleInput}
                @change=${this.handleChange}
                @keydown=${this.handleKeydown}
            />
        `;
  }
  firstUpdated(changed) {
    super.firstUpdated(changed);
    this.boundingClientRect = this.getBoundingClientRect();
    this.addEventListener("focus", this.handleFocus);
    this.addEventListener("blur", this.handleBlur);
  }
}
__decorateClass([
  property({ type: String, reflect: true })
], ColorSlider.prototype, "dir", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], ColorSlider.prototype, "disabled", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], ColorSlider.prototype, "focused", 2);
__decorateClass([
  query(".handle")
], ColorSlider.prototype, "handle", 2);
__decorateClass([
  property({ type: String })
], ColorSlider.prototype, "label", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], ColorSlider.prototype, "vertical", 2);
__decorateClass([
  property({ type: Number })
], ColorSlider.prototype, "value", 1);
__decorateClass([
  property({ type: String })
], ColorSlider.prototype, "color", 1);
__decorateClass([
  property({ type: Number })
], ColorSlider.prototype, "step", 2);
__decorateClass([
  query("input")
], ColorSlider.prototype, "input", 2);
//# sourceMappingURL=ColorSlider.dev.js.map

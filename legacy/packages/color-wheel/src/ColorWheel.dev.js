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
import { ifDefined } from "@spectrum-web-components/base/src/directives.js";
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
import styles from "./color-wheel.css.js";
export class ColorWheel extends Focusable {
  constructor() {
    super(...arguments);
    this.disabled = false;
    this.focused = false;
    this.label = "hue";
    this.step = 1;
    this.languageResolver = new LanguageResolutionController(this);
    this.colorController = new ColorController(this, { manageAs: "hsv" });
    this._altered = 0;
    this._pointerDown = false;
  }
  static get styles() {
    return [styles];
  }
  get value() {
    return this.colorController.hue;
  }
  set value(hue) {
    this.colorController.hue = hue;
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
    this.value = (360 + this.value + delta) % 360;
    this.colorController.savePreviousColor();
    this.dispatchEvent(
      new Event("input", {
        bubbles: true,
        composed: true
      })
    );
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
    this.value = this.calculateHandlePosition(event);
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
      return this.value;
    }
    const rect = this.boundingClientRect;
    const { width, height, left, top } = rect;
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const pointX = event.clientX - centerX;
    const pointY = event.clientY - centerY;
    const value = Math.atan2(pointY, pointX) * 180 / Math.PI;
    return (360 + (360 + (this.isLTR ? value : 180 - value))) % 360;
  }
  handleGradientPointerdown(event) {
    if (event.button !== 0 || event.target.classList.contains("innerCircle")) {
      return;
    }
    event.stopPropagation();
    event.preventDefault();
    const { button, pointerId, pointerType } = event;
    this.handle.dispatchEvent(
      new PointerEvent("pointerdown", {
        button,
        pointerId,
        pointerType
      })
    );
    this.handlePointermove(event);
  }
  calculateStyleData() {
    const { width: diameter = 160 } = this.boundingClientRect || {};
    const styles2 = getComputedStyle(this);
    const borderWidth = parseFloat(
      styles2.getPropertyValue("--_border-width")
    );
    const trackWidth = parseFloat(
      styles2.getPropertyValue("--_track-width")
    );
    const radius = diameter / 2;
    const diameterAfterBoarder = diameter - borderWidth * 2;
    const radiusAfterBoarder = radius - borderWidth;
    const innerRadius = radius - trackWidth;
    const innerDiameter = innerRadius * 2;
    const innerRadiusAfterBorder = innerRadius + borderWidth;
    const innerDiameterAfterBorder = innerDiameter + borderWidth * 2;
    const clipPathBorders = `"M ${radius} ${radius} m -${radius} 0 a ${radius} ${radius} 0 1 0 ${diameter} 0 a ${radius} ${radius} 0 1 0 -${diameter} 0 M ${radius} ${radius} m -${innerRadius} 0 a ${innerRadius} ${innerRadius} 0 1 0 ${innerDiameter} 0 a ${innerRadius} ${innerRadius} 0 1 0 -${innerDiameter} 0"`;
    const clipPath = `"M ${radiusAfterBoarder} ${radiusAfterBoarder} m -${radiusAfterBoarder} 0 a ${radiusAfterBoarder} ${radiusAfterBoarder} 0 1 0 ${diameterAfterBoarder} 0 a ${radiusAfterBoarder} ${radiusAfterBoarder} 0 1 0 -${diameterAfterBoarder} 0 M ${radiusAfterBoarder} ${radiusAfterBoarder} m -${innerRadiusAfterBorder} 0 a ${innerRadiusAfterBorder} ${innerRadiusAfterBorder} 0 1 0 ${innerDiameterAfterBorder} 0 a ${innerRadiusAfterBorder} ${innerRadiusAfterBorder} 0 1 0 -${innerDiameterAfterBorder} 0"`;
    const translateX = (this.isLTR ? 1 : -1) * (radius - trackWidth / 2) * Math.cos(this.value * Math.PI / 180);
    const translateY = (radius - trackWidth / 2) * Math.sin(this.value * Math.PI / 180);
    const handleLocationStyles = `transform: translate(${translateX}px, ${translateY}px);`;
    return {
      clipPath,
      clipPathBorders,
      diameter,
      handleLocationStyles
    };
  }
  render() {
    const { clipPath, clipPathBorders, diameter, handleLocationStyles } = this.calculateStyleData();
    return html`
            <slot
                name="gradient"
                @pointerdown=${this.handleGradientPointerdown}
                style="
                    --spectrum-colorwheel-colorarea-container-size: ${diameter}px;
                    --spectrum-colorwheel-height: ${diameter}px;
                    --spectrum-colorwheel-width: ${diameter}px;
                    --spectrum-colorwheel-path-borders: ${clipPathBorders};
                    --spectrum-colorwheel-path: ${clipPath};
                "
            >
                <div class="inner">
                    <div class="colorarea-container"></div>
                </div>
                <div class="border">
                    <div class="wheel"></div>
                </div>
            </slot>

            <sp-color-handle
                tabindex=${ifDefined(this.focused ? void 0 : "0")}
                @focus=${this.forwardFocus}
                ?focused=${this.focused}
                class="handle"
                color="hsl(${this.value}, 100%, 50%)"
                ?disabled=${this.disabled}
                style=${handleLocationStyles}
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
                aria-label=${this.label}
                min="0"
                max="360"
                step=${this.step}
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
  connectedCallback() {
    var _a;
    super.connectedCallback();
    if (!this.observer && window.ResizeObserver) {
      this.observer = new window.ResizeObserver((entries) => {
        for (const entry of entries) {
          this.boundingClientRect = entry.contentRect;
        }
        this.requestUpdate();
      });
    }
    (_a = this.observer) == null ? void 0 : _a.observe(this);
  }
  disconnectedCallback() {
    var _a;
    (_a = this.observer) == null ? void 0 : _a.unobserve(this);
    super.disconnectedCallback();
  }
}
__decorateClass([
  property({ type: String, reflect: true })
], ColorWheel.prototype, "dir", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], ColorWheel.prototype, "disabled", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], ColorWheel.prototype, "focused", 2);
__decorateClass([
  query(".handle")
], ColorWheel.prototype, "handle", 2);
__decorateClass([
  property({ type: String })
], ColorWheel.prototype, "label", 2);
__decorateClass([
  property({ type: Number })
], ColorWheel.prototype, "step", 2);
__decorateClass([
  property({ type: Number })
], ColorWheel.prototype, "value", 1);
__decorateClass([
  property({ type: String })
], ColorWheel.prototype, "color", 1);
__decorateClass([
  query("input")
], ColorWheel.prototype, "input", 2);
//# sourceMappingURL=ColorWheel.dev.js.map

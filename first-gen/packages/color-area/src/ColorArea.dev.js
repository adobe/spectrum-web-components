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
import { ifDefined } from "@spectrum-web-components/base/src/directives.js";
import {
  property,
  query
} from "@spectrum-web-components/base/src/decorators.js";
import { streamingListener } from "@spectrum-web-components/base/src/streaming-listener.js";
import "@spectrum-web-components/color-handle/sp-color-handle.js";
import {
  ColorController
} from "@spectrum-web-components/reactive-controllers/src/ColorController.js";
import { LanguageResolutionController } from "@spectrum-web-components/reactive-controllers/src/LanguageResolution.js";
import {
  isAndroid,
  isIOS
} from "@spectrum-web-components/shared/src/platform.js";
import styles from "./color-area.css.js";
export class ColorArea extends SpectrumElement {
  constructor() {
    super(...arguments);
    this.disabled = false;
    this.focused = false;
    this.labelX = "saturation";
    this.labelY = "luminosity";
    this.languageResolver = new LanguageResolutionController(this);
    /**
     * A controller for managing color interactions within the ColorArea component.
     *
     * The `ColorController` is instantiated with the `manageAs` option set to `hsv`
     * because the ColorArea component is designed to manipulate the saturation (`s`)
     * and value (`v`) components of the HSV color model along the x and y axes,
     * respectively. In the HSV color model:
     *
     * - The `hue` (h) represents the color type and is typically controlled by a separate input.
     * - The `saturation` (s) represents the intensity of the color, ranging from 0% (gray) to 100% (full color).
     * - The `value` (v) represents the brightness of the color, ranging from 0% (black) to 100% (full brightness).
     *
     * In the ColorArea component:
     *
     * - The x-axis controls the saturation (`s`), allowing users to adjust the intensity of the color.
     * - The y-axis controls the value (`v`), allowing users to adjust the brightness of the color.
     *
     * By managing the color as `hsv`, the ColorController can efficiently handle the changes in saturation and value
     * as the user interacts with the ColorArea component.
     *
     * @private
     * @type {ColorController}
     * @memberof ColorArea
     *
     * @property {ColorArea} this - The instance of the ColorArea component.
     * @property {Object} options - Configuration options for the ColorController.
     * @property {string} options.manageAs - Specifies the color model to manage, in this case 'hsv'.
     */
    this.colorController = new ColorController(this, { manageAs: "hsv" });
    this.activeAxis = "x";
    this.step = 0.01;
    this.altered = 0;
    this.activeKeys = /* @__PURE__ */ new Set();
    this._valueChanged = false;
    this._pointerDown = false;
  }
  static get styles() {
    return [styles];
  }
  get hue() {
    return this.colorController.hue;
  }
  set hue(value) {
    this.colorController.hue = value;
  }
  get value() {
    return this.colorController.colorValue;
  }
  get color() {
    return this.colorController.colorValue;
  }
  set color(color) {
    this.colorController.color = color;
  }
  get x() {
    return this.colorController.color.hsv.s / 100;
  }
  set x(x) {
    if (x === this.x) {
      return;
    }
    const oldValue = this.x;
    if (this.inputX) {
      this.inputX.value = x.toString();
      this.colorController.color.set(
        "s",
        this.inputX.valueAsNumber * 100
      );
    } else {
      this.colorController.color.set("s", x * 100);
    }
    this.requestUpdate("x", oldValue);
  }
  get y() {
    return this.colorController.color.hsv.v / 100;
  }
  set y(y) {
    if (y === this.y) {
      return;
    }
    const oldValue = this.y;
    if (this.inputY) {
      this.inputY.value = y.toString();
      this.colorController.color.set(
        "v",
        this.inputY.valueAsNumber * 100
      );
    }
    this.requestUpdate("y", oldValue);
  }
  focus(focusOptions = {}) {
    super.focus(focusOptions);
    this.forwardFocus();
  }
  forwardFocus() {
    this.focused = this.hasVisibleFocusInTree();
    if (this.activeAxis === "x") {
      this.inputX.focus();
    } else {
      this.inputY.focus();
    }
  }
  handleFocus() {
    this.focused = true;
    this._valueChanged = false;
  }
  handleBlur() {
    if (this._pointerDown) {
      return;
    }
    this.altered = 0;
    this.focused = false;
    this._valueChanged = false;
  }
  handleKeydown(event) {
    const { code } = event;
    this.focused = true;
    this.altered = [event.shiftKey, event.ctrlKey, event.altKey].filter(
      (key) => !!key
    ).length;
    const isArrowKey = code.search("Arrow") === 0 || code.search("Page") === 0 || code.search("Home") === 0 || code.search("End") === 0;
    if (isArrowKey) {
      event.preventDefault();
      this.activeKeys.add(code);
      this.handleKeypress();
    }
  }
  handleKeypress() {
    let deltaX = 0;
    let deltaY = 0;
    const step = Math.max(this.step, this.altered * 5 * this.step);
    this.activeKeys.forEach((code) => {
      switch (code) {
        case "ArrowUp":
          deltaY = step;
          break;
        case "ArrowDown":
          deltaY = step * -1;
          break;
        case "ArrowLeft":
          deltaX = this.step * (this.isLTR ? -1 : 1);
          break;
        case "ArrowRight":
          deltaX = this.step * (this.isLTR ? 1 : -1);
          break;
        case "PageUp":
          deltaY = step * 10;
          break;
        case "PageDown":
          deltaY = step * -10;
          break;
        case "Home":
          deltaX = step * (this.isLTR ? -10 : 10);
          break;
        case "End":
          deltaX = step * (this.isLTR ? 10 : -10);
          break;
        default:
          break;
      }
    });
    if (deltaX != 0) {
      this.activeAxis = "x";
      this.inputX.focus();
    } else if (deltaY != 0) {
      this.activeAxis = "y";
      this.inputY.focus();
    }
    this.x = Math.min(1, Math.max(this.x + deltaX, 0));
    this.y = Math.min(1, Math.max(this.y + deltaY, 0));
    this.colorController.savePreviousColor();
    if (deltaX != 0 || deltaY != 0) {
      this._valueChanged = true;
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
  }
  handleKeyup(event) {
    event.preventDefault();
    const { code } = event;
    this.activeKeys.delete(code);
  }
  handleInput(event) {
    const { valueAsNumber, name } = event.target;
    this[name] = valueAsNumber;
  }
  handleChange(event) {
    this.handleInput(event);
    this.dispatchEvent(
      new Event("change", {
        bubbles: true,
        composed: true,
        cancelable: true
      })
    );
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
    const [x, y] = this.calculateHandlePosition(event);
    this._valueChanged = false;
    this.x = x;
    this.y = y;
    this.dispatchEvent(
      new Event("input", {
        bubbles: true,
        composed: true,
        cancelable: true
      })
    );
  }
  handlePointerup(event) {
    event.preventDefault();
    this._pointerDown = false;
    event.target.releasePointerCapture(event.pointerId);
    const applyDefault = this.dispatchEvent(
      new Event("change", {
        bubbles: true,
        composed: true,
        cancelable: true
      })
    );
    this.inputX.focus();
    if (event.pointerType === "mouse") {
      this.focused = false;
    }
    if (!applyDefault) {
      this.colorController.restorePreviousColor();
    }
  }
  /**
   * Returns the value under the cursor
   * @param: PointerEvent on slider
   * @return: Slider value that correlates to the position under the pointer
   */
  calculateHandlePosition(event) {
    if (!this.boundingClientRect) {
      return [this.x, this.y];
    }
    const rect = this.boundingClientRect;
    const minOffsetX = rect.left;
    const minOffsetY = rect.top;
    const offsetX = event.clientX;
    const offsetY = event.clientY;
    const width = rect.width;
    const height = rect.height;
    const percentX = Math.max(
      0,
      Math.min(1, (offsetX - minOffsetX) / width)
    );
    const percentY = Math.max(
      0,
      Math.min(1, (offsetY - minOffsetY) / height)
    );
    return [this.isLTR ? percentX : 1 - percentX, 1 - percentY];
  }
  handleAreaPointerdown(event) {
    if (event.button !== 0) {
      return;
    }
    event.stopPropagation();
    event.preventDefault();
    this.handle.dispatchEvent(new PointerEvent("pointerdown", event));
    this.handlePointermove(event);
  }
  render() {
    const { width = 0, height = 0 } = this.boundingClientRect || {};
    const isMobile = isAndroid() || isIOS();
    const defaultAriaLabel = "Color Picker";
    const ariaLabel = defaultAriaLabel;
    const ariaRoleDescription = ifDefined(
      isMobile ? void 0 : "2d slider"
    );
    const ariaLabelX = this.labelX;
    const ariaLabelY = this.labelY;
    const ariaValueX = new Intl.NumberFormat(
      this.languageResolver.language,
      {
        style: "percent",
        unitDisplay: "narrow"
      }
    ).format(this.x);
    const ariaValueY = new Intl.NumberFormat(
      this.languageResolver.language,
      {
        style: "percent",
        unitDisplay: "narrow"
      }
    ).format(this.y);
    const style = {
      background: `linear-gradient(to top, black 0%, hsla(${this.hue}, 100%, 0.01%, 0) 100%),linear-gradient(to right, white 0%, hsla(${this.hue}, 100%, 0.01%, 0) 100%), hsl(${this.hue}, 100%, 50%);`
    };
    return html`
            <div
                @pointerdown=${this.handleAreaPointerdown}
                class="gradient"
                style="background: ${style.background};"
            >
                <slot name="gradient"></slot>
            </div>

            <sp-color-handle
                tabindex=${ifDefined(this.focused ? void 0 : "0")}
                @focus=${this.forwardFocus}
                ?focused=${this.focused}
                class="handle"
                color=${this.colorController.getHslString()}
                ?disabled=${this.disabled}
                style=${`transform: translate(${(this.isLTR ? this.x : 1 - this.x) * width}px, ${height - this.y * height}px);`}
                ${streamingListener({
      start: ["pointerdown", this.handlePointerdown],
      streamInside: ["pointermove", this.handlePointermove],
      end: [
        ["pointerup", "pointercancel", "pointerleave"],
        this.handlePointerup
      ]
    })}
            ></sp-color-handle>

            <fieldset
                class="fieldset"
                aria-label=${ifDefined(isMobile ? ariaLabel : void 0)}
            >
                <div role="presentation">
                    <input
                        type="range"
                        class="slider"
                        name="x"
                        aria-label=${isMobile ? ariaLabelX : `${ariaLabelX} ${ariaLabel}`}
                        aria-roledescription=${ariaRoleDescription}
                        aria-orientation="horizontal"
                        aria-valuetext=${isMobile ? ariaValueX : `${ariaValueX}, ${ariaLabelX}${this._valueChanged ? "" : `, ${ariaValueY}, ${ariaLabelY}`}`}
                        min="0"
                        max="1"
                        step=${this.step}
                        tabindex="-1"
                        .value=${String(this.x)}
                        @input=${this.handleInput}
                        @change=${this.handleChange}
                    />
                </div>
                <div role="presentation">
                    <input
                        type="range"
                        class="slider"
                        name="y"
                        aria-label=${isMobile ? ariaLabelY : `${ariaLabelY} ${ariaLabel}`}
                        aria-roledescription=${ariaRoleDescription}
                        aria-orientation="vertical"
                        aria-valuetext=${isMobile ? ariaValueY : `${ariaValueY}, ${ariaLabelY}${this._valueChanged ? "" : `, ${ariaValueX}, ${ariaLabelX}`}`}
                        orient="vertical"
                        min="0"
                        max="1"
                        step=${this.step}
                        tabindex="-1"
                        .value=${String(this.y)}
                        @input=${this.handleInput}
                        @change=${this.handleChange}
                    />
                </div>
            </fieldset>
        `;
  }
  firstUpdated(changed) {
    super.firstUpdated(changed);
    this.boundingClientRect = this.getBoundingClientRect();
    this.addEventListener("focus", this.handleFocus);
    this.addEventListener("blur", this.handleBlur);
    this.addEventListener("keyup", this.handleKeyup);
    this.addEventListener("keydown", this.handleKeydown);
  }
  /**
   * Overrides the `updated` method to handle changes in property values.
   *
   * @param changed - A map of changed properties with their previous values.
   *
   * This method performs the following actions:
   * - Updates the saturation (`s`) of the color if `x` has changed.
   * - Updates the value (`v`) of the color if `y` has changed.
   * - If the `focused` property has changed and is now true, it lazily binds
   *   the `input[type="range"]` elements in shadow roots to prevent multiple
   *   tab stops within the Color Area for certain browser settings (e.g., Webkit).
   */
  updated(changed) {
    super.updated(changed);
    if (this.x !== this.inputX.valueAsNumber) {
      this.colorController.color.set(
        "s",
        this.inputX.valueAsNumber * 100
      );
    }
    if (this.y !== this.inputY.valueAsNumber) {
      this.colorController.color.set(
        "v",
        (1 - this.inputY.valueAsNumber) * 100
      );
    }
    if (changed.has("focused") && this.focused) {
      const parentX = this.inputX.parentElement;
      const parentY = this.inputY.parentElement;
      if (!parentX.shadowRoot && !parentY.shadowRoot) {
        parentX.attachShadow({ mode: "open" });
        parentY.attachShadow({ mode: "open" });
        const slot = '<div tabindex="-1"><slot></slot></div>';
        parentX.shadowRoot.innerHTML = slot;
        parentY.shadowRoot.innerHTML = slot;
      }
    }
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
], ColorArea.prototype, "dir", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], ColorArea.prototype, "disabled", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], ColorArea.prototype, "focused", 2);
__decorateClass([
  property({ type: String, attribute: "label-x" })
], ColorArea.prototype, "labelX", 2);
__decorateClass([
  property({ type: String, attribute: "label-y" })
], ColorArea.prototype, "labelY", 2);
__decorateClass([
  query(".handle")
], ColorArea.prototype, "handle", 2);
__decorateClass([
  property({ type: Number })
], ColorArea.prototype, "hue", 1);
__decorateClass([
  property({ type: String })
], ColorArea.prototype, "value", 1);
__decorateClass([
  property({ type: String })
], ColorArea.prototype, "color", 1);
__decorateClass([
  property({ attribute: false })
], ColorArea.prototype, "activeAxis", 2);
__decorateClass([
  property({ type: Number })
], ColorArea.prototype, "x", 1);
__decorateClass([
  property({ type: Number })
], ColorArea.prototype, "y", 1);
__decorateClass([
  property({ type: Number })
], ColorArea.prototype, "step", 2);
__decorateClass([
  query('[name="x"]')
], ColorArea.prototype, "inputX", 2);
__decorateClass([
  query('[name="y"]')
], ColorArea.prototype, "inputY", 2);
//# sourceMappingURL=ColorArea.dev.js.map

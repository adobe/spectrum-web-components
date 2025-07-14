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
  SizedMixin
} from "@spectrum-web-components/base";
import {
  property,
  query
} from "@spectrum-web-components/base/src/decorators.js";
import {
  classMap,
  ifDefined,
  repeat,
  styleMap
} from "@spectrum-web-components/base/src/directives.js";
import sliderStyles from "./slider.css.js";
import { ObserveSlotText } from "@spectrum-web-components/shared/src/observe-slot-text.js";
import "@spectrum-web-components/field-label/sp-field-label.js";
import { HandleController } from "./HandleController.dev.js";
import { SliderHandle } from "./SliderHandle.dev.js";
import { streamingListener } from "@spectrum-web-components/base/src/streaming-listener.js";
export const variants = ["filled", "ramp", "range", "tick"];
export class Slider extends SizedMixin(ObserveSlotText(SliderHandle, ""), {
  noDefaultSize: true,
  validSizes: ["s", "m", "l", "xl"]
}) {
  constructor() {
    super(...arguments);
    this.handleController = new HandleController(
      this
    );
    this._editable = false;
    this.hideStepper = false;
    this.type = "";
    /* Ensure that a '' value for `variant` removes the attribute instead of a blank value */
    this._variant = "";
    this.getAriaValueText = (values) => {
      const valueArray = [...values.values()];
      if (valueArray.length === 2)
        return `${valueArray[0]} - ${valueArray[1]}`;
      return valueArray.join(", ");
    };
    this.min = 0;
    this.max = 100;
    this.step = 1;
    this.tickStep = 0;
    this.tickLabels = false;
    this.disabled = false;
    this.quiet = false;
    this.indeterminate = false;
    this._numberFieldInput = Promise.resolve();
  }
  static get styles() {
    return [sliderStyles];
  }
  get editable() {
    return this._editable;
  }
  set editable(editable) {
    if (editable === this.editable) return;
    const oldValue = this.editable;
    this._editable = this.handleController.size < 2 ? editable : false;
    if (this.editable) {
      this._numberFieldInput = import("@spectrum-web-components/number-field/sp-number-field.js");
    }
    if (oldValue !== this.editable) {
      this.requestUpdate("editable", oldValue);
    }
  }
  set variant(variant) {
    const oldVariant = this.variant;
    if (variant === this.variant) {
      return;
    }
    if (variants.includes(variant) && this.fillStart === void 0) {
      this._variant = variant;
      this.setAttribute("variant", variant);
    } else {
      this._variant = "";
      this.removeAttribute("variant");
    }
    this.requestUpdate("variant", oldVariant);
  }
  get variant() {
    return this._variant;
  }
  get values() {
    return this.handleController.values;
  }
  get handleName() {
    return "value";
  }
  get ariaValueText() {
    if (!this.getAriaValueText) {
      return `${this.value}${this._forcedUnit}`;
    }
    return this.getAriaValueText(this.handleController.formattedValues);
  }
  get numberFormat() {
    return this.getNumberFormat();
  }
  get focusElement() {
    return this.handleController.focusElement;
  }
  handleLabelClick(event) {
    if (this.editable) {
      event.preventDefault();
      this.focus();
    }
  }
  render() {
    return html`
            ${this.renderLabel()} ${this.renderTrack()}
            ${this.editable ? html`
                      <sp-number-field
                          .formatOptions=${this.formatOptions || {}}
                          id="number-field"
                          min=${this.min}
                          max=${this.max}
                          step=${this.step}
                          size=${this.size}
                          value=${this.value}
                          ?hide-stepper=${this.hideStepper}
                          ?disabled=${this.disabled}
                          ?quiet=${this.quiet}
                          ?indeterminate=${this.indeterminate}
                          @input=${this.handleNumberInput}
                          @change=${this.handleNumberChange}
                      ></sp-number-field>
                  ` : nothing}
        `;
  }
  connectedCallback() {
    var _a;
    super.connectedCallback();
    this.handleController.hostConnected();
    if ((_a = this.textContent) == null ? void 0 : _a.trim()) {
      window.__swc.warn(
        this,
        `The default slot for text label in <${this.localName}> has been deprecated and will be removed in a future release. Use the "label" property instead.`,
        "https://opensource.adobe.com/spectrum-web-components/components/slider/",
        { level: "deprecation" }
      );
    }
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.handleController.hostDisconnected();
  }
  update(changedProperties) {
    this.handleController.hostUpdate();
    if (changedProperties.has("disabled") && this.disabled) {
      this.handleController.cancelDrag();
    }
    super.update(changedProperties);
  }
  renderLabel() {
    const textLabelVisible = this.labelVisibility === "none" || this.labelVisibility === "value";
    const valueLabelVisible = this.labelVisibility === "none" || this.labelVisibility === "text";
    return html`
            <div id="label-container">
                <sp-field-label
                    class=${classMap({
      "visually-hidden": textLabelVisible
    })}
                    ?disabled=${this.disabled}
                    id="label"
                    for=${this.editable ? "number-field" : this.handleController.activeHandleInputId}
                    @click=${this.handleLabelClick}
                    size=${this.size}
                >
                    ${this.slotHasContent ? nothing : html`
                              <span>${this.label}</span>
                          `}
                    <slot></slot>
                </sp-field-label>
                <sp-field-label
                    class=${classMap({
      "visually-hidden": valueLabelVisible
    })}
                    ?disabled=${this.disabled}
                    for=${this.editable ? "number-field" : this.handleController.activeHandleInputId}
                    size=${this.size}
                >
                    <output id="value" aria-live="off" for="input">
                        ${this.ariaValueText}
                    </output>
                </sp-field-label>
            </div>
        `;
  }
  renderRamp() {
    if (this.variant !== "ramp") {
      return html``;
    }
    return html`
            <div id="ramp">
                <svg
                    viewBox="0 0 240 16"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                    focusable="false"
                >
                    <path
                        d="M240,4v8c0,2.3-1.9,4.1-4.2,4L1,9C0.4,9,0,8.5,0,8c0-0.5,0.4-1,1-1l234.8-7C238.1-0.1,240,1.7,240,4z"
                    ></path>
                </svg>
            </div>
        `;
  }
  renderTicks() {
    if (this.variant !== "tick") {
      return html``;
    }
    const tickStep = this.tickStep || this.step;
    const tickCount = (this.max - this.min) / tickStep;
    const partialFit = tickCount % 1 !== 0;
    const ticks = new Array(Math.floor(tickCount + 1));
    ticks.fill(0, 0, tickCount + 1);
    return html`
            <div
                class="${partialFit ? "not-exact " : ""}ticks"
                style=${ifDefined(
      partialFit ? `--sp-slider-tick-offset: calc(100% / ${this.max} * ${this.tickStep}` : void 0
    )}
            >
                ${ticks.map(
      (_tick, i) => html`
                        <div class="tick">
                            ${this.tickLabels ? html`
                                      <div class="tickLabel">
                                          ${i * tickStep + this.min}
                                      </div>
                                  ` : nothing}
                        </div>
                    `
    )}
            </div>
        `;
  }
  renderTrackSegment(start, end) {
    if (this.variant === "ramp") {
      return html``;
    }
    return html`
            <div
                class="track"
                style=${styleMap(this.trackSegmentStyles(start, end))}
                role="presentation"
            ></div>
        `;
  }
  /**
   * @description calculates the fill width
   * @param fillStartValue
   * @param currentValue
   * @returns
   */
  getOffsetWidth(fillStartValue, currentValue) {
    const distance = Math.abs(currentValue - fillStartValue);
    return distance * 100;
  }
  fillStyles(centerPoint) {
    const activeModel = this.handleController.activeHandleModel;
    const centerPointNormalized = activeModel.normalization.toNormalized(
      centerPoint,
      this.min,
      this.max
    );
    const position = this.dir === "rtl" ? "right" : "left";
    const offsetPosition = (this.value > centerPoint ? centerPointNormalized : activeModel.normalizedValue) * 100;
    const offsetWidth = this.getOffsetWidth(
      centerPointNormalized,
      activeModel.normalizedValue
    );
    const styles = {
      [position]: `${offsetPosition}%`,
      width: `${offsetWidth}%`
    };
    return styles;
  }
  renderFillOffset() {
    if (this._cachedValue === void 0 || this.centerPoint === void 0) {
      return html``;
    }
    return html`
            <div
                class=${classMap({
      fill: true,
      offset: this.value > this.centerPoint
    })}
                style=${styleMap(this.fillStyles(this.centerPoint))}
            ></div>
        `;
  }
  renderHandle() {
    if (this.variant === "tick") {
      return html``;
    }
    return html`
            ${this.handleController.render()}
        `;
  }
  renderTrack() {
    const segments = this.handleController.trackSegments();
    const handleItems = [
      { id: "handles", html: this.handleController.render() }
    ];
    const trackItems = [
      { id: "track0", html: this.renderTrackSegment(...segments[0]) },
      { id: "fill", html: this.renderFillOffset() },
      { id: "ramp", html: this.renderRamp() },
      { id: "handles", html: this.renderHandle() },
      ...segments.slice(1).map(([start, end], index) => ({
        id: `track${index + 1}`,
        html: this.renderTrackSegment(start, end)
      }))
    ];
    return html`
            <div
                id="track"
                ${streamingListener({
      start: ["pointerdown", this.handlePointerdown],
      streamInside: ["pointermove", this.handlePointermove],
      end: [
        ["pointerup", "pointercancel", "pointerleave"],
        this.handlePointerup
      ],
      streamOutside: ["dblclick", this.handleDoubleClick]
    })}
            >
                <div id="controls">
                    ${this.variant === "tick" ? html`
                              ${this.renderTicks()}
                              <div class="trackContainer">
                                  ${repeat(
      trackItems,
      (item) => item.id,
      (item) => item.html
    )}
                              </div>
                              <div class="handleContainer">
                                  ${repeat(
      handleItems,
      (item) => item.id,
      (item) => item.html
    )}
                              </div>
                          ` : html`
                              ${repeat(
      trackItems,
      (item) => item.id,
      (item) => item.html
    )}
                          `}
                </div>
            </div>
        `;
  }
  handleDoubleClick(event) {
    this.handleController.handleDoubleClick(event);
  }
  handlePointerdown(event) {
    this.handleController.handlePointerdown(event);
  }
  handlePointermove(event) {
    this.handleController.handlePointermove(event);
  }
  handlePointerup(event) {
    this.handleController.handlePointerup(event);
  }
  handleNumberInput(event) {
    var _a;
    const { value } = event.target;
    if (((_a = event.target) == null ? void 0 : _a.managedInput) && !isNaN(value)) {
      this.value = value;
      return;
    }
    event.stopPropagation();
  }
  handleNumberChange(event) {
    var _a;
    const { value } = event.target;
    if (isNaN(value)) {
      event.target.value = this.value;
      event.stopPropagation();
    } else {
      this.value = value;
      if (!((_a = event.target) == null ? void 0 : _a.managedInput)) {
        this.dispatchInputEvent();
      }
    }
    this.indeterminate = false;
  }
  trackSegmentStyles(start, end) {
    const size = end - start;
    const styles = {
      width: `${size * 100}%`,
      "--spectrum-slider-track-background-size": `${1 / size * 100}%`,
      "--spectrum-slider-track-segment-position": `${start * 100}%`
    };
    return styles;
  }
  async getUpdateComplete() {
    const complete = await super.getUpdateComplete();
    if (this.editable) {
      await this._numberFieldInput;
      await this.numberField.updateComplete;
    }
    await this.handleController.handleUpdatesComplete();
    return complete;
  }
  willUpdate(changed) {
    if (changed.has("value") && changed.has("fillStart")) {
      this._cachedValue = Number(this.value);
      if (this.getAttribute("fill-start") === "") {
        this.centerPoint = (Number(this.max) - Number(this.min)) / 2 + Number(this.min);
      } else if (!Number.isNaN(Number(this.fillStart))) {
        this.centerPoint = Number(this.fillStart);
      }
    }
  }
}
__decorateClass([
  property({ type: Boolean, reflect: true })
], Slider.prototype, "editable", 1);
__decorateClass([
  property({ type: Boolean, reflect: true, attribute: "hide-stepper" })
], Slider.prototype, "hideStepper", 2);
__decorateClass([
  property()
], Slider.prototype, "type", 2);
__decorateClass([
  property({ reflect: true })
], Slider.prototype, "dir", 2);
__decorateClass([
  property({ type: String })
], Slider.prototype, "variant", 1);
__decorateClass([
  property({ attribute: false })
], Slider.prototype, "getAriaValueText", 2);
__decorateClass([
  property({ type: String, reflect: true, attribute: "label-visibility" })
], Slider.prototype, "labelVisibility", 2);
__decorateClass([
  property({ type: Number, reflect: true })
], Slider.prototype, "min", 2);
__decorateClass([
  property({ type: Number, reflect: true })
], Slider.prototype, "max", 2);
__decorateClass([
  property({ type: Number })
], Slider.prototype, "step", 2);
__decorateClass([
  property({ type: Number, attribute: "tick-step" })
], Slider.prototype, "tickStep", 2);
__decorateClass([
  property({ type: Boolean, attribute: "tick-labels" })
], Slider.prototype, "tickLabels", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], Slider.prototype, "disabled", 2);
__decorateClass([
  property({ type: Number, reflect: true, attribute: "fill-start" })
], Slider.prototype, "fillStart", 2);
__decorateClass([
  property({ type: Boolean })
], Slider.prototype, "quiet", 2);
__decorateClass([
  property({ type: Boolean })
], Slider.prototype, "indeterminate", 2);
__decorateClass([
  query("#label")
], Slider.prototype, "labelEl", 2);
__decorateClass([
  query("#number-field")
], Slider.prototype, "numberField", 2);
__decorateClass([
  query("#track")
], Slider.prototype, "track", 2);
//# sourceMappingURL=Slider.dev.js.map

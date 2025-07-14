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
import { NumberFormatter, NumberParser } from "@internationalized/number";
import {
  html,
  nothing
} from "@spectrum-web-components/base";
import {
  property,
  query
} from "@spectrum-web-components/base/src/decorators.js";
import { streamingListener } from "@spectrum-web-components/base/src/streaming-listener.js";
import {
  LanguageResolutionController,
  languageResolverUpdatedSymbol
} from "@spectrum-web-components/reactive-controllers/src/LanguageResolution.js";
import chevronStyles from "@spectrum-web-components/icon/src/spectrum-icon-chevron.css.js";
import "@spectrum-web-components/icons-ui/icons/sp-icon-chevron100.js";
import "@spectrum-web-components/icons-ui/icons/sp-icon-chevron200.js";
import "@spectrum-web-components/icons-ui/icons/sp-icon-chevron50.js";
import "@spectrum-web-components/icons-ui/icons/sp-icon-chevron75.js";
import "@spectrum-web-components/infield-button/sp-infield-button.js";
import { TextfieldBase } from "@spectrum-web-components/textfield";
import styles from "./number-field.css.js";
import { isAndroid, isIOS, isIPhone } from "@spectrum-web-components/shared";
export const FRAMES_PER_CHANGE = 5;
export const CHANGE_DEBOUNCE_MS = 100;
export const indeterminatePlaceholder = "-";
export const remapMultiByteCharacters = {
  "\uFF11": "1",
  "\uFF12": "2",
  "\uFF13": "3",
  "\uFF14": "4",
  "\uFF15": "5",
  "\uFF16": "6",
  "\uFF17": "7",
  "\uFF18": "8",
  "\uFF19": "9",
  "\uFF10": "0",
  "\u3001": ",",
  "\uFF0C": ",",
  "\u3002": ".",
  "\uFF0E": ".",
  "\uFF05": "%",
  "\uFF0B": "+",
  \u30FC: "-",
  \u4E00: "1",
  \u4E8C: "2",
  \u4E09: "3",
  \u56DB: "4",
  \u4E94: "5",
  \u516D: "6",
  \u4E03: "7",
  \u516B: "8",
  \u4E5D: "9",
  \u96F6: "0"
};
const chevronIcon = {
  s: (dir) => html`
        <sp-icon-chevron50
            class="stepper-icon spectrum-UIIcon-Chevron${dir}50"
        ></sp-icon-chevron50>
    `,
  m: (dir) => html`
        <sp-icon-chevron75
            class="stepper-icon spectrum-UIIcon-Chevron${dir}75"
        ></sp-icon-chevron75>
    `,
  l: (dir) => html`
        <sp-icon-chevron100
            class="stepper-icon spectrum-UIIcon-Chevron${dir}100"
        ></sp-icon-chevron100>
    `,
  xl: (dir) => html`
        <sp-icon-chevron200
            class="stepper-icon spectrum-UIIcon-Chevron${dir}200"
        ></sp-icon-chevron200>
    `
};
export class NumberField extends TextfieldBase {
  constructor() {
    super(...arguments);
    this.focused = false;
    this._forcedUnit = "";
    this.formatOptions = {};
    this.hideStepper = false;
    this.indeterminate = false;
    this.keyboardFocused = false;
    this.managedInput = false;
    this.stepModifier = 10;
    this._value = NaN;
    this._trackingValue = "";
    this.decimalsChars = /* @__PURE__ */ new Set([".", ","]);
    this.valueBeforeFocus = "";
    this.isIntentDecimal = false;
    this.changeCount = 0;
    this.languageResolver = new LanguageResolutionController(this);
    this.wasIndeterminate = false;
    this.hasRecentlyReceivedPointerDown = false;
    this.applyFocusElementLabel = (value) => {
      this.appliedLabel = value;
    };
    this.isComposing = false;
  }
  static get styles() {
    return [...super.styles, styles, chevronStyles];
  }
  set value(rawValue) {
    const value = this.validateInput(rawValue);
    if (value === this.value) {
      return;
    }
    this.lastCommitedValue = value;
    const oldValue = this._value;
    this._value = value;
    this.requestUpdate("value", oldValue);
  }
  get value() {
    return this._value;
  }
  get inputValue() {
    return this.indeterminate ? this.formattedValue : this.inputElement.value;
  }
  setValue(newValue = this.value) {
    const previousValue = this.lastCommitedValue;
    this.value = newValue;
    if (typeof previousValue === "undefined" || previousValue === this.value) {
      return;
    }
    this.lastCommitedValue = this.value;
    this.dispatchEvent(
      new Event("change", { bubbles: true, composed: true })
    );
  }
  /**
   * Retreive the value of the element parsed to a Number.
   */
  get valueAsString() {
    return this._value.toString();
  }
  set valueAsString(value) {
    this.value = this.numberParser.parse(value);
  }
  get formattedValue() {
    if (isNaN(this.value)) return "";
    return this.numberFormatter.format(this.value) + (this.focused ? "" : this._forcedUnit);
  }
  convertValueToNumber(inputValue) {
    let normalizedValue = inputValue.split("").map((char) => remapMultiByteCharacters[char] || char).join("");
    const separators = this.valueBeforeFocus.split("").filter((char) => this.decimalsChars.has(char));
    const uniqueSeparators = new Set(separators);
    if (isIOS() && this.inputElement.inputMode === "decimal" && normalizedValue !== this.valueBeforeFocus) {
      const parts = this.numberFormatter.formatToParts(1000.1);
      const replacementDecimal = parts.find(
        (part) => part.type === "decimal"
      ).value;
      for (const separator of uniqueSeparators) {
        const isDecimalSeparator = separator === replacementDecimal;
        if (!isDecimalSeparator && !this.isIntentDecimal) {
          normalizedValue = normalizedValue.replace(
            new RegExp(separator, "g"),
            ""
          );
        }
      }
      let hasReplacedDecimal = false;
      const valueChars = normalizedValue.split("");
      for (let index = valueChars.length - 1; index >= 0; index--) {
        const char = valueChars[index];
        if (this.decimalsChars.has(char)) {
          if (!hasReplacedDecimal) {
            valueChars[index] = replacementDecimal;
            hasReplacedDecimal = true;
          } else valueChars[index] = "";
        }
      }
      normalizedValue = valueChars.join("");
    }
    return this.numberParser.parse(normalizedValue);
  }
  get _step() {
    var _a;
    if (typeof this.step !== "undefined") {
      return this.step;
    }
    if (((_a = this.formatOptions) == null ? void 0 : _a.style) === "percent") {
      return 0.01;
    }
    return 1;
  }
  handlePointerdown(event) {
    if (event.button !== 0) {
      event.preventDefault();
      return;
    }
    this.managedInput = true;
    this.buttons.setPointerCapture(event.pointerId);
    const stepUpRect = this.buttons.children[0].getBoundingClientRect();
    const stepDownRect = this.buttons.children[1].getBoundingClientRect();
    this.findChange = (event2) => {
      if (event2.clientX >= stepUpRect.x && event2.clientY >= stepUpRect.y && event2.clientX <= stepUpRect.x + stepUpRect.width && event2.clientY <= stepUpRect.y + stepUpRect.height) {
        this.change = (event3) => this.increment(event3.shiftKey ? this.stepModifier : 1);
      } else if (event2.clientX >= stepDownRect.x && event2.clientY >= stepDownRect.y && event2.clientX <= stepDownRect.x + stepDownRect.width && event2.clientY <= stepDownRect.y + stepDownRect.height) {
        this.change = (event3) => this.decrement(event3.shiftKey ? this.stepModifier : 1);
      }
    };
    this.findChange(event);
    this.startChange(event);
  }
  startChange(event) {
    this.changeCount = 0;
    this.doChange(event);
    this.safty = setTimeout(() => {
      this.doNextChange(event);
    }, 400);
  }
  doChange(event) {
    this.change(event);
  }
  handlePointermove(event) {
    this.findChange(event);
  }
  handlePointerup(event) {
    this.buttons.releasePointerCapture(event.pointerId);
    cancelAnimationFrame(this.nextChange);
    clearTimeout(this.safty);
    this.managedInput = false;
    this.setValue();
  }
  doNextChange(event) {
    this.changeCount += 1;
    if (this.changeCount % FRAMES_PER_CHANGE === 0) {
      this.doChange(event);
    }
    return requestAnimationFrame(() => {
      this.nextChange = this.doNextChange(event);
    });
  }
  stepBy(count) {
    if (this.disabled || this.readonly) {
      return;
    }
    const min = typeof this.min !== "undefined" ? this.min : 0;
    let value = this.value;
    value += count * this._step;
    if (isNaN(this.value)) {
      value = min;
    }
    value = this.valueWithLimits(value);
    this.requestUpdate();
    this._value = this.validateInput(value);
    this.inputElement.value = this.numberFormatter.format(value);
    const inputEvent = new Event("input", {
      bubbles: true,
      composed: true
    });
    this.inputElement.readOnly = true;
    this.inputElement.dispatchEvent(inputEvent);
    this.indeterminate = false;
    this.focus();
    this.inputElement.readOnly = false;
  }
  increment(factor = 1) {
    this.stepBy(1 * factor);
  }
  decrement(factor = 1) {
    this.stepBy(-1 * factor);
  }
  handleKeydown(event) {
    if (this.isComposing) return;
    switch (event.code) {
      case "ArrowUp":
        event.preventDefault();
        this.increment(event.shiftKey ? this.stepModifier : 1);
        this.setValue();
        break;
      case "ArrowDown":
        event.preventDefault();
        this.decrement(event.shiftKey ? this.stepModifier : 1);
        this.setValue();
        break;
    }
  }
  onScroll(event) {
    event.preventDefault();
    this.managedInput = true;
    const direction = event.shiftKey ? event.deltaX / Math.abs(event.deltaX) : event.deltaY / Math.abs(event.deltaY);
    if (direction !== 0 && !isNaN(direction)) {
      this.stepBy(direction * (event.shiftKey ? this.stepModifier : 1));
      clearTimeout(this.queuedChangeEvent);
      this.queuedChangeEvent = setTimeout(() => {
        this.setValue();
      }, CHANGE_DEBOUNCE_MS);
    }
    this.managedInput = false;
  }
  onFocus() {
    super.onFocus();
    this._trackingValue = this.inputValue;
    this.keyboardFocused = !this.readonly && true;
    this.addEventListener("wheel", this.onScroll, { passive: false });
    this.valueBeforeFocus = this.inputElement.value;
  }
  onBlur(_event) {
    super.onBlur(_event);
    this.keyboardFocused = !this.readonly && false;
    this.removeEventListener("wheel", this.onScroll);
    this.isIntentDecimal = false;
  }
  handleFocusin() {
    this.focused = !this.readonly && true;
    this.keyboardFocused = !this.readonly && true;
  }
  handleFocusout() {
    this.focused = !this.readonly && false;
    this.keyboardFocused = !this.readonly && false;
  }
  handleChange() {
    const value = this.convertValueToNumber(this.inputValue);
    if (this.wasIndeterminate) {
      this.wasIndeterminate = false;
      this.indeterminateValue = void 0;
      if (isNaN(value)) {
        this.indeterminate = true;
        return;
      }
    }
    this.setValue(value);
    this.inputElement.value = this.formattedValue;
  }
  handleCompositionStart() {
    this.isComposing = true;
  }
  handleCompositionEnd() {
    this.isComposing = false;
    requestAnimationFrame(() => {
      this.inputElement.dispatchEvent(
        new Event("input", {
          composed: true,
          bubbles: true
        })
      );
    });
  }
  handleInputElementPointerdown() {
    this.hasRecentlyReceivedPointerDown = true;
    this.updateComplete.then(() => {
      requestAnimationFrame(() => {
        this.hasRecentlyReceivedPointerDown = false;
      });
    });
  }
  handleInput(event) {
    var _a;
    if (this.isComposing) {
      if (event.data) {
        const partialValue = this.convertValueToNumber(event.data);
        if (Number.isNaN(partialValue)) {
          this.inputElement.value = this.indeterminate ? indeterminatePlaceholder : this._trackingValue;
          this.isComposing = false;
        }
      }
      event.stopPropagation();
      return;
    }
    if (this.indeterminate) {
      this.wasIndeterminate = true;
      this.indeterminateValue = this.value;
      this.inputElement.value = this.inputElement.value.replace(
        indeterminatePlaceholder,
        ""
      );
    }
    if (event.data && this.decimalsChars.has(event.data))
      this.isIntentDecimal = true;
    const { value: originalValue, selectionStart } = this.inputElement;
    const value = originalValue.split("").map((char) => remapMultiByteCharacters[char] || char).join("");
    if (this.numberParser.isValidPartialNumber(value)) {
      this.lastCommitedValue = (_a = this.lastCommitedValue) != null ? _a : this.value;
      const valueAsNumber = this.convertValueToNumber(value);
      if (!value && this.indeterminateValue) {
        this.indeterminate = true;
        this._value = this.indeterminateValue;
      } else {
        this.indeterminate = false;
        this._value = this.validateInput(valueAsNumber);
      }
      this._trackingValue = value;
      this.inputElement.value = value;
      this.inputElement.setSelectionRange(selectionStart, selectionStart);
      return;
    } else {
      this.inputElement.value = this.indeterminate ? indeterminatePlaceholder : this._trackingValue;
      event.stopPropagation();
    }
    const currentLength = value.length;
    const previousLength = this._trackingValue.length;
    const nextSelectStart = (selectionStart || currentLength) - (currentLength - previousLength);
    this.inputElement.setSelectionRange(nextSelectStart, nextSelectStart);
  }
  valueWithLimits(nextValue) {
    let value = nextValue;
    if (typeof this.min !== "undefined") {
      value = Math.max(this.min, value);
    }
    if (typeof this.max !== "undefined") {
      value = Math.min(this.max, value);
    }
    return value;
  }
  validateInput(value) {
    value = this.valueWithLimits(value);
    const signMultiplier = value < 0 ? -1 : 1;
    value *= signMultiplier;
    if (this.step) {
      const min = typeof this.min !== "undefined" ? this.min : 0;
      const moduloStep = parseFloat(
        this.valueFormatter.format((value - min) % this.step)
      );
      const fallsOnStep = moduloStep === 0;
      if (!fallsOnStep) {
        const overUnder = Math.round(moduloStep / this.step);
        if (overUnder === 1) {
          value += this.step - moduloStep;
        } else {
          value -= moduloStep;
        }
      }
      if (typeof this.max !== "undefined") {
        while (value > this.max) {
          value -= this.step;
        }
      }
      value = parseFloat(this.valueFormatter.format(value));
    }
    value *= signMultiplier;
    return value;
  }
  get displayValue() {
    const indeterminateValue = this.focused ? "" : indeterminatePlaceholder;
    return this.indeterminate ? indeterminateValue : this.formattedValue;
  }
  clearNumberFormatterCache() {
    this._numberFormatter = void 0;
    this._numberParser = void 0;
  }
  get numberFormatter() {
    if (!this._numberFormatter || !this._numberFormatterFocused) {
      const {
        style,
        unit,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        unitDisplay,
        ...formatOptionsNoUnit
      } = this.formatOptions;
      if (style !== "unit") {
        formatOptionsNoUnit.style = style;
      }
      this._numberFormatterFocused = new NumberFormatter(
        this.languageResolver.language,
        formatOptionsNoUnit
      );
      try {
        this._numberFormatter = new NumberFormatter(
          this.languageResolver.language,
          this.formatOptions
        );
        this._forcedUnit = "";
        this._numberFormatter.format(1);
      } catch (error) {
        if (style === "unit") {
          this._forcedUnit = unit;
        }
        this._numberFormatter = this._numberFormatterFocused;
      }
    }
    return this.focused ? this._numberFormatterFocused : this._numberFormatter;
  }
  clearValueFormatterCache() {
    this._valueFormatter = void 0;
  }
  get valueFormatter() {
    if (!this._valueFormatter) {
      const digitsAfterDecimal = this.step ? this.step != Math.floor(this.step) ? this.step.toString().split(".")[1].length : 0 : 0;
      this._valueFormatter = new NumberFormatter("en", {
        useGrouping: false,
        maximumFractionDigits: digitsAfterDecimal
      });
    }
    return this._valueFormatter;
  }
  get numberParser() {
    if (!this._numberParser || !this._numberParserFocused) {
      const {
        style,
        unit,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        unitDisplay,
        ...formatOptionsNoUnit
      } = this.formatOptions;
      if (style !== "unit") {
        formatOptionsNoUnit.style = style;
      }
      this._numberParserFocused = new NumberParser(
        this.languageResolver.language,
        formatOptionsNoUnit
      );
      try {
        this._numberParser = new NumberParser(
          this.languageResolver.language,
          this.formatOptions
        );
        this._forcedUnit = "";
        this._numberParser.parse("0");
      } catch (error) {
        if (style === "unit") {
          this._forcedUnit = unit;
        }
        this._numberParser = this._numberParserFocused;
      }
    }
    return this.focused ? this._numberParserFocused : this._numberParser;
  }
  renderField() {
    this.autocomplete = "off";
    return html`
            ${super.renderField()}
            ${this.hideStepper ? nothing : html`
                      <span
                          class="buttons"
                          @focusin=${this.handleFocusin}
                          @focusout=${this.handleFocusout}
                          ${streamingListener({
      start: ["pointerdown", this.handlePointerdown],
      streamInside: [
        [
          "pointermove",
          "pointerenter",
          "pointerleave",
          "pointerover",
          "pointerout"
        ],
        this.handlePointermove
      ],
      end: [
        [
          "pointerup",
          "pointercancel",
          "pointerleave"
        ],
        this.handlePointerup
      ]
    })}
                      >
                          <sp-infield-button
                              inline="end"
                              block="start"
                              class="button step-up"
                              aria-hidden="true"
                              label=${"Increase " + this.appliedLabel}
                              size=${this.size}
                              tabindex="-1"
                              ?focused=${this.focused}
                              ?disabled=${this.disabled || this.readonly || typeof this.max !== "undefined" && this.value === this.max}
                              ?quiet=${this.quiet}
                          >
                              ${chevronIcon[this.size]("Up")}
                          </sp-infield-button>
                          <sp-infield-button
                              inline="end"
                              block="end"
                              class="button step-down"
                              aria-hidden="true"
                              label=${"Decrease " + this.appliedLabel}
                              size=${this.size}
                              tabindex="-1"
                              ?focused=${this.focused}
                              ?disabled=${this.disabled || this.readonly || typeof this.min !== "undefined" && this.value === this.min}
                              ?quiet=${this.quiet}
                          >
                              ${chevronIcon[this.size]("Down")}
                          </sp-infield-button>
                      </span>
                  `}
        `;
  }
  update(changes) {
    if (changes.has("formatOptions") || changes.has("resolvedLanguage")) {
      this.clearNumberFormatterCache();
    }
    if (changes.has("value") || changes.has("max") || changes.has("min") || changes.has("step")) {
      const value = this.numberParser.parse(
        this.formattedValue.replace(this._forcedUnit, "")
      );
      this.value = value;
      this.clearValueFormatterCache();
    }
    super.update(changes);
  }
  willUpdate(changes) {
    this.multiline = false;
    if (changes.has(languageResolverUpdatedSymbol)) {
      this.clearNumberFormatterCache();
    }
  }
  firstUpdated(changes) {
    super.firstUpdated(changes);
    this.addEventListener("keydown", this.handleKeydown);
    this.addEventListener("compositionstart", this.handleCompositionStart);
    this.addEventListener("compositionend", this.handleCompositionEnd);
  }
  updated(changes) {
    if (!this.inputElement || !this.isConnected) {
      return;
    }
    if (changes.has("min") || changes.has("formatOptions")) {
      const hasOnlyPositives = typeof this.min !== "undefined" && this.min >= 0;
      const { maximumFractionDigits } = this.numberFormatter.resolvedOptions();
      const hasDecimals = maximumFractionDigits && maximumFractionDigits > 0;
      let inputMode = "numeric";
      if (isIPhone() && !hasOnlyPositives) inputMode = "text";
      else if (isIOS() && hasDecimals) inputMode = "decimal";
      else if (isAndroid() && hasDecimals && hasOnlyPositives)
        inputMode = "decimal";
      this.inputElement.inputMode = inputMode;
    }
    if (changes.has("focused") && this.focused && !this.hasRecentlyReceivedPointerDown && !!this.formatOptions.unit) {
      this.setSelectionRange(0, this.displayValue.length);
    }
  }
}
__decorateClass([
  query(".buttons")
], NumberField.prototype, "buttons", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], NumberField.prototype, "focused", 2);
__decorateClass([
  property({ type: Object, attribute: "format-options" })
], NumberField.prototype, "formatOptions", 2);
__decorateClass([
  property({ type: Boolean, reflect: true, attribute: "hide-stepper" })
], NumberField.prototype, "hideStepper", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], NumberField.prototype, "indeterminate", 2);
__decorateClass([
  property({ type: Boolean, reflect: true, attribute: "keyboard-focused" })
], NumberField.prototype, "keyboardFocused", 2);
__decorateClass([
  property({ type: Number })
], NumberField.prototype, "max", 2);
__decorateClass([
  property({ type: Number })
], NumberField.prototype, "min", 2);
__decorateClass([
  property({ type: Number })
], NumberField.prototype, "step", 2);
__decorateClass([
  property({ type: Number, reflect: true, attribute: "step-modifier" })
], NumberField.prototype, "stepModifier", 2);
__decorateClass([
  property({ type: Number })
], NumberField.prototype, "value", 1);
//# sourceMappingURL=NumberField.dev.js.map

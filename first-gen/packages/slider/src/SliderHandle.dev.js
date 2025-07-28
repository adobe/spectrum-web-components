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
import { property } from "@spectrum-web-components/base/src/decorators.js";
import { Focusable } from "@spectrum-web-components/shared/src/focusable.js";
import {
  LanguageResolutionController,
  languageResolverUpdatedSymbol
} from "@spectrum-web-components/reactive-controllers/src/LanguageResolution.js";
import {
  NumberFormatter
} from "@internationalized/number";
export const defaultNormalization = {
  toNormalized(value, min, max) {
    return (value - min) / (max - min);
  },
  fromNormalized(value, min, max) {
    return value * (max - min) + min;
  }
};
const MinConverter = {
  fromAttribute: (value) => {
    if (value === "previous") return value;
    return parseFloat(value);
  },
  toAttribute: (value) => {
    return value.toString();
  }
};
const MaxConverter = {
  fromAttribute: (value) => {
    if (value === "next") return value;
    return parseFloat(value);
  },
  toAttribute: (value) => {
    return value.toString();
  }
};
export class SliderHandle extends Focusable {
  constructor() {
    super(...arguments);
    this._forcedUnit = "";
    this.dragging = false;
    this.highlight = false;
    this.name = "";
    this.label = "";
    this.getAriaHandleText = (value, numberFormat) => {
      return numberFormat.format(value);
    };
    this.languageResolver = new LanguageResolutionController(this);
    this.normalization = defaultNormalization;
  }
  get handleName() {
    return this.name;
  }
  get focusElement() {
    var _a, _b;
    return (_b = (_a = this.handleController) == null ? void 0 : _a.inputForHandle(this)) != null ? _b : this;
  }
  update(changes) {
    var _a, _b;
    if (!this.hasUpdated) {
      const { max, min } = this;
      if (this.value == null) {
        if (!isNaN(max) && !isNaN(min)) {
          this.value = max < min ? min : min + (max - min) / 2;
          (_a = this.handleController) == null ? void 0 : _a.hostUpdate();
        }
      }
    }
    if (changes.has("formatOptions") || changes.has(languageResolverUpdatedSymbol)) {
      delete this._numberFormatCache;
    }
    if (changes.has("value")) {
      const oldValue = changes.get("value");
      if (oldValue != null) {
        this.updateComplete.then(() => {
          var _a2;
          (_a2 = this.handleController) == null ? void 0 : _a2.setValueFromHandle(this);
        });
      }
    }
    (_b = this.handleController) == null ? void 0 : _b.handleHasChanged(this);
    super.update(changes);
  }
  firstUpdated(changedProperties) {
    super.firstUpdated(changedProperties);
    this.dispatchEvent(new CustomEvent("sp-slider-handle-ready"));
  }
  dispatchInputEvent() {
    const inputEvent = new Event("input", {
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(inputEvent);
  }
  getNumberFormat() {
    var _a;
    if (!this._numberFormatCache || this.languageResolver.language !== this._numberFormatCache.language) {
      let numberFormatter;
      try {
        numberFormatter = new NumberFormatter(
          this.languageResolver.language,
          this.formatOptions
        );
        this._forcedUnit = "";
      } catch (error) {
        const {
          style,
          unit,
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          unitDisplay,
          ...formatOptionsNoUnit
        } = this.formatOptions || {};
        if (style === "unit") {
          this._forcedUnit = unit;
        }
        numberFormatter = new NumberFormatter(
          this.languageResolver.language,
          formatOptionsNoUnit
        );
      }
      this._numberFormatCache = {
        language: this.languageResolver.language,
        numberFormat: numberFormatter
      };
    }
    return (_a = this._numberFormatCache) == null ? void 0 : _a.numberFormat;
  }
  get numberFormat() {
    if (!this.formatOptions) return;
    return this.getNumberFormat();
  }
}
__decorateClass([
  property({ type: Number })
], SliderHandle.prototype, "value", 2);
__decorateClass([
  property({ type: Number, attribute: "default-value" })
], SliderHandle.prototype, "defaultValue", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], SliderHandle.prototype, "dragging", 2);
__decorateClass([
  property({ type: Boolean })
], SliderHandle.prototype, "highlight", 2);
__decorateClass([
  property({ type: String })
], SliderHandle.prototype, "name", 2);
__decorateClass([
  property({ reflect: true, converter: MinConverter })
], SliderHandle.prototype, "min", 2);
__decorateClass([
  property({ reflect: true, converter: MaxConverter })
], SliderHandle.prototype, "max", 2);
__decorateClass([
  property({ type: Number, reflect: true })
], SliderHandle.prototype, "step", 2);
__decorateClass([
  property({ type: Object, attribute: "format-options" })
], SliderHandle.prototype, "formatOptions", 2);
__decorateClass([
  property({ type: String })
], SliderHandle.prototype, "label", 2);
__decorateClass([
  property({ attribute: false })
], SliderHandle.prototype, "getAriaHandleText", 2);
__decorateClass([
  property({ attribute: false })
], SliderHandle.prototype, "normalization", 2);
//# sourceMappingURL=SliderHandle.dev.js.map

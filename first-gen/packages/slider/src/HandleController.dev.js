"use strict";
import { html } from "@spectrum-web-components/base";
import {
  classMap,
  ifDefined,
  styleMap
} from "@spectrum-web-components/base/src/directives.js";
import { MutationController } from "@lit-labs/observers/mutation-controller.js";
import { SliderHandle } from "./SliderHandle.dev.js";
export class HandleController {
  constructor(host) {
    this.handles = /* @__PURE__ */ new Map();
    this.model = [];
    this.handleOrder = [];
    this.handleOrientation = () => {
      this.updateBoundingRect();
    };
    this.extractModelFromLightDom = () => {
      let handles = [
        ...this.host.querySelectorAll('[slot="handle"]')
      ];
      if (handles.length === 0) {
        handles = [this.host];
      }
      if (handles.some((h) => this.waitForUpgrade(h))) {
        return;
      }
      this.handles = /* @__PURE__ */ new Map();
      this.handleOrder = [];
      handles.forEach((handle, index) => {
        var _a;
        if (!((_a = handle.handleName) == null ? void 0 : _a.length)) {
          handle.name = `handle${index + 1}`;
        }
        this.handles.set(handle.handleName, handle);
        this.handleOrder.push(handle.handleName);
        handle.handleController = this;
      });
      this.requestUpdate();
    };
    /**
     * Keep the slider value property in sync with the input element's value
     */
    this.onInputChange = (event) => {
      const input = event.target;
      input.model.handle.value = input.valueAsNumber;
      this.requestUpdate();
      this.dispatchChangeEvent(input, input.model.handle);
    };
    this.onInputFocus = (event) => {
      const input = event.target;
      let isFocusVisible;
      try {
        isFocusVisible = input.matches(":focus-visible") || this.host.matches(".focus-visible");
      } catch (error) {
        isFocusVisible = this.host.matches(".focus-visible");
      }
      input.model.handle.highlight = isFocusVisible;
      this.requestUpdate();
    };
    this.onInputBlur = (event) => {
      const input = event.target;
      input.model.handle.highlight = false;
      this.requestUpdate();
    };
    this.onInputKeydown = (event) => {
      var _a;
      if (event.key == "Escape") {
        const input2 = event.target;
        if (((_a = input2.model.handle) == null ? void 0 : _a.defaultValue) !== void 0 && input2.model.handle.value !== input2.model.handle.defaultValue) {
          input2.model.handle.value = input2.model.handle.defaultValue;
          input2.model.handle.dispatchInputEvent();
          this.dispatchChangeEvent(input2, input2.model.handle);
          this.requestUpdate();
          event.preventDefault();
          event.stopPropagation();
        }
        return;
      }
      const input = event.target;
      input.model.handle.highlight = true;
      this.requestUpdate();
    };
    this.host = host;
    new MutationController(this.host, {
      config: {
        subtree: true,
        childList: true
      },
      callback: () => {
        this.extractModelFromLightDom();
      }
    });
    this.extractModelFromLightDom();
  }
  get values() {
    const result = {};
    for (const model of this.handles.values()) {
      result[model.handleName] = model.value;
    }
    return result;
  }
  get size() {
    return this.handles.size;
  }
  inputForHandle(handle) {
    if (this.handles.has(handle.handleName)) {
      const { input } = this.getHandleElements(handle) || {};
      return input;
    }
    throw new Error(`No input for handle "${handle.name}"`);
  }
  requestUpdate() {
    if (this.host.hasUpdated) {
      this.host.requestUpdate();
    }
  }
  /**
   * It is possible for value attributes to be set programmatically. The <input>
   * for a particular slider needs to have an opportunity to validate any such
   * values
   *
   * @param handle Handle who's value needs validation
   */
  setValueFromHandle(handle) {
    const elements = this.getHandleElements(handle);
    if (!elements) return;
    const { input } = elements;
    input.valueAsNumber = handle.value;
    this.requestUpdate();
    handle.value = input.valueAsNumber;
    if (handle.dragging) {
      handle.dispatchInputEvent();
    }
  }
  handleHasChanged(handle) {
    if (handle !== this.host) {
      this.requestUpdate();
    }
  }
  formattedValueForHandle(model) {
    var _a;
    const { handle } = model;
    const numberFormat = (_a = handle.numberFormat) != null ? _a : this.host.numberFormat;
    const _forcedUnit = handle._forcedUnit === "" ? this.host._forcedUnit : handle._forcedUnit;
    return handle.getAriaHandleText(model.value, numberFormat) + _forcedUnit;
  }
  get formattedValues() {
    const result = /* @__PURE__ */ new Map();
    for (const model of this.model) {
      result.set(model.name, this.formattedValueForHandle(model));
    }
    return result;
  }
  get focusElement() {
    const { input } = this.getActiveHandleElements();
    if (!input || this.host.editable && !input.model.handle.dragging) {
      return this.host.numberField;
    }
    return input;
  }
  hostConnected() {
    if ("orientation" in screen) {
      screen.orientation.addEventListener(
        "change",
        this.handleOrientation
      );
    } else {
      window.addEventListener(
        "orientationchange",
        this.handleOrientation
      );
    }
  }
  hostDisconnected() {
    if ("orientation" in screen) {
      screen.orientation.removeEventListener(
        "change",
        this.handleOrientation
      );
    } else {
      window.removeEventListener(
        "orientationchange",
        this.handleOrientation
      );
    }
  }
  hostUpdate() {
    this.updateModel();
  }
  // Since extractModelFromLightDom bails on the first un-upgraded handle,
  // a maximum of one listener will be set up per extraction attempt.
  waitForUpgrade(handle) {
    if (handle instanceof SliderHandle) {
      return false;
    }
    handle.addEventListener(
      "sp-slider-handle-ready",
      () => this.extractModelFromLightDom(),
      { once: true, passive: true }
    );
    return true;
  }
  get activeHandle() {
    return this.handleOrder[this.handleOrder.length - 1];
  }
  get activeHandleInputId() {
    const active = this.activeHandle;
    const index = this.model.findIndex((model) => model.name === active);
    return `input-${index}`;
  }
  activateHandle(name) {
    const index = this.handleOrder.findIndex((item) => item === name);
    if (index >= 0) {
      this.handleOrder.splice(index, 1);
    }
    this.handleOrder.push(name);
  }
  get activeHandleModel() {
    const active = this.activeHandle;
    return this.model.find((model) => model.name === active);
  }
  getActiveHandleElements() {
    const name = this.activeHandle;
    const handleSlider = this.handles.get(name);
    const elements = this.getHandleElements(
      handleSlider
    );
    return { model: handleSlider, ...elements };
  }
  getHandleElements(sliderHandle) {
    if (!this.handleRefMap) {
      this.handleRefMap = /* @__PURE__ */ new WeakMap();
      const inputNodes = this.host.shadowRoot.querySelectorAll(".handle > input");
      for (const inputNode of inputNodes) {
        const input = inputNode;
        const handle = input.parentElement;
        const model = this.handles.get(
          handle.getAttribute("name")
        );
        if (model) {
          this.handleRefMap.set(model, { input, handle });
        }
      }
    }
    const components = this.handleRefMap.get(
      sliderHandle
    );
    return components;
  }
  clearHandleComponentCache() {
    delete this.handleRefMap;
  }
  get boundingClientRect() {
    if (!this._boundingClientRect) {
      this._boundingClientRect = this.host.track.getBoundingClientRect();
    }
    return this._boundingClientRect;
  }
  updateBoundingRect() {
    delete this._boundingClientRect;
  }
  /**
   * Return the `input` and `model` associated with the event and
   * whether the `input` is a `resolvedInput` meaning it was acquired
   * from the `model` rather than the event.
   */
  extractDataFromEvent(event) {
    if (!this._activePointerEventData) {
      let input = event.target.querySelector(
        ":scope > .input"
      );
      const resolvedInput = !input;
      const model = input ? input.model : this.model.find((item) => item.name === this.activeHandle);
      if (!input && !!model) {
        input = model.handle.focusElement;
      }
      this._activePointerEventData = {
        input,
        model,
        resolvedInput
      };
    }
    return this._activePointerEventData;
  }
  /**
   * @description check for defaultvalue(value) property in sp-slider and reset on double click on sliderHandle
   * @param event
   */
  handleDoubleClick(event) {
    var _a;
    const input = event.target.querySelector(
      ".input"
    );
    if (((_a = input.model) == null ? void 0 : _a.handle.defaultValue) !== void 0) {
      input.model.handle.value = input.model.handle.defaultValue;
      this.dispatchChangeEvent(input, input.model.handle);
      input.model.handle.dispatchInputEvent();
      this.requestUpdate();
    }
  }
  handlePointerdown(event) {
    const { resolvedInput, model } = this.extractDataFromEvent(event);
    if (!model || this.host.disabled || event.button !== 0) {
      event.preventDefault();
      return;
    }
    this.host.track.setPointerCapture(event.pointerId);
    this.updateBoundingRect();
    if (event.pointerType === "mouse") {
      this.host.labelEl.click();
    }
    this.draggingHandle = model.handle;
    model.handle.dragging = true;
    this.activateHandle(model.name);
    if (resolvedInput) {
      this.handlePointermove(event);
    }
    this.requestUpdate();
  }
  handlePointerup(event) {
    const { input, model } = this.extractDataFromEvent(event);
    delete this._activePointerEventData;
    if (!model) return;
    if (event.pointerType === "mouse") {
      this.host.labelEl.click();
    }
    this.cancelDrag(model);
    this.requestUpdate();
    this.host.track.releasePointerCapture(event.pointerId);
    this.dispatchChangeEvent(input, model.handle);
  }
  handlePointermove(event) {
    const { input, model } = this.extractDataFromEvent(event);
    if (!model) return;
    if (!this.draggingHandle) {
      return;
    }
    input.value = this.calculateHandlePosition(event, model).toString();
    model.handle.value = parseFloat(input.value);
    this.host.indeterminate = false;
    this.requestUpdate();
  }
  cancelDrag(model) {
    model = model || this.model.find((item) => item.name === this.activeHandle);
    if (!model) return;
    model.handle.highlight = false;
    delete this.draggingHandle;
    model.handle.dragging = false;
  }
  dispatchChangeEvent(input, handle) {
    input.valueAsNumber = handle.value;
    const changeEvent = new Event("change", {
      bubbles: true,
      composed: true
    });
    handle.dispatchEvent(changeEvent);
  }
  /**
   * Returns the value under the cursor
   * @param: PointerEvent on slider
   * @return: Slider value that correlates to the position under the pointer
   */
  calculateHandlePosition(event, model) {
    const rect = this.boundingClientRect;
    const minOffset = rect.left;
    const offset = event.clientX;
    const size = rect.width;
    const directionalOffset = this.host.isLTR ? offset - minOffset : size - (offset - minOffset);
    const normalized = directionalOffset / size;
    return model.normalization.fromNormalized(
      normalized,
      model.range.min,
      model.range.max
    );
  }
  renderHandle(model, index, zIndex, isMultiHandle) {
    var _a;
    const classes = {
      handle: true,
      dragging: ((_a = this.draggingHandle) == null ? void 0 : _a.handleName) === model.name,
      "handle-highlight": model.highlight
    };
    const style = {
      [this.host.isLTR ? "left" : "right"]: `${model.normalizedValue * 100}%`,
      "z-index": zIndex.toString(),
      ...isMultiHandle && {
        "background-color": `var(--spectrum-slider-handle-background-color-${index}, var(--spectrum-slider-handle-background-color))`,
        "border-color": `var(--spectrum-slider-handle-border-color-${index}, var(--spectrum-slider-handle-border-color))`
      }
    };
    const ariaLabelledBy = isMultiHandle ? `label input-${index}` : "label";
    return html`
            <div
                class=${classMap(classes)}
                name=${model.name}
                style=${styleMap(style)}
                role="presentation"
            >
                <input
                    type="range"
                    class="input"
                    id="input-${index}"
                    min=${model.clamp.min}
                    max=${model.clamp.max}
                    step=${model.step}
                    value=${model.value}
                    aria-disabled=${ifDefined(
      this.host.disabled ? "true" : void 0
    )}
                    tabindex=${ifDefined(this.host.editable ? -1 : void 0)}
                    aria-label=${ifDefined(model.ariaLabel)}
                    aria-labelledby=${ariaLabelledBy}
                    aria-valuetext=${this.formattedValueForHandle(model)}
                    aria-describedby="slider-description"
                    @change=${this.onInputChange}
                    @focus=${this.onInputFocus}
                    @blur=${this.onInputBlur}
                    @keydown=${this.onInputKeydown}
                    .model=${model}
                />
                <span id="slider-description">
                    Press escape or double click to reset the slider to its
                    default value.
                </span>
            </div>
        `;
  }
  render() {
    this.clearHandleComponentCache();
    return this.model.map((model, index) => {
      const zIndex = this.handleOrder.indexOf(model.name) + 2;
      return this.renderHandle(
        model,
        index,
        zIndex,
        this.model.length > 1
      );
    });
  }
  /**
   * Returns a list of track segment [start, end] tuples where the values are
   * normalized to be between 0 and 1.
   * @returns A list of track segment tuples [start, end]
   */
  trackSegments() {
    const values = this.model.map((model) => model.normalizedValue);
    values.sort((a, b) => a - b);
    values.unshift(0);
    return values.map((value, index, array) => {
      var _a;
      return [
        value,
        (_a = array[index + 1]) != null ? _a : 1
      ];
    });
  }
  updateModel() {
    const handles = [...this.handles.values()];
    const getRangeAndClamp = (index) => {
      const handle = handles[index];
      const previous = handles[index - 1];
      const next = handles[index + 1];
      const min = typeof handle.min === "number" ? handle.min : this.host.min;
      const max = typeof handle.max === "number" ? handle.max : this.host.max;
      const result = {
        range: { min, max },
        clamp: { min, max }
      };
      if (handle.min === "previous") {
        if (previous) {
          for (let j = index - 1; j >= 0; j--) {
            const item = handles[j];
            if (typeof item.min === "number") {
              result.range.min = item.min;
              break;
            }
          }
          result.clamp.min = Math.max(
            previous.value,
            result.range.min
          );
        }
        if (true) {
          if (!previous) {
            window.__swc.warn(
              this.host,
              `<sp-slider-handle> elements that are the first child of an <sp-slider> element cannot have attribute "min='previous'"\``,
              "https://opensource.adobe.com/spectrum-web-components/components/slider-handle/#multi-handle-slider-with-ordered-handles"
            );
          }
        }
      }
      if (handle.max === "next") {
        if (next) {
          for (let j = index + 1; j < handles.length; j++) {
            const item = handles[j];
            if (typeof item.max === "number") {
              result.range.max = item.max;
              break;
            }
          }
          result.clamp.max = Math.min(next.value, result.range.max);
        }
        if (true) {
          if (!next) {
            window.__swc.warn(
              this.host,
              `<sp-slider-handle> elements that are the last child of an <sp-slider> element cannot have attribute "max='next'"`,
              "https://opensource.adobe.com/spectrum-web-components/components/slider-handle/#multi-handle-slider-with-ordered-handles"
            );
          }
        }
      }
      return result;
    };
    const modelValues = handles.map((handle, index) => {
      var _a;
      const rangeAndClamp = getRangeAndClamp(index);
      const { toNormalized } = handle.normalization;
      const clampedValue = Math.max(
        Math.min(handle.value, rangeAndClamp.clamp.max),
        rangeAndClamp.clamp.min
      );
      const normalizedValue = toNormalized(
        clampedValue,
        rangeAndClamp.range.min,
        rangeAndClamp.range.max
      );
      const model = {
        name: handle.handleName,
        value: clampedValue,
        normalizedValue,
        highlight: handle.highlight,
        step: (_a = handle.step) != null ? _a : this.host.step,
        normalization: handle.normalization,
        handle,
        ariaLabel: handle !== this.host && (handle == null ? void 0 : handle.label.length) > 0 ? handle.label : void 0,
        ...rangeAndClamp
      };
      return model;
    });
    this.model = modelValues;
  }
  async handleUpdatesComplete() {
    const updates = [...this.handles.values()].filter((handle) => handle !== this.host).map((handle) => handle.updateComplete);
    await Promise.all(updates);
  }
}
//# sourceMappingURL=HandleController.dev.js.map

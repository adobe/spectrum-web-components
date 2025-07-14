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
  ifDefined,
  live
} from "@spectrum-web-components/base/src/directives.js";
import {
  property,
  query,
  state
} from "@spectrum-web-components/base/src/decorators.js";
import { ManageHelpText } from "@spectrum-web-components/help-text/src/manage-help-text.js";
import { Focusable } from "@spectrum-web-components/shared/src/focusable.js";
import "@spectrum-web-components/icons-ui/icons/sp-icon-checkmark100.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-alert.js";
import textfieldStyles from "./textfield.css.js";
import checkmarkStyles from "@spectrum-web-components/icon/src/spectrum-icon-checkmark.css.js";
const textfieldTypes = ["text", "url", "tel", "email", "password"];
export class TextfieldBase extends ManageHelpText(
  SizedMixin(Focusable, {
    noDefaultSize: true
  })
) {
  constructor() {
    super(...arguments);
    this.allowedKeys = "";
    this.focused = false;
    this.invalid = false;
    this.label = "";
    this.placeholder = "";
    this._type = "text";
    this.grows = false;
    this.maxlength = -1;
    this.minlength = -1;
    this.multiline = false;
    this.readonly = false;
    this.rows = -1;
    this.valid = false;
    this._value = "";
    this.quiet = false;
    this.required = false;
  }
  static get styles() {
    return [textfieldStyles, checkmarkStyles];
  }
  set type(val) {
    const prev = this._type;
    this._type = val;
    this.requestUpdate("type", prev);
  }
  get type() {
    var _a;
    return (_a = textfieldTypes.find((t) => t === this._type)) != null ? _a : "text";
  }
  set value(value) {
    if (value === this.value) {
      return;
    }
    const oldValue = this._value;
    this._value = value;
    this.requestUpdate("value", oldValue);
  }
  get value() {
    return this._value;
  }
  get focusElement() {
    return this.inputElement;
  }
  /**
   * Sets the start and end positions of the current selection.
   *
   * @param selectionStart The 0-based index of the first selected character. An index greater than the length of the
   *  element's value is treated as pointing to the end of the value.
   * @param selectionEnd The 0-based index of the character after the last selected character. An index greater than
   *  the length of the element's value is treated as pointing to the end of the value.
   * @param [selectionDirection="none"] A string indicating the direction in which the selection is considered to
   *  have been performed.
   */
  setSelectionRange(selectionStart, selectionEnd, selectionDirection = "none") {
    this.inputElement.setSelectionRange(
      selectionStart,
      selectionEnd,
      selectionDirection
    );
  }
  /**
   * Selects all the text.
   */
  select() {
    this.inputElement.select();
  }
  handleInput(_event) {
    if (this.allowedKeys && this.inputElement.value) {
      const regExp = new RegExp(`^[${this.allowedKeys}]*$`, "u");
      if (!regExp.test(this.inputElement.value)) {
        const selectionStart = this.inputElement.selectionStart;
        const nextSelectStart = selectionStart - 1;
        this.inputElement.value = this.value.toString();
        this.inputElement.setSelectionRange(
          nextSelectStart,
          nextSelectStart
        );
        return;
      }
    }
    this.value = this.inputElement.value;
  }
  handleChange() {
    this.dispatchEvent(
      new Event("change", {
        bubbles: true,
        composed: true
      })
    );
  }
  onFocus() {
    this.focused = !this.readonly && true;
  }
  onBlur(_event) {
    this.focused = !this.readonly && false;
  }
  handleInputElementPointerdown() {
  }
  renderStateIcons() {
    if (this.invalid) {
      return html`
                <sp-icon-alert id="invalid" class="icon"></sp-icon-alert>
            `;
    } else if (this.valid) {
      return html`
                <sp-icon-checkmark100
                    id="valid"
                    class="icon spectrum-UIIcon-Checkmark100"
                ></sp-icon-checkmark100>
            `;
    }
    return nothing;
  }
  get displayValue() {
    return this.value.toString();
  }
  // prettier-ignore
  get renderMultiline() {
    return html`
            ${this.multiline && this.grows && this.rows === -1 ? html`
                      <div id="sizer" class="input" aria-hidden="true">${this.value}&#8203;
                      </div>
                  ` : nothing}
            <!-- @ts-ignore -->
            <textarea
                name=${ifDefined(this.name || void 0)}
                aria-describedby=${this.helpTextId}
                aria-label=${this.label || this.appliedLabel || this.placeholder}
                aria-invalid=${ifDefined(this.invalid || void 0)}
                class="input"
                maxlength=${ifDefined(
      this.maxlength > -1 ? this.maxlength : void 0
    )}
                minlength=${ifDefined(
      this.minlength > -1 ? this.minlength : void 0
    )}
                title=${this.invalid ? "" : nothing}
                pattern=${ifDefined(this.pattern)}
                placeholder=${this.placeholder}
                .value=${this.displayValue}
                @change=${this.handleChange}
                @input=${this.handleInput}
                @focus=${this.onFocus}
                @blur=${this.onBlur}
                ?disabled=${this.disabled}
                ?required=${this.required}
                ?readonly=${this.readonly}
                rows=${ifDefined(this.rows > -1 ? this.rows : void 0)}
                autocomplete=${ifDefined(this.autocomplete)}
            ></textarea>
        `;
  }
  get renderInput() {
    return html`
            <!-- @ts-ignore -->
            <input
                name=${ifDefined(this.name || void 0)}
                type=${this.type}
                aria-describedby=${this.helpTextId}
                aria-label=${this.label || this.appliedLabel || this.placeholder}
                aria-invalid=${ifDefined(this.invalid || void 0)}
                class="input"
                title=${this.invalid ? "" : nothing}
                maxlength=${ifDefined(
      this.maxlength > -1 ? this.maxlength : void 0
    )}
                minlength=${ifDefined(
      this.minlength > -1 ? this.minlength : void 0
    )}
                pattern=${ifDefined(this.pattern)}
                placeholder=${this.placeholder}
                .value=${live(this.displayValue)}
                @change=${this.handleChange}
                @input=${this.handleInput}
                @pointerdown=${this.handleInputElementPointerdown}
                @focus=${this.onFocus}
                @blur=${this.onBlur}
                ?disabled=${this.disabled}
                ?required=${this.required}
                ?readonly=${this.readonly}
                autocomplete=${ifDefined(this.autocomplete)}
            />
        `;
  }
  renderField() {
    return html`
            ${this.renderStateIcons()}
            ${this.multiline ? this.renderMultiline : this.renderInput}
        `;
  }
  render() {
    return html`
            <div id="textfield">${this.renderField()}</div>
            ${this.renderHelpText(this.invalid)}
        `;
  }
  update(changedProperties) {
    if (changedProperties.has("value") || changedProperties.has("required") && this.required) {
      this.updateComplete.then(() => {
        this.checkValidity();
      });
    }
    super.update(changedProperties);
  }
  checkValidity() {
    let validity = this.inputElement.checkValidity();
    if (this.required || this.value && this.pattern) {
      if ((this.disabled || this.multiline) && this.pattern) {
        const regex = new RegExp(`^${this.pattern}$`, "u");
        validity = regex.test(this.value.toString());
      }
      if (typeof this.minlength !== "undefined") {
        validity = validity && this.value.toString().length >= this.minlength;
      }
      this.valid = validity;
      this.invalid = !validity;
    }
    return validity;
  }
}
__decorateClass([
  state()
], TextfieldBase.prototype, "appliedLabel", 2);
__decorateClass([
  property({ attribute: "allowed-keys" })
], TextfieldBase.prototype, "allowedKeys", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], TextfieldBase.prototype, "focused", 2);
__decorateClass([
  query(".input:not(#sizer)")
], TextfieldBase.prototype, "inputElement", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], TextfieldBase.prototype, "invalid", 2);
__decorateClass([
  property()
], TextfieldBase.prototype, "label", 2);
__decorateClass([
  property({ type: String, reflect: true })
], TextfieldBase.prototype, "name", 2);
__decorateClass([
  property()
], TextfieldBase.prototype, "placeholder", 2);
__decorateClass([
  state()
], TextfieldBase.prototype, "type", 1);
__decorateClass([
  property({ attribute: "type", reflect: true })
], TextfieldBase.prototype, "_type", 2);
__decorateClass([
  property()
], TextfieldBase.prototype, "pattern", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], TextfieldBase.prototype, "grows", 2);
__decorateClass([
  property({ type: Number })
], TextfieldBase.prototype, "maxlength", 2);
__decorateClass([
  property({ type: Number })
], TextfieldBase.prototype, "minlength", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], TextfieldBase.prototype, "multiline", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], TextfieldBase.prototype, "readonly", 2);
__decorateClass([
  property({ type: Number })
], TextfieldBase.prototype, "rows", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], TextfieldBase.prototype, "valid", 2);
__decorateClass([
  property({ type: String })
], TextfieldBase.prototype, "value", 1);
__decorateClass([
  property({ type: Boolean, reflect: true })
], TextfieldBase.prototype, "quiet", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], TextfieldBase.prototype, "required", 2);
__decorateClass([
  property({ type: String, reflect: true })
], TextfieldBase.prototype, "autocomplete", 2);
export class Textfield extends TextfieldBase {
  constructor() {
    super(...arguments);
    this._value = "";
  }
  set value(value) {
    if (value === this.value) {
      return;
    }
    const oldValue = this._value;
    this._value = value;
    this.requestUpdate("value", oldValue);
  }
  get value() {
    return this._value;
  }
}
__decorateClass([
  property({ type: String })
], Textfield.prototype, "value", 1);
//# sourceMappingURL=Textfield.dev.js.map

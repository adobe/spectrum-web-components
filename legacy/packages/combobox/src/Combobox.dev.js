"use strict";
import {
  html,
  nothing
} from "@spectrum-web-components/base";
import { ComboboxBase } from "./combobox.base.dev.js";
import {
  ifDefined,
  live,
  repeat
} from "@spectrum-web-components/base/src/directives.js";
import "@spectrum-web-components/overlay/sp-overlay.js";
import "@spectrum-web-components/icons-ui/icons/sp-icon-chevron100.js";
import "@spectrum-web-components/popover/sp-popover.js";
import "@spectrum-web-components/menu/sp-menu.js";
import "@spectrum-web-components/menu/sp-menu-item.js";
import "@spectrum-web-components/picker-button/sp-picker-button.js";
import chevronStyles from "@spectrum-web-components/icon/src/spectrum-icon-chevron.css.js";
import styles from "./combobox.css.js";
export class Combobox extends ComboboxBase {
  static get styles() {
    return [...super.styles, chevronStyles, styles];
  }
  renderAppliedLabel() {
    const appliedLabel = this.label || this.appliedLabel;
    return html`
            ${this.pending ? html`
                      <span
                          aria-hidden="true"
                          class="visually-hidden"
                          id="pending-label"
                      >
                          ${this.pendingLabel}
                      </span>
                  ` : nothing}
            ${this.value ? html`
                      <span
                          aria-hidden="true"
                          class="visually-hidden"
                          id="applied-label"
                      >
                          ${appliedLabel}
                      </span>
                      <slot name="label" id="label">
                          <span class="visually-hidden" aria-hidden="true">
                              ${this.value}
                          </span>
                      </slot>
                  ` : html`
                      <span hidden id="applied-label">${appliedLabel}</span>
                  `}
        `;
  }
  renderLoader() {
    import("@spectrum-web-components/progress-circle/sp-progress-circle.js");
    return html`
            <sp-progress-circle
                size="s"
                indeterminate
                aria-hidden="true"
                class="progress-circle"
            ></sp-progress-circle>
        `;
  }
  renderField() {
    return html`
            ${this.renderStateIcons()}
            <input
                aria-activedescendant=${ifDefined(
      this.activeDescendant ? `${this.activeDescendant.value}` : void 0
    )}
                aria-autocomplete=${ifDefined(
      this.autocomplete
    )}
                aria-controls=${ifDefined(
      this.open ? "listbox-menu" : void 0
    )}
                aria-describedby="${this.helpTextId} tooltip"
                aria-expanded="${this.open ? "true" : "false"}"
                aria-label=${ifDefined(this.label || this.appliedLabel)}
                aria-labelledby="pending-label applied-label label"
                aria-invalid=${ifDefined(this.invalid || void 0)}
                autocomplete="off"
                @click=${this.toggleOpen}
                @keydown=${this.handleComboboxKeydown}
                id="input"
                class="input"
                role="combobox"
                type="text"
                .value=${live(this.displayValue)}
                tabindex="0"
                @sp-closed=${this.handleClosed}
                @sp-opened=${this.handleOpened}
                maxlength=${ifDefined(
      this.maxlength > -1 ? this.maxlength : void 0
    )}
                minlength=${ifDefined(
      this.minlength > -1 ? this.minlength : void 0
    )}
                pattern=${ifDefined(this.pattern)}
                @change=${this.handleChange}
                @input=${this.handleInput}
                @focus=${this.onFocus}
                @blur=${this.onBlur}
                ?disabled=${this.disabled}
                ?required=${this.required}
                ?readonly=${this.readonly}
            />
            ${this.pendingStateController.renderPendingState()}
        `;
  }
  render() {
    const width = (this.input || this).offsetWidth;
    return html`
            ${super.render()}
            <sp-picker-button
                aria-controls="listbox-menu"
                aria-describedby="${this.helpTextId} tooltip"
                aria-expanded=${this.open ? "true" : "false"}
                aria-label=${ifDefined(this.label || this.appliedLabel)}
                aria-labelledby="applied-label label"
                @click=${this.toggleOpen}
                tabindex="-1"
                class="button ${this.focused ? "focus-visible is-keyboardFocused" : ""}"
                ?disabled=${this.disabled}
                ?focused=${this.focused}
                ?quiet=${this.quiet}
                size=${this.size}
            ></sp-picker-button>
            <sp-overlay
                ?open=${this.open}
                .triggerElement=${this.input}
                offset="0"
                placement="bottom-start"
                .receivesFocus=${"false"}
                role="presentation"
            >
                <sp-popover
                    id="listbox"
                    ?open=${this.open}
                    role="presentation"
                    ?hidden=${this.availableOptions.length === 0}
                >
                    <sp-menu
                        @change=${this.handleMenuChange}
                        tabindex="-1"
                        aria-labelledby="label applied-label"
                        aria-label=${ifDefined(this.label || this.appliedLabel)}
                        id="listbox-menu"
                        role="listbox"
                        selects=${ifDefined(
      this.autocomplete === "none" ? "single" : void 0
    )}
                        .selected=${this.autocomplete === "none" && this.itemValue ? [this.itemValue] : []}
                        style="min-width: ${width}px;"
                        size=${this.size}
                    >
                        ${this.overlayOpen ? repeat(
      this.availableOptions,
      (option) => option.value,
      (option) => {
        var _a, _b;
        return html`
                                          <sp-menu-item
                                              id="${option.value}"
                                              ?focused=${((_a = this.activeDescendant) == null ? void 0 : _a.value) === option.value}
                                              aria-selected=${((_b = this.activeDescendant) == null ? void 0 : _b.value) === option.value ? "true" : "false"}
                                              .value=${option.value}
                                              .selected=${option.value === this.itemValue}
                                              ?disabled=${option.disabled}
                                          >
                                              ${option.itemText}
                                          </sp-menu-item>
                                      `;
      }
    ) : html``}
                        <slot
                            hidden
                            @slotchange=${this.handleSlotchange}
                        ></slot>
                    </sp-menu>
                </sp-popover>
            </sp-overlay>
            ${this.renderAppliedLabel()}
            <slot
                aria-hidden="true"
                name="tooltip"
                id="tooltip"
                @slotchange=${this.handleTooltipSlotchange}
            ></slot>
        `;
  }
}
//# sourceMappingURL=Combobox.dev.js.map

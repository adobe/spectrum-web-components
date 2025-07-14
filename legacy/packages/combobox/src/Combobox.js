"use strict";import{html as i,nothing as n}from"@spectrum-web-components/base";import{ComboboxBase as d}from"./combobox.base.js";import{ifDefined as e,live as r,repeat as o}from"@spectrum-web-components/base/src/directives.js";import"@spectrum-web-components/overlay/sp-overlay.js";import"@spectrum-web-components/icons-ui/icons/sp-icon-chevron100.js";import"@spectrum-web-components/popover/sp-popover.js";import"@spectrum-web-components/menu/sp-menu.js";import"@spectrum-web-components/menu/sp-menu-item.js";import"@spectrum-web-components/picker-button/sp-picker-button.js";import p from"@spectrum-web-components/icon/src/spectrum-icon-chevron.css.js";import h from"./combobox.css.js";export class Combobox extends d{static get styles(){return[...super.styles,p,h]}renderAppliedLabel(){const l=this.label||this.appliedLabel;return i`
            ${this.pending?i`
                      <span
                          aria-hidden="true"
                          class="visually-hidden"
                          id="pending-label"
                      >
                          ${this.pendingLabel}
                      </span>
                  `:n}
            ${this.value?i`
                      <span
                          aria-hidden="true"
                          class="visually-hidden"
                          id="applied-label"
                      >
                          ${l}
                      </span>
                      <slot name="label" id="label">
                          <span class="visually-hidden" aria-hidden="true">
                              ${this.value}
                          </span>
                      </slot>
                  `:i`
                      <span hidden id="applied-label">${l}</span>
                  `}
        `}renderLoader(){return import("@spectrum-web-components/progress-circle/sp-progress-circle.js"),i`
            <sp-progress-circle
                size="s"
                indeterminate
                aria-hidden="true"
                class="progress-circle"
            ></sp-progress-circle>
        `}renderField(){return i`
            ${this.renderStateIcons()}
            <input
                aria-activedescendant=${e(this.activeDescendant?`${this.activeDescendant.value}`:void 0)}
                aria-autocomplete=${e(this.autocomplete)}
                aria-controls=${e(this.open?"listbox-menu":void 0)}
                aria-describedby="${this.helpTextId} tooltip"
                aria-expanded="${this.open?"true":"false"}"
                aria-label=${e(this.label||this.appliedLabel)}
                aria-labelledby="pending-label applied-label label"
                aria-invalid=${e(this.invalid||void 0)}
                autocomplete="off"
                @click=${this.toggleOpen}
                @keydown=${this.handleComboboxKeydown}
                id="input"
                class="input"
                role="combobox"
                type="text"
                .value=${r(this.displayValue)}
                tabindex="0"
                @sp-closed=${this.handleClosed}
                @sp-opened=${this.handleOpened}
                maxlength=${e(this.maxlength>-1?this.maxlength:void 0)}
                minlength=${e(this.minlength>-1?this.minlength:void 0)}
                pattern=${e(this.pattern)}
                @change=${this.handleChange}
                @input=${this.handleInput}
                @focus=${this.onFocus}
                @blur=${this.onBlur}
                ?disabled=${this.disabled}
                ?required=${this.required}
                ?readonly=${this.readonly}
            />
            ${this.pendingStateController.renderPendingState()}
        `}render(){const l=(this.input||this).offsetWidth;return i`
            ${super.render()}
            <sp-picker-button
                aria-controls="listbox-menu"
                aria-describedby="${this.helpTextId} tooltip"
                aria-expanded=${this.open?"true":"false"}
                aria-label=${e(this.label||this.appliedLabel)}
                aria-labelledby="applied-label label"
                @click=${this.toggleOpen}
                tabindex="-1"
                class="button ${this.focused?"focus-visible is-keyboardFocused":""}"
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
                    ?hidden=${this.availableOptions.length===0}
                >
                    <sp-menu
                        @change=${this.handleMenuChange}
                        tabindex="-1"
                        aria-labelledby="label applied-label"
                        aria-label=${e(this.label||this.appliedLabel)}
                        id="listbox-menu"
                        role="listbox"
                        selects=${e(this.autocomplete==="none"?"single":void 0)}
                        .selected=${this.autocomplete==="none"&&this.itemValue?[this.itemValue]:[]}
                        style="min-width: ${l}px;"
                        size=${this.size}
                    >
                        ${this.overlayOpen?o(this.availableOptions,t=>t.value,t=>{var a,s;return i`
                                          <sp-menu-item
                                              id="${t.value}"
                                              ?focused=${((a=this.activeDescendant)==null?void 0:a.value)===t.value}
                                              aria-selected=${((s=this.activeDescendant)==null?void 0:s.value)===t.value?"true":"false"}
                                              .value=${t.value}
                                              .selected=${t.value===this.itemValue}
                                              ?disabled=${t.disabled}
                                          >
                                              ${t.itemText}
                                          </sp-menu-item>
                                      `}):i``}
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
        `}}
//# sourceMappingURL=Combobox.js.map

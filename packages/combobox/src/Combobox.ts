/*
Copyright 2020 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import {
    CSSResultArray,
    html,
    nothing,
    PropertyValues,
    type SpectrumElement,
    TemplateResult,
} from '@spectrum-web-components/base';
import { ComboboxBase } from '@core/components/combobox/combobox.base.ts';
import {
    ifDefined,
    live,
    repeat,
} from '@spectrum-web-components/base/src/directives.js';
import '@spectrum-web-components/overlay/sp-overlay.js';
import '@spectrum-web-components/icons-ui/icons/sp-icon-chevron100.js';
import '@spectrum-web-components/popover/sp-popover.js';
import '@spectrum-web-components/menu/sp-menu.js';
import '@spectrum-web-components/menu/sp-menu-item.js';
import '@spectrum-web-components/picker-button/sp-picker-button.js';

import styles from './combobox.css.js';
import chevronStyles from '@spectrum-web-components/icon/src/spectrum-icon-chevron.css.js';
import { MenuItem } from '@spectrum-web-components/menu';

export type ComboboxOption = {
    value: string;
    itemText: string;
    disabled?: boolean;
};

/**
 * @element sp-combobox
 * @slot - Supply Menu Item elements to the default slot in order to populate the available options
 * @slot tooltip - Tooltip to to be applied to the the Picker Button
 */
export class Combobox extends ComboboxBase {
    public static override get styles(): CSSResultArray {
        return [...super.styles, styles, chevronStyles];
    }

    protected renderAppliedLabel(): TemplateResult {
        /**
         * appliedLabel corresponds to `<label for="...">`, which is overriden
         * if user adds the `label` attribute manually to `<sp-combobox>`.
         **/
        const appliedLabel = this.label || this.appliedLabel;

        return html`
            ${this.pending
                ? html`
                      <span
                          aria-hidden="true"
                          class="visually-hidden"
                          id="pending-label"
                      >
                          ${this.pendingLabel}
                      </span>
                  `
                : nothing}
            ${this.value
                ? html`
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
                  `
                : html`
                      <span hidden id="applied-label">${appliedLabel}</span>
                  `}
        `;
    }

    protected renderLoader(): TemplateResult {
        import(
            '@spectrum-web-components/progress-circle/sp-progress-circle.js'
        );
        return html`
            <sp-progress-circle
                size="s"
                indeterminate
                aria-hidden="true"
                class="progress-circle"
            ></sp-progress-circle>
        `;
    }

    protected override renderField(): TemplateResult {
        return html`
            ${this.renderStateIcons()}
            <input
                aria-activedescendant=${ifDefined(
                    this.activeDescendant
                        ? `${this.activeDescendant.value}`
                        : undefined
                )}
                aria-autocomplete=${ifDefined(
                    this.autocomplete as 'list' | 'none'
                )}
                aria-controls=${ifDefined(
                    this.open ? 'listbox-menu' : undefined
                )}
                aria-describedby="${this.helpTextId} tooltip"
                aria-expanded="${this.open ? 'true' : 'false'}"
                aria-label=${ifDefined(this.label || this.appliedLabel)}
                aria-labelledby="pending-label applied-label label"
                aria-invalid=${ifDefined(this.invalid || undefined)}
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
                    this.maxlength > -1 ? this.maxlength : undefined
                )}
                minlength=${ifDefined(
                    this.minlength > -1 ? this.minlength : undefined
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

    protected override render(): TemplateResult {
        const width = (this.input || this).offsetWidth;
        if (this.tooltipEl) {
            this.tooltipEl.disabled = this.open;
        }

        return html`
            ${super.render()}
            <sp-picker-button
                aria-controls="listbox-menu"
                aria-describedby="${this.helpTextId} tooltip"
                aria-expanded=${this.open ? 'true' : 'false'}
                aria-label=${ifDefined(this.label || this.appliedLabel)}
                aria-labelledby="applied-label label"
                @click=${this.toggleOpen}
                tabindex="-1"
                class="button ${this.focused
                    ? 'focus-visible is-keyboardFocused'
                    : ''}"
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
                .receivesFocus=${'false'}
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
                            this.autocomplete === 'none' ? 'single' : undefined
                        )}
                        .selected=${this.autocomplete === 'none' &&
                        this.itemValue
                            ? [this.itemValue]
                            : []}
                        style="min-width: ${width}px;"
                        size=${this.size}
                    >
                        ${this.overlayOpen
                            ? repeat(
                                  this.availableOptions,
                                  (option) => option.value,
                                  (option) => {
                                      return html`
                                          <sp-menu-item
                                              id="${option.value}"
                                              ?focused=${this.activeDescendant
                                                  ?.value === option.value}
                                              aria-selected=${this
                                                  .activeDescendant?.value ===
                                              option.value
                                                  ? 'true'
                                                  : 'false'}
                                              .value=${option.value}
                                              .selected=${option.value ===
                                              this.itemValue}
                                              ?disabled=${option.disabled}
                                          >
                                              ${option.itemText}
                                          </sp-menu-item>
                                      `;
                                  }
                              )
                            : html``}
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

    applyFocusElementLabel = (value?: string): void => {
        this.appliedLabel = value;
    };

    protected override firstUpdated(
        changed: PropertyValues<this & { optionEls: MenuItem[] }>
    ): void {
        super.firstUpdated(changed);
        this.addEventListener('focusout', (event: FocusEvent) => {
            const isMenuItem =
                event.relatedTarget &&
                this.contains(event.relatedTarget as Node);
            if (event.target === this && !isMenuItem) {
                this.focused = false;
            }
        });
    }

    private _returnItems = (): void => {
        return;
    };

    protected async manageListOverlay(): Promise<void> {
        if (this.open) {
            this.focused = true;
            this.focus();
        }
    }

    protected override updated(changed: PropertyValues<this>): void {
        if (changed.has('open') && !this.pending) {
            this.manageListOverlay();
        }
        if (!this.focused && this.open) {
            this.open = false;
        }
        if (changed.has('pending') && this.pending) {
            this.open = false;
        }
        if (changed.has('activeDescendant' as keyof Combobox)) {
            const previouslyActiveDescendant = changed.get(
                'activeDescendant' as keyof Combobox
            ) as unknown as MenuItem;
            if (previouslyActiveDescendant) {
                previouslyActiveDescendant.focused = false;
            }
            if (
                this.activeDescendant &&
                typeof (this.activeDescendant as MenuItem).focused !==
                    'undefined'
            ) {
                (this.activeDescendant as MenuItem).focused = true;
            }
        }
        if (
            changed.has('options') ||
            changed.has('optionEls' as keyof Combobox)
        ) {
            // if all options are disabled, set combobox to disabled
            if (this.options?.every((option) => option.disabled)) {
                this.disabled = true;
            }

            this.availableOptions = this.options || this.optionEls;
        }
    }

    protected override async getUpdateComplete(): Promise<boolean> {
        const complete = await super.getUpdateComplete();
        const list = this.shadowRoot.querySelector(
            '#listbox'
        ) as HTMLUListElement;
        if (list) {
            const descendants = [...list.children] as SpectrumElement[];
            await Promise.all(
                descendants.map((descendant) => descendant.updateComplete)
            );
        }
        return complete;
    }

    public override connectedCallback(): void {
        super.connectedCallback();
        if (!this.itemObserver) {
            this.itemObserver = new MutationObserver(
                this.setOptionsFromSlottedItems.bind(this)
            );
        }
    }

    public override disconnectedCallback(): void {
        this.itemObserver.disconnect();
        this.open = false;
        super.disconnectedCallback();
    }

    private itemObserver!: MutationObserver;
}

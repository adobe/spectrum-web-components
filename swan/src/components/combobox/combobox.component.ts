/*
Copyright 2024 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import { html, TemplateResult } from 'lit';
import { ComboboxBase } from '@core/components/combobox/combobox.base.js';
import styles from './combobox.styles.js';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { repeat } from 'lit-html/directives/repeat.js';

/**
 * @element swan-badge
 * Adapted from Spectrum Web Components v1.x Badge
 *
 * @slot - Text label of the badge
 * @slot icon - Optional icon that appears to the left of the label
 */
export default class SwanCombobox extends ComboboxBase {
    //   static override styles = styles;

    protected override render(): TemplateResult {
        const width = (this.input || this).offsetWidth;

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
}

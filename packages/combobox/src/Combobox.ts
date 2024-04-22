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
    PropertyValues,
    type SpectrumElement,
    TemplateResult,
} from '@spectrum-web-components/base';
import {
    property,
    query,
    state,
} from '@spectrum-web-components/base/src/decorators.js';
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
import { Textfield } from '@spectrum-web-components/textfield';
import type { Tooltip } from '@spectrum-web-components/tooltip';

import styles from './combobox.css.js';
import chevronStyles from '@spectrum-web-components/icon/src/spectrum-icon-chevron.css.js';
import { Menu, MenuItem } from '@spectrum-web-components/menu';

export type ComboboxOption = {
    value: string;
    itemText: string;
};

/**
 * @element sp-combobox
 * @slot - Supply Menu Item elements to the default slot in order to populate the available options
 * @slot tooltip - Tooltip to to be applied to the the Picker Button
 */
export class Combobox extends Textfield {
    public static override get styles(): CSSResultArray {
        return [...super.styles, styles, chevronStyles];
    }

    /**
     * The currently active ComboboxItem descendant, when available.
     */
    @state()
    private activeDescendant?: ComboboxOption | MenuItem;

    @property({ type: String })
    public override autocomplete: 'list' | 'none' = 'none';

    @state()
    private availableOptions: (ComboboxOption | MenuItem)[] = [];

    /**
     * Whether the listbox is visible.
     **/
    @property({ type: Boolean, reflect: true })
    public open = false;

    @query('slot:not([name])')
    private optionSlot!: HTMLSlotElement;

    @state()
    overlayOpen = false;

    @query('#input')
    private input!: HTMLInputElement;

    private itemValue = '';

    /**
     * An array of options to present in the Menu provided while typing into the input
     */
    @property({ type: Array })
    public options?: ComboboxOption[];

    /**
     * The array of the children of the combobox, ie ComboboxItems.
     **/
    @state()
    protected optionEls: MenuItem[] = [];

    private tooltipEl?: Tooltip;

    public override focus(): void {
        this.focusElement.focus();
    }

    public override click(): void {
        this.focus();
        this.focusElement.click();
    }

    private scrollToActiveDescendant(): void {
        const activeEl = this.shadowRoot.querySelector(
            `#${this.activeDescendant?.value}`
        ) as HTMLElement;
        if (activeEl) {
            activeEl.scrollIntoView({ block: 'nearest' });
        }
    }

    public handleComboboxKeydown(event: KeyboardEvent): void {
        if (this.readonly) {
            return;
        }
        if (event.altKey && event.code === 'ArrowDown') {
            this.open = true;
        } else if (event.code === 'ArrowDown') {
            event.preventDefault();
            this.open = true;
            this.activateNextDescendant();
            this.scrollToActiveDescendant();
        } else if (event.code === 'ArrowUp') {
            event.preventDefault();
            this.open = true;
            this.activatePreviousDescendant();
            this.scrollToActiveDescendant();
        } else if (event.code === 'Escape') {
            if (!this.open) {
                this.value = '';
            }
            this.open = false;
        } else if (event.code === 'Enter') {
            this.selectDescendant();
            this.open = false;
        } else if (event.code === 'Home') {
            this.focusElement.setSelectionRange(0, 0);
            this.activeDescendant = undefined;
        } else if (event.code === 'End') {
            const { length } = this.value;
            this.focusElement.setSelectionRange(length, length);
            this.activeDescendant = undefined;
        } else if (event.code === 'ArrowLeft') {
            this.activeDescendant = undefined;
        } else if (event.code === 'ArrowRight') {
            this.activeDescendant = undefined;
        }
    }

    /**
     * Convert the flattened array of assigned elements of `slot[name='option']` to
     * an array of `ComboboxOptions` for use in rendering options in the shadow DOM.s
     **/
    public handleSlotchange(): void {
        this.setOptionsFromSlottedItems();
        this.itemObserver.disconnect();
        this.optionEls.map((item) => {
            this.itemObserver.observe(item, {
                attributes: true,
                attributeFilter: ['id'],
                childList: true,
            });
        });
    }

    protected handleTooltipSlotchange(
        event: Event & { target: HTMLSlotElement }
    ): void {
        this.tooltipEl = event.target.assignedElements()[0] as
            | Tooltip
            | undefined;
    }

    public setOptionsFromSlottedItems(): void {
        const elements = this.optionSlot.assignedElements({
            flatten: true,
        }) as MenuItem[];
        // Element data
        this.optionEls = elements;
    }

    public activateNextDescendant(): void {
        const activeIndex = !this.activeDescendant
            ? -1
            : this.availableOptions.indexOf(this.activeDescendant);
        const nextActiveIndex =
            (this.availableOptions.length + activeIndex + 1) %
            this.availableOptions.length;
        this.activeDescendant = this.availableOptions[nextActiveIndex];
    }

    public activatePreviousDescendant(): void {
        const activeIndex = !this.activeDescendant
            ? 0
            : this.availableOptions.indexOf(this.activeDescendant);
        const previousActiveIndex =
            (this.availableOptions.length + activeIndex - 1) %
            this.availableOptions.length;
        this.activeDescendant = this.availableOptions[previousActiveIndex];
    }

    public selectDescendant(): void {
        if (!this.activeDescendant) {
            return;
        }
        this.value = this.activeDescendant.itemText;
    }

    public filterAvailableOptions(): void {
        if (this.autocomplete === 'none') {
            return;
        }
        const valueLowerCase = this.value.toLowerCase();
        this.availableOptions = (this.options || this.optionEls).filter(
            (descendant) => {
                const itemTextLowerCase = descendant.itemText.toLowerCase();
                return itemTextLowerCase.startsWith(valueLowerCase);
            }
        );
    }

    public override handleInput(event: Event): void {
        super.handleInput(event);
        this.activeDescendant = undefined;
        this.open = true;
    }

    protected handleMenuChange(event: PointerEvent & { target: Menu }): void {
        const { target } = event;
        const value = target.selected[0];
        const selected = (this.options || this.optionEls).find(
            (item) => item.value === value
        );
        this.value = selected?.itemText || '';
        event.preventDefault();
        this.open = false;
        this._returnItems();
        this.focus();
    }

    public handleClosed(): void {
        this.open = false;
        this.overlayOpen = false;
    }

    public handleOpened(): void {
        // Do stuff here?
    }

    public toggleOpen(): void {
        if (this.readonly) {
            this.open = false;
            return;
        }
        this.open = !this.open;
        this.inputElement.focus();
    }

    protected override shouldUpdate(
        changed: PropertyValues<this & { optionEls: MenuItem[] }>
    ): boolean {
        if (changed.has('open')) {
            if (!this.open) {
                this.activeDescendant = undefined;
            } else {
                this.overlayOpen = true;
            }
        }
        if (changed.has('value')) {
            this.filterAvailableOptions();
            this.itemValue =
                this.availableOptions.find(
                    (option) => option.itemText === this.value
                )?.value ?? '';
        }
        return super.shouldUpdate(changed);
    }

    protected override onBlur(event: FocusEvent): void {
        if (
            event.relatedTarget &&
            (this.contains(event.relatedTarget as HTMLElement) ||
                this.shadowRoot.contains(event.relatedTarget as HTMLElement))
        ) {
            return;
        }
        super.onBlur(event);
    }

    protected renderAppliedLabel(): TemplateResult {
        /**
         * appliedLabel corresponds to `<label for="...">`, which is overriden
         * if user adds the `label` attribute manually to `<sp-combobox>`.
         **/
        const appliedLabel = this.label || this.appliedLabel;

        return html`
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
                aria-labelledby="applied-label label"
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

    protected override updated(
        changed: PropertyValues<
            this & { optionEls: MenuItem[]; activeDescendant: MenuItem }
        >
    ): void {
        if (changed.has('open')) {
            this.manageListOverlay();
        }
        if (!this.focused && this.open) {
            this.open = false;
        }
        if (changed.has('activeDescendant')) {
            const previouslyActiveDescendant = changed.get(
                'activeDescendant'
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
        if (changed.has('options') || changed.has('optionEls')) {
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

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
    TemplateResult,
} from '@spectrum-web-components/base';
import {
    property,
    query,
} from '@spectrum-web-components/base/src/decorators.js';
import {
    ifDefined,
    live,
    repeat,
} from '@spectrum-web-components/base/src/directives.js';
import '../sp-combobox-item.js';
import { ComboboxItem } from './ComboboxItem.js';
import { Overlay } from '@spectrum-web-components/overlay';
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
    id: string;
    value: string;
};

/**
 * @element sp-combobox
 * @slot tooltip - Tooltip to to be applied to the the Picker Button
 */
export class Combobox extends Textfield {
    public static override get styles(): CSSResultArray {
        return [...super.styles, styles, chevronStyles];
    }

    /**
     * The currently active ComboboxItem descendent, when available.
     */
    @property({ attribute: false })
    public activeDescendent?: ComboboxOption | MenuItem;

    @property({ attribute: false })
    public availableOptions: (ComboboxOption | MenuItem)[] = [];

    @property()
    public ariaAutocomplete: 'list' | 'none' = 'none';

    @property({ attribute: 'label-position' })
    public labelPosition: 'inline-start' | undefined;

    /**
     * Whether the listbox is visible.
     **/
    @property({ type: Boolean, reflect: true })
    public open = false;

    @query('slot:not([name])')
    public optionSlot!: HTMLSlotElement;

    @query('#listbox')
    public listbox!: HTMLDivElement;

    @query('#input')
    public input!: HTMLInputElement;

    public overlay!: HTMLDivElement;

    @property({ type: Array })
    public options?: ComboboxOption[];

    /**
     * The array of the children of the combobox, ie ComboboxItems.
     **/
    @property({ type: Array })
    public optionEls: MenuItem[] = [];

    protected tooltipEl?: Tooltip;

    // { value: "String thing", id: "string1" }
    public override focus(): void {
        this.focusElement.focus();
    }

    public override click(): void {
        this.focus();
        this.focusElement.click();
    }

    public handleComboboxKeydown(event: KeyboardEvent): void {
        if (event.altKey && event.code === 'ArrowDown') {
            this.open = true;
        } else if (event.code === 'ArrowDown') {
            event.preventDefault();
            this.open = true;
            this.activateNextDescendent();
            const activeEl = this.querySelector(
                `#${(this.activeDescendent as ComboboxOption).id}`
            ) as HTMLElement;
            if (activeEl) {
                activeEl.scrollIntoView({ block: 'nearest' });
            }
        } else if (event.code === 'ArrowUp') {
            event.preventDefault();
            this.open = true;
            this.activatePreviousDescendent();
            const activeEl = this.querySelector(
                `#${(this.activeDescendent as ComboboxOption).id}`
            ) as HTMLElement;
            if (activeEl) {
                activeEl.scrollIntoView({ block: 'nearest' });
            }
        } else if (event.code === 'Escape') {
            if (!this.open) {
                this.value = '';
            }
            this.open = false;
        } else if (event.code === 'Enter') {
            this.selectDescendent();
            this.open = false;
        } else if (event.code === 'Home') {
            this.focusElement.setSelectionRange(0, 0);
            this.activeDescendent = undefined;
        } else if (event.code === 'End') {
            const { length } = this.value;
            this.focusElement.setSelectionRange(length, length);
            this.activeDescendent = undefined;
        } else if (event.code === 'ArrowLeft') {
            this.activeDescendent = undefined;
        } else if (event.code === 'ArrowRight') {
            this.activeDescendent = undefined;
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

    public activateNextDescendent(): void {
        const activeIndex = !this.activeDescendent
            ? -1
            : this.availableOptions.indexOf(this.activeDescendent);
        const nextActiveIndex =
            (this.availableOptions.length + activeIndex + 1) %
            this.availableOptions.length;
        this.activeDescendent = this.availableOptions[nextActiveIndex];
    }

    public activatePreviousDescendent(): void {
        const activeIndex = !this.activeDescendent
            ? 0
            : this.availableOptions.indexOf(this.activeDescendent);
        const previousActiveIndex =
            (this.availableOptions.length + activeIndex - 1) %
            this.availableOptions.length;
        this.activeDescendent = this.availableOptions[previousActiveIndex];
    }

    public selectDescendent(): void {
        if (!this.activeDescendent) {
            return;
        }
        this.value = this.activeDescendent.value;
    }

    public filterAvailableOptions(): void {
        if (this.autocomplete === 'none') {
            return;
        }
        const valueLowerCase = this.value.toLowerCase();
        this.availableOptions = (this.options || this.optionEls).filter(
            (descendent) => {
                const descendentValueLowerCase = descendent.value.toLowerCase();
                return descendentValueLowerCase.startsWith(valueLowerCase);
            }
        );
        Overlay.update();
    }

    public handleComboboxInput({
        target,
    }: Event & { target: HTMLInputElement }): void {
        // Element data.
        this.value = target.value;
        this.activeDescendent = undefined;
        this.open = true;
    }

    protected handleMenuChange(event: PointerEvent & { target: Menu }): void {
        const { target } = event;
        this.value = target.selected[0];
        event.preventDefault();
        this.open = false;
        this._returnItems();
        this.focus();
    }

    public handleClosed(): void {
        this.open = false;
    }

    public handleOpened(): void {
        // Do stuff here?
    }

    public toggleOpen(): void {
        this.open = !this.open;
    }

    protected override shouldUpdate(changed: PropertyValues<this>): boolean {
        if (changed.has('open') && !this.open) {
            this.activeDescendent = undefined;
        }
        if (changed.has('value')) {
            this.filterAvailableOptions();
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

    protected override renderField(): TemplateResult {
        return html`
            ${this.renderStateIcons()}
            <input
                aria-activedescendant=${ifDefined(
                    this.activeDescendent
                        ? `${this.activeDescendent.id}`
                        : undefined
                )}
                aria-autocomplete=${this.ariaAutocomplete}
                aria-controls=${ifDefined(
                    this.open ? 'listbox-menu' : undefined
                )}
                aria-expanded="${this.open ? 'true' : 'false'}"
                aria-labelledby="label"
                autocomplete="off"
                @click=${this.toggleOpen}
                ?focused=${this.focused || this.open}
                @input=${this.handleComboboxInput}
                @keydown=${this.handleComboboxKeydown}
                id="input"
                class="input"
                role="combobox"
                type="text"
                .value=${live(this.displayValue)}
                tabindex="0"
                @sp-closed=${this.handleClosed}
                @sp-opened=${this.handleOpened}
                type=${this.type}
                aria-describedby=${this.helpTextId}
                aria-label=${ifDefined(this.label || this.placeholder)}
                aria-invalid=${ifDefined(this.invalid || undefined)}
                maxlength=${ifDefined(
                    this.maxlength > -1 ? this.maxlength : undefined
                )}
                minlength=${ifDefined(
                    this.minlength > -1 ? this.minlength : undefined
                )}
                pattern=${ifDefined(this.pattern)}
                placeholder=${ifDefined(this.placeholder)}
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
                aria-expanded=${this.open ? 'true' : 'false'}
                aria-labelledby="label"
                @click=${this.toggleOpen}
                tabindex="-1"
                class="button ${this.focused
                    ? 'focus-visible is-keyboardFocused'
                    : ''}"
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
                        aria-labelledby="label"
                        id="listbox-menu"
                        role="listbox"
                        style="min-width: ${width}px;"
                        size=${this.size}
                    >
                        ${repeat(
                            this.availableOptions,
                            (option) => option.id,
                            (option) => {
                                return html`
                                    <sp-menu-item
                                        id="${option.id}"
                                        ?focused=${this.activeDescendent?.id ===
                                        option.id}
                                        aria-selected=${this.activeDescendent
                                            ?.id === option.id
                                            ? 'true'
                                            : 'false'}
                                        .value=${option.value}
                                    >
                                        ${option.value}
                                    </sp-menu-item>
                                `;
                            }
                        )}
                        <slot
                            hidden
                            @slotchange=${this.handleSlotchange}
                        ></slot>
                    </sp-menu>
                </sp-popover>
            </sp-overlay>
            <slot
                aria-hidden="true"
                name="tooltip"
                id="tooltip"
                @slotchange=${this.handleTooltipSlotchange}
            ></slot>
        `;
    }

    protected override firstUpdated(changed: PropertyValues<this>): void {
        super.firstUpdated(changed);
        this.overlay = this.shadowRoot.querySelector(
            '#overlay'
        ) as HTMLDivElement;
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
        if (changed.has('open')) {
            this.manageListOverlay();
        }
        if (!this.focused && this.open) {
            this.open = false;
        }
        if (changed.has('activeDescendent')) {
            if (changed.get('activeDescendent')) {
                (changed.get('activeDescendent') as MenuItem).focused = false;
            }
            if (
                this.activeDescendent &&
                typeof (this.activeDescendent as MenuItem).focused !==
                    'undefined'
            ) {
                (this.activeDescendent as MenuItem).focused = true;
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
            const descendents = [...list.children] as ComboboxItem[];
            await Promise.all(
                descendents.map((descendent) => descendent.updateComplete)
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

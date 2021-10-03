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
} from '@spectrum-web-components/base/src/directives.js';
import '../sp-combobox-item.js';
import { ComboboxItem } from './ComboboxItem.js';
import { openOverlay } from '@spectrum-web-components/overlay';
import '@spectrum-web-components/icons-ui/icons/sp-icon-chevron100.js';
import '@spectrum-web-components/popover/sp-popover.js';
import '@spectrum-web-components/menu/sp-menu.js';
import '@spectrum-web-components/menu/sp-menu-item.js';
import '@spectrum-web-components/picker-button/sp-picker-button.js';
import { Textfield } from '@spectrum-web-components/textfield';

import styles from './combobox.css.js';
import chevronStyles from '@spectrum-web-components/icon/src/spectrum-icon-chevron.css.js';
import { Menu, MenuItem } from '@spectrum-web-components/menu';

export type ComboboxOption = {
    id: string;
    value: string;
};

/**
 * @element sp-combobox
 */
export class Combobox extends Textfield {
    public static override get styles(): CSSResultArray {
        return [...super.styles, styles, chevronStyles];
    }

    /**
     * The currently active ComboboxItem descendent, when available.
     */
    @property({ attribute: false })
    protected activeDescendent?: ComboboxOption;

    @property({ attribute: false })
    protected availableOptions: ComboboxOption[] = [];

    @property()
    public ariaAutocomplete: 'list' | 'none' = 'none';

    @property({ attribute: 'label-position' })
    public labelPosition: 'inline-start' | undefined;

    /**
     * Whether the listbox is visible.
     **/
    @property({ type: Boolean, reflect: true })
    public open = false;

    @query('[name="option"]')
    public optionSlot!: HTMLSlotElement;

    @query('#listbox')
    public listbox!: HTMLDivElement;

    @query('#input')
    public input!: HTMLInputElement;

    public overlay!: HTMLDivElement;

    /**
     * The array of the children of the combobox, ie ComboboxItems.
     **/
    @property({ type: Array })
    public options: ComboboxOption[] = [];

    // { value: "String thing", id: "string1" }
    public override focus(): void {
        this.focusElement.focus();
    }

    public override click(): void {
        this.focus();
        this.focusElement.click();
    }

    public onComboboxKeydown(event: KeyboardEvent): void {
        if (event.altKey && event.code === 'ArrowDown') {
            this.open = true;
        } else if (event.code === 'ArrowDown') {
            event.preventDefault();
            this.open = true;
            this.activateNextDescendent();
            const activeEl = this.overlay.querySelector(
                `#${(this.activeDescendent as ComboboxOption).id}`
            ) as HTMLElement;
            if (activeEl) {
                activeEl.scrollIntoView({ block: 'nearest' });
            }
        } else if (event.code === 'ArrowUp') {
            event.preventDefault();
            this.open = true;
            this.activatePreviousDescendent();
            const activeEl = this.overlay.querySelector(
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
    public onSlotchange(): void {
        this.setOptionsFromSlottedItems();
        this.itemObserver.disconnect();
        const comboboxItems = this.optionSlot.assignedElements({
            flatten: true,
        }) as ComboboxItem[];
        comboboxItems.map((item) => {
            this.itemObserver.observe(item, {
                attributes: true,
                attributeFilter: ['id'],
                childList: true,
            });
        });
    }

    public setOptionsFromSlottedItems(): void {
        const elements = this.optionSlot.assignedElements({
            flatten: true,
        }) as ComboboxItem[];
        // Element data
        this.options = elements.map((element) => {
            return { id: element.id, value: element.value };
        });
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
            : this.options.indexOf(this.activeDescendent);
        const previousActiveIndex =
            (this.options.length + activeIndex - 1) % this.options.length;
        this.activeDescendent = this.options[previousActiveIndex];
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
        this.availableOptions = this.options.filter((descendent) => {
            const descendentValueLowerCase = descendent.value.toLowerCase();
            return descendentValueLowerCase.startsWith(valueLowerCase);
        });
    }

    public onComboboxInput({
        target,
    }: Event & { target: HTMLInputElement }): void {
        // Element data.
        this.value = target.value;
        this.activeDescendent = undefined;
        this.open = true;
    }

    public handleListPointerenter(event: PointerEvent): void {
        const descendent = event
            .composedPath()
            .find((el) => typeof (el as MenuItem).value !== 'undefined');
        if (descendent) this.activeDescendent = descendent as MenuItem;
    }

    public handleListPointerleave(): void {
        this.activeDescendent = undefined;
    }

    public handleMenuChange(event: PointerEvent & { target: Menu }): void {
        const { target } = event;
        this.value = target.selected[0];
        event.preventDefault();
        this.open = false;
        this._returnItems();
        this.focus();
    }

    public onOverlayScroll = (): void => {
        const overlayMenu = this.overlay.children[0] as HTMLElement;
        const menu = this.listbox.children[0] as HTMLElement;
        menu.scroll(overlayMenu.scrollLeft, overlayMenu.scrollTop);
    };

    public onOpened(): void {
        this.overlayObserver.observe(
            this.overlay.parentElement as HTMLElement,
            {
                attributes: true,
                // attributeFilter: [ "style" ],
            }
        );
        const menu = this.overlay.children[0] as HTMLElement;
        menu.addEventListener('scroll', this.onOverlayScroll);
        this.overlay.addEventListener(
            'transitionend',
            () => {
                this.positionListbox();
            },
            { once: true }
        );
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

    private positionListboxFromEntries(_entries: MutationRecord[]): void {
        this.positionListbox();
        this.overlay.addEventListener(
            'transitionend',
            () => {
                if (!this.open) return;
                this.positionListbox();
            },
            { once: true }
        );
    }

    private positionListbox(): void {
        const targetRect = this.overlay.getBoundingClientRect();
        const rootRect = this.getBoundingClientRect();
        this.listbox.style.transform = `translate(${
            targetRect.x - rootRect.x
        }px, ${targetRect.y - rootRect.y}px)`;
        this.listbox.style.height = `${targetRect.height}px`;
        this.listbox.style.maxHeight = `${targetRect.height}px`;
    }

    protected override onBlur(event: FocusEvent): void {
        if (
            event.relatedTarget &&
            this.overlay.contains(event.relatedTarget as HTMLElement)
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
                        ? `${this.activeDescendent.id}-sr`
                        : undefined
                )}
                aria-autocomplete=${this.ariaAutocomplete}
                aria-controls="listbox-menu"
                aria-expanded="${this.open ? 'true' : 'false'}"
                aria-labelledby="label"
                autocomplete=${ifDefined(this.autocomplete as 'on')}
                @click=${this.toggleOpen}
                ?focused=${this.focused || this.open}
                @input=${this.onComboboxInput}
                @keydown=${this.onComboboxKeydown}
                id="input"
                class="input"
                role="combobox"
                type="text"
                .value=${live(this.displayValue)}
                tabindex="0"
                @sp-closed=${() => {
                    this.open = false;
                }}
                @sp-opened=${this.onOpened}
                type=${this.type}
                aria-describedby=${this.helpTextId}
                aria-label=${this.label || this.placeholder}
                aria-invalid=${ifDefined(this.invalid || undefined)}
                maxlength=${ifDefined(
                    this.maxlength > -1 ? this.maxlength : undefined
                )}
                minlength=${ifDefined(
                    this.minlength > -1 ? this.minlength : undefined
                )}
                pattern=${ifDefined(this.pattern)}
                placeholder=${this.placeholder}
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
        return html`
            <sp-field-label
                id="label"
                for="input"
                side-aligned=${ifDefined(
                    this.labelPosition ? 'start' : undefined
                )}
            >
                <slot>${this.label}</slot>
            </sp-field-label>
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
            >
                <sp-icon-chevron100
                    slot="icon"
                    class="spectrum-UIIcon-ChevronDown100 icon"
                ></sp-icon-chevron100>
            </sp-picker-button>
            <sp-popover aria-labelledby="label" id="overlay">
                <sp-menu
                    @change=${this.handleMenuChange}
                    style="width: ${width}px;"
                    selects="single"
                    role="listbox"
                    @pointerenter=${this.handleListPointerenter}
                    @pointerleave=${this.handleListPointerleave}
                >
                    ${this.availableOptions.map((option) => {
                        return html`
                            <sp-menu-item
                                id=${option.id}
                                ?selected=${this.activeDescendent?.id ===
                                option.id}
                                ?focused=${this.activeDescendent?.id ===
                                option.id}
                                .value=${option.value}
                            >
                                ${option.value}
                            </sp-menu-item>
                        `;
                    })}
                </sp-menu>
            </sp-popover>
            <sp-popover id="listbox" ?open=${this.open}>
                <sp-menu
                    tabindex="0"
                    aria-labelledby="label"
                    id="listbox-menu"
                    role="listbox"
                    style="width: ${width}px;"
                    selects="single"
                >
                    ${this.availableOptions.map((option) => {
                        return html`
                            <sp-menu-item
                                id="${option.id}-sr"
                                ?selected=${this.activeDescendent?.id ===
                                option.id}
                                ?focused=${this.activeDescendent?.id ===
                                option.id}
                                selects="single"
                                .value=${option.value}
                            >
                                ${option.value}
                            </sp-menu-item>
                        `;
                    })}
                </sp-menu>
            </sp-popover>
            <slot name="option" @slotchange=${this.onSlotchange} hidden></slot>
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
                this.overlay.contains(event.relatedTarget as Node);
            if (event.target === this && !isMenuItem) {
                this.focused = false;
            }
        });
        this.updateComplete.then(() => {
            this.availableOptions = this.options;
        });
    }

    private _returnItems = (): void => {
        return;
    };

    protected async manageListOverlay(): Promise<void> {
        if (this.open) {
            this.focused = true;
            this._returnItems = await openOverlay(
                this.shadowRoot.querySelector('#input') as HTMLElement,
                'click',
                this.overlay,
                {
                    offset: 0,
                    placement: 'bottom-start',
                    receivesFocus: 'false',
                }
            );
            this.focus();
        } else {
            this._returnItems();
            this._returnItems = () => {
                return;
            };
            this.overlayObserver.disconnect();
            this.overlay.removeEventListener('scroll', this.onOverlayScroll);
        }
    }

    protected override updated(changed: PropertyValues<this>): void {
        if (changed.has('open')) {
            this.manageListOverlay();
        }
        if (!this.focused) {
            this.open = false;
        }
        if (changed.has('value')) {
            if (this.overlay && this.open) this.positionListbox();
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
        if (!this.overlayObserver) {
            this.overlayObserver = new MutationObserver(
                this.positionListboxFromEntries.bind(this)
            );
        }
        if (!this.itemObserver) {
            this.itemObserver = new MutationObserver(
                this.setOptionsFromSlottedItems.bind(this)
            );
        }
    }

    public override disconnectedCallback(): void {
        this.overlayObserver.disconnect();
        this.itemObserver.disconnect();
        this.open = false;
        super.disconnectedCallback();
    }

    private overlayObserver!: MutationObserver;
    private itemObserver!: MutationObserver;
}

/**
 * 
    <sp-combobox>
        #shadow-root
    this.shadowRoot.querySelector('#listbox').children;
    this.shadowRoot.querySelectorAll('li');
            <div class="spectrum-Textfield spectrum-InputGroup-textfield">
                <input type="text" placeholder="Type here" name="field" value="" class="spectrum-Textfield-input spectrum-InputGroup-input">
            </div>
            <button class="spectrum-Picker spectrum-Picker--sizeM spectrum-InputGroup-button" tabindex="-1" aria-haspopup="true">
                <svg class="spectrum-Icon spectrum-UIIcon-ChevronDown100 spectrum-Picker-menuIcon spectrum-InputGroup-icon" focusable="false" aria-hidden="true">
                    <use xlink:href="#spectrum-css-icon-Chevron100" />
                </svg>
            </button>
    </sp-conbobox>
 * 
 */

/**
 *
 * Public API
 * popover requirement
 *
 * Aria-Spectrum consumption
 *
 * visual delivery - Spectrum CSS
 *
 *
 * does test:watch build the plugins correctly?
 */

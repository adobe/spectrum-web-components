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
    PropertyValues,
    type SpectrumElement,
} from '@spectrum-web-components/base';
import {
    property,
    query,
    state,
} from '@spectrum-web-components/base/src/decorators.js';
import '@spectrum-web-components/overlay/sp-overlay.js';
import '@spectrum-web-components/icons-ui/icons/sp-icon-chevron100.js';
import '@spectrum-web-components/popover/sp-popover.js';
import '@spectrum-web-components/menu/sp-menu.js';
import '@spectrum-web-components/menu/sp-menu-item.js';
import { PendingStateController } from '@spectrum-web-components/reactive-controllers/src/PendingState.js';
import '@spectrum-web-components/picker-button/sp-picker-button.js';
import { Textfield } from '@spectrum-web-components/textfield';
import type { Tooltip } from '@spectrum-web-components/tooltip';

import chevronStyles from '@spectrum-web-components/icon/src/spectrum-icon-chevron.css.js';
import { Menu, MenuItem } from '@spectrum-web-components/menu';

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
export class ComboboxBase extends Textfield {
    /**
     * The currently active ComboboxItem descendant, when available.
     */
    @state()
    protected activeDescendant?: ComboboxOption | MenuItem;

    @property({ type: String })
    public override autocomplete: 'list' | 'none' = 'none';

    @state()
    protected availableOptions: (ComboboxOption | MenuItem)[] = [];

    /**
     * Whether the listbox is visible.
     **/
    @property({ type: Boolean, reflect: true })
    public open = false;

    /** Whether the items are currently loading. */
    @property({ type: Boolean, reflect: true })
    public pending = false;

    /** Defines a string value that labels the Combobox while it is in pending state. */
    @property({ type: String, attribute: 'pending-label' })
    public pendingLabel = 'Pending';

    public pendingStateController: PendingStateController<this>;

    /**
     * Initializes the `PendingStateController` for the Combobox component.
     * When the pending state changes to `true`, the `open` property of the Combobox is set to `false`.
     */
    constructor() {
        super();
        this.pendingStateController = new PendingStateController(this);
    }

    @query('slot:not([name])')
    private optionSlot!: HTMLSlotElement;

    @state()
    overlayOpen = false;

    @query('#input')
    protected input!: HTMLInputElement;

    protected itemValue = '';

    /**
     * An array of options to present in the Menu provided while typing into the input
     */
    @property({ type: Array })
    public options?: (ComboboxOption | MenuItem)[];

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
        if (!this.activeDescendant) {
            return;
        }
        const activeEl = this.shadowRoot.getElementById(
            this.activeDescendant.value
        );
        if (activeEl) {
            activeEl.scrollIntoView({ block: 'nearest' });
        }
    }

    public handleComboboxKeydown(event: KeyboardEvent): void {
        if (this.readonly || this.pending) {
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
        let nextActiveIndex = activeIndex;
        do {
            nextActiveIndex =
                (this.availableOptions.length + nextActiveIndex + 1) %
                this.availableOptions.length;
            // Break if we've checked all options to avoid infinite loop
            if (nextActiveIndex === activeIndex) {
                break;
            }
        } while (this.availableOptions[nextActiveIndex].disabled);

        if (!this.availableOptions[nextActiveIndex].disabled) {
            this.activeDescendant = this.availableOptions[nextActiveIndex];
        }
        this.optionEls.forEach((el) =>
            el.setAttribute(
                'aria-selected',
                el.value === this.activeDescendant?.value ? 'true' : 'false'
            )
        );
    }

    public activatePreviousDescendant(): void {
        const activeIndex = !this.activeDescendant
            ? 0
            : this.availableOptions.indexOf(this.activeDescendant);
        let previousActiveIndex = activeIndex;
        do {
            previousActiveIndex =
                (this.availableOptions.length + previousActiveIndex - 1) %
                this.availableOptions.length;
            // Break if we've checked all options to avoid infinite loop
            if (previousActiveIndex === activeIndex) {
                break;
            }
        } while (this.availableOptions[previousActiveIndex].disabled);

        if (!this.availableOptions[previousActiveIndex].disabled) {
            this.activeDescendant = this.availableOptions[previousActiveIndex];
        }
        this.optionEls.forEach((el) =>
            el.setAttribute(
                'aria-selected',
                el.value === this.activeDescendant?.value ? 'true' : 'false'
            )
        );
    }

    public selectDescendant(): void {
        if (!this.activeDescendant) {
            return;
        }

        const activeEl = this.shadowRoot.getElementById(
            this.activeDescendant.value
        );
        if (activeEl) {
            activeEl.click();
        }
    }

    public filterAvailableOptions(): void {
        if (this.autocomplete === 'none' || this.pending) {
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
        if (!this.pending) {
            this.activeDescendant = undefined;
            this.open = true;
        }
    }

    protected handleMenuChange(event: PointerEvent & { target: Menu }): void {
        const { target } = event;
        const selected = (this.options || this.optionEls).find(
            (item) => item.value === target?.value
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
        if (this.readonly || this.pending) {
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
        if (changed.has('open') && !this.pending) {
            this.manageListOverlay();
        }
        if (!this.focused && this.open) {
            this.open = false;
        }
        if (changed.has('pending') && this.pending) {
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

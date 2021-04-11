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
    html,
    property,
    CSSResultArray,
    TemplateResult,
    PropertyValues,
    ifDefined,
} from '@spectrum-web-components/base';
import { Tab } from './Tab.js';
import { Focusable, getActiveElement } from '@spectrum-web-components/shared';

import tabStyles from './tabs.css.js';
import { TabPanel } from './TabPanel.js';

const availableArrowsByDirection = {
    vertical: ['ArrowUp', 'ArrowDown'],
    ['vertical-right']: ['ArrowUp', 'ArrowDown'],
    horizontal: ['ArrowLeft', 'ArrowRight'],
};

declare global {
    interface Document {
        fonts?: {
            ready: Promise<void>;
        };
    }
}

/**
 * @slot - Child tab elements
 * @attr {Boolean} quiet - The tabs border is a lot smaller
 * @attr {Boolean} compact - The collection of tabs take up less space
 */

export class Tabs extends Focusable {
    public static get styles(): CSSResultArray {
        return [tabStyles];
    }

    /**
     * Whether to activate a tab on keyboard focus or not.
     *
     * By default a tab is activated via a "click" interaction. This is specifically intended for when
     * tab content cannot be displayed instantly, e.g. not all of the DOM content is available, etc.
     * To learn more about "Deciding When to Make Selection Automatically Follow Focus", visit:
     * https://w3c.github.io/aria-practices/#kbd_selection_follows_focus
     */
    @property({ type: Boolean })
    public auto = false;

    @property({ reflect: true })
    public direction: 'vertical' | 'vertical-right' | 'horizontal' =
        'horizontal';

    @property()
    public label = '';

    @property({ attribute: false })
    public selectionIndicatorStyle = '';

    @property({ reflect: true })
    public get selected(): string {
        return this._selected;
    }

    public set selected(value: string) {
        const oldValue = this.selected;

        if (value === oldValue) {
            return;
        }

        this._selected = value;
        this.shouldUpdateCheckedState();
        this.requestUpdate('selected', oldValue);
    }

    private _selected = '';

    private tabs: Tab[] = [];

    /**
     * @private
     */
    public get focusElement(): Tab {
        const focusElement = this.tabs.find(
            (tab) => tab.selected || tab.value === this.selected
        );
        if (focusElement) {
            return focusElement;
        }
        return this.tabs[0];
    }

    protected manageAutoFocus(): void {
        const tabs = [...this.children] as Tab[];
        const tabUpdateCompletes = tabs.map((tab) => {
            if (typeof tab.updateComplete !== 'undefined') {
                return tab.updateComplete;
            }
            return Promise.resolve();
        });
        Promise.all(tabUpdateCompletes).then(() => super.manageAutoFocus());
    }

    protected managePanels({
        target,
    }: Event & { target: HTMLSlotElement }): void {
        const panels = target.assignedElements() as TabPanel[];
        panels.map((panel) => {
            const { value, id } = panel;
            const tab = this.querySelector(`[role="tab"][value="${value}"]`);
            if (tab) {
                tab.setAttribute('aria-controls', id);
                panel.setAttribute('aria-labelledby', tab.id);
            }
            panel.selected = value === this.selected;
        });
    }

    protected render(): TemplateResult {
        return html`
            <div
                aria-label=${ifDefined(this.label ? this.label : undefined)}
                @click=${this.onClick}
                @keydown=${this.onKeyDown}
                @mousedown=${this.manageFocusinType}
                @focusin=${this.startListeningToKeyboard}
                id="list"
                role="tablist"
            >
                <slot @slotchange=${this.onSlotChange}></slot>
                <div
                    id="selectionIndicator"
                    style=${this.selectionIndicatorStyle}
                    role="presentation"
                ></div>
            </div>
            <slot name="tab-panel" @slotchange=${this.managePanels}></slot>
        `;
    }

    protected firstUpdated(changes: PropertyValues): void {
        super.firstUpdated(changes);
        const selectedChild = this.querySelector('[selected]') as Tab;
        if (selectedChild) {
            this.selectTarget(selectedChild);
        }
    }

    protected updated(changes: PropertyValues): void {
        super.updated(changes);
        if (changes.has('selected')) {
            if (changes.get('selected')) {
                const previous = this.querySelector(
                    `[role="tabpanel"][value="${changes.get('selected')}"]`
                ) as TabPanel;
                if (previous) previous.selected = false;
            }
            const next = this.querySelector(
                `[role="tabpanel"][value="${this.selected}"]`
            ) as TabPanel;
            if (next) next.selected = true;
        }
        if (changes.has('direction')) {
            if (this.direction === 'horizontal') {
                this.removeAttribute('aria-orientation');
            } else {
                this.setAttribute('aria-orientation', 'vertical');
            }
        }
        if (changes.has('dir')) {
            this.updateSelectionIndicator();
        }
    }

    /**
     * This will force apply the focus visible styling.
     * It should always do so when this styling is already applied.
     */
    private shouldApplyFocusVisible = false;

    private manageFocusinType = (): void => {
        if (this.shouldApplyFocusVisible) {
            return;
        }

        const handleFocusin = (): void => {
            this.shouldApplyFocusVisible = false;
            this.removeEventListener('focusin', handleFocusin);
        };
        this.addEventListener('focusin', handleFocusin);
    };

    public startListeningToKeyboard(): void {
        this.addEventListener('keydown', this.handleKeydown);
        this.shouldApplyFocusVisible = true;
        const selected = this.querySelector('[selected]') as Tab;
        if (selected) {
            selected.tabIndex = -1;
        }

        const stopListeningToKeyboard = (): void => {
            this.removeEventListener('keydown', this.handleKeydown);
            this.shouldApplyFocusVisible = false;
            const selected = this.querySelector('[selected]') as Tab;
            if (selected) {
                selected.tabIndex = 0;
            }
            this.removeEventListener('focusout', stopListeningToKeyboard);
        };
        this.addEventListener('focusout', stopListeningToKeyboard);
    }

    public handleKeydown(event: KeyboardEvent): void {
        const { code } = event;
        const availableArrows = [...availableArrowsByDirection[this.direction]];
        if (!availableArrows.includes(code)) {
            return;
        }
        if (!this.isLTR && this.direction === 'horizontal') {
            availableArrows.reverse();
        }
        event.preventDefault();
        const currentFocusedTab = getActiveElement(this) as Tab;
        let currentFocusedTabIndex = this.tabs.indexOf(currentFocusedTab);
        currentFocusedTabIndex += code === availableArrows[0] ? -1 : 1;
        const nextTab = this.tabs[
            (currentFocusedTabIndex + this.tabs.length) % this.tabs.length
        ];
        nextTab.focus();
        if (this.auto) {
            this.selected = nextTab.value;
        }
    }

    private onClick = (event: Event): void => {
        const target = event.target as HTMLElement;
        this.selectTarget(target);
        if (this.shouldApplyFocusVisible && event.composedPath()[0] !== this) {
            /* Trick :focus-visible polyfill into thinking keyboard based focus */
            this.dispatchEvent(
                new KeyboardEvent('keydown', {
                    code: 'Tab',
                })
            );
            target.focus();
        }
    };

    private onKeyDown = (event: KeyboardEvent): void => {
        if (event.code === 'Enter' || event.code === 'Space') {
            event.preventDefault();
            const target = event.target as HTMLElement;
            if (target) {
                this.selectTarget(target);
            }
        }
    };

    private selectTarget(target: HTMLElement): void {
        const value = target.getAttribute('value');
        if (value) {
            const selected = this.selected;
            this.selected = value;
            const applyDefault = this.dispatchEvent(
                new Event('change', {
                    cancelable: true,
                })
            );
            if (!applyDefault) {
                this.selected = selected;
            }
        }
    }

    private onSlotChange(): void {
        this.tabs = [...this.querySelectorAll('[role="tab"]')] as Tab[];
        this.shouldUpdateCheckedState();
    }

    private shouldUpdateCheckedState(): void {
        this.tabChangeResolver();
        this.tabChangePromise = new Promise(
            (res) => (this.tabChangeResolver = res)
        );
        setTimeout(this.updateCheckedState);
    }

    private updateCheckedState = (): void => {
        if (!this.tabs.length) {
            this.tabs = [...this.querySelectorAll('[role="tab"]')] as Tab[];
        }
        this.tabs.forEach((element) => {
            element.removeAttribute('selected');
        });

        if (this.selected) {
            const currentChecked = this.tabs.find(
                (el) => el.value === this.selected
            );

            if (currentChecked) {
                currentChecked.selected = true;
            } else {
                this.selected = '';
            }
        } else {
            const firstTab = this.tabs[0];
            if (firstTab) {
                firstTab.setAttribute('tabindex', '0');
            }
        }

        this.updateSelectionIndicator();
        this.tabChangeResolver();
    };

    private updateSelectionIndicator = async (): Promise<void> => {
        const selectedElement = this.tabs.find((el) => el.selected);
        if (!selectedElement) {
            this.selectionIndicatorStyle = `transform: translateX(0px) scaleX(0) scaleY(0);`;
            return;
        }
        await Promise.all([
            selectedElement.updateComplete,
            document.fonts ? document.fonts.ready : Promise.resolve(),
        ]);
        const tabBoundingClientRect = selectedElement.getBoundingClientRect();
        const parentBoundingClientRect = this.getBoundingClientRect();

        if (this.direction === 'horizontal') {
            const width = tabBoundingClientRect.width;
            const offset =
                tabBoundingClientRect.left - parentBoundingClientRect.left;

            this.selectionIndicatorStyle = `transform: translateX(${offset}px) scaleX(${width});`;
        } else {
            const height = tabBoundingClientRect.height;
            const offset =
                tabBoundingClientRect.top - parentBoundingClientRect.top;

            this.selectionIndicatorStyle = `transform: translateY(${offset}px) scaleY(${height});`;
        }
    };

    private tabChangePromise = Promise.resolve();
    private tabChangeResolver: () => void = function () {
        return;
    };

    protected async _getUpdateComplete(): Promise<void> {
        await super._getUpdateComplete();
        await this.tabChangePromise;
    }

    public connectedCallback(): void {
        super.connectedCallback();
        window.addEventListener('resize', this.updateSelectionIndicator);
        if ('fonts' in document) {
            ((document as unknown) as {
                fonts: {
                    addEventListener: (
                        name: string,
                        callback: () => void
                    ) => void;
                };
            }).fonts.addEventListener(
                'loadingdone',
                this.updateSelectionIndicator
            );
        }
    }

    public disconnectedCallback(): void {
        window.removeEventListener('resize', this.updateSelectionIndicator);
        if ('fonts' in document) {
            ((document as unknown) as {
                fonts: {
                    removeEventListener: (
                        name: string,
                        callback: () => void
                    ) => void;
                };
            }).fonts.removeEventListener(
                'loadingdone',
                this.updateSelectionIndicator
            );
        }
        super.disconnectedCallback();
    }
}

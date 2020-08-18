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
} from '@spectrum-web-components/base';
import { Tab } from './Tab.js';
import { Focusable, getActiveElement } from '@spectrum-web-components/shared';

import tabStyles from './tabs.css.js';

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

    @property({ reflect: true })
    public direction: 'vertical' | 'vertical-right' | 'horizontal' =
        'horizontal';

    @property()
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
        this.updateCheckedState(value);

        this._selected = value;
        this.requestUpdate('selected', oldValue);
    }

    private _selected = '';

    private tabs: Tab[] = [];

    public get focusElement(): Tab | Tabs {
        const focusElement = this.tabs.find((tab) => tab.selected);
        if (focusElement) {
            return focusElement;
        }
        return this.tabs[0] || this;
    }

    constructor() {
        super();

        // These can be added as @click and @keydown handlers on the
        // slot once we no longer need web component polyfills
        this.addEventListener('click', this.onClick);
        this.addEventListener('keydown', this.onKeyDown);
    }

    protected manageAutoFocus(): void {
        const tabs = [...this.children] as Tab[];
        const tabUpdateCompletes = tabs.map((tab) => {
            if (typeof tab.updateComplete !== 'undefined')
                return tab.updateComplete;
        });
        Promise.all(tabUpdateCompletes).then(() => super.manageAutoFocus());
    }

    protected render(): TemplateResult {
        return html`
            <slot @slotchange=${this.onSlotChange}></slot>
            <div
                id="selectionIndicator"
                style=${this.selectionIndicatorStyle}
            ></div>
        `;
    }

    protected firstUpdated(changes: PropertyValues): void {
        super.firstUpdated(changes);
        this.setAttribute('role', 'tablist');
        this.addEventListener('mousedown', this.manageFocusinType);
        this.addEventListener('focusin', this.startListeningToKeyboard);
        const selectedChild = this.querySelector('[selected]') as Tab;
        if (selectedChild) {
            this.selectTarget(selectedChild);
        }
    }

    protected updated(changes: PropertyValues): void {
        super.updated(changes);
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
    public shouldApplyFocusVisible = false;

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

    public startListeningToKeyboard = (): void => {
        this.addEventListener('keydown', this.handleKeydown);
        this.shouldApplyFocusVisible = true;
        const selected = this.querySelector('[selected]') as Tab;
        /* istanbul ignore else */
        if (selected) {
            selected.tabIndex = -1;
        }

        const stopListeningToKeyboard = (): void => {
            this.removeEventListener('keydown', this.handleKeydown);
            this.shouldApplyFocusVisible = false;
            const selected = this.querySelector('[selected]') as Tab;
            /* istanbul ignore else */
            if (selected) {
                selected.tabIndex = 0;
            }
            this.removeEventListener('focusout', stopListeningToKeyboard);
        };
        this.addEventListener('focusout', stopListeningToKeyboard);
    };

    public handleKeydown(event: KeyboardEvent): void {
        const { code } = event;
        const availableArrows = [...availableArrowsByDirection[this.direction]];
        if (!availableArrows.includes(code)) {
            return;
        }
        if (!this.isDefaultDir && this.direction === 'horizontal') {
            availableArrows.reverse();
        }
        event.preventDefault();
        const currentFocusedTab = getActiveElement(this) as Tab;
        let currentFocusedTabIndex = this.tabs.indexOf(currentFocusedTab);
        currentFocusedTabIndex += code === availableArrows[0] ? -1 : 1;
        this.tabs[
            (currentFocusedTabIndex + this.tabs.length) % this.tabs.length
        ].focus();
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
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            const target = event.target as HTMLElement;
            /* istanbul ignore else */
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
        this.updateCheckedState(this.selected);
        this.tabs = [...this.querySelectorAll('[role="tab"]')] as Tab[];
    }

    private updateCheckedState(value: string): void {
        const previousChecked = this.querySelectorAll('[selected]');

        previousChecked.forEach((element) => {
            element.removeAttribute('selected');
        });

        if (value.length) {
            const currentChecked = this.querySelector(`[value="${value}"]`);

            if (currentChecked) {
                currentChecked.setAttribute('selected', '');
            } else {
                this.selected = '';
            }
        }
        if (!this.selected) {
            const firstTab = this.querySelector('[role="tab"]');
            if (firstTab) {
                firstTab.setAttribute('tabindex', '0');
            }
        }

        this.updateSelectionIndicator();
    }

    private updateSelectionIndicator = async (): Promise<void> => {
        const selectedElement = this.querySelector('[selected]') as Tab;
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

    public connectedCallback(): void {
        super.connectedCallback();
        window.addEventListener('resize', this.updateSelectionIndicator);
        /* istanbul ignore else */
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
        /* istanbul ignore else */
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

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
    SizedMixin,
    TemplateResult,
} from '@spectrum-web-components/base';
import {
    property,
    query,
} from '@spectrum-web-components/base/src/decorators.js';
import { ifDefined } from '@spectrum-web-components/base/src/directives.js';
import { IntersectionController } from '@lit-labs/observers/intersection_controller.js';
import { Tab } from './Tab.js';
import { Focusable } from '@spectrum-web-components/shared';
import { RovingTabindexController } from '@spectrum-web-components/reactive-controllers/src/RovingTabindex.js';

import tabStyles from './tabs.css.js';
import { TabPanel } from './TabPanel.js';

const noSelectionStyle = 'transform: translateX(0px) scaleX(0) scaleY(0)';

/**
 * @element sp-tabs
 *
 * @slot - Tab elements to manage as a group
 * @slot tab-panel - Tab Panel elements related to the listed Tab elements
 * @csspart tablist - Container element for the slotted sp-tab elements
 *
 * @fires change - The selected Tab child has changed.
 */
export class Tabs extends SizedMixin(Focusable) {
    public static override get styles(): CSSResultArray {
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

    /**
     * The tab items are displayed closer together.
     */
    @property({ type: Boolean, reflect: true })
    public compact = false;

    @property({ reflect: true })
    public direction: 'vertical' | 'vertical-right' | 'horizontal' =
        'horizontal';

    @property({ type: Boolean, reflect: true })
    public emphasized = false;

    @property()
    public label = '';

    /**
     * The tab list is displayed without a border.
     */
    @property({ type: Boolean, reflect: true })
    public quiet = false;

    @property({ attribute: false })
    public selectionIndicatorStyle = noSelectionStyle;

    @property({ attribute: false })
    public shouldAnimate = false;

    @query('#list')
    private tabList!: HTMLDivElement;

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

    private set tabs(tabs: Tab[]) {
        if (tabs === this.tabs) return;
        this._tabs = tabs;
        this.rovingTabindexController.clearElementCache();
    }

    private get tabs(): Tab[] {
        return this._tabs;
    }

    private _tabs: Tab[] = [];

    constructor() {
        super();
        new IntersectionController(this, {
            config: {
                root: null,
                rootMargin: '0px',
                threshold: [0, 1],
            },
            callback: () => {
                this.updateSelectionIndicator();
            },
        });
    }

    rovingTabindexController = new RovingTabindexController<Tab>(this, {
        focusInIndex: (elements) => {
            let focusInIndex = 0;
            const firstFocusableElement = elements.find((el, index) => {
                const focusInElement = this.selected
                    ? !el.disabled && el.value === this.selected
                    : !el.disabled;
                focusInIndex = index;
                return focusInElement;
            });
            return firstFocusableElement ? focusInIndex : -1;
        },
        direction: () =>
            this.direction === 'horizontal' ? 'horizontal' : 'vertical',
        elementEnterAction: (el) => {
            if (!this.auto) return;

            this.shouldAnimate = true;
            this.selectTarget(el);
        },
        elements: () => this.tabs,
        isFocusableElement: (el) => !el.disabled,
        listenerScope: () => this.tabList,
    });

    /**
     * @private
     */
    public override get focusElement(): Tab | this {
        return this.rovingTabindexController.focusInElement || this;
    }

    protected override manageAutoFocus(): void {
        const tabs = [...this.children] as Tab[];
        const tabUpdateCompletes = tabs.map((tab) => {
            if (typeof tab.updateComplete !== 'undefined') {
                return tab.updateComplete;
            }
            return Promise.resolve(true);
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

    protected override render(): TemplateResult {
        return html`
            <div
                aria-label=${ifDefined(this.label ? this.label : undefined)}
                @click=${this.onClick}
                @keydown=${this.onKeyDown}
                @sp-tab-contentchange=${this.updateSelectionIndicator}
                id="list"
                role="tablist"
                part="tablist"
            >
                <slot @slotchange=${this.onSlotChange}></slot>
                <div
                    id="selection-indicator"
                    class=${ifDefined(
                        this.shouldAnimate ? undefined : 'first-position'
                    )}
                    style=${this.selectionIndicatorStyle}
                    role="presentation"
                ></div>
            </div>
            <slot name="tab-panel" @slotchange=${this.managePanels}></slot>
        `;
    }

    protected override willUpdate(changes: PropertyValues): void {
        if (!this.hasUpdated) {
            const selectedChild = this.querySelector(
                ':scope > [selected]'
            ) as Tab;
            if (selectedChild) {
                this.selectTarget(selectedChild);
            }
        }

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
        if (changes.has('disabled')) {
            if (this.disabled) {
                this.setAttribute('aria-disabled', 'true');
            } else {
                this.removeAttribute('aria-disabled');
            }
        }
        if (
            !this.shouldAnimate &&
            typeof changes.get('shouldAnimate') !== 'undefined'
        ) {
            this.shouldAnimate = true;
        }
    }

    private onClick = (event: Event): void => {
        if (this.disabled) {
            return;
        }
        const target = event
            .composedPath()
            .find((el) => (el as Tab).parentElement === this) as Tab;
        if (!target || target.disabled) {
            return;
        }
        this.shouldAnimate = true;
        this.selectTarget(target);
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
            this.selectionIndicatorStyle = noSelectionStyle;
            return;
        }
        await Promise.all([
            selectedElement.updateComplete,
            document.fonts ? document.fonts.ready : Promise.resolve(),
        ]);
        const tabBoundingClientRect = selectedElement.getBoundingClientRect();
        const tabPanelClientRect = this.getBoundingClientRect();

        if (this.direction === 'horizontal') {
            const width = tabBoundingClientRect.width;
            const offset = tabBoundingClientRect.left - tabPanelClientRect.left;

            this.selectionIndicatorStyle = `transform: translateX(${offset}px) scaleX(${width});`;
        } else {
            const height = tabBoundingClientRect.height;
            const offset = tabBoundingClientRect.top - tabPanelClientRect.top;

            this.selectionIndicatorStyle = `transform: translateY(${offset}px) scaleY(${height});`;
        }
    };

    private tabChangePromise = Promise.resolve();
    private tabChangeResolver: () => void = function () {
        return;
    };

    protected override async getUpdateComplete(): Promise<boolean> {
        const complete = (await super.getUpdateComplete()) as boolean;
        await this.tabChangePromise;
        return complete;
    }

    public override connectedCallback(): void {
        super.connectedCallback();
        window.addEventListener('resize', this.updateSelectionIndicator);
        if ('fonts' in document) {
            (
                document as unknown as {
                    fonts: {
                        addEventListener: (
                            name: string,
                            callback: () => void
                        ) => void;
                    };
                }
            ).fonts.addEventListener(
                'loadingdone',
                this.updateSelectionIndicator
            );
        }
    }

    public override disconnectedCallback(): void {
        window.removeEventListener('resize', this.updateSelectionIndicator);
        if ('fonts' in document) {
            (
                document as unknown as {
                    fonts: {
                        removeEventListener: (
                            name: string,
                            callback: () => void
                        ) => void;
                    };
                }
            ).fonts.removeEventListener(
                'loadingdone',
                this.updateSelectionIndicator
            );
        }
        super.disconnectedCallback();
    }
}

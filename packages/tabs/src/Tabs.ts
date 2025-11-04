/**
 * Copyright 2025 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import {
    css,
    CSSResult,
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
import {
    classMap,
    ifDefined,
} from '@spectrum-web-components/base/src/directives.js';
import { IntersectionController } from '@lit-labs/observers/intersection-controller.js';
import { ResizeController } from '@lit-labs/observers/resize-controller.js';
import { Tab } from './Tab.js';
import { Focusable } from '@spectrum-web-components/shared';
import { RovingTabindexController } from '@spectrum-web-components/reactive-controllers/src/RovingTabindex.js';

import tabStyles from './tabs.css.js';
import tabSizes from './tabs-sizes.css.js';
import { TabPanel } from './TabPanel.js';

// Encapsulated for use both here and in TopNav
export const ScaledIndicator = {
    baseSize: 100 as const,
    noSelectionStyle: 'transform: translateX(0px) scaleX(0) scaleY(0)',

    transformX(left: number, width: number): string {
        const scale = width / this.baseSize;
        return `transform: translateX(${left}px) scaleX(${scale});`;
    },

    transformY(top: number, height: number): string {
        const scale = height / this.baseSize;
        return `transform: translateY(${top}px) scaleY(${scale});`;
    },

    baseStyles(): CSSResult {
        return css`
            :host([direction='vertical-right']) #selection-indicator,
            :host([direction='vertical']) #selection-indicator {
                height: ${this.baseSize}px;
            }
            :host([dir][direction='horizontal']) #selection-indicator {
                width: ${this.baseSize}px;
            }
        `;
    },
};

/**
 * Given that the scroll needs to be on the right side of the viewport.
 * Returns the coordonate x it needs to scroll so that the tab with given index is visible.
 */
export function calculateScrollTargetForRightSide(
    index: number,
    direction: 'rtl' | 'ltr',
    tabs: Tab[],
    container: HTMLDivElement
): number {
    const nextIndex = index + (direction === 'rtl' ? -1 : 1);
    const nextTab = tabs[nextIndex];
    const viewportEnd = container.scrollLeft + container.offsetWidth;
    return nextTab ? nextTab.offsetLeft - container.offsetWidth : viewportEnd;
}

/**
 * Given that the scroll needs to be on the left side of the viewport.
 * Returns the coordonate x it needs to scroll so that the tab with given index is visible.
 */
export function calculateScrollTargetForLeftSide(
    index: number,
    direction: 'rtl' | 'ltr',
    tabs: Tab[],
    container: HTMLDivElement
): number {
    const prevIndex = index + (direction === 'rtl' ? 1 : -1);
    const prevTab = tabs[prevIndex];
    const leftmostElement = direction === 'rtl' ? -container.offsetWidth : 0;
    return prevTab ? prevTab.offsetLeft + prevTab.offsetWidth : leftmostElement;
}

/**
 * @element sp-tabs
 *
 * @slot - Tab elements to manage as a group
 * @slot tab-panel - Tab Panel elements related to the listed Tab elements
 * @csspart tablist - Container element for the slotted sp-tab elements
 *
 * @fires change - The selected Tab child has changed.
 */
export class Tabs extends SizedMixin(Focusable, { noDefaultSize: true }) {
    public static override get styles(): CSSResultArray {
        return [tabSizes, tabStyles, ScaledIndicator.baseStyles()];
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
    public override dir!: 'ltr' | 'rtl';

    @property({ reflect: true })
    public direction: 'vertical' | 'vertical-right' | 'horizontal' =
        'horizontal';

    @property({ type: Boolean, reflect: true })
    public emphasized = false;

    @property()
    public label = '';

    @property({ type: Boolean })
    public enableTabsScroll = false;

    /**
     * The tab list is displayed without a border.
     */
    @property({ type: Boolean, reflect: true })
    public quiet = false;

    @property({ attribute: false })
    public selectionIndicatorStyle = ScaledIndicator.noSelectionStyle;

    @property({ attribute: false })
    public shouldAnimate = false;

    @query('slot')
    private slotEl!: HTMLSlotElement;

    @query('#list')
    protected tabList!: HTMLDivElement;

    @property({ reflect: true })
    selected = '';

    private set tabs(tabs: Tab[]) {
        if (tabs === this.tabs) return;
        this._tabs.forEach((tab) => {
            this.resizeController.unobserve(tab);
        });
        tabs.forEach((tab) => {
            this.resizeController.observe(tab);
        });
        this._tabs = tabs;
        this.rovingTabindexController.clearElementCache();
    }

    protected get tabs(): Tab[] {
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

    protected resizeController = new ResizeController(this, {
        callback: () => {
            this.updateSelectionIndicator();
        },
    });

    rovingTabindexController = new RovingTabindexController<Tab>(this, {
        focusInIndex: (elements) => {
            let focusInIndex = 0;
            const firstFocusableElement = elements.find((el, index) => {
                const focusInElement = this.selected
                    ? el.value === this.selected
                    : !el.disabled;
                focusInIndex = index;
                return focusInElement;
            });
            return firstFocusableElement ? focusInIndex : -1;
        },
        direction: () => 'both',
        elementEnterAction: (el) => {
            if (!this.auto) return;

            this.shouldAnimate = true;
            this.selectTarget(el);
        },
        elements: () => this.tabs,
        isFocusableElement: (el) => !this.disabled && !el.disabled,
        listenerScope: () => this.tabList,
    });

    /**
     * @private
     */
    public override get focusElement(): Tab | this {
        return this.rovingTabindexController.focusInElement || this;
    }

    private limitDeltaToInterval(min: number, max: number) {
        return (delta: number): number => {
            if (delta < min) return min;
            if (delta > max) return max;
            return delta;
        };
    }

    /**
     * Scrolls through the tabs component, on the X-axis, by a given ammount of pixels/ delta. The given delta is limited to the scrollable area of the tabs component.
     * @param {number} delta - The ammount of pixels to scroll by. If the value is positive, the tabs will scroll to the right. If the value is negative, the tabs will scroll to the left.
     * @param {ScrollBehavior} behavior - The scroll behavior to use. Defaults to 'smooth'.
     */
    public scrollTabs(
        delta: number,
        behavior: ScrollBehavior = 'smooth'
    ): void {
        if (delta === 0) return;

        const { scrollLeft, clientWidth, scrollWidth } = this.tabList;
        const dirLimit = scrollWidth - clientWidth - Math.abs(scrollLeft);

        const limitDelta =
            this.dir === 'ltr'
                ? this.limitDeltaToInterval(-scrollLeft, dirLimit)
                : this.limitDeltaToInterval(-dirLimit, Math.abs(scrollLeft));

        this.tabList?.scrollBy({
            left: limitDelta(delta),
            top: 0,
            behavior,
        });
    }

    public get scrollState(): Record<string, boolean> {
        if (this.tabList) {
            const { scrollLeft, clientWidth, scrollWidth } = this.tabList;
            const canScrollLeft = Math.abs(scrollLeft) > 0;
            const canScrollRight =
                Math.ceil(Math.abs(scrollLeft)) < scrollWidth - clientWidth;
            return {
                canScrollLeft:
                    this.dir === 'ltr' ? canScrollLeft : canScrollRight,
                canScrollRight:
                    this.dir === 'ltr' ? canScrollRight : canScrollLeft,
            };
        }
        return {};
    }

    override async getUpdateComplete(): Promise<boolean> {
        const complete = await super.getUpdateComplete();

        const tabs = [...this.children] as Tab[];
        const tabUpdateCompletes = tabs.map((tab) => {
            if (typeof tab.updateComplete !== 'undefined') {
                return tab.updateComplete;
            }
            return Promise.resolve(true);
        });

        await Promise.all(tabUpdateCompletes);
        return complete;
    }

    protected getNecessaryAutoScroll(index: number): number {
        const selectedTab = this.tabs[index];
        const selectionEnd = selectedTab.offsetLeft + selectedTab.offsetWidth;
        const viewportEnd = this.tabList.scrollLeft + this.tabList.offsetWidth;
        const selectionStart = selectedTab.offsetLeft;
        const viewportStart = this.tabList.scrollLeft;

        if (selectionEnd > viewportEnd) {
            // Selection is on the right side, not visible.
            return calculateScrollTargetForRightSide(
                index,
                this.dir,
                this.tabs,
                this.tabList
            );
        } else if (selectionStart < viewportStart) {
            // Selection is on the left side, not visible.
            return calculateScrollTargetForLeftSide(
                index,
                this.dir,
                this.tabs,
                this.tabList
            );
        }

        return -1;
    }

    public async scrollToSelection(): Promise<void> {
        if (!this.enableTabsScroll || !this.selected) {
            return;
        }

        await this.updateComplete;

        const selectedIndex = this.tabs.findIndex(
            (tab) => tab.value === this.selected
        );

        if (selectedIndex !== -1 && this.tabList) {
            // We have a selection, calculate the scroll needed to bring it into view
            const scrollTarget = this.getNecessaryAutoScroll(selectedIndex);

            // scrollTarget = -1 means it is already into view.
            if (scrollTarget !== -1) {
                this.tabList.scrollTo({ left: scrollTarget });
            }
        }
    }

    protected override updated(changedProperties: PropertyValues<this>): void {
        super.updated(changedProperties);

        if (changedProperties.has('selected')) {
            this.scrollToSelection();
        }
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
                class=${classMap({ scroll: this.enableTabsScroll })}
                aria-label=${ifDefined(this.label ? this.label : undefined)}
                @click=${this.onClick}
                @keydown=${this.onKeyDown}
                @scroll=${this.onTabsScroll}
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

        super.willUpdate(changes);
        if (changes.has('selected')) {
            if (this.tabs.length) {
                this.updateCheckedState();
            }
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

    private onTabsScroll = (): void => {
        this.dispatchEvent(
            new Event('sp-tabs-scroll', {
                bubbles: true,
                composed: true,
            })
        );
    };

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
        this.tabs = this.slotEl
            .assignedElements()
            .filter((el) => el.getAttribute('role') === 'tab') as Tab[];
        this.updateCheckedState();
    }

    private updateCheckedState = (): void => {
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
    };

    private updateSelectionIndicator = async (): Promise<void> => {
        const selectedElement = this.tabs.find((el) => el.selected);
        if (!selectedElement) {
            this.selectionIndicatorStyle = ScaledIndicator.noSelectionStyle;
            return;
        }
        await Promise.all([
            selectedElement.updateComplete,
            document.fonts ? document.fonts.ready : Promise.resolve(),
        ]);
        const { width, height } = selectedElement.getBoundingClientRect();

        this.selectionIndicatorStyle =
            this.direction === 'horizontal'
                ? ScaledIndicator.transformX(selectedElement.offsetLeft, width)
                : ScaledIndicator.transformY(selectedElement.offsetTop, height);
    };

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

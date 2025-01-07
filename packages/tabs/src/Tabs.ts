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
    css,
    CSSResult,
    CSSResultArray,
    html,
    PropertyValueMap,
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

/**
 * ScaledIndicator provides utility methods and styles for scaling and transforming
 * the selection indicator in the Tabs component.
 *
 * Encapsulated for use both here and in TopNav
 */
export const ScaledIndicator = {
    baseSize: 100 as const, // The base size for scaling the selection indicator.

    noSelectionStyle: 'transform: translateX(0px) scaleX(0) scaleY(0)', // The style for no selection.

    /**
     * Transforms the selection indicator horizontally.
     * Calculates the scale based on the width and translates the indicator to the specified left position.
     */
    transformX(left: number, width: number): string {
        const scale = width / this.baseSize;

        return `transform: translateX(${left}px) scaleX(${scale});`;
    },

    /**
     * Transforms the selection indicator vertically.
     * Calculates the scale based on the height and translates the indicator to the specified top position.
     */
    transformY(top: number, height: number): string {
        const scale = height / this.baseSize;

        return `transform: translateY(${top}px) scaleY(${scale});`;
    },

    /**
     * Returns the base styles for the selection indicator.
     * These styles set the width or height of the indicator based on the direction.
     */
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
 * The `Tabs` component is a custom web component that manages a group of tab elements.
 *
 * @element sp-tabs
 *
 * @slot - Tab elements to manage as a group
 * @slot tab-panel - Tab Panel elements related to the listed Tab elements
 *
 * @fires change - The selected Tab child has changed.
 * @fires sp-tabs-scroll - The tabs have been scrolled.
 *
 * @csspart tablist - Container element for the slotted sp-tab elements
 */
export class Tabs extends SizedMixin(Focusable, { noDefaultSize: true }) {
    /**
     * Returns the styles to be applied to the component.
     */
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
     *
     * This property is reflected as an attribute, meaning changes to the property
     * will be mirrored in the corresponding HTML attribute.
     */
    @property({ type: Boolean, reflect: true })
    public compact = false;

    /**
     * The direction of the text within the tabs component.
     *
     * This property is reflected as an attribute, meaning changes to the property
     * will be mirrored in the corresponding HTML attribute.
     */
    @property({ reflect: true })
    public override dir!: 'ltr' | 'rtl';

    /**
     * The direction of the tabs component.
     *
     * This property is reflected as an attribute, meaning changes to the property
     * will be mirrored in the corresponding HTML attribute.
     */
    @property({ reflect: true })
    public direction: 'vertical' | 'vertical-right' | 'horizontal' =
        'horizontal';

    /**
     * Indicates whether the tabs are emphasized.
     *
     * This property is reflected as an attribute, meaning changes to the property
     * will be mirrored in the corresponding HTML attribute.
     */
    @property({ type: Boolean, reflect: true })
    public emphasized = false;

    /**
     * The label for the aria-label in the tabs component.
     *
     * This property provides an accessible name for the tabs component.
     */
    @property()
    public label = '';

    /**
     * Enables scrolling for the tabs if there are more tabs than can fit in the available space.
     */
    @property({ type: Boolean })
    public enableTabsScroll = false;

    /**
     * The tab list is displayed without a border.
     *
     * This property is reflected as an attribute, meaning changes to the property
     * will be mirrored in the corresponding HTML attribute.
     */
    @property({ type: Boolean, reflect: true })
    public quiet = false;

    /**
     * The style for the selection indicator.
     *
     * This property is used to set the CSS style for the selection indicator.
     */
    @property({ attribute: false })
    public selectionIndicatorStyle = ScaledIndicator.noSelectionStyle;

    /**
     * Indicates whether the selection indicator should animate.
     *
     * This property is used to control the animation of the selection indicator.
     */
    @property({ attribute: false })
    public shouldAnimate = false;

    /**
     * Query to select the slot element within the component.
     */
    @query('slot')
    private slotEl!: HTMLSlotElement;

    /**
     * Query to select the tab list element within the component.
     */
    @query('#list')
    private tabList!: HTMLDivElement;

    /**
     * The selected tab.
     *
     * This property is reflected as an attribute, meaning changes to the property
     * will be mirrored in the corresponding HTML attribute.
     */
    @property({ reflect: true })
    selected = '';

    /**
     * Sets the tabs managed by the component.
     *
     * Observes the new tabs for resize events and updates the internal tabs array.
     */
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

    /**
     * Gets the tabs managed by the component.
     */
    private get tabs(): Tab[] {
        return this._tabs;
    }

    /**
     * Internal array to store the tabs.
     */
    private _tabs: Tab[] = [];

    constructor() {
        super();
        // Initialize IntersectionController to observe the visibility of the tabs component.
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

    /**
     * Controller to manage resize events for the tabs component.
     *
     * Updates the selection indicator when the component is resized.
     */
    protected resizeController = new ResizeController(this, {
        callback: () => {
            this.updateSelectionIndicator();
        },
    });

    // Controller to manage roving tabindex for the tab elements.
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
        direction: () => 'both',
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
     * Gets the focusable element within the tabs component.
     */
    public override get focusElement(): Tab | this {
        return this.rovingTabindexController.focusInElement || this;
    }

    /**
     * Limits the delta value to the specified interval.
     */
    private limitDeltaToInterval(min: number, max: number) {
        return (delta: number): number => {
            if (delta < min) return min;

            if (delta > max) return max;

            return delta;
        };
    }

    /**
     * Scrolls through the tabs component, on the X-axis, by a given amount of pixels/delta.
     * The given delta is limited to the scrollable area of the tabs component.
     *
     * @param delta - The amount of pixels to scroll by. If the value is positive, the tabs will scroll to the right. If the value is negative, the tabs will scroll to the left.
     * @param behavior - The scroll behavior to use. Defaults to 'smooth'.
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

    /**
     * Gets the scroll state of the tabs component.
     * Determines whether the tabs can scroll left or right based on the current scroll position and direction.
     */
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

    /**
     * Lifecycle method called when the component updates.
     * Waits for the update to complete and ensures all child tabs have completed their updates.
     */
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

    /**
     * Calculates the necessary scroll amount to bring the selected tab into view.
     */
    private getNecessaryAutoScroll(index: number): number {
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

    /**
     * Scrolls the tabs component to bring the selected tab into view.
     */
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

    /**
     * Lifecycle method called when the component updates.
     * Checks if the 'selected' property has changed and scrolls to the selected tab if necessary.
     */
    protected override updated(
        changedProperties: PropertyValueMap<this>
    ): void {
        super.updated(changedProperties);

        if (changedProperties.has('selected')) {
            this.scrollToSelection();
        }
    }

    /**
     * Manages the tab panels associated with the tabs component.
     * Sets the appropriate ARIA attributes and updates the selected state of each panel.
     */
    protected managePanels({
        target,
    }: Event & { target: HTMLSlotElement }): void {
        const panels = target.assignedElements() as TabPanel[];

        panels.map((panel) => {
            const { value, id } = panel;
            const tab = this.querySelector(`[role="tab"][value="${value}"]`);

            if (tab) {
                // Set ARIA attributes to link the tab and panel.
                tab.setAttribute('aria-controls', id);
                panel.setAttribute('aria-labelledby', tab.id);
            }

            // Update the selected state of the panel.
            panel.selected = value === this.selected;
        });
    }

    /**
     * Renders the content of the tabs component.
     * This method returns a template result containing the tab list and tab panels.
     */
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

    /**
     * Lifecycle method called before the component updates.
     * Handles initial selection, updates checked state, and manages ARIA attributes based on property changes.
     */
    protected override willUpdate(changes: PropertyValues): void {
        // Handle initial selection if the component has not updated yet
        if (!this.hasUpdated) {
            const selectedChild = this.querySelector(
                ':scope > [selected]'
            ) as Tab;

            if (selectedChild) {
                this.selectTarget(selectedChild);
            }
        }

        super.willUpdate(changes);

        // Update checked state if the 'selected' property has changed
        if (changes.has('selected')) {
            if (this.tabs.length) {
                this.updateCheckedState();
            }

            // Update the previously selected tab panel
            if (changes.get('selected')) {
                const previous = this.querySelector(
                    `[role="tabpanel"][value="${changes.get('selected')}"]`
                ) as TabPanel;

                if (previous) previous.selected = false;
            }

            // Update the newly selected tab panel
            const next = this.querySelector(
                `[role="tabpanel"][value="${this.selected}"]`
            ) as TabPanel;

            if (next) next.selected = true;
        }

        // Update ARIA orientation attribute if the 'direction' property has changed
        if (changes.has('direction')) {
            if (this.direction === 'horizontal') {
                this.removeAttribute('aria-orientation');
            } else {
                this.setAttribute('aria-orientation', 'vertical');
            }
        }

        // Update the selection indicator if the 'dir' property has changed
        if (changes.has('dir')) {
            this.updateSelectionIndicator();
        }

        // Update ARIA disabled attribute if the 'disabled' property has changed
        if (changes.has('disabled')) {
            if (this.disabled) {
                this.setAttribute('aria-disabled', 'true');
            } else {
                this.removeAttribute('aria-disabled');
            }
        }

        // Enable animation if the 'shouldAnimate' property has changed
        if (
            !this.shouldAnimate &&
            typeof changes.get('shouldAnimate') !== 'undefined'
        ) {
            this.shouldAnimate = true;
        }
    }

    /**
     * Handles the scroll event on the tabs component.
     * Dispatches a custom 'sp-tabs-scroll' event when the tabs are scrolled.
     */
    private onTabsScroll = (): void => {
        this.dispatchEvent(
            new Event('sp-tabs-scroll', {
                bubbles: true,
                composed: true,
            })
        );
    };

    /**
     * Handles the click event on the tabs component.
     * Selects the clicked tab if it is not disabled.
     */
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

    /**
     * Handles the keydown event on the tabs component.
     * Selects the target tab if the Enter or Space key is pressed.
     */
    private onKeyDown = (event: KeyboardEvent): void => {
        if (event.code === 'Enter' || event.code === 'Space') {
            event.preventDefault();
            const target = event.target as HTMLElement;

            if (target) {
                this.selectTarget(target);
            }
        }
    };

    /**
     * Selects the target tab.
     * Dispatches a 'change' event and updates the selected tab if the event is not canceled.
     */
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

    /**
     * Handles the slotchange event.
     * Updates the tabs array and the checked state of the tabs.
     */
    private onSlotChange(): void {
        this.tabs = this.slotEl
            .assignedElements()
            .filter((el) => el.getAttribute('role') === 'tab') as Tab[];

        this.updateCheckedState();
    }

    /**
     * Updates the checked state of the tabs.
     * Removes the 'selected' attribute from all tabs and sets it on the currently selected tab.
     * If no tab is selected, the first tab is set as selected.
     */
    private updateCheckedState = (): void => {
        // Remove the 'selected' attribute from all tabs
        this.tabs.forEach((element) => {
            element.removeAttribute('selected');
        });

        // Check if a tab is currently selected
        if (this.selected) {
            // Find the tab with the value matching the selected value
            const currentChecked = this.tabs.find(
                (el) => el.value === this.selected
            );

            // If a matching tab is found, set it as selected, otherwise clear the selected value
            if (currentChecked) {
                currentChecked.selected = true;
            } else {
                this.selected = '';
            }
        } else {
            // If no tab is selected, set the first tab as selected
            const firstTab = this.tabs[0];

            if (firstTab) {
                firstTab.setAttribute('tabindex', '0');
            }
        }

        // Update the selection indicator to reflect the new state
        this.updateSelectionIndicator();
    };

    /**
     * Updates the selection indicator to reflect the currently selected tab.
     */
    private updateSelectionIndicator = async (): Promise<void> => {
        // Find the currently selected tab element
        const selectedElement = this.tabs.find((el) => el.selected);

        // If no tab is selected, set the selection indicator style to no selection and return
        if (!selectedElement) {
            this.selectionIndicatorStyle = ScaledIndicator.noSelectionStyle;

            return;
        }

        // Wait for the selected element to complete updating and for fonts to be ready
        await Promise.all([
            selectedElement.updateComplete,
            document.fonts ? document.fonts.ready : Promise.resolve(),
        ]);

        // Get the dimensions of the selected element
        const { width, height } = selectedElement.getBoundingClientRect();

        // Update the selection indicator style based on the direction of the tabs
        this.selectionIndicatorStyle =
            this.direction === 'horizontal'
                ? ScaledIndicator.transformX(selectedElement.offsetLeft, width)
                : ScaledIndicator.transformY(selectedElement.offsetTop, height);
    };

    /**
     * Called when the element is added to the document's DOM.
     * Sets up event listeners for window resize and font loading events to update the selection indicator.
     */
    public override connectedCallback(): void {
        super.connectedCallback();

        // Add event listener for window resize to update the selection indicator
        window.addEventListener('resize', this.updateSelectionIndicator);

        // Check if the document supports the fonts API
        if ('fonts' in document) {
            // Add event listener for font loading completion to update the selection indicator
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

    /**
     * Called when the element is removed from the document's DOM.
     * Cleans up event listeners for window resize and font loading events.
     */
    public override disconnectedCallback(): void {
        // Remove event listener for window resize
        window.removeEventListener('resize', this.updateSelectionIndicator);

        // Check if the document supports the fonts API
        if ('fonts' in document) {
            // Remove event listener for font loading completion
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

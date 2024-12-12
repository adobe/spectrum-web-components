/*
Copyright 2022 Adobe. All rights reserved.
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
    PropertyValueMap,
    PropertyValues,
    SizedMixin,
    SpectrumElement,
    TemplateResult,
} from '@spectrum-web-components/base';
import {
    property,
    query,
    queryAssignedElements,
    state,
} from '@spectrum-web-components/base/src/decorators.js';
import { classMap } from '@spectrum-web-components/base/src/directives.js';
import { ResizeController } from '@lit-labs/observers/resize-controller.js';
import { Tabs } from './Tabs.js';
import '@spectrum-web-components/action-button/sp-action-button.js';
import '@spectrum-web-components/icons-ui/icons/sp-icon-chevron100.js';
import chevronIconStyles from '@spectrum-web-components/icon/src/spectrum-icon-chevron.css.js';
import chevronIconOverrides from '@spectrum-web-components/icon/src/icon-chevron-overrides.css.js';
import tabSizes from './tabs-sizes.css.js';
import styles from './tabs-overflow.css.js';

interface TabsOverflowState {
    canScrollLeft: boolean;
    canScrollRight: boolean;
}
/**
 * @element sp-tabs-overflow
 *
 * This component handles the overflow behavior of tabs, allowing users to scroll through tabs when they exceed the available space.
 */
export class TabsOverflow extends SizedMixin(SpectrumElement) {
    /**
     * Returns the styles to be applied to the component.
     */
    public static override get styles(): CSSResultArray {
        return [styles, tabSizes, chevronIconStyles, chevronIconOverrides];
    }

    /**
     * Indicates if the tabs are in compact mode.
     */
    @property({ type: Boolean, reflect: true })
    public compact = false;

    /**
     * The label for the button to scroll to previous tabs.
     */
    @property({ type: String, attribute: 'label-previous' })
    public labelPrevious = 'Scroll to previous tabs';

    /**
     * The label for the button to scroll to next tabs.
     */
    @property({ type: String, attribute: 'label-next' })
    public labelNext = 'Scroll to next tabs';

    /**
     * The text direction of the tabs.
     */
    @property({ reflect: true })
    public override dir!: 'ltr' | 'rtl';

    /**
     * The state of the overflow, indicating if scrolling is possible.
     */
    @state()
    private overflowState: TabsOverflowState = {
        canScrollLeft: false,
        canScrollRight: false,
    };

    /**
     * The list of tab elements assigned to the slot.
     */
    @queryAssignedElements({ selector: 'sp-tabs', flatten: true })
    private scrollContent!: Tabs[];

    /**
     * The container element for the tabs overflow.
     */
    @query('.tabs-overflow-container')
    private overflowContainer!: HTMLDivElement;

    /**
     * Controller to handle resize events.
     */
    resizeController!: ResizeController;

    /**
     * Constructor to initialize the resize controller.
     */
    public constructor() {
        super();

        this.resizeController = new ResizeController(this, {
            target: this,
            callback: (): void => {
                this._updateScrollState();
            },
        });
    }

    /**
     * Called after the element's DOM has been updated the first time.
     * Sets up the scroll event listener and observes the overflow container for resize events.
     */
    protected override firstUpdated(changes: PropertyValues): void {
        super.firstUpdated(changes);
        // Enable scroll event
        const [tabs] = this.scrollContent;

        if (tabs) {
            tabs.enableTabsScroll = true;
        }

        this.resizeController.observe(this.overflowContainer);
    }

    /**
     * Handles changes to the slot content.
     * Waits for the tabs element to complete updating and then updates the scroll state.
     */
    private async _handleSlotChange(): Promise<void> {
        const [tabsElement] = this.scrollContent;

        await tabsElement?.updateComplete;
        this._updateScrollState();
    }

    /**
     * Updates the state of the overflow, indicating if scrolling is possible.
     */
    private _updateScrollState(): void {
        const { scrollContent, overflowState } = this;

        if (scrollContent) {
            const [tabsElement] = this.scrollContent;
            const { canScrollLeft, canScrollRight } =
                tabsElement?.scrollState || {
                    canScrollLeft: false,
                    canScrollRight: false,
                };

            this.overflowState = {
                ...overflowState,
                canScrollLeft,
                canScrollRight,
            };
        }
    }

    /**
     * Factor by which the tabs should scroll when a scroll button is clicked.
     * @property {number}
     */
    private scrollFactor = 0.5;

    /**
     * Handles click events on the scroll buttons.
     * Scrolls the tabs left or right based on the button clicked.
     */
    private _handleScrollClick(event: MouseEvent): void {
        const currentTarget = event.currentTarget as HTMLElement;
        const [tabsElement] = this.scrollContent;

        const dist = tabsElement.clientWidth * this.scrollFactor;
        const left = currentTarget.classList.contains('left-scroll')
            ? -dist
            : dist;

        tabsElement.scrollTabs(left, 'smooth');
    }

    protected override updated(
        changedProperties: PropertyValueMap<this>
    ): void {
        super.updated(changedProperties);

        if (changedProperties.has('dir')) {
            this._updateScrollState();
        }
    }

    /**
     * Renders the component template.
     * Displays the scroll buttons and the slot for tab elements.
     */
    protected override render(): TemplateResult {
        const { canScrollRight, canScrollLeft } = this.overflowState;
        const ariaLabelPrevious = this.labelPrevious;
        const ariaLabelNext = this.labelNext;

        return html`
            <div
                class=${classMap({
                    'tabs-overflow-container': true,
                    'left-shadow': canScrollLeft,
                    'right-shadow': canScrollRight,
                })}
            >
                <sp-action-button
                    class=${classMap({
                        'left-scroll': true,
                        show: canScrollLeft,
                    })}
                    aria-label=${ariaLabelPrevious}
                    quiet
                    dir="rtl"
                    tabindex="-1"
                    @click=${this._handleScrollClick}
                >
                    <sp-icon-chevron100
                        slot="icon"
                        class="spectrum-UIIcon-ChevronLeft300"
                    ></sp-icon-chevron100>
                </sp-action-button>
                <sp-action-button
                    class=${classMap({
                        'right-scroll': true,
                        show: canScrollRight,
                    })}
                    aria-label=${ariaLabelNext}
                    quiet
                    tabindex="-1"
                    @click=${this._handleScrollClick}
                >
                    <sp-icon-chevron100
                        slot="icon"
                        class="spectrum-UIIcon-ChevronRight300"
                    ></sp-icon-chevron100>
                </sp-action-button>
                <slot
                    @slotchange=${this._handleSlotChange}
                    @sp-tabs-scroll=${this._updateScrollState}
                ></slot>
            </div>
        `;
    }
}

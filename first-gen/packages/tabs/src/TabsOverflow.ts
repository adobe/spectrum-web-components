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
import tabSizes from './tabs-sizes.css.js';
import styles from './tabs-overflow.css.js';

interface TabsOverflowState {
    canScrollLeft: boolean;
    canScrollRight: boolean;
}
/**
 * @element sp-tabs-overflow
 */
export class TabsOverflow extends SizedMixin(SpectrumElement) {
    public static override get styles(): CSSResultArray {
        return [styles, tabSizes, chevronIconStyles];
    }

    @property({ type: Boolean, reflect: true })
    public compact = false;

    @property({ type: String, attribute: 'label-previous' })
    public labelPrevious = 'Scroll to previous tabs';

    @property({ type: String, attribute: 'label-next' })
    public labelNext = 'Scroll to next tabs';

    @property({ reflect: true })
    public override dir!: 'ltr' | 'rtl';

    @state()
    private overflowState: TabsOverflowState = {
        canScrollLeft: false,
        canScrollRight: false,
    };

    @queryAssignedElements({ selector: 'sp-tabs', flatten: true })
    private tabs!: Tabs[];

    @query('.tabs-overflow-container')
    private overflowContainer!: HTMLDivElement;

    resizeController!: ResizeController;

    protected get scrollContent(): Tabs[] {
        return this.tabs;
    }

    public constructor() {
        super();
        this.resizeController = new ResizeController(this, {
            target: this,
            callback: (): void => {
                this._updateScrollState();
            },
        });
    }

    protected override firstUpdated(changes: PropertyValues): void {
        super.firstUpdated(changes);
        // enable scroll event
        const [tabs] = this.scrollContent;
        if (tabs) {
            tabs.enableTabsScroll = true;
        }
        this.resizeController.observe(this.overflowContainer);
    }

    private async _handleSlotChange(): Promise<void> {
        const [tabsElement] = this.scrollContent;
        await tabsElement?.updateComplete;
        this._updateScrollState();
    }

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

    private scrollFactor = 0.5;
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

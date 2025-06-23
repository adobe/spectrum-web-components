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
    PropertyValues,
    SpectrumElement,
    TemplateResult,
} from '@spectrum-web-components/base';
import {
    property,
    query,
    queryAssignedElements,
    state,
} from '@spectrum-web-components/base/src/decorators.js';
import '@spectrum-web-components/breadcrumbs/sp-breadcrumb-item.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-folder-open.js';
import '@spectrum-web-components/action-menu/sp-action-menu.js';
import '@spectrum-web-components/menu/sp-menu-item.js';
import { ActionMenu } from '@spectrum-web-components/action-menu';
import {
    BreadcrumbItem as BreadcrumbElement,
    BreadcrumbSelectDetail,
} from './BreadcrumbItem.js';
import {
    createRef,
    Ref,
    ref,
} from '@spectrum-web-components/base/src/directives.js';

import styles from './breadcrumbs.css.js';
import { ifDefined } from '@spectrum-web-components/base/src/directives.js';

type BreadcrumbItem = {
    label?: string;
    href?: string;
    value: string;
    offsetWidth: number;
    isVisible: boolean; // false if displayed in menu overlay
};

/**
 * @element sp-breadcrumbs
 *
 * @slot icon - change the default icon of the action menu
 * @slot root - Breadcrumb item to always display
 * @slot - Breadcrumb items
 * @fires change - Announces the selected breadcrumb item
 */
export class Breadcrumbs extends SpectrumElement {
    public static override get styles(): CSSResultArray {
        return [styles];
    }

    /**
     * Override the maximum number of visible items
     */
    @property({ type: Number, attribute: 'max-visible-items' })
    public maxVisibleItems = 4;

    /**
     * Accessible name for the Breadcrumbs component
     */
    @property({ type: String })
    public label = '';

    /**
     * Change the default label of the action menu
     */
    @property({ type: String, attribute: 'menu-label' })
    public menuLabel = 'More items';

    /**
     *  compact option is useful for reducing the height of the breadcrumbs
     */
    @property({ type: Boolean })
    public compact = false;

    @queryAssignedElements({ selector: 'sp-breadcrumb-item' })
    private breadcrumbsElements!: BreadcrumbElement[];

    @queryAssignedElements({ slot: 'root', selector: 'sp-breadcrumb-item' })
    private rootElement!: BreadcrumbElement[];

    @query('#list')
    private list!: HTMLUListElement;

    @state()
    private items: BreadcrumbItem[] = [];

    @state()
    private visibleItems = 0;

    private resizeObserver: ResizeObserver | undefined;
    private firstRender = true;

    private menuRef: Ref<ActionMenu> = createRef();

    private get hasMenu(): boolean {
        return this.visibleItems < (this.breadcrumbsElements?.length ?? 0);
    }

    override connectedCallback(): void {
        super.connectedCallback();

        if (!this.hasAttribute('role')) {
            this.setAttribute('role', 'navigation');
        }

        this.resizeObserver = new ResizeObserver(() => {
            if (this.firstRender) {
                // Don't adjust overflow on first render, it is adjused in slotChangeHandler
                this.firstRender = false;
                return;
            }
            this.adjustOverflow();
        });

        this.resizeObserver.observe(this);
    }

    public override disconnectedCallback(): void {
        this.resizeObserver?.unobserve(this);
        super.disconnectedCallback();
    }

    override updated(changes: PropertyValues): void {
        super.updated(changes);

        if (changes.has('label')) {
            this.setAttribute('aria-label', this.label || 'Breadcrumbs');
        }

        /**
         * Re-run the calculation of how many breadcrumbs fit in the available space.
         * maxVisibleItems may allow us to show more items, or less
         * compact affects the space each item occupies
         */
        if (changes.has('maxVisibleItems') || changes.has('compact')) {
            this.calculateBreadcrumbItemsWidth();
            this.adjustOverflow();
        }

        // Breadcrumbs items were added / removed, or available space changed
        if (changes.has('visibleItems')) {
            this.items.forEach((item, index) => {
                this.breadcrumbsElements[index].isLastOfType =
                    index === this.breadcrumbsElements.length - 1;

                this.breadcrumbsElements[index].toggleAttribute(
                    'hidden',
                    !item.isVisible
                );
            });
        }
    }

    /**
     * We need to understand how much space (px) each breadcrumb item occupies,
     * in order to know if it fits the available horizontal space.
     */
    private calculateBreadcrumbItemsWidth(): void {
        this.items = this.breadcrumbsElements.map((el, index) => {
            let width = el.offsetWidth;

            /**
             * For breadcrumbs which are hidden,
             * we need to temporarily remove the hidden attribute to calculate the width.
             */
            if (el.hasAttribute('hidden')) {
                el.removeAttribute('hidden');
                width = el.offsetWidth;
                el.setAttribute('hidden', '');
            }

            return {
                label: el.innerText,
                href: el.href,
                value: el.value || index.toString(),
                offsetWidth: width,
                isVisible: true,
            };
        });
    }

    /**
     * Calculate which breadcrumbs fit in the viewport, and which should be hidden.
     */
    private adjustOverflow(): void {
        let occupiedSpace = 0;
        let newVisibleItems = 0;
        const availableSpace = this.list.clientWidth;

        // Menu will always be visible if it exists.
        if (this.hasMenu && this.menuRef.value) {
            occupiedSpace += this.menuRef.value.offsetWidth || 0;
        }

        // Root will always be visible if it exists.
        if (this.rootElement.length > 0) {
            occupiedSpace += this.rootElement[0].offsetWidth;
        }

        const start = 0;
        for (let i = this.items.length - 1; i >= start; i--) {
            occupiedSpace += this.items[i].offsetWidth;
            if (
                occupiedSpace < availableSpace &&
                newVisibleItems < Math.max(this.maxVisibleItems, 1)
            ) {
                // There is still enough space for this breadcrumb.
                this.items[i].isVisible = true;
                newVisibleItems++;
            } else {
                // No more space so we hide the rest.
                for (let j = i; j >= start; j--) {
                    this.items[j].isVisible = false;
                }
                break;
            }
        }

        // Show _at least_ one visible breadcrumb item.
        if (newVisibleItems === 0) {
            this.items[this.items.length - 1].isVisible = true;
            newVisibleItems++;
        }

        // Setting the visible items count will trigger an update.
        if (newVisibleItems !== this.visibleItems) {
            this.visibleItems = newVisibleItems;
        }
    }

    private announceChange(value: string): void {
        const selectDetail: BreadcrumbSelectDetail = {
            value,
        };

        const selectionEvent = new CustomEvent('change', {
            bubbles: true,
            composed: true,
            detail: selectDetail,
        });

        this.dispatchEvent(selectionEvent);
    }

    private handleSelect(
        event: CustomEvent<BreadcrumbSelectDetail> & { target: BreadcrumbItem }
    ): void {
        event.stopPropagation();
        this.announceChange(event.detail.value);
    }

    private handleMenuChange(event: Event & { target: ActionMenu }): void {
        event.stopPropagation();
        this.announceChange(event.target.value);
    }

    /**
     * The truncation menu when there is not enough space to display all the breadcrumbs.
     * It displays all options within a breadcrumb.
     * Items are listed with the hierarchy ordered from top (root) to bottom
     * and include the currently selected item.
     */
    protected renderMenu(): TemplateResult {
        return html`
            <sp-breadcrumb-item role="listitem" class="is-menu">
                <sp-action-menu
                    ${ref(this.menuRef)}
                    quiet
                    label=${this.menuLabel}
                    selects="single"
                    value=${this.items[this.items.length - 1].value}
                    @change=${this.handleMenuChange}
                    slot="menu"
                >
                    <slot slot="icon" name="icon">
                        <sp-icon-folder-open class="icon"></sp-icon-folder-open>
                    </slot>

                    ${this.items.map(
                        (item) => html`
                            <sp-menu-item
                                href=${ifDefined(item.href)}
                                value=${item.value}
                            >
                                ${item.label}
                            </sp-menu-item>
                        `
                    )}
                </sp-action-menu>
            </sp-breadcrumb-item>
        `;
    }

    /**
     * Breadcrumbs were added / removed, we need to recalculate the width of each item
     * and adjust the overflow accordingly.
     */
    private async slotChangeHandler(): Promise<void> {
        if (this.breadcrumbsElements.length === 0) {
            this.items = [];
            this.visibleItems = 0;
            return;
        }

        // Wait for all breadcrumb items to complete their updates
        await Promise.all(
            this.breadcrumbsElements.map((el) => el.updateComplete)
        );

        // Force a recalculation of widths and overflow
        this.calculateBreadcrumbItemsWidth();

        // Reset visibleItems to 0 to force a full recalculation
        this.visibleItems = 0;
        this.adjustOverflow();
    }

    protected override render(): TemplateResult {
        return html`
            <ul @breadcrumb-select=${this.handleSelect} id="list">
                <slot name="root"></slot>
                ${this.hasMenu ? this.renderMenu() : ''}
                <slot @slotchange=${this.slotChangeHandler}></slot>
            </ul>
        `;
    }
}

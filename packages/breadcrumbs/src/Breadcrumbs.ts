/*
Copyright 2024 Adobe. All rights reserved.
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
    SpectrumElement,
    TemplateResult,
} from '@spectrum-web-components/base';
import {
    property,
    query,
    queryAssignedElements,
    state,
} from '@spectrum-web-components/base/src/decorators.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-folder-open.js';
import '@spectrum-web-components/action-menu/sp-action-menu.js';
import '@spectrum-web-components/menu/sp-menu-item.js';
import { ActionMenu } from '@spectrum-web-components/action-menu';
import {
    BreadcrumbItem as BreadcrumbElement,
    BreadcrumbSelectDetail,
} from './BreadcrumbItem.js';
import { createRef, Ref, ref } from 'lit/directives/ref.js';

import styles from './breadcrumbs.css.js';
import '../sp-breadcrumb-item.js';
import { ifDefined } from '@spectrum-web-components/base/src/directives.js';

const MAX_VISIBLE_ITEMS = 4;

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
     * Always display the first breadcrumb
     */
    @property({ type: Boolean, attribute: 'show-root' })
    public showRoot = false;

    /**
     * Override the maximum number of visible items
     */
    @property({ type: Number, attribute: 'max-visible-items' })
    public maxVisibleItems = MAX_VISIBLE_ITEMS;

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
        return this.visibleItems < this.breadcrumbsElements.length;
    }

    override connectedCallback(): void {
        super.connectedCallback();

        if (!this.hasAttribute('role')) {
            this.setAttribute('role', 'navigation');
        }

        this.updateComplete.then(() => {
            if (this.showRoot) {
                this.breadcrumbsElements[0].setAttribute('slot', 'root');
            }
        });

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

        // Breadcrumbs items were added / removed, or available space changed
        if (changes.has('visibleItems') || changes.has('items')) {
            this.items.forEach((item, index) => {
                this.breadcrumbsElements[index].isLastOfType =
                    index === this.breadcrumbsElements.length - 1;

                if (!item.isVisible) {
                    this.breadcrumbsElements[index].setAttribute('hidden', '');
                } else {
                    this.breadcrumbsElements[index].removeAttribute('hidden');
                }
            });
        }
    }

    private calculateBreadcrumbItemsWidth(): void {
        this.items = this.breadcrumbsElements.map((el, index) => {
            let width = el.offsetWidth;

            // We need to temporarily remove the hidden attribute to calculate the width
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

    private adjustOverflow(): void {
        let occupiedSpace = 0;
        let newVisibleItems = 0;
        const availableSpace = this.list.clientWidth;

        if (this.hasMenu && this.menuRef.value) {
            occupiedSpace += this.menuRef.value.offsetWidth || 0;
        }

        // 'showRoot = true' makes the first breadcrumb always visible
        if (this.showRoot && this.rootElement.length > 0) {
            occupiedSpace += this.rootElement[0].offsetWidth;
        }

        const start = 0;
        for (let i = this.items.length - 1; i >= start; i--) {
            occupiedSpace += this.items[i].offsetWidth;
            if (
                occupiedSpace < availableSpace &&
                newVisibleItems < this.maxVisibleItems
            ) {
                this.items[i].isVisible = true;
                newVisibleItems++;
            } else {
                // No more space so we hide the rest
                for (let j = i; j >= start; j--) {
                    this.items[j].isVisible = false;
                }
                break;
            }
        }

        // Show _at least_ one visible breadcrumb item
        if (newVisibleItems === 0) {
            this.items[this.items.length - 1].isVisible = true;
            newVisibleItems++;
        }

        // Setting the visible items count will trigger an update
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

    protected renderMenu(): TemplateResult {
        return html`
            <sp-breadcrumb-item role="listitem" is-menu>
                <sp-action-menu
                    ${ref(this.menuRef)}
                    quiet
                    label=${this.menuLabel}
                    selects="single"
                    value=${this.items[this.items.length - 1].value}
                    @change=${this.handleMenuChange}
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

    private async slotChangeHandler(): Promise<void> {
        if (this.breadcrumbsElements.length === 0) {
            return;
        }

        await Promise.all(
            this.breadcrumbsElements.map((el) => el.updateComplete)
        );

        this.calculateBreadcrumbItemsWidth();
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

/* eslint-disable @typescript-eslint/no-explicit-any */
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
import '@spectrum-web-components/truncated/sp-truncated.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-folder-open.js';
import '@spectrum-web-components/action-menu/sp-action-menu.js';
import '@spectrum-web-components/menu/sp-menu-item.js';
import { ActionMenu } from '@spectrum-web-components/action-menu';
import { BreadcrumbItem as BreadcrumbElement } from './BreadcrumbItem.js';
import { createRef, Ref, ref } from 'lit/directives/ref.js';

import styles from './breadcrumbs.css.js';
import '../sp-breadcrumb-item.js';
import { ifDefined } from 'lit-html/directives/if-defined.js';

const MAX_VISIBLE_ITEMS = 8;

export type BreadcrumbItem = {
    label?: string;
    href?: string;
    offsetWidth: number;
    isVisible: boolean; // false if displayed in menu overlay
};

/**
 * @element sp-breadcrumbs
 *
 * @slot icon - change the default icon of the action menu
 *
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
     * Disable state for breadcrumbs
     */
    @property({ type: Boolean })
    public disabled = false;

    /**
     * Override the maximum number of visible items
     */
    @property({ type: Number, attribute: 'max-visible-items' })
    public maxVisibleItems = MAX_VISIBLE_ITEMS;

    /**
     * Accessible name for the Breadcrumbs component
     */
    @property({ type: String })
    public label = 'Breadcrumbs';

    /**
     * Change the default label of the action menu
     */
    @property({ type: String, attribute: 'menu-label' })
    public menuLabel = 'More items';

    /**
     * Reduce the height of the breadcrumbs
     */
    @property({ type: Boolean, reflect: true })
    public compact = false;

    /**
     * Wrap the last breadcrumb element to a new line
     */
    @property({ type: Boolean, reflect: true })
    public multiline = false;

    @queryAssignedElements({ selector: 'sp-breadcrumb-item' })
    private breadcrumbsElements!: BreadcrumbElement[];

    @query('#list')
    private list!: HTMLUListElement;

    @state()
    private items: BreadcrumbItem[] = [];

    @state()
    private visibleItems = 0;

    private resizeObserver: ResizeObserver | undefined;
    private firstRender = true;
    private paddings = 0;

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
            // Calculate the paddings only once, since these are not changing.
            const listStyles = window.getComputedStyle(this.list);
            this.paddings =
                parseFloat(listStyles.paddingLeft) +
                parseFloat(listStyles.paddingRight);

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
        // console.log('updated was called', changes)

        // Update `aria-label` when `label` available
        if (
            changes.has('label') &&
            (this.label || typeof changes.get('label') !== 'undefined')
        ) {
            if (this.label.length) {
                this.setAttribute('aria-label', this.label);
            } else {
                this.removeAttribute('aria-label');
            }
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
        this.items = this.breadcrumbsElements.map((el) => {
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
                offsetWidth: width,
                isVisible: true,
            };
        });
    }

    private adjustOverflow(): void {
        let occupiedSpace = 0;
        let newVisibleItems = 0;
        const availableSpace = this.list.clientWidth - this.paddings;

        // console.log('this.hasMenu', this.hasMenu);

        if (this.hasMenu && this.menuRef.value) {
            if (this.showRoot) {
                occupiedSpace += this.menuRef.value.offsetWidth || 0;
            } else {
                occupiedSpace += this.menuRef.value.offsetWidth || 0;
            }
        }

        if (this.showRoot) {
            occupiedSpace += this.items[0].offsetWidth;
        }
        // console.log(this.items);

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

        // Setting the visible items count will trigger an update
        if (newVisibleItems !== this.visibleItems) {
            this.visibleItems = newVisibleItems;
        }
    }

    protected renderMenu(): TemplateResult {
        const menuItems = this.items
            .filter((item) => !item.isVisible)
            .reverse();

        return html`
            <sp-breadcrumb-item
                role="listitem"
                is-menu
                ?disabled=${this.disabled}
            >
                <sp-action-menu
                    ${ref(this.menuRef)}
                    ?disabled=${this.disabled}
                    quiet
                    label=${this.menuLabel}
                >
                    <slot slot="icon" name="icon">
                        <sp-icon-folder-open class="icon"></sp-icon-folder-open>
                    </slot>

                    ${menuItems.map(
                        (item) => html`
                            <sp-menu-item href=${ifDefined(item.href)}>
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
            <ul id="list">
                <slot name="root"></slot>
                ${this.hasMenu ? this.renderMenu() : ''}
                <slot @slotchange=${this.slotChangeHandler}></slot>
            </ul>
        `;
    }
}

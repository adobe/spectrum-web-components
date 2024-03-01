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
    nothing,
    SpectrumElement,
    TemplateResult,
} from '@spectrum-web-components/base';
import {
    property,
    queryAssignedElements,
    state,
} from '@spectrum-web-components/base/src/decorators.js';
import { ifDefined } from '@spectrum-web-components/base/src/directives.js';

import { createRef, Ref, ref } from 'lit/directives/ref.js';
import { BreadcrumbItem as BreadCrumbElement } from './BreadcrumbItem.js';
import styles from './breadcrumbs.css.js';

import '@spectrum-web-components/truncated/sp-truncated.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-folder-open.js';

import '../sp-breadcrumb-item.js';

import type { ActionMenu } from '@spectrum-web-components/action-menu';

const MAX_VISIBLE_ITEMS = 4;

export type BreadcrumbItem = {
    label: string;
    href: string;
    offsetWidth: number;
    isVisible: boolean; // false if displayed in menu overlay
};

/**
 * @element sp-breadcrumbs
 *
 * @slot icon - change the default icon of the action menu
 * @attr compact - Display the compact variant of the breadcrumbs
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
     * Change the default label of the action menu
     */
    @property({ type: String, attribute: 'menu-label' })
    public menuLabel = 'More items';

    /**
     * Wrap the last breadcrumb element to a new line
     */
    @property({ type: Boolean })
    public multiline = false;

    @queryAssignedElements({ selector: 'sp-breadcrumb-item' })
    private scrollContent!: BreadCrumbElement[];

    @state()
    private items: BreadcrumbItem[] = [];

    private resizeObserver: ResizeObserver | undefined;

    private containerWidth = 0;

    private breadcrumbElements: BreadCrumbElement[] = [];

    private menuRef: Ref<ActionMenu> = createRef();

    private get hasMenu(): boolean {
        return this.visibleItemsCount < this.breadcrumbElements.length;
    }

    private get visibleItemsCount(): number {
        return this.items.reduce((acc, item) => {
            return item.isVisible ? acc + 1 : acc;
        }, 0);
    }

    override connectedCallback(): void {
        super.connectedCallback();
        this.resizeObserver = new ResizeObserver(() => {
            const visibleItemsChanged = this.startUpdateVisibleItems();

            if (visibleItemsChanged) {
                this.startUpdateVisibleItems();
            }

            this.requestUpdate();
        });

        this.resizeObserver.observe(this);
    }

    override disconnectedCallback(): void {
        this.resizeObserver?.disconnect();
        this.items = [];
        super.disconnectedCallback();
    }

    private startUpdateVisibleItems(): boolean {
        this.setWidths();
        const cacheVisibleItemsCount = this.visibleItemsCount;

        this.setVisibilityOfItemsBasedOnAvailableWidth();
        this.setMenuItemsIfMaxIsReached();

        return cacheVisibleItemsCount != this.visibleItemsCount;
    }

    private setVisibilityOfItemsBasedOnAvailableWidth(): void {
        let availableWidth = 0;

        if (this.hasMenu && this.menuRef.value) {
            if (this.showRoot) {
                availableWidth += this.menuRef.value.offsetWidth || 0;
            } else {
                availableWidth += this.menuRef.value.offsetWidth || 0;
            }
        }

        if (this.showRoot) {
            availableWidth += this.items[0].offsetWidth;
            this.items[0].isVisible = true;
        }

        if (this.multiline) {
            availableWidth += this.items[this.items.length - 1].offsetWidth;
        }

        const start = this.showRoot ? 1 : 0;
        for (let i = this.items.length - 2; i > start; i--) {
            availableWidth += this.items[i].offsetWidth;
            if (availableWidth < this.containerWidth) {
                this.items[i].isVisible = true;
            } else {
                // No more space so we hide the rest
                for (let j = i; j > start; j--) {
                    this.items[j].isVisible = false;
                }
                break;
            }
        }
    }

    private setMenuItemsIfMaxIsReached(): void {
        let menuItemsCount = 0;
        if (this.items.length > this.maxVisibleItems) {
            menuItemsCount = this.items.length - this.maxVisibleItems;
            if (this.hasMenu) {
                menuItemsCount++;
            }
        }

        if (menuItemsCount > 0 && this.showRoot) {
            for (let i = 1; i < menuItemsCount + 1; i++) {
                this.items[i].isVisible = false;
            }
        } else if (menuItemsCount > 0) {
            for (let i = 0; i < menuItemsCount; i++) {
                this.items[i].isVisible = false;
            }
        }
    }

    private mapChildrenToBreadcrumbItems(
        childrenElements: BreadCrumbElement[]
    ): BreadcrumbItem[] {
        const items: BreadcrumbItem[] = [];

        Array.from(childrenElements).map((child) => {
            items.push({
                label: child.textContent?.trim() || '',
                href: child.getAttribute('href') || '',
                isVisible: true,
                offsetWidth: child.offsetWidth,
            });
        });

        return items;
    }

    // Add a small difference to the measure so CSS wrap won't break the layout
    private setWidths(): void {
        this.containerWidth = this.getContentWidth(this) - 10;
    }

    private getContentWidth(element: HTMLElement): number {
        const styles = getComputedStyle(element);

        return (
            element.clientWidth -
            parseFloat(styles.paddingLeft) -
            parseFloat(styles.paddingRight)
        );
    }

    private getVisibleBreadcrumbs(): BreadcrumbItem[] {
        return this.items.filter((item) => {
            return item.isVisible;
        });
    }

    private renderBreadcrumbItems(): TemplateResult[] {
        const visibleBreadcrumbs = this.getVisibleBreadcrumbs();
        const breadcrumbItems: TemplateResult[] = [];

        // Skip root as it is by default rendered inside render()
        let i = this.showRoot ? 1 : 0;

        for (i; i < visibleBreadcrumbs.length - 1; i++) {
            breadcrumbItems.push(
                this.getBreadcrumb(
                    visibleBreadcrumbs[i].label,
                    this.disabled,
                    visibleBreadcrumbs[i].href
                )
            );
        }

        breadcrumbItems.push(this.getLastBreadcrumb());

        return breadcrumbItems;
    }

    private getLastBreadcrumb(): TemplateResult {
        const lastItem = this.items[this.items.length - 1];
        return html`
            <sp-breadcrumb-item>
                <div style="display: grid">
                    <sp-truncated>${lastItem.label}</sp-truncated>
                </div>
            </sp-breadcrumb-item>
        `;
    }

    private getMenuItems(): TemplateResult[] {
        return this.items
            .filter((item) => {
                return !item.isVisible;
            })
            .map((item) => {
                return html`
                    <sp-menu-item href=${item.href}>${item.label}</sp-menu-item>
                `;
            });
    }

    private async slotChangeHandler(): Promise<void> {
        if (this.scrollContent.length === 0) {
            return;
        }

        this.breadcrumbElements = this.scrollContent;

        await Promise.all(
            this.breadcrumbElements.map((el) => el.updateComplete)
        );

        this.items = this.mapChildrenToBreadcrumbItems(this.scrollContent);
        this.startUpdateVisibleItems();

        const breadCrumbItems = this.querySelectorAll('sp-breadcrumb-item');
        breadCrumbItems.forEach((child) => {
            this.removeChild(child);
        });
    }

    protected renderRootBreadcrumb(): TemplateResult {
        return this.getBreadcrumb(
            this.items[0].label,
            this.disabled,
            this.items[0].href
        );
    }

    protected getBreadcrumb(
        label: string,
        disabled?: boolean,
        href?: string
    ): TemplateResult {
        return html`
            <sp-breadcrumb-item ?disabled=${disabled} href=${ifDefined(href)}>
                ${label}
            </sp-breadcrumb-item>
        `;
    }

    protected renderMenu(): TemplateResult {
        import('@spectrum-web-components/action-menu/sp-action-menu.js');
        import('@spectrum-web-components/menu/sp-menu-item.js');

        return html`
            <sp-breadcrumb-item is-menu ?disabled=${this.disabled}>
                <sp-action-menu
                    ${ref(this.menuRef)}
                    ?disabled=${this.disabled}
                    quiet
                    label=${this.menuLabel}
                >
                    <slot slot="icon" name="icon">
                        <sp-icon-folder-open class="icon"></sp-icon-folder-open>
                    </slot>

                    ${this.getMenuItems()}
                </sp-action-menu>
            </sp-breadcrumb-item>
        `;
    }

    protected override render(): TemplateResult {
        return html`
            ${this.items.length === 0
                ? html`
                      <slot @slotchange=${this.slotChangeHandler}></slot>
                  `
                : html`
                      <nav id="container">
                          ${this.showRoot
                              ? this.renderRootBreadcrumb()
                              : nothing}
                          ${this.hasMenu
                              ? html`
                                    ${this.renderMenu()}
                                `
                              : nothing}
                          ${this.renderBreadcrumbItems()}
                      </nav>
                  `}
        `;
    }
}

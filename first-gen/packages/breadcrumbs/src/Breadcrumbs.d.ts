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
import { CSSResultArray, PropertyValues, SpectrumElement, TemplateResult } from '@spectrum-web-components/base';
import '@spectrum-web-components/breadcrumbs/sp-breadcrumb-item.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-folder-open.js';
import '@spectrum-web-components/action-menu/sp-action-menu.js';
import '@spectrum-web-components/menu/sp-menu-item.js';
/**
 * @element sp-breadcrumbs
 *
 * @slot icon - change the default icon of the action menu
 * @slot root - Breadcrumb item to always display
 * @slot - Breadcrumb items
 * @fires change - Announces the selected breadcrumb item
 */
export declare class Breadcrumbs extends SpectrumElement {
    static get styles(): CSSResultArray;
    /**
     * Override the maximum number of visible items
     */
    maxVisibleItems: number;
    /**
     * Accessible name for the Breadcrumbs component
     */
    label: string;
    /**
     * Change the default label of the action menu
     */
    menuLabel: string;
    /**
     *  compact option is useful for reducing the height of the breadcrumbs
     */
    compact: boolean;
    private breadcrumbsElements;
    private rootElement;
    private list;
    private items;
    private visibleItems;
    private resizeObserver;
    private firstRender;
    private menuRef;
    private get hasMenu();
    connectedCallback(): void;
    disconnectedCallback(): void;
    updated(changes: PropertyValues): void;
    /**
     * We need to understand how much space (px) each breadcrumb item occupies,
     * in order to know if it fits the available horizontal space.
     */
    private calculateBreadcrumbItemsWidth;
    /**
     * Calculate which breadcrumbs fit in the viewport, and which should be hidden.
     */
    private adjustOverflow;
    private announceChange;
    private handleSelect;
    private handleMenuChange;
    /**
     * The truncation menu when there is not enough space to display all the breadcrumbs.
     * It displays all options within a breadcrumb.
     * Items are listed with the hierarchy ordered from top (root) to bottom
     * and include the currently selected item.
     */
    protected renderMenu(): TemplateResult;
    /**
     * Breadcrumbs were added / removed, we need to recalculate the width of each item
     * and adjust the overflow accordingly.
     */
    private slotChangeHandler;
    protected render(): TemplateResult;
}

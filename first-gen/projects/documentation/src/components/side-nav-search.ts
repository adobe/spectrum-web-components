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
    LitElement,
    PropertyValues,
    TemplateResult,
} from '@spectrum-web-components/base';
import {
    customElement,
    property,
    query,
} from '@spectrum-web-components/base/src/decorators.js';
import sideNavSearchMenuStyles from './side-nav-search.css';
import type { Search } from '@spectrum-web-components/search';
import type { Overlay } from '@spectrum-web-components/overlay';
import type { Popover } from '@spectrum-web-components/popover';
import type { ResultGroup } from './search-index.js';
import { Menu } from '@spectrum-web-components/menu';
import '@spectrum-web-components/overlay/sp-overlay.js';
import '@spectrum-web-components/search/sp-search.js';

const stopPropagation = (event: Event): void => event.stopPropagation();

@customElement('docs-search')
export class SearchComponent extends LitElement {
    @query('sp-menu')
    private menuEl!: Menu;

    @property({ type: Boolean })
    private open = false;

    @query('sp-overlay')
    private overlayEl!: Overlay;

    @query('sp-popover')
    private popoverEl!: Popover;

    @query('sp-search')
    private searchField!: Search;

    public static override get styles(): CSSResultArray {
        return [sideNavSearchMenuStyles];
    }

    @property({ type: Array })
    public results: ResultGroup[] = [];

    public override focus(): void {
        this.searchField.focus();
    }

    private handleSearchPointerdown(): void {
        const abortController = new AbortController();
        const { signal } = abortController;
        const handlePointerup = () => {
            this.overlayEl.manuallyKeepOpen();
        };
        const cleanup = () => abortController.abort();
        this.searchField.addEventListener('pointerup', handlePointerup, {
            signal,
        });
        document.addEventListener('pointerup', cleanup, {
            signal,
        });
        document.addEventListener('pointercancel', cleanup, {
            signal,
        });
    }

    private handleKeydown(event: KeyboardEvent) {
        const { code } = event;
        const shouldFocusResultsList =
            code === 'ArrowDown' || code === 'ArrowUp';
        if (!shouldFocusResultsList) {
            return;
        } else {
            event.preventDefault();
        }
        this.focusResults({ shouldFocusResultsList });
    }

    private async focusResults({
        shouldFocusResultsList,
    }: {
        shouldFocusResultsList?: boolean;
    }): Promise<void> {
        if (shouldFocusResultsList) {
            this.menuEl.addEventListener(
                'focus',
                () => {
                    this.menuEl.childItems[
                        this.menuEl.focusedItemIndex
                    ].focused = true;
                },
                {
                    once: true,
                }
            );
            this.menuEl.focus();
        } else {
            this.popoverEl.focus();
        }
    }

    private openPopover() {
        this.open = true;
    }

    private closePopover() {
        this.open = false;
    }

    handleSubmit(event: Event): void {
        event.preventDefault();
        if (this.results.length < 0) {
            return;
        }
        this.menuEl.focus();
    }

    private async updateSearchResults(): Promise<boolean> {
        const { value } = this.searchField;
        if (value.length < 3 || !this.searchField.focused) {
            this.closePopover();
            return false;
        }

        const searchParam = `${value.trim()}*`;
        const search = await import('./search-index.js').then(
            ({ search }) => search
        );
        this.results = await search(searchParam);

        this.openPopover();

        return this.results.length > 0;
    }

    private handleMenuFocusout(event: FocusEvent) {
        if (!this.menuEl.contains(event.relatedTarget as Node)) {
            this.menuEl.childItems.forEach((item) => {
                item.focused = false;
            });
        }
    }

    renderResults(): TemplateResult {
        if (this.results.length > 0) {
            return html`
                <sp-menu tabindex="-1" @focusout=${this.handleMenuFocusout}>
                    ${this.results.map(
                        (category) => html`
                            <sp-menu-group>
                                <span slot="header">${category.name}</span>
                                ${category.results.map(
                                    (result) => html`
                                        <sp-menu-item href="${result.url}">
                                            ${result.label}
                                        </sp-menu-item>
                                    `
                                )}
                            </sp-menu-group>
                        `
                    )}
                </sp-menu>
            `;
        } else {
            return html`
                <sp-illustrated-message
                    heading="No results found"
                    description="Try another search term."
                ></sp-illustrated-message>
            `;
        }
    }

    override render(): TemplateResult {
        return html`
            <div id="search-container">
                <sp-search
                    id="search"
                    @pointerdown=${this.handleSearchPointerdown}
                    @focusin=${this.updateSearchResults}
                    @input=${this.updateSearchResults}
                    @change=${this.updateSearchResults}
                    @keydown=${this.handleKeydown}
                    @click=${stopPropagation}
                    @submit=${this.handleSubmit}
                    autocomplete="off"
                ></sp-search>
                <sp-overlay
                    ?open=${this.open}
                    placement="bottom-start"
                    receives-focus="false"
                    trigger="search"
                    type="auto"
                >
                    <sp-popover id="search-results-menu">
                        ${this.renderResults()}
                    </sp-popover>
                </sp-overlay>
            </div>
        `;
    }

    protected override firstUpdated(_changedProperties: PropertyValues): void {
        super.firstUpdated(_changedProperties);
        this.addEventListener('blur', this.closePopover);
    }
}

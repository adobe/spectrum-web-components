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
    CSSResultArray,
    html,
    LitElement,
    TemplateResult,
} from '@spectrum-web-components/base';
import {
    customElement,
    property,
    query,
} from '@spectrum-web-components/base/src/decorators.js';
import sideNavSearchMenuStyles from './side-nav-search.css';
import { Search } from '@spectrum-web-components/search';
import { Popover } from '@spectrum-web-components/popover';
import type { ResultGroup } from './search-index.js';
import { Menu } from '@spectrum-web-components/menu';
import { openOverlay } from '@spectrum-web-components/overlay';
import '@spectrum-web-components/search/sp-search.js';

const stopPropagation = (event: Event): void => event.stopPropagation();

@customElement('docs-search')
export class SearchComponent extends LitElement {
    private closeOverlay?: () => void;

    private searchResultsPopover: Popover | null = null;

    @query('sp-popover')
    private popover?: Popover;

    @query('sp-search')
    private searchField!: Search;

    @query('#focus-return')
    private focusReturn!: HTMLSpanElement;

    public static override get styles(): CSSResultArray {
        return [sideNavSearchMenuStyles];
    }

    @property({ type: Array })
    public results: ResultGroup[] = [];

    public override focus(): void {
        this.searchField.focus();
    }

    private handleSearchInput(event: InputEvent) {
        if (event.target) {
            const { value } = event.target as Search;
            this.updateSearchResults(value);
        }
    }

    private handleKeydown(event: KeyboardEvent) {
        const { code, shiftKey } = event;
        const willFocusResultsList = !shiftKey && code === 'Tab';
        const shouldFocusResultsList =
            code === 'ArrowDown' || code === 'ArrowUp';
        const focusResultsList = willFocusResultsList || shouldFocusResultsList;
        if (!focusResultsList) {
            return;
        }
        if (shouldFocusResultsList) {
            event.preventDefault();
        }
        this.focusResults({ shouldFocusResultsList });
    }

    private handlePopoverKeydown(event: KeyboardEvent) {
        const { code, shiftKey } = event;
        if (code === 'Tab') {
            if (shiftKey) {
                this.focusReturn.focus();
            } else {
                this.focus();
            }
        }
    }

    private async focusResults({
        shouldFocusResultsList,
    }: {
        shouldFocusResultsList?: boolean;
    }): Promise<void> {
        await this.updateComplete;
        if (this.searchResultsPopover) {
            if (shouldFocusResultsList) {
                const popoverMenu = this.searchResultsPopover.querySelector(
                    'sp-menu'
                ) as Menu;
                popoverMenu.focus();
            } else {
                this.searchResultsPopover.focus();
            }
        } else if (shouldFocusResultsList) {
            const resultsAvailable = await this.updateSearchResults(
                this.searchField.value
            );
            if (resultsAvailable) {
                this.focusResults({ shouldFocusResultsList });
            }
        }
    }

    private async openPopover() {
        if (!this.popover) return;

        this.searchResultsPopover = this.popover;

        const { popover } = this;
        this.closeOverlay = await openOverlay(
            this.searchField,
            'click',
            popover,
            {
                placement: 'bottom-start',
            }
        );

        await this.searchResultsPopover.updateComplete;
    }

    private closePopover() {
        if (this.closeOverlay) {
            this.closeOverlay();
        }
    }

    private handleClosed(): void {
        this.searchResultsPopover = null;
        if (this.closeOverlay) {
            delete this.closeOverlay;
        }
    }

    handleSubmit(event: Event): void {
        event.preventDefault();
        if (this.results.length < 0 || !this.searchResultsPopover) return;
        const popoverMenu = this.searchResultsPopover.querySelector(
            'sp-menu'
        ) as Menu;
        popoverMenu.focus();
    }

    private async updateSearchResults(value: string): Promise<boolean> {
        if (value.length < 3) {
            this.closePopover();
            return false;
        }

        const searchParam = `${value.trim()}*`;
        const search = await import('./search-index.js').then(
            ({ search }) => search
        );
        this.results = await search(searchParam);

        await this.openPopover();

        return this.results.length > 0;
    }

    private onFocusout(event: FocusEvent) {
        const relatedTarget = event.relatedTarget as Node;
        if (
            relatedTarget &&
            this.searchResultsPopover &&
            this.shadowRoot &&
            !this.shadowRoot.contains(relatedTarget) &&
            !this.searchResultsPopover.contains(relatedTarget)
        ) {
            this.closePopover();
        }
    }

    renderResults(): TemplateResult {
        if (this.results.length > 0) {
            return html`
                <sp-menu>
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
            <div id="search-container" @focusout=${this.onFocusout}>
                <sp-search
                    id="search"
                    @focusin=${this.handleSearchInput}
                    @input=${this.handleSearchInput}
                    @change=${this.handleSearchInput}
                    @keydown=${this.handleKeydown}
                    @click=${stopPropagation}
                    @submit=${this.handleSubmit}
                    autocomplete="off"
                ></sp-search>
                <sp-popover
                    id="search-results-menu"
                    open
                    tabindex="0"
                    @sp-overlay-closed=${this.handleClosed}
                    @keydown=${this.handlePopoverKeydown}
                >
                    <style>
                        #search-results-menu {
                            width: 250px;
                            max-height: calc(100vh - 200px);
                            display: flex;
                            flex-direction: column;
                        }

                        sp-illustrated-message {
                            flex: 1 1;
                            margin-bottom: 2em;
                            color: var(--spectrum-global-color-gray-800);
                        }
                    </style>
                    ${this.renderResults()}
                </sp-popover>
                <span id="focus-return" tabindex="-1"></span>
            </div>
        `;
    }
}

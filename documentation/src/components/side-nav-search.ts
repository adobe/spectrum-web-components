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
    LitElement,
    html,
    CSSResultArray,
    TemplateResult,
    property,
    query,
} from 'lit-element';
import sideNavSearchMenuStyles from './side-nav-search.css';
import { Search } from '@spectrum-web-components/search';
import { Overlay } from '@spectrum-web-components/overlay';
import '@spectrum-web-components/search/sp-search.js';
import '@spectrum-web-components/popover/sp-popover.js';
import '@spectrum-web-components/menu/sp-menu.js';
import '@spectrum-web-components/menu/sp-menu-group.js';
import '@spectrum-web-components/menu/sp-menu-item.js';
import '@spectrum-web-components/illustrated-message/sp-illustrated-message.js';
import { AppRouter } from '../router.js';
import { search, ResultGroup } from './search-index.js';

class SearchComponent extends LitElement {
    private closeOverlay?: () => void;

    @query('sp-popover')
    private popover!: HTMLElement;

    public static get styles(): CSSResultArray {
        return [sideNavSearchMenuStyles];
    }

    @property({ type: Array })
    public results: ResultGroup[] = [];

    private handleSearchInput(event: InputEvent) {
        if (event.target) {
            const searchField = event.target as Search;
            this.updateSearchResults(searchField.value);
        }
    }

    private async openPopover() {
        if (!this.popover) return;

        this.closeOverlay = await Overlay.open(this, 'click', this.popover, {
            placement: 'bottom',
        });
    }

    private closePopover() {
        if (this.closeOverlay) {
            this.closeOverlay();
            delete this.closeOverlay;
        }
    }

    private async updateSearchResults(value: string): Promise<void> {
        if (value.length < 3) {
            this.closePopover();
            return;
        }

        const searchParam = `${value.trim()}*`;
        this.results = await search(searchParam);

        this.openPopover();
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
                                        <sp-menu-item
                                            @click=${() => {
                                                AppRouter.go(result.url);
                                                this.closePopover();
                                            }}
                                        >
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

    render(): TemplateResult {
        return html`
            <div id="search-container">
                <div id="search-field">
                    <sp-search
                        @input=${this.handleSearchInput}
                        @change=${this.handleSearchInput}
                        autocomplete="off"
                    ></sp-search>
                </div>
                <sp-popover id="search-results-menu" open>
                    <style>
                        #search-results-menu {
                            width: 368px;
                            max-height: calc(100vh - 200px);
                            margin-left: 24px;
                            display: flex;
                            flex-direction: column;
                        }

                        sp-illustrated-message {
                            flex: 1 1;
                            margin-bottom: 2em;
                        }
                    </style>
                    ${this.renderResults()}
                </sp-popover>
            </div>
        `;
    }
}

customElements.define('docs-search', SearchComponent);

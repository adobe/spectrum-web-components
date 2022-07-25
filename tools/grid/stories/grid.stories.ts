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

import { html, TemplateResult } from '@spectrum-web-components/base';

import '@spectrum-web-components/grid/sp-grid.js';
import '@spectrum-web-components/action-bar/sp-action-bar.js';
import '@spectrum-web-components/card/sp-card.js';
import '@spectrum-web-components/checkbox/sp-checkbox.js';
import '@spectrum-web-components/action-button/sp-action-button.js';
import '@spectrum-web-components/action-group/sp-action-group.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-edit.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-more.js';
import type { ActionBar } from '@spectrum-web-components/action-bar';
import type { Grid } from '@spectrum-web-components/grid';

export default {
    title: 'Grid',
    component: 'sp-grid',
};

interface Item extends Record<string, unknown> {
    id: number;
}

function generateItems(count: number): Item[] {
    const items: Item[] = [];
    while (count) {
        count -= 1;
        items.unshift({ id: count });
    }
    return items;
}

export const Default = (): TemplateResult => {
    const items = generateItems(1000);

    const renderItem = (
        item: Item,
        index: number,
        selected: boolean
    ): TemplateResult => {
        return html`
            <sp-card
                toggles
                variant="quiet"
                heading="Card Heading ${item.id}"
                subheading="JPG Photo"
                style="contain: strict; padding: 1px;"
                value="card-${item.id}"
                .selected=${selected}
                key=${index}
            >
                <img
                    alt=""
                    slot="preview"
                    src="https://picsum.photos/id/${item.id}/200/300"
                    decoding="async"
                />
                <div slot="description">10/15/18</div>
                <div slot="footer">Footer</div>
            </sp-card>
        `;
    };
    const handleChange = (event: Event & { currentTarget: Grid }): void => {
        const actionbar = document.querySelector('sp-action-bar') as ActionBar;
        const selected = document.querySelector('.selected') as HTMLElement;
        const ids = document.querySelector('.ids') as HTMLElement;
        actionbar.open = !!event.currentTarget.selected.length;
        actionbar.style.setProperty(
            'display',
            !!event.currentTarget.selected.length ? 'flex' : 'none'
        );
        selected.textContent = '' + event.currentTarget.selected.length;
        ids.textContent =
            '' +
            event.currentTarget.selected
                .map((selection) => selection.id)
                .join(', ');
    };
    const handleActionBarChange = (event: Event): void => {
        event.preventDefault();
        const grid = document.querySelector('sp-grid') as Grid;
        const actionbar = document.querySelector('sp-action-bar') as ActionBar;
        actionbar.open = false;
        grid.selected = [];
    };
    return html`
        <h1>Random before content that is focusable</h1>
        <input id="first-input" />
        <sp-grid
            @change=${handleChange}
            .items=${items}
            .focusableSelector=${'sp-card'}
            .renderItem=${renderItem}
        ></sp-grid>
        <sp-action-bar variant="fixed" style="display: none">
            <sp-checkbox @click=${handleActionBarChange} checked>
                <span class="selected"></span>
                Selected
                <span class="ids"></span>
            </sp-checkbox>
            <sp-action-group quiet>
                <sp-action-button>
                    <sp-icon-edit slot="icon" label="Edit"></sp-icon-edit>
                </sp-action-button>
                <sp-action-button>
                    <sp-icon-more slot="icon" label="More"></sp-icon-more>
                </sp-action-button>
            </sp-action-group>
        </sp-action-bar>
        <h2>Random after content that is focusable</h2>
        <input id="last-input" />
    `;
};

export const sized = (): TemplateResult => {
    const items = generateItems(1000);

    const renderItem = (
        item: Item,
        index: number,
        selected: boolean
    ): TemplateResult => {
        return html`
            <sp-card
                toggles
                variant="quiet"
                heading="Card Heading ${item.id}"
                subheading="JPG Photo"
                style="contain: strict; padding: 1px;"
                value="card-${item.id}"
                .selected=${selected}
                key=${index}
            >
                <img
                    alt=""
                    slot="preview"
                    src="https://picsum.photos/id/${item.id}/200/300"
                    decoding="async"
                />
                <div slot="description">10/15/18</div>
                <div slot="footer">Footer</div>
            </sp-card>
        `;
    };
    const handleChange = (event: Event & { currentTarget: Grid }): void => {
        const actionbar = document.querySelector('sp-action-bar') as ActionBar;
        const selected = document.querySelector('.selected') as HTMLElement;
        const ids = document.querySelector('.ids') as HTMLElement;
        actionbar.open = !!event.currentTarget.selected.length;
        actionbar.style.setProperty(
            'display',
            !!event.currentTarget.selected.length ? 'flex' : 'none'
        );
        selected.textContent = '' + event.currentTarget.selected.length;
        ids.textContent =
            '' +
            event.currentTarget.selected
                .map((selection) => selection.id)
                .join(', ');
    };
    const handleActionBarChange = (event: Event): void => {
        event.preventDefault();
        const grid = document.querySelector('sp-grid') as Grid;
        const actionbar = document.querySelector('sp-action-bar') as ActionBar;
        actionbar.open = false;
        grid.selected = [];
    };
    return html`
        <h1>Random before content that is focusable</h1>
        <input id="first-input" />
        <sp-grid
            @change=${handleChange}
            .items=${items}
            .focusableSelector=${'sp-card'}
            .renderItem=${renderItem}
            .itemSize=${{
                width: 200,
                height: 300,
            }}
            .gap=${'10px'}
        ></sp-grid>
        <sp-action-bar variant="fixed" style="display: none">
            <sp-checkbox @click=${handleActionBarChange} checked>
                <span class="selected"></span>
                Selected
                <span class="ids"></span>
            </sp-checkbox>
            <sp-action-group quiet>
                <sp-action-button>
                    <sp-icon-edit slot="icon" label="Edit"></sp-icon-edit>
                </sp-action-button>
                <sp-action-button>
                    <sp-icon-more slot="icon" label="More"></sp-icon-more>
                </sp-action-button>
            </sp-action-group>
        </sp-action-bar>
        <h2>Random after content that is focusable</h2>
        <input id="last-input" />
    `;
};

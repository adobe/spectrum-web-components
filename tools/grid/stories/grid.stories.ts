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
    css,
    html,
    SpectrumElement,
    TemplateResult,
} from '@spectrum-web-components/base';

import '@spectrum-web-components/grid/sp-grid.js';
import '@spectrum-web-components/action-bar/sp-action-bar.js';
import '@spectrum-web-components/card/sp-card.js';
import '@spectrum-web-components/action-menu/sp-action-menu.js';
import '@spectrum-web-components/menu/sp-menu-item.js';
import '@spectrum-web-components/tooltip/sp-tooltip.js';
import '@spectrum-web-components/checkbox/sp-checkbox.js';
import '@spectrum-web-components/action-button/sp-action-button.js';
import '@spectrum-web-components/action-group/sp-action-group.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-edit.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-more.js';
import type { ActionBar } from '@spectrum-web-components/action-bar';
import type { Grid } from '@spectrum-web-components/grid';
import type { RenderItemFunction } from '@lit-labs/virtualizer/virtualize.js';

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
            draggable="true"
            role="row"
            aria-selected=${selected}
            aria-rowindex=${index + 1}
            label="Card Heading ${item.id}"
        >
            <img
                alt=""
                slot="preview"
                src="https://picsum.photos/id/${item.id}/200/300"
                decoding="async"
            />
            <div slot="description">10/15/18</div>
            <div slot="footer">Footer</div>
            <sp-action-menu
                label="File actions"
                slot="actions"
                placement="bottom-end"
                quiet
            >
                <sp-tooltip slot="tooltip" self-managed placement="top">
                    Do stuff
                </sp-tooltip>
                <sp-menu-item>Deselect</sp-menu-item>
                <sp-menu-item>Select Inverse</sp-menu-item>
                <sp-menu-item>Feather...</sp-menu-item>
                <sp-menu-item>Select and Mask...</sp-menu-item>
                <sp-menu-divider></sp-menu-divider>
                <sp-menu-item>Save Selection</sp-menu-item>
                <sp-menu-item disabled>Make Work Path</sp-menu-item>
            </sp-action-menu>
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
    ids.textContent = `[${
        '' +
        event.currentTarget.selected.map((selection) => selection.id).join(', ')
    }]`;
};

const handleActionBarChange = (event: Event): void => {
    event.preventDefault();
    const grid = document.querySelector('sp-grid') as Grid;
    const actionbar = document.querySelector('sp-action-bar') as ActionBar;
    actionbar.open = false;
    grid.selected = [];
};

export const Default = (): TemplateResult => {
    const items = generateItems(40);

    return html`
        <h1>
            <label for="first-input">
                Random before content that is focusable
            </label>
        </h1>
        <input id="first-input" />
        <sp-grid
            @change=${handleChange}
            .items=${items}
            .focusableSelector=${'sp-card'}
            .renderItem=${renderItem as RenderItemFunction<Item>}
            role="grid"
            aria-label="Select images"
            aria-multiselectable="true"
            aria-rowcount=${items.length}
            aria-colcount=${1}
        ></sp-grid>
        <sp-action-bar variant="fixed">
            <sp-checkbox
                style="margin-block-start: calc(var(--spectrum-checkbox-top-to-control-small) * -1);"
                @click=${handleActionBarChange}
                checked
            >
                <span class="selected"></span>
                Selected
                <span class="ids"></span>
            </sp-checkbox>
            <sp-action-group quiet slot="buttons">
                <sp-action-button>
                    <sp-icon-edit slot="icon" label="Edit"></sp-icon-edit>
                </sp-action-button>
                <sp-action-button>
                    <sp-icon-more slot="icon" label="More"></sp-icon-more>
                </sp-action-button>
            </sp-action-group>
        </sp-action-bar>
        <h2>
            <label for="last-input">
                Random after content that is focusable
            </label>
        </h2>
        <input id="last-input" />
    `;
};

Default.swc_vrt = {
    skip: true,
};

Default.parameters = {
    // Disables Chromatic's snapshotting on a global level
    chromatic: { disableSnapshot: true },
};

export const sized = (
    { gap, padding } = { gap: 10, padding: 10 }
): TemplateResult => {
    const items = generateItems(1000);

    function handleMediaChange(): void {
        let width = document.body.offsetWidth * 0.4;
        const height = 300;
        if (matchMedium.matches) {
            width = 300;
        } else if (matchLarge.matches) {
            width = 400;
        }
        (document.querySelector('sp-grid') as Grid).itemSize = {
            width,
            height,
        };
    }

    const matchSmall = window.matchMedia('(max-width: 600px)');
    const matchMedium = window.matchMedia(
        '(min-width: 601px) and (max-width: 1200px)'
    );
    const matchLarge = window.matchMedia('(min-width: 1201px)');

    matchSmall.addEventListener('change', handleMediaChange);
    matchMedium.addEventListener('change', handleMediaChange);
    matchLarge.addEventListener('change', handleMediaChange);

    return html`
        <h1>Random before content that is focusable</h1>
        <input id="first-input" />
        <sp-grid
            @change=${handleChange}
            .items=${items}
            .focusableSelector=${'sp-card'}
            .renderItem=${renderItem as RenderItemFunction<Item>}
            .itemSize=${{
                width: 200,
                height: 300,
            }}
            .gap=${`${gap}px`}
            .padding=${`${padding}px`}
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

sized.args = {
    gap: 10,
    padding: 10,
};

sized.argTypes = {
    gap: {
        name: 'gap',
        type: { name: 'number', required: false },
        description: 'Spacing between items.',
        table: {
            type: { summary: 'number' },
        },
        control: {
            type: 'number',
        },
    },
    padding: {
        name: 'padding',
        type: { name: 'number', required: false },
        description: 'Spacing around all items.',
        table: {
            type: { summary: 'number' },
        },
        control: {
            type: 'number',
        },
    },
};

sized.swc_vrt = {
    skip: true,
};

sized.parameters = {
    // Disables Chromatic's snapshotting on a global level
    chromatic: { disableSnapshot: true },
};

class MyParent extends SpectrumElement {
    static override styles = [
        css`
            :host {
                display: block;
                height: 100vh;
                overflow: hidden;
            }

            .child {
                height: 100%;
                overflow: scroll;
            }
        `,
    ];

    override render(): TemplateResult {
        return html`
            <div class="child"><slot></slot></div>
        `;
    }
}

customElements.define('my-parent', MyParent);

export const scrollParentInAssignedSlot = (): TemplateResult => {
    const items = generateItems(1000);

    return html`
        <my-parent>
            <sp-grid
                .items=${items}
                .focusableSelector=${'sp-card'}
                .renderItem=${renderItem as RenderItemFunction<Item>}
            ></sp-grid>
        </my-parent>
    `;
};

scrollParentInAssignedSlot.swc_vrt = {
    skip: true,
};

scrollParentInAssignedSlot.parameters = {
    // Disables Chromatic's snapshotting on a global level
    chromatic: { disableSnapshot: true },
};

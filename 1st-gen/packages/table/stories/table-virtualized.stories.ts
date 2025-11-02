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
    html,
    SpectrumElement,
    TemplateResult,
} from '@spectrum-web-components/base';
import { property } from '@spectrum-web-components/base/src/decorators.js';

import '@spectrum-web-components/table/sp-table.js';
import '@spectrum-web-components/table/sp-table-checkbox-cell.js';
import '@spectrum-web-components/table/sp-table-head.js';
import '@spectrum-web-components/table/sp-table-head-cell.js';
import '@spectrum-web-components/table/sp-table-body.js';
import '@spectrum-web-components/table/sp-table-row.js';
import '@spectrum-web-components/table/sp-table-cell.js';
import { Item, makeItems, Properties, renderItem } from './index.js';
import type { SortedEventDetails, Table } from '@spectrum-web-components/table';
import { RangeChangedEvent } from '@lit-labs/virtualizer/events.js';

export default {
    title: 'Table/Virtualized',
    component: 'sp-table',
    argTypes: {
        onChange: { action: 'change' },
        selected: {
            name: 'selected',
            description: 'The array of item values selected by the Table.',
            type: { name: '', required: false },
            control: 'text',
        },
        selects: {
            name: 'selects',
            description:
                'If the Table accepts a "single" or "multiple" selection.',
            control: {
                type: 'inline-radio',
                options: ['', 'single', 'multiple'],
            },
        },
    },
    args: {
        selects: '',
        selected: [],
    },
};

class VirtualTable extends SpectrumElement {
    @property({ type: Array })
    public items: {
        name: string;
        date: number;
    }[] = makeItems(50);

    constructor() {
        super();
        this.items.sort(this.compareItems('name', 'desc'));
    }

    compareItems =
        (sortKey: 'name' | 'date', sortDirection: 'asc' | 'desc') =>
        (
            a: {
                name: string;
                date: number;
            },
            b: {
                name: string;
                date: number;
            }
        ): number => {
            const doSortKey = sortKey;
            if (!isNaN(Number(a[doSortKey]))) {
                const first = Number(a[doSortKey]);
                const second = Number(b[doSortKey]);
                return sortDirection === 'asc'
                    ? first - second
                    : second - first;
            } else {
                const first = String(a[doSortKey]);
                const second = String(b[doSortKey]);
                return sortDirection === 'asc'
                    ? first.localeCompare(second)
                    : second.localeCompare(first);
            }
        };

    protected override render(): TemplateResult {
        return html`
            <sp-table
                .items=${this.items}
                .renderItem=${renderItem}
                size="m"
                scroller="true"
                style="height: 200px"
                @sorted=${(event: CustomEvent<SortedEventDetails>): void => {
                    const { sortKey, sortDirection } = event.detail; // leveraged CustomEvent().detail, works across shadow boundaries
                    const items = [...this.items];
                    // depending on the column, sort asc or desc depending on the arrow direction
                    items.sort(
                        this.compareItems(
                            sortKey as 'name' | 'date',
                            sortDirection
                        )
                    );
                    this.items = items;
                }}
            >
                <sp-table-head>
                    <sp-table-head-cell
                        sortable
                        sort-key="name"
                        sort-direction="desc"
                    >
                        Column Title
                    </sp-table-head-cell>
                    <sp-table-head-cell sortable sort-key="date">
                        Column Title
                    </sp-table-head-cell>
                    <sp-table-head-cell>Column Title</sp-table-head-cell>
                </sp-table-head>
            </sp-table>
        `;
    }
}

customElements.define('virtual-table', VirtualTable);

const virtualItems = makeItems(50);

export const virtualized = (): TemplateResult => {
    return html`
        <virtual-table></virtual-table>
    `;
};

export const virtualizedSingle = (args: Properties): TemplateResult => {
    const onChange =
        (args.onChange as (eventData: {
            first: number;
            last: number;
            type: string;
        }) => void) ||
        (() => {
            return;
        });

    return html`
        <sp-table
            size="m"
            scroller="true"
            style="height: 300px"
            selects=${args.selects}
            .selected=${args.selected}
            @change=${({ target }: Event & { target: Table }) => {
                const next = target.nextElementSibling as HTMLDivElement;
                next.textContent = `Selected: ${JSON.stringify(
                    target.selected
                )}`;
            }}
            .items=${virtualItems}
            .renderItem=${renderItem}
            @visibilityChanged=${(event: RangeChangedEvent) =>
                onChange({
                    first: event.first,
                    last: event.last,
                    type: 'visibility',
                })}
            @rangeChanged=${(event: RangeChangedEvent) =>
                onChange({
                    first: event.first,
                    last: event.last,
                    type: 'range',
                })}
        >
            <sp-table-head>
                <sp-table-head-cell>Column Title</sp-table-head-cell>
                <sp-table-head-cell>Column Title</sp-table-head-cell>
                <sp-table-head-cell>Column Title</sp-table-head-cell>
            </sp-table-head>
        </sp-table>
        <div>Selected: ["49"]</div>
    `;
};
virtualizedSingle.args = {
    selects: 'single',
    selected: ['49'],
};

export const virtualizedMultiple = (args: Properties): TemplateResult => {
    return html`
        <sp-table
            size="m"
            scroller="true"
            style="height: 200px"
            selects=${args.selects}
            .selected=${args.selected}
            @change=${({ target }: Event & { target: Table }) => {
                const next = target.nextElementSibling as HTMLDivElement;
                next.textContent = `Selected: ${JSON.stringify(
                    target.selected,
                    null,
                    ' '
                )}`;
                const nextNext = next.nextElementSibling as HTMLDivElement;
                nextNext.textContent = `Selected Count: ${target.selected.length}`;
            }}
            .items=${virtualItems}
            .renderItem=${renderItem}
        >
            <sp-table-head>
                <sp-table-head-cell>Column Title</sp-table-head-cell>
                <sp-table-head-cell>Column Title</sp-table-head-cell>
                <sp-table-head-cell>Column Title</sp-table-head-cell>
            </sp-table-head>
        </sp-table>
        <div>Selected: ["0", "48"]</div>
        <div>Selected Count: 2</div>
    `;
};
virtualizedMultiple.args = {
    selects: 'multiple',
    selected: ['0', '48'],
};

export const virtualizedCustomValue = (args: Properties): TemplateResult => {
    return html`
        <sp-table
            size="m"
            scroller="true"
            style="height: 200px"
            selects=${args.selects}
            .selected=${args.selected}
            @change=${args.onChange}
            .items=${virtualItems}
            .itemValue=${(item: Item) => 'applied-' + item.date}
            .renderItem=${renderItem}
        >
            <sp-table-head>
                <sp-table-head-cell>Column Title</sp-table-head-cell>
                <sp-table-head-cell>Column Title</sp-table-head-cell>
                <sp-table-head-cell>Column Title</sp-table-head-cell>
            </sp-table-head>
            <sp-table-body></sp-table-body>
        </sp-table>
        <div>Selected: ["0", "48", "applied-47"]</div>
        <div>Selected Count: 2</div>
    `;
};
virtualizedCustomValue.args = {
    selected: ['0', '48', 'applied-47'],
    selects: 'multiple',
    onChange: ({ target }: Event & { target: Table }) => {
        const next = target.nextElementSibling as HTMLDivElement;
        next.textContent = `Selected: ${JSON.stringify(
            target.selected,
            null,
            ' '
        )}`;
        const nextNext = next.nextElementSibling as HTMLDivElement;
        nextNext.textContent = `Selected Count: ${target.selected.length}`;
    },
};

export const virtualizedCustomRow = (args: Properties): TemplateResult => {
    virtualItems.splice(3, 1, { name: 'Scoobert', date: 2, _$rowType$: 1 });

    return html`
        <sp-table
            size="m"
            scroller="true"
            style="height: 200px"
            selects=${args.selects}
            .selected=${args.selected}
            @change=${({ target }: Event & { target: Table }) => {
                const next = target.nextElementSibling as HTMLDivElement;
                next.textContent = `Selected: ${JSON.stringify(
                    target.selected,
                    null,
                    ' '
                )}`;
                const nextNext = next.nextElementSibling as HTMLDivElement;
                nextNext.textContent = `Selected Count: ${target.selected.length}`;
            }}
            scroller?="false"
            .items=${virtualItems}
            .renderItem=${renderItem}
        >
            <sp-table-head>
                <sp-table-head-cell>Column Title</sp-table-head-cell>
                <sp-table-head-cell>Column Title</sp-table-head-cell>
                <sp-table-head-cell>Column Title</sp-table-head-cell>
            </sp-table-head>
        </sp-table>
        <div>Selected: ["0", "48"]</div>
        <div>Selected Count: 2</div>
    `;
};
virtualizedCustomRow.args = {
    selects: 'multiple',
    selected: ['0', '48'],
};

export const virtualizedNoScroller = (): TemplateResult => {
    return html`
        <sp-table size="m" .items=${virtualItems} .renderItem=${renderItem}>
            <sp-table-head>
                <sp-table-head-cell>Column Title</sp-table-head-cell>
                <sp-table-head-cell>Column Title</sp-table-head-cell>
                <sp-table-head-cell>Column Title</sp-table-head-cell>
            </sp-table-head>
        </sp-table>
    `;
};

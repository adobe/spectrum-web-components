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

import { html, TemplateResult } from '@spectrum-web-components/base';
import type { Table, TableItem } from '@spectrum-web-components/table';

export type Properties = {
    selected?: string[] | undefined;
    selects?: undefined | 'single' | 'multiple';
    onChange?: (
        eventData: Event & {
            target: Table;
            first: number;
            last: number;
            type: string;
        }
    ) => void;
};

export interface Item extends TableItem {
    name: string;
    date: number;
}

export function makeItems(count: number): Item[] {
    const total = count;
    const items: Item[] = [];
    while (count) {
        count--;
        items.push({
            name: String(total - count),
            date: count,
        });
    }
    return items;
}

export const renderItem = (item: Item, index: number): TemplateResult => {
    if (item._$rowType$ === 1) {
        return html`
            <sp-table-cell>This row has no checkbox!</sp-table-cell>
        `;
    }
    return html`
        <sp-table-cell>Row Item ${item.name}</sp-table-cell>
        <sp-table-cell>Row Item ${item.date}</sp-table-cell>
        <sp-table-cell>Row Item ${index}</sp-table-cell>
    `;
};

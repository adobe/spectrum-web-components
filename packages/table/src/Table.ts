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
    html,
    SpectrumElement,
    CSSResultArray,
    TemplateResult,
    queryAssignedNodes,
    classMap,
    property,
    ifDefined,
} from '@spectrum-web-components/base';

import styles from './table.css.js';
import { HeadCell, HeadCellOrder } from './HeadCell';
import { Row } from './Row';

export type CellContent = string | TemplateResult | ReadonlyArray<Node>;

export declare interface HeadCellData {
    content: CellContent;
    sortable?: boolean;
    order?: HeadCellOrder;
}

export type HeaderData = ReadonlyArray<HeadCellData>;

export declare interface CellData {
    content: CellContent;
}

export type RowData = ReadonlyArray<CellData>;

export type TableData = ReadonlyArray<RowData>;

/**
 * @element sp-table
 */
export class Table extends SpectrumElement {
    public static get styles(): CSSResultArray {
        return [styles];
    }

    @property({ type: Array })
    public header: HeaderData = [];

    @property({ type: Array })
    public data: TableData = [];

    @queryAssignedNodes('', true, 'sp-head-cell')
    private headCellNodes!: ReadonlyArray<HeadCell> | null;

    @queryAssignedNodes('', true, 'sp-row')
    private rowNodes!: ReadonlyArray<Row> | null;

    protected render(): TemplateResult {
        return html`
            <slot
                style="display: none;"
                @slotchange="${this.onSlotChanges}"
            ></slot>

            <div class="spectrum-Table" role="grid">
                <div
                    class="spectrum-Table-head"
                    style="display: flex"
                    role="row"
                >
                    ${this.header.map(
                        (c) => html`
                            <div
                                class="spectrum-Table-headCell ${classMap({
                                    'is-sortable': c.sortable === true,
                                    'is-sorted-desc':
                                        c.sortable === true &&
                                        c.order === 'descending',
                                })}"
                                style="flex: 1"
                                role="columnheader"
                                aria-sort="${ifDefined(c.order)}"
                                tabindex="0"
                            >
                                ${c.content}
                            </div>
                        `
                    )}
                </div>
                <div class="spectrum-Table-body" role="rowgroup">
                    ${this.data.map(
                        (r) => html`
                            <div
                                class="spectrum-Table-row"
                                style="display: flex"
                                role="row"
                            >
                                ${r.map(
                                    (c) => html`
                                        <div
                                            class="spectrum-Table-cell"
                                            style="flex: 1"
                                            role="gridcell"
                                            tabindex="0"
                                        >
                                            ${c.content}
                                        </div>
                                    `
                                )}
                            </div>
                        `
                    )}
                </div>
            </div>
        `;
    }

    private onSlotChanges(): void {
        if (this.headCellNodes !== null && this.headCellNodes.length > 0) {
            this.header = this.headCellNodes.map((c) => ({
                content: c.contentSlot.assignedNodes(),
                sortable: c.sortable,
                order: c.order,
            }));
        }

        if (this.rowNodes !== null && this.rowNodes.length > 0) {
            Promise.all(this.rowNodes.map((r) => r.ready)).then((rows) => {
                this.data = rows.map((r) => {
                    return r.map((c) => ({
                        content: c.contentSlot.assignedNodes(),
                    }));
                });
            });
        }
    }
}

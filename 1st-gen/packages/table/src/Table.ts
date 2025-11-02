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
    nothing,
    PropertyValues,
    render,
    SizedMixin,
    SpectrumElement,
    TemplateResult,
} from '@spectrum-web-components/base';
// Leveraged in build systems that use aliasing to prevent multiple registrations: https://github.com/adobe/spectrum-web-components/pull/3225
import '@spectrum-web-components/table/sp-table-body.js';
import '@spectrum-web-components/table/sp-table-row.js';
import '@spectrum-web-components/table/sp-table-checkbox-cell.js';
import { property } from '@spectrum-web-components/base/src/decorators.js';
import styles from './table.css.js';
import { TableBody } from './TableBody.js';
import type { TableCheckboxCell } from './TableCheckboxCell.js';
import type { TableHead } from './TableHead.js';
import type { TableHeadCell } from './TableHeadCell.js';
import type { TableRow } from './TableRow.js';
import {
    virtualize,
    VirtualizeDirectiveConfig,
    virtualizerRef,
} from '@lit-labs/virtualizer/virtualize.js';
import { Virtualizer } from '@lit-labs/virtualizer/Virtualizer.js';
import {
    RangeChangedEvent,
    VisibilityChangedEvent,
} from '@lit-labs/virtualizer/events.js';

export enum RowType {
    ITEM = 0,
    INFORMATION = 1,
}

export interface TableItem extends Record<string, unknown> {
    _$rowType$?: RowType;
}

/**
 * @element sp-table
 *
 * @fires rangeChanged - Announces a change in the range of visible cells on the table body
 * @event change - Announces a change in the `selected` property of a table row
 */

export class Table extends SizedMixin(SpectrumElement, {
    validSizes: ['s', 'm', 'l', 'xl'],
    noDefaultSize: true,
}) {
    public static override get styles(): CSSResultArray {
        return [styles];
    }

    get renderItem(): (
        item: Record<string, unknown>,
        index: number
    ) => TemplateResult {
        return this._renderItem;
    }

    set renderItem(
        fn: (item: Record<string, unknown>, index: number) => TemplateResult
    ) {
        this._renderItem = (
            item: Record<string, unknown>,
            index: number
        ): TemplateResult => {
            const value = this.itemValue(item, index);
            const selected = this.selected.includes(value);
            const hasCheckbox = this.selects && item?._$rowType$ !== 1;

            return html`
                <sp-table-row
                    value=${value}
                    aria-rowindex=${index + 1}
                    ?selected=${selected}
                >
                    ${hasCheckbox
                        ? html`
                              <sp-table-checkbox-cell
                                  ?checked=${selected}
                              ></sp-table-checkbox-cell>
                          `
                        : nothing}
                    ${fn(item, index)}
                </sp-table-row>
            `;
        };
    }

    private _renderItem: (
        item: Record<string, unknown>,
        index: number
    ) => TemplateResult = /* c8 ignore next */ () => html``;

    @property({ reflect: true })
    public override role = 'grid';

    /**
     * Whether the Table allows users to select a row or rows, and thus controls whether or not the Table also renders checkboxes.
     */
    @property({ type: String, reflect: true })
    public selects: undefined | 'single' | 'multiple';

    /**
     * An array of <sp-row> values that have been selected.
     */
    @property({ type: Array })
    public selected: string[] = [];

    private selectedSet = new Set<string>();

    /**
     * The content of the rows rendered by the virtualized table. The key is the value of the sp-table-row, and the value is the sp-table-row's content (not the row itself).
     */
    @property({ type: Array })
    public items: Record<string, unknown>[] = [];

    /**
     * The value of an item. By default, it is set to the index of the sp-table-row.
     */
    @property({ type: Object })
    public itemValue = (_item: unknown, index: number): string => {
        return `${index}`;
    };

    /**
     * Whether or not the virtualized table has a scroll bar. If this is set to true, make sure to specify a height in the sp-table's inline styles.
     */
    @property({ type: Boolean, reflect: true })
    public scroller = false;

    /**
     * Deliver the Table with additional visual emphasis to selected rows.
     */
    @property({ type: Boolean, reflect: true })
    public emphasized = false;

    /**
     * Display with "quiet" variant styles.
     */
    @property({ type: Boolean, reflect: true })
    public quiet = false;

    /**
     * Changes the spacing around table cell content.
     */
    @property({ type: String, reflect: true })
    public density?: 'compact' | 'spacious';

    private tableBody?: TableBody;

    private tableHeadCheckboxCell?: TableCheckboxCell;

    private get tableHead(): TableHead {
        return this.querySelector('sp-table-head') as TableHead;
    }

    private get tableRows(): TableRow[] {
        if (this.isVirtualized) {
            return [];
        }
        return [...this.querySelectorAll('sp-table-row')] as TableRow[];
    }

    private get isVirtualized(): boolean {
        return !!this.items.length;
    }

    public override focus(): void {
        const sortableHeadCell = this.querySelector(
            'sp-table-head-cell[sortable]'
        ) as TableHeadCell;
        if (sortableHeadCell) {
            sortableHeadCell.focus();
        }
    }

    private selectAllRows(): void {
        if (this.isVirtualized) {
            this.items.forEach((item, index: number) => {
                if (item._$rowType$ !== 1) {
                    this.selectedSet.add(this.itemValue(item, index));
                }
            });
        } else {
            this.tableRows.forEach((row) => {
                row.selected = true; // Visually
                this.selectedSet.add(row.value); // Prepares table state
            });
        }
        this.selected = [...this.selectedSet];

        if (!this.tableHeadCheckboxCell) /* c8 ignore next */ return;
        this.tableHeadCheckboxCell.checked = true;
        this.tableHeadCheckboxCell.indeterminate = false;
    }

    private deselectAllRows(): void {
        this.selectedSet.clear();
        this.selected = [];

        if (!this.isVirtualized) {
            const selectedRows = [
                ...this.querySelectorAll('[selected]'),
            ] as TableRow[];

            selectedRows.forEach((row) => {
                row.selected = false;
            });
        }

        if (!this.tableHeadCheckboxCell) /* c8 ignore next */ return;
        this.tableHeadCheckboxCell.checked = false;
        this.tableHeadCheckboxCell.indeterminate = false;
    }

    protected manageSelects(): void {
        const checkboxes = this.querySelectorAll('sp-table-checkbox-cell');
        const checkbox = document.createElement('sp-table-checkbox-cell');

        if (!!this.selects) {
            let allSelected = false;
            if (this.isVirtualized) {
                allSelected =
                    this.selected.length > 0 &&
                    this.selected.length === this.items.length;
            } else {
                this.tableRows.forEach((row) => {
                    row.selected = this.selectedSet.has(row.value);
                    // Create and initialize checkboxes in all rows within the table body.
                    if (!row.querySelector(':scope > sp-table-checkbox-cell')) {
                        const clonedCheckbox =
                            checkbox.cloneNode() as TableCheckboxCell;
                        checkbox.emphasized = this.emphasized;
                        row.insertAdjacentElement('afterbegin', clonedCheckbox);
                        checkbox.checked = row.selected;
                    }
                });
                allSelected = this.selected.length === this.tableRows.length;
            }

            // Create and initialize table head checkbox cell.
            if (!this.tableHeadCheckboxCell) {
                this.tableHeadCheckboxCell = document.createElement(
                    'sp-table-checkbox-cell'
                ) as TableCheckboxCell;
                this.tableHeadCheckboxCell.headCell = true;
                this.tableHeadCheckboxCell.emphasized = this.emphasized;
                this.tableHead?.insertAdjacentElement(
                    'afterbegin',
                    this.tableHeadCheckboxCell
                );
            }
            this.manageHeadCheckbox(allSelected);
        } else {
            // Remove all checkbox cells.
            checkboxes.forEach((box) => {
                box.remove();
            });
            delete this.tableHeadCheckboxCell;
        }
    }

    protected validateSelected(): void {
        const rowValues = new Set<string>();

        if (this.isVirtualized) {
            this.items.forEach((item, index) => {
                const value = this.itemValue(item, index);
                rowValues.add(value);
            });
        } else {
            this.tableRows.forEach((row) => {
                rowValues.add(row.value);
            });
        }

        const oldSelectedCount = this.selected.length;

        this.selected = this.selected.filter((selectedItem) =>
            rowValues.has(selectedItem)
        );
        if (oldSelectedCount !== this.selected.length) {
            this.dispatchEvent(
                new Event('change', {
                    cancelable: true,
                    bubbles: true,
                    composed: true,
                })
            );
        }
        this.selectedSet = new Set(this.selected);
    }

    protected manageSelected(): void {
        this.validateSelected();

        if (this.isVirtualized) return;

        this.tableRows.forEach((row) => {
            row.selected = this.selectedSet.has(row.value);
        });
        if (this.tableHeadCheckboxCell) {
            this.tableHeadCheckboxCell.checked =
                this.selected.length === this.tableRows.length;
        }
    }

    protected manageCheckboxes(): void {
        if (!!this.selects) {
            // Create and initialize table head checkbox cell.
            this.tableHeadCheckboxCell = document.createElement(
                'sp-table-checkbox-cell'
            ) as TableCheckboxCell;
            this.tableHeadCheckboxCell.headCell = true;
            this.tableHeadCheckboxCell.emphasized = this.emphasized;

            const allSelected = this.selected.length === this.tableRows.length;
            this.manageHeadCheckbox(allSelected);

            this.tableHead?.insertAdjacentElement(
                'afterbegin',
                this.tableHeadCheckboxCell
            );

            // Create and initialize checkboxes in all rows within the table body.
            this.tableRows.forEach((row) => {
                const checkbox = document.createElement(
                    'sp-table-checkbox-cell'
                );
                checkbox.emphasized = this.emphasized;
                row.insertAdjacentElement('afterbegin', checkbox);
                row.selected = this.selectedSet.has(row.value);
                checkbox.checked = row.selected;
            });
        } else {
            // Remove all checkbox cells.
            this.tableHead?.querySelector('sp-table-checkbox-cell')?.remove();
            this.tableRows.forEach((row) => {
                row.checkboxCells[0]?.remove();
                if (this.selected.length) {
                    row.selected = this.selectedSet.has(row.value);
                }
            });
        }
    }

    protected manageHeadCheckbox(allSelected: boolean): void {
        if (!this.tableHeadCheckboxCell) /* c8 ignore next */ return;

        this.tableHeadCheckboxCell.selectsSingle = this.selects === 'single';
        this.tableHeadCheckboxCell.emphasized = this.emphasized;
        this.tableHeadCheckboxCell.checked = allSelected;
        this.tableHeadCheckboxCell.indeterminate =
            this.selected.length > 0 && !allSelected;
    }

    protected handleChange(event: Event): void {
        event.stopPropagation();

        const previousSelectedSet = new Set(this.selectedSet);
        const previousSelected = [...this.selected];

        const { target } = event;
        const { parentElement: rowItem } = target as HTMLElement & {
            parentElement: TableRow;
        };
        if (!rowItem.value) {
            const { checkbox } = target as TableCheckboxCell;
            if (!checkbox) return;
            if (checkbox.checked || checkbox.indeterminate) {
                this.selectAllRows();
            } else {
                this.deselectAllRows();
            }
        } else {
            switch (this.selects) {
                case 'single': {
                    this.deselectAllRows();
                    if (rowItem.selected) {
                        this.selectedSet.add(rowItem.value);
                        this.selected = [...this.selectedSet];
                    }
                    break;
                }
                case 'multiple': {
                    if (rowItem.selected) {
                        this.selectedSet.add(rowItem.value);
                    } else {
                        this.selectedSet.delete(rowItem.value);
                    }
                    this.selected = [...this.selectedSet];

                    const allSelected =
                        this.selected.length === this.tableRows.length;

                    if (!this.tableHeadCheckboxCell)
                        /* c8 ignore next */ return;
                    this.tableHeadCheckboxCell.checked = allSelected;
                    this.tableHeadCheckboxCell.indeterminate =
                        this.selected.length > 0 && !allSelected;
                    break;
                }
                default: {
                    break;
                }
            }
        }
        const applyDefault = this.dispatchEvent(
            new Event('change', {
                cancelable: true,
                bubbles: true,
                composed: true,
            })
        );
        if (!applyDefault) {
            event.preventDefault();
            this.selectedSet = previousSelectedSet;
            this.selected = previousSelected;
        }
    }

    public scrollToIndex(index?: number): void {
        if (index && !!this.tableBody) {
            const virtualizerParent = this.tableBody as unknown as {
                [virtualizerRef]: Virtualizer;
            };
            const item = virtualizerParent[virtualizerRef].element(index);
            if (item) {
                item.scrollIntoView();
            }
        }
    }

    protected override render(): TemplateResult {
        return html`
            <slot @change=${this.handleChange}></slot>
        `;
    }

    protected override willUpdate(changed: PropertyValues<this>): void {
        if (!this.hasUpdated) {
            this.validateSelected();
            this.manageCheckboxes();
        }
        if (changed.has('selects')) {
            this.manageSelects();
        }

        if (changed.has('selected') && this.hasUpdated) {
            this.manageSelected();
        }
    }

    protected override updated(): void {
        if (this.items.length) {
            this.renderVirtualizedItems();
        } else {
            this.removeAttribute('aria-rowcount');
        }
    }

    protected renderVirtualizedItems(): void {
        // Rendering updates into the table while disconnected can
        // cause runaway event binding in ancestor elements.
        if (!this.isConnected) return;
        if (!this.tableBody) {
            this.tableBody = this.querySelector('sp-table-body') as TableBody;
            if (!this.tableBody) {
                this.tableBody = document.createElement('sp-table-body');
                this.append(this.tableBody);
            }
            this.tableBody.addEventListener(
                'rangeChanged',
                (event: RangeChangedEvent) => {
                    this.dispatchEvent(
                        new RangeChangedEvent({
                            first: event.first,
                            last: event.last,
                        })
                    );
                }
            );
            this.tableBody.addEventListener(
                'visibilityChanged',
                (event: VisibilityChangedEvent) => {
                    this.dispatchEvent(
                        new VisibilityChangedEvent({
                            first: event.first,
                            last: event.last,
                        })
                    );
                }
            );
        }

        // Ensures screenreaders can announce the true size of the table
        // despite virtualization only rendering a subset of rows.
        this.setAttribute('aria-rowcount', `${this.items.length}`);

        const config: VirtualizeDirectiveConfig<Record<string, unknown>> = {
            items: this.items,
            renderItem: this.renderItem,
            scroller: this.scroller,
        };
        render(
            html`
                ${virtualize(config)}
            `,
            this.tableBody
        );
    }

    public override disconnectedCallback(): void {
        super.disconnectedCallback();
    }
}

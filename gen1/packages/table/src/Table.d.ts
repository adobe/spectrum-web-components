/**
 * Copyright 2026 Adobe. All rights reserved.
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
import '@spectrum-web-components/table/sp-table-body.js';
import '@spectrum-web-components/table/sp-table-checkbox-cell.js';
import '@spectrum-web-components/table/sp-table-row.js';
import type { TableRow } from './TableRow.js';
export declare enum RowType {
    ITEM = 0,
    INFORMATION = 1
}
export interface TableItem extends Record<string, unknown> {
    _$rowType$?: RowType;
}
declare const Table_base: typeof SpectrumElement & import("@spectrum-web-components/base").Constructor<import("@spectrum-web-components/base").SizedElementInterface> & import("@spectrum-web-components/base").SizedElementConstructor;
/**
 * @element sp-table
 *
 * @fires rangeChanged - Announces a change in the range of visible cells on the table body
 * @event change - Announces a change in the `selected` property of a table row
 */
export declare class Table extends Table_base {
    static get styles(): CSSResultArray;
    get renderItem(): (item: Record<string, unknown>, index: number) => TemplateResult;
    set renderItem(fn: (item: Record<string, unknown>, index: number) => TemplateResult);
    private _renderItem;
    role: string;
    /**
     * Whether the Table allows users to select a row or rows, and thus controls whether or not the Table also renders checkboxes.
     */
    selects: undefined | 'single' | 'multiple';
    /**
     * An array of <sp-row> values that have been selected.
     */
    selected: string[];
    /**
     * The accessible label for the "select all" checkbox in the table header.
     * Defaults to 'Select All'.
     */
    selectAllLabel: string;
    private selectedSet;
    /**
     * The content of the rows rendered by the virtualized table. The key is the value of the sp-table-row, and the value is the sp-table-row's content (not the row itself).
     */
    items: Record<string, unknown>[];
    /**
     * The value of an item. By default, it is set to the index of the sp-table-row.
     */
    itemValue: (_item: unknown, index: number) => string;
    /**
     * A function to extract the accessible label for a row's checkbox from an item.
     * By default, returns a generic label based on the row index.
     * Override this to provide more meaningful labels for accessibility in virtualized tables.
     */
    itemLabel: (_item: Record<string, unknown>, index: number) => string;
    /**
     * Whether or not the virtualized table has a scroll bar. If this is set to true, make sure to specify a height in the sp-table's inline styles.
     */
    scroller: boolean;
    /**
     * Deliver the Table with additional visual emphasis to selected rows.
     */
    emphasized: boolean;
    /**
     * Display with "quiet" variant styles.
     */
    quiet: boolean;
    /**
     * Changes the spacing around table cell content.
     */
    density?: 'compact' | 'spacious';
    private tableBody?;
    private tableHeadCheckboxCell?;
    private get tableHead();
    private get tableRows();
    private get isVirtualized();
    /**
     * Gets the accessible label for a row's checkbox based on the first cell's text content.
     * Falls back to using the row's value attribute if no cell content is available.
     */
    protected getRowCheckboxLabel(row: TableRow): string;
    focus(): void;
    private selectAllRows;
    private deselectAllRows;
    protected manageSelects(): void;
    protected validateSelected(): void;
    protected manageSelected(): void;
    protected manageCheckboxes(): void;
    protected manageHeadCheckbox(allSelected: boolean): void;
    protected handleChange(event: Event): void;
    scrollToIndex(index?: number): void;
    protected render(): TemplateResult;
    protected willUpdate(changed: PropertyValues<this>): void;
    protected updated(): void;
    protected renderVirtualizedItems(): void;
    disconnectedCallback(): void;
}
export {};

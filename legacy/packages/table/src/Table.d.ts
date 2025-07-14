import { CSSResultArray, PropertyValues, SpectrumElement, TemplateResult } from '@spectrum-web-components/base';
import '@spectrum-web-components/table/sp-table-body.js';
import '@spectrum-web-components/table/sp-table-row.js';
import '@spectrum-web-components/table/sp-table-checkbox-cell.js';
export declare enum RowType {
    ITEM = 0,
    INFORMATION = 1
}
export interface TableItem extends Record<string, unknown> {
    _$rowType$?: RowType;
}
declare const Table_base: typeof SpectrumElement & {
    new (...args: any[]): import("@spectrum-web-components/base").SizedElementInterface;
    prototype: import("@spectrum-web-components/base").SizedElementInterface;
};
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

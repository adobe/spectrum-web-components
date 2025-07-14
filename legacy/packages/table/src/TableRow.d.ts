import { CSSResultArray, PropertyValues, SpectrumElement, TemplateResult } from '@spectrum-web-components/base';
import { TableCheckboxCell } from './TableCheckboxCell.js';
/**
 * @element sp-table-row
 *
 * @fires sorted - Announces that `selected` of the table row has changed
 */
export declare class TableRow extends SpectrumElement {
    static get styles(): CSSResultArray;
    checkboxCells: TableCheckboxCell[];
    role: string;
    selectable: boolean;
    selected: boolean;
    value: string;
    protected handleChange(event: Event & {
        target: TableCheckboxCell;
    }): Promise<void>;
    protected handleSlotchange({ target, }: Event & {
        target: HTMLSlotElement;
    }): void;
    protected manageSelected(): Promise<void>;
    protected handleClick(event: Event): void;
    protected render(): TemplateResult;
    protected willUpdate(changed: PropertyValues<this>): void;
}

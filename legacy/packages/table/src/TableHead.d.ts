import { CSSResultArray, SpectrumElement, TemplateResult } from '@spectrum-web-components/base';
import { TableCheckboxCell } from './TableCheckboxCell.js';
/**
 * @element sp-table-head
 *
 */
export declare class TableHead extends SpectrumElement {
    static get styles(): CSSResultArray;
    role: string;
    selected?: boolean;
    private handleSorted;
    protected handleChange({ target: checkboxCell, }: Event & {
        target: TableCheckboxCell;
    }): void;
    protected render(): TemplateResult;
}

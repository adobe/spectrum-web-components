import { CSSResultArray, SpectrumElement, TemplateResult } from '@spectrum-web-components/base';
import '@spectrum-web-components/checkbox/sp-checkbox.js';
import { Checkbox } from '@spectrum-web-components/checkbox';
/**
 * @element sp-table-checkbox-cell
 */
export declare class TableCheckboxCell extends SpectrumElement {
    static get styles(): CSSResultArray;
    /**
     * Whether or not the checkbox cell is in the table head.
     */
    headCell: boolean;
    role: string;
    checkbox: Checkbox;
    indeterminate: boolean;
    checked: boolean;
    disabled: boolean;
    selectsSingle: boolean;
    emphasized: boolean;
    click(): void;
    protected render(): TemplateResult;
}

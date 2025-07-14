import { CSSResultArray, PropertyValues, SpectrumElement, TemplateResult } from '@spectrum-web-components/base';
import '@spectrum-web-components/icons-ui/icons/sp-icon-arrow100.js';
export type SortedEventDetails = {
    sortDirection: 'asc' | 'desc';
    sortKey: string;
};
/**
 * @element sp-table-head-cell
 *
 * @fires sorted - Announces that the table head has been sorted and handles the sorted event
 */
export declare class TableHeadCell extends SpectrumElement {
    static get styles(): CSSResultArray;
    active: boolean;
    role: string;
    sortable: boolean;
    sortDirection: 'asc' | 'desc' | undefined;
    sortKey: string;
    protected handleKeydown(event: KeyboardEvent): void;
    private handleKeypress;
    protected handleKeyup(event: KeyboardEvent): void;
    protected handleClick(): void;
    protected render(): TemplateResult;
    protected firstUpdated(changes: PropertyValues): void;
    protected update(changes: PropertyValues): void;
}

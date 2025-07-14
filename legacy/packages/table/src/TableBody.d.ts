import { CSSResultArray, SpectrumElement, TemplateResult } from '@spectrum-web-components/base';
/**
 * @element sp-table-body
 */
export declare class TableBody extends SpectrumElement {
    static get styles(): CSSResultArray;
    constructor();
    protected shouldHaveTabIndex(): void;
    role: string;
    protected render(): TemplateResult;
}

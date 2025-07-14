import { TemplateResult } from '@spectrum-web-components/base';
export declare class HelpTextManager {
    private conditionId?;
    private host;
    id: string;
    private mode;
    private previousTabindex?;
    private helpTextElement;
    private get isInternal();
    constructor(host: HTMLElement, { mode }?: {
        mode: 'internal' | 'external';
    });
    render(negative?: boolean): TemplateResult;
    private addId;
    private removeId;
    private handleSlotchange;
    private handleHelpText;
    private handleNegativeHelpText;
}

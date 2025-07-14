import { CSSResultArray, SpectrumElement, TemplateResult } from '@spectrum-web-components/base';
import '@spectrum-web-components/button/sp-button.js';
export type AlertDialogVariants = 'confirmation' | 'information' | 'warning' | 'error' | 'destructive' | 'secondary' | '';
export declare const alertDialogVariants: AlertDialogVariants[];
declare const AlertDialog_base: typeof SpectrumElement;
export declare class AlertDialog extends AlertDialog_base {
    static get styles(): CSSResultArray;
    private contentElement;
    private resizeController;
    _variant: AlertDialogVariants;
    set variant(variant: AlertDialogVariants);
    get variant(): AlertDialogVariants;
    protected renderIcon(): TemplateResult;
    protected renderHeading(): TemplateResult;
    protected renderContent(): TemplateResult;
    static instanceCount: number;
    private labelledbyId;
    private conditionLabelledby?;
    private conditionDescribedby?;
    private onHeadingSlotchange;
    shouldManageTabOrderForScrolling: () => void;
    private describedbyId;
    protected onContentSlotChange({ target, }: Event & {
        target: HTMLSlotElement;
    }): void;
    protected renderButtons(): TemplateResult;
    protected render(): TemplateResult;
}
export {};

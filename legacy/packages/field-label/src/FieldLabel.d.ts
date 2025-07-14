import { CSSResultArray, PropertyValues, SpectrumElement, TemplateResult } from '@spectrum-web-components/base';
import '@spectrum-web-components/icons-ui/icons/sp-icon-asterisk100.js';
declare const FieldLabel_base: typeof SpectrumElement & {
    new (...args: any[]): import("@spectrum-web-components/base").SizedElementInterface;
    prototype: import("@spectrum-web-components/base").SizedElementInterface;
};
/**
 * @element sp-field-label
 *
 * @slot - text content of the label
 */
export declare class FieldLabel extends FieldLabel_base {
    static get styles(): CSSResultArray;
    disabled: boolean;
    id: string;
    for: string;
    required: boolean;
    slotEl: HTMLSlotElement;
    sideAligned?: 'start' | 'end';
    private target?;
    private handleClick;
    private resolvedElement;
    private applyTargetLabel;
    private manageTarget;
    private get labelText();
    protected render(): TemplateResult;
    protected firstUpdated(changes: PropertyValues): void;
    protected willUpdate(changes: PropertyValues): void;
}
export {};

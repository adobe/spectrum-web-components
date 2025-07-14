import { CSSResultArray, PropertyValues, SpectrumElement, TemplateResult } from '@spectrum-web-components/base';
declare const ButtonGroup_base: typeof SpectrumElement & {
    new (...args: any[]): import("@spectrum-web-components/base").SizedElementInterface;
    prototype: import("@spectrum-web-components/base").SizedElementInterface;
};
/**
 * @element sp-button-group
 * @slot - the sp-button elements that make up the group
 */
export declare class ButtonGroup extends ButtonGroup_base {
    static get styles(): CSSResultArray;
    vertical: boolean;
    slotElement: HTMLSlotElement;
    protected updated(changedProperties: PropertyValues): void;
    protected handleSlotchange({ target: slot, }: Event & {
        target: HTMLSlotElement;
    }): void;
    private manageChildrenSize;
    protected render(): TemplateResult;
}
export {};

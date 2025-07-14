import { CSSResultArray, PropertyValues, TemplateResult } from '@spectrum-web-components/base';
import { Focusable } from '@spectrum-web-components/shared/src/focusable.js';
import '@spectrum-web-components/icons-ui/icons/sp-icon-chevron100.js';
declare const AccordionItem_base: typeof Focusable & {
    new (...args: any[]): import("@spectrum-web-components/base").SizedElementInterface;
    prototype: import("@spectrum-web-components/base").SizedElementInterface;
};
/**
 * @element sp-accordion-item
 * @slot - The content of the item that is hidden when the item is not open
 * @fires sp-accordion-item-toggle - Announce that an accordion item has been toggled while allowing the event to be cancelled.
 */
export declare class AccordionItem extends AccordionItem_base {
    static get styles(): CSSResultArray;
    open: boolean;
    label: string;
    disabled: boolean;
    get focusElement(): HTMLElement;
    private onClick;
    private toggle;
    protected renderChevronIcon: () => TemplateResult;
    protected render(): TemplateResult;
    protected updated(changes: PropertyValues): void;
}
export {};

import { CSSResultArray, PropertyValues, SpectrumElement, TemplateResult } from '@spectrum-web-components/base';
import { FocusGroupController } from '@spectrum-web-components/reactive-controllers/src/FocusGroup.js';
import { AccordionItem } from './AccordionItem.js';
declare const Accordion_base: typeof SpectrumElement & {
    new (...args: any[]): import("@spectrum-web-components/base").SizedElementInterface;
    prototype: import("@spectrum-web-components/base").SizedElementInterface;
};
/**
 * @element sp-accordion
 * @slot - The sp-accordion-item children to display.
 */
export declare class Accordion extends Accordion_base {
    static get styles(): CSSResultArray;
    /**
     * Allows multiple accordion items to be opened at the same time
     */
    allowMultiple: boolean;
    /**
     * Sets the spacing between the content to borders of an accordion item
     */
    density?: 'compact' | 'spacious';
    private defaultNodes;
    private get items();
    focusGroupController: FocusGroupController<AccordionItem>;
    focus(): void;
    private onToggle;
    private handleSlotchange;
    protected updated(changed: PropertyValues<this>): void;
    protected render(): TemplateResult;
}
export {};

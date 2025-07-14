import { CSSResultArray, SpectrumElement, TemplateResult } from '@spectrum-web-components/base';
import { RovingTabindexController } from '@spectrum-web-components/reactive-controllers/src/RovingTabindex.js';
import { Tag } from './Tag.js';
declare const Tags_base: typeof SpectrumElement;
/**
 * @element sp-tags
 *
 * @slot - Tag elements to manage as a group
 */
export declare class Tags extends Tags_base {
    static get styles(): CSSResultArray;
    defaultNodes: Node[];
    get tags(): Tag[];
    rovingTabindexController: RovingTabindexController<Tag>;
    constructor();
    focus(): void;
    private handleFocusin;
    private handleKeydown;
    private handleFocusout;
    private handleSlotchange;
    protected render(): TemplateResult;
    protected firstUpdated(): void;
}
export {};

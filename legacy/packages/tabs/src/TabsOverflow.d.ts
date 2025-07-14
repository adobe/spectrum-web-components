import { CSSResultArray, PropertyValueMap, PropertyValues, SpectrumElement, TemplateResult } from '@spectrum-web-components/base';
import { ResizeController } from '@lit-labs/observers/resize-controller.js';
import { Tabs } from './Tabs.js';
import '@spectrum-web-components/action-button/sp-action-button.js';
import '@spectrum-web-components/icons-ui/icons/sp-icon-chevron100.js';
declare const TabsOverflow_base: typeof SpectrumElement & {
    new (...args: any[]): import("@spectrum-web-components/base").SizedElementInterface;
    prototype: import("@spectrum-web-components/base").SizedElementInterface;
};
/**
 * @element sp-tabs-overflow
 */
export declare class TabsOverflow extends TabsOverflow_base {
    static get styles(): CSSResultArray;
    compact: boolean;
    labelPrevious: string;
    labelNext: string;
    dir: 'ltr' | 'rtl';
    private overflowState;
    private tabs;
    private overflowContainer;
    resizeController: ResizeController;
    protected get scrollContent(): Tabs[];
    constructor();
    protected firstUpdated(changes: PropertyValues): void;
    private _handleSlotChange;
    private _updateScrollState;
    private scrollFactor;
    private _handleScrollClick;
    protected updated(changedProperties: PropertyValueMap<this>): void;
    protected render(): TemplateResult;
}
export {};

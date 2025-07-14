import { PropertyValues, SpectrumElement, TemplateResult } from '@spectrum-web-components/base';
/**
 * @element sp-tab-panel
 *
 * @slot - content of the Tab Panel
 */
export declare class TabPanel extends SpectrumElement {
    static styles: import("@spectrum-web-components/base").CSSResult[];
    selected: boolean;
    value: string;
    protected handleFocusin(): void;
    protected handleFocusout(): void;
    protected render(): TemplateResult;
    protected firstUpdated(): void;
    protected updated(changes: PropertyValues<this>): void;
}

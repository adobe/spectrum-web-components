import { CSSResultArray, SpectrumElement, TemplateResult } from '@spectrum-web-components/base';
/**
 * @element sp-underlay
 *
 * @fires close - When the underlay is "clicked" and the consuming pattern should chose whether to close based on that interaction
 */
export declare class Underlay extends SpectrumElement {
    static get styles(): CSSResultArray;
    private canClick;
    open: boolean;
    click(): void;
    protected handlePointerdown(): void;
    protected handlePointerup(): void;
    protected render(): TemplateResult;
    protected firstUpdated(): void;
}

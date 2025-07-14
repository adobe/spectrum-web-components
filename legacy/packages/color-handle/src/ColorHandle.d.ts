import { CSSResultArray, PropertyValues, SpectrumElement, TemplateResult } from '@spectrum-web-components/base';
import '@spectrum-web-components/color-loupe/sp-color-loupe.js';
/**
 * @element sp-color-handle
 */
export declare class ColorHandle extends SpectrumElement {
    static get styles(): CSSResultArray;
    disabled: boolean;
    focused: boolean;
    open: boolean;
    color: string;
    private handlePointerdown;
    private handlePointerup;
    protected render(): TemplateResult;
    protected firstUpdated(changed: PropertyValues): void;
}

import { CSSResultArray, SpectrumElement, TemplateResult } from '@spectrum-web-components/base';
/**
 * @element sp-color-loupe
 */
export declare class ColorLoupe extends SpectrumElement {
    static get styles(): CSSResultArray;
    open: boolean;
    color: string;
    protected render(): TemplateResult;
}

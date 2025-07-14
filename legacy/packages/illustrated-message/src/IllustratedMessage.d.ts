import { CSSResultArray, SpectrumElement, TemplateResult } from '@spectrum-web-components/base';
/**
 * @element sp-illustrated-message
 *
 * @slot - The SVG that represents the illustration
 * @slot heading - Headline for the message
 * @slot description - Description text for the illustration
 */
export declare class IllustratedMessage extends SpectrumElement {
    static readonly is = "sp-illustrated-message";
    static get styles(): CSSResultArray;
    heading: string;
    description: string;
    protected render(): TemplateResult;
}

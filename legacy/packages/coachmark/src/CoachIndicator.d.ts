import { CSSResultArray, SpectrumElement, TemplateResult } from '@spectrum-web-components/base';
/**
 * @element sp-coach-indicator
 */
export declare class CoachIndicator extends SpectrumElement {
    static get styles(): CSSResultArray;
    quiet: boolean;
    staticColor?: 'white' | 'black';
    protected render(): TemplateResult;
}

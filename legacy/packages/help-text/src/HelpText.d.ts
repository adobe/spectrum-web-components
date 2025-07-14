import { CSSResultArray, SpectrumElement, TemplateResult } from '@spectrum-web-components/base';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-alert.js';
type HelpTextVariants = 'neutral' | 'negative';
declare const HelpText_base: typeof SpectrumElement & {
    new (...args: any[]): import("@spectrum-web-components/base").SizedElementInterface;
    prototype: import("@spectrum-web-components/base").SizedElementInterface;
};
/**
 * @element sp-help-text
 */
export declare class HelpText extends HelpText_base {
    static get styles(): CSSResultArray;
    icon: boolean;
    /**
     * The visual variant to apply to this help text.
     */
    variant: HelpTextVariants;
    protected render(): TemplateResult;
}
export {};

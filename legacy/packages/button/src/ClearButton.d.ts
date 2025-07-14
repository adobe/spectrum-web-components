import { CSSResultArray, TemplateResult } from '@spectrum-web-components/base';
import { StyledButton } from './StyledButton.js';
import '@spectrum-web-components/icons-ui/icons/sp-icon-cross75.js';
import '@spectrum-web-components/icons-ui/icons/sp-icon-cross100.js';
import '@spectrum-web-components/icons-ui/icons/sp-icon-cross200.js';
import '@spectrum-web-components/icons-ui/icons/sp-icon-cross300.js';
declare const ClearButton_base: typeof StyledButton & {
    new (...args: any[]): import("@spectrum-web-components/base").SizedElementInterface;
    prototype: import("@spectrum-web-components/base").SizedElementInterface;
};
/**
 * @element sp-clear-button
 *
 * @slot - text label of the Clear Button
 */
export declare class ClearButton extends ClearButton_base {
    static get styles(): CSSResultArray;
    /**
     * The visual variant to apply to this button.
     */
    variant: 'overBackground' | '';
    protected get buttonContent(): TemplateResult[];
    protected render(): TemplateResult;
}
export {};

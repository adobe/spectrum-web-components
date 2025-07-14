import { CSSResultArray, TemplateResult } from '@spectrum-web-components/base';
import { ButtonBase } from '@spectrum-web-components/button/src/ButtonBase.js';
declare const InfieldButton_base: typeof ButtonBase & {
    new (...args: any[]): import("@spectrum-web-components/base").SizedElementInterface;
    prototype: import("@spectrum-web-components/base").SizedElementInterface;
};
/**
 * @element sp-infield-button
 */
export declare class InfieldButton extends InfieldButton_base {
    static get styles(): CSSResultArray;
    /**
     * Whether to style the button as if it is at the start or end of a vertical stack
     * @type {'start' | 'end'}
     */
    block?: 'start' | 'end';
    /**
     * Whether to style the button as if it is at the start or end of a horizontal group
     * @type {'start' | 'end'}
     */
    inline?: 'start' | 'end';
    quiet: boolean;
    protected get buttonContent(): TemplateResult[];
}
export {};

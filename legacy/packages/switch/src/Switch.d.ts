import { CSSResultArray, PropertyValues, TemplateResult } from '@spectrum-web-components/base';
import { CheckboxBase } from '@spectrum-web-components/checkbox/src/CheckboxBase.js';
declare const Switch_base: typeof CheckboxBase & {
    new (...args: any[]): import("@spectrum-web-components/base").SizedElementInterface;
    prototype: import("@spectrum-web-components/base").SizedElementInterface;
};
/**
 * @element sp-switch
 *
 * @slot - text label of the Switch
 * @fires change - Announces a change in the `checked` property of a Switch
 */
export declare class Switch extends Switch_base {
    static get styles(): CSSResultArray;
    emphasized: boolean;
    protected render(): TemplateResult;
    protected firstUpdated(changes: PropertyValues): void;
    protected updated(changes: PropertyValues): void;
}
export {};

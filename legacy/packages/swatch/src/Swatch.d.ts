import { CSSResultArray, PropertyValues, TemplateResult } from '@spectrum-web-components/base';
import { Focusable } from '@spectrum-web-components/shared/src/focusable.js';
import '@spectrum-web-components/icons-ui/icons/sp-icon-dash75.js';
import '@spectrum-web-components/icons-ui/icons/sp-icon-dash100.js';
import '@spectrum-web-components/icons-ui/icons/sp-icon-dash200.js';
import '@spectrum-web-components/icons-ui/icons/sp-icon-dash300.js';
export type SwatchBorder = 'light' | 'none' | undefined;
export type SwatchRounding = 'none' | 'full' | undefined;
export type SwatchShape = 'rectangle' | undefined;
declare const Swatch_base: typeof Focusable & {
    new (...args: any[]): import("@spectrum-web-components/base").SizedElementInterface;
    prototype: import("@spectrum-web-components/base").SizedElementInterface;
};
/**
 * @element sp-swatch
 */
export declare class Swatch extends Swatch_base {
    static get styles(): CSSResultArray;
    border: SwatchBorder;
    color: string;
    label: string;
    mixedValue: boolean;
    nothing: boolean;
    role: string;
    rounding: SwatchRounding;
    selected: boolean;
    shape: SwatchShape;
    get value(): string;
    set value(value: string);
    private _value?;
    get focusElement(): HTMLElement;
    toggle(force?: boolean): void;
    private handleClick;
    protected handleKeydown(event: KeyboardEvent): void;
    private handleKeypress;
    protected handleKeyup(event: KeyboardEvent): void;
    protected renderDisabled: () => TemplateResult;
    protected renderMixedValue: () => TemplateResult;
    protected render(): TemplateResult;
    protected willUpdate(changes: PropertyValues): void;
    protected firstUpdated(changes: PropertyValues): void;
}
export {};

import { ReactiveElement, TemplateResult } from '@spectrum-web-components/base';
type Constructor<T = Record<string, unknown>> = {
    new (...args: any[]): T;
    prototype: T;
};
export interface HelpTextElementInterface {
    renderHelpText(negative?: boolean): TemplateResult;
    helpTextId: string;
}
export declare function ManageHelpText<T extends Constructor<ReactiveElement>>(constructor: T, { mode }?: {
    mode: 'internal' | 'external';
}): T & Constructor<HelpTextElementInterface>;
export {};

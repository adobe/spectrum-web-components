import { LitElement, ReactiveElement } from 'lit';
type Constructor<T = Record<string, unknown>> = {
    new (...args: any[]): T;
    prototype: T;
};
export interface SpectrumInterface {
    shadowRoot: ShadowRoot;
    isLTR: boolean;
    hasVisibleFocusInTree(): boolean;
    dir: 'ltr' | 'rtl';
}
export declare function SpectrumMixin<T extends Constructor<ReactiveElement>>(constructor: T): T & Constructor<SpectrumInterface>;
declare const SpectrumElement_base: typeof LitElement & Constructor<SpectrumInterface>;
export declare class SpectrumElement extends SpectrumElement_base {
    static VERSION: string;
}
export {};

import { ReactiveElement } from 'lit';
type Constructor<T = Record<string, unknown>> = {
    new (...args: any[]): T;
    prototype: T;
};
export type ElementSize = 'xxs' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl';
export declare const ElementSizes: Record<string, ElementSize>;
export type DefaultElementSize = Exclude<ElementSize, 'xxs' | 'xs' | 'xxl'>;
export interface SizedElementInterface {
    size: ElementSize;
}
export declare function SizedMixin<T extends Constructor<ReactiveElement>>(constructor: T, { validSizes, noDefaultSize, defaultSize, }?: {
    validSizes?: ElementSize[];
    noDefaultSize?: boolean;
    defaultSize?: ElementSize;
}): T & Constructor<SizedElementInterface>;
export {};

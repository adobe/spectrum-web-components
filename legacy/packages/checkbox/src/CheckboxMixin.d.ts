import { ReactiveElement } from '@spectrum-web-components/base';
type Constructor<T = Record<string, unknown>> = {
    new (...args: any[]): T;
    prototype: T;
};
export interface CheckboxElement {
    checked: boolean;
    handleChange(): void;
    inputElement: HTMLInputElement;
    name?: string;
    readonly?: boolean;
}
export declare function CheckboxMixin<T extends Constructor<ReactiveElement>>(constructor: T): T & Constructor<CheckboxElement>;
export {};

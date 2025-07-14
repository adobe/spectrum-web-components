import { Focusable } from '@spectrum-web-components/shared/src/focusable.js';
declare const CheckboxBase_base: typeof Focusable & {
    new (...args: any[]): import("./CheckboxMixin.js").CheckboxElement;
    prototype: import("./CheckboxMixin.js").CheckboxElement;
};
export declare class CheckboxBase extends CheckboxBase_base {
    get focusElement(): HTMLElement;
}
export {};

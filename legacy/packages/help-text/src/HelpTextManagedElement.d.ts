import { SpectrumElement } from '@spectrum-web-components/base';
declare const HelpTextManagedElement_base: typeof SpectrumElement & {
    new (...args: any[]): import("./manage-help-text.js").HelpTextElementInterface;
    prototype: import("./manage-help-text.js").HelpTextElementInterface;
};
/**
 * @slot help-text - default or non-negative help text to associate to your form element
 * @slot negative-help-text - negative help text to associate to your form element when `invalid`
 */
export declare class HelpTextManagedElement extends HelpTextManagedElement_base {
}
export {};

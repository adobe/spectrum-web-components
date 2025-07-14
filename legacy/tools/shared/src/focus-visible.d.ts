declare global {
    interface Window {
        applyFocusVisiblePolyfill?: (scope: Document | ShadowRoot) => void;
    }
}
type Constructor<T = Record<string, unknown>> = {
    new (...args: any[]): T;
    prototype: T;
};
interface OptionalLifecycleCallbacks {
    connectedCallback?(): void;
    disconnectedCallback?(): void;
    manageAutoFocus?(): void;
}
type MixableBaseClass = HTMLElement & OptionalLifecycleCallbacks;
/**
 * This mixin function is designed to be applied to a class that inherits
 * from HTMLElement. It makes it easy for a custom element to coordinate with
 * the :focus-visible polyfill.
 *
 * NOTE(cdata): The code here was adapted from an example proposed with the
 * introduction of ShadowDOM support in the :focus-visible polyfill.
 *
 * @see https://github.com/WICG/focus-visible/pull/196
 * @param {Function} SuperClass The base class implementation to decorate with
 * implementation that coordinates with the :focus-visible polyfill
 */
export declare const FocusVisiblePolyfillMixin: <T extends Constructor<MixableBaseClass>>(SuperClass: T) => T;
export {};

declare module 'focus-visible' {
    declare global {
        interface Window {
            applyFocusVisiblePolyfill?: (scope: Document | ShadowRoot) => void;
        }
    }
}

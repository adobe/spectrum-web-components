declare module '*.css' {
    const content: CSSResultArray;
    export default content;
}

declare module '@open-wc/polyfills-loader' {
    function loadPolyfills(): Promise<void>;
    export default loadPolyfills;
}

declare module 'element-closest' {
    function polyfill(window: Window): void;
    export default polyfill;
}

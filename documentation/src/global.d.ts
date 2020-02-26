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

declare module '@vaadin/router' {
    export interface RouterOptions {
        baseUrl: string | undefined;
    }

    export interface Route {
        path: string;
        component: string;
        action(): Promise<void>;
    }

    export class Router {
        constructor(outlet: Node, options: RouterOptions);
        static go(pathname: String): boolean;
        setRoutes(routes: Route | Route[]): void;
        urlForPath(path: string, params?: object): string;
    }
}

/*
Copyright 2020 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

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

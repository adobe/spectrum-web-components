/*
Copyright 2018 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import { Router, Route, RouterOptions } from '@vaadin/router';

const githubUrl = 'http://opensource.adobe.com/spectrum-web-components/';
const baseUrl =
    document.location.hostname === 'opensource.adobe.com'
        ? githubUrl
        : undefined;

class DocumentationRouter extends Router {
    public location:
        | undefined
        | {
              baseUrl: string;
              params: object;
              pathname: string;
              redirectFrom: string | undefined;
              route: Route | undefined;
              routes: Route[];
          };

    public constructor(outlet: Node, options: RouterOptions) {
        super(outlet, options);
    }

    public go(pathname: string): boolean {
        return Router.go(pathname);
    }

    public changeParams(params: object): boolean {
        if (!this.location || !this.location.route) return false;
        const newUrl = this.urlForPath(this.location.route.path, params);
        return this.go(newUrl);
    }
}

export const AppRouter = new DocumentationRouter(document.body, {
    baseUrl: baseUrl,
});
AppRouter.setRoutes([
    { path: '/', component: 'docs-home' },
    { path: '/components/:component/:tab?', component: 'docs-component' },
    { path: '/guides/:guide', component: 'docs-guide' },
]);

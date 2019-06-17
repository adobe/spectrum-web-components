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

const { Router } = require('@vaadin/router');

const githubUrl =
    'https://git.corp.adobe.com/pages/ponysaurus/react-spectrum-web-components/';
const baseUrl =
    document.location.hostname === 'git.corp.adobe.com' ? githubUrl : undefined;

const router = new Router(document.body, { baseUrl: baseUrl });
router.setRoutes([
    { path: '/', component: 'docs-home' },
    { path: '/components/:component', component: 'docs-component' },
    { path: '/guides/:guide', component: 'docs-guide' },
]);

export default router;

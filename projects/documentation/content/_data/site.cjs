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
let url = '/';

switch (process.env.CONTEXT) {
    case 'production':
        url = process.env.URL;
        break;
    case 'deploy-preview':
        url = process.env.DEPLOY_URL;
        break;
    case 'branch-deploy':
        url = process.env.DEPLOY_PRIME_URL;
        break;
    default:
        break;
}

module.exports = {
    name: 'Spectrum Web Components',
    shortDesc:
        'Spectrum Web Components provide interface components as custom elements to help teams work more efficiently and to make applications more consistent.',
    url,
};

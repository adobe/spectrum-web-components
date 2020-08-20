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
import { html, TemplateResult } from '@spectrum-web-components/base';

import '../sp-status-light.js';

export default {
    component: 'sp-status-light',
    title: 'StatusLight',
};

export const allVariants = (): TemplateResult => html`
    <sp-status-light variant="positive">positive</sp-status-light>
    <sp-status-light variant="negative">negative</sp-status-light>
    <sp-status-light variant="notice">notice</sp-status-light>
    <sp-status-light variant="info">info</sp-status-light>
    <sp-status-light variant="neutral">neutral</sp-status-light>
    <sp-status-light variant="yellow">yellow</sp-status-light>
    <sp-status-light variant="fuchsia">fuchsia</sp-status-light>
    <sp-status-light variant="indigo">indigo</sp-status-light>
    <sp-status-light variant="seafoam">seafoam</sp-status-light>
    <sp-status-light variant="chartreuse">chartreuse</sp-status-light>
    <sp-status-light variant="magenta">magenta</sp-status-light>
    <sp-status-light variant="celery">celery</sp-status-light>
    <sp-status-light variant="purple">purple</sp-status-light>
`;

export const disabledTrue = (): TemplateResult => html`
    <sp-status-light variant="positive" disabled>
        positive
    </sp-status-light>
`;

disabledTrue.story = {
    name: 'disabled: true',
};

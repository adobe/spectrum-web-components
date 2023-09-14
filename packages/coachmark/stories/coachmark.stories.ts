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

import '@spectrum-web-components/coachmark/sp-coachmark.js';
import '@spectrum-web-components/asset/sp-asset.js';
import '@spectrum-web-components/quick-actions/sp-quick-actions.js';
import '@spectrum-web-components/button/sp-button.js';
import '@spectrum-web-components/popover/sp-popover.js';

export default {
    title: 'Coachmark',
    component: 'sp-coachmark',
};

export const Default = (): TemplateResult => {
    return html`
        <sp-popover open style="position: relative">
            <sp-coachmark heading="Card Heading">
                Switch to the zoom tool then click and drag in the canvas to
                move your camera forward and backward.
                <sp-action-menu slot="actions" placement="bottom-end" quiet>
                    <sp-menu-item>Skip tour</sp-menu-item>
                    <sp-menu-item>Restart tour</sp-menu-item>
                </sp-action-menu>
                <sp-button
                    slot="button-previous"
                    variant="secondary"
                    treatment="outline"
                >
                    Previous
                </sp-button>
                <sp-button
                    slot="button-next"
                    variant="primary"
                    treatment="outline"
                >
                    Next
                </sp-button>
            </sp-coachmark>
        </sp-popover>
    `;
};

export const withMedia = (): TemplateResult => {
    return html`
        <sp-popover open style="position: relative">
            <sp-coachmark heading="Card Heading">
                Switch to the zoom tool then click and drag in the canvas to
                move your camera forward and backward.
                <img
                    slot="cover-photo"
                    src="https://picsum.photos/200/300"
                    alt="Demo"
                />
                <sp-action-menu slot="actions" placement="bottom-end" quiet>
                    <sp-menu-item>Skip tour</sp-menu-item>
                    <sp-menu-item>Restart tour</sp-menu-item>
                </sp-action-menu>
                <sp-button
                    slot="button-previous"
                    variant="secondary"
                    treatment="outline"
                >
                    Previous
                </sp-button>
                <sp-button
                    slot="button-next"
                    variant="primary"
                    treatment="outline"
                >
                    Next
                </sp-button>
            </sp-coachmark>
        </sp-popover>
    `;
};

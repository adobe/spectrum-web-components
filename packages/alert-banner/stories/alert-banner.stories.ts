/*
Copyright 2024 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
import { html, TemplateResult } from '@spectrum-web-components/base';

import '@spectrum-web-components/alert-banner/sp-alert-banner.js';
import '@spectrum-web-components/button/sp-button.js';

export default {
    title: 'Alert Banner',
    component: 'sp-alert-banner',
};

export const Default = (): TemplateResult => {
    return html`
        <sp-alert-banner open>Text content in alert</sp-alert-banner>
        <div style="background:lightblue;height: 600px;"></div>
        <div style="display:flex;flex-direction:column;gap:24px;">
            <sp-alert-banner variant="neutral" open>
                Text content in alert
            </sp-alert-banner>
            <sp-alert-banner variant="info" open>
                Text content in alert
            </sp-alert-banner>
            <sp-alert-banner variant="info">
                <sp-button static="white" treatment="outline" slot="action">
                    Do something
                </sp-button>
                Text content in alert
            </sp-alert-banner>
            <sp-alert-banner variant="negative" open>
                Text content in alert
            </sp-alert-banner>
            <sp-alert-banner variant="negative" open>
                Connection interupted. Check your network to continue.Adding
                this as to see reallllllllly looooooooong text coming up and
                this message wrapping on the next line.
                <sp-button static="white" treatment="outline" slot="action">
                    Try Again
                </sp-button>
            </sp-alert-banner>
        </div>
    `;
};

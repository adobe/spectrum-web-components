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

import '../sp-illustrated-message.js';
import { illustration } from '../../dropzone/test/test-svg.js';

export default {
    component: 'sp-illustrated-message',
    title: 'IllustratedMessage',
};

export const Default = (): TemplateResult => {
    return html`
        <sp-illustrated-message
            heading="Drag and Drop Your File"
            description="This message has italics"
        >
            ${illustration}
        </sp-illustrated-message>
    `;
};

export const CTA = (): TemplateResult => {
    return html`
        <sp-illustrated-message
            heading="Drag and Drop Your File"
            description="This message has no italics"
            cta
        >
            ${illustration}
        </sp-illustrated-message>
    `;
};

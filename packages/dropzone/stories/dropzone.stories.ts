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

import '../sp-dropzone.js';
import { illustration } from '../test/test-svg';
import '@spectrum-web-components/illustrated-message/sp-illustrated-message.js';
import '@spectrum-web-components/link/sp-link.js';

export default {
    component: 'sp-dropzone',
    title: 'Dropzone',
};

export const Default = (): TemplateResult => {
    return html`
        <sp-dropzone id="dropzone">
            <sp-illustrated-message heading="Drag and Drop Your File">
                ${illustration}
            </sp-illustrated-message>

            <div style="color: grey">
                <div>
                    <label for="file-input">
                        <sp-link>Select a File</sp-link>
                        from your computer
                    </label>
                    <input type="file" id="file-input" style="display: none" />
                </div>
                <div>
                    or
                    <sp-link href="http://stock.adobe.com" target="blank">
                        Search Adobe Stock
                    </sp-link>
                </div>
            </div>
        </sp-dropzone>
    `;
};

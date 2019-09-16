/*
Copyright 2019 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
import { storiesOf } from '@storybook/polymer';
import { html } from 'lit-html';

import '../';

storiesOf('Dropzone', module).add('Default', () => {
    return html`
        <div style="width: 600px; height: 250px">
            <sp-dropzone id="dropzone" tabindex="0">
                <sp-illustrated-message heading="Drag and Drop Your File">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="150"
                        height="103"
                        viewBox="0 0 150 103"
                    >
                        <use
                            xlink:href="error_message_geometry.svg#error-notice"
                        />
                    </svg>
                </sp-illustrated-message>

                <div style="color: grey">
                    <div>
                        <label for="file-input">
                            <sp-link>Select a File</sp-link>
                            from your computer
                        </label>
                        <input
                            type="file"
                            id="file-input"
                            style="display: none"
                        />
                    </div>
                    <div>
                        or
                        <sp-link href="http://stock.adobe.com" target="blank">
                            Search Adobe Stock
                        </sp-link>
                    </div>
                </div>
            </sp-dropzone>
        </div>
    `;
});

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
import { html } from '@open-wc/demoing-storybook';

import '../sp-textfield.js';
import { TemplateResult } from 'lit-html';

export default {
    component: 'sp-textfield',
    title: 'Textarea',
};

export const Default = (): TemplateResult => {
    return html`
        <sp-textfield
            multiline
            label="Enter your life story"
            placeholder="Enter your life story"
        ></sp-textfield>
        <sp-textfield
            multiline
            label="Enter your life story"
            disabled
            placeholder="Enter your life story"
        ></sp-textfield>
        <sp-textfield
            multiline
            label="Enter your life story"
            pattern="[\\w\\s]+"
            required
            valid
            value="A valid input"
            placeholder="Enter your life story"
        ></sp-textfield>
        <sp-textfield
            multiline
            label="Enter your life story"
            required
            valid
            value="A valid input"
            disabled
            placeholder="Enter your life story"
        ></sp-textfield>
        <sp-textfield
            multiline
            label="Enter your life story"
            pattern="[\\d]+"
            required
            value="Not a valid input"
            placeholder="Enter your life story"
        ></sp-textfield>
        <sp-textfield
            multiline
            label="Enter your life story"
            pattern="[\\d]+"
            invalid
            required
            value="Not a valid input"
            disabled
            placeholder="Enter your life story"
        ></sp-textfield>
    `;
};

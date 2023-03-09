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
import '@spectrum-web-components/coachmark/sp-coachmark-popover.js';
import '@spectrum-web-components/coachmark/sp-coachmark-popover-content.js';
import { image } from './images';

export default {
    title: 'Coachmark/Popover',
    component: 'sp-coachmark-popover',
};

export const WithPopover = (): TemplateResult => {
    return html`
        <sp-coachmark-popover open>
            <sp-button>Hello world</sp-button>
            <sp-coachmark-popover-content
                slot="coachmark"
                primary-cta="Got it!"
                secondary-cta="Skip"
                heading="Learn about the world"
                content="The world has some explaining to do!"
            ></sp-coachmark-popover-content>
        </sp-coachmark-popover>
    `;
};

export const WithPopoverImage = (): TemplateResult => {
    return html`
        <sp-coachmark-popover open>
            <sp-button>Hello world</sp-button>
            <sp-coachmark-popover-content
                slot="coachmark"
                source=${image}
                step="1 of 3"
                primary-cta="Got it!"
                secondary-cta="Skip"
                heading="Learn about the world"
                content="The world has some explaining to do!"
            ></sp-coachmark-popover-content>
        </sp-coachmark-popover>
    `;
};

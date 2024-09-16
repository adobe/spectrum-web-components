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

import { tag as html, TemplateResult } from '../custom-tag.js';

export { setCustomTemplateLiteralTag } from '../custom-tag.js';
export const AlignBottomIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Align Bottom',
} = {}): string | TemplateResult => {
    return html`
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width=${width}
            height=${height}
            viewBox="0 0 20.00001 20.00001"
            aria-hidden=${hidden ? 'true' : 'false'}
            role="img"
            fill="currentColor"
            aria-label=${title}
        >
            <path
                d="m14.75001,15h-1.5c-1.24072,0-2.25-1.00977-2.25-2.25v-3.5c0-1.24023,1.00928-2.25,2.25-2.25h1.5c1.24072,0,2.25,1.00977,2.25,2.25v3.5c0,1.24023-1.00928,2.25-2.25,2.25Zm-1.5-6.5c-.41357,0-.75.33691-.75.75v3.5c0,.41309.33643.75.75.75h1.5c.41357,0,.75-.33691.75-.75v-3.5c0-.41309-.33643-.75-.75-.75h-1.5Z"
                fill="currentColor"
            />
            <path
                d="m6.75001,15h-1.5c-1.24072,0-2.25-1.00977-2.25-2.25v-7.5c0-1.24023,1.00928-2.25,2.25-2.25h1.5c1.24072,0,2.25,1.00977,2.25,2.25v7.5c0,1.24023-1.00928,2.25-2.25,2.25Zm-1.5-10.5c-.41357,0-.75.33691-.75.75v7.5c0,.41309.33643.75.75.75h1.5c.41357,0,.75-.33691.75-.75v-7.5c0-.41309-.33643-.75-.75-.75h-1.5Z"
                fill="currentColor"
            />
            <path
                d="m18.25001,18H1.75001c-.41406,0-.75-.33594-.75-.75s.33594-.75.75-.75h16.5c.41406,0,.75.33594.75.75s-.33594.75-.75.75Z"
                fill="currentColor"
            />
        </svg>
    `;
};

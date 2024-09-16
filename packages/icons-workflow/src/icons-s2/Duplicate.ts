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
export const DuplicateIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Duplicate',
} = {}): string | TemplateResult => {
    return html`
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width=${width}
            height=${height}
            viewBox="0 0 20 20"
            aria-hidden=${hidden ? 'true' : 'false'}
            role="img"
            fill="currentColor"
            aria-label=${title}
        >
            <path
                d="m13.75,2.75c0-.41406-.33594-.75-.75-.75H4.25c-1.24072,0-2.25,1.00928-2.25,2.25v8.75c0,.41406.33594.75.75.75s.75-.33594.75-.75V4.25c0-.41357.33643-.75.75-.75h8.75c.41406,0,.75-.33594.75-.75Z"
                fill="currentColor"
            />
            <path
                d="m14.75,11.5c0,.41406-.33594.75-.75.75h-1.75v1.75c0,.41406-.33594.75-.75.75s-.75-.33594-.75-.75v-1.75h-1.75c-.41406,0-.75-.33594-.75-.75s.33594-.75.75-.75h1.75v-1.75c0-.41406.33594-.75.75-.75s.75.33594.75.75v1.75h1.75c.41406,0,.75.33594.75.75Z"
                fill="currentColor"
            />
            <path
                d="m15.75,5H7.25c-1.24072,0-2.25,1.00928-2.25,2.25v8.5c0,1.24072,1.00928,2.25,2.25,2.25h8.5c1.24072,0,2.25-1.00928,2.25-2.25V7.25c0-1.24072-1.00928-2.25-2.25-2.25Zm.75,10.75c0,.41357-.33643.75-.75.75H7.25c-.41357,0-.75-.33643-.75-.75V7.25c0-.41357.33643-.75.75-.75h8.5c.41357,0,.75.33643.75.75v8.5Z"
                fill="currentColor"
            />
        </svg>
    `;
};

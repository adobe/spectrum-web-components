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
export const BriefcaseIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Briefcase',
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
                d="m14.97266,5.05371h-1.5v-1.73926c0-.41895-.39551-.81445-.81445-.81445h-5.4707c-.39844,0-.6875.31543-.6875.75v1.74023h-1.5v-1.74023c0-1.26172.96094-2.25,2.1875-2.25h5.4707c1.2334,0,2.31445,1.08105,2.31445,2.31445v1.73926Z"
                fill="currentColor"
            />
            <path
                d="m16.75,17H3.25c-1.24023,0-2.25-1.00977-2.25-2.25V6.25c0-1.24023,1.00977-2.25,2.25-2.25h13.5c1.24023,0,2.25,1.00977,2.25,2.25v8.5c0,1.24023-1.00977,2.25-2.25,2.25ZM3.25,5.5c-.41309,0-.75.33691-.75.75v8.5c0,.41309.33691.75.75.75h13.5c.41309,0,.75-.33691.75-.75V6.25c0-.41309-.33691-.75-.75-.75H3.25Z"
                fill="currentColor"
            />
            <rect x="2" y="9.25" width="16" height="1.5" fill="currentColor" />
            <path
                d="m5.75,12.25c-.41406,0-.75-.33594-.75-.75v-2.5c0-.41406.33594-.75.75-.75s.75.33594.75.75v2.5c0,.41406-.33594.75-.75.75Z"
                fill="currentColor"
            />
            <path
                d="m14.25,12.25c-.41406,0-.75-.33594-.75-.75v-2.5c0-.41406.33594-.75.75-.75s.75.33594.75.75v2.5c0,.41406-.33594.75-.75.75Z"
                fill="currentColor"
            />
        </svg>
    `;
};

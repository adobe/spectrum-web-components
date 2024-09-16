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
export const BuildingsIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Buildings',
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
                d="m16.75,17h-1.75c-.41406,0-.75-.33594-.75-.75s.33594-.75.75-.75h1.75c.41406,0,.75049-.33691.75049-.75v-6.5c0-.41309-.33643-.75-.75049-.75h-1.75c-.41406,0-.75-.33594-.75-.75s.33594-.75.75-.75h1.75c1.24072,0,2.25049,1.00977,2.25049,2.25v6.5c0,1.24023-1.00977,2.25-2.25049,2.25Z"
                fill="currentColor"
            />
            <circle cx="9" cy="7" r="1" fill="currentColor" />
            <circle cx="5" cy="10.00019" r="1" fill="currentColor" />
            <circle cx="5" cy="7" r="1" fill="currentColor" />
            <path
                d="m10.75,3H3.25c-1.24072,0-2.25,1.00977-2.25,2.25v9.5c0,1.24023,1.00928,2.25,2.25,2.25h7.5c1.24072,0,2.25-1.00977,2.25-2.25V5.25c0-1.24023-1.00928-2.25-2.25-2.25Zm-2.50146,12.5h-2.49854v-1c0-.41309.33643-.75.75-.75h.99854c.41357,0,.75.33691.75.75v1Zm3.25146-.75c0,.41309-.33643.75-.75.75h-1.00146v-1c0-1.24023-1.00928-2.25-2.25-2.25h-.99854c-1.24072,0-2.25,1.00977-2.25,2.25v1h-1c-.41357,0-.75-.33691-.75-.75V5.25c0-.41309.33643-.75.75-.75h7.5c.41357,0,.75.33691.75.75v9.5Z"
                fill="currentColor"
            />
            <circle cx="9" cy="10.00019" r="1" fill="currentColor" />
            <circle cx="15" cy="10.00019" r="1" fill="currentColor" />
            <circle cx="15" cy="13" r="1" fill="currentColor" />
        </svg>
    `;
};

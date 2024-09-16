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
export const DistributeHorizontalCenterIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Distribute Horizontal Center',
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
                d="m14.75,6V1.75c0-.41406-.33594-.75-.75-.75s-.75.33594-.75.75v4.25c-1.24023,0-2.25,1.00977-2.25,2.25v3.5c0,1.24023,1.00977,2.25,2.25,2.25v4.25c0,.41406.33594.75.75.75s.75-.33594.75-.75v-4.25c1.24023,0,2.25-1.00977,2.25-2.25v-3.5c0-1.24023-1.00977-2.25-2.25-2.25Zm.75,5.75c0,.41309-.33691.75-.75.75h-1.5c-.41309,0-.75-.33691-.75-.75v-3.5c0-.41309.33691-.75.75-.75h1.5c.41309,0,.75.33691.75.75v3.5Z"
                fill="currentColor"
            />
            <path
                d="m6.75,4V1.75c0-.41406-.33594-.75-.75-.75s-.75.33594-.75.75v2.25c-1.24023,0-2.25,1.00977-2.25,2.25v7.5c0,1.24023,1.00977,2.25,2.25,2.25v2.25c0,.41406.33594.75.75.75s.75-.33594.75-.75v-2.25c1.24023,0,2.25-1.00977,2.25-2.25v-7.5c0-1.24023-1.00977-2.25-2.25-2.25Zm.75,9.75c0,.41309-.33691.75-.75.75h-1.5c-.41309,0-.75-.33691-.75-.75v-7.5c0-.41309.33691-.75.75-.75h1.5c.41309,0,.75.33691.75.75v7.5Z"
                fill="currentColor"
            />
        </svg>
    `;
};

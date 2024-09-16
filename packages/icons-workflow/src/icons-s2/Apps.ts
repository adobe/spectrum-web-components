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
export const AppsIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Apps',
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
                d="m5.75,18.00293h-1.5c-1.24023,0-2.25-1.00977-2.25-2.25v-1.5c0-1.24023,1.00977-2.25,2.25-2.25h1.5c1.24023,0,2.25,1.00977,2.25,2.25v1.5c0,1.24023-1.00977,2.25-2.25,2.25Zm-1.5-4.5c-.41309,0-.75.33691-.75.75v1.5c0,.41309.33691.75.75.75h1.5c.41309,0,.75-.33691.75-.75v-1.5c0-.41309-.33691-.75-.75-.75h-1.5Z"
                fill="currentColor"
            />
            <path
                d="m5.75,11.00293h-1.5c-1.24023,0-2.25-1.00977-2.25-2.25v-1.5c0-1.24023,1.00977-2.25,2.25-2.25h1.5c1.24023,0,2.25,1.00977,2.25,2.25v1.5c0,1.24023-1.00977,2.25-2.25,2.25Zm-1.5-4.5c-.41309,0-.75.33691-.75.75v1.5c0,.41309.33691.75.75.75h1.5c.41309,0,.75-.33691.75-.75v-1.5c0-.41309-.33691-.75-.75-.75h-1.5Z"
                fill="currentColor"
            />
            <path
                d="m12.75,18.00293h-1.5c-1.24023,0-2.25-1.00977-2.25-2.25v-1.5c0-1.24023,1.00977-2.25,2.25-2.25h1.5c1.24023,0,2.25,1.00977,2.25,2.25v1.5c0,1.24023-1.00977,2.25-2.25,2.25Zm-1.5-4.5c-.41309,0-.75.33691-.75.75v1.5c0,.41309.33691.75.75.75h1.5c.41309,0,.75-.33691.75-.75v-1.5c0-.41309-.33691-.75-.75-.75h-1.5Z"
                fill="currentColor"
            />
            <path
                d="m15.25098,11.00293h-3.5c-1.5166,0-2.75-1.2334-2.75-2.75v-3.5c0-1.5166,1.2334-2.75,2.75-2.75h3.5c1.5166,0,2.75,1.2334,2.75,2.75v3.5c0,1.5166-1.2334,2.75-2.75,2.75Zm-3.5-7.5c-.68945,0-1.25.56055-1.25,1.25v3.5c0,.68945.56055,1.25,1.25,1.25h3.5c.68945,0,1.25-.56055,1.25-1.25v-3.5c0-.68945-.56055-1.25-1.25-1.25h-3.5Z"
                fill="currentColor"
            />
        </svg>
    `;
};

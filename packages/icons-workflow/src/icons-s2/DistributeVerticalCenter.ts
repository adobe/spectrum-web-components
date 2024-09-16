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
export const DistributeVerticalCenterIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Distribute Vertical Center',
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
                d="m18.25,5.25h-4.25c0-1.24023-1.00977-2.25-2.25-2.25h-3.5c-1.24023,0-2.25,1.00977-2.25,2.25H1.75c-.41406,0-.75.33594-.75.75s.33594.75.75.75h4.25c0,1.24023,1.00977,2.25,2.25,2.25h3.5c1.24023,0,2.25-1.00977,2.25-2.25h4.25c.41406,0,.75-.33594.75-.75s-.33594-.75-.75-.75Zm-5.75,1.5c0,.41309-.33691.75-.75.75h-3.5c-.41309,0-.75-.33691-.75-.75v-1.5c0-.41309.33691-.75.75-.75h3.5c.41309,0,.75.33691.75.75v1.5Z"
                fill="currentColor"
            />
            <path
                d="m18.25,13.25h-2.25c0-1.24023-1.00977-2.25-2.25-2.25h-7.5c-1.24023,0-2.25,1.00977-2.25,2.25H1.75c-.41406,0-.75.33594-.75.75s.33594.75.75.75h2.25c0,1.24023,1.00977,2.25,2.25,2.25h7.5c1.24023,0,2.25-1.00977,2.25-2.25h2.25c.41406,0,.75-.33594.75-.75s-.33594-.75-.75-.75Zm-3.75,1.5c0,.41309-.33691.75-.75.75h-7.5c-.41309,0-.75-.33691-.75-.75v-1.5c0-.41309.33691-.75.75-.75h7.5c.41309,0,.75.33691.75.75v1.5Z"
                fill="currentColor"
            />
        </svg>
    `;
};

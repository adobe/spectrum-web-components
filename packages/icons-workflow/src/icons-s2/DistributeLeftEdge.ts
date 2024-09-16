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
export const DistributeLeftEdgeIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Distribute Left Edge',
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
                d="m5.75,4h-1.5c-.26416,0-.51416.0542-.75.13818V1.75c0-.41406-.33594-.75-.75-.75s-.75.33594-.75.75v16.5c0,.41406.33594.75.75.75s.75-.33594.75-.75v-2.38843c.23584.08423.48584.13843.75.13843h1.5c1.24023,0,2.25-1.00977,2.25-2.25v-7.5c0-1.24023-1.00977-2.25-2.25-2.25Zm.75,9.75c0,.41309-.33691.75-.75.75h-1.5c-.41309,0-.75-.33691-.75-.75v-7.5c0-.41309.33691-.75.75-.75h1.5c.41309,0,.75.33691.75.75v7.5Z"
                fill="currentColor"
            />
            <path
                d="m14.75,6h-1.5c-.26416,0-.51416.0542-.75.13818V1.75c0-.41406-.33594-.75-.75-.75s-.75.33594-.75.75v16.5c0,.41406.33594.75.75.75s.75-.33594.75-.75v-4.38843c.23584.08423.48584.13843.75.13843h1.5c1.24023,0,2.25-1.00977,2.25-2.25v-3.5c0-1.24023-1.00977-2.25-2.25-2.25Zm.75,5.75c0,.41309-.33691.75-.75.75h-1.5c-.41309,0-.75-.33691-.75-.75v-3.5c0-.41309.33691-.75.75-.75h1.5c.41309,0,.75.33691.75.75v3.5Z"
                fill="currentColor"
            />
        </svg>
    `;
};

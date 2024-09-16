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
export const AlignCenterIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Align Center',
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
                d="m13.75,11h-3v-2h1c1.24072,0,2.25-1.00977,2.25-2.25v-1.5c0-1.24023-1.00928-2.25-2.25-2.25h-1v-1.25c0-.41406-.33594-.75-.75-.75s-.75.33594-.75.75v1.25h-1c-1.24072,0-2.25,1.00977-2.25,2.25v1.5c0,1.24023,1.00928,2.25,2.25,2.25h1v2h-3c-1.24072,0-2.25,1.00977-2.25,2.25v1.5c0,1.24023,1.00928,2.25,2.25,2.25h3v1.25c0,.41406.33594.75.75.75s.75-.33594.75-.75v-1.25h3c1.24072,0,2.25-1.00977,2.25-2.25v-1.5c0-1.24023-1.00928-2.25-2.25-2.25Zm-6.25-4.25v-1.5c0-.41309.33643-.75.75-.75h3.5c.41357,0,.75.33691.75.75v1.5c0,.41309-.33643.75-.75.75h-3.5c-.41357,0-.75-.33691-.75-.75Zm7,8c0,.41309-.33643.75-.75.75h-7.5c-.41357,0-.75-.33691-.75-.75v-1.5c0-.41309.33643-.75.75-.75h7.5c.41357,0,.75.33691.75.75v1.5Z"
                fill="currentColor"
            />
        </svg>
    `;
};

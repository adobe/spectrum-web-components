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
export const AlignMiddleIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Align Middle',
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
                d="m18.25,9.25h-1.25v-1c0-1.24023-1.00928-2.25-2.25-2.25h-1.5c-1.24072,0-2.25,1.00977-2.25,2.25v1h-2v-3c0-1.24023-1.00928-2.25-2.25-2.25h-1.5c-1.24072,0-2.25,1.00977-2.25,2.25v3h-1.25c-.41406,0-.75.33594-.75.75s.33594.75.75.75h1.25v3c0,1.24023,1.00928,2.25,2.25,2.25h1.5c1.24072,0,2.25-1.00977,2.25-2.25v-3h2v1c0,1.24023,1.00928,2.25,2.25,2.25h1.5c1.24072,0,2.25-1.00977,2.25-2.25v-1h1.25c.41406,0,.75-.33594.75-.75s-.33594-.75-.75-.75Zm-10.75,4.5c0,.41309-.33643.75-.75.75h-1.5c-.41357,0-.75-.33691-.75-.75v-7.5c0-.41309.33643-.75.75-.75h1.5c.41357,0,.75.33691.75.75v7.5Zm8-2c0,.41309-.33643.75-.75.75h-1.5c-.41357,0-.75-.33691-.75-.75v-3.5c0-.41309.33643-.75.75-.75h1.5c.41357,0,.75.33691.75.75v3.5Z"
                fill="currentColor"
            />
        </svg>
    `;
};

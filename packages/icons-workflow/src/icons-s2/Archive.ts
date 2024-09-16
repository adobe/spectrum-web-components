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
export const ArchiveIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Archive',
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
                d="m16.75,3H3.25c-1.24072,0-2.25,1.00977-2.25,2.25v1c0,.77808.39764,1.46484,1,1.86914v6.63086c0,1.24023,1.00928,2.25,2.25,2.25h11.5c1.24072,0,2.25-1.00977,2.25-2.25v-6.63086c.60236-.4043,1-1.09106,1-1.86914v-1c0-1.24023-1.00928-2.25-2.25-2.25ZM2.5,5.25c0-.41309.33643-.75.75-.75h13.5c.41357,0,.75.33691.75.75v1c0,.41309-.33643.75-.75.75H3.25c-.41357,0-.75-.33691-.75-.75v-1Zm13.25,10.25H4.25c-.41357,0-.75-.33691-.75-.75v-6.25h13v6.25c0,.41309-.33643.75-.75.75Z"
                fill="currentColor"
            />
            <path
                d="m12.25,12h-4.5c-.41406,0-.75-.33594-.75-.75s.33594-.75.75-.75h4.5c.41406,0,.75.33594.75.75s-.33594.75-.75.75Z"
                fill="currentColor"
            />
        </svg>
    `;
};

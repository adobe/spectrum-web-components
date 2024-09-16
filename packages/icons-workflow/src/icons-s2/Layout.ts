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
export const LayoutIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Layout',
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
                d="m15.75,2H4.25c-1.24023,0-2.25,1.00977-2.25,2.25v11.5c0,1.24023,1.00977,2.25,2.25,2.25h11.5c1.24023,0,2.25-1.00977,2.25-2.25V4.25c0-1.24023-1.00977-2.25-2.25-2.25ZM3.5,4.25c0-.41309.33691-.75.75-.75h11.5c.41309,0,.75.33691.75.75v3.75H3.5v-3.75Zm0,11.5v-6.25h4.5v7h-3.75c-.41309,0-.75-.33691-.75-.75Zm12.25.75h-6.25v-7h7v6.25c0,.41309-.33691.75-.75.75Z"
                fill="currentColor"
            />
        </svg>
    `;
};

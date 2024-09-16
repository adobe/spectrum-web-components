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
export const DistributeSpaceVerticallyIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Distribute Space Vertically',
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
                d="m14.99996,9.25v1.5c0,1.24023-1.00977,2.25-2.25,2.25h-5.5c-1.24023,0-2.25-1.00977-2.25-2.25v-1.5c0-1.24023,1.00977-2.25,2.25-2.25h5.5c1.24023,0,2.25,1.00977,2.25,2.25Zm-8.5,1.5c0,.41309.33691.75.75.75h5.5c.41309,0,.75-.33691.75-.75v-1.5c0-.41309-.33691-.75-.75-.75h-5.5c-.41309,0-.75.33691-.75.75v1.5Z"
                fill="currentColor"
            />
            <path
                d="m17.99996,3.75c0,.41406-.33594.75-.75.75H2.74996c-.41406,0-.75-.33594-.75-.75,0-.41406.33594-.75.75-.75h14.5c.41406,0,.75.33594.75.75Z"
                fill="currentColor"
            />
            <path
                d="m17.99996,16.25c0,.41406-.33594.75-.75.75H2.74996c-.41406,0-.75-.33594-.75-.75s.33594-.75.75-.75h14.5c.41406,0,.75.33594.75.75Z"
                fill="currentColor"
            />
        </svg>
    `;
};

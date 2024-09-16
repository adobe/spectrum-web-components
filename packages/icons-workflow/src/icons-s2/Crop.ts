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
export const CropIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Crop',
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
                d="m15.25,13.19141c-.41406,0-.75-.33594-.75-.75v-6.19141c0-.41309-.33691-.75-.75-.75h-6.2373c-.41406,0-.75-.33594-.75-.75s.33594-.75.75-.75h6.2373c1.24023,0,2.25,1.00977,2.25,2.25v6.19141c0,.41406-.33594.75-.75.75Z"
                fill="currentColor"
            />
            <path
                d="m18.60156,14.5H6.25c-.41309,0-.75-.33691-.75-.75V1.39844c0-.41406-.33594-.75-.75-.75s-.75.33594-.75.75v2.60156H1.39844c-.41406,0-.75.33594-.75.75s.33594.75.75.75h2.60156v8.25c0,1.24023,1.00977,2.25,2.25,2.25h8.25v2.62305c0,.41406.33594.75.75.75s.75-.33594.75-.75v-2.62305h2.60156c.41406,0,.75-.33594.75-.75s-.33594-.75-.75-.75Z"
                fill="currentColor"
            />
        </svg>
    `;
};

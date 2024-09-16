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
export const ResizeIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Resize',
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
                d="m15.75,18H4.25c-1.24023,0-2.25-1.00977-2.25-2.25V4.25c0-1.24023,1.00977-2.25,2.25-2.25h6.75c.41406,0,.75.33594.75.75s-.33594.75-.75.75h-6.75c-.41309,0-.75.33691-.75.75v11.5c0,.41309.33691.75.75.75h11.5c.41309,0,.75-.33691.75-.75v-6.75c0-.41406.33594-.75.75-.75s.75.33594.75.75v6.75c0,1.24023-1.00977,2.25-2.25,2.25Z"
                fill="currentColor"
            />
            <path
                d="m17.25,2h-3.25c-.41406,0-.75.33594-.75.75s.33594.75.75.75h1.43945l-4.46973,4.46973c-.29297.29297-.29297.76758,0,1.06055.14648.14648.33789.21973.53027.21973s.38379-.07324.53027-.21973l4.46973-4.46973v1.43945c0,.41406.33594.75.75.75s.75-.33594.75-.75v-3.25c0-.41406-.33594-.75-.75-.75Z"
                fill="currentColor"
            />
            <circle cx="12.25" cy="15.25" r=".75" fill="currentColor" />
            <circle cx="12.25" cy="13" r=".75" fill="currentColor" />
            <circle cx="12.25" cy="10.75" r=".75" fill="currentColor" />
            <circle cx="4.75" cy="7.75" r=".75" fill="currentColor" />
            <circle cx="7" cy="7.75" r=".75" fill="currentColor" />
            <circle cx="9.25" cy="7.75" r=".75" fill="currentColor" />
        </svg>
    `;
};

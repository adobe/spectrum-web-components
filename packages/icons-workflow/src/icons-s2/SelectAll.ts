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
export const SelectAllIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Select All',
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
                d="M10.5,5.52148h-1.25c-.41406,0-.75-.33594-.75-.75s.33594-.75.75-.75h1.25c.41406,0,.75.33594.75.75s-.33594.75-.75.75Z"
                fill="currentColor"
            />
            <path
                d="M10.5,16.02148h-1.25c-.41406,0-.75-.33594-.75-.75s.33594-.75.75-.75h1.25c.41406,0,.75.33594.75.75s-.33594.75-.75.75Z"
                fill="currentColor"
            />
            <path
                d="M15.25,7.02148c-.41406,0-.75-.33594-.75-.75,0-.41309-.33691-.75-.75-.75-.41406,0-.75-.33594-.75-.75s.33594-.75.75-.75c1.24023,0,2.25,1.00977,2.25,2.25,0,.41406-.33594.75-.75.75Z"
                fill="currentColor"
            />
            <path
                d="M15.25,11.27148c-.41406,0-.75-.33594-.75-.75v-1.25c0-.41406.33594-.75.75-.75s.75.33594.75.75v1.25c0,.41406-.33594.75-.75.75Z"
                fill="currentColor"
            />
            <path
                d="M4.75,11.27148c-.41406,0-.75-.33594-.75-.75v-1.25c0-.41406.33594-.75.75-.75s.75.33594.75.75v1.25c0,.41406-.33594.75-.75.75Z"
                fill="currentColor"
            />
            <path
                d="M6.25,16.02148c-1.24023,0-2.25-1.00977-2.25-2.25,0-.41406.33594-.75.75-.75s.75.33594.75.75c0,.41309.33691.75.75.75.41406,0,.75.33594.75.75s-.33594.75-.75.75Z"
                fill="currentColor"
            />
            <path
                d="M4.75,7.02148c-.41406,0-.75-.33594-.75-.75,0-1.24023,1.00977-2.25,2.25-2.25.41406,0,.75.33594.75.75s-.33594.75-.75.75c-.41309,0-.75.33691-.75.75,0,.41406-.33594.75-.75.75Z"
                fill="currentColor"
            />
            <path
                d="M13.75,16.02148c-.41406,0-.75-.33594-.75-.75s.33594-.75.75-.75c.41309,0,.75-.33691.75-.75,0-.41406.33594-.75.75-.75s.75.33594.75.75c0,1.24023-1.00977,2.25-2.25,2.25Z"
                fill="currentColor"
            />
            <path
                d="M18.25,5.75c-.41406,0-.75-.33594-.75-.75v-1.75c0-.41309-.33691-.75-.75-.75h-1.75c-.41406,0-.75-.33594-.75-.75s.33594-.75.75-.75h1.75c1.24023,0,2.25,1.00977,2.25,2.25v1.75c0,.41406-.33594.75-.75.75Z"
                fill="currentColor"
            />
            <path
                d="M16.75,19h-1.75c-.41406,0-.75-.33594-.75-.75s.33594-.75.75-.75h1.75c.41309,0,.75-.33691.75-.75v-1.75c0-.41406.33594-.75.75-.75s.75.33594.75.75v1.75c0,1.24023-1.00977,2.25-2.25,2.25Z"
                fill="currentColor"
            />
            <path
                d="M5,19h-1.75c-1.24023,0-2.25-1.00977-2.25-2.25v-1.75c0-.41406.33594-.75.75-.75s.75.33594.75.75v1.75c0,.41309.33691.75.75.75h1.75c.41406,0,.75.33594.75.75s-.33594.75-.75.75Z"
                fill="currentColor"
            />
            <path
                d="M1.75,5.75c-.41406,0-.75-.33594-.75-.75v-1.75c0-1.24023,1.00977-2.25,2.25-2.25h1.75c.41406,0,.75.33594.75.75s-.33594.75-.75.75h-1.75c-.41309,0-.75.33691-.75.75v1.75c0,.41406-.33594.75-.75.75Z"
                fill="currentColor"
            />
        </svg>
    `;
};

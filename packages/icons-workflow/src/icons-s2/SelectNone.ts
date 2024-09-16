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
export const SelectNoneIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Select None',
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
                d="m12.75,3.5h-1.25c-.41406,0-.75-.33594-.75-.75s.33594-.75.75-.75h1.25c.41406,0,.75.33594.75.75s-.33594.75-.75.75Z"
                fill="currentColor"
            />
            <path
                d="m12.75,18h-1.25c-.41406,0-.75-.33594-.75-.75s.33594-.75.75-.75h1.25c.41406,0,.75.33594.75.75s-.33594.75-.75.75Z"
                fill="currentColor"
            />
            <path
                d="m8.5,3.5h-1.25c-.41406,0-.75-.33594-.75-.75s.33594-.75.75-.75h1.25c.41406,0,.75.33594.75.75s-.33594.75-.75.75Z"
                fill="currentColor"
            />
            <path
                d="m8.5,18h-1.25c-.41406,0-.75-.33594-.75-.75s.33594-.75.75-.75h1.25c.41406,0,.75.33594.75.75s-.33594.75-.75.75Z"
                fill="currentColor"
            />
            <path
                d="m17.25,5c-.41406,0-.75-.33594-.75-.75,0-.41309-.33691-.75-.75-.75-.41406,0-.75-.33594-.75-.75s.33594-.75.75-.75c1.24023,0,2.25,1.00977,2.25,2.25,0,.41406-.33594.75-.75.75Z"
                fill="currentColor"
            />
            <path
                d="m17.25,9.25c-.41406,0-.75-.33594-.75-.75v-1.25c0-.41406.33594-.75.75-.75s.75.33594.75.75v1.25c0,.41406-.33594.75-.75.75Z"
                fill="currentColor"
            />
            <path
                d="m2.75,9.25c-.41406,0-.75-.33594-.75-.75v-1.25c0-.41406.33594-.75.75-.75s.75.33594.75.75v1.25c0,.41406-.33594.75-.75.75Z"
                fill="currentColor"
            />
            <path
                d="m2.75,13.5c-.41406,0-.75-.33594-.75-.75v-1.25c0-.41406.33594-.75.75-.75s.75.33594.75.75v1.25c0,.41406-.33594.75-.75.75Z"
                fill="currentColor"
            />
            <path
                d="m17.25,13.5c-.41406,0-.75-.33594-.75-.75v-1.25c0-.41406.33594-.75.75-.75s.75.33594.75.75v1.25c0,.41406-.33594.75-.75.75Z"
                fill="currentColor"
            />
            <path
                d="m4.25,18c-1.24023,0-2.25-1.00977-2.25-2.25,0-.41406.33594-.75.75-.75s.75.33594.75.75c0,.41309.33691.75.75.75.41406,0,.75.33594.75.75s-.33594.75-.75.75Z"
                fill="currentColor"
            />
            <path
                d="m15.75,18c-.41406,0-.75-.33594-.75-.75s.33594-.75.75-.75c.41309,0,.75-.33691.75-.75,0-.41406.33594-.75.75-.75s.75.33594.75.75c0,1.24023-1.00977,2.25-2.25,2.25Z"
                fill="currentColor"
            />
            <path
                d="m2.75,5c-.41406,0-.75-.33594-.75-.75,0-1.24023,1.00977-2.25,2.25-2.25.41406,0,.75.33594.75.75s-.33594.75-.75.75c-.41309,0-.75.33691-.75.75,0,.41406-.33594.75-.75.75Z"
                fill="currentColor"
            />
            <path
                d="m11.06055,10l1.71973-1.71973c.29297-.29297.29297-.76758,0-1.06055s-.76758-.29297-1.06055,0l-1.71973,1.71973-1.71973-1.71973c-.29297-.29297-.76758-.29297-1.06055,0s-.29297.76758,0,1.06055l1.71973,1.71973-1.71973,1.71973c-.29297.29297-.29297.76758,0,1.06055.14648.14648.33789.21973.53027.21973s.38379-.07324.53027-.21973l1.71973-1.71973,1.71973,1.71973c.14648.14648.33789.21973.53027.21973s.38379-.07324.53027-.21973c.29297-.29297.29297-.76758,0-1.06055l-1.71973-1.71973Z"
                fill="currentColor"
            />
        </svg>
    `;
};

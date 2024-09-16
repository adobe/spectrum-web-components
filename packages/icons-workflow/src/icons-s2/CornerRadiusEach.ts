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
export const CornerRadiusEachIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Corner Radius Each',
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
                d="m18,14.25v-2.25c0-.41406-.33594-.75-.75-.75s-.75.33594-.75.75v2.25c0,1.24072-1.00928,2.25-2.25,2.25h-2.25c-.41406,0-.75.33594-.75.75s.33594.75.75.75h2.25c2.06787,0,3.75-1.68213,3.75-3.75Z"
                fill="currentColor"
            />
            <path
                d="m18,8v-2.25c0-2.06787-1.68213-3.75-3.75-3.75h-2.25c-.41406,0-.75.33594-.75.75s.33594.75.75.75h2.25c1.24072,0,2.25,1.00928,2.25,2.25v2.25c0,.41406.33594.75.75.75s.75-.33594.75-.75Z"
                fill="currentColor"
            />
            <path
                d="m3.5,8v-2.25c0-1.24072,1.00928-2.25,2.25-2.25h2.25c.41406,0,.75-.33594.75-.75s-.33594-.75-.75-.75h-2.25c-2.06787,0-3.75,1.68213-3.75,3.75v2.25c0,.41406.33594.75.75.75s.75-.33594.75-.75Z"
                fill="currentColor"
            />
            <path
                d="m8,18h-2.25c-2.06787,0-3.75-1.68213-3.75-3.75v-2.25c0-.41406.33594-.75.75-.75s.75.33594.75.75v2.25c0,1.24072,1.00928,2.25,2.25,2.25h2.25c.41406,0,.75.33594.75.75s-.33594.75-.75.75Z"
                fill="currentColor"
            />
        </svg>
    `;
};

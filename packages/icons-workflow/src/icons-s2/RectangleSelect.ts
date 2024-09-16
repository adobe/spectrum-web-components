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
export const RectangleSelectIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Rectangle Select',
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
                d="m4.25,2c-1.24072,0-2.25,1.00928-2.25,2.25,0,.41406.33594.75.75.75s.75-.33594.75-.75c0-.41357.33643-.75.75-.75.41406,0,.75-.33594.75-.75s-.33594-.75-.75-.75Z"
                fill="currentColor"
            />
            <path
                d="m8.5,16.5h-1.25c-.41406,0-.75.33594-.75.75s.33594.75.75.75h1.25c.41406,0,.75-.33594.75-.75s-.33594-.75-.75-.75Z"
                fill="currentColor"
            />
            <path
                d="m15.75,3.5c.41357,0,.75.33643.75.75,0,.41406.33594.75.75.75s.75-.33594.75-.75c0-1.24072-1.00928-2.25-2.25-2.25-.41406,0-.75.33594-.75.75s.33594.75.75.75Z"
                fill="currentColor"
            />
            <path
                d="m2.75,13.5c.41406,0,.75-.33594.75-.75v-1.25c0-.41406-.33594-.75-.75-.75s-.75.33594-.75.75v1.25c0,.41406.33594.75.75.75Z"
                fill="currentColor"
            />
            <path
                d="m2.75,9.25c.41406,0,.75-.33594.75-.75v-1.25c0-.41406-.33594-.75-.75-.75s-.75.33594-.75.75v1.25c0,.41406.33594.75.75.75Z"
                fill="currentColor"
            />
            <path
                d="m4.25,16.5c-.41357,0-.75-.33643-.75-.75,0-.41406-.33594-.75-.75-.75s-.75.33594-.75.75c0,1.24072,1.00928,2.25,2.25,2.25.41406,0,.75-.33594.75-.75s-.33594-.75-.75-.75Z"
                fill="currentColor"
            />
            <path
                d="m8.5,2h-1.25c-.41406,0-.75.33594-.75.75s.33594.75.75.75h1.25c.41406,0,.75-.33594.75-.75s-.33594-.75-.75-.75Z"
                fill="currentColor"
            />
            <path
                d="m17.25,15c-.41406,0-.75.33594-.75.75,0,.41357-.33643.75-.75.75-.41406,0-.75.33594-.75.75s.33594.75.75.75c1.24072,0,2.25-1.00928,2.25-2.25,0-.41406-.33594-.75-.75-.75Z"
                fill="currentColor"
            />
            <path
                d="m17.25,6.5c-.41406,0-.75.33594-.75.75v1.25c0,.41406.33594.75.75.75s.75-.33594.75-.75v-1.25c0-.41406-.33594-.75-.75-.75Z"
                fill="currentColor"
            />
            <path
                d="m17.25,10.75c-.41406,0-.75.33594-.75.75v1.25c0,.41406.33594.75.75.75s.75-.33594.75-.75v-1.25c0-.41406-.33594-.75-.75-.75Z"
                fill="currentColor"
            />
            <path
                d="m12.75,2h-1.25c-.41406,0-.75.33594-.75.75s.33594.75.75.75h1.25c.41406,0,.75-.33594.75-.75s-.33594-.75-.75-.75Z"
                fill="currentColor"
            />
            <path
                d="m12.75,16.5h-1.25c-.41406,0-.75.33594-.75.75s.33594.75.75.75h1.25c.41406,0,.75-.33594.75-.75s-.33594-.75-.75-.75Z"
                fill="currentColor"
            />
        </svg>
    `;
};

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
export const CalendarIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Calendar',
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
                d="m15.75,3h-2v-1c0-.41406-.33594-.75-.75-.75s-.75.33594-.75.75v1h-4.5v-1c0-.41406-.33594-.75-.75-.75s-.75.33594-.75.75v1h-2c-1.24072,0-2.25,1.00977-2.25,2.25v10.5c0,1.24023,1.00928,2.25,2.25,2.25h11.5c1.24072,0,2.25-1.00977,2.25-2.25V5.25c0-1.24023-1.00928-2.25-2.25-2.25Zm-11.5,1.5h2v.5c0,.41406.33594.75.75.75s.75-.33594.75-.75v-.5h4.5v.5c0,.41406.33594.75.75.75s.75-.33594.75-.75v-.5h2c.41357,0,.75.33691.75.75v1.75H3.5v-1.75c0-.41309.33643-.75.75-.75Zm11.5,12H4.25c-.41357,0-.75-.33691-.75-.75v-7.25h13v7.25c0,.41309-.33643.75-.75.75Z"
                fill="currentColor"
            />
            <rect
                x="5"
                y="10"
                width="2"
                height="2"
                rx="1"
                ry="1"
                fill="currentColor"
            />
            <rect
                x="9"
                y="10"
                width="2"
                height="2"
                rx="1"
                ry="1"
                fill="currentColor"
            />
            <rect
                x="13"
                y="10"
                width="2"
                height="2"
                rx="1"
                ry="1"
                fill="currentColor"
            />
            <rect
                x="5"
                y="13"
                width="2"
                height="2"
                rx="1"
                ry="1"
                fill="currentColor"
            />
            <rect
                x="9"
                y="13"
                width="2"
                height="2"
                rx="1"
                ry="1"
                fill="currentColor"
            />
            <rect
                x="13"
                y="13"
                width="2"
                height="2"
                rx="1"
                ry="1"
                fill="currentColor"
            />
        </svg>
    `;
};

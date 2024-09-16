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
export const AppsAllIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Apps All',
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
            <rect
                x="2.25"
                y="2.25"
                width="3.5"
                height="3.5"
                rx="1"
                ry="1"
                fill="currentColor"
            />
            <rect
                x="8.25"
                y="2.25"
                width="3.5"
                height="3.5"
                rx="1"
                ry="1"
                fill="currentColor"
            />
            <rect
                x="14.25"
                y="2.25"
                width="3.5"
                height="3.5"
                rx="1"
                ry="1"
                fill="currentColor"
            />
            <rect
                x="2.25"
                y="8.25"
                width="3.5"
                height="3.5"
                rx="1"
                ry="1"
                fill="currentColor"
            />
            <rect
                x="8.25"
                y="8.25"
                width="3.5"
                height="3.5"
                rx="1"
                ry="1"
                fill="currentColor"
            />
            <rect
                x="14.25"
                y="8.25"
                width="3.5"
                height="3.5"
                rx="1"
                ry="1"
                fill="currentColor"
            />
            <rect
                x="2.25"
                y="14.25"
                width="3.5"
                height="3.5"
                rx="1"
                ry="1"
                fill="currentColor"
            />
            <rect
                x="8.25"
                y="14.25"
                width="3.5"
                height="3.5"
                rx="1"
                ry="1"
                fill="currentColor"
            />
            <rect
                x="14.25"
                y="14.25"
                width="3.5"
                height="3.5"
                rx="1"
                ry="1"
                fill="currentColor"
            />
        </svg>
    `;
};

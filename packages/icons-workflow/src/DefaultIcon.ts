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

import { tag as html, TemplateResult } from './custom-tag.js';

export { setCustomTemplateLiteralTag } from './custom-tag.js';
export const DefaultIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Default',
} = {}): string | TemplateResult => {
    return html`
        <svg
            fill="#000000"
            height=${height}
            width=${width}
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 64 64"
            enable-background="new 0 0 64 64"
            xml:space="preserve"
            aria-hidden=${hidden ? 'true' : 'false'}
            aria-label=${hidden ? undefined : title}
        >
            <rect width="32" height="32" rx="8" fill="#292929" />
            <mask
                id="mask0_76606_3852"
                style="mask-type:alpha"
                maskUnits="userSpaceOnUse"
                x="6"
                y="6"
                width="20"
                height="20"
            >
                <path
                    d="M16 24.75C11.1753 24.75 7.25 20.8252 7.25 16C7.25 11.1748 11.1753 7.25 16 7.25C20.8247 7.25 24.75 11.1748 24.75 16C24.75 20.8252 20.8247 24.75 16 24.75ZM16 8.75C12.0024 8.75 8.75 12.002 8.75 16C8.75 19.998 12.0024 23.25 16 23.25C19.9976 23.25 23.25 19.998 23.25 16C23.25 12.002 19.9976 8.75 16 8.75Z"
                    fill="#292929"
                />
            </mask>
            <g mask="url(#mask0_76606_3852)">
                <rect x="6" y="6" width="20" height="20" fill="white" />
            </g>
            <defs>
                <clipPath id="clip0_76606_3852">
                    <rect width="32" height="32" rx="8" fill="white" />
                </clipPath>
            </defs>
        </svg>
    `;
};

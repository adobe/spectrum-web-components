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
            <rect width="64" height="64" rx="16" fill="#292929" />
            <mask
                id="mask0_76606_3852"
                style="mask-type:alpha"
                maskUnits="userSpaceOnUse"
                x="12"
                y="12"
                width="40"
                height="40"
            >
                <path
                    d="M32 49.5C22.3506 49.5 14.5 41.6504 14.5 32C14.5 22.3496 22.3506 14.5 32 14.5C41.6494 14.5 49.5 22.3496 49.5 32C49.5 41.6504 41.6494 49.5 32 49.5ZM32 17.5C24.0048 17.5 17.5 24.004 17.5 32C17.5 39.996 24.0048 46.5 32 46.5C39.9952 46.5 46.5 39.996 46.5 32C46.5 24.004 39.9952 17.5 32 17.5Z"
                    fill="#292929"
                />
            </mask>
            <g mask="url(#mask0_76606_3852)">
                <rect x="12" y="12" width="40" height="40" fill="white" />
            </g>
            <defs>
                <clipPath id="clip0_76606_3852">
                    <rect width="64" height="64" rx="16" fill="white" />
                </clipPath>
            </defs>
        </svg>
    `;
};

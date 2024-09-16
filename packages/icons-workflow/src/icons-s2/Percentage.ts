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
export const PercentageIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Percentage',
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
                d="m2.5,18.25c-.19189,0-.38379-.07324-.53027-.21973-.29297-.29297-.29297-.76758,0-1.06055L16.96973,1.96973c.29297-.29297.76758-.29297,1.06055,0s.29297.76758,0,1.06055L3.03027,18.03027c-.14648.14648-.33838.21973-.53027.21973Z"
                fill="currentColor"
                stroke-width="0"
            />
            <path
                d="m5.25,8.5c-1.79199,0-3.25-1.45801-3.25-3.25s1.45801-3.25,3.25-3.25,3.25,1.45801,3.25,3.25-1.45801,3.25-3.25,3.25Zm0-5c-.96484,0-1.75.78516-1.75,1.75s.78516,1.75,1.75,1.75,1.75-.78516,1.75-1.75-.78516-1.75-1.75-1.75Z"
                fill="currentColor"
                stroke-width="0"
            />
            <path
                d="m14.75,18c-1.79199,0-3.25-1.45801-3.25-3.25s1.45801-3.25,3.25-3.25,3.25,1.45801,3.25,3.25-1.45801,3.25-3.25,3.25Zm0-5c-.96484,0-1.75.78516-1.75,1.75s.78516,1.75,1.75,1.75,1.75-.78516,1.75-1.75-.78516-1.75-1.75-1.75Z"
                fill="currentColor"
                stroke-width="0"
            />
        </svg>
    `;
};

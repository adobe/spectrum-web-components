/**
 * Copyright 2025 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
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
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            role="img"
            fill="currentColor"
            width=${width}
            height=${height}
            aria-hidden=${hidden ? 'true' : 'false'}
            aria-label=${hidden ? undefined : title}
        >
            <path
                d="m10,18.75c-4.82471,0-8.75-3.9248-8.75-8.75S5.17529,1.25,10,1.25s8.75,3.9248,8.75,8.75-3.92529,8.75-8.75,8.75Zm0-16c-3.99756,0-7.25,3.25195-7.25,7.25s3.25244,7.25,7.25,7.25,7.25-3.25195,7.25-7.25-3.25244-7.25-7.25-7.25Z"
                fill="currentColor"
                stroke-width="0"
            ></path>
        </svg>
    `;
};

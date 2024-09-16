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
export const AccessibilityIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Accessibility',
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
                d="m13.91735,8.1499c-.0498.01001-.87988.27002-2.09985.43005-.25.04004-.44019.25-.44019.5v1.14001c0,.09009.01025.17993.03003.27002l1.21997,4.31006c.11011.3999-.11987.80994-.52002.91992-.06982.02002-.13989.03003-.19995.03003-.32983,0-.62988-.21997-.72998-.55005l-.90991-3.25c-.04004-.12-.1499-.19995-.27002-.19995s-.22998.07996-.27002.19995l-.90991,3.25c-.1001.33008-.40015.55005-.72998.55005-.06006,0-.13013-.01001-.19995-.03003-.40015-.10999-.63013-.52002-.52002-.91992l1.21997-4.31006c.01978-.09009.03003-.17993.03003-.27002v-1.14001c0-.25-.19019-.45996-.44019-.48999-1.22998-.16003-2.05981-.43005-2.10986-.44995-.39014-.13-.6001-.55005-.46997-.94006.12988-.3999.5498-.60999.93994-.47998.02002,0,1.52002.48999,3.45996.48999,1.90991,0,3.44995-.48999,3.45996-.48999.3999-.13.82007.09009.94995.47998.12012.39001-.08984.82007-.48999.94995Z"
                fill="currentColor"
                stroke-width="0"
            />
            <circle
                cx="10"
                cy="5"
                r="1.25"
                fill="currentColor"
                stroke-width="0"
            />
            <path
                d="m10,18.75c-4.8252,0-8.75-3.9248-8.75-8.75S5.1748,1.25,10,1.25s8.75,3.9248,8.75,8.75-3.9248,8.75-8.75,8.75Zm0-16c-3.99805,0-7.25,3.25195-7.25,7.25s3.25195,7.25,7.25,7.25,7.25-3.25195,7.25-7.25-3.25195-7.25-7.25-7.25Z"
                fill="currentColor"
            />
        </svg>
    `;
};

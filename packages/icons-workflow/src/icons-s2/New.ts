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
export const NewIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'New',
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
                d="m18,4.25v11.5c0,1.24072-1.00928,2.25-2.25,2.25H4.25c-1.24072,0-2.25-1.00928-2.25-2.25V4.25c0-1.24072,1.00928-2.25,2.25-2.25h11.5c1.24072,0,2.25,1.00928,2.25,2.25Zm-1.5,0c0-.41357-.33643-.75-.75-.75H4.25c-.41357,0-.75.33643-.75.75v11.5c0,.41357.33643.75.75.75h11.5c.41357,0,.75-.33643.75-.75V4.25Z"
                fill="currentColor"
            />
            <path
                d="m13.76318,10c0,.42139-.3418.76318-.76318.76318h-2.23682v2.23682c0,.42139-.3418.76318-.76318.76318s-.76318-.3418-.76318-.76318v-2.23682h-2.23682c-.42139,0-.76318-.3418-.76318-.76318s.3418-.76318.76318-.76318h2.23682v-2.23682c0-.42139.3418-.76318.76318-.76318s.76318.3418.76318.76318v2.23682h2.23682c.42139,0,.76318.3418.76318.76318Z"
                fill="currentColor"
            />
        </svg>
    `;
};

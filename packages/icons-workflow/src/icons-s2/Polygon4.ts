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
export const Polygon4Icon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Polygon4',
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
                d="M15.75,18H4.25c-1.24072,0-2.25-1.00928-2.25-2.25V4.25c0-1.24072,1.00928-2.25,2.25-2.25h11.5c1.24072,0,2.25,1.00928,2.25,2.25v11.5c0,1.24072-1.00928,2.25-2.25,2.25ZM4.25,3.5c-.41357,0-.75.33643-.75.75v11.5c0,.41357.33643.75.75.75h11.5c.41357,0,.75-.33643.75-.75V4.25c0-.41357-.33643-.75-.75-.75H4.25Z"
                fill="currentColor"
            />
        </svg>
    `;
};

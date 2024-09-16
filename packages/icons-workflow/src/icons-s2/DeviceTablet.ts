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
export const DeviceTabletIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Device Tablet',
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
            <circle cx="15" cy="9.99811" r="1" fill="currentColor" />
            <path
                d="m16.75,16.99805H3.25c-1.24023,0-2.25-1.00977-2.25-2.25V5.24805c0-1.24023,1.00977-2.25,2.25-2.25h13.5c1.24023,0,2.25,1.00977,2.25,2.25v9.5c0,1.24023-1.00977,2.25-2.25,2.25ZM3.25,4.49805c-.41309,0-.75.33691-.75.75v9.5c0,.41309.33691.75.75.75h13.5c.41309,0,.75-.33691.75-.75V5.24805c0-.41309-.33691-.75-.75-.75H3.25Z"
                fill="currentColor"
            />
        </svg>
    `;
};

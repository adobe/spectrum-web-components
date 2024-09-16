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
export const VideoIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Video',
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
                d="m15.75,18H4.25c-1.24023,0-2.25-1.00977-2.25-2.25V4.25c0-1.24023,1.00977-2.25,2.25-2.25h11.5c1.24023,0,2.25,1.00977,2.25,2.25v11.5c0,1.24023-1.00977,2.25-2.25,2.25ZM4.25,3.5c-.41309,0-.75.33691-.75.75v11.5c0,.41309.33691.75.75.75h11.5c.41309,0,.75-.33691.75-.75V4.25c0-.41309-.33691-.75-.75-.75H4.25Z"
                fill="currentColor"
            />
            <path
                d="m13.07307,9.11916l-4.59971-2.47212c-.66621-.35806-1.47342.12451-1.47342.88085v4.94424c0,.75633.80721,1.2389,1.47342.88085l4.59972-2.47213c.70212-.37736.70212-1.38433,0-1.76169Z"
                fill="currentColor"
            />
        </svg>
    `;
};

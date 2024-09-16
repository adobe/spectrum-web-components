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
export const StrokeDottedIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Stroke Dotted',
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
                d="m3.25,9.17505h-1.5c-.45563,0-.82501.36938-.82501.82495,0,.45569.36938.82495.82501.82495h1.5c.45563,0,.82501-.36926.82501-.82495,0-.45557-.36938-.82495-.82501-.82495Z"
                fill="currentColor"
            />
            <path
                d="m8.25,9.17505h-1.5c-.45563,0-.82501.36938-.82501.82495,0,.45569.36938.82495.82501.82495h1.5c.45563,0,.82501-.36926.82501-.82495,0-.45557-.36938-.82495-.82501-.82495Z"
                fill="currentColor"
            />
            <path
                d="m13.25,9.17505h-1.5c-.45563,0-.82501.36938-.82501.82495,0,.45569.36938.82495.82501.82495h1.5c.45563,0,.82501-.36926.82501-.82495,0-.45557-.36938-.82495-.82501-.82495Z"
                fill="currentColor"
            />
            <path
                d="m18.25,9.17505h-1.5c-.45563,0-.82501.36938-.82501.82495,0,.45569.36938.82495.82501.82495h1.5c.45563,0,.82501-.36926.82501-.82495,0-.45557-.36938-.82495-.82501-.82495Z"
                fill="currentColor"
            />
        </svg>
    `;
};

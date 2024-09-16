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
export const CommentIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Comment',
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
                d="m6.25,19c-.09912,0-.19873-.01953-.29346-.05957-.27686-.11816-.45654-.38965-.45654-.69043v-3.25h-.75c-2.06787,0-3.75-1.68262-3.75-3.75v-5.5c0-2.06738,1.68213-3.75,3.75-3.75h10.5c2.06787,0,3.75,1.68262,3.75,3.75v5.5c0,2.06738-1.68213,3.75-3.75,3.75h-4.54297l-3.93701,3.79004c-.14258.1377-.32959.20996-.52002.20996Zm-1.5-15.5c-1.24072,0-2.25,1.00977-2.25,2.25v5.5c0,1.24023,1.00928,2.25,2.25,2.25h1.5c.41406,0,.75.33594.75.75v2.2373l2.88477-2.77734c.13965-.13477.32617-.20996.52002-.20996h4.84521c1.24072,0,2.25-1.00977,2.25-2.25v-5.5c0-1.24023-1.00928-2.25-2.25-2.25H4.75Z"
                fill="currentColor"
            />
        </svg>
    `;
};

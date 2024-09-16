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
export const AllCapsIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'All Caps',
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
                d="m7.75,5H2.25c-.96484,0-1.75.78516-1.75,1.75v.76953c0,.41406.33594.75.75.75s.75-.33594.75-.75v-.76953c0-.1377.1123-.25.25-.25h2v7.9668h-.70117c-.41406,0-.75.33594-.75.75s.33594.75.75.75h2.90137c.41406,0,.75-.33594.75-.75s-.33594-.75-.75-.75h-.7002v-7.9668h2c.1377,0,.25.1123.25.25v.76953c0,.41406.33594.75.75.75s.75-.33594.75-.75v-.76953c0-.96484-.78516-1.75-1.75-1.75Z"
                fill="currentColor"
            />
            <path
                d="m17.75,5h-5.5c-.96484,0-1.75.78516-1.75,1.75v.76953c0,.41406.33594.75.75.75s.75-.33594.75-.75v-.76953c0-.1377.1123-.25.25-.25h2v7.9668h-.70117c-.41406,0-.75.33594-.75.75s.33594.75.75.75h2.90137c.41406,0,.75-.33594.75-.75s-.33594-.75-.75-.75h-.7002v-7.9668h2c.1377,0,.25.1123.25.25v.76953c0,.41406.33594.75.75.75s.75-.33594.75-.75v-.76953c0-.96484-.78516-1.75-1.75-1.75Z"
                fill="currentColor"
            />
        </svg>
    `;
};

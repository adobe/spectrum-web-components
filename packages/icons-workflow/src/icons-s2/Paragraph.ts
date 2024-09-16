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
export const ParagraphIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Paragraph',
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
                d="m16.74121,2H7.125c-2.61914,0-4.75,2.13086-4.75,4.75s2.13086,4.75,4.75,4.75h.375v5.65137c0,.41406.33594.75.75.75s.75-.33594.75-.75V3.5h3v13.65137c0,.41406.33594.75.75.75s.75-.33594.75-.75V3.5h3.24121c.41406,0,.75-.33594.75-.75s-.33594-.75-.75-.75ZM7.5,10h-.375c-1.79199,0-3.25-1.45801-3.25-3.25s1.45801-3.25,3.25-3.25h.375v6.5Z"
                fill="currentColor"
                stroke-width="0"
            />
        </svg>
    `;
};

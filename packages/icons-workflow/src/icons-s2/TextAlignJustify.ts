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
export const TextAlignJustifyIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Text Align Justify',
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
                d="m16.25,4.5H3.75c-.41406,0-.75-.33594-.75-.75s.33594-.75.75-.75h12.5c.41406,0,.75.33594.75.75s-.33594.75-.75.75Z"
                fill="currentColor"
            />
            <path
                d="m16.25,8.5H3.75c-.41406,0-.75-.33594-.75-.75s.33594-.75.75-.75h12.5c.41406,0,.75.33594.75.75s-.33594.75-.75.75Z"
                fill="currentColor"
            />
            <path
                d="m16.25,12.5H3.75c-.41406,0-.75-.33594-.75-.75s.33594-.75.75-.75h12.5c.41406,0,.75.33594.75.75s-.33594.75-.75.75Z"
                fill="currentColor"
            />
            <path
                d="m16.25,16.5H3.75c-.41406,0-.75-.33594-.75-.75s.33594-.75.75-.75h12.5c.41406,0,.75.33594.75.75s-.33594.75-.75.75Z"
                fill="currentColor"
            />
        </svg>
    `;
};

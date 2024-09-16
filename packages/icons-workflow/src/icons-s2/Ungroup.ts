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
export const UngroupIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Ungroup',
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
                d="m8.5,15h-2c-.82715,0-1.5-.67285-1.5-1.5s.67285-1.5,1.5-1.5h2c.82715,0,1.5.67285,1.5,1.5s-.67285,1.5-1.5,1.5Z"
                fill="currentColor"
            />
            <path
                d="m17.25,14.39746c-.41406,0-.75-.33594-.75-.75V4.25c0-.41309-.33643-.75-.75-.75H6.31982c-.41406,0-.75-.33594-.75-.75s.33594-.75.75-.75h9.43018c1.24072,0,2.25,1.00977,2.25,2.25v9.39746c0,.41406-.33594.75-.75.75Z"
                fill="currentColor"
            />
            <path
                d="m13.25,18H4.25c-1.24072,0-2.25-1.00977-2.25-2.25V6.75c0-.41406.33594-.75.75-.75s.75.33594.75.75v9c0,.41309.33643.75.75.75h9c.41406,0,.75.33594.75.75s-.33594.75-.75.75Z"
                fill="currentColor"
            />
            <path
                d="m13.25,10h-.33447c-.41406,0-.75-.33594-.75-.75s.33594-.75.75-.75h.33447c.1377,0,.25-.1123.25-.25v-1.5c0-.1377-.1123-.25-.25-.25h-3.8335c-.41406,0-.75-.33594-.75-.75s.33594-.75.75-.75h3.8335c.96484,0,1.75.78516,1.75,1.75v1.5c0,.96484-.78516,1.75-1.75,1.75Z"
                fill="currentColor"
            />
            <path
                d="m18.25,19.01953c-.19189,0-.38379-.07324-.53027-.21973L1.21973,2.2998c-.29297-.29297-.29297-.76758,0-1.06055s.76758-.29297,1.06055,0l16.5,16.5c.29297.29297.29297.76758,0,1.06055-.14648.14648-.33838.21973-.53027.21973Z"
                fill="currentColor"
            />
        </svg>
    `;
};

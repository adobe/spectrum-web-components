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
export const TransformIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Transform',
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
                d="m17.25,6.75c.41406,0,.75-.33594.75-.75v-3.25c0-.41406-.33594-.75-.75-.75h-3.25c-.41406,0-.75.33594-.75.75s.33594.75.75.75h1.43945l-5.43945,5.43945L4.56055,3.5h1.43945c.41406,0,.75-.33594.75-.75s-.33594-.75-.75-.75h-3.25c-.41406,0-.75.33594-.75.75v3.25c0,.41406.33594.75.75.75s.75-.33594.75-.75v-1.43945l5.43945,5.43945-5.43945,5.43945v-1.43945c0-.41406-.33594-.75-.75-.75s-.75.33594-.75.75v3.25c0,.41406.33594.75.75.75h3.25c.41406,0,.75-.33594.75-.75s-.33594-.75-.75-.75h-1.43945l5.43945-5.43945,5.43945,5.43945h-1.43945c-.41406,0-.75.33594-.75.75s.33594.75.75.75h3.25c.41406,0,.75-.33594.75-.75v-3.25c0-.41406-.33594-.75-.75-.75s-.75.33594-.75.75v1.43945l-5.43945-5.43945,5.43945-5.43945v1.43945c0,.41406.33594.75.75.75Z"
                fill="currentColor"
            />
        </svg>
    `;
};

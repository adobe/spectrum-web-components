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
export const TextSubscriptIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Text Subscript',
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
                d="m18,18.2041c-.41406,0-.75-.33594-.75-.75v-3.62598l-.49414.20898c-.37793.16016-.82129-.01758-.98242-.40039-.16016-.38086.01855-.82129.40039-.98242l1.53516-.64746c.22949-.09668.49609-.07324.70605.06641.20898.13867.33496.37402.33496.625v4.75586c0,.41406-.33594.75-.75.75Z"
                fill="currentColor"
            />
            <path
                d="m13.5,2H4.5c-1.24023,0-2.25,1.00977-2.25,2.25v1.11035c0,.41406.33594.75.75.75s.75-.33594.75-.75v-1.11035c0-.41309.33691-.75.75-.75h3.75v13h-1.62012c-.41406,0-.75.33594-.75.75s.33594.75.75.75h4.63965c.41406,0,.75-.33594.75-.75s-.33594-.75-.75-.75h-1.51953V3.5h3.75c.41309,0,.75.33691.75.75v1.11035c0,.41406.33594.75.75.75s.75-.33594.75-.75v-1.11035c0-1.24023-1.00977-2.25-2.25-2.25Z"
                fill="currentColor"
            />
        </svg>
    `;
};

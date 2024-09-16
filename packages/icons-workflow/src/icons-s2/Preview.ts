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
export const PreviewIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Preview',
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
                d="m19.28027,18.22168l-1.97339-1.97339c.43652-.64087.69312-1.41382.69312-2.24634,0-2.20605-1.79395-4-4-4s-4,1.79395-4,4,1.79395,4,4,4c.83252,0,1.60547-.25659,2.24634-.69312l1.97339,1.97339c.14648.14648.33789.21973.53027.21973s.38379-.07324.53027-.21973c.29297-.29297.29297-.76758,0-1.06055Zm-7.78027-4.21973c0-1.37891,1.12109-2.5,2.5-2.5s2.5,1.12109,2.5,2.5-1.12109,2.5-2.5,2.5-2.5-1.12109-2.5-2.5Z"
                fill="currentColor"
            />
            <path
                d="m16.34082,5.28027l-3.62109-3.62012c-.41797-.41992-.99805-.66016-1.59082-.66016h-5.87891c-1.24023,0-2.25,1.00977-2.25,2.25v12.5c0,1.24023,1.00977,2.25,2.25,2.25h3.75c.41406,0,.75-.33594.75-.75s-.33594-.75-.75-.75h-3.75c-.41309,0-.75-.33691-.75-.75V3.25c0-.41309.33691-.75.75-.75h4.75v3.25c0,1.24023,1.00977,2.25,2.25,2.25h3.25v.5c0,.41406.33594.75.75.75s.75-.33594.75-.75v-1.62891c0-.5918-.24023-1.17188-.65918-1.59082Zm-4.84082.46973v-3.13574c.05493.03198.11279.06006.1582.10547l3.62207,3.62109c.04565.04565.07373.10376.10596.15918h-3.13623c-.41309,0-.75-.33691-.75-.75Z"
                fill="currentColor"
            />
        </svg>
    `;
};

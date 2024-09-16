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
export const ArtboardIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Artboard',
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
                d="m17.34082,8.28027l-3.62109-3.62109c-.41895-.41895-.99902-.65918-1.59082-.65918h-5.87891c-1.24023,0-2.25,1.00928-2.25,2.25v9.5c0,1.24072,1.00977,2.25,2.25,2.25h9.5c1.24023,0,2.25-1.00928,2.25-2.25v-5.87891c0-.59229-.24023-1.17188-.65918-1.59082Zm-1.06055,1.06055c.04565.04565.07385.10376.10602.15918h-3.13629c-.41309,0-.75-.33643-.75-.75v-3.13623c.05536.03223.11353.0603.15918.10596l3.62109,3.62109Zm-.53027,7.15918H6.25c-.41309,0-.75-.33643-.75-.75V6.25c0-.41357.33691-.75.75-.75h4.75v3.25c0,1.24072,1.00977,2.25,2.25,2.25h3.25v4.75c0,.41357-.33691.75-.75.75Z"
                fill="currentColor"
            />
            <path
                d="m4.75,3.5c-.41406,0-.75-.33594-.75-.75v-1.75c0-.41406.33594-.75.75-.75s.75.33594.75.75v1.75c0,.41406-.33594.75-.75.75Z"
                fill="currentColor"
            />
            <path
                d="m2.75,5.5h-1.75c-.41406,0-.75-.33594-.75-.75s.33594-.75.75-.75h1.75c.41406,0,.75.33594.75.75s-.33594.75-.75.75Z"
                fill="currentColor"
            />
        </svg>
    `;
};

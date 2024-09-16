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
export const FileIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'File',
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
                d="m16.34131,5.28027l-3.62207-3.62109c-.4248-.4248-.98975-.65918-1.59033-.65918h-5.87891c-1.24072,0-2.25,1.00977-2.25,2.25v12.5c0,1.24023,1.00928,2.25,2.25,2.25h9.5c1.24072,0,2.25-1.00977,2.25-2.25V6.87109c0-.5918-.23975-1.17188-.65869-1.59082Zm-1.06104,1.06055c.04565.04565.07385.10376.10602.15918h-3.13629c-.41357,0-.75-.33691-.75-.75v-3.13599c.05518.03223.11316.06018.15869.10571l3.62158,3.62109Zm-.53027,10.15918H5.25c-.41357,0-.75-.33691-.75-.75V3.25c0-.41309.33643-.75.75-.75h4.75v3.25c0,1.24023,1.00928,2.25,2.25,2.25h3.25v7.75c0,.41309-.33643.75-.75.75Z"
                fill="currentColor"
            />
        </svg>
    `;
};

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
export const FileTextIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'File Text',
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
                d="m16.34082,5.2959l-3.62109-3.62207c-.41895-.41895-.99902-.65918-1.59082-.65918h-5.87891c-1.24023,0-2.25,1.00977-2.25,2.25v12.4834c0,1.24023,1.00977,2.25,2.25,2.25h9.5c1.24023,0,2.25-1.00977,2.25-2.25V6.88672c0-.60059-.23438-1.16602-.65918-1.59082Zm-1.06055,1.06055c.04614.04614.07397.10352.10596.1582h-3.13623c-.41309,0-.75-.33691-.75-.75v-3.13623c.05542.03223.11353.0603.15918.10596l3.62109,3.62207Zm-.53027,10.1416H5.25c-.41309,0-.75-.33691-.75-.75V3.26465c0-.41309.33691-.75.75-.75h4.75v3.25c0,1.24023,1.00977,2.25,2.25,2.25h3.25v7.7334c0,.41309-.33691.75-.75.75Z"
                fill="currentColor"
            />
            <path
                d="m13,11.49805h-6c-.41406,0-.75-.33594-.75-.75s.33594-.75.75-.75h6c.41406,0,.75.33594.75.75s-.33594.75-.75.75Z"
                fill="currentColor"
            />
            <path
                d="m13,14.49805h-6c-.41406,0-.75-.33594-.75-.75s.33594-.75.75-.75h6c.41406,0,.75.33594.75.75s-.33594.75-.75.75Z"
                fill="currentColor"
            />
        </svg>
    `;
};

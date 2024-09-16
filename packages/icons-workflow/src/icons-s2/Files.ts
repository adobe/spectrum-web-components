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
export const FilesIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Files',
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
                d="m3.75,14c-.41406,0-.75-.33594-.75-.75V3.25c0-1.24023,1.00928-2.25,2.25-2.25h6c.41406,0,.75.33594.75.75s-.33594.75-.75.75h-6c-.41357,0-.75.33691-.75.75v10c0,.41406-.33594.75-.75.75Z"
                fill="currentColor"
            />
            <path
                d="m17.36279,8.21289l-2.68701-3.22363c-.52393-.62891-1.29395-.98926-2.1123-.98926h-4.31348c-1.24072,0-2.25,1.00977-2.25,2.25v9.5c0,1.24023,1.00928,2.25,2.25,2.25h7.5c1.24072,0,2.25-1.00977,2.25-2.25v-5.77637c0-.6416-.22607-1.2666-.63721-1.76074Zm-1.71399.28711h-1.3988c-.41357,0-.75-.33691-.75-.75v-1.82239c.00726.00818.01642.01404.02344.02258l2.12537,2.5498Zm.1012,8h-7.5c-.41357,0-.75-.33691-.75-.75V6.25c0-.41309.33643-.75.75-.75h3.75v2.25c0,1.24023,1.00928,2.25,2.25,2.25h2.25v5.75c0,.41309-.33643.75-.75.75Z"
                fill="currentColor"
            />
        </svg>
    `;
};

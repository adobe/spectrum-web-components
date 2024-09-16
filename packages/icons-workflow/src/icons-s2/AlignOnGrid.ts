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
export const AlignOnGridIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Align On Grid',
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
                d="m15.75,8h-1.5c-1.24072,0-2.25-1.00928-2.25-2.25v-1.5c0-1.24072,1.00928-2.25,2.25-2.25h1.5c1.24072,0,2.25,1.00928,2.25,2.25v1.5c0,1.24072-1.00928,2.25-2.25,2.25Zm-1.5-4.5c-.41357,0-.75.33643-.75.75v1.5c0,.41357.33643.75.75.75h1.5c.41357,0,.75-.33643.75-.75v-1.5c0-.41357-.33643-.75-.75-.75h-1.5Zm-8.5,4.5h-1.5c-1.24072,0-2.25-1.00928-2.25-2.25v-1.5c0-1.24072,1.00928-2.25,2.25-2.25h1.5c1.24072,0,2.25,1.00928,2.25,2.25v1.5c0,1.24072-1.00928,2.25-2.25,2.25Zm-1.5-4.5c-.41357,0-.75.33643-.75.75v1.5c0,.41357.33643.75.75.75h1.5c.41357,0,.75-.33643.75-.75v-1.5c0-.41357-.33643-.75-.75-.75h-1.5Zm11.5,14.5h-1.5c-1.24072,0-2.25-1.00928-2.25-2.25v-1.5c0-1.24072,1.00928-2.25,2.25-2.25h1.5c1.24072,0,2.25,1.00928,2.25,2.25v1.5c0,1.24072-1.00928,2.25-2.25,2.25Zm-1.5-4.5c-.41357,0-.75.33643-.75.75v1.5c0,.41357.33643.75.75.75h1.5c.41357,0,.75-.33643.75-.75v-1.5c0-.41357-.33643-.75-.75-.75h-1.5Zm-8.5,4.5h-1.5c-1.24072,0-2.25-1.00928-2.25-2.25v-1.5c0-1.24072,1.00928-2.25,2.25-2.25h1.5c1.24072,0,2.25,1.00928,2.25,2.25v1.5c0,1.24072-1.00928,2.25-2.25,2.25Zm-1.5-4.5c-.41357,0-.75.33643-.75.75v1.5c0,.41357.33643.75.75.75h1.5c.41357,0,.75-.33643.75-.75v-1.5c0-.41357-.33643-.75-.75-.75h-1.5Zm13.75-4h-7.5V2c0-.27637-.22363-.5-.5-.5s-.5.22363-.5.5v7.5H2c-.27637,0-.5.22363-.5.5s.22363.5.5.5h7.5v7.5c0,.27637.22363.5.5.5s.5-.22363.5-.5v-7.5h7.5c.27637,0,.5-.22363.5-.5s-.22363-.5-.5-.5Z"
                fill="currentColor"
            />
        </svg>
    `;
};

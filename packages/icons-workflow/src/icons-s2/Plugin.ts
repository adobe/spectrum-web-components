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
export const PluginIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Plugin',
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
                d="m16.75,4h-.75v-.75098c0-.96484-.78516-1.75-1.75-1.75h-1.5c-.96484,0-1.75.78516-1.75,1.75v.75098h-2v-.75098c0-.96484-.78516-1.75-1.75-1.75h-1.5c-.96484,0-1.75.78516-1.75,1.75v.75098h-.75c-1.24072,0-2.25,1.00977-2.25,2.25v8.5c0,1.24023,1.00928,2.25,2.25,2.25h13.5c1.24072,0,2.25-1.00977,2.25-2.25V6.25c0-1.24023-1.00928-2.25-2.25-2.25Zm-4.25-.75098c0-.1377.1123-.25.25-.25h1.5c.1377,0,.25.1123.25.25v.75098h-2v-.75098Zm-7,0c0-.1377.1123-.25.25-.25h1.5c.1377,0,.25.1123.25.25v.75098h-2v-.75098Zm12,11.50098c0,.41309-.33643.75-.75.75H3.25c-.41357,0-.75-.33691-.75-.75V6.25c0-.41309.33643-.75.75-.75h13.5c.41357,0,.75.33691.75.75v8.5Z"
                fill="currentColor"
            />
        </svg>
    `;
};

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
export const ExcludeOverlapIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Exclude Overlap',
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
                d="m7,12.27114v-4.25c0-.55228.44772-1,1-1h4.25v-3.25c0-.55228-.44772-1-1-1H3.75c-.55228,0-1,.44772-1,1v7.5c0,.55228.44772,1,1,1h3.25Z"
                fill="currentColor"
                opacity=".12"
            />
            <path
                d="m13,7.77114v3.75c0,.82843-.67157,1.5-1.5,1.5h-3.75v2.75c0,.82843.67157,1.5,1.5,1.5h6.5c.82843,0,1.5-.67157,1.5-1.5v-6.5c0-.82843-.67157-1.5-1.5-1.5h-2.75Z"
                fill="currentColor"
                opacity=".12"
            />
            <path
                d="m16.25,18.02148h-7.5c-.96484,0-1.75-.78516-1.75-1.75v-3.75h5.25c.1377,0,.25-.1123.25-.25v-5.25h3.75c.96484,0,1.75.78516,1.75,1.75v7.5c0,.96484-.78516,1.75-1.75,1.75Zm-7.75-4v2.25c0,.1377.1123.25.25.25h7.5c.1377,0,.25-.1123.25-.25v-7.5c0-.1377-.1123-.25-.25-.25h-2.25v3.75c0,.96484-.78516,1.75-1.75,1.75h-3.75Z"
                fill="currentColor"
            />
            <path
                d="m7.5,13.02148h-3.25c-1.24023,0-2.25-1.00977-2.25-2.25v-6.5c0-1.24023,1.00977-2.25,2.25-2.25h6.5c1.24023,0,2.25,1.00977,2.25,2.25v3.25h-4.75c-.41309,0-.75.33691-.75.75v4.75ZM4.25,3.52148c-.41309,0-.75.33691-.75.75v6.5c0,.41309.33691.75.75.75h1.75v-3.25c0-1.24023,1.00977-2.25,2.25-2.25h3.25v-1.75c0-.41309-.33691-.75-.75-.75h-6.5Z"
                fill="currentColor"
            />
        </svg>
    `;
};

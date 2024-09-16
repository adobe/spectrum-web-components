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
export const CameraIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Camera',
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
                d="m16.75,17H3.25c-1.24072,0-2.25-1.00977-2.25-2.25v-7.5c0-1.24023,1.00928-2.25,2.25-2.25h1.82275c.28613,0,.54297-.15918.6709-.41406l.1709-.3418c.38379-.76758,1.15479-1.24414,2.0127-1.24414h4.14551c.85791,0,1.62891.47656,2.0127,1.24414l.1709.3418c.12793.25488.38477.41406.6709.41406h1.82275c1.24072,0,2.25,1.00977,2.25,2.25v7.5c0,1.24023-1.00928,2.25-2.25,2.25ZM3.25,6.5c-.41357,0-.75.33691-.75.75v7.5c0,.41309.33643.75.75.75h13.5c.41357,0,.75-.33691.75-.75v-7.5c0-.41309-.33643-.75-.75-.75h-1.82275c-.85791,0-1.62891-.47656-2.0127-1.24414l-.1709-.3418c-.12793-.25488-.38477-.41406-.6709-.41406h-4.14551c-.28613,0-.54297.15918-.6709.41406l-.1709.3418c-.38379.76758-1.15479,1.24414-2.0127,1.24414h-1.82275Z"
                fill="currentColor"
            />
            <path
                d="m10,14.5c-2.20557,0-4-1.79395-4-4s1.79443-4,4-4,4,1.79395,4,4-1.79443,4-4,4Zm0-6.5c-1.37842,0-2.5,1.12109-2.5,2.5s1.12158,2.5,2.5,2.5,2.5-1.12109,2.5-2.5-1.12158-2.5-2.5-2.5Z"
                fill="currentColor"
            />
        </svg>
    `;
};

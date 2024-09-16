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
export const BackgroundIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Background',
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
                d="m15.75206,2H4.26258c-1.2391,0-2.24794,1.00977-2.24794,2.25v4.7041l-.01464.01465.01464.01465v5.27344l-.01464.01465.01464.01465v1.46387c0,1.24023,1.00884,2.25,2.24794,2.25h11.48948c1.2391,0,2.24794-1.00977,2.24794-2.25V4.25c0-1.24023-1.00884-2.25-2.24794-2.25Zm.74931,8.44727l-6.04622,6.05273h-3.17971l9.22593-9.23438v3.18164ZM3.51326,4.25c0-.41309.33661-.75.74931-.75h3.20117l-3.95048,3.9541v-3.2041Zm0,5.3252l6.06964-6.0752h3.17873L3.51326,12.75684v-3.18164Zm0,6.1748v-.87207L14.88079,3.5h.87127c.41271,0,.74931.33691.74931.75v.89453l-11.34508,11.35547h-.89371c-.41271,0-.74931-.33691-.74931-.75Zm12.2388.75h-3.178l3.92731-3.9314v3.1814c0,.41309-.33661.75-.74931.75Z"
                fill="currentColor"
            />
        </svg>
    `;
};

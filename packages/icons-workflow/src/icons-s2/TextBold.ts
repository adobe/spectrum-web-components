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
export const TextBoldIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Text Bold',
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
                d="m13.98926,2.01465H5.51074c-1.38477,0-2.51074,1.17773-2.51074,2.625v1.11035c0,.62109.50391,1.125,1.125,1.125s1.125-.50391,1.125-1.125v-1.11035c0-.2207.1377-.375.26074-.375h2.48926v11.44531c0,.00488.00146.00977.00146.01465h-.57178c-.62109,0-1.125.50391-1.125,1.125s.50391,1.125,1.125,1.125h4.64062c.62109,0,1.125-.50391,1.125-1.125s-.50391-1.125-1.125-1.125h-.57178c0-.00488.00146-.00977.00146-.01465V4.26465h2.48926c.12305,0,.26074.1543.26074.375v1.11035c0,.62109.50391,1.125,1.125,1.125s1.125-.50391,1.125-1.125v-1.11035c0-1.44727-1.12598-2.625-2.51074-2.625Z"
                fill="currentColor"
                stroke-width="0"
            />
        </svg>
    `;
};

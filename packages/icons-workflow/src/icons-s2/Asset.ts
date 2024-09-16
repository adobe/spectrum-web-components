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
export const AssetIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Asset',
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
                data-name="Path 1005062"
                d="m11.66411,5.92114c0,.69588-.57855,1.26-1.29222,1.26-.71368,0-1.29222-.56412-1.29222-1.26,0-.69588.57855-1.26,1.29222-1.26s1.29222.56412,1.29222,1.26h0"
                fill="currentColor"
            />
            <path
                d="m12,15.13155v-2.90669c0-.42868.414-.69002.73316-.46282l2.35068,1.45334c.30029.21377.30029.71188,0,.92565l-2.35068,1.45334c-.31916.2272-.73316-.03415-.73316-.46282Z"
                fill="currentColor"
            />
            <path
                d="m16.75,8h-1.75v-3.99023c0-1.1084-.88672-2.00977-1.97754-2.00977H2.97754c-1.09082,0-1.97754.90137-1.97754,2.00977v7.98047c0,1.1084.88672,2.00977,1.97754,2.00977h5.02246v2.75c0,1.24023,1.00977,2.25,2.25,2.25h6.5c1.24023,0,2.25-1.00977,2.25-2.25v-6.5c0-1.24023-1.00977-2.25-2.25-2.25Zm-8.75,4.5H2.97754c-.26367,0-.47754-.22852-.47754-.50977v-.77295l2.59473-2.53076c.16602-.16211.44531-.16113.61133-.00098l2.29395,2.23706v1.57739Zm.3103-3.36987l-1.55737-1.5188c-.74219-.72559-1.95605-.72656-2.7041,0l-1.54883,1.51074v-5.1123c0-.28125.21387-.50977.47754-.50977h10.04492c.26367,0,.47754.22852.47754.50977v3.99023h-3.25c-.83081,0-1.54993.45825-1.9397,1.13013Zm9.1897,7.61987c0,.41309-.33691.75-.75.75h-6.5c-.41309,0-.75-.33691-.75-.75v-6.5c0-.41309.33691-.75.75-.75h6.5c.41309,0,.75.33691.75.75v6.5Z"
                fill="currentColor"
            />
        </svg>
    `;
};

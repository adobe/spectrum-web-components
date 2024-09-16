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
export const GlobeGridIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Globe Grid',
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
                d="m19,10c0-4.91895-3.96729-8.92261-8.86963-8.99341-.09863-.01953-.19629-.01855-.29443.00171C4.94946,1.09692,1,5.09253,1,10c0,4.92578,3.97803,8.93457,8.88989,8.99438.03369.00464.06519.02124.09937.02124.04077,0,.08032-.01465.12061-.02124,4.91211-.05981,8.89014-4.0686,8.89014-8.99438Zm-1.53809-.75h-3.26416c-.1394-2.41895-.93799-4.70044-2.25854-6.48682,2.96338.79541,5.21069,3.35669,5.52271,6.48682Zm-7.45386,7.94849c-1.57227-1.61279-2.55151-3.9375-2.71606-6.44849h5.40649c-.16284,2.51465-1.13159,4.83716-2.69043,6.44849Zm-2.71606-7.94849c.16431-2.51245,1.14282-4.83618,2.71582-6.44873,1.55933,1.61182,2.52783,3.93408,2.69067,6.44873h-5.40649Zm.78174-6.48999c-1.33301,1.78809-2.14014,4.07153-2.28125,6.48999h-3.25439c.3125-3.13477,2.56592-5.69873,5.53564-6.48999Zm-5.53564,7.98999h3.25439c.14111,2.41821.94946,4.70215,2.28223,6.49023-2.97021-.79077-5.22412-3.35522-5.53662-6.49023Zm9.40063,6.48682c1.3208-1.78662,2.11938-4.06787,2.25928-6.48682h3.26392c-.31226,3.13037-2.55957,5.69189-5.52319,6.48682Z"
                fill="currentColor"
            />
        </svg>
    `;
};

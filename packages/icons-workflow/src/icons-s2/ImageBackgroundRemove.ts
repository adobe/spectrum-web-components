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
export const ImageBackgroundRemoveIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Image Background Remove',
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
            <rect
                x="2"
                y="4"
                width="4"
                height="4"
                fill="currentColor"
                opacity=".35"
            />
            <polygon
                points="10 12 9.30741 12 6 9 6 8 10 8 10 12"
                fill="currentColor"
                opacity=".35"
            />
            <rect
                x="10"
                y="4"
                width="4"
                height="4"
                fill="currentColor"
                opacity=".35"
            />
            <rect
                x="14"
                y="8"
                width="4"
                height="4"
                fill="currentColor"
                opacity=".35"
            />
            <polygon
                points="14 12.28454 10 13.45999 10 12 14 12 14 12.28454"
                fill="currentColor"
                opacity=".35"
            />
            <path
                data-name="Path 1005062"
                d="m14.5,7.52114c0,.82843-.67157,1.5-1.5,1.5-.82843,0-1.5-.67157-1.5-1.5,0-.82843.67157-1.5,1.5-1.5s1.5.67157,1.5,1.5h0"
                fill="currentColor"
            />
            <path
                d="m16.75,3H3.25c-1.24072,0-2.25,1.00977-2.25,2.25v9.5c0,1.24023,1.00928,2.25,2.25,2.25h13.5c1.24072,0,2.25-1.00977,2.25-2.25V5.25c0-1.24023-1.00928-2.25-2.25-2.25Zm-13.5,1.5h13.5c.41357,0,.75.33691.75.75v8.21069l-1.90869-1.90894c-.84961-.84961-2.3335-.84961-3.18213,0l-1.23193,1.23145c-.09717.09766-.25684.09668-.354.00098l-3.23193-3.23242c-.84961-.84961-2.3335-.84961-3.18213,0l-1.90918,1.90918v-6.21094c0-.41309.33643-.75.75-.75Zm0,11c-.41357,0-.75-.33691-.75-.75v-1.16797l2.97021-2.96973c.28223-.2832.77686-.2832,1.06006,0l3.23291,3.2334c.68164.67969,1.7915.68262,2.47412-.00098l1.23291-1.23242c.28223-.2832.77686-.2832,1.06006,0l2.70074,2.70068c-.1311.11206-.29553.18701-.48102.18701H3.25Z"
                fill="currentColor"
            />
        </svg>
    `;
};

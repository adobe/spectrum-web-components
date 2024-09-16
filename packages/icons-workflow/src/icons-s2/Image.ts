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
export const ImageIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Image',
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
                d="m14.5,7.52114c0,.82843-.67157,1.5-1.5,1.5-.82843,0-1.5-.67157-1.5-1.5,0-.82843.67157-1.5,1.5-1.5s1.5.67157,1.5,1.5h0"
                fill="currentColor"
            />
            <path
                d="m16.75,3H3.25c-1.24023,0-2.25,1.00977-2.25,2.25v9.5c0,1.24023,1.00977,2.25,2.25,2.25h13.5c1.24023,0,2.25-1.00977,2.25-2.25V5.25c0-1.24023-1.00977-2.25-2.25-2.25Zm-13.5,1.5h13.5c.41309,0,.75.33691.75.75v8.21094l-1.90918-1.90918c-.87695-.87695-2.30469-.87695-3.18164,0l-1.23145,1.23145c-.09961.09766-.25684.09668-.35449.00098l-3.23242-3.23242c-.84961-.84961-2.33203-.84961-3.18164,0l-1.90918,1.90918v-6.21094c0-.41309.33691-.75.75-.75Zm0,11c-.41309,0-.75-.33691-.75-.75v-1.16797l2.96973-2.96973c.29297-.29297.76758-.29297,1.06055,0l3.2334,3.2334c.68164.67969,1.79199.68066,2.47363-.00098l1.23242-1.23242c.29297-.29297.76758-.29297,1.06055,0l2.70068,2.70068c-.1311.11206-.29565.18701-.48096.18701H3.25Z"
                fill="currentColor"
            />
        </svg>
    `;
};

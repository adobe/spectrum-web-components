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
export const StickyNoteIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Sticky Note',
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
                d="m15.75,2H4.25c-1.24072,0-2.25,1.00977-2.25,2.25v11.5c0,1.24023,1.00928,2.25,2.25,2.25h7.87891c.59229,0,1.17188-.24023,1.59082-.65918l3.62109-3.62109c.41895-.41895.65918-.99902.65918-1.59082v-7.87891c0-1.24023-1.00928-2.25-2.25-2.25ZM3.5,15.75V4.25c0-.41309.33643-.75.75-.75h11.5c.41357,0,.75.33691.75.75v6.75h-3.25c-1.24072,0-2.25,1.00977-2.25,2.25v3.25h-6.75c-.41357,0-.75-.33691-.75-.75Zm9.15918.53027c-.04565.04565-.10382.07385-.15918.10596v-3.13623c0-.41309.33643-.75.75-.75h3.13629c-.03217.05542-.06036.11353-.10602.15918l-3.62109,3.62109Z"
                fill="currentColor"
            />
        </svg>
    `;
};

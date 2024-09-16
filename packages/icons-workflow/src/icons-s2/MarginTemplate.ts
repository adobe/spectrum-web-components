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
export const MarginTemplateIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Margin Template',
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
                d="m16.34082,4.78027l-3.12109-3.12109c-.41895-.41895-.99854-.65918-1.59082-.65918h-6.37891c-1.24072,0-2.25,1.00977-2.25,2.25v12.5c0,1.24023,1.00928,2.25,2.25,2.25h1.49036c.00342,0,.00623.00195.00964.00195s.00623-.00195.00964-.00195h6.48071c.00342,0,.00623.00195.00964.00195s.00623-.00195.00964-.00195h1.49036c1.24072,0,2.25-1.00977,2.25-2.25V6.37109c0-.5918-.24023-1.17188-.65918-1.59082ZM7.5,13.5V5.5h5v8h-5Zm5,1.5v1.5h-5v-1.5h5ZM4.5,5.5h1.5v8h-1.5V5.5Zm9.5,0h.93945l.34082.34082c.13965.13965.21973.33301.21973.53027v7.12891h-1.5V5.5Zm-1.84082-2.78027l.34082.34082v.93945h-5v-1.5h4.12891c.19727,0,.39062.08008.53027.21973Zm-6.90918-.21973h.75v1.5h-1.5v-.75c0-.41309.33643-.75.75-.75Zm-.75,13.25v-.75h1.5v1.5h-.75c-.41357,0-.75-.33691-.75-.75Zm10.25.75h-.75v-1.5h1.5v.75c0,.41309-.33643.75-.75.75Z"
                fill="currentColor"
            />
        </svg>
    `;
};

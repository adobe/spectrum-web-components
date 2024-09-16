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
export const PromptIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Prompt',
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
                d="m4.7501,14c-.18359,0-.36719-.06641-.51172-.20117-.30273-.28223-.31934-.75684-.03711-1.06055l2.57617-2.76465-2.57617-2.76465c-.28223-.30371-.26562-.77832.03711-1.06055s.7793-.26562,1.06055.03711l3.05273,3.27637c.26855.28809.26855.73535,0,1.02344l-3.05273,3.27637c-.14746.1582-.34863.23828-.54883.23828Z"
                fill="currentColor"
            />
            <path
                d="m16.75,17H3.25c-1.24023,0-2.25-1.00977-2.25-2.25V5.25c0-1.24023,1.00977-2.25,2.25-2.25h13.5c1.24023,0,2.25,1.00977,2.25,2.25v9.5c0,1.24023-1.00977,2.25-2.25,2.25ZM3.25,4.5c-.41309,0-.75.33691-.75.75v9.5c0,.41309.33691.75.75.75h13.5c.41309,0,.75-.33691.75-.75V5.25c0-.41309-.33691-.75-.75-.75H3.25Z"
                fill="currentColor"
            />
            <path
                d="m15.25,14h-5.5c-.41406,0-.75-.33594-.75-.75s.33594-.75.75-.75h5.5c.41406,0,.75.33594.75.75s-.33594.75-.75.75Z"
                fill="currentColor"
            />
        </svg>
    `;
};

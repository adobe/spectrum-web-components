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
export const ReplaceIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Replace',
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
                d="m6.75,9h-2.5c-1.24023,0-2.25-1.00977-2.25-2.25v-2.5c0-1.24023,1.00977-2.25,2.25-2.25h2.5c1.24023,0,2.25,1.00977,2.25,2.25v2.5c0,1.24023-1.00977,2.25-2.25,2.25Zm-2.5-5.5c-.41309,0-.75.33691-.75.75v2.5c0,.41309.33691.75.75.75h2.5c.41309,0,.75-.33691.75-.75v-2.5c0-.41309-.33691-.75-.75-.75h-2.5Z"
                fill="currentColor"
            />
            <path
                d="m17.28027,5.72168c-.29297-.29297-.76758-.29297-1.06055,0l-.48291.48291c-.07068-2.18945-1.86353-3.95264-4.06982-3.95264-.41406,0-.75.33594-.75.75s.33594.75.75.75c1.36914,0,2.48242,1.07495,2.56689,2.42334l-.45361-.45361c-.29297-.29297-.76758-.29297-1.06055,0s-.29297.76758,0,1.06055l1.75,1.75c.06909.06909.15186.12354.24341.16162s.18896.05811.28687.05811.19531-.02002.28687-.05811.17432-.09253.24341-.16162l1.75-1.75c.29297-.29297.29297-.76758,0-1.06055Z"
                fill="currentColor"
            />
            <path
                d="m15.75,18h-2.5c-1.24023,0-2.25-1.00977-2.25-2.25v-2.5c0-1.24023,1.00977-2.25,2.25-2.25h2.5c1.24023,0,2.25,1.00977,2.25,2.25v2.5c0,1.24023-1.00977,2.25-2.25,2.25Zm-2.5-5.5c-.41309,0-.75.33691-.75.75v2.5c0,.41309.33691.75.75.75h2.5c.41309,0,.75-.33691.75-.75v-2.5c0-.41309-.33691-.75-.75-.75h-2.5Z"
                fill="currentColor"
            />
            <path
                d="m8.33301,16.25195c-1.36914,0-2.48242-1.07495-2.56689-2.42334l.45361.45361c.14648.14648.33789.21973.53027.21973s.38379-.07324.53027-.21973c.29297-.29297.29297-.76758,0-1.06055l-1.75-1.75c-.06909-.06909-.15198-.12378-.24365-.16187-.18335-.07593-.38989-.07593-.57324,0-.09155.03809-.17456.09277-.24365.16187l-1.75,1.75c-.29297.29297-.29297.76758,0,1.06055s.76758.29297,1.06055,0l.48291-.48291c.07068,2.18945,1.86353,3.95264,4.06982,3.95264.41406,0,.75-.33594.75-.75s-.33594-.75-.75-.75Z"
                fill="currentColor"
            />
        </svg>
    `;
};

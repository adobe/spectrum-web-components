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
export const UnlinkVerticalIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Unlink Vertical',
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
                d="m18.25,19.02776c-.19238,0-.38379-.07324-.53027-.21973L1.21973,2.30803c-.29297-.29297-.29297-.76758,0-1.06055s.76758-.29297,1.06055,0l16.5,16.5c.29297.29297.29297.76758,0,1.06055-.14648.14648-.33789.21973-.53027.21973Z"
                fill="currentColor"
            />
            <path
                d="m12.99996,9.88903c-.41406,0-.75-.33594-.75-.75v-4.32907c0-1.25878-1.02343-2.28221-2.28221-2.28221-.86425,0-1.64452.47851-2.03612,1.24902-.18848.37011-.64062.51562-1.00878.3291-.36914-.18848-.5166-.63964-.3291-1.00878.64941-1.27636,1.94237-2.06932,3.374-2.06932,2.08592,0,3.7822,1.69628,3.7822,3.7822v4.32907c0,.41406-.33594.75-.75.75Z"
                fill="currentColor"
            />
            <path
                d="m10.03809,19.02776c-2.08887,0-3.78809-1.7002-3.78809-3.78906v-4.34961c0-.41406.33594-.75.75-.75s.75.33594.75.75v4.34961c0,1.26172,1.02637,2.28906,2.28809,2.28906.86133,0,1.6416-.47656,2.03613-1.24316.18848-.36816.6416-.51562,1.00977-.32422.36914.18945.51367.6416.32422,1.00977-.65332,1.26953-1.94434,2.05762-3.37012,2.05762Z"
                fill="currentColor"
            />
        </svg>
    `;
};

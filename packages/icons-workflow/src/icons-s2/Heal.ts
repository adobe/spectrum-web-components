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
export const HealIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Heal',
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
                d="m6.16406,18.3877c-1.00391,0-1.94629-.3916-2.65527-1.10254l-.77539-.77734c-1.4541-1.45703-1.45605-3.83105-.00488-5.29004L11.1748,2.71973c.70898-.71387,1.65234-1.10645,2.65723-1.10742h.00391c1.00391,0,1.94629.3916,2.65527,1.10254l.77539.77734c1.4541,1.45703,1.45605,3.83105.00488,5.29004l-8.44629,8.49805c-.70898.71387-1.65234,1.10645-2.65723,1.10742h-.00391ZM13.83594,3.1123h-.00195c-.60352,0-1.16992.23633-1.59473.66406L3.79297,12.27441c-.87109.87598-.86914,2.2998.00293,3.1748l.77539.77734h0c.4248.42676.99121.66113,1.59277.66113h.00195c.60352,0,1.16992-.23633,1.59473-.66406l8.44629-8.49805c.87109-.87598.86914-2.2998-.00293-3.1748l-.77539-.77734c-.4248-.42676-.99121-.66113-1.59277-.66113Z"
                fill="currentColor"
            />
            <circle cx="8.12868" cy="10" r=".75" fill="currentColor" />
            <circle cx="10" cy="8.12868" r=".75" fill="currentColor" />
            <circle cx="11.87132" cy="10" r=".75" fill="currentColor" />
            <circle cx="10" cy="11.87132" r=".75" fill="currentColor" />
        </svg>
    `;
};

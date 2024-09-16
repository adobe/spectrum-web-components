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
export const PrototypingIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Prototyping',
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
                d="m17.72516,1h-.66809c-1.27625,0-2.44757.81665-2.79663,2h-.26025c-2.61914,0-4.75,2.13086-4.75,4.75v4.5c0,1.79199-1.45801,3.25-3.25,3.25h-.26514c-.32782-1.1521-1.37762-2-2.63489-2h-.82495c-.15192,0-.27502.12305-.27502.2749v4.95007c0,.15186.12311.27502.27502.27502h.66809c1.27625,0,2.44757-.81665,2.79663-2h.26025c2.61914,0,4.75-2.13086,4.75-4.75v-4.5c0-1.79199,1.45801-3.25,3.25-3.25h.26514c.32782,1.1521,1.37762,2,2.63489,2h.82495c.15192,0,.27502-.12317.27502-.27502V1.2749c0-.15186-.12311-.2749-.27502-.2749Z"
                fill="currentColor"
            />
        </svg>
    `;
};

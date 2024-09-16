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
export const Polygon6Icon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Polygon6',
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
                d="m13.31982,18h-6.63965c-.80127,0-1.54834-.43164-1.94824-1.125l-3.31982-5.75c-.40088-.69336-.40088-1.55664,0-2.25l3.31982-5.75c.3999-.69336,1.14697-1.125,1.94824-1.125h6.63965c.80127,0,1.54834.43164,1.94824,1.125l3.31982,5.75c.40088.69336.40088,1.55664,0,2.25l-3.31982,5.75c-.3999.69336-1.14697,1.125-1.94824,1.125ZM6.68018,3.5c-.26709,0-.51562.14355-.64893.375l-3.32031,5.75c-.13379.23145-.13379.51855,0,.75l3.31982,5.75c.13379.23145.38232.375.64941.375h6.63965c.26709,0,.51562-.14355.64893-.375l3.32031-5.75c.13379-.23145.13379-.51855,0-.75l-3.31982-5.75c-.13379-.23145-.38232-.375-.64941-.375h-6.63965Z"
                fill="currentColor"
                stroke-width="0"
            />
        </svg>
    `;
};

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
export const LinkVerticalIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Link Vertical',
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
                d="m10,19c-2.06787,0-3.75-1.68213-3.75-3.75v-4.20898c0-2.06787,1.68213-3.75,3.75-3.75.2793,0,.55908.03125.83154.09277.40381.09082.65771.49219.56641.89648-.09082.4043-.48975.65967-.89648.56641-.16406-.03711-.33301-.05566-.50146-.05566-1.24072,0-2.25,1.00928-2.25,2.25v4.20898c0,1.24072,1.00928,2.25,2.25,2.25s2.25-1.00928,2.25-2.25v-1.70898c0-.41406.33594-.75.75-.75s.75.33594.75.75v1.70898c0,2.06787-1.68213,3.75-3.75,3.75Zm3.75-9.95898v-4.1582c0-2.06787-1.68213-3.75-3.75-3.75s-3.75,1.68213-3.75,3.75v1.6582c0,.41406.33594.75.75.75s.75-.33594.75-.75v-1.6582c0-1.24072,1.00928-2.25,2.25-2.25s2.25,1.00928,2.25,2.25v4.1582c0,1.24072-1.00928,2.25-2.25,2.25-.16846,0-.3374-.01855-.50146-.05566-.40283-.09229-.80518.1626-.89648.56641-.09131.4043.1626.80566.56641.89648.27246.06152.55225.09277.83154.09277,2.06787,0,3.75-1.68213,3.75-3.75Z"
                fill="currentColor"
            />
        </svg>
    `;
};

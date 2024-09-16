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
export const RenameIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Rename',
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
                d="m13.7832,15.70801L8.7373,3.78027c-.23535-.55469-1.14648-.55469-1.38184,0L2.30908,15.70801c-.16113.38086.01709.82129.39893.98242.09521.04102.19434.05957.2915.05957.29248,0,.57031-.17188.69141-.45801l1.8158-4.29199h5.07904l1.81561,4.29199c.16113.38086.60156.5625.98291.39844.38184-.16113.56006-.60156.39893-.98242Zm-7.64185-5.20801l1.90503-4.50293,1.90485,4.50293h-3.80988Z"
                fill="currentColor"
            />
            <path
                d="m16.25,18.75c-.41406,0-.75-.33594-.75-.75V2c0-.41406.33594-.75.75-.75s.75.33594.75.75v16c0,.41406-.33594.75-.75.75Z"
                fill="currentColor"
            />
        </svg>
    `;
};

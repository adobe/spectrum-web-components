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
export const CornerCountIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Corner Count',
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
                d="m13.99365,18h-7.9873c-.97803,0-1.83838-.625-2.14014-1.55518l-2.46826-7.59619c-.30225-.92969.02588-1.94092.81787-2.51562L8.67725,1.6377c.79102-.57422,1.854-.57422,2.64502,0h.00049l6.46191,4.69531c.7915.57471,1.11963,1.58594.81738,2.51562l-2.46826,7.59668c-.30176.92969-1.16211,1.55469-2.14014,1.55469Zm-3.99365-15.29199c-.15479,0-.30908.04785-.44141.14355L3.09717,7.54688c-.26416.19141-.37354.52832-.27246.83789l2.46826,7.59668c.10059.31055.38721.51855.71338.51855h7.9873c.32617,0,.61279-.20801.71338-.51807l2.46826-7.59717c.10107-.30957-.0083-.64648-.27197-.83789l-6.4624-4.69531c-.13184-.0957-.28613-.14355-.44092-.14355Z"
                fill="currentColor"
                opacity=".35"
            />
            <circle cx="10" cy="2" r="1.75" fill="currentColor" />
            <circle cx="18" cy="8" r="1.75" fill="currentColor" />
            <circle cx="2" cy="8" r="1.75" fill="currentColor" />
            <circle cx="15" cy="17" r="1.75" fill="currentColor" />
            <circle cx="5" cy="17" r="1.75" fill="currentColor" />
        </svg>
    `;
};

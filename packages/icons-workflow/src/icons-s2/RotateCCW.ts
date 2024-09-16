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
export const RotateCCWIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Rotate CC W',
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
                d="m1.72949,3.72896c.39209-.12061.81494.10059.93701.49658l.53143,1.73016c1.43658-2.33026,3.99622-3.82538,6.80206-3.82538,4.41113,0,8,3.58887,8,8s-3.58887,8-8,8c-2.66162,0-5.1416-1.31836-6.6333-3.52686-.23193-.34326-.1416-.80957.20166-1.0415.34375-.23145.80957-.14062,1.0415.20166,1.2124,1.79492,3.22754,2.8667,5.39014,2.8667,3.58398,0,6.5-2.91602,6.5-6.5,0-3.58398-2.91602-6.5-6.5-6.5-2.20074,0-4.21191,1.13434-5.3999,2.91516l1.54736-.47522c.39258-.11914.81543.1001.93701.49658.12158.396-.10059.81543-.49658.93701l-3.37988,1.03809c-.07324.02246-.14746.0332-.2207.0332-.32031,0-.61719-.20703-.71631-.52979l-1.03809-3.37939c-.12158-.396.10059-.81543.49658-.93701Z"
                fill="currentColor"
            />
        </svg>
    `;
};

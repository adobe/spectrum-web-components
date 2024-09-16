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
export const HeartIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Heart',
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
                d="m10,18c-.48877,0-.97754-.16016-1.38574-.48047h0c-1.58594-1.24414-5.20264-4.51172-6.37451-6.42871-.93262-1.52539-1.25293-3.41309-.85693-5.04883.33984-1.4043,1.16211-2.53711,2.37842-3.27832,1.37402-.83887,3.02295-.99707,4.30176-.41309.66016.30176,1.36328.82715,1.92871,1.4209.57812-.62988,1.27295-1.13965,1.96729-1.42969,1.31152-.55176,2.95264-.3877,4.28027.42188,1.21582.74121,2.03809,1.87402,2.37793,3.27832.396,1.63574.07568,3.52344-.85693,5.04883-1.16943,1.91309-4.78711,5.18262-6.37451,6.42871-.40771.32031-.89697.48047-1.38574.48047ZM6.38721,3.49902c-.60645,0-1.25537.18555-1.84521.5459-.86914.5293-1.45703,1.3418-1.70117,2.34961-.30469,1.25781-.05078,2.7207.67822,3.91309.95312,1.55859,4.14941,4.56348,6.021,6.03223h.00049c.27051.21289.64844.21289.91895,0,1.87354-1.4707,5.07031-4.47656,6.021-6.03223.72949-1.19238.9834-2.65527.67871-3.91309-.24414-1.00781-.83203-1.82031-1.70068-2.34961-.92578-.56445-2.04492-.68652-2.91992-.32031-.68213.28613-1.43311.9375-1.91406,1.66016-.27832.41797-.9707.41797-1.24902,0-.43506-.65332-1.24902-1.35547-1.93555-1.66895-.31836-.14551-.67725-.2168-1.05273-.2168Z"
                fill="currentColor"
            />
        </svg>
    `;
};

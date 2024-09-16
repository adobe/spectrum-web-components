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
export const CheckBoxIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Check Box',
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
                d="m14.4502,5.64453c-.33594-.24609-.80371-.1709-1.04883.16211l-4.53906,6.19751-1.66309-2.14087c-.25391-.32617-.72266-.38574-1.05273-.13281-.32715.25488-.38672.72559-.13281,1.05273l2.27344,2.92676c.01758.02271.04419.03149.06396.05151.02954.03076.0498.06787.08545.09399.02637.01917.05615.02747.08398.04272.02393.01343.04639.026.07178.0365.09302.03894.18896.06531.28662.06531.00024,0,.00073-.00024.00098-.00024.00049,0,.00049.00024.00098.00024.10059,0,.19971-.02808.29492-.06934.02686-.0116.0498-.02563.0752-.04028.0293-.01697.06128-.02637.08887-.04761.0354-.02759.05518-.06567.08423-.0979.01855-.02026.04468-.02893.06128-.05151l5.12695-7c.24414-.33398.17188-.80371-.16211-1.04883Z"
                fill="currentColor"
                stroke-width="0"
            />
            <path
                d="m15.25,18H4.75c-1.5166,0-2.75-1.2334-2.75-2.75V4.75c0-1.5166,1.2334-2.75,2.75-2.75h10.5c1.5166,0,2.75,1.2334,2.75,2.75v10.5c0,1.5166-1.2334,2.75-2.75,2.75ZM4.75,3.5c-.68945,0-1.25.56055-1.25,1.25v10.5c0,.68945.56055,1.25,1.25,1.25h10.5c.68945,0,1.25-.56055,1.25-1.25V4.75c0-.68945-.56055-1.25-1.25-1.25H4.75Z"
                fill="currentColor"
                stroke-width="0"
            />
        </svg>
    `;
};

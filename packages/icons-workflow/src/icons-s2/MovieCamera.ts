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
export const MovieCameraIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Movie Camera',
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
                d="m11.75,16H3.25c-1.24072,0-2.25-1.00928-2.25-2.25v-7.5c0-1.24072,1.00928-2.25,2.25-2.25h8.5c1.24072,0,2.25,1.00928,2.25,2.25v1.04639l2.36816-1.68408c.03125-.02246.06445-.04199.09912-.05957.54639-.27344,1.18311-.24463,1.70264.07666.52002.32129.83008.87793.83008,1.48877v5.76367c0,.61084-.31006,1.16748-.83008,1.48877-.51953.3208-1.15625.3501-1.70264.07666-.03467-.01758-.06787-.03711-.09912-.05957l-2.36816-1.68408v1.04639c0,1.24072-1.00928,2.25-2.25,2.25ZM3.25,5.5c-.41357,0-.75.33643-.75.75v7.5c0,.41357.33643.75.75.75h8.5c.41357,0,.75-.33643.75-.75v-2.5c0-.28076.15674-.5376.40625-.6665.24951-.12793.5498-.10742.77832.05518l3.49072,2.48242c.0918.03125.16699-.00146.20605-.02637.04443-.02734.11865-.09131.11865-.21289v-5.76367c0-.12158-.07422-.18555-.11865-.21289-.03955-.02441-.11621-.05713-.20605-.02637l-3.49072,2.48242c-.22852.1626-.52881.18311-.77832.05518-.24951-.12891-.40625-.38574-.40625-.6665v-2.5c0-.41357-.33643-.75-.75-.75H3.25Z"
                fill="currentColor"
            />
        </svg>
    `;
};

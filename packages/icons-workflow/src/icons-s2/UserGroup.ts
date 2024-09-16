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
export const UserGroupIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'User Group',
} = {}): string | TemplateResult => {
    return html`
        <svg
            data-name="ICONS"
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
                d="m12.25293,11.94922c-2.27637,0-4.12793-1.94629-4.12793-4.33887s1.85156-4.33887,4.12793-4.33887,4.12793,1.94629,4.12793,4.33887-1.85156,4.33887-4.12793,4.33887Zm0-7.17773c-1.44922,0-2.62793,1.27344-2.62793,2.83887s1.17871,2.83887,2.62793,2.83887,2.62793-1.27344,2.62793-2.83887-1.17871-2.83887-2.62793-2.83887Zm-5.37598,12.84082c.21484-1.99219,2.57617-3.55273,5.37598-3.55273,2.82324,0,5.18457,1.55664,5.37598,3.54492.04004.41309.41602.72656.81836.67383.41211-.03906.71387-.40527.67383-.81836-.26367-2.74805-3.28125-4.90039-6.86816-4.90039-3.61426,0-6.56641,2.10352-6.86816,4.89258-.04395.41113.25391.78125.66602.82617.02734.00293.05371.00391.08105.00391.37793,0,.70312-.28516.74512-.66992Zm.24023-7.89355c.16895-.37793.00098-.82227-.37695-.99219-.98535-.44238-1.62109-1.47168-1.62109-2.62207,0-1.56543,1.17871-2.83887,2.62793-2.83887.15234,0,.30078.01465.44629.04102.40234.08105.7998-.19238.87402-.60059.0752-.40723-.19336-.79883-.60059-.87402-.2334-.04395-.47363-.06641-.71973-.06641-2.27637,0-4.12793,1.94629-4.12793,4.33887,0,1.74023.9834,3.30664,2.50586,3.99121.09961.04395.2041.06543.30762.06543.28613,0,.55957-.16504.68457-.44238Zm-4.74609,6.38867c.20508-1.90234,2.36914-3.42676,5.03223-3.5459.41406-.01855.73438-.36816.71582-.78223-.01758-.40234-.34961-.7168-.74805-.7168-.01172,0-.02344,0-.03418.00098-3.45312.1543-6.16797,2.20703-6.45801,4.88184-.04395.41211.25391.78223.66504.82715.02832.00293.05469.00391.08203.00391.37793,0,.70312-.28516.74512-.66895Z"
                fill="currentColor"
            />
        </svg>
    `;
};

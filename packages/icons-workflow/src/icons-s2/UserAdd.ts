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
export const UserAddIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'User Add',
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
                d="m15,10.50195c-2.48535,0-4.5,2.01465-4.5,4.5s2.01465,4.5,4.5,4.5,4.5-2.01465,4.5-4.5-2.01465-4.5-4.5-4.5Zm2.5,5.12305h-1.875v1.875c0,.34473-.28027.625-.625.625s-.625-.28027-.625-.625v-1.875h-1.875c-.34473,0-.625-.28027-.625-.625s.28027-.625.625-.625h1.875v-1.875c0-.34473.28027-.625.625-.625s.625.28027.625.625v1.875h1.875c.34473,0,.625.28027.625.625s-.28027.625-.625.625Z"
                fill="currentColor"
            />
            <path
                d="m2.27539,18.75195c-.05273,0-.10645-.00586-.16113-.01758-.4043-.08789-.66113-.4873-.57227-.89258.59473-2.72949,3.3125-5.02441,6.60742-5.5791.42285-.07715.7959.20703.86426.61426.06934.40918-.20605.7959-.61426.86426-2.70703.45605-4.9248,2.27344-5.39258,4.4209-.07617.35059-.38672.58984-.73145.58984Z"
                fill="currentColor"
            />
            <path
                d="m10,10.85156c-2.48535,0-4.50684-2.15332-4.50684-4.7998S7.51465,1.25195,10,1.25195s4.50684,2.15332,4.50684,4.7998-2.02148,4.7998-4.50684,4.7998Zm0-8.09961c-1.6582,0-3.00684,1.48047-3.00684,3.2998s1.34863,3.2998,3.00684,3.2998,3.00684-1.48047,3.00684-3.2998-1.34863-3.2998-3.00684-3.2998Z"
                fill="currentColor"
            />
        </svg>
    `;
};

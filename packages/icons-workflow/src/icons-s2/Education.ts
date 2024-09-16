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
export const EducationIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Education',
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
                d="m10,11.62207c-.28711,0-.57373-.05469-.84668-.16504l-.95654-.38574c-.38428-.1543-.57031-.5918-.41553-.97559.15527-.38379.59082-.57227.97607-.41504l.95703.38574c.18408.07422.38623.07422.57031,0l7.05762-2.84473c.13037-.05273.15771-.15527.15771-.23242,0-.07617-.02734-.17773-.15771-.23047l-7.05713-2.8457c-.18408-.07324-.3877-.07227-.57178.00098l-7.05566,2.84473c-.13037.05273-.15771.15527-.15771.23145s.02734.17871.15771.23145l.2998.12109c.38428.1543.57031.5918.41553.97559-.15527.38379-.59277.56934-.97607.41504l-.30029-.12109c-.66699-.26953-1.09717-.90625-1.09668-1.62305,0-.7168.43115-1.35352,1.09717-1.62109l7.05664-2.8457c.5459-.21875,1.146-.21973,1.69092-.00098l7.05811,2.84668c.66602.26758,1.09668.9043,1.09717,1.62109,0,.7168-.43018,1.35352-1.09668,1.62305l-7.05762,2.84473c-.27246.11035-.55908.16504-.8457.16504Z"
                fill="currentColor"
            />
            <path
                d="m9.96191,15.93262c-.58154,0-1.15723-.05078-1.70996-.15039-.40771-.07422-.67822-.46387-.60449-.87207.07324-.4082.46729-.6748.87109-.60449.46533.08398.95068.12695,1.44336.12695,3.9668,0,5.25-1.76172,5.25-2.61523,0-.41406.33594-.75.75-.75s.75.33594.75.75c0,1.14453-1.2124,4.11523-6.75,4.11523Z"
                fill="currentColor"
            />
            <path
                d="m10.69482,6.42285c-.15771-.38184-.5957-.56152-.97998-.40625l-3.61279,1.49707c-.84473.34863-1.39014,1.16504-1.39014,2.0791v5.96387l-.48193.96387c-.21338.42676-.19141.9248.06006,1.33105.25098.40625.68604.64844,1.16357.64844s.9126-.24219,1.16357-.64844c.25146-.40625.27344-.9043.06006-1.33105l-.46533-.93066v-5.99707c0-.30469.18164-.57617.46338-.69238l3.61377-1.49707c.38281-.15918.56445-.59766.40576-.98047Z"
                fill="currentColor"
            />
        </svg>
    `;
};

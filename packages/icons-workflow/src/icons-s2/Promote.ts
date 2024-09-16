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
export const PromoteIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Promote',
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
                d="m18.01367,2.38867c-.61719-.41797-1.39648-.50391-2.08984-.22852-2.95996,1.17773-5.21094,1.85254-6.17383,1.85254h-4.75c-2.20605,0-4,1.79297-4,3.99707,0,2.20312,1.79395,3.99609,4,3.99609h.1626l2.26123,5.45215c.39844.96094,1.33105,1.54199,2.31152,1.54199.31836,0,.6416-.06152.9541-.19043.61621-.25586,1.09668-.73535,1.35254-1.35156.25586-.61719.25586-1.2959,0-1.91504l-1.42163-3.42554c1.16479.23438,3.01807.83789,5.31226,1.73901.26562.10449.54395.15527.82129.15527.44434,0,.88477-.13184,1.2627-.38965.61621-.41895.9834-1.11426.9834-1.85938v-7.51172c0-.74707-.36914-1.44336-.98633-1.8623ZM2.5,8.00977c0-1.37695,1.12109-2.49707,2.5-2.49707h4v4.99316h-4c-1.37891,0-2.5-1.12012-2.5-2.49609Zm8.15723,8.87305c-.10254.24609-.29492.43848-.54199.54102-.50781.21094-1.09375-.03125-1.30664-.54004l-2.02295-4.87793h2.16516l1.70642,4.11328c.10156.24609.10156.51758,0,.76367Zm6.84277-5.12012c0,.25195-.11914.47852-.32715.62012-.20801.14062-.46094.16797-.69141.07715-2.70569-1.06299-4.70264-1.68872-5.98145-1.88257v-5.13452c1.29395-.19189,3.29041-.82007,5.97852-1.88818.2334-.09277.48633-.06543.69238.0752.20898.1416.3291.36816.3291.62109v7.51172Z"
                fill="currentColor"
            />
        </svg>
    `;
};

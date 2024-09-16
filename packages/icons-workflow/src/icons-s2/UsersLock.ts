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
export const UsersLockIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Users Lock',
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
                d="m11.75,10.74805c-2.27637,0-4.12793-1.94629-4.12793-4.33887s1.85156-4.33887,4.12793-4.33887,4.12793,1.94629,4.12793,4.33887-1.85156,4.33887-4.12793,4.33887Zm0-7.17773c-1.44922,0-2.62793,1.27344-2.62793,2.83887s1.17871,2.83887,2.62793,2.83887,2.62793-1.27344,2.62793-2.83887-1.17871-2.83887-2.62793-2.83887Z"
                fill="currentColor"
            />
            <path
                d="m5.57715,16.99805c-.02734,0-.05469-.00098-.08203-.00391-.41113-.04492-.70898-.41504-.66504-.82715.30273-2.78809,3.25488-4.89062,6.86816-4.89062.41406,0,.75.33594.75.75s-.33594.75-.75.75c-2.79883,0-5.16016,1.56055-5.37598,3.55273-.04199.38379-.36719.66895-.74512.66895Z"
                fill="currentColor"
            />
            <path
                d="m5.87793,8.99805c-.10352,0-.20801-.02148-.30762-.06641-1.52148-.68359-2.50488-2.25-2.50488-3.99023C3.06543,2.54883,4.91699.60254,7.19336.60254c.24316,0,.4834.02246.71582.06445.4082.07422.67871.46387.60547.87109-.07324.4082-.46387.67773-.87109.60547-.14648-.02637-.29688-.04102-.4502-.04102-1.44922,0-2.62793,1.27344-2.62793,2.83887,0,1.15039.63574,2.17969,1.62012,2.62305.37793.16895.5459.61328.37598.99121-.125.27832-.39746.44238-.68359.44238Z"
                fill="currentColor"
            />
            <path
                d="m1.07129,15.49805c-.02734,0-.05469-.00098-.08203-.00391-.41211-.04492-.70898-.41504-.66504-.82715.29102-2.6748,3.00684-4.72852,6.45898-4.88184.37598-.04785.76367.30176.78223.71582s-.30176.76367-.71582.78223c-2.66309.11914-4.82715,1.64355-5.0332,3.5459-.04199.38379-.36719.66895-.74512.66895Z"
                fill="currentColor"
            />
            <path
                d="m19,14.99805c0-.55054-.44507-.99622-.99512-.99902v-.99121c0-1.1084-.90137-2.00977-2.00977-2.00977-1.10742,0-2.00879.90137-2.00879,2.00977v.99292c-.54565.00781-.98633.44995-.98633.99731v3c0,.22058.08569.41382.20654.5791.07568.10352.16699.18811.27612.2561.1532.09521.32373.16479.51733.16479h4c.1936,0,.36414-.06958.51733-.16479.10913-.06799.20044-.15259.27612-.2561.12085-.16528.20654-.35852.20654-.5791v-3Zm-3.00488-2.75c.41895,0,.75977.34082.75977.75977v.99023h-1.51855v-.99023c0-.41895.34082-.75977.75879-.75977Z"
                fill="currentColor"
            />
        </svg>
    `;
};

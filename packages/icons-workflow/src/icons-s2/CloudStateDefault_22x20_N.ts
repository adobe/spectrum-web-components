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
export const CloudStateDefault22x20NIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'CloudStateDefault 22x20 N',
} = {}): string | TemplateResult => {
    return html`
        <svg
            data-name="ICONS"
            xmlns="http://www.w3.org/2000/svg"
            width=${width}
            height=${height}
            viewBox="0 0 22 20"
            aria-hidden=${hidden ? 'true' : 'false'}
            role="img"
            fill="currentColor"
            aria-label=${title}
        >
            <path
                d="m15.40674,17H3.71777c-1.90332,0-3.45166-1.54883-3.45166-3.45215,0-1.49316.9668-2.78027,2.32373-3.25-.04297-.23047-.06445-.46484-.06445-.70215,0-2.17969,1.80957-3.95312,4.03369-3.95312.27979,0,.55762.0293.83105.08789.63721-1.95801,2.47607-3.34668,4.58838-3.34668,2.6709,0,4.84424,2.17285,4.84424,4.84375,0,.43848-.0625.87305-.18701,1.29883,1.80225.53125,3.10303,2.19141,3.10303,4.1416,0,2.38867-1.94336,4.33203-4.33203,4.33203ZM6.55908,7.14258c-1.39697,0-2.53369,1.10059-2.53369,2.45312,0,.33203.06934.65625.20605.96484.09961.22363.08301.48242-.04395.69238-.12744.20996-.34912.34375-.59375.35938-1.0249.06543-1.82764.91602-1.82764,1.93555,0,1.07617.87549,1.95215,1.95166,1.95215h11.68896c1.56152,0,2.83203-1.27051,2.83203-2.83203,0-1.49707-1.17822-2.7334-2.68213-2.81445-.25439-.01367-.48438-.15625-.61084-.37695-.12646-.22168-.13184-.49219-.01416-.71777.25977-.49902.39111-1.01465.39111-1.53125,0-1.84375-1.5-3.34375-3.34424-3.34375-1.6626,0-3.08008,1.25195-3.29736,2.91211-.03076.23535-.17188.44238-.37988.55762-.20752.11816-.4585.12695-.67432.02734-.34766-.1582-.70654-.23828-1.06787-.23828Z"
                fill="currentColor"
            />
        </svg>
    `;
};

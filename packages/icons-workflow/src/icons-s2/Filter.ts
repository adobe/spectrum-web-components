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
export const FilterIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Filter',
} = {}): string | TemplateResult => {
    return html`
        <svg
            data-name="outline / production"
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
                d="m8.99902,18.72852c-.35938,0-.7168-.09814-1.03711-.29297-.60254-.36572-.96191-1.00488-.96191-1.70947v-6.23584c0-.18604-.06836-.36377-.19238-.50146L2.62793,5.34521c-.53809-.59033-.67383-1.4165-.34863-2.15234.32422-.73584,1.02539-1.19287,1.83008-1.19287h11.78125c.80469,0,1.50586.45703,1.83008,1.19287.3252.73584.18945,1.56201-.35254,2.15576l-4.17578,4.64014c-.12402.1377-.19238.31543-.19238.50146v5.04541c0,.84375-.46484,1.60889-1.21289,1.99707l-1.86523.96826c-.29199.15186-.6084.22754-.92285.22754ZM4.10938,3.5c-.29492,0-.41797.2085-.45801.29834s-.11035.32178.08789.53955l4.18359,4.64697c.37207.41357.57715.94824.57715,1.50537v6.23584c0,.25391.16797.3833.24023.42725.07227.04443.26562.13232.49023.0166l1.86523-.96875c.25-.12939.4043-.38428.4043-.66553v-5.04541c0-.55713.20508-1.0918.57715-1.50537l4.17969-4.64355c.20215-.22119.13184-.45312.0918-.54297s-.16309-.29834-.45801-.29834H4.10938Z"
                fill="currentColor"
            />
        </svg>
    `;
};

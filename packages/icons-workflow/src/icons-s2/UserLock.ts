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
export const UserLockIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'User Lock',
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
                d="m10,11.25c-2.61914,0-4.75-2.24316-4.75-5S7.38086,1.25,10,1.25s4.75,2.24316,4.75,5-2.13086,5-4.75,5Zm0-8.5c-1.79199,0-3.25,1.57031-3.25,3.5s1.45801,3.5,3.25,3.5,3.25-1.57031,3.25-3.5-1.45801-3.5-3.25-3.5Z"
                fill="currentColor"
            />
            <path
                d="m2.75098,18.75c-.02441,0-.04883-.00098-.07324-.00391-.41211-.03906-.71387-.40527-.67383-.81836.30566-3.18359,3.81836-5.67773,7.99609-5.67773.67676,0,1.34668.06348,1.99121.18848.40723.0791.67285.47266.59375.87891-.07812.40723-.47949.67871-.87891.59375-.55078-.10742-1.125-.16113-1.70605-.16113-3.41406,0-6.27051,1.89844-6.50391,4.32227-.03711.3877-.36328.67773-.74512.67773Z"
                fill="currentColor"
            />
            <path
                d="m18.00977,14.00195v-.99219c0-1.1084-.90137-2.00977-2.00977-2.00977s-2.00977.90137-2.00977,2.00977v.99219c-.54749.00562-.99023.44922-.99023.99805v3c0,.55225.44775,1,1,1h4c.55225,0,1-.44775,1-1v-3c0-.54883-.44275-.99243-.99023-.99805Zm-2.00977-1.75195c.41895,0,.75977.34082.75977.75977v.99023h-1.51953v-.99023c0-.41895.34082-.75977.75977-.75977Z"
                fill="currentColor"
            />
        </svg>
    `;
};

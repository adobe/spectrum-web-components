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
export const GiftIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Gift',
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
                d="m15.75,5.99997h-1.31396c.19385-.37646.31396-.797.31396-1.24902,0-1.5166-1.2334-2.75-2.75-2.75-.79004,0-1.49805.33936-2,.87451-.50195-.53516-1.20996-.87451-2-.87451-1.5166,0-2.75,1.2334-2.75,2.75,0,.45203.12012.87256.31396,1.24902h-1.31396c-1.24023,0-2.25,1.00977-2.25,2.25v1.5c0,.77795.39771,1.4646,1,1.8689v4.1311c0,1.24023,1.00977,2.25,2.25,2.25h9.5c1.24023,0,2.25-1.00977,2.25-2.25v-4.1311c.60229-.4043,1-1.09094,1-1.8689v-1.5c0-1.24023-1.00977-2.25-2.25-2.25Zm.75,2.25v1.5c0,.41309-.33691.75-.75.75h-5v-2.99902h1.25c.00342,0,.00635-.00098.00977-.00098h3.74023c.41309,0,.75.33691.75.75Zm-4.5-4.74902c.68945,0,1.25.56055,1.25,1.25,0,.68774-.55811,1.24622-1.24512,1.24902h-1.25488v-1.24902c0-.68945.56055-1.25,1.25-1.25Zm-5.25,1.25c0-.68945.56055-1.25,1.25-1.25s1.25.56055,1.25,1.25v1.24902h-1.25488c-.68701-.00281-1.24512-.56128-1.24512-1.24902Zm-3.25,3.49902c0-.41309.33691-.75.75-.75h3.74023c.00342,0,.00635.00098.00977.00098h1.25v2.99902h-5c-.41309,0-.75-.33691-.75-.75v-1.5Zm1,7.5v-3.75h4.75v4.5h-4c-.41309,0-.75-.33691-.75-.75Zm10.25.75h-4v-4.5h4.75v3.75c0,.41309-.33691.75-.75.75Z"
                fill="currentColor"
            />
        </svg>
    `;
};

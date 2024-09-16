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
export const ThumbUpIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Thumb Up',
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
                d="m18.53027,8.22461c-.51123-.7666-1.3667-1.22461-2.28809-1.22461h-3.04492c-.38721,0-.71533-.30273-.74707-.68848l-.2002-2.37988c.00195-.05176-.00195-.1377-.01074-.18848-.11133-.65332-.37256-2.18359-2.17432-2.18359-1.48193,0-1.78955,1.66895-2.08691,3.28418-.33984,1.84668-.6582,3.15332-1.66016,3.15625h-2.06787c-1.24072,0-2.25,1.00977-2.25,2.25v5.5c0,1.24023,1.00928,2.25,2.25,2.25h7.5c.03418,0,.06787-.00195.10059-.00684h1.43994c1.51855-.00098,2.87646-.9082,3.45996-2.30957l2.03027-4.87695c.35449-.85059.26074-1.81543-.25049-2.58203ZM3.5,15.75v-5.5c0-.41309.33643-.75.75-.75h1v7h-1c-.41357,0-.75-.33691-.75-.75Zm13.896-5.51953l-2.03027,4.87695c-.3501.84082-1.16504,1.38477-2.07568,1.38574h-1.54004c-.03418,0-.06787.00195-.10059.00684h-4.89941v-7.03345c1.95581-.30005,2.38495-2.62378,2.70361-4.35132.12256-.66699.35156-1.90918.61133-2.05566.36084,0,.5293,0,.68555.87793.00049.01465.00098.0293.00195.04102l.20264,2.45605c.09521,1.1582,1.08008,2.06543,2.24219,2.06543h3.04492c.42529,0,.8042.20312,1.04004.55664s.27734.78125.11377,1.17383Z"
                fill="currentColor"
            />
        </svg>
    `;
};

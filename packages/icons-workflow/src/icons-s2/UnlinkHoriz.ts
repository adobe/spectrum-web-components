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
export const UnlinkHorizIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Unlink Horiz',
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
                d="m6.99466,18.24676c-.2265-.2265-.29002-.58143-.13327-.87905l1.28785-2.44932c.19266-.36667.64634-.50823,1.01232-.31488.37151.19473.50754.64703.31488,1.01232l-1.28785,2.44932c-.19266.36667-.64634.50823-1.01232.31488-.06905-.03591-.12982-.08148-.18161-.13327Z"
                fill="currentColor"
            />
            <path
                d="m11.94441,18.24676c-.05248-.05248-.09806-.11325-.13396-.1823l-1.29268-2.46521c-.19266-.36667-.05041-.81966.31626-1.01232.36598-.19335.82312-.05386,1.01232.31626l1.29268,2.46521c.19266.36667.05041.81966-.31626,1.01232-.29693.15606-.65255.09184-.87836-.13396Z"
                fill="currentColor"
            />
            <path
                d="m10.65933,5.22033c-.2265-.2265-.29002-.58143-.13327-.88043l1.28508-2.43966c.19335-.36598.64634-.50685,1.0137-.3135.36529.19266.50616.64565.3135,1.0137l-1.28508,2.43966c-.19335.36598-.64634.50685-1.0137.3135-.06767-.03591-.12844-.08148-.18023-.13327Z"
                fill="currentColor"
            />
            <path
                d="m8.28182,5.22654c-.05179-.05179-.09737-.11256-.13327-.18161l-1.28716-2.44587c-.19335-.36598-.05179-.81966.31488-1.01232.36598-.19197.8169-.05317,1.01232.31488l1.28716,2.44587c.19335.36598.05179.81966-.31488,1.01232-.29762.15675-.65255.09322-.87905-.13327Z"
                fill="currentColor"
            />
            <path
                d="m7,13.5h-3c-2.06738,0-3.75-1.68262-3.75-3.75s1.68262-3.75,3.75-3.75h3c.41406,0,.75.33594.75.75s-.33594.75-.75.75h-3c-1.24023,0-2.25,1.00977-2.25,2.25s1.00977,2.25,2.25,2.25h3c.41406,0,.75.33594.75.75s-.33594.75-.75.75Z"
                fill="currentColor"
            />
            <path
                d="m16,13.5h-3c-.41406,0-.75-.33594-.75-.75s.33594-.75.75-.75h3c1.24023,0,2.25-1.00977,2.25-2.25s-1.00977-2.25-2.25-2.25h-3c-.41406,0-.75-.33594-.75-.75s.33594-.75.75-.75h3c2.06738,0,3.75,1.68262,3.75,3.75s-1.68262,3.75-3.75,3.75Z"
                fill="currentColor"
            />
        </svg>
    `;
};

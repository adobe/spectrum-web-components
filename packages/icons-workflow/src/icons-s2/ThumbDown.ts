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
export const ThumbDownIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Thumb Down',
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
                d="m18.78076,9.19434l-2.03027-4.87695c-.58545-1.40625-1.94336-2.31641-3.46045-2.31738H4.25c-1.24072,0-2.25,1.00977-2.25,2.25098v5.5c0,1.24023,1.00928,2.25,2.25,2.25h2.06592c.98975.00293,1.28613,1.24609,1.62451,3.14355.28076,1.57324.59863,3.35547,2.12451,3.35547,1.85059,0,2.06299-1.4707,2.1792-2.27539.00146-.01172.20605-2.53516.20605-2.53516.03174-.38574.35986-.68848.74707-.68848h3.04492c.92139,0,1.77686-.45801,2.28809-1.22461s.60498-1.73145.25049-2.58203Zm-15.28076.55664v-5.5c0-.41406.33643-.75098.75-.75098h1v7.00098h-1c-.41357,0-.75-.33691-.75-.75Zm13.78223,1.19336c-.23584.35352-.61475.55664-1.04004.55664h-3.04492c-1.16211,0-2.14697.90723-2.24219,2.06641,0,0-.19482,2.41406-.19727,2.45703-.14111.97559-.25928.96191-.71338.97363-.26855-.10645-.51074-1.46387-.62744-2.11719-.3075-1.72461-.72253-4.0437-2.66699-4.3457V3.5h6.53955c.90918.00098,1.72412.54785,2.07617,1.39355l2.03027,4.87695c.16357.39258.12207.82031-.11377,1.17383Z"
                fill="currentColor"
            />
        </svg>
    `;
};

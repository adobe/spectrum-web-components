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
export const UnpublishIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Unpublish',
} = {}): string | TemplateResult => {
    return html`
        <svg
            data-name="ICONS"
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
                d="M15,10.5c-2.48535,0-4.5,2.01465-4.5,4.5s2.01465,4.5,4.5,4.5,4.5-2.01465,4.5-4.5-2.01465-4.5-4.5-4.5ZM17.20996,16.3252c.24316.24414.24316.64062,0,.88477-.12207.12207-.28223.18262-.44238.18262s-.32031-.06055-.44238-.18262l-1.3252-1.3252-1.3252,1.3252c-.12207.12207-.28223.18262-.44238.18262s-.32031-.06055-.44238-.18262c-.24316-.24414-.24316-.64062,0-.88477l1.3252-1.3252-1.3252-1.3252c-.24316-.24414-.24316-.64062,0-.88477.24414-.24414.64062-.24414.88477,0l1.3252,1.3252,1.3252-1.3252c.24414-.24414.64062-.24414.88477,0,.24316.24414.24316.64062,0,.88477l-1.3252,1.3252,1.3252,1.3252Z"
                fill="currentColor"
                stroke-width="0"
            />
            <path
                d="M18.7793,1.21875c-.21191-.21094-.52637-.27539-.80469-.16602L1.47461,7.56152c-.26953.10547-.45312.3584-.47266.64746s.12891.56348.38184.7041l6.25513,3.49487.42944.75806c.1377.24414.3916.38086.65332.38086.125,0,.25195-.03125.36816-.09766.36133-.2041.4873-.66113.2832-1.02148l-.25244-.4458,7.12915-7.16797-1.32104,3.38623c-.14941.38574.04199.82031.42871.96973s.82031-.04199.96973-.42871l2.62109-6.71875c.1084-.27734.04199-.59375-.16895-.80371ZM8.05615,10.9231l-4.55908-2.54712L15.16895,3.77148l-7.11279,7.15161Z"
                fill="currentColor"
                stroke-width="0"
            />
        </svg>
    `;
};

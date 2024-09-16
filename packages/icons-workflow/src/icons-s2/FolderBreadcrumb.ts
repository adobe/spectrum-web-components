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
export const FolderBreadcrumbIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Folder Breadcrumb',
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
                d="m16.75,5h-5.96387c-.21777,0-.42383-.09375-.56641-.25879l-1.7041-1.96387c-.42676-.49414-1.0459-.77734-1.7002-.77734h-3.56543c-1.24023,0-2.25,1.00977-2.25,2.25v10.5c0,1.24023,1.00977,2.25,2.25,2.25h13.5c1.24023,0,2.25-1.00977,2.25-2.25v-7.5c0-1.24023-1.00977-2.25-2.25-2.25ZM3.25,3.5h3.56543c.21777,0,.42383.09375.56641.25879l1.07703,1.24121H2.5v-.75c0-.41309.33691-.75.75-.75Zm14.25,11.25c0,.41309-.33691.75-.75.75H3.25c-.41309,0-.75-.33691-.75-.75V6.5h14.25c.41309,0,.75.33691.75.75v7.5Z"
                fill="currentColor"
            />
            <path
                d="m10,13.65039c-.19238,0-.38379-.07324-.53027-.21973l-3-3c-.29297-.29297-.29297-.76758,0-1.06055s.76758-.29297,1.06055,0l2.46973,2.46973,2.46973-2.46973c.29297-.29297.76758-.29297,1.06055,0s.29297.76758,0,1.06055l-3,3c-.14648.14648-.33789.21973-.53027.21973Z"
                fill="currentColor"
            />
        </svg>
    `;
};

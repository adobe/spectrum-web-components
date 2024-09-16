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
export const FolderClockIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Folder Clock',
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
                d="m16.75,5h-5.96387c-.21777,0-.42383-.09375-.56641-.25879l-1.7041-1.96387c-.42676-.49414-1.0459-.77734-1.7002-.77734h-3.56543c-1.24023,0-2.25,1.00977-2.25,2.25v11c0,.96484.78516,1.75,1.75,1.75h5.62305c.41406,0,.75-.33594.75-.75s-.33594-.75-.75-.75H2.75c-.1377,0-.25-.1123-.25-.25V6.5h14.25c.41309,0,.75.33691.75.75v1.82227c0,.41406.33594.75.75.75s.75-.33594.75-.75v-1.82227c0-1.24023-1.00977-2.25-2.25-2.25Zm-14.25-.75c0-.41309.33691-.75.75-.75h3.56543c.21777,0,.42383.09375.56641.25879l1.07703,1.24121H2.5v-.75Z"
                fill="currentColor"
            />
            <path
                d="m15,10.5c-2.48535,0-4.5,2.01465-4.5,4.5s2.01465,4.5,4.5,4.5,4.5-2.01465,4.5-4.5-2.01465-4.5-4.5-4.5Zm1.66211,6.24316c-.12207.11719-.27832.17578-.43457.17578-.16309,0-.32715-.06348-.44922-.19043l-1.22754-1.27051c-.02173-.02246-.03064-.05078-.04834-.07544-.02917-.04028-.06104-.07837-.08008-.12524-.02063-.05103-.02539-.10474-.0321-.15869-.0033-.02563-.01526-.04858-.01526-.0752v-2c0-.34473.28027-.625.625-.625s.625.28027.625.625v1.74731l1.05176,1.08862c.24023.24902.2334.64453-.01465.88379Z"
                fill="currentColor"
            />
        </svg>
    `;
};

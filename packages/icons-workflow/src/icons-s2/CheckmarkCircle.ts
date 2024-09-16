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
export const CheckmarkCircleIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Checkmark Circle',
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
                d="m10,18.75c-4.8252,0-8.75-3.9248-8.75-8.75S5.1748,1.25,10,1.25s8.75,3.9248,8.75,8.75-3.9248,8.75-8.75,8.75Zm0-16c-3.99805,0-7.25,3.25195-7.25,7.25s3.25195,7.25,7.25,7.25,7.25-3.25195,7.25-7.25-3.25195-7.25-7.25-7.25Z"
                fill="currentColor"
            />
            <path
                d="m9.18262,13.94336c-.21191,0-.41504-.08984-.55762-.24805l-2.64355-2.93945c-.27734-.30859-.25195-.78223.05566-1.05957s.78125-.25195,1.05957.05566l2.02637,2.25391,3.7002-5.0459c.24316-.33301.71191-.40918,1.04785-.16113.33398.24414.40625.71387.16113,1.04785l-4.24512,5.79004c-.13281.18262-.3418.29492-.56738.30566-.01172.00098-.02441.00098-.03711.00098Z"
                fill="currentColor"
            />
        </svg>
    `;
};

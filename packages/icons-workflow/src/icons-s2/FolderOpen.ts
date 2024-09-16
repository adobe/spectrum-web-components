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
export const FolderOpenIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Folder Open',
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
                d="m19.21143,8.89648c-.30847-.40918-.73584-.68713-1.21533-.81458v-.83191c0-1.24023-1.00928-2.25-2.25-2.25h-4.96387c-.21777,0-.42432-.09473-.56592-.25684l-1.70117-1.96875c-.42773-.49219-1.04736-.77441-1.7002-.77441h-3.56494c-1.24072,0-2.25,1.00977-2.25,2.25v10.5c0,1.24023,1.00928,2.25,2.25,2.25v-.02893c.04193.0072.07977.02893.12305.02893h12.74756c.99805,0,1.88721-.66992,2.16211-1.62891l1.29395-4.5c.19727-.68457.06396-1.4043-.36523-1.97461ZM2.84705,15.36572c-.20404-.13428-.34705-.35413-.34705-.61572V4.25c0-.41309.33643-.75.75-.75h3.56494c.21826,0,.42529.09473.56689.25684l1.70117,1.96875c.42773.49219,1.04688.77441,1.69922.77441h4.96387c.41357,0,.75.33691.75.75v.75H6.65918c-.99756,0-1.88672.66992-2.1626,1.62891l-1.64954,5.73682Zm15.28821-4.90869l-1.29395,4.5c-.0918.31934-.38818.54297-.7207.54297H4.36914l1.56885-5.45703c.09229-.31934.38867-.54297.72119-.54297h10.75488c.23779,0,.45605.10938.59912.29883.14307.19043.1875.42969.12207.6582Z"
                fill="currentColor"
            />
        </svg>
    `;
};

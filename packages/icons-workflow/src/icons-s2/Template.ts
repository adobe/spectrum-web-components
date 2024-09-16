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
export const TemplateIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Template',
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
                d="m14.75,18H5.25c-1.24023,0-2.25-1.00977-2.25-2.25V3.25c0-1.24023,1.00977-2.25,2.25-2.25h9.5c1.24023,0,2.25,1.00977,2.25,2.25v12.5c0,1.24023-1.00977,2.25-2.25,2.25ZM5.25,2.5c-.41309,0-.75.33691-.75.75v12.5c0,.41309.33691.75.75.75h9.5c.41309,0,.75-.33691.75-.75V3.25c0-.41309-.33691-.75-.75-.75H5.25Z"
                fill="currentColor"
            />
            <path
                d="m9.60449,15.56152c-.16895,0-.3418-.03516-.50977-.10742-.5791-.25098-.87305-.85254-.71289-1.46289l.65332-2.5127h-2.13574c-.45215,0-.87012-.24512-1.09082-.63965s-.21191-.87891.02441-1.26367l3.54004-5.77441c.33008-.53906.9668-.74609,1.55176-.49902.58203.24512.88086.84375.72656,1.45605l-.68359,2.7207h2.13281c.45508,0,.87402.24707,1.09473.64551.21973.39746.20605.88379-.03516,1.26855l-3.51172,5.58008c-.23828.37891-.62988.58887-1.04395.58887Zm-2.25977-5.58301h2.01465c.39062,0,.75098.17676.98926.48633.23828.30859.31836.70215.21973,1.0791l-.32812,1.26074,2.4082-3.82617h-2.00098c-.3877,0-.74707-.17578-.98535-.48145-.23926-.30566-.32129-.69727-.22754-1.07324l.36328-1.44629-2.45312,4.00098Z"
                fill="currentColor"
            />
        </svg>
    `;
};

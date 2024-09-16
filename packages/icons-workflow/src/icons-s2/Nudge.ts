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
export const NudgeIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Nudge',
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
                d="m11.78418,13h-3.56836c-.6709,0-1.21582-.54492-1.21582-1.21582v-3.56836c0-.6709.54492-1.21582,1.21582-1.21582h3.56836c.6709,0,1.21582.54492,1.21582,1.21582v3.56836c0,.6709-.54492,1.21582-1.21582,1.21582Zm-3.28418-1.5h3v-3h-3v3Z"
                fill="currentColor"
            />
            <path
                d="m4,13c-.19238,0-.38379-.07324-.53027-.21973l-2.25-2.25c-.29297-.29297-.29297-.76758,0-1.06055l2.25-2.25c.29297-.29297.76758-.29297,1.06055,0s.29297.76758,0,1.06055l-1.71973,1.71973,1.71973,1.71973c.29297.29297.29297.76758,0,1.06055-.14648.14648-.33789.21973-.53027.21973Z"
                fill="currentColor"
            />
            <path
                d="m12.25,4.75c-.19238,0-.38379-.07324-.53027-.21973l-1.71973-1.71973-1.71973,1.71973c-.29297.29297-.76758.29297-1.06055,0s-.29297-.76758,0-1.06055l2.25-2.25c.29297-.29297.76758-.29297,1.06055,0l2.25,2.25c.29297.29297.29297.76758,0,1.06055-.14648.14648-.33789.21973-.53027.21973Z"
                fill="currentColor"
            />
            <path
                d="m16,13c-.19238,0-.38379-.07324-.53027-.21973-.29297-.29297-.29297-.76758,0-1.06055l1.71973-1.71973-1.71973-1.71973c-.29297-.29297-.29297-.76758,0-1.06055s.76758-.29297,1.06055,0l2.25,2.25c.29297.29297.29297.76758,0,1.06055l-2.25,2.25c-.14648.14648-.33789.21973-.53027.21973Z"
                fill="currentColor"
            />
            <path
                d="m10,19c-.19238,0-.38379-.07324-.53027-.21973l-2.25-2.25c-.29297-.29297-.29297-.76758,0-1.06055s.76758-.29297,1.06055,0l1.71973,1.71973,1.71973-1.71973c.29297-.29297.76758-.29297,1.06055,0s.29297.76758,0,1.06055l-2.25,2.25c-.14648.14648-.33789.21973-.53027.21973Z"
                fill="currentColor"
            />
        </svg>
    `;
};

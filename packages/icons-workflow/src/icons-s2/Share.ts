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
export const ShareIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Share',
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
                d="m13.52734,5.49023l-3.00244-2.99756c-.29297-.29199-.76709-.29248-1.06006.00049l-2.99756,2.99756c-.29297.29297-.29297.76758,0,1.06055.14648.14648.33838.21973.53027.21973s.38379-.07324.53027-.21973l1.72217-1.72217v8.18115c0,.41406.33594.75.75.75s.75-.33594.75-.75V4.83667l1.71777,1.71509c.29297.29199.76758.29297,1.06055-.00098.29248-.29297.29248-.76807-.00098-1.06055Z"
                fill="currentColor"
            />
            <path
                d="m15.75,18.021H4.25c-1.24072,0-2.25-1.00928-2.25-2.25v-5.75c0-.41406.33594-.75.75-.75s.75.33594.75.75v5.75c0,.41357.33643.75.75.75h11.5c.41357,0,.75-.33643.75-.75v-5.75c0-.41406.33594-.75.75-.75s.75.33594.75.75v5.75c0,1.24072-1.00928,2.25-2.25,2.25Z"
                fill="currentColor"
            />
        </svg>
    `;
};

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
export const InfoCircleIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Info Circle',
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
                d="m10.00064,5.26036c.23065-.00813.45538.07387.62661.22862.33033.36505.33033.92102,0,1.28607-.16935.15851-.39483.24308-.62664.23504-.23635.00948-.46589-.08035-.63302-.24775-.16207-.1679-.24916-.39432-.24137-.62755-.01238-.23497.06959-.46515.2277-.6394.17358-.16474.40786-.24988.64671-.23503Z"
                fill="currentColor"
            />
            <path
                d="m10,15.0625c-.41406,0-.75-.33594-.75-.75v-4.83496c0-.41406.33594-.75.75-.75s.75.33594.75.75v4.83496c0,.41406-.33594.75-.75.75Z"
                fill="currentColor"
            />
        </svg>
    `;
};

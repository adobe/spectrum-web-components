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
export const ContrastIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Contrast',
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
                d="m10,18.7793c-4.8252,0-8.75-3.9248-8.75-8.75S5.1748,1.2793,10,1.2793s8.75,3.9248,8.75,8.75-3.9248,8.75-8.75,8.75Zm0-16c-3.99805,0-7.25,3.25195-7.25,7.25s3.25195,7.25,7.25,7.25,7.25-3.25195,7.25-7.25-3.25195-7.25-7.25-7.25Z"
                fill="currentColor"
            />
            <path
                d="m10.00001,14.38357c0,.65333.61464,1.12149,1.25098.97349,2.43486-.5663,4.24901-2.74982,4.24901-5.35705s-1.81415-4.79075-4.24901-5.35705c-.63635-.148-1.25098.32016-1.25098.97349v8.76713Z"
                fill="currentColor"
            />
        </svg>
    `;
};

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
export const AlertCircleIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Alert Circle',
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
                d="m10,18.75c-4.82471,0-8.75-3.9248-8.75-8.75S5.17529,1.25,10,1.25s8.75,3.9248,8.75,8.75-3.92529,8.75-8.75,8.75Zm0-16c-3.99756,0-7.25,3.25195-7.25,7.25s3.25244,7.25,7.25,7.25,7.25-3.25195,7.25-7.25-3.25244-7.25-7.25-7.25Z"
                fill="currentColor"
            />
            <path
                d="m9.99936,14.81084c-.23065.00812-.45538-.07378-.62661-.22835-.33033-.36462-.33033-.91993,0-1.28455.16935-.15832.39483-.24279.62664-.23476.23635-.00947.46589.08026.63302.24745.16207.1677.24916.39386.24137.62681.01238.23469-.06959.4646-.2277.63864-.17358.16455-.40786.24959-.64671.23475Z"
                fill="currentColor"
            />
            <path
                d="m10,11.4375c-.41406,0-.75-.33594-.75-.75v-5c0-.41406.33594-.75.75-.75s.75.33594.75.75v5c0,.41406-.33594.75-.75.75Z"
                fill="currentColor"
            />
        </svg>
    `;
};

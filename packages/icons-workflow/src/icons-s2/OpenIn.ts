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
export const OpenInIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Open In',
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
                d="m18,15.75V4.25c0-1.24072-1.00928-2.25-2.25-2.25H4.25c-1.24072,0-2.25,1.00928-2.25,2.25v3.71777c0,.41406.33594.75.75.75s.75-.33594.75-.75v-3.71777c0-.41357.33643-.75.75-.75h11.5c.41357,0,.75.33643.75.75v11.5c0,.41357-.33643.75-.75.75h-3.81104c-.41406,0-.75.33594-.75.75s.33594.75.75.75h3.81104c1.24072,0,2.25-1.00928,2.25-2.25Z"
                fill="currentColor"
            />
            <path
                d="m11,9.75v4.24268c0,.41406-.33594.75-.75.75s-.75-.33594-.75-.75v-2.43213l-6.46973,6.46973c-.14648.14648-.33838.21973-.53027.21973s-.38379-.07324-.53027-.21973c-.29297-.29297-.29297-.76758,0-1.06055l6.46973-6.46973h-2.43213c-.41406,0-.75-.33594-.75-.75s.33594-.75.75-.75h4.24268c.41406,0,.75.33594.75.75Z"
                fill="currentColor"
            />
        </svg>
    `;
};

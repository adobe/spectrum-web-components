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
export const RotateOrientationIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Rotate Orientation',
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
                d="m10.75,18.00002H3.25c-1.24072,0-2.25-1.00928-2.25-2.25v-7.5c0-1.24072,1.00928-2.25,2.25-2.25h7.5c1.24072,0,2.25,1.00928,2.25,2.25v7.5c0,1.24072-1.00928,2.25-2.25,2.25ZM3.25,7.50002c-.41357,0-.75.33643-.75.75v7.5c0,.41357.33643.75.75.75h7.5c.41357,0,.75-.33643.75-.75v-7.5c0-.41357-.33643-.75-.75-.75H3.25Zm15.28027.09131c-.29297-.29297-.76758-.29297-1.06055,0l-.46973.46973v-1.31104c0-2.61914-2.13086-4.75-4.75-4.75h-2c-.41406,0-.75.33594-.75.75s.33594.75.75.75h2c1.79199,0,3.25,1.45801,3.25,3.25v1.31104l-.46973-.46973c-.29297-.29297-.76758-.29297-1.06055,0s-.29297.76758,0,1.06055l1.75,1.75c.14648.14648.33838.21973.53027.21973s.38379-.07324.53027-.21973l1.75-1.75c.29297-.29297.29297-.76758,0-1.06055Z"
                fill="currentColor"
            />
        </svg>
    `;
};
